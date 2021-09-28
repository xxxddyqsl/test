import {NewRtcClient as Impl }  from './RtcClientImpl';
import * as Entity from './entity/Entity'

export interface IRtcObserver {
    onRegisteRsp(startAt:number,serverTime:number,roomAttrs:Entity.ObjectKeyValue[],users :Entity.ObjectUser[]):number;
    onSetRoomAttrRsp(attrs:Entity.ObjectKeyValue[]) : number;
    onSetMediaAttrRsp(media : Entity.ObjectMedia):number;
    onSetUserAttrRsp():number;
    onAddParticipantRsp(users :Entity.ObjectUser[]):number;
    onOrderStreamRsp():number;
    onUpdateMediaRsp(medias:Entity.ObjectMedia[]):number;
    notifyRoomAttr(attrs :Entity.ObjectKeyValue[]):void;
    notifyUserAttr(clientId:string, attrs :Entity.ObjectKeyValue[]):void;
    notifyUserStatus(users :Entity.ObjectUser[]):void;
    notifyAddParticipant():void;
    notifyBindStream(attrs :Entity.ObjectKeyValue[]):void;
    notifyRelogin(reason : number):void;
    notifyError(errCode:number, subErrCode:number, command:number):void;
    notifyMediaCtrl(actions:number, params:string):void;
    notifyRtcCmd(fromId:string, toId:string,msgType:string,
        mline:string,mlineIndex:number,sdp:string,peerParam:string):void;
};

export interface IRtcClient {
    setObserver(observer:IRtcObserver):void;
    setUrl(cfgUri:string, eType:Entity.EUrlType):void;
    login(clientKey:string, roomKey:string, tLoginParam : Entity.TLoginAttr):number;
    logout():number;
    send(sendFlag : boolean, streamType:Entity.EStreamType, clientId:string):number;
    isP2p():boolean;
    isSupportOfflines():boolean;
    setRoomAttr(sKey:string, sValue:string):number;
    setUserAttr(sClientId:string, sKey:string, sValue:string):number;
    orderStream(sClientId:string):number;
    addParticipant(sClientId:string, sKey:string, sValue:string):number;
    setParticipantAttr(sClientId:string, sKey:string, sValue:string):number;
    commitParticipants():number;
    getSetting(iKey:Entity.ESettingKey):number;
    getNetStatus():Entity.TNetStatus;
}

export function MakeRtcClient():IRtcClient {
    return Impl();
}