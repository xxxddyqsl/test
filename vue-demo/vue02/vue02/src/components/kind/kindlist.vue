<template>
    <div>
        <ul class="movielist">
           <li v-for="item of listdata" :key="item.id" @click="goDetail(item.id)">
      <div class="movieimg">
        <img :src="item.images.small" :alt="item.alt">
      </div>
      <div class="info">
        <h3>片名：《{{ item.title }}》</h3>
        <p>类型：《{{ item.genres[1] }}》</p>
        <h4>评分：{{item.rating.average}}</h4>
        <h5>主演：{{item.casts[0].name}}</h5>
        <h6>导演：{{item.casts[1].name}}</h6>
      </div>
    </li>
        </ul>
    </div>
</template>

<script>

export default {
    name:'kindlist',
    props:{
        listdata:{
            type:Array,
            required:true
        }
    },
    methods: {
    goDetail (id) {
      this.$router.push({name: 'detail', query: {id}})  
    }
  } 
}
</script>

 <style lang="scss">
@import '@/qunar/reset.scss';

.movielist {
  li {
    @include rect(100%, 1.1rem);
    @include flexbox();
    .movieimg{
      @include rect(1rem, 1rem);
      @include padding(0.05rem);
      img{
        @include rect(auto, 1rem);
      }
    }

    .info {
      @include flex();
    }

    @include border(0 0 1px 0, #ccc, solid); // 1px边框实现
  }
}
</style>

