<!--  -->
<template>
  <div class="loginRegister-wrapper gg-flex-3  gg-flex-2">
    <div class="loginRegister-header  gg-flex-4">
      <img draggable="false" class="loginRegister-header-quit" src="../assets/images/login_quit.png" alt="">
    </div>
    <!--注册 手机号 -->
    <div class="loginRegister-main gg-flex-1 gg-flex-2" v-if="!NextStepCode&&!registeredAccountPassword">
      <div class="loginRegister-main-logo-box  gg-flex-4">
        <img draggable="false" class="loginRegister-main-logo" src="../assets/images/logo.png" alt="">
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

    </div>
    <!--获取验证码 -->
    <div class="loginRegister-main gg-flex-1 gg-flex-2" v-if="NextStepCode&&!registeredAccountPassword">
      <div class="loginRegister-main-logo-box  gg-flex-4">
        <img draggable="false" class="loginRegister-main-logo" src="../assets/images/logo.png" alt="">
      </div>

      <div class="login-main-item gg-flex-3" :class="inputFocus=='VerificationCode'?'gg-input-focus':''">
        <div class="login-main-item-input">
          <el-input oninput="value=value.replace(/[^\d]/g,'')" @blur="blurFunc" ref="input_VerificationCode" @input="changeVerificationCode" v-model="information.VerificationCode" placeholder="请输入验证码">
            <i slot="suffix" class="el-input__icon el-icon-error" @click="deleVerificationCode"></i>
          </el-input>
        </div>
      </div>

    </div>
    <!-- //   注册-下一步流程 账号密码 -->
    <div class="loginRegister-main gg-flex-1 gg-flex-2" v-if="registeredAccountPassword&&!registrationSuccess">
      <div class="loginRegister-main-logo-box  gg-flex-4">
        <img draggable="false" class="loginRegister-main-logo" src="../assets/images/logo.png" alt="">
      </div>
      <div class="login-main-item gg-flex-3" :class="inputFocus=='Password'?'gg-input-focus':''">
        <div class="login-main-item-input">
          <el-input :type="pwdType" v-model="information.password" ref="input_password" @blur="blurFunc" @input="changePassword" placeholder="Password">
            <i slot="suffix" class="el-input__icon el-icon-view" @click="showPwd"></i>
          </el-input>

        </div>
      </div>

      <div class="login-main-item gg-flex-3" :class="inputFocus=='EnterThePasswordA'?'gg-input-focus':''">
        <div class="login-main-item-input">
          <el-input :type="EnterThePasswordAType" @blur="blurFunc" ref="input_EnterThePasswordA" @input="changeEnterThePasswordA" v-model="information.EnterThePasswordA" placeholder="Enter the password a">
            <i slot="suffix" class="el-input__icon el-icon-view" @click="showEnterThePasswordA"></i>
          </el-input>
        </div>
      </div>

    </div>
    <!-- 注册成功 - 提示 -->
    <div class="loginRegister-main gg-flex-1 gg-flex-2" v-if='registrationSuccess' style="margin-top: 175px;">
      <img draggable="false" class="loginRegister-main-RegistrationSuccess-icon" src="../assets/images/RegistrationSuccess.png" alt="">
      <div class="loginRegister-main-RegistrationSuccess-title">Password set successfully...</div>
    </div>

    <div class="loginRegister-footer gg-flex-3" v-if="!registeredAccountPassword">
      <div class="login-main-btn login-main-Return gg-flex-1" v-if="!NextStepCode" @click="goRegister($event)"><span>Return</span></div>
      <div class="login-main-btn login-main-Return gg-flex-1" v-if="NextStepCode" @click="SendCode($event)"><span>Send code</span></div>
      <div class="login-main-btn login-main-NextStep gg-flex-1" @click="goNextStep($event)" :class="NextStepCode&&information.VerificationCode.length<6?'login-main-NextStep-disabled':''"><span>Next step</span></div>
    </div>

    <div class="loginRegister-footer gg-flex-3" v-if="registeredAccountPassword&&!registrationSuccess">
      <div class="login-main-btn login-main-Return gg-flex-1" @click="goCancel($event)"><span>Cancel</span></div>
      <div class="login-main-btn login-main-NextStep gg-flex-1" @click="Determine($event)" :class="information.password==''||information.EnterThePasswordA==''?'login-main-NextStep-disabled':''"><span>Determine</span></div>
    </div>
     <div class="loginRegister-footer gg-flex-1" v-if="registrationSuccess" style="    justify-content: center;">
      <div class="login-main-btn login-main-NextStep  login-main-RegistrationSuccess  gg-flex-1" @click="goRegistrationSuccess($event)" ><span>Determine</span></div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'loginRegister',
  //import引入的组件需要注入到对象中才能使用
  components: {},
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
        account: '13962524311',
        password: 'a123456789',
        // 验证码
        VerificationCode: '',
        // 确认密码
        EnterThePasswordA: 'a123456789',
      },
      //   是否开启下一步 获取验证码
      NextStepCode: false,
      //   注册-下一步流程 账号密码
      registeredAccountPassword: false,
      //   密码
      pwdType: 'password',
      //   确认密码
      EnterThePasswordAType: 'password',
      //   注册成功页
      registrationSuccess: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 清空账号
    deleAccount() {
      this.information.account = '';
    },
    // 手机号 正在输入 添加样式
    changeAccount() {
      this.inputFocus = 'Account';
    },
    // 确认密码 正在输入 添加样式
    changeEnterThePasswordA(val) {
      this.inputFocus = 'EnterThePasswordA';
    },
    // 验证码 正在输入 添加样式
    changeVerificationCode() {
      this.inputFocus = 'VerificationCode';
    },
    // 删除验证码
    deleVerificationCode() {
      this.information.VerificationCode = '';
    },
    //密码 input 正在输入 添加样式
    changePassword(val) {
      this.inputFocus = 'Password';
    },
    // 失去焦点
    blurFunc() {
      this.inputFocus = '';
    },
    // 返回
    goRegister() {
      this.$router.go(-1);
    },
    // 下一步
    goNextStep() {
      // 注册-进入获取验证码流程-之前校验
      if (!this.NextStepCode) {
        if (this.information.account == '') {
          // 调用$nextTick函数 
          this.$nextTick(function () {
            // 获取元素焦点
            this.$refs.input_account.focus()
          });
          return alert('请输入手机号');
        } else {
          //   注册-进入获取验证码流程
          return this.NextStepCode = true;
        }
      }
      //   // 注册-进入获取验证码流程-之后点击下一步 - 校验
      if (this.NextStepCode) {
        if (this.information.VerificationCode == '') {
          // 调用$nextTick函数 
          this.$nextTick(function () {
            // 获取元素焦点
            this.$refs.input_VerificationCode.focus()
          });
          return alert('请输入验证码');
        } else {
          //   注册-进入输入账号密码流程
          return this.registeredAccountPassword = true;
        }
      }


    },
    //获取验证码
    SendCode() {
      alert('验证码：' + 627889);
      this.information.VerificationCode = '627889';
    },
    //密码显示切换
    showPwd() {
      this.pwdType === 'password' ? this.pwdType = '' : this.pwdType = 'password';
      console.log(this.$refs.input_password)
      //   let e = document.getElementsByClassName('el-icon-view')[0];
      let e = this.$refs.input_password.$el.querySelector('.el-icon-view');
      this.pwdType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
    },
    //确认密码显示切换
    showEnterThePasswordA() {
      this.EnterThePasswordAType === 'password' ? this.EnterThePasswordAType = '' : this.EnterThePasswordAType = 'password';
      let e = this.$refs.input_EnterThePasswordA.$el.querySelector('.el-icon-view')
      this.EnterThePasswordAType == '' ? e.setAttribute('style', 'color: #409EFF') : e.setAttribute('style', 'color: #c0c4cc');
    },
    // 取消注册 - 返回登录页
    goCancel() {
      this.$router.go(-1);
    },
    // 确认密码-提交
    Determine() {
      if (this.information.password == '') {
        // 调用$nextTick函数 
        this.$nextTick(function () {
          // 获取元素焦点
          this.$refs.input_password.focus();
        });
        return alert('请输入密码');
      };
      if (this.information.EnterThePasswordA == '') {
        // 调用$nextTick函数 
        this.$nextTick(function () {
          // 获取元素焦点
          this.$refs.input_EnterThePasswordA.focus();
        });
        return alert('请输入确认密码');
      };
      // 确认密码 通过 -进入下一步流程-注册成功页面
      this.registrationSuccess = true; 
    },
    // 注册成功 - 进入登录页面
    goRegistrationSuccess(){
        // 编程式导航-params传递参数-JS代码内部跳转 + 传递参数 
        let params=''
      this.$router.push({
        name: "login",
        path: "/login",
        query: {
          params:params,
        }
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
@import "../assets/css/loginRegister.css";
.login-main-item:hover {
  border: 1px solid #17ba77;
}
/* .login-main-item-input /deep/ .el-input{
height: 100%;
 } */

.login-main-item-input /deep/ .el-input__inner {
  border: 0px !important;
}
/* 去除 全局的 获取焦点时边框颜色 */
.login-main-item /deep/ .el-input__inner:hover,
.login-main-item /deep/ .el-input__inner:focus {
  border: 0px !important;
}
</style>
