<template>
 <div class="box">
       <header class="header">
         <mt-header title="购物车">
      <a slot="left" onclick="window.history.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
       </header>
       <content class="content">
            <p class="wd">全部订单</p>
            <div v-show='ddd'>购物车里社么都没有去逛逛逛吧</div>
        <ul class="carlist">
           <li v-for="item of list" :key="item.id">
              <input type="checkbox" class="ck">
                <div class="carimg">
                  <img :src="item.images.small" :alt="item.alt">
                  </div>
                    <div class="info">
                    <h3>片名：《{{ item.title }}》</h3>
                    <p>类型：《{{ item.genres[1] }}》</p>
                    <h5>主演：{{item.casts[0].name}}</h5>
                    <h6>￥：{{parseFloat(item.id-1290000)}}</h6>
                    <div class="box3">
                      <div id="num">
                            <span @click="jian(item)">-</span>
                            <span ref='num'>{{ item.num }}</span>
                            <span @click="jia(item)">+</span>
                      </div>
                      <mt-button type="danger" class="btn" @click="remove(item.id,$event)">删除</mt-button>
                    </div>
                </div>
            </li> 
     </ul>
         <div>
           <h3>总数：</h3>
           <h4>总计：</h4>
           </div>  
       </content>
       
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Toast,Header,Badge} from 'mint-ui'
import api from '@/api/cart'
import {mapGetters, mapState,mapActions} from 'vuex'
Vue.use(Header,Button,Badge,Button.name,)

export default {
  name: 'cart',
  data(){
    return{
      list:[],
      ddd:false,
     
    }
  }, 
  
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

  // beforeRouteLeave (to, from, next) {
  //   if (localStorage.getItem('pay') === 'ok') {
  //     next()
  //   } else {
  //     alert('买了再走')
  //   }
  // }  
  
  mounted(){
    if(this.$store.state.detailStore.goods.length==0){
            this.ddd=true
        }
    api.requestList('https://www.daxunxun.com/douban?start=0&count=200').then(data=>{
         let id=this.$store.state.detailStore.goods
         for(let i =0;i<data.length;i++){
           for(let j =0;j<id.length;j++){
             if(data[i].id===id[j]){
               this.list.push(data[i])
             }
           }
         }
       
    })
    
  },
 
  methods:{
    remove(id,event){
      event.path[3].remove()
      console.log(id)
      let arr=this.$store.state.detailStore.goods
      for(let i=0;i<arr.length;i++){
        if(arr[i]==id){
          arr.splice(i,1)
          
        }
      }
     this.$store.dispatch('goodds',arr)
    },
    jian(item){
      // if(this.cont<=1){
      //   this.cont=1

      // }else{
      //   this.cont--
      // }
      item.num--
    },
    jia(item){
    console.log(this.list)
     item.num++
      
    }
  }
  
  //       computed:{
  //         ...mapState({
  //           cartlist:state=>state.cartStore.cartlist
  //         }),
  //         ...mapGetters([
  //           'listid'
  //         ])

  //       },
  // methods:{
  //     ...mapActions([
  //       'requestCartList'
  //     ])
  // },
  // created(){
  //    this.requestCartList()
  //   //  console.log(list)
  // },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import '@/qunar/reset.scss';
.mint-header{
    background: red
}
.wd{
  font: 600 .2rem/.3rem "";
  color: coral;
  margin:0 10px;
}
.carlist{
   li {
    @include rect(100%, 1.1rem);
    @include flexbox();
    .ck{
      display: inline-block;
      @include rect(20px,20px);
      border-radius: 50%;
      margin-top: .4rem;
    }

    .carimg{
      @include rect(1rem, 1rem);
      @include padding(0.05rem);
      img{
        @include rect(auto, 1rem);
      }
    }

    .info {
      @include flex();


      h6{
        color: red;
      }
      .box3{
        display: flex;
        justify-content: space-between;
        #num{
          span{
            text-align: center;
            display: inline-block;
            border:1px solid #eee;
            @include rect(.2rem,.2rem)
          }

        }
        .btn{
          margin-top:-.2rem;
        }
      }
    }

    @include border(0 0 1px 0, #ccc, solid); // 1px边框实现
  }
}
</style>
