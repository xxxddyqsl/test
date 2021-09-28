export enum Protocol {
	cmd_eCmdC2S_none    = 0, 
	cmd_ping            = 1, //Ping 
	cmd_register	    = 2, //注册
	cmd_add_participant	= 3, //添加待加入用户
	cmd_setuserattrs	= 4, //设置用户属性
	cmd_setroomattrs	= 5, //设置房间属性	    

	cmd_update_media	= 6, //请求更新发布的媒体 把所有媒体提交上来，不需要的不要传，客户端释放 
	cmd_set_media_attr	= 7, //请求更新发布的媒体 
	
	cmd_order_unorder	= 8, //订阅或取消订阅
	
	cmd_order_streams	 = 9,   //订阅或取消订阅,不订阅的自己取消
	cmd_old_update_media = 10, //请求更新发布的媒体  //把所有媒体提交上来，不需要的不要传，客户端释放   
	cmd_request_end      = 99,

	
	cmd_notify_user_status      = 100, //状态通知
	cmd_notify_setuserattrs	    = 101, //收到设置用户属性通知
	cmd_notify_setroomattrs	    = 102, //收到设置房间属性通知
	cmd_notify_media_ctrl       = 103, //媒体控制 
	cmd_notify_webrtc_command   = 104, //webrtc命令
	cmd_notify_request_relogin  = 105, //要求客户端重新登录
	cmd_notify_bind_streams	    = 106, //订阅绑定通道通知
	
	cmd_notify_error            = 250, //通知错误 
};


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

export enum EMsgType {
    kMsgTypeReq = 0,
    kMsgTypeRsp = 1,
};


/***********enum from proto************ */
export enum EMediaCtrlActs
{  
   ctrl_act_none    	= 0, //
   ctrl_act_sendvideo	= 1, //发送视频
   ctrl_act_pausevideo	= 2, //暂停发送视频
   ctrl_act_sendaudio   = 4, //发送语音
   ctrl_act_pauseaudio	= 3, //暂停发送语音
};
     
	 
export enum EUserStatus
{  
   st_wait_join	    = 0, //待加入
   st_online	    = 1, //在线
   st_net_broken    = 2, //断线
   st_left  	    = 3, //离开
};

export enum EReloginReson
{
   reson_undefined = 0, //未指定的原因,通常不会出现
   reson_sdp_error = 1,
   reson_logic_error = 2,  
   reson_p2p_to_many = 3,
   reson_rtp_timeout = 4,
};