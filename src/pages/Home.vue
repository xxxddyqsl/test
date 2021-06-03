<template>
  <div class="home-wrapper">
    <div class="home-header gg-flex-3">
      <span class="home-header-rtc-title" id="rtc-UserName" v-text="'提交测试 用户名:' + UserObj.name"></span>
      <!-- <span class="home-header-rtc-title" id="rtc-UserId">(17749721923_gd85_web)</span> -->
      <span class="home-header-rtc-title home-header-rtc-time"></span>
      <span class="home-header-rtc-title home-header-rtc-room" id="rtc-room">会议室 ID: {{ RoomNumber }}</span>
      <div class="home-header-rtc-right">
        <button @click="OnAddlist" class="home-header-rtc-btn home-header-rtc-userlist-add gg-flex-1" title="添加成员">
          <img class="home-header-rtc-userlist-add-icon" src="../assets/images/userList-add.png" alt="" />
        </button>
        <button @click="OnlineMember(true)" class="home-header-rtc-btn home-header-rtc-userlist" title="在线成员"></button>
        <button @click="Oncutover" class="home-header-rtc-btn home-header-rtc-screenshare" title="结束屏幕共享"></button>
        <button @click="OnLeaveTheRoom" class="home-header-rtc-btn home-header-rtc-hangup" v-show="TurnOnhangupbtn" title="挂断"></button>
      </div>
    </div>
    <div class="home-main" id="videobox">
      <div class="home-main-stream-wrap gg-flex-1">
        <div id="home-main-stream-list" class="home-main-stream-list gg-flex-3">
          <div class="home-main-list-case-pre" @click="scrollTab('left')" v-show="slideXshow"></div>
          <div class="home-main-list-case-next" @click="scrollTab('right')" v-show="slideXshow"></div>
          <div id="home-main-stream-box">
            <!--使用template 包装元素 上使用for循环-->
            <template v-for="item in userList">
              <div :key="item.id" :style="{ transform: 'translateX(' + slideX + 'px)' }" :id="item.id + '-box'" :class="[
                  item.id == selectItemId
                    ? 'home-main-stream-is-zoom'
                    : 'home-main-stream-item',
                ]" v-if="item.stream != false" @click="toggle(item.id)">
                <!-- srcObject不是HTML属性，而是DOM属性。因此，您需要使用特殊的修饰符将其绑定：<video :srcObject.prop="stream"> -->
                <video :id="item.id" v-bind:data-stream="item.stream.id" :srcObject.prop="item.stream" autoplay></video>
                <div class="home-main-stream-top" v-if="item.id == UserObj.id">
                  <span id="soundGif" v-show="item.audioshow && audioshow"><img class="home-main-stream-top-sound home-main-stream-top-sound-show" src="../assets/images/sound.gif" /></span>
                  <p class="home-main-stream-top-name" :style="{
                      fontSize: item.id == selectItemId ? '18px' : '13px',
                    }">
                    自己
                  </p>
                </div>

                <div class="home-main-stream-opt" :class="[item.id == selectItemId ? 'gg-flex-1' : 'gg-flex-3']">
                  <template v-if="item.id == UserObj.id">
                    <i v-show="!cutover" @click.stop="" class="home-main-stream-opt-btn" @click="closeVideo" :class="[
                        videoshow
                          ? 'home-main-stream-opt-video'
                          : 'home-main-stream-opt-video-disabled',
                      ]"></i>
                    <i @click.stop="" v-show="item.audioshow" class="home-main-stream-opt-btn" @click="closeAudio" :class="[
                        audioshow
                          ? 'home-main-stream-opt-audio'
                          : 'home-main-stream-opt-audio-disabled',
                      ]"></i>
                    <i v-show="!cutover" @click.stop="" class="home-main-stream-opt-btn home-main-stream-opt-FullScreen" @click="requestFullScreen(item.id)"></i>
                  </template>
                  <template v-else>
                    <span class="home-main-stream-video-name-box gg-flex-1">
                      <div class="home-main-stream-video-name">
                        {{ item.name }}
                      </div>
                      <i @click.stop="" class="home-main-stream-opt-btn home-main-stream-opt-FullScreen" @click="requestFullScreen(item.id)"></i>
                    </span>
                  </template>
                </div>

                <div class="home-main-stream-opt-video-cover gg-flex-1 gg-flex-2" v-show="!videoshow && item.id == UserObj.id">
                  <img class="home-main-stream-opt-video-cover-img" src="../assets/images/audio-cover.png" />
                  <p class="home-main-stream-opt-video-cover-title" v-show="item.id == selectItemId">
                    摄像头已关闭
                  </p>
                </div>
                <!-- v-show="!cutover && item.id ==  UserObj.id" -->
                <div class="home-main-stream-opt-video-cover gg-flex-1 gg-flex-2" v-show="cutover && item.id == UserObj.id">
                  <img style="width: 200px" class="home-main-stream-opt-video-cover-img" src="../assets/images/share-cover.png" />
                  <p class="home-main-stream-opt-video-cover-title" v-show="item.id == selectItemId">
                    正在分享屏幕
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="home-main-user-list-box gg-flex-1 gg-flex-2" v-show="membershow">
          <div class="home-main-user-list-title gg-flex-3">
            <div class="home-main-user-list-online">
              <span>成员人数 ( {{ userList.length }} ) 人</span>
            </div>

            <div class="home-main-user-list-close" @click="OnlineMember(false)">
              <span>关闭</span>
            </div>
          </div>
          <div class="home-main-user-list">
            <div class="home-main-user-list-item gg-flex-3" v-for="item in userList" :key="item.id" :title="
                item.status == '0'
                  ? '待加入'
                  : item.status == '1'
                  ? '在线'
                  : item.status == '2'
                  ? '断线'
                  : '离开'
              ">
              <img class="home-main-user-list-item-icon" :src="item.img" alt="" />
              <div class="home-main-user-list-item-name">{{ item.name }}</div>
              <!-- 多个class（其中包含三元表达式）的写法 -->
              <i :class="[
                  'home-main-user-list-item-status',
                  item.status != '1'
                    ? 'home-main-user-list-item-status-not'
                    : '',
                ]"></i>
              <!-- <div class="home-main-user-list-item-mode home-main-user-list-item-mode-join-video">视频</div> -->
              <!-- <div class="home-main-user-list-item-Initiate">创建人</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--子组件  添加会议成员 v-show="addlistshow"-->
    <AddMember v-if="SetUpshow" v-on:setup="showAddlist" :FriendsList="FriendsList" :FrequentlyUsedContactsList='FrequentlyUsedContactsList' :treeData='treeData'></AddMember>
 <!-- <div id="demio" style="position: relative;"> 
        <Vscroll></Vscroll>
      </div> -->
  </div>
