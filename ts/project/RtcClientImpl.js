"use strict";
exports.__esModule = true;
exports.NewRtcClient = void 0;
var HttpHelper_1 = require("./net/HttpHelper");
var WSHelper_1 = require("./net/WSHelper");
var Packeted = require("./protocol/Packer");
var ProtoHelper = require("./protocol/ProtoHelper");
var Protos = require("./protocol/Protocol");
var Utils_1 = require("./utils/Utils");
var http_server_url = "http://120.132.99.205:24002";
var sdk_version = "20210610";
var obj_name_keyvalue = "object_keyvalue";
var obj_name_user = "object_user";
var obj_name_rtcmsg = "object_webrtc_msg";
var obj_name_media = "object_media";
function getPbObjectAttr(attr) {
    var ret = {
        key: Utils_1["default"].uint8ToString(attr.getKey()),
        value: Utils_1["default"].uint8ToString(attr.getValue())
    };
    return ret;
}
function getPbObjectMedia(media) {
    var ret = {
        name: Utils_1["default"].uint8ToString(media.getName()),
        attrs: []
    };
    var attrs = media.getAttrsList();
    var attr;
    for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
        attr = attrs_1[_i];
        var objAttr = getPbObjectAttr(attr);
        ret.attrs.push(objAttr);
    }
    return ret;
}
function getPbObjectUser(user) {
    var ret = {
        clientId: "",
        clientKey: "",
        attrs: [],
        status: 0,
        joinTick: 0,
        leaveTick: 0
    };
    ret.clientId = Utils_1["default"].uint8ToString(user.getClientid());
    ret.clientKey = Utils_1["default"].uint8ToString(user.getClientkey());
    ret.status = user.getStatus();
    ret.joinTick = user.getJointime();
    ret.leaveTick = user.getLeavetime();
    if (user.getAttrsList().length > 0) {
        var attr = void 0;
        for (var _i = 0, _a = user.getAttrsList(); _i < _a.length; _i++) {
            attr = _a[_i];
            ret.attrs.push(getPbObjectAttr(attr));
        }
    }
    return ret;
}
var RtcClientImpl = /** @class */ (function () {
    function RtcClientImpl() {
        this._sequence = 0;
        this._socket = null;
        this._clientid = "";
        this._servers = [];
        this._stun = null;
        this._turn = null;
        this._token = '';
        this._deviceId = 'web';
        this._deviceInfo = '';
        this._sessionid = 0;
        this._seqMaxSpan = 0;
        this._srvData = '';
        this._observer = null;
        this._preParticipants = {};
        this._socket = new WSHelper_1["default"];
        this._cfgUrl = http_server_url;
        this._socket.setCallback(this);
    }
    RtcClientImpl.getInstance = function () {
        if (RtcClientImpl._instance == null) {
            RtcClientImpl._instance = new RtcClientImpl();
        }
        return RtcClientImpl._instance;
    };
    RtcClientImpl.prototype.OnNetStatus = function (iStatus, iReason) {
        if (iStatus == 2) {
            this._login();
        }
    };
    RtcClientImpl.prototype.OnMessage = function (pkt) {
        if (pkt.rspHeader) {
            console.log("OnMessage cmd=", pkt.cmdid, ",msgType=", pkt.msgType, ",rspHeader=", pkt.rspHeader, ",pb=", pkt.pb);
        }
        else {
            console.log("OnMessage cmd=", pkt.cmdid, ",msgType=", pkt.msgType, ",pb=", pkt.pb);
        }
        return this._onPacket(pkt.cmdid, pkt.msgType, pkt.RspHeader, pkt.pb);
    };
    RtcClientImpl.prototype.setObserver = function (observer) {
        this._observer = observer;
    };
    RtcClientImpl.prototype.setUrl = function (cfgUri, eType) {
        if (cfgUri == '') {
            cfgUri = http_server_url;
        }
        this._cfgUrl = cfgUri;
        this._urlType = eType;
    };
    RtcClientImpl.prototype.login = function (clientKey, roomKey, tLoginParam) {
        this._clientKey = clientKey;
        this._attr = tLoginParam;
        this._roomKey = roomKey;
        this._loadConfig();
        return 0;
    };
    RtcClientImpl.prototype.logout = function () {
        this._socket.close();
        return 0;
    };
    RtcClientImpl.prototype.send = function (sendFlag, streamType, clientId) {
        return 0;
    };
    RtcClientImpl.prototype.isP2p = function () {
        return this._attr.bP2pFlag;
    };
    RtcClientImpl.prototype.isSupportOfflines = function () {
        return this._attr.bSupportOfflines;
    };
    RtcClientImpl.prototype.setRoomAttr = function (sKey, sValue) {
        var setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS);
        var objAttrs = ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);
        setReq.setAttrsList(objAttrs);
        var pbHead = {
            sequence: this._sequence,
            session: '',
            token: ''
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setroomattrs, pbHead, setReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.setUserAttr = function (sClientId, sKey, sValue) {
        var setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS);
        var objAttrs = ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);
        setReq.setClientid(ProtoHelper.Base64E(sClientId));
        setReq.setAttrsList(objAttrs);
        var pbHead = {
            sequence: this._sequence,
            session: '',
            token: ''
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setuserattrs, pbHead, setReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.orderStream = function (sClientId) {
        var ids = sClientId.split(";");
        var setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS);
        setReq.setOrdersList(ids);
        var pbHead = {
            sequence: this._sequence,
            session: '',
            token: ''
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_order_streams, pbHead, setReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.addParticipant = function (sClientId, sKey, sValue) {
        var ret = {
            clientId: sClientId,
            clientKey: "",
            attrs: [],
            status: 0,
            joinTick: 0,
            leaveTick: 0
        };
        this._preParticipants[sClientId] = ret;
        return 0;
    };
    RtcClientImpl.prototype.setParticipantAttr = function (sClientId, sKey, sValue) {
        var attr = {
            key: sKey,
            value: sValue
        };
        this._preParticipants[sClientId].attrs.push(attr);
        return 0;
    };
    RtcClientImpl.prototype.commitParticipants = function () {
        var setReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT);
        var users = ProtoHelper.NewProtoObjectArray(obj_name_user);
        for (var key in this._preParticipants) {
            var item = this._preParticipants[key];
            var user = ProtoHelper.NewProtoObject(obj_name_user);
            user.setClientid(ProtoHelper.Base64E(item.clientId));
            user.setClientkey(ProtoHelper.Base64E(item.clientId));
            var attrs = ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
            var itemAttr = void 0;
            for (var _i = 0, _a = item.attrs; _i < _a.length; _i++) {
                itemAttr = _a[_i];
                var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(ProtoHelper.Base64E(itemAttr.key));
                attr.setValue(ProtoHelper.Base64E(itemAttr.value));
                attrs.push(attr);
            }
            users.push(user);
        }
        setReq.setUsersList(users);
        var pbHead = {
            sequence: this._sequence,
            session: '',
            token: ''
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_add_participant, pbHead, setReq);
        this._preParticipants = {};
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.getSetting = function (iKey) {
        return 0;
    };
    RtcClientImpl.prototype.getNetStatus = function () {
        var ret = {
            tUp: {
                snum: 0,
                netlossrate: 0,
                totallossrate: 0,
                band: 0,
                bandn: 0
            },
            tDown: {
                snum: 0,
                netlossrate: 0,
                totallossrate: 0,
                band: 0,
                bandn: 0
            },
            rtt: 0
        };
        return ret;
    };
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
    RtcClientImpl.prototype._loadConfig = function () {
        var _this = this;
        var http = new HttpHelper_1["default"];
        var params = new Array();
        params.push("cmd=getconfig");
        params.push("roomkey=" + this._roomKey);
        params.push("clientkey=" + this._clientKey);
        params.push("token=" + this._token);
        params.push("version=" + sdk_version);
        params.push("deviceid=" + this._deviceId);
        params.push("deviceinfo=" + this._deviceInfo);
        var href = this._cfgUrl + "?" + params.join("&");
        http.Open(href, "GET", "");
        http.Send("", function (status, body, context) {
            if (status != 200) {
                console.log("http query fail status=", status);
                return;
            }
            var ret = JSON.parse(body);
            if (ret.ecode != 200) {
                console.log("http get fail  ret = ", ret.ecode);
                return;
            }
            _this._clientid = ret.clientid;
            _this._servers = [];
            _this._stun = ret.stun;
            _this._turn = ret.turn;
            _this._token = ret.token;
            _this._sessionid = ret.loginseq;
            _this._seqMaxSpan = ret.seqmaxspan;
            _this._srvData = ret.serverdata;
            console.log("http get result clientid=", _this._clientid, ",sessionid=", _this._sessionid, ",max sequence=", _this._seqMaxSpan, ",srv data=", _this._srvData);
            for (var _i = 0, _a = ret.server; _i < _a.length; _i++) {
                var i = _a[_i];
                console.log("get rtc server addr :", i);
                _this._servers.push(i);
            }
            _this._socketOpen();
        });
    };
    RtcClientImpl.prototype._socketOpen = function () {
        if (this._servers.length < 1) {
            console.log("ws server is empty");
            return;
        }
        var srvAddr = "ws://" + this._servers[0];
        //let srvAddr = "ws://172.18.70.30:9000"; //TODO for local test
        this._socket.close();
        this._socket.open(srvAddr);
    };
    RtcClientImpl.prototype._login = function () {
        var loginReq = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_REGISTER);
        this._sequence = ++this._sessionid;
        loginReq.setLoginseq(ProtoHelper.MakeNumberUint8Array(this._sequence, 4));
        loginReq.setVersion(ProtoHelper.Base64E("2020082501"));
        loginReq.setServerdata(ProtoHelper.Base64E(this._srvData));
        loginReq.setRoomid(ProtoHelper.Base64E("19491001"));
        var pbUser = ProtoHelper.NewProtoObject(obj_name_user);
        pbUser.setClientid(ProtoHelper.Base64E(this._clientid));
        pbUser.setClientkey(ProtoHelper.Base64E(this._clientKey));
        loginReq.setUser(pbUser);
        console.log("send ws login room:19491001", ",client id:", this._clientid);
        this._socket.sequence = this._sequence;
        var pbHead = {
            sequence: this._sequence,
            session: '',
            token: ''
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_register, pbHead, loginReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype._onPacket = function (cmdid, msgType, rspHeader, pb) {
        switch (cmdid) {
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
    };
    RtcClientImpl.prototype._onRegesterRsp = function (pb) {
        //respond_register
        var attrs = pb.getAttrsList();
        var users = pb.getUsersList();
        var retAttrs = [];
        var retUsers = [];
        if (attrs.length > 0) {
            var attr = void 0;
            console.log("_onRegesterRsp attrs.length=", attrs.length);
            for (var _i = 0, attrs_2 = attrs; _i < attrs_2.length; _i++) {
                attr = attrs_2[_i];
                var item = getPbObjectAttr(attr);
                retAttrs.push(item);
            }
        }
        if (users.length > 0) {
            var user = void 0;
            for (var _a = 0, users_1 = users; _a < users_1.length; _a++) {
                user = users_1[_a];
                var pbUser = getPbObjectUser(user);
                retUsers.push(pbUser);
            }
        }
        console.log("_onRegesterRsp:", retAttrs, retUsers);
        console.log("retAttrs=", retAttrs);
        console.log("retUsers=", retUsers);
        for (var idx = 0; idx < retAttrs.length; idx++) {
            var sKey = retAttrs[idx].key;
            var sValue = retAttrs[idx].value;
            console.log("_onRegesterRsp idx=", idx, ",key=", sKey, ",svalue=", sValue);
        }
        if (this._observer) {
            this._observer.onRegisteRsp(pb.getStartedTime(), pb.getSeverCurrentTime(), retAttrs, retUsers);
        }
    };
    RtcClientImpl.prototype._onAddParticipantRsp = function (pb) {
        //respond_add_participant
        var users = pb.getUsersList();
        var ret = [];
        if (users.length > 0) {
            var user = void 0;
            for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
                user = users_2[_i];
                var pbUser = getPbObjectUser(user);
                ret.push(pbUser);
            }
        }
        if (this._observer) {
            this._observer.onAddParticipantRsp(ret);
        }
    };
    RtcClientImpl.prototype._onSetRoomAttrsRsp = function (pb) {
        //respond_setroomattrs
        var attrs = pb.getAttrsList();
        var attr;
        var ret = [];
        for (var _i = 0, attrs_3 = attrs; _i < attrs_3.length; _i++) {
            attr = attrs_3[_i];
            var retAttr = getPbObjectAttr(attr);
            ret.push(retAttr);
        }
        if (this._observer) {
            this._observer.onSetRoomAttrRsp(ret);
        }
    };
    RtcClientImpl.prototype._onUpdateMediaRsp = function (pb) {
        //respond_update_media
        var medias = pb.getMediasList();
        var media;
        var ret = [];
        for (var _i = 0, medias_1 = medias; _i < medias_1.length; _i++) {
            media = medias_1[_i];
            ret.push(getPbObjectMedia(media));
        }
        if (this._observer) {
            this._observer.onUpdateMediaRsp(ret);
        }
    };
    RtcClientImpl.prototype._onSetMediaAttrRsp = function (pb) {
        //respond_set_media_attr
        var media = pb.getMedia();
        if (this._observer) {
            this._observer.onSetMediaAttrRsp(getPbObjectMedia(media));
        }
    };
    RtcClientImpl.prototype._onNotifyUserStatus = function (pb) {
        //notify_user_status
        var users = pb.getUsersList();
        var ret = [];
        if (users.length > 0) {
            var user = void 0;
            for (var _i = 0, users_3 = users; _i < users_3.length; _i++) {
                user = users_3[_i];
                var pbUser = getPbObjectUser(user);
                ret.push(pbUser);
            }
        }
        if (this._observer) {
            this._observer.notifyUserStatus(ret);
        }
    };
    RtcClientImpl.prototype._onNotifySetUserAttrs = function (pb) {
        //notify_setuserattrs
        var clientid = Utils_1["default"].uint8ToString(pb.getClientid());
        var attrs = pb.getAttrsList();
        var attr;
        var ret = [];
        for (var _i = 0, attrs_4 = attrs; _i < attrs_4.length; _i++) {
            attr = attrs_4[_i];
            var retAttr = getPbObjectAttr(attr);
            ret.push(retAttr);
        }
        if (this._observer) {
            this._observer.notifyUserAttr(clientid, ret);
        }
    };
    RtcClientImpl.prototype._onNotifySetRoomAttrs = function (pb) {
        //respond_setroomattrs
        var attrs = pb.getAttrsList();
        var attr;
        var ret = [];
        for (var _i = 0, attrs_5 = attrs; _i < attrs_5.length; _i++) {
            attr = attrs_5[_i];
            var retAttr = getPbObjectAttr(attr);
            ret.push(retAttr);
        }
        if (this._observer) {
            this._observer.notifyRoomAttr(ret);
        }
    };
    RtcClientImpl.prototype._onNotifyMediaCtrl = function (pb) {
        //notify_media_ctrl
        var actions = pb.getActions();
        var params = Utils_1["default"].uint8ToString(pb.getParams());
        if (this._observer) {
            this._observer.notifyMediaCtrl(actions, params);
        }
    };
    RtcClientImpl.prototype._onNotifyWebrtcCmd = function (pb) {
        //notify_webrtc_command
        var fromid = Utils_1["default"].uint8ToString(pb.getFromid());
        var toid = Utils_1["default"].uint8ToString(pb.getToid());
        var msgType = Utils_1["default"].uint8ToString(pb.getMsgtype());
        var rtcmsg = pb.getRtcmsg();
        var mline = rtcmsg.getMline();
        var mlineidx = rtcmsg.getMlineindex();
        var sdp = Utils_1["default"].uint8ToString(rtcmsg.getSdp());
        var peerParam = Utils_1["default"].uint8ToString(rtcmsg.getPeerparams());
        if (this._observer) {
            this._observer.notifyRtcCmd(fromid, toid, msgType, mline, mlineidx, sdp, peerParam);
        }
    };
    RtcClientImpl.prototype._onNotifyRelogin = function (pb) {
        //notify_request_relogin
        var reason = pb.getReson();
        if (this._observer) {
            this._observer.notifyRelogin(reason);
        }
    };
    RtcClientImpl.prototype._onNotifyBindStreams = function (pb) {
        //notify_bind_streams
        var streams = pb.getStreamsList();
        var attr;
        var ret = [];
        for (var _i = 0, streams_1 = streams; _i < streams_1.length; _i++) {
            attr = streams_1[_i];
            var retAttr = getPbObjectAttr(attr);
            ret.push(retAttr);
        }
        if (this._observer) {
            this._observer.notifyBindStream(ret);
        }
    };
    RtcClientImpl.prototype._onNotifyError = function (pb) {
        //notify_error
        var ec = pb.getEc();
        var subec = pb.getSubec();
        var cmd = pb.getCmd();
        if (this._observer) {
            this._observer.notifyError(ec, subec, cmd);
        }
    };
    RtcClientImpl._instance = null;
    return RtcClientImpl;
}());
;
function NewRtcClient() {
    return RtcClientImpl.getInstance();
}
exports.NewRtcClient = NewRtcClient;
