<template>
  <div class="Setting-wrapper gg-flex-3">
    <div class="Setting-left-MenuBar">
      <div class="Setting-left-MenuBar-list">
        <div class="Setting-left-MenuBar-item gg-flex-1" :class="SettingMenuBarActive==item.id?'Setting-left-MenuBar-item-active':''" :key="item.id" v-for="item in SettingMenuBarList" @click="SettingMenuBarToggle(item.id)">
          <div class="Setting-left-MenuBar-item-title">{{item.name}}</div>
        </div>
        <!-- <div class="Setting-left-MenuBar-item gg-flex-1">
          <div class="Setting-left-MenuBar-item-title">Sign in</div>
        </div>
       
        <div class="Setting-left-MenuBar-item gg-flex-1">
          <div class="Setting-left-MenuBar-item-title">Voice</div>
        </div> -->
      </div>
    </div>
    <div class="Setting-right-content  gg-flex-3 gg-flex-2">
      <div class="Setting-right-content-header gg-flex-4 gg-flex-2">
        <img draggable="false" src="../assets/images/login_quit.png" class="quit" @click="changSetting" alt="">

        <div class="Setting-right-content-header-title">Sign in</div>
      </div>
      <div class="Setting-right-content-main-box">
        <el-scrollbar style="height:100%" ref="SettingScrollbar">
          <div class="Setting-right-content-SignIn-box gg-flex-4 gg-flex-2" id='Signin'>
            <div class="Setting-right-content-SignIn-item  gg-flex-3">
              <div class="Setting-right-content-SignIn-item-title">Power on auto start</div>
              <img draggable="false" class="Setting-right-content-SignIn-item-icon" @click="changSettingSwitch('PowerOnAutoStart')" :src="SettingSwitch['PowerOnAutoStart'].key?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
            </div>
            <div class="Setting-right-content-SignIn-item  gg-flex-3" style="margin-top:auto;">
              <div class="Setting-right-content-SignIn-item-title">Automatic logon</div>
              <img draggable="false" class="Setting-right-content-SignIn-item-icon" @click="changSettingSwitch('AutomaticLogon')" :src="SettingSwitch['AutomaticLogon'].key?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
            </div>
          </div>

          <div class="Setting-right-content-Hotkeys-box gg-flex-4 gg-flex-2" id='Hotkeys'>
            <div class="Setting-right-content-Hotkeys-header gg-flex-4">
              <div class="Setting-right-content-Hotkeys-header-title">Hotkeys.</div>
            </div>
            <div class="Setting-right-content-Hotkeys-main gg-flex-4 gg-flex-2">
              <div class="Setting-right-content-Hotkeys-item gg-flex-3" :class="!SettingSwitch['ShowMainPanel'].key?'key_opacity':''">
                <div class="Setting-right-content-Hotkeys-item-title">Show main panel</div>
                <div class="Setting-right-content-Hotkeys-item-input">
                  <el-input type='text' v-model="SettingSwitch['ShowMainPanel'].val" placeholder="Alt+Q"> </el-input>
                </div>
                <img draggable="false" class="Setting-right-content-Hotkeys-item-icon" @click="changSettingSwitch('ShowMainPanel')" :src="SettingSwitch['ShowMainPanel'].key?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
              </div>
              <div class="Setting-right-content-Hotkeys-item gg-flex-3" :class="!SettingSwitch['CaptureScreen'].key?'key_opacity':''">
                <div class="Setting-right-content-Hotkeys-item-title">Capture screen</div>
                <div class="Setting-right-content-Hotkeys-item-input">
                  <el-input type='text' v-model="SettingSwitch['CaptureScreen'].val" placeholder="Ctrl+Alt+A"> </el-input>
                </div>
                <img draggable="false" class="Setting-right-content-Hotkeys-item-icon" @click="changSettingSwitch('CaptureScreen')" :src="SettingSwitch['CaptureScreen'].key?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
              </div>
              <div class="Setting-right-content-Hotkeys-item gg-flex-3" :class="!SettingSwitch['FastSend'].key?'key_opacity':''">
                <div class="Setting-right-content-Hotkeys-item-title">Fast send</div>
                <div class="Setting-right-content-Hotkeys-item-input">
                  <el-input type='text' v-model="SettingSwitch['FastSend'].val" placeholder="Alt+S"> </el-input>
                </div>
                <img draggable="false" class="Setting-right-content-Hotkeys-item-icon" @click="changSettingSwitch('FastSend')" :src="SettingSwitch['FastSend'].key?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
              </div>
              <div class="Setting-right-content-Hotkeys-item gg-flex-3" :class="!SettingSwitch['LanguageKeySpeaking'].key?'key_opacity':''">
                <div class="Setting-right-content-Hotkeys-item-title">Language key speakin</div>
                <div class="Setting-right-content-Hotkeys-item-input">
                  <el-input type='text' v-model="SettingSwitch['LanguageKeySpeaking'].val" placeholder="F2"> </el-input>
                </div>
                <img draggable="false" class="Setting-right-content-Hotkeys-item-icon" @click="changSettingSwitch('LanguageKeySpeaking')" :src="SettingSwitch['LanguageKeySpeaking'].key?require('../assets/images/switch-checked.png'):require('../assets/images/switch.png')" alt="">
              </div>

            </div>
          </div>

        </el-scrollbar>

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
  name: 'Setting',
  components: {

  },
  props: {

  },

  data() {
    return {
      SettingMenuBarList: [
        { id: 'Signin', name: 'Sign in' },
        { id: 'Hotkeys', name: 'Hotkeys' },
        { id: 'Voice', name: 'Voice' },
      ],
      SettingSwitch: {
        'PowerOnAutoStart': { key: true, },
        'AutomaticLogon': { key: true, },
        'ShowMainPanel': { key: true, val: 'Alt+Q' },
        'CaptureScreen': { key: true, val: 'Ctrl+Alt+A' },
        'FastSend': { key: false, val: 'Alt+S' },
        'LanguageKeySpeaking': { key: true, val: 'F2' },

      },
      SettingMenuBarActive: 'Signin',
    };
  },
  watch: {

  },
  mounted() {

  },

  methods: {
    SettingMenuBarToggle(id) {
      this.SettingMenuBarActive = id;

      this.$nextTick(() => {
        if (document.getElementById(id))
          this.$refs['SettingScrollbar'].wrap.scrollTop = document.getElementById(id).offsetTop
      })
    },
    changSetting() {
      this.$emit('changSetting',false)
    },
    changSettingSwitch(k) {
      this.SettingSwitch[k].key = !this.SettingSwitch[k].key;
    }
    //监听 子组件调用 搜索输入框 输入的查询条件
    // changeSearch(val) {
    //   console.log('搜索输入框子组件', val)
    // },
  }
};
</script>

<style scoped>
@import "../assets/css/Setting.css";
/* 隐藏原生的横向滚动条 */
.Setting-wrapper /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.Setting-wrapper /deep/ .el-input__inner {
  width: 100%;
  height: 30px;
  background: #f1f3f4;
  border-radius: 15px;
  border: 1px solid #e6e9eb;
}
.key_opacity /deep/ .el-input__inner {
  opacity: 0.6;
}
</style>

