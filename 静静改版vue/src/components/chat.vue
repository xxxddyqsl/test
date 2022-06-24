<template>
  <div class="main-content gg-flex-3">
    <div class="main-content-chat">
      <div class="main-content-chat-list">
        <div class="main-content-chat-list-item gg-flex-3 " :id='item.id' @click="chatWith(item.id)" :class="chatLeft.chatId==item.id?'chat-active':''" :key="item.id" v-for="(item,index) in chatList">
          <div class="main-content-chat-list-item-icon-box  ">
            <!-- 在线状态  群不显示在线状态-->
            <div class="gg-onlineStatus-box" v-if='item.id.indexOf("group_")<0?true:false'>
              <div class="gg-onlineStatus gg-onlineStatus-green" :class="index==3?'gg-onlineStatus-yellow':''"></div>
            </div>
            <img draggable="false" class="main-content-chat-list-item-icon " :src="item.Avatar" alt="">
          </div>
          <div class="main-content-chat-list-item-info">
            <div class="main-content-chat-list-item-info-name-box gg-flex-3">
              <div class="main-content-chat-list-item-info-name">{{item.Name}}</div>
              <div class="main-content-chat-list-item-info-time" v-html="$options.filters.msgDetailTimeFormat(item.MsgTimestamp)"> </div>
            </div>
            <div class="main-content-chat-list-item-info-content-box gg-flex-3">
              <!-- 调用过滤器 - 过滤消息 -->
              <div class="main-content-chat-list-item-info-content gg-flex-3" v-html="$options.filters.htmlOverviewMsgTemp(item)">
              </div>
              <!-- 未读消息 -->
              <div class="gg-unread gg-flex-1" v-show="chatLeft.chatId&&chatLeft.chatId==item.id?false:item.UnreadMsgCount>0?true:false"><span>{{item.UnreadMsgCount>99?99:item.UnreadMsgCount}}</span></div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="main-content-msg gg-flex-3 gg-flex-2" v-if='chatIdObj'>
      <div class="main-content-msg-header gg-flex-3">
        <div class="main-content-msg-header-name-box">
          <div class="main-content-msg-header-name">{{chatIdObj.Name||chatIdObj.ShowName}}</div>
          <div class="main-content-msg-header-name-Status gg-flex-3" v-if='chatIdObj.Id.indexOf("group_")<0?true:false'>
            <div class="gg-onlineStatus gg-onlineStatus-green"></div><span>online now</span>
          </div>
        </div>
        <div class="main-content-msg-header-Function gg-flex-3">
          <!-- v-if='chatIdObj.Id.indexOf("group_")<0?true:false' -->
          <template v-for="(item,index) in headerFunList">
            <img draggable="false" class="main-content-msg-header-Function-icon" v-if='item.id=="edit"?chatIdObj.Id.indexOf("group_")>=0?true:false:true' :key="index" :src="headerFunChange.key==item.id?item.Csrc:headerFunChange.index==index?item.Hsrc:item.src" alt="" @mouseover='headerFunChange.index=index' @mouseleave='headerFunChange.index=null' @click="headerFunChange.key=item.id,toolBarFn($event,item.handle)">

          </template>
          <!-- <img draggable="false" class="main-content-msg-header-Function-icon main-content-msg-header-Function-edit" src="../assets/images/edit.png" alt="">
              <img draggable="false" class="main-content-msg-header-Function-icon main-content-msg-header-Function-voice" src="../assets/images/voice.png" alt="">
              <img draggable="false" class="main-content-msg-header-Function-icon main-content-msg-header-Function-video" src="../assets/images/video.png" alt="">
              <img draggable="false" class="main-content-msg-header-Function-icon main-content-msg-header-Function-more" src="../assets/images/more.png" alt=""> -->
        </div>
      </div>
      <div class="main-content-msg-mid">
        <el-scrollbar style="height:100%" ref="myScrollbar">
          <!-- 聊天消息 -->
          <message v-bind:msgList='chatMsgList' v-bind:user='user'  @scrollToBottom='scrollToBottom' @isShowPersonalInfo="isShowPersonalInfo"></message>
        </el-scrollbar>
      </div>
      <div class="main-content-msg-footer gg-flex-3 gg-flex-2">
        <div class="main-content-msg-footer-edit-area-box gg-flex-4">
          <div class="main-content-msg-edit-area">
            <!-- {{inputContent}} -->
            <!-- <emotion @emotion="handleEmotion" :height="200"></emotion> -->
            <div-editable id="msg_edit_area" v-model="msgContent" @sendMessage="sendMessage" :chatIdObj='chatIdObj' ref="msgc"></div-editable>
          </div>
          <img draggable="false" class="main-content-msg-history" :src="Historychange.key?require('../assets/images/history_click.png'):Historychange.index==0?require('../assets/images/history_hover.png'):require('../assets/images/history.png')" alt="" @mouseover='Historychange.index=0' @mouseleave='Historychange.index=null' @click="showHistory($event)">
        </div>
        <div class="main-content-msg-footer-tool-bar-box ">
          <!-- 录音 -->
          <div class="voiceRecord-box gg-flex-3" @click.stop v-if="isRecord">
            <img draggable="false" class="voiceRecord-icon" src="../assets/images/voice-record.png" :class="RecordTime<60?'voiceRecord-icon-animation':''" alt="">
            <span class="voiceRecord-title">Recording …</span>
            <span class="voiceRecord-time">({{RecordTime}}s)</span>
            <img draggable="false" class="voiceRecord-send-icon" src="../assets/images/send-voice.png" alt="">
            <img draggable="false" class="voiceRecord-quit-icon" src="../assets/images/login_quit.png" alt="" @click="startRecord($even,false)">
          </div>
          <!-- 表情 -->
          <div class="message-face-box" v-if="showFaces" @click.stop>
            <div class="message-face-list gg-flex-3">
              <div class="message-face-list-item  gg-flex-1" :key="item" v-for="(item,index) in facesList"  @click='chooseFaces($event,index,item)'>
                <img draggable="false" :src="require('../assets/images/qqemoji/'+(index<10?('e10'+index):('e1'+index))+'.png')" :title="item" alt="">
              </div>
            </div>
          </div>
          <div class="main-content-msg-footer-tool-bar gg-flex-3">
            <img draggable="false" class="main-content-msg-tool-bar-icon" :key="index" v-for="(item,index) in toolBarList" :src="toolBarchange.key==item.id?item.Csrc:toolBarchange.index==index?item.Hsrc:item.src" alt="" @mouseover='toolBarchange.index=index' @mouseleave='toolBarchange.index=null' @click="toolBarchange.key=item.id,toolBarFn($event,item.handle)">
            <!-- <img class="main-content-msg-tool-bar-icon"  src="../assets/images/face.png" alt="" @click="handleEmotion">
                <img class="main-content-msg-tool-bar-icon" src="../assets/images/file.png" alt="">
                <img class="main-content-msg-tool-bar-icon" src="../assets/images/image.png" alt="">
                <img class="main-content-msg-tool-bar-icon" src="../assets/images/voicemessage.png" alt="">
                <img class="main-content-msg-tool-bar-icon" src="../assets/images/cut.png" alt=""> -->

          </div>
        </div>

      </div>

      <!-- 聊天信息- 成员 -->
      <ChatInfo v-if="IsShowChatInfo" :chatIdObj='chatIdObj' @addEmp='addEmp'></ChatInfo>
    </div>

  </div>

