<template>
  <div class="log-wrapper gg-flex-1 gg-flex-2">
    <div class="log-header gg-flex-3">
      <div class="log-header-search gg-flex-3">

        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">systemName：</div>
          <el-input v-model="ruleForm.systemName" placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">modelName：</div>
          <el-input v-model="ruleForm.modelName" placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">userId：</div>
          <el-input v-model="ruleForm.userId" placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">deviceInfo：</div>
          <el-input v-model="ruleForm.deviceInfo" @input="changeDeviceInfo"  placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord1：</div>
          <el-input v-model="ruleForm.keyWord1"  @input="changeKeyWord1"   placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord2：</div>
          <el-input v-model="ruleForm.keyWord2"  @input="changeKeyWord2" placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord3：</div>
          <el-input v-model="ruleForm.keyWord3" @input="changeKeyWord3"  placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">keyWord4：</div>
          <el-input v-model="ruleForm.keyWord4"  @input="changeKeyWord4" placeholder="请输入内容"></el-input>
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">message：</div>
          <el-input v-model="ruleForm.message" placeholder="请输入内容"></el-input>
        </div>
        <!-- <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">pageIndex：</div>
             <el-input v-model="ruleForm.pageIndex" placeholder="请输入内容"></el-input> 
        </div>
        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">pageSize：</div>
             <el-input v-model="ruleForm.pageSize" placeholder="请输入内容"></el-input> 
        </div> -->

        <div class="log-header-search-item gg-flex-3">
          <div class="log-header-search-item-title">选择时间段：</div>
          <el-select v-model="timeLimit" placeholder="请选择">
            <el-option v-for="item in timeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button class="log-header-search-btn log-header-search-Submit" type="primary" @click="onSubmit">查询</el-button>
        <el-button class="log-header-search-btn" @click="onReset">重置</el-button>
      </div>
    </div>

    <div class="log-filter-table">
      <div class="log-header-search-item gg-flex-3" style="margin: 20px 10px;">
        <div class="log-header-search-item-title" style="line-height: initial;">选择显示的tab列：</div>
        <el-checkbox-group class="gg-flex-1" v-model="checkedCities" @change="handleCheckedCitiesChange" style="    flex-wrap: wrap;">
          <el-checkbox v-for="item in checkList" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>

    </div>

    <div class="log-main">
      <el-table :data="tableList" height="100%" border style="width: 100%">
        <!-- <el-table :data="tableList[pageIndex]" height="200" border style="width: 100%"> -->
        <el-table-column prop="systemName" label="systemName" width="150" v-if="checkedCities.join(';').indexOf('systemName')>=0">
        </el-table-column>
        <el-table-column prop="modelName" label="modelName" width="150" v-if="checkedCities.join(';').indexOf('modelName')>=0">
        </el-table-column>
        <el-table-column prop="userId" label="userId" width="150" v-if="checkedCities.join(';').indexOf('userId')>=0">
        </el-table-column>
        <el-table-column prop="deviceInfo" label="deviceInfo" width="150" v-if="checkedCities.join(';').indexOf('deviceInfo')>=0">
        </el-table-column>
        <el-table-column prop="keyWord1" label="keyWord1" width="150" v-if="checkedCities.join(';').indexOf('keyWord1') >=0">
        </el-table-column>
        <el-table-column prop="keyWord2" label="keyWord2" width="150" v-if="checkedCities.join(';').indexOf('keyWord2')>=0">
        </el-table-column>
        <el-table-column prop="keyWord3" label="keyWord3" width="150" v-if="checkedCities.join(';').indexOf('keyWord3')>=0">
        </el-table-column>
        <el-table-column prop="keyWord4" label="keyWord4" width="150" v-if="checkedCities.join(';').indexOf('keyWord4')>=0">
        </el-table-column>
        <!-- v-if="checkedCities.join(';').indexOf('message')>=0" -->
        <el-table-column prop="message" label="message">
        </el-table-column>
        <!-- <el-table-column prop="id" label="id" width="180">
        </el-table-column> -->
        <el-table-column prop="createTime" label="日期" width="160" v-if="checkedCities.join(';').indexOf('createTime')>=0">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <!--         <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="log-footer gg-flex-1">
    <!-- <div class="log-footer gg-flex-1" v-if='pagedShow'> -->
      <el-pagination ref="pagination" @size-change="handleSizeChange" :page-size='Number(ruleForm.pageSize)' @current-change="handleCurrentChange" :current-page.sync="ruleForm.pageIndex"  layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'qs';       //引用qs模块
