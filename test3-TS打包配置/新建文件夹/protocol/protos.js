/**
 * 对接 proto文件的桥梁
 */

 //import * as client2server_pb from "./client2server_pb.js";
 var client2server_pb = require('./client2server_pb.js');

 module.exports.NewReqHeader = function () {
    
    if (client2server_pb == null || !client2server_pb) {
        return null;
    }

    return new proto.snail_video.media.request_client2Server_header();
}

module.exports.MakeReqHeader = function (sequence, session, token) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("create pb header fail");
        return null;
    }

    var ret = new proto.snail_video.media.request_client2Server_header();
    ret.setSn(sequence);
    ret.setToken(token);
    ret.setSessionkey(session);

    return ret;
}

module.exports.ParseRspHeader= function (body) {
    try {
        return new proto.snail_video.media.response_client2Server_header.deserializeBinary(body);
    } catch (err) {
        return null;
    }
}

module.exports.ParseNotifyHeader = function(body) {
    try {
        return new proto.snail_video.media.notify_header.deserializeBinary(body);
    } catch (err) {
        return null;
    } 
}

module.exports.NewProtoObjectArray = function(name) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("client2server_pb require fail");
        return null;
    }

    if (name == "object_actions") {
        return [];//new Array<proto.snail_video.media.object_actions>(0);
    } else if (name == "object_keyvalue") {
        return [];// new Array<proto.snail_video.media.object_keyvalue>(0);
    } else if (name == "object_webrtc_msg") {
        return [];// new Array<proto.snail_video.media.object_webrtc_msg>(0);
    } else if (name == "object_user") {
        return [];// new Array<proto.snail_video.media.object_user>(0);
    } else if (name == "object_media") {
        return [];// new Array<proto.snail_video.media.object_media>(0);
    } else {
        return null;
    }
}

module.exports.NewProtoObject = function(name) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("client2server_pb require fail");
        return null;
    }

    if (name == "object_actions") {
        return new proto.snail_video.media.object_actions();
    } else if (name == "object_keyvalue") {
        return new proto.snail_video.media.object_keyvalue();
    } else if (name == "object_webrtc_msg") {
        return new proto.snail_video.media.object_webrtc_msg();
    } else if (name == "object_user") {
        return new proto.snail_video.media.object_user();
    } else if (name == "object_media") {
        return new proto.snail_video.media.object_media();
    } else if (name == "notify_header") {
        return new proto.snail_video.media.notify_header();
    } else if (name == "object_msg") {
        return new proto.snail_video.media.object_msg();
    }

    return null;
}

module.exports.NewProtoReq = function(cmdid) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        console.log("client2server_pb require fail");
        return null;
    }

    switch (cmdid) {
        case proto.snail_video.media.eCmdC2S.CMD_PING:
            return new proto.snail_video.media.request_ping();

        case proto.snail_video.media.eCmdC2S.CMD_REGISTER:
            return new proto.snail_video.media.request_register();

        case proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT:
            return new proto.snail_video.media.request_add_participant();

        case proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS:
            return new proto.snail_video.media.request_setuserattrs();

        case proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS:
            return new proto.snail_video.media.request_setroomattrs();

        case proto.snail_video.media.eCmdC2S.CMD_UPDATE_MEDIA:
            return new proto.snail_video.media.request_update_media();

        case proto.snail_video.media.eCmdC2S.CMD_SET_MEDIA_ATTR:
            return new proto.snail_video.media.request_set_media_attr();

        case proto.snail_video.media.eCmdC2S.CMD_ORDER_UNORDER:
            return new proto.snail_video.media.request_order_unorder();

        case proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS:
            return new proto.snail_video.media.request_order_streams();

        case proto.snail_video.media.eCmdC2S.CMD_OLD_UPDATE_MEDIA:
            return new proto.snail_video.media.request_update_media();

        case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_CANCEL_PUBLISH:
            return new proto.snail_video.media.notify_cancel_publish();

        case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_WEBRTC_COMMAND:
            return new proto.snail_video.media.notify_webrtc_command();
        
        case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SENDMSG:
            return new proto.snail_video.media.notify_sendmsg();

        default:
            console.log("unkown proto cmd ", cmdid);
            break;
    }

    return null;
}

module.exports.ParseProtoRsp = function (cmdid, body) {
    //var client2server_pb = require('client2server_pb');
    if (client2server_pb == null || !client2server_pb) {
        return null;
    }

    try {
        switch (cmdid) {
            case proto.snail_video.media.eCmdC2S.CMD_PING:
                return new proto.snail_video.media.respond_ping.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_REGISTER:
                return new proto.snail_video.media.respond_register.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_ADD_PARTICIPANT:
                return new proto.snail_video.media.respond_add_participant.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_SETUSERATTRS:
                return new proto.snail_video.media.respond_setuserattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_SETROOMATTRS:
                return new proto.snail_video.media.respond_setroomattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_UPDATE_MEDIA:
                return new proto.snail_video.media.respond_update_media.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_SET_MEDIA_ATTR:
                return new proto.snail_video.media.respond_set_media_attr.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_ORDER_UNORDER:
                return new proto.snail_video.media.respond_order_unorder.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_ORDER_STREAMS:
                return new proto.snail_video.media.request_order_streams.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_OLD_UPDATE_MEDIA:
                return new proto.snail_video.media.respond_update_media.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_USER_STATUS:
                return new proto.snail_video.media.notify_user_status.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SETUSERATTRS:
                return new proto.snail_video.media.notify_setuserattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SETROOMATTRS:
                return new proto.snail_video.media.notify_setroomattrs.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_MEDIA_CTRL:
                return new proto.snail_video.media.notify_media_ctrl.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_WEBRTC_COMMAND:
                return new proto.snail_video.media.notify_webrtc_command.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_REQUEST_RELOGIN:
                return new proto.snail_video.media.notify_request_relogin.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_BIND_STREAMS:
                return new proto.snail_video.media.notify_bind_streams.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_ERROR:
                return new proto.snail_video.media.notify_error.deserializeBinary(body);

            case proto.snail_video.media.eCmdC2S.CMD_NOTIFY_SENDMSG:
                return new proto.snail_video.media.notify_sendmsg.deserializeBinary(body);
                
            default:
                break;
        }
    } catch (err) {
        console.log(cmdid + " deserializeBinary catch an exception " + err);
        return null;
    }

    return null;
}