</template>
<script>
import services from '../../static/utils/services'
import utils from '../../static/utils/utils'
import filter from '../../static/utils/filter'
import Message from './Message.vue'
import DivEditable from './DivEditable.vue'
import ChatInfo from './ChatInfo.vue'

export default {
  name: 'Chat',
  components: {
    // 聊天消息-子组件
    Message,
    // 聊天输入框-子组件
    DivEditable,
    // 聊天信息- 成员
    ChatInfo,
  },
  // 过滤器
  filters: filter,
  props: {
    chatList: {
      default: ''
    },
    // 消息列表json 容器 查询返回当前人的消息
    msgList: {
      default: ''
    },
    user: {
      default: ''
    },
    
  },
  watch: {
    msgList:{
      // handler: 监听到修改之后这个函数会执行
      handler: function (value,oldValue) {
        // this.chatMsgList=value;
        if(this.chatIdObj)
        this.chatWith(this.chatIdObj.Id)
        console.log(this.chatMsgList)
            console.log(`新值：${value}`);
          console.log(`旧值：${oldValue}`);
        },
      // immediate: 页面第一次渲染的时候去触发侦听器
        deep: true
    },
    // msgList(value, oldValue) {
    //   // this.chatMsgList=value;
    //   // 第一个参数为新值，第二个参数为旧值，不能调换顺序
    //   console.log(`新值：${value}`);
    //   console.log(`旧值：${oldValue}`);
    // }
  },
  data() {
    return {
       //发送的消息
      msgContent:'',
      // 是否显示语音录制
      isRecord: false,
      // 语音录制时长
      RecordTime: 0,
      // 是否显示聊天信息-成员 
      IsShowChatInfo: false,
      chatLeft: {
        Active: null,
        chatId: null,
      },
      chatIdObj: null,
      // 头部菜单栏
      headerFunChange: {
        key: '',
        index: null,
      },
      headerFunList: [
        // { id: 'edit', src: require('../assets/images/edit.png'), Hsrc: require('../assets/images/edit_hover.png'), Csrc: require('../assets/images/edit_click.png'), handle: '' },
        { id: 'voice', src: require('../assets/images/voice.png'), Hsrc: require('../assets/images/voice_hover.png'), Csrc: require('../assets/images/voice_click.png'), handle: '' },
        { id: 'video', src: require('../assets/images/video.png'), Hsrc: require('../assets/images/video_hover.png'), Csrc: require('../assets/images/video_click.png'), handle: 'changeVideo' },
        { id: 'more', src: require('../assets/images/more.png'), Hsrc: require('../assets/images/more_hover.png'), Csrc: require('../assets/images/more_click.png'), handle: 'showChatInfo' },
      ],
      // 历史消息icon
      Historychange: {
        key: '',
        index: null,
      },

      //  左侧菜单栏
      toolBarchange: {
        key: '',
        index: null,
      },

      toolBarList: [
        { id: 'face', src: require('../assets/images/face.png'), Hsrc: require('../assets/images/face_hover.png'), Csrc: require('../assets/images/face_click.png'), handle: 'handleEmotion' },
        { id: 'file', src: require('../assets/images/file.png'), Hsrc: require('../assets/images/file_hover.png'), Csrc: require('../assets/images/file_click.png'), handle: '' },
        { id: 'image', src: require('../assets/images/image.png'), Hsrc: require('../assets/images/image_hover.png'), Csrc: require('../assets/images/image_click.png'), handle: '' },
        { id: 'voicemessage', src: require('../assets/images/voicemessage.png'), Hsrc: require('../assets/images/voicemessage_hover.png'), Csrc: require('../assets/images/voicemessage_click.png'), handle: 'startRecord' },
        { id: 'cut', src: require('../assets/images/cut.png'), Hsrc: require('../assets/images/cut_hover.png'), Csrc: require('../assets/images/cut_click.png'), handle: 'capture' },
      ],
      // 当前人或群的聊天消息列表
      chatMsgList: [],
      // 表情
      facesList: null,
      showFaces: false,
    };
  },
  mounted() {
    // 点击body
    document.addEventListener("click", this.bodyCloseMenus)
  },

  methods: {
    // 点击body 其他区域 
    bodyCloseMenus(e) {
      // console.log(e)
      // 点击body 关闭表情
      if (this.showFaces == true) {
        this.showFaces = false;
        
         this.toolBarchange.key='';
      }
      // 点击body 关闭语音录制
      // console.log(this.isRecord)
      if (this.isRecord == true) {
         this.startRecord(e,false);
         
      }
      // 聊天成员选择
      if( this.IsShowChatInfo==true){
        this.IsShowChatInfo = false;
        this.headerFunChange.key='';
      }

    },
    // 点击左侧列表
    chatWith(id, index) {
      // this.chatLeft.Active = index;
      this.chatLeft.chatId = id;
      this.chatList.map(item => {
        if (item.id == id) {
          item.UnreadMsgCount = 0;
        }
      });
      this.chatMsgList = [];
      // 传入id 获取 左侧成员的个人信息
      this.chatIdObj = services.concatService.getUserDetail(id);
      for (let i in this.msgList) {
        if (this.msgList[i].chatId == id) {
          for (let k in this.msgList[i].data) {
            this.chatMsgList.push(this.msgList[i].data[k])
          }

        }
      }
      // 聊天内容 复制 时间排序反了
      if (id == 'group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828') {
        // 手动数组倒序排列
        // this.chatMsgList.reverse()
      }
      console.log(id, this.chatIdObj, this.chatMsgList)
      // 有聊天数据返回
      if(this.chatMsgList.length>0){
      // 默认滚动条至底部
      this.scrollToBottom();
      }
     
    },
    // 语音录制
    startRecord(event,is) {
     
      if (typeof is != 'undefined') {
        this.isRecord = is;

      } else {
        this.isRecord = true;
      }
      this.RecordTime = 0;
      let time = null;
      if (this.isRecord) {
        time = setInterval(() => {
          if (this.RecordTime < 60) {
            this.RecordTime++;
          } else {
            clearInterval(time);
          }

        }, 1000)
      } else {
        clearInterval(time);
      }
      if (this.isRecord == false) {
        // 去除点击按钮的选中样式
        this.toolBarchange.key = '';
      }
        // 点击body 关闭表情
      if (this.showFaces == true) {
        this.showFaces = false;
      }
         //  阻止冒泡
      event.stopPropagation();
    },
    // 打开聊天历史窗口
    showHistory(event) {
      this.Historychange.key = true;
      // this.isShowHistory=true;

      //  vue新窗口打开页面，window.open 
      // 路径
      // let url = "/Main?constraints="
      // 参数
      // let obj= this.$route.query.constraints
      // var sec = this.$router.resolve({path: url + obj });
      // window.open(sec.href)
      var url = this.$router.resolve({ path: "/components/History" });
      let w = 473;
      let h = 632;
      this.winOpen(url.href, w, h);
      // window.open(sec.href)
      // console.log('暂未开发')
    },
    winOpen(url, width, height) {
      // 获取窗口垂直 居中位置
      let Top = (window.screen.availHeight - 30 - height) / 2;
      // 获取窗口水平 居中位置
      let Left = (window.screen.availWidth - 30 - width) / 2;
      window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + Top + ',left=' + Left);
    },
    //发送消息内容change
    sendMessage(chatId,msg) {
      console.log(msg)
      if (msg == '') {
        return;
      };
       this.$emit('sendMessage',chatId,msg);
       
      // let chatId="5bfcdc99aa55498aa1c5da6be672c136"; 
      // let data = {
      //   chatId: "5bfcdc99aa55498aa1c5da6be672c136",
      //   chatType: 1000,
      //   content: msg,
      //   fileLength: 0,
      //   filePath: "",
      //   fileStatus: 4,
      //   fileUrl: "",
      //   inGroup: false,
      //   messageid: "f43245bd9824430b973fbf57320bb38b_1654565503205",
      //   msgType: 0,
      //   name: null,
      //   refId: undefined,
      //   sendDate: "2022-06-07",
      //   sender: { Name: "邢鑫", Avatar: require("../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
      //   senderId: "f43245bd9824430b973fbf57320bb38b",
      //   showTime: true,
      //   speed: 0,
      //   status: 1,
      //   subType: undefined,
      //   // 获取当前时间戳。
      //   timeStamp: Date.now(),
      //   transProgess: 0,
      //   type: "text",
      // };
      // this.chatMsgList.push(data);
      // // this.msgList.unshift(data);
      // console.log(this.chatMsgList)
      // // services.createMessage(chatId,0, JSON.stringify(content))
      this.msgContent = "";
      this.scrollToBottom()
    },
    // 传入方法名 调用指定函数 
    toolBarFn(event, methodName) {
      console.log(event)
      if (methodName && methodName != '')
        this[methodName](event);
        
    },
    // 是否显示组件 -聊天信息-成员 
    showChatInfo(event) {
       //  阻止冒泡
      event.stopPropagation();
      console.log(this.IsShowChatInfo)
      this.IsShowChatInfo = !this.IsShowChatInfo;
       
    },
    // 是否显示- 视频会议 组件
    changeVideo(event) {
      this.isAddNewChat = false
      let params= JSON.stringify({ chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",user:this.user})
      var url = this.$router.resolve({ path: "/components/videoPage?constraints=" +params});
      let w = 1366;
      let h = 854;
      // 暴露给 window 子窗口调用-发送消息
       window.sendMessage = this.sendMessage;
        // 获取窗口垂直 居中位置
      let Top = (window.screen.availHeight - 30 - w) / 2;
      // 获取窗口水平 居中位置
      let Left = (window.screen.availWidth - 30 - h) / 2;
      // 视频会议窗口- videoPage
        window.videoPage = window.open(url.href, '', 'width=' + w + ',height=' + h  + ',top=' + Top + ',left=' + Left);

      // var url = this.$router.resolve({ path: "/components/videoPage" });
      // let w = 1366;
      // let h = 854;
      // this.winOpen(url.href, w, h)
        //  阻止冒泡
      event.stopPropagation();
    },

    // 打开 成员选择窗口 
    addEmp() { 
      console.log(this.chatIdObj)
      var params = {
        // 对方的个人信息
        chatId: this.chatIdObj.Id,
        // 自己的消息id
        userId: this.user.Id,
      }
      //       //  vue新窗口打开页面，window.open 
      //       // 路径
      //       // let url = "/Main?info="+info+'&user='+ this.user
      //       // 参数
      //       // let obj= this.$route.query.constraints
      //       // var sec = this.$router.resolve({path: url + obj });
      //       // window.open(sec.href)
      var url = this.$router.resolve({ path: "/components/chooseUser?params=" + JSON.stringify(params) });
      let w = 620;
      let h = 763;
      this.winOpen(url.href, w, h)
    },
    // 截图
    capture(event) {
  //  阻止冒泡
      event.stopPropagation();
    },
    // 打开表情
    handleEmotion(event) {
      console.log(event)
      let faces = services.faces();
      this.facesList = faces.titles[0];
      console.log(faces, this.facesList)
      // 选择表情 - 打开弹窗
      this.showFaces = true;

      //  阻止冒泡
      event.stopPropagation();
      // let src = require('../assets/images/qqemoji/e100.png');
      // 传入 输入框 子组件
      // this.$refs.msgc.handleEmotion(src, '微笑');
      // 移除选中的样式
      // this.toolBarchange.key='';
    },
    // 选择表情
    chooseFaces(event, index, data) {

      let src = require('../assets/images/qqemoji/' + (index < 10 ? ('e10' + index) : ('e1' + index)) + '.png');
      this.$refs.msgc.handleEmotion(src, data);
      // 选择表情 - 关闭弹窗
      this.showFaces = false;
      // 去除点击表情的点击修改
      this.toolBarchange.key = '';
      //  阻止冒泡
      event.stopPropagation();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
      })
      //  发送完消息默认滚动到底部
      // this.$nextTick(() => {
      //   const msg = document.querySelector('.main-content-msg-mid-list'); // 外层容器 出现滚动条的dom
      //   msg.scrollTop = msg.scrollHeight // 滚动高度
      // });
    },
    // 点击头像 - 获取个人信息 -显示个人信息
    isShowPersonalInfo(id) {
      var params = {
        // 对方的个人信息
        infoId: id,
        // 自己的消息id
        userId: this.user.Id,
      }
      //  vue新窗口打开页面，window.open 
      // 路径
      // let url = "/Main?info="+info+'&user='+ this.user
      // 参数
      // let obj= this.$route.query.constraints
      // var sec = this.$router.resolve({path: url + obj });
      // window.open(sec.href)
      var url = this.$router.resolve({ path: "/components/PersonalInfo?params=" + JSON.stringify(params) });
      let w = 473;
      let h = 632;
      this.winOpen(url.href, w, h)
      
    },

  },
  // 销毁前状态
  beforeDestroy() {
    document.removeEventListener("click", this.bodyCloseMenus);
    // console.group("beforeDestroy 销毁前状态 LogDetails===============》");
  },
  destroyed() {
    // console.group("destroyed 销毁完成状态 LogDetails===============》");
  }
};
</script>

<style scoped>
/* 隐藏原生的横向滚动条 */
.main-content-msg-mid /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

