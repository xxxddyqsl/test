 
import * as RTCEngine from './IRtcEngine';
import * as Entity from '../entity/Entity'
import Utils from '../utils/Utils';
 

export class RtcPeerImpl implements RTCEngine.IPeerConntion {
    constructor(csid: string, bSendOffer: boolean, engine: RtcEngineImpl, pm: RTCEngine.TParams) {
        this._csid = csid;
        this._engine = engine;
        this._param = pm;
         
        if (-1 == csid.lastIndexOf("getCfg")) {

        let cfg: RTCConfiguration = {};  
        cfg.iceServers = [];
        if (null != pm.stun && pm.stun.uri.length > 0) {
            cfg.iceServers.push({ credential: pm.stun.pwd, urls: pm.stun.uri, username: pm.stun.usr});
        }

        if (null != pm.turn && pm.turn.uri.length > 0) {
            cfg.iceServers.push({ credential: pm.turn.pwd, urls: pm.turn.uri, username: pm.turn.usr });
        } 
        cfg.bundlePolicy = "balanced";


        this._peer_connect = new RTCPeerConnection(cfg);   
        this._peer_connect.onicecandidate = (ev)=> {
            if (null != ev.candidate) {
                this._param.pSink.onIceCandidate(ev.candidate.sdpMid, ev.candidate.sdpMLineIndex, ev.candidate.candidate, this._csid);
            } else {
                // All ICE candidates have been sent
            }
        }; 

        this._peer_connect.ontrack = (ev)=> {
            if (!(ev && ev.streams)) {
                return;
            }

            if (ev.track.kind == "audio") {
                let stream_audio = ev.streams[0];
                this._audio_streams[ev.track.id] = stream_audio;
                let csid = this._csid;
                let type = Entity.EStreamType.kAudio;
                this._param.pSink.onAddStream(stream_audio.id, type, ev.track.id, csid);

                console.log("RtcPeerImpl::_peer_connect ontrack kind: ", ev.track.kind, " trackid: ", ev.track.id, " this_csid: ", this._csid); 
                return;
            }

            let stream_video = ev.streams[0];
            this._video_streams[ev.track.id] = stream_video;

            let id = this._csid;

            console.log("RtcPeerImpl::_peer_connect ontrack kind: ", ev.track.kind, " trackid: ", ev.track.id, " this_csid: ", this._csid, " streamID: ", stream_video.id); 
            let type = Entity.EStreamType.kVideo;
            this._param.pSink.onAddStream(stream_video.id, type, ev.track.id, id);
        }; 

         
        if (bSendOffer) {
            this._peer_connect.createOffer()
                .then(this.onCreateSdpSucceed.bind(this, RTCEngine.ESdpType.kOffer))
                .catch(this.onFailed.bind(this, RTCEngine.ESdpType.kOffer)); 
        }
        } else {
            let cfg2: RTCConfiguration = {};  
            cfg2.bundlePolicy = "balanced";
            this._peer_connect_setCfg = new RTCPeerConnection(cfg2);
            this._peer_connect_setCfg.onicecandidate = (ev)=> {
                if (null != ev.candidate) {
                    console.log("onicecandidate: ", ev.candidate.candidate, " sdpMid: ", ev.candidate.sdpMid, " sdpMLineIndex: ", ev.candidate.sdpMLineIndex);
                    if (ev.candidate.sdpMLineIndex == 11111) {
                    // INDEX_TYPE_SET_PARAMS do nothing
                    } else if (ev.candidate.sdpMLineIndex == 11112) {
                        let res = ev.candidate.sdpMid;
                        console.log("INDEX_TYPE_SET_PARAMS res: ", res);
                        if (-1 != res.lastIndexOf("localparam")) {
                            let resss = res.split("localparam:");
                            let par = resss[1];
                            this._peerPar = par;   // HXY   这个参数会导致SetLocal失败
                            console.log("onicecandidate peerPar: ", this._peerPar);
                            return;
                        } else if (-1 != res.lastIndexOf("deviceinf")) {
                            let resss = res.split("deviceinf:");
                            let par = resss[1];
                            this._devInfoPar = par;
                            console.log("onicecandidate devInfoPar: ", this._devInfoPar);
                            return;
                        } else {
                            return;
                        }
                    }
                }
                return;
            }; 
    
            this._peer_connect_setCfg.ontrack = (ev)=>{
                return;
            };
            this.getPeerParams("localparam");
            this.getPeerParams("deviceinf");
        }            
    }

