<template>
  <div class="hello">
    <!-- 输出变量 -->
    <h1>{{ msg }}</h1>
    <div class="">
      <input type="text" />
    </div>
    <p>ID：{{ $route.params.id }}</p>
    <p>名称：{{ $route.params.name }}</p>
  </div>
</template>

<script>
export default {
  // 定义页面名称，可以不要
  name: "HelloWorld",
  data() {
    return {
      // 定义变量
      msg: "Welcome to Your Vue.js App AAA",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
