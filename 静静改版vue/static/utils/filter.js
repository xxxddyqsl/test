import utils from './utils';
import services from './services';
export default {
    // 封装过滤器
    // 左侧栏消息显示过滤器
    htmlOverviewMsgTemp(str) {
        // 0：系统分享，1 ： 广播   2：服务号   3：语音会议 4：添加好友 5:公司邀请 6:置顶/免打扰/添加常用联系人同步消息 7:消息撤回 8:离线文件接收回执)
        function format(str) {
            var atReg = /<input(?:[^>]*)?(?:class="_at_emp"(?:[^>]*)?value="([^"]+)"|value="([.*]+)"(?:[^"]*)?class="_at_emp")(?:[^>]*)\/*>/gi;
            var brReg = /<br\s*\/*>/g;
            var atReg1 = /<a class="msg_at_emp">(.*?)<\/a>/gi;
            str = str.replace(brReg, '');
            str = str.replace(atReg, function (v1, v2) {
                return v2;
            })
            str = str.replace(atReg1, function (v1, v2) {
                return v2;
            })
            str = services.emojiFaceReplace(str);
            str = services.faceToFont(str);
            str = services.htmlEncode(str);
            str = services.faceToImg(str);
            str = services.emojiFaceToImg(str);
            // console.log('filters==>', str)
            return str;
        }
        if (!str) return '';
        // 调用 公共js内部多语言
        // console.log('filters==>测试', services.langPack().getKey('link')) 
        if (typeof str === 'string') {
            // 校验是否有表情
            return format(str);
        }
        if (typeof str === 'object') {
            var chat = str;
            var res = chat.MsgContent || '';
            if (chat.MsgType == 10) {
                try {
                    var strObj = JSON.parse(chat.MsgContent);
                    if (strObj) {
                        switch (strObj.n_TYPE) {
                            case '0':
                                res = services.langPack().getKey('link') + strObj.title;
                                break;
                            case 1:
                            case 2:
                                if (strObj.s_CONTENTTYPE == 'image') {
                                    res = services.htmlDecode(strObj.s_TITLE);
                                } else {
                                    if (strObj.s_TITLE) {
                                        res = services.htmlDecode(strObj.s_TITLE);
                                    } else {
                                        res = services.htmlDecode(strObj.s_CONTENTS);
                                    }
                                }
                                break;
                            case 3: // 语音会议
                                if (strObj.voiceMeetingType == 'invite') {
                                    if (chat.MsgSenderId != currentUserId) {
                                        res = (chat._senderName || chat.MsgSenderName) + ' ' + services.langPack().getKey('invitedIntoMetting');
                                    } else {
                                        res = services.langPack().getKey('you') + ' ' + services.langPack().getKey('invitedIntoMettingInSender');
                                    }
                                } else {
                                    res = '';
                                }
                                break;
                            case 5: // 加入公司
                                if (strObj.addCompanyType == 'agree') {
                                    res = strObj.szMobileTel + ' ' + services.langPack().getKey('joinEnt') + ' ' + strObj.entName;
                                }
                                if (strObj.addCompanyType == 'invite') {
                                    res = strObj.szMobileTel + ' ' + services.langPack().getKey('inviteEnt') + ' ' + strObj.entName + ',' + services.langPack().getKey('seeInMobile');
                                }
                                break;
                            case 4: //
                                res = '';
                                break;
                            case 7:
                                chat.MsgSenderName = '';
                                res = (strObj.sender == currentUserId ? services.langPack().getKey('you') : strObj.senderName) + ' ' + services.langPack().getKey('withDrawMsg');
                                break;
                            case 9:
                                var files = strObj.receiversProgress;
                                if (strObj.type == 0) {
                                    res = services.langPack().getKey('largeFileMsg');
                                } else {
                                    res = chat.MsgSenderId == currentUserId ? services.langPack().getKey('cancelLargeFileMsgInSender') : (chat.MsgSenderName + services.langPack().getKey('cancelLargeFileMsgInReceiver'));
                                }
                                break;
                            case 10: // 视频会议 左侧栏 提示
                                // if (chat.MsgSenderId != currentUserId) {
                                //     // res = (chat._senderName? chat._senderName:chat.MsgSenderName)  +  ' : ' + JSON.parse(chat.MsgContent).message;
                                //     res = (chat._senderName? chat._senderName:chat.MsgSenderName)  +  ' : [视频会议]' ;
                                // }else{
                                // res = services.langPack().getKey('you') + ' : ' +  JSON.parse(chat.MsgContent).message;
                                res = services.langPack().getKey('videoConference');
                                // }
                                break;
                            case 12:
                                // 视频会议 左侧栏 提示
                                res = services.langPack().getKey('BookAVideoConference');
                                break;
                            case 100:
                                var temp = {
                                    senderId: chat.MsgSenderId,
                                    sender: {
                                        Id: chat.MsgSenderId,
                                        Name: chat.MsgSenderName || chat._senderName
                                    },
                                    msgObj: strObj
                                }
                                chat.MsgSenderName = '';
                                res = $filter('groupOperateMsgFilter')(temp);
                                break;
                            default:
                                if (strObj.s_CONTENTS) {
                                    res = services.htmlDecode(strObj.s_CONTENTS);
                                }
                                break;
                        }
                    }
                } catch (e) {
                    res = chat.MsgContet || '';
                }
            } else {
                res = format(res);
            }
            return res;

        }
    },
    msgDetailTimeFormat(date){ 
            if (!date) return '';
            var today = new Date();
            today.setHours(0);
            today.setMinutes(0);
            today.setSeconds(0);
            today.setMilliseconds(0);
            var todayBegin = today.getTime(); // 今天开始
            var yesterdatBegin = today.setDate(today.getDate() - 1); // 昨天开始
            var tdbyBegin = today.setDate(today.getDate() - 1); // 前天开始
            date = parseInt(date);
            var _date = new Date(date);
            // 今天
            // if (_date.format('YYYY-MM-DD') == new Date().format('YYYY-MM-DD')) {
                if (_date.toLocaleDateString().split('/').join('-') == new Date().toLocaleDateString().split('/').join('-') ) {
                //  _date.format('hh:mm');
                 return   (_date.getHours()<10?'0'+_date.getHours():_date.getHours() )+ ":" + (_date.getMinutes()<10?'0'+_date.getMinutes():_date.getMinutes());
            }
            // 昨天
            if (date <= todayBegin && date > yesterdatBegin) {
                // return  services.langPack().getKey('yesterday') + ' ' + _date.format('hh:mm');
                return  services.langPack().getKey('yesterday') + ' ' +(_date.getHours()<10?'0'+_date.getHours():_date.getHours() )+ ":" + (_date.getMinutes()<10?'0'+_date.getMinutes():_date.getMinutes());
            }
            // 前天
            if (date <= yesterdatBegin && date > tdbyBegin) {
                // return  services.langPack().getKey('thedaybeforeyesterday') + ' ' + _date.format('hh:mm');
                return  services.langPack().getKey('thedaybeforeyesterday') + ' ' +(_date.getHours()<10?'0'+_date.getHours():_date.getHours() )+ ":" + (_date.getMinutes()<10?'0'+_date.getMinutes():_date.getMinutes());
            }
            // 星期几
            today = new Date();
            var day = today.getDay();
            var thisWeekBegin = todayBegin - day * 24 * 60 * 60 * 1000; // 本周开始
            var nextWeekbegin = thisWeekBegin + 7 * 24 * 60 * 60 * 1000; // 下周开始
            if (date >= thisWeekBegin && date < nextWeekbegin) {
                var dayArr =  services.langPack().getKey('weekDays');
                // return dayArr[_date.getDay()] + ' ' + _date.format('hh:mm');
                return dayArr[_date.getDay()] + ' ' + (_date.getHours()<10?'0'+_date.getHours():_date.getHours() )+ ":" + (_date.getMinutes()<10?'0'+_date.getMinutes():_date.getMinutes());
            }
            // 年月日
            // return _date.format('YYYY-MM-DD') + ' ' + _date.format('hh:mm');
            return _date.toLocaleDateString().split('/').join('-') + ' ' +(_date.getHours()<10?'0'+_date.getHours():_date.getHours() )+ ":" + (_date.getMinutes()<10?'0'+_date.getMinutes():_date.getMinutes());
            // var hour = _date.getHours();
            // var time =  services.langPack().getKey('am');
            // if(hour > 12){
            // time =  services.langPack().getKey('pm');
            // }
            // var today = new Date();
            // today = today.format('MM-DD');
            // var _date1 = _date.format('MM-DD');
            // return (today == _date1 ? time : _date1) + ' ' + _date.format('hh:mm'); 
    },
    msgFilter(msg,keyword){
        var res = '';
        console.log(msg.type+'=='+services.webConfig.MSG_TEXT_TYPE)
        if (msg.type == services.webConfig.MSG_TEXT_TYPE) {
            res = services.htmlEncode(msg.content);
            if (keyword) {
                var _keyword = services.replaceMetaStr(keyword);
                _keyword = services.htmlEncode(_keyword);
                var reg = new RegExp('(' + _keyword + ')', 'ig');
                res = res.replace(reg, function (v1, v2) {
                    return '<span class="keyword2">' + v2 + '</span>';
                })
            }
            // res = services.convertAtFromMob(res, this.getEmpInfo);
            res = services.convertAtFromMob(res);
            res = services.faceToFont(res);
            res = services.hrefEncode(res);
            res = services.faceToImg(res);
            res = services.emojiFaceReplace(res);
            res = res.replace(/\n/g, '<br />');
            res = services.emojiFaceToImg(res);
            // res = res + '   ' +new Date(msg.Timestamp).format('YYYY-MM-DD hh:mm:ss')
        }
        return res;
    
    },
     
} 