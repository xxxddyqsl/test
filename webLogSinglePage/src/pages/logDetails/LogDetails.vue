<template>
  <div class="log-wrapper LogDetails gg-flex-1 gg-flex-2">
    <div class="log-header gg-flex-3">
      <div class="log-header-search gg-flex-3">

        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">systemName：</div>
          <el-input v-model="tableItem.systemName" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">modelName：</div>
          <el-input v-model="tableItem.modelName" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">userId：</div>
          <el-input v-model="tableItem.userId" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">deviceInfo：</div>
          <el-input v-model="tableItem.deviceInfo" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord1：</div>
          <el-input v-model="tableItem.keyWord1" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord2：</div>
          <el-input v-model="tableItem.keyWord2" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord3：</div>
          <el-input v-model="tableItem.keyWord3" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord4：</div>
          <el-input v-model="tableItem.keyWord4" placeholder="" :disabled="true"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">createTime：</div>
          <el-input v-model="tableItem.createTime" placeholder="" :disabled="true"></el-input>
        </div>

      </div>
    </div>
    <div class="log-main">
      <div class="log-header-search-item gg-flex-3" style="align-items: flex-start;height: calc(100% - 40px) ;  margin-bottom: 20px;">
        <div class="log-header-search-item-title">message：</div>
        <el-input type="textarea" show-word-limit v-model="tableItem.message" placeholder="" :disabled="true"></el-input>
      </div>
    </div>
    <div class="log-footer gg-flex-1">
      <el-button @click="golog" type="primary">返回上一页</el-button>
    </div>
  </div>
</template>

<script> 
export default {
  name: "LogDetails",
  components: {
    tableItem: {}
  },
  data() {
    return {

    }
  },
  created() {
    // 初始化
    this.init();

  },
  methods: {
    init() {
      // console.log(this.$route.query.constraints);
      // console.log(JSON.parse(this.$route.query.constraints));
      // 接收 log 跳转 传入的 constraints 值
      this.tableItem = JSON.parse(this.$route.query.constraints);
    },
    // 返回
    golog() {
      this.$router.go(-1);
    }
  },
  // 销毁前状态
  beforeDestroy() {
    // console.group("beforeDestroy 销毁前状态 LogDetails===============》");
  },
  destroyed() {
    // console.group("destroyed 销毁完成状态 LogDetails===============》");
  }
};
</script>
 
<style scoped>
@import "../../assets/css/log.css";
</style>
