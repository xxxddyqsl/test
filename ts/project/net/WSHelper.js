"use strict";
exports.__esModule = true;
var MsgEntity_1 = require("../entity/MsgEntity");
var Packed = require("../protocol/Packer");
var ProtoHelper = require("../protocol/ProtoHelper");
var Protos = require("../protocol/Protocol");
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
        this._timeoutId = 0;
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
        this._socket = new WebSocket(url);
        this._url = url;
        this._socket.onopen = this._onOpen.bind(this);
        this._socket.onclose = this._onClose.bind(this);
        this._socket.onmessage = this._onMessage.bind(this);
        this._socket.onerror = this._onError.bind(this);
        return 0;
    };
    WSHelper.prototype.close = function () {
        console.log("websocket quit now ");
        this._netStatus = MsgEntity_1.ENetStatus.kNetStatus_Idle;
        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
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
        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }
        this._timeoutId = setInterval(this._pingLoop.bind(this), 10000);
        this._reportNetStatus(MsgEntity_1.ENetStatus.kNetStatus_Connected);
    };
    WSHelper.prototype._onClose = function (err) {
        console.log("socket onclose err:", err);
        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }
        this._reportNetStatus(MsgEntity_1.ENetStatus.kNetStatus_DisConnect, 1);
    };
    WSHelper.prototype._onError = function (err) {
        console.log("socket onerror err:", err);
        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }
        this._reportNetStatus(MsgEntity_1.ENetStatus.kNetStatus_DisConnect, 2);
    };
    WSHelper.prototype._onMessage = function (evt) {
        if (!evt || !evt.data || typeof evt.data == 'undefined') {
            console.log("_onMessage msg evt is null or data is null evt.data=", evt.data);
            return;
        }
        console.log("evt.data type is ", typeof evt.data);
        this._lastMsgTick = getUnixTick();
        var pkt = Packed.Packeter.ParseRsp(evt.data);
        if (pkt) {
            console.log("parse packet cmd=", pkt.cmdid, ",errCode=", pkt.rspHeader.errCode, ",pb=", pkt.pb);
            if (this._callFunc) {
                this._callFunc.OnMessage(pkt);
            }
        }
    };
    WSHelper.prototype._pingLoop = function () {
        if (this._netStatus != MsgEntity_1.ENetStatus.kNetStatus_Connected) {
            return;
        }
        var pbPing = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_PING);
        pbPing.setTimestamp(getUnixTick());
        var pbHead = {
            sequence: this.sequence,
            session: '',
            token: ''
        };
        var btReq = Packed.Packeter.PackReq(Protos.Protocol.cmd_register, pbHead, pbPing);
        return this._socket.send(btReq);
    };
    return WSHelper;
}());
exports["default"] = WSHelper;
