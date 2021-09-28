export enum EUrlType {
    kServerndex = 1,
    kServerMcu  = 2,
};

export enum ESettingKey
{
   kP2pEnable = 1,	         // p2p	是否允许建立p2p房间,不允许
   kP2pConnectTimeout = 2,	 // p2p	建立超时时间，单位毫秒
   kScreenIsVbr = 3,	     // 桌面共享是否采用vbr
   kVideoIsVbr = 4,		 // 摄像头视频是否采用vbr
   kScreenRateWatch = 5,	 // 桌面共享码率监控
   kVideoRateWatch = 6,  	 // 视频码率监控	 
   kReprterId = 10,          // 获取当前房间的汇报ID
};

export enum EStreamType
{
	kAudio = 0x01,	//发送或停止语音类型
	kVideo = 0x02,	//发送或停止视频类型 
};

export interface ClientInfo {
    roomKey :string;
    clientKey : string;
    token: string;
    version:string;
    deviceId : string;
    deviceInfo:string;
};

export interface TNet {
    snum : number;          //流数量
    netlossrate : number;   //当前单向丢包率  仅仅自己网络丢包情况
    totallossrate : number; //所有丢包率    包括发送方上传丢包
    band : number;          //流码率 KB/S
    bandn : number;         //网络码率 单位KB/S
};

export interface TNetStatus {
    tUp:TNet;
    tDown:TNet;
    rtt:number;
};

export interface TLoginAttr
{
    bP2pFlag : boolean;
    bOrderFlag : boolean;
    bNotifyFlag : boolean;
    bSupportOfflines :boolean;
    bAutoRelogin: boolean;
};


export interface ObjectKeyValue {
    key : string;
    value:string;
}

export interface ObjectUser {
    clientId:string;
    clientKey:string;
    attrs :ObjectKeyValue[];
    status : number;
    joinTick:number;
    leaveTick:number;
};

export interface ObjectMedia {
    name : string;
    attrs : ObjectKeyValue[];
};