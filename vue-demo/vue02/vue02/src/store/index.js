import Vue from 'vue'
import Vuex from 'vuex'
import kindStore from './kind'
import loginStore from './login'
import detailStore from './detail'
import cartStore from './cart'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        kindStore,
        loginStore,
        detailStore,
        cartStore
    }
})

export default store