    getVideoSize(): RTCEngine.TVideoSize {
        let ret : RTCEngine.TVideoSize = {
                width:0,
                height:0,
                fps:0
        };
        
        let p = this._engine.videoSize(false);
        if (p) return p;

        return ret;
    }
    
    getVideoSize1(): RTCEngine.TVideoSize {
        let ret : RTCEngine.TVideoSize = {
            width:0,
            height:0,
            fps:25
        };
        
        let p = this._engine.videoSize(true);
        if (p) return p;

        return ret;
    }

    release(): void {

    }


    activeSender(sender: RTCRtpSender, sendflag: boolean): void {
        let transcivers = this._peer_connect.getTransceivers();
        for (let tr of transcivers) {
            if (tr.sender == sender) { 
                if (!sendflag) {
                    if (tr.direction == "sendrecv")
                        tr.direction = "recvonly";
                    else if (tr.direction == "sendonly")
                        tr.direction = "inactive";
                }
                else {
                    if (tr.direction == "recvonly")
                        tr.direction = "sendrecv";
                    else if (tr.direction == "inactive")
                        tr.direction = "sendonly";
                }
                break;
            }
        }
    }

    synStreamTypes(sendtypes: number, stoptypes: number, selfid: string): void { 
        console.log("RtcPeerImpl::synStreamTypes begin sendtypes: ", sendtypes, " stoptypes ", stoptypes, " selfid ", selfid); 

        let bSenderChanged = this.addLocalTracks(sendtypes, selfid);
        this.removeLocalTracks(stoptypes); 

        if (bSenderChanged) {
            console.log("RtcPeerImpl::synStreamTypes createOffer"); 

            this._peer_connect.createOffer()
                .then(this.onCreateSdpSucceed.bind(this, RTCEngine.ESdpType.kOffer))
                .catch(this.onFailed.bind(this, RTCEngine.ESdpType.kOffer)); 
        }

        console.log("RtcPeerImpl::SynStreamTypes OK sendtypes: ", sendtypes, " stoptypes: ", stoptypes, " selfid: ", selfid);
    }

    addLocalTracks(sendtypes: number, selfid:string): boolean {
        console.log("RtcPeerImpl::addLocalTracks  sendtypes ", sendtypes, " selfid: ",selfid);

        let bSenderChanged: boolean = false;
        if (Entity.EStreamType.kAudio & sendtypes) {
            if (0 == (Entity.EStreamType.kAudio & this._sendingType)) {

                let mtrack = this._engine.audioTrack();
                if (null != mtrack) {
                    mtrack.enabled = this._enable_audio;

                    if (null == this._audio_sender) {
                        // let stream: MediaStream�� 
                        this._audio_sender = this._peer_connect.addTrack(mtrack, this._engine._local_stream);
                        bSenderChanged = true;
                    }
                    else {
                        this._audio_sender.replaceTrack(mtrack);
                        this.activeSender(this._audio_sender, true);
                    }

                    this._sendingType |= Entity.EStreamType.kAudio;
                }
            }
        }

        if (Entity.EStreamType.kVideo & sendtypes) {
            if (0 == (Entity.EStreamType.kVideo & this._sendingType)) {

                let mtrack = this._engine.videoTrack(false, false);
                if (null != mtrack) {
                    mtrack.enabled = this._enable_video;

                    if (null == this._video_sender) {

                        // let stream: MediaStream�� 
                        this._video_sender = this._peer_connect.addTrack(mtrack, this._engine._local_stream);
                        bSenderChanged = true;
                        if (!this._param.p2pflag) {
                            let track1 = this._engine.videoTrack(true, true);
                            if (null != track1) {
                                track1.enabled = this._enable_video1;
                                // track1.
                                this._video_sender1 = this._peer_connect.addTrack(track1, this._engine._local_stream);
                            }
                        }
                    }
                    else {
                        this._video_sender.replaceTrack(mtrack);
                        this.activeSender(this._video_sender, true);

                        if (!this._param.p2pflag) {
                            let track1 = this._engine.videoTrack(true, false);

                            if (null != track1) {
                                track1.enabled = this._enable_video1;
                                this._video_sender1.replaceTrack(track1);
                                this.activeSender(this._video_sender1, true);
                            }
                        }
                    }
                    this._sendingType |= Entity.EStreamType.kVideo;
                }
            }
        }

        return bSenderChanged;
    }

