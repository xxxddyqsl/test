import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login' // 引入页面组件，命名为Login
Vue.use(Router)// Vue全局使用Router

export default new Router({// 定义路由配置
  routes: [  //配置路由，这里是个数组
    { //每一个链接都是一个对象
      path: '/',//链接路径 子页面1
      name: 'Login',//路由名称，
      component: Login //对应的组件模板
    },
    {
      path: '/home/:id/:name',
      name: 'HelloWorld',
      components: {
        default: () => import(/* webpackChunkName: "group-footbar" */ '@/components/HelloWorld'),
      }
    }
  ]
})
