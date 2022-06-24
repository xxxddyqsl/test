<template>
  <div class="calendar-wrapper  gg-flex-3  gg-flex-2" @click="isScheduleDetails=false;">

    <div class="calendar-header gg-flex-3">
      <div class="calendar-Today gg-flex-3" @click="clickCalendarToday()">
        <img draggable="false" class="calendar-Today-icon" src="../assets/images/date-plugin-icon.png" alt="">
        <div class="calendar-Today-title">Today</div>
      </div>
      <div class="calendar-week-toggle">
        <img draggable="false" class="calendar-week-toggle-last-icon" @click="clickWeekToggle('last')" src="../assets/images/last.png" alt="">
        <img draggable="false" class="calendar-week-toggle-next-icon" @click="clickWeekToggle('next')" src="../assets/images/next.png" alt="">
      </div>

      <div class="calendar-YearMonth-toggle gg-flex-3">
        <!--  type="month"  只能选择到月份 -->
        <el-date-picker v-model="YearMonth" type="month" format="yyyy-MM" @change='changeYearMonth' placeholder="选择日期">
        </el-date-picker>
        <img draggable="false" class="triangle-solid-icon" src="../assets/images/triangle-icon.png" style="transform:rotate(90deg)" alt="">
      </div>
      <div class="calendar-add-schedule gg-flex-1" @click="changeAddSchedule">
        <img draggable="false" class="calendar-add-schedule-icon" src="../assets/images/add-schedule.png" alt="">
      </div>

    </div>

    <div class="calendar-main  gg-flex-3  gg-flex-2">
      <div class="calendar-main-header gg-flex-3">
        <div class="calendar-main-header-item-timeTitle"></div>
        <div class="calendar-main-header-item  gg-flex-3" @click='ChangCheckedDate(item)' :data-title='item.time' :key="index" v-for="(item,index) in weekList" :class="checkedDate==item.time?'Date_active':''"><span class="calendar-main-header-item-Date">{{item.date}}</span><span class="calendar-main-header-item-Week">{{item.name}}</span></div>
      </div>

      <div class="calendar-main-date-Table gg-flex-4 gg-flex-2">
        <el-scrollbar style="height:100%" ref="calendarScrollbar">
        <div class="calendar-main-date-schedule-box gg-flex-3" :data-title="checkedDate+' '+item.time" :key="index" v-for="(item,index) in HoursList">
          <div class="calendar-main-date-Hours gg-flex-4"><span>{{item.time}}</span>
            <div class="calendar-main-date-Hours-active" :data-title="checkedDate+' '+minuNu" v-if="item.time.substr(0,2)== minuNu.substr(0,2)" :style="{ 'top': (Number(minuNu.substr(minuNu.length-2,2))*minuTop)>0 ? (Number(minuNu.substr(minuNu.length-2,2))*minuTop)+'px': 0}">{{minuNu}}</div>
          </div>
          <div class="calendar-main-date-Hours-DividingLine gg-flex-3" v-if="item.time.substr(0,2)== minuNu.substr(0,2)" :style="{ 'top': (Number(minuNu.substr(minuNu.length-2,2)) *minuTop)>0 ? (Number(minuNu.substr(minuNu.length-2,2))*minuTop)+'px': 0}"><span></span></div>
          <div class="calendar-main-date-schedule" :data-title="data.time +' '+item.time" :key="index" v-for="(data,index) in item.week">
            <template v-for="(Schedule,index) in ScheduleList">
              <div :key="index" class="calendar-main-date-schedule-content-box " @click.stop @click="showScheduleDetails($event,Schedule)" :id="Schedule.id" :data-title="JSON.stringify(Schedule)" v-if="hideSchedule((data.time +' '+item.time),Schedule)"  :class="(new Date().getTime())>( new Date(Schedule.endDate).getTime())?'scheduleExpired':''">
                <div class="calendar-main-date-schedule-content">
                  <div class="calendar-main-date-schedule-content-header"> {{Schedule.title}}</div>
                  <div class="calendar-main-date-schedule-content-time"> {{ getDateFormat('hh:mm', new Date(Schedule.setDate)) + ' - ' + getDateFormat('hh:mm', new Date(Schedule.endDate))}}</div>
                  <!-- {{Schedule.text}} -->
                </div>

              </div>
            </template>
            <!-- 日程详情 -->
            <div class="calendar-main-date-schedule-Detail" @click.stop  v-if="isScheduleDetails" @click="hideScheduleDetails($event)" v-html="scheduleDetailHtml" >
               
              <!-- <div class="calendar-main-date-schedule-Detail-header gg-flex-3">
                <img class="calendar-main-date-schedule-Detail-header-icon" src="../assets/images/login_quit.png" alt="">
              </div>
              <div class="calendar-main-date-schedule-Detail-main">
                <div class="calendar-main-date-schedule-Detail-title">MAH Meeting</div>
                <div class="calendar-main-date-schedule-Detail-Date">May 27, 2022 09:00 - 10:00</div>
                <div class="calendar-main-date-schedule-Detail-text">
                  An absolute paradise for Twitch-streamers looking to engage with their audience while playing PS5 titles.
                </div>

              </div> -->
            </div>
          </div>
        </div>
        </el-scrollbar>

      </div>

    </div>
    <!-- // 创建日程 -子组件 -->
    <AddSchedule v-if="isAddSchedule" @SonAddSchedule='SonAddSchedule'></AddSchedule>
  </div>

