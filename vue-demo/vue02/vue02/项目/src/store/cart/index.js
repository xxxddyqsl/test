import api from '@/api/cart'
const store = {
    state:{ //存放当前页面的状态   、、仓库
        // cartlist:[]
        
    },
    getters:{ //状态的衍生值 也就是state的计算属性
    //    listid(state){
    //         return console.log(this)
    //    }
    },
    actions:{//处理组件中的异步操作
        // requestCartList(context){
        //     api.requestList('https://www.daxunxun.com/douban?start=0&count=200').then(data=>{
        //         context.commit('changcart',data)
        //     })
        // }
        // goodds:({commit,state},paylod)=>commit('changGoods',paylod)
        //  goodds(context){
        //      context.commit('changGoods',data)
        //  }   

    },
    mutations:{//唯一可以改变页面状态的地方  
        // changGoods(state,data){ //state就是goods
        //         state.cartlist=data
            // // changGoods:(state,paylod)=>{state.goods=paylod} 
            // changcart(state,data){
            //     state.cartlist=data
            // }
        }
    }



export default store