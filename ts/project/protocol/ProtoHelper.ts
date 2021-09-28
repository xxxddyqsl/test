import protos = require('./protos.js');
import Utils from '../utils/Utils'
export function NewProtoReq(cmdid:number) : any {
	switch (cmdid) {
		case proto.snail_video.media.eCmdC2S.CMD_REGISTER:
			break;
	}

	return protos.NewProtoReq(cmdid);
}

export function NewProtoObject(name:string) : any {
	return protos.NewProtoObject(name);
}

export function NewProtoObjectArray(name:string) : any {
	return protos.NewProtoObjectArray(name);
}

export function ParseProtoRsp(cmdid:number, body?: string | Uint8Array) : any {
	return protos.ParseProtoRsp(cmdid, body);
}

export function ParseRspHeader(body: string | Uint8Array) : any {
	return protos.ParseRspHeader(body);
}

export function NewReqHeader() {
	return protos.NewReqHeader();
}

export function MakeReqHeader(sequence: number,sesison?: string , token?: string) {
	return protos.MakeReqHeader(sequence,sesison,token);
}

export function MakeNumberUint8Array(v, bitSize : number) : Uint8Array {
	let da = new ArrayBuffer(bitSize);
	let dv = new DataView(da, 0, bitSize);

	if (bitSize < 0 || bitSize > 8) {
		return new Uint8Array(0);
	}

	if (bitSize == 1) {
		dv.setUint8(0, v);
	} else if (bitSize == 2) {
		dv.setUint16(0, v);
	} else if (bitSize == 4) {
		dv.setUint32(0, v);
	} else if (bitSize == 8) {
		dv.setFloat64(0, v);
	}
	
	return new Uint8Array(da);
}

export function Base64E(str:string): string {
	return Utils.base64Encode(str);
}

export function Base64D(str:string): string {
	if (str == '' || str == ' ') {
		return '';
	}
	
	return Utils.base64Decode(str);
}

