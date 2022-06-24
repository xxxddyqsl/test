<template>
  <div class="AddSchedule-box gg-flex-4" @click="ChatInfoIsShow">
    <!-- 阻止冒泡 @click.stop -->
    <div @click.stop class="AddSchedule-wrapper gg-flex-4  gg-flex-2">
      <div class="AddSchedule-header gg-flex-3 ">
        <img draggable="false" class='AddSchedule-header-icon' @click="ChatInfoIsShow" src="../assets/images/login_quit.png" alt="">
      </div>
      <div class="AddSchedule-main">
        <div class="AddSchedule-main-item  gg-flex-3">
          <div class="AddSchedule-main-item-title">Title</div>
          <div class="AddSchedule-main-item-val">
            <el-input ref="input_ScheduleTitle" v-model="Schedule.title" placeholder="Add title">
            </el-input>
          </div>
        </div>
        <div class="AddSchedule-main-item  gg-flex-3">
          <div class="AddSchedule-main-item-title"> Select Time</div>
          <div class="AddSchedule-main-item-val gg-flex-3">
            <el-date-picker v-model="Schedule.StartDate" type="datetimerange" align="right" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00']">
            </el-date-picker>
            <!-- prefix-icon -->
            <img draggable="false" class='AddSchedule-main-item-date-icon' src="../assets/images/date-choose.png" alt="">
          </div>
        </div>

        <div class="AddSchedule-main-item  gg-flex-3">
          <div class="AddSchedule-main-item-title">Participant</div>
          <div class="AddSchedule-main-item-val">
            <el-select v-model="Schedule.participantsVal" placeholder="Add participants">
              <el-option v-for="item in participants" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="AddSchedule-main-item  gg-flex-3">
          <div class="AddSchedule-main-item-title">Remind</div>
          <div class="AddSchedule-main-item-val  gg-flex-3">
            <div class="AddSchedule-main-item-val-radio gg-flex-3" :key="index" v-for="(item,index) in RemindRadioList" @click="chatRadio(item)">
              <div class="AddSchedule-main-item-val-radio-icon" :class="Schedule.RemindVal!=''&&Schedule.RemindVal==item.key?'AddSchedule-main-item-val-radio-checked':''"></div>
              <label>{{item.key}}</label>
            </div>
          </div>
        </div>

        <div class="AddSchedule-main-item  gg-flex-4">
          <div class="AddSchedule-main-item-title">Detail</div>
          <div class="AddSchedule-main-item-val  gg-flex-3">
            <el-input type="textarea" resize='none' placeholder="Type schedule detail" v-model="Schedule.textarea">
            </el-input>
          </div>
        </div>
      </div>
      <div class="AddSchedule-footer gg-flex-3">
        <div class="AddSchedule-btn gg-flex-1 AddSchedule-btn-Cancel "  @click="ChatInfoIsShow"><span>Cancel</span></div>
        <div class="AddSchedule-btn gg-flex-1 AddSchedule-btn-Save " @click="changeSave"><span>Save</span></div>
      </div>

    </div>

  </div>

</template>
<script>
// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter' 
export default {
  name: 'AddSchedule',
  components: {

  },
  props: {

  },

  data() {
    return {
      Schedule: {
        //   日程标题
        title: '',
        //日程 时间
        StartDate: '',
        // 下拉框
        participantsVal: '',
        RemindVal: '',
        textarea: '',


      },
      participants: [{
        value: '选项1',
        label: '测试1'
      }, {
        value: '选项2',
        label: '测试2'
      }, {
        value: '选项3',
        label: '测试3'
      }],
      RemindRadioList: [
        { key: "Don't remind", },
        { key: "Only yourself", },
        { key: "All participants", },
      ]

    };
  },
  watch: {

  },
  mounted() {
    // this.$refs.editDiv.focus();
  },

  methods: {
    // 单选
    chatRadio(data) {
      
      this.Schedule.RemindVal = data.key;
    },
    //   关闭 创建的日程 窗口
    ChatInfoIsShow() {
      this.$emit('SonAddSchedule', false)
    },
    //保存- 提交创建的日程
    changeSave() {
      console.log(this.Schedule)
      if(this.Schedule.StartDate ==''){
        return alert('时间必填项')
      }
      let id=new Date();
      let data={ id: 'id_'+id.getTime(),textarea:this.Schedule.textarea,participants:this.Schedule.participantsVal, setDate: this.Schedule.StartDate[0].getTime(), endDate: this.Schedule.StartDate[1].getTime(),title:this.Schedule.title, text: '测试日程B' };
       console.log(data)
     this.$emit('SonAddSchedule', false, data)
    },
  }
};
</script>

<style scoped>
@import "../assets/css/AddSchedule.css";
.AddSchedule-main-item-val /deep/ .el-input__inner {
  width: 100%;
  height: 30px;
  border-radius: 15px;
  background: #fff;
  padding: 3px 12px 3px 16px;
}

.AddSchedule-main
  .AddSchedule-main-item:nth-child(1)
  .AddSchedule-main-item-val
  /deep/
  .el-input__inner {
  background: #f1f3f4 !important;
}
.AddSchedule-main-item-val /deep/ .el-textarea {
  height: 100%;
  border-radius: 15px;
}
.AddSchedule-main
  .AddSchedule-main-item:last-child
  .AddSchedule-main-item-val
  /deep/
  .el-textarea__inner {
  background: #f1f3f4 !important;
  height: 100%;
  border-radius: 15px;
  border: 1px solid #e6e9eb;
  padding: 5px 16px;
}
.AddSchedule-main-item-val /deep/ .el-range-input {
  height: 15px;
  margin-top: 1px;
}
.AddSchedule-main-item-val /deep/ .el-date-editor .el-range-separator {
  /* font-family: PingFangSC-Medium, PingFang SC;
    line-height: 25px; */
  width: 8px;
  height: 22px;
  font-size: 16px;
  /* font-family: PingFangSC-Medium, PingFang SC; */
  font-weight: 500;
  color: #242527;
  line-height: 22px;
  padding: 0;
  margin: 0 16px;
}
.AddSchedule-main-item-val /deep/ .el-date-editor .el-range__icon,
.AddSchedule-main-item-val /deep/ .el-date-editor .el-range__close-icon {
  display: none;
}
.AddSchedule-main-item-val /deep/ .el-select {
  width: 100%;
}
.AddSchedule-main-item-val /deep/ .el-select .el-input .el-select__caret {
  line-height: 30px;
}
.AddSchedule-main-item-val
  /deep/
  .el-select
  .el-input--suffix
  .el-icon-arrow-up::before {
  content: "";
  background: url(../assets/images/triangle-icon.png) center center no-repeat;
  background-size: 8px 9px;
  position: absolute;
  width: 8px;
  height: 9px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* rotate(90deg) */
}
.AddSchedule-main-item-val /deep/ .el-select .el-input__inner {
  font-family: "Futura-Medium, Futura" !important;
}
/* 下拉框 默认未展开 自定义三角形 旋转 */
.AddSchedule-main-item-val /deep/ .el-select .el-input .el-select__caret {
  transform: rotate(90deg) !important;
}
/* 下拉框 展开 自定义三角形 旋转 */
.AddSchedule-main-item-val
  /deep/
  .el-select
  .el-input
  .el-select__caret.is-reverse {
  transform: rotate(-90deg) !important;
}
/* 单选按钮 */
.AddSchedule-main-item-val /deep/ .el-radio {
  margin-right: 16px;
}
.AddSchedule-main-item-val /deep/ .el-radio__label {
  padding-left: 6px;
}
</style>

