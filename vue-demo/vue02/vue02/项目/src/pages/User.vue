<template>
  <div class="box">
       <mt-header title="个人中心">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right" @click="zhuxiao">注销</mt-button>
    </mt-header>
       <content class="content">
         <div class="content-tx">
           <div class="bg">
            <div class="tx">
                <a href="javascript:;"  @click="selectAvatar" class="dd">
                <img src="../assets/hjs.jpg" >
                </a>
                <mt-actionsheet
                    :actions="actions"
                    v-model="sheetVisible">
                  </mt-actionsheet>
                <h3>德玛西亚</h3>
            </div>
           </div>
            <p>
              <router-link to='/Cart' tag='a' class="zuo">我的订单</router-link>
              <router-link to='/Cart' tag='a' class="you">查看全部订单></router-link>
              
            </p>
           <ul class="lb">
             <li>
                 <span class="iconfont icon-daifukuan"></span>
                <h4>待付款</h4>
             </li>
             <li>
                 <span class="iconfont icon-daifahuo"></span>
                <h4>待发货</h4>
             </li>
             <li>
                 <span class="iconfont icon-daishouhuo"></span>
                <h4>待收货</h4>
             </li>
             <li>
                 <span class="iconfont icon-pingjia-tianchong"></span>
                <h4>评价</h4>
             </li>
             <li>
                <span class="iconfont icon-tuikuanshouhou"></span>
                <h4>售后</h4>
             </li>
           </ul> 
         </div>

         </content>
     </div>
</template>

<script>

import Vue from 'vue'
import { Header,  Button,Actionsheet } from 'mint-ui'
Vue.use(Header,  Button , Actionsheet)
export default {
  name: 'user',
   beforeRouteEnter (to, from, next) {
    next(vm => {
      // console.log(vm)
      if (vm.$store.state.loginStore.islogin) {
        next()
        } else {
        next('/login')
      }
    })
  },
  data(){
    return {
      actions:[
        {
          name:'拍照',
          method: this.paizhao
        },{
          name:'从相册选取',
          method: this.xiangce
        }
      ],
      sheetVisible: false
    }
  },
  methods:{
    paizhao(){
      console.log('拍照')
    },
    xiangce(){
      console.log('从相册选取')
    },
    selectAvatar () {
      this.sheetVisible = true
    },
    zhuxiao(){
      this.$store.commit('changeIslogin',false)
      this.$router.push('/login')
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
.mint-header{
       @include background-color(red)
    }
.content{
  .content-tx{
   
      .bg{
      background-color:lightgreen;
        border-radius:0 0 .8rem .8rem;
        @include rect(100%,auto);
    .tx{
      padding-top:.4rem;
       @include rect(1rem,auto);
      margin: 0 auto;
      .dd{
        display: block;
        border-radius: 50%;
        overflow: hidden;
        @include rect(1rem,1rem);
        img{
          @include rect(100%,100%);
        }
      }
      h3{
        text-align: center;
        font:.2rem/2 "";
      }
    }
      }
    p{
      margin: 0 .2rem;
      background: #fff;
      @include flexbox();
      justify-content: space-between;
      a{
        font: 700 .2rem/2 "";
      }
      .zuo{
        color: #000;

      }
      .you{
        color: gray;
        font-size: .1rem;
        line-height: 0.4rem;
      }

    }
    
  
  
  .lb{
     background: #fff;
    @include flexbox;
    @include rect(100%,100%);
    li{

      @include flex();//平均分
      @include rect(auto,100%);//宽自适应 高100%
      @include flexbox();//弹性盒
      @include flex-direction(column);////纵向排列
      @include justify-content();//justify-content:center
      @include align-items();
      span{
        font-size:.3rem ;
        color: orangered;
      }
    }
  }
 

  }
}
</style>

