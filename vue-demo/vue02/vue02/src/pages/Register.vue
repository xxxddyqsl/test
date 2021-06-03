<template>
    <div class="box">
    <mt-header title="注册">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field placeholder="请输入手机号" type="tel" :state="phoneState" v-model="phone"></mt-field>
    <mt-field placeholder="请输入验证码" v-model="code" :state = "codeState">
      <mt-button :disabled="btnflag" plain @click.native="sendCode">{{ msg }}</mt-button>
    </mt-field>
    <mt-field placeholder="请输入密码" type="password" :state="passwordState" v-model="password"></mt-field>
    <mt-button :type="type" :disabled="flag" @click.native="register">注册</mt-button>
  </div>
   
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import { Header, Field, Button, Toast } from 'mint-ui'
Vue.use(Header, Field, Button)

export default {
    name:'register',
    data(){
        return {
            msg:'发送验证码',
            btnflag:false,
            phone:'',
            code:'',
            password:'',
            admin:''
        }
    },
    computed:{
        phoneState () {
            if(this.phone===''){
                return ''
            }else{
               if(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(this.phone)){
                return 'success'
               }else{
                   return 'error'
               } 
            }
            
        },
        passwordState(){
          if (this.password === '') {
            return ''
            } else {
              if (this.password.length > 5) {
                 return 'success'
                } else {
                return 'error'
             }
           }
        },
        codeState () {
      if (this.code === '') {
        return ''
      } else {
        if (this.code !== this.admin) {
          return 'error'
        } else {
          return 'success'
        }
      }
    },
     flag () {
      if (this.codeState === 'success' && this.phoneState === 'success' && this.passwordState === 'success') {
        return false
      } else {
        return true
      }
    },
     type () {
      if (this.codeState === 'success' && this.phoneState === 'success' && this.passwordState === 'success') {
        return 'primary'
      } else {
        return 'default'
      }
    }
  },
   methods:{
       sendCode(){
           axios.get('https://www.daxunxun.com/users/sendCode?tel=' + this.phone)
           .then(data=>{
               if(data.data==1){
                  Toast('该用户已注册')
               }else if(data.data==0){
                  Toast('获取验证码失败') 
               }else{
                this.admin = data.data.code
               }
           })
           let timer = null
           let time = 5
           timer = setInterval(() => {
               time--
               this.btnflag = true
               this.msg=time+'后重新发送'
               if(time===0){
                   this.msg='发送验证码'
                   this.btnflag = false
                  clearInterval(timer)
               }
           },1000)
       },
        register(){
            axios.post('https://www.daxunxun.com/users/register',{
                username: this.phone,
                password: this.password  
            }).then(data=>{
               if (data.data === 2) {
          Toast('该用户已注册')
        } else if (data.data === 0) {
          Toast('注册失败')
        } else {
          Toast('注册成功')
          this.$router.push('/login')
        } 
            })
            
        }
   } 
}  
</script>

<style lang="scss">


</style>
