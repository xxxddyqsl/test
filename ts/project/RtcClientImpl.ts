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

const http_server_url : string = "http://120.132.99.205:24002";
const sdk_version : string = "20210610";
const obj_name_keyvalue : string = "object_keyvalue";
const obj_name_user : string = "object_user";
const obj_name_rtcmsg : string = "object_webrtc_msg";
const obj_name_media : string = "object_media";

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
    ret.joinTick = user.getJointime();
    ret.leaveTick = user.getLeavetime();

    if (user.getAttrsList().length > 0) {
        let attr : any;
        for (attr of user.getAttrsList()) {
            ret.attrs.push(getPbObjectAttr(attr));
        }
    }

    return ret;
}

class RtcClientImpl implements RTCSdkClient.IRtcClient, WsEntity.MsgEntity {
    static getInstance() : RTCSdkClient.IRtcClient {
        if (RtcClientImpl._instance == null) {
            RtcClientImpl._instance = new RtcClientImpl();
        }
        
        return RtcClientImpl._instance;
    }

    constructor() {
        this._socket = new WSHelper;
        this._cfgUrl = http_server_url;
        this._socket.setCallback(this);
    }

    OnNetStatus(iStatus: number, iReason: number): void {

        if (iStatus == 2) {
            this._login()
        }
    }

    OnMessage(pkt:any): number {
        if (pkt.rspHeader) {
            console.log("OnMessage cmd=",pkt.cmdid,",msgType=",pkt.msgType,
                ",rspHeader=", pkt.rspHeader, ",pb=", pkt.pb);
        } else {
            console.log("OnMessage cmd=",pkt.cmdid,",msgType=",pkt.msgType,
                ",pb=", pkt.pb);
        }

        return this._onPacket(pkt.cmdid, pkt.msgType, pkt.RspHeader, pkt.pb);
    }

    setObserver(observer:RTCSdkClient.IRtcObserver):void {
        this._observer = observer;
    }

    setUrl(cfgUri:string, eType:Entity.EUrlType):void {
        if (cfgUri == '') {
            cfgUri = http_server_url;
        }

        this._cfgUrl = cfgUri;
        this._urlType = eType;
    }

    login(clientKey:string, roomKey:string, tLoginParam : Entity.TLoginAttr):number {
        this._clientKey = clientKey;
        this._attr = tLoginParam;
        this._roomKey = roomKey;

        this._loadConfig();

        return 0;
    }

    logout():number {
        this._socket.close();
        return 0;
    }

    send(sendFlag : boolean, streamType:Entity.EStreamType, clientId:string):number {
        return 0;
    }

    isP2p():boolean {
        return this._attr.bP2pFlag;
    }

    isSupportOfflines():boolean {
        return this._attr.bSupportOfflines;
    }

    setRoomAttr(sKey:string, sValue:string):number {
        let setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS);

