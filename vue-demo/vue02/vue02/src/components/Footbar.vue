<template>
    <div>
        <footer class="footer">
        <ul>
      <router-link to="home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
      </router-link>
      <router-link to="kind" tag="li">
          <span class="iconfont icon-daohangfenlei"></span>
          <p>分类</p>
      </router-link>
      <router-link to="cart" tag="li">
          
          <span class="iconfont icon-gouwuchekong"></span>
          <p>购物车</p>
      </router-link>
      <router-link to="user" tag="li">
        <span class="iconfont icon-wode"></span>
          <p>我的</p>
      </router-link>
    </ul>
    </footer>
</div>
</template>

<script>

    
</script>

<style lang="scss">
@import '@/qunar/reset.scss';
 img{
     @include rect(0.2rem,0.2rem);
 }


</style>
