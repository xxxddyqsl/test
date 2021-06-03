<template>
  <div class="box">
    <img src="../assets/logo.png">
    <input type="text" name="" id="" >
     <!-- 页面跳转 --> 
    <p>导航A ：
     <!-- 一、router-link标签跳转 -->
          <router-link to="/">login</router-link>
           <!-- 路由传递参数 -->
           <!-- PS：上面to前边是带冒号，后边跟的是一个对象形势的字符串 
              name：在路由配置文件中起的name值。叫做命名路由 如： name: 'HelloWorld'。
              params：要传的参数，它是对象形式，在对象里可以传递多个值 -->
          <router-link :to="{name:'HelloWorld',params:{id: 1,name:username}}">hello</router-link>
        </p>
    <!-- 二、编程式导航-JS代码内部跳转 -->
    <!-- this.$router.push('/xxx') -->
   <button @click="goHome">登录</button> 
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login',
      home:'首页',
      username:'test123',
    }
  },
  methods:{
    goHome(){  
      // 编程式导航-JS代码内部跳转 
      // this.$router.push('/home' );
      // 3、编程式导航-params传递参数-JS代码内部跳转 + 传递参数
      this.$router.push({name:'HelloWorld', params: {id: 1, name: 'zhangsan'}} );
      //  说明：
      // A、动态路由使用params传递参数，在this.$router.push() 方法中path不能和params一起使用，否则params将无效。需要用name来指定页面。
      // B、以上方式参数不会显示到浏览器的地址栏中，如果刷新一次页面，就获取不到参数了，改进方式将路由页面中的代码改成如下： 
      // {
      //    path: '/home/:id/:name',
      //    name: 'HelloWorld',
      //    component:
      // }

    }
  }
}
//  后退一步记录，等同于 history.back()
// this.$router.go(-1)
// // 在浏览器记录中前进一步，等同于 history.forward()
// this.$router.go(1)
</script>
<style scoped>
h1, h2 {
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
