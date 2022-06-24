<template>
  <div class="main-wrapper   gg-flex-3">
    <div class="main-leftColumn  gg-flex-1 gg-flex-2">
      <div class="main-leftColumn-MenuBar-box">
        <div class="main-leftColumn-MenuBar-item gg-flex-1 " :key="item.id" v-for="(item,index) in MenuBarList" @mouseover="current.index=index" @mouseleave="current.index=null" @click="currentToggle(item.id)" :class="[current.key==item.id?'main-leftColumn-MenuBar-item-checked':'']">
          <img draggable="false" class="main-leftColumn-MenuBar-item-icon" :src="current.key==item.id?item.Csrc:current.index==index?item.Hsrc:item.src" alt="">
        </div>
        <!-- <div class="main-leftColumn-MenuBar-item gg-flex-1 main-leftColumn-MenuBar-item-checked"> 
            <img class="main-leftColumn-MenuBar-item-icon" src="../../assets/images/chat.png" alt="">
          </div>
          <div class="main-leftColumn-MenuBar-item gg-flex-1 ">
            <img class="main-leftColumn-MenuBar-item-icon" src="../../assets/images/calendar.png" alt="">
          </div>
          <div class="main-leftColumn-MenuBar-item gg-flex-1 ">
            <img class="main-leftColumn-MenuBar-item-icon" src="../../assets/images/contact.png" alt="">
          </div> -->
      </div>

      <div class="main-leftColumn-footer gg-flex-1">
        <img draggable="false" class="main-leftColumn-footer-setting" @click.stop @click='changSetting(true)' src="../../assets/images/setting.png" alt="">
        <!-- 设置 -->
        <div class="Setting gg-flex-3" v-if="isShowSetting" @click.stop>
          <Setting @changSetting='changSetting'></Setting>
        </div>
      </div>

    </div>
    <div class="main-content-box gg-flex-3 gg-flex-2">
      <div class="main-content-header-box gg-flex-3">
        <div class="main-content-header-left-box gg-flex-3" @click="PersonalInfo()">
          <div class="main-content-header-left-icon gg-flex-1">
            <!-- 在线状态 -->
            <div class="gg-onlineStatus-box">
              <div class="gg-onlineStatus gg-onlineStatus-green"></div>
            </div>
            <span>PO</span>
          </div>
          <div class="main-content-header-left-title">Poseidon</div>
        </div>

        <div class="main-content-header-mid-box">
          <div class="main-content-header-mid-Search-box ">
            <!-- 搜索框 - 子组件 -->
            <search @changeSearch="changeSearch" :isSearchbox='isSearchbox' @currentToggle='currentToggle'></search>
            <!-- <img draggable="false" :src="SearchVal!=''?require('../../assets/images/clean.png'):require('../../assets/images/search.png')" @click="deleSearch" class="main-content-header-mid-Search-icon" alt="">
            <el-input @input="changeSearch" type="text" ref="input_Search" class="main-content-header-mid-Search-inpt" v-model="SearchVal" placeholder="Search">
            </el-input> -->
          </div>
        </div>

        <div class="main-content-header-right-box" @click.stop>
          <img draggable="false" @click="addNewChat" class="main-content-header-right-icon" src="../../assets/images/new.png" alt="">
          <div class="addNewChat-select-box" v-if="isAddNewChat">
            <div class="addNewChat-select-list">
              <div class="addNewChat-select-item gg-flex-3" @click="goChat">
                <img class="addNewChat-select-item-icon" draggable="false" src="../../assets/images/New-group.png" alt="">
                <div class="addNewChat-select-item-title">New group</div>
              </div>
              <div class="addNewChat-select-item gg-flex-3" @click="goVideoConference($event)">
                <img class="addNewChat-select-item-icon" draggable="false" src="../../assets/images/New-Meeting-for-screen.png" alt="">
                <div class="addNewChat-select-item-title">Meeting for screen</div>
              </div>
              <div class="addNewChat-select-item gg-flex-3" @click="goVideoConference($event)">
                <img class="addNewChat-select-item-icon" style="width:19px;height:16px" draggable="false" src="../../assets/images/New-meeting.png" alt="">
                <div class="addNewChat-select-item-title">New meeting</div>
              </div>
              <div class="addNewChat-select-item gg-flex-3" @click="goVideoConference($event)">
                <img class="addNewChat-select-item-icon" style="width:19px;height:16px" draggable="false" src="../../assets/images/New-Join-meeting.png" alt="">
                <div class="addNewChat-select-item-title">Join meeting</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- 聊天 -->
      <chat v-show="current.key=='chat'" ref="chat" :chatList="chatList" @sendMessage='sendMessage' :msgList="msgList" :user="user"></chat>
      <!-- 日历 -->
      <calendar v-if="current.key=='calendar'"></calendar>
      <!-- 通讯录  -->
      <addressBook v-show="current.key=='contact'" @currentToggle='currentToggle'></addressBook>
    </div>
  </div>
