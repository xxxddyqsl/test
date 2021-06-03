<template>
  <div id="setup-wrapper" @click="setupclick">
    <!-- @click.stop 可设置事件（v-on:click.stop='XXX'） 如下不设置事件也可以， 阻止冒泡 不触发父元素的监听事件 -->
    <div class="setup-CallSettings" @click.stop="" aria-label="通话设置">
      <section class="setup-content">
        <form class="setup-form" action="">
          <div class="setup-form-title">通话设置</div>

          <div class="setup-form-item">
            <label class="setup-form-item-label">分辨率</label>
            <div class="setup-form-item-content">
              <el-select v-model="ScreenResolution" placeholder="请选择">
                <el-option
                  v-for="item in ScreenResolutionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="setup-form-item">
            <label class="setup-form-item-label">初始码率</label>
            <div class="setup-form-item-content">
              <el-input v-model="InitialBitRate" placeholder=""></el-input>
            </div>
          </div>
          <div class="setup-form-item">
            <label class="setup-form-item-label">最小码率</label>
            <div class="setup-form-item-content">
              <el-input v-model="MinimumBitRate" placeholder=""></el-input>
            </div>
          </div>
          <div class="setup-form-item">
            <label class="setup-form-item-label">最大码率</label>
            <div class="setup-form-item-content">
              <el-input v-model="MaxBitRate" placeholder=""></el-input>
            </div>
          </div>
          <div class="setup-form-item">
            <label class="setup-form-item-label">帧率设置</label>
            <div class="setup-form-item-content">
              <el-input v-model="FrameRateSetting" placeholder=""></el-input>
            </div>
          </div>

          <div class="setup-form-item">
            <label class="setup-form-item-label">音频输入设备</label>
            <div class="setup-form-item-content">
              <el-select v-model="AudioInputDevice" placeholder="请选择">
                <el-option
                  v-for="item in audioinputList"
                  :key="item.deviceId"
                  :label="item.label"
                  :value="item.deviceId"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="setup-form-item">
            <label class="setup-form-item-label">视频输入设备</label>
            <div class="setup-form-item-content">
              <el-select v-model="VideoInputDevice" placeholder="请选择">
                <el-option
                  v-for="item in videoinputList"
                  :key="item.deviceId"
                  :label="item.label"
                  :value="item.deviceId"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'SetUp',
  // props:['ScreenResolutionList','audioinputList','videoinputList'],//接收父组件传递的数据
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    ScreenResolutionList: {
      type: Array,
      required: true,
    },
    audioinputList: {
      type: Array,
      required: true,
    },
    videoinputList: {
      type: Array,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      msg: "音视频参数设置",
      ScreenResolution: window.screen.width + " * " + window.screen.height, //屏幕分辨率
      InitialBitRate: "", //初始码率
      MinimumBitRate: "", //最小码率
      MaxBitRate: "", //最大码率
      FrameRateSetting: "", //帧率设置
      AudioInputDevice: "", //音频输入设备
      VideoInputDevice: "", //视频输入设备
    };
  },
  mounted() {},
  methods: {
    setupclick() {
      let that = this;
      let WidthResolution = that.ScreenResolution.split("*")[0]; //获取特殊符号 * 之前的 屏幕宽度分辨率
      let HeightResolution = that.ScreenResolution.split("*")[1]; //获取特殊符号 * 之后的 屏幕高度分辨率
      // 约束参数
  //指定视频流的宽高、帧率以及理想值： 获取指定宽高，这里需要注意：在改变视频流的宽高时，     // 如果宽高比和采集到的不一样，会直接截掉某部分     { audio: false,        video: { width: 1280, height: 720 }      }     // 设定理想值、最大值、最小值     {       audio: true,       video: {         width: { min: 1024, ideal: 1280, max: 1920 },         height: { min: 776, ideal: 720, max: 1080 }       }     } 
      var constraints = {
        audio: {
          // 设置回音消除
          noiseSuppression: true,
          // 设置降噪
          echoCancellation: true,
          deviceId: { exact: that.AudioInputDevice? that.AudioInputDevice:true }, //用哪个音频设备（耳机/电脑 麦克风 ）
          volume: 1, //（声音大小 0~1）
        },
        video: {
          width: WidthResolution,// 屏幕宽度分辨率
          height:  HeightResolution ,//屏幕高度分辨率
          minBitRate: that.MinimumBitRate,//最小码率
          maxBitRate: that.MaxBitRate,//最大码率
          frameRate: that.FrameRateSetting, //帧速率
          deviceId: { exact: that.VideoInputDevice? that.VideoInputDevice:true },//用哪个摄像头设备（耳机/电脑 麦克风 ）
        },
      };
      // 子组件向父组件传值$emit ,setup 父组件监听子组件的名称 控制隐藏
      this.$emit("setup", false,constraints);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/ParameterSettings.css";
</style>
