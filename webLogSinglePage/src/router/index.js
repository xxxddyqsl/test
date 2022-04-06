import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/Home/:constraints/',
      path: '/',
      name: 'Log',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/pages/Log/Log')
      },
    },
    {
      path: '/logDetails/',
      name: 'LogDetails',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/pages/logDetails/logDetails')
      }
    }
  ]
})