</template>
<script>
// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
import Message from './Message.vue'
import Search from './Search.vue'
import AddSchedule from './AddSchedule.vue'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'Calendar',
  components: {
    // 聊天消息-子组件  
    Message,
    //    搜索输入框-子组件
    Search,
    // 创建日程 -子组件
    AddSchedule,
  },
  props: {

  },

  data() {
    return {
      // 创建日程
      isAddSchedule: false,
      // 日程详情
      isScheduleDetails:false,
      // 日期选择
      YearMonth: '',
      // 现在的时分钟
      minuNu: '',
      // 每隔一分钟 高度 1小时总高度93占
      minuTop: '',
      // 选中的日
      checkedDate: '',
      // 今天
      todayDate: '',
      //    周一 
      MondayDate: '',
      //   周日
      SundayDate: '',
      //   一周的日期
      weekList: [],
      loading: false,
      // 小时刻度轴
      HoursList: '',
      ScheduleList: [
        { id: 'c', setDate: '2022-06-13 9:00', endDate: '2022-06-13 9:30', title: 'MAH Meeting', text: '测试日程C' },
        { id: 'a', setDate: '2022-06-18 10:00', endDate: '2022-06-18 10:30', title: 'MAH Meeting', text: '测试日程A' },
        { id: 'b', setDate: '2022-06-14 11:30', endDate: '2022-06-14 14:30', title: 'MAH Meeting', text: '测试日程B' },
        { id: 'e', setDate: '2022-06-1 9:00', endDate: '2022-06-1 9:30', title: 'MAH Meeting', text: '测试日程E' },
        { id: 'f', setDate: '2022-06-8 10:00', endDate: '2022-06-8 10:30', title: 'MAH Meeting', text: '测试日程F' },
        { id: 'g', setDate: '2022-06-17 10:00', endDate: '2022-06-17 11:30', title: 'MAH Meeting', text: '测试日程G' },
        { id: 'p', setDate: '2022-06-16 11:00', endDate: '2022-06-16 12:30', title: 'MAH Meeting', text: '测试日程P' },
      ],
      scheduleDetailHtml:'',
      weeks: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
    };
  },
  watch: {

  },
  mounted() {
    this.init();
    console.log(this.user, this.info)
    // this.$refs.editDiv.focus();
  },

  methods: {
    init() {
      this.$nextTick(() => {
        // 获取  1小时总高度93px
        let H = document.getElementsByClassName('calendar-main-date-schedule')[0].offsetHeight;
        // 设置 每隔一分钟 高度  小时60分钟 
        this.minuTop = H / 60;
      })

      this.clickCalendarToday();
      // 一天24小时每间隔60分钟的数组
      this.HoursList = this.timeSlot(60);
      console.log(this.HoursList)
      //    默认选中今天
      this.checkedDate = this.timeConvert(new Date());

      this.setElDividingLine();

      // 日期选择月份 默认值
      let data = new Date();
      // 获取当前 //时  (0 ~ 23) //分   (0 ~ 59)
      // "yyyy-MM-dd hh:mm:ss"
      this.minuNu = this.getDateFormat('hh:mm', data);

      // 默认当前 年月
      this.YearMonth = data.getFullYear() + "-" + ((data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1));
      console.log(this.YearMonth, new Date(this.YearMonth).toUTCString());
    },
    //   今天
    clickCalendarToday() {
      this.todayDate = this.timeConvert(new Date());
      this.checkedDate = this.timeConvert(new Date());
      console.log(this.checkedDate)
      //   获取当前一周日期
      this.weekList = this.getWeekDataList(this.todayDate);
      // 日期插件赋值
      this.YearMonth = this.todayDate;
      // 一天24小时每间隔60分钟的数组
      this.HoursList = this.timeSlot(60);
      console.log(this.HoursList)
      // this.setElDividingLine();
    },
    //  点击切换选中的 - 日
    ChangCheckedDate(date) {
      // this.checkedDate = date.time;
      // this.setElDividingLine();

      console.log(date)
    },
    // 选择 年月 日期
    changeYearMonth() {
      let data = new Date(this.YearMonth);
      // let MonthArr = new Array(
      //   'January',
      //   'February',
      //   'March',
      //   'April',
      //   'May',
      //   'June',
      //   'July',
      //   'August',
      //   'September',
      //   'October',
      //   'November',
      //   'December',
      // );
      //日期修改   获取修改的日期 那一周日期
      this.weekList = this.getWeekDataList(data);
      // 重新加载
      // 一天24小时每间隔60分钟的数组
      this.HoursList = this.timeSlot(60);
      console.log(this.HoursList)
      // this.YearMonth = MonthArr[data.getMonth()]+' '+data.getFullYear();
      console.log(this.timeConvert(data))
    },

    // 设置圆点的位置
    setElDividingLine() {
      this.$nextTick(() => {
        let k = this.getWeekDate(this.checkedDate);
        //   查找值在数组中 的下标
        let index = (this.weeks || []).findIndex((item) => item === k);
        // let node=document.getElementsByClassName('calendar-main-date-Hours-DividingLine')[0]
        console.log(index, k)
        // 一格的宽度
        let w = document.getElementsByClassName('calendar-main-date-schedule')[0].offsetWidth;

        console.log('bfw', w);
        
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);
        //修改  伪元素样式 172 一格的宽度  4 自身的宽度一半 居中  index当前星期几的下标 需要偏移几格 
      // 使用document.styleSheets[0].addRule 修改css 打包编译之后 无法访问 StyleSheet 以插入规则” 使用 新方式 styleSheet 本地插入 style
        // document.styleSheets[0].addRule('.calendar-main-date-Hours-DividingLine span::after', 'left:' + (Math.abs(index) * w - 4) + 'px');
        // styleSheet.textContent =".calendar-main-date-Hours-DividingLine span::after{left:"+(Math.abs(index) * w - 4)+"px; width:30px}";
        let bfw = (w * 7) - (Math.abs(index) * w - 4);
        console.log('bfw', bfw);
        styleSheet.textContent =".calendar-main-date-Hours-DividingLine span::after{left:"+(Math.abs(index) * w - 4)+"px; width:30px} .calendar-main-date-Hours-DividingLine span::before{left:"+(Math.abs(index) * w - 4)+"px; width:"+bfw+"px}";
        // 获取当前时间节点 父节点 距离顶部的位置
        let parentNodeTop=  document.getElementsByClassName('calendar-main-date-Hours-DividingLine')[0].parentNode.offsetTop;
        // 获取父节点 的高度
        let parentNodeHe=  document.getElementsByClassName('calendar-main-date-Hours-DividingLine')[0].parentNode.offsetHeight;
        // 获取整个容器的高度 /2 等于当前容器居中的位置  
        let TableH=document.getElementsByClassName('calendar-main-date-Table')[0].parentNode.offsetHeight/2;
        // 当前时间节点 父节点距离顶部的位置 - 获取整个容器的高度 /2 等于当前容器居中的位置  + 父节点自身的高度 = 当前父节点在屏幕中 滚动居中的位置
       let ScrollTop = (parentNodeTop-TableH)+parentNodeHe;
        this.$refs['calendarScrollbar'].wrap.scrollTop =ScrollTop
          //  this.$refs['calendarScrollbar'].wrap.scrollTop = document.getElementsByClassName('calendar-main-date-Hours-DividingLine')[0].parentNode.offsetTop-document.getElementsByClassName('calendar-main-date-Table')[0].parentNode.offsetHeight/2+93;
        //修改  伪元素样式  当前日期之后颜色加重
        // document.styleSheets[0].addRule('.calendar-main-date-Hours-DividingLine span::before', 'left:' + (Math.abs(index) * w - 4) + 'px; width:' + bfw + 'px');
      })
    },
    //根据日期获取该日期周一~周日的年-月-日
    getWeekDataList(data) {
      var weekList = [];
      var date = new Date(data);
      //判断本日期是否为周日，获取本周一日期
      if (date.getDay() == "0" && localStorage.getItem('lang') == 'cn') {
        date.setDate(date.getDate() - 6);
      } else {
        date.setDate(date.getDate() - date.getDay() + 1);
      }
      var myDate = date.getDate();
      var myMonth = date.getMonth() + 1;
      if (date.getDate() < 10) {
        myDate = '0' + myDate;
      }
      if (date.getMonth() + 1 < 10) {
        myMonth = '0' + myMonth;
      }
      var newMondayDate = date.getFullYear() + "-" + myMonth + "-" + myDate;
      // 周 一
      weekList.push({ name: this.getWeekDate(date.getFullYear() + "-" + myMonth + "-" + myDate), date: myDate, time: (date.getFullYear() + "-" + myMonth + "-" + myDate) });
      // 获取周二以后日期
      for (var i = 0; i < 6; i++) {
        date.setDate(date.getDate() + 1);
        myDate = date.getDate();
        myMonth = date.getMonth() + 1;
        if (date.getDate() < 10) {
          myDate = '0' + myDate;
        }
        if (date.getMonth() + 1 < 10) {
          myMonth = '0' + myMonth;
        }
        weekList.push({ name: this.getWeekDate(date.getFullYear() + "-" + myMonth + "-" + myDate), date: myDate, time: (date.getFullYear() + "-" + myMonth + "-" + myDate) });

      }
      if (localStorage.getItem('lang') != 'cn') {
        // 国外一周方法 周一减去一天 周日做为第一天
        let data = new Date(new Date(newMondayDate).getTime() - (3600 * 1000 * 24));
        weekList.splice(weekList.length - 1, 1);
        weekList.unshift({ name: this.getWeekDate(data), date: ((data.getDate()) < 10 ? '0' + data.getDate() : data.getDate()), time: (data.getFullYear() + "-" + ((data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1)) + "-" + ((data.getDate()) < 10 ? '0' + data.getDate() : data.getDate())) });
      }

      this.MondayDate = weekList[0].time;
      this.SundayDate = weekList[weekList.length - 1].time;
      console.log(weekList);
      return weekList
    },
    //  周 切换
    clickWeekToggle(k) {
      // 上一周
      if (k == 'last') {
        // MondayDate 周1 减去 一天时长 = 上周日时间戳
        let data = new Date(new Date(this.MondayDate).getTime() - (3600 * 1000 * 24));
        //   获取当前一周日期
        this.weekList = this.getWeekDataList(data);
      } else if (k == 'next') {
        // SundayDate 周日 加 一天时长 = 下周一时间戳
        let data = new Date(new Date(this.SundayDate).getTime() + (3600 * 1000 * 24));

        //   获取当前一周日期
        this.weekList = this.getWeekDataList(data);
      }
      // 日期插件赋值
      this.YearMonth = this.weekList[0].time;
      // 一天24小时每间隔60分钟的数组
      this.HoursList = this.timeSlot(60);
      console.log(this.HoursList)
      console.log(k, this.todayDate)
    },
    // 创建日程
    changeAddSchedule() {
      this.isAddSchedule = true;
    },
    // 子组件 创建日程成功 调用的函数
    SonAddSchedule(is, msg) {
      this.isAddSchedule = is;
      if (msg) {
        this.ScheduleList.push(msg)
        console.log(msg)
      }

    },
    //监听 子组件调用 搜索输入框 输入的查询条件
    changeSearch(val) {
      console.log('搜索输入框子组件', val)
    },
    timeConvert(date) {
      // let date = new Date(str);
      let time = date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + ((date.getDate()) < 10 ? '0' + date.getDate() : date.getDate());
      return time;
    },
    // 校验是否是 同年同月同日同时
    hideSchedule(date, Schedule,) {
      // let startTime=this.timeConvert(new Date(date)), endTime= this.timeConvert(new Date(Schedule.setDate));
      // 获取年月日是否相等
      if (new Date(this.timeConvert(new Date(date))).getTime() == new Date(this.timeConvert(new Date(Schedule.setDate))).getTime()) {
        // 获取小时是否相等
        if (new Date(date).getHours() == new Date(Schedule.setDate).getHours()) {
          // 设置 日程样式
          this.$nextTick(() => {
            this.setScheduleDom(date, Schedule, document.getElementById(Schedule.id))
          })
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 点击日程 展示详情
    showScheduleDetails(event, data) {
        this.isScheduleDetails=true;
      let node = document.getElementById(data.id);
      this.$nextTick(() => {
        // 当前页面是否存在 schedule_active 添加选中class名 去除选中class名 当前节点添加选中class名
        if (document.getElementsByClassName('schedule_active').length > 0) {
          document.getElementsByClassName('schedule_active')[0].classList.remove("schedule_active")
        }
        // 页面详情全部隐藏
        let Detail = document.getElementsByClassName('calendar-main-date-schedule-Detail');
        for (var i = 0; i < Detail.length; i++) {
          //  console.log(Detail[i])
          Detail[i].style.display = 'none';
        };

        node.classList.add("schedule_active");
        let time=this.getDateFormat('yyyy-MM',new Date(data.setDate)) +','+this.getDateFormat('hh:mm',new Date(data.setDate)) +' - '+this.getDateFormat('hh:mm',new Date(data.endDate))
        let html=`
         <div class="calendar-main-date-schedule-Detail-header gg-flex-3">
                <img draggable="false" class="calendar-main-date-schedule-Detail-header-icon"  data-id='${data.id}' src="${require('../assets/images/login_quit.png')}" alt="">
              </div>
              <div class="calendar-main-date-schedule-Detail-main">
                <div class="calendar-main-date-schedule-Detail-title">${data.title}</div>
                <div class="calendar-main-date-schedule-Detail-Date">${time}</div>
                <div class="calendar-main-date-schedule-Detail-text">
                  ${data.text}
                </div>
              </div> `;
              this.scheduleDetailHtml=html
        //  node.parentNode.querySelector('.calendar-main-date-schedule-Detail').innerHTML=html;
        // 当前元素父元素下的子元素详情显示
        node.parentNode.querySelector('.calendar-main-date-schedule-Detail').style.display = 'block';
        // 获取最外层宽度
        let wrapperW=document.querySelector('.calendar-main-date-schedule-box').offsetWidth;
        // 获取自己的距离左侧的px 和自己的宽度
        let nLe=node.offsetLeft;let nw=node.offsetWidth;
        // 获取详情的宽度
        let Detailw=node.parentNode.querySelector('.calendar-main-date-schedule-Detail').offsetWidth;
        console.log(wrapperW,nw,Detailw)
        if ((Detailw+nw+nLe)>=wrapperW) {
          // parentNode 获取父节点
          node.parentNode.querySelector('.calendar-main-date-schedule-Detail').style.left = '-335px';
        }
      });
      // alert(111)
      console.log(node, data)
    },
    // 隐藏 日程详情
    hideScheduleDetails(even){
      console.log(even)
      this.isScheduleDetails=true;
      if(even.target.className == 'calendar-main-date-schedule-Detail-header-icon'){
          // even.currentTarget.style.display = 'none';
          this.isScheduleDetails=false;
           // 当前页面是否存在 schedule_active 添加选中class名 去除选中class名 当前节点添加选中class名
        if (document.getElementsByClassName('schedule_active').length > 0) {
          document.getElementsByClassName('schedule_active')[0].classList.remove("schedule_active")
        }
      };
    },
    // 设置 日程 dom 的高度 top值
    setScheduleDom(date, Schedule, dom) {
      if (dom) {
        // 日程开始时间 和 时间轴的差值 =  距离 时间轴 的top值
        let T = this.TimeDifference(date, Schedule.setDate);
        //  日程开始时间 和 日程结束时间 的差值 =  日程的高度值
        let H = this.TimeDifference(Schedule.setDate, Schedule.endDate);
        //  日程结束时间 至 当前时间 是否大于 设置过期背景
        // let NowDate = new Date().getTime();
        // let enDate = new Date(Schedule.endDate).getTime();
        // NowDate > enDate ? dom.classList.add('scheduleExpired') : dom.classList.remove('scheduleExpired');
        // 设置 div 内容
        // let time = this.getDateFormat('hh:mm', new Date(Schedule.setDate)) + ' - ' + this.getDateFormat('hh:mm', new Date(Schedule.endDate));
        // dom.childNodes[0].querySelector('.calendar-main-date-schedule-content-time').innerText = time;

        dom.setAttribute("style", "height: " + (H * this.minuTop) + "px;top: " + (T * this.minuTop) + "px;");
      }
      console.log(dom)
    },
    // 获取 时间 为周几
    getWeekDate(date) {
      var now = new Date(date);
      var day = now.getDay();
      //   var weeks = new Array(
      //     "Sunday"|"周日",
      //     "Monday"|"周一",
      //    "Tuesday"| "周二",
      //     "Wednesday"|"周三",
      //     "Thursday"|"周四",
      //     "Friday"|"周五",
      //     "Saturday"|"周六"
      //   );
      //   var weeks = new Array(
      //     "Sunday",
      //     "Monday",
      //     "Tuesday",
      //     "Wednesday",
      //     "Thursday",
      //     "Friday",
      //     "Saturday"
      //   );
      var week = this.weeks[day];
      return week;
    },
    //获取一天24小时每间隔几分钟的数组   step = 间隔的分钟
    timeSlot(step) {
      var date = new Date();
      // 时分秒设置从零点开始
      date.setHours(0);
      date.setSeconds(0);
      date.setUTCMinutes(0);
      // console.log(date.getHours())
      // console.log(date.getSeconds())
      // console.log(new Date(date.getTime()))
      var arr = [], timeArr = [];
      var slotNum = 24 * 60 / step   // 算出多少个间隔
      for (var f = 0; f < slotNum; f++) {   //  stepM * f = 24H*60M
        // arr.push(new Date(Number(date.getTime()) + Number(step*60*1000*f)))   //  标准时间数组
        var time = new Date(Number(date.getTime()) + Number(step * 60 * 1000 * f))  // 获取：零点的时间 + 每次递增的时间
        var hour = '', sec = '';
        time.getHours() < 10 ? hour = '0' + time.getHours() : hour = time.getHours()  // 获取小时
        time.getMinutes() < 10 ? sec = '0' + time.getMinutes() : sec = time.getMinutes()   // 获取分钟
        timeArr.push({ time: (hour + ':' + sec), week: this.weekList });
      }
      return timeArr;
    },
    // 判断两个时间分钟差
    TimeDifference(startTime, endTime) {
      var sTime = new Date(startTime).getTime();
      var eTime = new Date(endTime).getTime();
      // 时间戳 相差的毫秒值
      var Difference = Math.abs(sTime - eTime);
      // 一分钟等于 1000*60 毫秒
      var minute = 1000 * 60;
      let minutes = Difference / minute;
      return minutes;
    },
    // 获取当前 //时  (0 ~ 23) //分   (0 ~ 59)
    getDateFormat(format, fdate) {
      var args = {
        "M+": fdate.getMonth() + 1,
        "d+": fdate.getDate(),
        "h+": fdate.getHours(),
        "m+": fdate.getMinutes(),
        "s+": fdate.getSeconds(),
        "q+": Math.floor((fdate.getMonth() + 3) / 3),  //quarter
        "S": fdate.getMilliseconds()
      };
      if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (fdate.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
      }
      return format;
    },
    // 获取上一个月
    getPreMonth(date) {
      var arr = date.split('-');
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      var t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
    },
    // 获取下一个月
    getNextMonth(date) {
      var arr = date.split('-');
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中的月的天数
      var year2 = year;
      var month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = '0' + month2;
      }

      var t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
    },
    getCurrentWeek(date) {
      let nowData = new Date(date);  //传入时间参数,如 2021-11-09 获取给定日期所属的周 日期  ;不给定日期,获取当天所属的周日期  
      let currentDay = nowData.getDay();
      if (currentDay == 0) {
        currentDay = 7;
      }
      let beforweek = [],
        afterWeek = [];
      for (let i = 1; i <= 7; i++) {
        if (currentDay - i >= 0) {
          let DayTime =
            nowData.getTime() - (currentDay - i) * 24 * 60 * 60 * 1000;
          beforweek.push(new Date(DayTime).getDate());
        } else {
          let DayTime = nowData.getTime() + (8 - i) * 24 * 60 * 60 * 1000;
          afterWeek.push(new Date(DayTime).getDate());
        }
      }
      afterWeek = afterWeek.reverse();
      console.log([...beforweek, ...afterWeek]);
      return [...beforweek, ...afterWeek];
    },

  }
};
</script>

