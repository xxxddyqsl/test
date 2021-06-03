
import Footbar from '@/components/Footbar'


const routes = [
    {
        path:'/',
        redirect:'/home'
        
    },
    {
        path:'/home',
        name:'home',
        components:{
            default:()=>import(/* webpackChunkName: "group-footbar" */ '@/pages/Home'),
            footer:Footbar
        }
    },
    {
        path:'/kind',
        name:'kind',
        components:{
            default:()=>import(/* webpackChunkName: "group-footbar" */ '@/pages/Kind'),
            footer:Footbar
        }
    },
    {
        path:'/user',
        name:'user',
        components:{
            default:()=>import(/* webpackChunkName: "group-footbar" */ '@/pages/User'),
            footer:Footbar
        }
    },
    {
        path:'/cart',
        name:'cart',
        components:{
            default:()=>import(/* webpackChunkName: "group-footbar" */ '@/pages/Cart'),
            footer:Footbar
        }
    },
    {
        path: '/detail',
        name: 'detail',
        components: {
          default: ()=>import(/* webpackChunkName: "group-detail" */ '@/pages/Detail')
        }  
    },
    {
        path: '/register',
        name: 'register',
        components: {
          default: () => import(/* webpackChunkName: "group-user" */ '@/pages/Register')
        }
      },
      {
        path: '/login',
        name: 'login',
        components: {
          default: () => import(/* webpackChunkName: "group-user" */ '@/pages/Login')
        }
      },
]

export default routes


