<!--vscroll组件模板-->
<template>
  <div class="vui__scrollbar" ref="ref__box" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" v-resize="handleResize">
    <div :class="['vscroll__wrap', {native: native}]" ref="ref__wrap" @scroll="handleScroll">
      <div class="vscroll__view" v-resize="handleResize"><slot /></div>
    </div>
    <!-- //滚动条槽 -->
    <div :class="['vscroll__bar vertical', {ishide: !isShow}]" @mousedown="handleClickTrack($event, 0)" :style="{'width': parseInt(size)>=0 ? parseInt(size)+'px' : '', 'z-index': parseInt(zIndex)>=0 ? parseInt(zIndex) : ''}">
      <div class="vscroll__thumb" ref="ref__barY" :style="{'background': color, 'height': barHeight+'px'}" @mousedown="handleDragThumb($event, 0)"></div>
    </div>
    <div :class="['vscroll__bar horizontal', {ishide: !isShow}]" @mousedown="handleClickTrack($event, 1)" :style="{'height': parseInt(size)>=0 ? parseInt(size)+'px' : '', 'z-index': parseInt(zIndex)>=0 ? parseInt(zIndex) : ''}">
      <div class="vscroll__thumb" ref="ref__barX" :style="{'background': color, 'width': barWidth+'px'}" @mousedown="handleDragThumb($event, 1)"></div>
    </div>
  </div>
</template>


/**
 * @Desc     Vue美化系统滚动条VScroll
 * @Time     andy by 2020/11/30
 * @About    Q：282310962  wx：xy190310
 */
<script>
  import domUtils from './dom'
  export default {
    props: {
      // 显示原生滚动条
      native: Boolean,
      // 自动隐藏滚动条
      autohide: Boolean,
      // 滚动条尺寸
      size: { type: [Number, String], default: '' },
      // 滚动条颜色
      color: String,
      // 滚动条层级
      zIndex: null
    },
    data() {
      return {
        barWidth: 0,            // 滚动条宽度
        barHeight: 0,           // 滚动条高度
        ratioX: 1,              // 滚动条水平偏移率
        ratioY: 1,              // 滚动条垂直偏移率
        isTaped: false,         // 鼠标光标是否按住滚动条
        isHover: false,         // 鼠标光标是否悬停在滚动区
        isShow: !this.autohide, // 是否显示滚动条
      }
    },
    mounted() {
      this.$ref__box = this.$refs.ref__box
      this.$ref__wrap = this.$refs.ref__wrap
      this.$ref__barY = this.$refs.ref__barY
      this.$ref__barX = this.$refs.ref__barX
      this.$nextTick(this.updated)
    },
    // ...
    methods: {
      // 鼠标移入
      handleMouseEnter() {
        this.isHover = true
        this.isShow = true
        this.updated()
      },
 
      // 鼠标移出
      handleMouseLeave() {
        this.isHover = false
        this.isShow = false
      },
 
      // 拖动滚动条
      handleDragThumb(e, index) {
        let _this = this
        this.isTaped = true
        let c = {}
        
        domUtils.isIE() ? (e.returnValue = false, e.cancelBubble = true) : (e.stopPropagation(), e.preventDefault())
        document.onselectstart = () => false
 
        if(index == 0) {
          c.dragY = true
          c.clientY = e.clientY
        }else {
          c.dragX = true
          c.clientX = e.clientX
        }
 
        domUtils.on(document, 'mousemove', function(evt) {
          if(_this.isTaped) {
            if(c.dragY) {
              _this.$ref__wrap.scrollTop += (evt.clientY - c.clientY) * _this.ratioY
              _this.$ref__barY.style.transform = `translateY(${_this.$ref__wrap.scrollTop / _this.ratioY}px)`
              c.clientY = evt.clientY
            }
            if(c.dragX) {
              _this.$ref__wrap.scrollLeft += (evt.clientX - c.clientX) * _this.ratioX
              _this.$ref__barX.style.transform = `translateX(${_this.$ref__wrap.scrollLeft / _this.ratioX}px)`
              c.clientX = evt.clientX
            }
          }
        })
        domUtils.on(document, 'mouseup', function() {
          _this.isTaped = false
          
          document.onmouseup = null;
          document.onselectstart = null
        })
      },
 
      // 滚动槽
      handleClickTrack(e, index) {
        console.log(index)
      },
 
      // 更新滚动
      updated() {
        if(this.native) return
 
        // 垂直滚动条
        if(this.$ref__wrap.scrollHeight > this.$ref__wrap.offsetHeight) {
          this.barHeight = this.$ref__box.offsetHeight **2 / this.$ref__wrap.scrollHeight
          this.ratioY = (this.$ref__wrap.scrollHeight - this.$ref__box.offsetHeight) / (this.$ref__box.offsetHeight - this.barHeight)
          this.$ref__barY.style.transform = `translateY(${this.$ref__wrap.scrollTop / this.ratioY}px)`
        }else {
          this.barHeight = 0
          this.$ref__barY.style.transform = ''
          this.$ref__wrap.style.marginRight = ''
        }
 
        // 水平滚动条
       // ...
      },
 
      handleResize() {
        // 更新滚动条状态
      },
 
      // ...
    }
  }
</script>
