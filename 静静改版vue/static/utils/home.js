import NumberUtil from './utils';
export default {
  // 获取 跳转传的参数 在window.name中 存入 localStorage中
  GetLocaSearch(that) {
    // var search = location.search; //获取url中"?"符后的字串
    // 调试使用 临时参数
    // ?obj=%7B%22appKey%22%3A%22cpj2xarlcm2jn%22%2C%22img%22%3A%22http%3A%2F%2Forg.jj.woniu.com%2FIM%2Favatars%2Fsnail_woman.png%22%2C%22roomid%22%3A%2295f5f3bd-8134-640e-fbb1-e3866d59d7e0%22%2C%22jjtoken%22%3A%22TGT-9642-D7c5ov53vYFZUFoGJu2rVnN5CM2GbbStmhogMuA5BDejWSNm5H-oa.sso.woniu.com%22%2C%22phone%22%3A%22%2B8617749721923%22%2C%22rytoken%22%3A%22jmstFomMWQthttTMatk24LHUchUhBtwynZHP4P8JcgmtU4q5wEKBjYN3xp6hnet1e3U93PvL6RE%3D%40stku.cn.rongnav.com%3Bstku.cn.rongcfg.com%22%2C%22userId%22%3A%22f43245bd9824430b973fbf57320bb38b%22%2C%22username%22%3A%22%E9%82%A2%E9%91%AB%22%7D
    var search = 'obj=%7B%22img%22%3A%22http%3A%2F%2Forg.jj.woniu.com%2FIM%2Favatars%2Fsnail_woman.png%22%2C%22roomid%22%3A%22bb120808-0134-64da-8d54-9d7be1fe9aef%22%2C%22jjtoken%22%3A%22TGT-2579-6EmSmBh4IyAOCbdfY6drz3hlFdjpEMJDelaol9ORQayKnTxjSf-oa.sso.woniu.com%22%2C%22phone%22%3A%22%2B8613962524322%22%2C%22userId%22%3A%225bfcdc99aa55498aa1c5da6be672c136%22%2C%22username%22%3A%22123%22%2C%22mode%22%3A%22video%22%2C%22medias%22%3A%22av%22%2C%22Initiate%22%3A%225bfcdc99aa55498aa1c5da6be672c136%22%2C%22selected%22%3A%5B%7B%22id%22%3A%225bfcdc99aa55498aa1c5da6be672c136%22%2C%22n%22%3A%22123%22%2C%22i%22%3A%22http%3A%2F%2Forg.jj.woniu.com%2FIM%2Favatars%2Fsnail_woman.png%22%2C%22status%22%3A%220%22%7D%2C%7B%22id%22%3A%22f43245bd9824430b973fbf57320bb38b%22%2C%22n%22%3A%22%E9%82%A2%E9%91%AB%22%2C%22i%22%3A%22%22%2C%22status%22%3A%220%22%7D%5D%7D';
    console.log(window.location.href);
    if (search) {
      // 获取 字符串 = 之后的参数
      var str_after = search.split("=")[1];
      //  参数 先decodeURIComponent解码 再转换为json
      var data = JSON.parse(decodeURIComponent(str_after));
      console.log(data);
      // localStorage 有之前的usermsg 数据
      if (localStorage.getItem("usermsg") && localStorage.getItem("usermsg").length > 0) {
        //  删除之前的值
        localStorage.removeItem("usermsg");
        //重新赋值 存储
        localStorage.setItem("usermsg", JSON.stringify(data));
      } else {
        // 存储
        localStorage.setItem("usermsg", JSON.stringify(data));
      }
      that.msgData();
      // 去除url后面的参数
      var currenturl = window.location.href;
      var newUrl = currenturl.split("?")[0];
      // 去除地址栏的里的参数内容 页面不刷新 返回或前进
      history.pushState("", "", newUrl); //前两个参数可省略
    } else {
      that.msgData();
    }
  },
  // 获取到的参数处理 存入UserObj中
  OnMsgData(that) {
    if (localStorage.getItem("usermsg") && localStorage.getItem("usermsg").length > 0) {
      // 获取 存在localStorage里面 url后面的参数
      that.msg = JSON.parse(localStorage.getItem("usermsg"));
      // A用户--测试数据
      // that.msg={appKey: "cpj2xarlcm2jn",
      // img: "http://org.jj.woniu.com/IM/avatars/snail_woman.png",
      // jjtoken: "TGT-10015-HFsGxniYO3nnNcJwbLmOQ6bRX4ywKpvMsrv6p3OgpKmzfYsIUw-oa.sso.woniu.com",
      // phone: "+8617749721923",
      // roomid: "1111",
      // rytoken: "jmstFomMWQthttTMatk24LHUchUhBtwynZHP4P8JcgmtU4q5wEKBjYN3xp6hnet1xcMOlijWD8A=@stku.cn.rongnav.com;stku.cn.rongcfg.com",
      // userId: "f43245bd9824430b973fbf57320bb38b",
      // username: "邢鑫"}

      // B用户--测试数据
      // that.msg={ appKey: "cpj2xarlcm2jn",
      // img: "http://org.jj.woniu.com/IM/avatars/snail_woman.png",
      // jjtoken: "TGT-1785-0eeT2sazmCGA0Y0zdbiAytPvhhCHi05DBvuHBgsoQTMcxpnV5s-oa.sso.woniu.com",
      // phone: "+8613962524322",
      // roomid: "a1b8f796-d134-64d8-cb48-ae938e858394",
      // rytoken: "6bcjJPYOosbueBCXx1Jufa0p1EJctiFpOJ/9bZVryHmJtxjUUwl+LoN3xp6hnet1L9fcQwJcNXw=@stku.cn.rongnav.com;stku.cn.rongcfg.com" ,
      // userId: "5bfcdc99aa55498aa1c5da6be672c136",
      // username: "123"}

      console.log(that.msg);

      // 个人信息
      that.UserObj.id = 'f43245bd9824430b973fbf57320bb38b'||that.msg.userId;
      that.UserObj.name = '邢鑫'||that.msg.username;
      that.UserObj.img = that.msg.img;
      that.UserObj.jjtoken = that.msg.jjtoken;
      that.UserObj.phone = that.msg.phone;
      that.UserObj.status = '0';
      that.UserObj.Initiate = that.msg.Initiate;//会议发起人（房主）
      that.UserObj.mode = that.msg.mode;//房间模式
      that.UserObj.medias = that.msg.medias;//流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      // 融云 appkey token  房间号-RoomNumber
      // that.AppKey = that.msg.appKey;
      // that.ryToken = that.msg.rytoken;
      that.RoomNumber = '888888' || that.msg.roomid;// '888'; 
      //是 会议发起人url后的参数会有(selected) 会传入所有邀请的成员列表 存入本地userList
      if (that.msg.selected) {
        that.msg.selected.map((item, index) => {
          console.log(item);
          console.log(that.UserObj.id);
          console.log(that.userList);
          // 是自己的参数用
          if (item.id == that.UserObj.id) {
            // 成员列表 unshift 头部 添加
            that.userList.unshift({
              id: item.id,
              img: item.i,
              name: item.n,
              status: item.status, //成员状态 0-待加入 1-在线 2-断线  3-离开
              stream: false, //音频流+视频流
              audioPause: false, //是否暂停音频流
              videoPause: false,
              mode: that.UserObj.mode, //房间模式 video 视频+音频  seceen-屏幕共享
              medias: '', //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
              Initiate: that.UserObj.Initiate,//房主 值等于用户id
            });
          } else {
            // 成员列表
            that.userList.push({
              id: item.id,
              // 动态添加src被当做静态资源处理了，没有进行编译，需要加上require 否则默认值 本地图片加载不出来
              img: item.i ? item.i : require("@/assets/images/defaultHeadImage.jpg"),
              name: item.n,
              status: item.status, //成员状态 0-待加入 1-在线 2-断线  3-离开
              stream: false, //音频流+视频流
              audioPause: false, //是否暂停音频流
              videoPause: false,
              mode: "", // video 摄像头  seceen-屏幕共享
              medias: "", //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
              orderSwitch:false//是否订阅过
            });
          }
        });
        // that.selected=that.msg.selected;
      } else {
        // 成员列表
        that.userList.push({
          id: that.UserObj.id,
          img: that.UserObj.img,
          name: that.UserObj.name,
          status: that.UserObj.status, //成员状态 0-待加入 1-在线 2-断线  3-离开
          stream: false, //音频流+视频流
          audioPause: false, //是否暂停音频流
          videoPause: false,
          mode: that.UserObj.mode, //房间模式 video 视频+音频  seceen-屏幕共享
          medias: '', //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
          Initiate: that.UserObj.Initiate,//房主 值等于用户id
        });
      }
      if (that.UserObj.jjtoken != "" && that.UserObj.id != "") {
        // 初始化
        that.OnReady();
      }
    }

  },
  // webRtc poll回调 修改 用户列表
  OnsetList(that, msg) {
    var is = false;
    for (let i in that.userList) {
      // 2 客户端ID用户id  3 登录的KEY  4用户状态
      if (msg['2'] && msg['2'].replace(/\s+/g, "") != '') {
        if (that.userList[i].id == msg['2']) {
          is = false;
          //成员状态  0-待加入 1-在线 2-断线  3-离开
          that.$set(that.userList[i], "status", msg['4'] ? msg['4'] : that.userList[i].status);
          that.$set(that.userList[i], "img", msg.i ? msg.i : that.userList[i].img);
          that.$set(that.userList[i], "name", msg.n ? NumberUtil.utf8ToSting(msg.n) : that.userList[i].name);
          that.$set(that.userList[i], "medias", msg.medias ? msg.medias : that.userList[i].medias);
          break;//跳出当前循环
        } else {
          is = true;
        }
      }
    }
    if (is) {
      that.userList.push({
        id: msg['2'],
        img: msg.i? msg.i : require("@/assets/images/defaultHeadImage.jpg"),
        name: msg.n?NumberUtil.utf8ToSting(msg.n):'',
        status: msg['4'] ?msg['4']: '1', //成员状态  0-待加入 1-在线 2-断线  3-离开
        stream: false,
        audioPause: false,
        videoPause: false,
        mode: that.UserObj.mode, //  video 摄像头  seceen-屏幕共享
        medias: msg.medias ? msg.medias : '' //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      })
    }
    console.log(that.userList)
  },
  //本地设置自己的 用户属性 或者 房间属性  修改用户列表中自己的数据
  OnsetLocalList(that, id, msg) {
    for (let i in that.userList) {
      if (that.userList[i].id == id) {
        that.$set(that.userList[i], "img", msg.i ? msg.i : that.userList[i].img);
        that.$set(that.userList[i], "name", msg.n ? msg.n : that.userList[i].name);
        // 房间属性
        that.$set(that.userList[i], "mode", msg.mode ? msg.mode : that.userList[i].mode);
        //  用户属性
        that.$set(that.userList[i], "medias", typeof(msg.medias)!='undefined' ? msg.medias : that.userList[i].medias);
        //  音频控制器  是否暂停 音频 
        that.$set(that.userList[i], "audioPause", typeof(msg.audioPause)!='undefined' ? msg.audioPause : that.userList[i].audioPause);
        //  视频控制器  是否暂停含视频
       that.$set(that.userList[i], "videoPause", typeof(msg.videoPause)!='undefined' ? msg.videoPause : that.userList[i].videoPause);
      }
    }
  },
   // 发送消息 修改消息列表
  setMsgList(that,id,msg){
    for (let i in that.userList) {
      if (that.userList[i].id == id) {
        that.MsgList.push({
          id:id,
          img:that.userList[i].img?that.userList[i].img : require("@/assets/images/defaultHeadImage.jpg"),
          name:that.userList[i].name?that.userList[i].name:'',
          time: parseInt(new Date().getTime()),// 当前时间换时间戳
          msg:msg,
          Tmark:null,
        })
      }
    }
     console.log(that.MsgList);
    this.setMsgListTime(that,that.MsgList[0].time)
  },
  // 消息发送的时间间隔 大于等于5分钟的 时间显示 修改消息列表
  setMsgListTime(that,mark){
    that.$set(that.MsgList[0], "Tmark", true);
    for (let i in that.MsgList) {
      // 比较 两个时间戳 间隔
      if(Math.abs(mark  -  that.MsgList[i].time) >= (5 * 60 * 1000)){
          that.$set( that.MsgList[i], "Tmark", true);
          this.setMsgListTime(that,that.MsgList[i].time)
      }
    }
    console.log(that.MsgList);
  },
  // 返回的房间属性 设置是否 暂停视频 或者 音频
  setPauseAV(that,msg,type,obj){
    // 暂停音频
    // if(msg.banAudio.indexOf(that.UserObj.id)){

    // }
    var key = Object.keys(obj);
    var setkn=key[0];//用户列表中 暂停视频或者音频的 键名
    var  val= '';// 用户属性的-流 值
    var setlist={};//设置本地用户列表中 暂停视频或者音频的 对象
    var medias='';
    var is=null; //之前音频或者视频 值是true 禁止状态的 并且 房间属性返回的 暂停视频或者音频列表中没有自己id的时候 重新启动音频或者视频
    for(let i in that.userList){
      if(that.userList[i].id==that.UserObj.id){
        // 取出用户列表内自己的 用户属性- 流属性
        medias=that.userList[i].medias;
        // 取出用户列表内自己的 音频或者视频属性是否在暂停 true 暂停状态 false未暂停状态
        is=that.userList[i][key[0]];
        break;
      }
    }
    // msg 暂停列表中没有自己的id是打开被暂停的   type ：1 关闭音频  2 关闭视频 3//是关闭音频+视频  + 屏幕共享
    if(msg  == '' || msg.indexOf(that.UserObj.id)<0){
      // 打开音频或者视频
      if(is){
        // false 不暂停  true 暂停 音频或者视频
      that.WebRtcSDK.MakeRtcClient().pauseSend(false, type, that.UserObj.id);
      var  newmedias='';
      if(type==1){
          val='a';
          if(medias.indexOf(val)<0){
              newmedias=val+medias;
          }else{
              newmedias = medias;
          }
      }else if(type==2){
          val='v';
          if(medias.indexOf(val)<0){
              newmedias=medias+val;
          }else{
            newmedias = medias;
          }
      } 
      //重新设置用户属性
      let obj = [{ 'medias': newmedias}];
      that.OnSetUserAttr(obj); 
     
      setlist[setkn]=false;
      // 修改 列表数据 里自己的 暂停麦克风 值
      this.OnsetLocalList(that,that.UserObj.id,setlist);
    }

    }else{
      // msg中包含自己的id是 暂停的
      // 关闭音频
      that.WebRtcSDK.MakeRtcClient().pauseSend(true, type, that.UserObj.id);
      var newmedias='';
      if(type==1){
        val='a';
    }else if(type==2){
        val='v';
    }
    if(medias.indexOf(val)>=0){
      var reg = new RegExp(val,"g");
      newmedias = medias.replace(reg,"");
    }
    console.log(newmedias)
      //重新设置用户属性
      // let obj = [{ 'medias': 'v' }];
      let obj = [{ 'medias': newmedias }];
      that.OnSetUserAttr(obj);
      // let setlist={};
      setlist[setkn]=true;
      // 修改 列表数据 里自己的 暂停麦克风 值
      this.OnsetLocalList(that,that.UserObj.id,setlist);
    }



    // if(pause){
    //   let k= (type==1?'v':type==2?'a':'');
    //   // let name=(type==1?'audioPause':type==2?'videoPause':'') 
    //   let arrid=msg.banAudio.split(';');
    //   arrid.map(item=>{
    //     // 修改 列表数据 里自己的 暂停麦克风 值
    //     homelogic.OnsetLocalList(that,item,{'audioPause':pause});
    //   })

    //   that.WebRtcSDK.MakeRtcClient().pauseSend(pause, type, that.UserObj.id);
    //   //重新设置用户属性
    //   let obj = [{ 'medias': 'v' }];
    //   that.OnSetUserAttr(obj);
    // }else{
    //   for(let i in that.userList){
    //     if(that.userList[i].id==that.UserObj.id){
  
    //     }
    //   }
    // }
   
  },



  //  添加 userList 数据 控制器
  OnUserList(that, values) {
    that.islist = false; //  添加 userList 数据 控制器
    for (let key in values) {
      if (key != "RoomAttr" && !JSON.parse(values[key]).id) {
        try {
          that.userList.forEach(function (items, k) {
            console.log(items);
            if (items.id == key) {
              that.islist = false; //  添加 userList 数据 控制器
              // if (items.status != JSON.parse(values[key]).status) {
              //成员状态  不取待加入的状态值(本身状态就是 0) 只取成员信息信令里的状态值
              if (!JSON.parse(values[key]).n) {
                //成员状态  0-待加入 1-在线 2-断线  3-离开 
                that.UserObj.status = JSON.parse(values[key]).status;
                that.$set(that.userList[k], "status", JSON.parse(values[key]).status);
                // medias:'av',//流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
                that.UserObj.medias = JSON.parse(values[key]).medias;
                that.$set(that.userList[k], "medias", JSON.parse(values[key]).medias);
              }
              // web版 有时获取到的成员名称为陌生人 这里直接替换成员自己发布的信令 （用户属性设置 个人信息）
              that.$set(that.userList[k], "name", JSON.parse(values[key]).name || JSON.parse(values[key]).n);
              // 动态添加src被当做静态资源处理了，没有进行编译，需要加上require 否则默认值 本地图片加载不出来
              that.$set(that.userList[k], "img", JSON.parse(values[key]).img.length > 0 ? JSON.parse(values[key]).img : require("@/assets/images/defaultHeadImage.jpg"));
              // 成员是在线状态（1）时 资源流 不变 否则直接给false
              that.$set(that.userList[k], "stream", JSON.parse(values[key]).status == "1" ? that.userList[k].stream : false);
              // video 摄像头  seceen-屏幕共享
              that.$set(that.userList[k], "mode", JSON.parse(values[key]).mode ? JSON.parse(values[key]).mode : 'video');

              console.log(JSON.parse(values[key]).medias);
              console.group(values[key]);
              // }
              var a = aaaa; // first second 后就报错，就跳出循环了
              throw new Error("ending"); //报错，就跳出循环
            } else {
              that.islist = true;
            }
          });
        } catch (e) {
          if (e.message == "ending") {
            console.log("结束了");
          } else {
            // console.log(e.message);
          }
        }
        if (that.islist) {
          console.log(that.islist);
          that.userList.push({
            id: key,
            img: JSON.parse(values[key]).img,
            name: JSON.parse(values[key]).name,
            status: JSON.parse(values[key]).status, //成员状态  0-待加入 1-在线 2-断线  3-离开
            stream: false,
            audioPause: false,
            mode: JSON.parse(values[key]).mode, // video 摄像头  seceen-屏幕共享
            medias: JSON.parse(values[key]).medias //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
          });
        }
      }
    }
  },
  // 加入房间之后处理- 获取+发送 信令
  OnJoinRoom(that) {
    // 获取房间属性+用户信息+ 待加入的人员信息  参数传空 获取所有
    that.OnGetRoomData("");
    // 待加入成员 信令 发送
    if (that.msg.selected) {
      that.msg.selected.map((item, index) => {
        that.OnSetRoomData(item.id, JSON.stringify(item), "Snail:AddPartInfo");
      });
    }
    // 用户属性设置消息 medias
    let content = {
      csid: that.UserObj.id,
      img: that.UserObj.img,
      name: that.UserObj.name,
      status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
      medias: "av" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
    };
    //用户属性 信令 发送
    that.OnSetRoomData(that.UserObj.id, JSON.stringify(content), "Snail:SetUserInfo");
    // 获取自己的用户信息 修改userList 数据
    that.OnGetRoomData(that.UserObj.id);
  },
  // 控制摄像头
  OncloseVideo(that, videoStream, user) {
    //用户属性的 流属性（medias）设置消息  修改流的状态 发送信令 通知房间内 状态改变
    //  验证流属性是否包含音频
    var str = that.UserObj.medias;
    var reg = RegExp(/a/);
    if (that.videoshow) {
      // 关闭摄像头
      that.videoshow = false;
      // 融云-关闭流摄像头
      videoStream.disable(user);
      //用户属性的 流属性（medias）设置消息  修改流的状态 发送信令 通知房间内 状态改变
      var content = {
        csid: that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "a" : "" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    } else {
      // 开启摄像头
      that.videoshow = true;
      // 融云-开启流摄像头
      videoStream.enable(user);
      var content = {
        csid: that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "av" : "v" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    }
    // 发送自己的用户属性 信令 发送
    that.OnSetRoomData(that.UserObj.id, JSON.stringify(content), "Snail:SetUserInfo");
  },
  // 控制麦克风
  OncloseAudio(that, audioStream, user) {
    //用户属性的 流属性（medias）设置消息  修改流的状态 发送信令 通知房间内 状态改变
    //  验证流属性是否包含视频
    var str = that.UserObj.medias;
    var reg = RegExp(/v/);
    if (that.audioPause) {
      // 关闭 麦克风
      that.audioPause = false;
      // // 融云-关闭流麦克风
      audioStream.mute(user);
      var content = {
        csid: that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "v" : "" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    } else {
      // 开启 麦克风
      that.audioPause = true;
      audioStream.unmute(user);
      var content = {
        csid: that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "av" : "a" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    }
    // 发送自己的用户属性 信令 发送
    that.OnSetRoomData(that.UserObj.id, JSON.stringify(content), "Snail:SetUserInfo");
  },
} 