<template>
    <div class="box">
    <mt-header title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field placeholder="请输入手机号" type="tel" :state="phoneState" v-model="phone"></mt-field> 
    <mt-field placeholder="请输入密码" type="password" :state="passwordState" v-model="password"></mt-field>
    <mt-button :type="type" :disabled="flag" @click.native="gologin">登录</mt-button>
    <router-link to="/register" tag="mt-button">注册</router-link>
    
  </div>
   
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import { Header, Field, Button, Toast } from 'mint-ui'
Vue.use(Header, Field, Button)
export default {
    name:'login',
    data(){
        return {   
            phone:"",
            password:'',
           
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
         flag () {
      if (this.phoneState === 'success' && this.passwordState === 'success') {
        return false
      } else {
        return true
      }
    },
    type () {
      if ( this.phoneState === 'success' && this.passwordState === 'success') {
        return 'primary'
      } else {
        return 'default'
      }
    }  
    },
    methods:{
        gologin(){
            axios.post('https://www.daxunxun.com/users/login',{
                username: this.phone,
                password: this.password
            }).then(data=>{
              // console.log(data)
                if (data.data === 2) {
          Toast('没有该用户，请注册')
        } else if (data.data === 0) {
          Toast('登录失败')
        } else if(data.data==-1){
          Toast('密码错误')
        }else if(data.data==1){
            Toast('登录成功')
            this.$router.push('/')
            this.$store.commit('changeIslogin',true)
        } 
            })
        },
     


    }
}
</script>

 <style lang="scss">
@import '@/qunar/reset.scss';
    .mint-header{
       @include background-color(red)
    }
</style>
>

</style>