    removeLocalTracks(stoptypes: number): void
    { 
        console.log("RtcPeerImpl::removeLocalTracks stoptypes ", stoptypes);

        if (Entity.EStreamType.kAudio & stoptypes)
        {
            if (Entity.EStreamType.kAudio & this._sendingType) {
                this._sendingType &= ~Entity.EStreamType.kAudio;
                if (null != this._audio_sender) {
                    this._audio_sender.replaceTrack(null);
                    this.activeSender(this._audio_sender, false);
                } 
            }
        }

        if (Entity.EStreamType.kVideo & stoptypes)
        {
            // if (0 == (Entity.EStreamType.kVideo & this._sendingType))
            if ((Entity.EStreamType.kVideo & this._sendingType))
            {
                this._sendingType &= ~Entity.EStreamType.kVideo;
                if (null != this._video_sender) { 
                    this._video_sender.replaceTrack(null);
                    this.activeSender(this._video_sender, false);
                }

                if (null != this._video_sender1) {
                    this._video_sender1.replaceTrack(null);
                    this.activeSender(this._video_sender1, false);
                } 
            }
        }

        console.log("RtcPeerImpl::removeLocalTracks OK"); 
    }


    onLocalStreamChanged(): void { 
        let oldst = this._sendingType;
        this.removeLocalTracks(oldst);
        this.addLocalTracks(oldst, null);

        if(0 ==oldst)
        return;

        let vsize = this._engine.videoSize(false);

        console.log("RtcPeerImpl::onLocalStreamChanged video size"); 

        this._param.pSink.onEngineAction(RTCEngine.eEngineAct.kAct_set_video_size, vsize);

        if (this._engine._supportVideo1) {
            let vsize1 = this._engine.videoSize(true);
            if (null == vsize1)
                vsize1 = { width: 0, height: 0, fps:0};

            this._param.pSink.onEngineAction(RTCEngine.eEngineAct.kAct_set_video_1_size, vsize1); 
        } 
    }


    getRemoteVideoStream(token:string): MediaStream {
        return this._video_streams[token];
    }

    getRemoteAudioStream(token:string): MediaStream {
        return this._audio_streams[token];
    }
     
    onSucceed( s: RTCSessionDescriptionInit): void {
        console.log('setLocalDescription onSucceed sdp:==>'+s.sdp);

        var type = 0;
        if (s.type == "answer")
            type = 2;
        else if (s.type == "offer")
            type = 0;
        else if (s.type == "pranswer")
            type = 1;

        this._param.pSink.onSucceed(type, s.sdp, this._csid); 

    }

    onCreateSdpSucceed(sdptype: RTCEngine.ESdpType,s: RTCSessionDescriptionInit): void {
        console.log('CreateOffer success sdp:==>'+s.sdp);
        this._peer_connect.setLocalDescription(s)
            .then(this.onSucceed.bind(this, s))
            .catch(this.onFailed.bind(this, sdptype));  
    }

    onFailed(sdptype: RTCEngine.ESdpType, reason: any): void { 
        console.log("create local sdp fail type = ", sdptype);
        console.log("create local sdp fail reason = ", JSON.stringify(reason));
                this._param.pSink.onFailed(sdptype, "sdp error", this._csid);
    }

