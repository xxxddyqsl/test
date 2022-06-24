<template>
  <div class="ChatInfo-box gg-flex-3">
      <!-- 阻止冒泡 @click.stop -->
    <div @click.stop class="ChatInfo-wrapper gg-flex-4  gg-flex-2">
      <div class="  ChatInfo-header gg-flex-3 ">

        <div class="ChatInfo-header-member-list  gg-flex-1  gg-flex-2">
          <img draggable="false" class='ChatInfo-member-list-icon' src="../assets/images/user_B.png" alt="">
          <!-- <span class='ChatInfo-member-list-name'>name</span>
          <span class='ChatInfo-member-list-admin'>群主</span> -->
        </div>
        <img draggable="false" class='ChatInfo-header-icon' @click="addEmp()" src="../assets/images/add-member-icon.png" alt="">
      </div>
      <div class="ChatInfo-item gg-flex-4  gg-flex-2" style="height: 97px;" v-if="chatIdObj.Id.indexOf('group_')>=0?true:false">
        <div class="ChatInfo-item-name">Group Name</div>
        <div  class="ChatInfo-item-inpt" >
            <el-input  placeholder="请输入内容" v-model="ChatFun.GroupName"> </el-input>
        </div>
        <!-- -->
    
      </div>
      <div class="ChatInfo-item gg-flex-3">
        <div class="ChatInfo-item-title">Message on top</div>
        <img draggable="false" class="ChatInfo-item-switch-icon" @click="ChatFun.messageOnTop=!ChatFun.messageOnTop" :src="ChatFun.messageOnTop?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
      </div>
      <div class="ChatInfo-item gg-flex-3">
        <div class="ChatInfo-item-title">message do not distu</div>
        <img draggable="false" class="ChatInfo-item-switch-icon" @click="ChatFun.messageDoNotDisturb=!ChatFun.messageDoNotDisturb" :src="ChatFun.messageDoNotDisturb?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
      </div>
      <div class="ChatInfo-item gg-flex-3">
        <div class="ChatInfo-item-title">Save to Contacts</div>
        <img draggable="false" class="ChatInfo-item-switch-icon" @click="ChatFun.SaveToContacts=!ChatFun.SaveToContacts" :src="ChatFun.SaveToContacts?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
      </div>
    </div>

  </div>

</template>
<script>
// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
import Message from './Message.vue'
import Search from './Search.vue'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'ChatInfo',
  components: {

  },
  props: {
    chatIdObj: {
      default: ''
    },
    user: {
      default: ''
    }
  },

  data() {
    return {
        ChatFun:{
          GroupName:'Snail Team',
            // 消息置顶
            messageOnTop:false,
            // 消息免打扰
            messageDoNotDisturb:false,
            // 保存到通讯录
            SaveToContacts:false,
        }
       
    };
  },
  watch: {

  },
  mounted() {
    console.log(this.user, this.info)
    // this.$refs.editDiv.focus();
  },

  methods: {
    
//打开成员选择窗口
    addEmp(){
    this.$emit('addEmp',)
    },
  }
};
</script>

<style scoped>
@import "../assets/css/ChatInfo.css";
.ChatInfo-item-inpt /deep/ .el-input{
height: 100%;
 }
.ChatInfo-item-inpt /deep/ .el-input__inner {
    width: 100%;
    height: 100%;
    background: #F1F3F4;
    border-radius: 18px;
    /* border: 1px solid #E6E9EB; */
} 
</style>

