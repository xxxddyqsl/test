export interface TReqHeader {
    sequence : number;
    session: string;
    token : string;
};

export interface TRspHeader {
    sequence : number;
    errCode : number;
    subErrCode : number;
    processSpan : number;
    token : string;
};

export interface TPacket {
    cmdid:number;
    msgType:number;
    reqHeader:TReqHeader;
    rspHeader:TRspHeader;
    pb:any;
};