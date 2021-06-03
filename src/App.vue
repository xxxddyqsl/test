<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// vue刷新当前页面，重载页面数据 实现原理 通过控制router-view 的显示与隐藏，来重渲染路由区域，重而达到页面刷新的效果，show -> flase -> show
export default {
  name: 'App',
}
</script>

<style>
@import './assets/css/utils.css';
html,body{
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* margin-top: 60px; */
}

</style>