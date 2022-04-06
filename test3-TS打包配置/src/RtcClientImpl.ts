import * as RTCSdkClient from './IRtcClient';
import HttpHelper from './net/HttpHelper';
import WSHelper from './net/WSHelper';
import * as Entity from './entity/Entity'
import * as ProtoEntity from './protocol/ProtoEntity'
import * as Packeted from './protocol/Packer'
import * as WsEntity from './entity/MsgEntity'
import * as ProtoHelper from './protocol/ProtoHelper'
import * as Protos from './protocol/Protocol'
import Utils from './utils/Utils';
import * as RtcEng from './engine/RtcEngineImpl'
import * as IRtcEng from './engine/IRtcEngine'
import * as MapUtil from './utils/MyMap'

const default_http_server_url : string = "http://172.18.70.30:24002";
const sdk_version : string = "111111";
// const sdk_version : string = "20210610";
// const sdk_version : string = "20210901.01";
// const sdk_version : string = "20211020.01";

const obj_name_keyvalue : string = "object_keyvalue";
const obj_name_user : string = "object_user";
const obj_name_rtcmsg : string = "object_webrtc_msg";
const obj_name_media : string = "object_media";
const obj_name_msg : string = "object_msg";
const obj_notify_header : string = "notify_header";
const SVRID : string = "###MEDIA_SERVERID###";

interface TurnServer {
    uri:string;
    user:string;
    password:string;
};

interface TMedia {
    bindId:string;
    streamId:string;
    token:string;
    streamType: Entity.EStreamType;
    szStreamType:string;
};

enum EWebrtcState {
    kRtcStateWaitOffer = 0x01,
    kRtcStateWaitAnswer = 0x02,
};

enum ENetStatus {
    st_none = 0,
    st_closed = 1,
    st_netbroken = 2,	
    st_connecting = 5, 
    st_connected = 6, 
    st_runing = 7,	 
};

interface TStateItem
{
    dbgSendFlag : boolean;
    disableUi:boolean ;
    waitResp:number;
    changed:boolean;
};

interface PeerInf {
    peer : IRtcEng.IPeerConntion;
    bSetPeerParams : boolean;
    bGotLocalParams: boolean;
    runningState:number;
    curState : number;
    bPublishing:boolean;
    webrtcState:number;
    sendVideo:TStateItem;
    sendVideo1:TStateItem;
    sendAudio:TStateItem;
};

interface TLoginStatic {
    failedGetConfig : number;
    failedConnect:number;
    loginFrom:number;
    connFrom:number;
    registeFrom:number;
    dspanGotConfig:number;
    dspanConnected:number;
    bRelogin:boolean;
};

function trimMediaType(org:string):string {
    let clen = org.length;

    if (clen <= 5) {
        return org;
    }

    let sub1 = org.substr(clen - 5);
    if (sub1 == "_data") {
        return org.substr(0, clen - 5);
    } 
    
    if (clen > 6) {
        let sub2 = org.substr(clen - 6);
        if (sub2 == "_audio" || sub2 == "_video") {
            return org.substr(0, clen - 6);
        }
    }

    if (clen > 8) {
        let sub3 =org.substr(clen - 8, 6);
        if (sub3 == "_video") {
            return org.substr(0, clen - 8);
        }
    }
    
    return org;
}

function media_id(streamid : string , mtype: number):string {
		let id = streamid;

		if (Entity.EStreamType.kAudio == mtype)    
			id = id + "_audio";
		else if (Entity.EStreamType.kVideo == mtype)	  
            id = id + "_video";						    
	/*	else if (MEDIA_TYPE_DATA == mtype)   
			id.append("_data"); */   
		else							    
            id = id + "_any";

		return id;
	}

function getPbObjectAttr(attr:any) : Entity.ObjectKeyValue {
    let ret :Entity.ObjectKeyValue = {
        key:Utils.uint8ToString(attr.getKey()),
        value:Utils.uint8ToString(attr.getValue()),
    };

    return ret;
}

function getPbObjectMedia(media:any):Entity.ObjectMedia {
    let ret :Entity.ObjectMedia = {
        name:Utils.uint8ToString(media.getName()),
        attrs:[],
        disabled:media.getDisabled(),
    };

    let attrs : any = media.getAttrsList();
    let attr :any;
    for (attr of attrs) {
        let objAttr = getPbObjectAttr(attr);
        ret.attrs.push(objAttr);
    }

    return ret;
}

function getPbObjectUser(user:any) : Entity.ObjectUser {
    let ret : Entity.ObjectUser = {
        clientId:"",
        clientKey:"",
        attrs :[],
        status : 0,
        joinTick:0,
        leaveTick:0,
    };

    ret.clientId = Utils.uint8ToString(user.getClientid());
    ret.clientKey = Utils.uint8ToString(user.getClientkey());
    ret.status = user.getStatus();
    ret.joinTick = user.getJoinTime();
    ret.leaveTick = user.getLeaveTime();

    if (user.getAttrsList().length > 0) {
        let attr : any;
        for (attr of user.getAttrsList()) {
            ret.attrs.push(getPbObjectAttr(attr));
        }
    }

    return ret;
}

class IterImpl implements RTCSdkClient.IIter {
    constructor(_map : MapUtil.MyMap<string,string>, bSkipFix:boolean) {
        this._map = _map;
        this._skipFix = this._skipFix;

        this._index = 0;
    }

    skipFixKey() {
        while (!this.isEnd()) {
            let v = this.getCurIntValue();
            if (v <= 0 || v > Protos.EEventId.engine_event_from) {
                break;
            }

            this._index++;
        }
    }

    isEnd(): boolean {
        if (this._index >= this._map.size) return true;
        
        return false;
    }

    next(): void {
        this._index++;
        this.skipFixKey();
    }

    getCurKey(): string {
        if (this._index >= this._map.size) return "";

        return this._map.getKey(this._index);
    }

    getCurValue(): string {
        if (this._index >= this._map.size) return "";

        let key = this._map.getKey(this._index);
        return this._map.getItem(key);
    }

    getCurIntValue(): number {
        let ret : string = this.getCurKey();
        if (!ret || ret == "")  return 0;

        return parseInt(ret);
    }

    private _index: number = 0;
    private _skipFix : boolean = false;
    private _map : MapUtil.MyMap<string,string> = null;
}

class BaseObjectImpl implements RTCSdkClient.IBaseObject {
    private _map : MapUtil.MyMap<string,string> = null;
    constructor() {
        this._map = new MapUtil.MyMap<string,string>();
    }

    getByInt(key: number): string {
        if (!this._map.has(key.toString())) {
            return "";
        }

        return this._map.getItem(key.toString());
    }

    getByStr(key: string): string {
        if (!this._map.has(key)) {
            return "";
        }

        return this._map.getItem(key);
    }

    getIntByInt(key: number): number {
        let ret = this.getByInt(key);
        if (ret == "") {
            return 0;
        }

        return parseInt(ret);
    }

    getIntByStr(key: string): number {
        let ret = this.getByStr(key);
        if (ret == "") {
            return 0;
        }

        return parseInt(ret);
    }

    getIter(skipFixKey?: boolean): RTCSdkClient.IIter {
        let ret = new IterImpl(this._map, skipFixKey);

        return ret;
    }

    put(k:any, v:any) {
        this._map[k.toString()] = v.toString();
    }
}

class ArrayObjImpl implements RTCSdkClient.IArrayObjs {
    private  _sz : number = 0;
    private _strs : string[] = [];
    private _objs : RTCSdkClient.IBaseObject[] = [];

    size(): number {
        return this._sz;
    }

    item(index: number) : RTCSdkClient.IBaseObject {
        if (index < 0 || index >= this._objs.length) return null;

        return this._objs[index];
    }

    strItem(index: number): string {
        if (index < 0 || index >= this._strs.length) return null;

        return this._strs[index];
    }

    addObj(obj:RTCSdkClient.IBaseObject) {
        this._objs.push(obj);
        this._sz++;
    }

    addString(item:string) {
        this._strs.push(item);
        this._sz++;
    }
}


function makeObjUser(pbUser : Entity.ObjectUser) : BaseObjectImpl{
    let obj = new BaseObjectImpl();

    obj.put(Protos.EEventKey.eKeyClientID, pbUser.clientId);
    obj.put(Protos.EEventKey.eKeyClientKey, pbUser.clientKey);
    obj.put(Protos.EEventKey.eKeyStatus, pbUser.status);

    for (let a of pbUser.attrs) {
        obj.put(a.key, a.value);
    }

    return obj;
}

class BaseEventImpl implements RTCSdkClient.IBaseEvent {
    private _map : MapUtil.MyMap<string,string> = null;
    private _skipFixKey : boolean = true;
    private _eventId : number = 0;
    private _iter : IterImpl = null;
    private _objs : MapUtil.MyMap<number, RTCSdkClient.IBaseObject> = null;
    private _arrays :MapUtil.MyMap<number, RTCSdkClient.IArrayObjs> = null;

    constructor() {
        this._skipFixKey = true;
        this._map = new MapUtil.MyMap<string,string>();
        this._objs = new MapUtil.MyMap<number, RTCSdkClient.IBaseObject>();
        this._arrays = new MapUtil.MyMap<number, RTCSdkClient.IArrayObjs>();
    }

    isEnd() : boolean {
        return true;
    }

    init(_map : MapUtil.MyMap<string,string>, skipFix: boolean) {
        this._skipFixKey = skipFix;
        this._map = _map;
    }

    eventId(): number {
        return this._eventId;
    }

    setEventId(e:number){
        this._eventId = e;
    }

    getObj(key:number): RTCSdkClient.IBaseObject {
        if (!this._objs.has(key)) {
            return null;
        }

        return this._objs.getItem(key);
    }

    getArrayObj(key:number): RTCSdkClient.IArrayObjs {
        if (!this._arrays.has(key)) {
            return null;
        }

        return this._arrays.getItem(key);
    }

