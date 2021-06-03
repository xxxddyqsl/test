const store = {
    state:{ //存放当前页面的状态   、、仓库
        islogin:false
    },
    getters:{ //状态的衍生值 也就是state的计算属性
       
    },
    actions:{//处理组件中的异步操作

    },
    mutations:{//唯一可以改变页面状态的地方  
        changeIslogin(state,data){ //state就是islogin
            state.islogin = data
        }
    }

}

export default store