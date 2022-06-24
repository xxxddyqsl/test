<template>
  <div class="chooseUser-box gg-flex-3">
    <div class="chooseUser-left ">
      <div class="chooseUser-header  gg-flex-3"><span class="chooseUser-left-header-title">Select group chat members</span></div>
      <div class="chooseUser-left-item  gg-flex-3">
        <div class="chooseUser-left-item-Search">
          <!-- 搜索框 - 子组件 -->
          <search @changeSearch="changeSearch"></search>
        </div>
      </div>

      <div class="chooseUser-left-item-list  gg-flex-3" :key="index" v-for="(item,index) in list">
        <div class="chooseUser-left-item-list-item  gg-flex-3">
          <div class="chooseUser-left-item-list-item-title ">{{item.name}}</div>
          <img draggable="false" class='triangle-icon' src="../assets/images/triangle-icon.png" alt="">
        </div>
      </div>

    </div>
    <div class="chooseUser-right gg-flex-1 gg-flex-2">
      <div class="chooseUser-header  gg-flex-3">
        <span class="chooseUser-right-header-title">Initiate group chat</span>
        <span class="chooseUser-right-header-number">3</span>
      </div>
      <div class="chooseUser-right-list-box">
        <div class="chooseUser-right-list gg-flex-3">
          <div class="chooseUser-right-list-item" :key="index" v-for="(item,index) in [require('../assets/images/user_A.png'),require('../assets/images/user_B.png'),require('../assets/images/user_C.png')]">
            <img draggable="false" class='chooseUser-right-list-item-icon' :src="item" alt="">
            <img draggable="false" class='chooseUser-right-list-item-quit' src="../assets/images/login_quit.png" alt="">
          </div>
        </div>
      </div>

        <div class="chooseUser-right-footer gg-flex-3">
            <div class="chooseUser-right-footer-btn chooseUser-right-footer-Cancel gg-flex-1"><span>Cancel</span></div>
            <div class="chooseUser-right-footer-btn chooseUser-right-footer-Confirm gg-flex-1"><span>Confirm</span></div>
        </div>
    </div>

  </div>

</template>
<script>
import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
import Search from './Search.vue'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'chooseUser',
  components: {
    // 搜索框 - 子组件
    Search,
  },
  props: {

  },

  data() {
    return {
      list: [
        { name: 'My friends' },
        { name: 'Top contacts' },
        { name: 'Common parts' },
        { name: 'Common group chat' },
        { name: 'Snail Game' },
      ],
    };
  },
  watch: {

  },
  mounted() {
    console.log(this.$route.query.params)
    // this.$refs.editDiv.focus();

  },

  methods: {
    //监听 子组件调用 搜索输入框 输入的查询条件
    changeSearch(val) {
      console.log('搜索输入框子组件', val)
    },
  }
};
</script>

<style scoped>
@import "../assets/css/chooseUser.css";
</style>

