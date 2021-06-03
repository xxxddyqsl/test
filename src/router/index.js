import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   redirect: 'Home',
    // },
    // {
    //   path: '/Login',
    //   name: 'Login',
    //   components: {
    //     default: () => import(/* webpackChunkName: "group-user" */ '@/pages/Login')
    //   }
    // },
    {
      // path: '/Home/:constraints/',
      path: '/',
      name: 'Home',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/pages/Home')
      }
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