<style scoped>
@import "../assets/css/calendar.css";
.el-calendar-table .el-calendar-day p {
  margin: 0;
  width: 100%;
  height: 100%;
}
.calendar-wrapper /deep/ .el-calendar__header {
  /* display: none; */
}
/* 隐藏原生的横向滚动条 */
.calendar-wrapper /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.calendar-YearMonth-toggle /deep/ .el-input__inner {
  border: 0px;
  /* width: 99px; */
  padding-left: 0;
  padding-right: 0;
  /* width: 79px; */
  /* height: 21px; */
  font-size: 16px;
  font-family: "Futura-Medium, Futura";
  font-weight: 500;
  color: #070e0b;
  line-height: 21px;
}
.calendar-YearMonth-toggle /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.calendar-YearMonth-toggle /deep/ .el-input__prefix {
  display: none;
}
.calendar-YearMonth-toggle /deep/ .el-input__suffix {
  display: none;
}



</style>

<style >

.calendar-main-date-schedule-Detail-header {}

.calendar-main-date-schedule-Detail-header-icon {
  width: 20px;
  height: 20px;
  margin: 8px 7px 0 auto;
}

.calendar-main-date-schedule-Detail-main {
  margin: 13px 21px 0 17px;
}

.calendar-main-date-schedule-Detail-title {
  height: 21px;
  font-size: 16px;
  color: #070E0B;
  line-height: 21px;
}

.calendar-main-date-schedule-Detail-Date {
  margin-top: 16px;
  height: 15px;
  font-size: 12px;
  color: #070E0B;
  line-height: 15px;
  opacity: 0.6;
}

.calendar-main-date-schedule-Detail-text {
  margin-top: 20px;
  font-size: 14px;
  color: #070E0B;
  line-height: 19px;
}

</style>