</template>

<script>
var PAGE = 'main';
import filter from '../../../static/utils/filter'
import services from '../../../static/utils/services'
import Chat from '../../components/chat.vue'
import Calendar from '../../components/calendar.vue'
import addressBook from '../../components/addressBook.vue'

import Search from '../../components/Search.vue'
import utils from '../../../static/utils/utils'
import Setting from '../../components/Setting.vue';
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp
export default {
  name: "Main",
  components: {
    // 搜索框 - 子组件
    Search,
    // 聊天- 子组件
    Chat,
    // 日历- 子组件
    Calendar,
    // 通讯录- 子组件
    addressBook,
    // 设置- 子组件
    Setting,

  },
  filters: filter,
  data() {
    return {
      // 搜索框
      isSearchbox: true,
      // 是否显示设置
      isShowSetting: false,
      // 左侧菜单栏
      current: {
        key: 'chat',
        index: null,
      },
      isAddNewChat: false,
      params: {},
      user: null,
      MenuBarList: [
        { id: 'chat', src: require('../../assets/images/chat.png'), Hsrc: require('../../assets/images/chat_hover.png'), Csrc: require('../../assets/images/chat_click.png') },
        { id: 'calendar', src: require('../../assets/images/calendar.png'), Hsrc: require('../../assets/images/calendar_hover.png'), Csrc: require('../../assets/images/calendar_click.png') },
        { id: 'contact', src: require('../../assets/images/contact.png'), Hsrc: require('../../assets/images/contact_hover.png'), Csrc: require('../../assets/images/contact_click.png') },
      ],
      chatList: null,

      msgList: [
        {
          chatId: "5bfcdc99aa55498aa1c5da6be672c136",
          data: [{
            chatId: "5bfcdc99aa55498aa1c5da6be672c136",
            chatType: 1000,
            content: "[微笑] 1",
            fileLength: 0,
            filePath: "",
            fileStatus: 4,
            fileUrl: "",
            inGroup: false,
            messageid: "f43245bd9824430b973fbf57320bb38b_1653904014102",
            msgType: 0,
            name: null,
            refId: undefined,
            sendDate: "2022-05-30",
            sender: { Name: "邢鑫", Avatar: require("../../assets/images/user_D.png") , IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
            senderId: "f43245bd9824430b973fbf57320bb38b",
            showTime: false,
            speed: 0,
            status: 1,
            subType: undefined,
            timeStamp: 1653904014884,
            transProgess: 0,
            type: "text",
          },
          {
            chatId: "f43245bd9824430b973fbf57320bb38b",
            chatType: 1000,
            content: "q",
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
            sender: { Name: "张三", Avatar:  require("../../assets/images/user_B.png"), IMStatus: 1, Id: "5bfcdc99aa55498aa1c5da6be672c136" },
            senderId: "5bfcdc99aa55498aa1c5da6be672c136",
            showTime: true,
            speed: 0,
            status: 1,
            subType: undefined,
            timeStamp: 1654064011232,
            transProgess: 0,
            type: "text",
          },
          {
            chatId: "5bfcdc99aa55498aa1c5da6be672c136",
            chatType: 1000,
            content: "测试",
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
            sender: { Name: "邢鑫", Avatar:  require("../../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
            senderId: "f43245bd9824430b973fbf57320bb38b",
            showTime: true,
            speed: 0,
            status: 1,
            subType: undefined,
            timeStamp: 1654565503242,
            transProgess: 0,
            type: "text",
          },
          {
            chatId: "5bfcdc99aa55498aa1c5da6be672c136",
            chatType: 1000,
            content: "2[苦笑][微笑][微笑][微笑][微笑][微笑][微笑]",
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
            sender: { Name: "邢鑫", Avatar: require("../../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
            senderId: "f43245bd9824430b973fbf57320bb38b",
            showTime: true,
            speed: 0,
            status: 1,
            subType: undefined,
            timeStamp: 1654050044124,
            transProgess: 0,
            type: "text",
          },
          {
            chatId: "f43245bd9824430b973fbf57320bb38b",
            chatType: 1000,
            content: "6",
            fileLength: 72337,
            filePath: "D:/JJPC/tmp/audio/132998362302688793.wav",
            fileStatus: 4,
            fileUrl: "http://im.yun.woniu.com:8086//5bfcdc99aa55498aa1c5da6be672c136/20220616/1329983623032589811655362630424.wav",
            inGroup: false,
            messageid: "f43245bd9824430b973fbf57320bb38b_1655362630306",
            msgType: 1,
            name: null,
            refId: undefined,
            sendDate: "2022-06-16",
            sender: { Name: "张三", Avatar:  require("../../assets/images/user_B.png"), IMStatus: 1, Id: "5bfcdc99aa55498aa1c5da6be672c136" },
            senderId: "5bfcdc99aa55498aa1c5da6be672c136",
            showTime: false,
            speed: 0,
            status: 1,
            subType: undefined,
            timeStamp: 1655362630439,
            transProgess: 0,
            type: "voice",
          },
          {
            chatId: "5bfcdc99aa55498aa1c5da6be672c136",
            chatType: 1000,
            content: "6",
            fileLength: 72337,
            filePath: "D:/JJPC/tmp/audio/132998362302688793.wav",
            fileStatus: 4,
            fileUrl: "http://im.yun.woniu.com:8086//5bfcdc99aa55498aa1c5da6be672c136/20220616/1329983623032589811655362630424.wav",
            inGroup: false,
            messageid: "f43245bd9824430b973fbf57320bb38b_1655362630306",
            msgType: 1,
            name: null,
            refId: undefined,
            sendDate: "2022-06-16",
            sender: { Name: "邢鑫", Avatar:  require("../../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
            senderId: "f43245bd9824430b973fbf57320bb38b",
            showTime: false,
            speed: 0,
            status: 1,
            subType: undefined,
            timeStamp: 1655362630439,
            transProgess: 0,
            type: "voice",
          },
          ]
        },
        {
          chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
          data: [
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "1. 全局的搜索和new会出个效果图\n 2. 聊天一个群聊，一个单聊作为demo即可，两个在聊天列表点的时候能互相切换\n3. 单聊的人名改为张三，头像会提供一个改一下，群聊的默认头像也会改一个，群聊默认头像左上角的小绿点不要\n4. 聊天框内的当前聊天内容做稍微长一点，可以上下滚动\n5. 聊天框内的当前聊天内容需要有长一点的文字内容、图片内容、@内容、语音内容\n6. 聊天框内的当前聊天内容头像会提供几个换一下\n7. 聊天框下面的表情按钮会出个浮窗，文件、图片按钮点了调用系统自带的，语音按钮也会出个浮窗，截图按钮也需要能截图\n8. 聊天框右上角的编辑按钮删掉吧，语音和视频按钮到时都链接到还在做的会议界面，更多按钮在群聊的时候多一个编辑群聊名称的功能\n9. 日程页面打开时，默认滚到当前的时间点，表示当前时间点那条绿色的线位于屏幕中间，且只占一个格子\n10. 日程的详情需要按效果图做一下，且点击页面其他区域时能关闭该详情窗\n11. 通讯录点chat now按钮时能跳转回聊天界面",
              fileLength: 1600,
              filePath: "",
              fileStatus: 0,
              fileUrl: "",
              inGroup: true,
              messageid: "d2c28119863f4a2f8bdd2f0dc393f3f4_1655271906532",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "何佳玏", Avatar:require("../../assets/images/user_K.png") , IMStatus: 1, Id: "d2c28119863f4a2f8bdd2f0dc393f3f4" },
              senderId: "d2c28119863f4a2f8bdd2f0dc393f3f4",
              showTime: true,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655271907381,
              transProgess: 0,
              type: "text",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "我体验下来总结了这些问题  看看哪块不明白的我再截图说明一下",
              fileLength: 116,
              filePath: "",
              fileStatus: 0,
              fileUrl: "",
              inGroup: true,
              messageid: "d2c28119863f4a2f8bdd2f0dc393f3f4_1655271939149",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "何佳玏", Avatar: require("../../assets/images/user_K.png") , IMStatus: 1, Id: "d2c28119863f4a2f8bdd2f0dc393f3f4" },
              senderId: "d2c28119863f4a2f8bdd2f0dc393f3f4",
              showTime: false,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655271939995,
              transProgess: 0,
              type: "text",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "（5），聊天内容我再完善一下图片",
              fileLength: 16,
              filePath: "",
              fileStatus: 0,
              fileUrl: "",
              inGroup: true,
              messageid: "8f31027c967d4bdfaca19d2146e8aedf1655272743249.251953",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "朱瑜骏", Avatar: require("../../assets/images/user_F.png") , IMStatus: 1, Id: "8f31027c967d4bdfaca19d2146e8aedf" },
              senderId: "8f31027c967d4bdfaca19d2146e8aedf",
              showTime: true,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655272743355,
              transProgess: 0,
              type: "text",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "D:/JJPC/tmp/pic/132997466415188917.png",
              fileLength: 58873,
              filePath: require("D:/JJPC/tmp/pic/132997466415188917.png"),
              fileStatus: 4,
              fileUrl: "http://im.yun.woniu.com:8086//group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828/20220615/1329974674822680141655273148569.png",
              inGroup: true,
              messageid: "f43245bd9824430b973fbf57320bb38b_1655273148153",
              msgType: 4,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "邢鑫", Avatar:require("../../assets/images/user_D.png") , IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
              senderId: "f43245bd9824430b973fbf57320bb38b",
              showTime: false,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655273148588,
              transProgess: 0,
              type: "image",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "遇到超出，能不能在左侧显示，贴着选中的日程",
              fileLength: 21,
              filePath: "",
              fileStatus: 0,
              fileUrl: "",
              inGroup: true,
              messageid: "8f31027c967d4bdfaca19d2146e8aedf1655273364239.416992",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "朱瑜骏", Avatar: require("../../assets/images/user_K.png") , IMStatus: 1, Id: "8f31027c967d4bdfaca19d2146e8aedf" },
              senderId: "8f31027c967d4bdfaca19d2146e8aedf",
              showTime: false,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655273364392,
              transProgess: 0,
              type: "text",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "也可以",
              fileLength: 0,
              filePath: "",
              fileStatus: 4,
              fileUrl: "",
              inGroup: true,
              messageid: "f43245bd9824430b973fbf57320bb38b_1655275722840",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "邢鑫", Avatar: require("../../assets/images/user_D.png") , IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
              senderId: "f43245bd9824430b973fbf57320bb38b",
              showTime: true,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655275723174,
              transProgess: 0,
              type: "text",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "@吕小龙 ​ 测试消息",
              fileLength: 0,
              filePath: "",
              fileStatus: 4,
              fileUrl: "",
              inGroup: true,
              messageid: "f43245bd9824430b973fbf57320bb38b_1655275722840",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "邢鑫", Avatar: require("../../assets/images/user_D.png") , IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
              senderId: "f43245bd9824430b973fbf57320bb38b",
              showTime: true,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655350134869,
              transProgess: 0,
              type: "text",
            },
            {
              chatId: "group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828",
              chatType: 1002,
              content: "[微笑]测试消息",
              fileLength: 0,
              filePath: "",
              fileStatus: 4,
              fileUrl: "",
              inGroup: true,
              messageid: "f43245bd9824430b973fbf57320bb38b_1655360696444",
              msgType: 0,
              name: null,
              refId: undefined,
              sendDate: "2022-06-15",
              sender: { Name: "邢鑫", Avatar: require("../../assets/images/user_D.png") , IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
              senderId: "f43245bd9824430b973fbf57320bb38b",
              showTime: true,
              speed: 0,
              status: 1,
              subType: undefined,
              timeStamp: 1655360696444,
              transProgess: 0,
              type: "text",
            },
          ]
        }

      ],
    }
  },
  created() {
    this.params = JSON.parse(this.$route.query.constraints);
    // console.log(JSON.parse(this.$route.query.constraints))
    // 初始化
    this.init();
    // 引入对应的js
    utils.writeScript(PAGE);
  },
  mounted() {
    // 点击body
    document.addEventListener("click", this.bodyCloseMenus)
  },


  methods: {

    init() {
      console.log('params', this.params.id);
      // 获取个人信息
      this.user = services.concatService.getUserDetail(this.params.id);
      console.log('user===>', this.user)
      services.chatService.getChats();
      // 获取左侧聊天列表
      this.chatList = services.chatService.chatList,
        console.log('chatList===>', this.chatList)
      console.log(this.$router)
    },
    // 点击body 其他区域 
    bodyCloseMenus(e) {
      // console.log(e)
      // 点击body 关闭设置
      if (this.isShowSetting == true) {
        this.isShowSetting = false;
      }
      if (this.isAddNewChat == true) {
        this.isAddNewChat = false;
      }

    },
    // 新建群聊
    addNewChat() {
      this.isAddNewChat = true;
    },
    // 左侧菜单栏 菜单切换
    currentToggle(key, id) {
      console.log(key, id)
      this.current.key = key;
      // 父组件调用子组件
      if (id) {
        console.log(id)
        this.$refs.chat.chatWith(id);
      }
    },
    //监听 子组件调用 搜索输入框 输入的查询条件
    changeSearch(val) {
      console.log('搜索输入框子组件', val)
    },
    // 个人信息
    PersonalInfo() {
      // 调用子组件  chat 方法
      this.$refs.chat.isShowPersonalInfo(this.user.Id);
    },
    // 点击设置
    changSetting(is) {
      // console.log(is)
      this.isShowSetting = is;
    },
    // 进入聊天
    goChat() {
      this.isAddNewChat = false;
      let key = 'chat'
      let id = 'group_d2c28119863f4a2f8bdd2f0dc393f3f4_1653638892828';
      this.currentToggle(key, id);
      // this.$refs.chat.chatWith(id);
      // 父组件调用 子组件 方法
      // this.$refs.chat.currentToggle(key, id);

    },
    // 是否显示- 视频会议 组件
    goVideoConference(event) {
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

      //  阻止冒泡
      event.stopPropagation();
    },
    winOpen(url, width, height) {
      // 获取窗口垂直 居中位置
      let Top = (window.screen.availHeight - 30 - height) / 2;
      // 获取窗口水平 居中位置
      let Left = (window.screen.availWidth - 30 - width) / 2;
      window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + Top + ',left=' + Left);
    },
    
    sendMessage(chatId,msg){
       let sendId="5bfcdc99aa55498aa1c5da6be672c136"; 
      let data = {
        chatId: "5bfcdc99aa55498aa1c5da6be672c136",
        chatType: 1000,
        content: msg,
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
        sender: { Name: "邢鑫", Avatar: require("../../assets/images/user_D.png"), IMStatus: 1, Id: "f43245bd9824430b973fbf57320bb38b" },
        senderId: "f43245bd9824430b973fbf57320bb38b",
        showTime: true,
        speed: 0,
        status: 1,
        subType: undefined,
        // 获取当前时间戳。
        timeStamp: Date.now(),
        transProgess: 0,
        type: "text",
      };
      for (let i in this.msgList) {
        if (this.msgList[i].chatId == chatId) {
            this.msgList[i].data.push(data);
            console.log(this.msgList[i].data)
            break;
        }
      };
      // 视频会议窗口 - 打开
      if(window.videoPage != undefined){
        // 给视频会议窗口- 发送消息 - 传入聊天data
        let chat={};
        chat.type='message';
        chat.msg=data;
        window.videoPage.postMessage(chat);
      }
      // this.msgList.push(data);
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
 
<style >
@import "../../assets/css/main.css";
</style>
<style scoped>
/* 使用  ::v-deep 深度选择器  修改element 样式 */
.main-content-header-mid-Search-box /deep/ .el-input__inner {
  width: 100%;
  height: 100%;
  background: #f1f3f4;
  border-radius: 25px;
  border: 0px;
  padding-left: 0;
  font-family: "Futura-Medium, Futura" !important;
}
</style>