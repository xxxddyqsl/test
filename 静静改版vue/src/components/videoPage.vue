<template>
  <div class="Video-wrapper gg-flex-3  gg-flex-2">
    <div class="Video-header gg-flex-3">
      <div class="Video-header-title">Meeting</div>
      <div class="Video-header-mid gg-flex-3">
        <!-- <div class="Video-header-mid-item gg-flex-1" :title="item.title" :key="index" v-for="(item,index) in headerMenuList" @click="headerMenuToggle($event,item)">
          <div class="Video-header-mid-item-icon " :class="item.class" :style="headerMenuActive==item.id?'background-image: url('+item.clickIcon+');':''"></div>
        </div> -->
        <!-- 摄像头 -->
        <div class="Video-header-mid-item gg-flex-1" @click="OnPauseMineAu($event,2)">
          <div class="Video-header-mid-item-icon" :class="webRTC.medias.indexOf('v')>=0?' Video-header-mid-item-video-icon':' Video-header-mid-item-disableVideo-icon'"></div>
        </div>
        <!-- 麦克风 -->
        <div class="Video-header-mid-item gg-flex-1" @click="OnPauseMineAu($event,1)">
          <div class="Video-header-mid-item-icon " :class="webRTC.medias.indexOf('a')>=0?' Video-header-mid-item-audio-icon':' Video-header-mid-item-disableAudio-icon'"></div>
        </div>
        <!-- 删除成员 -->
        <div class="Video-header-mid-item gg-flex-1"  @click="startChat($event)">
          <div class="Video-header-mid-item-icon Video-header-mid-item-userListDelete-icon"></div>
        </div>
        <!-- 添加成员 -->
        <div class="Video-header-mid-item gg-flex-1" @click="startChat($event)">
          <div class="Video-header-mid-item-icon Video-header-mid-item-userListAdd-icon"></div>
        </div>
        <!-- 成员列表 -->
        <div class="Video-header-mid-item gg-flex-1" @click="showUserList">
          <div class="Video-header-mid-item-icon Video-header-mid-item-userList-icon"></div>
        </div>
        <!-- 屏幕共享 -->
        <div class="Video-header-mid-item gg-flex-1">
          <div class="Video-header-mid-item-icon Video-header-mid-item-shareScreen-icon"></div>
        </div>
        <!-- 聊天 -->
        <div class="Video-header-mid-item gg-flex-1" @click="ShowMessage()">
          <div class="Video-header-mid-item-icon Video-header-mid-item-message-icon"></div>
        </div>
        <!-- 举手 -->
        <div class="Video-header-mid-item gg-flex-1" @click="OnRaiseYourHand()">
          <div class="Video-header-mid-item-icon" :class="webRTC.raiseYourHand?'Video-header-mid-item-raiseYourHand-active-icon':'Video-header-mid-item-raiseYourHand-icon'"></div>
        </div>

      </div>
      <div class="Video-header-right gg-flex-3">
        <div class="Video-header-right-minimize gg-flex-1" @click="Onminimize($event)">
          <img draggable="false" class="minimize" src="../assets/images/minimize-icon.png" alt="">
        </div>
        <div class="Video-header-right-Finish gg-flex-1">
          <img draggable="false" class="Finish" src="../assets/images/Finish-icon.png" alt="">
        </div>
      </div>
    </div>

    <div class="Video-main">
      <!-- 翻页 -->
      <img class="video-last-page" draggable="false" src="../assets/images/video-last-page.png" alt="">
      <img class="video-next-page" draggable="false" src="../assets/images/video-next-page.png" alt="">

      <div class="Video-main-fourPlayerMode gg-flex-3">
        <div class="Video-main-fourPlayerMode-item gg-flex-3 gg-flex-2 video_user_A">
          <!-- 主持人 -->
          <img class="Video-Host" draggable="false" src="../assets/images/Host-icon.png" alt="">
          <!-- 底部工具栏 + name -->
          <div class="Video-footer-toolbar-box gg-flex-3">
            <div class="Video-footer-name">Su Xinyi</div>

            <!-- <div class="Video-footer-toolbar gg-flex-3">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-video-icon" draggable="false" src="../assets/images/video-box-Inside-video-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-audio-icon" draggable="false" src="../assets/images/video-box-Inside-audio-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-fullScreen-icon" draggable="false" src="../assets/images/video-box-Inside-fullScreen-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-menu-icon" draggable="false" src="../assets/images/video-box-Inside-menu-icon.png" alt="">
            </div> -->
          </div>
        </div>
        <div class="Video-main-fourPlayerMode-item gg-flex-3 gg-flex-2 video_user_B">
          <!-- 主持人 -->
          <!-- <img  class="Video-Host" draggable="false"  src="../assets/images/Host-icon.png" alt=""> -->
          <!-- 底部工具栏 + name -->
          <div class="Video-footer-toolbar-box gg-flex-3 ">
            <div class="Video-footer-name">Ekene Obasey</div>

            <div class="Video-footer-toolbar gg-flex-3">
              <img class="Video-footer-toolbar-icon Video-footer-toolbar-video-icon" draggable="false" src="../assets/images/video-box-Inside-video-icon.png" alt="">
              <img class="Video-footer-toolbar-icon Video-footer-toolbar-audio-icon" draggable="false" src="../assets/images/video-box-Inside-audio-icon.png" alt="">
              <img class="Video-footer-toolbar-icon Video-footer-toolbar-fullScreen-icon" draggable="false" src="../assets/images/video-box-Inside-fullScreen-icon.png" alt="">
              <!-- <img class="Video-footer-toolbar-icon Video-footer-toolbar-menu-icon" draggable="false" src="../assets/images/video-box-Inside-menu-icon.png" alt=""> -->
            </div>
          </div>
        </div>
        <div class="Video-main-fourPlayerMode-item gg-flex-3 gg-flex-2 video_user_C">
          <!-- 主持人 -->
          <!-- <img  class="Video-Host" draggable="false"  src="../assets/images/Host-icon.png" alt=""> -->
          <!-- 底部工具栏 + name -->
          <div class="Video-footer-toolbar-box gg-flex-3">
            <div class="Video-footer-name">Uruewa Himona</div>

            <!-- <div class="Video-footer-toolbar gg-flex-3">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-video-icon" draggable="false" src="../assets/images/video-box-Inside-video-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-audio-icon" draggable="false" src="../assets/images/video-box-Inside-audio-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-fullScreen-icon" draggable="false" src="../assets/images/video-box-Inside-fullScreen-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-menu-icon" draggable="false" src="../assets/images/video-box-Inside-menu-icon.png" alt="">
            </div> -->
          </div>
        </div>
        <div class="Video-main-fourPlayerMode-item gg-flex-3 gg-flex-2 video_user_D">
          <!-- 主持人 -->
          <!-- <img  class="Video-Host" draggable="false"  src="../assets/images/Host-icon.png" alt=""> -->
          <!-- 底部工具栏 + name -->
          <div class="Video-footer-toolbar-box  ">

            <div class="Video-footer-toolbar gg-flex-3" style="margin-left: 24px;margin-bottom: 13px;">
              <img class="Video-footer-toolbar-icon Video-footer-toolbar-video-icon" draggable="false" src="../assets/images/video-box-Inside-video-icon.png" alt="">
              <img class="Video-footer-toolbar-icon Video-footer-toolbar-audio-icon" draggable="false" src="../assets/images/video-box-Inside-audio-icon.png" alt="">
              <!-- <img class="Video-footer-toolbar-icon Video-footer-toolbar-fullScreen-icon" draggable="false" src="../assets/images/video-box-Inside-fullScreen-icon.png" alt="">
                 <img class="Video-footer-toolbar-icon Video-footer-toolbar-menu-icon" draggable="false" src="../assets/images/video-box-Inside-menu-icon.png" alt=""> -->
            </div>
            <div class="Video-footer-name">Uruewa Himona</div>

          </div>
        </div>
      </div>
      <!-- 成员列表 -->
      <div class="Video-userList-box gg-flex-3" v-if="ShowVideoUserList" @click="showUserList">
        <img class="Video-Subassembly-hide" draggable="false" src="../assets/images/video-hide.png" alt="">
        <div class="Video-userList  gg-flex-3  gg-flex-2" @click.stop>
          <div class="Video-userList-header">
            <div class="Video-userList-header-name">Meeting number (4/5)</div>
          </div>
          <div class="Video-userList-main  gg-flex-3  gg-flex-2">
            <div class="Video-userList-main-header gg-flex-3">
              <div class="Video-userList-main-Name">Name</div>
              <div class="Video-userList-main-Admin">Admin</div>
              <div class="Video-userList-main-Microphone">Microphone</div>
              <div class="Video-userList-main-Camera">Camera</div>
            </div>
            <div class="Video-userList-main-list-box ">
              <el-scrollbar style="height:100%" ref="userListScrollbar">
                <dir class="Video-userList-main-list  gg-flex-3">
                  <div class="Video-userList-main-list-Name  gg-flex-3">
                    <img class="Video-userList-item-icon" src="../assets/images/user_A.png" draggable="false" alt="">
                    <div class="Video-userList-item-name">Lucas</div>
                  </div>
                  <div class="Video-userList-main-Admin  gg-flex-1">
                    <img draggable="false" class="video-userList-Admin-icon" src="../assets/images/video-userList-Admin-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Microphone  gg-flex-1">
                    <img draggable="false" class="video-userList-Microphone-icon" src="../assets/images/video-userList-Microphone-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Camera  gg-flex-1">
                    <img draggable="false" class="video-userList-Camera-icon" src="../assets/images/video-userList-Camera-icon.png" alt="">
                  </div>
                </dir>
                <dir class="Video-userList-main-list  gg-flex-3">
                  <div class="Video-userList-main-list-Name  gg-flex-3">
                    <img class="Video-userList-item-icon" src="../assets/images/user_B.png" draggable="false" alt="">
                    <div class="Video-userList-item-name">Afonso Pinto</div>
                  </div>
                  <div class="Video-userList-main-Admin  gg-flex-1">
                    <img draggable="false" class="video-userList-Admin-icon" src="../assets/images/video-userList-Admin-disable-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Microphone  gg-flex-1">
                    <img draggable="false" class="video-userList-Microphone-icon" src="../assets/images/video-userList-Microphone-disable-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Camera  gg-flex-1">
                    <img draggable="false" class="video-userList-Camera-icon" src="../assets/images/video-userList-Camera-disable-icon.png" alt="">
                  </div>
                </dir>
                <dir class="Video-userList-main-list  gg-flex-3">
                  <div class="Video-userList-main-list-Name  gg-flex-3">
                    <img class="Video-userList-item-icon" src="../assets/images/user_C.png" draggable="false" alt="">
                    <div class="Video-userList-item-name">Nandi</div>
                  </div>
                  <div class="Video-userList-main-Admin  gg-flex-1">
                    <img draggable="false" class="video-userList-Admin-icon" src="../assets/images/video-userList-Admin-disable-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Microphone  gg-flex-1">
                    <img draggable="false" class="video-userList-Microphone-icon" src="../assets/images/video-userList-Microphone-disable-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Camera  gg-flex-1">
                    <img draggable="false" class="video-userList-Camera-icon" src="../assets/images/video-userList-Camera-disable-icon.png" alt="">
                  </div>
                </dir>
                <dir class="Video-userList-main-list  gg-flex-3">
                  <div class="Video-userList-main-list-Name  gg-flex-3">
                    <img class="Video-userList-item-icon" src="../assets/images/user_D.png" draggable="false" alt="">
                    <div class="Video-userList-item-name">Ohta Kin</div>
                  </div>
                  <div class="Video-userList-main-Admin  gg-flex-1">
                    <img draggable="false" class="video-userList-Admin-icon" src="../assets/images/video-userList-Admin-disable-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Microphone  gg-flex-1">
                    <img draggable="false" class="video-userList-Microphone-icon" src="../assets/images/video-userList-Microphone-disable-icon.png" alt="">
                  </div>
                  <div class="Video-userList-main-Camera  gg-flex-1">
                    <img draggable="false" class="video-userList-Camera-icon" src="../assets/images/video-userList-Camera-disable-icon.png" alt="">
                  </div>
                </dir>
              </el-scrollbar>
            </div>
          </div>

        </div>

      </div>
      <!-- 消息列表 -->
      <div class="Video-message-box gg-flex-3" v-if="ShowVideoMessage" @click="ShowVideoMessage=false">
        <img class="Video-Subassembly-hide" draggable="false" src="../assets/images/video-hide.png" alt="">
        <div class="Video-message  gg-flex-3  gg-flex-2" @click.stop>
          <div class="Video-message-header">
            <div class="Video-message-header-title">Message</div>
          </div>
          <div class="Video-message-main-list-box ">
            <el-scrollbar style="height:100%" ref="messageScrollbar">
              <div :key="index" v-for="(item,index) in webRTC.chatList">
                <div class="Video-message-main-item gg-flex-1" v-if="item.showTime"><span class="Video-message-main-item-time" v-html="$options.filters.msgDetailTimeFormat(item.timeStamp)"></span></div>

                <div class="Video-message-main-item gg-flex-4  gg-flex-2" :class="item.sender.Id==params.user.Id?'Video-message-main-item-end':''">
                  <div class="Video-message-main-item-name ">{{item.sender.Name}}</div>
                  <div class="Video-message-main-item-text "  v-html="$options.filters.msgFilter(item)"></div>
                </div>
                <!-- <div class="Video-message-main-item gg-flex-4  gg-flex-2">
                  <div class="Video-message-main-item-name ">Meg Rigden</div>
                  <div class="Video-message-main-item-text ">the demand for these</div>
                </div>
                <div class="Video-message-main-item gg-flex-4  gg-flex-2">
                  <div class="Video-message-main-item-name ">Gopichand Sana</div>
                  <div class="Video-message-main-item-text ">A tachymeter scale</div>
                </div>
                <div class="Video-message-main-item gg-flex-4  gg-flex-2 Video-message-main-item-end">
                  <div class="Video-message-main-item-name ">Poseidon</div>
                  <div class="Video-message-main-item-text ">14,000</div>
                </div>
                <div class="Video-message-main-item gg-flex-1"><span class="Video-message-main-item-time">16:34</span></div>
                <div class="Video-message-main-item gg-flex-4  gg-flex-2 Video-message-main-item-end">
                  <div class="Video-message-main-item-name ">Poseidon</div>
                  <div class="Video-message-main-item-text ">Swatch group</div>
                </div> -->
              </div>
            </el-scrollbar>
          </div>
          <div class="Video-message-footer-box ">
            <!-- <textarea v-model="messageContent" id="textarea" ref="textDom" @keydown="handleKeydown"  ></textarea> -->
            <el-input type="textarea" resize='none' ref='textDom' @keydown.native="handleKeydown($event)" placeholder="Enter" v-model="messageContent">
            </el-input>
            <!-- <div-editable id="msg_edit_area" v-model="msgContent" @sendMessage="sendMessage" ref="msgc"></div-editable> -->
          </div>
        </div>

      </div>

    </div>

  </div>