    setRemoteDescription(sdptype: number, ssdp: string): void {
        console.log("setRemoteDescription type=", sdptype, ",sdp=", ssdp);

        let stype:RTCSdpType = "offer";
        switch (sdptype) {
            case RTCEngine.ESdpType.kOffer:
                stype = "offer";
                break;
            case RTCEngine.ESdpType.kAnswer:
                stype = "answer";
                break;
            case RTCEngine.ESdpType.kPreAnswer:
                stype = "pranswer";
                break; 
            default:
                break;
        }

        let desc: RTCSessionDescriptionInit = { sdp: ssdp, type: stype };   
        this._peer_connect.setRemoteDescription(desc);
 
        if (RTCEngine.ESdpType.kOffer == sdptype) {
                this._peer_connect.createAnswer()
                    .then(this.onCreateSdpSucceed.bind(this, RTCEngine.ESdpType.kAnswer))
                    .catch(this.onFailed.bind(this, RTCEngine.ESdpType.kAnswer)); 
        }
    }

    addIceCandidate(mline: string, mlineindex: number, sdp: string): void {
        console.log("RtcEngineImpl::addIceCandidate sdp= ", sdp);
        let ice: RTCIceCandidateInit = { candidate: sdp, sdpMLineIndex: mlineindex, sdpMid: mline };    
        this._peer_connect.addIceCandidate(ice);
    }

    pauseSend(sendtype: number, bPause: boolean): void {
        console.log("RtcEngineImpl::pauseSend sendtype= ", sendtype, " bPause= ", bPause);
        if (Entity.EStreamType.kVideo & sendtype) {
            this._enable_video = !bPause;

            if (null != this._video_sender &&  null != this._video_sender.track)
                this._video_sender.track.enabled = this._enable_video; 
        }

        if (RTCEngine.eStreamTypeEx.kVideo1 & sendtype) {
            this._enable_video1 = !bPause;

            if (null != this._video_sender1 && null != this._video_sender1.track)
                this._video_sender1.track.enabled = this._enable_video1;
        }

        if (Entity.EStreamType.kAudio & sendtype) {
            this._enable_audio = !bPause;

            if (null != this._audio_sender && null != this._audio_sender.track)
                this._audio_sender.track.enabled = this._enable_audio;
        } 
    }

    
    setPeerParams(params: string): void {
        let sdp: string = "candidate:1187091188 1 udp 2063597568 172.18.70.30 4005 typ host generation 0 network-id 3";
        let type : number = 11111;
        let Par = "SetPeerParams:" + "remote:" + params;
        console.log("_peer_connect_setCfg addIceCandidate SetPeerParams= ", Par);
        let ice: RTCIceCandidateInit = { candidate: sdp, sdpMLineIndex: type, sdpMid: Par };
        this._peer_connect.addIceCandidate(ice);
    }

    setPeerKeyValueParams(key: string, value: string): void {
        let sdp: string = "candidate:1187091188 1 udp 2063597568 172.18.70.30 4005 typ host generation 0 network-id 3";
        let type : number = 11111;
        let Par = key + ":" + value;
        console.log("_peer_connect_setCfg addIceCandidate setPeerKeyValueParams= ", Par);
        let ice: RTCIceCandidateInit = { candidate: sdp, sdpMLineIndex: type, sdpMid: Par };
        this._peer_connect.addIceCandidate(ice);
    }
    

    setLocalPeerParams(params: string): void {
        let sdp: string = "candidate:1187091188 1 udp 2063597568 172.18.70.30 4005 typ host generation 0 network-id 3";
        let Par = "SetPeerParams:" + "local:" + params;
        console.log("_peer_connect_setCfg addIceCandidate setLocalPeerParams= ", Par);
        let type : number = 11111;
        let ice: RTCIceCandidateInit = { candidate: sdp, sdpMLineIndex: type, sdpMid: Par };
        this._peer_connect.addIceCandidate(ice);
    }

