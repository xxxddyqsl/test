"use strict";
exports.__esModule = true;
exports.Base64D = exports.Base64E = exports.MakeNumberUint8Array = exports.MakeReqHeader = exports.NewReqHeader = exports.ParseRspHeader = exports.ParseProtoRsp = exports.NewProtoObjectArray = exports.NewProtoObject = exports.NewProtoReq = void 0;
var protos = require("./protos.js");
var Utils_1 = require("../utils/Utils");
function NewProtoReq(cmdid) {
    switch (cmdid) {
        case proto.snail_video.media.eCmdC2S.CMD_REGISTER:
            break;
    }
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
    return Utils_1["default"].base64Encode(str);
}
exports.Base64E = Base64E;
function Base64D(str) {
    if (str == '' || str == ' ') {
        return '';
    }
    return Utils_1["default"].base64Decode(str);
}
exports.Base64D = Base64D;