    getByInt(key: number): string {
        if (!this._map.has(key.toString())) {
            return "";
        }

        return this._map.getItem(key.toString());
    }

    getByStr(key: string): string {
        if (!this._map.has(key)) {
            return "";
        }

        return this._map.getItem(key);
    }

    put(k:any, v:any) {
        this._map[k.toString()] = v.toString();
    }

    putOjb(key:any, obj:RTCSdkClient.IBaseObject) {
        this._objs[key.toString()] = obj;
    }

    putArrayOjb(key:any, obj:RTCSdkClient.IArrayObjs) {
        this._arrays[key.toString()] = obj;
    }

    getIntByInt(key: number): number {
        let ret = this.getByInt(key);
        if (ret == "") {
            return 0;
        }

        return parseInt(ret);
    }

    getIntByStr(key: string): number {
        let ret = this.getByStr(key);
        if (ret == "") {
            return 0;
        }

        return parseInt(ret);
    }

    getIter(skipFixKey?: boolean): RTCSdkClient.IIter {
        let ret = new IterImpl(this._map, skipFixKey);

        return ret;
    }
}

class ParseParameter {
    private _str : string = "";
    private _params : Object = {};

    setParam(str:string) {
        this._str = str;
        this._params = {};

        this.parse();
    }

    parse() {
        let vps = this._str.split("]");
        for (let i = 0; i < vps.length; i++) {
            let str : string = vps[i];
            let idx = str.indexOf('[');
            if (idx > 0) {
                let curKey = str.substr(0, idx);
                let curValue = str.substr(idx+1);

                this._params[curKey] = curValue;

                console.log("_loadConfig key=", curKey, ",value=", curValue);
            }
        }
    }
    getStr():string {
        return this._str;
    }

    getKeyStr(sec:string, key:string, dft : string):string {
        if (!this._params[sec]) {
            return dft;
        }
        
        let strValue : string = this._params[sec];
        let items = strValue.split(',');
        for (let i = 0; i < items.length; i++) {
            let v : string = items[i];
            let values = v.split(":");
            if (values && values.length > 1) {
                return values[1];
            }
        }

        return dft;
    }

    getKeyInt(sec:string, key:string, dft : number) : number {
        if (!this._params[sec]) {
            return dft;
        }
        
        let strValue : string = this._params[sec];
        let items = strValue.split(',');
        for (let i = 0; i < items.length; i++) {
            let v : string = items[i];
            let values = v.split(":");
            if (values && values.length > 1) {
                return parseInt(values[1]);
            }
        }

        return dft;
    }

    getKeyFloat(sec:string, key:string, dft : number) : number {
        if (!this._params[sec]) {
            return dft;
        }
        
        let strValue : string = this._params[sec];
        let items = strValue.split(',');
        for (let i = 0; i < items.length; i++) {
            let v : string = items[i];
            let values = v.split(":");
            if (values && values.length > 1) {
                return parseFloat(values[1]);
            }
        }

        return dft;
    }
};

class RtcClientImpl implements RTCSdkClient.IRtcClient, WsEntity.MsgEntity, IRtcEng.IWebRtcSink {
    private _onSend : boolean = false;
    private _pEngine : RtcEng.RtcEngineImpl = null;

    static getInstance() : RTCSdkClient.IRtcClient {
        if (RtcClientImpl._instance == null) {
            RtcClientImpl._instance = new RtcClientImpl();
        }
        
        return RtcClientImpl._instance;
    }

    constructor() {
        this._socket = new WSHelper;
        this._m_domain = default_http_server_url;
        this._socket.setCallback(this);
        this._pEngine = new RtcEng.RtcEngineImpl();

        this._attrMaps = new MapUtil.MyMap<string, string>();
        this._peers = new MapUtil.MyMap<string, PeerInf>();
        this._medias = new MapUtil.MyMap<string,TMedia>();
    }

    onNetBroken() {
        if (this._netStatus == ENetStatus.st_runing) {
            if (this._peers.size > 0) {
                let key = this._peers.getKey(0);

                let pf = this._peers.getItem(key);
                this._pEngine.destroyPeer(pf.peer);

                this._peers.del(key);
            }

            this._medias.clear();
            this._pEngine.closeEngine();

            if (this._attr.bAutoRelogin) {
                this.commitSimpleEvent(Protos.EEventId.ntf_relogin_waiting, 0);

                if (!this._bNetDisable) {
                    this.relogin(3000, Protos.EReloginReson.netbroken, true);
                }
            } else {
                this.commitSimpleEvent(Protos.EEventId.ntf_netlost, 0);
                this._netStatus = ENetStatus.st_netbroken;
            }
        } else {
            if (!this._bNetDisable) {
                this.commitSimpleEvent(Protos.EEventId.resp_login, IRtcEng.EClientErr.err_connect_audio_server);
            }

            this._netStatus = ENetStatus.st_netbroken;
        }
    }

    sendMsg(msg:string, msgLen:number, clientId:string, token:string) : number {
        let req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_sendmsg);
        let header = ProtoHelper.NewProtoObject(obj_notify_header);
        let body = ProtoHelper.NewProtoObject(obj_name_msg);

        let msgList = req.getMsgList();
        header.setFrom(Utils.base64Encode(this._clientid));
        header.setTo(Utils.base64Encode(clientId));

        body.setClientkey(Utils.base64Encode(this._clientKey));

        if (token && token != "") {
            body.setToken(Utils.base64Encode(token));
        }
        
        body.setMsgdata(Utils.base64Encode(msg));

        msgList.push(body);
        req.setMsgList(msgList);
        
        let btReq = Packeted.Packeter.PackMsgReq(Protos.Protocol.cmd_notify_sendmsg, header, req);

        this._socket.send(btReq);