    getPeerParams(params: string): void {
        let sdp2: string = "candidate:1187091188 1 udp 2063597568 172.18.70.30 4005 typ host generation 0 network-id 3";
        let type : number = 11112;
        let ice2: RTCIceCandidateInit = { candidate: sdp2, sdpMLineIndex: type, sdpMid: params };
        this._peer_connect_setCfg.addIceCandidate(ice2);
    }

    get(type: RTCEngine.Etype, param: any): boolean {
        if (type == RTCEngine.Etype.kVideo_size || type == RTCEngine.Etype.kVideo_size_1)
        {
            let sz = <RTCEngine.TVideoSize>param;

            let smallflag = (type == RTCEngine.Etype.kVideo_size_1);
            let vsize = this._engine.videoSize(smallflag);
            if (null == vsize) { 
                sz.width = 0;
                sz.height = 0;
                return this._engine._supportVideo1;
            }
            else {
                sz.width = vsize.width;
                sz.height = vsize.height;
                return true;
            } 

            
        }
        return false;
    }

    set(type: RTCEngine.Etype, param: any): boolean {
        return false;
    }

    getPeerID(): string {
        return this._csid;
    }

    getPeerPar(): string {
        console.log("getPeerPar _peerPar", this._peerPar);
        return this._peerPar;
    }

    getPeerDeviceInfo(): string {
        console.log("getPeerDeviceInfo _devInfoPar", this._devInfoPar);
        return this._devInfoPar;
    }


    _csid: string;
    _peerPar: string = "";
    _devInfoPar: string = "";

    _peer_connect: RTCPeerConnection = null;
    _peer_connect_setCfg: RTCPeerConnection = null;
    _engine: RtcEngineImpl = null;
    _param: RTCEngine.TParams;
    _video_streams: any = {};
    _audio_streams: any = {};
    _video_sender: RTCRtpSender = null;
    _video_sender1: RTCRtpSender = null;
    _audio_sender: RTCRtpSender = null;
    _enable_audio: boolean = false;
    _enable_video: boolean = false;
    _enable_video1: boolean = false;
    
    _sendingType: number = 0;	   

};

export class TVideoToken
{
    video: HTMLVideoElement = null;
    stream: MediaStream = null; 
    peer: RTCEngine.IPeerConntion = null; 
};


export class TAudioToken
{
    audio: HTMLVideoElement = null;
    stream: MediaStream = null; 
    peer: RTCEngine.IPeerConntion = null; 
};

export class RtcEngineImpl implements RTCEngine.IWebRtcEngine { 
    constructor() { 
        let peer = new RtcPeerImpl("getCfg", false, this, this._param); 
        this._peers_cfg = peer; 
    }

    setWebrtcEngineParams(name: string, params: string): void {
    }

    openEngine(p: RTCEngine.TParams): void {
        this._param = p;
        this._supportVideo1 = 0 != p.video_small_sc || 0 != p.screen_small_sc;
    }

    closeEngine(): void {
        this.removeAllStream(null);  
        for (let key of this._peers) {
            let peerImpl = <RtcPeerImpl>this._peers[key];
            peerImpl.release();
        } 
        // this._peers = null;
        this._peers = {};
    }

    createPeer(csid: string, bSendOffer: boolean): RTCEngine.IPeerConntion {
        let peer = new RtcPeerImpl(csid, bSendOffer, this, this._param); 
        this._peers[csid] = peer; 
        return peer;
    }

    destroyPeer(peer: RTCEngine.IPeerConntion): void { 

        let peelImpl = <RtcPeerImpl>this._peers[peer.getPeerID()]; 
        this.removeAllStream(peer); 
        peelImpl.release();
        delete this._peers[peer.getPeerID()]; 
    }

    getPeerCfg(): RTCEngine.IPeerConntion {
        return <RtcPeerImpl>this._peers_cfg;
    }
    
     
    getDeviceID(): string {
        return "s:web|xxx";
    }	 
     
    getDeviceInfo(): string {
        let peer = <RtcPeerImpl>this._peers_cfg;
        this._local_peerDevInfo_par = peer.getPeerDeviceInfo();
        console.log("getDeviceInfo DevInfo ", this._local_peerDevInfo_par)
        return this._local_peerDevInfo_par;
    }
     
