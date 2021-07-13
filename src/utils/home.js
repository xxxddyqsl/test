export default {
   // 获取 跳转传的参数 在window.name中 存入 localStorage中
  GetLocaSearch(that) {
    var search = location.search; //获取url中"?"符后的字串
    // ?obj=%7B%22appKey%22%3A%22cpj2xarlcm2jn%22%2C%22img%22%3A%22http%3A%2F%2Forg.jj.woniu.com%2FIM%2Favatars%2Fsnail_woman.png%22%2C%22roomid%22%3A%2295f5f3bd-8134-640e-fbb1-e3866d59d7e0%22%2C%22jjtoken%22%3A%22TGT-9642-D7c5ov53vYFZUFoGJu2rVnN5CM2GbbStmhogMuA5BDejWSNm5H-oa.sso.woniu.com%22%2C%22phone%22%3A%22%2B8617749721923%22%2C%22rytoken%22%3A%22jmstFomMWQthttTMatk24LHUchUhBtwynZHP4P8JcgmtU4q5wEKBjYN3xp6hnet1e3U93PvL6RE%3D%40stku.cn.rongnav.com%3Bstku.cn.rongcfg.com%22%2C%22userId%22%3A%22f43245bd9824430b973fbf57320bb38b%22%2C%22username%22%3A%22%E9%82%A2%E9%91%AB%22%7D
    // http://172.18.70.26:8080/?obj=%7B%22appKey%22%3A%22cpj2xarlcm2jn%22%2C%22img%22%3A%22http%3A%2F%2Forg.jj.woniu.com%2FIM%2Favatars%2Fsnail_woman.png%22%2C%22roomid%22%3A%2295f5f3bd-8134-640e-fbb1-e3866d59d7e0%22%2C%22jjtoken%22%3A%22TGT-9642-D7c5ov53vYFZUFoGJu2rVnN5CM2GbbStmhogMuA5BDejWSNm5H-oa.sso.woniu.com%22%2C%22phone%22%3A%22%2B8617749721923%22%2C%22rytoken%22%3A%22jmstFomMWQthttTMatk24LHUchUhBtwynZHP4P8JcgmtU4q5wEKBjYN3xp6hnet1YGjFEx4HKcs%3D%40stku.cn.rongnav.com%3Bstku.cn.rongcfg.com%22%2C%22userId%22%3A%22f43245bd9824430b973fbf57320bb38b%22%2C%22username%22%3A%22%E9%82%A2%E9%91%AB%22%7D#/
    console.log(window.location.href);
    if (search) {
      // 获取 字符串 = 之后的参数
      var str_after = search.split("=")[1];
      //  参数 先decodeURIComponent解码 再转换为json
      var data = JSON.parse(decodeURIComponent(str_after));
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
  OnMsgData(that){
    if (localStorage.getItem("usermsg") &&localStorage.getItem("usermsg").length > 0) {
      // 获取 存在localStorage里面 url后面的参数
      that.msg = JSON.parse(localStorage.getItem("usermsg"));
      console.log(that.msg);
      // 个人信息
      that.UserObj.id = that.msg.userId;
      that.UserObj.name = that.msg.username;
      that.UserObj.img = that.msg.img;
      that.UserObj.jjtoken = that.msg.jjtoken;
      that.UserObj.phone=that.msg.phone;
      that.UserObj.status='1';
      // 融云 appkey token  房间号-RoomNumber
      that.AppKey = that.msg.appKey;
      that.ryToken = that.msg.rytoken;
      that.RoomNumber = that.msg.roomid;
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
              status: "1", //成员状态 0-待加入 1-在线 2-断线  3-离开
              stream: false, //音频流+视频流
              audioshow: false, //是否有音频流
              mode: "", // video 摄像头  seceen-屏幕共享
              medias: "av" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
            });
          } else {
            // 成员列表
            that.userList.push({
              id: item.id,
              // 动态添加src被当做静态资源处理了，没有进行编译，需要加上require 否则默认值 本地图片加载不出来
              img: item.i ? item.i : require("@/assets/images/defaultHeadImage.jpg"),
              name: item.n,
              status:item.status, //成员状态 0-待加入 1-在线 2-断线  3-离开
              stream: false, //音频流+视频流
              audioshow: false, //是否有音频流
              mode: "", // video 摄像头  seceen-屏幕共享
              medias: "av" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
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
          status: "1", //成员状态  0-待加入 1-在线 2-断线  3-离开
          stream: false, //音频流+视频流
          audioshow: false, //是否有音频流
          mode: "video", // video 摄像头  seceen-屏幕共享
          medias: "av" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
        });
      }
      if (that.ryToken != "" && that.AppKey != "") {
        // 初始化
        that.OnReady();
      }
    }
    
  },
  //  添加 userList 数据 控制器
  OnUserList(that, values) {
    that.islist = false; //  添加 userList 数据 控制器
    for (let key in values) {
      if (key != "RoomAttr"&& !JSON.parse(values[key]).id) {
        try {
          that.userList.forEach(function (items, k) {
            console.log(items);
            if (items.id == key) {
              that.islist = false; //  添加 userList 数据 控制器
              // if (items.status != JSON.parse(values[key]).status) {
                //成员状态  不取待加入的状态值(本身状态就是 0) 只取成员信息信令里的状态值
                if (!JSON.parse(values[key]).n) {
                  //成员状态  0-待加入 1-在线 2-断线  3-离开 
                  that.UserObj.status=JSON.parse(values[key]).status;
                  that.$set(that.userList[k], "status", JSON.parse(values[key]).status);
                   // medias:'av',//流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
                  that.UserObj.medias=JSON.parse(values[key]).medias;
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
            audioshow: false,
            mode: JSON.parse(values[key]).mode, // video 摄像头  seceen-屏幕共享
            medias: JSON.parse(values[key]).medias //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
          });
        }
      }
    }
  },
  // 加入房间之后处理- 获取+发送 信令
  OnJoinRoom(that){
       // 获取房间属性+用户信息+ 待加入的人员信息  参数传空 获取所有
       that.OnGetRoomData("");
       // 待加入成员 信令 发送
       if (that.msg.selected) {
         that.msg.selected.map((item, index) => {
           that.OnSetRoomData( item.id, JSON.stringify(item), "Snail:AddPartInfo");
         });
       }
       // 用户属性设置消息 medias
       let content = {
        csid:that.UserObj.id,
         img: that.UserObj.img,
         name: that.UserObj.name,
         status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
         medias: "av" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
       };
      //用户属性 信令 发送
       that.OnSetRoomData( that.UserObj.id, JSON.stringify(content), "Snail:SetUserInfo" );
       // 获取自己的用户信息 修改userList 数据
       that.OnGetRoomData(that.UserObj.id);
  },
   // 控制摄像头
  OncloseVideo(that,videoStream,user){
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
        csid:that.UserObj.id,
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
        csid:that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "av" : "v" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    }
    // 发送自己的用户属性 信令 发送
    that.OnSetRoomData(that.UserObj.id,JSON.stringify(content),"Snail:SetUserInfo");
  },
 // 控制麦克风
  OncloseAudio(that,audioStream,user){
    //用户属性的 流属性（medias）设置消息  修改流的状态 发送信令 通知房间内 状态改变
      //  验证流属性是否包含视频
      var str = that.UserObj.medias;
      var reg = RegExp(/v/);
    if (that.audioshow) {
      // 关闭 麦克风
      that.audioshow = false;
       // // 融云-关闭流麦克风
      audioStream.mute(user);
      var content = {
        csid:that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "v" : "" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    } else {
      // 开启 麦克风
      that.audioshow = true;
      audioStream.unmute(user);
      var content = {
        csid:that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        status: that.UserObj.status, //0 待加入  1 在线  2 断线  3 离开
        medias: reg.test(str) ? "av" : "a" //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
    }
    // 发送自己的用户属性 信令 发送
    that.OnSetRoomData(that.UserObj.id,JSON.stringify(content),"Snail:SetUserInfo");
  },
}