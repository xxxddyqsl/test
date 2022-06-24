<template>
  <div class="main-content-msg-mid-list">
    <div  :key="index" v-for='(item,index) in msgList'>
      <!-- 时间 -->
      <div class="main-content-msg-mid-list-item-time" v-show="item.showTime" v-html="$options.filters.msgDetailTimeFormat(item.timeStamp)">
        <!-- {{item.timeStamp|$options.filters.msgDetailTimeFormat}} -->
      </div>
      <div class="main-content-msg-mid-list-item  gg-flex-3"   :title='item.sender.Name' :class="item.sender.Id == user.Id?' main-content-msg-mid-list-item-self':''">
        
        <img draggable="false" class="main-content-msg-mid-list-item-icon" :src="item.sender.Avatar" alt="" @click="isShowPersonalInfo(item.sender.Id)">
        <!-- 文本 -->
        <div class="main-content-msg-mid-list-item-content-box" v-if="item.type=='text'">
          <div class=" main-content-msg-mid-list-item-content-text" v-html="$options.filters.msgFilter(item)">
          </div>
        </div>
        <!-- 图片 -->
        <div class="main-content-msg-mid-list-item-content-box" v-if="item.type=='image'">
          <img draggable="false" class="main-content-msg-mid-list-item-content-img" :src="item.filePath || item.fileUrl" @load="imgload" alt="" @click="previewImage(item)">
        </div>
        <!-- 语音 -->
        <div class="main-content-msg-mid-list-item-content-box gg-flex-3" v-if="item.type=='voice'" :class="item.sender.Id == user.Id?' main-content-msg-mid-list-item-self':''">
          <img class='main-content-msg-mid-list-item-content-voice-triangle' src="../assets/images/voice-triangle.png" alt="" :style="item.sender.Id == user.Id?' transform: rotate(180deg);':''">
          <div class="main-content-msg-mid-list-item-content-voice-box  gg-flex-3" :class="item.sender.Id == user.Id?' main-content-msg-mid-list-item-self':''">
            <span class="main-content-msg-mid-list-item-content-voice-time" :style="item.sender.Id == user.Id?'margin-right: 24px;margin-left: 0px;':''">42s</span>
            <img class="main-content-msg-mid-list-item-content-voice-animation" src="../assets/images/voice-animation.png" alt="" :style="item.sender.Id == user.Id?'margin-right: auto;margin-left: 8px;':''">
          </div>
          <!--  voice_area -->
          <!-- <div class="main-content-msg-mid-list-item-content-voice-box  gg-flex-3" :style="{'width':(50+Number(item.content)* 7)+'px'}">
          <span class="main-content-msg-mid-list-item-content-voice-time">{{item.content}}s</span>
          icon
        </div> -->
        </div>
        <!-- 时间 -->
        <!-- <div class="main-content-msg-mid-list-item-time" v-show="item.showTime" v-html="$options.filters.msgDetailTimeFormat(item.timeStamp)"> -->
        <!-- {{item.timeStamp|$options.filters.msgDetailTimeFormat}} -->
        <!-- </div> -->
      </div>
    </div>
    <!-- <div class="main-content-msg-mid-list-item  gg-flex-3">
                <img class="main-content-msg-mid-list-item-icon" src="../../assets/images/women.png" alt="">
                <div class="main-content-msg-mid-list-item-content-box">
                  <span>
                    Hi there， It's a nice weather today, we can go for
                    a picnic, bring your grill and ingredients and wait for me at your gate, I'll be there before 9 o'clock. Thanks Yi Chun-Hwa
                  </span>
                </div>
                <div class="main-content-msg-mid-list-item-time">
                  Today 07:28 AM
                </div>
              </div> -->
    <!--id==自己 main-content-msg-mid-list-item-self 子元素反向排列 -->
    <!-- <div class="main-content-msg-mid-list-item gg-flex-3 main-content-msg-mid-list-item-self">
                <img class="main-content-msg-mid-list-item-icon" src="../../assets/images/women.png" alt="">
                <div class="main-content-msg-mid-list-item-content-box">
                  <span>
                    Hi there， It's a nice weather today, we can go for
                    a picnic, bring your grill and ingredients and wait for me at your gate, I'll be there before 9 o'clock. Thanks Yi Chun-Hwa
                  </span>
                </div>
                <div class="main-content-msg-mid-list-item-time">
                  Today 07:28 AM
                </div>
              </div>

              <div class="main-content-msg-mid-list-item gg-flex-3">
                <img class="main-content-msg-mid-list-item-icon" src="../../assets/images/women.png" alt="">
                <div class="main-content-msg-mid-list-item-content-box">
                  <span>
                    Hi there， It's a nice weather today, we can go for
                    a picnic, bring your grill and ingredients and wait for me at your gate, I'll be there before 9 o'clock. Thanks Yi Chun-Hwa
                  </span>
                </div>
                <div class="main-content-msg-mid-list-item-time">
                  Today 07:28 AM
                </div>
              </div> -->

  </div>

</template>
<script>
// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

import filter from '../../static/utils/filter'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'Message',
  props: {
    msgList: {
      default: ''
    },
    user: {
      default: ''
    }
  },
  filters: filter,
  data() {
    return {

    };
  },
  watch: {
 msgList(value, oldValue) {
      // this.chatMsgList=value;
      // 第一个参数为新值，第二个参数为旧值，不能调换顺序
      console.log(`新值：${value}`);
      console.log(`旧值：${oldValue}`);
    }
  },
  mounted() {

  },

  methods: {
    isShowPersonalInfo(id) {
      this.$emit('isShowPersonalInfo', id)
    },
    // 图片加载完成之后再次调用 滚动条置底
    imgload() {
      this.$emit('scrollToBottom')
    },
    // 点击图片
    previewImage(msg) {
      console.log(msg);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/Message.css";
</style>

