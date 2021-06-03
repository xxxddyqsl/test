<template>
  <div class="box">
       <header class="header">
         
         <div class="seach">
         <input type="text" placeholder="请输入关键字" class="txt">
         <input type="button" value="搜索" class="btn">
         </div>
        <router-link to='/login' tag="span">登录</router-link><span>/</span><router-link to='/register' tag="span">注册</router-link>
       </header>
       <content class="content">
          <mt-swipe :auto="4000" class="xxx">
            <mt-swipe-item v-for="(item,index) of bannerdata" :key="index">
              <img :src="item" alt="">
            </mt-swipe-item>
          </mt-swipe>
          <div class="nav">
            <ul>
              <li>
                <span class="iconfont icon-remen"></span>
                <h4>热门</h4>
              </li>
              <li>
                <span class=" iconfont icon-jingpin"></span>
                <h4>精品</h4>
              </li>
              <li>
                <span class="iconfont icon-zhuanti"></span>
                <h4>专题</h4>
              </li>
              <li>
                <span class="iconfont icon-pinpai"></span>
                <h4>品牌</h4>
              </li>
            </ul>
          </div>
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  ref="loadmore">
          <List :list="list"></List>
          </mt-loadmore>
       </content>
     </div>
</template>

<script>

import api from '@/api/home'
import List from '@/components/home/List'
import Vue from 'vue'
import { Swipe, SwipeItem, Loadmore,Toast} from 'mint-ui'

Vue.use(Swipe, SwipeItem, Loadmore)

export default {
  name: 'home',
  data(){
    return {
      list:[],
      bannerdata:[],
      allLoaded:false,
      pagCode:1
    }
  },
    components:{
      List
    },
  created () {
    api.requestList().then(data=>{
      // console.log(data)
      this.list=data
    }).catch(err => console.log(err))

    api.requestbanner().then(data =>{
      // console.log(data)

      let arr=[]
      for(var itm of data){
        arr.push('https://www.daxunxun.com'+itm)
      }
      this.bannerdata=arr
    }).catch(err => console.log(err))
  },
  methods:{
    loadTop(){ // 下拉刷新的函数  ---  实际上请求的就是列表第一页的数据
      api.requestList().then(data => {
        this.list=data
        this.pageCode = 1 //this.pageCode = 1
         Toast({
            message:'第一页',
           
            duration: 2000,
           

         }),
       this.$refs.loadmore.onTopLoaded()  // 更新列表的高度 
      })
    .catch(err => console.log(err))
    },
    
    loadBottom(){ // 上拉加载的函数  ---  分页
        api.loadmore(this.pagCode).then(data=>{
          if(data.length===0){ // 没有数据了
             this.allLoaded = true
             Toast({
            message: '数据加载完毕',
            position: 'bottom',
            duration: 5000
          })
          }else{
            this.list = [...this.list, ...data]
            this.pagCode+=1
          }
          this.$refs.loadmore.onBottomLoaded()
        })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/qunar/reset.scss';
  .header{
    
    span{
      // margin-left: .2rem;
      line-height: 0.44rem;
      // display: inline-block;
      // margin: 0.05rem,0.1rem;
      color:#fff;
      font-size: 14px;
    }
    .seach{
      margin-top:0.05rem;
      border-radius: 15px;
      border: 1px solid #f66;
      @include rect(80%,80%);
      overflow: hidden;
     float: left;
      .txt{
         @include rect(80%, 100%);
        float: left;
        border: none;
        padding: 10px;
        
      }
      .btn{
         @include rect(20%, 100%);
        float: left;
        border: none;
        background:#FFF;
        color:red;
      }
    }
  }
  .content{
    .mint-swipe{
       @include rect(100%, 1.6rem);
    }
  }
.mint-swipe {
  @include rect(100%, 1.6rem);
  img {
    @include rect(100%, auto);
  }
}
.nav{
  
  @include rect(100%,.8rem);
  ul{
    @include flexbox;
    @include rect(100%,100%);
    li{
      @include flex();//平均分
      @include rect(auto,100%);//宽自适应 高100%
      @include flexbox();//弹性盒
      @include flex-direction(column);////纵向排列
      @include justify-content();//justify-content:center
      @include align-items();
    }
  }
 
}
</style>
