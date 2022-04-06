class WebRtc {
    userList = [];
    localStream = null;
    timer = null;//定时器、
    roomModel = {};//房间模式
    AudioTrack = null;//流-音频轨道
    VideoTrack = null;//流-视频轨道
    useId = document.getElementById('useid').value;
    constructor() {
        this.sdk = finalModule;
    };
    // 自定义监听 userList 数据
    // get watch(){
    //     console.log('取值',this.userList);
    //     return this.userList;
    // };
    // set watch(val){
    //     console.log('存值',this.userList,'val',val);
    //     this.userList.push(val);
    //     console.log('存过之后的 w 值',this.userList);
    // };
    setUrl() {
        //cfgUri 服务器地址    //  eType INDEX = 1    MCU = 2  AuthKey= "a9003800860361e9JJAV"
        this.sdk.MakeRtcClient().setAuthoKey("");
        // this.sdk.MakeRtcClient().setAuthoKey("");
        // this.sdk.MakeRtcClient().setUrl("http://120.132.99.205:24002", 1);
        this.sdk.MakeRtcClient().setUrl("http://172.18.70.32:24002", 1);
        // this.login();
    };
    login(roomVal, useVal) {
        let that = this;
        var selectCount = document.getElementById("RoomModel_select");
        // 非订阅 非p2p 模式
        if (selectCount.options[selectCount.selectedIndex].value == '0') {
            this.roomModel = { 'bP2pFlag': false, 'bOrderFlag': false, 'bNotifyFlag': true, 'bSupportOfflines': true, 'bAutoRelogin': true, 'bSupportVideo': true };
        } else if (selectCount.options[selectCount.selectedIndex].value == 'bP2pFlag') {
            // p2p 模式
            this.roomModel = { 'bP2pFlag': true, 'bOrderFlag': false, 'bNotifyFlag': true, 'bSupportOfflines': true, 'bAutoRelogin': true, 'bSupportVideo': true };
        } else if (selectCount.options[selectCount.selectedIndex].value == 'bOrderFlag') {
            // 订阅 模式
            this.roomModel = { 'bP2pFlag': false, 'bOrderFlag': true, 'bNotifyFlag': true, 'bSupportOfflines': true, 'bAutoRelogin': true, 'bSupportVideo': true };
        } else if (selectCount.options[selectCount.selectedIndex].value == 'OnlyAudio') {
            // 只有音频
            this.roomModel = { 'bP2pFlag': false, 'bOrderFlag': true, 'bNotifyFlag': true, 'bSupportOfflines': true, 'bAutoRelogin': true, 'bSupportVideo': false };
        } // { 'bP2pFlag': 是否开启点对点模式 , 'bOrderFlag': 是否开启订阅模式, 'bNotifyFlag': true, 'bSupportOfflines': 是否 支持离线, 'bAutoRelogin': true 'bSupportVideo': true true支持视频 false 不支持}
        return new Promise((resolve) => {
            this.sdk.MakeRtcClient().login(useVal, roomVal, that.roomModel);
            resolve();
        })

    };
    // 退出登录
    logout() {
        this.sdk.MakeRtcClient().logout();
        this.localStream.getTracks().forEach(track => {
            console.log(track);
            track.stop();
        });
        // this.localStream.getVideoTracks()[0].onended=(e)=>{
        //     console.log(e) 
        // }
    };
    // 检测是否 点对点(1v1)通话
    isp2p() {
        let bIsP2p = this.sdk.MakeRtcClient().isP2p();
        alert(bIsP2p);
    };
    //  检测是否 支持离线
    isSupportOfflines() {
        let bIsOL = this.sdk.MakeRtcClient().isSupportOfflines();
        alert(bIsOL);
    };
    // 订阅模式下是需要订阅才能收到对方流的 订阅流
    orderStream(id) {
        console.log('订阅id:===>' + id)
        // 订阅传id 如果订阅多人是用  分号“;”隔开 "id1;id2"
        // 如果是音频和视频分开订阅  "id1_video;id2_video;id1_audio;id2_audio"
        this.sdk.MakeRtcClient().orderStream(id);
    };
    //  添加会议成员
    addParticipant(sClientId, sKey, sValue) {
        console.log(' 添加会议成员:===>' + sClientId, sKey, sValue);
        let start = this.sdk.MakeRtcClient().addParticipant(sClientId, sKey, sValue);
        alert(start);


    };
    // 发送指令
    sendMsg(msg, msgLen, clientId, token) {
        this.sdk.MakeRtcClient().sendMsg(msg, msgLen, clientId, token);
    };
    // 修改 添加的成员
    setParticipantAttr(sClientId, sKey, sValue) {
        this.sdk.MakeRtcClient().setParticipantAttr(sClientId, sKey, sValue);
    };
    poll() {
        let that=this;
        // 创建定时器 轮询调用接口 返回值
        this.timer = setInterval(() => {
            let msgs = this.sdk.MakeRtcClient().poll();
            if (msgs) {
                console.log('msgs==>', msgs);
                if (msgs.length > 0) {
                    for (let i in msgs) {
                        let msg = msgs[i];
                        switch (msg._eventId) {
                            //  case 多条件 case "1":case "2":
                            case 1:
                                console.log('1:===>', msg);
                                if (this.sdk.MakeRtcClient().getRemoteAudioIds().length > 0) {
                                    this.setCreateAudioTags(this.sdk.MakeRtcClient().getRemoteAudioIds());
                                }
                                console.log('audio==>', this.sdk.MakeRtcClient().getRemoteAudioIds())
                                //  obj_type_users = 1,  //用户列表  array_objs*
                                // obj_type_atrrs = 2,  //房间属性  base_object*

                                // alert('自己 登录 resp_login');
                                // 1 登录成功 后 获取返回已在房间内的成员- 包含自己  用户列表
                                if (msg._arrays[1]) {
                                    console.log('_arrays ====>' + msg._arrays[1]._objs.length);
                                    // 存入容器
                                    msg._arrays[1]._objs.map(item => {
                                        this.setUserList(item._map, msg._eventId);
                                        if (item._map.medias) {
                                            // 列表渲染完 执行订阅 渲染流   
                                            let csid = NumberUtil.utf8ToSting(item._map[2]);
                                            console.log('渲染' + csid + '资源');
                                            // 订阅 其他成员  流
                                            //   let id = csid + '_video_1' + ";" + csid+'_audio';//大流
                                            let id = csid + '_video_1';
                                            this.sdk.MakeRtcClient().orderStream(id);
                                            // 获取创建好的 demo元素
                                            let video = document.getElementById(csid);
                                            // 渲染 其他成员  流
                                            this.sdk.MakeRtcClient().setRemoteVideo(video.id, video);

                                        }
                                    })
                                }
                                // medias
                                //2 登录成功 后 获取返回房间属性
                                if (msg._objs[2]._map) {
                                    if (msg._objs[2]._map.mode) {

                                    }
                                }
                                // console.log(msg);
                                break;
                            case 2:
                                // alert('自己 设置 房间属性 resp_setroom_attr');
                                // console.log(msg);
                                break;
                            case 3:
                                // alert('自己 设置 用户属性 resp_setuser_attr');
                                // console.log(msg);
                                break;
                            case 6:
                                alert('自己 退出登录 resp_logout：' + msg._eventId);
                                // 销毁定时器
                                clearInterval(this.timer);
                                this.timer = null;
                                break;
                            case 52:
                                // alert('其他成员 登录 ntf_status_chaned');
                                if (msg._map) {
                                    //52 返回 其他成员 登录
                                    console.log('_map ====>' + msg._map.length);
                                    // 存入容器
                                    this.setUserList(msg._map, msg._eventId);
                                }
                                // console.log(msg);
                                break;
                            case 53:
                                //53 返回 其他成员 发布流
                                let id = NumberUtil.utf8ToSting(msg._map[2]);
                                if (document.getElementById(id)) {

                                    // 其他成员 标签
                                    let video = document.getElementById(id);
                                    //   id+ '_video';//大流   id+'_video_1';//小流
                                    // 订阅 其他成员  流
                                    // let csid = id + '_video_1' + ";" + id+'_audio';//大流
                                    let csid = id + '_video_1';
                                    this.sdk.MakeRtcClient().orderStream(csid);

                                    // 渲染 其他成员  流
                                    this.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
                                }

                                break;
                            case 54:
                                //54 返回 其他成员 移除流
                                let myid = NumberUtil.utf8ToSting(msg._map[2]);
                                if (document.getElementById(myid)) {
                                    console.log('_map ====>' + myid);
                                }
                                break;
                            case 60:
                                // alert('其他成员 设置 房间属性 ntf_setroom_attr');
                                if (msg._map) {
                                    if (msg._map.mode == "screen") {
                                        // 其他成员 标签
                                        let video = document.getElementById(msg._map.shared);
                                        //   id+ '_video';//大流   id+'_video_1';//小流
                                        let csid = msg._map.shared + '_video_1' + ";" + msg._map.shared + '_audio';//大流
                                        // 订阅 其他成员  流
                                        this.sdk.MakeRtcClient().orderStream(csid);

                                        // 渲染 其他成员  流
                                        this.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
                                    }
                                    //60 返回 其他成员 设置 房间属性
                                    console.log('_map ====>' + msg._map.length);
                                    // 存入容器
                                    this.setUserRAttributes(msg._map, msg._eventId);
                                }
                                // console.log(msg);
                                break;
                            case 61:
                                // alert('其他成员 设置 用户属性 ntf_setuser_attr');
                                if (msg._map) {
                                    //61 返回 其他成员 设置 用户属性
                                    console.log('_map ====>' + msg._map.length);
                                    // 存入容器
                                    this.setUserAttributes(msg._map, msg._eventId);
                                    //53 返回 其他成员 发布流
                                    let id = NumberUtil.utf8ToSting(msg._map[2]);
                                    // if(document.getElementById(id)&&msg._map.medias){ 
                                    //     //   id+ '_video';//大流   id+'_video_1';//小流
                                    //     // 订阅 其他成员  流
                                    //     this.sdk.MakeRtcClient().orderStream(id+'_video');
                                    //       // 其他成员 标签
                                    //     let video = document.getElementById(id);
                                    //          // 渲染 其他成员  流
                                    //     this.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
                                    //     }

                                }
                                // console.log(msg);
                                break;
                            case 63:
                                if (msg._map) {
                                    //61 返回 其他成员 发送 消息
                                    console.log('_map ====>' + msg._map.length);

                                    if (msg._map[11]) {
                                        // UTF8解码 转成汉字字符串 
                                        let body = NumberUtil.utf8ToSting(msg._map[11]);
                                        let id = NumberUtil.utf8ToSting(msg._map[2])
                                        console.log(body)
                                        let node = document.createElement('p');
                                        node.className = 'message_item';
                                        node.innerHTML = '用户' + id + '发送:' + body;
                                        document.getElementById('message').appendChild(node);
                                    }
                                    // for(let i in a){console.log(String.fromCharCode(a[i]))}
                                }
                                // console.log(msg);
                                break;
                            default:
                            // alert(msg._eventId);
                        }

                    }
                }
            } else {
                return console.log(msgs);
            };
        }, 1000)


        // this.sdk.MakeRtcClient().poll().getObj();var a=['n':'测试']
    };
    // 获取 房间内的成员 或 新进入房间 成员的数据处理
    // setUserList(msg, cmid) {
    //     console.log(cmid)
    //     var is = false;
    //     if (this.userList.length > 0) {
    //         for (let i in this.userList) {
    //             // msg['2'] = 用户id
    //             if (msg['2'] && msg['2'].replace(/\s+/g,"") != '') {
    //                 if (this.userList[i].userId == msg['2']) {
    //                     is = false;
    //                     this.userList[i].userId = msg['2'] ? msg['2'] : this.userList[i].userId;
    //                     this.userList[i].status = msg['4'] ? msg['4'] : this.userList[i].status;
    //                     this.userList[i].cmid = cmid;
    //                     this.userList[i].name = msg.n ? NumberUtil.utf8ToSting(msg.n) : this.userList[i].name;
    //                     this.userList[i].img = msg.i ? msg.i : this.userList[i].img;
    //                     //id相同 替换对应数据 break跳出当前循环
    //                     // this.userList.splice(i, 1, { 'userId': msg['2'] ? msg['2'] : this.userList[i].userId, 'status': msg['4'] ? msg['4'] : this.userList[i].status, 'cmid': cmid, 'name': msg.n ? NumberUtil.utf8ToSting(msg.n) : this.userList[i].name, img: msg.i ? msg.i : this.userList[i].img });
    //                     break;
    //                 } else {
    //                     is = true;
    //                 }
    //             }else if(cmid=='60'&& msg.shared &&msg.mode=="screen"){
    //                 // screen 屏幕共享
    //                 if (this.userList[i].userId ==  msg.shared) {
    //                     this.userList[i].mode =msg.mode;
    //                 }
    //             }
    //         }
    //         if (is) {
    //             this.userList.push({ 'userId': msg['2'], 'status': msg['4'], 'cmid': cmid, 'name': '', img: '' });
    //         }
    //     } else {
    //         this.userList.push({ 'userId': msg['2'], 'status': msg['4'], 'cmid': cmid, 'name': '', img: '' });
    //     }
    //     // this.userList.push({'userId':msg['2'],'status':msg['4']})
    //     console.log(this.userList);
    // };
    //  接口 返回的已在房间内的成员 或 新进入房间 成员的数据处理
    setUserList(msg, cmid) {
        console.log(cmid)
        var is = false;
        if (this.userList.length > 0) {
            for (let i in this.userList) {
                // msg['2'] = 用户id
                if (msg['2'] && msg['2'].replace(/\s+/g, "") != '') {
                    if (this.userList[i].userId == msg['2']) {
                        is = false;
                        this.userList[i].userId = msg['2'] ? msg['2'] : this.userList[i].userId;
                        this.userList[i].status = msg['4'] ? msg['4'] : this.userList[i].status;
                        this.userList[i].cmid = cmid;
                        this.userList[i].name = msg.n ? NumberUtil.utf8ToSting(msg.n) : this.userList[i].name;
                        this.userList[i].img = msg.i ? msg.i : this.userList[i].img;
                        //id相同 替换对应数据 break跳出当前循环
                        // this.userList.splice(i, 1, { 'userId': msg['2'] ? msg['2'] : this.userList[i].userId, 'status': msg['4'] ? msg['4'] : this.userList[i].status, 'cmid': cmid, 'name': msg.n ? NumberUtil.utf8ToSting(msg.n) : this.userList[i].name, img: msg.i ? msg.i : this.userList[i].img });
                        break;
                    } else {
                        is = true;
                    }
                }
            }
            if (is) {
                this.userList.push({ 'userId': msg['2'], 'status': msg['4'], 'cmid': cmid, 'name': msg.n ? NumberUtil.utf8ToSting(msg.n) : '', img: msg.i ? msg.i : '' });
            }
        } else {
            this.userList.push({ 'userId': msg['2'], 'status': msg['4'], 'cmid': cmid, 'name': msg.n ? NumberUtil.utf8ToSting(msg.n) : '', img: msg.i ? msg.i : '' });
        }
        // this.userList.push({'userId':msg['2'],'status':msg['4']})
        console.log(this.userList);
        // 创建元素
        this.onHtml(this.userList);
    };
    // 创建元素
    onHtml(data) {
        // document.getElementById('content').innerHTML = '';
        var html = [];
        data.map((item, index) => {
            if (!document.getElementById(item.userId)) {
                //     let templates = `
                //         <div class="content_item">
                //         <img src="${item.img}" alt="">
                //         <div class="content_item_name">用户id:${item.userId}  用户名:${item.name}</div>
                //         <video  class="content_item_video" id="${item.userId}" autoplay></video>
                //     </div>
                // `;
                let node = document.createElement("div");
                node.id = item.userId + '_box';
                node.className = 'content_item';
                let img = document.createElement("img");
                img.className = 'content_item_img';
                img.src = item.img;
                node.appendChild(img);
                let name = document.createElement("div");
                name.className = 'content_item_name';
                name.innerText = '用户id：' + item.userId + '用户名：' + item.name;
                node.appendChild(name);
                let v = document.createElement("video");
                v.className = 'content_item_video';
                v.id = item.userId;
                v.autoplay = true;
                v.muted = true;
                node.appendChild(v);
                // v.controls = true;
                // let a = document.createElement("audio");
                // a.className = 'content_item_audio';
                // a.autoplay = true;
                // a.id = 'A_'+item.userId;
                // node.appendChild(a);
                document.getElementById('video-box').appendChild(node);
                // html.push(templates);
            } else {
                // 修改对应id下的修改
                let node = document.getElementById(item.userId + '_box');
                // 获取子标签 img
                node.getElementsByClassName('content_item_img')[0].src = item.img;
                node.getElementsByClassName('content_item_name')[0].innerText = '用户id：' + item.userId + '用户名：' + item.name;
            }
        });
        console.log(html);
        // document.getElementById('content').innerHTML = html.join('');
    };
    // 创建 音频标签
    setCreateAudioTags(data) {
        data.map((item) => {
            if (!document.getElementById(item)) {
                let a = document.createElement("video");
                a.className = 'content_item_Audio';
                a.id = item;
                a.innerText = item + '--音频标签';
                a.autoplay = true;
                document.getElementById('audio-box').appendChild(a);
            }
            console.log(item);
            // setTimeout(()=>{
            if (document.getElementById(item)) {
                // 音频标签传给SDK
                this.sdk.MakeRtcClient().setRemoteAudio(item, document.getElementById(item));
            }
            // },1000)

        })


    };
    // 接口 返回的其他成员的 用户属性 存入调用数据
    setUserAttributes(msg, cmid) {
        console.log(cmid)
        if (this.userList.length > 0) {
            for (let i in this.userList) {
                if (msg['2'] && msg['2'].replace(/\s+/g, "") != '') {
                    if (this.userList[i].userId == msg['2']) {
                        this.userList[i].cmid = cmid;
                        this.userList[i].userId = msg['2'] ? msg['2'] : this.userList[i].userId;
                        this.userList[i].name = msg.n ? NumberUtil.utf8ToSting(msg.n) : this.userList[i].name;
                        this.userList[i].img = msg.i ? msg.i : this.userList[i].img;
                    }
                }
            }
        };
        console.log(this.userList);
        // 创建元素
        this.onHtml(this.userList);
    };
    // 接口 返回的其他成员的 房间属性 存入调用数据
    setUserRAttributes(msg, cmid) {
        var is = false;
        console.log(cmid)
        if (this.userList.length > 0) {
            for (let i in this.userList) {
                // msg.shared  = 用户id
                if (msg.shared && msg.mode == "screen") {
                    is = false;
                    if (this.userList[i].userId == msg.shared) {
                        // this.userList[i].status = msg['4'] ? msg['4'] : this.userList[i].status;
                        this.userList[i].cmid = cmid;
                        this.userList[i].mode = msg.mode ? msg.mode : this.userList[i].mode;
                        //id相同 替换对应数据 break跳出当前循环
                        // this.userList.splice(i, 1, { 'userId': msg['2'] ? msg['2'] : this.userList[i].userId, 'status': msg['4'] ? msg['4'] : this.userList[i].status, 'cmid': cmid, 'name': msg.n ? NumberUtil.utf8ToSting(msg.n) : this.userList[i].name, img: msg.i ? msg.i : this.userList[i].img });
                    }
                } else {
                    is = true;
                    console.log(msg);

                    break;
                }
            }
            if (typeof (msg.banVideo) != 'undefined') {
                // 关闭视频轨道
                if (is && msg.banVideo.indexOf(this.useId) >= 0) {
                    // 关闭资源流 视频 bPause：true暂停 false不暂停   pauseSend(bPause:boolean, streamType:Entity.EStreamType, clientId:string):number;   streamType：1 关闭音频  2 关闭视频 3//是关闭音频+视频  + 屏幕共享
                    this.sdk.MakeRtcClient().pauseSend(true, 2, this.useId);
                    this.setUserAttr(this.useId, { 'medias': 'a' }, 3);
                    // let id =msg.banVideo;
                    //         if(document.getElementById(id)){

                    //         // 其他成员 标签
                    //         let video = document.getElementById(id);
                    //         // 渲染 其他成员  流
                    //         this.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
                    //     }
                } else if (is && msg.banVideo.indexOf(this.useId) < 0) {
                    this.sdk.MakeRtcClient().pauseSend(false, 2, this.useId);
                    this.setUserAttr(this.useId, { 'medias': 'av' }, 3);
                }
            }
            if (typeof (msg.banAudio) != 'undefined') {
                // 关闭音频轨道
                if (is && msg.banAudio.indexOf(this.useId) >= 0) {
                    // 关闭资源流 视频 bPause：true暂停 false不暂停   pauseSend(bPause:boolean, streamType:Entity.EStreamType, clientId:string):number;   streamType：1 关闭音频  2 关闭视频 3//是关闭音频+视频  + 屏幕共享
                    this.sdk.MakeRtcClient().pauseSend(true, 1, this.useId);
                    this.setUserAttr(this.useId, { 'medias': 'v' }, 3);
                    // let id =msg.banVideo;
                    //         if(document.getElementById(id)){

                    //         // 其他成员 标签
                    //         let video = document.getElementById(id);
                    //         // 渲染 其他成员  流
                    //         this.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
                    //     }
                } else if (is && msg.banAudio.indexOf(this.useId) < 0) {
                    this.sdk.MakeRtcClient().pauseSend(false, 1, this.useId);
                    this.setUserAttr(this.useId, { 'medias': 'av' }, 3);
                }
            }
        };
        console.log(this.userList);
        // 创建元素
        this.onHtml(this.userList);
    };
    // 设置本地数据自己的 用户属性 发送信令
    setUserAttr(id, obj, cmid) {
        console.log('预设-用户属性===>' + id);
        // 获取 obj内 的 键名
        let key = Object.keys(obj);
        // 获取 obj内 key 键名的 键值 obj[Object.keys(obj)]
        let text = obj[key];
        if (this.userList.length > 0) {
            for (let i in this.userList) {
                // 修改列表中自己的数据
                if (this.userList[i].userId == id) {
                    this.userList[i].cmid = cmid;
                    if (key == 'n') {
                        this.userList[i].name = text;
                    } else if (key == 'i') {
                        this.userList[i].img = text;
                    }
                }
                // else if (id == '') {
                //     // 预设用户属性设置  id 不赋值 为空
                //     if (key == 'n') {
                //         this.userList[i].name = text;
                //     } else if (key == 'i') {
                //         this.userList[i].img = text;
                //     }
                // }
            }
        } else {
            // if (id) {
            this.userList.push({ 'userId': id, 'status': '', 'cmid': cmid, 'name': key == 'n' ? text : '', img: key == 'i' ? text : '' });
            // } else {
            //     // 预设用户属性设置  id 不赋值 为空  本地数据 存入一个自己的id
            //     this.userList.push({ 'userId': document.getElementById('useid').value, 'status': '', 'cmid': '', 'name': key == 'n' ? text : '', img: key == 'i' ? text : '' });
            // }

        }
        console.log(this.userList);
        // 创建元素
        this.onHtml(this.userList);
        // 发送信令 用户属性设置消息
        this.sdk.MakeRtcClient().setUserAttr(id, key[0], text);

    };
    //设置本地数据自己的 房间属性 发送信令
    setRoomAttr(shared, obj, cmid) {
        console.log('预设- 房间属性 ===>' + obj);
        // 获取 obj内 的 键名
        let key = Object.keys(obj);
        // 获取 obj内 key 键名的 键值 obj[Object.keys(obj)]
        let text = obj[key];
        console.log(key, text)
        if (this.userList.length > 0) {
            for (let i in this.userList) {
                // screen 屏幕共享
                if (this.userList[i].userId == shared) {
                    this.userList[i].cmid = cmid;
                    this.userList[i].mode = obj[key];
                }
            }
        };
        console.log(this.userList);
        // 创建元素
        this.onHtml(this.userList);
        // 发送信令 房间属性 设置消息
        this.sdk.MakeRtcClient().setRoomAttr(key[0], text);
    };
    //  发布传入 setLocalStream接口内的 资源
    publish(sendFlag, streamType, clientId) {
        // streamType
        //         1 ,//是音频
        //   2 ,//2是视频
        //   3 ,//是音频+视频  + 屏幕共享
        // send(sendFlag : boolean, streamType: number, clientId:string):number;
        //send发送资源流接口 sendFlag 是否发送资源  streamType资源类型：(1 = 音频) ( 2 = 视频)  ( 3 = 音频+视频  或者 屏幕共享)  clientId用户id
        this.sdk.MakeRtcClient().publish(sendFlag, streamType, clientId);
    }
    // 获取本地摄像头视频资源
    getLocalVStream(displayMediaOptions) {
        return new Promise((resolve) => {
            navigator.mediaDevices.getUserMedia(displayMediaOptions).then(stream => {
                this.localStream = stream;
                let node = document.getElementById(document.getElementById('useid').value);
                node.muted = true;
                node.srcObject = this.localStream;
                // 发送信令 本地资源 传入 接口  资源是屏幕共享或者本地視頻的时参数screenflag是 true   音视频是 false
                this.sdk.MakeRtcClient().setLocalStream(this.localStream, false);
                resolve(stream);
            }).catch(Error => {
                console.group(Error);
                resolve(Error);
            });
        });
    };
    // 获取本地屏幕共享资源
    getLocalScreenStream(displayMediaOptions) {
        displayMediaOptions.audio = false;
        return new Promise((resolve) => {
            navigator.mediaDevices.getDisplayMedia(displayMediaOptions).then(MediaStream => {
                this.localStream = MediaStream;
                let node = document.getElementById(document.getElementById('useid').value);
                node.muted = true;
                node.srcObject = this.localStream;
                this.localStream.getVideoTracks()[0].onended = (e) => {
                    console.log(e)
                }
                // 发送信令 本地资源 传入 接口  资源是屏幕共享的时参数screenflag是 true
                this.sdk.MakeRtcClient().setLocalStream(MediaStream, true);
                let useVal = document.getElementById('useid').value;
                this.setRoomAttr(useVal, { 'mode': 'screen' }, 2);
                resolve(MediaStream);
            }).catch(Error => {
                console.group(Error);
                resolve(Error);
            });
        });
    };

};
window.onload = () => {
    const webRtc = new WebRtc();
    // let constraints = {
    //     audio: true,
    //     video: { frameRate: 2000 }
    // };
    // navigator.mediaDevices.getUserMedia({ audio: true,  video:{ frameRate: 2000 } }).then(stream => {
    //     console.log(webRtc)
    //     webRtc.localStream = stream;
    //     let node = document.getElementById('csss');
    //     node.srcObject = stream;
    // })
    // 初始化
    init(webRtc);
    // 登录
    document.getElementById('login').addEventListener('click', () => {
        login(webRtc);


    });
    // 退出
    document.getElementById('logout').addEventListener('click', () => {
        webRtc.logout();
    });
    // isp2p
    document.getElementById('isp2p').addEventListener('click', () => {
        webRtc.isp2p();
    });
    // 是否支持离线
    document.getElementById('isSupportOfflines').addEventListener('click', () => {
        webRtc.isSupportOfflines();
    });

    // 订阅指定成员资源
    document.getElementById('orderStream').addEventListener('click', () => {
        // id_video 是大流   id_video_1 是小流   id_video_1 和 id_video 这两个流区别在于分辨率差别   上层业务设计一般小窗口订阅小流，大窗口订阅大流。
        // let id = document.getElementById('Orderid').value + '_video';//大流
        let csid = document.getElementById('Orderid').value;
        // let id = csid + '_video_1' + ";" + csid+'_audio';//大流
        let id = csid + '_video_1';
        // let id=document.getElementById('Orderid').value+'_video_1';//小流
        webRtc.orderStream(id);
    });
    //  添加会议成员
    document.getElementById('addParticipant').addEventListener('click', () => {
        let useVal = document.getElementById('Orderid').value;
        // let data=[{'id':'0001','n':'0001_成员'}];
        webRtc.addParticipant(useVal, 'n', useVal + '_成员');
        // http://org.jj.woniu.com/IM/avatars/snail_woman.png
        webRtc.addParticipant(useVal, 'i', '/IM/avatars/snail_woman.png');

    });
    // 设置房主
    document.getElementById('setMaster').addEventListener('click', () => {
        let useVal = document.getElementById('Orderid').value;
        // let data=[{'id':'0001','n':'0001_成员'}];
        webRtc.sdk.MakeRtcClient().setRoomAttr('master', useVal);
    });

    // 修改 添加会议成员的用户属性
    document.getElementById('setParticipantAttr').addEventListener('click', () => {
        let useVal = document.getElementById('Orderid').value;
        webRtc.setParticipantAttr(useVal, 'n', useVal + '修改_成员');
        // http://org.jj.woniu.com/IM/avatars/snail_woman.png
        webRtc.addParticipant(useVal, 'i', '/IM/avatars/snail_woman.png');
        webRtc.sdk.MakeRtcClient().commitParticipants();
    });
    // 提交 添加的会议成员
    document.getElementById('submit').addEventListener('click', () => {
        // addParticipant添加完成之后 或者 setParticipantAttr修改添加的用户属性之后 都需调用commitParticipants() 接口
        webRtc.sdk.MakeRtcClient().commitParticipants();
    });
    // 获取设置
    document.getElementById('getSetting').addEventListener('click', () => {
        // kP2pEnable = 1,	         // p2p	是否允许建立p2p房间,不允许
        // kP2pConnectTimeout = 2,	 // p2p	建立超时时间，单位毫秒
        // kScreenIsVbr = 3,	     // 桌面共享是否采用vbr
        // kVideoIsVbr = 4,		 // 摄像头视频是否采用vbr
        // kScreenRateWatch = 5,	 // 桌面共享码率监控
        // kVideoRateWatch = 6,  	 // 视频码率监控	 
        // kReporterId = 10,          // 获取当前房间的汇报ID
        let arr = [1, 2, 3, 4, 5, 6, 10];
        arr.map(item => {
            let k = webRtc.sdk.MakeRtcClient().getSetting(item);
            console.log(k);
        })

    });
    // 获取网络状态
    document.getElementById('getNetStatus').addEventListener('click', () => {
        let s = webRtc.sdk.MakeRtcClient().getNetStatus();
        console.log(s);
    });
    // 渲染 远端的 流资源
    document.getElementById('setRemoteVideo').addEventListener('click', () => {
        // sClientId是对方的id  渲染在本地的那个video标签的id
        //    console.log(webRtc.userList[1].userId)

        // if (webRtc.userList.length > 1) {

        let v = document.getElementById('Orderid').value;
        if (v && document.getElementById(v)) {
            let video = document.getElementById(v);
            webRtc.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
        }

        // } else {
        //     alert('暂无远端ID');
        // }

        //     console.log(s);
    });
    // 登录进入房间设置 个人用户属性
    document.getElementById('setuse').addEventListener('click', () => {
        let useVal = document.getElementById('useid').value;
        // 设置个人属性  { 'medias': 'a' }//音频 { 'medias': 'v' }//视频 { 'medias': 'av' }//视频+音频  { 'medias': '' }//没有画面和语音
        // http://org.jj.woniu.com/IM/avatars/snail_woman.png
        let obj = [{ 'n': useVal + '张三' }, { 'i': '/IM/avatars/snail_woman.png' }, { 'medias': 'av' }];
        obj.map(item => {
            console.log(item);
            // useVal=自己id  item=设置的属性   3= 设置个人属性 状态值
            webRtc.setUserAttr(useVal, item, 3);
        });
    });
    // 登录进入房间   设置房间属性
    document.getElementById('setroom').addEventListener('click', () => {
        let useVal = document.getElementById('useid').value;
        // 设置房间属性[{ 'mode': 'screen' }, { 'mode': 'video' }, { 'mode': 'audio' },]
        let obj = [{ 'mode': 'screen' }];
        obj.map(item => {
            console.log(item);
            // useVal=自己id  item=设置的属性   2 = 设置房间属性 状态值
            webRtc.setRoomAttr(useVal, item, 2);
        });
    });

    // 发送指令
    document.getElementById('sendMsg').addEventListener('click', () => {
        let clientId = document.getElementById('Orderid').value;
        let msg = clientId + '==测试测试==9=aaa';
        // let msg = document.getElementById('Orderid').value;
        //  汉字字符串转成 UTF8编码
        //     let msg =NumberUtil.StingToUtf8(msgV);
        //   console.log('body:'+msg+'length:'+msg.length);
        //   sendMsg(msg:string, msgLen:number, clientId:string, token:string):number;
        webRtc.sendMsg(msg, msg.length, clientId, "");
    })
    // 禁用成员视频功能 
    document.getElementById('DisableMemberV').addEventListener('click', () => {
        // 禁用成员视频功能的id
        let otherSide = document.getElementById('Orderid').value;
        // "manager";//会议管理员    "master";//会议创建者  "banVideo";//禁用视频功能   "banAudio";//禁用音频功能
        // 多个 分号隔 禁用成员视频功能的
        // let obj = { 'banVideo': otherSide+';'+otherSide};
        // // str="a1;a2;a3;a4;a5";
        // str=obj.banVideo;
        // var strs= new Array(); //定义一数组
        // strs=str.split(";"); //字符分割
        // str.map(item => {
        //     console.log(item);
        //     webRtc.setRoomAttr(item, 2);
        // });
        // 单个 禁用成员视频功能的
        let obj = { 'banVideo': otherSide };
        webRtc.setRoomAttr(otherSide, obj, 2);
    })
    // 恢复 成员视频
    document.getElementById('recoverStreamV').addEventListener('click', () => {
        // 传空 或者 传需要禁用成员视频功能的id 不包含 需要恢复成员视频的id
        let otherSide = document.getElementById('Orderid').value;
        let obj = { 'banVideo': '' };
        webRtc.setRoomAttr(otherSide, obj, 2);
    })
    // 禁用成员音频功能 
    document.getElementById('DisableMemberAu').addEventListener('click', () => {
        // 禁用成员音频功能的id
        let otherSide = document.getElementById('Orderid').value;
        // 单个 禁用成员视频功能的
        let obj = { 'banAudio': otherSide };
        webRtc.setRoomAttr(otherSide, obj, 1);
    })
    // 恢复成员音频功能 
    document.getElementById('recoverStreamAu').addEventListener('click', () => {
        // 传空 或者 传需要禁用成员视频功能的id 不包含 需要恢复成员视频的id
        let otherSide = document.getElementById('Orderid').value;
        let obj = { 'banAudio': '' };
        webRtc.setRoomAttr(otherSide, obj, 1);
    })

    // 获取本地资源
    document.getElementById('getStream').addEventListener('click', async () => {
        let useId = document.getElementById('useid').value;
        // 获取本地资源 + 本地资源流传入 接口  等待调用send接口发布
        // let audioParam =  [{groupId:useId}];
        // let constraints = { video:  { frameRate: 2000 }, audio: true };
        let constraints = { video: true, audio: true };
        let mediaStream = await webRtc.getLocalVStream(constraints);
        // let mediaStream = await webRtc.getLocalScreenStream(constraints);
        // webRtc.getLocalVStream(constraints);
        // let tracks = webRtc.localStream.getTracks();
        // for (let idx = 0; idx < tracks.length; idx++) {
        //     console.log(tracks[idx]);
        // }
        console.log(mediaStream);
        webRtc.setRoomAttr(useId, { 'mode': 'video' }, 2);


    });
    // 发布资源流
    document.getElementById('sendStream').addEventListener('click', () => {
        let clientId = '';
        var selectCount = document.getElementById("RoomModel_select");
        if (selectCount.options[selectCount.selectedIndex].value == 'bP2pFlag') {
            clientId = document.getElementById("Orderid").value;
        }

        // 发布资源流
        webRtc.publish(true, 3, clientId);
        // let id = document.getElementById('useid').value;
        // if(document.getElementById(id)){

        //     // 其他成员 标签
        //     let video = document.getElementById(id);
        //     //   id+ '_video';//大流   id+'_video_1';//小流
        //     // 订阅 其他成员  流
        //     // webRtc.sdk.MakeRtcClient().orderStream(id+'_video');

        //     // 渲染 其他成员  流
        //     webRtc.sdk.MakeRtcClient().setRemoteVideo(video.id, video);
        // }
    })

    // 屏幕共享
    document.getElementById('getScreen').addEventListener('click', async () => {
        // let useVal = document.getElementById('useid').value;
        let constraints = { video: true, audio: true };
        let mediaStream = await webRtc.getLocalScreenStream(constraints);
        console.log(mediaStream);
        // webRtc.setRoomAttr(useVal, { 'mode': 'screen' }, 2);
        let clientId = '';
        var selectCount = document.getElementById("RoomModel_select");
        if (selectCount.options[selectCount.selectedIndex].value == 'bP2pFlag') {
            clientId = document.getElementById("Orderid").value;
        }
        // // 发布资源流
        // webRtc.send(true, 3, clientId);
    })

};