import axios from 'axios'
let checks = ['systemName', 'modelName', 'userId', 'deviceInfo', 'keyWord1', 'keyWord2', 'keyWord3', 'keyWord4', 'createTime'];
export default {
  name: "Log",
  components: {

  },
  data() {
    return {
      pagedShow:false,
      timeLimit: '1date',//默认选择时间段 前一天
      // pageSize: null,//默认一页显示条数
      // pageIndex: 0,//默认在第一页
      totalElements:null,//总数据 条数
      ruleForm: {
        systemName: '',
        modelName: '',
        userId: '',
        deviceInfo: '',
        keyWord1: '',
        keyWord2: '',
        keyWord3: '',
        keyWord4: '',
        message: '',
        beginTime: null,
        endTime: null,
        pageSize: null,//默认一页显示条数
        pageIndex: 1,//默认在第一页
      },

      checkedCities:  ['systemName', 'modelName', 'userId', 'createTime'], //table 默认显示项
      checkList: checks,
      // pageArr:[],
      // pageArr: [10, 30, 50],
      timeList: [{
        value: '1date',
        label: '最近1天'
      }, {
        value: '3date',
        label: '最近3天'
      }, {
        value: '7date',
        label: '最近7天'
      }, {
        value: '1Month',
        label: '最近1月'
      }, {
        value: '3Month',
        label: '最近三月'
      }],
      tableList: [],
      tableData: [],
    }
  },
  created() {
    // 初始化
    this.init();
  },
  mounted() {
    window.addEventListener('beforeunload', e => {
      this.beforeunloadFn(e);
    });
  },
  methods: {
    // 监听页面刷新 触发
    beforeunloadFn(e) {
      e = e || window.event;
      this.setLs('RefreshKey', 'true');
    },
    init() {
      // 全局构造函数 添加新方法 创建一个新的数组方法
      Array.prototype.in_array = function (e) {
        var r = new RegExp(',' + e + ',');
        return (r.test(',' + this.join(this.S) + ','));
      }
      // 页面刷新 赋值  接口查询完成 赋空值
      if (this.getLs('RefreshKey') != '' && this.getLs('queryConditions')) {
        // console.log(this.getLs('queryConditions'))
        this.ruleForm = this.getLs('queryConditions');
        this.ruleForm.pageSize = this.getLs('pageObj').pageSize;
        this.ruleForm.pageIndex = this.getLs('pageObj').pageIndex;
        this.timeLimit = this.getLs('pageObj').timeLimit;
        // checked 选中显示项
        if(this.getLs('checkedCities')){
          this.checkedCities = localStorage.getItem('checkedCities').split(';');
        }

        //监听页面刷新 查询
        this.onSubmit();
      }
    },
    // 点击 checked 控制tab 列 是否显示
    handleCheckedCitiesChange(value) {
      // checked 选中显示项 刷新页面时调用
      this.setLs('checkedCities', this.checkedCities.join(';'));
      // console.log(value);

      // console.log(this.checkedCities) 
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    //点击 查询
    onSubmit() {

      // 获取开始 - 结束 时间戳
      this.getTimeChange(this.timeLimit);
      // 查询条件 - 本地存储
      this.setLs('queryConditions', JSON.stringify(this.ruleForm));
      // 翻页 - 页码
      this.setLs('pageObj', JSON.stringify({ pageSize: this.ruleForm.pageSize, pageIndex: this.ruleForm.pageIndex, timeLimit: this.timeLimit }));
      this.setLs('checkedCities', this.checkedCities.join(';'));
      // 监听页面值刷新 赋空值
      this.setLs('RefreshKey', '');

      // 调用查询接口 
      //  axios.get("/query", { //正式打包地址
      axios.get("api/query", {//本地测试代理转发地址
        params: this.ruleForm,
      }).then((res) => {
        if (res.status = 200) {
          let data = res.data.data.content;
          if (data.length >= 1) {
            for (let i in data) {
              data[i].createTime = this.getLocalTime(data[i].createTime);

            }
          }
          // 是否有分页paged
          this.pagedShow =  res.data.data.pageable.paged;
          // 数据存在本地 翻译留用
          this.tableData = data;
          // 一页显示多少条
          this.ruleForm.pageSize =  res.data.data.pageable.pageSize;
          // this.ruleForm.pageIndex =  res.data.data.pageable.pageNumber;
          // 总数据量
          this.totalElements =  res.data.data.totalElements;
          // this.pageArr.push( res.data.data.totalPages)
          // this.tableList = this.setTableList([], this.ruleForm.pageSize , this.tableData);
            this.tableList = data;
        }
        // console.log(JSON.stringify(res.data.data))
        // this.tableData=res
      }).catch((res) => {
        console.log(res);
      })
    },
    // 清空查询条件
    onReset() {
      // 重置筛选条件数据
      this.timeLimit = '1date';//默认选择时间段 前一天
      this.ruleForm.pageSize = null;//默认一页显示条数
      this.ruleForm.pageIndex = 1;//默认在第一页
      this.ruleForm.systemName = '';
      this.ruleForm.modelName = '';
      this.ruleForm.userId = '';
      this.ruleForm.deviceInfo = '';
      this.ruleForm.keyWord1 = '';
      this.ruleForm.keyWord2 = '';
      this.ruleForm.keyWord3 = '';
      this.ruleForm.keyWord4 = '';
      this.ruleForm.beginTime = '';
      this.ruleForm.endTime = '';
      this.checkedCities = checks;
      this.totalElements = null;
      this.setLs('checkedCities', this.checkedCities.join(';'));
      // 查询条件 - 本地存储
      this.setLs('queryConditions', JSON.stringify(this.ruleForm));
      // 翻页 - 页码
      this.setLs('pageObj', JSON.stringify({ pageSize: this.ruleForm.pageSize, pageIndex: this.ruleForm.pageIndex, timeLimit: this.timeLimit }));

      // 监听页面值刷新 赋空值
      this.setLs('RefreshKey', '');

    },
    // 监听 是否输入
    changeDeviceInfo(val){ 
       this.onFrom(val,'deviceInfo');
    },
    changeKeyWord1(val){ 
       this.onFrom(val,'keyWord1');
    },
     changeKeyWord2(val){ 
       this.onFrom(val,'keyWord2');
    },
     changeKeyWord3(val){ 
       this.onFrom(val,'keyWord3');
    },
     changeKeyWord4(val){ 
       this.onFrom(val,'keyWord4');
    },
    // 查询条件有值 在tab中显示 否则默认不显示
    onFrom(val,key){
       if(val!=''&&val.length>0){
         if(this.checkedCities.join(';').indexOf(key)<=0){
            this.checkedCities.push(key);
         }
      }else{
        for(let i in this.checkedCities){
          if(this.checkedCities[i]==key){
            this.checkedCities.splice(i,1)
          }
        } 
      }
    },
    // 设置 localStorage
    setLs(k, v) {
      var _v;
      if (typeof v === 'string' || typeof v === 'number') {
        _v = v;
      } else {
        _v = JSON.stringify(v);
      }
      try {
        localStorage.setItem(k, _v);
        return true;
      } catch (e) {
        console.log('存储本地数据失败');
        return false;
      }
    },
    // 取出 localStorage
    getLs(k) {
      var str = localStorage.getItem(k);
      try {
        str = JSON.parse(str);
      } catch (e) {
      }
      return str === 'undefined' ? '' : str;
    },
    // 查看详情
    handleClick(row) {
      //   编程式导航-params传递参数-JS代码内部跳转 + 传递参数
      // console.log(row);
      this.$router.push({
        // name: "LogDetails",
        path: "/logDetails",
        query: {
          constraints: JSON.stringify(row),
        }
      });
    },
    // 设置每一页显示多少条
    handleSizeChange(val) {
      // 重置 页面显示数据条数
      this.ruleForm.pageSize = val;
       //监听页面刷新 查询
        this.onSubmit();
      // console.log(this.pageSize)
      // 修改数据
      // this.tableList = this.setTableList([], this.ruleForm.pageSize, this.tableData);
        // 翻页 - 页码
      // this.setLs('pageObj', JSON.stringify({ pageSize: this.ruleForm.pageSize, pageIndex: this.ruleForm.pageIndex, timeLimit: this.timeLimit }));
      // console.log(`每页 ${val} 条`);
    },
    // 点击跳转到第几页
    handleCurrentChange(val) {
      // 重置 当前在等几页
      this.ruleForm.pageIndex = val;
        console.log(this.ruleForm);
          //监听页面刷新 查询
        this.onSubmit();
      // console.log(this.pageIndex)
      // console.log(this.tableList[this.pageIndex])
      // console.log(`当前页: ${val}`);
       // 翻页 - 页码
      // this.setLs('pageObj', JSON.stringify({ pageSize: this.ruleForm.pageSize, pageIndex: this.ruleForm.pageIndex, timeLimit: this.timeLimit }));
    },
    // 设置一页显示的数据
    setTableList(newArr, numb, arr) {
      newArr = [];
      let arrLength = arr.length; // 数组长度
      let num = numb;  // 每页显示 10 条
      let index = 0;
      for (let i = 0; i < arrLength; i++) {
        if (i % num === 0 && i !== 0) { // 可以被 10 整除
          newArr.push(arr.slice(index, i));
          index = i;
        };
        if ((i + 1) === arrLength) {
          newArr.push(arr.slice(index, (i + 1)));
        }
      };
      // console.log(newArr)
      return newArr;
    },
    // 时间戳 转 日期 - 24小时制
    getLocalTime(nS) {
      let that=new Date(parseInt(nS));
      return that.getFullYear() + "-" + (that.getMonth() + 1) + "-" + that.getDate() + " " + that.getHours() + ":" + that.getMinutes() + ":" + that.getSeconds();
      // return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
    },
    // 监听选择的时间 返回时间戳  
    getTimeChange(selVal) {
      var nowTime = new Date();
      // 结束日期时间戳
      this.ruleForm.endTime = nowTime.getTime();
      switch (selVal) {
        case '1date':
          this.ruleForm.beginTime = this.getDate(nowTime, 1);
          break;
        case '3date':
          this.ruleForm.beginTime = this.getDate(nowTime, 3);
          break;
        case '7date':
          this.ruleForm.beginTime = this.getDate(nowTime, 7);
          break;
        case '1Month':
          this.ruleForm.beginTime = this.getTime(nowTime, 1);
          break;
        case '3Month':
          this.ruleForm.beginTime = this.getTime(nowTime, 3);
          break;
        default:
      };

      // console.log(this.ruleForm.beginTime, this.getLocalTime(this.ruleForm.beginTime))
    },
    //前 index  多少天 (一天的毫秒时间  24 * 60 * 60 * 1000)
    getDate(nowTime, index) {
      return nowTime.getTime() - index * 24 * 60 * 60 * 1000;
    },
    //  获取当前时间到 前几个月的数据 （获取月的天数 * 一天的） 多少天
    getTime(nowTime, index) {
      let begin = "";
      if (nowTime.getMonth() == 1) {//2月
        if (nowTime.getFullYear() % 4 == 0) {//润年
          //润年 一个月 29天
          begin = nowTime.getTime() - 29 * 24 * 3600 * 1000;
        } else {//平年
          // 平年 一个月 28天
          begin = nowTime.getTime() - 28 * 24 * 3600 * 1000;
        }
      } else {
        let month = new Array([2, 4, 6, 9, 11]);
        if (month.in_array(nowTime.getMonth())) {//小月
          // 小月 一个月 30 天
          begin = nowTime.getTime() - 30 * 24 * 3600 * 1000;
        } else {//大月
          // 大月 一个月 31 天
          begin = nowTime.getTime() - 31 * 24 * 3600 * 1000;
        }
      }
      index--;
      if (index == 0) {
        return begin;
      } else {
        return this.getTime(new Date(begin), index);
      };
    },
  },
  // 销毁前状态
  beforeDestroy() {
    // console.group("beforeDestroy 销毁前状态 Log===============》");
  },
  destroyed() {
    // console.group("destroyed 销毁完成状态 Log===============》");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/log.css";
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
