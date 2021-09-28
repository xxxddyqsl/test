import * as ProtoHelper from './ProtoHelper';
import {EMsgType} from './Protocol';
import * as ProtoEntity from './ProtoEntity'

export class Packeter {
    static PackData(pb:any) : Uint8Array  {
        return pb.serializeBinary();
    }

    static PackReq(cmd:number, header :ProtoEntity.TReqHeader, msg :any) : Uint8Array {
        let headerReq  = ProtoHelper.MakeReqHeader(header.sequence, header.session, header.token);
        let btHeader : Uint8Array;
        let headerLen : number = 0;
        let btBody : Uint8Array = new Uint8Array(0);
        let bodyLen : number = 0;
        
        let tmp = Packeter.PackData(headerReq);
        if (tmp) {
            btHeader = tmp;
            headerLen = tmp.length;
        } else {
            return null;
        }

        tmp = Packeter.PackData(msg);
        if (tmp) {
            btBody = tmp;
            bodyLen = tmp.length;
        }

        let req = new Uint8Array(8 + headerLen + bodyLen);
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
    }

    static ParseRsp(data : Uint8Array) : ProtoEntity.TPacket {
        let bts : Uint8Array = new Uint8Array(data.byteLength);

        let dv = new DataView(data);
        for (let i = 0; i < dv.byteLength; i++) {
            bts[i] = dv.getUint8(i);
        }

        let cmdid = bts[0];
        let flag = bts[1];
        let headerLen =  bts[2] | (bts[3] << 8);
        let bodyLen = bts[4] | (bts[5] << 8)| (bts[6] << 16)| (bts[7] << 24);

        console.log("all len=",bts.byteLength, ",cmdid=",cmdid,",flag=",flag, ",pb header len = ",
            headerLen, ",body len =", bodyLen);

        let btHeader = bts.subarray(8, 8+ headerLen);
        let rsp :ProtoEntity.TPacket = {
            cmdid : cmdid,
            msgType : EMsgType.kMsgTypeRsp,
            reqHeader:null,
            rspHeader:null,
            pb:null
        };

        let pbHeader = ProtoHelper.ParseRspHeader(btHeader);
        if (!pbHeader) {
            throw "ParseRsp Rsp Header error";
        }

        let rspHeader : ProtoEntity.TRspHeader = {
            sequence : pbHeader.getSn(),
            errCode : pbHeader.getEc(),
            subErrCode : pbHeader.getSubec(),
            processSpan : pbHeader.getDbspan(),
            token: pbHeader.getToken(),
        };

        rsp.rspHeader = rspHeader;

        if (bodyLen > 0) {
            let btBody = bts.subarray(8+ headerLen);
            let pbBody = ProtoHelper.ParseProtoRsp(cmdid, btBody);
            if (!pbBody) {
                throw "ParseRsp pb body error";
            }

            rsp.pb = pbBody;
        }

        return rsp;
    }
};
