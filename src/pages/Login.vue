<template>
  <div class="login-wrapper gg-flex-1">
    <div class="login-content">
      <img class="login-logo" src="../assets/images/login.png" alt="" />
      <h3 class="login-title">静静会议</h3>
      <div class="login-roomjoin">
        <input
          type="text"
          id="AppKey"
          v-model="appKey"
          class="login-roomjoin-input"
          autocomplete="off"
          placeholder="请输入AppKey"
        />
        <input
          type="text"
          id="Token"
          v-model="token"
          class="login-roomjoin-input"
          autocomplete="off"
          placeholder="请输入Token"
        />
        <!-- <input
          type="text"
          id="roomId"
          v-model="roomId"
          class="login-roomjoin-input"
          autocomplete="off"
          placeholder="请输入会议室 ID"
        />
        <input
          type="text"
          id="userName"
          v-model="userName"
          maxlength="8"
          class="login-roomjoin-input"
          autocomplete="off"
          placeholder="请输入用户名称"
        />
        <input
          type="text"
          id="roomTelNum"
          v-model="phone"
          class="login-roomjoin-input"
          autocomplete="off"
          placeholder="手机号"
          maxlength="11"
        /> -->
        <div class="login-opt-stream gg-flex-1">
          <label class="login-opt-checkbox gg-flex-1">
            <input
              type="radio"
              id="isCloseVideo"
              name="userOption"
              value="closeVideo"
            />
            <span>音频模式</span>
          </label>
          <label class="login-opt-checkbox gg-flex-1">
            <input
              type="radio"
              id="isBystander"
              name="userOption"
              value="bystander"
            />
            <span>旁听者模式</span>
          </label>
        </div>
        <button
          id="login-start"
          @click="goHome"
          class="login-btn-start"
          :class="{ 'login-btn-start-bg': phone.length == 11 }"
        >
          开始会议
        </button>
        <div class="login-btn-loading gg-flex-1">
          <img
            class="login-btn-loading-img"
            src="../assets/images/loading.gif"
            alt=""
          />
          <span class="login-btn-loading-title">加载中</span>
        </div>
      </div>

      <div class="login-systemTips">
        <p>注：Web 端推荐使用 Google Chrome 浏览器</p>
      </div>
      <!-- 设置会议音视频参数 控制按钮 -->
      <div
        class="login-opt-resolution"
        id="btn_settings"
        @click="setuphide"
      ></div>
      <!-- 音视频参数设置 --><!-- 引入子组件 定义一个on的方法（setup）监听子组件的状态 父给子传值：音频输入列表 audioinputList 视频输入列表 videoinputList-->
      <SetUp
        v-show="SetUpshow"
        v-on:setup="setupclick"
        :ScreenResolutionList="ScreenResolution"
        :audioinputList="audioinputList"
        :videoinputList="videoinputList"
      ></SetUp>
    </div>
  </div>
</template>