        let objAttrs = ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);
        setReq.setAttrsList(objAttrs);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence,
            session: '',
            token : ''
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setroomattrs, pbHead, setReq);
        return this._socket.send(btReq);
    }

    setUserAttr(sClientId:string, sKey:string, sValue:string):number {
        let setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS);

        let objAttrs = ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        let attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);

        setReq.setClientid(ProtoHelper.Base64E(sClientId));
        setReq.setAttrsList(objAttrs);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence,
            session: '',
            token : ''
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setuserattrs, pbHead, setReq);

        return this._socket.send(btReq);
    }

    orderStream(sClientId:string):number {
        let ids = sClientId.split(";");

        let setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS);

        setReq.setOrdersList(ids);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence,
            session: '',
            token : ''
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_order_streams, pbHead, setReq);

        return this._socket.send(btReq);
    }

    addParticipant(sClientId:string, sKey:string, sValue:string):number {
        let ret : Entity.ObjectUser = {
            clientId:sClientId,
            clientKey:"",
            attrs :[],
            status : 0,
            joinTick:0,
            leaveTick:0,
        };

        this._preParticipants[sClientId] = ret;

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
        let setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT);
        let users = ProtoHelper.NewProtoObjectArray(obj_name_user);
        for (let key in this._preParticipants) {
            let item : Entity.ObjectUser = this._preParticipants[key];

            let user = ProtoHelper.NewProtoObject(obj_name_user);
            user.setClientid(ProtoHelper.Base64E(item.clientId));
            user.setClientkey(ProtoHelper.Base64E(item.clientId));

            let attrs = ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
            let itemAttr :any;
            for (itemAttr of item.attrs) {
                let attr =  ProtoHelper.NewProtoObject(obj_name_keyvalue);

                attr.setKey(ProtoHelper.Base64E(itemAttr.key));
                attr.setValue(ProtoHelper.Base64E(itemAttr.value));

                attrs.push(attr);
            }

            users.push(user);
        }

        setReq.setUsersList(users);

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence,
            session: '',
            token : ''
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_add_participant, pbHead, setReq);

        this._preParticipants = {};

        return this._socket.send(btReq);
    }

    getSetting(iKey:Entity.ESettingKey):number {
        return 0;
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

    // init(cfgUri:string, client : ClientInfo, observer:IRtcObserve): number {
    //     if (client.clientKey == "") {
    //         return 1;
    //     }

    //     if (cfgUri == '') {
    //         cfgUri = http_server_url;
    //     }

    //     this._observer = observer;

    //     let http = new HttpHelper;

    //     let params =  new Array();
    //     params.push("cmd=getconfig");
    //     params.push("roomkey=" + client.roomKey);
    //     params.push("clientkey=" + client.clientKey);
    //     params.push("token=" + client.token);
    //     params.push("version=" + client.version);
    //     params.push("deviceid=" + client.deviceId);
    //     params.push("deviceinfo=" + client.deviceInfo);

    //     let href : string = cfgUri + "?" +  params.join("&");

    //     http.Open(href, "GET", "");
    //     http.Send("", (status:number, body : string, context:string):void => {
    //         if (status != 200) {
    //             console.log("http query fail status=", status);
    //             return;
    //         }

    //         let ret = JSON.parse(body);
           
    //         if (ret.ecode != 200) {
    //             console.log("http get fail  ret = ", ret.ecode);
    //             return;
    //         }

    //         this._clientid = ret.clientid;
    //         this._servers = [];
    //         this._stun = ret.stun;
    //         this._turn =  ret.turn;
    //         this._token = ret.token;
    //         this._sessionid = ret.loginseq;
    //         this._seqMaxSpan = ret.seqmaxspan;
    //         this._srvData = ret.serverdata;

    //         console.log("http get result clientid=",
    //         this._clientid,",sessionid=", this._sessionid,
    //         ",max sequence=", this._seqMaxSpan,
    //         ",srv data=", this._srvData);
            
    //         for (let i of ret.server) {
    //             console.log("get rtc server addr :",i);
    //             this._servers.push(i);
    //         }

    //         this.socketOpen();
    //     });

    //     return 0;
    // }

    _loadConfig() {
       let http = new HttpHelper;

        let params =  new Array();
        params.push("cmd=getconfig");
        params.push("roomkey=" + this._roomKey);
        params.push("clientkey=" + this._clientKey);
        params.push("token=" + this._token);
        params.push("version=" + sdk_version);
        params.push("deviceid=" + this._deviceId);
        params.push("deviceinfo=" + this._deviceInfo);

        let href : string = this._cfgUrl + "?" +  params.join("&");

        http.Open(href, "GET", "");
        http.Send("", (status:number, body : string, context:string):void => {
            if (status != 200) {
                console.log("http query fail status=", status);
                return;
            }

            let ret = JSON.parse(body);
           
            if (ret.ecode != 200) {
                console.log("http get fail  ret = ", ret.ecode);
                return;
            }

            this._clientid = ret.clientid;
            this._servers = [];
            this._stun = ret.stun;
            this._turn =  ret.turn;
            this._token = ret.token;
            this._sessionid = ret.loginseq;
            this._seqMaxSpan = ret.seqmaxspan;
            this._srvData = ret.serverdata;

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
            return;
        }

        let srvAddr = "ws://" + this._servers[0]; 
        //let srvAddr = "ws://172.18.70.30:9000"; //TODO for local test
        this._socket.close();
        this._socket.open(srvAddr);
    }

    _login() : number {
        let loginReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_REGISTER);
        this._sequence = ++this._sessionid
        loginReq.setLoginseq(ProtoHelper.MakeNumberUint8Array(this._sequence, 4));
        loginReq.setVersion(ProtoHelper.Base64E("2020082501"));
        loginReq.setServerdata(ProtoHelper.Base64E(this._srvData));
        loginReq.setRoomid(ProtoHelper.Base64E("19491001"));
        let pbUser = ProtoHelper.NewProtoObject(obj_name_user);
        pbUser.setClientid(ProtoHelper.Base64E(this._clientid));
        pbUser.setClientkey(ProtoHelper.Base64E(this._clientKey));
        loginReq.setUser(pbUser);

        console.log("send ws login room:19491001", ",client id:", this._clientid);
        this._socket.sequence = this._sequence;

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this._sequence,
            session: '',
            token : ''
        };
        
        let btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_register, pbHead, loginReq);
        return this._socket.send(btReq);
    }

    _onPacket(cmdid: number,msgType :number, rspHeader :ProtoEntity.TPacket, pb:any) : number {
        switch(cmdid) {
            case proto.snail_video.media.eCmdC2S.CMD_PING:
                pb.getTimestamp();
                break;

            case proto.snail_video.media.eCmdC2S.CMD_REGISTER: 
                this._onRegesterRsp(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT:
                this._onAddParticipantRsp(pb);
                break;

            case proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS: 
                if (this._observer) {
                    this._observer.onSetUserAttrRsp();
                }
                //nil
                break;

            case proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS: 
                this._onSetRoomAttrsRsp(pb);
 
                break;

            case proto.snail_video.media.eCmdC2S.CMD_UPDATE_MEDIA:
                this._onUpdateMediaRsp(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_SET_MEDIA_ATTR: 
                this._onSetMediaAttrRsp(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_ORDER_UNORDER: 
                //nil
                if (this._observer) {
                    this._observer.onOrderStreamRsp();
                }

                break;

            case proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS:
                //nil
                if (this._observer) {
                    this._observer.onOrderStreamRsp();
                }
                break;

            case proto.snail_video.media.eCmdC2S.CMD_OLD_UPDATE_MEDIA: 
                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_USER_STATUS:
                this._onNotifyUserStatus(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SETUSERATTRS: 
                this._onNotifySetUserAttrs(pb);
                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SETROOMATTRS: 
                this._onNotifySetRoomAttrs(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_MEDIA_CTRL: 
                this._onNotifyMediaCtrl(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_WEBRTC_COMMAND: 
                this._onNotifyWebrtcCmd(pb);


                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_REQUEST_RELOGIN: 
                this._onNotifyRelogin(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_BIND_STREAMS: 
                this._onNotifyBindStreams(pb);

                break;

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_ERROR:
                this._onNotifyError(pb); 

                break;

            default:
                console.log("unknown cmd ", cmdid);
                break;
        }

        return 0;
    }

    private _sequence : number = 0;
    private _cfgUrl : string;
    private _urlType :Entity.EUrlType ;
    private  _attr :Entity.TLoginAttr;
    private _clientKey :string;
    private _roomKey : string;
    private _socket : WSHelper = null;
    private _clientid : string = "";
    private _servers : string[] = [];
    private _stun : any = null;
    private _turn : any = null;
    private _token : string = '';
    private _deviceId : string = 'web';
    private _deviceInfo:string = '';
    private _sessionid : number = 0;
    private _seqMaxSpan : number = 0;
    private _srvData : string = '';
    private _observer :RTCSdkClient.IRtcObserver = null;
    private _preParticipants  = {};
    
    private static _instance : RtcClientImpl = null;

    private _onRegesterRsp(pb:any) {
        //respond_register
        let attrs = pb.getAttrsList();
        let users = pb.getUsersList();

        let retAttrs : Entity.ObjectKeyValue[] = [];
        let retUsers : Entity.ObjectUser[] = [];
        if (attrs.length > 0) {
            let attr: any;
            console.log("_onRegesterRsp attrs.length=", attrs.length);
            for (attr of attrs) {
                let item = getPbObjectAttr(attr);
                retAttrs.push(item);
            }
        }

        if (users.length > 0) {
            let user: any;
            
            for (user of users) {
                let pbUser = getPbObjectUser(user);
                retUsers.push(pbUser);
            }
        }

        console.log("_onRegesterRsp:", retAttrs, retUsers);
        console.log("retAttrs=", retAttrs);
        console.log("retUsers=", retUsers);

        for (let idx = 0; idx < retAttrs.length; idx++) {
            let sKey : string = retAttrs[idx].key;
            let sValue : string = retAttrs[idx].value;

            console.log("_onRegesterRsp idx=",idx,",key=",sKey,",svalue=",sValue);
        }

        if (this._observer) {
            this._observer.onRegisteRsp(pb.getStartedTime(), pb.getSeverCurrentTime(),
                retAttrs, retUsers);
        }
    }

    private _onAddParticipantRsp(pb:any) {
        //respond_add_participant
        let users:any = pb.getUsersList();

        let ret : Entity.ObjectUser[] = [];
        if (users.length > 0) {
            let user: any;
            
            for (user of users) {
                let pbUser = getPbObjectUser(user);

                ret.push(pbUser);
            }
        }

        if (this._observer) {
            this._observer.onAddParticipantRsp(ret);
        }
    } 

    private _onSetRoomAttrsRsp(pb:any) {
        //respond_setroomattrs
        let attrs : any = pb.getAttrsList();
        let attr : any;
        let ret : Entity.ObjectKeyValue[] = [];
        for (attr of attrs) {
            let retAttr = getPbObjectAttr(attr);

            ret.push(retAttr);
        }

        if (this._observer) {
            this._observer.onSetRoomAttrRsp(ret);
        }
    }

    private _onUpdateMediaRsp(pb:any) {
        //respond_update_media
        let medias : any = pb.getMediasList();
        let media:any;
        let ret : Entity.ObjectMedia[] = [];
        for (media of medias) {
            ret.push(getPbObjectMedia(media));
        }
        
        if (this._observer) {
            this._observer.onUpdateMediaRsp(ret);
        }
    }

    private _onSetMediaAttrRsp(pb:any) {
        //respond_set_media_attr
        let media : any = pb.getMedia();

        if (this._observer) {
            this._observer.onSetMediaAttrRsp(getPbObjectMedia(media));
        }
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

        if (this._observer) {
            this._observer.notifyUserStatus(ret);
        }
    }

    private _onNotifySetUserAttrs(pb:any) {
        //notify_setuserattrs
        let clientid:string = Utils.uint8ToString(pb.getClientid());
        let attrs:any = pb.getAttrsList();

        let attr : any;
        let ret : Entity.ObjectKeyValue[] = [];
        for (attr of attrs) {
            let retAttr = getPbObjectAttr(attr);

            ret.push(retAttr);
        }

        if (this._observer) {
            this._observer.notifyUserAttr(clientid, ret);
        }
    }

    private _onNotifySetRoomAttrs(pb:any) {
        //respond_setroomattrs
        let attrs:any = pb.getAttrsList();

        let attr : any;
        let ret : Entity.ObjectKeyValue[] = [];
        for (attr of attrs) {
            let retAttr = getPbObjectAttr(attr);

            ret.push(retAttr);
        }

        if (this._observer) {
            this._observer.notifyRoomAttr(ret);
        }
    }

    private _onNotifyMediaCtrl(pb:any) {
        //notify_media_ctrl
        let actions : number = pb.getActions();
        let params :string =  Utils.uint8ToString(pb.getParams());

        if (this._observer) {
            this._observer.notifyMediaCtrl(actions, params);
        }
    }

    private _onNotifyWebrtcCmd(pb:any) {
        //notify_webrtc_command
        let fromid:string = Utils.uint8ToString(pb.getFromid());
        let toid : string = Utils.uint8ToString(pb.getToid());
        let msgType: string = Utils.uint8ToString(pb.getMsgtype());
        let rtcmsg : any = pb.getRtcmsg();
        let mline :string = rtcmsg.getMline();
        let mlineidx : number = rtcmsg.getMlineindex();
        let sdp : string =  Utils.uint8ToString(rtcmsg.getSdp());
        let peerParam :string = Utils.uint8ToString(rtcmsg.getPeerparams());

        if (this._observer) {
            this._observer.notifyRtcCmd(fromid,toid,msgType,mline,mlineidx,sdp,peerParam);
        }
    }

    private _onNotifyRelogin(pb:any) {
        //notify_request_relogin
        let reason : number = pb.getReson();
        if (this._observer) {
            this._observer.notifyRelogin(reason);
        }
    }

    private _onNotifyBindStreams(pb:any) {
        //notify_bind_streams
        let streams = pb.getStreamsList();
        let attr : any;
        let ret : Entity.ObjectKeyValue[] = [];
        for (attr of streams) {
            let retAttr = getPbObjectAttr(attr);

            ret.push(retAttr);
        }

        if (this._observer) {
            this._observer.notifyBindStream(ret);
        }
    }

    private _onNotifyError(pb:any) {
        //notify_error
        let ec : number = pb.getEc();
        let subec : number = pb.getSubec();
        let cmd : number = pb.getCmd();

        if (this._observer) {
            this._observer.notifyError(ec, subec, cmd);
        }
    }
};

export function NewRtcClient() : RTCSdkClient.IRtcClient {
    return RtcClientImpl.getInstance();
}