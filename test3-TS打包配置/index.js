(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){(function (){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/IRtcClient.ts":
/*!***************************!*\
  !*** ./src/IRtcClient.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MakeRtcClient = exports.ECODE_VERSION_UNSUPPORT = exports.ECODE_NOT_INITIALIZE = exports.ECODE_STREAM_NOTFOUND = exports.ECODE_PARAMS_ERROR = exports.ECODE_LOGIC = exports.ECODE_RUNNING = exports.ECODE_NOT_CONNECTED = exports.ECODE_BUSY = exports.VER_AMERICA = exports.VER_UROPE = exports.VER_ASIA = exports.VER_CHINA = exports.cmd_webrtc_ice = exports.cmd_webrtc_answer = exports.cmd_webrtc_preanswer = exports.cmd_webrtc_offer = void 0;
var RtcClientImpl_1 = __webpack_require__(/*! ./RtcClientImpl */ "./src/RtcClientImpl.ts");
//webrtc命令
exports.cmd_webrtc_offer = "offer";
exports.cmd_webrtc_preanswer = "pre_answer";
exports.cmd_webrtc_answer = "answer";
exports.cmd_webrtc_ice = "ice";
exports.VER_CHINA = 0;
exports.VER_ASIA = 1;
exports.VER_UROPE = 2;
exports.VER_AMERICA = 3;
exports.ECODE_BUSY = -1;
exports.ECODE_NOT_CONNECTED = -2;
exports.ECODE_RUNNING = -3;
exports.ECODE_LOGIC = -4;
exports.ECODE_PARAMS_ERROR = -10;
exports.ECODE_STREAM_NOTFOUND = -11;
exports.ECODE_NOT_INITIALIZE = -50;
exports.ECODE_VERSION_UNSUPPORT = 10000 + 3; //版本不支持
;
;
;
;
;
// module.exports = function MakeRtcClient():IRtcClient {
//     return Impl();
// }
// declare global {
//     interface Window { rtcname: any; }
// }
// window.rtcname = MakeRtcClient();
// console.log(Window);
function MakeRtcClient() {
    return RtcClientImpl_1.NewRtcClient();
}
exports.MakeRtcClient = MakeRtcClient;


/***/ }),

/***/ "./src/RtcClientImpl.ts":
/*!******************************!*\
  !*** ./src/RtcClientImpl.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewRtcClient = void 0;
var RTCSdkClient = __importStar(__webpack_require__(/*! ./IRtcClient */ "./src/IRtcClient.ts"));
var HttpHelper_1 = __importDefault(__webpack_require__(/*! ./net/HttpHelper */ "./src/net/HttpHelper.ts"));
var WSHelper_1 = __importDefault(__webpack_require__(/*! ./net/WSHelper */ "./src/net/WSHelper.ts"));
var Entity = __importStar(__webpack_require__(/*! ./entity/Entity */ "./src/entity/Entity.ts"));
var Packeted = __importStar(__webpack_require__(/*! ./protocol/Packer */ "./src/protocol/Packer.ts"));
var ProtoHelper = __importStar(__webpack_require__(/*! ./protocol/ProtoHelper */ "./src/protocol/ProtoHelper.ts"));
var Protos = __importStar(__webpack_require__(/*! ./protocol/Protocol */ "./src/protocol/Protocol.ts"));
var Utils_1 = __importDefault(__webpack_require__(/*! ./utils/Utils */ "./src/utils/Utils.ts"));
var RtcEng = __importStar(__webpack_require__(/*! ./engine/RtcEngineImpl */ "./src/engine/RtcEngineImpl.ts"));
var IRtcEng = __importStar(__webpack_require__(/*! ./engine/IRtcEngine */ "./src/engine/IRtcEngine.ts"));
var MapUtil = __importStar(__webpack_require__(/*! ./utils/MyMap */ "./src/utils/MyMap.ts"));
var http_server_url = "http://120.132.99.205:24002";
var sdk_version = "20210610";
var obj_name_keyvalue = "object_keyvalue";
var obj_name_user = "object_user";
var obj_name_rtcmsg = "object_webrtc_msg";
var obj_name_media = "object_media";
var SVRID = "###MEDIA_SERVERID###";
;
;
var EWebrtcState;
(function (EWebrtcState) {
    EWebrtcState[EWebrtcState["kRtcStateWaitOffer"] = 1] = "kRtcStateWaitOffer";
    EWebrtcState[EWebrtcState["kRtcStateWaitAnswer"] = 2] = "kRtcStateWaitAnswer";
})(EWebrtcState || (EWebrtcState = {}));
;
var ENetStatus;
(function (ENetStatus) {
    ENetStatus[ENetStatus["st_none"] = 0] = "st_none";
    ENetStatus[ENetStatus["st_closed"] = 1] = "st_closed";
    ENetStatus[ENetStatus["st_netbroken"] = 2] = "st_netbroken";
    ENetStatus[ENetStatus["st_connecting"] = 5] = "st_connecting";
    ENetStatus[ENetStatus["st_connected"] = 6] = "st_connected";
    ENetStatus[ENetStatus["st_runing"] = 7] = "st_runing";
})(ENetStatus || (ENetStatus = {}));
;
;
;
function trimMediaType(org) {
    //TODO
    return "";
}
function media_id(streamid, mtype) {
    var id = streamid;
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
function getPbObjectAttr(attr) {
    var ret = {
        key: Utils_1.default.uint8ToString(attr.getKey()),
        value: Utils_1.default.uint8ToString(attr.getValue()),
    };
    return ret;
}
function getPbObjectMedia(media) {
    var ret = {
        name: Utils_1.default.uint8ToString(media.getName()),
        attrs: [],
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
        leaveTick: 0,
    };
    ret.clientId = Utils_1.default.uint8ToString(user.getClientid());
    ret.clientKey = Utils_1.default.uint8ToString(user.getClientkey());
    ret.status = user.getStatus();
    ret.joinTick = user.getJoinTime();
    ret.leaveTick = user.getLeaveTime();
    if (user.getAttrsList().length > 0) {
        var attr = void 0;
        for (var _i = 0, _a = user.getAttrsList(); _i < _a.length; _i++) {
            attr = _a[_i];
            ret.attrs.push(getPbObjectAttr(attr));
        }
    }
    return ret;
}
var IterImpl = /** @class */ (function () {
    function IterImpl(_map, bSkipFix) {
        this._index = 0;
        this._skipFix = false;
        this._map = null;
        this._map = _map;
        this._skipFix = this._skipFix;
        this._index = 0;
    }
    IterImpl.prototype.skipFixKey = function () {
        while (!this.isEnd()) {
            var v = this.getCurIntValue();
            if (v <= 0 || v > Protos.EEventId.engine_event_from) {
                break;
            }
            this._index++;
        }
    };
    IterImpl.prototype.isEnd = function () {
        if (this._index >= this._map.size)
            return true;
        return false;
    };
    IterImpl.prototype.next = function () {
        this._index++;
        this.skipFixKey();
    };
    IterImpl.prototype.getCurKey = function () {
        if (this._index >= this._map.size)
            return "";
        return this._map.getKey(this._index);
    };
    IterImpl.prototype.getCurValue = function () {
        if (this._index >= this._map.size)
            return "";
        var key = this._map.getKey(this._index);
        return this._map.getItem(key);
    };
    IterImpl.prototype.getCurIntValue = function () {
        var ret = this.getCurKey();
        if (!ret || ret == "")
            return 0;
        return parseInt(ret);
    };
    return IterImpl;
}());
var BaseObjectImpl = /** @class */ (function () {
    function BaseObjectImpl() {
        this._map = null;
        this._map = new MapUtil.MyMap();
    }
    BaseObjectImpl.prototype.getByInt = function (key) {
        if (!this._map.has(key.toString())) {
            return "";
        }
        return this._map.getItem(key.toString());
    };
    BaseObjectImpl.prototype.getByStr = function (key) {
        if (!this._map.has(key)) {
            return "";
        }
        return this._map.getItem(key);
    };
    BaseObjectImpl.prototype.getIntByInt = function (key) {
        var ret = this.getByInt(key);
        if (ret == "") {
            return 0;
        }
        return parseInt(ret);
    };
    BaseObjectImpl.prototype.getIntByStr = function (key) {
        var ret = this.getByStr(key);
        if (ret == "") {
            return 0;
        }
        return parseInt(ret);
    };
    BaseObjectImpl.prototype.getIter = function (skipFixKey) {
        var ret = new IterImpl(this._map, skipFixKey);
        return ret;
    };
    BaseObjectImpl.prototype.put = function (k, v) {
        this._map[k.toString()] = v.toString();
    };
    return BaseObjectImpl;
}());
var ArrayObjImpl = /** @class */ (function () {
    function ArrayObjImpl() {
        this._sz = 0;
        this._strs = [];
        this._objs = [];
    }
    ArrayObjImpl.prototype.size = function () {
        return this._sz;
    };
    ArrayObjImpl.prototype.item = function (index) {
        if (index < 0 || index >= this._objs.length)
            return null;
        return this._objs[index];
    };
    ArrayObjImpl.prototype.strItem = function (index) {
        if (index < 0 || index >= this._strs.length)
            return null;
        return this._strs[index];
    };
    ArrayObjImpl.prototype.addObj = function (obj) {
        this._objs.push(obj);
        this._sz++;
    };
    ArrayObjImpl.prototype.addString = function (item) {
        this._strs.push(item);
        this._sz++;
    };
    return ArrayObjImpl;
}());
function makeObjUser(pbUser) {
    var obj = new BaseObjectImpl();
    obj.put(Protos.EEventKey.eKeyClientID, pbUser.clientId);
    obj.put(Protos.EEventKey.eKeyClientKey, pbUser.clientKey);
    obj.put(Protos.EEventKey.eKeyStatus, pbUser.status);
    for (var _i = 0, _a = pbUser.attrs; _i < _a.length; _i++) {
        var a = _a[_i];
        obj.put(a.key, a.value);
    }
    return obj;
}
var BaseEventImpl = /** @class */ (function () {
    function BaseEventImpl() {
        this._map = null;
        this._skipFixKey = true;
        this._eventId = 0;
        this._iter = null;
        this._objs = null;
        this._arrays = null;
        this._skipFixKey = true;
        this._map = new MapUtil.MyMap();
        this._objs = new MapUtil.MyMap();
        this._arrays = new MapUtil.MyMap();
    }
    BaseEventImpl.prototype.isEnd = function () {
        return true;
    };
    BaseEventImpl.prototype.init = function (_map, skipFix) {
        this._skipFixKey = skipFix;
        this._map = _map;
    };
    BaseEventImpl.prototype.eventId = function () {
        return this._eventId;
    };
    BaseEventImpl.prototype.setEventId = function (e) {
        this._eventId = e;
    };
    BaseEventImpl.prototype.getObj = function (key) {
        if (!this._objs.has(key)) {
            return null;
        }
        return this._objs.getItem(key);
    };
    BaseEventImpl.prototype.getArrayObj = function (key) {
        if (!this._arrays.has(key)) {
            return null;
        }
        return this._arrays.getItem(key);
    };
    BaseEventImpl.prototype.getByInt = function (key) {
        if (!this._map.has(key.toString())) {
            return "";
        }
        return this._map.getItem(key.toString());
    };
    BaseEventImpl.prototype.getByStr = function (key) {
        if (!this._map.has(key)) {
            return "";
        }
        return this._map.getItem(key);
    };
    BaseEventImpl.prototype.put = function (k, v) {
        this._map[k.toString()] = v.toString();
    };
    BaseEventImpl.prototype.putOjb = function (key, obj) {
        this._objs[key.toString()] = obj;
    };
    BaseEventImpl.prototype.putArrayOjb = function (key, obj) {
        this._arrays[key.toString()] = obj;
    };
    BaseEventImpl.prototype.getIntByInt = function (key) {
        var ret = this.getByInt(key);
        if (ret == "") {
            return 0;
        }
        return parseInt(ret);
    };
    BaseEventImpl.prototype.getIntByStr = function (key) {
        var ret = this.getByStr(key);
        if (ret == "") {
            return 0;
        }
        return parseInt(ret);
    };
    BaseEventImpl.prototype.getIter = function (skipFixKey) {
        var ret = new IterImpl(this._map, skipFixKey);
        return ret;
    };
    return BaseEventImpl;
}());
var ParseParameter = /** @class */ (function () {
    function ParseParameter() {
        this._str = "";
        this._params = {};
    }
    ParseParameter.prototype.setParam = function (str) {
        this._str = str;
        this._params = {};
        this.parse();
    };
    ParseParameter.prototype.parse = function () {
        var vps = this._str.split("]");
        for (var i = 0; i < vps.length; i++) {
            var str = vps[i];
            var idx = str.indexOf('[');
            if (idx > 0) {
                var curKey = str.substr(0, idx);
                var curValue = str.substr(idx + 1);
                this._params[curKey] = curValue;
                console.log("_loadConfig key=", curKey, ",value=", curValue);
            }
        }
    };
    ParseParameter.prototype.getKeyStr = function (sec, key, dft) {
        if (!this._params[sec]) {
            return dft;
        }
        var strValue = this._params[sec];
        var items = strValue.split(',');
        for (var i = 0; i < items.length; i++) {
            var v = items[i];
            var values = v.split(":");
            if (values && values.length > 1) {
                return values[1];
            }
        }
        return dft;
    };
    ParseParameter.prototype.getKeyInt = function (sec, key, dft) {
        if (!this._params[sec]) {
            return dft;
        }
        var strValue = this._params[sec];
        var items = strValue.split(',');
        for (var i = 0; i < items.length; i++) {
            var v = items[i];
            var values = v.split(":");
            if (values && values.length > 1) {
                return parseInt(values[1]);
            }
        }
        return dft;
    };
    ParseParameter.prototype.getKeyFloat = function (sec, key, dft) {
        if (!this._params[sec]) {
            return dft;
        }
        var strValue = this._params[sec];
        var items = strValue.split(',');
        for (var i = 0; i < items.length; i++) {
            var v = items[i];
            var values = v.split(":");
            if (values && values.length > 1) {
                return parseFloat(values[1]);
            }
        }
        return dft;
    };
    return ParseParameter;
}());
;
var RtcClientImpl = /** @class */ (function () {
    function RtcClientImpl() {
        this._onSend = false;
        this._pEngine = null;
        this._userAttrReqs = {};
        //@mark
        //private declare
        this._sequence = 0;
        this._socket = null;
        this._clientid = "";
        this._servers = [];
        this._stun = null;
        this._turn = null;
        this._token = '';
        this._sessionid = 0;
        this._seqMaxSpan = 0;
        this._srvData = '';
        this._audioParam = '';
        this._videoParam = '';
        //private _observer :RTCSdkClient.IRtcObserver = null;
        this._preParticipants = {};
        this._bDtls = false;
        this._bSrtp = false;
        this._reuseFlag = false;
        this._bNetDisable = false;
        this._waitRelogin = false;
        this._videoParser = new ParseParameter();
        this._logined = false;
        this._engineError = false;
        this._netStatus = 0;
        this._events = [];
        this._attrMaps = null;
        this._peers = null;
        this._medias = null;
        this._socket = new WSHelper_1.default;
        this._cfgUrl = http_server_url;
        this._socket.setCallback(this);
        this._pEngine = new RtcEng.RtcEngineImpl();
        this._attrMaps = new MapUtil.MyMap();
        this._peers = new MapUtil.MyMap();
        this._medias = new MapUtil.MyMap();
    }
    RtcClientImpl.getInstance = function () {
        if (RtcClientImpl._instance == null) {
            RtcClientImpl._instance = new RtcClientImpl();
        }
        return RtcClientImpl._instance;
    };
    RtcClientImpl.prototype.onNetBroken = function () {
        if (this._netStatus == ENetStatus.st_runing) {
            if (this._peers.size > 0) {
                var key = this._peers.getKey(0);
                var pf = this._peers.getItem(key);
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
            }
            else {
                this.commitSimpleEvent(Protos.EEventId.ntf_netlost, 0);
                this._netStatus = ENetStatus.st_netbroken;
            }
        }
        else {
            if (!this._bNetDisable) {
                this.commitSimpleEvent(Protos.EEventId.resp_login, IRtcEng.EClientErr.err_connect_audio_server);
            }
            this._netStatus = ENetStatus.st_netbroken;
        }
    };
    RtcClientImpl.prototype.excuteLogout = function (closeConn) {
        var _this = this;
        if (!closeConn) {
            this._netStatus = ENetStatus.st_connecting;
        }
        this._peers.forEach(function (k, v) {
            _this._pEngine.destroyPeer(v.peer);
        });
        this._peers.clear();
        this._pEngine.closeEngine();
        this._medias.clear();
        if (closeConn) {
            this._socket.close();
        }
        this._netStatus = ENetStatus.st_closed;
        this._waitRelogin = false;
    };
    //IRtcEng.IWebRtcSink
    RtcClientImpl.prototype.onIceCandidate = function (mline, midIndex, sdp, peerid) {
        if (this._engineError) {
            return;
        }
        if (!this._socket.isok()) {
            return;
        }
        var rtcmd = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_webrtc_command);
        rtcmd.setFromid(Utils_1.default.base64Encode(this._clientid));
        rtcmd.setToid(Utils_1.default.base64Encode(peerid));
        rtcmd.setMsgtype(Utils_1.default.base64Encode(RTCSdkClient.cmd_webrtc_ice));
        var rtc = ProtoHelper.NewProtoObject(obj_name_rtcmsg);
        rtc.setMline(Utils_1.default.base64Encode(mline));
        rtc.setMlineIndex(midIndex);
        rtc.setSdp(Utils_1.default.base64Encode(sdp));
        rtcmd.setRtcmsg(rtc);
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_notify_webrtc_command, pbHead, rtcmd);
        this._socket.send(btReq);
    };
    RtcClientImpl.prototype._syncSendState = function (peerid, peer) {
        if (peer.curState == peer.runningState) {
            return;
        }
        if (this._attr.bP2pFlag) {
            var sendTypes = 0;
            var stopTypes = 0;
            if ((Entity.EStreamType.kAudio & peer.runningState) == 0 &&
                0 != (peer.curState & Entity.EStreamType.kAudio)) {
                sendTypes |= Entity.EStreamType.kAudio;
            }
            else if (0 == (Entity.EStreamType.kAudio & peer.curState) &&
                0 != (Entity.EStreamType.kAudio & peer.runningState)) {
                stopTypes |= Entity.EStreamType.kAudio;
            }
            if ((Entity.EStreamType.kVideo & peer.runningState) == 0 &&
                0 != (peer.curState & Entity.EStreamType.kVideo)) {
                sendTypes |= Entity.EStreamType.kVideo;
            }
            else if (0 == (Entity.EStreamType.kVideo & peer.curState) &&
                0 != (Entity.EStreamType.kVideo & peer.runningState)) {
                stopTypes |= Entity.EStreamType.kVideo;
            }
            peer.bPublishing = true;
            peer.webrtcState |= Entity.EWebrtcState.kWebrtcWaitOffer;
            peer.peer.synStreamTypes(sendTypes, stopTypes, peerid);
        }
        else {
            var req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_update_media);
            var mediaList = req.getMediasList();
            if (peer.curState & Entity.EStreamType.kAudio) {
                var item = ProtoHelper.NewProtoObject(obj_name_media);
                item.setName(ProtoHelper.Base64E("audio"));
                mediaList.push(item);
            }
            if (peer.curState & Entity.EStreamType.kVideo) {
                var item = ProtoHelper.NewProtoObject(obj_name_media);
                item.setName(ProtoHelper.Base64E("video"));
                var attrs = item.getAttrsList();
                var vs = peer.peer.getVideoSize();
                if (vs.height > 0 && vs.width > 0) {
                    var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
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
                    var attrs_2 = item.getAttrsList();
                    var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                    attr.setKey(ProtoHelper.Base64E("w"));
                    attr.setValue(ProtoHelper.Base64E(vs.width.toString()));
                    attrs_2.push(attr);
                    attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                    attr.setKey(ProtoHelper.Base64E("h"));
                    attr.setValue(ProtoHelper.Base64E(vs.height.toString()));
                    attrs_2.push(attr);
                    item.setAttrsList(attrs_2);
                    mediaList.push(item);
                }
            }
            peer.bPublishing = true;
            var pbHead = {
                sequence: this._sequence++,
                session: '',
                token: this._token
            };
            var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_update_media, pbHead, req);
            this._socket.send(btReq);
        }
        this._peers.set(peerid, peer);
    };
    RtcClientImpl.prototype.onSucceed = function (type, sdp, peerid) {
        if (this._engineError) {
            return;
        }
        if (!this._socket.isok()) {
            return;
        }
        if (!this._peers.has(peerid)) {
            return;
        }
        var peer = this._peers.getItem(peerid);
        if (!peer) {
            return;
        }
        var msgtype = '';
        switch (type) {
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
        var rtcmd = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_webrtc_command);
        rtcmd.setFromid(Utils_1.default.base64Encode(this._clientid));
        if (peerid != SVRID) {
            rtcmd.setToid(Utils_1.default.base64Encode(peerid));
        }
        var rtc = ProtoHelper.NewProtoObject(obj_name_rtcmsg);
        rtc.setSdp(Utils_1.default.base64Encode(sdp));
        if (!peer.bGotLocalParams) {
            peer.bGotLocalParams = true;
            this._peers.set(peerid, peer);
            rtc.setPeerParams(this._pEngine.getLocalParamsForPeer());
        }
        rtcmd.setMsgtype(Utils_1.default.base64Encode(msgtype));
        rtcmd.setRtcmsg(rtc);
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token
        };
        if (IRtcEng.ESdpType.kOffer && peer.bPublishing) {
            peer.bPublishing = false;
            this._peers.set(peerid, peer);
        }
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_notify_webrtc_command, pbHead, rtcmd);
        this._socket.send(btReq);
        this._syncSendState(peerid, peer);
    };
    RtcClientImpl.prototype.commitSimpleEvent = function (eventId, ec) {
        var event = new BaseEventImpl();
        event.setEventId(eventId);
        event.put(Protos.EEventKey.eKeyErrCode, ec);
        this._events.push(event);
    };
    RtcClientImpl.prototype.commitEvent = function (evtid, k1, v1, k2, v2, k3, v3, k4, v4, k5, v5) {
        var event = new BaseEventImpl();
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
    };
    RtcClientImpl.prototype.onFailed = function (type, error, peerid) {
        if (this._engineError || ENetStatus.st_runing != this._netStatus) {
            return;
        }
        this._engineError = true;
        this.relogin(0, IRtcEng.EResonRelogin.rtc_engine_error, true);
    };
    RtcClientImpl.prototype.onAddStream = function (streamid, streamtype, token, peerid) {
        if (this._engineError) {
            return;
        }
        var pf = this.findPeerId(peerid);
        if (!pf)
            return;
        var stype = streamtype.toString();
        var smediaid = media_id(streamid, streamtype);
        var media = {};
        if (this._medias.has(smediaid)) {
            media = this._medias.getItem(smediaid);
        }
        media.token = token;
        media.streamType = streamtype;
        media.streamId = smediaid;
        media.szStreamType = stype;
        this._medias.set(smediaid, media);
        if (this._reuseFlag) {
            if (media.bindId != "") {
                this._pEngine.onAddStream(streamid, streamtype, token, media.bindId, pf.peer);
                this.commitEvent(Protos.EEventId.ntf_added_stream, Protos.EEventKey.eKeyMediaType, stype, Protos.EEventKey.eKeyClientID, media.bindId);
            }
        }
        else {
            this._pEngine.onAddStream(streamid, streamtype, token, media.bindId, pf.peer);
            this.commitEvent(Protos.EEventId.ntf_added_stream, Protos.EEventKey.eKeyMediaType, stype, Protos.EEventKey.eKeyClientID, media.bindId);
        }
    };
    RtcClientImpl.prototype.onRemoveStream = function (streamid, streamtype, peerid) {
        if (this._engineError) {
            return;
        }
        var pf = this.findPeerId(peerid);
        if (!pf)
            return;
        var mediaid = media_id(streamid, streamtype);
        if (!this._medias.has(mediaid)) {
            return;
        }
        var media = this._medias.getItem(mediaid);
        if (this._reuseFlag) {
            if (media.bindId != "") {
                this._pEngine.onRemoveStream(streamid, streamtype, media.token, media.bindId, pf.peer);
                this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyMediaType, media.szStreamType, Protos.EEventKey.eKeyClientID, media.bindId);
            }
        }
        else {
            var strmediatype = streamtype.toString();
            this._pEngine.onRemoveStream(streamid, streamtype, media.token, media.bindId, pf.peer);
            this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyMediaType, strmediatype, Protos.EEventKey.eKeyClientID, streamid);
        }
        this._medias.del(mediaid);
    };
    RtcClientImpl.prototype.onEngineAction = function (actType, params) {
        if (actType == IRtcEng.eEngineAct.kAct_set_video_size ||
            actType == IRtcEng.eEngineAct.kAct_set_video_1_size) {
            if (this._netStatus < ENetStatus.st_connected) {
                return;
            }
            var vs = params;
            var req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_set_media_attr);
            var media = ProtoHelper.NewProtoObject(obj_name_media);
            if (actType == IRtcEng.eEngineAct.kAct_set_video_size) {
                media.setName(Utils_1.default.base64Encode("video"));
            }
            else {
                media.setName(Utils_1.default.base64Encode("video_1"));
            }
            var attrs = media.getAttrsList();
            var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
            attr.setKey(Utils_1.default.base64Encode("w"));
            attr.setValue(Utils_1.default.base64Encode(vs.width.toString()));
            attrs.push(attr);
            attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
            attr.setKey(Utils_1.default.base64Encode("h"));
            attr.setValue(Utils_1.default.base64Encode(vs.height.toString()));
            attrs.push(attr);
            media.setAttrsList(attrs);
            req.setMedia(media);
            this.sendCommand(Protos.Protocol.cmd_set_media_attr, req, true);
        }
        else if (actType == IRtcEng.eEngineAct.kAct_set_net_disabled ||
            actType == IRtcEng.eEngineAct.kAct_set_net_enabled) {
            if (actType == IRtcEng.eEngineAct.kAct_set_net_disabled) {
                if (!this._bNetDisable) {
                    if (this._attr.bAutoRelogin) {
                        this._bNetDisable = true;
                    }
                }
                this.onNetBroken();
                this.excuteLogout(true);
            }
            else {
                if (this._bNetDisable) {
                    this._bNetDisable = false;
                    this.relogin(0, Protos.EReloginReson.netbroken, true);
                }
            }
        }
    };
    RtcClientImpl.prototype.setLocalStream = function (localstream, screenflag) {
        this._pEngine.setLocalStreams(localstream, screenflag);
        return 0;
    };
    RtcClientImpl.prototype.setRemoteVideo = function (sClientId, video) {
        this._pEngine.setRemoteVideo(sClientId, video);
        return 0;
    };
    RtcClientImpl.prototype.OnNetStatus = function (iStatus, iReason) {
        console.log("OnNetStatus status=", iStatus);
        if (iStatus == 2) {
            this._waitRelogin = false;
            this._netStatus = ENetStatus.st_connected;
            this._login();
        }
    };
    RtcClientImpl.prototype.OnMessage = function (pkt) {
        if (pkt.cmdid != 1) {
            if (pkt.rspHeader) {
                console.log("OnMessage cmd=", pkt.cmdid, ",msgType=", pkt.msgType, ",rspHeader=", pkt.rspHeader, ",pb=", pkt.pb);
            }
            else {
                console.log("OnMessage cmd=", pkt.cmdid, ",msgType=", pkt.msgType, ",pb=", pkt.pb);
            }
        }
        return this._onPacket(pkt.cmdid, pkt.msgType, pkt.RspHeader, pkt.pb);
    };
    RtcClientImpl.prototype.setUrl = function (cfgUri, eType) {
        if (cfgUri == '') {
            cfgUri = http_server_url;
        }
        this._cfgUrl = cfgUri;
    };
    RtcClientImpl.prototype.login = function (clientKey, roomKey, tLoginParam) {
        if (this._netStatus == ENetStatus.st_closed) {
            this._netStatus = ENetStatus.st_none;
        }
        if (ENetStatus.st_none != this._netStatus) {
            return RTCSdkClient.ECODE_BUSY;
        }
        this._clientKey = clientKey;
        this._attr = tLoginParam;
        this._roomKey = roomKey;
        this._netStatus = ENetStatus.st_connecting;
        this._waitRelogin = false;
        this._bNetDisable = false;
        this._loadConfig();
        return 0;
    };
    RtcClientImpl.prototype.logout = function () {
        if (this._netStatus == ENetStatus.st_none) {
            return;
        }
        if (this._netStatus != ENetStatus.st_closed) {
            this.excuteLogout(true);
        }
        this.commitEvent(Protos.EEventId.resp_logout, Protos.EEventKey.eKeyClientID, this._clientKey, Protos.EEventKey.eKeyRoomKey, this._roomKey);
        this._netStatus = ENetStatus.st_none;
        this._bNetDisable = false;
        return 0;
    };
    RtcClientImpl.prototype.send = function (sendFlag, sendType, clientId) {
        if (this._onSend) {
            return 1024;
        }
        var peerid = '';
        if (this._attr.bP2pFlag) {
            peerid = clientId;
        }
        else {
            peerid = SVRID;
        }
        var pf = this.findPeerId(peerid);
        if (!pf)
            return;
        if (sendFlag) {
            pf.curState |= sendType;
        }
        else {
            pf.curState &= ~sendType;
        }
        if (pf.bPublishing) {
            this._peers.set(peerid, pf);
            return;
        }
        this._syncSendState(peerid, pf);
    };
    RtcClientImpl.prototype.sendCommand = function (cmd, pb, isReq) {
        if (isReq) {
            var pbHead = {
                sequence: this._sequence++,
                session: '',
                token: this._token
            };
            var btReq = Packeted.Packeter.PackReq(cmd, pbHead, pb);
            return this._socket.send(btReq);
        }
        else {
            var btReq = Packeted.Packeter.PackLite(cmd, pb);
            return this._socket.send(btReq);
        }
    };
    RtcClientImpl.prototype.isP2p = function () {
        return this._attr.bP2pFlag;
    };
    RtcClientImpl.prototype.isSupportOfflines = function () {
        return this._attr.bSupportOfflines;
    };
    RtcClientImpl.prototype.setRoomAttr = function (sKey, sValue) {
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
            var event_1 = new BaseEventImpl();
            event_1.setEventId(Protos.EEventId.resp_setroom_attr);
            event_1.put(sKey, sValue);
            this._events.push(event_1);
            return 0;
        }
        var setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_setroomattrs);
        var objAttrs = setReq.getAttrsList(); //ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        if (!objAttrs) {
            console.log("can not create ", obj_name_keyvalue, " array");
            return;
        }
        var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);
        setReq.setAttrsList(objAttrs);
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setroomattrs, pbHead, setReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.setUserAttr = function (sClientId, sKey, sValue) {
        var setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_setuserattrs);
        var objAttrs = setReq.getAttrsList(); //ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
        var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
        attr.setKey(ProtoHelper.Base64E(sKey));
        attr.setValue(ProtoHelper.Base64E(sValue));
        objAttrs.push(attr);
        setReq.setClientid(ProtoHelper.Base64E(sClientId));
        setReq.setAttrsList(objAttrs);
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token,
        };
        this._userAttrReqs[pbHead.sequence] = setReq;
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_setuserattrs, pbHead, setReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.orderStream = function (sClientId) {
        var ids = sClientId.split(";");
        var setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_order_streams);
        setReq.setOrdersList(ids);
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token,
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
            leaveTick: 0,
        };
        this._preParticipants[sClientId] = ret;
        return 0;
    };
    RtcClientImpl.prototype.setParticipantAttr = function (sClientId, sKey, sValue) {
        var attr = {
            key: sKey,
            value: sValue,
        };
        this._preParticipants[sClientId].attrs.push(attr);
        return 0;
    };
    RtcClientImpl.prototype.commitParticipants = function () {
        var setReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_add_participant);
        var users = setReq.getUsersList(); //ProtoHelper.NewProtoObjectArray(obj_name_user);
        for (var key in this._preParticipants) {
            var item = this._preParticipants[key];
            var user = ProtoHelper.NewProtoObject(obj_name_user);
            user.setClientid(ProtoHelper.Base64E(item.clientId));
            user.setClientkey(ProtoHelper.Base64E(item.clientId));
            var attrs = user.getAttrsList(); //ProtoHelper.NewProtoObjectArray(obj_name_keyvalue);
            var itemAttr = void 0;
            for (var _i = 0, _a = item.attrs; _i < _a.length; _i++) {
                itemAttr = _a[_i];
                var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
                attr.setKey(ProtoHelper.Base64E(itemAttr.key));
                attr.setValue(ProtoHelper.Base64E(itemAttr.value));
                attrs.push(attr);
            }
            user.setAttrsList(attrs);
            users.push(user);
        }
        setReq.setUsersList(users);
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token,
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_add_participant, pbHead, setReq);
        this._preParticipants = {};
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype.getSetting = function (iKey) {
        switch (iKey) {
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
    };
    RtcClientImpl.prototype.relogin = function (delay, reason, closeConn) {
        if (this._waitRelogin) {
            return;
        }
        this._waitRelogin = true;
        if (closeConn) {
            this._socket.close();
            this._socket.open("");
        }
        else {
            this._login();
        }
    };
    RtcClientImpl.prototype.getNetStatus = function () {
        var ret = {
            tUp: {
                snum: 0,
                netlossrate: 0,
                totallossrate: 0,
                band: 0,
                bandn: 0,
            },
            tDown: {
                snum: 0,
                netlossrate: 0,
                totallossrate: 0,
                band: 0,
                bandn: 0,
            },
            rtt: 0
        };
        return ret;
    };
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
    RtcClientImpl.prototype._loadConfig = function () {
        var _this = this;
        var http = new HttpHelper_1.default;
        var params = new Array();
        params.push("cmd=getconfig");
        params.push("roomkey=" + this._roomKey);
        params.push("clientkey=" + this._clientKey);
        params.push("token=" + this._token);
        params.push("version=" + sdk_version);
        params.push("deviceid=" + this._pEngine.getDeviceID());
        params.push("deviceinfo=" + this._pEngine.getDeviceInfo());
        var href = this._cfgUrl + "?" + params.join("&");
        http.Open(href, "GET", "");
        http.Send("", function (status, body, context) {
            if (status != 200) {
                console.log("http query fail status=", status);
                _this.commitSimpleEvent(Protos.EEventId.resp_login, status);
                return;
            }
            var ret = JSON.parse(body);
            if (ret.ecode != 200) {
                console.log("http get fail  ret = ", ret.ecode);
                _this.commitSimpleEvent(Protos.EEventId.resp_login, ret.ecode);
                return;
            }
            _this._stun = {
                uri: '',
                user: '',
                password: ''
            };
            _this._turn = {
                uri: '',
                user: '',
                password: ''
            };
            if (typeof (ret.stun) != 'undefined') {
                if (typeof (ret.stun.uri) != 'undefined') {
                    _this._stun.uri = ret.stun.uri;
                }
                if (typeof (ret.stun.user) != 'undefined') {
                    _this._stun.user = ret.stun.user;
                }
                if (typeof (ret.stun.password) != 'undefined') {
                    _this._stun.password = ret.stun.password;
                }
            }
            if (typeof (ret.turn) != 'undefined') {
                if (typeof (ret.turn.uri) != 'undefined') {
                    console.log("typeof(ret.turn.uri) is ", typeof (ret.turn.uri));
                    _this._turn.uri = ret.turn.uri;
                }
                if (typeof (ret.turn.user) != 'undefined') {
                    _this._turn.user = ret.turn.user;
                }
                if (typeof (ret.turn.password) != 'undefined') {
                    _this._turn.password = ret.turn.password;
                }
            }
            _this._clientid = ret.clientid;
            _this._servers = [];
            _this._token = ret.token;
            _this._sessionid = ret.loginseq;
            _this._seqMaxSpan = ret.seqmaxspan;
            _this._srvData = ret.serverdata;
            _this._roomId = ret.roomid;
            if (typeof (ret.ap) != 'undefined') {
                _this._audioParam = ret.ap;
            }
            if (typeof (ret.vp) != 'undefined') {
                _this._videoParam = ret.vp;
            }
            var vp = ret.vp;
            _this._videoParser.setParam(vp);
            if (_this._attr.bP2pFlag && _this._videoParser.getKeyInt("p2p", "e", 1) != 1) {
                _this._attr.bP2pFlag = false;
            }
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
            this.commitSimpleEvent(Protos.EEventId.resp_login, -1);
            return;
        }
        //let srvAddr = "ws://" + this._servers[0];  //for online
        var srvAddr = "ws://127.0.0.1:9000"; //TODO for local test   
        this._socket.close();
        this._socket.open(srvAddr);
    };
    RtcClientImpl.prototype._login = function () {
        var loginReq = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_register);
        this._sequence = ++this._sessionid;
        loginReq.setLoginseq(ProtoHelper.MakeNumberUint8Array(this._sequence, 4));
        loginReq.setVersion(ProtoHelper.Base64E("2021062501"));
        loginReq.setServerdata(ProtoHelper.Base64E(this._srvData));
        loginReq.setRoomid(ProtoHelper.Base64E(this._roomKey));
        var pbUser = ProtoHelper.NewProtoObject(obj_name_user);
        pbUser.setClientid(ProtoHelper.Base64E(this._clientid));
        pbUser.setClientkey(ProtoHelper.Base64E(this._clientKey));
        loginReq.setUser(pbUser);
        if (this._attr.bNotifyFlag) {
            loginReq.setNotify(ProtoHelper.Base64E("true"));
        }
        if (!this._attr.bOrderFlag) {
            loginReq.setOrdermode(ProtoHelper.Base64E("all"));
        }
        if (this._attr.bSupportOfflines) {
            var attrs = loginReq.getAttrsList();
            var attr = ProtoHelper.NewProtoObject(obj_name_keyvalue);
            attr.setKey(ProtoHelper.Base64E("offlines"));
            attr.setValue(ProtoHelper.Base64E("1"));
            attrs.push(attr);
            loginReq.setAttrsList(attrs);
        }
        console.log("send ws login room:", this._roomKey, ",client id:", this._clientid);
        this._socket.sequence = this._sequence;
        var pbHead = {
            sequence: this._sequence++,
            session: '',
            token: this._token,
        };
        var btReq = Packeted.Packeter.PackReq(Protos.Protocol.cmd_register, pbHead, loginReq);
        return this._socket.send(btReq);
    };
    RtcClientImpl.prototype._onPacket = function (cmdid, msgType, rspHeader, pb) {
        switch (cmdid) {
            case Protos.Protocol.cmd_ping:
                pb.getTimestamp();
                break;
            case Protos.Protocol.cmd_register:
                this._onRegesterRsp(rspHeader.rspHeader, pb);
                break;
            case Protos.Protocol.cmd_add_participant:
                this._onAddParticipantRsp(rspHeader.rspHeader, pb);
                break;
            case Protos.Protocol.cmd_setuserattrs:
                this._onSetUserAttrsRsp(rspHeader.rspHeader, pb);
                break;
            case Protos.Protocol.cmd_setroomattrs:
                this._onSetRoomAttrsRsp(rspHeader.rspHeader, pb);
                break;
            case Protos.Protocol.cmd_update_media:
                this._onUpdateMediaRsp(rspHeader.rspHeader, pb);
                this._onSend = false;
                break;
            case Protos.Protocol.cmd_set_media_attr:
                this._onSetMediaAttrRsp(rspHeader.rspHeader, pb);
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
            default:
                console.log("unknown cmd ", cmdid);
                break;
        }
        return 0;
    };
    RtcClientImpl.prototype._onRegesterRsp = function (rspHeader, pb) {
        //respond_register
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_login, rspHeader.errCode);
            return;
        }
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_login);
        var usersEvent = new ArrayObjImpl();
        var attrsEvent = new BaseEventImpl();
        var attrs = pb.getAttrsList();
        var users = pb.getUsersList();
        var retAttrs = [];
        var retUsers = [];
        if (attrs.length > 0) {
            this._attrMaps.clear();
            var attr = void 0;
            console.log("_onRegesterRsp attrs.length=", attrs.length);
            for (var _i = 0, attrs_3 = attrs; _i < attrs_3.length; _i++) {
                attr = attrs_3[_i];
                var item = getPbObjectAttr(attr);
                if (item.key != "dtls" && item.key != "srtp") {
                    retAttrs.push(item);
                }
                this._attrMaps.set(item.key, item.value);
            }
        }
        if (this._attrMaps.has("p2p") && this._attrMaps.getItem("p2p") != "0") {
            this._attr.bP2pFlag = true;
        }
        else {
            this._attr.bP2pFlag = false;
        }
        if (this._attrMaps.has("dtls") && this._attrMaps.getItem("dtls") != "0") {
            this._bDtls = true;
        }
        else {
            this._bDtls = false;
        }
        if (this._attrMaps.has("srtp") && this._attrMaps.getItem("srtp") != "0") {
            this._bSrtp = true;
        }
        else {
            this._bSrtp = false;
        }
        if (this._attrMaps.has("offlines") && this._attrMaps.getItem("offlines") != "0") {
            this._attr.bSupportOfflines = true;
        }
        else {
            this._attr.bSupportOfflines = false;
        }
        if (users.length > 0) {
            var user = void 0;
            for (var _a = 0, users_1 = users; _a < users_1.length; _a++) {
                user = users_1[_a];
                var pbUser = getPbObjectUser(user);
                retUsers.push(pbUser);
            }
        }
        for (var idx = 0; idx < retUsers.length; idx++) {
            usersEvent.addObj(makeObjUser(retUsers[idx]));
        }
        for (var idx = 0; idx < retAttrs.length; idx++) {
            var sKey = retAttrs[idx].key;
            var sValue = retAttrs[idx].value;
            if (sKey != "dtls" && sKey != "srtp") {
                attrsEvent.put(sKey, sValue);
            }
        }
        event.putOjb(IRtcEng.ETypeObjs.obj_type_atrrs, attrsEvent);
        event.putArrayOjb(IRtcEng.ETypeObjs.obj_type_users, usersEvent);
        this._events.push(event);
        var tp = {
            pSink: this,
            csid: this._clientid,
            p2pflag: this._attr.bP2pFlag,
            enable_srtp: this._bSrtp,
            enable_dtls: this._bDtls,
            video_sz: this._videoParser.getKeyInt("video_cap", "sz", 320 * 240),
            video_small_sc: this._videoParser.getKeyFloat("video_cap", "szs", 0.0),
            video_fps: this._videoParser.getKeyInt("video_cap", "fps", 25),
            screen_sz: this._videoParser.getKeyInt("screen_cap", "sz", 1280 * 720),
            screen_small_sc: this._videoParser.getKeyFloat("screen_cap", "szs", 0.0),
            screen_fps: this._videoParser.getKeyInt("screen_cap", "fps", 20),
            stun: { uri: this._stun.uri, usr: this._stun.user, pwd: this._stun.password },
            turn: { uri: this._turn.uri, usr: this._turn.user, pwd: this._turn.password },
        };
        if (tp.video_small_sc > 0.9)
            tp.video_small_sc = 0.0;
        if (tp.screen_small_sc > 0.9)
            tp.screen_small_sc = 0.0;
        this._pEngine.openEngine(tp);
        this._logined = true;
        if (!this._attr.bP2pFlag) {
            var peer = {
                peer: null,
                bSetPeerParams: false,
                bGotLocalParams: false,
                runningState: 0,
                curState: 0,
                bPublishing: false,
                webrtcState: 0,
            };
            peer.webrtcState = EWebrtcState.kRtcStateWaitOffer;
            peer.peer = this._pEngine.createPeer(SVRID, true);
            this._peers.set(SVRID, peer);
        }
    };
    RtcClientImpl.prototype._onAddParticipantRsp = function (rspHeader, pb) {
        //respond_add_participant
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_add_participants, rspHeader.errCode);
            return;
        }
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_add_participants);
        var ret = [];
        if (pb) {
            var users = pb.getUsersList();
            var objUsers = new ArrayObjImpl();
            if (users.length > 0) {
                var user = void 0;
                for (var _i = 0, users_2 = users; _i < users_2.length; _i++) {
                    user = users_2[_i];
                    var pbUser = getPbObjectUser(user);
                    ret.push(pbUser);
                    //ObjUserToUser
                    objUsers.addObj(makeObjUser(pbUser));
                }
            }
            event.putArrayOjb(IRtcEng.ETypeObjs.obj_type_users, objUsers);
        }
    };
    RtcClientImpl.prototype._onSetUserAttrsRsp = function (rspHeader, pb) {
        if (typeof (this._userAttrReqs[rspHeader.sequence]) == 'undefined') {
            return;
        }
        var req = this._userAttrReqs[rspHeader.sequence];
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_setuser_attr);
        event.put(Protos.EEventKey.eKeyClientID, Utils_1.default.uint8ToString(req.getClientid()));
        if (rspHeader.errCode != 0) {
            event.put(Protos.EEventKey.eKeyErrCode, rspHeader.errCode);
            this._events.push(event);
            return;
        }
        var attrs = req.getAttrsList();
        for (var _i = 0, attrs_4 = attrs; _i < attrs_4.length; _i++) {
            var attr = attrs_4[_i];
            var item = getPbObjectAttr(attr);
            event.put(item.key, item.value);
        }
        this._events.push(event);
    };
    RtcClientImpl.prototype._onSetRoomAttrsRsp = function (rspHeader, pb) {
        //respond_setroomattrs
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_setroom_attr, rspHeader.errCode);
            return;
        }
        var attrs = pb.getAttrsList();
        var attr;
        var ret = [];
        for (var _i = 0, attrs_5 = attrs; _i < attrs_5.length; _i++) {
            attr = attrs_5[_i];
            var retAttr = getPbObjectAttr(attr);
            ret.push(retAttr);
        }
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.resp_setroom_attr);
        for (var _a = 0, ret_1 = ret; _a < ret_1.length; _a++) {
            var a = ret_1[_a];
            event.put(a.key, a.value);
            this._attrMaps.set(a.key, a.value);
        }
        this._events.push(event);
    };
    RtcClientImpl.prototype._onUpdateMediaRsp = function (rspHeader, pb) {
        //respond_update_media
        if (rspHeader.errCode != 0) {
            this.commitSimpleEvent(Protos.EEventId.resp_publish_media, rspHeader.errCode);
            return;
        }
        if (this._attr.bP2pFlag)
            return;
        var pf = this.findPeerId(SVRID);
        if (!pf)
            return;
        if (pf.runningState == pf.curState) {
            var req = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_notify_webrtc_command);
            this.sendCommand(Protos.Protocol.cmd_notify_cancel_publish, req, false);
            return;
        }
        var sendType = 0;
        var stopType = pf.runningState;
        if (0 != (pf.runningState & Entity.EStreamType.kAudio) && 0 == (pf.curState & Entity.EStreamType.kAudio))
            stopType |= Entity.EStreamType.kAudio;
        else if (0 == (pf.runningState & Entity.EStreamType.kAudio) && 0 != (pf.curState & Entity.EStreamType.kAudio))
            sendType |= Entity.EStreamType.kAudio;
        if (0 != (pf.runningState & Entity.EStreamType.kVideo) && 0 == (pf.curState & Entity.EStreamType.kVideo))
            stopType |= Entity.EStreamType.kVideo;
        else if (0 == (pf.runningState & Entity.EStreamType.kVideo) && 0 != (pf.curState & Entity.EStreamType.kVideo))
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
    };
    RtcClientImpl.prototype._onSetMediaAttrRsp = function (rspHeader, pb) {
        if (rspHeader.errCode != 0) {
            //this.commitSimpleEvent(Protos.EEventId.resp_publish_media, rspHeader.errCode);
            return;
        }
        if (this._attr.bP2pFlag)
            return;
        //respond_set_media_attr
        var media = pb.getMedia();
        var pf = this.findPeerId(SVRID);
        if (!pf)
            return;
        var peer = pf.peer;
        var item = getPbObjectMedia(media);
        var vs = {};
        vs.width = vs.height = 0;
        if (item.name == "vodeo" && item.attrs) {
            for (var _i = 0, _a = item.attrs; _i < _a.length; _i++) {
                var av = _a[_i];
                if (av.key == "w") {
                    vs.width = parseInt(av.value);
                }
                else if (av.key == "h") {
                    vs.height = parseInt(av.value);
                }
            }
            if (vs.width != 0 && vs.height != 0) {
                peer.set(IRtcEng.Etype.kVideo_size, vs);
                pf.peer = peer;
                this._peers.set(SVRID, pf);
            }
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
        if (this._attr.bP2pFlag) {
            for (var _a = 0, ret_2 = ret; _a < ret_2.length; _a++) {
                var u = ret_2[_a];
                if (u.status == Protos.EUserStatus.st_online) {
                    var pf = {};
                    pf.peer = this._pEngine.createPeer(u.clientId, false);
                    this._peers.set(u.clientId, pf);
                }
                else {
                    var pf = this.findPeerId(u.clientId);
                    if (!pf)
                        continue;
                    this._pEngine.destroyPeer(pf.peer);
                    this._peers.del(u.clientId);
                }
            }
        }
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.ntf_status_chaned);
        for (var _b = 0, ret_3 = ret; _b < ret_3.length; _b++) {
            var u = ret_3[_b];
            event.put(Protos.EEventKey.eKeyClientID, u.clientId);
            event.put(Protos.EEventKey.eKeyClientKey, u.clientKey);
            event.put(Protos.EEventKey.eKeyStatus, u.status);
            for (var _c = 0, _d = u.attrs; _c < _d.length; _c++) {
                var a = _d[_c];
                event.put(a.key, a.value);
            }
        }
        this._events.push(event);
    };
    RtcClientImpl.prototype._onNotifySetUserAttrs = function (pb) {
        //notify_setuserattrs
        var clientid = Utils_1.default.uint8ToString(pb.getClientid());
        var attrs = pb.getAttrsList();
        var ret = [];
        for (var idx = 0; idx < attrs.length; idx++) {
            var attr = attrs[idx];
            var retAttr = getPbObjectAttr(attr);
            ret.push(retAttr);
        }
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.ntf_setuser_attr);
        event.put(Protos.EEventKey.eKeyClientID, clientid);
        for (var _i = 0, ret_4 = ret; _i < ret_4.length; _i++) {
            var attr = ret_4[_i];
            event.put(attr.key, attr.value);
        }
        this._events.push(event);
    };
    RtcClientImpl.prototype._onNotifySetRoomAttrs = function (pb) {
        //notify_setroomattrs
        var attrs = pb.getAttrsList();
        var ret = [];
        if (attrs.length > 0) {
            var attr = void 0;
            for (var _i = 0, attrs_6 = attrs; _i < attrs_6.length; _i++) {
                attr = attrs_6[_i];
                var retAttr = getPbObjectAttr(attr);
                ret.push(retAttr);
            }
        }
        var event = new BaseEventImpl();
        event.setEventId(Protos.EEventId.ntf_setroom_attr);
        for (var _a = 0, ret_5 = ret; _a < ret_5.length; _a++) {
            var a = ret_5[_a];
            event.put(a.key, a.value);
            this._attrMaps.set(a.key, a.value);
        }
        this._events.push(event);
    };
    RtcClientImpl.prototype._onNotifyMediaCtrl = function (pb) {
        //notify_media_ctrl
        var actions = pb.getActionsList();
        var paramList = pb.getParamsList();
        var params = Utils_1.default.uint8ArrayToStrArray(paramList);
        var pf = this.findPeerId(SVRID);
        if (!pf)
            return;
        var peer = pf.peer;
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var act = actions_1[_i];
            switch (act) {
                case Protos.EMediaCtrlActs.ctrl_act_sendvideo:
                    peer.pauseSend(Entity.EStreamType.kVideo, false);
                    break;
                case Protos.EMediaCtrlActs.ctrl_act_pausevideo:
                    peer.pauseSend(Entity.EStreamType.kVideo, true);
                    break;
                case Protos.EMediaCtrlActs.ctrl_act_sendaudio:
                    peer.pauseSend(Entity.EStreamType.kAudio, false);
                    break;
                case Protos.EMediaCtrlActs.ctrl_act_pauseaudio:
                    peer.pauseSend(Entity.EStreamType.kAudio, true);
                    break;
                case Protos.EMediaCtrlActs.ctrl_act_sendvideo1:
                    peer.pauseSend(Entity.EStreamType.kVideo1, false);
                    break;
                case Protos.EMediaCtrlActs.ctrl_act_pausevideo1:
                    peer.pauseSend(Entity.EStreamType.kVideo1, true);
                    break;
            }
        }
    };
    RtcClientImpl.prototype._onNotifyWebrtcCmd = function (pb) {
        //notify_webrtc_command
        var fromid = SVRID; //
        var toid = Utils_1.default.uint8ToString(pb.getToid());
        var msgType = Utils_1.default.uint8ToString(pb.getMsgtype());
        var rtcmsg = pb.getRtcmsg();
        var mline = rtcmsg.getMline();
        var mlineidx = rtcmsg.getMlineindex();
        var sdp = Utils_1.default.uint8ToString(rtcmsg.getSdp());
        var peerParam = Utils_1.default.uint8ToString(rtcmsg.getPeerparams());
        if (this._attr.bP2pFlag) {
            fromid = Utils_1.default.uint8ToString(pb.getFromid());
        }
        var peer = this.findPeerId(fromid);
        if (!peer)
            return;
        if (msgType == RTCSdkClient.cmd_webrtc_ice) {
            peer.peer.addIceCandidate(mline, mlineidx, sdp);
        }
        else {
            if (!peer.bSetPeerParams) {
                peer.bSetPeerParams = true;
                this._peers.set(fromid, peer);
                if (peerParam != "") {
                    peer.peer.setPeerParams(peerParam);
                }
            }
            var sdpType = 0;
            if (msgType == RTCSdkClient.cmd_webrtc_offer) {
                sdpType = IRtcEng.ESdpType.kOffer;
                peer.webrtcState |= EWebrtcState.kRtcStateWaitAnswer;
            }
            else if (msgType == RTCSdkClient.cmd_webrtc_answer) {
                sdpType = IRtcEng.ESdpType.kAnswer;
            }
            else if (msgType == RTCSdkClient.cmd_webrtc_preanswer) {
                sdpType = IRtcEng.ESdpType.kPreAnswer;
            }
            else {
                return;
            }
            peer.peer.setRemoteDescription(sdpType, sdp);
            this._peers.set(fromid, peer);
        }
    };
    RtcClientImpl.prototype._onNotifyRelogin = function (pb) {
        //notify_request_relogin
        var reason = pb.getReson();
        if (this._netStatus == ENetStatus.st_runing) {
            this.relogin(0, reason, false);
        }
    };
    RtcClientImpl.prototype._onNotifyBindStreams = function (pb) {
        var _this = this;
        //notify_bind_streams
        if (this._engineError || !this._reuseFlag) {
            return;
        }
        var peer = this.findPeerId(SVRID);
        if (!peer)
            return;
        var rmMedias = new MapUtil.MyMap();
        var newMedias = [];
        this._medias.forEach(function (k, v) {
            rmMedias.set(k, v);
        });
        var streams = pb.getStreamsList();
        var attr;
        var ret = [];
        for (var _i = 0, streams_1 = streams; _i < streams_1.length; _i++) {
            attr = streams_1[_i];
            var retAttr = getPbObjectAttr(attr);
            var csid = trimMediaType(retAttr.key);
            var mediaId = retAttr.value;
            if (rmMedias.has(mediaId)) {
                var item = rmMedias.getItem(mediaId);
                if (item.bindId == csid) {
                    rmMedias.del(csid);
                    continue;
                }
                if (item.streamId != "") {
                    if (item.bindId != "") {
                        this._pEngine.onRemoveStream(item.streamId, item.streamType, item.token, item.bindId, peer.peer);
                        this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyClientID, item.bindId, Protos.EEventKey.eKeyMediaType, item.szStreamType);
                    }
                    newMedias.push(item);
                }
                item.bindId = csid;
                rmMedias.del(csid);
            }
            else {
                var item = void 0;
                item.bindId = csid;
                this._medias.set(mediaId, item);
            }
        }
        rmMedias.forEach(function (k, v) {
            if (v.streamId == "") {
                _this._medias.del(k);
            }
            else {
                if (v.bindId != "") {
                    _this._pEngine.onRemoveStream(v.streamId, v.streamType, v.token, v.bindId, peer.peer);
                    _this.commitEvent(Protos.EEventId.ntf_removed_stream, Protos.EEventKey.eKeyClientID, v.bindId, Protos.EEventKey.eKeyMediaType, v.szStreamType);
                    v.bindId = "";
                    _this._medias.set(k, v);
                }
            }
        });
        for (var _a = 0, newMedias_1 = newMedias; _a < newMedias_1.length; _a++) {
            var media = newMedias_1[_a];
            this._pEngine.onAddStream(media.streamId, media.streamType, media.token, media.bindId, peer.peer);
            this.commitEvent(Protos.EEventId.ntf_added_stream, Protos.EEventKey.eKeyClientID, media.bindId, Protos.EEventKey.eKeyMediaType, media.szStreamType);
        }
    };
    RtcClientImpl.prototype._onNotifyError = function (pb) {
        //notify_error
        var ec = pb.getEc();
        var subec = pb.getSubec();
        var cmd = pb.getCmd();
        switch (ec) {
            case Protos.ErrorCode.ec_connect_lost:
                this.commitSimpleEvent(Protos.EEventId.ntf_netlost, 0);
                break;
            case Protos.ErrorCode.ec_asyn_logined:
                this.commitSimpleEvent(Protos.EEventId.ntf_asynlogined, 0);
                break;
            default:
                break;
        }
    };
    RtcClientImpl.prototype.findPeerId = function (csId) {
        return this._peers.getItem(csId);
    };
    RtcClientImpl.prototype.poll = function () {
        if (this._events.length < 1) {
            return null;
        }
        return this._events.shift();
    };
    RtcClientImpl._instance = null;
    return RtcClientImpl;
}());
;
function NewRtcClient() {
    return RtcClientImpl.getInstance();
}
exports.NewRtcClient = NewRtcClient;


/***/ }),

/***/ "./src/engine/IRtcEngine.ts":
/*!**********************************!*\
  !*** ./src/engine/IRtcEngine.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eEngineAct = exports.eStreamTypeEx = exports.Etype = exports.EResonRelogin = exports.ETypeObjs = exports.ESdpType = exports.EClientErr = void 0;
var EClientErr;
(function (EClientErr) {
    EClientErr[EClientErr["err_client_from"] = 100] = "err_client_from";
    EClientErr[EClientErr["err_connect_mcu_failed"] = 101] = "err_connect_mcu_failed";
    EClientErr[EClientErr["err_request_mcu_timeout"] = 102] = "err_request_mcu_timeout";
    EClientErr[EClientErr["err_connect_http_timeout"] = 103] = "err_connect_http_timeout";
    EClientErr[EClientErr["err_config"] = 104] = "err_config";
    EClientErr[EClientErr["err_connect_audio_server"] = 105] = "err_connect_audio_server";
    EClientErr[EClientErr["err_connect_http_failed"] = 106] = "err_connect_http_failed";
    EClientErr[EClientErr["err_network_pool"] = 107] = "err_network_pool";
    EClientErr[EClientErr["err_net_broken"] = 108] = "err_net_broken";
    EClientErr[EClientErr["err_not_logined"] = 109] = "err_not_logined";
    EClientErr[EClientErr["err_notfound_user"] = 110] = "err_notfound_user";
    EClientErr[EClientErr["err_not_init"] = 111] = "err_not_init";
    EClientErr[EClientErr["err_login_canceled"] = 112] = "err_login_canceled";
    //语音消息相关错误码   
    EClientErr[EClientErr["err_file_notfound"] = 150] = "err_file_notfound";
    EClientErr[EClientErr["err_file_badformat"] = 151] = "err_file_badformat";
    EClientErr[EClientErr["err_file_openfailed"] = 152] = "err_file_openfailed";
    EClientErr[EClientErr["err_task_busy"] = 153] = "err_task_busy";
    EClientErr[EClientErr["err_not_enough_space"] = 154] = "err_not_enough_space";
    EClientErr[EClientErr["err_file_recordfiled"] = 155] = "err_file_recordfiled";
    EClientErr[EClientErr["err_file_recorddataless"] = 156] = "err_file_recorddataless";
    EClientErr[EClientErr["err_voice_to_text_failed"] = 157] = "err_voice_to_text_failed";
    EClientErr[EClientErr["err_delete_file_failed"] = 199] = "err_delete_file_failed";
    EClientErr[EClientErr["err_connect_ftp_failed"] = 200] = "err_connect_ftp_failed";
    EClientErr[EClientErr["err_download_file_notfound"] = 201] = "err_download_file_notfound";
    EClientErr[EClientErr["err_download_url_notsupport"] = 202] = "err_download_url_notsupport";
    EClientErr[EClientErr["err_request_qntoken"] = 203] = "err_request_qntoken";
    EClientErr[EClientErr["err_request_down_url"] = 204] = "err_request_down_url";
    EClientErr[EClientErr["err_upload_file_failed"] = 205] = "err_upload_file_failed";
    EClientErr[EClientErr["err_upload_file_cancel"] = 206] = "err_upload_file_cancel";
    EClientErr[EClientErr["err_download_file_failed"] = 207] = "err_download_file_failed";
    EClientErr[EClientErr["err_download_cancel"] = 208] = "err_download_cancel";
    EClientErr[EClientErr["err_stt_svr_failed"] = 209] = "err_stt_svr_failed";
    EClientErr[EClientErr["err_time_too_long"] = 210] = "err_time_too_long";
})(EClientErr = exports.EClientErr || (exports.EClientErr = {}));
;
var ESdpType;
(function (ESdpType) {
    ESdpType[ESdpType["kOffer"] = 0] = "kOffer";
    ESdpType[ESdpType["kPreAnswer"] = 1] = "kPreAnswer";
    ESdpType[ESdpType["kAnswer"] = 2] = "kAnswer";
})(ESdpType = exports.ESdpType || (exports.ESdpType = {}));
;
var ETypeObjs;
(function (ETypeObjs) {
    ETypeObjs[ETypeObjs["obj_type_users"] = 1] = "obj_type_users";
    ETypeObjs[ETypeObjs["obj_type_atrrs"] = 2] = "obj_type_atrrs";
})(ETypeObjs = exports.ETypeObjs || (exports.ETypeObjs = {}));
;
var EResonRelogin;
(function (EResonRelogin) {
    EResonRelogin[EResonRelogin["sdp_error"] = 1] = "sdp_error";
    EResonRelogin[EResonRelogin["logic_error"] = 2] = "logic_error";
    EResonRelogin[EResonRelogin["p2p_to_many"] = 3] = "p2p_to_many";
    EResonRelogin[EResonRelogin["rtp_timeout"] = 4] = "rtp_timeout";
    EResonRelogin[EResonRelogin["netbroken"] = 20] = "netbroken";
    EResonRelogin[EResonRelogin["rtc_engine_error"] = 50] = "rtc_engine_error";
})(EResonRelogin = exports.EResonRelogin || (exports.EResonRelogin = {}));
;
var Etype;
(function (Etype) {
    Etype[Etype["kVideo_size"] = 1] = "kVideo_size";
    Etype[Etype["kVideo_size_1"] = 2] = "kVideo_size_1";
})(Etype = exports.Etype || (exports.Etype = {}));
;
var eStreamTypeEx;
(function (eStreamTypeEx) {
    eStreamTypeEx[eStreamTypeEx["kVideo1"] = 4] = "kVideo1";
})(eStreamTypeEx = exports.eStreamTypeEx || (exports.eStreamTypeEx = {}));
;
var eEngineAct;
(function (eEngineAct) {
    eEngineAct[eEngineAct["kAct_set_video_size"] = 1] = "kAct_set_video_size";
    eEngineAct[eEngineAct["kAct_set_video_1_size"] = 2] = "kAct_set_video_1_size";
    eEngineAct[eEngineAct["kAct_set_net_disabled"] = 3] = "kAct_set_net_disabled";
    eEngineAct[eEngineAct["kAct_set_net_enabled"] = 4] = "kAct_set_net_enabled";
})(eEngineAct = exports.eEngineAct || (exports.eEngineAct = {}));
;
;
;
;
;
;
;


/***/ }),

/***/ "./src/engine/RtcEngineImpl.ts":
/*!*************************************!*\
  !*** ./src/engine/RtcEngineImpl.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RtcEngineImpl = exports.TVideoToken = exports.RtcPeerImpl = void 0;
var RTCEngine = __importStar(__webpack_require__(/*! ./IRtcEngine */ "./src/engine/IRtcEngine.ts"));
var Entity = __importStar(__webpack_require__(/*! ../entity/Entity */ "./src/entity/Entity.ts"));
var RtcPeerImpl = /** @class */ (function () {
    function RtcPeerImpl(csid, bSendOffer, engine, pm) {
        var _this = this;
        this._peer_connect = null;
        this._engine = null;
        this._streams = {};
        this._video_sender = null;
        this._video_sender1 = null;
        this._audio_sender = null;
        this._enable_audio = false;
        this._enable_video = false;
        this._enable_video1 = false;
        this._sendingType = 0;
        this._csid = csid;
        this._engine = engine;
        this._param = pm;
        var cfg = {};
        cfg.iceServers = [];
        if (null != pm.stun && pm.stun.uri.length > 0) {
            cfg.iceServers.push({ credential: pm.stun.pwd, urls: pm.stun.uri, username: pm.stun.usr });
        }
        if (null != pm.turn && pm.turn.uri.length > 0) {
            cfg.iceServers.push({ credential: pm.turn.pwd, urls: pm.turn.uri, username: pm.turn.usr });
        }
        this._peer_connect = new RTCPeerConnection(cfg);
        this._peer_connect.onicecandidate = function (ev) {
            if (null != ev.candidate) {
                _this._param.pSink.onIceCandidate(ev.candidate.sdpMid, ev.candidate.sdpMLineIndex, ev.candidate.candidate, _this._csid);
            }
            else {
                // All ICE candidates have been sent
            }
        };
        this._peer_connect.ontrack = this.onAddTrack;
        if (bSendOffer) {
            this._peer_connect.createOffer()
                .then(this.onCreateSdpSucceed.bind(this, RTCEngine.ESdpType.kOffer))
                .catch(this.onFailed.bind(this, RTCEngine.ESdpType.kOffer));
        }
    }
    RtcPeerImpl.prototype.getVideoSize = function () {
        var ret = {
            width: 0,
            height: 0
        };
        var p = this._engine.videoSize(false);
        if (p)
            return p;
        return ret;
    };
    RtcPeerImpl.prototype.getVideoSize1 = function () {
        var ret = {
            width: 0,
            height: 0
        };
        var p = this._engine.videoSize(true);
        if (p)
            return p;
        return ret;
    };
    RtcPeerImpl.prototype.release = function () {
    };
    RtcPeerImpl.prototype.activeSender = function (sender, sendflag) {
        var transcivers = this._peer_connect.getTransceivers();
        for (var _i = 0, transcivers_1 = transcivers; _i < transcivers_1.length; _i++) {
            var tr = transcivers_1[_i];
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
    };
    RtcPeerImpl.prototype.synStreamTypes = function (sendtypes, stoptypes, selfid) {
        var bSenderChanged = this.addLocalTracks(sendtypes, selfid);
        this.removeLocalTracks(stoptypes);
        if (bSenderChanged) {
            console.log("RtcPeerImpl::synStreamTypes createOffer");
            this._peer_connect.createOffer()
                .then(this.onCreateSdpSucceed.bind(this, RTCEngine.ESdpType.kOffer))
                .catch(this.onFailed.bind(this, RTCEngine.ESdpType.kOffer));
        }
        console.log("RtcPeerImpl::SynStreamTypes OK");
    };
    RtcPeerImpl.prototype.addLocalTracks = function (sendtypes, selfid) {
        console.log("RtcPeerImpl::synStreamTypes ...");
        var bSenderChanged = false;
        if (Entity.EStreamType.kAudio & sendtypes) {
            if (0 == (Entity.EStreamType.kAudio & this._sendingType)) {
                var mtrack = this._engine.audioTrack();
                if (null != mtrack) {
                    mtrack.enabled = this._enable_audio;
                    if (null == this._audio_sender) {
                        // let stream: MediaStream�� 
                        this._audio_sender = this._peer_connect.addTrack(mtrack);
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
                var mtrack = this._engine.videoTrack(false, false);
                if (null != mtrack) {
                    mtrack.enabled = this._enable_video;
                    if (null == this._video_sender) {
                        // let stream: MediaStream�� 
                        this._video_sender = this._peer_connect.addTrack(mtrack);
                        bSenderChanged = true;
                        if (!this._param.p2pflag) {
                            var track1 = this._engine.videoTrack(true, true);
                            if (null != track1) {
                                track1.enabled = this._enable_video1;
                                this._video_sender1 = this._peer_connect.addTrack(track1);
                            }
                        }
                    }
                    else {
                        this._video_sender.replaceTrack(mtrack);
                        this.activeSender(this._video_sender, true);
                        if (!this._param.p2pflag) {
                            var track1 = this._engine.videoTrack(true, false);
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
    };
    RtcPeerImpl.prototype.removeLocalTracks = function (stoptypes) {
        console.log("RtcPeerImpl::removeLocalTracks ...");
        if (Entity.EStreamType.kAudio & stoptypes) {
            if (Entity.EStreamType.kAudio & this._sendingType) {
                this._sendingType &= ~Entity.EStreamType.kAudio;
                if (null != this._audio_sender) {
                    this._audio_sender.replaceTrack(null);
                    this.activeSender(this._audio_sender, false);
                }
            }
        }
        if (Entity.EStreamType.kVideo & stoptypes) {
            if (0 == (Entity.EStreamType.kVideo & this._sendingType)) {
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
    };
    RtcPeerImpl.prototype.onLocalStreamChanged = function () {
        var oldst = this._sendingType;
        this.removeLocalTracks(oldst);
        this.addLocalTracks(oldst, null);
        var vsize = this._engine.videoSize(false);
        console.log("RtcPeerImpl::onLocalStreamChanged video size");
        this._param.pSink.onEngineAction(RTCEngine.eEngineAct.kAct_set_video_size, vsize);
        if (this._engine._supportVideo1) {
            var vsize1 = this._engine.videoSize(true);
            if (null == vsize1)
                vsize1 = { width: 0, height: 0 };
            this._param.pSink.onEngineAction(RTCEngine.eEngineAct.kAct_set_video_1_size, vsize1);
        }
    };
    RtcPeerImpl.prototype.onAddTrack = function (ev) {
        if (ev.track.kind == "audio")
            return;
        var stream = ev.streams[0];
        this._streams[ev.track.id] = stream;
        this._param.pSink.onAddStream(stream.id, Entity.EStreamType.kVideo, ev.track.id, this._csid);
    };
    RtcPeerImpl.prototype.getRemoteStream = function (token) {
        return this._streams[token];
    };
    RtcPeerImpl.prototype.onSucceed = function (s, sdptype) {
        this._param.pSink.onSucceed(sdptype, s.sdp, this._csid);
    };
    RtcPeerImpl.prototype.onCreateSdpSucceed = function (s, sdptype) {
        this._peer_connect.setLocalDescription(s)
            .then(this.onSucceed.bind(this, sdptype))
            .catch(this.onFailed.bind(this, sdptype));
    };
    RtcPeerImpl.prototype.onFailed = function (reason, sdptype) {
        this._param.pSink.onFailed(sdptype, "sdp error", this._csid);
    };
    RtcPeerImpl.prototype.setRemoteDescription = function (sdptype, ssdp) {
        var stype = "offer";
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
        var desc = { sdp: ssdp, type: stype };
        this._peer_connect.setRemoteDescription(desc);
        if (RTCEngine.ESdpType.kOffer == sdptype) {
            this._peer_connect.createAnswer()
                .then(this.onCreateSdpSucceed.bind(this, RTCEngine.ESdpType.kAnswer))
                .catch(this.onFailed.bind(this, RTCEngine.ESdpType.kAnswer));
        }
    };
    RtcPeerImpl.prototype.addIceCandidate = function (mline, mlineindex, sdp) {
        var ice = { candidate: sdp, sdpMLineIndex: mlineindex, sdpMid: mline };
        this._peer_connect.addIceCandidate(ice);
    };
    RtcPeerImpl.prototype.pauseSend = function (sendtype, bPause) {
        if (Entity.EStreamType.kVideo & sendtype) {
            this._enable_video = !bPause;
            if (null != this._video_sender && null != this._video_sender.track)
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
    };
    RtcPeerImpl.prototype.setPeerParams = function (params) {
    };
    RtcPeerImpl.prototype.get = function (type, param) {
        if (type == RTCEngine.Etype.kVideo_size || type == RTCEngine.Etype.kVideo_size_1) {
            var sz = param;
            var smallflag = (type == RTCEngine.Etype.kVideo_size_1);
            var vsize = this._engine.videoSize(smallflag);
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
    };
    RtcPeerImpl.prototype.set = function (type, param) {
        return false;
    };
    RtcPeerImpl.prototype.getPeerID = function () {
        return this._csid;
    };
    return RtcPeerImpl;
}());
exports.RtcPeerImpl = RtcPeerImpl;
;
var TVideoToken = /** @class */ (function () {
    function TVideoToken() {
        this.video = null;
        this.stream = null;
        this.peer = null;
    }
    return TVideoToken;
}());
exports.TVideoToken = TVideoToken;
;
var RtcEngineImpl = /** @class */ (function () {
    function RtcEngineImpl() {
        this._supportVideo1 = false;
        this._remote_videos = {};
        this._screen_flag = false;
        this._peers = {};
    }
    RtcEngineImpl.prototype.setWebrtcEngineParams = function (name, params) {
    };
    RtcEngineImpl.prototype.openEngine = function (p) {
        this._param = p;
        this._supportVideo1 = 0 != p.video_small_sc || 0 != p.screen_small_sc;
    };
    RtcEngineImpl.prototype.closeEngine = function () {
        this.removeAllStream(null);
        for (var _i = 0, _a = this._peers; _i < _a.length; _i++) {
            var key = _a[_i];
            var peerImpl = this._peers[key];
            peerImpl.release();
        }
        this._peers = null;
    };
    RtcEngineImpl.prototype.createPeer = function (csid, bSendOffer) {
        var peer = new RtcPeerImpl(csid, bSendOffer, this, this._param);
        this._peers[csid] = peer;
        return peer;
    };
    RtcEngineImpl.prototype.destroyPeer = function (peer) {
        var peelImpl = this._peers[peer.getPeerID()];
        this.removeAllStream(peer);
        peelImpl.release();
        delete this._peers[peer.getPeerID()];
    };
    RtcEngineImpl.prototype.getDeviceID = function () {
        return "s:web|xxx";
    };
    RtcEngineImpl.prototype.getDeviceInfo = function () {
        return "";
    };
    RtcEngineImpl.prototype.getLocalParamsForPeer = function () {
        return "";
    };
    RtcEngineImpl.prototype.removeAllStream = function (peer) {
        var del_items = new Array();
        for (var _i = 0, _a = this._remote_videos; _i < _a.length; _i++) {
            var key = _a[_i];
            var tk = this._remote_videos[key];
            if (null == peer || tk.peer == peer) {
                if (null != tk.video)
                    tk.video.srcObject = null;
                else
                    del_items.push(key);
                tk.stream = null;
                tk.peer = null;
            }
        }
        for (var _b = 0, del_items_1 = del_items; _b < del_items_1.length; _b++) {
            var val = del_items_1[_b];
            delete this._remote_videos[val];
        }
    };
    RtcEngineImpl.prototype.setLocalStreams = function (localstream, screenflag) {
        this._local_stream = localstream;
        this._screen_flag = screenflag;
        //update medias
        for (var _i = 0, _a = this._peers; _i < _a.length; _i++) {
            var key = _a[_i];
            var peer = this._peers[key];
            peer.onLocalStreamChanged();
        }
    };
    RtcEngineImpl.prototype.audioTrack = function () {
        if (null == this._local_stream)
            return null;
        var mediatracks = this._local_stream.getAudioTracks();
        if (null == mediatracks)
            return null;
        return mediatracks[0];
    };
    RtcEngineImpl.prototype.videoSize = function (small) {
        if (null == this._local_stream)
            return null;
        var mediatracks = this._local_stream.getVideoTracks();
        if (null == mediatracks)
            return null;
        if (this._screen_flag) {
            if (small)
                return null;
            var vSize = { width: 160, height: 320 };
            while (true) {
                if ((vSize.width * vSize.height) >= (this._param.screen_sz - 100))
                    return vSize;
                vSize.width += 160;
                vSize.height += 320;
            }
        }
        else {
            if (small)
                return { width: 320, height: 240 };
            else
                return { width: 160, height: 122 };
        }
    };
    RtcEngineImpl.prototype.videoTrack = function (small, firstAddTrack) {
        if (null == this._local_stream)
            return null;
        var mediatracks = this._local_stream.getVideoTracks();
        if (null == mediatracks)
            return null;
        if (!this._supportVideo1 && small)
            return null;
        if (this._screen_flag) {
            return mediatracks[0];
        }
        else {
            var vsize = this.videoSize(small);
            var mtrack = mediatracks[0].clone();
            var tc = { frameRate: 20, height: vsize.height, width: vsize.width };
            mtrack.applyConstraints(tc);
            return mtrack;
        }
    };
    RtcEngineImpl.prototype.onAddStream = function (streamid, streamtype, token, csid, peer) {
        var peerImpl = this._peers[peer.getPeerID()];
        if (null == peerImpl)
            return;
        var stream = peerImpl.getRemoteStream(token);
        if (null == stream) {
            console.log("onAddStream stream not found");
            return;
        }
        console.log("RtcEngineImpl::onAddStream streamid=", streamid, " =>", csid);
        var tk = this._remote_videos[csid];
        if (null == tk) {
            tk = new TVideoToken();
            tk.peer = peer;
            tk.stream = stream;
            this._remote_videos[csid] = tk;
        }
        else {
            tk.peer = peer;
            tk.stream = stream;
            tk.video.srcObject = stream;
        }
    };
    RtcEngineImpl.prototype.onRemoveStream = function (streamid, streamtype, token, csid, peer) {
        var tk = this._remote_videos[csid];
        if (null == tk) {
            console.log("RtcEngineImpl::onRemoveStream csid=", csid, " not found");
            return;
        }
        console.log("RtcEngineImpl::onRemoveStream csid=", csid);
        tk.peer = null;
        tk.stream = null;
        if (null == tk.video) {
            delete this._remote_videos[csid];
        }
    };
    RtcEngineImpl.prototype.setRemoteVideo = function (csid, video) {
        var tk = this._remote_videos[csid];
        if (tk == null) {
            if (null == video)
                return;
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
            tk.video == video;
            if (null == tk.video && null == tk.stream) {
                delete this._remote_videos[csid];
                return;
            }
            if (null != tk.video && null != tk.stream) {
                tk.video.srcObject = tk.stream;
            }
        }
    };
    return RtcEngineImpl;
}());
exports.RtcEngineImpl = RtcEngineImpl;
;


/***/ }),

/***/ "./src/entity/Entity.ts":
/*!******************************!*\
  !*** ./src/entity/Entity.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EWebrtcState = exports.EStreamType = exports.ESettingKey = exports.EUrlType = void 0;
var EUrlType;
(function (EUrlType) {
    EUrlType[EUrlType["kServerndex"] = 1] = "kServerndex";
    EUrlType[EUrlType["kServerMcu"] = 2] = "kServerMcu";
})(EUrlType = exports.EUrlType || (exports.EUrlType = {}));
;
var ESettingKey;
(function (ESettingKey) {
    ESettingKey[ESettingKey["kP2pEnable"] = 1] = "kP2pEnable";
    ESettingKey[ESettingKey["kP2pConnectTimeout"] = 2] = "kP2pConnectTimeout";
    ESettingKey[ESettingKey["kScreenIsVbr"] = 3] = "kScreenIsVbr";
    ESettingKey[ESettingKey["kVideoIsVbr"] = 4] = "kVideoIsVbr";
    ESettingKey[ESettingKey["kScreenRateWatch"] = 5] = "kScreenRateWatch";
    ESettingKey[ESettingKey["kVideoRateWatch"] = 6] = "kVideoRateWatch";
    ESettingKey[ESettingKey["kReporterId"] = 10] = "kReporterId";
})(ESettingKey = exports.ESettingKey || (exports.ESettingKey = {}));
;
var EStreamType;
(function (EStreamType) {
    EStreamType[EStreamType["kAudio"] = 1] = "kAudio";
    EStreamType[EStreamType["kVideo"] = 2] = "kVideo";
    EStreamType[EStreamType["kVideo1"] = 4] = "kVideo1";
})(EStreamType = exports.EStreamType || (exports.EStreamType = {}));
;
;
var EWebrtcState;
(function (EWebrtcState) {
    EWebrtcState[EWebrtcState["kWebrtcWaitOffer"] = 1] = "kWebrtcWaitOffer";
    EWebrtcState[EWebrtcState["kWebrtcWaitAnwer"] = 2] = "kWebrtcWaitAnwer";
})(EWebrtcState = exports.EWebrtcState || (exports.EWebrtcState = {}));
;
;
;
;
;
;


/***/ }),

/***/ "./src/entity/MsgEntity.ts":
/*!*********************************!*\
  !*** ./src/entity/MsgEntity.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ENetStatus = void 0;
var ENetStatus;
(function (ENetStatus) {
    ENetStatus[ENetStatus["kNetStatus_Idle"] = 0] = "kNetStatus_Idle";
    ENetStatus[ENetStatus["kNetStatus_Connecting"] = 1] = "kNetStatus_Connecting";
    ENetStatus[ENetStatus["kNetStatus_Connected"] = 2] = "kNetStatus_Connected";
    ENetStatus[ENetStatus["kNetStatus_DisConnect"] = 3] = "kNetStatus_DisConnect";
})(ENetStatus = exports.ENetStatus || (exports.ENetStatus = {}));
;
;


/***/ }),

/***/ "./src/net/HttpHelper.ts":
/*!*******************************!*\
  !*** ./src/net/HttpHelper.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//import httploader = require('./httploader.js');
Object.defineProperty(exports, "__esModule", ({ value: true }));
var HttpHelper = /** @class */ (function () {
    function HttpHelper() {
        this.mReq = null;
        this.mCb = null;
        this.mContext = "";
    }
    HttpHelper.prototype.Open = function (url, method, context) {
        if (context === void 0) { context = ""; }
        this.mReq = new window.XMLHttpRequest; //httploader.NewXMLHttpRequest(); 
        this.mReq.timeout = 5000;
        this.mContext = context;
        this.mReq.onreadystatechange = this.OnHttpFuncion.bind(this);
        if (method == null || method === undefined) {
            method = "POST";
        }
        if (method.toUpperCase() !== "POST" && method.toUpperCase() !== "GET") {
            method = "POST";
        }
        this.mReq.open(method, url, true);
        this.mReq.onerror = this.OnError.bind(this);
        this.mReq.ontimeout = this.OnTimeout.bind(this);
        this.mReq.onabort = this.OnAbort.bind(this);
    };
    HttpHelper.prototype.SetHeader = function (header, value) {
        this.mReq.setRequestHeader(header, value);
    };
    HttpHelper.prototype.Send = function (data, cb) {
        if (data === void 0) { data = ""; }
        if (cb === void 0) { cb = null; }
        this.mCb = cb;
        this.mReq.send(data);
    };
    HttpHelper.prototype.OnHttpFuncion = function () {
        if (this.mReq.readyState == 4 && (this.mReq.status >= 200 && this.mReq.status < 400)) {
            //var res = JSON.parse(this.mReq.responseText);
            if (null != this.mCb) {
                this.mCb(200, this.mReq.responseText, this.mContext);
            }
        }
    };
    HttpHelper.prototype.OnError = function (e) {
        console.log("on http error : " + e);
        if (null != this.mCb) {
            this.mCb(404, "", this.mContext);
        }
    };
    HttpHelper.prototype.OnTimeout = function (e) {
        console.log("on http timeout : " + e);
        if (null != this.mCb) {
            this.mCb(505, "", this.mContext);
        }
    };
    HttpHelper.prototype.OnAbort = function (e) {
        console.log("on http abort : " + e);
        if (null != this.mCb) {
            this.mCb(550, "", this.mContext);
        }
    };
    return HttpHelper;
}());
exports.default = HttpHelper;


/***/ }),

/***/ "./src/net/WSHelper.ts":
/*!*****************************!*\
  !*** ./src/net/WSHelper.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var MsgEntity_1 = __webpack_require__(/*! ../entity/MsgEntity */ "./src/entity/MsgEntity.ts");
var Packed = __importStar(__webpack_require__(/*! ../protocol/Packer */ "./src/protocol/Packer.ts"));
var ProtoHelper = __importStar(__webpack_require__(/*! ../protocol/ProtoHelper */ "./src/protocol/ProtoHelper.ts"));
var Protos = __importStar(__webpack_require__(/*! ../protocol/Protocol */ "./src/protocol/Protocol.ts"));
function logout() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    console.log(data);
}
var _dummyDump = /** @class */ (function () {
    function _dummyDump() {
    }
    _dummyDump.prototype.OnNetStatus = function (iStatus, iReason) {
        throw new Error("Method not implemented.");
    };
    _dummyDump.prototype.OnMessage = function (pkt) {
        throw new Error("Method not implemented.");
    };
    return _dummyDump;
}());
function getUnixTick() {
    return Math.round(new Date().getTime() / 1000);
}
var WSHelper = /** @class */ (function () {
    function WSHelper() {
        this._url = '';
        this._netStatus = MsgEntity_1.ENetStatus.kNetStatus_Idle;
        this._callFunc = null;
        this._socket = null;
        this._lastMsgTick = getUnixTick();
        this.sequence = 0;
    }
    WSHelper.prototype.setCallback = function (cb) {
        this._callFunc = cb;
    };
    WSHelper.prototype.open = function (url, cb) {
        console.log("websocket open ", url);
        if (cb) {
            this._callFunc = cb;
        }
        if (this._url == url && this._socket != null) {
            return 0;
        }
        if (url != "") {
            this._url = url;
        }
        this._socket = new WebSocket(this._url);
        this._socket.onopen = this._onOpen.bind(this);
        this._socket.onclose = this._onClose.bind(this);
        this._socket.onmessage = this._onMessage.bind(this);
        this._socket.onerror = this._onError.bind(this);
        return 0;
    };
    WSHelper.prototype.isok = function () {
        return this._netStatus == MsgEntity_1.ENetStatus.kNetStatus_Connected;
    };
    WSHelper.prototype.close = function () {
        console.log("websocket quit now ");
        this._netStatus = MsgEntity_1.ENetStatus.kNetStatus_Idle;
        if (this._timeoutId) {
            clearInterval(this._timeoutId);
            this._timeoutId = null;
        }
        if (this._socket != null) {
            this._socket.close();
            this._socket = null;
        }
    };
    WSHelper.prototype.send = function (bts) {
        if (this._socket == null) {
            return -1;
        }
        if (this._netStatus != MsgEntity_1.ENetStatus.kNetStatus_Connected) {
            return -2;
        }
        this._socket.send(bts);
        return 0;
    };
    WSHelper.prototype._reportNetStatus = function (status, reason) {
        if (reason === void 0) { reason = 0; }
        this._netStatus = status;
        if (this._callFunc) {
            this._callFunc.OnNetStatus(status, reason);
        }
    };
    WSHelper.prototype._onOpen = function (evt) {
        if (this._socket != null) {
            this._socket.binaryType = "arraybuffer";
        }
        if (this._timeoutId) {
            clearInterval(this._timeoutId);
            this._timeoutId = null;
        }
        this._timeoutId = setInterval(this._pingLoop.bind(this), 10000);
        this._reportNetStatus(MsgEntity_1.ENetStatus.kNetStatus_Connected);
    };
    WSHelper.prototype._onClose = function (err) {
        console.log("socket onclose err:", err);
        if (this._timeoutId) {
            clearInterval(this._timeoutId);
            this._timeoutId = null;
        }
        this._reportNetStatus(MsgEntity_1.ENetStatus.kNetStatus_DisConnect, 1);
    };
    WSHelper.prototype._onError = function (err) {
        console.log("socket onerror err:", err);
        if (this._timeoutId) {
            clearInterval(this._timeoutId);
            this._timeoutId = null;
        }
        this._reportNetStatus(MsgEntity_1.ENetStatus.kNetStatus_DisConnect, 2);
    };
    WSHelper.prototype._onMessage = function (evt) {
        if (!evt || !evt.data || typeof evt.data == 'undefined') {
            console.log("_onMessage msg evt is null or data is null evt.data=", evt.data);
            return;
        }
        this._lastMsgTick = getUnixTick();
        var pkt = Packed.Packeter.ParseRsp(evt.data);
        if (pkt) {
            if (pkt.cmdid != 1) {
                console.log("parse packet cmd=", pkt.cmdid, ",errCode=", pkt.rspHeader.errCode, ",pb=", pkt.pb);
            }
            if (this._callFunc) {
                this._callFunc.OnMessage(pkt);
            }
        }
    };
    WSHelper.prototype._pingLoop = function () {
        if (this._netStatus != MsgEntity_1.ENetStatus.kNetStatus_Connected) {
            return;
        }
        var pbPing = ProtoHelper.NewProtoReq(Protos.Protocol.cmd_ping);
        pbPing.setTimestamp(getUnixTick());
        var pbHead = {
            sequence: this.sequence,
            session: '',
            token: ''
        };
        var btReq = Packed.Packeter.PackReq(Protos.Protocol.cmd_ping, pbHead, pbPing);
        return this._socket.send(btReq);
    };
    return WSHelper;
}());
exports.default = WSHelper;


/***/ }),

/***/ "./src/protocol/Packer.ts":
/*!********************************!*\
  !*** ./src/protocol/Packer.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Packeter = void 0;
var ProtoHelper = __importStar(__webpack_require__(/*! ./ProtoHelper */ "./src/protocol/ProtoHelper.ts"));
var Protocol_1 = __webpack_require__(/*! ./Protocol */ "./src/protocol/Protocol.ts");
var Packeter = /** @class */ (function () {
    function Packeter() {
    }
    Packeter.PackData = function (pb) {
        return pb.serializeBinary();
    };
    Packeter.PackLite = function (cmd, msg) {
        var btHeader;
        var headerLen = 0;
        var btBody = new Uint8Array(0);
        var bodyLen = 0;
        var tmp = Packeter.PackData(msg);
        if (tmp) {
            btBody = tmp;
            bodyLen = tmp.length;
        }
        var req = new Uint8Array(8 + headerLen + bodyLen);
        req[0] = (cmd & 0xFF);
        req[1] = 0;
        req[2] = headerLen & 0xFF;
        req[3] = (headerLen >> 8) & 0xFF;
        req[4] = bodyLen & 0xFF;
        req[5] = (bodyLen >> 8) & 0xFF;
        req[6] = (bodyLen >> 16) & 0xFF;
        req[7] = (bodyLen >> 24) & 0xFF;
        if (headerLen > 0) {
            req.set(btHeader, 8);
        }
        if (bodyLen > 0) {
            req.set(btBody, 8 + headerLen);
        }
        return req;
    };
    Packeter.PackReq = function (cmd, header, msg) {
        var headerReq = ProtoHelper.MakeReqHeader(header.sequence, header.session, header.token);
        var btHeader;
        var headerLen = 0;
        var btBody = new Uint8Array(0);
        var bodyLen = 0;
        var tmp = Packeter.PackData(headerReq);
        if (tmp) {
            btHeader = tmp;
            headerLen = tmp.length;
        }
        else {
            return null;
        }
        tmp = Packeter.PackData(msg);
        if (tmp) {
            btBody = tmp;
            bodyLen = tmp.length;
        }
        var req = new Uint8Array(8 + headerLen + bodyLen);
        req[0] = (cmd & 0xFF);
        req[1] = 0;
        req[2] = headerLen & 0xFF;
        req[3] = (headerLen >> 8) & 0xFF;
        req[4] = bodyLen & 0xFF;
        req[5] = (bodyLen >> 8) & 0xFF;
        req[6] = (bodyLen >> 16) & 0xFF;
        req[7] = (bodyLen >> 24) & 0xFF;
        req.set(btHeader, 8);
        if (bodyLen > 0) {
            req.set(btBody, 8 + headerLen);
        }
        return req;
    };
    Packeter.ParseRsp = function (data) {
        var bts = new Uint8Array(data.byteLength);
        var dv = new DataView(data);
        for (var i = 0; i < dv.byteLength; i++) {
            bts[i] = dv.getUint8(i);
        }
        var cmdid = bts[0];
        var flag = bts[1];
        var headerLen = bts[2] | (bts[3] << 8);
        var bodyLen = bts[4] | (bts[5] << 8) | (bts[6] << 16) | (bts[7] << 24);
        console.log("all len=", bts.byteLength, ",cmdid=", cmdid, ",flag=", flag, ",pb header len = ", headerLen, ",body len =", bodyLen);
        var btHeader = bts.subarray(8, 8 + headerLen);
        var rsp = {
            cmdid: cmdid,
            msgType: Protocol_1.EMsgType.kMsgTypeRsp,
            reqHeader: null,
            rspHeader: null,
            pb: null
        };
        var pbHeader = ProtoHelper.ParseRspHeader(btHeader);
        if (!pbHeader) {
            throw "ParseRsp Rsp Header error";
        }
        var rspHeader = {
            sequence: pbHeader.getSn(),
            errCode: pbHeader.getEc(),
            subErrCode: pbHeader.getSubec(),
            processSpan: pbHeader.getDbspan(),
            token: pbHeader.getToken(),
        };
        rsp.rspHeader = rspHeader;
        if (bodyLen > 0) {
            var btBody = bts.subarray(8 + headerLen);
            var pbBody = ProtoHelper.ParseProtoRsp(cmdid, btBody);
            if (!pbBody) {
                throw "ParseRsp pb body error";
            }
            rsp.pb = pbBody;
        }
        return rsp;
    };
    return Packeter;
}());
exports.Packeter = Packeter;
;


/***/ }),

/***/ "./src/protocol/ProtoHelper.ts":
/*!*************************************!*\
  !*** ./src/protocol/ProtoHelper.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base64D = exports.Base64E = exports.MakeNumberUint8Array = exports.MakeReqHeader = exports.NewReqHeader = exports.ParseRspHeader = exports.ParseProtoRsp = exports.NewProtoObjectArray = exports.NewProtoObject = exports.NewProtoReq = void 0;
var protos = __importStar(__webpack_require__(/*! ./protos.js */ "./src/protocol/protos.js"));
var Utils_1 = __importDefault(__webpack_require__(/*! ../utils/Utils */ "./src/utils/Utils.ts"));
function NewProtoReq(cmdid) {
    return protos.NewProtoReq(cmdid);
}
exports.NewProtoReq = NewProtoReq;
function NewProtoObject(name) {
    return protos.NewProtoObject(name);
}
exports.NewProtoObject = NewProtoObject;
function NewProtoObjectArray(name) {
    return protos.NewProtoObjectArray(name);
}
exports.NewProtoObjectArray = NewProtoObjectArray;
function ParseProtoRsp(cmdid, body) {
    return protos.ParseProtoRsp(cmdid, body);
}
exports.ParseProtoRsp = ParseProtoRsp;
function ParseRspHeader(body) {
    return protos.ParseRspHeader(body);
}
exports.ParseRspHeader = ParseRspHeader;
function NewReqHeader() {
    return protos.NewReqHeader();
}
exports.NewReqHeader = NewReqHeader;
function MakeReqHeader(sequence, sesison, token) {
    return protos.MakeReqHeader(sequence, sesison, token);
}
exports.MakeReqHeader = MakeReqHeader;
function MakeNumberUint8Array(v, bitSize) {
    var da = new ArrayBuffer(bitSize);
    var dv = new DataView(da, 0, bitSize);
    if (bitSize < 0 || bitSize > 8) {
        return new Uint8Array(0);
    }
    if (bitSize == 1) {
        dv.setUint8(0, v);
    }
    else if (bitSize == 2) {
        dv.setUint16(0, v);
    }
    else if (bitSize == 4) {
        dv.setUint32(0, v);
    }
    else if (bitSize == 8) {
        dv.setFloat64(0, v);
    }
    return new Uint8Array(da);
}
exports.MakeNumberUint8Array = MakeNumberUint8Array;
function Base64E(str) {
    return Utils_1.default.base64Encode(str);
}
exports.Base64E = Base64E;
function Base64D(str) {
    if (str == '' || str == ' ') {
        return '';
    }
    //return Utils.base64Decode(str);
    return "";
}
exports.Base64D = Base64D;


/***/ }),

/***/ "./src/protocol/Protocol.ts":
/*!**********************************!*\
  !*** ./src/protocol/Protocol.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EReloginReson = exports.EUserStatus = exports.EMediaCtrlActs = exports.EMsgType = exports.ErrorCode = exports.EEventKey = exports.EEventId = exports.Protocol = void 0;
var Protocol;
(function (Protocol) {
    Protocol[Protocol["cmd_eCmdC2S_none"] = 0] = "cmd_eCmdC2S_none";
    Protocol[Protocol["cmd_ping"] = 1] = "cmd_ping";
    Protocol[Protocol["cmd_register"] = 2] = "cmd_register";
    Protocol[Protocol["cmd_add_participant"] = 3] = "cmd_add_participant";
    Protocol[Protocol["cmd_setuserattrs"] = 4] = "cmd_setuserattrs";
    Protocol[Protocol["cmd_setroomattrs"] = 5] = "cmd_setroomattrs";
    Protocol[Protocol["cmd_update_media"] = 6] = "cmd_update_media";
    Protocol[Protocol["cmd_set_media_attr"] = 7] = "cmd_set_media_attr";
    Protocol[Protocol["cmd_order_unorder"] = 8] = "cmd_order_unorder";
    Protocol[Protocol["cmd_order_streams"] = 9] = "cmd_order_streams";
    Protocol[Protocol["cmd_old_update_media"] = 10] = "cmd_old_update_media";
    Protocol[Protocol["cmd_request_end"] = 99] = "cmd_request_end";
    Protocol[Protocol["cmd_notify_user_status"] = 100] = "cmd_notify_user_status";
    Protocol[Protocol["cmd_notify_setuserattrs"] = 101] = "cmd_notify_setuserattrs";
    Protocol[Protocol["cmd_notify_setroomattrs"] = 102] = "cmd_notify_setroomattrs";
    Protocol[Protocol["cmd_notify_media_ctrl"] = 103] = "cmd_notify_media_ctrl";
    Protocol[Protocol["cmd_notify_webrtc_command"] = 104] = "cmd_notify_webrtc_command";
    Protocol[Protocol["cmd_notify_request_relogin"] = 105] = "cmd_notify_request_relogin";
    Protocol[Protocol["cmd_notify_bind_streams"] = 106] = "cmd_notify_bind_streams";
    Protocol[Protocol["cmd_notify_cancel_publish"] = 107] = "cmd_notify_cancel_publish";
    Protocol[Protocol["cmd_notify_error"] = 250] = "cmd_notify_error";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
;
var EEventId;
(function (EEventId) {
    EEventId[EEventId["resp_login"] = 1] = "resp_login";
    EEventId[EEventId["resp_setroom_attr"] = 2] = "resp_setroom_attr";
    EEventId[EEventId["resp_setuser_attr"] = 3] = "resp_setuser_attr";
    EEventId[EEventId["resp_add_participants"] = 4] = "resp_add_participants";
    EEventId[EEventId["resp_publish_media"] = 5] = "resp_publish_media";
    EEventId[EEventId["resp_logout"] = 6] = "resp_logout";
    EEventId[EEventId["ntf_relogin_waiting"] = 48] = "ntf_relogin_waiting";
    EEventId[EEventId["ntf_relogin_begin"] = 49] = "ntf_relogin_begin";
    EEventId[EEventId["ntf_netlost"] = 50] = "ntf_netlost";
    EEventId[EEventId["ntf_asynlogined"] = 51] = "ntf_asynlogined";
    EEventId[EEventId["ntf_status_chaned"] = 52] = "ntf_status_chaned";
    EEventId[EEventId["ntf_added_stream"] = 53] = "ntf_added_stream";
    EEventId[EEventId["ntf_removed_stream"] = 54] = "ntf_removed_stream";
    EEventId[EEventId["ntf_setroom_attr"] = 60] = "ntf_setroom_attr";
    EEventId[EEventId["ntf_setuser_attr"] = 61] = "ntf_setuser_attr";
    EEventId[EEventId["ntf_applogin"] = 64] = "ntf_applogin";
    EEventId[EEventId["ntf_engine_error"] = 65] = "ntf_engine_error";
    EEventId[EEventId["ntf_show_log"] = 100] = "ntf_show_log";
    EEventId[EEventId["ntf_net_status"] = 101] = "ntf_net_status";
    EEventId[EEventId["engine_event_from"] = 200] = "engine_event_from";
})(EEventId = exports.EEventId || (exports.EEventId = {}));
;
var EEventKey;
(function (EEventKey) {
    EEventKey[EEventKey["eKeyErrCode"] = 1] = "eKeyErrCode";
    EEventKey[EEventKey["eKeyClientID"] = 2] = "eKeyClientID";
    EEventKey[EEventKey["eKeyClientKey"] = 3] = "eKeyClientKey";
    EEventKey[EEventKey["eKeyStatus"] = 4] = "eKeyStatus";
    EEventKey[EEventKey["eKeyErrMsg"] = 5] = "eKeyErrMsg";
    EEventKey[EEventKey["eKeyRoomKey"] = 6] = "eKeyRoomKey";
    EEventKey[EEventKey["eKeyReLoginReson"] = 7] = "eKeyReLoginReson";
    EEventKey[EEventKey["eKeyMediaType"] = 8] = "eKeyMediaType";
    EEventKey[EEventKey["eKeyRoomID"] = 9] = "eKeyRoomID";
    EEventKey[EEventKey["eKeyAppType"] = 10] = "eKeyAppType";
    EEventKey[EEventKey["eKeyAppKey"] = 11] = "eKeyAppKey";
    EEventKey[EEventKey["eKeyParams"] = 12] = "eKeyParams";
    EEventKey[EEventKey["eKeyEngineFrom"] = 200] = "eKeyEngineFrom";
})(EEventKey = exports.EEventKey || (exports.EEventKey = {}));
;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ec_succeed"] = 0] = "ec_succeed";
    ErrorCode[ErrorCode["ec_params"] = 1] = "ec_params";
    ErrorCode[ErrorCode["ec_connect_lost"] = 2] = "ec_connect_lost";
    ErrorCode[ErrorCode["ec_unsupport"] = 3] = "ec_unsupport";
    ErrorCode[ErrorCode["ec_logic_error"] = 4] = "ec_logic_error";
    ErrorCode[ErrorCode["ec_sdp_error"] = 5] = "ec_sdp_error";
    ErrorCode[ErrorCode["ec_unsupport_media"] = 8] = "ec_unsupport_media";
    ErrorCode[ErrorCode["ec_repeated_offer"] = 10] = "ec_repeated_offer";
    ErrorCode[ErrorCode["ec_not_publish"] = 11] = "ec_not_publish";
    ErrorCode[ErrorCode["ec_track_full"] = 13] = "ec_track_full";
    ErrorCode[ErrorCode["ec_not_register"] = 14] = "ec_not_register";
    ErrorCode[ErrorCode["ec_asyn_logined"] = 50] = "ec_asyn_logined";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
;
var EMsgType;
(function (EMsgType) {
    EMsgType[EMsgType["kMsgTypeReq"] = 0] = "kMsgTypeReq";
    EMsgType[EMsgType["kMsgTypeRsp"] = 1] = "kMsgTypeRsp";
})(EMsgType = exports.EMsgType || (exports.EMsgType = {}));
;
/***********enum from proto************ */
var EMediaCtrlActs;
(function (EMediaCtrlActs) {
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_none"] = 0] = "ctrl_act_none";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_sendvideo"] = 1] = "ctrl_act_sendvideo";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_pausevideo"] = 2] = "ctrl_act_pausevideo";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_sendaudio"] = 4] = "ctrl_act_sendaudio";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_pauseaudio"] = 3] = "ctrl_act_pauseaudio";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_sendvideo1"] = 5] = "ctrl_act_sendvideo1";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_pausevideo1"] = 6] = "ctrl_act_pausevideo1";
})(EMediaCtrlActs = exports.EMediaCtrlActs || (exports.EMediaCtrlActs = {}));
;
var EUserStatus;
(function (EUserStatus) {
    EUserStatus[EUserStatus["st_wait_join"] = 0] = "st_wait_join";
    EUserStatus[EUserStatus["st_online"] = 1] = "st_online";
    EUserStatus[EUserStatus["st_net_broken"] = 2] = "st_net_broken";
    EUserStatus[EUserStatus["st_left"] = 3] = "st_left";
})(EUserStatus = exports.EUserStatus || (exports.EUserStatus = {}));
;
var EReloginReson;
(function (EReloginReson) {
    EReloginReson[EReloginReson["reson_undefined"] = 0] = "reson_undefined";
    EReloginReson[EReloginReson["reson_sdp_error"] = 1] = "reson_sdp_error";
    EReloginReson[EReloginReson["reson_logic_error"] = 2] = "reson_logic_error";
    EReloginReson[EReloginReson["reson_p2p_to_many"] = 3] = "reson_p2p_to_many";
    EReloginReson[EReloginReson["reson_rtp_timeout"] = 4] = "reson_rtp_timeout";
    EReloginReson[EReloginReson["netbroken"] = 20] = "netbroken";
    EReloginReson[EReloginReson["rtc_engine_error"] = 50] = "rtc_engine_error";
})(EReloginReson = exports.EReloginReson || (exports.EReloginReson = {}));
;


/***/ }),

/***/ "./src/utils/MyMap.ts":
/*!****************************!*\
  !*** ./src/utils/MyMap.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * const dics = new dic<string, number>();

    dics.set('a', 11);
    dics.set('b', 22);
    dics.set('a', 33);
    dics.set('c', 43);

    dics.forEach((k, v) => {
      console.log(`key:${k},val:${v}`);

    })

    dics.del('c');

    dics.forEach((k, v) => {
      console.log(`key:${k},val:${v}`);
    })

    console.log(dics.has('c'));
    console.log(dics.has('a'));

    console.log('获取键的数量：', dics.size);

    dics.clear();
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MyMap = void 0;
var MyMap = /** @class */ (function () {
    function MyMap() {
        // 定义两个容器，来装对应的键集合或者值集合
        this.keys = [];
        this.vals = [];
    }
    /**
     * 重新设置某个键对应的值，如果不存在，则添加
     * @param key
     * @param val
     */
    MyMap.prototype.set = function (key, val) {
        // 判断键集合中是否存在，存在的话直接来改
        var index = this.keys.indexOf(key);
        if (index >= 0) {
            // 存在直接修改
            this.vals[index] = val;
        }
        else {
            // 不存在，直接添加
            this.keys.push(key);
            this.vals.push(val);
        }
    };
    /**
     * 遍历键值对
     * @param callback
     */
    MyMap.prototype.forEach = function (callback) {
        var _this = this;
        this.keys.forEach(function (key, index) {
            callback(key, _this.vals[index]);
        });
    };
    /**
     * 通过指定的key 来删除val
     * @param key
     */
    MyMap.prototype.del = function (key) {
        var index = this.keys.indexOf(key);
        if (index < 0) {
            // 不存在，直接抛出错误，说该键不存在
            return false;
        }
        // 存在，直接删除
        this.keys.splice(index, 1);
        this.vals.splice(index, 1);
        return true;
    };
    MyMap.prototype.getKey = function (index) {
        if (index < 0 || index >= this.keys.length)
            return null;
        return this.keys[index];
    };
    MyMap.prototype.getItem = function (key) {
        var index = this.keys.indexOf(key);
        if (index < 0)
            return null;
        return this.vals[index];
    };
    /**
     * 判断某个键是否存在
     * @param key
     */
    MyMap.prototype.has = function (key) {
        var index = this.keys.indexOf(key);
        if (index >= 0)
            return true;
        return false;
    };
    Object.defineProperty(MyMap.prototype, "size", {
        /**
         * 得到键的数量
         */
        get: function () {
            return this.keys.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 清除所有的键值对
     */
    MyMap.prototype.clear = function () {
        this.keys = [];
        this.vals = [];
    };
    return MyMap;
}());
exports.MyMap = MyMap;


/***/ }),

/***/ "./src/utils/Utils.ts":
/*!****************************!*\
  !*** ./src/utils/Utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function _utf8_encode(str) {
    str = str.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < str.length; n++) {
        var c = str.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}
function b64Encode(input) {
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        }
        else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
}
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };
    Utils.checkPhone = function (phone) {
        var reg = /^1[3|4|5|7|8][0-9]{9}/;
        if (reg.test(phone)) {
            return true; //手机号码正确
        }
        return false;
    };
    Utils.randomString = function (count) {
        if (count < 1) {
            return "";
        }
        var orgs = ['1', 'h', '7', 'a',
            '0', 'b', '8', 'e', 't', 'z', 'v', 'y',
            'o', '4', 'f', '6', 'n', 'g', 'm',
            'p', '5', 'c', '3', 'i', 'j', 'k',
            'o', '4', 'f', '6', 'n', 'g', 'm',
            'p', '5', 'c', '3', 'i', 'j', 'k',
            '9', 'l', 's', '2', 'd', 'r', 'q',
            '1', 'h', '7', 'a', 'w', 'x', 'u'];
        var ret = '';
        for (var i = 0; i < count; i++) {
            var idx = Math.ceil(Math.random() * (orgs.length - 12));
            ret += orgs[idx];
        }
        return ret;
    };
    Utils.timestamp = function () {
        return Math.floor(Date.now() / 1000);
    };
    Utils.timeString = function () {
        var t = new Date();
        var hour = t.getHours();
        var minute = t.getMinutes();
        var second = t.getSeconds();
        var str = "";
        str = hour.toString();
        if (minute < 10) {
            str = str + ":0" + minute.toString();
        }
        else {
            str = str + ":" + minute.toString();
        }
        if (second < 10) {
            str = str + ":0" + second.toString();
        }
        else {
            str = str + ":" + second.toString();
        }
        return str;
    };
    Utils.base64Encode = function (buf) {
        return b64Encode(buf);
    };
    Utils.uint8ToString = function (data) {
        var ret = "";
        for (var idx = 0; idx < data.length; idx++) {
            ret += String.fromCharCode(data[idx]);
        }
        return ret;
    };
    Utils.uint8ArrayToStrArray = function (params) {
        var ret = [];
        for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
            var p = params_1[_i];
            ret.push(Utils.uint8ToString(p));
        }
        return ret;
    };
    return Utils;
}());
exports.default = Utils;


/***/ }),

/***/ "./node_modules/google-protobuf/google-protobuf.js":
/*!*********************************************************!*\
  !*** ./node_modules/google-protobuf/google-protobuf.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof __webpack_require__.g&&null!=__webpack_require__.g?__webpack_require__.g:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.findIndex",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).i}},"es6","es3");
$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.endsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"endsWith");a+="";void 0===c&&(c=b.length);c=Math.max(0,Math.min(c|0,b.length));for(var e=a.length;0<e&&0<c;)if(b[--c]!=a[--e])return!1;return 0>=e}},"es6","es3");$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");
$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var d="";a;)if(a&1&&(d+=b),a>>>=1)b+=b;return d}},"es6","es3");var COMPILED=!0,goog=goog||{};goog.global=this||self;goog.isDef=function(a){return void 0!==a};goog.isString=function(a){return"string"==typeof a};goog.isBoolean=function(a){return"boolean"==typeof a};
goog.isNumber=function(a){return"number"==typeof a};goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]&&c[d]!==Object.prototype[d]?c[d]:c[d]={}};
goog.define=function(a,b){if(!COMPILED){var c=goog.global.CLOSURE_UNCOMPILED_DEFINES,d=goog.global.CLOSURE_DEFINES;c&&void 0===c.nodeType&&Object.prototype.hasOwnProperty.call(c,a)?b=c[a]:d&&void 0===d.nodeType&&Object.prototype.hasOwnProperty.call(d,a)&&(b=d[a])}return b};goog.FEATURESET_YEAR=2012;goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;goog.DISALLOW_TEST_ONLY_CODE=COMPILED&&!goog.DEBUG;goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING=!1;
goog.provide=function(a){if(goog.isInModuleLoader_())throw Error("goog.provide cannot be used within a module.");if(!COMPILED&&goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');goog.constructNamespace_(a)};goog.constructNamespace_=function(a,b){if(!COMPILED){delete goog.implicitNamespaces_[a];for(var c=a;(c=c.substring(0,c.lastIndexOf(".")))&&!goog.getObjectByName(c);)goog.implicitNamespaces_[c]=!0}goog.exportPath_(a,b)};
goog.getScriptNonce=function(a){if(a&&a!=goog.global)return goog.getScriptNonce_(a.document);null===goog.cspNonce_&&(goog.cspNonce_=goog.getScriptNonce_(goog.global.document));return goog.cspNonce_};goog.NONCE_PATTERN_=/^[\w+/_-]+[=]{0,2}$/;goog.cspNonce_=null;goog.getScriptNonce_=function(a){return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&goog.NONCE_PATTERN_.test(a)?a:""};goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module=function(a){if(!goog.isString(a)||!a||-1==a.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInGoogModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a]}};goog.module.get=function(a){return goog.module.getInternal_(a)};
goog.module.getInternal_=function(a){if(!COMPILED){if(a in goog.loadedModules_)return goog.loadedModules_[a].exports;if(!goog.implicitNamespaces_[a])return a=goog.getObjectByName(a),null!=a?a:null}return null};goog.ModuleType={ES6:"es6",GOOG:"goog"};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return goog.isInGoogModuleLoader_()||goog.isInEs6ModuleLoader_()};goog.isInGoogModuleLoader_=function(){return!!goog.moduleLoaderState_&&goog.moduleLoaderState_.type==goog.ModuleType.GOOG};
goog.isInEs6ModuleLoader_=function(){if(goog.moduleLoaderState_&&goog.moduleLoaderState_.type==goog.ModuleType.ES6)return!0;var a=goog.global.$jscomp;return a?"function"!=typeof a.getCurrentModulePath?!1:!!a.getCurrentModulePath():!1};
goog.module.declareLegacyNamespace=function(){if(!COMPILED&&!goog.isInGoogModuleLoader_())throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");if(!COMPILED&&!goog.moduleLoaderState_.moduleName)throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");goog.moduleLoaderState_.declareLegacyNamespace=!0};
goog.declareModuleId=function(a){if(!COMPILED){if(!goog.isInEs6ModuleLoader_())throw Error("goog.declareModuleId may only be called from within an ES6 module");if(goog.moduleLoaderState_&&goog.moduleLoaderState_.moduleName)throw Error("goog.declareModuleId may only be called once per module.");if(a in goog.loadedModules_)throw Error('Module with namespace "'+a+'" already exists.');}if(goog.moduleLoaderState_)goog.moduleLoaderState_.moduleName=a;else{var b=goog.global.$jscomp;if(!b||"function"!=typeof b.getCurrentModulePath)throw Error('Module with namespace "'+
a+'" has been loaded incorrectly.');b=b.require(b.getCurrentModulePath());goog.loadedModules_[a]={exports:b,type:goog.ModuleType.ES6,moduleId:a}}};goog.setTestOnly=function(a){if(goog.DISALLOW_TEST_ONLY_CODE)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};
COMPILED||(goog.isProvided_=function(a){return a in goog.loadedModules_||!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={"goog.module":!0});goog.getObjectByName=function(a,b){a=a.split(".");b=b||goog.global;for(var c=0;c<a.length;c++)if(b=b[a[c]],!goog.isDefAndNotNull(b))return null;return b};goog.globalize=function(a,b){b=b||goog.global;for(var c in a)b[c]=a[c]};
goog.addDependency=function(a,b,c,d){!COMPILED&&goog.DEPENDENCIES_ENABLED&&goog.debugLoader_.addDependency(a,b,c,d)};goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a)};
goog.require=function(a){if(!COMPILED){goog.ENABLE_DEBUG_LOADER&&goog.debugLoader_.requested(a);if(goog.isProvided_(a)){if(goog.isInModuleLoader_())return goog.module.getInternal_(a)}else if(goog.ENABLE_DEBUG_LOADER){var b=goog.moduleLoaderState_;goog.moduleLoaderState_=null;try{goog.debugLoader_.load_(a)}finally{goog.moduleLoaderState_=b}}return null}};goog.requireType=function(a){return{}};goog.basePath="";goog.nullFunction=function(){};
goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.instance_=void 0;a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;goog.TRANSPILE="detect";
goog.ASSUME_ES_MODULES_TRANSPILED=!1;goog.TRANSPILE_TO_LANGUAGE="";goog.TRANSPILER="transpile.js";goog.hasBadLetScoping=null;goog.useSafari10Workaround=function(){if(null==goog.hasBadLetScoping){try{var a=!eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')}catch(b){a=!1}goog.hasBadLetScoping=a}return goog.hasBadLetScoping};goog.workaroundSafari10EvalBug=function(a){return"(function(){"+a+"\n;})();\n"};
goog.loadModule=function(a){var b=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:"",declareLegacyNamespace:!1,type:goog.ModuleType.GOOG};if(goog.isFunction(a))var c=a.call(void 0,{});else if(goog.isString(a))goog.useSafari10Workaround()&&(a=goog.workaroundSafari10EvalBug(a)),c=goog.loadModuleFromSource_.call(void 0,a);else throw Error("Invalid module definition");var d=goog.moduleLoaderState_.moduleName;if(goog.isString(d)&&d)goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(d,
c):goog.SEAL_MODULE_EXPORTS&&Object.seal&&"object"==typeof c&&null!=c&&Object.seal(c),goog.loadedModules_[d]={exports:c,type:goog.ModuleType.GOOG,moduleId:goog.moduleLoaderState_.moduleName};else throw Error('Invalid module name "'+d+'"');}finally{goog.moduleLoaderState_=b}};goog.loadModuleFromSource_=function(a){eval(a);return{}};goog.normalizePath_=function(a){a=a.split("/");for(var b=0;b<a.length;)"."==a[b]?a.splice(b,1):b&&".."==a[b]&&a[b-1]&&".."!=a[b-1]?a.splice(--b,2):b++;return a.join("/")};
goog.loadFileSync_=function(a){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(a);try{var b=new goog.global.XMLHttpRequest;b.open("get",a,!1);b.send();return 0==b.status||200==b.status?b.responseText:null}catch(c){return null}};
goog.transpile_=function(a,b,c){var d=goog.global.$jscomp;d||(goog.global.$jscomp=d={});var e=d.transpile;if(!e){var f=goog.basePath+goog.TRANSPILER,g=goog.loadFileSync_(f);if(g){(function(){(0,eval)(g+"\n//# sourceURL="+f)}).call(goog.global);if(goog.global.$gwtExport&&goog.global.$gwtExport.$jscomp&&!goog.global.$gwtExport.$jscomp.transpile)throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: '+JSON.stringify(goog.global.$gwtExport));goog.global.$jscomp.transpile=
goog.global.$gwtExport.$jscomp.transpile;d=goog.global.$jscomp;e=d.transpile}}e||(e=d.transpile=function(a,b){goog.logToConsole_(b+" requires transpilation but no transpiler was found.");return a});return e(a,b,c)};
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isFunction=function(a){return"function"==goog.typeOf(a)};
goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};goog.removeUid=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;
goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if("function"===typeof a.clone)return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval){if(null==goog.evalWorksForGlobals_){try{goog.global.eval("var _evalTest_ = 1;")}catch(d){}if("undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_}catch(d){}goog.evalWorksForGlobals_=!0}else goog.evalWorksForGlobals_=!1}if(goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=
!1;c.appendChild(b.createTextNode(a));b.head.appendChild(c);b.head.removeChild(c)}}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;
goog.getCssName=function(a,b){if("."==String(a).charAt(0))throw Error('className passed in goog.getCssName must not start with ".". You passed: '+a);var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")};d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};a=b?a+"-"+d(b):d(a);return goog.global.CLOSURE_CSS_NAME_MAP_FN?goog.global.CLOSURE_CSS_NAME_MAP_FN(a):a};
goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b,c){c&&c.html&&(a=a.replace(/</g,"&lt;"));b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,c){return null!=b&&c in b?b[c]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};
goog.exportProperty=function(a,b,c){a[b]=c};goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if("undefined"!==typeof d.superClass_){for(var e=Array(arguments.length-1),f=1;f<arguments.length;f++)e[f-1]=arguments[f];return d.superClass_.constructor.apply(a,e)}if("string"!=typeof b&&"symbol"!=typeof b)throw Error("method names provided to goog.base must be a string or a symbol");
e=Array(arguments.length-2);for(f=2;f<arguments.length;f++)e[f-2]=arguments[f];f=!1;for(var g=a.constructor.prototype;g;g=Object.getPrototypeOf(g))if(g[b]===d)f=!0;else if(f)return g[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){if(goog.isInModuleLoader_())throw Error("goog.scope is not supported within a module.");a.call(goog.global)};
COMPILED||(goog.global.COMPILED=COMPILED);goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};
goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;goog.defineClass.createSealingConstructor_=function(a,b){if(!goog.defineClass.SEAL_CLASS_INSTANCES)return a;var c=!goog.defineClass.isUnsealable_(b),d=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===d&&c&&Object.seal instanceof Function&&Object.seal(b);return b};return d};goog.defineClass.isUnsealable_=function(a){return a&&a.prototype&&a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};
goog.tagUnsealableClass=function(a){!COMPILED&&goog.defineClass.SEAL_CLASS_INSTANCES&&(a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]=!0)};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";
!COMPILED&&goog.DEPENDENCIES_ENABLED&&(goog.inHtmlDocument_=function(){var a=goog.global.document;return null!=a&&"write"in a},goog.isDocumentLoading_=function(){var a=goog.global.document;return a.attachEvent?"complete"!=a.readyState:"loading"==a.readyState},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH)&&goog.isString(goog.global.CLOSURE_BASE_PATH))goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_()){var a=goog.global.document,b=a.currentScript;
a=b?[b]:a.getElementsByTagName("SCRIPT");for(b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?");d=-1==d?c.length:d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}}},goog.findBasePath_(),goog.Transpiler=function(){this.requiresTranspilation_=null;this.transpilationTarget_=goog.TRANSPILE_TO_LANGUAGE},goog.Transpiler.prototype.createRequiresTranspilation_=function(){function a(a,b){e?d[a]=!0:b()?(c=a,d[a]=!1):e=d[a]=!0}function b(a){try{return!!eval(a)}catch(h){return!1}}
var c="es3",d={es3:!1},e=!1,f=goog.global.navigator&&goog.global.navigator.userAgent?goog.global.navigator.userAgent:"";a("es5",function(){return b("[1,].length==1")});a("es6",function(){return f.match(/Edge\/(\d+)(\.\d)*/i)?!1:b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')});
a("es7",function(){return b("2 ** 2 == 4")});a("es8",function(){return b("async () => 1, true")});a("es9",function(){return b("({...rest} = {}), true")});a("es_next",function(){return!1});return{target:c,map:d}},goog.Transpiler.prototype.needsTranspile=function(a,b){if("always"==goog.TRANSPILE)return!0;if("never"==goog.TRANSPILE)return!1;if(!this.requiresTranspilation_){var c=this.createRequiresTranspilation_();this.requiresTranspilation_=c.map;this.transpilationTarget_=this.transpilationTarget_||
c.target}if(a in this.requiresTranspilation_)return this.requiresTranspilation_[a]?!0:!goog.inHtmlDocument_()||"es6"!=b||"noModule"in goog.global.document.createElement("script")?!1:!0;throw Error("Unknown language mode: "+a);},goog.Transpiler.prototype.transpile=function(a,b){return goog.transpile_(a,b,this.transpilationTarget_)},goog.transpiler_=new goog.Transpiler,goog.protectScriptTag_=function(a){return a.replace(/<\/(SCRIPT)/ig,"\\x3c/$1")},goog.DebugLoader_=function(){this.dependencies_={};
this.idToPath_={};this.written_={};this.loadingDeps_=[];this.depsToLoad_=[];this.paused_=!1;this.factory_=new goog.DependencyFactory(goog.transpiler_);this.deferredCallbacks_={};this.deferredQueue_=[]},goog.DebugLoader_.prototype.bootstrap=function(a,b){function c(){d&&(goog.global.setTimeout(d,0),d=null)}var d=b;if(a.length){b=[];for(var e=0;e<a.length;e++){var f=this.getPathFromDeps_(a[e]);if(!f)throw Error("Unregonized namespace: "+a[e]);b.push(this.dependencies_[f])}f=goog.require;var g=0;for(e=
0;e<a.length;e++)f(a[e]),b[e].onLoad(function(){++g==a.length&&c()})}else c()},goog.DebugLoader_.prototype.loadClosureDeps=function(){this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath+"deps.js"),"deps.js",[],[],{},!1));this.loadDeps_()},goog.DebugLoader_.prototype.requested=function(a,b){(a=this.getPathFromDeps_(a))&&(b||this.areDepsLoaded_(this.dependencies_[a].requires))&&(b=this.deferredCallbacks_[a])&&(delete this.deferredCallbacks_[a],b())},goog.DebugLoader_.prototype.setDependencyFactory=
function(a){this.factory_=a},goog.DebugLoader_.prototype.load_=function(a){if(this.getPathFromDeps_(a)){var b=this,c=[],d=function(a){var e=b.getPathFromDeps_(a);if(!e)throw Error("Bad dependency path or symbol: "+a);if(!b.written_[e]){b.written_[e]=!0;a=b.dependencies_[e];for(e=0;e<a.requires.length;e++)goog.isProvided_(a.requires[e])||d(a.requires[e]);c.push(a)}};d(a);a=!!this.depsToLoad_.length;this.depsToLoad_=this.depsToLoad_.concat(c);this.paused_||a||this.loadDeps_()}else throw a="goog.require could not find: "+
a,goog.logToConsole_(a),Error(a);},goog.DebugLoader_.prototype.loadDeps_=function(){for(var a=this,b=this.paused_;this.depsToLoad_.length&&!b;)(function(){var c=!1,d=a.depsToLoad_.shift(),e=!1;a.loading_(d);var f={pause:function(){if(c)throw Error("Cannot call pause after the call to load.");b=!0},resume:function(){c?a.resume_():b=!1},loaded:function(){if(e)throw Error("Double call to loaded.");e=!0;a.loaded_(d)},pending:function(){for(var b=[],c=0;c<a.loadingDeps_.length;c++)b.push(a.loadingDeps_[c]);
return b},setModuleState:function(a){goog.moduleLoaderState_={type:a,moduleName:"",declareLegacyNamespace:!1}},registerEs6ModuleExports:function(a,b,c){c&&(goog.loadedModules_[c]={exports:b,type:goog.ModuleType.ES6,moduleId:c||""})},registerGoogModuleExports:function(a,b){goog.loadedModules_[a]={exports:b,type:goog.ModuleType.GOOG,moduleId:a}},clearModuleState:function(){goog.moduleLoaderState_=null},defer:function(b){if(c)throw Error("Cannot register with defer after the call to load.");a.defer_(d,
b)},areDepsLoaded:function(){return a.areDepsLoaded_(d.requires)}};try{d.load(f)}finally{c=!0}})();b&&this.pause_()},goog.DebugLoader_.prototype.pause_=function(){this.paused_=!0},goog.DebugLoader_.prototype.resume_=function(){this.paused_&&(this.paused_=!1,this.loadDeps_())},goog.DebugLoader_.prototype.loading_=function(a){this.loadingDeps_.push(a)},goog.DebugLoader_.prototype.loaded_=function(a){for(var b=0;b<this.loadingDeps_.length;b++)if(this.loadingDeps_[b]==a){this.loadingDeps_.splice(b,1);
break}for(b=0;b<this.deferredQueue_.length;b++)if(this.deferredQueue_[b]==a.path){this.deferredQueue_.splice(b,1);break}if(this.loadingDeps_.length==this.deferredQueue_.length&&!this.depsToLoad_.length)for(;this.deferredQueue_.length;)this.requested(this.deferredQueue_.shift(),!0);a.loaded()},goog.DebugLoader_.prototype.areDepsLoaded_=function(a){for(var b=0;b<a.length;b++){var c=this.getPathFromDeps_(a[b]);if(!c||!(c in this.deferredCallbacks_||goog.isProvided_(a[b])))return!1}return!0},goog.DebugLoader_.prototype.getPathFromDeps_=
function(a){return a in this.idToPath_?this.idToPath_[a]:a in this.dependencies_?a:null},goog.DebugLoader_.prototype.defer_=function(a,b){this.deferredCallbacks_[a.path]=b;this.deferredQueue_.push(a.path)},goog.LoadController=function(){},goog.LoadController.prototype.pause=function(){},goog.LoadController.prototype.resume=function(){},goog.LoadController.prototype.loaded=function(){},goog.LoadController.prototype.pending=function(){},goog.LoadController.prototype.registerEs6ModuleExports=function(a,
b,c){},goog.LoadController.prototype.setModuleState=function(a){},goog.LoadController.prototype.clearModuleState=function(){},goog.LoadController.prototype.defer=function(a){},goog.LoadController.prototype.areDepsLoaded=function(){},goog.Dependency=function(a,b,c,d,e){this.path=a;this.relativePath=b;this.provides=c;this.requires=d;this.loadFlags=e;this.loaded_=!1;this.loadCallbacks_=[]},goog.Dependency.prototype.getPathName=function(){var a=this.path,b=a.indexOf("://");0<=b&&(a=a.substring(b+3),b=
a.indexOf("/"),0<=b&&(a=a.substring(b+1)));return a},goog.Dependency.prototype.onLoad=function(a){this.loaded_?a():this.loadCallbacks_.push(a)},goog.Dependency.prototype.loaded=function(){this.loaded_=!0;var a=this.loadCallbacks_;this.loadCallbacks_=[];for(var b=0;b<a.length;b++)a[b]()},goog.Dependency.defer_=!1,goog.Dependency.callbackMap_={},goog.Dependency.registerCallback_=function(a){var b=Math.random().toString(32);goog.Dependency.callbackMap_[b]=a;return b},goog.Dependency.unregisterCallback_=
function(a){delete goog.Dependency.callbackMap_[a]},goog.Dependency.callback_=function(a,b){if(a in goog.Dependency.callbackMap_){for(var c=goog.Dependency.callbackMap_[a],d=[],e=1;e<arguments.length;e++)d.push(arguments[e]);c.apply(void 0,d)}else throw Error("Callback key "+a+" does not exist (was base.js loaded more than once?).");},goog.Dependency.prototype.load=function(a){if(goog.global.CLOSURE_IMPORT_SCRIPT)goog.global.CLOSURE_IMPORT_SCRIPT(this.path)?a.loaded():a.pause();else if(goog.inHtmlDocument_()){var b=
goog.global.document;if("complete"==b.readyState&&!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING){if(/\bdeps.js$/.test(this.path)){a.loaded();return}throw Error('Cannot write "'+this.path+'" after document load');}if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&goog.isDocumentLoading_()){var c=goog.Dependency.registerCallback_(function(b){goog.DebugLoader_.IS_OLD_IE_&&"complete"!=b.readyState||(goog.Dependency.unregisterCallback_(c),a.loaded())}),d=!goog.DebugLoader_.IS_OLD_IE_&&goog.getScriptNonce()?
' nonce="'+goog.getScriptNonce()+'"':"";d='<script src="'+this.path+'" '+(goog.DebugLoader_.IS_OLD_IE_?"onreadystatechange":"onload")+"=\"goog.Dependency.callback_('"+c+'\', this)" type="text/javascript" '+(goog.Dependency.defer_?"defer":"")+d+">\x3c/script>";b.write(goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createHTML(d):d)}else{var e=b.createElement("script");e.defer=goog.Dependency.defer_;e.async=!1;e.type="text/javascript";(d=goog.getScriptNonce())&&e.setAttribute("nonce",d);goog.DebugLoader_.IS_OLD_IE_?
(a.pause(),e.onreadystatechange=function(){if("loaded"==e.readyState||"complete"==e.readyState)a.loaded(),a.resume()}):e.onload=function(){e.onload=null;a.loaded()};e.src=goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path):this.path;b.head.appendChild(e)}}else goog.logToConsole_("Cannot use default debug loader outside of HTML documents."),"deps.js"==this.relativePath?(goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."),
a.loaded()):a.pause()},goog.Es6ModuleDependency=function(a,b,c,d,e){goog.Dependency.call(this,a,b,c,d,e)},goog.inherits(goog.Es6ModuleDependency,goog.Dependency),goog.Es6ModuleDependency.prototype.load=function(a){function b(a,b){a=b?'<script type="module" crossorigin>'+b+"\x3c/script>":'<script type="module" crossorigin src="'+a+'">\x3c/script>';d.write(goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createHTML(a):a)}function c(a,b){var c=d.createElement("script");c.defer=!0;c.async=!1;c.type=
"module";c.setAttribute("crossorigin",!0);var e=goog.getScriptNonce();e&&c.setAttribute("nonce",e);b?c.textContent=goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createScript(b):b:c.src=goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createScriptURL(a):a;d.head.appendChild(c)}if(goog.global.CLOSURE_IMPORT_SCRIPT)goog.global.CLOSURE_IMPORT_SCRIPT(this.path)?a.loaded():a.pause();else if(goog.inHtmlDocument_()){var d=goog.global.document,e=this;if(goog.isDocumentLoading_()){var f=b;goog.Dependency.defer_=
!0}else f=c;var g=goog.Dependency.registerCallback_(function(){goog.Dependency.unregisterCallback_(g);a.setModuleState(goog.ModuleType.ES6)});f(void 0,'goog.Dependency.callback_("'+g+'")');f(this.path,void 0);var h=goog.Dependency.registerCallback_(function(b){goog.Dependency.unregisterCallback_(h);a.registerEs6ModuleExports(e.path,b,goog.moduleLoaderState_.moduleName)});f(void 0,'import * as m from "'+this.path+'"; goog.Dependency.callback_("'+h+'", m)');var k=goog.Dependency.registerCallback_(function(){goog.Dependency.unregisterCallback_(k);
a.clearModuleState();a.loaded()});f(void 0,'goog.Dependency.callback_("'+k+'")')}else goog.logToConsole_("Cannot use default debug loader outside of HTML documents."),a.pause()},goog.TransformedDependency=function(a,b,c,d,e){goog.Dependency.call(this,a,b,c,d,e);this.contents_=null;this.lazyFetch_=!goog.inHtmlDocument_()||!("noModule"in goog.global.document.createElement("script"))},goog.inherits(goog.TransformedDependency,goog.Dependency),goog.TransformedDependency.prototype.load=function(a){function b(){e.contents_=
goog.loadFileSync_(e.path);e.contents_&&(e.contents_=e.transform(e.contents_),e.contents_&&(e.contents_+="\n//# sourceURL="+e.path))}function c(){e.lazyFetch_&&b();if(e.contents_){f&&a.setModuleState(goog.ModuleType.ES6);try{var c=e.contents_;e.contents_=null;goog.globalEval(c);if(f)var d=goog.moduleLoaderState_.moduleName}finally{f&&a.clearModuleState()}f&&goog.global.$jscomp.require.ensure([e.getPathName()],function(){a.registerEs6ModuleExports(e.path,goog.global.$jscomp.require(e.getPathName()),
d)});a.loaded()}}function d(){var a=goog.global.document,b=goog.Dependency.registerCallback_(function(){goog.Dependency.unregisterCallback_(b);c()}),d='<script type="text/javascript">'+goog.protectScriptTag_('goog.Dependency.callback_("'+b+'");')+"\x3c/script>";a.write(goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createHTML(d):d)}var e=this;if(goog.global.CLOSURE_IMPORT_SCRIPT)b(),this.contents_&&goog.global.CLOSURE_IMPORT_SCRIPT("",this.contents_)?(this.contents_=null,a.loaded()):a.pause();
else{var f=this.loadFlags.module==goog.ModuleType.ES6;this.lazyFetch_||b();var g=1<a.pending().length,h=g&&goog.DebugLoader_.IS_OLD_IE_;g=goog.Dependency.defer_&&(g||goog.isDocumentLoading_());if(h||g)a.defer(function(){c()});else{var k=goog.global.document;h=goog.inHtmlDocument_()&&"ActiveXObject"in goog.global;if(f&&goog.inHtmlDocument_()&&goog.isDocumentLoading_()&&!h){goog.Dependency.defer_=!0;a.pause();var l=k.onreadystatechange;k.onreadystatechange=function(){"interactive"==k.readyState&&(k.onreadystatechange=
l,c(),a.resume());goog.isFunction(l)&&l.apply(void 0,arguments)}}else!goog.DebugLoader_.IS_OLD_IE_&&goog.inHtmlDocument_()&&goog.isDocumentLoading_()?d():c()}}},goog.TransformedDependency.prototype.transform=function(a){},goog.TranspiledDependency=function(a,b,c,d,e,f){goog.TransformedDependency.call(this,a,b,c,d,e);this.transpiler=f},goog.inherits(goog.TranspiledDependency,goog.TransformedDependency),goog.TranspiledDependency.prototype.transform=function(a){return this.transpiler.transpile(a,this.getPathName())},
goog.PreTranspiledEs6ModuleDependency=function(a,b,c,d,e){goog.TransformedDependency.call(this,a,b,c,d,e)},goog.inherits(goog.PreTranspiledEs6ModuleDependency,goog.TransformedDependency),goog.PreTranspiledEs6ModuleDependency.prototype.transform=function(a){return a},goog.GoogModuleDependency=function(a,b,c,d,e,f,g){goog.TransformedDependency.call(this,a,b,c,d,e);this.needsTranspile_=f;this.transpiler_=g},goog.inherits(goog.GoogModuleDependency,goog.TransformedDependency),goog.GoogModuleDependency.prototype.transform=
function(a){this.needsTranspile_&&(a=this.transpiler_.transpile(a,this.getPathName()));return goog.LOAD_MODULE_USING_EVAL&&goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(a+"\n//# sourceURL="+this.path+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+a+"\n;return exports});\n//# sourceURL="+this.path+"\n"},goog.DebugLoader_.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.DebugLoader_.prototype.addDependency=function(a,b,
c,d){b=b||[];a=a.replace(/\\/g,"/");var e=goog.normalizePath_(goog.basePath+a);d&&"boolean"!==typeof d||(d=d?{module:goog.ModuleType.GOOG}:{});c=this.factory_.createDependency(e,a,b,c,d,goog.transpiler_.needsTranspile(d.lang||"es3",d.module));this.dependencies_[e]=c;for(c=0;c<b.length;c++)this.idToPath_[b[c]]=e;this.idToPath_[a]=e},goog.DependencyFactory=function(a){this.transpiler=a},goog.DependencyFactory.prototype.createDependency=function(a,b,c,d,e,f){return e.module==goog.ModuleType.GOOG?new goog.GoogModuleDependency(a,
b,c,d,e,f,this.transpiler):f?new goog.TranspiledDependency(a,b,c,d,e,this.transpiler):e.module==goog.ModuleType.ES6?"never"==goog.TRANSPILE&&goog.ASSUME_ES_MODULES_TRANSPILED?new goog.PreTranspiledEs6ModuleDependency(a,b,c,d,e):new goog.Es6ModuleDependency(a,b,c,d,e):new goog.Dependency(a,b,c,d,e)},goog.debugLoader_=new goog.DebugLoader_,goog.loadClosureDeps=function(){goog.debugLoader_.loadClosureDeps()},goog.setDependencyFactory=function(a){goog.debugLoader_.setDependencyFactory(a)},goog.global.CLOSURE_NO_DEPS||
goog.debugLoader_.loadClosureDeps(),goog.bootstrap=function(a,b){goog.debugLoader_.bootstrap(a,b)});goog.TRUSTED_TYPES_POLICY_NAME="";goog.identity_=function(a){return a};goog.createTrustedTypesPolicy=function(a){var b=null;if("undefined"===typeof TrustedTypes||!TrustedTypes.createPolicy)return b;try{b=TrustedTypes.createPolicy(a,{createHTML:goog.identity_,createScript:goog.identity_,createScriptURL:goog.identity_,createURL:goog.identity_})}catch(c){goog.logToConsole_(c.message)}return b};
goog.TRUSTED_TYPES_POLICY_=goog.TRUSTED_TYPES_POLICY_NAME?goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME+"#base"):null;goog.object={};goog.object.is=function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return!0;return!1};
goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return!1;return!0};goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};
goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};goog.object.getValueByKeys=function(a,b){var c=goog.isArrayLike(b),d=c?b:arguments;for(c=c?0:1;c<d.length;c++){if(null==a)return;a=a[d[c]]}return a};goog.object.containsKey=function(a,b){return null!==a&&b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};
goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return null!==a&&b in a?a[b]:c};
goog.object.set=function(a,b,c){a[b]=c};goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};goog.object.setWithReturnValueIfNotSet=function(a,b,c){if(b in a)return a[b];c=c();return a[b]=c};goog.object.equals=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0};goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};
goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(goog.isFunction(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};
goog.object.getAllPropertyNames=function(a,b,c){if(!a)return[];if(!Object.getOwnPropertyNames||!Object.getPrototypeOf)return goog.object.getKeys(a);for(var d={};a&&(a!==Object.prototype||b)&&(a!==Function.prototype||c);){for(var e=Object.getOwnPropertyNames(a),f=0;f<e.length;f++)d[e[f]]=!0;a=Object.getPrototypeOf(a)}return goog.object.getKeys(d)};goog.object.getSuperClass=function(a){return(a=Object.getPrototypeOf(a.prototype))&&a.constructor};goog.debug={};goog.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a));this.reportErrorToServer=!0};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.dom={};goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){goog.debug.Error.call(this,goog.asserts.subs_(a,b));this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.DEFAULT_ERROR_HANDLER=function(a){throw a;};goog.asserts.errorHandler_=goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_=function(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");return c+a[d]};goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);a=new goog.asserts.AssertionError(""+e,f||[]);goog.asserts.errorHandler_(a)};goog.asserts.setErrorHandler=function(a){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.errorHandler_=a)};
goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertExists=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&null==a&&goog.asserts.doAssertFailure_("Expected to exist: %s.",[a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.fail=function(a,b){goog.asserts.ENABLE_ASSERTS&&goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)))};goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertElement=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertInstanceof=function(a,b,c,d){!goog.asserts.ENABLE_ASSERTS||a instanceof b||goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.",[goog.asserts.getType_(b),goog.asserts.getType_(a)],c,Array.prototype.slice.call(arguments,3));return a};goog.asserts.assertFinite=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||"number"==typeof a&&isFinite(a)||goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.",[a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertObjectPrototypeIsIntact=function(){for(var a in Object.prototype)goog.asserts.fail(a+" should not be enumerable in Object.prototype.")};goog.asserts.getType_=function(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};var jspb={BinaryConstants:{},ConstBinaryMessage:function(){},BinaryMessage:function(){}};jspb.BinaryConstants.FieldType={INVALID:-1,DOUBLE:1,FLOAT:2,INT64:3,UINT64:4,INT32:5,FIXED64:6,FIXED32:7,BOOL:8,STRING:9,GROUP:10,MESSAGE:11,BYTES:12,UINT32:13,ENUM:14,SFIXED32:15,SFIXED64:16,SINT32:17,SINT64:18,FHASH64:30,VHASH64:31};jspb.BinaryConstants.WireType={INVALID:-1,VARINT:0,FIXED64:1,DELIMITED:2,START_GROUP:3,END_GROUP:4,FIXED32:5};
jspb.BinaryConstants.FieldTypeToWireType=function(a){var b=jspb.BinaryConstants.FieldType,c=jspb.BinaryConstants.WireType;switch(a){case b.INT32:case b.INT64:case b.UINT32:case b.UINT64:case b.SINT32:case b.SINT64:case b.BOOL:case b.ENUM:case b.VHASH64:return c.VARINT;case b.DOUBLE:case b.FIXED64:case b.SFIXED64:case b.FHASH64:return c.FIXED64;case b.STRING:case b.MESSAGE:case b.BYTES:return c.DELIMITED;case b.FLOAT:case b.FIXED32:case b.SFIXED32:return c.FIXED32;default:return c.INVALID}};
jspb.BinaryConstants.INVALID_FIELD_NUMBER=-1;jspb.BinaryConstants.FLOAT32_EPS=1.401298464324817E-45;jspb.BinaryConstants.FLOAT32_MIN=1.1754943508222875E-38;jspb.BinaryConstants.FLOAT32_MAX=3.4028234663852886E38;jspb.BinaryConstants.FLOAT64_EPS=4.9E-324;jspb.BinaryConstants.FLOAT64_MIN=2.2250738585072014E-308;jspb.BinaryConstants.FLOAT64_MAX=1.7976931348623157E308;jspb.BinaryConstants.TWO_TO_20=1048576;jspb.BinaryConstants.TWO_TO_23=8388608;jspb.BinaryConstants.TWO_TO_31=2147483648;
jspb.BinaryConstants.TWO_TO_32=4294967296;jspb.BinaryConstants.TWO_TO_52=4503599627370496;jspb.BinaryConstants.TWO_TO_63=0x7fffffffffffffff;jspb.BinaryConstants.TWO_TO_64=1.8446744073709552E19;jspb.BinaryConstants.ZERO_HASH="\x00\x00\x00\x00\x00\x00\x00\x00";goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.ASSUME_NATIVE_FUNCTIONS=2012<goog.FEATURESET_YEAR;goog.array.peek=function(a){return a[a.length-1]};goog.array.last=goog.array.peek;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.indexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return goog.isString(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.lastIndexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return goog.isString(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.forEach)?function(a,b,c){goog.asserts.assert(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};goog.array.forEachRight=function(a,b,c){var d=a.length,e=goog.isString(a)?a.split(""):a;for(--d;0<=d;--d)d in e&&b.call(c,e[d],d,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.filter)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k)}return e};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.map)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
goog.array.reduce=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduce)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.reduceRight=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduceRight)?function(a,b,c,d){goog.asserts.assert(null!=a.length);goog.asserts.assert(null!=b);d&&(b=goog.bind(b,d));return Array.prototype.reduceRight.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.some)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.every)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d},c);return d};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){var d=a.length,e=goog.isString(a)?a.split(""):a;for(--d;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d)};goog.array.remove=function(a,b){b=goog.array.indexOf(a,b);var c;(c=0<=b)&&goog.array.removeAt(a,b);return c};
goog.array.removeLast=function(a,b){b=goog.array.lastIndexOf(a,b);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAllIf=function(a,b,c){var d=0;goog.array.forEachRight(a,function(e,f){b.call(c,e,f,a)&&goog.array.removeAt(a,f)&&d++});return d};
goog.array.concat=function(a){return Array.prototype.concat.apply([],arguments)};goog.array.join=function(a){return Array.prototype.concat.apply([],arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};goog.array.clone=goog.array.toArray;goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(goog.isArrayLike(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};
goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return Array.prototype.splice.apply(a,goog.array.slice(arguments,1))};goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};
goog.array.removeDuplicates=function(a,b,c){b=b||a;var d=function(a){return goog.isObject(a)?"o"+goog.getUid(a):(typeof a).charAt(0)+a};c=c||d;d={};for(var e=0,f=0;f<a.length;){var g=a[f++],h=c(g);Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,b[e++]=g)}b.length=e};goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};
goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var k=f+g>>1;var l=c?b.call(e,a[k],k,a):b(d,a[k]);0<l?f=k+1:(g=k,h=!l)}return h?f:~f};goog.array.sort=function(a,b){a.sort(b||goog.array.defaultCompare)};goog.array.stableSort=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]={index:d,value:a[d]};var e=b||goog.array.defaultCompare;goog.array.sort(c,function(a,b){return e(a.value,b.value)||a.index-b.index});for(d=0;d<a.length;d++)a[d]=c[d].value};
goog.array.sortByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(b(a),b(c))})};goog.array.sortObjectsByKey=function(a,b,c){goog.array.sortByKey(a,function(a){return a[b]},c)};goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return!1}return!0};
goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return!1;return!0};goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};
goog.array.inverseDefaultCompare=function(a,b){return-goog.array.defaultCompare(a,b)};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};
goog.array.bucket=function(a,b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],g=b.call(c,f,e,a);goog.isDef(g)&&(d[g]||(d[g]=[])).push(f)}return d};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e});return d};goog.array.range=function(a,b,c){var d=[],e=0,f=a;c=c||1;void 0!==b&&(e=a,f=b);if(0>c*(f-e))return[];if(0<c)for(a=e;a<f;a+=c)d.push(a);else for(a=e;a>f;a+=c)d.push(a);return d};
goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];if(goog.isArray(d))for(var e=0;e<d.length;e+=8192){var f=goog.array.slice(d,e,e+8192);f=goog.array.flatten.apply(null,f);for(var g=0;g<f.length;g++)b.push(f[g])}else b.push(d)}return b};
goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?Array.prototype.unshift.apply(a,a.splice(-b,b)):0>b&&Array.prototype.push.apply(a,a.splice(0,-b)));return a};goog.array.moveItem=function(a,b,c){goog.asserts.assert(0<=b&&b<a.length);goog.asserts.assert(0<=c&&c<a.length);b=Array.prototype.splice.call(a,b,1);Array.prototype.splice.call(a,c,0,b[0])};
goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=arguments[0].length,d=1;d<arguments.length;d++)arguments[d].length<c&&(c=arguments[d].length);for(d=0;d<c;d++){for(var e=[],f=0;f<arguments.length;f++)e.push(arguments[f][d]);b.push(e)}return b};goog.array.shuffle=function(a,b){b=b||Math.random;for(var c=a.length-1;0<c;c--){var d=Math.floor(b()*(c+1)),e=a[c];a[c]=a[d];a[d]=e}};goog.array.copyByIndex=function(a,b){var c=[];goog.array.forEach(b,function(b){c.push(a[b])});return c};
goog.array.concatMap=function(a,b,c){return goog.array.concat.apply([],goog.array.map(a,b,c))};goog.crypt={};goog.crypt.stringToByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);255<e&&(b[c++]=e&255,e>>=8);b[c++]=e}return b};goog.crypt.byteArrayToString=function(a){if(8192>=a.length)return String.fromCharCode.apply(null,a);for(var b="",c=0;c<a.length;c+=8192){var d=goog.array.slice(a,c,c+8192);b+=String.fromCharCode.apply(null,d)}return b};
goog.crypt.byteArrayToHex=function(a,b){return goog.array.map(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join(b||"")};goog.crypt.hexToByteArray=function(a){goog.asserts.assert(0==a.length%2,"Key string length must be multiple of 2");for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substring(c,c+2),16));return b};
goog.crypt.stringToUtf8ByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b};
goog.crypt.utf8ByteArrayToString=function(a){for(var b=[],c=0,d=0;c<a.length;){var e=a[c++];if(128>e)b[d++]=String.fromCharCode(e);else if(191<e&&224>e){var f=a[c++];b[d++]=String.fromCharCode((e&31)<<6|f&63)}else if(239<e&&365>e){f=a[c++];var g=a[c++],h=a[c++];e=((e&7)<<18|(f&63)<<12|(g&63)<<6|h&63)-65536;b[d++]=String.fromCharCode(55296+(e>>10));b[d++]=String.fromCharCode(56320+(e&1023))}else f=a[c++],g=a[c++],b[d++]=String.fromCharCode((e&15)<<12|(f&63)<<6|g&63)}return b.join("")};
goog.crypt.xorByteArray=function(a,b){goog.asserts.assert(a.length==b.length,"XOR array lengths must match");for(var c=[],d=0;d<a.length;d++)c.push(a[d]^b[d]);return c};goog.dom.asserts={};goog.dom.asserts.assertIsLocation=function(a){if(goog.asserts.ENABLE_ASSERTS){var b=goog.dom.asserts.getWindow_(a);b&&(!a||!(a instanceof b.Location)&&a instanceof b.Element)&&goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s",goog.dom.asserts.debugStringForType_(a))}return a};
goog.dom.asserts.assertIsElementType_=function(a,b){if(goog.asserts.ENABLE_ASSERTS){var c=goog.dom.asserts.getWindow_(a);c&&"undefined"!=typeof c[b]&&(a&&(a instanceof c[b]||!(a instanceof c.Location||a instanceof c.Element))||goog.asserts.fail("Argument is not a %s (or a non-Element, non-Location mock); got: %s",b,goog.dom.asserts.debugStringForType_(a)))}return a};goog.dom.asserts.assertIsHTMLAnchorElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLAnchorElement")};
goog.dom.asserts.assertIsHTMLButtonElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLButtonElement")};goog.dom.asserts.assertIsHTMLLinkElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLLinkElement")};goog.dom.asserts.assertIsHTMLImageElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLImageElement")};goog.dom.asserts.assertIsHTMLAudioElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLAudioElement")};
goog.dom.asserts.assertIsHTMLVideoElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLVideoElement")};goog.dom.asserts.assertIsHTMLInputElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLInputElement")};goog.dom.asserts.assertIsHTMLTextAreaElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLTextAreaElement")};goog.dom.asserts.assertIsHTMLCanvasElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLCanvasElement")};
goog.dom.asserts.assertIsHTMLEmbedElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLEmbedElement")};goog.dom.asserts.assertIsHTMLFormElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLFormElement")};goog.dom.asserts.assertIsHTMLFrameElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLFrameElement")};goog.dom.asserts.assertIsHTMLIFrameElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLIFrameElement")};
goog.dom.asserts.assertIsHTMLObjectElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLObjectElement")};goog.dom.asserts.assertIsHTMLScriptElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLScriptElement")};
goog.dom.asserts.debugStringForType_=function(a){if(goog.isObject(a))try{return a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a)}catch(b){return"<object could not be stringified>"}else return void 0===a?"undefined":null===a?"null":typeof a};goog.dom.asserts.getWindow_=function(a){try{var b=a&&a.ownerDocument,c=b&&(b.defaultView||b.parentWindow);c=c||goog.global;if(c.Element&&c.Location)return c}catch(d){}return null};goog.functions={};goog.functions.constant=function(a){return function(){return a}};goog.functions.FALSE=function(){return!1};goog.functions.TRUE=function(){return!0};goog.functions.NULL=function(){return null};goog.functions.identity=function(a,b){return a};goog.functions.error=function(a){return function(){throw Error(a);}};goog.functions.fail=function(a){return function(){throw a;}};
goog.functions.lock=function(a,b){b=b||0;return function(){return a.apply(this,Array.prototype.slice.call(arguments,0,b))}};goog.functions.nth=function(a){return function(){return arguments[a]}};goog.functions.partialRight=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.push.apply(b,c);return a.apply(this,b)}};goog.functions.withReturnValue=function(a,b){return goog.functions.sequence(a,goog.functions.constant(b))};
goog.functions.equalTo=function(a,b){return function(c){return b?a==c:a===c}};goog.functions.compose=function(a,b){var c=arguments,d=c.length;return function(){var a;d&&(a=c[d-1].apply(this,arguments));for(var b=d-2;0<=b;b--)a=c[b].call(this,a);return a}};goog.functions.sequence=function(a){var b=arguments,c=b.length;return function(){for(var a,e=0;e<c;e++)a=b[e].apply(this,arguments);return a}};
goog.functions.and=function(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(!b[a].apply(this,arguments))return!1;return!0}};goog.functions.or=function(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(b[a].apply(this,arguments))return!0;return!1}};goog.functions.not=function(a){return function(){return!a.apply(this,arguments)}};
goog.functions.create=function(a,b){var c=function(){};c.prototype=a.prototype;c=new c;a.apply(c,Array.prototype.slice.call(arguments,1));return c};goog.functions.CACHE_RETURN_VALUE=!0;goog.functions.cacheReturnValue=function(a){var b=!1,c;return function(){if(!goog.functions.CACHE_RETURN_VALUE)return a();b||(c=a(),b=!0);return c}};goog.functions.once=function(a){var b=a;return function(){if(b){var a=b;b=null;a()}}};
goog.functions.debounce=function(a,b,c){var d=0;return function(e){goog.global.clearTimeout(d);var f=arguments;d=goog.global.setTimeout(function(){a.apply(c,f)},b)}};goog.functions.throttle=function(a,b,c){var d=0,e=!1,f=[],g=function(){d=0;e&&(e=!1,h())},h=function(){d=goog.global.setTimeout(g,b);a.apply(c,f)};return function(a){f=arguments;d?e=!0:h()}};goog.functions.rateLimit=function(a,b,c){var d=0,e=function(){d=0};return function(f){d||(d=goog.global.setTimeout(e,b),a.apply(c,arguments))}};goog.dom.HtmlElement=function(){};goog.dom.TagName=function(a){this.tagName_=a};goog.dom.TagName.prototype.toString=function(){return this.tagName_};goog.dom.TagName.A=new goog.dom.TagName("A");goog.dom.TagName.ABBR=new goog.dom.TagName("ABBR");goog.dom.TagName.ACRONYM=new goog.dom.TagName("ACRONYM");goog.dom.TagName.ADDRESS=new goog.dom.TagName("ADDRESS");goog.dom.TagName.APPLET=new goog.dom.TagName("APPLET");goog.dom.TagName.AREA=new goog.dom.TagName("AREA");goog.dom.TagName.ARTICLE=new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE=new goog.dom.TagName("ASIDE");goog.dom.TagName.AUDIO=new goog.dom.TagName("AUDIO");goog.dom.TagName.B=new goog.dom.TagName("B");goog.dom.TagName.BASE=new goog.dom.TagName("BASE");goog.dom.TagName.BASEFONT=new goog.dom.TagName("BASEFONT");goog.dom.TagName.BDI=new goog.dom.TagName("BDI");goog.dom.TagName.BDO=new goog.dom.TagName("BDO");goog.dom.TagName.BIG=new goog.dom.TagName("BIG");goog.dom.TagName.BLOCKQUOTE=new goog.dom.TagName("BLOCKQUOTE");goog.dom.TagName.BODY=new goog.dom.TagName("BODY");
goog.dom.TagName.BR=new goog.dom.TagName("BR");goog.dom.TagName.BUTTON=new goog.dom.TagName("BUTTON");goog.dom.TagName.CANVAS=new goog.dom.TagName("CANVAS");goog.dom.TagName.CAPTION=new goog.dom.TagName("CAPTION");goog.dom.TagName.CENTER=new goog.dom.TagName("CENTER");goog.dom.TagName.CITE=new goog.dom.TagName("CITE");goog.dom.TagName.CODE=new goog.dom.TagName("CODE");goog.dom.TagName.COL=new goog.dom.TagName("COL");goog.dom.TagName.COLGROUP=new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND=new goog.dom.TagName("COMMAND");goog.dom.TagName.DATA=new goog.dom.TagName("DATA");goog.dom.TagName.DATALIST=new goog.dom.TagName("DATALIST");goog.dom.TagName.DD=new goog.dom.TagName("DD");goog.dom.TagName.DEL=new goog.dom.TagName("DEL");goog.dom.TagName.DETAILS=new goog.dom.TagName("DETAILS");goog.dom.TagName.DFN=new goog.dom.TagName("DFN");goog.dom.TagName.DIALOG=new goog.dom.TagName("DIALOG");goog.dom.TagName.DIR=new goog.dom.TagName("DIR");goog.dom.TagName.DIV=new goog.dom.TagName("DIV");
goog.dom.TagName.DL=new goog.dom.TagName("DL");goog.dom.TagName.DT=new goog.dom.TagName("DT");goog.dom.TagName.EM=new goog.dom.TagName("EM");goog.dom.TagName.EMBED=new goog.dom.TagName("EMBED");goog.dom.TagName.FIELDSET=new goog.dom.TagName("FIELDSET");goog.dom.TagName.FIGCAPTION=new goog.dom.TagName("FIGCAPTION");goog.dom.TagName.FIGURE=new goog.dom.TagName("FIGURE");goog.dom.TagName.FONT=new goog.dom.TagName("FONT");goog.dom.TagName.FOOTER=new goog.dom.TagName("FOOTER");goog.dom.TagName.FORM=new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME=new goog.dom.TagName("FRAME");goog.dom.TagName.FRAMESET=new goog.dom.TagName("FRAMESET");goog.dom.TagName.H1=new goog.dom.TagName("H1");goog.dom.TagName.H2=new goog.dom.TagName("H2");goog.dom.TagName.H3=new goog.dom.TagName("H3");goog.dom.TagName.H4=new goog.dom.TagName("H4");goog.dom.TagName.H5=new goog.dom.TagName("H5");goog.dom.TagName.H6=new goog.dom.TagName("H6");goog.dom.TagName.HEAD=new goog.dom.TagName("HEAD");goog.dom.TagName.HEADER=new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP=new goog.dom.TagName("HGROUP");goog.dom.TagName.HR=new goog.dom.TagName("HR");goog.dom.TagName.HTML=new goog.dom.TagName("HTML");goog.dom.TagName.I=new goog.dom.TagName("I");goog.dom.TagName.IFRAME=new goog.dom.TagName("IFRAME");goog.dom.TagName.IMG=new goog.dom.TagName("IMG");goog.dom.TagName.INPUT=new goog.dom.TagName("INPUT");goog.dom.TagName.INS=new goog.dom.TagName("INS");goog.dom.TagName.ISINDEX=new goog.dom.TagName("ISINDEX");goog.dom.TagName.KBD=new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN=new goog.dom.TagName("KEYGEN");goog.dom.TagName.LABEL=new goog.dom.TagName("LABEL");goog.dom.TagName.LEGEND=new goog.dom.TagName("LEGEND");goog.dom.TagName.LI=new goog.dom.TagName("LI");goog.dom.TagName.LINK=new goog.dom.TagName("LINK");goog.dom.TagName.MAIN=new goog.dom.TagName("MAIN");goog.dom.TagName.MAP=new goog.dom.TagName("MAP");goog.dom.TagName.MARK=new goog.dom.TagName("MARK");goog.dom.TagName.MATH=new goog.dom.TagName("MATH");goog.dom.TagName.MENU=new goog.dom.TagName("MENU");
goog.dom.TagName.MENUITEM=new goog.dom.TagName("MENUITEM");goog.dom.TagName.META=new goog.dom.TagName("META");goog.dom.TagName.METER=new goog.dom.TagName("METER");goog.dom.TagName.NAV=new goog.dom.TagName("NAV");goog.dom.TagName.NOFRAMES=new goog.dom.TagName("NOFRAMES");goog.dom.TagName.NOSCRIPT=new goog.dom.TagName("NOSCRIPT");goog.dom.TagName.OBJECT=new goog.dom.TagName("OBJECT");goog.dom.TagName.OL=new goog.dom.TagName("OL");goog.dom.TagName.OPTGROUP=new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION=new goog.dom.TagName("OPTION");goog.dom.TagName.OUTPUT=new goog.dom.TagName("OUTPUT");goog.dom.TagName.P=new goog.dom.TagName("P");goog.dom.TagName.PARAM=new goog.dom.TagName("PARAM");goog.dom.TagName.PICTURE=new goog.dom.TagName("PICTURE");goog.dom.TagName.PRE=new goog.dom.TagName("PRE");goog.dom.TagName.PROGRESS=new goog.dom.TagName("PROGRESS");goog.dom.TagName.Q=new goog.dom.TagName("Q");goog.dom.TagName.RP=new goog.dom.TagName("RP");goog.dom.TagName.RT=new goog.dom.TagName("RT");
goog.dom.TagName.RTC=new goog.dom.TagName("RTC");goog.dom.TagName.RUBY=new goog.dom.TagName("RUBY");goog.dom.TagName.S=new goog.dom.TagName("S");goog.dom.TagName.SAMP=new goog.dom.TagName("SAMP");goog.dom.TagName.SCRIPT=new goog.dom.TagName("SCRIPT");goog.dom.TagName.SECTION=new goog.dom.TagName("SECTION");goog.dom.TagName.SELECT=new goog.dom.TagName("SELECT");goog.dom.TagName.SMALL=new goog.dom.TagName("SMALL");goog.dom.TagName.SOURCE=new goog.dom.TagName("SOURCE");goog.dom.TagName.SPAN=new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE=new goog.dom.TagName("STRIKE");goog.dom.TagName.STRONG=new goog.dom.TagName("STRONG");goog.dom.TagName.STYLE=new goog.dom.TagName("STYLE");goog.dom.TagName.SUB=new goog.dom.TagName("SUB");goog.dom.TagName.SUMMARY=new goog.dom.TagName("SUMMARY");goog.dom.TagName.SUP=new goog.dom.TagName("SUP");goog.dom.TagName.SVG=new goog.dom.TagName("SVG");goog.dom.TagName.TABLE=new goog.dom.TagName("TABLE");goog.dom.TagName.TBODY=new goog.dom.TagName("TBODY");goog.dom.TagName.TD=new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE=new goog.dom.TagName("TEMPLATE");goog.dom.TagName.TEXTAREA=new goog.dom.TagName("TEXTAREA");goog.dom.TagName.TFOOT=new goog.dom.TagName("TFOOT");goog.dom.TagName.TH=new goog.dom.TagName("TH");goog.dom.TagName.THEAD=new goog.dom.TagName("THEAD");goog.dom.TagName.TIME=new goog.dom.TagName("TIME");goog.dom.TagName.TITLE=new goog.dom.TagName("TITLE");goog.dom.TagName.TR=new goog.dom.TagName("TR");goog.dom.TagName.TRACK=new goog.dom.TagName("TRACK");goog.dom.TagName.TT=new goog.dom.TagName("TT");
goog.dom.TagName.U=new goog.dom.TagName("U");goog.dom.TagName.UL=new goog.dom.TagName("UL");goog.dom.TagName.VAR=new goog.dom.TagName("VAR");goog.dom.TagName.VIDEO=new goog.dom.TagName("VIDEO");goog.dom.TagName.WBR=new goog.dom.TagName("WBR");goog.dom.tags={};goog.dom.tags.VOID_TAGS_={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};goog.dom.tags.isVoidTag=function(a){return!0===goog.dom.tags.VOID_TAGS_[a]};goog.html={};goog.html.trustedtypes={};goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY=goog.TRUSTED_TYPES_POLICY_NAME?goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME+"#html"):null;goog.string={};goog.string.TypedString=function(){};goog.string.Const=function(a,b){this.stringConstValueWithSecurityContract__googStringSecurityPrivate_=a===goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_&&b||"";this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_=goog.string.Const.TYPE_MARKER_};goog.string.Const.prototype.implementsGoogStringTypedString=!0;goog.string.Const.prototype.getTypedStringValue=function(){return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_};
goog.string.Const.prototype.toString=function(){return"Const{"+this.stringConstValueWithSecurityContract__googStringSecurityPrivate_+"}"};goog.string.Const.unwrap=function(a){if(a instanceof goog.string.Const&&a.constructor===goog.string.Const&&a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_===goog.string.Const.TYPE_MARKER_)return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;goog.asserts.fail("expected object of type Const, got '"+a+"'");return"type_error:Const"};
goog.string.Const.from=function(a){return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_,a)};goog.string.Const.TYPE_MARKER_={};goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_={};goog.string.Const.EMPTY=goog.string.Const.from("");goog.html.SafeScript=function(){this.privateDoNotAccessOrElseSafeScriptWrappedValue_="";this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeScript.prototype.implementsGoogStringTypedString=!0;goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.SafeScript.fromConstant=function(a){a=goog.string.Const.unwrap(a);return 0===a.length?goog.html.SafeScript.EMPTY:goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeScript.fromConstantAndArgs=function(a,b){for(var c=[],d=1;d<arguments.length;d++)c.push(goog.html.SafeScript.stringify_(arguments[d]));return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("("+goog.string.Const.unwrap(a)+")("+c.join(", ")+");")};goog.html.SafeScript.fromJson=function(a){return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(goog.html.SafeScript.stringify_(a))};goog.html.SafeScript.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString()};
goog.DEBUG&&(goog.html.SafeScript.prototype.toString=function(){return"SafeScript{"+this.privateDoNotAccessOrElseSafeScriptWrappedValue_+"}"});goog.html.SafeScript.unwrap=function(a){return goog.html.SafeScript.unwrapTrustedScript(a).toString()};
goog.html.SafeScript.unwrapTrustedScript=function(a){if(a instanceof goog.html.SafeScript&&a.constructor===goog.html.SafeScript&&a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;goog.asserts.fail("expected object of type SafeScript, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeScript"};
goog.html.SafeScript.stringify_=function(a){return JSON.stringify(a).replace(/</g,"\\x3c")};goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse=function(a){return(new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a){this.privateDoNotAccessOrElseSafeScriptWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(a):a;return this};goog.html.SafeScript.EMPTY=goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");goog.fs={};goog.fs.url={};goog.fs.url.createObjectUrl=function(a){return goog.fs.url.getUrlObject_().createObjectURL(a)};goog.fs.url.revokeObjectUrl=function(a){goog.fs.url.getUrlObject_().revokeObjectURL(a)};goog.fs.url.getUrlObject_=function(){var a=goog.fs.url.findUrlObject_();if(null!=a)return a;throw Error("This browser doesn't seem to support blob URLs");};
goog.fs.url.findUrlObject_=function(){return goog.isDef(goog.global.URL)&&goog.isDef(goog.global.URL.createObjectURL)?goog.global.URL:goog.isDef(goog.global.webkitURL)&&goog.isDef(goog.global.webkitURL.createObjectURL)?goog.global.webkitURL:goog.isDef(goog.global.createObjectURL)?goog.global:null};goog.fs.url.browserSupportsObjectUrls=function(){return null!=goog.fs.url.findUrlObject_()};goog.i18n={};goog.i18n.bidi={};goog.i18n.bidi.FORCE_RTL=!1;
goog.i18n.bidi.IS_RTL=goog.i18n.bidi.FORCE_RTL||("ar"==goog.LOCALE.substring(0,2).toLowerCase()||"fa"==goog.LOCALE.substring(0,2).toLowerCase()||"he"==goog.LOCALE.substring(0,2).toLowerCase()||"iw"==goog.LOCALE.substring(0,2).toLowerCase()||"ps"==goog.LOCALE.substring(0,2).toLowerCase()||"sd"==goog.LOCALE.substring(0,2).toLowerCase()||"ug"==goog.LOCALE.substring(0,2).toLowerCase()||"ur"==goog.LOCALE.substring(0,2).toLowerCase()||"yi"==goog.LOCALE.substring(0,2).toLowerCase())&&(2==goog.LOCALE.length||
"-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3))||3<=goog.LOCALE.length&&"ckb"==goog.LOCALE.substring(0,3).toLowerCase()&&(3==goog.LOCALE.length||"-"==goog.LOCALE.substring(3,4)||"_"==goog.LOCALE.substring(3,4))||7<=goog.LOCALE.length&&("-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3))&&("adlm"==goog.LOCALE.substring(3,7).toLowerCase()||"arab"==goog.LOCALE.substring(3,7).toLowerCase()||"hebr"==goog.LOCALE.substring(3,7).toLowerCase()||"nkoo"==goog.LOCALE.substring(3,
7).toLowerCase()||"rohg"==goog.LOCALE.substring(3,7).toLowerCase()||"thaa"==goog.LOCALE.substring(3,7).toLowerCase())||8<=goog.LOCALE.length&&("-"==goog.LOCALE.substring(3,4)||"_"==goog.LOCALE.substring(3,4))&&("adlm"==goog.LOCALE.substring(4,8).toLowerCase()||"arab"==goog.LOCALE.substring(4,8).toLowerCase()||"hebr"==goog.LOCALE.substring(4,8).toLowerCase()||"nkoo"==goog.LOCALE.substring(4,8).toLowerCase()||"rohg"==goog.LOCALE.substring(4,8).toLowerCase()||"thaa"==goog.LOCALE.substring(4,8).toLowerCase());
goog.i18n.bidi.Format={LRE:"\u202a",RLE:"\u202b",PDF:"\u202c",LRM:"\u200e",RLM:"\u200f"};goog.i18n.bidi.Dir={LTR:1,RTL:-1,NEUTRAL:0};goog.i18n.bidi.RIGHT="right";goog.i18n.bidi.LEFT="left";goog.i18n.bidi.I18N_RIGHT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.LEFT:goog.i18n.bidi.RIGHT;goog.i18n.bidi.I18N_LEFT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir=function(a,b){return"number"==typeof a?0<a?goog.i18n.bidi.Dir.LTR:0>a?goog.i18n.bidi.Dir.RTL:b?null:goog.i18n.bidi.Dir.NEUTRAL:null==a?null:a?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};goog.i18n.bidi.ltrChars_="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";goog.i18n.bidi.rtlChars_="\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_=/<[^>]*>|&[^;]+;/g;goog.i18n.bidi.stripHtmlIfNeeded_=function(a,b){return b?a.replace(goog.i18n.bidi.htmlSkipReg_,""):a};goog.i18n.bidi.rtlCharReg_=new RegExp("["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.ltrCharReg_=new RegExp("["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.hasAnyRtl=function(a,b){return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.hasRtlChar=goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr=function(a,b){return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.ltrRe_=new RegExp("^["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlRe_=new RegExp("^["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.isRtlChar=function(a){return goog.i18n.bidi.rtlRe_.test(a)};goog.i18n.bidi.isLtrChar=function(a){return goog.i18n.bidi.ltrRe_.test(a)};goog.i18n.bidi.isNeutralChar=function(a){return!goog.i18n.bidi.isLtrChar(a)&&!goog.i18n.bidi.isRtlChar(a)};
goog.i18n.bidi.ltrDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.rtlChars_+"]*["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.ltrChars_+"]*["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.startsWithRtl=function(a,b){return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlText=goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr=function(a,b){return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrText=goog.i18n.bidi.startsWithLtr;goog.i18n.bidi.isRequiredLtrRe_=/^http:\/\/.*/;goog.i18n.bidi.isNeutralText=function(a,b){a=goog.i18n.bidi.stripHtmlIfNeeded_(a,b);return goog.i18n.bidi.isRequiredLtrRe_.test(a)||!goog.i18n.bidi.hasAnyLtr(a)&&!goog.i18n.bidi.hasAnyRtl(a)};
goog.i18n.bidi.ltrExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.ltrChars_+"][^"+goog.i18n.bidi.rtlChars_+"]*$");goog.i18n.bidi.rtlExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.rtlChars_+"][^"+goog.i18n.bidi.ltrChars_+"]*$");goog.i18n.bidi.endsWithLtr=function(a,b){return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrExitText=goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl=function(a,b){return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlExitText=goog.i18n.bidi.endsWithRtl;goog.i18n.bidi.rtlLocalesRe_=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;goog.i18n.bidi.isRtlLanguage=function(a){return goog.i18n.bidi.rtlLocalesRe_.test(a)};goog.i18n.bidi.bracketGuardTextRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText=function(a,b){b=(void 0===b?goog.i18n.bidi.hasAnyRtl(a):b)?goog.i18n.bidi.Format.RLM:goog.i18n.bidi.Format.LRM;return a.replace(goog.i18n.bidi.bracketGuardTextRe_,b+"$&"+b)};goog.i18n.bidi.enforceRtlInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+a+"</span>"};goog.i18n.bidi.enforceRtlInText=function(a){return goog.i18n.bidi.Format.RLE+a+goog.i18n.bidi.Format.PDF};
goog.i18n.bidi.enforceLtrInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+a+"</span>"};goog.i18n.bidi.enforceLtrInText=function(a){return goog.i18n.bidi.Format.LRE+a+goog.i18n.bidi.Format.PDF};goog.i18n.bidi.dimensionsRe_=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;goog.i18n.bidi.leftRe_=/left/gi;goog.i18n.bidi.rightRe_=/right/gi;goog.i18n.bidi.tempRe_=/%%%%/g;
goog.i18n.bidi.mirrorCSS=function(a){return a.replace(goog.i18n.bidi.dimensionsRe_,":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_,"%%%%").replace(goog.i18n.bidi.rightRe_,goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_,goog.i18n.bidi.RIGHT)};goog.i18n.bidi.doubleQuoteSubstituteRe_=/([\u0591-\u05f2])"/g;goog.i18n.bidi.singleQuoteSubstituteRe_=/([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote=function(a){return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_,"$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_,"$1\u05f3")};goog.i18n.bidi.wordSeparatorRe_=/\s+/;goog.i18n.bidi.hasNumeralsRe_=/[\d\u06f0-\u06f9]/;goog.i18n.bidi.rtlDetectionThreshold_=.4;
goog.i18n.bidi.estimateDirection=function(a,b){var c=0,d=0,e=!1;a=goog.i18n.bidi.stripHtmlIfNeeded_(a,b).split(goog.i18n.bidi.wordSeparatorRe_);for(b=0;b<a.length;b++){var f=a[b];goog.i18n.bidi.startsWithRtl(f)?(c++,d++):goog.i18n.bidi.isRequiredLtrRe_.test(f)?e=!0:goog.i18n.bidi.hasAnyLtr(f)?d++:goog.i18n.bidi.hasNumeralsRe_.test(f)&&(e=!0)}return 0==d?e?goog.i18n.bidi.Dir.LTR:goog.i18n.bidi.Dir.NEUTRAL:c/d>goog.i18n.bidi.rtlDetectionThreshold_?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};
goog.i18n.bidi.detectRtlDirectionality=function(a,b){return goog.i18n.bidi.estimateDirection(a,b)==goog.i18n.bidi.Dir.RTL};goog.i18n.bidi.setElementDirAndAlign=function(a,b){a&&(b=goog.i18n.bidi.toDir(b))&&(a.style.textAlign=b==goog.i18n.bidi.Dir.RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT,a.dir=b==goog.i18n.bidi.Dir.RTL?"rtl":"ltr")};
goog.i18n.bidi.setElementDirByTextDirectionality=function(a,b){switch(goog.i18n.bidi.estimateDirection(b)){case goog.i18n.bidi.Dir.LTR:a.dir="ltr";break;case goog.i18n.bidi.Dir.RTL:a.dir="rtl";break;default:a.removeAttribute("dir")}};goog.i18n.bidi.DirectionalString=function(){};goog.html.TrustedResourceUrl=function(){this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_="";this.trustedURL_=null;this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString=!0;goog.html.TrustedResourceUrl.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString()};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.TrustedResourceUrl.prototype.getDirection=function(){return goog.i18n.bidi.Dir.LTR};
goog.html.TrustedResourceUrl.prototype.cloneWithParams=function(a,b){var c=goog.html.TrustedResourceUrl.unwrap(this);c=goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(c);var d=c[3]||"";return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(c[1]+goog.html.TrustedResourceUrl.stringifyParams_("?",c[2]||"",a)+goog.html.TrustedResourceUrl.stringifyParams_("#",d,b))};
goog.DEBUG&&(goog.html.TrustedResourceUrl.prototype.toString=function(){return"TrustedResourceUrl{"+this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_+"}"});goog.html.TrustedResourceUrl.unwrap=function(a){return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(a).toString()};
goog.html.TrustedResourceUrl.unwrapTrustedScriptURL=function(a){if(a instanceof goog.html.TrustedResourceUrl&&a.constructor===goog.html.TrustedResourceUrl&&a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;goog.asserts.fail("expected object of type TrustedResourceUrl, got '"+a+"' of type "+goog.typeOf(a));return"type_error:TrustedResourceUrl"};
goog.html.TrustedResourceUrl.unwrapTrustedURL=function(a){return a.trustedURL_?a.trustedURL_:goog.html.TrustedResourceUrl.unwrap(a)};
goog.html.TrustedResourceUrl.format=function(a,b){var c=goog.string.Const.unwrap(a);if(!goog.html.TrustedResourceUrl.BASE_URL_.test(c))throw Error("Invalid TrustedResourceUrl format: "+c);a=c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_,function(a,e){if(!Object.prototype.hasOwnProperty.call(b,e))throw Error('Found marker, "'+e+'", in format string, "'+c+'", but no valid label mapping found in args: '+JSON.stringify(b));a=b[e];return a instanceof goog.string.Const?goog.string.Const.unwrap(a):
encodeURIComponent(String(a))});return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)};goog.html.TrustedResourceUrl.FORMAT_MARKER_=/%{(\w+)}/g;goog.html.TrustedResourceUrl.BASE_URL_=/^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;goog.html.TrustedResourceUrl.URL_PARAM_PARSER_=/^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
goog.html.TrustedResourceUrl.formatWithParams=function(a,b,c,d){return goog.html.TrustedResourceUrl.format(a,b).cloneWithParams(c,d)};goog.html.TrustedResourceUrl.fromConstant=function(a){return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))};goog.html.TrustedResourceUrl.fromConstants=function(a){for(var b="",c=0;c<a.length;c++)b+=goog.string.Const.unwrap(a[c]);return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse=function(a){var b=new goog.html.TrustedResourceUrl;b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(a):a;goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY&&(b.trustedURL_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(a));return b};
goog.html.TrustedResourceUrl.stringifyParams_=function(a,b,c){if(null==c)return b;if(goog.isString(c))return c?a+encodeURIComponent(c):"";for(var d in c){var e=c[d];e=goog.isArray(e)?e:[e];for(var f=0;f<e.length;f++){var g=e[f];null!=g&&(b||(b=a),b+=(b.length>a.length?"&":"")+encodeURIComponent(d)+"="+encodeURIComponent(String(g)))}}return b};goog.string.internal={};goog.string.internal.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.internal.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.internal.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.internal.caseInsensitiveCompare(b,a.substr(0,b.length))};goog.string.internal.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.internal.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};
goog.string.internal.caseInsensitiveEquals=function(a,b){return a.toLowerCase()==b.toLowerCase()};goog.string.internal.isEmptyOrWhitespace=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.internal.trim=goog.TRUSTED_SITE&&String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};goog.string.internal.caseInsensitiveCompare=function(a,b){a=String(a).toLowerCase();b=String(b).toLowerCase();return a<b?-1:a==b?0:1};
goog.string.internal.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.internal.htmlEscape=function(a,b){if(b)a=a.replace(goog.string.internal.AMP_RE_,"&amp;").replace(goog.string.internal.LT_RE_,"&lt;").replace(goog.string.internal.GT_RE_,"&gt;").replace(goog.string.internal.QUOT_RE_,"&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_,"&#39;").replace(goog.string.internal.NULL_RE_,"&#0;");else{if(!goog.string.internal.ALL_RE_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.internal.AMP_RE_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.internal.LT_RE_,
"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.internal.GT_RE_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.internal.QUOT_RE_,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(goog.string.internal.SINGLE_QUOTE_RE_,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(goog.string.internal.NULL_RE_,"&#0;"))}return a};goog.string.internal.AMP_RE_=/&/g;goog.string.internal.LT_RE_=/</g;goog.string.internal.GT_RE_=/>/g;goog.string.internal.QUOT_RE_=/"/g;goog.string.internal.SINGLE_QUOTE_RE_=/'/g;
goog.string.internal.NULL_RE_=/\x00/g;goog.string.internal.ALL_RE_=/[\x00&<>"']/;goog.string.internal.whitespaceEscape=function(a,b){return goog.string.internal.newLineToBr(a.replace(/  /g," &#160;"),b)};goog.string.internal.contains=function(a,b){return-1!=a.indexOf(b)};goog.string.internal.caseInsensitiveContains=function(a,b){return goog.string.internal.contains(a.toLowerCase(),b.toLowerCase())};
goog.string.internal.compareVersions=function(a,b){var c=0;a=goog.string.internal.trim(String(a)).split(".");b=goog.string.internal.trim(String(b)).split(".");for(var d=Math.max(a.length,b.length),e=0;0==c&&e<d;e++){var f=a[e]||"",g=b[e]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];if(0==f[0].length&&0==g[0].length)break;c=0==f[1].length?0:parseInt(f[1],10);var h=0==g[1].length?0:parseInt(g[1],10);c=goog.string.internal.compareElements_(c,h)||goog.string.internal.compareElements_(0==
f[2].length,0==g[2].length)||goog.string.internal.compareElements_(f[2],g[2]);f=f[3];g=g[3]}while(0==c)}return c};goog.string.internal.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.html.SafeUrl=function(){this.privateDoNotAccessOrElseSafeUrlWrappedValue_="";this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeUrl.INNOCUOUS_STRING="about:invalid#zClosurez";goog.html.SafeUrl.prototype.implementsGoogStringTypedString=!0;goog.html.SafeUrl.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString()};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.SafeUrl.prototype.getDirection=function(){return goog.i18n.bidi.Dir.LTR};goog.DEBUG&&(goog.html.SafeUrl.prototype.toString=function(){return"SafeUrl{"+this.privateDoNotAccessOrElseSafeUrlWrappedValue_+"}"});goog.html.SafeUrl.unwrap=function(a){return goog.html.SafeUrl.unwrapTrustedURL(a).toString()};
goog.html.SafeUrl.unwrapTrustedURL=function(a){if(a instanceof goog.html.SafeUrl&&a.constructor===goog.html.SafeUrl&&a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeUrlWrappedValue_;goog.asserts.fail("expected object of type SafeUrl, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeUrl"};goog.html.SafeUrl.fromConstant=function(a){return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))};
goog.html.SAFE_MIME_TYPE_PATTERN_=/^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i;goog.html.SafeUrl.isSafeMimeType=function(a){return goog.html.SAFE_MIME_TYPE_PATTERN_.test(a)};goog.html.SafeUrl.fromBlob=function(a){a=goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type)?goog.fs.url.createObjectUrl(a):goog.html.SafeUrl.INNOCUOUS_STRING;return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.DATA_URL_PATTERN_=/^data:([^,]*);base64,[a-z0-9+\/]+=*$/i;goog.html.SafeUrl.fromDataUrl=function(a){a=a.replace(/(%0A|%0D)/g,"");var b=a.match(goog.html.DATA_URL_PATTERN_);b=b&&goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b?a:goog.html.SafeUrl.INNOCUOUS_STRING)};goog.html.SafeUrl.fromTelUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"tel:")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SIP_URL_PATTERN_=/^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;goog.html.SafeUrl.fromSipUrl=function(a){goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(a))||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeUrl.fromFacebookMessengerUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"fb-messenger://share")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.fromWhatsAppUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"whatsapp://send")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeUrl.fromSmsUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"sms:")&&goog.html.SafeUrl.isSmsUrlBodyValid_(a)||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.isSmsUrlBodyValid_=function(a){var b=a.indexOf("#");0<b&&(a=a.substring(0,b));b=a.match(/[?&]body=/gi);if(!b)return!0;if(1<b.length)return!1;a=a.match(/[?&]body=([^&]*)/)[1];if(!a)return!0;try{decodeURIComponent(a)}catch(c){return!1}return/^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(a)};goog.html.SafeUrl.fromSshUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"ssh://")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.sanitizeChromeExtensionUrl=function(a,b){return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//,a,b)};goog.html.SafeUrl.sanitizeFirefoxExtensionUrl=function(a,b){return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//,a,b)};goog.html.SafeUrl.sanitizeEdgeExtensionUrl=function(a,b){return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//,a,b)};
goog.html.SafeUrl.sanitizeExtensionUrl_=function(a,b,c){(a=a.exec(b))?(a=a[1],-1==(c instanceof goog.string.Const?[goog.string.Const.unwrap(c)]:c.map(function(a){return goog.string.Const.unwrap(a)})).indexOf(a)&&(b=goog.html.SafeUrl.INNOCUOUS_STRING)):b=goog.html.SafeUrl.INNOCUOUS_STRING;return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)};goog.html.SafeUrl.fromTrustedResourceUrl=function(a){return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a))};
goog.html.SAFE_URL_PATTERN_=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;goog.html.SafeUrl.SAFE_URL_PATTERN=goog.html.SAFE_URL_PATTERN_;goog.html.SafeUrl.sanitize=function(a){if(a instanceof goog.html.SafeUrl)return a;a="object"==typeof a&&a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);goog.html.SAFE_URL_PATTERN_.test(a)||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.sanitizeAssertUnchanged=function(a,b){if(a instanceof goog.html.SafeUrl)return a;a="object"==typeof a&&a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);if(b&&/^data:/i.test(a)&&(b=goog.html.SafeUrl.fromDataUrl(a),b.getTypedStringValue()==a))return b;goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(a),"%s does not match the safe URL pattern",a)||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse=function(a){var b=new goog.html.SafeUrl;b.privateDoNotAccessOrElseSafeUrlWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(a):a;return b};goog.html.SafeUrl.ABOUT_BLANK=goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");goog.html.SafeStyle=function(){this.privateDoNotAccessOrElseSafeStyleWrappedValue_="";this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeStyle.prototype.implementsGoogStringTypedString=!0;goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.SafeStyle.fromConstant=function(a){a=goog.string.Const.unwrap(a);if(0===a.length)return goog.html.SafeStyle.EMPTY;goog.asserts.assert(goog.string.internal.endsWith(a,";"),"Last character of style string is not ';': "+a);goog.asserts.assert(goog.string.internal.contains(a,":"),"Style string must contain at least one ':', to specify a \"name: value\" pair: "+a);return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeStyle.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeStyleWrappedValue_};goog.DEBUG&&(goog.html.SafeStyle.prototype.toString=function(){return"SafeStyle{"+this.privateDoNotAccessOrElseSafeStyleWrappedValue_+"}"});
goog.html.SafeStyle.unwrap=function(a){if(a instanceof goog.html.SafeStyle&&a.constructor===goog.html.SafeStyle&&a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;goog.asserts.fail("expected object of type SafeStyle, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeStyle"};goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse=function(a){return(new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a){this.privateDoNotAccessOrElseSafeStyleWrappedValue_=a;return this};goog.html.SafeStyle.EMPTY=goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");goog.html.SafeStyle.INNOCUOUS_STRING="zClosurez";
goog.html.SafeStyle.create=function(a){var b="",c;for(c in a){if(!/^[-_a-zA-Z0-9]+$/.test(c))throw Error("Name allows only [-_a-zA-Z0-9], got: "+c);var d=a[c];null!=d&&(d=goog.isArray(d)?goog.array.map(d,goog.html.SafeStyle.sanitizePropertyValue_).join(" "):goog.html.SafeStyle.sanitizePropertyValue_(d),b+=c+":"+d+";")}return b?goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b):goog.html.SafeStyle.EMPTY};
goog.html.SafeStyle.sanitizePropertyValue_=function(a){if(a instanceof goog.html.SafeUrl)return'url("'+goog.html.SafeUrl.unwrap(a).replace(/</g,"%3c").replace(/[\\"]/g,"\\$&")+'")';a=a instanceof goog.string.Const?goog.string.Const.unwrap(a):goog.html.SafeStyle.sanitizePropertyValueString_(String(a));if(/[{;}]/.test(a))throw new goog.asserts.AssertionError("Value does not allow [{;}], got: %s.",[a]);return a};
goog.html.SafeStyle.sanitizePropertyValueString_=function(a){var b=a.replace(goog.html.SafeStyle.FUNCTIONS_RE_,"$1").replace(goog.html.SafeStyle.FUNCTIONS_RE_,"$1").replace(goog.html.SafeStyle.URL_RE_,"url");if(goog.html.SafeStyle.VALUE_RE_.test(b)){if(goog.html.SafeStyle.COMMENT_RE_.test(a))return goog.asserts.fail("String value disallows comments, got: "+a),goog.html.SafeStyle.INNOCUOUS_STRING;if(!goog.html.SafeStyle.hasBalancedQuotes_(a))return goog.asserts.fail("String value requires balanced quotes, got: "+
a),goog.html.SafeStyle.INNOCUOUS_STRING;if(!goog.html.SafeStyle.hasBalancedSquareBrackets_(a))return goog.asserts.fail("String value requires balanced square brackets and one identifier per pair of brackets, got: "+a),goog.html.SafeStyle.INNOCUOUS_STRING}else return goog.asserts.fail("String value allows only "+goog.html.SafeStyle.VALUE_ALLOWED_CHARS_+" and simple functions, got: "+a),goog.html.SafeStyle.INNOCUOUS_STRING;return goog.html.SafeStyle.sanitizeUrl_(a)};
goog.html.SafeStyle.hasBalancedQuotes_=function(a){for(var b=!0,c=!0,d=0;d<a.length;d++){var e=a.charAt(d);"'"==e&&c?b=!b:'"'==e&&b&&(c=!c)}return b&&c};goog.html.SafeStyle.hasBalancedSquareBrackets_=function(a){for(var b=!0,c=/^[-_a-zA-Z0-9]$/,d=0;d<a.length;d++){var e=a.charAt(d);if("]"==e){if(b)return!1;b=!0}else if("["==e){if(!b)return!1;b=!1}else if(!b&&!c.test(e))return!1}return b};goog.html.SafeStyle.VALUE_ALLOWED_CHARS_="[-,.\"'%_!# a-zA-Z0-9\\[\\]]";
goog.html.SafeStyle.VALUE_RE_=new RegExp("^"+goog.html.SafeStyle.VALUE_ALLOWED_CHARS_+"+$");goog.html.SafeStyle.URL_RE_=/\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;goog.html.SafeStyle.FUNCTIONS_RE_=/\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g;goog.html.SafeStyle.COMMENT_RE_=/\/\*/;
goog.html.SafeStyle.sanitizeUrl_=function(a){return a.replace(goog.html.SafeStyle.URL_RE_,function(a,c,d,e){var b="";d=d.replace(/^(['"])(.*)\1$/,function(a,c,d){b=c;return d});a=goog.html.SafeUrl.sanitize(d).getTypedStringValue();return c+b+a+b+e})};goog.html.SafeStyle.concat=function(a){var b="",c=function(a){goog.isArray(a)?goog.array.forEach(a,c):b+=goog.html.SafeStyle.unwrap(a)};goog.array.forEach(arguments,c);return b?goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b):goog.html.SafeStyle.EMPTY};goog.html.SafeStyleSheet=function(){this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_="";this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString=!0;goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.SafeStyleSheet.createRule=function(a,b){if(goog.string.internal.contains(a,"<"))throw Error("Selector does not allow '<', got: "+a);var c=a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g,"");if(!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c))throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: "+a);if(!goog.html.SafeStyleSheet.hasBalancedBrackets_(c))throw Error("() and [] in selector must be balanced, got: "+a);b instanceof goog.html.SafeStyle||(b=goog.html.SafeStyle.create(b));
a=a+"{"+goog.html.SafeStyle.unwrap(b).replace(/</g,"\\3C ")+"}";return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeStyleSheet.hasBalancedBrackets_=function(a){for(var b={"(":")","[":"]"},c=[],d=0;d<a.length;d++){var e=a[d];if(b[e])c.push(b[e]);else if(goog.object.contains(b,e)&&c.pop()!=e)return!1}return 0==c.length};
goog.html.SafeStyleSheet.concat=function(a){var b="",c=function(a){goog.isArray(a)?goog.array.forEach(a,c):b+=goog.html.SafeStyleSheet.unwrap(a)};goog.array.forEach(arguments,c);return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)};
goog.html.SafeStyleSheet.fromConstant=function(a){a=goog.string.Const.unwrap(a);if(0===a.length)return goog.html.SafeStyleSheet.EMPTY;goog.asserts.assert(!goog.string.internal.contains(a,"<"),"Forbidden '<' character in style sheet string: "+a);return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeStyleSheet.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_};
goog.DEBUG&&(goog.html.SafeStyleSheet.prototype.toString=function(){return"SafeStyleSheet{"+this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_+"}"});
goog.html.SafeStyleSheet.unwrap=function(a){if(a instanceof goog.html.SafeStyleSheet&&a.constructor===goog.html.SafeStyleSheet&&a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;goog.asserts.fail("expected object of type SafeStyleSheet, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeStyleSheet"};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse=function(a){return(new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)};goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a){this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_=a;return this};goog.html.SafeStyleSheet.EMPTY=goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");goog.labs={};goog.labs.userAgent={};goog.labs.userAgent.util={};goog.labs.userAgent.util.getNativeUserAgentString_=function(){var a=goog.labs.userAgent.util.getNavigator_();return a&&(a=a.userAgent)?a:""};goog.labs.userAgent.util.getNavigator_=function(){return goog.global.navigator};goog.labs.userAgent.util.userAgent_=goog.labs.userAgent.util.getNativeUserAgentString_();goog.labs.userAgent.util.setUserAgent=function(a){goog.labs.userAgent.util.userAgent_=a||goog.labs.userAgent.util.getNativeUserAgentString_()};
goog.labs.userAgent.util.getUserAgent=function(){return goog.labs.userAgent.util.userAgent_};goog.labs.userAgent.util.matchUserAgent=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.internal.contains(b,a)};goog.labs.userAgent.util.matchUserAgentIgnoreCase=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.internal.caseInsensitiveContains(b,a)};
goog.labs.userAgent.util.extractVersionTuples=function(a){for(var b=/(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g,c=[],d;d=b.exec(a);)c.push([d[1],d[2],d[3]||void 0]);return c};goog.labs.userAgent.browser={};goog.labs.userAgent.browser.matchOpera_=function(){return goog.labs.userAgent.util.matchUserAgent("Opera")};goog.labs.userAgent.browser.matchIE_=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.browser.matchEdgeHtml_=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};goog.labs.userAgent.browser.matchEdgeChromium_=function(){return goog.labs.userAgent.util.matchUserAgent("Edg/")};
goog.labs.userAgent.browser.matchOperaChromium_=function(){return goog.labs.userAgent.util.matchUserAgent("OPR")};goog.labs.userAgent.browser.matchFirefox_=function(){return goog.labs.userAgent.util.matchUserAgent("Firefox")||goog.labs.userAgent.util.matchUserAgent("FxiOS")};
goog.labs.userAgent.browser.matchSafari_=function(){return goog.labs.userAgent.util.matchUserAgent("Safari")&&!(goog.labs.userAgent.browser.matchChrome_()||goog.labs.userAgent.browser.matchCoast_()||goog.labs.userAgent.browser.matchOpera_()||goog.labs.userAgent.browser.matchEdgeHtml_()||goog.labs.userAgent.browser.matchEdgeChromium_()||goog.labs.userAgent.browser.matchOperaChromium_()||goog.labs.userAgent.browser.matchFirefox_()||goog.labs.userAgent.browser.isSilk()||goog.labs.userAgent.util.matchUserAgent("Android"))};
goog.labs.userAgent.browser.matchCoast_=function(){return goog.labs.userAgent.util.matchUserAgent("Coast")};goog.labs.userAgent.browser.matchIosWebview_=function(){return(goog.labs.userAgent.util.matchUserAgent("iPad")||goog.labs.userAgent.util.matchUserAgent("iPhone"))&&!goog.labs.userAgent.browser.matchSafari_()&&!goog.labs.userAgent.browser.matchChrome_()&&!goog.labs.userAgent.browser.matchCoast_()&&!goog.labs.userAgent.browser.matchFirefox_()&&goog.labs.userAgent.util.matchUserAgent("AppleWebKit")};
goog.labs.userAgent.browser.matchChrome_=function(){return(goog.labs.userAgent.util.matchUserAgent("Chrome")||goog.labs.userAgent.util.matchUserAgent("CriOS"))&&!goog.labs.userAgent.browser.matchEdgeHtml_()};goog.labs.userAgent.browser.matchAndroidBrowser_=function(){return goog.labs.userAgent.util.matchUserAgent("Android")&&!(goog.labs.userAgent.browser.isChrome()||goog.labs.userAgent.browser.isFirefox()||goog.labs.userAgent.browser.isOpera()||goog.labs.userAgent.browser.isSilk())};
goog.labs.userAgent.browser.isOpera=goog.labs.userAgent.browser.matchOpera_;goog.labs.userAgent.browser.isIE=goog.labs.userAgent.browser.matchIE_;goog.labs.userAgent.browser.isEdge=goog.labs.userAgent.browser.matchEdgeHtml_;goog.labs.userAgent.browser.isEdgeChromium=goog.labs.userAgent.browser.matchEdgeChromium_;goog.labs.userAgent.browser.isOperaChromium=goog.labs.userAgent.browser.matchOperaChromium_;goog.labs.userAgent.browser.isFirefox=goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari=goog.labs.userAgent.browser.matchSafari_;goog.labs.userAgent.browser.isCoast=goog.labs.userAgent.browser.matchCoast_;goog.labs.userAgent.browser.isIosWebview=goog.labs.userAgent.browser.matchIosWebview_;goog.labs.userAgent.browser.isChrome=goog.labs.userAgent.browser.matchChrome_;goog.labs.userAgent.browser.isAndroidBrowser=goog.labs.userAgent.browser.matchAndroidBrowser_;goog.labs.userAgent.browser.isSilk=function(){return goog.labs.userAgent.util.matchUserAgent("Silk")};
goog.labs.userAgent.browser.getVersion=function(){function a(a){a=goog.array.find(a,d);return c[a]||""}var b=goog.labs.userAgent.util.getUserAgent();if(goog.labs.userAgent.browser.isIE())return goog.labs.userAgent.browser.getIEVersion_(b);b=goog.labs.userAgent.util.extractVersionTuples(b);var c={};goog.array.forEach(b,function(a){c[a[0]]=a[1]});var d=goog.partial(goog.object.containsKey,c);return goog.labs.userAgent.browser.isOpera()?a(["Version","Opera"]):goog.labs.userAgent.browser.isEdge()?a(["Edge"]):
goog.labs.userAgent.browser.isEdgeChromium()?a(["Edg"]):goog.labs.userAgent.browser.isChrome()?a(["Chrome","CriOS"]):(b=b[2])&&b[1]||""};goog.labs.userAgent.browser.isVersionOrHigher=function(a){return 0<=goog.string.internal.compareVersions(goog.labs.userAgent.browser.getVersion(),a)};
goog.labs.userAgent.browser.getIEVersion_=function(a){var b=/rv: *([\d\.]*)/.exec(a);if(b&&b[1])return b[1];b="";var c=/MSIE +([\d\.]+)/.exec(a);if(c&&c[1])if(a=/Trident\/(\d.\d)/.exec(a),"7.0"==c[1])if(a&&a[1])switch(a[1]){case "4.0":b="8.0";break;case "5.0":b="9.0";break;case "6.0":b="10.0";break;case "7.0":b="11.0"}else b="7.0";else b=c[1];return b};goog.html.SafeHtml=function(){this.privateDoNotAccessOrElseSafeHtmlWrappedValue_="";this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;this.dir_=null};goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.SafeHtml.prototype.getDirection=function(){return this.dir_};goog.html.SafeHtml.prototype.implementsGoogStringTypedString=!0;goog.html.SafeHtml.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString()};
goog.DEBUG&&(goog.html.SafeHtml.prototype.toString=function(){return"SafeHtml{"+this.privateDoNotAccessOrElseSafeHtmlWrappedValue_+"}"});goog.html.SafeHtml.unwrap=function(a){return goog.html.SafeHtml.unwrapTrustedHTML(a).toString()};
goog.html.SafeHtml.unwrapTrustedHTML=function(a){if(a instanceof goog.html.SafeHtml&&a.constructor===goog.html.SafeHtml&&a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;goog.asserts.fail("expected object of type SafeHtml, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeHtml"};
goog.html.SafeHtml.htmlEscape=function(a){if(a instanceof goog.html.SafeHtml)return a;var b="object"==typeof a,c=null;b&&a.implementsGoogI18nBidiDirectionalString&&(c=a.getDirection());a=b&&a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape(a),c)};
goog.html.SafeHtml.htmlEscapePreservingNewlines=function(a){if(a instanceof goog.html.SafeHtml)return a;a=goog.html.SafeHtml.htmlEscape(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(a)),a.getDirection())};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces=function(a){if(a instanceof goog.html.SafeHtml)return a;a=goog.html.SafeHtml.htmlEscape(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(goog.html.SafeHtml.unwrap(a)),a.getDirection())};goog.html.SafeHtml.from=goog.html.SafeHtml.htmlEscape;goog.html.SafeHtml.VALID_NAMES_IN_TAG_=/^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0};goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_={APPLET:!0,BASE:!0,EMBED:!0,IFRAME:!0,LINK:!0,MATH:!0,META:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};goog.html.SafeHtml.create=function(a,b,c){goog.html.SafeHtml.verifyTagName(String(a));return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a),b,c)};
goog.html.SafeHtml.verifyTagName=function(a){if(!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a))throw Error("Invalid tag name <"+a+">.");if(a.toUpperCase()in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)throw Error("Tag name <"+a+"> is not allowed for SafeHtml.");};
goog.html.SafeHtml.createIframe=function(a,b,c,d){a&&goog.html.TrustedResourceUrl.unwrap(a);var e={};e.src=a||null;e.srcdoc=b&&goog.html.SafeHtml.unwrap(b);a=goog.html.SafeHtml.combineAttributes(e,{sandbox:""},c);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe",a,d)};
goog.html.SafeHtml.createSandboxIframe=function(a,b,c,d){if(!goog.html.SafeHtml.canUseSandboxIframe())throw Error("The browser does not support sandboxed iframes.");var e={};e.src=a?goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)):null;e.srcdoc=b||null;e.sandbox="";a=goog.html.SafeHtml.combineAttributes(e,{},c);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe",a,d)};
goog.html.SafeHtml.canUseSandboxIframe=function(){return goog.global.HTMLIFrameElement&&"sandbox"in goog.global.HTMLIFrameElement.prototype};goog.html.SafeHtml.createScriptSrc=function(a,b){goog.html.TrustedResourceUrl.unwrap(a);a=goog.html.SafeHtml.combineAttributes({src:a},{},b);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script",a)};
goog.html.SafeHtml.createScript=function(a,b){for(var c in b){var d=c.toLowerCase();if("language"==d||"src"==d||"text"==d||"type"==d)throw Error('Cannot set "'+d+'" attribute');}c="";a=goog.array.concat(a);for(d=0;d<a.length;d++)c+=goog.html.SafeScript.unwrap(a[d]);a=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c,goog.i18n.bidi.Dir.NEUTRAL);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script",b,a)};
goog.html.SafeHtml.createStyle=function(a,b){b=goog.html.SafeHtml.combineAttributes({type:"text/css"},{},b);var c="";a=goog.array.concat(a);for(var d=0;d<a.length;d++)c+=goog.html.SafeStyleSheet.unwrap(a[d]);a=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c,goog.i18n.bidi.Dir.NEUTRAL);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style",b,a)};
goog.html.SafeHtml.createMetaRefresh=function(a,b){a=goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));(goog.labs.userAgent.browser.isIE()||goog.labs.userAgent.browser.isEdge())&&goog.string.internal.contains(a,";")&&(a="'"+a.replace(/'/g,"%27")+"'");return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta",{"http-equiv":"refresh",content:(b||0)+"; url="+a})};
goog.html.SafeHtml.getAttrNameAndValue_=function(a,b,c){if(c instanceof goog.string.Const)c=goog.string.Const.unwrap(c);else if("style"==b.toLowerCase())c=goog.html.SafeHtml.getStyleValue_(c);else{if(/^on/i.test(b))throw Error('Attribute "'+b+'" requires goog.string.Const value, "'+c+'" given.');if(b.toLowerCase()in goog.html.SafeHtml.URL_ATTRIBUTES_)if(c instanceof goog.html.TrustedResourceUrl)c=goog.html.TrustedResourceUrl.unwrap(c);else if(c instanceof goog.html.SafeUrl)c=goog.html.SafeUrl.unwrap(c);
else if(goog.isString(c))c=goog.html.SafeUrl.sanitize(c).getTypedStringValue();else throw Error('Attribute "'+b+'" on tag "'+a+'" requires goog.html.SafeUrl, goog.string.Const, or string, value "'+c+'" given.');}c.implementsGoogStringTypedString&&(c=c.getTypedStringValue());goog.asserts.assert(goog.isString(c)||goog.isNumber(c),"String or number value expected, got "+typeof c+" with value: "+c);return b+'="'+goog.string.internal.htmlEscape(String(c))+'"'};
goog.html.SafeHtml.getStyleValue_=function(a){if(!goog.isObject(a))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+typeof a+" given: "+a);a instanceof goog.html.SafeStyle||(a=goog.html.SafeStyle.create(a));return goog.html.SafeStyle.unwrap(a)};goog.html.SafeHtml.createWithDir=function(a,b,c,d){b=goog.html.SafeHtml.create(b,c,d);b.dir_=a;return b};
goog.html.SafeHtml.join=function(a,b){a=goog.html.SafeHtml.htmlEscape(a);var c=a.getDirection(),d=[],e=function(a){goog.isArray(a)?goog.array.forEach(a,e):(a=goog.html.SafeHtml.htmlEscape(a),d.push(goog.html.SafeHtml.unwrap(a)),a=a.getDirection(),c==goog.i18n.bidi.Dir.NEUTRAL?c=a:a!=goog.i18n.bidi.Dir.NEUTRAL&&c!=a&&(c=null))};goog.array.forEach(b,e);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d.join(goog.html.SafeHtml.unwrap(a)),c)};
goog.html.SafeHtml.concat=function(a){return goog.html.SafeHtml.join(goog.html.SafeHtml.EMPTY,Array.prototype.slice.call(arguments))};goog.html.SafeHtml.concatWithDir=function(a,b){var c=goog.html.SafeHtml.concat(goog.array.slice(arguments,1));c.dir_=a;return c};goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse=function(a,b){return(new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a,b)};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a,b){this.privateDoNotAccessOrElseSafeHtmlWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(a):a;this.dir_=b;return this};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse=function(a,b,c){var d=null;var e="<"+a+goog.html.SafeHtml.stringifyAttributes(a,b);goog.isDefAndNotNull(c)?goog.isArray(c)||(c=[c]):c=[];goog.dom.tags.isVoidTag(a.toLowerCase())?(goog.asserts.assert(!c.length,"Void tag <"+a+"> does not allow content."),e+=">"):(d=goog.html.SafeHtml.concat(c),e+=">"+goog.html.SafeHtml.unwrap(d)+"</"+a+">",d=d.getDirection());(a=b&&b.dir)&&(d=/^(ltr|rtl|auto)$/i.test(a)?goog.i18n.bidi.Dir.NEUTRAL:
null);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e,d)};goog.html.SafeHtml.stringifyAttributes=function(a,b){var c="";if(b)for(var d in b){if(!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d))throw Error('Invalid attribute name "'+d+'".');var e=b[d];goog.isDefAndNotNull(e)&&(c+=" "+goog.html.SafeHtml.getAttrNameAndValue_(a,d,e))}return c};
goog.html.SafeHtml.combineAttributes=function(a,b,c){var d={},e;for(e in a)goog.asserts.assert(e.toLowerCase()==e,"Must be lower case"),d[e]=a[e];for(e in b)goog.asserts.assert(e.toLowerCase()==e,"Must be lower case"),d[e]=b[e];for(e in c){var f=e.toLowerCase();if(f in a)throw Error('Cannot override "'+f+'" attribute, got "'+e+'" with value "'+c[e]+'"');f in b&&delete d[f];d[e]=c[e]}return d};
goog.html.SafeHtml.DOCTYPE_HTML=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>",goog.i18n.bidi.Dir.NEUTRAL);goog.html.SafeHtml.EMPTY=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("",goog.i18n.bidi.Dir.NEUTRAL);goog.html.SafeHtml.BR=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>",goog.i18n.bidi.Dir.NEUTRAL);goog.html.uncheckedconversions={};goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract=function(a,b,c){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b,c||null)};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)};goog.dom.safe={};goog.dom.safe.InsertAdjacentHtmlPosition={AFTERBEGIN:"afterbegin",AFTEREND:"afterend",BEFOREBEGIN:"beforebegin",BEFOREEND:"beforeend"};goog.dom.safe.insertAdjacentHtml=function(a,b,c){a.insertAdjacentHTML(b,goog.html.SafeHtml.unwrapTrustedHTML(c))};goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};
goog.dom.safe.isInnerHtmlCleanupRecursive_=goog.functions.cacheReturnValue(function(){if(goog.DEBUG&&"undefined"===typeof document)return!1;var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);if(goog.DEBUG&&!a.firstChild)return!1;b=a.firstChild.firstChild;a.innerHTML=goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);return!b.parentElement});
goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse=function(a,b){if(goog.dom.safe.isInnerHtmlCleanupRecursive_())for(;a.lastChild;)a.removeChild(a.lastChild);a.innerHTML=goog.html.SafeHtml.unwrapTrustedHTML(b)};
goog.dom.safe.setInnerHtml=function(a,b){if(goog.asserts.ENABLE_ASSERTS){var c=a.tagName.toUpperCase();if(goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+a.tagName+".");}goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(a,b)};goog.dom.safe.setOuterHtml=function(a,b){a.outerHTML=goog.html.SafeHtml.unwrapTrustedHTML(b)};
goog.dom.safe.setFormElementAction=function(a,b){b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);goog.dom.asserts.assertIsHTMLFormElement(a).action=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setButtonFormAction=function(a,b){b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);goog.dom.asserts.assertIsHTMLButtonElement(a).formAction=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.setInputFormAction=function(a,b){b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);goog.dom.asserts.assertIsHTMLInputElement(a).formAction=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setStyle=function(a,b){a.style.cssText=goog.html.SafeStyle.unwrap(b)};goog.dom.safe.documentWrite=function(a,b){a.write(goog.html.SafeHtml.unwrapTrustedHTML(b))};
goog.dom.safe.setAnchorHref=function(a,b){goog.dom.asserts.assertIsHTMLAnchorElement(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.href=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setImageSrc=function(a,b){goog.dom.asserts.assertIsHTMLImageElement(a);if(!(b instanceof goog.html.SafeUrl)){var c=/^data:image\//i.test(b);b=goog.html.SafeUrl.sanitizeAssertUnchanged(b,c)}a.src=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.setAudioSrc=function(a,b){goog.dom.asserts.assertIsHTMLAudioElement(a);if(!(b instanceof goog.html.SafeUrl)){var c=/^data:audio\//i.test(b);b=goog.html.SafeUrl.sanitizeAssertUnchanged(b,c)}a.src=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setVideoSrc=function(a,b){goog.dom.asserts.assertIsHTMLVideoElement(a);if(!(b instanceof goog.html.SafeUrl)){var c=/^data:video\//i.test(b);b=goog.html.SafeUrl.sanitizeAssertUnchanged(b,c)}a.src=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.setEmbedSrc=function(a,b){goog.dom.asserts.assertIsHTMLEmbedElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b)};goog.dom.safe.setFrameSrc=function(a,b){goog.dom.asserts.assertIsHTMLFrameElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedURL(b)};goog.dom.safe.setIframeSrc=function(a,b){goog.dom.asserts.assertIsHTMLIFrameElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedURL(b)};
goog.dom.safe.setIframeSrcdoc=function(a,b){goog.dom.asserts.assertIsHTMLIFrameElement(a);a.srcdoc=goog.html.SafeHtml.unwrapTrustedHTML(b)};
goog.dom.safe.setLinkHrefAndRel=function(a,b,c){goog.dom.asserts.assertIsHTMLLinkElement(a);a.rel=c;goog.string.internal.caseInsensitiveContains(c,"stylesheet")?(goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl,'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'),a.href=goog.html.TrustedResourceUrl.unwrapTrustedURL(b)):a.href=b instanceof goog.html.TrustedResourceUrl?goog.html.TrustedResourceUrl.unwrapTrustedURL(b):b instanceof goog.html.SafeUrl?goog.html.SafeUrl.unwrapTrustedURL(b):
goog.html.SafeUrl.unwrapTrustedURL(goog.html.SafeUrl.sanitizeAssertUnchanged(b))};goog.dom.safe.setObjectData=function(a,b){goog.dom.asserts.assertIsHTMLObjectElement(a);a.data=goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b)};goog.dom.safe.setScriptSrc=function(a,b){goog.dom.asserts.assertIsHTMLScriptElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);(b=goog.getScriptNonce())&&a.setAttribute("nonce",b)};
goog.dom.safe.setScriptContent=function(a,b){goog.dom.asserts.assertIsHTMLScriptElement(a);a.text=goog.html.SafeScript.unwrapTrustedScript(b);(b=goog.getScriptNonce())&&a.setAttribute("nonce",b)};goog.dom.safe.setLocationHref=function(a,b){goog.dom.asserts.assertIsLocation(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.href=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.assignLocation=function(a,b){goog.dom.asserts.assertIsLocation(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.assign(goog.html.SafeUrl.unwrapTrustedURL(b))};goog.dom.safe.replaceLocation=function(a,b){goog.dom.asserts.assertIsLocation(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.replace(goog.html.SafeUrl.unwrapTrustedURL(b))};
goog.dom.safe.openInWindow=function(a,b,c,d,e){a=a instanceof goog.html.SafeUrl?a:goog.html.SafeUrl.sanitizeAssertUnchanged(a);return(b||goog.global).open(goog.html.SafeUrl.unwrapTrustedURL(a),c?goog.string.Const.unwrap(c):"",d,e)};goog.dom.safe.parseFromStringHtml=function(a,b){return goog.dom.safe.parseFromString(a,b,"text/html")};goog.dom.safe.parseFromString=function(a,b,c){return a.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(b),c)};
goog.dom.safe.createImageFromBlob=function(a){if(!/^image\/.*/g.test(a.type))throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");var b=goog.global.URL.createObjectURL(a);a=new goog.global.Image;a.onload=function(){goog.global.URL.revokeObjectURL(b)};goog.dom.safe.setImageSrc(a,goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Image blob URL."),b));return a};goog.string.DETECT_DOUBLE_ESCAPING=!1;goog.string.FORCE_NON_DOM_HTML_UNESCAPING=!1;goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=goog.string.internal.startsWith;goog.string.endsWith=goog.string.internal.endsWith;goog.string.caseInsensitiveStartsWith=goog.string.internal.caseInsensitiveStartsWith;goog.string.caseInsensitiveEndsWith=goog.string.internal.caseInsensitiveEndsWith;goog.string.caseInsensitiveEquals=goog.string.internal.caseInsensitiveEquals;
goog.string.subs=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};goog.string.isEmptyOrWhitespace=goog.string.internal.isEmptyOrWhitespace;goog.string.isEmptyString=function(a){return 0==a.length};goog.string.isEmpty=goog.string.isEmptyOrWhitespace;goog.string.isEmptyOrWhitespaceSafe=function(a){return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))};
goog.string.isEmptySafe=goog.string.isEmptyOrWhitespaceSafe;goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};
goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=goog.string.internal.trim;
goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};goog.string.caseInsensitiveCompare=goog.string.internal.caseInsensitiveCompare;
goog.string.numberAwareCompare_=function(a,b,c){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var d=a.toLowerCase().match(c),e=b.toLowerCase().match(c),f=Math.min(d.length,e.length),g=0;g<f;g++){c=d[g];var h=e[g];if(c!=h)return a=parseInt(c,10),!isNaN(a)&&(b=parseInt(h,10),!isNaN(b)&&a-b)?a-b:c<h?-1:1}return d.length!=e.length?d.length-e.length:a<b?-1:1};goog.string.intAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\D+/g)};
goog.string.floatAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\.\d+|\D+/g)};goog.string.numerateCompare=goog.string.floatAwareCompare;goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=goog.string.internal.newLineToBr;
goog.string.htmlEscape=function(a,b){a=goog.string.internal.htmlEscape(a,b);goog.string.DETECT_DOUBLE_ESCAPING&&(a=a.replace(goog.string.E_RE_,"&#101;"));return a};goog.string.E_RE_=/e/g;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?!goog.string.FORCE_NON_DOM_HTML_UNESCAPING&&"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesWithDocument=function(a,b){return goog.string.contains(a,"&")?goog.string.unescapeEntitiesUsingDom_(a,b):a};
goog.string.unescapeEntitiesUsingDom_=function(a,b){var c={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'};var d=b?b.createElement("div"):goog.global.document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,b){var e=c[a];if(e)return e;"#"==b.charAt(0)&&(b=Number("0"+b.substr(1)),isNaN(b)||(e=String.fromCharCode(b)));e||(goog.dom.safe.setInnerHtml(d,goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."),
a+" ")),e=d.firstChild.nodeValue.slice(0,-1));return c[a]=e})};goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:return"#"!=c.charAt(0)||(c=Number("0"+c.substr(1)),isNaN(c))?a:String.fromCharCode(c)}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.preserveSpaces=function(a){return a.replace(/(^|[\n ]) /g,"$1"+goog.string.Unicode.NBSP)};goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e)}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"\\u003C"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b=a.charCodeAt(0);if(31<b&&127>b)var c=a;else{if(256>b){if(c="\\x",16>b||256<b)c+="0"}else c="\\u",4096>b&&(c+="0");c+=b.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=c};goog.string.contains=goog.string.internal.contains;goog.string.caseInsensitiveContains=goog.string.internal.caseInsensitiveContains;
goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&b<a.length&&0<c&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){return a.replace(b,"")};goog.string.removeAll=function(a,b){b=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(b,"")};goog.string.replaceAll=function(a,b,c){b=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(b,c.replace(/\$/g,"$$$$"))};
goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};
goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};goog.string.compareVersions=goog.string.internal.compareVersions;goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;
goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmptyOrWhitespace(a)?NaN:b};goog.string.isLowerCamelCase=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};goog.string.isUpperCamelCase=function(a){return/^([A-Z][a-z]*)+$/.test(a)};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};
goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};goog.string.toTitleCase=function(a,b){b=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,e){return b+e.toUpperCase()})};goog.string.capitalize=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};
goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};goog.string.splitLimit=function(a,b,c){a=a.split(b);for(var d=[];0<c&&a.length;)d.push(a.shift()),c--;a.length&&d.push(a.join(b));return d};goog.string.lastComponent=function(a,b){if(b)"string"==typeof b&&(b=[b]);else return a;for(var c=-1,d=0;d<b.length;d++)if(""!=b[d]){var e=a.lastIndexOf(b[d]);e>c&&(c=e)}return-1==c?a:a.slice(c+1)};
goog.string.editDistance=function(a,b){var c=[],d=[];if(a==b)return 0;if(!a.length||!b.length)return Math.max(a.length,b.length);for(var e=0;e<b.length+1;e++)c[e]=e;for(e=0;e<a.length;e++){d[0]=e+1;for(var f=0;f<b.length;f++)d[f+1]=Math.min(d[f]+1,c[f+1]+1,c[f]+Number(a[e]!=b[f]));for(f=0;f<c.length;f++)c[f]=d[f]}return d[b.length]};goog.labs.userAgent.engine={};goog.labs.userAgent.engine.isPresto=function(){return goog.labs.userAgent.util.matchUserAgent("Presto")};goog.labs.userAgent.engine.isTrident=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.engine.isEdge=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};
goog.labs.userAgent.engine.isWebKit=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")&&!goog.labs.userAgent.engine.isEdge()};goog.labs.userAgent.engine.isGecko=function(){return goog.labs.userAgent.util.matchUserAgent("Gecko")&&!goog.labs.userAgent.engine.isWebKit()&&!goog.labs.userAgent.engine.isTrident()&&!goog.labs.userAgent.engine.isEdge()};
goog.labs.userAgent.engine.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(a){a=goog.labs.userAgent.util.extractVersionTuples(a);var b=goog.labs.userAgent.engine.getEngineTuple_(a);if(b)return"Gecko"==b[0]?goog.labs.userAgent.engine.getVersionForKey_(a,"Firefox"):b[1];a=a[0];var c;if(a&&(c=a[2])&&(c=/Trident\/([^\s;]+)/.exec(c)))return c[1]}return""};
goog.labs.userAgent.engine.getEngineTuple_=function(a){if(!goog.labs.userAgent.engine.isEdge())return a[1];for(var b=0;b<a.length;b++){var c=a[b];if("Edge"==c[0])return c}};goog.labs.userAgent.engine.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(),a)};goog.labs.userAgent.engine.getVersionForKey_=function(a,b){return(a=goog.array.find(a,function(a){return b==a[0]}))&&a[1]||""};goog.labs.userAgent.platform={};goog.labs.userAgent.platform.isAndroid=function(){return goog.labs.userAgent.util.matchUserAgent("Android")};goog.labs.userAgent.platform.isIpod=function(){return goog.labs.userAgent.util.matchUserAgent("iPod")};goog.labs.userAgent.platform.isIphone=function(){return goog.labs.userAgent.util.matchUserAgent("iPhone")&&!goog.labs.userAgent.util.matchUserAgent("iPod")&&!goog.labs.userAgent.util.matchUserAgent("iPad")};goog.labs.userAgent.platform.isIpad=function(){return goog.labs.userAgent.util.matchUserAgent("iPad")};
goog.labs.userAgent.platform.isIos=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpad()||goog.labs.userAgent.platform.isIpod()};goog.labs.userAgent.platform.isMacintosh=function(){return goog.labs.userAgent.util.matchUserAgent("Macintosh")};goog.labs.userAgent.platform.isLinux=function(){return goog.labs.userAgent.util.matchUserAgent("Linux")};goog.labs.userAgent.platform.isWindows=function(){return goog.labs.userAgent.util.matchUserAgent("Windows")};
goog.labs.userAgent.platform.isChromeOS=function(){return goog.labs.userAgent.util.matchUserAgent("CrOS")};goog.labs.userAgent.platform.isChromecast=function(){return goog.labs.userAgent.util.matchUserAgent("CrKey")};goog.labs.userAgent.platform.isKaiOS=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS")};goog.labs.userAgent.platform.isGo2Phone=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("GAFP")};
goog.labs.userAgent.platform.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent(),b="";goog.labs.userAgent.platform.isWindows()?(b=/Windows (?:NT|Phone) ([0-9.]+)/,b=(a=b.exec(a))?a[1]:"0.0"):goog.labs.userAgent.platform.isIos()?(b=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,b=(a=b.exec(a))&&a[1].replace(/_/g,".")):goog.labs.userAgent.platform.isMacintosh()?(b=/Mac OS X ([0-9_.]+)/,b=(a=b.exec(a))?a[1].replace(/_/g,"."):"10"):goog.labs.userAgent.platform.isKaiOS()?(b=/(?:KaiOS)\/(\S+)/i,
b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isAndroid()?(b=/Android\s+([^\);]+)(\)|;)/,b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isChromeOS()&&(b=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,b=(a=b.exec(a))&&a[1]);return b||""};goog.labs.userAgent.platform.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(),a)};goog.reflect={};goog.reflect.object=function(a,b){return b};goog.reflect.objectProperty=function(a,b){return a};goog.reflect.sinkValue=function(a){goog.reflect.sinkValue[" "](a);return a};goog.reflect.sinkValue[" "]=goog.nullFunction;goog.reflect.canAccessProperty=function(a,b){try{return goog.reflect.sinkValue(a[b]),!0}catch(c){}return!1};goog.reflect.cache=function(a,b,c,d){d=d?d(b):b;return Object.prototype.hasOwnProperty.call(a,d)?a[d]:a[d]=c(b)};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_EDGE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;goog.userAgent.getUserAgentString=function(){return goog.labs.userAgent.util.getUserAgent()};
goog.userAgent.getNavigatorTyped=function(){return goog.global.navigator||null};goog.userAgent.getNavigator=function(){return goog.userAgent.getNavigatorTyped()};goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.labs.userAgent.browser.isOpera();goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.labs.userAgent.browser.isIE();goog.userAgent.EDGE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_EDGE:goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE=goog.userAgent.EDGE||goog.userAgent.IE;goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.labs.userAgent.engine.isGecko();goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.labs.userAgent.engine.isWebKit();goog.userAgent.isMobile_=function(){return goog.userAgent.WEBKIT&&goog.labs.userAgent.util.matchUserAgent("Mobile")};
goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.isMobile_();goog.userAgent.SAFARI=goog.userAgent.WEBKIT;goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigatorTyped();return a&&a.platform||""};goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;
goog.userAgent.ASSUME_IPAD=!1;goog.userAgent.ASSUME_IPOD=!1;goog.userAgent.ASSUME_KAIOS=!1;goog.userAgent.ASSUME_GO2PHONE=!1;goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD||goog.userAgent.ASSUME_IPOD;goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.labs.userAgent.platform.isWindows();goog.userAgent.isLegacyLinux_=function(){return goog.labs.userAgent.platform.isLinux()||goog.labs.userAgent.platform.isChromeOS()};goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.isLegacyLinux_();goog.userAgent.isX11_=function(){var a=goog.userAgent.getNavigatorTyped();return!!a&&goog.string.contains(a.appVersion||"","X11")};
goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.isX11_();goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.labs.userAgent.platform.isAndroid();goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.labs.userAgent.platform.isIphone();goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPOD:goog.labs.userAgent.platform.isIpod();goog.userAgent.IOS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD||goog.userAgent.ASSUME_IPOD:goog.labs.userAgent.platform.isIos();goog.userAgent.KAIOS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_KAIOS:goog.labs.userAgent.platform.isKaiOS();goog.userAgent.GO2PHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_GO2PHONE:goog.labs.userAgent.platform.isGo2Phone();
goog.userAgent.determineVersion_=function(){var a="",b=goog.userAgent.getVersionRegexResult_();b&&(a=b?b[1]:"");return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),null!=b&&b>parseFloat(a))?String(b):a};
goog.userAgent.getVersionRegexResult_=function(){var a=goog.userAgent.getUserAgentString();if(goog.userAgent.GECKO)return/rv:([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.EDGE)return/Edge\/([\d\.]+)/.exec(a);if(goog.userAgent.IE)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.WEBKIT)return/WebKit\/(\S+)/.exec(a);if(goog.userAgent.OPERA)return/(?:Version)[ \/]?(\S+)/.exec(a)};goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};
goog.userAgent.VERSION=goog.userAgent.determineVersion_();goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionOrHigherCache_={};goog.userAgent.isVersionOrHigher=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_,a,function(){return 0<=goog.string.compareVersions(goog.userAgent.VERSION,a)})};goog.userAgent.isVersion=goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher=function(a){return Number(goog.userAgent.DOCUMENT_MODE)>=a};goog.userAgent.isDocumentMode=goog.userAgent.isDocumentModeOrHigher;goog.userAgent.DOCUMENT_MODE=function(){if(goog.global.document&&goog.userAgent.IE)return goog.userAgent.getDocumentMode_()}();goog.userAgent.product={};goog.userAgent.product.ASSUME_FIREFOX=!1;goog.userAgent.product.ASSUME_IPHONE=!1;goog.userAgent.product.ASSUME_IPAD=!1;goog.userAgent.product.ASSUME_ANDROID=!1;goog.userAgent.product.ASSUME_CHROME=!1;goog.userAgent.product.ASSUME_SAFARI=!1;
goog.userAgent.product.PRODUCT_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_OPERA||goog.userAgent.product.ASSUME_FIREFOX||goog.userAgent.product.ASSUME_IPHONE||goog.userAgent.product.ASSUME_IPAD||goog.userAgent.product.ASSUME_ANDROID||goog.userAgent.product.ASSUME_CHROME||goog.userAgent.product.ASSUME_SAFARI;goog.userAgent.product.OPERA=goog.userAgent.OPERA;goog.userAgent.product.IE=goog.userAgent.IE;goog.userAgent.product.EDGE=goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_FIREFOX:goog.labs.userAgent.browser.isFirefox();goog.userAgent.product.isIphoneOrIpod_=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpod()};goog.userAgent.product.IPHONE=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPHONE:goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.product.ANDROID=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_ANDROID:goog.labs.userAgent.browser.isAndroidBrowser();goog.userAgent.product.CHROME=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CHROME:goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_=function(){return goog.labs.userAgent.browser.isSafari()&&!goog.labs.userAgent.platform.isIos()};goog.userAgent.product.SAFARI=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_SAFARI:goog.userAgent.product.isSafariDesktop_();goog.crypt.base64={};goog.crypt.base64.DEFAULT_ALPHABET_COMMON_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";goog.crypt.base64.ENCODED_VALS=goog.crypt.base64.DEFAULT_ALPHABET_COMMON_+"+/=";goog.crypt.base64.ENCODED_VALS_WEBSAFE=goog.crypt.base64.DEFAULT_ALPHABET_COMMON_+"-_.";goog.crypt.base64.Alphabet={DEFAULT:0,NO_PADDING:1,WEBSAFE:2,WEBSAFE_DOT_PADDING:3,WEBSAFE_NO_PADDING:4};goog.crypt.base64.paddingChars_="=.";
goog.crypt.base64.isPadding_=function(a){return goog.string.contains(goog.crypt.base64.paddingChars_,a)};goog.crypt.base64.byteToCharMaps_={};goog.crypt.base64.charToByteMap_=null;goog.crypt.base64.ASSUME_NATIVE_SUPPORT_=goog.userAgent.GECKO||goog.userAgent.WEBKIT&&!goog.userAgent.product.SAFARI||goog.userAgent.OPERA;goog.crypt.base64.HAS_NATIVE_ENCODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||"function"==typeof goog.global.btoa;
goog.crypt.base64.HAS_NATIVE_DECODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||!goog.userAgent.product.SAFARI&&!goog.userAgent.IE&&"function"==typeof goog.global.atob;
goog.crypt.base64.encodeByteArray=function(a,b){goog.asserts.assert(goog.isArrayLike(a),"encodeByteArray takes an array as a parameter");void 0===b&&(b=goog.crypt.base64.Alphabet.DEFAULT);goog.crypt.base64.init_();b=goog.crypt.base64.byteToCharMaps_[b];for(var c=[],d=0;d<a.length;d+=3){var e=a[d],f=d+1<a.length,g=f?a[d+1]:0,h=d+2<a.length,k=h?a[d+2]:0,l=e>>2;e=(e&3)<<4|g>>4;g=(g&15)<<2|k>>6;k&=63;h||(k=64,f||(g=64));c.push(b[l],b[e],b[g]||"",b[k]||"")}return c.join("")};
goog.crypt.base64.encodeString=function(a,b){return goog.crypt.base64.HAS_NATIVE_ENCODE_&&!b?goog.global.btoa(a):goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a),b)};goog.crypt.base64.decodeString=function(a,b){if(goog.crypt.base64.HAS_NATIVE_DECODE_&&!b)return goog.global.atob(a);var c="";goog.crypt.base64.decodeStringInternal_(a,function(a){c+=String.fromCharCode(a)});return c};
goog.crypt.base64.decodeStringToByteArray=function(a,b){var c=[];goog.crypt.base64.decodeStringInternal_(a,function(a){c.push(a)});return c};
goog.crypt.base64.decodeStringToUint8Array=function(a){goog.asserts.assert(!goog.userAgent.IE||goog.userAgent.isVersionOrHigher("10"),"Browser does not support typed arrays");var b=a.length,c=3*b/4;c%3?c=Math.floor(c):goog.crypt.base64.isPadding_(a[b-1])&&(c=goog.crypt.base64.isPadding_(a[b-2])?c-2:c-1);var d=new Uint8Array(c),e=0;goog.crypt.base64.decodeStringInternal_(a,function(a){d[e++]=a});return d.subarray(0,e)};
goog.crypt.base64.decodeStringInternal_=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=goog.crypt.base64.charToByteMap_[c];if(null!=e)return e;if(!goog.string.isEmptyOrWhitespace(c))throw Error("Unknown base64 encoding at char: "+c);}return b}goog.crypt.base64.init_();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h))}};
goog.crypt.base64.init_=function(){if(!goog.crypt.base64.charToByteMap_){goog.crypt.base64.charToByteMap_={};for(var a=goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));goog.crypt.base64.byteToCharMaps_[c]=d;for(var e=0;e<d.length;e++){var f=d[e],g=goog.crypt.base64.charToByteMap_[f];void 0===g?goog.crypt.base64.charToByteMap_[f]=e:goog.asserts.assert(g===e)}}}};jspb.utils={};jspb.utils.split64Low=0;jspb.utils.split64High=0;jspb.utils.splitUint64=function(a){var b=a>>>0;a=Math.floor((a-b)/jspb.BinaryConstants.TWO_TO_32)>>>0;jspb.utils.split64Low=b;jspb.utils.split64High=a};jspb.utils.splitInt64=function(a){var b=0>a;a=Math.abs(a);var c=a>>>0;a=Math.floor((a-c)/jspb.BinaryConstants.TWO_TO_32);a>>>=0;b&&(a=~a>>>0,c=(~c>>>0)+1,4294967295<c&&(c=0,a++,4294967295<a&&(a=0)));jspb.utils.split64Low=c;jspb.utils.split64High=a};
jspb.utils.splitZigzag64=function(a){var b=0>a;a=2*Math.abs(a);jspb.utils.splitUint64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;b&&(0==a?0==c?c=a=4294967295:(c--,a=4294967295):a--);jspb.utils.split64Low=a;jspb.utils.split64High=c};
jspb.utils.splitFloat32=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)0<1/a?(jspb.utils.split64High=0,jspb.utils.split64Low=0):(jspb.utils.split64High=0,jspb.utils.split64Low=2147483648);else if(isNaN(a))jspb.utils.split64High=0,jspb.utils.split64Low=2147483647;else if(a>jspb.BinaryConstants.FLOAT32_MAX)jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|2139095040)>>>0;else if(a<jspb.BinaryConstants.FLOAT32_MIN)a=Math.round(a/Math.pow(2,-149)),jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|
a)>>>0;else{var c=Math.floor(Math.log(a)/Math.LN2);a*=Math.pow(2,-c);a=Math.round(a*jspb.BinaryConstants.TWO_TO_23)&8388607;jspb.utils.split64High=0;jspb.utils.split64Low=(b<<31|c+127<<23|a)>>>0}};
jspb.utils.splitFloat64=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)jspb.utils.split64High=0<1/a?0:2147483648,jspb.utils.split64Low=0;else if(isNaN(a))jspb.utils.split64High=2147483647,jspb.utils.split64Low=4294967295;else if(a>jspb.BinaryConstants.FLOAT64_MAX)jspb.utils.split64High=(b<<31|2146435072)>>>0,jspb.utils.split64Low=0;else if(a<jspb.BinaryConstants.FLOAT64_MIN){var c=a/Math.pow(2,-1074);a=c/jspb.BinaryConstants.TWO_TO_32;jspb.utils.split64High=(b<<31|a)>>>0;jspb.utils.split64Low=c>>>0}else{c=
a;var d=0;if(2<=c)for(;2<=c&&1023>d;)d++,c/=2;else for(;1>c&&-1022<d;)c*=2,d--;c=a*Math.pow(2,-d);a=c*jspb.BinaryConstants.TWO_TO_20&1048575;c=c*jspb.BinaryConstants.TWO_TO_52>>>0;jspb.utils.split64High=(b<<31|d+1023<<20|a)>>>0;jspb.utils.split64Low=c}};
jspb.utils.splitHash64=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=a.charCodeAt(4),g=a.charCodeAt(5),h=a.charCodeAt(6);a=a.charCodeAt(7);jspb.utils.split64Low=b+(c<<8)+(d<<16)+(e<<24)>>>0;jspb.utils.split64High=f+(g<<8)+(h<<16)+(a<<24)>>>0};jspb.utils.joinUint64=function(a,b){return b*jspb.BinaryConstants.TWO_TO_32+(a>>>0)};
jspb.utils.joinInt64=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b>>>0,0==a&&(b=b+1>>>0));a=jspb.utils.joinUint64(a,b);return c?-a:a};jspb.utils.toZigzag64=function(a,b,c){var d=b>>31;return c(a<<1^d,(b<<1|a>>>31)^d)};jspb.utils.joinZigzag64=function(a,b){return jspb.utils.fromZigzag64(a,b,jspb.utils.joinInt64)};jspb.utils.fromZigzag64=function(a,b,c){var d=-(a&1);return c((a>>>1|b<<31)^d,b>>>1^d)};
jspb.utils.joinFloat32=function(a,b){b=2*(a>>31)+1;var c=a>>>23&255;a&=8388607;return 255==c?a?NaN:Infinity*b:0==c?b*Math.pow(2,-149)*a:b*Math.pow(2,c-150)*(a+Math.pow(2,23))};jspb.utils.joinFloat64=function(a,b){var c=2*(b>>31)+1,d=b>>>20&2047;a=jspb.BinaryConstants.TWO_TO_32*(b&1048575)+a;return 2047==d?a?NaN:Infinity*c:0==d?c*Math.pow(2,-1074)*a:c*Math.pow(2,d-1075)*(a+jspb.BinaryConstants.TWO_TO_52)};
jspb.utils.joinHash64=function(a,b){return String.fromCharCode(a>>>0&255,a>>>8&255,a>>>16&255,a>>>24&255,b>>>0&255,b>>>8&255,b>>>16&255,b>>>24&255)};jspb.utils.DIGITS="0123456789abcdef".split("");jspb.utils.ZERO_CHAR_CODE_=48;jspb.utils.A_CHAR_CODE_=97;
jspb.utils.joinUnsignedDecimalString=function(a,b){function c(a,b){a=a?String(a):"";return b?"0000000".slice(a.length)+a:a}if(2097151>=b)return""+jspb.utils.joinUint64(a,b);var d=(a>>>24|b<<8)>>>0&16777215;b=b>>16&65535;a=(a&16777215)+6777216*d+6710656*b;d+=8147497*b;b*=2;1E7<=a&&(d+=Math.floor(a/1E7),a%=1E7);1E7<=d&&(b+=Math.floor(d/1E7),d%=1E7);return c(b,0)+c(d,b)+c(a,1)};
jspb.utils.joinSignedDecimalString=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b+(0==a?1:0)>>>0);a=jspb.utils.joinUnsignedDecimalString(a,b);return c?"-"+a:a};jspb.utils.hash64ToDecimalString=function(a,b){jspb.utils.splitHash64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;return b?jspb.utils.joinSignedDecimalString(a,c):jspb.utils.joinUnsignedDecimalString(a,c)};
jspb.utils.hash64ArrayToDecimalStrings=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=jspb.utils.hash64ToDecimalString(a[d],b);return c};
jspb.utils.decimalStringToHash64=function(a){function b(a,b){for(var c=0;8>c&&(1!==a||0<b);c++)b=a*e[c]+b,e[c]=b&255,b>>>=8}function c(){for(var a=0;8>a;a++)e[a]=~e[a]&255}goog.asserts.assert(0<a.length);var d=!1;"-"===a[0]&&(d=!0,a=a.slice(1));for(var e=[0,0,0,0,0,0,0,0],f=0;f<a.length;f++)b(10,a.charCodeAt(f)-jspb.utils.ZERO_CHAR_CODE_);d&&(c(),b(1,1));return goog.crypt.byteArrayToString(e)};jspb.utils.splitDecimalString=function(a){jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a))};
jspb.utils.toHexDigit_=function(a){return String.fromCharCode(10>a?jspb.utils.ZERO_CHAR_CODE_+a:jspb.utils.A_CHAR_CODE_-10+a)};jspb.utils.fromHexCharCode_=function(a){return a>=jspb.utils.A_CHAR_CODE_?a-jspb.utils.A_CHAR_CODE_+10:a-jspb.utils.ZERO_CHAR_CODE_};jspb.utils.hash64ToHexString=function(a){var b=Array(18);b[0]="0";b[1]="x";for(var c=0;8>c;c++){var d=a.charCodeAt(7-c);b[2*c+2]=jspb.utils.toHexDigit_(d>>4);b[2*c+3]=jspb.utils.toHexDigit_(d&15)}return b.join("")};
jspb.utils.hexStringToHash64=function(a){a=a.toLowerCase();goog.asserts.assert(18==a.length);goog.asserts.assert("0"==a[0]);goog.asserts.assert("x"==a[1]);for(var b="",c=0;8>c;c++){var d=jspb.utils.fromHexCharCode_(a.charCodeAt(2*c+2)),e=jspb.utils.fromHexCharCode_(a.charCodeAt(2*c+3));b=String.fromCharCode(16*d+e)+b}return b};
jspb.utils.hash64ToNumber=function(a,b){jspb.utils.splitHash64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;return b?jspb.utils.joinInt64(a,c):jspb.utils.joinUint64(a,c)};jspb.utils.numberToHash64=function(a){jspb.utils.splitInt64(a);return jspb.utils.joinHash64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.utils.countVarints=function(a,b,c){for(var d=0,e=b;e<c;e++)d+=a[e]>>7;return c-b-d};
jspb.utils.countVarintFields=function(a,b,c,d){var e=0;d=8*d+jspb.BinaryConstants.WireType.VARINT;if(128>d)for(;b<c&&a[b++]==d;)for(e++;;){var f=a[b++];if(0==(f&128))break}else for(;b<c;){for(f=d;128<f;){if(a[b]!=(f&127|128))return e;b++;f>>=7}if(a[b++]!=f)break;for(e++;f=a[b++],0!=(f&128););}return e};jspb.utils.countFixedFields_=function(a,b,c,d,e){var f=0;if(128>d)for(;b<c&&a[b++]==d;)f++,b+=e;else for(;b<c;){for(var g=d;128<g;){if(a[b++]!=(g&127|128))return f;g>>=7}if(a[b++]!=g)break;f++;b+=e}return f};
jspb.utils.countFixed32Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED32,4)};jspb.utils.countFixed64Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED64,8)};
jspb.utils.countDelimitedFields=function(a,b,c,d){var e=0;for(d=8*d+jspb.BinaryConstants.WireType.DELIMITED;b<c;){for(var f=d;128<f;){if(a[b++]!=(f&127|128))return e;f>>=7}if(a[b++]!=f)break;e++;for(var g=0,h=1;f=a[b++],g+=(f&127)*h,h*=128,0!=(f&128););b+=g}return e};jspb.utils.debugBytesToTextFormat=function(a){var b='"';if(a){a=jspb.utils.byteSourceToUint8Array(a);for(var c=0;c<a.length;c++)b+="\\x",16>a[c]&&(b+="0"),b+=a[c].toString(16)}return b+'"'};
jspb.utils.debugScalarToTextFormat=function(a){return"string"===typeof a?goog.string.quote(a):a.toString()};jspb.utils.stringToByteArray=function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++){var d=a.charCodeAt(c);if(255<d)throw Error("Conversion error: string contains codepoint outside of byte range");b[c]=d}return b};
jspb.utils.byteSourceToUint8Array=function(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer||"undefined"!=typeof Buffer&&a.constructor===Buffer||a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Type not convertible to Uint8Array.");return new Uint8Array(0)};jspb.BinaryDecoder=function(a,b,c){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1;a&&this.setBlock(a,b,c)};jspb.BinaryDecoder.instanceCache_=[];jspb.BinaryDecoder.alloc=function(a,b,c){if(jspb.BinaryDecoder.instanceCache_.length){var d=jspb.BinaryDecoder.instanceCache_.pop();a&&d.setBlock(a,b,c);return d}return new jspb.BinaryDecoder(a,b,c)};jspb.BinaryDecoder.prototype.free=function(){this.clear();100>jspb.BinaryDecoder.instanceCache_.length&&jspb.BinaryDecoder.instanceCache_.push(this)};
jspb.BinaryDecoder.prototype.clone=function(){return jspb.BinaryDecoder.alloc(this.bytes_,this.start_,this.end_-this.start_)};jspb.BinaryDecoder.prototype.clear=function(){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1};jspb.BinaryDecoder.prototype.getBuffer=function(){return this.bytes_};
jspb.BinaryDecoder.prototype.setBlock=function(a,b,c){this.bytes_=jspb.utils.byteSourceToUint8Array(a);this.start_=void 0!==b?b:0;this.end_=void 0!==c?this.start_+c:this.bytes_.length;this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getEnd=function(){return this.end_};jspb.BinaryDecoder.prototype.setEnd=function(a){this.end_=a};jspb.BinaryDecoder.prototype.reset=function(){this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getCursor=function(){return this.cursor_};
jspb.BinaryDecoder.prototype.setCursor=function(a){this.cursor_=a};jspb.BinaryDecoder.prototype.advance=function(a){this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_)};jspb.BinaryDecoder.prototype.atEnd=function(){return this.cursor_==this.end_};jspb.BinaryDecoder.prototype.pastEnd=function(){return this.cursor_>this.end_};jspb.BinaryDecoder.prototype.getError=function(){return this.error_||0>this.cursor_||this.cursor_>this.end_};
jspb.BinaryDecoder.prototype.readSplitVarint64=function(a){for(var b=128,c=0,d=0,e=0;4>e&&128<=b;e++)b=this.bytes_[this.cursor_++],c|=(b&127)<<7*e;128<=b&&(b=this.bytes_[this.cursor_++],c|=(b&127)<<28,d|=(b&127)>>4);if(128<=b)for(e=0;5>e&&128<=b;e++)b=this.bytes_[this.cursor_++],d|=(b&127)<<7*e+3;if(128>b)return a(c>>>0,d>>>0);goog.asserts.fail("Failed to read varint, encoding is invalid.");this.error_=!0};
jspb.BinaryDecoder.prototype.readSplitZigzagVarint64=function(a){return this.readSplitVarint64(function(b,c){return jspb.utils.fromZigzag64(b,c,a)})};jspb.BinaryDecoder.prototype.readSplitFixed64=function(a){var b=this.bytes_,c=this.cursor_;this.cursor_+=8;for(var d=0,e=0,f=c+7;f>=c;f--)d=d<<8|b[f],e=e<<8|b[f+4];return a(d,e)};jspb.BinaryDecoder.prototype.skipVarint=function(){for(;this.bytes_[this.cursor_]&128;)this.cursor_++;this.cursor_++};
jspb.BinaryDecoder.prototype.unskipVarint=function(a){for(;128<a;)this.cursor_--,a>>>=7;this.cursor_--};
jspb.BinaryDecoder.prototype.readUnsignedVarint32=function(){var a=this.bytes_;var b=a[this.cursor_+0];var c=b&127;if(128>b)return this.cursor_+=1,goog.asserts.assert(this.cursor_<=this.end_),c;b=a[this.cursor_+1];c|=(b&127)<<7;if(128>b)return this.cursor_+=2,goog.asserts.assert(this.cursor_<=this.end_),c;b=a[this.cursor_+2];c|=(b&127)<<14;if(128>b)return this.cursor_+=3,goog.asserts.assert(this.cursor_<=this.end_),c;b=a[this.cursor_+3];c|=(b&127)<<21;if(128>b)return this.cursor_+=4,goog.asserts.assert(this.cursor_<=
this.end_),c;b=a[this.cursor_+4];c|=(b&15)<<28;if(128>b)return this.cursor_+=5,goog.asserts.assert(this.cursor_<=this.end_),c>>>0;this.cursor_+=5;128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&goog.asserts.assert(!1);goog.asserts.assert(this.cursor_<=this.end_);return c};jspb.BinaryDecoder.prototype.readSignedVarint32=jspb.BinaryDecoder.prototype.readUnsignedVarint32;jspb.BinaryDecoder.prototype.readUnsignedVarint32String=function(){return this.readUnsignedVarint32().toString()};
jspb.BinaryDecoder.prototype.readSignedVarint32String=function(){return this.readSignedVarint32().toString()};jspb.BinaryDecoder.prototype.readZigzagVarint32=function(){var a=this.readUnsignedVarint32();return a>>>1^-(a&1)};jspb.BinaryDecoder.prototype.readUnsignedVarint64=function(){return this.readSplitVarint64(jspb.utils.joinUint64)};jspb.BinaryDecoder.prototype.readUnsignedVarint64String=function(){return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString)};
jspb.BinaryDecoder.prototype.readSignedVarint64=function(){return this.readSplitVarint64(jspb.utils.joinInt64)};jspb.BinaryDecoder.prototype.readSignedVarint64String=function(){return this.readSplitVarint64(jspb.utils.joinSignedDecimalString)};jspb.BinaryDecoder.prototype.readZigzagVarint64=function(){return this.readSplitVarint64(jspb.utils.joinZigzag64)};jspb.BinaryDecoder.prototype.readZigzagVarintHash64=function(){return this.readSplitZigzagVarint64(jspb.utils.joinHash64)};
jspb.BinaryDecoder.prototype.readZigzagVarint64String=function(){return this.readSplitZigzagVarint64(jspb.utils.joinSignedDecimalString)};jspb.BinaryDecoder.prototype.readUint8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a};jspb.BinaryDecoder.prototype.readUint16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8};
jspb.BinaryDecoder.prototype.readUint32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8|c<<16|d<<24)>>>0};jspb.BinaryDecoder.prototype.readUint64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUint64(a,b)};
jspb.BinaryDecoder.prototype.readUint64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUnsignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readInt8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a<<24>>24};
jspb.BinaryDecoder.prototype.readInt16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8)<<16>>16};jspb.BinaryDecoder.prototype.readInt32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8|c<<16|d<<24};
jspb.BinaryDecoder.prototype.readInt64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinInt64(a,b)};jspb.BinaryDecoder.prototype.readInt64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinSignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readFloat=function(){var a=this.readUint32();return jspb.utils.joinFloat32(a,0)};
jspb.BinaryDecoder.prototype.readDouble=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinFloat64(a,b)};jspb.BinaryDecoder.prototype.readBool=function(){return!!this.bytes_[this.cursor_++]};jspb.BinaryDecoder.prototype.readEnum=function(){return this.readSignedVarint32()};
jspb.BinaryDecoder.prototype.readString=function(a){var b=this.bytes_,c=this.cursor_;a=c+a;for(var d=[],e="";c<a;){var f=b[c++];if(128>f)d.push(f);else if(192>f)continue;else if(224>f){var g=b[c++];d.push((f&31)<<6|g&63)}else if(240>f){g=b[c++];var h=b[c++];d.push((f&15)<<12|(g&63)<<6|h&63)}else if(248>f){g=b[c++];h=b[c++];var k=b[c++];f=(f&7)<<18|(g&63)<<12|(h&63)<<6|k&63;f-=65536;d.push((f>>10&1023)+55296,(f&1023)+56320)}8192<=d.length&&(e+=String.fromCharCode.apply(null,d),d.length=0)}e+=goog.crypt.byteArrayToString(d);
this.cursor_=c;return e};jspb.BinaryDecoder.prototype.readStringWithLength=function(){var a=this.readUnsignedVarint32();return this.readString(a)};jspb.BinaryDecoder.prototype.readBytes=function(a){if(0>a||this.cursor_+a>this.bytes_.length)return this.error_=!0,goog.asserts.fail("Invalid byte length!"),new Uint8Array(0);var b=this.bytes_.subarray(this.cursor_,this.cursor_+a);this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_);return b};jspb.BinaryDecoder.prototype.readVarintHash64=function(){return this.readSplitVarint64(jspb.utils.joinHash64)};
jspb.BinaryDecoder.prototype.readFixedHash64=function(){var a=this.bytes_,b=this.cursor_,c=a[b+0],d=a[b+1],e=a[b+2],f=a[b+3],g=a[b+4],h=a[b+5],k=a[b+6];a=a[b+7];this.cursor_+=8;return String.fromCharCode(c,d,e,f,g,h,k,a)};jspb.BinaryReader=function(a,b,c){this.decoder_=jspb.BinaryDecoder.alloc(a,b,c);this.fieldCursor_=this.decoder_.getCursor();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null};jspb.BinaryReader.instanceCache_=[];
jspb.BinaryReader.alloc=function(a,b,c){if(jspb.BinaryReader.instanceCache_.length){var d=jspb.BinaryReader.instanceCache_.pop();a&&d.decoder_.setBlock(a,b,c);return d}return new jspb.BinaryReader(a,b,c)};jspb.BinaryReader.prototype.alloc=jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free=function(){this.decoder_.clear();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null;100>jspb.BinaryReader.instanceCache_.length&&jspb.BinaryReader.instanceCache_.push(this)};jspb.BinaryReader.prototype.getFieldCursor=function(){return this.fieldCursor_};jspb.BinaryReader.prototype.getCursor=function(){return this.decoder_.getCursor()};
jspb.BinaryReader.prototype.getBuffer=function(){return this.decoder_.getBuffer()};jspb.BinaryReader.prototype.getFieldNumber=function(){return this.nextField_};jspb.BinaryReader.prototype.getWireType=function(){return this.nextWireType_};jspb.BinaryReader.prototype.isDelimited=function(){return this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED};jspb.BinaryReader.prototype.isEndGroup=function(){return this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP};
jspb.BinaryReader.prototype.getError=function(){return this.error_||this.decoder_.getError()};jspb.BinaryReader.prototype.setBlock=function(a,b,c){this.decoder_.setBlock(a,b,c);this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.reset=function(){this.decoder_.reset();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};
jspb.BinaryReader.prototype.advance=function(a){this.decoder_.advance(a)};
jspb.BinaryReader.prototype.nextField=function(){if(this.decoder_.atEnd())return!1;if(this.getError())return goog.asserts.fail("Decoder hit an error"),!1;this.fieldCursor_=this.decoder_.getCursor();var a=this.decoder_.readUnsignedVarint32(),b=a>>>3;a&=7;if(a!=jspb.BinaryConstants.WireType.VARINT&&a!=jspb.BinaryConstants.WireType.FIXED32&&a!=jspb.BinaryConstants.WireType.FIXED64&&a!=jspb.BinaryConstants.WireType.DELIMITED&&a!=jspb.BinaryConstants.WireType.START_GROUP&&a!=jspb.BinaryConstants.WireType.END_GROUP)return goog.asserts.fail("Invalid wire type: %s (at position %s)",
a,this.fieldCursor_),this.error_=!0,!1;this.nextField_=b;this.nextWireType_=a;return!0};jspb.BinaryReader.prototype.unskipHeader=function(){this.decoder_.unskipVarint(this.nextField_<<3|this.nextWireType_)};jspb.BinaryReader.prototype.skipMatchingFields=function(){var a=this.nextField_;for(this.unskipHeader();this.nextField()&&this.getFieldNumber()==a;)this.skipField();this.decoder_.atEnd()||this.unskipHeader()};
jspb.BinaryReader.prototype.skipVarintField=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.VARINT?(goog.asserts.fail("Invalid wire type for skipVarintField"),this.skipField()):this.decoder_.skipVarint()};jspb.BinaryReader.prototype.skipDelimitedField=function(){if(this.nextWireType_!=jspb.BinaryConstants.WireType.DELIMITED)goog.asserts.fail("Invalid wire type for skipDelimitedField"),this.skipField();else{var a=this.decoder_.readUnsignedVarint32();this.decoder_.advance(a)}};
jspb.BinaryReader.prototype.skipFixed32Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED32?(goog.asserts.fail("Invalid wire type for skipFixed32Field"),this.skipField()):this.decoder_.advance(4)};jspb.BinaryReader.prototype.skipFixed64Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED64?(goog.asserts.fail("Invalid wire type for skipFixed64Field"),this.skipField()):this.decoder_.advance(8)};
jspb.BinaryReader.prototype.skipGroup=function(){var a=this.nextField_;do{if(!this.nextField()){goog.asserts.fail("Unmatched start-group tag: stream EOF");this.error_=!0;break}if(this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP){this.nextField_!=a&&(goog.asserts.fail("Unmatched end-group tag"),this.error_=!0);break}this.skipField()}while(1)};
jspb.BinaryReader.prototype.skipField=function(){switch(this.nextWireType_){case jspb.BinaryConstants.WireType.VARINT:this.skipVarintField();break;case jspb.BinaryConstants.WireType.FIXED64:this.skipFixed64Field();break;case jspb.BinaryConstants.WireType.DELIMITED:this.skipDelimitedField();break;case jspb.BinaryConstants.WireType.FIXED32:this.skipFixed32Field();break;case jspb.BinaryConstants.WireType.START_GROUP:this.skipGroup();break;default:goog.asserts.fail("Invalid wire encoding for field.")}};
jspb.BinaryReader.prototype.registerReadCallback=function(a,b){null===this.readCallbacks_&&(this.readCallbacks_={});goog.asserts.assert(!this.readCallbacks_[a]);this.readCallbacks_[a]=b};jspb.BinaryReader.prototype.runReadCallback=function(a){goog.asserts.assert(null!==this.readCallbacks_);a=this.readCallbacks_[a];goog.asserts.assert(a);return a(this)};
jspb.BinaryReader.prototype.readAny=function(a){this.nextWireType_=jspb.BinaryConstants.FieldTypeToWireType(a);var b=jspb.BinaryConstants.FieldType;switch(a){case b.DOUBLE:return this.readDouble();case b.FLOAT:return this.readFloat();case b.INT64:return this.readInt64();case b.UINT64:return this.readUint64();case b.INT32:return this.readInt32();case b.FIXED64:return this.readFixed64();case b.FIXED32:return this.readFixed32();case b.BOOL:return this.readBool();case b.STRING:return this.readString();
case b.GROUP:goog.asserts.fail("Group field type not supported in readAny()");case b.MESSAGE:goog.asserts.fail("Message field type not supported in readAny()");case b.BYTES:return this.readBytes();case b.UINT32:return this.readUint32();case b.ENUM:return this.readEnum();case b.SFIXED32:return this.readSfixed32();case b.SFIXED64:return this.readSfixed64();case b.SINT32:return this.readSint32();case b.SINT64:return this.readSint64();case b.FHASH64:return this.readFixedHash64();case b.VHASH64:return this.readVarintHash64();
default:goog.asserts.fail("Invalid field type in readAny()")}return 0};jspb.BinaryReader.prototype.readMessage=function(a,b){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var c=this.decoder_.getEnd(),d=this.decoder_.readUnsignedVarint32();d=this.decoder_.getCursor()+d;this.decoder_.setEnd(d);b(a,this);this.decoder_.setCursor(d);this.decoder_.setEnd(c)};
jspb.BinaryReader.prototype.readGroup=function(a,b,c){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP);goog.asserts.assert(this.nextField_==a);c(b,this);this.error_||this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP||(goog.asserts.fail("Group submessage did not end with an END_GROUP tag"),this.error_=!0)};
jspb.BinaryReader.prototype.getFieldDecoder=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor(),c=b+a;a=jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(),b,a);this.decoder_.setCursor(c);return a};jspb.BinaryReader.prototype.readInt32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32()};
jspb.BinaryReader.prototype.readInt32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32String()};jspb.BinaryReader.prototype.readInt64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};jspb.BinaryReader.prototype.readInt64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64String()};
jspb.BinaryReader.prototype.readUint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readUint32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32String()};jspb.BinaryReader.prototype.readUint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64()};
jspb.BinaryReader.prototype.readUint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64String()};jspb.BinaryReader.prototype.readSint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint32()};jspb.BinaryReader.prototype.readSint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64()};
jspb.BinaryReader.prototype.readSint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64String()};jspb.BinaryReader.prototype.readFixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readUint32()};jspb.BinaryReader.prototype.readFixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64()};
jspb.BinaryReader.prototype.readFixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64String()};jspb.BinaryReader.prototype.readSfixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32()};jspb.BinaryReader.prototype.readSfixed32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32().toString()};
jspb.BinaryReader.prototype.readSfixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64()};jspb.BinaryReader.prototype.readSfixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64String()};jspb.BinaryReader.prototype.readFloat=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readFloat()};
jspb.BinaryReader.prototype.readDouble=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readDouble()};jspb.BinaryReader.prototype.readBool=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return!!this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readEnum=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};
jspb.BinaryReader.prototype.readString=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readString(a)};jspb.BinaryReader.prototype.readBytes=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readBytes(a)};
jspb.BinaryReader.prototype.readVarintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readVarintHash64()};jspb.BinaryReader.prototype.readSintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarintHash64()};jspb.BinaryReader.prototype.readSplitVarint64=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSplitVarint64(a)};
jspb.BinaryReader.prototype.readSplitZigzagVarint64=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSplitVarint64(function(b,c){return jspb.utils.fromZigzag64(b,c,a)})};jspb.BinaryReader.prototype.readFixedHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readFixedHash64()};
jspb.BinaryReader.prototype.readSplitFixed64=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readSplitFixed64(a)};jspb.BinaryReader.prototype.readPackedField_=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var b=this.decoder_.readUnsignedVarint32();b=this.decoder_.getCursor()+b;for(var c=[];this.decoder_.getCursor()<b;)c.push(a.call(this.decoder_));return c};
jspb.BinaryReader.prototype.readPackedInt32=function(){return this.readPackedField_(this.decoder_.readSignedVarint32)};jspb.BinaryReader.prototype.readPackedInt32String=function(){return this.readPackedField_(this.decoder_.readSignedVarint32String)};jspb.BinaryReader.prototype.readPackedInt64=function(){return this.readPackedField_(this.decoder_.readSignedVarint64)};jspb.BinaryReader.prototype.readPackedInt64String=function(){return this.readPackedField_(this.decoder_.readSignedVarint64String)};
jspb.BinaryReader.prototype.readPackedUint32=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32)};jspb.BinaryReader.prototype.readPackedUint32String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32String)};jspb.BinaryReader.prototype.readPackedUint64=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64)};jspb.BinaryReader.prototype.readPackedUint64String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64String)};
jspb.BinaryReader.prototype.readPackedSint32=function(){return this.readPackedField_(this.decoder_.readZigzagVarint32)};jspb.BinaryReader.prototype.readPackedSint64=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64)};jspb.BinaryReader.prototype.readPackedSint64String=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64String)};jspb.BinaryReader.prototype.readPackedFixed32=function(){return this.readPackedField_(this.decoder_.readUint32)};
jspb.BinaryReader.prototype.readPackedFixed64=function(){return this.readPackedField_(this.decoder_.readUint64)};jspb.BinaryReader.prototype.readPackedFixed64String=function(){return this.readPackedField_(this.decoder_.readUint64String)};jspb.BinaryReader.prototype.readPackedSfixed32=function(){return this.readPackedField_(this.decoder_.readInt32)};jspb.BinaryReader.prototype.readPackedSfixed64=function(){return this.readPackedField_(this.decoder_.readInt64)};
jspb.BinaryReader.prototype.readPackedSfixed64String=function(){return this.readPackedField_(this.decoder_.readInt64String)};jspb.BinaryReader.prototype.readPackedFloat=function(){return this.readPackedField_(this.decoder_.readFloat)};jspb.BinaryReader.prototype.readPackedDouble=function(){return this.readPackedField_(this.decoder_.readDouble)};jspb.BinaryReader.prototype.readPackedBool=function(){return this.readPackedField_(this.decoder_.readBool)};jspb.BinaryReader.prototype.readPackedEnum=function(){return this.readPackedField_(this.decoder_.readEnum)};
jspb.BinaryReader.prototype.readPackedVarintHash64=function(){return this.readPackedField_(this.decoder_.readVarintHash64)};jspb.BinaryReader.prototype.readPackedFixedHash64=function(){return this.readPackedField_(this.decoder_.readFixedHash64)};jspb.BinaryEncoder=function(){this.buffer_=[]};jspb.BinaryEncoder.prototype.length=function(){return this.buffer_.length};jspb.BinaryEncoder.prototype.end=function(){var a=this.buffer_;this.buffer_=[];return a};
jspb.BinaryEncoder.prototype.writeSplitVarint64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);for(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);0<b||127<a;)this.buffer_.push(a&127|128),a=(a>>>7|b<<25)>>>0,b>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSplitFixed64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);this.writeUint32(a);this.writeUint32(b)};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));for(goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);127<a;)this.buffer_.push(a&127|128),a>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);if(0<=a)this.writeUnsignedVarint32(a);else{for(var b=0;9>b;b++)this.buffer_.push(a&127|128),a>>=7;this.buffer_.push(1)}};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeSignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeUnsignedVarint32((a<<1^a>>31)>>>0)};jspb.BinaryEncoder.prototype.writeZigzagVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitZigzag64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint64String=function(a){this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(a))};jspb.BinaryEncoder.prototype.writeZigzagVarintHash64=function(a){var b=this;jspb.utils.splitHash64(a);jspb.utils.toZigzag64(jspb.utils.split64Low,jspb.utils.split64High,function(a,d){b.writeSplitVarint64(a>>>0,d>>>0)})};
jspb.BinaryEncoder.prototype.writeUint8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&256>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeUint16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&65536>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeUint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};jspb.BinaryEncoder.prototype.writeUint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitUint64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-128<=a&&128>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeInt16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-32768<=a&&32768>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeInt32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};
jspb.BinaryEncoder.prototype.writeInt64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt64String=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(+a>=-jspb.BinaryConstants.TWO_TO_63&&+a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeFloat=function(a){goog.asserts.assert(Infinity===a||-Infinity===a||isNaN(a)||a>=-jspb.BinaryConstants.FLOAT32_MAX&&a<=jspb.BinaryConstants.FLOAT32_MAX);jspb.utils.splitFloat32(a);this.writeUint32(jspb.utils.split64Low)};
jspb.BinaryEncoder.prototype.writeDouble=function(a){goog.asserts.assert(Infinity===a||-Infinity===a||isNaN(a)||a>=-jspb.BinaryConstants.FLOAT64_MAX&&a<=jspb.BinaryConstants.FLOAT64_MAX);jspb.utils.splitFloat64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};jspb.BinaryEncoder.prototype.writeBool=function(a){goog.asserts.assert("boolean"===typeof a||"number"===typeof a);this.buffer_.push(a?1:0)};
jspb.BinaryEncoder.prototype.writeEnum=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32(a)};jspb.BinaryEncoder.prototype.writeBytes=function(a){this.buffer_.push.apply(this.buffer_,a)};jspb.BinaryEncoder.prototype.writeVarintHash64=function(a){jspb.utils.splitHash64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeFixedHash64=function(a){jspb.utils.splitHash64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeString=function(a){for(var b=this.buffer_.length,c=0;c<a.length;c++){var d=a.charCodeAt(c);if(128>d)this.buffer_.push(d);else if(2048>d)this.buffer_.push(d>>6|192),this.buffer_.push(d&63|128);else if(65536>d)if(55296<=d&&56319>=d&&c+1<a.length){var e=a.charCodeAt(c+1);56320<=e&&57343>=e&&(d=1024*(d-55296)+e-56320+65536,this.buffer_.push(d>>18|240),this.buffer_.push(d>>12&63|128),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128),c++)}else this.buffer_.push(d>>
12|224),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128)}return this.buffer_.length-b};jspb.arith={};jspb.arith.UInt64=function(a,b){this.lo=a;this.hi=b};jspb.arith.UInt64.prototype.cmp=function(a){return this.hi<a.hi||this.hi==a.hi&&this.lo<a.lo?-1:this.hi==a.hi&&this.lo==a.lo?0:1};jspb.arith.UInt64.prototype.rightShift=function(){return new jspb.arith.UInt64((this.lo>>>1|(this.hi&1)<<31)>>>0,this.hi>>>1>>>0)};jspb.arith.UInt64.prototype.leftShift=function(){return new jspb.arith.UInt64(this.lo<<1>>>0,(this.hi<<1|this.lo>>>31)>>>0)};
jspb.arith.UInt64.prototype.msb=function(){return!!(this.hi&2147483648)};jspb.arith.UInt64.prototype.lsb=function(){return!!(this.lo&1)};jspb.arith.UInt64.prototype.zero=function(){return 0==this.lo&&0==this.hi};jspb.arith.UInt64.prototype.add=function(a){return new jspb.arith.UInt64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};
jspb.arith.UInt64.prototype.sub=function(a){return new jspb.arith.UInt64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.UInt64.mul32x32=function(a,b){var c=a&65535;a>>>=16;var d=b&65535,e=b>>>16;b=c*d+65536*(c*e&65535)+65536*(a*d&65535);for(c=a*e+(c*e>>>16)+(a*d>>>16);4294967296<=b;)b-=4294967296,c+=1;return new jspb.arith.UInt64(b>>>0,c>>>0)};
jspb.arith.UInt64.prototype.mul=function(a){var b=jspb.arith.UInt64.mul32x32(this.lo,a);a=jspb.arith.UInt64.mul32x32(this.hi,a);a.hi=a.lo;a.lo=0;return b.add(a)};
jspb.arith.UInt64.prototype.div=function(a){if(0==a)return[];var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(this.lo,this.hi);a=new jspb.arith.UInt64(a,0);for(var d=new jspb.arith.UInt64(1,0);!a.msb();)a=a.leftShift(),d=d.leftShift();for(;!d.zero();)0>=a.cmp(c)&&(b=b.add(d),c=c.sub(a)),a=a.rightShift(),d=d.rightShift();return[b,c]};jspb.arith.UInt64.prototype.toString=function(){for(var a="",b=this;!b.zero();){b=b.div(10);var c=b[0];a=b[1].lo+a;b=c}""==a&&(a="0");return a};
jspb.arith.UInt64.fromString=function(a){for(var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(0,0),d=0;d<a.length;d++){if("0">a[d]||"9"<a[d])return null;var e=parseInt(a[d],10);c.lo=e;b=b.mul(10).add(c)}return b};jspb.arith.UInt64.prototype.clone=function(){return new jspb.arith.UInt64(this.lo,this.hi)};jspb.arith.Int64=function(a,b){this.lo=a;this.hi=b};
jspb.arith.Int64.prototype.add=function(a){return new jspb.arith.Int64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.sub=function(a){return new jspb.arith.Int64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.clone=function(){return new jspb.arith.Int64(this.lo,this.hi)};
jspb.arith.Int64.prototype.toString=function(){var a=0!=(this.hi&2147483648),b=new jspb.arith.UInt64(this.lo,this.hi);a&&(b=(new jspb.arith.UInt64(0,0)).sub(b));return(a?"-":"")+b.toString()};jspb.arith.Int64.fromString=function(a){var b=0<a.length&&"-"==a[0];b&&(a=a.substring(1));a=jspb.arith.UInt64.fromString(a);if(null===a)return null;b&&(a=(new jspb.arith.UInt64(0,0)).sub(a));return new jspb.arith.Int64(a.lo,a.hi)};jspb.BinaryWriter=function(){this.blocks_=[];this.totalLength_=0;this.encoder_=new jspb.BinaryEncoder;this.bookmarks_=[]};jspb.BinaryWriter.prototype.appendUint8Array_=function(a){var b=this.encoder_.end();this.blocks_.push(b);this.blocks_.push(a);this.totalLength_+=b.length+a.length};
jspb.BinaryWriter.prototype.beginDelimited_=function(a){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);a=this.encoder_.end();this.blocks_.push(a);this.totalLength_+=a.length;a.push(this.totalLength_);return a};jspb.BinaryWriter.prototype.endDelimited_=function(a){var b=a.pop();b=this.totalLength_+this.encoder_.length()-b;for(goog.asserts.assert(0<=b);127<b;)a.push(b&127|128),b>>>=7,this.totalLength_++;a.push(b);this.totalLength_++};
jspb.BinaryWriter.prototype.writeSerializedMessage=function(a,b,c){this.appendUint8Array_(a.subarray(b,c))};jspb.BinaryWriter.prototype.maybeWriteSerializedMessage=function(a,b,c){null!=a&&null!=b&&null!=c&&this.writeSerializedMessage(a,b,c)};jspb.BinaryWriter.prototype.reset=function(){this.blocks_=[];this.encoder_.end();this.totalLength_=0;this.bookmarks_=[]};
jspb.BinaryWriter.prototype.getResultBuffer=function(){goog.asserts.assert(0==this.bookmarks_.length);for(var a=new Uint8Array(this.totalLength_+this.encoder_.length()),b=this.blocks_,c=b.length,d=0,e=0;e<c;e++){var f=b[e];a.set(f,d);d+=f.length}b=this.encoder_.end();a.set(b,d);d+=b.length;goog.asserts.assert(d==a.length);this.blocks_=[a];return a};jspb.BinaryWriter.prototype.getResultBase64String=function(a){return goog.crypt.base64.encodeByteArray(this.getResultBuffer(),a)};
jspb.BinaryWriter.prototype.beginSubMessage=function(a){this.bookmarks_.push(this.beginDelimited_(a))};jspb.BinaryWriter.prototype.endSubMessage=function(){goog.asserts.assert(0<=this.bookmarks_.length);this.endDelimited_(this.bookmarks_.pop())};jspb.BinaryWriter.prototype.writeFieldHeader_=function(a,b){goog.asserts.assert(1<=a&&a==Math.floor(a));this.encoder_.writeUnsignedVarint32(8*a+b)};
jspb.BinaryWriter.prototype.writeAny=function(a,b,c){var d=jspb.BinaryConstants.FieldType;switch(a){case d.DOUBLE:this.writeDouble(b,c);break;case d.FLOAT:this.writeFloat(b,c);break;case d.INT64:this.writeInt64(b,c);break;case d.UINT64:this.writeUint64(b,c);break;case d.INT32:this.writeInt32(b,c);break;case d.FIXED64:this.writeFixed64(b,c);break;case d.FIXED32:this.writeFixed32(b,c);break;case d.BOOL:this.writeBool(b,c);break;case d.STRING:this.writeString(b,c);break;case d.GROUP:goog.asserts.fail("Group field type not supported in writeAny()");
break;case d.MESSAGE:goog.asserts.fail("Message field type not supported in writeAny()");break;case d.BYTES:this.writeBytes(b,c);break;case d.UINT32:this.writeUint32(b,c);break;case d.ENUM:this.writeEnum(b,c);break;case d.SFIXED32:this.writeSfixed32(b,c);break;case d.SFIXED64:this.writeSfixed64(b,c);break;case d.SINT32:this.writeSint32(b,c);break;case d.SINT64:this.writeSint64(b,c);break;case d.FHASH64:this.writeFixedHash64(b,c);break;case d.VHASH64:this.writeVarintHash64(b,c);break;default:goog.asserts.fail("Invalid field type in writeAny()")}};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint32(b))};jspb.BinaryWriter.prototype.writeSignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};jspb.BinaryWriter.prototype.writeUnsignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint64(b))};
jspb.BinaryWriter.prototype.writeSignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint64(b))};jspb.BinaryWriter.prototype.writeZigzagVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint32(b))};jspb.BinaryWriter.prototype.writeZigzagVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64(b))};
jspb.BinaryWriter.prototype.writeZigzagVarint64String_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64String(b))};jspb.BinaryWriter.prototype.writeZigzagVarintHash64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarintHash64(b))};
jspb.BinaryWriter.prototype.writeInt32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b))};jspb.BinaryWriter.prototype.writeInt32String=function(a,b){null!=b&&(b=parseInt(b,10),goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeInt64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeSignedVarint64_(a,b))};jspb.BinaryWriter.prototype.writeInt64String=function(a,b){null!=b&&(b=jspb.arith.Int64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSplitVarint64(b.lo,b.hi))};
jspb.BinaryWriter.prototype.writeUint32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b))};jspb.BinaryWriter.prototype.writeUint32String=function(a,b){null!=b&&(b=parseInt(b,10),goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b))};jspb.BinaryWriter.prototype.writeUint64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeUnsignedVarint64_(a,b))};
jspb.BinaryWriter.prototype.writeUint64String=function(a,b){null!=b&&(b=jspb.arith.UInt64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSplitVarint64(b.lo,b.hi))};jspb.BinaryWriter.prototype.writeSint32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeZigzagVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeSint64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64_(a,b))};jspb.BinaryWriter.prototype.writeSintHash64=function(a,b){null!=b&&this.writeZigzagVarintHash64_(a,b)};jspb.BinaryWriter.prototype.writeSint64String=function(a,b){null!=b&&this.writeZigzagVarint64String_(a,b)};
jspb.BinaryWriter.prototype.writeFixed32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeUint32(b))};jspb.BinaryWriter.prototype.writeFixed64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeUint64(b))};
jspb.BinaryWriter.prototype.writeFixed64String=function(a,b){null!=b&&(b=jspb.arith.UInt64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeSplitFixed64(b.lo,b.hi))};jspb.BinaryWriter.prototype.writeSfixed32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeInt32(b))};
jspb.BinaryWriter.prototype.writeSfixed64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeInt64(b))};jspb.BinaryWriter.prototype.writeSfixed64String=function(a,b){null!=b&&(b=jspb.arith.Int64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeSplitFixed64(b.lo,b.hi))};
jspb.BinaryWriter.prototype.writeFloat=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeFloat(b))};jspb.BinaryWriter.prototype.writeDouble=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeDouble(b))};
jspb.BinaryWriter.prototype.writeBool=function(a,b){null!=b&&(goog.asserts.assert("boolean"===typeof b||"number"===typeof b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeBool(b))};jspb.BinaryWriter.prototype.writeEnum=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};
jspb.BinaryWriter.prototype.writeString=function(a,b){null!=b&&(a=this.beginDelimited_(a),this.encoder_.writeString(b),this.endDelimited_(a))};jspb.BinaryWriter.prototype.writeBytes=function(a,b){null!=b&&(b=jspb.utils.byteSourceToUint8Array(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(b.length),this.appendUint8Array_(b))};jspb.BinaryWriter.prototype.writeMessage=function(a,b,c){null!=b&&(a=this.beginDelimited_(a),c(b,this),this.endDelimited_(a))};
jspb.BinaryWriter.prototype.writeMessageSet=function(a,b,c){null!=b&&(this.writeFieldHeader_(1,jspb.BinaryConstants.WireType.START_GROUP),this.writeFieldHeader_(2,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(a),a=this.beginDelimited_(3),c(b,this),this.endDelimited_(a),this.writeFieldHeader_(1,jspb.BinaryConstants.WireType.END_GROUP))};
jspb.BinaryWriter.prototype.writeGroup=function(a,b,c){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b,this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP))};jspb.BinaryWriter.prototype.writeFixedHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeFixedHash64(b))};
jspb.BinaryWriter.prototype.writeVarintHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeVarintHash64(b))};jspb.BinaryWriter.prototype.writeSplitFixed64=function(a,b,c){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(b,c)};
jspb.BinaryWriter.prototype.writeSplitVarint64=function(a,b,c){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(b,c)};jspb.BinaryWriter.prototype.writeSplitZigzagVarint64=function(a,b,c){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);var d=this.encoder_;jspb.utils.toZigzag64(b,c,function(a,b){d.writeSplitVarint64(a>>>0,b>>>0)})};
jspb.BinaryWriter.prototype.writeRepeatedInt32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt32String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint64_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64=function(a,b,c,d){if(null!=b)for(var e=0;e<b.length;e++)this.writeSplitFixed64(a,c(b[e]),d(b[e]))};jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64=function(a,b,c,d){if(null!=b)for(var e=0;e<b.length;e++)this.writeSplitVarint64(a,c(b[e]),d(b[e]))};jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64=function(a,b,c,d){if(null!=b)for(var e=0;e<b.length;e++)this.writeSplitZigzagVarint64(a,c(b[e]),d(b[e]))};
jspb.BinaryWriter.prototype.writeRepeatedInt64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt64String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint32String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedUint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint64String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint32_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64String_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarintHash64_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFloat=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFloat(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedDouble=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeDouble(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBool=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBool(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedEnum=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeEnum(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedString=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeString(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBytes=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBytes(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedMessage=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++){var e=this.beginDelimited_(a);c(b[d],this);this.endDelimited_(e)}};
jspb.BinaryWriter.prototype.writeRepeatedGroup=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++)this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b[d],this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP)};jspb.BinaryWriter.prototype.writeRepeatedFixedHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixedHash64(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeVarintHash64(a,b[c])};jspb.BinaryWriter.prototype.writePackedInt32=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeSignedVarint32(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedInt32String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeSignedVarint32(parseInt(b[c],10));this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedInt64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeSignedVarint64(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSplitFixed64=function(a,b,c,d){if(null!=b){a=this.beginDelimited_(a);for(var e=0;e<b.length;e++)this.encoder_.writeSplitFixed64(c(b[e]),d(b[e]));this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedSplitVarint64=function(a,b,c,d){if(null!=b){a=this.beginDelimited_(a);for(var e=0;e<b.length;e++)this.encoder_.writeSplitVarint64(c(b[e]),d(b[e]));this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64=function(a,b,c,d){if(null!=b){a=this.beginDelimited_(a);for(var e=this.encoder_,f=0;f<b.length;f++)jspb.utils.toZigzag64(c(b[f]),d(b[f]),function(a,b){e.writeSplitVarint64(a>>>0,b>>>0)});this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedInt64String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++){var d=jspb.arith.Int64.fromString(b[c]);this.encoder_.writeSplitVarint64(d.lo,d.hi)}this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedUint32=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeUnsignedVarint32(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedUint32String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeUnsignedVarint32(parseInt(b[c],10));this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedUint64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeUnsignedVarint64(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedUint64String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++){var d=jspb.arith.UInt64.fromString(b[c]);this.encoder_.writeSplitVarint64(d.lo,d.hi)}this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSint32=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarint32(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedSint64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarint64(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSint64String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(b[c]));this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedSintHash64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarintHash64(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedFixed32=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(4*b.length),a=0;a<b.length;a++)this.encoder_.writeUint32(b[a])};jspb.BinaryWriter.prototype.writePackedFixed64=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeUint64(b[a])};
jspb.BinaryWriter.prototype.writePackedFixed64String=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++){var c=jspb.arith.UInt64.fromString(b[a]);this.encoder_.writeSplitFixed64(c.lo,c.hi)}};
jspb.BinaryWriter.prototype.writePackedSfixed32=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(4*b.length),a=0;a<b.length;a++)this.encoder_.writeInt32(b[a])};jspb.BinaryWriter.prototype.writePackedSfixed64=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeInt64(b[a])};
jspb.BinaryWriter.prototype.writePackedSfixed64String=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeInt64String(b[a])};jspb.BinaryWriter.prototype.writePackedFloat=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(4*b.length),a=0;a<b.length;a++)this.encoder_.writeFloat(b[a])};
jspb.BinaryWriter.prototype.writePackedDouble=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeDouble(b[a])};jspb.BinaryWriter.prototype.writePackedBool=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(b.length),a=0;a<b.length;a++)this.encoder_.writeBool(b[a])};
jspb.BinaryWriter.prototype.writePackedEnum=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeEnum(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedFixedHash64=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeFixedHash64(b[a])};
jspb.BinaryWriter.prototype.writePackedVarintHash64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeVarintHash64(b[c]);this.endDelimited_(a)}};jspb.Map=function(a,b){this.arr_=a;this.valueCtor_=b;this.map_={};this.arrClean=!0;0<this.arr_.length&&this.loadFromArray_()};jspb.Map.prototype.loadFromArray_=function(){for(var a=0;a<this.arr_.length;a++){var b=this.arr_[a],c=b[0];this.map_[c.toString()]=new jspb.Map.Entry_(c,b[1])}this.arrClean=!0};
jspb.Map.prototype.toArray=function(){if(this.arrClean){if(this.valueCtor_){var a=this.map_,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].valueWrapper;c&&c.toArray()}}}else{this.arr_.length=0;a=this.stringKeys_();a.sort();for(b=0;b<a.length;b++){var d=this.map_[a[b]];(c=d.valueWrapper)&&c.toArray();this.arr_.push([d.key,d.value])}this.arrClean=!0}return this.arr_};
jspb.Map.prototype.toObject=function(a,b){for(var c=this.toArray(),d=[],e=0;e<c.length;e++){var f=this.map_[c[e][0].toString()];this.wrapEntry_(f);var g=f.valueWrapper;g?(goog.asserts.assert(b),d.push([f.key,b(a,g)])):d.push([f.key,f.value])}return d};jspb.Map.fromObject=function(a,b,c){b=new jspb.Map([],b);for(var d=0;d<a.length;d++){var e=a[d][0],f=c(a[d][1]);b.set(e,f)}return b};jspb.Map.ArrayIteratorIterable_=function(a){this.idx_=0;this.arr_=a};
jspb.Map.ArrayIteratorIterable_.prototype.next=function(){return this.idx_<this.arr_.length?{done:!1,value:this.arr_[this.idx_++]}:{done:!0,value:void 0}};"undefined"!=typeof Symbol&&(jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator]=function(){return this});jspb.Map.prototype.getLength=function(){return this.stringKeys_().length};jspb.Map.prototype.clear=function(){this.map_={};this.arrClean=!1};
jspb.Map.prototype.del=function(a){a=a.toString();var b=this.map_.hasOwnProperty(a);delete this.map_[a];this.arrClean=!1;return b};jspb.Map.prototype.getEntryList=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,d.value])}return a};jspb.Map.prototype.entries=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,this.wrapEntry_(d)])}return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.keys=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.map_[b[c]].key);return new jspb.Map.ArrayIteratorIterable_(a)};jspb.Map.prototype.values=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.wrapEntry_(this.map_[b[c]]));return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.forEach=function(a,b){var c=this.stringKeys_();c.sort();for(var d=0;d<c.length;d++){var e=this.map_[c[d]];a.call(b,this.wrapEntry_(e),e.key,this)}};jspb.Map.prototype.set=function(a,b){var c=new jspb.Map.Entry_(a);this.valueCtor_?(c.valueWrapper=b,c.value=b.toArray()):c.value=b;this.map_[a.toString()]=c;this.arrClean=!1;return this};jspb.Map.prototype.wrapEntry_=function(a){return this.valueCtor_?(a.valueWrapper||(a.valueWrapper=new this.valueCtor_(a.value)),a.valueWrapper):a.value};
jspb.Map.prototype.get=function(a){if(a=this.map_[a.toString()])return this.wrapEntry_(a)};jspb.Map.prototype.has=function(a){return a.toString()in this.map_};jspb.Map.prototype.serializeBinary=function(a,b,c,d,e){var f=this.stringKeys_();f.sort();for(var g=0;g<f.length;g++){var h=this.map_[f[g]];b.beginSubMessage(a);c.call(b,1,h.key);this.valueCtor_?d.call(b,2,this.wrapEntry_(h),e):d.call(b,2,h.value);b.endSubMessage()}};
jspb.Map.deserializeBinary=function(a,b,c,d,e,f,g){for(;b.nextField()&&!b.isEndGroup();){var h=b.getFieldNumber();1==h?f=c.call(b):2==h&&(a.valueCtor_?(goog.asserts.assert(e),g||(g=new a.valueCtor_),d.call(b,g,e)):g=d.call(b))}goog.asserts.assert(void 0!=f);goog.asserts.assert(void 0!=g);a.set(f,g)};jspb.Map.prototype.stringKeys_=function(){var a=this.map_,b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b};
jspb.Map.Entry_=function(a,b){this.key=a;this.value=b;this.valueWrapper=void 0};jspb.ExtensionFieldInfo=function(a,b,c,d,e){this.fieldIndex=a;this.fieldName=b;this.ctor=c;this.toObjectFn=d;this.isRepeated=e};jspb.ExtensionFieldBinaryInfo=function(a,b,c,d,e,f){this.fieldInfo=a;this.binaryReaderFn=b;this.binaryWriterFn=c;this.binaryMessageSerializeFn=d;this.binaryMessageDeserializeFn=e;this.isPacked=f};jspb.ExtensionFieldInfo.prototype.isMessageType=function(){return!!this.ctor};jspb.Message=function(){};jspb.Message.GENERATE_TO_OBJECT=!0;jspb.Message.GENERATE_FROM_OBJECT=!goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING=!0;jspb.Message.ASSUME_LOCAL_ARRAYS=!1;jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS=!0;jspb.Message.SUPPORTS_UINT8ARRAY_="function"==typeof Uint8Array;jspb.Message.prototype.getJsPbMessageId=function(){return this.messageId_};jspb.Message.getIndex_=function(a,b){return b+a.arrayIndexOffset_};jspb.Message.hiddenES6Property_=function(){};jspb.Message.getFieldNumber_=function(a,b){return b-a.arrayIndexOffset_};
jspb.Message.initialize=function(a,b,c,d,e,f){a.wrappers_=null;b||(b=c?[c]:[]);a.messageId_=c?String(c):void 0;a.arrayIndexOffset_=0===c?-1:0;a.array=b;jspb.Message.initPivotAndExtensionObject_(a,d);a.convertedPrimitiveFields_={};jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS||(a.repeatedFields=e);if(e)for(b=0;b<e.length;b++)c=e[b],c<a.pivot_?(c=jspb.Message.getIndex_(a,c),a.array[c]=a.array[c]||jspb.Message.EMPTY_LIST_SENTINEL_):(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[c]=
a.extensionObject_[c]||jspb.Message.EMPTY_LIST_SENTINEL_);if(f&&f.length)for(b=0;b<f.length;b++)jspb.Message.computeOneofCase(a,f[b])};jspb.Message.EMPTY_LIST_SENTINEL_=goog.DEBUG&&Object.freeze?Object.freeze([]):[];jspb.Message.isArray_=function(a){return jspb.Message.ASSUME_LOCAL_ARRAYS?a instanceof Array:Array.isArray(a)};jspb.Message.isExtensionObject_=function(a){return null!==a&&"object"==typeof a&&!jspb.Message.isArray_(a)&&!(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)};
jspb.Message.initPivotAndExtensionObject_=function(a,b){var c=a.array.length,d=-1;if(c&&(d=c-1,c=a.array[d],jspb.Message.isExtensionObject_(c))){a.pivot_=jspb.Message.getFieldNumber_(a,d);a.extensionObject_=c;return}-1<b?(a.pivot_=Math.max(b,jspb.Message.getFieldNumber_(a,d+1)),a.extensionObject_=null):a.pivot_=Number.MAX_VALUE};jspb.Message.maybeInitEmptyExtensionObject_=function(a){var b=jspb.Message.getIndex_(a,a.pivot_);a.array[b]||(a.extensionObject_=a.array[b]={})};
jspb.Message.toObjectList=function(a,b,c){for(var d=[],e=0;e<a.length;e++)d[e]=b.call(a[e],c,a[e]);return d};jspb.Message.toObjectExtension=function(a,b,c,d,e){for(var f in c){var g=c[f],h=d.call(a,g);if(null!=h){for(var k in g.fieldName)if(g.fieldName.hasOwnProperty(k))break;b[k]=g.toObjectFn?g.isRepeated?jspb.Message.toObjectList(h,g.toObjectFn,e):g.toObjectFn(e,h):h}}};
jspb.Message.serializeBinaryExtensions=function(a,b,c,d){for(var e in c){var f=c[e],g=f.fieldInfo;if(!f.binaryWriterFn)throw Error("Message extension present that was generated without binary serialization support");var h=d.call(a,g);if(null!=h)if(g.isMessageType())if(f.binaryMessageSerializeFn)f.binaryWriterFn.call(b,g.fieldIndex,h,f.binaryMessageSerializeFn);else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
else f.binaryWriterFn.call(b,g.fieldIndex,h)}};jspb.Message.readBinaryExtension=function(a,b,c,d,e){var f=c[b.getFieldNumber()];if(f){c=f.fieldInfo;if(!f.binaryReaderFn)throw Error("Deserializing extension whose generated code does not support binary format");if(c.isMessageType()){var g=new c.ctor;f.binaryReaderFn.call(b,g,f.binaryMessageDeserializeFn)}else g=f.binaryReaderFn.call(b);c.isRepeated&&!f.isPacked?(b=d.call(a,c))?b.push(g):e.call(a,c,[g]):e.call(a,c,g)}else b.skipField()};
jspb.Message.getField=function(a,b){if(b<a.pivot_){b=jspb.Message.getIndex_(a,b);var c=a.array[b];return c===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[b]=[]:c}if(a.extensionObject_)return c=a.extensionObject_[b],c===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:c};jspb.Message.getRepeatedField=function(a,b){return jspb.Message.getField(a,b)};jspb.Message.getOptionalFloatingPointField=function(a,b){a=jspb.Message.getField(a,b);return null==a?a:+a};
jspb.Message.getBooleanField=function(a,b){a=jspb.Message.getField(a,b);return null==a?a:!!a};jspb.Message.getRepeatedFloatingPointField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedPrimitiveFields_||(a.convertedPrimitiveFields_={});if(!a.convertedPrimitiveFields_[b]){for(var d=0;d<c.length;d++)c[d]=+c[d];a.convertedPrimitiveFields_[b]=!0}return c};
jspb.Message.getRepeatedBooleanField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedPrimitiveFields_||(a.convertedPrimitiveFields_={});if(!a.convertedPrimitiveFields_[b]){for(var d=0;d<c.length;d++)c[d]=!!c[d];a.convertedPrimitiveFields_[b]=!0}return c};
jspb.Message.bytesAsB64=function(a){if(null==a||"string"===typeof a)return a;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return goog.crypt.base64.encodeByteArray(a);goog.asserts.fail("Cannot coerce to b64 string: "+goog.typeOf(a));return null};jspb.Message.bytesAsU8=function(a){if(null==a||a instanceof Uint8Array)return a;if("string"===typeof a)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Cannot coerce to Uint8Array: "+goog.typeOf(a));return null};
jspb.Message.bytesListAsB64=function(a){jspb.Message.assertConsistentTypes_(a);return a.length&&"string"!==typeof a[0]?goog.array.map(a,jspb.Message.bytesAsB64):a};jspb.Message.bytesListAsU8=function(a){jspb.Message.assertConsistentTypes_(a);return!a.length||a[0]instanceof Uint8Array?a:goog.array.map(a,jspb.Message.bytesAsU8)};
jspb.Message.assertConsistentTypes_=function(a){if(goog.DEBUG&&a&&1<a.length){var b=goog.typeOf(a[0]);goog.array.forEach(a,function(a){goog.typeOf(a)!=b&&goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got "+goog.typeOf(a)+" expected "+b)})}};jspb.Message.getFieldWithDefault=function(a,b,c){a=jspb.Message.getField(a,b);return null==a?c:a};jspb.Message.getBooleanFieldWithDefault=function(a,b,c){a=jspb.Message.getBooleanField(a,b);return null==a?c:a};
jspb.Message.getFloatingPointFieldWithDefault=function(a,b,c){a=jspb.Message.getOptionalFloatingPointField(a,b);return null==a?c:a};jspb.Message.getFieldProto3=jspb.Message.getFieldWithDefault;jspb.Message.getMapField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(b in a.wrappers_)return a.wrappers_[b];var e=jspb.Message.getField(a,b);if(!e){if(c)return;e=[];jspb.Message.setField(a,b,e)}return a.wrappers_[b]=new jspb.Map(e,d)};
jspb.Message.setField=function(a,b,c){goog.asserts.assertInstanceof(a,jspb.Message);b<a.pivot_?a.array[jspb.Message.getIndex_(a,b)]=c:(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[b]=c);return a};jspb.Message.setProto3IntField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};jspb.Message.setProto3FloatField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3BooleanField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,!1)};jspb.Message.setProto3StringField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3BytesField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3EnumField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3StringIntField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,"0")};jspb.Message.setFieldIgnoringDefault_=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);c!==d?jspb.Message.setField(a,b,c):b<a.pivot_?a.array[jspb.Message.getIndex_(a,b)]=null:(jspb.Message.maybeInitEmptyExtensionObject_(a),delete a.extensionObject_[b]);return a};
jspb.Message.addToRepeatedField=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);b=jspb.Message.getRepeatedField(a,b);void 0!=d?b.splice(d,0,c):b.push(c);return a};jspb.Message.setOneofField=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);(c=jspb.Message.computeOneofCase(a,c))&&c!==b&&void 0!==d&&(a.wrappers_&&c in a.wrappers_&&(a.wrappers_[c]=void 0),jspb.Message.setField(a,c,void 0));return jspb.Message.setField(a,b,d)};
jspb.Message.computeOneofCase=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],g=jspb.Message.getField(a,f);null!=g&&(c=f,d=g,jspb.Message.setField(a,f,void 0))}return c?(jspb.Message.setField(a,c,d),c):0};jspb.Message.getWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){var e=jspb.Message.getField(a,c);if(d||e)a.wrappers_[c]=new b(e)}return a.wrappers_[c]};
jspb.Message.getRepeatedWrapperField=function(a,b,c){jspb.Message.wrapRepeatedField_(a,b,c);b=a.wrappers_[c];b==jspb.Message.EMPTY_LIST_SENTINEL_&&(b=a.wrappers_[c]=[]);return b};jspb.Message.wrapRepeatedField_=function(a,b,c){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){for(var d=jspb.Message.getRepeatedField(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.wrappers_[c]=e}};
jspb.Message.setWrapperField=function(a,b,c){goog.asserts.assertInstanceof(a,jspb.Message);a.wrappers_||(a.wrappers_={});var d=c?c.toArray():c;a.wrappers_[b]=c;return jspb.Message.setField(a,b,d)};jspb.Message.setOneofWrapperField=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);a.wrappers_||(a.wrappers_={});var e=d?d.toArray():d;a.wrappers_[b]=d;return jspb.Message.setOneofField(a,b,c,e)};
jspb.Message.setRepeatedWrapperField=function(a,b,c){goog.asserts.assertInstanceof(a,jspb.Message);a.wrappers_||(a.wrappers_={});c=c||[];for(var d=[],e=0;e<c.length;e++)d[e]=c[e].toArray();a.wrappers_[b]=c;return jspb.Message.setField(a,b,d)};
jspb.Message.addToRepeatedWrapperField=function(a,b,c,d,e){jspb.Message.wrapRepeatedField_(a,d,b);var f=a.wrappers_[b];f||(f=a.wrappers_[b]=[]);c=c?c:new d;a=jspb.Message.getRepeatedField(a,b);void 0!=e?(f.splice(e,0,c),a.splice(e,0,c.toArray())):(f.push(c),a.push(c.toArray()));return c};jspb.Message.toMap=function(a,b,c,d){for(var e={},f=0;f<a.length;f++)e[b.call(a[f])]=c?c.call(a[f],d,a[f]):a[f];return e};
jspb.Message.prototype.syncMapFields_=function(){if(this.wrappers_)for(var a in this.wrappers_){var b=this.wrappers_[a];if(Array.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].toArray();else b&&b.toArray()}};jspb.Message.prototype.toArray=function(){this.syncMapFields_();return this.array};jspb.Message.GENERATE_TO_STRING&&(jspb.Message.prototype.toString=function(){this.syncMapFields_();return this.array.toString()});
jspb.Message.prototype.getExtension=function(a){if(this.extensionObject_){this.wrappers_||(this.wrappers_={});var b=a.fieldIndex;if(a.isRepeated){if(a.isMessageType())return this.wrappers_[b]||(this.wrappers_[b]=goog.array.map(this.extensionObject_[b]||[],function(b){return new a.ctor(b)})),this.wrappers_[b]}else if(a.isMessageType())return!this.wrappers_[b]&&this.extensionObject_[b]&&(this.wrappers_[b]=new a.ctor(this.extensionObject_[b])),this.wrappers_[b];return this.extensionObject_[b]}};
jspb.Message.prototype.setExtension=function(a,b){this.wrappers_||(this.wrappers_={});jspb.Message.maybeInitEmptyExtensionObject_(this);var c=a.fieldIndex;a.isRepeated?(b=b||[],a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=goog.array.map(b,function(a){return a.toArray()})):this.extensionObject_[c]=b):a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=b?b.toArray():b):this.extensionObject_[c]=b;return this};
jspb.Message.difference=function(a,b){if(!(a instanceof b.constructor))throw Error("Messages have different types.");var c=a.toArray();b=b.toArray();var d=[],e=0,f=c.length>b.length?c.length:b.length;a.getJsPbMessageId()&&(d[0]=a.getJsPbMessageId(),e=1);for(;e<f;e++)jspb.Message.compareFields(c[e],b[e])||(d[e]=b[e]);return new a.constructor(d)};jspb.Message.equals=function(a,b){return a==b||!(!a||!b)&&a instanceof b.constructor&&jspb.Message.compareFields(a.toArray(),b.toArray())};
jspb.Message.compareExtensions=function(a,b){a=a||{};b=b||{};var c={},d;for(d in a)c[d]=0;for(d in b)c[d]=0;for(d in c)if(!jspb.Message.compareFields(a[d],b[d]))return!1;return!0};
jspb.Message.compareFields=function(a,b){if(a==b)return!0;if(!goog.isObject(a)||!goog.isObject(b))return"number"===typeof a&&isNaN(a)||"number"===typeof b&&isNaN(b)?String(a)==String(b):!1;if(a.constructor!=b.constructor)return!1;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a.constructor===Uint8Array){if(a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return!1;return!0}if(a.constructor===Array){var d=void 0,e=void 0,f=Math.max(a.length,b.length);for(c=0;c<f;c++){var g=a[c],h=b[c];g&&
g.constructor==Object&&(goog.asserts.assert(void 0===d),goog.asserts.assert(c===a.length-1),d=g,g=void 0);h&&h.constructor==Object&&(goog.asserts.assert(void 0===e),goog.asserts.assert(c===b.length-1),e=h,h=void 0);if(!jspb.Message.compareFields(g,h))return!1}return d||e?(d=d||{},e=e||{},jspb.Message.compareExtensions(d,e)):!0}if(a.constructor===Object)return jspb.Message.compareExtensions(a,b);throw Error("Invalid type in JSPB array");};jspb.Message.prototype.cloneMessage=function(){return jspb.Message.cloneMessage(this)};
jspb.Message.prototype.clone=function(){return jspb.Message.cloneMessage(this)};jspb.Message.clone=function(a){return jspb.Message.cloneMessage(a)};jspb.Message.cloneMessage=function(a){return new a.constructor(jspb.Message.clone_(a.toArray()))};
jspb.Message.copyInto=function(a,b){goog.asserts.assertInstanceof(a,jspb.Message);goog.asserts.assertInstanceof(b,jspb.Message);goog.asserts.assert(a.constructor==b.constructor,"Copy source and target message should have the same type.");a=jspb.Message.clone(a);for(var c=b.toArray(),d=a.toArray(),e=c.length=0;e<d.length;e++)c[e]=d[e];b.wrappers_=a.wrappers_;b.extensionObject_=a.extensionObject_};
jspb.Message.clone_=function(a){if(Array.isArray(a)){for(var b=Array(a.length),c=0;c<a.length;c++){var d=a[c];null!=d&&(b[c]="object"==typeof d?jspb.Message.clone_(goog.asserts.assert(d)):d)}return b}if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return new Uint8Array(a);b={};for(c in a)d=a[c],null!=d&&(b[c]="object"==typeof d?jspb.Message.clone_(goog.asserts.assert(d)):d);return b};jspb.Message.registerMessageType=function(a,b){b.messageId=a};jspb.Message.messageSetExtensions={};
jspb.Message.messageSetExtensionsBinary={};jspb.Export={};exports.Map=jspb.Map;exports.Message=jspb.Message;exports.BinaryReader=jspb.BinaryReader;exports.BinaryWriter=jspb.BinaryWriter;exports.ExtensionFieldInfo=jspb.ExtensionFieldInfo;exports.ExtensionFieldBinaryInfo=jspb.ExtensionFieldBinaryInfo;exports.exportSymbol=goog.exportSymbol;exports.inherits=goog.inherits;exports.object={extend:goog.object.extend};exports.typeOf=goog.typeOf;


/***/ }),

/***/ "./src/protocol/client2server_pb.js":
/*!******************************************!*\
  !*** ./src/protocol/client2server_pb.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(/*! google-protobuf */ "./node_modules/google-protobuf/google-protobuf.js");
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.snail_video.media.eCmdC2S', null, global);
goog.exportSymbol('proto.snail_video.media.eMediaCtrlActs', null, global);
goog.exportSymbol('proto.snail_video.media.eReloginReson', null, global);
goog.exportSymbol('proto.snail_video.media.eUserStatus', null, global);
goog.exportSymbol('proto.snail_video.media.notify_bind_streams', null, global);
goog.exportSymbol('proto.snail_video.media.notify_cancel_publish', null, global);
goog.exportSymbol('proto.snail_video.media.notify_error', null, global);
goog.exportSymbol('proto.snail_video.media.notify_media_ctrl', null, global);
goog.exportSymbol('proto.snail_video.media.notify_request_relogin', null, global);
goog.exportSymbol('proto.snail_video.media.notify_send_msg', null, global);
goog.exportSymbol('proto.snail_video.media.notify_setroomattrs', null, global);
goog.exportSymbol('proto.snail_video.media.notify_setuserattrs', null, global);
goog.exportSymbol('proto.snail_video.media.notify_user_status', null, global);
goog.exportSymbol('proto.snail_video.media.notify_webrtc_command', null, global);
goog.exportSymbol('proto.snail_video.media.object_actions', null, global);
goog.exportSymbol('proto.snail_video.media.object_keyvalue', null, global);
goog.exportSymbol('proto.snail_video.media.object_media', null, global);
goog.exportSymbol('proto.snail_video.media.object_user', null, global);
goog.exportSymbol('proto.snail_video.media.object_webrtc_msg', null, global);
goog.exportSymbol('proto.snail_video.media.request_add_participant', null, global);
goog.exportSymbol('proto.snail_video.media.request_client2Server_header', null, global);
goog.exportSymbol('proto.snail_video.media.request_order_streams', null, global);
goog.exportSymbol('proto.snail_video.media.request_order_unorder', null, global);
goog.exportSymbol('proto.snail_video.media.request_ping', null, global);
goog.exportSymbol('proto.snail_video.media.request_register', null, global);
goog.exportSymbol('proto.snail_video.media.request_set_media_attr', null, global);
goog.exportSymbol('proto.snail_video.media.request_setroomattrs', null, global);
goog.exportSymbol('proto.snail_video.media.request_setuserattrs', null, global);
goog.exportSymbol('proto.snail_video.media.request_update_media', null, global);
goog.exportSymbol('proto.snail_video.media.respond_add_participant', null, global);
goog.exportSymbol('proto.snail_video.media.respond_order_unorder', null, global);
goog.exportSymbol('proto.snail_video.media.respond_ping', null, global);
goog.exportSymbol('proto.snail_video.media.respond_register', null, global);
goog.exportSymbol('proto.snail_video.media.respond_set_media_attr', null, global);
goog.exportSymbol('proto.snail_video.media.respond_setroomattrs', null, global);
goog.exportSymbol('proto.snail_video.media.respond_setuserattrs', null, global);
goog.exportSymbol('proto.snail_video.media.respond_update_media', null, global);
goog.exportSymbol('proto.snail_video.media.response_client2Server_header', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_client2Server_header = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.request_client2Server_header, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_client2Server_header.displayName = 'proto.snail_video.media.request_client2Server_header';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_client2Server_header.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_client2Server_header.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_client2Server_header} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_client2Server_header.toObject = function(includeInstance, msg) {
  var f, obj = {
    sn: msg.getSn(),
    sessionkey: msg.getSessionkey_asB64(),
    token: msg.getToken_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_client2Server_header}
 */
proto.snail_video.media.request_client2Server_header.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_client2Server_header;
  return proto.snail_video.media.request_client2Server_header.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_client2Server_header} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_client2Server_header}
 */
proto.snail_video.media.request_client2Server_header.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setSn(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSessionkey(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_client2Server_header} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_client2Server_header.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_client2Server_header.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_client2Server_header.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getSn();
  if (f !== 0) {
    writer.writeSint32(
      1,
      f
    );
  }
  f = this.getSessionkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getToken_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_client2Server_header} The clone.
 */
proto.snail_video.media.request_client2Server_header.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_client2Server_header} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint32 sn = 1;
 * @return {number}
 */
proto.snail_video.media.request_client2Server_header.prototype.getSn = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.request_client2Server_header.prototype.setSn = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes sessionkey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_client2Server_header.prototype.getSessionkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes sessionkey = 2;
 * This is a type-conversion wrapper around `getSessionkey()`
 * @return {string}
 */
proto.snail_video.media.request_client2Server_header.prototype.getSessionkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSessionkey()));
};


/**
 * optional bytes sessionkey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSessionkey()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_client2Server_header.prototype.getSessionkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSessionkey()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_client2Server_header.prototype.setSessionkey = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bytes token = 3;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_client2Server_header.prototype.getToken = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/**
 * optional bytes token = 3;
 * This is a type-conversion wrapper around `getToken()`
 * @return {string}
 */
proto.snail_video.media.request_client2Server_header.prototype.getToken_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getToken()));
};


/**
 * optional bytes token = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getToken()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_client2Server_header.prototype.getToken_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getToken()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_client2Server_header.prototype.setToken = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.response_client2Server_header = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.response_client2Server_header, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.response_client2Server_header.displayName = 'proto.snail_video.media.response_client2Server_header';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.response_client2Server_header.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.response_client2Server_header.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.response_client2Server_header} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.response_client2Server_header.toObject = function(includeInstance, msg) {
  var f, obj = {
    sn: msg.getSn(),
    ec: msg.getEc(),
    subec: msg.getSubec(),
    dbspan: msg.getDbspan(),
    token: msg.getToken_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.response_client2Server_header}
 */
proto.snail_video.media.response_client2Server_header.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.response_client2Server_header;
  return proto.snail_video.media.response_client2Server_header.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.response_client2Server_header} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.response_client2Server_header}
 */
proto.snail_video.media.response_client2Server_header.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setSn(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setEc(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setSubec(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setDbspan(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setToken(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.response_client2Server_header} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.response_client2Server_header.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.response_client2Server_header.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.response_client2Server_header.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getSn();
  if (f !== 0) {
    writer.writeSint32(
      1,
      f
    );
  }
  f = this.getEc();
  if (f !== 0) {
    writer.writeSint32(
      2,
      f
    );
  }
  f = this.getSubec();
  if (f !== 0) {
    writer.writeSint32(
      3,
      f
    );
  }
  f = this.getDbspan();
  if (f !== 0) {
    writer.writeSint32(
      4,
      f
    );
  }
  f = this.getToken_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.response_client2Server_header} The clone.
 */
proto.snail_video.media.response_client2Server_header.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.response_client2Server_header} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint32 sn = 1;
 * @return {number}
 */
proto.snail_video.media.response_client2Server_header.prototype.getSn = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.response_client2Server_header.prototype.setSn = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional sint32 ec = 2;
 * @return {number}
 */
proto.snail_video.media.response_client2Server_header.prototype.getEc = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.snail_video.media.response_client2Server_header.prototype.setEc = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional sint32 subec = 3;
 * @return {number}
 */
proto.snail_video.media.response_client2Server_header.prototype.getSubec = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.snail_video.media.response_client2Server_header.prototype.setSubec = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional sint32 dbspan = 4;
 * @return {number}
 */
proto.snail_video.media.response_client2Server_header.prototype.getDbspan = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.snail_video.media.response_client2Server_header.prototype.setDbspan = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional bytes token = 5;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.response_client2Server_header.prototype.getToken = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 5, ""));
};


/**
 * optional bytes token = 5;
 * This is a type-conversion wrapper around `getToken()`
 * @return {string}
 */
proto.snail_video.media.response_client2Server_header.prototype.getToken_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getToken()));
};


/**
 * optional bytes token = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getToken()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.response_client2Server_header.prototype.getToken_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getToken()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.response_client2Server_header.prototype.setToken = function(value) {
  jspb.Message.setField(this, 5, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_error = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.notify_error, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_error.displayName = 'proto.snail_video.media.notify_error';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_error.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_error.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_error} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_error.toObject = function(includeInstance, msg) {
  var f, obj = {
    ec: msg.getEc(),
    subec: msg.getSubec(),
    cmd: msg.getCmd()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_error}
 */
proto.snail_video.media.notify_error.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_error;
  return proto.snail_video.media.notify_error.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_error} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_error}
 */
proto.snail_video.media.notify_error.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setEc(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setSubec(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setCmd(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_error} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_error.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_error.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_error.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getEc();
  if (f !== 0) {
    writer.writeSint32(
      1,
      f
    );
  }
  f = this.getSubec();
  if (f !== 0) {
    writer.writeSint32(
      2,
      f
    );
  }
  f = this.getCmd();
  if (f !== 0) {
    writer.writeSint32(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_error} The clone.
 */
proto.snail_video.media.notify_error.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_error} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint32 ec = 1;
 * @return {number}
 */
proto.snail_video.media.notify_error.prototype.getEc = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.notify_error.prototype.setEc = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional sint32 subec = 2;
 * @return {number}
 */
proto.snail_video.media.notify_error.prototype.getSubec = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.snail_video.media.notify_error.prototype.setSubec = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional sint32 cmd = 3;
 * @return {number}
 */
proto.snail_video.media.notify_error.prototype.getCmd = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.snail_video.media.notify_error.prototype.setCmd = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.object_actions = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.object_actions, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.object_actions.displayName = 'proto.snail_video.media.object_actions';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.object_actions.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.object_actions.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.object_actions} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.object_actions.toObject = function(includeInstance, msg) {
  var f, obj = {
    acttype: msg.getActtype(),
    ssrcids: msg.getSsrcids(),
    params: msg.getParams_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.object_actions}
 */
proto.snail_video.media.object_actions.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.object_actions;
  return proto.snail_video.media.object_actions.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.object_actions} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.object_actions}
 */
proto.snail_video.media.object_actions.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setActtype(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setSsrcids(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setParams(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.object_actions} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_actions.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_actions.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_actions.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getActtype();
  if (f !== 0) {
    writer.writeSint32(
      1,
      f
    );
  }
  f = this.getSsrcids();
  if (f !== 0) {
    writer.writeSint32(
      2,
      f
    );
  }
  f = this.getParams_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.object_actions} The clone.
 */
proto.snail_video.media.object_actions.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.object_actions} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint32 acttype = 1;
 * @return {number}
 */
proto.snail_video.media.object_actions.prototype.getActtype = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.object_actions.prototype.setActtype = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional sint32 ssrcids = 2;
 * @return {number}
 */
proto.snail_video.media.object_actions.prototype.getSsrcids = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.snail_video.media.object_actions.prototype.setSsrcids = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bytes params = 3;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_actions.prototype.getParams = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/**
 * optional bytes params = 3;
 * This is a type-conversion wrapper around `getParams()`
 * @return {string}
 */
proto.snail_video.media.object_actions.prototype.getParams_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getParams()));
};


/**
 * optional bytes params = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getParams()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_actions.prototype.getParams_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getParams()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_actions.prototype.setParams = function(value) {
  jspb.Message.setField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.object_keyvalue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.object_keyvalue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.object_keyvalue.displayName = 'proto.snail_video.media.object_keyvalue';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.object_keyvalue.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.object_keyvalue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.object_keyvalue} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.object_keyvalue.toObject = function(includeInstance, msg) {
  var f, obj = {
    key: msg.getKey_asB64(),
    value: msg.getValue_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.object_keyvalue}
 */
proto.snail_video.media.object_keyvalue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.object_keyvalue;
  return proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.object_keyvalue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.object_keyvalue}
 */
proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setKey(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.object_keyvalue} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_keyvalue.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_keyvalue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_keyvalue.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getValue_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.object_keyvalue} The clone.
 */
proto.snail_video.media.object_keyvalue.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.object_keyvalue} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes key = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_keyvalue.prototype.getKey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes key = 1;
 * This is a type-conversion wrapper around `getKey()`
 * @return {string}
 */
proto.snail_video.media.object_keyvalue.prototype.getKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getKey()));
};


/**
 * optional bytes key = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getKey()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_keyvalue.prototype.getKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getKey()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_keyvalue.prototype.setKey = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes value = 2;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_keyvalue.prototype.getValue = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes value = 2;
 * This is a type-conversion wrapper around `getValue()`
 * @return {string}
 */
proto.snail_video.media.object_keyvalue.prototype.getValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getValue()));
};


/**
 * optional bytes value = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getValue()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_keyvalue.prototype.getValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getValue()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_keyvalue.prototype.setValue = function(value) {
  jspb.Message.setField(this, 2, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.object_webrtc_msg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.object_webrtc_msg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.object_webrtc_msg.displayName = 'proto.snail_video.media.object_webrtc_msg';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.object_webrtc_msg.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.object_webrtc_msg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.object_webrtc_msg} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.object_webrtc_msg.toObject = function(includeInstance, msg) {
  var f, obj = {
    mline: msg.getMline_asB64(),
    mlineIndex: msg.getMlineIndex(),
    sdp: msg.getSdp_asB64(),
    peerParams: msg.getPeerParams_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.object_webrtc_msg}
 */
proto.snail_video.media.object_webrtc_msg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.object_webrtc_msg;
  return proto.snail_video.media.object_webrtc_msg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.object_webrtc_msg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.object_webrtc_msg}
 */
proto.snail_video.media.object_webrtc_msg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMline(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setMlineIndex(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSdp(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPeerParams(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.object_webrtc_msg} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_webrtc_msg.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_webrtc_msg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_webrtc_msg.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMline_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getMlineIndex();
  if (f !== 0) {
    writer.writeSint32(
      2,
      f
    );
  }
  f = this.getSdp_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = this.getPeerParams_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.object_webrtc_msg} The clone.
 */
proto.snail_video.media.object_webrtc_msg.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.object_webrtc_msg} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes mline = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getMline = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes mline = 1;
 * This is a type-conversion wrapper around `getMline()`
 * @return {string}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getMline_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMline()));
};


/**
 * optional bytes mline = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMline()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getMline_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMline()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_webrtc_msg.prototype.setMline = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional sint32 mline_index = 2;
 * @return {number}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getMlineIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 2, 0));
};


/** @param {number} value  */
proto.snail_video.media.object_webrtc_msg.prototype.setMlineIndex = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bytes sdp = 3;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getSdp = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/**
 * optional bytes sdp = 3;
 * This is a type-conversion wrapper around `getSdp()`
 * @return {string}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getSdp_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSdp()));
};


/**
 * optional bytes sdp = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSdp()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getSdp_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSdp()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_webrtc_msg.prototype.setSdp = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional bytes peer_params = 4;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getPeerParams = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 4, ""));
};


/**
 * optional bytes peer_params = 4;
 * This is a type-conversion wrapper around `getPeerParams()`
 * @return {string}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getPeerParams_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPeerParams()));
};


/**
 * optional bytes peer_params = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPeerParams()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_webrtc_msg.prototype.getPeerParams_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPeerParams()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_webrtc_msg.prototype.setPeerParams = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.object_user = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.object_user.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.object_user, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.object_user.displayName = 'proto.snail_video.media.object_user';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.object_user.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.object_user.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.object_user.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.object_user} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.object_user.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientid: msg.getClientid_asB64(),
    clientkey: msg.getClientkey_asB64(),
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance),
    status: msg.getStatus(),
    joinTime: msg.getJoinTime(),
    leaveTime: msg.getLeaveTime()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.object_user}
 */
proto.snail_video.media.object_user.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.object_user;
  return proto.snail_video.media.object_user.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.object_user} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.object_user}
 */
proto.snail_video.media.object_user.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setClientid(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setClientkey(value);
      break;
    case 3:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    case 4:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setStatus(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setJoinTime(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setLeaveTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.object_user} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_user.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_user.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_user.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClientid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getClientkey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
  f = this.getStatus();
  if (f !== 0) {
    writer.writeSint32(
      4,
      f
    );
  }
  f = this.getJoinTime();
  if (f !== 0) {
    writer.writeSint32(
      5,
      f
    );
  }
  f = this.getLeaveTime();
  if (f !== 0) {
    writer.writeSint32(
      6,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.object_user} The clone.
 */
proto.snail_video.media.object_user.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.object_user} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes clientid = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_user.prototype.getClientid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes clientid = 1;
 * This is a type-conversion wrapper around `getClientid()`
 * @return {string}
 */
proto.snail_video.media.object_user.prototype.getClientid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getClientid()));
};


/**
 * optional bytes clientid = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getClientid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_user.prototype.getClientid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getClientid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_user.prototype.setClientid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes clientkey = 2;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_user.prototype.getClientkey = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes clientkey = 2;
 * This is a type-conversion wrapper around `getClientkey()`
 * @return {string}
 */
proto.snail_video.media.object_user.prototype.getClientkey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getClientkey()));
};


/**
 * optional bytes clientkey = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getClientkey()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_user.prototype.getClientkey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getClientkey()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_user.prototype.setClientkey = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * repeated object_keyvalue attrs = 3;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.object_user.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 3));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.object_user.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 3, value);
};


proto.snail_video.media.object_user.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};


/**
 * optional sint32 status = 4;
 * @return {number}
 */
proto.snail_video.media.object_user.prototype.getStatus = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.snail_video.media.object_user.prototype.setStatus = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional sint32 join_time = 5;
 * @return {number}
 */
proto.snail_video.media.object_user.prototype.getJoinTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 5, 0));
};


/** @param {number} value  */
proto.snail_video.media.object_user.prototype.setJoinTime = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional sint32 leave_time = 6;
 * @return {number}
 */
proto.snail_video.media.object_user.prototype.getLeaveTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 6, 0));
};


/** @param {number} value  */
proto.snail_video.media.object_user.prototype.setLeaveTime = function(value) {
  jspb.Message.setField(this, 6, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.object_media = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.object_media.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.object_media, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.object_media.displayName = 'proto.snail_video.media.object_media';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.object_media.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.object_media.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.object_media.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.object_media} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.object_media.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: msg.getName_asB64(),
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.object_media}
 */
proto.snail_video.media.object_media.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.object_media;
  return proto.snail_video.media.object_media.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.object_media} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.object_media}
 */
proto.snail_video.media.object_media.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setName(value);
      break;
    case 2:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.object_media} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_media.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_media.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.object_media.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getName_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.object_media} The clone.
 */
proto.snail_video.media.object_media.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.object_media} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes name = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.object_media.prototype.getName = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes name = 1;
 * This is a type-conversion wrapper around `getName()`
 * @return {string}
 */
proto.snail_video.media.object_media.prototype.getName_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getName()));
};


/**
 * optional bytes name = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getName()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.object_media.prototype.getName_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getName()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.object_media.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated object_keyvalue attrs = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.object_media.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 2));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.object_media.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.snail_video.media.object_media.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_ping = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.request_ping, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_ping.displayName = 'proto.snail_video.media.request_ping';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_ping.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_ping.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_ping} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_ping.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: msg.getTimestamp()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_ping}
 */
proto.snail_video.media.request_ping.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_ping;
  return proto.snail_video.media.request_ping.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_ping} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_ping}
 */
proto.snail_video.media.request_ping.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint64());
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_ping} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_ping.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_ping.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_ping.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTimestamp();
  if (f !== 0) {
    writer.writeSint64(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_ping} The clone.
 */
proto.snail_video.media.request_ping.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_ping} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint64 timestamp = 1;
 * @return {number}
 */
proto.snail_video.media.request_ping.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.request_ping.prototype.setTimestamp = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_ping = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.respond_ping, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_ping.displayName = 'proto.snail_video.media.respond_ping';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_ping.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_ping.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_ping} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_ping.toObject = function(includeInstance, msg) {
  var f, obj = {
    timestamp: msg.getTimestamp()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_ping}
 */
proto.snail_video.media.respond_ping.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_ping;
  return proto.snail_video.media.respond_ping.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_ping} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_ping}
 */
proto.snail_video.media.respond_ping.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint64());
      msg.setTimestamp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_ping} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_ping.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_ping.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_ping.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getTimestamp();
  if (f !== 0) {
    writer.writeSint64(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_ping} The clone.
 */
proto.snail_video.media.respond_ping.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_ping} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint64 timestamp = 1;
 * @return {number}
 */
proto.snail_video.media.respond_ping.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.respond_ping.prototype.setTimestamp = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_register = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_register.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_register, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_register.displayName = 'proto.snail_video.media.request_register';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_register.repeatedFields_ = [5];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_register.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_register.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_register} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_register.toObject = function(includeInstance, msg) {
  var f, obj = {
    user: (f = msg.getUser()) && proto.snail_video.media.object_user.toObject(includeInstance, f),
    loginseq: msg.getLoginseq_asB64(),
    version: msg.getVersion_asB64(),
    roomid: msg.getRoomid_asB64(),
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance),
    ordermode: msg.getOrdermode_asB64(),
    notify: msg.getNotify_asB64(),
    serverdata: msg.getServerdata_asB64(),
    serverIp: msg.getServerIp_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_register}
 */
proto.snail_video.media.request_register.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_register;
  return proto.snail_video.media.request_register.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_register} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_register}
 */
proto.snail_video.media.request_register.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_user;
      reader.readMessage(value,proto.snail_video.media.object_user.deserializeBinaryFromReader);
      msg.setUser(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setLoginseq(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setVersion(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setRoomid(value);
      break;
    case 5:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOrdermode(value);
      break;
    case 7:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setNotify(value);
      break;
    case 8:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setServerdata(value);
      break;
    case 9:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setServerIp(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_register} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_register.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_register.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUser();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.snail_video.media.object_user.serializeBinaryToWriter
    );
  }
  f = this.getLoginseq_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getVersion_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = this.getRoomid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
  f = this.getOrdermode_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = this.getNotify_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      7,
      f
    );
  }
  f = this.getServerdata_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      8,
      f
    );
  }
  f = this.getServerIp_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      9,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_register} The clone.
 */
proto.snail_video.media.request_register.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_register} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional object_user user = 1;
 * @return {proto.snail_video.media.object_user}
 */
proto.snail_video.media.request_register.prototype.getUser = function() {
  return /** @type{proto.snail_video.media.object_user} */ (
    jspb.Message.getWrapperField(this, proto.snail_video.media.object_user, 1));
};


/** @param {proto.snail_video.media.object_user|undefined} value  */
proto.snail_video.media.request_register.prototype.setUser = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.snail_video.media.request_register.prototype.clearUser = function() {
  this.setUser(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.snail_video.media.request_register.prototype.hasUser = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes loginseq = 2;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getLoginseq = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes loginseq = 2;
 * This is a type-conversion wrapper around `getLoginseq()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getLoginseq_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getLoginseq()));
};


/**
 * optional bytes loginseq = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getLoginseq()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getLoginseq_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getLoginseq()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setLoginseq = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bytes version = 3;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getVersion = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/**
 * optional bytes version = 3;
 * This is a type-conversion wrapper around `getVersion()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getVersion_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getVersion()));
};


/**
 * optional bytes version = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getVersion()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getVersion_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getVersion()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setVersion = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional bytes roomid = 4;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getRoomid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 4, ""));
};


/**
 * optional bytes roomid = 4;
 * This is a type-conversion wrapper around `getRoomid()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getRoomid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getRoomid()));
};


/**
 * optional bytes roomid = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getRoomid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getRoomid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getRoomid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setRoomid = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * repeated object_keyvalue attrs = 5;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.request_register.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 5));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.request_register.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 5, value);
};


proto.snail_video.media.request_register.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};


/**
 * optional bytes ordermode = 6;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getOrdermode = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 6, ""));
};


/**
 * optional bytes ordermode = 6;
 * This is a type-conversion wrapper around `getOrdermode()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getOrdermode_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOrdermode()));
};


/**
 * optional bytes ordermode = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrdermode()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getOrdermode_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOrdermode()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setOrdermode = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional bytes notify = 7;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getNotify = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 7, ""));
};


/**
 * optional bytes notify = 7;
 * This is a type-conversion wrapper around `getNotify()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getNotify_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getNotify()));
};


/**
 * optional bytes notify = 7;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getNotify()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getNotify_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getNotify()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setNotify = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional bytes serverdata = 8;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getServerdata = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 8, ""));
};


/**
 * optional bytes serverdata = 8;
 * This is a type-conversion wrapper around `getServerdata()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getServerdata_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getServerdata()));
};


/**
 * optional bytes serverdata = 8;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getServerdata()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getServerdata_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getServerdata()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setServerdata = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional bytes server_ip = 9;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_register.prototype.getServerIp = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 9, ""));
};


/**
 * optional bytes server_ip = 9;
 * This is a type-conversion wrapper around `getServerIp()`
 * @return {string}
 */
proto.snail_video.media.request_register.prototype.getServerIp_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getServerIp()));
};


/**
 * optional bytes server_ip = 9;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getServerIp()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_register.prototype.getServerIp_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getServerIp()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_register.prototype.setServerIp = function(value) {
  jspb.Message.setField(this, 9, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_register = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.respond_register.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.respond_register, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_register.displayName = 'proto.snail_video.media.respond_register';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.respond_register.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_register.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_register.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_register} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_register.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.snail_video.media.object_user.toObject, includeInstance),
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance),
    severCurrentTime: msg.getSeverCurrentTime(),
    startedTime: msg.getStartedTime()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_register}
 */
proto.snail_video.media.respond_register.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_register;
  return proto.snail_video.media.respond_register.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_register} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_register}
 */
proto.snail_video.media.respond_register.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_user;
      reader.readMessage(value,proto.snail_video.media.object_user.deserializeBinaryFromReader);
      msg.getUsersList().push(value);
      msg.setUsersList(msg.getUsersList());
      break;
    case 2:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    case 3:
      var value = /** @type {number} */ (reader.readSint64());
      msg.setSeverCurrentTime(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setStartedTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_register} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_register.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_register.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_register.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_user.serializeBinaryToWriter
    );
  }
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
  f = this.getSeverCurrentTime();
  if (f !== 0) {
    writer.writeSint64(
      3,
      f
    );
  }
  f = this.getStartedTime();
  if (f !== 0) {
    writer.writeSint32(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_register} The clone.
 */
proto.snail_video.media.respond_register.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_register} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_user users = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_user>}
 */
proto.snail_video.media.respond_register.prototype.getUsersList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_user>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_user, 1));
};


/** @param {Array.<!proto.snail_video.media.object_user>} value  */
proto.snail_video.media.respond_register.prototype.setUsersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.respond_register.prototype.clearUsersList = function() {
  this.setUsersList([]);
};


/**
 * repeated object_keyvalue attrs = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.respond_register.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 2));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.respond_register.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.snail_video.media.respond_register.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};


/**
 * optional sint64 sever_current_time = 3;
 * @return {number}
 */
proto.snail_video.media.respond_register.prototype.getSeverCurrentTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 3, 0));
};


/** @param {number} value  */
proto.snail_video.media.respond_register.prototype.setSeverCurrentTime = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional sint32 started_time = 4;
 * @return {number}
 */
proto.snail_video.media.respond_register.prototype.getStartedTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 4, 0));
};


/** @param {number} value  */
proto.snail_video.media.respond_register.prototype.setStartedTime = function(value) {
  jspb.Message.setField(this, 4, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_user_status = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.notify_user_status.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.notify_user_status, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_user_status.displayName = 'proto.snail_video.media.notify_user_status';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.notify_user_status.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_user_status.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_user_status.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_user_status} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_user_status.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.snail_video.media.object_user.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_user_status}
 */
proto.snail_video.media.notify_user_status.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_user_status;
  return proto.snail_video.media.notify_user_status.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_user_status} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_user_status}
 */
proto.snail_video.media.notify_user_status.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_user;
      reader.readMessage(value,proto.snail_video.media.object_user.deserializeBinaryFromReader);
      msg.getUsersList().push(value);
      msg.setUsersList(msg.getUsersList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_user_status} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_user_status.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_user_status.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_user_status.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_user.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_user_status} The clone.
 */
proto.snail_video.media.notify_user_status.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_user_status} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_user users = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_user>}
 */
proto.snail_video.media.notify_user_status.prototype.getUsersList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_user>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_user, 1));
};


/** @param {Array.<!proto.snail_video.media.object_user>} value  */
proto.snail_video.media.notify_user_status.prototype.setUsersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.notify_user_status.prototype.clearUsersList = function() {
  this.setUsersList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_add_participant = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_add_participant.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_add_participant, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_add_participant.displayName = 'proto.snail_video.media.request_add_participant';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_add_participant.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_add_participant.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_add_participant.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_add_participant} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_add_participant.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.snail_video.media.object_user.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_add_participant}
 */
proto.snail_video.media.request_add_participant.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_add_participant;
  return proto.snail_video.media.request_add_participant.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_add_participant} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_add_participant}
 */
proto.snail_video.media.request_add_participant.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_user;
      reader.readMessage(value,proto.snail_video.media.object_user.deserializeBinaryFromReader);
      msg.getUsersList().push(value);
      msg.setUsersList(msg.getUsersList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_add_participant} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_add_participant.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_add_participant.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_add_participant.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_user.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_add_participant} The clone.
 */
proto.snail_video.media.request_add_participant.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_add_participant} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_user users = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_user>}
 */
proto.snail_video.media.request_add_participant.prototype.getUsersList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_user>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_user, 1));
};


/** @param {Array.<!proto.snail_video.media.object_user>} value  */
proto.snail_video.media.request_add_participant.prototype.setUsersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.request_add_participant.prototype.clearUsersList = function() {
  this.setUsersList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_add_participant = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.respond_add_participant.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.respond_add_participant, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_add_participant.displayName = 'proto.snail_video.media.respond_add_participant';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.respond_add_participant.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_add_participant.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_add_participant.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_add_participant} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_add_participant.toObject = function(includeInstance, msg) {
  var f, obj = {
    usersList: jspb.Message.toObjectList(msg.getUsersList(),
    proto.snail_video.media.object_user.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_add_participant}
 */
proto.snail_video.media.respond_add_participant.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_add_participant;
  return proto.snail_video.media.respond_add_participant.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_add_participant} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_add_participant}
 */
proto.snail_video.media.respond_add_participant.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_user;
      reader.readMessage(value,proto.snail_video.media.object_user.deserializeBinaryFromReader);
      msg.getUsersList().push(value);
      msg.setUsersList(msg.getUsersList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_add_participant} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_add_participant.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_add_participant.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_add_participant.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getUsersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_user.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_add_participant} The clone.
 */
proto.snail_video.media.respond_add_participant.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_add_participant} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_user users = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_user>}
 */
proto.snail_video.media.respond_add_participant.prototype.getUsersList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_user>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_user, 1));
};


/** @param {Array.<!proto.snail_video.media.object_user>} value  */
proto.snail_video.media.respond_add_participant.prototype.setUsersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.respond_add_participant.prototype.clearUsersList = function() {
  this.setUsersList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_webrtc_command = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.notify_webrtc_command, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_webrtc_command.displayName = 'proto.snail_video.media.notify_webrtc_command';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_webrtc_command.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_webrtc_command.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_webrtc_command} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_webrtc_command.toObject = function(includeInstance, msg) {
  var f, obj = {
    fromid: msg.getFromid_asB64(),
    toid: msg.getToid_asB64(),
    msgtype: msg.getMsgtype_asB64(),
    rtcmsg: (f = msg.getRtcmsg()) && proto.snail_video.media.object_webrtc_msg.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_webrtc_command}
 */
proto.snail_video.media.notify_webrtc_command.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_webrtc_command;
  return proto.snail_video.media.notify_webrtc_command.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_webrtc_command} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_webrtc_command}
 */
proto.snail_video.media.notify_webrtc_command.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFromid(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setToid(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMsgtype(value);
      break;
    case 4:
      var value = new proto.snail_video.media.object_webrtc_msg;
      reader.readMessage(value,proto.snail_video.media.object_webrtc_msg.deserializeBinaryFromReader);
      msg.setRtcmsg(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_webrtc_command} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_webrtc_command.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_webrtc_command.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_webrtc_command.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getFromid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getToid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getMsgtype_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = this.getRtcmsg();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.snail_video.media.object_webrtc_msg.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_webrtc_command} The clone.
 */
proto.snail_video.media.notify_webrtc_command.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_webrtc_command} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes fromid = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getFromid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes fromid = 1;
 * This is a type-conversion wrapper around `getFromid()`
 * @return {string}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getFromid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFromid()));
};


/**
 * optional bytes fromid = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFromid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getFromid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFromid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_webrtc_command.prototype.setFromid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes toid = 2;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getToid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes toid = 2;
 * This is a type-conversion wrapper around `getToid()`
 * @return {string}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getToid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getToid()));
};


/**
 * optional bytes toid = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getToid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getToid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getToid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_webrtc_command.prototype.setToid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bytes msgtype = 3;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getMsgtype = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/**
 * optional bytes msgtype = 3;
 * This is a type-conversion wrapper around `getMsgtype()`
 * @return {string}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getMsgtype_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMsgtype()));
};


/**
 * optional bytes msgtype = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMsgtype()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getMsgtype_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMsgtype()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_webrtc_command.prototype.setMsgtype = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional object_webrtc_msg rtcmsg = 4;
 * @return {proto.snail_video.media.object_webrtc_msg}
 */
proto.snail_video.media.notify_webrtc_command.prototype.getRtcmsg = function() {
  return /** @type{proto.snail_video.media.object_webrtc_msg} */ (
    jspb.Message.getWrapperField(this, proto.snail_video.media.object_webrtc_msg, 4));
};


/** @param {proto.snail_video.media.object_webrtc_msg|undefined} value  */
proto.snail_video.media.notify_webrtc_command.prototype.setRtcmsg = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.snail_video.media.notify_webrtc_command.prototype.clearRtcmsg = function() {
  this.setRtcmsg(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.snail_video.media.notify_webrtc_command.prototype.hasRtcmsg = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_setuserattrs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_setuserattrs.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_setuserattrs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_setuserattrs.displayName = 'proto.snail_video.media.request_setuserattrs';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_setuserattrs.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_setuserattrs.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_setuserattrs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_setuserattrs} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_setuserattrs.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientid: msg.getClientid_asB64(),
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_setuserattrs}
 */
proto.snail_video.media.request_setuserattrs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_setuserattrs;
  return proto.snail_video.media.request_setuserattrs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_setuserattrs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_setuserattrs}
 */
proto.snail_video.media.request_setuserattrs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setClientid(value);
      break;
    case 2:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_setuserattrs} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_setuserattrs.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_setuserattrs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_setuserattrs.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClientid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_setuserattrs} The clone.
 */
proto.snail_video.media.request_setuserattrs.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_setuserattrs} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes clientid = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.request_setuserattrs.prototype.getClientid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes clientid = 1;
 * This is a type-conversion wrapper around `getClientid()`
 * @return {string}
 */
proto.snail_video.media.request_setuserattrs.prototype.getClientid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getClientid()));
};


/**
 * optional bytes clientid = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getClientid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_setuserattrs.prototype.getClientid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getClientid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.request_setuserattrs.prototype.setClientid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated object_keyvalue attrs = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.request_setuserattrs.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 2));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.request_setuserattrs.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.snail_video.media.request_setuserattrs.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_setuserattrs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.respond_setuserattrs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_setuserattrs.displayName = 'proto.snail_video.media.respond_setuserattrs';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_setuserattrs.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_setuserattrs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_setuserattrs} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_setuserattrs.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_setuserattrs}
 */
proto.snail_video.media.respond_setuserattrs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_setuserattrs;
  return proto.snail_video.media.respond_setuserattrs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_setuserattrs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_setuserattrs}
 */
proto.snail_video.media.respond_setuserattrs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_setuserattrs} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_setuserattrs.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_setuserattrs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_setuserattrs.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_setuserattrs} The clone.
 */
proto.snail_video.media.respond_setuserattrs.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_setuserattrs} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_setuserattrs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.notify_setuserattrs.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.notify_setuserattrs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_setuserattrs.displayName = 'proto.snail_video.media.notify_setuserattrs';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.notify_setuserattrs.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_setuserattrs.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_setuserattrs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_setuserattrs} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_setuserattrs.toObject = function(includeInstance, msg) {
  var f, obj = {
    clientid: msg.getClientid_asB64(),
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_setuserattrs}
 */
proto.snail_video.media.notify_setuserattrs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_setuserattrs;
  return proto.snail_video.media.notify_setuserattrs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_setuserattrs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_setuserattrs}
 */
proto.snail_video.media.notify_setuserattrs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setClientid(value);
      break;
    case 2:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_setuserattrs} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_setuserattrs.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_setuserattrs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_setuserattrs.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getClientid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_setuserattrs} The clone.
 */
proto.snail_video.media.notify_setuserattrs.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_setuserattrs} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes clientid = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_setuserattrs.prototype.getClientid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes clientid = 1;
 * This is a type-conversion wrapper around `getClientid()`
 * @return {string}
 */
proto.snail_video.media.notify_setuserattrs.prototype.getClientid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getClientid()));
};


/**
 * optional bytes clientid = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getClientid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_setuserattrs.prototype.getClientid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getClientid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_setuserattrs.prototype.setClientid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * repeated object_keyvalue attrs = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.notify_setuserattrs.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 2));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.notify_setuserattrs.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 2, value);
};


proto.snail_video.media.notify_setuserattrs.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_setroomattrs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_setroomattrs.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_setroomattrs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_setroomattrs.displayName = 'proto.snail_video.media.request_setroomattrs';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_setroomattrs.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_setroomattrs.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_setroomattrs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_setroomattrs} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_setroomattrs.toObject = function(includeInstance, msg) {
  var f, obj = {
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_setroomattrs}
 */
proto.snail_video.media.request_setroomattrs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_setroomattrs;
  return proto.snail_video.media.request_setroomattrs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_setroomattrs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_setroomattrs}
 */
proto.snail_video.media.request_setroomattrs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_setroomattrs} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_setroomattrs.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_setroomattrs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_setroomattrs.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_setroomattrs} The clone.
 */
proto.snail_video.media.request_setroomattrs.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_setroomattrs} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_keyvalue attrs = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.request_setroomattrs.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 1));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.request_setroomattrs.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.request_setroomattrs.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_setroomattrs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.respond_setroomattrs.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.respond_setroomattrs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_setroomattrs.displayName = 'proto.snail_video.media.respond_setroomattrs';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.respond_setroomattrs.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_setroomattrs.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_setroomattrs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_setroomattrs} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_setroomattrs.toObject = function(includeInstance, msg) {
  var f, obj = {
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_setroomattrs}
 */
proto.snail_video.media.respond_setroomattrs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_setroomattrs;
  return proto.snail_video.media.respond_setroomattrs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_setroomattrs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_setroomattrs}
 */
proto.snail_video.media.respond_setroomattrs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_setroomattrs} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_setroomattrs.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_setroomattrs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_setroomattrs.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_setroomattrs} The clone.
 */
proto.snail_video.media.respond_setroomattrs.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_setroomattrs} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_keyvalue attrs = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.respond_setroomattrs.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 1));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.respond_setroomattrs.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.respond_setroomattrs.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_setroomattrs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.notify_setroomattrs.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.notify_setroomattrs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_setroomattrs.displayName = 'proto.snail_video.media.notify_setroomattrs';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.notify_setroomattrs.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_setroomattrs.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_setroomattrs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_setroomattrs} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_setroomattrs.toObject = function(includeInstance, msg) {
  var f, obj = {
    attrsList: jspb.Message.toObjectList(msg.getAttrsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_setroomattrs}
 */
proto.snail_video.media.notify_setroomattrs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_setroomattrs;
  return proto.snail_video.media.notify_setroomattrs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_setroomattrs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_setroomattrs}
 */
proto.snail_video.media.notify_setroomattrs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getAttrsList().push(value);
      msg.setAttrsList(msg.getAttrsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_setroomattrs} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_setroomattrs.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_setroomattrs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_setroomattrs.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getAttrsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_setroomattrs} The clone.
 */
proto.snail_video.media.notify_setroomattrs.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_setroomattrs} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_keyvalue attrs = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.notify_setroomattrs.prototype.getAttrsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 1));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.notify_setroomattrs.prototype.setAttrsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.notify_setroomattrs.prototype.clearAttrsList = function() {
  this.setAttrsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_update_media = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_update_media.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_update_media, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_update_media.displayName = 'proto.snail_video.media.request_update_media';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_update_media.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_update_media.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_update_media.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_update_media} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_update_media.toObject = function(includeInstance, msg) {
  var f, obj = {
    mediasList: jspb.Message.toObjectList(msg.getMediasList(),
    proto.snail_video.media.object_media.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_update_media}
 */
proto.snail_video.media.request_update_media.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_update_media;
  return proto.snail_video.media.request_update_media.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_update_media} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_update_media}
 */
proto.snail_video.media.request_update_media.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_media;
      reader.readMessage(value,proto.snail_video.media.object_media.deserializeBinaryFromReader);
      msg.getMediasList().push(value);
      msg.setMediasList(msg.getMediasList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_update_media} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_update_media.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_update_media.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_update_media.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMediasList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_media.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_update_media} The clone.
 */
proto.snail_video.media.request_update_media.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_update_media} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_media medias = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_media>}
 */
proto.snail_video.media.request_update_media.prototype.getMediasList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_media>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_media, 1));
};


/** @param {Array.<!proto.snail_video.media.object_media>} value  */
proto.snail_video.media.request_update_media.prototype.setMediasList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.request_update_media.prototype.clearMediasList = function() {
  this.setMediasList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_update_media = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.respond_update_media.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.respond_update_media, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_update_media.displayName = 'proto.snail_video.media.respond_update_media';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.respond_update_media.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_update_media.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_update_media.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_update_media} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_update_media.toObject = function(includeInstance, msg) {
  var f, obj = {
    mediasList: jspb.Message.toObjectList(msg.getMediasList(),
    proto.snail_video.media.object_media.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_update_media}
 */
proto.snail_video.media.respond_update_media.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_update_media;
  return proto.snail_video.media.respond_update_media.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_update_media} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_update_media}
 */
proto.snail_video.media.respond_update_media.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_media;
      reader.readMessage(value,proto.snail_video.media.object_media.deserializeBinaryFromReader);
      msg.getMediasList().push(value);
      msg.setMediasList(msg.getMediasList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_update_media} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_update_media.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_update_media.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_update_media.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMediasList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_media.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_update_media} The clone.
 */
proto.snail_video.media.respond_update_media.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_update_media} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_media medias = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_media>}
 */
proto.snail_video.media.respond_update_media.prototype.getMediasList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_media>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_media, 1));
};


/** @param {Array.<!proto.snail_video.media.object_media>} value  */
proto.snail_video.media.respond_update_media.prototype.setMediasList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.respond_update_media.prototype.clearMediasList = function() {
  this.setMediasList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_cancel_publish = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.notify_cancel_publish, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_cancel_publish.displayName = 'proto.snail_video.media.notify_cancel_publish';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_cancel_publish.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_cancel_publish.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_cancel_publish} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_cancel_publish.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_cancel_publish}
 */
proto.snail_video.media.notify_cancel_publish.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_cancel_publish;
  return proto.snail_video.media.notify_cancel_publish.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_cancel_publish} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_cancel_publish}
 */
proto.snail_video.media.notify_cancel_publish.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_cancel_publish} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_cancel_publish.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_cancel_publish.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_cancel_publish.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_cancel_publish} The clone.
 */
proto.snail_video.media.notify_cancel_publish.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_cancel_publish} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_set_media_attr = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.request_set_media_attr, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_set_media_attr.displayName = 'proto.snail_video.media.request_set_media_attr';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_set_media_attr.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_set_media_attr.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_set_media_attr} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_set_media_attr.toObject = function(includeInstance, msg) {
  var f, obj = {
    media: (f = msg.getMedia()) && proto.snail_video.media.object_media.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_set_media_attr}
 */
proto.snail_video.media.request_set_media_attr.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_set_media_attr;
  return proto.snail_video.media.request_set_media_attr.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_set_media_attr} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_set_media_attr}
 */
proto.snail_video.media.request_set_media_attr.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_media;
      reader.readMessage(value,proto.snail_video.media.object_media.deserializeBinaryFromReader);
      msg.setMedia(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_set_media_attr} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_set_media_attr.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_set_media_attr.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_set_media_attr.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMedia();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.snail_video.media.object_media.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_set_media_attr} The clone.
 */
proto.snail_video.media.request_set_media_attr.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_set_media_attr} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional object_media media = 1;
 * @return {proto.snail_video.media.object_media}
 */
proto.snail_video.media.request_set_media_attr.prototype.getMedia = function() {
  return /** @type{proto.snail_video.media.object_media} */ (
    jspb.Message.getWrapperField(this, proto.snail_video.media.object_media, 1));
};


/** @param {proto.snail_video.media.object_media|undefined} value  */
proto.snail_video.media.request_set_media_attr.prototype.setMedia = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.snail_video.media.request_set_media_attr.prototype.clearMedia = function() {
  this.setMedia(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.snail_video.media.request_set_media_attr.prototype.hasMedia = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_set_media_attr = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.respond_set_media_attr, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_set_media_attr.displayName = 'proto.snail_video.media.respond_set_media_attr';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_set_media_attr.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_set_media_attr.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_set_media_attr} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_set_media_attr.toObject = function(includeInstance, msg) {
  var f, obj = {
    media: (f = msg.getMedia()) && proto.snail_video.media.object_media.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_set_media_attr}
 */
proto.snail_video.media.respond_set_media_attr.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_set_media_attr;
  return proto.snail_video.media.respond_set_media_attr.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_set_media_attr} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_set_media_attr}
 */
proto.snail_video.media.respond_set_media_attr.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_media;
      reader.readMessage(value,proto.snail_video.media.object_media.deserializeBinaryFromReader);
      msg.setMedia(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_set_media_attr} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_set_media_attr.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_set_media_attr.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_set_media_attr.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getMedia();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.snail_video.media.object_media.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_set_media_attr} The clone.
 */
proto.snail_video.media.respond_set_media_attr.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_set_media_attr} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional object_media media = 1;
 * @return {proto.snail_video.media.object_media}
 */
proto.snail_video.media.respond_set_media_attr.prototype.getMedia = function() {
  return /** @type{proto.snail_video.media.object_media} */ (
    jspb.Message.getWrapperField(this, proto.snail_video.media.object_media, 1));
};


/** @param {proto.snail_video.media.object_media|undefined} value  */
proto.snail_video.media.respond_set_media_attr.prototype.setMedia = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.snail_video.media.respond_set_media_attr.prototype.clearMedia = function() {
  this.setMedia(undefined);
};


/**
 * Returns whether this field is set.
 * @return{!boolean}
 */
proto.snail_video.media.respond_set_media_attr.prototype.hasMedia = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_order_unorder = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_order_unorder.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_order_unorder, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_order_unorder.displayName = 'proto.snail_video.media.request_order_unorder';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_order_unorder.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_order_unorder.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_order_unorder.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_order_unorder} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_order_unorder.toObject = function(includeInstance, msg) {
  var f, obj = {
    ordersList: msg.getOrdersList_asB64(),
    unordersList: msg.getUnordersList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_order_unorder}
 */
proto.snail_video.media.request_order_unorder.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_order_unorder;
  return proto.snail_video.media.request_order_unorder.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_order_unorder} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_order_unorder}
 */
proto.snail_video.media.request_order_unorder.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.getOrdersList().push(value);
      msg.setOrdersList(msg.getOrdersList());
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.getUnordersList().push(value);
      msg.setUnordersList(msg.getUnordersList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_order_unorder} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_order_unorder.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_order_unorder.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_order_unorder.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getOrdersList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      1,
      f
    );
  }
  f = this.getUnordersList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_order_unorder} The clone.
 */
proto.snail_video.media.request_order_unorder.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_order_unorder} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated bytes orders = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.snail_video.media.request_order_unorder.prototype.getOrdersList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getField(this, 1));
};


/**
 * repeated bytes orders = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * This is a type-conversion wrapper around `getOrdersList()`
 * @return {!Array.<string>}
 */
proto.snail_video.media.request_order_unorder.prototype.getOrdersList_asB64 = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.bytesListAsB64(
      this.getOrdersList()));
};


/**
 * repeated bytes orders = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrdersList()`
 * @return {!Array.<!Uint8Array>}
 */
proto.snail_video.media.request_order_unorder.prototype.getOrdersList_asU8 = function() {
  return /** @type {!Array.<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getOrdersList()));
};


/** @param {!(Array<!Uint8Array>|Array<string>)} value  */
proto.snail_video.media.request_order_unorder.prototype.setOrdersList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


proto.snail_video.media.request_order_unorder.prototype.clearOrdersList = function() {
  jspb.Message.setField(this, 1, []);
};


/**
 * repeated bytes unorders = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.snail_video.media.request_order_unorder.prototype.getUnordersList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getField(this, 2));
};


/**
 * repeated bytes unorders = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * This is a type-conversion wrapper around `getUnordersList()`
 * @return {!Array.<string>}
 */
proto.snail_video.media.request_order_unorder.prototype.getUnordersList_asB64 = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.bytesListAsB64(
      this.getUnordersList()));
};


/**
 * repeated bytes unorders = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getUnordersList()`
 * @return {!Array.<!Uint8Array>}
 */
proto.snail_video.media.request_order_unorder.prototype.getUnordersList_asU8 = function() {
  return /** @type {!Array.<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getUnordersList()));
};


/** @param {!(Array<!Uint8Array>|Array<string>)} value  */
proto.snail_video.media.request_order_unorder.prototype.setUnordersList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


proto.snail_video.media.request_order_unorder.prototype.clearUnordersList = function() {
  jspb.Message.setField(this, 2, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.respond_order_unorder = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.respond_order_unorder, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.respond_order_unorder.displayName = 'proto.snail_video.media.respond_order_unorder';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.respond_order_unorder.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.respond_order_unorder.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.respond_order_unorder} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.respond_order_unorder.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.respond_order_unorder}
 */
proto.snail_video.media.respond_order_unorder.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.respond_order_unorder;
  return proto.snail_video.media.respond_order_unorder.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.respond_order_unorder} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.respond_order_unorder}
 */
proto.snail_video.media.respond_order_unorder.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.respond_order_unorder} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_order_unorder.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.respond_order_unorder.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.respond_order_unorder.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.respond_order_unorder} The clone.
 */
proto.snail_video.media.respond_order_unorder.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.respond_order_unorder} */ (jspb.Message.cloneMessage(this));
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.request_order_streams = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.request_order_streams.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.request_order_streams, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.request_order_streams.displayName = 'proto.snail_video.media.request_order_streams';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.request_order_streams.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.request_order_streams.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.request_order_streams.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.request_order_streams} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.request_order_streams.toObject = function(includeInstance, msg) {
  var f, obj = {
    ordersList: msg.getOrdersList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.request_order_streams}
 */
proto.snail_video.media.request_order_streams.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.request_order_streams;
  return proto.snail_video.media.request_order_streams.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.request_order_streams} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.request_order_streams}
 */
proto.snail_video.media.request_order_streams.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.getOrdersList().push(value);
      msg.setOrdersList(msg.getOrdersList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.request_order_streams} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_order_streams.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.request_order_streams.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.request_order_streams.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getOrdersList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.request_order_streams} The clone.
 */
proto.snail_video.media.request_order_streams.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.request_order_streams} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated bytes orders = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.snail_video.media.request_order_streams.prototype.getOrdersList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getField(this, 1));
};


/**
 * repeated bytes orders = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * This is a type-conversion wrapper around `getOrdersList()`
 * @return {!Array.<string>}
 */
proto.snail_video.media.request_order_streams.prototype.getOrdersList_asB64 = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.bytesListAsB64(
      this.getOrdersList()));
};


/**
 * repeated bytes orders = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOrdersList()`
 * @return {!Array.<!Uint8Array>}
 */
proto.snail_video.media.request_order_streams.prototype.getOrdersList_asU8 = function() {
  return /** @type {!Array.<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getOrdersList()));
};


/** @param {!(Array<!Uint8Array>|Array<string>)} value  */
proto.snail_video.media.request_order_streams.prototype.setOrdersList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


proto.snail_video.media.request_order_streams.prototype.clearOrdersList = function() {
  jspb.Message.setField(this, 1, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_bind_streams = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.notify_bind_streams.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.notify_bind_streams, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_bind_streams.displayName = 'proto.snail_video.media.notify_bind_streams';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.notify_bind_streams.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_bind_streams.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_bind_streams.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_bind_streams} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_bind_streams.toObject = function(includeInstance, msg) {
  var f, obj = {
    streamsList: jspb.Message.toObjectList(msg.getStreamsList(),
    proto.snail_video.media.object_keyvalue.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_bind_streams}
 */
proto.snail_video.media.notify_bind_streams.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_bind_streams;
  return proto.snail_video.media.notify_bind_streams.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_bind_streams} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_bind_streams}
 */
proto.snail_video.media.notify_bind_streams.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.snail_video.media.object_keyvalue;
      reader.readMessage(value,proto.snail_video.media.object_keyvalue.deserializeBinaryFromReader);
      msg.getStreamsList().push(value);
      msg.setStreamsList(msg.getStreamsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_bind_streams} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_bind_streams.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_bind_streams.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_bind_streams.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getStreamsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.snail_video.media.object_keyvalue.serializeBinaryToWriter
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_bind_streams} The clone.
 */
proto.snail_video.media.notify_bind_streams.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_bind_streams} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated object_keyvalue streams = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.snail_video.media.object_keyvalue>}
 */
proto.snail_video.media.notify_bind_streams.prototype.getStreamsList = function() {
  return /** @type{!Array.<!proto.snail_video.media.object_keyvalue>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.snail_video.media.object_keyvalue, 1));
};


/** @param {Array.<!proto.snail_video.media.object_keyvalue>} value  */
proto.snail_video.media.notify_bind_streams.prototype.setStreamsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


proto.snail_video.media.notify_bind_streams.prototype.clearStreamsList = function() {
  this.setStreamsList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_media_ctrl = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.snail_video.media.notify_media_ctrl.repeatedFields_, null);
};
goog.inherits(proto.snail_video.media.notify_media_ctrl, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_media_ctrl.displayName = 'proto.snail_video.media.notify_media_ctrl';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.snail_video.media.notify_media_ctrl.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_media_ctrl.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_media_ctrl.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_media_ctrl} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_media_ctrl.toObject = function(includeInstance, msg) {
  var f, obj = {
    actionsList: jspb.Message.getField(msg, 1),
    paramsList: msg.getParamsList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_media_ctrl}
 */
proto.snail_video.media.notify_media_ctrl.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_media_ctrl;
  return proto.snail_video.media.notify_media_ctrl.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_media_ctrl} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_media_ctrl}
 */
proto.snail_video.media.notify_media_ctrl.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Array.<number>} */ (reader.readPackedSint32());
      msg.setActionsList(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.getParamsList().push(value);
      msg.setParamsList(msg.getParamsList());
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_media_ctrl} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_media_ctrl.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_media_ctrl.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_media_ctrl.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getActionsList();
  if (f.length > 0) {
    writer.writePackedSint32(
      1,
      f
    );
  }
  f = this.getParamsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_media_ctrl} The clone.
 */
proto.snail_video.media.notify_media_ctrl.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_media_ctrl} */ (jspb.Message.cloneMessage(this));
};


/**
 * repeated sint32 actions = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<number>}
 */
proto.snail_video.media.notify_media_ctrl.prototype.getActionsList = function() {
  return /** @type {!Array.<number>} */ (jspb.Message.getField(this, 1));
};


/** @param {Array.<number>} value  */
proto.snail_video.media.notify_media_ctrl.prototype.setActionsList = function(value) {
  jspb.Message.setField(this, 1, value || []);
};


proto.snail_video.media.notify_media_ctrl.prototype.clearActionsList = function() {
  jspb.Message.setField(this, 1, []);
};


/**
 * repeated bytes params = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.snail_video.media.notify_media_ctrl.prototype.getParamsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getField(this, 2));
};


/**
 * repeated bytes params = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * This is a type-conversion wrapper around `getParamsList()`
 * @return {!Array.<string>}
 */
proto.snail_video.media.notify_media_ctrl.prototype.getParamsList_asB64 = function() {
  return /** @type {!Array.<string>} */ (jspb.Message.bytesListAsB64(
      this.getParamsList()));
};


/**
 * repeated bytes params = 2;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getParamsList()`
 * @return {!Array.<!Uint8Array>}
 */
proto.snail_video.media.notify_media_ctrl.prototype.getParamsList_asU8 = function() {
  return /** @type {!Array.<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getParamsList()));
};


/** @param {!(Array<!Uint8Array>|Array<string>)} value  */
proto.snail_video.media.notify_media_ctrl.prototype.setParamsList = function(value) {
  jspb.Message.setField(this, 2, value || []);
};


proto.snail_video.media.notify_media_ctrl.prototype.clearParamsList = function() {
  jspb.Message.setField(this, 2, []);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_request_relogin = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.notify_request_relogin, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_request_relogin.displayName = 'proto.snail_video.media.notify_request_relogin';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_request_relogin.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_request_relogin.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_request_relogin} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_request_relogin.toObject = function(includeInstance, msg) {
  var f, obj = {
    reson: msg.getReson()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_request_relogin}
 */
proto.snail_video.media.notify_request_relogin.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_request_relogin;
  return proto.snail_video.media.notify_request_relogin.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_request_relogin} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_request_relogin}
 */
proto.snail_video.media.notify_request_relogin.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readSint32());
      msg.setReson(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_request_relogin} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_request_relogin.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_request_relogin.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_request_relogin.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getReson();
  if (f !== 0) {
    writer.writeSint32(
      1,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_request_relogin} The clone.
 */
proto.snail_video.media.notify_request_relogin.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_request_relogin} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional sint32 reson = 1;
 * @return {number}
 */
proto.snail_video.media.notify_request_relogin.prototype.getReson = function() {
  return /** @type {number} */ (jspb.Message.getFieldProto3(this, 1, 0));
};


/** @param {number} value  */
proto.snail_video.media.notify_request_relogin.prototype.setReson = function(value) {
  jspb.Message.setField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.snail_video.media.notify_send_msg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.snail_video.media.notify_send_msg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.snail_video.media.notify_send_msg.displayName = 'proto.snail_video.media.notify_send_msg';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.snail_video.media.notify_send_msg.prototype.toObject = function(opt_includeInstance) {
  return proto.snail_video.media.notify_send_msg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.snail_video.media.notify_send_msg} msg The msg instance to transform.
 * @return {!Object}
 */
proto.snail_video.media.notify_send_msg.toObject = function(includeInstance, msg) {
  var f, obj = {
    fromid: msg.getFromid_asB64(),
    toid: msg.getToid_asB64(),
    msgtype: msg.getMsgtype_asB64(),
    msg: msg.getMsg_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.snail_video.media.notify_send_msg}
 */
proto.snail_video.media.notify_send_msg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.snail_video.media.notify_send_msg;
  return proto.snail_video.media.notify_send_msg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.snail_video.media.notify_send_msg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.snail_video.media.notify_send_msg}
 */
proto.snail_video.media.notify_send_msg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFromid(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setToid(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMsgtype(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMsg(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Class method variant: serializes the given message to binary data
 * (in protobuf wire format), writing to the given BinaryWriter.
 * @param {!proto.snail_video.media.notify_send_msg} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_send_msg.serializeBinaryToWriter = function(message, writer) {
  message.serializeBinaryToWriter(writer);
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_send_msg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  this.serializeBinaryToWriter(writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the message to binary data (in protobuf wire format),
 * writing to the given BinaryWriter.
 * @param {!jspb.BinaryWriter} writer
 */
proto.snail_video.media.notify_send_msg.prototype.serializeBinaryToWriter = function (writer) {
  var f = undefined;
  f = this.getFromid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = this.getToid_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = this.getMsgtype_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = this.getMsg_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * Creates a deep clone of this proto. No data is shared with the original.
 * @return {!proto.snail_video.media.notify_send_msg} The clone.
 */
proto.snail_video.media.notify_send_msg.prototype.cloneMessage = function() {
  return /** @type {!proto.snail_video.media.notify_send_msg} */ (jspb.Message.cloneMessage(this));
};


/**
 * optional bytes fromid = 1;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_send_msg.prototype.getFromid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 1, ""));
};


/**
 * optional bytes fromid = 1;
 * This is a type-conversion wrapper around `getFromid()`
 * @return {string}
 */
proto.snail_video.media.notify_send_msg.prototype.getFromid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFromid()));
};


/**
 * optional bytes fromid = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFromid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_send_msg.prototype.getFromid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFromid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_send_msg.prototype.setFromid = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional bytes toid = 2;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_send_msg.prototype.getToid = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 2, ""));
};


/**
 * optional bytes toid = 2;
 * This is a type-conversion wrapper around `getToid()`
 * @return {string}
 */
proto.snail_video.media.notify_send_msg.prototype.getToid_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getToid()));
};


/**
 * optional bytes toid = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getToid()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_send_msg.prototype.getToid_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getToid()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_send_msg.prototype.setToid = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional bytes msgtype = 3;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_send_msg.prototype.getMsgtype = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 3, ""));
};


/**
 * optional bytes msgtype = 3;
 * This is a type-conversion wrapper around `getMsgtype()`
 * @return {string}
 */
proto.snail_video.media.notify_send_msg.prototype.getMsgtype_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMsgtype()));
};


/**
 * optional bytes msgtype = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMsgtype()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_send_msg.prototype.getMsgtype_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMsgtype()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_send_msg.prototype.setMsgtype = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional bytes msg = 4;
 * @return {!(string|Uint8Array)}
 */
proto.snail_video.media.notify_send_msg.prototype.getMsg = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldProto3(this, 4, ""));
};


/**
 * optional bytes msg = 4;
 * This is a type-conversion wrapper around `getMsg()`
 * @return {string}
 */
proto.snail_video.media.notify_send_msg.prototype.getMsg_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMsg()));
};


/**
 * optional bytes msg = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMsg()`
 * @return {!Uint8Array}
 */
proto.snail_video.media.notify_send_msg.prototype.getMsg_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMsg()));
};


/** @param {!(string|Uint8Array)} value  */
proto.snail_video.media.notify_send_msg.prototype.setMsg = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * @enum {number}
 */
proto.snail_video.media.eCmdC2S = {
  CMD_ECMDC2S_NONE: 0,
  CMD_PING: 1,
  CMD_REGISTER: 2,
  CMD_ADD_PARTICIPANT: 3,
  CMD_SETUSERATTRS: 4,
  CMD_SETROOMATTRS: 5,
  CMD_UPDATE_MEDIA: 6,
  CMD_SET_MEDIA_ATTR: 7,
  CMD_ORDER_UNORDER: 8,
  CMD_ORDER_STREAMS: 9,
  CMD_OLD_UPDATE_MEDIA: 10,
  CMD_REQUEST_END: 99,
  CMD_NOTIFY_USER_STATUS: 100,
  CMD_NOTIFY_SETUSERATTRS: 101,
  CMD_NOTIFY_SETROOMATTRS: 102,
  CMD_NOTIFY_MEDIA_CTRL: 103,
  CMD_NOTIFY_WEBRTC_COMMAND: 104,
  CMD_NOTIFY_REQUEST_RELOGIN: 105,
  CMD_NOTIFY_BIND_STREAMS: 106,
  CMD_NOTIFY_CANCEL_PUBLISH: 107,
  CMD_NOTIFY_ERROR: 250
};

/**
 * @enum {number}
 */
proto.snail_video.media.eMediaCtrlActs = {
  CTRL_ACT_NONE: 0,
  CTRL_ACT_SENDVIDEO: 1,
  CTRL_ACT_PAUSEVIDEO: 2,
  CTRL_ACT_SENDAUDIO: 4,
  CTRL_ACT_PAUSEAUDIO: 3,
  CTRL_ACT_SENDVIDEO1: 5,
  CTRL_ACT_PAUSEVIDEO1: 6
};

/**
 * @enum {number}
 */
proto.snail_video.media.eUserStatus = {
  ST_WAIT_JOIN: 0,
  ST_ONLINE: 1,
  ST_NET_BROKEN: 2,
  ST_LEFT: 3
};

/**
 * @enum {number}
 */
proto.snail_video.media.eReloginReson = {
  RESON_UNDEFINED: 0,
  RESON_SDP_ERROR: 1,
  RESON_LOGIC_ERROR: 2,
  RESON_P2P_TO_MANY: 3,
  RESON_RTP_TIMEOUT: 4
};

goog.object.extend(exports, proto.snail_video.media);


/***/ }),

/***/ "./src/protocol/protos.js":
/*!********************************!*\
  !*** ./src/protocol/protos.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * 对接 proto文件的桥梁
 */

 //import * as client2server_pb from "./client2server_pb.js";
 var client2server_pb = __webpack_require__(/*! ./client2server_pb.js */ "./src/protocol/client2server_pb.js");

module.exports.NewReqHeader = function () {
    
    if (client2server_pb == null || !client2server_pb) {
        return null;
    }

    return new proto.snail_video.media.request_client2Server_header();
}

module.exports.MakeReqHeader = function (sequence, session, token) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("create pb header fail");
        return null;
    }

    var ret = new proto.snail_video.media.request_client2Server_header();
    ret.setSn(sequence);
    ret.setToken(token);
    ret.setSessionkey(session);

    return ret;
}

module.exports.ParseRspHeader= function (body) {
    try {
        return new proto.snail_video.media.response_client2Server_header.deserializeBinary(body);
    } catch (err) {
        return null;
    }
}

module.exports.NewProtoObjectArray = function(name) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("client2server_pb require fail");
        return null;
    }

    if (name == "object_actions") {
        return [];//new Array<proto.snail_video.media.object_actions>(0);
    } else if (name == "object_keyvalue") {
        return [];// new Array<proto.snail_video.media.object_keyvalue>(0);
    } else if (name == "object_webrtc_msg") {
        return [];// new Array<proto.snail_video.media.object_webrtc_msg>(0);
    } else if (name == "object_user") {
        return [];// new Array<proto.snail_video.media.object_user>(0);
    } else if (name == "object_media") {
        return [];// new Array<proto.snail_video.media.object_media>(0);
    } else {
        return null;
    }
}

module.exports.NewProtoObject = function(name) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("client2server_pb require fail");
        return null;
    }

    if (name == "object_actions") {
        return new proto.snail_video.media.object_actions();
    } else if (name == "object_keyvalue") {
        return new proto.snail_video.media.object_keyvalue();
    } else if (name == "object_webrtc_msg") {
        return new proto.snail_video.media.object_webrtc_msg();
    } else if (name == "object_user") {
        return new proto.snail_video.media.object_user();
    } else if (name == "object_media") {
        return new proto.snail_video.media.object_media();
    }

    return null;
}

module.exports.NewProtoReq = function(cmdid) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("client2server_pb require fail");
        return null;
    }

    switch (cmdid) {
        case proto.snail_video.media.eCmdC2S.CMD_PING:
            return new proto.snail_video.media.request_ping();

        case proto.snail_video.media.eCmdC2S.CMD_REGISTER:
            return new proto.snail_video.media.request_register();

        case proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT:
            return new proto.snail_video.media.request_add_participant();

        case proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS:
            return new proto.snail_video.media.request_setuserattrs();

        case proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS:
            return new proto.snail_video.media.request_setroomattrs();

        case proto.snail_video.media.eCmdC2S.CMD_UPDATE_MEDIA:
            return new proto.snail_video.media.request_update_media();

        case proto.snail_video.media.eCmdC2S.CMD_SET_MEDIA_ATTR:
            return new proto.snail_video.media.request_set_media_attr();

        case proto.snail_video.media.eCmdC2S.CMD_ORDER_UNORDER:
            return new proto.snail_video.media.request_order_unorder();

        case proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS:
            return new proto.snail_video.media.request_order_streams();

        case proto.snail_video.media.eCmdC2S.CMD_OLD_UPDATE_MEDIA:
            return new proto.snail_video.media.request_update_media();

        case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_CANCEL_PUBLISH:
            return new proto.snail_video.media.notify_cancel_publish();

        default:
            console.log("unkown proto cmd ", cmdid);
            break;
    }

    return null;
}

module.exports.ParseProtoRsp = function (cmdid, body) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        return null;
    }

    try {
        switch (cmdid) {
            case proto.snail_video.media.eCmdC2S.CMD_PING:
                return new proto.snail_video.media.respond_ping.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_REGISTER:
                return new proto.snail_video.media.respond_register.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT:
                return new proto.snail_video.media.respond_add_participant.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS:
                return new proto.snail_video.media.respond_setuserattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS:
                return new proto.snail_video.media.respond_setroomattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_UPDATE_MEDIA:
                return new proto.snail_video.media.respond_update_media.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_SET_MEDIA_ATTR:
                return new proto.snail_video.media.respond_set_media_attr.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_ORDER_UNORDER:
                return new proto.snail_video.media.respond_order_unorder.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS:
                return new proto.snail_video.media.request_order_streams.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_OLD_UPDATE_MEDIA:
                return new proto.snail_video.media.respond_update_media.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_USER_STATUS:
                return new proto.snail_video.media.notify_user_status.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SETUSERATTRS:
                return new proto.snail_video.media.notify_setuserattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SETROOMATTRS:
                return new proto.snail_video.media.notify_setroomattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_MEDIA_CTRL:
                return new proto.snail_video.media.notify_media_ctrl.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_WEBRTC_COMMAND:
                return new proto.snail_video.media.notify_webrtc_command.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_REQUEST_RELOGIN:
                return new proto.snail_video.media.notify_request_relogin.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_BIND_STREAMS:
                return new proto.snail_video.media.notify_bind_streams.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_ERROR:
                return new proto.snail_video.media.notify_error.deserializeBinary(body);

            default:
                break;
        }
    } catch (err) {
        console.log(cmdid + " deserializeBinary catch an exception " + err);
        return null;
    }

    return null;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/IRtcClient.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":4}],2:[function(require,module,exports){

// let {defineProperty,MakeRtcClient} = require('./bundle.js');
// console.log(defineProperty,MakeRtcClient)
window.rtc = require('./bundle.js');


},{"./bundle.js":1}],3:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],4:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":3,"buffer":4,"ieee754":5}],5:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[2]);
