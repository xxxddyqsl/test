<template>
    <div class="box">
         <header class="header">
          <mt-header title="详情">
      <a slot="left" onclick="window.history.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
         </header>
        <div class="xq">
            <div class="center">
            <img :src="imgSrc" :alt="pro.alt">
            <div class="xqxia">
            <p class="ppp">￥{{pro.id}}</p>
            <ul class="ziduan">
                <li class="title">片名：《{{ pro.title }}》</li>
                <li>类型：《{{ pro.genres[1]}}》</li>
                <li>评分：{{pro.rating.average}}</li>
                <li>主演：{{pro.casts[0].name}}</li>
                <li>导演：{{pro.casts[1].name}}</li>
            </ul>
            </div>

            </div>

        </div>
        <div class="footbar">
            <div class="tb">
                <div>
            <span class="iconfont icon-remen"></span>
            <p>客服</p>

                </div>
                <div>
            <span class="iconfont icon-wode"></span>
            <p>收藏</p>
                </div>
            </div>
            <div class="an">
            <input type="button" value="加入购物车" class="btn1" @click="goods(pro.id)">
            <input type="button" value="立即购买" class="btn2">
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Header, Field, Button, Toast } from 'mint-ui'
import api from '@/api/detail'
import Back from '@/components/common/Back'
Vue.use(Header, Field, Button)
export default {
    props:['id'],
    name:'detail',
    data(){
        return {
            pro:{},
            imgSrc:'',
            buer:true,
            sum:''
        }
    },
    
    components:{
        Back
    },
    created(){
        let id = this.$route.query.id
        api.requestdata(id).then(data=>{
          this.pro=data[0]
          this.imgSrc=data[0].images.small  
        //   console.log(data[0]) 
       }).catch(err=>console.log(err))
       
        },
    methods:{
        goods(id){
            
            if(this.buer){
                
                let goodid= this.$store.state.detailStore.goods
                      if(goodid.length===0){
                          goodid.push(id)
                      }else if(goodid.length>=1){
                          if(goodid.indexOf(id)==-1){
                               goodid.push(id)
                          }
                      }
                      this.$store.dispatch('goodds',goodid)
                      Toast({
                          message:'加入成功',
                          position:'center',
                          duration: 2000,
                          })
                          this.buer=false
            }else{
                Toast({
                          message:'已经添加，去购物车看看',
                          position:'center',
                          duration: 2000,
                          })
                          this.buer=true
            }
        }
    }
    }

</script>

<style lang="scss">
@import '@/qunar/reset.scss';
.mint-header{
    background: red
}
.xq{
    display: flex;
     @include flex-direction(column);
   @include rect(100%,80%);
   .center{
        @include rect(100%,100%);
       img{
          @include rect(100%,60%); 
       }
       .xqxia{
           padding: 0.05rem 0.1rem;
           .ppp{
              color: red 
           }
           .ziduan{
               .title{
                   font-size: .25rem;
                   font-weight: bold;
               }
              
           }
       }
   }
    
}
        .footbar{
            
           
            padding: 0 .1rem;
            display: flex;
            .tb{
                 @include flexbox();
                @include rect(40%,0.5rem);
                text-align: center;
                flex:1;
                    span{
                     font-size: .2rem 
                    
                    } 
               
            }
            .an{
                border-radius: 15px;
                display: flex;
                overflow: hidden;
               @include rect(80%,0.5rem);
                input{
                    font:800 22px/22px "";
                    color: #fff;
                    border: none;
                    @include rect(50%,100%)
                 }
                .btn1{
                    background: #f66
                }
                .btn2{
                    background: red
                }
            }
        }
</style>