function init(webRtc) {
    console.log(webRtc.sdk);
    console.log(webRtc.sdk.MakeRtcClient());
    // 设置地址
    webRtc.setUrl();
};
async function login(webRtc) {
    let roomVal = document.getElementById('roomid').value;
    let useVal = document.getElementById('useid').value;
    webRtc.useId = document.getElementById('useid').value;
    // let useVal='debug001'
    // let useVal= webRtc.localStream.id;
    // 登录
    await webRtc.login(roomVal, useVal);
    // 调用 轮询调用返回
    webRtc.poll();
    console.log(webRtc.sdk.MakeRtcClient());


    // let constraints = { video:  { frameRate: 2000 }, audio: true };
    // let mediaStream = await webRtc.getLocalVStream(constraints);
    // console.log(mediaStream)
    // let make = webRtc.sdk.MakeRtcClient();
    // if (make._logined) {
    //     let obj = [{ 'n': useVal + '张三' }, { 'i': 'http://org.jj.woniu.com/IM/avatars/snail_woman.png' }];
    //     obj.map(item => {
    //         console.log(item);
    //         webRtc.setUserAttr(useVal, item);
    //     })
    // } else {
    //     // 设置个人属性
    //     let obj = [{ 'n': useVal + '张三' }, { 'i': 'http://org.jj.woniu.com/IM/avatars/snail_woman.png' }];
    //     obj.map(item => {
    //         console.log(item);
    //         webRtc.setUserAttr('', item);

    //     })
    // }

    //   webRtc.setUserAttr(useVal,{'n':});
    // webRtc.poll();
    // 轮询调用返回
    // setInterval(function () {
    //     let msg = webRtc.poll();
    //     if (msg) {
    //         console.log(msg);
    //         // 返回已在房间内的成员- 包含自己
    //         if (msg._arrays[1]) {
    //             console.log('_arrays ====>' + msg._arrays[1]._objs.length);
    //             // 存入容器
    //             msg._arrays[1]._objs.map(item => {
    //                 webRtc.setUserList(item._map, msg._eventId);
    //             })
    //             return console.log(msg._arrays[1]._objs);
    //         } else if (msg._map) {
    //             // 返回刚加入房间的成员 
    //             // console.log('_map ====>' + msg._map.length);

    //             // switch (msg._eventId){
    //             //     case 52: // 52 有其他成员加入
    //             //          // 存入列表 容器
    //             //         webRtc.setUserList(msg._map, msg._eventId);
    //             //         break;
    //             //     case 61: // 61 有其他成员 设置自己的用户属性
    //             //             // 用户属性 存入对应列表 容器
    //             //         webRtc.setUserList(msg._map, msg._eventId);
    //             //         break;
    //             //     default:
    //             //        console.log('其他_eventId==》 '+msg._eventId);
    //             // } 

    //             //   console.log(msg._map);
    //             // 返回刚加入房间的成员 
    //             console.log('_map ====>' + msg._map.length);
    //             // 存入容器
    //             webRtc.setUserList(msg._map, msg._eventId);
    //             return console.log(msg._map);
    //         } else {
    //             return console.log(msg);
    //         }
    //         // return console.log(msg._arrays[1]._objs);
    //     } else {
    //         return console.log(msg);
    //     };
    // }, 1000);


};