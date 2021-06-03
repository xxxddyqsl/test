const store = {
    state:{ //存放当前页面的状态   、、仓库
        goods:[],
        
    },
    getters:{ //状态的衍生值 也就是state的计算属性
       
    },
    actions:{//处理组件中的异步操作

        goodds:({commit,state},paylod)=>commit('changGoods',paylod)
         //goodds(context){
//              context.commit('changGoods',data)
         //}   

    },
    mutations:{//唯一可以改变页面状态的地方  
        // changGoods(state,data){ //state就是goods
        //         state.goods.push(data)
            changGoods:(state,paylod)=>{state.goods=paylod},

          
        }
    }



export default store