</template>
<script>
// 导入组件  <!-- 添加会议成员 -->
import ListofPeople from '@/utils/ListofPeople';

import AddMember from "../components/home/AddMember.vue";
// import Vscroll from "../components/vscroll/vscroll.vue";
import homelogic from '@/utils/home';
export default {
  name: "Home",
  components: {
    //  <!--子组件  添加会议成员 -->
    'AddMember': AddMember, 
      // 'v-scroll':Vscroll
  },
  data() {
    return {
      color:'red',
      im: null, //RongIMLib 实例对象
      rongRTC: null, // RTC  实例化
      room: null, //房间管理
      storage: null, //房间属性
      message: null, //信令管理
      RoomNumber: "", //房间号
      stream: null, //资源管理
      StreamType: null, // 发布资源类型
      localStream: null, //本地资源 摄像头 麦克风
      AudioTrack: null, // 本地的资源的音频轨
      VideoTrack: null, // 本地的资源的视频轨
      constraints: { video: true, audio: true }, //通话约束条件
      // constraints: this.$route.params.constraints, //上一页 传入的通话约束条件
      msg: "",
      UserObj: {},
      selectItemId: "", //根据id 切换class 放大
      AppKey: "",
      // AppKey: "cpj2xarlcm2jn",
      // AppSecret: "RIXWxOHDQwC",
      ryToken: "", //融云token
      // Token:"Wj/Hh5WORriMK49diDBD8BC/WyAbItg+ARQjLJbMs+E=@stku.cn.rongnav.com,stku.cn.rongcfg.com",
      cutover: false, //屏幕共享 切换控制
      islist: false, //控制 是否添加数据 还是修改对应数据的值
      videoshow: true, //摄像头 控制
      audioshow: true, //摄像头 控制
      membershow: false, //在线成员列表 控制
      slideX: 0, // 滑动距离
      page: 1, //当前滑动的翻页数
      count: 0, //滑动的翻页的总页数
      slideXshow: false, //控制滑动是否显示
      userList: [], //成员展示列表
      selected: [], //所以邀请加入视频会议的人员列表-发送信令
      treeData:[],//添加成员 组织架构 数据
      FriendsList:[],//添加成员   联系人 -  我的好友列表 数据
      FrequentlyUsedContactsList:[],// 添加成员  联系人 - 常用联系人
      SetUpshow: false,//控制添加成员子组件显示隐藏
      TurnOnhangupbtn:false,//加入房间之后 可点击启用 挂断按钮
      // checkLists: [
      //   { id: 'A', label: '手机1', img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 0, checked: true, disable: true },
      //   { id: 'B', label: '电视',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 1, checked: true, disable: true },
      //   { id: 'C', label: '洗衣机',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', },
      //   { id: 'D', label: '冰箱',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 3, value: 2, checked: true, },
      //   { id: 'E', label: '家用电器',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 4, },
      //   { id: 'F', label: '手机2',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 5 },
      //   { id: 'G', label: '电视1', img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111',value: 6 },
      //   { id: 'H', label: '洗衣机1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 7, },
      //   { id: 'I', label: '冰箱1', img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111',value: 8 },
      //   { id: 'J', label: '家用电器1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 9 },
      //    { id: 'H1', label: '洗衣机1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 7, },
      //   { id: 'I1', label: '冰箱1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 8 },
      //   { id: 'J1', label: '家用电器1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 9 },
      //    { id: 'H2', label: '洗衣机1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 7, },
      //   { id: 'I2', label: '冰箱1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 8 },
      //   { id: 'J2', label: '家用电器1',img:require('@/assets/images/defaultHeadImage.jpg'),phone:'111', value: 9 },
      // ],
    };
  },
  watch: {
    treeData(val){
      if(val!=''){
         if(this.FriendsList!='') {
            console.log(val,this.FriendsList);
            this.setListId(val,this.FriendsList)
         };
         if(this.FrequentlyUsedContactsList!=''){
            this.setListId(val,this.FrequentlyUsedContactsList);
         }
      }
    },
    FriendsList(val){
      if(val!=''){
         console.log(val);
         if(this.treeData!=''){
            console.log(val,this.treeData);
            this.setListId(this.treeData,val)
         };
      }
    },
    FrequentlyUsedContactsList(val){
      if(val!=''){
         if(this.treeData!=''){
            console.log(val,this.treeData);
            this.setListId(this.treeData,val)
         };
      }
    },
  },
  created() {
    //  获取 跳转传入的 的参数
    this.GetLocaSearch();
  },
  mounted() {
    // 控制 是否开启左右滑动
    this.OnslideXshow();
  },
  methods: {
    // 修改联系人id
    setListId(data,fdata){
      for(let i in fdata){
        try{
        data.forEach((item,index)=>{
          if(item.IsEmp){
            if(item.SUserId==fdata[i].SUserId){
              fdata[i].id=item.id;
               var a = aaaa;
              throw new Error("ending");
            }
          }else{
            this.setListId(item.children,fdata)
          }
        })
        } catch (e) {};
        
      }
     
    },
    // 获取 跳转传的参数 在window.name中
    GetLocaSearch() {
      homelogic.GetLocaSearch(this);
    },
    // 获取到的参数处理 存入UserObj中
    msgData() {
      homelogic.OnMsgData(this);
    },
    // 点击切换 video 放大
    toggle(itemid) {
      if (itemid != this.selectItemId) {
        this.selectItemId = itemid;
      }
    },
    // 初始化 im Token
    OnReady() {
      let that = this;
      // 应用初始化以获取 RongIMLib 实例对象，请务必保证此过程只被执行一次
      that.im = RongIMLib.init({ appkey: that.AppKey });
      // 添加事件监听器
      that.im.watch({
        // 连接状态监听
        status(evt) {
          console.log("连接状态码:", evt.status);
        },
        // 消息监听
        message(evt) {
          console.log("收到新消息:", evt.message);
        }
      });
      // Token 连接
      that.im
        .connect({ token: that.ryToken })
        .then(user => {
          // that.UserObj.id = user.id;
          that.selectItemId = user.id;
          // 初始化
          that.OnJoinRoom();
          console.log("链接成功, 链接用户 id 为: ", user.id);
        })
        .catch(error => {
          console.log("链接失败: ", error.code, error.msg);
        });

      // RTC SDK 实例化
      this.rongRTC = new RongRTC({
        RongIMLib: RongIMLib
      });
      // // 按需调用各模块实例 API
      let { Room, Stream, Message, Device, Storage, StreamType } = this.rongRTC;
      //实例化 资源类型模块
      this.StreamType = StreamType;
      // 实例化 房间属性
      this.storage = new Storage();
      // 实例化 信令模块，提供向房间内发送信令能力。
      this.message = new Message({
        //  信令模块 收到房间内消息
        received: message => {
          console.log(message);
          // 获取房间数据
          if (message.name == "Snail:SetRoomInfo") {
            that.OnGetRoomData("RoomAttr");
          } else if (message.name == "Snail:AddPartInfo") {
            //  获取待加入的人员信息
            that.OnGetRoomData(message.content.infoValue.userId);
          } else if (message.name == "Snail:SetUserInfo") {
            // 获取用户属性设置信息
            that.OnGetRoomData(message.senderId);
          }
        }
      });
      // 按需调用各模块实例 API  -Room
      // 实例化 Room 后可获得 room 实例 房间管理模块
      this.room = new Room({
        // 音视频房间 ID
        id: that.RoomNumber, // 设置房间号  为 testA
        joined: function (user) {
          // user.id 加入房间
          // 修改 已创建的 视频流 容器 或者 切换容器视频流
          that.OnModifyVideo(user.id, false);
          console.log("加入房间:" + user.id);

          // // 获取房间属性
          // that.OnGetRoomData('RoomAttr');
          // // 获取用户消息
          // that.OnGetRoomData(user.id);
        },
        left: function (user) {
          // user.id 离开房间
          console.log("离开房间:" + user.id);
        },
        kick: function (msg) {
          // 当前登录 user 被踢出房间
          console.log(msg);
        }
      });

      // 实例化 Stream 后可获得 stream 实例。用户发布视频流、取消视频流将会触发实例化时设置的回掉函数: published 、 unpublished。
      this.stream = new Stream({
        // 成员已发布资源，此时可按需订阅
        published: function (user) {
          that.stream.subscribe(user).then(user => {
            console.log("成员发布资源1");
            console.log(user);
            let {
              id,
              stream: { tag, mediaStream }
            } = user;
            // 修改 已创建的 视频流 容器 或者 切换容器视频流
            that.OnModifyVideo(id, mediaStream);
          });
        },
        // 成员已取消发布资源，此时需关闭流
        unpublished: function (user) {
          // 当对方成员取消订阅后，会自动触发此函数，此时己方取消订阅对方音视频流，然后做页面移除对方 video 节点即可
          that.stream.unsubscribe(user).then(function () {
            // 修改 已创建的 视频流 容器 或者 切换容器视频流
            // that.OnModifyVideo(user.id, false);
          });
        }
      });
    },
    // 加入房间 获取本地流
    OnJoinRoom() {
      let that = this;
      // 加入房间
      let user = {
        id: this.RoomNumber //房间号
      };
      this.room.join(user).then(
        () => {
          console.log("join successfully");
          // 加入房间之后处理- 获取+发送 信令
          homelogic.OnJoinRoom(this);
          // 获取本地摄像头资源+发布资源
          that.OnLocalCamera();
        },
        error => {
          console.log(error);
        }
      );
    },
    // 设置房间数据
    OnSetRoomData(val, content, name) {
      console.log(val);
      let key = val;
      //  let value ='{"mode":'+val+'}'; //  let value ='{"mode":'seceen'}';
      let value = content;
      // 设置房间数据
      this.storage.set(key, value);
      // 发送信令, 通过此接口向房间内发送信令
      this.OnSendSignaling(val, name);
    },
    // 获取房间数据(或者用户信息和待加入的消息)
    OnGetRoomData(id) {
      let that = this;
      console.log(id);
      if (id != "") {
        var keys = [id];
      } else {
        // 获取所有房间属性+用户信息+ 待加入的人员信息  参数传空数组
        var keys = [];
      }
      this.storage.get(keys).then(values => {
        //  添加 userList 数据 
        homelogic.OnUserList(this, values);
        console.log(values);
        console.log(that.userList);
      });
    },
    // 发送信令, 通过此接口向房间内发送信令，房间内成员收到信令后会触发 received。
    OnSendSignaling(val, names) {
      let name = names;
      let content = {
        key: val
      };
      this.message.send({ name, content }).then(() => {
        console.log("Send Successfully");
      }, error => {
        console.log(error);
      }
      );
    },
    //切换资源-屏幕共享资源
    async Oncutover() {
      let that = this;
      if (!this.cutover) {
        // 获取 屏幕共享资源
        that.Onscreenshare();
      } else {
        // 取消发布的资源 异步等待结果处理
        await that.OnUnpublish();
        // 获取本地摄像头资源
        that.OnLocalCamera();
      }
    },
    // 获取 屏幕共享资源
    Onscreenshare() {
      let that = this;
      // 原生 屏幕共享    音频输出的电脑自身的声音 无法输出外部的声音 需特殊处理
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then(async function (MediaStream) {
          that.cutover = true; //资源切换控制器
          // 取消发布的资源 异步等待结果处理
          await that.OnUnpublish();
          if (MediaStream.getAudioTracks()[0]) {
            // 删除屏幕共享 音频轨（必须先删除已有的音频，才能添加音频。否则无效）
            MediaStream.removeTrack(MediaStream.getAudioTracks()[0]);
          }
          // // 获取本地的 视频数据和音频数据
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(stream => {
              // 本地音频轨添加 屏幕共享里面
              MediaStream.addTrack(stream.getAudioTracks()[0]);
              that.localStream = MediaStream;
              //修改 已创建的 视频流 容器 或者 切换容器视频流
              that.OnModifyVideo(that.UserObj.id, MediaStream);
              // 设置房间属性 -屏幕共享
              that.OnSetRoomData(
                "RoomAttr",
                JSON.stringify({
                  id: that.UserObj.id,
                  mode: "seceen",
                }),
                "Snail:SetRoomInfo"
              );
              // 发布本地资源  - 摄像头 麦克风
              that.OnPublishResources();
            })
            .catch(Error => {
              console.log(Error);
            });
        })
        .catch(Error => {
          console.log(Error);
        });
    },
    // 获取本地摄像头资源
    OnLocalCamera() {
      let that = this;
      console.log(that.constraints);
      // var constraints=JSON.parse(JSON.stringify(that.constraints))
      //  console.log(constraints);
      that.stream.get(that.constraints).then(({ mediaStream }) => {
        // 设置房间属性 - 本地摄像头资
        that.OnSetRoomData(
          "RoomAttr",
          JSON.stringify({
            mode: "video",
          }),
          "Snail:SetRoomInfo"
        );
        that.localStream = mediaStream;
        that.cutover = false; //资源切换控制器
        // 修改 已创建的 视频流 容器 或者 切换容器视频流
        that.OnModifyVideo(that.UserObj.id, mediaStream);
        // 发布本地资源  - 摄像头 麦克风
        that.OnPublishResources();
      },
        error => {
          console.log(error);
        }
      );
    },
    // 修改已有的 或 添加 视频流 数据 页面循环展示
    OnModifyVideo(id, MediaStream) {
      let that = this;
      // try {
      //   //跳出循环 //使用break报错 //使用return不能跳出整个循环 //使用try···catch捕获异常实现。
      that.userList.forEach(function (item, index) {
        if (item.id === id) {
          // that.islist = false; //  添加 streamList数据 控制器
          that.$set(that.userList[index], "stream", MediaStream); //修改已有的
          that.$set(
            that.userList[index],
            "audioshow",
            MediaStream && MediaStream.getAudioTracks()[0] ? true : false
          );
        }
      });
      // 是否可以 滑动
      this.OnslideXshow();
      console.log(that.userList);
    },
    // 发布本地资源  - 摄像头 麦克风
    OnPublishResources() {
      let that = this;
      let user = {
        id: that.UserObj.id,
        stream: {
          tag: "RongCloudRTC",
          type: this.StreamType.AUDIO_AND_VIDEO,
          mediaStream: this.localStream
        }
      };
      this.stream.publish(user).then(
        () => {
          that.TurnOnhangupbtn=true;

          console.log("发布成功");
        },
        error => {
          console.log(error);
        }
      );
    },

    //离开房间
    OnLeaveTheRoom() {
      let that = this;
      // 用户属性设置消息  修改用户的状态 发送信令 通知房间内 状态改变
      let content = {
        csid:that.UserObj.id,
        img: that.UserObj.img,
        name: that.UserObj.name,
        type: "Snail:SetUserInfo",
        status: "3", //0 待加入  1 在线  2 断线  3 离开
        medias: that.UserObj.medias //流属性 a-仅包含音频 v-仅包含视频 av-包含音视频
      };
      that.OnSetRoomData(
        that.UserObj.id,
        JSON.stringify(content),
        "Snail:SetUserInfo"
      );
      // 离开房间
      this.room.leave().then(
        () => {
          console.log(that.userList);
          console.log("leave successfully");

          //  删除存储在本地 之前url传入的值
          // localStorage.removeItem("usermsg");

          //vue 回到上一页
          // that.$router.go(-1);
          // vue刷新当前页面，重载页面数据
          // that.$router.go(0);
        },
        error => {
          console.log(error);
        }
      );
    },
    // 取消发布的资源  - 摄像头 麦克风
    OnUnpublish() {
      let that = this;
      let user = {
        id: that.UserObj.id,
        stream: {
          tag: "RongCloudRTC",
          type: this.StreamType.AUDIO_AND_VIDEO
        }
      };
      return new Promise((resolve, reject) => {// 取消发布的资源 异步等待结果处理
        this.stream.unpublish(user).then(
          result => {
            console.log("取消发布成功");
            // that.localStream = null;
            // promise resolve执行函数下方的代码（Onscreenshare()获取屏幕资源） 否则下面代码不执行
            resolve();
          },
          error => {
            console.log(error);
          }
        );
      });
    },
    // 控制摄像头
    closeVideo() {
      let that = this;
      // this.stream 资源管理
      let { video: videoStream } = this.stream;
      let user = {
        id: that.UserObj.id,
        stream: {
          tag: "RongCloudRTC"
        }
      };
      // 控制摄像头
      homelogic.OncloseVideo(this, videoStream, user);
      // 获取自己的用户信息 修改userList 数据
      that.OnGetRoomData(that.UserObj.id);
    },
    // 控制麦克风
    closeAudio() {
      let that = this;
      // this.stream 资源管理
      let { audio: audioStream } = this.stream;
      let user = {
        id: that.UserObj.id,
        stream: {
          tag: "RongCloudRTC"
        }
      };
      // 控制麦克风
      homelogic.OncloseAudio(this, audioStream, user);
      // 获取自己的用户信息 修改userList 数据
      that.OnGetRoomData(that.UserObj.id);

    },
    // 全屏
    requestFullScreen(id) {
      var de = document.getElementById(id);
      if (de.requestFullscreen) {
        de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen();
      }
    },
    // 控制 成员 列表是否显示
    OnlineMember(e) {
      let that = this;
      this.membershow = e;
      // 调用接口 //在这里面 /apis 就相当于'http://jj.woniu.com/' 查询房间内的用户
      // this.axios.get("/apis/rongyun/getRoomMembers.wn", {
      //     params: { roomId: this.RoomNumber },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     if (res.status == 200) {
      //       if (res.data.code == 0) {
      //         let data = JSON.parse(res.data.RongYunReturn);
      //         console.log(data);
      //       }
      //     }
      //   })
      //   .catch(function (error) {
      //     // 请求失败处理
      //     console.log(error);
      //   });
    },
    // 控制 是否开启左右滑动
    OnslideXshow() {
      let that = this;
      if (document.querySelector("#home-main-stream-list")) {
        let widthBox = document.querySelector("#home-main-stream-list").offsetWidth;
        //  150 home-main-stream-item  的单个宽度+边距
        let itemwidth = (that.userList.length - 1) * 150;
        if (itemwidth > widthBox) {
          this.slideXshow = true;
          let FullPage = parseInt(widthBox / 150); //只保留整数部分（丢弃小数部分） 1页可以显示多少个135
          that.count = Math.ceil((that.userList.length - 1) / FullPage); //向上取整 （有小数，整数部分就+1） 总页数
        } else {
          this.slideXshow = false;
        }
      }
    },
    //  控制 左右滑动
    scrollTab(e) {
      //  获取dom的实际宽度，值为数值。 count page
      let widthBox = document.querySelector("#home-main-stream-list")
        .offsetWidth;
      if (e == "left") {
        if (this.page <= this.count && this.page != 1) {
          this.page--;
          this.slideX += widthBox;
        } else if (this.page == 1) {
          this.caveatPrompt("已经是首页了");
        }
      } else if (e == "right") {
        if (this.page < this.count) {
          this.page++;
          this.slideX -= widthBox;
        } else if (this.page == this.count) {
          this.caveatPrompt("已经是尾页了");
        }
      }
    },
    // 模态框-弹出提示
    caveatPrompt(msg) {
      this.$message({
        message: msg,
        type: "warning"
      });
    },
    // 添加会议成员
    OnAddlist() {
      let that= this;
      that.SetUpshow = true; 
     
       let phone=that.UserObj.phone;
       let jjtoken="TGT-4601-uYYCyFQhrFFrs0g0WQ76Y3Sk7fJHD4UgEpLrbCshcs6M9F3cPg-oa.sso.woniu.com";
       let userid=that.UserObj.id;
       console.log(jjtoken);
      //  添加会议成员 所需 数据初始化
      ListofPeople.initializeMember(that,phone,jjtoken,userid);

      // 调用接口  联系人  - 我的好友
      ListofPeople.getFriendsList();
      // 调用接口 常用联系人 
       ListofPeople.getFrequenterList();
      //组织架构列表 
      if(that.treeData&&that.treeData.length>0){
        return
      }
      //  调用接口 获取个人信息 并且调用 组织架构列接口
      ListofPeople.getUserOrgs();
    },
    showAddlist(e, msg) {
      // e 就是子组件传过来的值
      this.SetUpshow = e;
      console.log(this.treeData)
      // 清空 联系人 好友列表
      this.FriendsList=[];
       // 清空 联系人 常用联系人列表
      this.FrequentlyUsedContactsList=[];

      // this.constraints = msg;
      console.group(e, msg);
    }
  },

  // 销毁前状态
  beforeDestroy() {
    // 用户离开房间
    this.OnLeaveTheRoom(this.UserObj.id);
    console.group("beforeDestroy 销毁前状态===============》");
  },
  destroyed() {
    console.group("destroyed 销毁完成状态===============》");
  }
};
</script>
<style scoped>
@import "../assets/css/home.css";
</style>