    getLocalParamsForPeer(): string {
        let peer = <RtcPeerImpl>this._peers_cfg;
        this._local_peer_par = peer.getPeerPar();
        console.log("getLocalParamsForPeer PeerPar", this._local_peer_par)
        return this._local_peer_par;
    }

    removeAllStream(peer: RTCEngine.IPeerConntion): void {

        var del_items = new Array<string>(); 
        for (let key of this._remote_videos) {
            var tk = <TVideoToken>this._remote_videos[key];
            if (null == peer || tk.peer == peer) {
                if (null != tk.video)  
                    tk.video.srcObject = null;
                else
                    del_items.push(key);
                    
                tk.stream = null;
                tk.peer = null;
            }
        }

        for (let val of del_items) {
            delete this._remote_videos[val];
        }

    }

   
     
    setLocalStreams(localstream: MediaStream, screenflag: boolean): void {
        this._local_stream = localstream; 
        this._screen_flag = screenflag; 

        //update medias
        // for (let key of this._peers) {
        for (let key of Object.keys(this._peers)) {
            let peer = <RtcPeerImpl>this._peers[key];
            peer.onLocalStreamChanged();

            if (screenflag) {
                peer.setLocalPeerParams("video[t:video_screen]");
            } else {
                peer.setLocalPeerParams("video[t:video_cap]");
            }
        }

        // if (screenflag) {
        //     this._peers_cfg.setLocalPeerParams("video[t:video_screen]");  //         let Par = "SetPeerParams:"+"local:" + "video[t:video_screen]";

        // } else {
        //     this._peers_cfg.setLocalPeerParams("video[t:video_cap]");
        // }
    }

    audioTrack(): MediaStreamTrack {
        if (null == this._local_stream)
            return null;

        let mediatracks = this._local_stream.getAudioTracks();
        if (null == mediatracks)
            return null;

        return mediatracks[0];
    }

    videoSize(small: boolean): RTCEngine.TVideoSize {
        if (null == this._local_stream)
            return null;

        let mediatracks = this._local_stream.getVideoTracks();
        if (null == mediatracks)
            return null;

        if (this._screen_flag) {
            if (small)
                return null;

            let vSize: RTCEngine.TVideoSize = { width: 160, height: 320 , fps:20};

            while (true) {
                if ((vSize.width * vSize.height) >= (this._param.screen_sz - 100))
                    return vSize;

                vSize.width += 160;
                vSize.height += 320;
            }
        }
        else {  
            if (!small)
                return { width: 320, height: 240 , fps:25};
            else
                return { width: 160, height: 122 , fps:25};
        }  
    }

    videoTrack(small: boolean, firstAddTrack: boolean): MediaStreamTrack {
        if (null == this._local_stream)
            return null;

        let mediatracks = this._local_stream.getVideoTracks();
        if (null == mediatracks)
            return null;
         
        if (!this._supportVideo1 && small)
            return null;
         
        if (this._screen_flag) { 
            return mediatracks[0];
        }
        else {

            let vsize = this.videoSize(small); 
            let mtrack = mediatracks[0].clone();  

            let tc: MediaTrackConstraints = { frameRate: 20, height: vsize.height, width: vsize.width };
            mtrack.applyConstraints(tc);
            return mtrack;
        } 
    }

