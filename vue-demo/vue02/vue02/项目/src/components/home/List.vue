<template>
    <ul class="mlist">
        <li v-for="item of list" :key="item.id" @click="godetail(item.id)">
            <div class="mimg">
                <img :src="item.images.small" :alt="item.alt">
                <h3>{{item.title}}</h3>
                <h4>{{item.id}}</h4>

            </div>
        </li>
    </ul>
</template>

<script>
export default {
    name:'homelist',
    data(){
        return {
            imgSrc:'',
        }
    },
    props:{
        list:{
            type:Array,
            required:true
        }
    },
   
    methods:{
        godetail(id){
            this.$router.push({name:'detail',query:{id}})
        }
    },
    
}
</script>

<style lang="scss">
@import '@/qunar/reset.scss';

.mlist{
    @include flexbox();
      flex-wrap: wrap;
        
    
    li{
        @include rect(50%,2rem);
        @include flexbox();
        .mimg{
           @include rect(100%,1rem);
           @include padding(0.05rem);
           img{
            @include rect(100%, 1.4rem);
            } 
        }

        .info{
         @include flex(); 
        }
         @include border(0 0 1px 0, #ccc, solid); // 1px边框实现
    }
}

</style>

