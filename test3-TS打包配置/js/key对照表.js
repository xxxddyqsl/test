
黄夏宇：enum eEventKey {
  // _map === 内返回值关键字对照表
  eKeyErrCode,  (key) = 1,	  //错误码
  eKeyClientID, (key) == 2		  //客户端ID
  eKeyClientKey, (key) == 3		  //登录的KEY
  eKeyStatus, (key) == 4			  //用户状态   
  eKeyErrMsg, (key) == 5			  //错误描述
  eKeyRoomKey, (key) == 6		  //roomkey
  eKeyReLoginReson, (key) == 7    //重登录原因  
  eKeyMediaType, (key) == 8		  // eStreamType 
  eKeyToken, (key) == 9	           // token
  eKeySize, (key) == 10	           // size
  eKeyData, (key) == 11	          // data

  eKeyRoomID, (key) == 12	          //roomid
  eKeyAppType, (key) == 13	          //登录的app
  eKeyAppKey, (key) == 14	         //
  eKeyParams, (key) == 15	         //

  eKeyEngineFrom = 200, //engine定义的key起点	 
  };

黄夏宇：{// _eventId
    resp_login = 1,            // eKeyErrCode [obj_type_users][obj_type_atrrs]		
    resp_setroom_attr = 2,     // eKeyErrCode [name:value]
    resp_setuser_attr = 3,     // eKeyErrCode eKeyClientID [name:value]
    resp_add_participants = 4, // eKeyErrCode [obj_type_users] 		
    resp_publish_media = 5,    // eKeyErrCode  		
    resp_logout = 6,           // eKeyRoomKey eKeyClientKey    


    ntf_relogin_waiting = 48, // 网络断开，等待重连 
    ntf_relogin_begin = 49,	  // 开始重新登录 eKeyRoomKey eKeyClientKey    
    ntf_netlost = 50,         // 断开 eKeyRoomKey eKeyClientKey 
    ntf_asynlogined = 51,    // 自己异地登录
    ntf_status_chaned = 52,   // eKeyClientID eKeyClientKey eKeyStatus   

    ntf_added_stream = 53,    // eKeyClientID eKeyMediaType
    ntf_removed_stream = 54,  // eKeyClientID eKeyMediaType		

    ntf_setroom_attr = 60,   // [name:value name:value] 
    ntf_setuser_attr = 61,   // eKeyClientID [name:value] 

    ntf_recv_msg = 63,       //收到消息 eKeyClientID eKeyClientKey eKeyToken eKeySize  eKeyData
    ntf_applogin = 64,       //开始登录或第三方app登录  eKeyAppType eKeyRoomID eKeyClientID eKeyAppKey

    ntf_engine_error = 65,   // Engine出错 eKeyErrCode eKeyErrMsg
    ntf_show_log = 100,      //显示日志用
    ntf_net_status = 101,
    engine_event_from = 200, 
  };

enum eStatus {
  wait_join = 0, //待加入
  user_online = 1, //在线
  user_net_broken = 2, //断线
  user_left = 3, //离开
};   // 用户状态对应的值

enum streamType {
  1,//是音频
  2,//2是视频
  3,//是音频+视频  + 屏幕共享
}

//  errCode   返回值对照
export enum ErrorCode {
  ec_succeed = 0,		//成功
  ec_params = 1,		//参数错误
  ec_connect_lost = 2, //链接丢失
  ec_unsupport = 3,    // 不支持的功能
  ec_logic_error = 4,  // 逻辑错误
  ec_sdp_error = 5,  // sdp错误
  ec_unsupport_media = 8, //不支持的媒体类型
  ec_repeated_offer = 10, //重复发布媒体流
  ec_not_publish = 11,    //未请求发布媒体流 
  ec_track_full = 13, //通道已经满了
  ec_not_register = 14,  //用户未注册
  ec_asyn_logined = 50, //异地登录
};

// seturl 登录类型 eType
enum urlType {
  server_index = 1,
  server_mcu = 2,
};