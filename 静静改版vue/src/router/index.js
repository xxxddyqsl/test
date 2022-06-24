import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/Home/:constraints/',
      path: '/',
      name: 'login',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/pages/login/login')
      },
    },
    {
      path: '/components/loginRegister/',
      name: 'loginRegister',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/components/loginRegister')
      }
    },
    {
      path: '/Main/',
      name: 'Main',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/pages/main/main')
      }
    },
    {
      path: '/components/History/',
      name: 'History',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/components/History')
      }
    },
    {
      path: '/components/PersonalInfo/',
      name: 'PersonalInfo',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/components/PersonalInfo')
      }
    },
    {
      path: '/components/chooseUser/',
      name: 'chooseUser',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/components/chooseUser')
      }
    },
    {
      path: '/components/videoPage/',
      name: 'videoPage',
      components: {
        default: () => import(/* webpackChunkName: "group-user" */ '@/components/videoPage')
      }
    },
  ]
})
