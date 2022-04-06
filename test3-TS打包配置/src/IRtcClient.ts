import {NewRtcClient as Impl }  from './RtcClientImpl';
import * as Entity from './entity/Entity'

//webrtc命令
export const cmd_webrtc_offer :string = "offer" ;  
export const cmd_webrtc_preanswer :string = "pre_answer";   
export const cmd_webrtc_answer :string = "answer" ;  
export const cmd_webrtc_ice :string = "ice" ;  

export const VER_CHINA : number = 0;
export const VER_ASIA  : number = 1;
export const VER_UROPE  : number =2 ;
export const  VER_AMERICA  : number =3;

export const ECODE_BUSY : number = -1   ;
export const ECODE_NOT_CONNECTED  : number =-2 ;
export const  ECODE_RUNNING : number = -3;
export const  ECODE_LOGIC  : number = -4;
export const  ECODE_PARAMS_ERROR  : number = -10 	; 
export const  ECODE_STREAM_NOTFOUND  : number =-11  ; 
export const  ECODE_NOT_INITIALIZE  : number =  -50   ;


export const  ECODE_VERSION_UNSUPPORT  : number = 10000 + 3 ; //版本不支持

// export interface IRtcObserver {
//     onRegisteRsp(startAt:number,serverTime:number,roomAttrs:Entity.ObjectKeyValue[],users :Entity.ObjectUser[]):number;
//     onSetRoomAttrRsp(attrs:Entity.ObjectKeyValue[]) : number;
//     onSetMediaAttrRsp(media : Entity.ObjectMedia):number;
//     onSetUserAttrRsp():number;
//     onAddParticipantRsp(users :Entity.ObjectUser[]):number;
//     onOrderStreamRsp():number;
//     onUpdateMediaRsp(medias:Entity.ObjectMedia[]):number;
//     notifyRoomAttr(attrs :Entity.ObjectKeyValue[]):void;
//     notifyUserAttr(clientId:string, attrs :Entity.ObjectKeyValue[]):void;
//     notifyUserStatus(users :Entity.ObjectUser[]):void;
//     notifyAddParticipant():void;
//     notifyBindStream(attrs :Entity.ObjectKeyValue[]):void;
//     notifyRelogin(reason : number):void;
//     notifyError(errCode:number, subErrCode:number, command:number):void;
//     notifyMediaCtrl(actions:number, params:string):void;
//     notifyRtcCmd(fromId:string, toId:string,msgType:string,
//         mline:string,mlineIndex:number,sdp:string,peerParam:string):void;
// };

export interface IBase {

};

export interface IIter {
    isEnd():boolean;
    next():void;
    getCurKey():string;
    getCurValue():string;
    getCurIntValue():number;
};

export interface  IBaseObject extends IBase {
    getByInt(key:number): string;
    getByStr(key:string):string;
    getIntByInt(key:number):number;
    getIntByStr(key:string):number;
    getIter(skipFixKey?:boolean):IIter;
};

export interface IArrayObjs extends IBase {
    size():number;
    item(index:number):IBaseObject;
    strItem(index:number):string;
};

export interface IBaseEvent extends IBaseObject {
    eventId():number;
    getObj(key:number):IBaseObject;
    getArrayObj(key:number):IArrayObjs;
};



export interface IRtcClient {
    //setObserver(observer:IRtcObserver):void;
    setAuthoKey(authkey:string):void;
    setUrl(cfgUri:string, eType:Entity.EUrlType):void;
    login(clientKey:string, roomKey:string, tLoginParam : Entity.TLoginAttr):number;
    logout():number;
    publish(sendFlag : boolean, streamType: number, clientId:string):number;
    isP2p():boolean;
    isSupportOfflines():boolean;
    setRoomAttr(sKey:string, sValue:string):number;
    setUserAttr(sClientId:string, sKey:string, sValue:string):number;
    orderStream(sClientId:string):number;
    addParticipant(clientKey:string, sKey:string, sValue:string):number;
    setParticipantAttr(clientKey:string, sKey:string, sValue:string):number;
    commitParticipants():number;
    getSetting(iKey:Entity.ESettingKey):number;
    getNetStatus(): Entity.TNetStatus; 
    setLocalStream(localstream: MediaStream, screenflag: boolean): number;
    setRemoteVideo(sClientId: string, video: HTMLVideoElement): number;

    getRemoteAudioIds(): string[];
    setRemoteAudio(sAudioId: string, video: HTMLVideoElement): number;

    poll():IBaseEvent[];
    sendMsg(msg:string, msgLen:number, sClientId:string, token:string):number;
    pauseSend(bPause:boolean, streamType:Entity.EStreamType, clientId:string):number;
}



export function MakeRtcClient():IRtcClient {
    return Impl();
}