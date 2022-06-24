<template>
  <div class="History-wrapper gg-flex-1  gg-flex-2">
    <div class="History-header">
      <img draggable="false" src="../assets/images/login_quit.png" class="History-header-quit" @click="hideHistory" alt="">
      <div class="History-header-user-box  gg-flex-3">
        <img class="History-header-user-icon" src="../assets/images/women.png" alt="">
        <div class="History-header-user-name">Yi Chun-Hwa</div>
      </div>

      <div class="History-header-Search-box gg-flex-1">
        <!-- <div class="main-content-header-mid-box"> -->
        <div class="History-header-mid-Search-box gg-flex-3" >
          <!-- 搜索框 - 子组件 -->
          <search @changeSearch="changeSearch"></search>

        </div>
        <!-- </div> -->
      </div>
    </div>

    <div class="History-main">
      <!-- 聊天消息 -->
      <!-- <message  v-bind:msgList='msgList'  v-bind:user='user'  @isShowPersonalInfo="isShowPersonalInfo"></message> -->

      <div class="History-main-No_chat_history gg-flex-1 gg-flex-2">
        <img class="History-main-No_chat_history-icon" src="../assets/images/No-chat-history.png" alt="">
        <div class="History-main-No_chat_history-title">No chat record in the last year...</div>
      </div>
    </div>
    <div class="History-footer gg-flex-3">
      <img class="History-footer-calendar-icon" src="../assets/images/date-plugin-icon.png" alt="">
      <div class="History-footer-calendar-title">2022/06/08</div>
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
  name: 'History',
  components: {
    // 聊天消息-子组件
    Message,
    //    搜索输入框-子组件
    Search
  },
  props: {
    info: {
      default: ''
    },
    user: {
      default: ''
    }
  },

  data() {
    return {
     
    };
  },
  watch: {

  },
  mounted() {
    console.log(this.user, this.info)
      // console.log(this.$route.query.params)
    // this.$refs.editDiv.focus();
  },

  methods: {
    hideHistory() {
      this.$emit('hideHistory',)
    },

    //监听 子组件调用 搜索输入框 输入的查询条件
    changeSearch(val) {
      console.log('搜索输入框子组件', val)
    },
  }
};
</script>

<style scoped>
@import "../assets/css/History.css";
</style>