<script>
// 导入组件  <!-- 音视频参数设置 -->
import SetUp from "../components/login/ParameterSettings.vue";
export default {
  name: "Login",
  components: {
    //  <!-- 音视频参数设置 -->
    SetUp,
  },
  data() {
    return {
      appKey: "cpj2xarlcm2jn",
      token:
        "Wj/Hh5WORriMK49diDBD8BC/WyAbItg+ARQjLJbMs+E=@stku.cn.rongnav.com,stku.cn.rongcfg.com",
      roomId: "",
      userName: "",
      phone: "",
      SetUpshow: false,
      ScreenResolution: [
        {
          value: "176 * 132",
          label: "176 * 132",
        },
        {
          value: "240 * 240",
          label: "240 * 240",
        },
        {
          value: "256 * 144",
          label: "256 * 144",
        },
        {
          value: "320 * 180",
          label: "320 * 180",
        },
        {
          value: "320 * 240",
          label: "320 * 240",
        },
        {
          value: "480 * 360",
          label: "480 * 360",
        },
        {
          value: "480 * 480",
          label: "480 * 480",
        },
        {
          value: "640 * 360",
          label: "640 * 360",
        },
        {
          value: "640 * 480",
          label: "640 * 480",
        },
        {
          value: "720 * 480",
          label: "720 * 480",
        },
        {
          value: "1280 * 720",
          label: "1280 * 720",
        },
        {
          value: "1920 * 1080",
          label: "1920 * 1080",
        },
      ],
      audioinputList: [], // 音频输入 列表
      videoinputList: [], // 视频输入 列表
      audiooutputList: [], // 音频输出 列表
      constraints: null, //通话约束
    };
  },
  created() {
    this.GetRequest();
  },
  methods: {
    // 获取 url里的参数
    GetRequest() {
      var search = location.search; //获取url中"?"符后的字串
      if (search) {
        // 获取 字符串 = 之后的参数
        var str_after = search.split("=")[1];
        //  参数 先decodeURIComponent解码 再转换为json
        var data = JSON.parse(decodeURIComponent(str_after));
        console.log(data);
        // 存储
        localStorage.setItem("usermsg", JSON.stringify(data));
        if (localStorage.getItem("usermsg").length > 0) {
          // 去除url后面的参数
          var currenturl = window.location.href;
          var newUrl = currenturl.split("?")[0];
          history.pushState("", "", newUrl); //前两个参数可省略
          //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
          console.log(data);
          this.$router.push({
            name: "Home",
            params: {
              constraints: this.constraints,
            },
          });
        }
      }
    },

    goHome() {
      let that = this;
      //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
      this.$router.push({
        name: "Home",
        params: {
          constraints: that.constraints,
          // appKey: that.appKey,
          // token: that.token,
        },
      });
    },
    setuphide() {
      let that = this;
      // 音视频参数设置 显示隐藏
      that.SetUpshow = !that.SetUpshow;
      that.audioinputList = []; // 清空 音频输入 列表
      that.videoinputList = []; // 清空视 频输入 列表
      that.audiooutputList = []; // 清空 音频输出 列表

      //获取媒体设备列表 首次运行引导用户，信任域名\
      var first = window.localStorage.getItem("first");
      if (first == null) {
        if (
          navigator.mediaDevices.getUserMedia ||
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia
        ) {
          //调用用户媒体设备, 访问摄像头和麦克风
          that.getUserMedia(
            { audio: true, video: { width: 480, height: 320 } },
            that.success,
            that.error
          );
        } else {
          alert("不支持访问用户媒体");
        }
      }
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("menumerateDevices is not supported!");
      } else {
        navigator.mediaDevices
          .enumerateDevices()
          .then(that.gotDevices)
          .catch(that.handleError);
      }
    },
    getUserMedia(constraints, success, error) {
      //访问用户媒体设备的兼容方法
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    },
    success(stream) {
      console.log(stream);
      window.localStorage.setItem("first", "false");
      window.location.reload();
    },
    error(error) {
      console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    },
    gotDevices(deviceInfos) {
      let that = this;
      console.log(deviceInfos);
      // 遍历所有的设备，包括视频和音频设备
      for (let i in deviceInfos) {
        // audioinput // 音频输入   audiooutput// 音频输出   videoinput // 视频输入
        if (deviceInfos[i].kind == "audioinput") {
          that.audioinputList.push(deviceInfos[i]); // 赋值 音频输入列表
        } else if (deviceInfos[i].kind == "videoinput") {
          that.videoinputList.push(deviceInfos[i]); // 赋值 视频输入列表
        } else if (deviceInfos[i].kind == "audiooutput") {
          that.audiooutputList.push(deviceInfos[i]); // 赋值 音频输出列表
        }
      }
      //   console.log(that.videoinputList);
      //   console.log(typeof that.audioinputList);
    },
    handleError(error) {
      console.log("Error: ", error);
    },
    //
    setupclick: function (e, constraints) {
      console.log(constraints);
      // e 就是子组件传过来的值
      this.SetUpshow = e;
      this.constraints = constraints;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/Login.css";
/* h1, h2 {
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
} */
</style>
