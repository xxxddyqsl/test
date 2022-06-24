<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- include 返回不重新载入 -->
    <keep-alive include="login">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "./assets/css/utils.css";
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
} */

#app {
  width: 100%;
  height: 100%;
 
}
html,body{
 /* //字体名 */
  font-family:  'Futura-Medium, Futura'!important;
  font-weight: 500;
}
/* 修改element默认字体 */
  .el-input__inner {
    font-family: 'Futura-Medium, Futura' !important;
}
</style>
