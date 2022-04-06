 
import * as Entity from '../entity/Entity'

export enum EClientErr
{
    err_client_from             = 100,
    err_connect_mcu_failed      = err_client_from + 1,
    err_request_mcu_timeout     = err_client_from + 2,
    err_connect_http_timeout    = err_client_from + 3,
     err_config                  = err_client_from + 4,
    err_connect_audio_server    = err_client_from + 5,
    err_connect_http_failed     = err_client_from + 6,
    err_network_pool            = err_client_from + 7,
    err_net_broken              = err_client_from + 8,
    err_not_logined             = err_client_from + 9,  //--
    err_notfound_user           = err_client_from + 10, //--
    err_not_init                = err_client_from + 11,
    err_login_canceled          = err_client_from + 12,

    //语音消息相关错误码   
    err_file_notfound           = err_client_from + 50,
    err_file_badformat          = err_client_from + 51,
    err_file_openfailed         = err_client_from + 52,
    err_task_busy               = err_client_from + 53,
    err_not_enough_space        = err_client_from + 54,   // 磁盘空间不足
    err_file_recordfiled        = err_client_from + 55,   // 未录制到声音数据
    err_file_recorddataless     = err_client_from + 56,   // 录制时间太短
    err_voice_to_text_failed    = err_client_from + 57,   // 语音转文本失败

    err_delete_file_failed      = err_client_from + 99,   // 删除消息失败
    err_connect_ftp_failed      = err_client_from + 100,  // 上传下载链接失败
    err_download_file_notfound  = err_client_from + 101,  // 下载文件不存在
    err_download_url_notsupport = err_client_from + 102,  // 不支持的下载地址
    err_request_qntoken         = err_client_from + 103,  // 取不到有效的token。
    err_request_down_url        = err_client_from + 104,
    err_upload_file_failed      = err_client_from + 105,
    err_upload_file_cancel      = err_client_from + 106,
    err_download_file_failed    = err_client_from + 107,
    err_download_cancel         = err_client_from + 108,
    err_stt_svr_failed          = err_client_from + 109,
    err_time_too_long           = err_client_from + 110,
};

export enum ESdpType {
    kOffer = 0,
    kPreAnswer = 1,
    kAnswer = 2,
};

export enum ETypeObjs
{
	obj_type_users = 1,  //用户列表  array_objs*
	obj_type_atrrs = 2,  //房间属性  base_object* 
};

export enum EResonRelogin
{
   sdp_error = 1,
   logic_error = 2,	 
   p2p_to_many = 3,	  
   rtp_timeout = 4,	  
   netbroken = 20, 
   rtc_engine_error = 50,
};

export enum Etype {
    kVideo_size = 1,	    //set/get video tVideoSize* 
    kVideo_size_1 = 2,  	//set/get video1 tVideoSize* 
};


export enum eStreamTypeEx {
    kVideo1 = 0x04,	//send or disable video1
};

export enum eEngineAct {
    kAct_set_video_size = 1,	  //set video size TVideoSize*
    kAct_set_video_1_size = 2,	  //set video size TVideoSize*
    kAct_set_net_disabled = 3,    //net disabled  nullptr
    kAct_set_net_enabled = 4,     //net connected nullptr
};

export interface TVideoSize{
    width:number;
    height: number;
    fps:number;
};

export interface IWebRtcSink
{ 
    onIceCandidate(mline: string, midIndex: number, sdp: string, peerid: string): void;
    onSucceed(type: number, sdp: string, peerid: string): void;
    commitEvent(evtid: number, k1: number, v1: string, k2: number, v2: string, k3: number, v3: string, k4: number, v4: string, k5: number, v5: string): void;
    onFailed(type: number, error: string, peerid: string): void;

    onAddStream(streamid: string, streamtype: Entity.EStreamType, token: string, peerid: string): void;
    onRemoveStream(streamid: string, streamtype: Entity.EStreamType, peerid: string): void;
    onEngineAction(type: number, params:any): void;
};

export interface IPeerConntion { 
    synStreamTypes(sendtypes:number, stoptypes:number, selfid:string):void;
    setRemoteDescription(sdptype: number, sdp: string):void;
    addIceCandidate(mline: string, mlineindex: number, sdp: string):void;
    pauseSend(sendtype: number, bPause:boolean):void;
    setPeerParams(params: string):void;
    setPeerKeyValueParams(key: string, value: string):void;
    get(type: Etype, param:any): boolean;
    getVideoSize():TVideoSize;
    getVideoSize1():TVideoSize;
    set(type: Etype, param:any): boolean;
    getPeerID(): string;
};

export interface Ice_Server {
    uri:string;
    usr: string;
    pwd: string;
};

export interface TParams { 
    pSink: IWebRtcSink; 
    csid:string;
    p2pflag: boolean;
    enable_srtp: boolean;
    enable_dtls: boolean;
    video_sz: number;
    video_small_sc: number;
    video_fps: number;
    screen_sz: number;
    screen_small_sc: number;
    screen_fps: number;
    stun: Ice_Server;
    turn: Ice_Server; 
};
 

export interface IWebRtcEngine {  
    setWebrtcEngineParams(name: string, params: string): void;
    openEngine(p: TParams): void;
    closeEngine(): void;
    createPeer(csid:string, bSendOffer: boolean): IPeerConntion;
    destroyPeer(peer: IPeerConntion):void;
    getDeviceID():string;	   
    getDeviceInfo(): string;  
    getLocalParamsForPeer(): string;
    onAddStream(streamid: string, streamtype: Entity.EStreamType, token: string, csid: string, peer: IPeerConntion): void;
    onRemoveStream(streamid: string, streamtype: Entity.EStreamType, token: string, csid: string, peer: IPeerConntion): void;
    setLocalStreams(localstream: MediaStream, screenflag: boolean): void;
    setRemoteVideo(sClientId: string, video: HTMLVideoElement): void;
    // HTMLVideoElement   video标签设置单独播放音频Track
    setOnlyRemoteAudio(sAudioId: string, audio: HTMLVideoElement): void;
    getOnlyRemoteAudios(): string[];
};

 