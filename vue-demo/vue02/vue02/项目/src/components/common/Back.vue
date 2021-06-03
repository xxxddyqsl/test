<template>
    <button @click="back">返回 </button>
</template>
<script>
export default {
    name:'back',
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>