        return 0;
    }

    pauseSend(bPause:boolean, streamType:Entity.EStreamType, clientId:string):number {
        let peerid : string = '';
        if (this._attr.bP2pFlag) {
            peerid = clientId;
        } else {
            peerid = SVRID;
        }

        let pf = this.findPeerId(peerid);
        if (!pf) return;

        if ((streamType & Entity.EStreamType.kVideo) > 0) {
            if (pf.sendVideo.disableUi != bPause) {
                pf.sendVideo.disableUi = bPause;
                pf.sendVideo.changed = true;
            }

            if (!this._attr.bP2pFlag) {
                if (pf.sendVideo1.disableUi != bPause) {
                    pf.sendVideo1.disableUi = bPause;
                    pf.sendVideo1.changed = true;
                }
            }
        } 
        if ((streamType & Entity.EStreamType.kAudio) > 0) {
            if (pf.sendAudio.disableUi != bPause) {
                pf.sendAudio.disableUi = bPause;
                pf.sendAudio.changed = true; 
            }
        } 
        pf = this._commitMediaAttrChanged(pf);
        this._peers.set(peerid, pf);

        return 0;
    }

    excuteLogout(closeConn:boolean) {
        if (!closeConn) {
            this._netStatus = ENetStatus.st_connecting;
        }

        this._peers.forEach((k,v) => {
            this._pEngine.destroyPeer(v.peer);
        });

        this._peers.clear();
        this._pEngine.closeEngine();
        this._medias.clear();

        if (closeConn) {
            this._socket.close();
        }

        this._netStatus = ENetStatus.st_closed;

        this._waitRelogin = false;
    }

    //IRtcEng.IWebRtcSink
    onIceCandidate(mline: string, midIndex: number, sdp: string, peerid: string): void {
        if (this._engineError) {
            return;
        }

        if (!this._socket.isok()) {
            return;
        }

        let rtcmd = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_webrtc_command);
        rtcmd.setFromid(Utils.base64Encode(this._clientid));
        rtcmd.setToid(Utils.base64Encode(peerid));
        rtcmd.setMsgtype(Utils.base64Encode(RTCSdkClient.cmd_webrtc_ice));
        let rtc = ProtoHelper.NewProtoObject(obj_name_rtcmsg);
        rtc.setMline(Utils.base64Encode(mline));
        rtc.setMlineIndex(midIndex);
        rtc.setSdp(Utils.base64Encode(sdp));
   
        rtcmd.setRtcmsg(rtc);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_notify_webrtc_command, pbHead, rtcmd);

        this._socket.send(btReq);
    }

    _syncSendState(peerid:string, peer:PeerInf) {
        if (peer.curState == peer.runningState) {
            return;
        }

        if (this._attr.bP2pFlag) {
            let sendTypes :number = 0;
            let stopTypes :number = 0;

             if ((Entity.EStreamType.kAudio & peer.runningState) == 0 &&
                0 != (peer.curState & Entity.EStreamType.kAudio)) {
                sendTypes |= Entity.EStreamType.kAudio;
                peer.sendAudio.disableUi = false;
                peer.sendAudio.changed = true;
            } else if (0 == (Entity.EStreamType.kAudio & peer.curState) && 
                0 != (Entity.EStreamType.kAudio & peer.runningState)) {
                stopTypes |= Entity.EStreamType.kAudio;
                peer.sendAudio.disableUi = false;
                peer.sendAudio.changed = true;
            }

            if ((Entity.EStreamType.kVideo & peer.runningState) == 0 &&
                0 != (peer.curState & Entity.EStreamType.kVideo)) {
                sendTypes |= Entity.EStreamType.kVideo;
                peer.sendVideo.disableUi = false;
                peer.sendVideo.changed = true;
            } else if (0 == (Entity.EStreamType.kVideo & peer.curState) && 
                0 != (Entity.EStreamType.kVideo & peer.runningState)) {
                stopTypes |= Entity.EStreamType.kVideo;
                peer.sendVideo.disableUi = false;
                peer.sendVideo.changed = true;
            }  
            
            peer.bPublishing = true;
            peer.webrtcState |= Entity.EWebrtcState.kWebrtcWaitOffer;
            peer.peer.synStreamTypes(sendTypes, stopTypes, peerid);
        } else {
            let req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_update_media);

            let mediaList = req.getMediasList();
            if (peer.curState & Entity.EStreamType.kAudio) {
                let item = ProtoHelper.NewProtoObject(obj_name_media);
                item.setName(ProtoHelper.Base64E("audio"));
                
                mediaList.push(item)
            }

            if (peer.curState & Entity.EStreamType.kVideo) {
                let item = ProtoHelper.NewProtoObject(obj_name_media);
                item.setName(ProtoHelper.Base64E("video"));
                let attrs = item.getAttrsList();

                let vs = peer.peer.getVideoSize();
                if (vs.height > 0 && vs.width > 0) {
                    let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                    attr.setKey(ProtoHelper.Base64E("w"));
                    attr.setValue(ProtoHelper.Base64E(vs.width.toString()));
                    attrs.push(attr);

                    attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                    attr.setKey(ProtoHelper.Base64E("h"));
                    attr.setValue(ProtoHelper.Base64E(vs.height.toString()));
                    attrs.push(attr);
                }

                item.setAttrsList(attrs);
                mediaList.push(item);

                vs = peer.peer.getVideoSize1();
                if (vs.height > 0 && vs.width > 0) {
                    item = ProtoHelper.NewProtoObject(obj_name_media);
                    item.setName(ProtoHelper.Base64E("video_1"));
                    let attrs = item.getAttrsList();

                    let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                    attr.setKey(ProtoHelper.Base64E("w"));
                    attr.setValue(ProtoHelper.Base64E(vs.width.toString()));
                    attrs.push(attr);

                    attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                    attr.setKey(ProtoHelper.Base64E("h"));
                    attr.setValue(ProtoHelper.Base64E(vs.height.toString()));
                    attrs.push(attr);

                    item.setAttrsList(attrs);
                    mediaList.push(item);
                }
            }          
            peer.bPublishing = true;

            let pbHead : ProtoEntity.TReqHeader = {
                sequence : this._sequence++,
                session: '',
                token : this._token
            };
    
            let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_update_media, pbHead, req);
            this._socket.send(btReq);
        }

        this._peers.set(peerid, peer);
    }

    onSucceed(type: number, sdp: string, peerid: string): void {
        if (this._engineError) {
            return;
        }

        if (!this._socket.isok()) {
            return;
        }

        if (!this._peers.has(peerid)) {
            return;
        }

        let peer:PeerInf = this._peers.getItem(peerid);
        if (!peer) {
            return;
        }

        let msgtype : string = '';

        switch(type) {
            case IRtcEng.ESdpType.kOffer:
                if (0 == (peer.webrtcState & EWebrtcState.kRtcStateWaitOffer)) {
                    throw new Error('OnSucceed wrong state:wait offer');
                }

                peer.webrtcState &= ~EWebrtcState.kRtcStateWaitOffer;
                msgtype = RTCSdkClient.cmd_webrtc_offer;
                break;

            case IRtcEng.ESdpType.kAnswer:
                if (0 == (peer.webrtcState & EWebrtcState.kRtcStateWaitAnswer)) {
                    throw new Error('OnSucceed wrong state:wait answer');
                }

                peer.webrtcState &= ~EWebrtcState.kRtcStateWaitAnswer;
                msgtype = RTCSdkClient.cmd_webrtc_answer;
                break;

            case IRtcEng.ESdpType.kPreAnswer:
                msgtype = RTCSdkClient.cmd_webrtc_preanswer;
                break;

            default:
                return;
        }

        let rtcmd = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_webrtc_command);
        rtcmd.setFromid(Utils.base64Encode(this._clientid));

        if (peerid != SVRID) {
            rtcmd.setToid(Utils.base64Encode(peerid));
        }

        let rtc = ProtoHelper.NewProtoObject(obj_name_rtcmsg);
  
        rtc.setSdp(Utils.base64Encode(sdp));
        if (!peer.bGotLocalParams) {
            peer.bGotLocalParams = true;
            this._peers.set(peerid, peer);
            let par : string = this._pEngine.getLocalParamsForPeer();
            rtc.setPeerParams(Utils.base64Encode(par));   // base64Encode 必须
        }

        rtcmd.setMsgtype(Utils.base64Encode(msgtype));
        rtcmd.setRtcmsg(rtc);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token
        };
 

        if (IRtcEng.ESdpType.kOffer && peer.bPublishing) {
            peer.bPublishing = false;
            this._peers.set(peerid, peer);
        }

        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_notify_webrtc_command, pbHead, rtcmd);
        this._socket.send(btReq);
        this._syncSendState(peerid, peer);
    }

    commitSimpleEvent(eventId:number, ec:number) {
        let event = new BaseEventImpl();

        event.setEventId(eventId);

        event.put(Protos.EEventKey.eKeyErrCode, ec);
        console.log("commitSimpleEvent eventId=", eventId, ",ec=", ec);
        
        this._events.push(event);
    }

    commitEvent(evtid: number, k1: number, v1: string, k2: number, v2: string, k3?: number, 
        v3?: string, k4?: number, v4?: string, k5?: number, v5?: string): void {
        let event = new BaseEventImpl();

        event.setEventId(evtid);
        event.put(k1, v1);

        if (k2 != 0) {
            event.put(k2, v2);

            if (k3 && k3 != 0) {
                event.put(k3, v3);

                if (k4 && k4 != 0) {
                    event.put(k4, v4);

                    if (k5 && k5 != 0) {
                        event.put(k5, v5);
                    }
                }
            }
        }

        this._events.push(event);
    }

    onFailed(type: number, error: string, peerid: string): void {
        if (this._engineError || ENetStatus.st_runing != this._netStatus) {
            return;
        }

        this._engineError = true;

        this.relogin(0, IRtcEng.EResonRelogin.rtc_engine_error, true);
    }

    onAddStream(streamid: string, streamtype: Entity.EStreamType, token: string, peerid: string): void {
        if (this._engineError) {
            return;
        }

        let pf = this.findPeerId(peerid);
        if (!pf) return;

        let stype = streamtype.toString();
        let smediaid = media_id(streamid, streamtype);

        let media = <TMedia>{}
        if (this._medias.has(smediaid)) {
            media = this._medias.getItem(smediaid);
        }

        media.token = token;
        media.streamType = streamtype;
        media.streamId = smediaid;
        media.szStreamType = stype;
        media.bindId = streamid;
        this._medias.set(smediaid, media);

        if (this._reuseFlag) {
            if (media.bindId != "") {
                this._pEngine.onAddStream(streamid, streamtype, token, media.bindId, pf.peer);

                this.commitEvent(Protos.EEventId.ntf_added_stream, Protos.EEventKey.eKeyMediaType,
                    stype, Protos.EEventKey.eKeyClientID, media.bindId);
            }
        } else {
            this._pEngine.onAddStream(streamid, streamtype, token, media.bindId, pf.peer);

            this.commitEvent(Protos.EEventId.ntf_added_stream, Protos.EEventKey.eKeyMediaType,
                stype, Protos.EEventKey.eKeyClientID, media.bindId);
        }
    }

    onRemoveStream(streamid: string, streamtype: Entity.EStreamType, peerid: string): void {
        if (this._engineError) {
            return;
        }

        let pf = this.findPeerId(peerid);
        if (!pf) return;

        let mediaid = media_id(streamid, streamtype);
        if (!this._medias.has(mediaid)) {
            return;
        }

        let media = this._medias.getItem(mediaid);
        if (this._reuseFlag) {
            if (media.bindId != "") {
                this._pEngine.onRemoveStream(streamid, streamtype, media.token, media.bindId, pf.peer);

                this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyMediaType,
                    media.szStreamType, Protos.EEventKey.eKeyClientID, media.bindId);
            }
        } else {
            let strmediatype = streamtype.toString();

            this._pEngine.onRemoveStream(streamid, streamtype, media.token, media.bindId, pf.peer);

            this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyMediaType,
                strmediatype, Protos.EEventKey.eKeyClientID, streamid);
        }

        this._medias.del(mediaid);
    }

    onEngineAction(actType: number, params: any): void {
        if (actType == IRtcEng.eEngineAct.kAct_set_video_size ||
            actType == IRtcEng.eEngineAct.kAct_set_video_1_size) {
            
            if (this._netStatus < ENetStatus.st_connected) {
                return;
            }

            if (this.isP2p()) {
                return;
            }

            let pf = this.findPeerId(SVRID);
            if (!pf) return;

            if (actType == IRtcEng.eEngineAct.kAct_set_video_size) {
                pf.sendVideo.changed = true;
            }

            if (actType == IRtcEng.eEngineAct.kAct_set_video_1_size) {
                pf.sendVideo1.changed = true;
            }

            pf = this._commitMediaAttrChanged(pf);
            this._peers[SVRID] = pf;

            // let vs = <IRtcEng.TVideoSize>params;
            // let req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_set_media_attr);
            // let media = ProtoHelper.NewProtoObject(obj_name_media);

            // if (actType == IRtcEng.eEngineAct.kAct_set_video_size) {
            //     media.setName(Utils.base64Encode("video"));
            // } else {
            //     media.setName(Utils.base64Encode("video_1"));
            // }

            // let attrs = media.getAttrsList();
            // let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
            // attr.setKey(Utils.base64Encode("w"));
            // attr.setValue(Utils.base64Encode(vs.width.toString()));
            // attrs.push(attr);

            // attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
            // attr.setKey(Utils.base64Encode("h"));
            // attr.setValue(Utils.base64Encode(vs.height.toString()));
            // attrs.push(attr);

            // media.setAttrsList(attrs);
            // req.setMedia(media);

            // this.sendCommand(Protos.Protocol.cmd_set_media_attr, req, true);
        } else if (actType == IRtcEng.eEngineAct.kAct_set_net_disabled ||
            actType == IRtcEng.eEngineAct.kAct_set_net_enabled) {
            if (actType == IRtcEng.eEngineAct.kAct_set_net_disabled) {
                if (!this._bNetDisable) {
                    if (this._attr.bAutoRelogin) {
                        this._bNetDisable = true;
                    }
                }
                
                this.onNetBroken();
                this.excuteLogout(true);
            } else {
                if (this._bNetDisable) {
                    this._bNetDisable = false;

                    this.relogin(0, Protos.EReloginReson.netbroken, true);
                }
            }  
        }
    }

    setLocalStream(localstream: MediaStream, screenflag: boolean): number {
        this._pEngine.setLocalStreams(localstream, screenflag);

        return 0;
    }

    setRemoteVideo(sClientId: string, video: HTMLVideoElement): number {
        console.log("RtcClientImpl setRemoteVideo sClientId=", sClientId);
        this._pEngine.setRemoteVideo(sClientId, video);

        return 0;
    }


    getRemoteAudioIds(): string[] {
       return this._pEngine.getOnlyRemoteAudios();
    }

    setRemoteAudio(sClientId: string, audio: HTMLVideoElement): number {
        console.log("RtcClientImpl setRemoteVideo sClientId=", sClientId);
        this._pEngine.setOnlyRemoteAudio(sClientId, audio);
        return 0;
    }

    OnNetStatus(iStatus: number, iReason: number): void {
        console.log("RtcClientImpl OnNetStatus status=", iStatus, " Reason: ", iReason);

        if (iStatus == 2) {
            this._waitRelogin = false;
            this._netStatus = ENetStatus.st_connected;
            this._login()
        }
        // TODO hxy 断线重连
        if (iStatus == 3 && this._netStatus == ENetStatus.st_connected) {
            this.onNetBroken();
            this.excuteLogout(true);
        }
    }

    OnMessage(pkt:any): number {
        if (pkt.cmdid != 1) {
            if (pkt.rspHeader) {
                console.log("RtcClientImpl OnMessage cmd=",pkt.cmdid,",msgType=",pkt.msgType,
                    ",rspHeader=", pkt.rspHeader, ",pb=", pkt.pb);
            } else {
                console.log("RtcClientImpl OnMessage cmd=",pkt.cmdid,",msgType=",pkt.msgType,
                    ",pb=", pkt.pb);
            }
        }

        return this._onPacket(pkt.cmdid, pkt.msgType, pkt.rspHeader, pkt.pb);
    }

    setUrl(cfgUri:string, eType:Entity.EUrlType):void {
        console.log("RtcClientImpl setUrl cfgUri=", cfgUri, " eType: ", eType);
        if (cfgUri == '') {
            cfgUri = default_http_server_url;
        }

        this._m_domain = cfgUri;
        this._m_svrtype = eType;
    }

    setAuthoKey(authkey: string): void {
        console.log("RtcClientImpl setAuthoKey authkey=", authkey);
        this._authKey = authkey;
    }

    login(clientKey:string, roomKey:string, tLoginParam : Entity.TLoginAttr):number {
        if (this._netStatus == ENetStatus.st_closed) {
            this._netStatus = ENetStatus.st_none;
        }

        console.log("RtcClientImpl login TLoginAttr=", JSON.stringify(tLoginParam));
        if (ENetStatus.st_none != this._netStatus) {
            console.log("RtcClientImpl login ENetStatus.st_none is ", ENetStatus.st_none);
            return RTCSdkClient.ECODE_BUSY;
        }

        this._clientKey = clientKey;
        this._attr = tLoginParam;
        this._roomKey = roomKey;
        this._netStatus = ENetStatus.st_connecting;
        this._waitRelogin = false;
        this._bNetDisable = false;

        console.log("RtcClientImpl login====> client ", clientKey, " login to room ", roomKey,
        ", login param bAutoRelogin=", this._attr.bAutoRelogin,
        ",bNotifyFlag=",this._attr.bNotifyFlag, 
        ",bOrderFlag=",this._attr.bOrderFlag, 
        ",bP2pFlag=",this._attr.bP2pFlag,
        ",bSupportVideo=",this._attr.bSupportVideo,
        ",bSupportOfflines=",this._attr.bSupportOfflines);

        this._loadConfig();

        return 0;
    }

    logout(): number {
        if (this._netStatus == ENetStatus.st_none) {
            return;
        }

        if (this._netStatus != ENetStatus.st_closed) {
            this.excuteLogout(true);
        }

        this.commitEvent(Protos.EEventId.resp_logout, Protos.EEventKey.eKeyClientID,
            this._clientKey, Protos.EEventKey.eKeyRoomKey, this._roomKey);

        this._netStatus = ENetStatus.st_none;
        this._bNetDisable = false;

        return 0;
    }

    publish(sendFlag : boolean, sendType:number, clientId:string):number {
        if (this._onSend) {
            return 1024;
        }

        let peerid : string = '';
        if (this._attr.bP2pFlag) {
            peerid = clientId;
        } else {
            peerid = SVRID;
        }

        let pf = this.findPeerId(peerid);
        if (!pf) return;

        if (sendFlag) {
            pf.curState |= sendType;
        } else {
            pf.curState &= ~sendType;
        }

        if (pf.bPublishing) {
            this._peers.set(peerid, pf);
            return;
        }

        this._syncSendState(peerid, pf);
    }

    sendCommand(cmd:number, pb:any, isReq:boolean) : number {
        if (isReq) {
            let pbHead : ProtoEntity.TReqHeader = {
                sequence : this._sequence++,
                session: '',
                token : this._token
            };

            let btReq = Packeted.Packeter.PackReq(cmd, pbHead, pb);
            return this._socket.send(btReq);
        } else {
            let btReq = Packeted.Packeter.PackLite(cmd, pb);

            return this._socket.send(btReq);
        }
    }

    isP2p():boolean {
        return this._attr.bP2pFlag;
    }

    isSupportOfflines():boolean {
        return this._attr.bSupportOfflines;
    }

    setRoomAttr(sKey:string, sValue:string):number {
        if (sKey == "") {
            this.onEngineAction(IRtcEng.eEngineAct.kAct_set_net_disabled, null);
            this.onEngineAction(IRtcEng.eEngineAct.kAct_set_net_enabled, null);

            return 0;
        }

        if (this._netStatus == ENetStatus.st_none) {
            if (sKey == "##VP##") {
                this._videoParam = sValue;

                return 1;
            }

            return 2;
        }

        if (this._netStatus < ENetStatus.st_connected) {
            return 3;
        }

        if (this._attrMaps.has(sKey) && this._attrMaps.getItem(sKey) == sValue) {
            let event = new BaseEventImpl();
            event.setEventId(Protos.EEventId.resp_setroom_attr);
            event.put(sKey, sValue);

            this._events.push(event);

            return 0;
        }

        let setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_setroomattrs);

        let objAttrs = setReq.getAttrsList();//ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        if (!objAttrs) {
            console.log("can not create ", obj_name_keyvalue, " array");
            return;
        }

        let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));

        objAttrs.push(attr);

        setReq.setAttrsList(objAttrs);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setroomattrs, pbHead, setReq);
        return this._socket.send(btReq);
    }

    private _userAttrReqs :Object = {};

    setUserAttr(sClientId:string, sKey:string, sValue:string):number {
        let setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_setuserattrs);

        let objAttrs = setReq.getAttrsList();//ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);

        setReq.setClientid(ProtoHelper.Base64E(sClientId));
        setReq.setAttrsList(objAttrs);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token,
        };
        
        this._userAttrReqs[pbHead.sequence] = setReq;

        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setuserattrs, pbHead, setReq);

        return this._socket.send(btReq);
    }

    orderStream(sClientId:string):number {
        let ids = sClientId.split(";");

        let setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_order_streams);


        let Base6ids = [];
        for (let id of ids) {
            Base6ids.push(ProtoHelper.Base64E(id));
        }
        setReq.setOrdersList(Base6ids);
        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token,
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_order_streams, pbHead, setReq);

        return this._socket.send(btReq);
    }

    addParticipant(sClientId:string, sKey:string, sValue:string):number {
        let arr: Entity.ObjectKeyValue = {
            key: sKey,
            value: sValue,
        };

        let ret : Entity.ObjectUser = {
            clientId:sClientId,
            clientKey:"",
            attrs :[],
            status : 0,
            joinTick:0,
            leaveTick:0,
        };

        if (this._preParticipants[sClientId] != undefined) {
            var len = this._preParticipants[sClientId].attrs.length;
            this._preParticipants[sClientId].attrs[len] = arr;
        } else {
            ret.attrs[0] = arr;
            this._preParticipants[sClientId] = ret;
        }

        return 0;
    }

    setParticipantAttr(sClientId:string, sKey:string, sValue:string):number {
        let attr : Entity.ObjectKeyValue = {
            key:sKey,
            value:sValue,
        };

        this._preParticipants[sClientId].attrs.push(attr);

        return 0;
    }

    commitParticipants():number {
        let setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_add_participant);
        let users = setReq.getUsersList();//ProtoHelper.NewProtoObjectArray(obj_name_user);
        for (let key in this._preParticipants) {
            let item : Entity.ObjectUser = this._preParticipants[key];

            let user = ProtoHelper.NewProtoObject(obj_name_user);
            user.setClientid(ProtoHelper.Base64E(item.clientId));
            user.setClientkey(ProtoHelper.Base64E(item.clientId));

            let attrs = user.getAttrsList();//ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
            let itemAttr :any;
            for (itemAttr of item.attrs) {
                let attr =  ProtoHelper.NewProtoObject(obj_name_keyvalue);

                attr.setKey(ProtoHelper.Base64E(itemAttr.key));
                attr.setValue(ProtoHelper.Base64E(itemAttr.value));

                attrs.push(attr);
            }

            user.setAttrsList(attrs);

            users.push(user);
        }

        setReq.setUsersList(users);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token,
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_add_participant, pbHead, setReq);

        this._preParticipants = {};

        return this._socket.send(btReq);
    }

    getSetting(iKey:Entity.ESettingKey):number {
        switch(iKey) {
            case Entity.ESettingKey.kP2pEnable:
                this._videoParser.getKeyInt("p2p", "e", 0);
                break;

            case Entity.ESettingKey.kP2pConnectTimeout:
                this._videoParser.getKeyInt("p2p", "to", 0);
                break;

            case Entity.ESettingKey.kScreenIsVbr:
                this._videoParser.getKeyInt("video_screen", "vbr", 0);
                break;

            case Entity.ESettingKey.kVideoIsVbr:
                this._videoParser.getKeyInt("video_cap", "vbr", 0);
                break;

            case Entity.ESettingKey.kScreenRateWatch:
                this._videoParser.getKeyInt("video_screen", "rw", 0);
                break;

            case Entity.ESettingKey.kVideoRateWatch:
                this._videoParser.getKeyInt("video_cap", "rw", 0);
                break;

            case Entity.ESettingKey.kReporterId:
                
                break;
        }

        return 0;
    }

    relogin(delay:number, reason:number,closeConn:boolean) {
        if (this._waitRelogin) {
            return;
        }

        this._waitRelogin = true;

        if (closeConn) {
            this._socket.close();
            this._socket.open("");
        } else {
            this._login();
        }
    }

    getNetStatus():Entity.TNetStatus {
        let ret :Entity.TNetStatus = {
            tUp:{    
                snum : 0,
                netlossrate : 0,
                totallossrate : 0,
                band : 0,
                bandn : 0,
            },
            tDown:{
                snum : 0,
                netlossrate : 0,
                totallossrate : 0,
                band : 0,
                bandn : 0,
            },
            rtt:0
        };

        return ret;
    }

 /**
  {
	"cmd": "getconfig",
	"respond": "respond",
	"ecode": "200",
	"rep": "http://120.132.99.205:24002/v1/client/report?",
	"roomid": "88888",
	"clientid": "test001",
	"server": ["120.132.99.205:24004"],
	"stun": {
		"uri": "stun:47.114.49.16:2001"
	},
	"turn": {
		"uri": "turn:47.114.49.16:2002?transport=udp",
		"user": "snail",
		"password": "snail123"
	},
	"loginseq": 22850274,
	"seqmaxspan": 99,
	"serverdata": "H264Enc[level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f]H264Dec[level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f]",
	"vp": "render-smooth[e:1]video_cap[sz:76800,szs:0.5,fps:25,vbr:1,rw:10]screen_cap[sz:921600,szs:0,fps:20,vbr:1,rw:0]p2p[e:0,to:3500]nack[maxrtt:250]enc[hw:0,c16:1,maxw:1600,maxh:1600]dec[hw:0]"
}
     * 
     */
    _loadConfig() {
       let http = new HttpHelper;

        let params =  new Array();
        params.push("cmd=getconfig");
        params.push("roomkey=" + this._roomKey);
        params.push("clientkey=" + this._clientKey);
        params.push("token=" + this._token);
        params.push("version=" + sdk_version);
        // TODO
        if ((typeof (this._authKey) != 'undefined') && ('' != this._authKey)) {
            params.push("authkey=" + this._authKey);
        }

        if (this._attr.bSupportVideo)
            params.push("video=" + "1");

        params.push("deviceid=" + this._pEngine.getDeviceID());
        params.push("deviceinfo=" + this._pEngine.getDeviceInfo());

        let href : string = this._m_domain + "?" +  params.join("&");

        console.log("_loadConfig: ", href);
        http.Open(href, "GET", "");
        http.Send("", (status:number, body : string, context:string):void => {
            if (status != 200) {
                console.log("http query fail status=", status);
                this.commitSimpleEvent(Protos.EEventId.resp_login, status);
                return;
            }

            let ret = JSON.parse(body);
           
            if (ret.ecode != 200) {
                console.log("http get fail  ret = ", ret.ecode);
                this.commitSimpleEvent(Protos.EEventId.resp_login, ret.ecode);
                return;
            }

            this._stun = {
                uri:'',
                user:'',
                password:''
            };

            this._turn = {
                uri:'',
                user:'',
                password:''
            };

            if (typeof(ret.stun) != 'undefined') {
                if (typeof(ret.stun.uri) != 'undefined') {
                    this._stun.uri = ret.stun.uri;
                }

                if (typeof(ret.stun.user) != 'undefined') {
                    this._stun.user = ret.stun.user;
                }

                if (typeof(ret.stun.password) != 'undefined') {
                    this._stun.password = ret.stun.password;
                }
            }

            if (typeof(ret.turn) != 'undefined') {
                if (typeof(ret.turn.uri) != 'undefined') {
                    console.log("typeof(ret.turn.uri) is ",typeof(ret.turn.uri));
                    this._turn.uri = ret.turn.uri;
                }

                if (typeof(ret.turn.user) != 'undefined') {
                    this._turn.user = ret.turn.user;
                }

                if (typeof(ret.turn.password) != 'undefined') {
                    this._turn.password = ret.turn.password;
                } 
            }

            this._clientid = ret.clientid;
            this._servers = [];
            this._token = ret.token;
            this._sessionid = ret.loginseq;
            this._seqMaxSpan = ret.seqmaxspan;
            this._srvData = ret.serverdata;
            this._roomId = ret.roomid;

            if (typeof(ret.ap) != 'undefined') {
                this._audioParam = ret.ap;    
            }
            
            if (typeof(ret.vp) != 'undefined') {
                this._videoParam = ret.vp;    
            }

            let vp : string = ret.vp;
            this._videoParser.setParam(vp);
            if (this._attr.bP2pFlag && this._videoParser.getKeyInt("p2p", "e", 1) != 1) {
                this._attr.bP2pFlag = false;
            }

            console.log("http get result clientid=",
                this._clientid,",sessionid=", this._sessionid,
                ",max sequence=", this._seqMaxSpan,
                ",srv data=", this._srvData);
            
            for (let i of ret.server) {
                console.log("get rtc server addr :",i);
                this._servers.push(i);
            }

            this._socketOpen();
        });

    }

    _socketOpen() {
        if (this._servers.length < 1) {
            console.log("ws server is empty");
            this.commitSimpleEvent(Protos.EEventId.resp_login, -1);
            return;  
        }

        let srvAddr = "ws://" + this._servers[0];  //for online
        // let srvAddr = "ws://172.18.70.30:9008"; //TODO for local test  
        // let srvAddr = "ws://172.18.70.30:9002"; 
        this._socket.close();  
        this._socket.open(srvAddr);
    }

    _login() : number {
        let loginReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_register);
        this._sequence = ++this._sessionid
        let seq = "" + this._sequence
        loginReq.setLoginseq(ProtoHelper.Base64E(seq));
        // loginReq.setVersion(ProtoHelper.Base64E(sdk_version));
        loginReq.setVersion(ProtoHelper.Base64E(sdk_version));
        loginReq.setServerdata(ProtoHelper.Base64E(this._srvData));
        loginReq.setRoomid(ProtoHelper.Base64E(this._roomKey));

        let addrs = this._servers[0].split(":");
        console.log("_login addrs", addrs[0]);
        loginReq.setServerIp(ProtoHelper.Base64E(addrs[0]));  // ServerIp   this._servers[0];

        let pbUser = ProtoHelper.NewProtoObject(obj_name_user);
        pbUser.setClientid(ProtoHelper.Base64E(this._clientid));
        pbUser.setClientkey(ProtoHelper.Base64E(this._clientKey));
        loginReq.setUser(pbUser);
        loginReq.setEpType(3);
        
        if (this._attr.bNotifyFlag) {
            loginReq.setNotify(ProtoHelper.Base64E("true"));
        }
        // if (!this._attr.bOrderFlag) {
        //     loginReq.setOrdermode(ProtoHelper.Base64E("all"));
        // }
        if (this._attr.bOrderFlag) {
            loginReq.setOrdermode(ProtoHelper.Base64E("special&reuse"));
        } else {
            loginReq.setOrdermode(ProtoHelper.Base64E("all&reuse"));
        }

        if (this._attr.bSupportOfflines) {
            let attrs = loginReq.getAttrsList();
            let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
    
            attr.setKey(ProtoHelper.Base64E("offlines"));
            attr.setValue(ProtoHelper.Base64E("1"));
            attrs.push(attr);
            loginReq.setAttrsList(attrs);
        }
        
        if (this._attr.bP2pFlag) {
            let attrs = loginReq.getAttrsList();
            let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
    
            attr.setKey(ProtoHelper.Base64E("p2p"));
            attr.setValue(ProtoHelper.Base64E("1"));
            attrs.push(attr);
            loginReq.setAttrsList(attrs);
        }

        // TODO
        if (this._attr.bSupportVideo) {
            let attrs = loginReq.getAttrsList();
            let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
    
            attr.setKey(ProtoHelper.Base64E("video"));
            attr.setValue(ProtoHelper.Base64E("1"));
            attrs.push(attr);
            loginReq.setAttrsList(attrs);
        }


        console.log("_login send ws login room:", this._roomKey, ",client id:", this._clientid);
        this._socket.sequence = this._sequence;

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence++,
            session: '',
            token : this._token,
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_register, pbHead, loginReq);
        return this._socket.send(btReq);
    }

    _onPacket(cmdid: number,msgType :number, rspHeader :ProtoEntity.TRspHeader, pb:any) : number {
        switch(cmdid) {
            case Protos.Protocol.cmd_ping:
                pb.getTimestamp();
                break;

            case Protos.Protocol.cmd_register: 
                this._onRegesterRsp(rspHeader, pb);

                break;

            case Protos.Protocol.cmd_add_participant:
                this._onAddParticipantRsp(rspHeader, pb);
                break;

            case Protos.Protocol.cmd_setuserattrs: 
                this._onSetUserAttrsRsp(rspHeader, pb);
                break;

            case Protos.Protocol.cmd_setroomattrs: 
                this._onSetRoomAttrsRsp(rspHeader, pb);
 
                break;

            case Protos.Protocol.cmd_update_media:
                this._onUpdateMediaRsp(rspHeader, pb);
                this._onSend = false;

                break;

            case Protos.Protocol.cmd_set_media_attr: 
                this._onSetMediaAttrRsp(rspHeader, pb);

                break;

            case Protos.Protocol.cmd_order_unorder: 
                //nil
                //if (this._observer) {
                //    this._observer.onOrderStreamRsp();
               // }

                break;

            case Protos.Protocol.cmd_order_streams:
                //nil
                //if (this._observer) {
               //     this._observer.onOrderStreamRsp();
                //}
                break;

            case Protos.Protocol.cmd_old_update_media: 
                break;

            case Protos.Protocol.cmd_notify_user_status:
                this._onNotifyUserStatus(pb);

                break;

            case Protos.Protocol.cmd_notify_setuserattrs: 
                this._onNotifySetUserAttrs(pb);
                break;

            case Protos.Protocol.cmd_notify_setroomattrs: 
                this._onNotifySetRoomAttrs(pb);

                break;

            case Protos.Protocol.cmd_notify_media_ctrl: 
                this._onNotifyMediaCtrl(pb);

                break;

            case Protos.Protocol.cmd_notify_webrtc_command: 
                this._onNotifyWebrtcCmd(pb);


                break;

            case Protos.Protocol.cmd_notify_request_relogin: 
                this._onNotifyRelogin(pb);

                break;

            case Protos.Protocol.cmd_notify_bind_streams: 
                this._onNotifyBindStreams(pb);

                break;

            case Protos.Protocol.cmd_notify_error:
                this._onNotifyError(pb); 

                break;

            case Protos.Protocol.cmd_notify_sendmsg:
                this._onNotifySendMsg(pb); 
    
                break;
            default:
                console.log("unknown cmd ", cmdid);
                break;
        }

        return 0;
    }

    private _onRegesterRsp(rspHeader : ProtoEntity.TRspHeader, pb:any) {
        //respond_register
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_login, rspHeader.errCode);
            return;
        }

        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_login);

        let usersEvent = new ArrayObjImpl();
        let attrsEvent = new BaseEventImpl();

        let attrs = pb.getAttrsList();
        let users = pb.getUsersList();

        let retAttrs : Entity.ObjectKeyValue[] = [];
        let retUsers : Entity.ObjectUser[] = [];
        if (attrs.length > 0) {
            this._attrMaps.clear();

            let attr: any;
            console.log("_onRegesterRsp attrs.length=", attrs.length);
            for (attr of attrs) {
                let item = getPbObjectAttr(attr);

                if (item.key != "dtls" && item.key != "srtp") {
                    retAttrs.push(item);
                }
                
                this._attrMaps.set(item.key, item.value);
            }
        }

        if (this._attrMaps.has("p2p") && this._attrMaps.getItem("p2p") != "0") {
            this._attr.bP2pFlag = true;
        } else {
            this._attr.bP2pFlag = false;
        }

        if (this._attrMaps.has("dtls") && this._attrMaps.getItem("dtls") != "0") {
            this._bDtls = true;
        } else {
            this._bDtls = false;
        }

        if (this._attrMaps.has("srtp") && this._attrMaps.getItem("srtp") != "0") {
            this._bSrtp = true;
        } else {
            this._bSrtp = false;
        }

        if (this._attrMaps.has("offlines") && this._attrMaps.getItem("offlines") != "0") {
            this._attr.bSupportOfflines = true;
        } else {
            this._attr.bSupportOfflines = false;
        }
        // TODO
        if (this._attrMaps.has("video") && this._attrMaps.getItem("video") != "0") {
            this._attr.bSupportVideo = true;
        } else {
            this._attr.bSupportVideo = false;
        }

        if (users.length > 0) {
            let user: any;
            
            for (user of users) {
                let pbUser = getPbObjectUser(user);
                retUsers.push(pbUser);
                // if (this._attr.bP2pFlag) {
                //     if (user.status == Protos.EUserStatus.st_online) {
                //         let pf = <PeerInf>{};
                //         pf.peer = this._pEngine.createPeer(user.clientId, false);
                //         this._peers.set(user.clientId, pf);
                //     }
                // }

            }

        }

        for (let idx = 0; idx < retUsers.length; idx++) {
            usersEvent.addObj(makeObjUser(retUsers[idx]));
        }

        for (let idx = 0; idx < retAttrs.length; idx++) {
            let sKey : string = retAttrs[idx].key;
            let sValue : string = retAttrs[idx].value;

            if (sKey != "dtls" && sKey != "srtp") {
                attrsEvent.put(sKey, sValue);
            }
        }

        event.putOjb(IRtcEng.ETypeObjs.obj_type_atrrs, attrsEvent);
        event.putArrayOjb(IRtcEng.ETypeObjs.obj_type_users, usersEvent);
        this._events.push(event);


        let tp :IRtcEng.TParams = {
            pSink: this,
            csid:this._clientid,
            p2pflag: this._attr.bP2pFlag,
            enable_srtp: this._bSrtp,
            enable_dtls: this._bDtls,
            video_sz: this._videoParser.getKeyInt("video_cap","sz", 320 * 240),
            video_small_sc: this._videoParser.getKeyFloat("video_cap","szs", 0.0),
            video_fps: this._videoParser.getKeyInt("video_cap","fps", 25),
            screen_sz: this._videoParser.getKeyInt("screen_cap","sz", 1280 * 720),
            screen_small_sc: this._videoParser.getKeyFloat("screen_cap","szs", 0.0),
            screen_fps: this._videoParser.getKeyInt("screen_cap","fps", 20),
            stun: {uri:this._stun.uri,usr:this._stun.user,pwd:this._stun.password},
            turn: {uri:this._turn.uri,usr:this._turn.user,pwd:this._turn.password}, 
        };

        if (tp.video_small_sc > 0.9) 
            tp.video_small_sc = 0.0;

        if (tp.screen_small_sc > 0.9)
            tp.screen_small_sc = 0.0; 

       console.log("_onRegesterRsp _videoParser=", this._videoParser.getStr());
        this._pEngine.openEngine(tp);

        // if ("" != this._videoParser.getStr()) {
        //     this._pEngine.getPeerCfg().setPeerKeyValueParams("video", this._videoParser.getStr());
        // }
        this._logined = true;

        let dftSendParam : TStateItem = {
            dbgSendFlag : false,
            disableUi:false ,
            waitResp:0,
            changed:false,
        }
        let VideodftSendParam : TStateItem = {
            dbgSendFlag : false,
            disableUi:false ,
            waitResp:0,
            changed:false,
        }
        let Video1dftSendParam : TStateItem = {
            dbgSendFlag : false,
            disableUi:false ,
            waitResp:0,
            changed:false,
        }
        if (!this._attr.bP2pFlag) {
            let peer : PeerInf = {
                peer : null,
                bSetPeerParams : false,
                bGotLocalParams: false,
                runningState:0,
                curState : 0,
                bPublishing:false,
                webrtcState:0,              
                sendVideo:VideodftSendParam,
                sendVideo1:Video1dftSendParam,
                sendAudio:dftSendParam,
            };

            peer.webrtcState = EWebrtcState.kRtcStateWaitOffer;
            peer.peer = this._pEngine.createPeer(SVRID, true);
            // peer.peer = this._pEngine.createPeer(SVRID, false);
            this._peers.set(SVRID, peer);

            if ("" != this._videoParser.getStr()) {
                peer.peer.setPeerKeyValueParams("video", this._videoParser.getStr());
            }
        }
    }

    private _onAddParticipantRsp(rspHeader : ProtoEntity.TRspHeader, pb:any) {
        //respond_add_participant
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_add_participants, rspHeader.errCode);
            return;
        }

        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_add_participants);
        
        let ret : Entity.ObjectUser[] = [];
        
        if (pb) {
            let users:any = pb.getUsersList();
            let objUsers = new ArrayObjImpl();
            if (users.length > 0) {
                let user: any;
                
                for (user of users) {
                    let pbUser = getPbObjectUser(user);
    
                    ret.push(pbUser);

                    //ObjUserToUser

                    objUsers.addObj(makeObjUser(pbUser));
                }
            }

            event.putArrayOjb(IRtcEng.ETypeObjs.obj_type_users, objUsers);
        }
    } 

    private _onSetUserAttrsRsp(rspHeader : ProtoEntity.TRspHeader, pb:any) {
        if (typeof(this._userAttrReqs[rspHeader.sequence]) == 'undefined') {
            return;
        }

        let req = this._userAttrReqs[rspHeader.sequence];
        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_setuser_attr);

        event.put(Protos.EEventKey.eKeyClientID, Utils.uint8ToString(req.getClientid()));

        if (rspHeader.errCode != 0) {
            event.put(Protos.EEventKey.eKeyErrCode, rspHeader.errCode);

            this._events.push(event);
            return;
        }

        let attrs = req.getAttrsList();
        for (let attr of attrs) {
            let item = getPbObjectAttr(attr);

            event.put(item.key, item.value);
        }

        this._events.push(event);
    }

    private _onSetRoomAttrsRsp(rspHeader : ProtoEntity.TRspHeader, pb:any) {
        //respond_setroomattrs
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_setroom_attr, rspHeader.errCode);
            return;
        }

        let attrs : any = pb.getAttrsList();
        let attr : any;
        let ret : Entity.ObjectKeyValue[] = [];
        for (attr of attrs) {
            let retAttr = getPbObjectAttr(attr);

            ret.push(retAttr);
        }

        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_setroom_attr);
        
        for (let a of ret) {
            event.put(a.key, a.value);
            this._attrMaps.set(a.key, a.value);
        }

        this._events.push(event);
    }

    private _onUpdateMediaRsp(rspHeader : ProtoEntity.TRspHeader, pb:any) {
        //respond_update_media
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_publish_media, rspHeader.errCode);
            return;
        }

        if (this._attr.bP2pFlag) return;

        let pf = this.findPeerId(SVRID);
        if (!pf) return;
        
        if (pf.runningState == pf.curState) {
            let req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_webrtc_command);
            this.sendCommand(Protos.Protocol.cmd_notify_cancel_publish, req, false);
            return;
        }

        let sendType : number = 0;
        let stopType : number = pf.runningState;

        if (0 != (pf.runningState&Entity.EStreamType.kAudio) && 0 == (pf.curState&Entity.EStreamType.kAudio))
            stopType |= Entity.EStreamType.kAudio; 
        else if (0 == (pf.runningState&Entity.EStreamType.kAudio) && 0 != (pf.curState&Entity.EStreamType.kAudio))
            sendType |= Entity.EStreamType.kAudio; 

        if (0 != (pf.runningState&Entity.EStreamType.kVideo) && 0 == (pf.curState&Entity.EStreamType.kVideo))
            stopType |= Entity.EStreamType.kVideo;
        else if (0 == (pf.runningState&Entity.EStreamType.kVideo) && 0 != (pf.curState&Entity.EStreamType.kVideo))
            sendType |= Entity.EStreamType.kVideo;

        pf.webrtcState |= EWebrtcState.kRtcStateWaitOffer;
        pf.runningState = pf.curState;

        pf.peer.synStreamTypes(sendType, stopType, this._clientid);

        this._peers.set(SVRID, pf);

        // let medias : any = pb.getMediasList();
        // let media:any;
        // let ret : Entity.ObjectMedia[] = [];
        // for (media of medias) {
        //     ret.push(getPbObjectMedia(media));
        // }
        
        // if (this._observer) {
        //     this._observer.onUpdateMediaRsp(ret);
        // }
    }

    private _onSetMediaAttrRsp(rspHeader : ProtoEntity.TRspHeader, pb:any) {
        if (rspHeader.errCode != 0) {
            //this.commitSimpleEvent(Protos.EEventId.resp_publish_media, rspHeader.errCode);
            return;
        }

        if (this._attr.bP2pFlag) return;

        let media : any = pb.getMedia();

        let pf = this.findPeerId(SVRID);
        if (!pf) return;

        let item = getPbObjectMedia(media);

        if (item.name == "video") {
            pf.sendVideo.waitResp = 0;
        } else if (item.name == "video1") {
            pf.sendVideo1.waitResp = 0;
        } else if (item.name == "audio") {
            pf.sendAudio.waitResp = 0;
        } else {
            return;
        }

        pf = this._commitMediaAttrChanged(pf);
        this._peers[SVRID] = pf;
    }

    private _onNotifyUserStatus(pb:any) {
        //notify_user_status
        let users:any = pb.getUsersList();
        let ret : Entity.ObjectUser[] = [];
        if (users.length > 0) {
            let user: any;
            
            for (user of users) {
                let pbUser = getPbObjectUser(user);

                ret.push(pbUser);
            }
        }

        if (this._attr.bP2pFlag) {
            for (let u of ret) {
                if (u.status == Protos.EUserStatus.st_online) {
                    let pf = <PeerInf>{};
                    
                    pf.peer = this._pEngine.createPeer(u.clientId, false);

                    this._peers.set(u.clientId, pf);
                } else {
                    let pf = this.findPeerId(u.clientId);
                    if (!pf) continue;

                    this._pEngine.destroyPeer(pf.peer);
                    this._peers.del(u.clientId);
                }
            }
        } 

        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.ntf_status_chaned);

        for (let u of ret) {
            event.put(Protos.EEventKey.eKeyClientID, u.clientId);
            event.put(Protos.EEventKey.eKeyClientKey, u.clientKey);
            event.put(Protos.EEventKey.eKeyStatus, u.status);

            for (let a of u.attrs) {
                event.put(a.key, a.value);
            }
        }

        this._events.push(event);
    }

    private _onNotifySetUserAttrs(pb:any) {
        //notify_setuserattrs
        let clientid:string = Utils.uint8ToString(pb.getClientid());

        let attrs = pb.getAttrsList();
        let ret : Entity.ObjectKeyValue[] = [];

        for (let idx = 0; idx < attrs.length; idx++) {
            let attr = attrs[idx];
            let retAttr = getPbObjectAttr(attr);

            ret.push(retAttr);
        }

        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.ntf_setuser_attr);
        event.put(Protos.EEventKey.eKeyClientID, clientid);
        for (let attr of ret) {
            event.put(attr.key, attr.value);
        }

        this._events.push(event);
    }

    private _onNotifySetRoomAttrs(pb:any) {
        //notify_setroomattrs
        let attrs:any = pb.getAttrsList();
        let ret : Entity.ObjectKeyValue[] = [];

        if (attrs.length > 0) {
            let attr : any;
            
            for (attr of attrs) {
                let retAttr = getPbObjectAttr(attr);
    
                ret.push(retAttr);
            }
        }

        let event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.ntf_setroom_attr);
        for (let a of ret) {
            event.put(a.key, a.value);
            this._attrMaps.set(a.key, a.value);
        }

        this._events.push(event);
    }

    private _onNotifyMediaCtrl(pb:any) {
        //notify_media_ctrl
        let actions : number[] = pb.getActionsList();
        let paramList :Uint8Array[] = pb.getParamsList();
        let params =  Utils.uint8ArrayToStrArray(paramList);

        let pf = this.findPeerId(SVRID);
        if (!pf) return;
        let peer = pf.peer;

        for (let act of actions) {
            switch(act) {
                case Protos.EMediaCtrlActs.ctrl_act_sendvideo:
                    pf.sendVideo.dbgSendFlag = true;
                    peer.pauseSend(Entity.EStreamType.kVideo, false);

                    pf.peer = peer;
                    this._peers.set(SVRID, pf);
                    break;

                case Protos.EMediaCtrlActs.ctrl_act_pausevideo:
                    pf.sendVideo.dbgSendFlag = false;
                    peer.pauseSend(Entity.EStreamType.kVideo, true);
                    
                    pf.peer = peer;
                    this._peers.set(SVRID, pf);
                    break;

                case Protos.EMediaCtrlActs.ctrl_act_sendaudio:
                    pf.sendAudio.dbgSendFlag = false;
                    peer.pauseSend(Entity.EStreamType.kAudio, false);
                    
                    pf.peer = peer;
                    this._peers.set(SVRID, pf);
                    break;

                case Protos.EMediaCtrlActs.ctrl_act_pauseaudio:
                    pf.sendAudio.dbgSendFlag = true;
                    peer.pauseSend(Entity.EStreamType.kAudio, true);
                    
                    pf.peer = peer;
                    this._peers.set(SVRID, pf);
                    break;

                case Protos.EMediaCtrlActs.ctrl_act_sendvideo1:
                    pf.sendVideo1.dbgSendFlag = true;
                    peer.pauseSend(Entity.EStreamType.kVideo1, false);
                    
                    pf.peer = peer;
                    this._peers.set(SVRID, pf);
                    break;

                case Protos.EMediaCtrlActs.ctrl_act_pausevideo1:
                    pf.sendVideo1.dbgSendFlag = false;
                    peer.pauseSend(Entity.EStreamType.kVideo1, true);
                    
                    pf.peer = peer;
                    this._peers.set(SVRID, pf);
                    break;
            }
        }
    }

    private _onNotifyWebrtcCmd(pb:any) {
        //notify_webrtc_command
        let fromid:string = SVRID;//
        let toid : string = Utils.uint8ToString(pb.getToid());
        let msgType: string = Utils.uint8ToString(pb.getMsgtype());
        let rtcmsg : any = pb.getRtcmsg();
        let mline :string = Utils.uint8ToString(rtcmsg.getMline());
        if(typeof mline == "undefined" || mline == null || mline == "") {
              mline = '0';
        } 
        // let mline :string = rtcmsg.getMlineIndex();
        let mlineidx : number = rtcmsg.getMlineIndex();
        let sdp : string =  Utils.uint8ToString(rtcmsg.getSdp()); 
        console.log('_onNotifyWebrtcCmd setRemoteDescription sdp:==>'+sdp);

        let peerParam :string = Utils.uint8ToString(rtcmsg.getPeerParams());

        if (this._attr.bP2pFlag) {
            fromid = Utils.uint8ToString(pb.getFromid());
        }

        let peer = this.findPeerId(fromid);
        if (!peer) return;

        if (msgType == RTCSdkClient.cmd_webrtc_ice) {
            peer.peer.addIceCandidate(mline, mlineidx, sdp);
        } else {
            if (!peer.bSetPeerParams) {
                peer.bSetPeerParams = true;

                this._peers.set(fromid, peer);
                if (peerParam != "") {
                    peer.peer.setPeerParams(peerParam);
                    // this._pEngine.getPeerCfg().setPeerParams(peerParam);
                }
            }

            let sdpType : number = 0;
            if (msgType == RTCSdkClient.cmd_webrtc_offer) {
                sdpType = IRtcEng.ESdpType.kOffer;
                peer.webrtcState |= EWebrtcState.kRtcStateWaitAnswer;
            } else if (msgType == RTCSdkClient.cmd_webrtc_answer) {
                sdpType = IRtcEng.ESdpType.kAnswer;
            } else if (msgType == RTCSdkClient.cmd_webrtc_preanswer) {
                sdpType = IRtcEng.ESdpType.kPreAnswer;
            } else {
                return;
            }

            peer.peer.setRemoteDescription(sdpType, sdp);

            this._peers.set(fromid, peer);
        }
    }

    private _onNotifyRelogin(pb:any) {
        //notify_request_relogin
        let reason : number = pb.getReson();
        if (this._netStatus == ENetStatus.st_runing) {
            this.relogin(0, reason, false);
        }
    }

    private _onNotifyBindStreams(pb:any) {
        //notify_bind_streams
        console.log("_onNotifyBindStreams _reuseFlag=", this._reuseFlag);
        if (this._engineError || !this._reuseFlag) {
            return;
        }

        let peer = this.findPeerId(SVRID);
        if (!peer) return;

        let rmMedias = new MapUtil.MyMap<string, TMedia>();
        let newMedias :TMedia[] = [];

        this._medias.forEach((k, v) => {
            rmMedias.set(k, v);
        });

        if (null != pb) {
        let streams = pb.getStreamsList();
        let attr : any;
        let ret : Entity.ObjectKeyValue[] = [];

        for (attr of streams) {
            let retAttr = getPbObjectAttr(attr);
            let csid = trimMediaType(retAttr.key);
            let mediaId = retAttr.value;

            if (rmMedias.has(mediaId)) {
                let item = rmMedias.getItem(mediaId);

                if (item.bindId == csid) {
                    rmMedias.del(csid);
                    continue;
                }

                if (item.streamId != "") {
                    if (item.bindId != "") {
                        this._pEngine.onRemoveStream(item.streamId, item.streamType, 
                            item.token, item.bindId, peer.peer);
        
                        this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyClientID,
                            item.bindId, Protos.EEventKey.eKeyMediaType, item.szStreamType);    
                    }
                    
                    newMedias.push(item);
                } 
                rmMedias.del(mediaId);
                item.bindId = csid;
            } else {
                let item : TMedia;
                item.bindId = csid;
                this._medias.set(mediaId, item);
            }
        }
        }

        rmMedias.forEach((k, v) => {
            if (v.streamId == "") {
                this._medias.del(k);
            } else {
                if (v.bindId != "") {
                    this._pEngine.onRemoveStream(v.streamId, v.streamType,
                        v.token, v.bindId, peer.peer);
                    
                    this.commitEvent(Protos.EEventId.ntf_removed_stream,
                        Protos.EEventKey.eKeyClientID, v.bindId, Protos.EEventKey.eKeyMediaType,
                        v.szStreamType);
                    v.bindId = "";
                }
            }
        });

        for (let media of newMedias) {
            this._pEngine.onAddStream(media.streamId, media.streamType,
                media.token, media.bindId, peer.peer);

                console.log("_onNotifyBindStreams::onAddStream bindId= ", media.bindId, 
                " streamType= ", media.streamType,
                " streamid= ", media.streamId,
                 " token= ", media.token);
            this.commitEvent(Protos.EEventId.ntf_added_stream,Protos.EEventKey.eKeyClientID,
                media.bindId, Protos.EEventKey.eKeyMediaType, media.szStreamType);
        }
    }

    private _onNotifyError(pb:any) {
        //notify_error
        let ec : number = pb.getEc();
        let subec : number = pb.getSubec();
        let cmd : number = pb.getCmd();

        switch(ec) {
            case Protos.ErrorCode.ec_connect_lost:
                this.commitSimpleEvent(Protos.EEventId.ntf_netlost, 0);
                break;

            case Protos.ErrorCode.ec_asyn_logined:
                this.commitSimpleEvent(Protos.EEventId.ntf_asynlogined, 0);
                break;

            default:
                break;
        }
    }
    
    private _commitMediaAttrChanged(pf : PeerInf) :PeerInf {
        if (pf.sendVideo.changed && !pf.sendVideo.waitResp) {
            return this._sendMediaAttrChanged(pf, Entity.EStreamType.kVideo);
        }

        if (pf.sendVideo1.changed && !pf.sendVideo1.waitResp) {
            return this._sendMediaAttrChanged(pf, Entity.EStreamType.kVideo1);
        }

        if (pf.sendAudio.changed && !pf.sendAudio.waitResp) {
            return this._sendMediaAttrChanged(pf, Entity.EStreamType.kAudio);
        }

        return pf;
    }

    private _sendMediaAttrChanged(pf : PeerInf, iType :number) :PeerInf {
        if (this.isP2p()) {
            if (iType == Entity.EStreamType.kVideo) {
                pf.sendVideo.changed = false;
                pf.sendVideo.dbgSendFlag = !pf.sendVideo.disableUi;

                pf.peer.pauseSend(iType, pf.sendVideo.disableUi);
            } else if (iType == Entity.EStreamType.kAudio) {
                pf.sendAudio.changed = false;
                pf.sendAudio.dbgSendFlag = !pf.sendAudio.disableUi;

                pf.peer.pauseSend(iType, pf.sendAudio.disableUi);
            } else {
                return pf;
            }

            return pf;
        } 

        if (iType != Entity.EStreamType.kVideo && iType != Entity.EStreamType.kVideo1 &&
            iType != Entity.EStreamType.kAudio) {
                return pf;
        }

        let req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_set_media_attr);
        let media = ProtoHelper.NewProtoObject(obj_name_media);

        if (iType == Entity.EStreamType.kVideo) {
            media.setName(Utils.base64Encode("video"));
            let vs = pf.peer.getVideoSize();
            let attrs = media.getAttrsList();
            if (vs.width * vs.height > 0) {
                let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("w"));
                attr.setValue(Utils.base64Encode(vs.width.toString()));
                attrs.push(attr);

                attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("h"));
                attr.setValue(Utils.base64Encode(vs.height.toString()));
                attrs.push(attr);

                attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("fps"));
                attr.setValue(Utils.base64Encode(vs.fps.toString()));
                attrs.push(attr);

                media.setDisabled(pf.sendVideo.disableUi);
            } else {
                let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("w"));
                attr.setValue(Utils.base64Encode("0"));
                attrs.push(attr);

                attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("h"));
                attr.setValue(Utils.base64Encode("0"));
                attrs.push(attr);

                media.setDisabled(1);
            }

            media.setAttrsList(attrs);
            req.setMedia(media);

            pf.sendVideo.waitResp = 1;
            pf.sendVideo.changed = false;
        } else if (iType == Entity.EStreamType.kVideo1){
            media.setName(Utils.base64Encode("video_1"));

            let vs = pf.peer.getVideoSize1();
            let attrs = media.getAttrsList();
            if (vs.width * vs.height > 0) {
                let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("w"));
                attr.setValue(Utils.base64Encode(vs.width.toString()));
                attrs.push(attr);

                attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("h"));
                attr.setValue(Utils.base64Encode(vs.height.toString()));
                attrs.push(attr);

                attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("fps"));
                attr.setValue(Utils.base64Encode(vs.fps.toString()));
                attrs.push(attr);

                media.setDisabled(pf.sendVideo.disableUi);
            } else {
                let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("w"));
                attr.setValue(Utils.base64Encode("0"));
                attrs.push(attr);

                attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(Utils.base64Encode("h"));
                attr.setValue(Utils.base64Encode("0"));
                attrs.push(attr);

                media.setDisabled(1);
            }

            media.setAttrsList(attrs);
            req.setMedia(media);

            pf.sendVideo1.waitResp = 1;
            pf.sendVideo1.changed = false;
        } else {
            media.setName(Utils.base64Encode("audio"));
            media.setDisabled(pf.sendAudio.disableUi);
            req.setMedia(media);
            pf.sendAudio.waitResp = 1;
            pf.sendAudio.changed = false;
        }

        this.sendCommand(Protos.Protocol.cmd_set_media_attr, req, true);

        return pf;
    }

    private _onNotifySendMsg(pb:any) {
        let header = pb.header;
        let body = pb.body;

        let msgs = body.getMsgList();
        let from:string = Utils.uint8ToString(header.getFrom());

        for (let i = 0; i < msgs.length; i++) {
            let msg = msgs[i];

            let clientKey :string = Utils.uint8ToString(msg.getClientkey());
            let data : string = Utils.uint8ToString(msg.getMsgdata());
            let token :string = Utils.uint8ToString(msg.getToken());

            let event = new BaseEventImpl();
            let evetnId : number = Protos.EEventId.ntf_recv_msg;
            event.setEventId(evetnId);
    
            event.put(Protos.EEventKey.eKeyClientID, from);
            event.put(Protos.EEventKey.eKeyClientKey, clientKey);
            event.put(Protos.EEventKey.eKeyToken, token);
            event.put(Protos.EEventKey.eKeySize, data.length);
            event.put(Protos.EEventKey.eKeyData, data);
            console.log("commitSimpleEvent eventId=", evetnId, event);
            
            this._events.push(event);
        }
    }
   
    findPeerId(csId:string) : PeerInf {
        return this._peers.getItem(csId);
    }

    // getEngine() : IRtcEng.IWebRtcEngine {
    //     return this._pEngine;
    // }

    poll():RTCSdkClient.IBaseEvent[] {
        if (this._events.length < 1) {
            return null;
        }

        let rs= this._events.slice();
        this._events = [];

        return rs;
    }

      //@mark
    //private declare
    private _sequence : number = 0;
    private _m_domain : string;
    private _authKey : string = "";
    private _m_svrtype : Entity.EUrlType;
    private  _attr :Entity.TLoginAttr;
    private _clientKey :string;
    private _roomKey : string;
    private _roomId : string;
    private _socket : WSHelper = null;
    private _clientid : string = "";
    private _servers : string[] = [];
    private _stun : TurnServer = null;
    private _turn : TurnServer = null;
    private _token : string = '';
    private _sessionid : number = 0;
    private _seqMaxSpan : number = 0;
    private _srvData : string = '';
    private _audioParam : string = '';
    private _videoParam:string = '';
    //private _observer :RTCSdkClient.IRtcObserver = null;
    private _preParticipants :Object = {};
    private _bDtls :boolean = false;
    private _bSrtp : boolean = false;
    private _reuseFlag:boolean = true;   // TODO
    private _bNetDisable : boolean = false;
    private _waitRelogin : boolean = false;
    private _videoParser : ParseParameter = new ParseParameter();
    private _logined : boolean = false;
    private _engineError: boolean = false;
    private _netStatus:number = 0;
    private _events :BaseEventImpl [] = [];

    private _attrMaps : MapUtil.MyMap<string,string> = null;
    private _peers : MapUtil.MyMap<string,PeerInf> = null; 
    private _medias : MapUtil.MyMap<string,TMedia> = null;

    private static _instance : RtcClientImpl = null;
};

export function NewRtcClient() : RTCSdkClient.IRtcClient {
    return RtcClientImpl.getInstance();
}