    onAddStream(streamid: string, streamtype: Entity.EStreamType, token: string, csid: string, peer: RTCEngine.IPeerConntion): void {

        let peerImpl = <RtcPeerImpl>this._peers[peer.getPeerID()];
        if (null == peerImpl)
            return;
        console.log("RtcEngineImpl::onAddStream csid= ", csid, " streamid= ", streamid, " token: ", token, " type: ", streamtype);


        if (streamtype == Entity.EStreamType.kAudio) {
            let Astream = peerImpl.getRemoteAudioStream(token);
            if (null == Astream) {
                console.log("onAddStream getRemoteAudioStream not found");
                return;
            }
            let tk = <TAudioToken>this._remote_audios[csid];
            if (null == tk) {
                tk = new TAudioToken();
                tk.peer = peer;
                tk.stream = Astream;
                this._remote_audios[csid] = tk;
            }
            else { 
                tk.peer = peer;
                tk.stream = Astream;
                if (null != tk.audio)
                    tk.audio.srcObject = Astream;
            } 

            return;
        }

        let stream = peerImpl.getRemoteVideoStream(token);

        if (null == stream) {
            console.log("onAddStream getRemoteVideoStream not found");
            return;
        }


        let tk = <TVideoToken>this._remote_videos[csid];
        if (null == tk) {
            tk = new TVideoToken();
            tk.peer = peer;
            tk.stream = stream;
            this._remote_videos[csid] = tk;
        }
        else { 
            tk.peer = peer;
            tk.stream = stream;
            if (null != tk.video)
                tk.video.srcObject = stream;
        } 
    }

    onRemoveStream(streamid: string, streamtype: Entity.EStreamType, token: string, csid: string, peer: RTCEngine.IPeerConntion): void { 

        if (streamtype == Entity.EStreamType.kAudio) {
            return;
        }
        let tk = <TVideoToken>this._remote_videos[csid];
        if (null == tk) {
            console.log("RtcEngineImpl::onRemoveStream csid=", csid, " not found");
            return;
        }


        console.log("RtcEngineImpl::onRemoveStream csid= ", csid, " streamid= ", streamid);

        tk.peer = null;
        tk.stream = null;
        if (null == tk.video) {
            delete this._remote_videos[csid];
        }
    }
     

    setRemoteVideo(csid: string, video: HTMLVideoElement): void {
        console.log("RtcEngineImpl::setRemoteVideo csid= ", csid);

        if (null == video)
            return;



        let tk = <TVideoToken>this._remote_videos[csid];
        if (tk == null) {

            tk = new TVideoToken();
            tk.video = video;
            this._remote_videos[csid] = tk;
            return;
        }
        else {
            if (tk.video == video)
                return;

            if (null != tk.video)
                tk.video.srcObject = null;

            tk.video = video;
            if (null == tk.video && null == tk.stream) {
                delete this._remote_videos[csid];
                return;
            }

            if (null != tk.video && null != tk.stream) {
                tk.video.srcObject = tk.stream;
            }
        }
    }

    getOnlyRemoteAudios(): string[] {
        let res = [];
        for (let key of Object.keys(this._remote_audios)) {
            res.push(key);
        }

        return res;
    }



    setOnlyRemoteAudio(audioID: string, audio: HTMLVideoElement): void {
        console.log("RtcEngineImpl::setOnlyRemoteAudio audioID= ", audioID);

        if (null == audio)
            return;


            let tk = <TAudioToken>this._remote_audios[audioID];
            if (tk == null) {
    
                tk = new TAudioToken();
                tk.audio = audio;
                this._remote_audios[audioID] = tk;
                return;
            }
            else {
                if (tk.audio == audio)
                    return;
    
                if (null != tk.audio)
                    tk.audio.srcObject = null;
    
                tk.audio = audio;
                if (null == tk.audio && null == tk.stream) {
                    delete this._remote_audios[audioID];
                    return;
                }
    
                if (null != tk.audio && null != tk.stream) {
                    tk.audio.srcObject = tk.stream;
                }
            }


        // const SVRID : string = "###MEDIA_SERVERID###";   // 多人会议
        // let peerImpl = <RtcPeerImpl>this._peers[SVRID];
        // if (null == peerImpl)
        //     return;

        // let stream = peerImpl.getRemoteAudioStream(audioID);
        // audio.srcObject = stream;
    }

    _supportVideo1: boolean = false;
    _param: RTCEngine.TParams;
    _remote_videos: any = {};
    _remote_audios: any = {};
    _local_stream: MediaStream;
    _screen_flag: boolean = false;
    _peers: any = {};
    _peers_cfg: any = {};

    _local_peer_par : string = "";
    _local_peerDevInfo_par : string = "";

};
 