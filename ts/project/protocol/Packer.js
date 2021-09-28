"use strict";
exports.__esModule = true;
exports.Packeter = void 0;
var ProtoHelper = require("./ProtoHelper");
var Protocol_1 = require("./Protocol");
var Packeter = /** @class */ (function () {
    function Packeter() {
    }
    Packeter.PackData = function (pb) {
        return pb.serializeBinary();
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
            token: pbHeader.getToken()
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
