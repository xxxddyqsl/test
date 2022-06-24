<template>
  <div class="components-Search-box gg-flex-3" :class="isFocus!=''?'gg-input-focus':''" @click.stop>
    <img draggable="false" :src="SearchVal!=''?require('../assets/images/clean.png'):require('../assets/images/search.png')" @click="deleSearch" class="components-Search-icon" alt="">
    <el-input @input="changeSearch" type="text" @focus="focusFunc" @blur="blurFunc" ref="input_Search" class="components-Search-inpt" v-model="SearchVal" placeholder="Search">
    </el-input>

    <div class="components-Search-content-box" v-if="hideSearch&&SearchVal.length>0&&isSearchbox">
      <el-scrollbar style="height:100%">
        <div class="components-Search-content-list">
          <div class="components-Search-content-item-header gg-flex-3">
            <span class="components-Search-content-item-header-title">Contact</span>
          </div>
          <div class="components-Search-content-item-main gg-flex-3" @click="goChat">
            <img draggable="false" class="components-Search-content-item-main-icon" src="../assets/images/women.png" alt="">
            <div class="components-Search-content-item-main-title-box">
              <div class="components-Search-content-item-main-title"><span class="components-Search-content-item-main-title-key">Pan</span> Hyuk</div>
            </div>
          </div>
          <div class="components-Search-content-item-main gg-flex-3"  @click="goChat">
            <img draggable="false" class="components-Search-content-item-main-icon" src="../assets/images/women.png" alt="">
            <div class="components-Search-content-item-main-title-box">
              <div class="components-Search-content-item-main-title">Kita <span class="components-Search-content-item-main-title-key">Pan</span></div>
            </div>
          </div>
        </div>

        <div class="components-Search-content-list">
          <div class="components-Search-content-item-header gg-flex-3">
            <span class="components-Search-content-item-header-title">Chat History</span>
          </div>
          <div class="components-Search-content-item-main gg-flex-3"  @click="goChat">
            <img draggable="false" class="components-Search-content-item-main-icon" src="../assets/images/women.png" alt="">
            <div class="components-Search-content-item-main-title-box">
              <div class="components-Search-content-item-main-title">Salomé Fernán</div>
              <div class="components-Search-content-item-main-chat">Baidu <span class="components-Search-content-item-main-title-key">Pan</span></div>
            </div>
          </div>

          <div class="components-Search-content-item-main gg-flex-3"  @click="goChat">
            <img draggable="false" class="components-Search-content-item-main-icon" src="../assets/images/women.png" alt="">
            <div class="components-Search-content-item-main-title-box">
              <div class="components-Search-content-item-main-title">Salomé Pelikan</div>
              <div class="components-Search-content-item-main-chat">https://<span class="components-Search-content-item-main-title-key">Pan</span>.baidu.com/s/1IWwbK752s6Wz3EAYniH</div>
            </div>
          </div>

        </div>

      </el-scrollbar>
    </div>
  </div>
</template>
<script>
// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
import Message from './Message.vue'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'search',
  components: {
    // 聊天消息-子组件
    Message,
  },
  props: {
    isSearchbox: {
      default: ''
    },
    user: {
      default: ''
    }
  },

  data() {
    return {
      SearchVal: '',
      isFocus: false,
      hideSearch: false,
      // isSearchContent:false,
    };
  },
  watch: {

  },
  mounted() {
    console.log(this.user, this.info)
    // 点击body
    document.addEventListener("click", this.bodyCloseMenus)
    // this.$refs.editDiv.focus();
  },

  methods: {
    // 点击body 空白 隐藏搜索弹窗
    bodyCloseMenus(e) {
      if (this.hideSearch) {
        this.hideSearch = false;
      }
    },
    // 进入聊天
    goChat() {

      let key = 'chat'
      let id = '5bfcdc99aa55498aa1c5da6be672c136';
      // 向父组件传递了两个值
      this.$emit('currentToggle', key, id);
      //  隐藏搜索弹窗
      this.hideSearch = false;
        this.SearchVal='';
    },
    hideHistory() {
      this.$emit('hideHistory',)
    },
    // 清空 搜索框
    deleSearch() {
      this.isFocus = false;
      this.SearchVal = '';
      this.$emit('changeSearch', '');
    },
    //监听 搜索输入框 调用父组件查询
    changeSearch(val) {
      //  this.isFocus=true;
      this.SearchVal = val;
      this.hideSearch = true;
      this.$emit('changeSearch', val);
      //   console.log(val)
    },
    // 获取焦点
    focusFunc() {
      this.isFocus = true;
    },
    // 失去焦点
    blurFunc() {
      this.isFocus = false;
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
@import "../assets/css/Search.css";
/* 使用  ::v-deep 深度选择器  修改element 样式  必须在 scoped 中使用 或者在全局css中 否则无效*/
.components-Search-box /deep/ .el-input__inner {
  width: 100%;
  height: 100%;
  background: #f1f3f4;
  border-radius: 25px;
  border: 0px;
  padding-left: 0;
  font-family: "Futura-Medium, Futura" !important;
}
/* 隐藏原生的横向滚动条 */
.components-Search-box /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

