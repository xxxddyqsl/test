<template>
<div class="box">
       <mt-header title="分类">
         <a slot="left" @click="qiehuan">
           <mt-button icon="back"></mt-button>
         </a>
       </mt-header>
       <content class="content">
          <ul class="leixin" v-show="buer">
            <li @click="someKind" v-for="(item, index) of Name" :key="index">{{ item }}</li>
          </ul>
          <Kindlist :listdata='kind'  v-show="xianshi"></Kindlist>
       </content>
     </div>
</template>

<script>
import api from '@/api/kind'
import Kindlist from '@/components/kind/kindlist'
import {mapState, mapActions} from 'vuex'
import Vue from 'vue'
import { Header, Button, Toast,Indicator} from 'mint-ui'
Vue.use(Header, Button ,)
export default {
  name: 'kind',
  data(){
    return {
      list: [],
      kind: [],
      Name: [],
      buer:true,
      xianshi:false
    }
  },
   components:{
      Kindlist,
    },
  computed:{
    // ...mapState({
    //   listdata:state => state.kindStore.listdata
    // })
    // listdata(){
    //   return this.$store.state.kindStore.listdata
    // }
  },
  created(){
    Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })
    api.requestList().then(data=>{
      // this.$store.commit('changlistdata',data)
      this.list = data
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].genres.length; j++) {
          this.Name.push(data[i].genres[j])
        }
      }
      this.Name = [...new Set(this.Name)]
      this.Name=this.Name.splice(0,this.Name.length-2)
      // console.log(this.Name)
      // console.log(this.list)
    }).catch(err => console.log(err))
    // this.$store.dispatch('requestlist')
    // this.requestlist()
  },
  methods: {
    // ...mapActions([
    //   'requestlist'
    // ]),
    someKind (event) {
      // console.log(event.target.innerText)
      this.kind = []
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < this.list[i].genres.length; j++) {
          if (event.target.innerText === this.list[i].genres[j]) {
            this.kind.push(this.list[i])
          }
        }
      }
            
         this.buer=false,
      this.xianshi=true
      // console.log(this.kind)
    },
    qiehuan(){
       this.buer=true,
      this.xianshi=false
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
    span{
      color: gray
    }
   .leixin{
     margin-left: 1px;
     background: url(../assets/ggg.png) repeat;
     display: flex;
     flex-wrap: wrap;
     color:peachpuff;
     border: 1px solid #999;
     li{
       
      justify-content: space-around;
      box-sizing: border-box;
      border-right: 1px solid #999;
      border-bottom: 1px solid #999;
      @include rect(25%,.8rem);
       
      
      text-align: center;
      line-height: .8rem;
      &.active{
        background: #f66;
      }
     }
     
     
   }
</style>
