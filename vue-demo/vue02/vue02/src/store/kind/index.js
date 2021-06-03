import api from '@/api/kind'
const store = {
    state:{ //存放当前页面的状态   、、仓库
        listdata:['dada']
    },
    getters:{ //状态的衍生值 也就是state的计算属性

    },
    actions:{//处理组件中的异步操作
        requestlist(context){
            api.requestdata('https://www.daxunxun.com/douban?start=0&count=200').then(data=>{
                console.log(data)
               context.commit('changlistdata',data)
        })
    },
        // loadmore(context,pageCode){
        //     axios.get('https://www.daxunxun.com/douban?start=' + pageCode * 20 + '&count=20').then(data=>{
        //     context.commit('changlistdata',data)
        // })

     
    },
    mutations:{//唯一可以改变页面状态的地方  
        changlistdata(state,data){
            state.listdata=data
            
        }
    }

}

export default store