<template>
  <div class="login-wrapper gg-flex-3  gg-flex-2">
    <div class="login-header  gg-flex-4">
      <img draggable="false" class="login-header-quit" src="../../assets/images/login_quit.png" alt="">
    </div>
    <div class="login-main  gg-flex-1 gg-flex-2">
      <div class="login-main-logo-box  gg-flex-4">
        <img draggable="false" class="login-main-logo" src="../../assets/images/logo.png" alt="">
      </div>
      <div class="login-main-item gg-flex-3">
        <div class="login-main-item-title" style=" opacity: 0.4;">Country&nbsp;/Region</div>
        <div class="login-main-item-input">
          <el-select v-model="countryArea" placeholder="请选择" :popper-append-to-body="false" popper-class="select-popper">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="login-main-item gg-flex-3" :class="inputFocus=='Account'?'gg-input-focus':''">
        <div class="login-main-item-title">{{countryArea}}</div>
        <div class="login-main-item-input">
          <el-input oninput="value=value.replace(/[^\d]/g,'')" @blur="blurFunc" ref="input_account" @input="changeAccount" v-model="information.account" placeholder="请输入手机号码">
            <i slot="suffix" class="el-input__icon el-icon-error" @click="deleAccount"></i>
          </el-input>
        </div>
      </div>
      <div class="login-main-item gg-flex-3" style=" margin-bottom: 17px;" :class="inputFocus=='Password'?'gg-input-focus':''">
        <!-- <div class="login-main-item-title">密码</div> -->
        <div class="login-main-item-input">
          <el-input v-model="information.password" ref="input_password" @blur="blurFunc" @input="changePassword" type="password" placeholder="Password">
            <!-- <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i> -->
          </el-input>
          <!-- <el-input v-model="information.password" ref="input_password" :type="pwdType" placeholder="Password">
            <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
          </el-input> -->
        </div>
      </div>
      <div class="login-main-item-other gg-flex-3">
        <div class="login-main-item-ServiceNumberLogin">Service number login</div>
        <div class="login-main-item-FogetPassword">Foget password？</div>
      </div>

      <div class="login-main-item-AutoLogin gg-flex-3" @mouseover='!information.AutoLogin? information.AutoLogin="hover": information.AutoLogin=information.AutoLogin' @mouseleave='information.AutoLogin=="hover" ?information.AutoLogin=false: information.AutoLogin=information.AutoLogin' @click="typeof information.AutoLogin === 'boolean'?information.AutoLogin=!information.AutoLogin:information.AutoLogin=true">
        <img draggable="false" class="login-main-item-AutoLogin-icon" :src="[information.AutoLogin=='hover'?require('../../assets/images/AutoLogin_hover.png'):!information.AutoLogin?require('../../assets/images/AutoLogin.png'):require('../../assets/images/AutoLogin_click.png')]" alt="">
        <span class="login-main-item-AutoLogin-title" :style="information.AutoLogin||information.AutoLogin=='hover'?'color:#409EFF;opacity: 1;':''">Auto login</span>
        <!-- <el-checkbox class="checkbox" v-model="information.AutoLogin"></el-checkbox> -->
      </div>
      <div class="login-main-btn login-main-SIGNIN gg-flex-1" @click="login($event)"><span>SIGN IN</span></div>
      <div class="login-main-btn login-main-REGISTER gg-flex-1" @click="goRegister($event)"><span>REGISTER</span></div>
    </div>
  </div>
</template>

<script>
var PAGE = 'login';

import qs from 'qs';       //引用qs模块
import axios from 'axios'
import utils from '../../../static/utils/utils'

