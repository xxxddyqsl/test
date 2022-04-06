export enum ENetStatus {
    kNetStatus_Idle = 0,
    kNetStatus_Connecting,
    kNetStatus_Connected,
    kNetStatus_DisConnect,
};

export interface MsgEntity {
    OnNetStatus(iStatus: number, iReason:number):void;
    OnMessage(pkt : any) : number;
};

 