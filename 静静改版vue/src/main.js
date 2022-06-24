// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from "vue-axios";
import "babel-polyfill";
import "./assets/css/font.css"
// import filter from './plugins/filter'
// 全局导入filter过滤器
// Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios,axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// let base = process.env.NODE_ENV === 'production' ?'http://log.woniu.com':'http://log.woniu.com';
// Vue.prototype.baseURL = base;