export default {
  name: "login",
  components: {

  },
  data() {
    return {
      inputFocus: '',
      countryArea: '+86',
      options: [{
        value: '+86',
        label: '中国'
      }, {
        value: '+886',
        label: '台湾'
      }, {
        value: '+1',
        label: '美国'
      }, {
        value: '+82',
        label: '韩国'
      }, {
        value: '+7',
        label: '俄罗斯'
      }, {
        value: '+81',
        label: '日本'
      }],
      information: {
          //   登录类型
        Type: null,
        // 自动登录
        AutoLogin: false,
        account: '13962524311',
        password: 'a123456789',
      },
      pwdType: 'password',
      userList: [
        {
          'id': 'f43245bd9824430b973fbf57320bb38b', 'account': '13962524311', 'password': 'a123456789',
        },
        {
          'id': '5bfcdc99aa55498aa1c5da6be672c136', 'account': '13962524322', 'password': 'b123456789',
        },
        // { 'id': 'C', 'account': '13962524333', 'password': 'c123456789', 'name': '测试c' }
      ],
    }
  },
  created() {


    // 初始化
    this.init();

  },
  mounted() {
    console.log(this.userList)
    // 引入对应的js
    //  utils.writeScript(PAGE);
    window.addEventListener('beforeunload', e => {
      this.beforeunloadFn(e);
    });
  },
  methods: {
    // 清空账号
    deleAccount() {
      this.information.account = '';
    },
    //密码显示切换
    showPwd() {
      this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
      let e = document.getElementsByClassName('el-icon-view')[0];
      this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
    },
    // 监听页面刷新 触发
    beforeunloadFn(e) {
      e = e || window.event;
      this.setLs('RefreshKey', 'true');
    },
    init() {
      console.log('初始化')
    },
    // input 正在输入 添加样式
    changePassword(val) {
      this.inputFocus = 'Password';
    },
    changeAccount(val) {
      this.inputFocus = 'Account';
    },
    // 失去焦点
    blurFunc() {
      this.inputFocus = '';
    },
    //登录
    login(event) {
      // console.log(event)
      // 点击event.currentTarget为该点击事件绑定的元素对象，className为该元素的class类值
      //  event.currentTarget.className += '  login-main-SIGNIN-click'
      console.log(this.information)
      if (this.information.account == '') {
        // 调用$nextTick函数 
        this.$nextTick(function () {
          // 获取元素焦点
          this.$refs.input_account.focus()
        });
        return alert('请输入手机号');
      };
      if (this.information.password == '') {
        // 调用$nextTick函数 
        this.$nextTick(function () {
          // 获取元素焦点
          this.$refs.input_password.focus()
        });
        return alert('请输入密码');
      };
      // 校验 账号密码 是否存在
      let is = false;
      for (let i in this.userList) {
        if (this.userList[i].account == this.information.account) {
          is = true;
          if (this.userList[i].password == this.information.password) {
            this.userList[i].account = this.countryArea + this.userList[i].account;
            //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
            // this.$router.push({
            //   path: "/Main",
            //   query: {
            //     constraints: JSON.stringify(this.userList[i]),
            //   }
            // });
            var url = this.$router.resolve({ path: "/Main?constraints=" + JSON.stringify(this.userList[i]) });
            let w = 1364;
            // 826
            let h = 844;
            this.winOpen(url.href, w, h)
            break;
          } else {
            alert('密码不正确');
            break;
          }
        } else {
          is = false;
        }
      }
      // this.userList.map(item => {
      //   if (item.account == this.information.account) {
      //     if (item.password == this.information.password) {
      //       is = true;
      //       item.account = this.countryArea + item.account;
      //       //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
      //       this.$router.push({
      //         path: "/Main",
      //         query: {
      //           constraints: JSON.stringify(item),
      //         }
      //       });
      //     } else {
      //       is = true;
      //       alert('密码不正确')
      //     }
      //   } else {
      //     is = false;
      //   }
      // })
      if (!is) {
        alert('账号不存在')
      }
      // this.information.account = this.countryArea + this.information.account;
      // utils.setLs('loginInfo', this.information);
      //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
      // console.log(row);
      // this.$router.push({
      //   // name: "LogDetails",
      //   path: "/Main",
      //   query: {
      //     constraints: JSON.stringify(this.information),
      //   }
      // });
    },
    // 注册页
    goRegister(){
        // 编程式导航-params传递参数-JS代码内部跳转 + 传递参数 
        let params=''
      this.$router.push({
        name: "loginRegister",
        path: "/components/loginRegister/",
        query: {
          params:params,
        }
      });
    },
    winOpen(url, width, height) {
      // 获取窗口垂直 居中位置
      let Top = (window.screen.availHeight - 30 - height) / 2;
      // 获取窗口水平 居中位置
      let Left = (window.screen.availWidth - 30 - width) / 2;
      window.open(url, '', 'width=' + width + ',height=' + height + ',top=' + Top + ',left=' + Left+',toolbar=no,location=no');
    },


  },
  // 销毁前状态
  beforeDestroy() {
    // console.group("beforeDestroy 销毁前状态 Log===============》");
  },
  destroyed() {
    // console.group("destroyed 销毁完成状态 Log===============》");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/login.css";
.select-popper {
  font-family: "Futura-Medium, Futura" !important;
}
.login-main-item:hover {
  border: 1px solid #17ba77;
}

/* 去除 全局的 获取焦点时边框颜色 */
.login-main-item /deep/ .el-input__inner:hover,
.login-main-item /deep/ .el-input__inner:focus {
  border: 0px !important;
  }
</style>
