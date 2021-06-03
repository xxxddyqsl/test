<template>
  <!--右侧滚动条部分-->
  <div  class='sliderWrap gg-flex-1' @click="Ongoslide" ref="sliderWrapBox">
    <div class="slider" @mousedown='slidemousedownr' @click.stop>
    </div>
  </div>
</template>
<script>
export default {
  components: {

  },
  //接收父组件传递的数据
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    Mainitem: {//滚动区域 显示的 列表数据变化 重置滚动的比例+滚动条的高度
      type: Array | Number ,
    },
    wrapdivs: {// 获取可视区域元素 和滚动区域的 id 
      type: Array,
      default: true,
    },
  },

  data() {
    return {
      isDown :false,//获取鼠标按下 是否可以运动滑动
      wrapDiv: '',//可视区域元素
      contentDiv: '',//滚动区域元素
      y: 0,//y轴的增量
      t: 0,//距离顶部
      ScrollRatio: 0,//滚动比例 
      sliderWrapH:'', //滚动 轨道的  高度
    }
  },
  // data属性监听器, 作用v-model
  watch: {
    Mainitem(val, oldVal) {//监听 data里面  值的变化\
     this.OnSetScale();
    },
  },
  created() {

  },
  mounted() {
    //父组件 传入的  //可视区域元素id //滚动区域元素id
    if (this.wrapdivs) {
        // console.log(this.wrapdivs);
      this.OnsetScroll(this.wrapdivs[0], this.wrapdivs[1])
    }
  },
  methods: {
    // 初始化
    OnsetScroll(wrapdiv, contentdiv) {
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 否则获取不到元素
      // 获取可视区域元素
      this.wrapDiv = document.getElementById(wrapdiv);
      // 获取 滚动区域元素
      this.contentDiv = document.getElementById(contentdiv);
      //外层添加滚轮事件
      this.wrapDiv.onmousewheel = this.OnScrollWheel;
      //设置滚动比例  滚动条高度
      this.OnSetScale();
    },
    //设置滚动比例  滚动条高度
    OnSetScale() {
      //设置滚动比例  滚动条高度
      this.ScrollRatio = this.wrapDiv.clientHeight / this.contentDiv.clientHeight;
      // console.log(this.contentDiv.clientHeight)
      // console.log(document.getElementById("scroll-main").clientHeight, this.contentDiv.clientHeight)
      //设置滑块轨道的高度
      var h1 = this.wrapDiv.clientHeight  * this.ScrollRatio;
      // console.log(h1)
      //为了合理设置高度，设置滑块的最小高度
      if (h1 < 10) {
        h1 = 10;
      }
      //当滚动区域 高度小于 可视区域高度 滑块=可视区域高度 无法滚动
      if (this.contentDiv.clientHeight <= this.wrapDiv.clientHeight) {
        h1 = this.wrapDiv.clientHeight;
      }
      // 
      if(this.wrapDiv.querySelector('.slider').offsetTop>= this.wrapDiv.querySelector('.sliderWrap').clientHeight -this.wrapDiv.querySelector('.slider').clientHeight){
          this.y=this.wrapDiv.querySelector('.sliderWrap').clientHeight -this.wrapDiv.querySelector('.slider').clientHeight;
           this.ScrollRatio = this.wrapDiv.clientHeight / this.contentDiv.clientHeight;
         // //更新滑块的位置
        this.wrapDiv.querySelector('.slider').style.top = this.y + "px";
        // 更新 内容区域 距顶位置
           this.contentDiv.style.top = - this.y / this.ScrollRatio + "px";
      }
      //设置滑块的高度
     this.wrapDiv.querySelector('.slider').style.height = h1 + "px";
    },
    //为 scroll-main 可视区域 添加滚轮事件
    OnScrollWheel(e) {
      let that = this;
      // 获取 滑块距离 顶部的偏移量
        that.y=this.wrapDiv.querySelector('.slider').offsetTop;
      var event = event || e;
      // console.log('滚轮事件'+that.y);
      if (event.wheelDelta < 0) {
        //滑动条向下滚动
        that.y += 10;
      } else if (event.wheelDelta > 0) {
        //滑动条向上滚动
        that.y -= 10;
      }
      //y变化时说明在滚动，此时使滚动条发生滚动，以及设置content内容部分滚动
      //判断极端情况，滑块不能划出屏幕
      if (that.y <= 0) {
        //滑块最多滑到顶部
        that.y = 0;
      }
      if (that.y >= this.wrapDiv.querySelector('.sliderWrap').clientHeight -this.wrapDiv.querySelector('.slider').clientHeight) {
        //滑块最多滑到最底部
        that.y = this.wrapDiv.querySelector('.sliderWrap').clientHeight -this.wrapDiv.querySelector('.slider').clientHeight;
      }
      // console.log(that.wrapDiv)
      //    console.log(that.contentDiv)
      // //更新滑块的位置
     this.wrapDiv.querySelector('.slider').style.top = that.y + "px";
      // console.log(this.ScrollRatio);
      this.contentDiv.style.top = - that.y / this.ScrollRatio + "px";
    },
    //鼠标按下事件
    slidemousedownr(e) {
      let that = this;
      //获取按下的y坐标
      this.y = e.clientY;
      //获取顶部的偏移量
      this.t =this.wrapDiv.querySelector('.slider').offsetTop;

      //开关打开
      this.isDown = true;
      //设置按下的鼠标样式  
     this.wrapDiv.querySelector('.slider').style.cursor = 'pointer';
     this.wrapDiv.querySelector('.slider').style.backgroundColor='#939597';
      
      //  给body 添加user-select: none 禁止复制 否则 滚动条时会 复制 人员列表 影响 鼠标事件 
      document.body.style.userSelect='none'; 
      // 鼠标运动
      this.slidemousemove()

    },
    // 鼠标运动
    slidemousemove() {
      let that = this;
      // 鼠标运动 
      var nt;
     document.onmousemove = function (event) { 
        if (that.isDown == false) {
          return;
        } 
        //获取x和y
        var ny = event.clientY;
        // 使用变量 nt 暂存 滑动的位置 否则在计算时 赋值给that.y变量 会卡顿
          nt = ny - (that.y - that.t);

        //y变化时说明在滚动，此时使滚动条发生滚动，以及设置content内容部分滚动
        //判断极端情况，滑块不能划出屏幕
        if (nt <= 0) {
          //滑块最多滑到顶部
          nt = 0;
        }
        if (nt >= (that.wrapDiv.querySelector('.sliderWrap').clientHeight -that.wrapDiv.querySelector('.slider').clientHeight)) {
          //滑块最多滑到最底部
          nt = that.wrapDiv.querySelector('.sliderWrap').clientHeight -that.wrapDiv.querySelector('.slider').clientHeight;
        } 
        
        // //更新滑块的位置
        that.wrapDiv.querySelector('.slider').style.top = nt + "px";
        that.contentDiv.style.top = (- nt / that.ScrollRatio) + "px";
      };
       
      //鼠标抬起事件
      document.onmouseup = function (e) { 
         // 鼠标抬起时 把 滑块的 位置赋值给 that.y 否则滚动时找不到滑块的位置
        if(nt){
          that.y=nt;
        }
        //开关关闭
        that.isDown = false;
       that.wrapDiv.querySelector('.slider').style.cursor = 'default';
       that.wrapDiv.querySelector('.slider').style.backgroundColor='#c8c9ca';
        // setTimeout(function(){
          // 移除 给body 添加的禁止复制 赋默认值还原 user-select: auto 
          document.body.style.userSelect='auto'; 
        // },100)
       
      }
    },
    // 点击轨道 滚动
    Ongoslide(e) {
      // 滑块 距离顶部
      // console.log(e.offsetY);
      // console.log(this.wrapDiv.querySelector('.slider').offsetTop +this.wrapDiv.querySelector('.slider').clientHeight);
      var slidertop = (this.wrapDiv.querySelector('.slider').offsetTop);
      if (e.offsetY === (this.wrapDiv.querySelector('.slider').offsetTop +this.wrapDiv.querySelector('.slider').clientHeight)) {
        return
      }
      // 鼠标点击的 y坐标轴 位置 是否小于=  滑块 距离顶部 + 滑块 元素高度
      if (e.offsetY <= (this.wrapDiv.querySelector('.slider').offsetTop +this.wrapDiv.querySelector('.slider').clientHeight)) {
        //滑动条向上滚动
        this.y = slidertop -= 10;

      } else {
        //滑动条向上滚动
        this.y = slidertop += 10;
      }
      //判断极端情况，滑块不能划出屏幕
      if (this.y <= 0) {
        //滑块最多滑到顶部
        this.y = 0;
      }
      if (this.y >= this.wrapDiv.querySelector('.sliderWrap').clientHeight -this.wrapDiv.querySelector('.slider').clientHeight) {
        //滑块最多滑到最底部
        this.y = this.wrapDiv.querySelector('.sliderWrap').clientHeight -this.wrapDiv.querySelector('.slider').clientHeight;
      }
      // //更新滑块的位置
      this.wrapDiv.querySelector('.slider').style.top = this.y + "px";
      this.contentDiv.style.top = (- this.y / this.ScrollRatio) + "px";
      // this.stopPropagation()
    },
    
    stopPropagation(e) {
      e = e || window.event;
      if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
      }
    }
  },
}
</script>
<style scoped>
.sliderWrap {
  width: 10px;
  height: 100%;
  margin-left: auto; 
  position: relative;
  border-radius: 10px;
  background-color: #dadada;
}
/* #939597 */
.slider {
  width: 10px;
  height: 50px;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 10px;
  background-color: #c8c9ca;

}
.slider:hover{
  background-color: #939597 !important;
    /* background-color:red; */
}
</style>