</template>
<script>

// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
import filter from '../../static/utils/filter'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'videoPage',
  components: {

  },
  props: {

  },
  filters: filter,
  data() {
    return {
      // 发送的消息内容
      messageContent: '400 and end at 60',
      // 头部菜单栏切换
      headerMenuActive: '',
      webRTC: {
        medias: 'av',
        // 举手
        raiseYourHand: false,
        chatList: [{
          chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
          chatType: 1000,
          content: "the demand for these",
          fileLength: 0,
          filePath: "",
          fileStatus: 0,
          fileUrl: "",
          inGroup: false,
          messageid: "0e13f4a1-7ed8-4624-b562-27a1c84843fd",
          msgType: 0,
          name: null,
          refId: undefined,
          sendDate: "2022-06-01",
          sender: { Name: "Meg Rigden", Avatar: require("../assets/images/user_B.png"), IMStatus: 1, Id: "5bfcdc99aa55498aa1c5da6be672c136" },
          senderId: "5bfcdc99aa55498aa1c5da6be672c136",
          showTime: false,
          speed: 0,
          status: 1,
          subType: undefined,
          timeStamp: 1654064011232,
          transProgess: 0,
          type: "text",
        },
        {
          chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
          chatType: 1000,
          content: "A tachymeter scale",
          fileLength: 0,
          filePath: "",
          fileStatus: 0,
          fileUrl: "",
          inGroup: false,
          messageid: "0e13f4a1-7ed8-4624-b562-27a1c84843fd",
          msgType: 0,
          name: null,
          refId: undefined,
          sendDate: "2022-06-01",
          sender: { Name: "Gopichand Sana", Avatar: require("../assets/images/user_B.png"), IMStatus: 1, Id: "5bfcdc99aa55498aa1c5da6be672c136" },
          senderId: "5bfcdc99aa55498aa1c5da6be672c136",
          showTime: false,
          speed: 0,
          status: 1,
          subType: undefined,
          timeStamp: 1654064011232,
          transProgess: 0,
          type: "text",
        },
        {
          chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
          chatType: 1000,
          content: '14,000',
          fileLength: 0,
          filePath: "",
          fileStatus: 4,
          fileUrl: "",
          inGroup: false,
          messageid: "f43245bd9824430b973fbf57320bb38b_1654565503205",
          msgType: 0,
          name: null,
          refId: undefined,
          sendDate: "2022-06-07",
          sender: { Name: "Poseidon", Avatar: require("../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
          senderId: "f43245bd9824430b973fbf57320bb38b",
          showTime: true,
          speed: 0,
          status: 1,
          subType: undefined,
          // 获取当前时间戳。
          timeStamp: 1654565503242,
          transProgess: 0,
          type: "text",
        },
        {
          chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
          chatType: 1000,
          content: 'Swatch group',
          fileLength: 0,
          filePath: "",
          fileStatus: 4,
          fileUrl: "",
          inGroup: false,
          messageid: "f43245bd9824430b973fbf57320bb38b_1654565503205",
          msgType: 0,
          name: null,
          refId: undefined,
          sendDate: "2022-06-07",
          sender: { Name: "Poseidon", Avatar: require("../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
          senderId: "f43245bd9824430b973fbf57320bb38b",
          showTime: true,
          speed: 0,
          status: 1,
          subType: undefined,
          // 获取当前时间戳。
          timeStamp: 1654565503242,
          transProgess: 0,
          type: "text",
        },],
      },
      headerMenuList: [
        { id: 'video-icon', title: '摄像头', class: 'Video-header-mid-item-video-icon', disableClass: 'Video-header-mid-item-disableVideo-icon', clickIcon: require('../assets/images/video-disable-icon.png') },
        // { id: 'video-icon', title: '摄像头', class: 'Video-header-mid-item-video-icon', clickIcon: require('../assets/images/video-click-icon.png') },
        { id: 'audio-icon', title: '麦克风', class: 'Video-header-mid-item-audio-icon', clickIcon: require('../assets/images/audio-disable-icon.png') },
        // { id: 'audio-icon', title: '麦克风', class: 'Video-header-mid-item-audio-icon', clickIcon: require('../assets/images/audio-click-icon.png') },
        { id: 'userListDelete-icon', title: '删除成员', class: 'Video-header-mid-item-userListDelete-icon', clickIcon: require('../assets/images/userListDelete-click-icon.png') },
        { id: 'userListAdd-icon', title: '添加成员', class: 'Video-header-mid-item-userListAdd-icon', clickIcon: require('../assets/images/userListAdd-click-icon.png') },
        { id: 'userList-icon', title: '成员列表', class: 'Video-header-mid-item-userList-icon', clickIcon: require('../assets/images/userList-click-icon.png'), callBackName: 'showUserList' },
        { id: 'shareScreen-icon', title: '屏幕共享', class: 'Video-header-mid-item-shareScreen-icon', clickIcon: require('../assets/images/shareScreen-click-icon.png') },
        { id: 'message-icon', title: '聊天', class: 'Video-header-mid-item-message-icon', clickIcon: require('../assets/images/message-click-icon.png'), callBackName: 'ShowMessage' },
        { id: 'raiseYourHand-icon', title: '举手', class: 'Video-header-mid-item-raiseYourHand-icon', clickIcon: require('../assets/images/raiseYourHand-click-icon.png') },
      ],
      // 成员列表是否显示
      ShowVideoUserList: false,
      // 消息列表 是否显示
      ShowVideoMessage: false,
      // 参数
      params: '',
    };
  },
  watch: {

  },
  created() {
    // 获取url 后面的参数
    this.params = JSON.parse(this.$route.query.constraints);
    console.log(this.params)
  },
  mounted() {
    let that = this;
    // 新窗口打开后接收传参数 主页面事件
    window.addEventListener('message', function (res) {
      // alert('页面打开有数据来了:' + data);
      console.log(res.data)
      // 父窗口 传入的发送消息数据
      if (res.data.type && res.data.msg && res.data.type == "message") {
        that.webRTC.chatList.push(res.data.msg);
        that.messageContent='';
        // 新消息进入
         // 默认滚动条至底部
        that.scrollToBottom();
      }
    });
    
   
  },

  methods: {
    headerMenuToggle(msg) {
      this.headerMenuActive = msg.id;
      if (this.headerMenuActive != 'userList-icon') {
        this.ShowVideoUserList = false;
      }
      if (this.headerMenuActive != 'message-icon') {
        this.ShowVideoMessage = false;
      }
      // 传入方法名 调用指定函数 
      this.toolBarFn(msg.callBackName);
    },
    // 传入方法名 调用指定函数 
    toolBarFn(methodName) {
      if (methodName && methodName != '')
        this[methodName]();
    },
    // 成员列表
    showUserList() {
      this.ShowVideoUserList = !this.ShowVideoUserList;
    },
    // 消息
    ShowMessage() {
      this.ShowVideoMessage = !this.ShowVideoMessage;
        // 聊天消息显示时
    if(this.ShowVideoMessage){
  // 默认滚动条至底部
      this.scrollToBottom();
    }
    },
    hideHistory() {
      this.$emit('hideHistory',)
    },
    // 摄像头 或者 麦克风 暂停开启
    OnPauseMineAu(event, streamType) {
      // streamType：1 关闭音频  2 关闭视频 3//是关闭音频+视频  + 屏幕共享
      let key = null;
      if (streamType == 1) {
        key = 'a';
      } else if (streamType == 2) {
        key = 'v';
      }
      if (this.webRTC.medias != '' && this.webRTC.medias.indexOf(key) >= 0) {
        // 删除字符串中的该字段
        this.webRTC.medias = this.webRTC.medias.replace(key, "");
      } else {
        //  取消暂停 音频或 视频
        if (streamType == 1) {
          this.webRTC.medias = key + this.webRTC.medias;
        } else if (streamType == 2) {
          this.webRTC.medias = this.webRTC.medias + key;
        }
      }
    },
   
    // 举手
    OnRaiseYourHand() {
      this.webRTC.raiseYourHand = !this.webRTC.raiseYourHand;
    },
    // 最小化
    Onminimize() {
      //  window.opener.sendMessage("5bfcdc99aa55498aa1c5da6be672c136",'测试-1')
    },
    // 添加或删除 成员
    startChat() {
      var params = {

      };
      var url = this.$router.resolve({ path: "/components/chooseUser?params=" + JSON.stringify(params) });
      let w = 620;
      let h = 763;
      this.winOpen(url.href, w, h)
    },
    winOpen(url, width, height) {
      // 获取窗口垂直 居中位置
      let Top = (window.screen.availHeight - 30 - height) / 2;
      // 获取窗口水平 居中位置
      let Left = (window.screen.availWidth - 30 - width) / 2;
      window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + Top + ',left=' + Left);
    },
    //监听 子组件调用 搜索输入框 输入的查询条件
    changeSearch(val) {
      console.log('搜索输入框子组件', val)
    },
    // 监听键盘 数据
    handleKeydown(event) {
      console.log(event)
      if (event.ctrlKey && event.keyCode === 13) {
        //ctrl+enter 换行
        console.log('ctrl+enter 换行');
        this.textareaRange()
      } else if (event.keyCode === 13) {
        //enter
        window.opener.sendMessage(this.params.chatId, this.messageContent)
        console.log('回车发送', this.messageContent);
        event.preventDefault() // 阻止浏览器默认换行操作
        return false
      }
    },
     //换行并重新定位光标位置
    textareaRange() {
        // 获取element包装下的 textarea 标签
        let textDom = this.$refs.textDom.$el.querySelector('textarea');
        // 获取开始光标和结束光标
        let startPos = textDom.selectionStart;
        //获取 结束光标
        // let endPos = textDom.selectionEnd 
        // 把输入的换行符插入到你光标的位置
        this.messageContent = this.messageContent.substring(0, startPos) + '\n' + this.messageContent.substring(startPos, this.messageContent.length);
        // 重置 光标位置
        this.$nextTick(() => {
          textDom.select();
          // 开始位置 
          textDom.selectionStart = startPos + 1;
          // 结束位置
          textDom.selectionEnd = startPos + 1;
        })
    },
     scrollToBottom() {
      this.$nextTick(() => {
        this.$refs['messageScrollbar'].wrap.scrollTop = this.$refs['messageScrollbar'].wrap.scrollHeight
      })
      
    },
  }
};
</script>

<style scoped>
@import "../assets/css/videoPage.css";
/* 隐藏原生的横向滚动条 */
.Video-main /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.Video-message-footer-box /deep/ .el-textarea {
  height: 100% !important;
}
.Video-message-footer-box /deep/ .el-textarea__inner {
  background: #000;
  height: 100% !important;
  border: 0px;
  padding: 16px;
  font-size: 14px;
  font-family: "Futura-Medium, Futura";
  font-weight: 500;
  color: #ffffff;
  line-height: 19px;
}
.Video-message-footer-box /deep/ .el-textarea__inner::placeholder {
  color: #ffffff;
  opacity: 0.3;
  font-size: 12px;
  /* text-align:right; */
  position: absolute;
  right: 16px;
  bottom: 18px;
}

/* 滚动条 */
.Video-message-footer-box /deep/ .el-textarea__inner::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  cursor: pointer;
}
.Video-message-footer-box
  /deep/
  .el-textarea__inner::-webkit-scrollbar-thumb:hover {
  /*滚动条里面小方块*/
  box-shadow: inset 0 0 5px #c7c9cc;
  cursor: pointer;
  background-color: #c7c9cc;
}
.Video-message-footer-box /deep/ .el-textarea__inner::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  display: block;
  border-radius: 6px;
  box-shadow: inset 0 0 5px #dddee0;
  cursor: pointer !important;
  background-color: #dddee0;
}
.Video-message-footer-box /deep/ .el-textarea__inner::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  border-radius: 6px;
  /* background: #fff; */
  cursor: pointer;
  /* background-color: #dadada; */
}
</style>

