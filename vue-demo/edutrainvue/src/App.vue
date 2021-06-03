<!-- 3、App.vue（根组件）
一个vue页面通常由三部分组成：模板(template)、js(script)、样式(style)，说明如下： -->
<!-- 模板 -->
<!-- [template-模板]
（1） 模板只能包含一个父节点，也就是说顶层的div只能有一个（如上图，父节点为#app的div，其没有兄弟节点）
（2）<router-view/>是子路由视图插槽，后面的路由页面都显示在此处，相当于iframe -->
<template>

  <div id="app">
    
    <router-view/>
  </div>
</template>
<!--  js代码  
// 【script-JS代码】
// vue通常用es6来写，用export default导出，其下面可以包含数据data，生命周期(mounted等)，方法(methods)等。
// export default {
//   name: 'App'
// } -->
<script>

// 导入组件
import Hello from './components/HelloWorld'
import Log from './components/Login'
export default {
  name: 'app',
  components: {
    Hello,
    Log
  }
}


</script>
<!-- /* 【style-CSS样式】 样式通过style标签<style></style>包裹，默认是影响全局的，如需定义作用域只在该组件下起作用，需在标签上加scoped，<style scoped></style> */
// 引入外部CSS示例：
// <style>
//     import './assets/css/public.css'
// </style> -->
<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
