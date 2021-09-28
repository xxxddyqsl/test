"use strict";
exports.__esModule = true;
exports.EReloginReson = exports.EUserStatus = exports.EMediaCtrlActs = exports.EMsgType = exports.ErrorCode = exports.Protocol = void 0;
var Protocol;
(function (Protocol) {
    Protocol[Protocol["cmd_eCmdC2S_none"] = 0] = "cmd_eCmdC2S_none";
    Protocol[Protocol["cmd_ping"] = 1] = "cmd_ping";
    Protocol[Protocol["cmd_register"] = 2] = "cmd_register";
    Protocol[Protocol["cmd_add_participant"] = 3] = "cmd_add_participant";
    Protocol[Protocol["cmd_setuserattrs"] = 4] = "cmd_setuserattrs";
    Protocol[Protocol["cmd_setroomattrs"] = 5] = "cmd_setroomattrs";
    Protocol[Protocol["cmd_update_media"] = 6] = "cmd_update_media";
    Protocol[Protocol["cmd_set_media_attr"] = 7] = "cmd_set_media_attr";
    Protocol[Protocol["cmd_order_unorder"] = 8] = "cmd_order_unorder";
    Protocol[Protocol["cmd_order_streams"] = 9] = "cmd_order_streams";
    Protocol[Protocol["cmd_old_update_media"] = 10] = "cmd_old_update_media";
    Protocol[Protocol["cmd_request_end"] = 99] = "cmd_request_end";
    Protocol[Protocol["cmd_notify_user_status"] = 100] = "cmd_notify_user_status";
    Protocol[Protocol["cmd_notify_setuserattrs"] = 101] = "cmd_notify_setuserattrs";
    Protocol[Protocol["cmd_notify_setroomattrs"] = 102] = "cmd_notify_setroomattrs";
    Protocol[Protocol["cmd_notify_media_ctrl"] = 103] = "cmd_notify_media_ctrl";
    Protocol[Protocol["cmd_notify_webrtc_command"] = 104] = "cmd_notify_webrtc_command";
    Protocol[Protocol["cmd_notify_request_relogin"] = 105] = "cmd_notify_request_relogin";
    Protocol[Protocol["cmd_notify_bind_streams"] = 106] = "cmd_notify_bind_streams";
    Protocol[Protocol["cmd_notify_error"] = 250] = "cmd_notify_error";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ec_succeed"] = 0] = "ec_succeed";
    ErrorCode[ErrorCode["ec_params"] = 1] = "ec_params";
    ErrorCode[ErrorCode["ec_connect_lost"] = 2] = "ec_connect_lost";
    ErrorCode[ErrorCode["ec_unsupport"] = 3] = "ec_unsupport";
    ErrorCode[ErrorCode["ec_logic_error"] = 4] = "ec_logic_error";
    ErrorCode[ErrorCode["ec_sdp_error"] = 5] = "ec_sdp_error";
    ErrorCode[ErrorCode["ec_unsupport_media"] = 8] = "ec_unsupport_media";
    ErrorCode[ErrorCode["ec_repeated_offer"] = 10] = "ec_repeated_offer";
    ErrorCode[ErrorCode["ec_not_publish"] = 11] = "ec_not_publish";
    ErrorCode[ErrorCode["ec_track_full"] = 13] = "ec_track_full";
    ErrorCode[ErrorCode["ec_not_register"] = 14] = "ec_not_register";
    ErrorCode[ErrorCode["ec_asyn_logined"] = 50] = "ec_asyn_logined";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
;
var EMsgType;
(function (EMsgType) {
    EMsgType[EMsgType["kMsgTypeReq"] = 0] = "kMsgTypeReq";
    EMsgType[EMsgType["kMsgTypeRsp"] = 1] = "kMsgTypeRsp";
})(EMsgType = exports.EMsgType || (exports.EMsgType = {}));
;
/***********enum from proto************ */
var EMediaCtrlActs;
(function (EMediaCtrlActs) {
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_none"] = 0] = "ctrl_act_none";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_sendvideo"] = 1] = "ctrl_act_sendvideo";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_pausevideo"] = 2] = "ctrl_act_pausevideo";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_sendaudio"] = 4] = "ctrl_act_sendaudio";
    EMediaCtrlActs[EMediaCtrlActs["ctrl_act_pauseaudio"] = 3] = "ctrl_act_pauseaudio";
})(EMediaCtrlActs = exports.EMediaCtrlActs || (exports.EMediaCtrlActs = {}));
;
var EUserStatus;
(function (EUserStatus) {
    EUserStatus[EUserStatus["st_wait_join"] = 0] = "st_wait_join";
    EUserStatus[EUserStatus["st_online"] = 1] = "st_online";
    EUserStatus[EUserStatus["st_net_broken"] = 2] = "st_net_broken";
    EUserStatus[EUserStatus["st_left"] = 3] = "st_left";
})(EUserStatus = exports.EUserStatus || (exports.EUserStatus = {}));
;
var EReloginReson;
(function (EReloginReson) {
    EReloginReson[EReloginReson["reson_undefined"] = 0] = "reson_undefined";
    EReloginReson[EReloginReson["reson_sdp_error"] = 1] = "reson_sdp_error";
    EReloginReson[EReloginReson["reson_logic_error"] = 2] = "reson_logic_error";
    EReloginReson[EReloginReson["reson_p2p_to_many"] = 3] = "reson_p2p_to_many";
    EReloginReson[EReloginReson["reson_rtp_timeout"] = 4] = "reson_rtp_timeout";
})(EReloginReson = exports.EReloginReson || (exports.EReloginReson = {}));
;
