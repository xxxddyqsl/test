<template lang='html'>
  <div id="addlist-wrapper" class='gg-flex-1'>
    <div class="addlist-box gg-flex-4 gg-flex-2">
      <div class="addlist-header gg-flex-1">
        <p class="addlist-header-title">选择会议成员</p>
        <div class="addlist-hid gg-flex-1" @click="showAddlist"><span id="close"></span></div>
      </div>
      <div class="addlist-tab-box gg-flex-3">
        <div class="addlist-tab gg-flex-1 " @click="tabnum=0" :class="{isActive:tabnum==0}">联系人</div>
        <div class="addlist-tab gg-flex-1" @click="tabnum=1" :class="{isActive:tabnum==1}">组织架构</div>
      </div>
      <div class="addlist-search-box gg-flex-1">
         <input class="addlist-search" type="text" placeholder="搜索"  v-model="filterText"></input>
        <!-- <el-input class="addlist-search" type="text" placeholder="搜索"  v-model="filterText"></el-input> -->
        
        <!-- <div :class="[personnel.length>0?'addlist-search-hide-icon-box':'addlist-search-icon']" @click="personnel.length>0?Emptyinp():''" >
          <span v-show="personnel.length>0" class="addlist-search-hide-icon"></span>
        </div> -->
      </div>

      <div class="addlist-main gg-flex-4  gg-flex-2" ref='scrollMain' @mouseenter="OnMainMouseHover('ContactPerson')" @mouseleave="OnMoveout('ContactPerson')">
       
        <div id='scroll-main' class="addlist-main-ContactPerson-box gg-flex-4" v-show="tabnum==0">
          <div id='scroll-main-content-list' class='addlist-main-list-box' ref="scrollContent"  :class="[MainList.indexOf('ContactPerson')!=-1?'addlist-main-list-box-scroll':'']">
            <!-- 我的好友列表 -->
            <div class="addlist-main-FriendsList-header-box">
              <div class="addlist-main-FriendsList-header gg-flex-3" @click="OnClickMainList('FriendsList')">
                <div class="addlist-main-FriendsList-header-triangle "  :class="[Mainitem.indexOf('FriendsList')!=-1?'triangle-rotate':'']" ></div>
                <div class="addlist-main-FriendsList-header-title">我的好友</div>
              </div>
              <ul class="addlist-main-FriendsList-main"  v-show="Mainitem.indexOf('FriendsList')!=-1?true:false">
                <!-- <li class="addlist-main-FriendsList gg-flex-3">
                    <img class="addlist-main-FriendsList-icon" src="../../assets/images/defaultHeadImage.jpg" alt="">
                    <div class="addlist-main-FriendsList-title">某某某1</div>
                      <input type="checkbox" id="checkbox-p1" style="display: none;" class="addlist-main-FriendsList-checkbox" v-model="checkList" value="游泳"/>
                      <label for="checkbox-p1" class="addlist-main-FriendsList-checkbox-label gg-flex-1"></label> 
                  </li>
                  <li class="addlist-main-FriendsList gg-flex-3">
                    <img class="addlist-main-FriendsList-icon" src="../../assets/images/defaultHeadImage.jpg" alt="">
                    <div class="addlist-main-FriendsList-title">某某某2</div> 
                      <input type="checkbox" id="checkbox-p2" style="display: none;" class="addlist-main-FriendsList-checkbox" v-model="checkList" value="洗衣机"/>
                      <label for="checkbox-p2" class="addlist-main-FriendsList-checkbox-label gg-flex-1"></label>
                  </li> -->
                  <li v-if='FriendsList.length<=0' class='gg-flex-1'>
                      <p>暂无数据</p>
                  </li>
                <li class="addlist-main-FriendsList gg-flex-3" v-for="(item, index) in FriendsList" :key="index">
                  <img class="addlist-main-FriendsList-icon"  :src="item.img.indexOf('base64')!=-1?item.img:('http://org.jj.woniu.com/'+item.img)" alt="">
                  <div class="addlist-main-FriendsList-title">{{item.label}}</div>
                  <input type="checkbox" :id='"checkbox-"+item.id' style="display: none;" class="addlist-main-FriendsList-checkbox" v-model="checkList" :disabled="item.disable" :value="item" :checked="item.checked" />
                  <label :for='"checkbox-"+item.id' class="addlist-main-FriendsList-checkbox-label gg-flex-1"></label>
                </li>
              </ul>

              <!-- <checkbox-group  v-model="checkBoxArr">  
                      <checkbox style="width:20px;height:20px;border:1px solid ; margin:5px;" v-for="item in checkLists" :label="item.label" :val="item.value" :checked="item.checked" :isDisable="item.disable" :key="item.value" :checkBoxClass="checkBoxClass"></checkbox>
                  </checkbox-group>
                  <p>复选框群组：{{ checkBoxArr }}</p>-->

            </div>

            <!-- 常用联系人 -->
            <div class="addlist-main-FriendsList-header-box">
              <div class="addlist-main-FriendsList-header gg-flex-3" @click="OnClickMainList('FrequentContacts')">
                <div class="addlist-main-FriendsList-header-triangle "  :class="[Mainitem.indexOf('FrequentContacts')!=-1?'triangle-rotate':'']" ></div>
                <div class="addlist-main-FriendsList-header-title">常用联系人</div>
              </div>
              <ul class="addlist-main-FriendsList-main"  v-show="Mainitem.indexOf('FrequentContacts')!=-1?true:false">
                  <li v-if='FrequentlyUsedContactsList.length<=0' class='gg-flex-1'>
                      <p>暂无数据</p>
                  </li>
                <li class="addlist-main-FriendsList gg-flex-3" v-for="(item, index) in FrequentlyUsedContactsList" :key="index">
                  <img class="addlist-main-FriendsList-icon"  :src="item.img.indexOf('base64')!=-1?item.img:('http://org.jj.woniu.com/'+item.img)" alt="">
                  <div class="addlist-main-FriendsList-title">{{item.label}}</div>
                  <input type="checkbox" :id='"checkbox-"+item.id' style="display: none;" class="addlist-main-FriendsList-checkbox" v-model="checkList" :disabled="item.disable" :value="item" :checked="item.checked" />
                  <label :for='"checkbox-"+item.id' class="addlist-main-FriendsList-checkbox-label gg-flex-1"></label>
                </li>
              </ul>  
            </div>

              <!-- 最近联系人 -->
            <!-- <div class="addlist-main-FriendsList-header-box">
              <div class="addlist-main-FriendsList-header gg-flex-3" @click="OnClickMainList('RecentContacts')">
                <div class="addlist-main-FriendsList-header-triangle "  :class="[Mainitem.indexOf('RecentContacts')!=-1?'triangle-rotate':'']" ></div>
                <div class="addlist-main-FriendsList-header-title">最近联系人</div>
              </div>
              <ul class="addlist-main-FriendsList-main"  v-show="Mainitem.indexOf('RecentContacts')!=-1?true:false">
                <li class="addlist-main-FriendsList gg-flex-3">
                    <img class="addlist-main-FriendsList-icon" src="../../assets/images/defaultHeadImage.jpg" alt="">
                    <div class="addlist-main-FriendsList-title">某某某1</div>
                      <input type="checkbox" id="checkbox-p1" style="display: none;" class="addlist-main-FriendsList-checkbox" v-model="checkList" value="{id:'yy1',label:游泳}"/>
                      <label for="checkbox-p1" class="addlist-main-FriendsList-checkbox-label gg-flex-1"></label> 
                  </li>
                  <li class="addlist-main-FriendsList gg-flex-3">
                    <img class="addlist-main-FriendsList-icon" src="../../assets/images/defaultHeadImage.jpg" alt="">
                    <div class="addlist-main-FriendsList-title">某某某2</div> 
                      <input type="checkbox" id="checkbox-p2" style="display: none;" class="addlist-main-FriendsList-checkbox" v-model="checkList"  value="{id:'xyj1',label:洗衣机}" />
                      <label for="checkbox-p2" class="addlist-main-FriendsList-checkbox-label gg-flex-1"></label>
                  </li> 
              </ul>  
            </div> -->

          </div>
             <div class="scroll-box"> 
                <!-- <v-scroll v-show='MainList' :style="visibility"  :Mainitem="Mainitem" :wrapdivs="wrapdivs" ></v-scroll> -->
                <!-- 使用show 鼠标按下 hover不在滚动区域 滚动条隐藏之后无法滚动  visibility 鼠标在滚动滑块上按下  hover不在滚动区域隐藏 滚动条还可以滚动-->
                  <v-scroll :style="{visibility:(MainList.indexOf('ContactPerson')!=-1?'visible':'hidden')}"  :Mainitem="Mainitem" :wrapdivs="wrapdivs" ></v-scroll>
            </div>
        </div>
        <!-- 组织架构  @check='OnTree'-->
        <div class="addlist-main-Organization-box" v-show="tabnum==1">
          <div class='addlist-main-ContactPerson-box gg-flex-4' id='addlist-main-Organization-box'  ref='scrollmainOrganization' @mouseenter="OnOrganizationMouseHover('Organization')" @mouseleave="OnMoveout('Organization')">
            <div id='addlist-main-scrollmainOrganizationList' class='addlist-main-list-box'  ref='scrollmainOrganizationList'   :class="[MainList.indexOf('Organization')!=-1?'addlist-main-list-box-scroll':'']">
               <!-- @check-change='OnTree' -->
              <el-tree  class="filter-tree" :data="treeData"   show-checkbox  ref="tree"  :filter-node-method="filterNode"  node-key="id"  highlight-current :props="defaultProps" @check="getNodeClick"   @node-click="handleNodeClick">
                <span class="custom-tree-node gg-flex-3" slot-scope="{ node, data }">  
                  <i class='tree-icon'  v-if='data.img!=""'  :style="{backgroundImage: data.img.indexOf('base64')!=-1?'url('+ data.img +')':'url(http://org.jj.woniu.com/'+ data.img +')'}"></i>
                  {{ node.label }}
                </span>
              </el-tree>
            </div>
              <div class="scroll-box" > 
              <!-- 滚动条  -->
                <v-scroll :style="{visibility:(MainList.indexOf('Organization')!=-1?'visible':'hidden')}" :Mainitem="scrollContentH" :wrapdivs="Organizationdivs" ></v-scroll>
            </div>
          </div>
          
           
        </div>
       
      </div>
      
      <div class="addlist-footer gg-flex-3" >
        <div class='addlist-footer-users-list-scroll' id='addlist-footer-box'  ref='scrollFooter' @mouseenter="OnFooterMouseHover('checkList')" @mouseleave="OnMoveout('checkList')"> 
          <div ref='scrollFooterUserList' id='addlist-footer-users-list-box' style='position: absolute;width: 100%;'>
              <div class="addlist-footer-users-list-box gg-flex-3 "  >
                <div class="addlist-footer-users-list gg-flex-1 gg-flex-2" v-for="(item ,index) in checkList" :key='index'>
                  <span class="addlist-footer-users-icon-box" @click='OnSplicelist(index)'>
                    <img class="addlist-footer-users-icon"  :src="item.img.indexOf('base64')!=-1?item.img:('http://org.jj.woniu.com/'+item.img)"  alt="">
                    <span class='addlist-footer-users-delete-icon gg-flex-1'></span>
                  </span> 
                  <div class="addlist-footer-users-title">{{item.label}}</div>
                </div>  
              </div>
           </div>
           <div class="scroll-box" >
                    <!-- <v-scroll v-show="MainList.indexOf('checkList')!=-1?true:false"  :Mainitem="checkList" :wrapdivs="footerdivs" ></v-scroll> -->
                    <!-- 使用show 鼠标按下 hover不在滚动区域 滚动条隐藏之后无法滚动  visibility 鼠标在滚动滑块上按下  hover不在滚动区域隐藏 滚动条还可以滚动  checkList 控制底部滚动条显示隐藏的关键字 -->
                    <v-scroll  :style="{visibility:(MainList.indexOf('checkList')!=-1?'visible':'hidden')}"  :Mainitem="checkList" :wrapdivs="footerdivs" ></v-scroll>
            </div>
        </div>
        <div class="addlist-footer-confirm-box gg-flex-1" @click='Onsubmit'>
          <div class="addlist-footer-confirm" v-text="'确认('+checkList.length+')'"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vscroll from "../../components/vscroll/vscroll";
import qs from 'qs';       //引用qs模块
export default {
  name: "AddMember",
  //   注册
  components: {
    'v-scroll': Vscroll
  },
  //接收父组件传递的数据
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    // 联系人- 我的好友
    FriendsList: {
      type: Array,
      required: true,
    },
    // 联系人- 常用联系人列表
    FrequentlyUsedContactsList: {
      type: Array,
      required: true,
    },
    treeData: {//组织架构
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      filterText: '',
      // MainList: false,
      MainList: [],//调用滚动条区域 控制器
      scrollMainH: '',//可视区域元素 高度
      scrollContentH: '',//滚动区域元素 高度
      wrapdivs: ['scroll-main', 'scroll-main-content-list'],//联系人 可视区域元素id //滚动区域元素id 
      Organizationdivs: ['addlist-main-Organization-box', 'addlist-main-scrollmainOrganizationList'],//组织架构 可视区域元素id //滚动区域元素id 
      footerdivs: ['addlist-footer-box', 'addlist-footer-users-list-box'],//底部 可视区域元素id //滚动区域元素id 
      Mainitem: [],//我的好友列表 显示隐藏
      checkList: [],//联系人+ 架构 全部选中的值
      tabnum: 0,//tab切换
      TreeOldVal: [],// 纪录 tree 树前一次选中的值
      personnel: '',//查询关键字 
      defaultProps: {
        childrene: 'children',//子部门
        label: 'label',

      },
    }
  },
  //ChildDepts  SDeptName
  watch: {
    filterText(val) {
      console.log(val)
      if (val != '') {
        this.tabnum = 1;
      }
      this.OnTreesroll();
      this.$refs.tree.filter(val);
    },
    checkList(val, oldVal) {//监听 data里面  值的变化\
      //设置滚动比例  滚动条高度
      var is = false;
      console.log(val);
      console.log(oldVal);
      // checkList 长度超出20 旧值  第20条删除
      if (oldVal.length > 20) {
        oldVal.splice(20, 1);
      }
      if (val.length > 20) {
        // 超出 20 联系人 列表无法选中
        document.querySelector('#checkbox-' + val[20].id).checked = false;
        // checkList 长度超出20 新值  第20条删除
        // 弹出提示
        val.splice(20, 1)
        this.$message({
          message: '最多20人',
          type: "warning"
        });
        return;
      }
      if (oldVal.length > val.length) {
        oldVal.forEach((item, index) => {
          if (val != '' && val.length > 0) {
            try {
              val.forEach((ktem, kndex) => {
                if (item.id == ktem.id) {
                  is = false;
                  // 报错 跳出循环  执行下一条数据
                  var a = aaa;
                  throw new Error("ending");
                } else {
                  is = true;
                }
              })
            } catch (e) { }
            if (is) {
              this.$nextTick(() => {
                this.$refs.tree.setChecked(item.id, false);//获取已经设置的资源后渲染
              });
            }
          } else {
            this.$nextTick(() => {
              this.$refs.tree.setChecked(item.id, false);//获取已经设置的资源后渲染
            });
          }
        })

      } else {
        if (val != '' && val.length > 0) {
          val.forEach((item) => {
            // 选中的人 在联系人列表中存在 添加上选中状态
            if (document.querySelector('#checkbox-' + item.id)) {
              document.querySelector('#checkbox-' + item.id).checked = true;
            }
            this.$nextTick(() => {
              this.$refs.tree.setChecked(item.id, true);//获取已经设置的资源后渲染
            });
          })
        }

      }

    },
  },
  mounted() {
    //默认选中
    this.SelectedByDefault();
    // 联系人区域 滚动条 是否显示
    // this.OnScrollbar();

  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 联系人 那个列表显示 + 滚动条 是否符号显示条件
    OnClickMainList(e) {
      console.log(e);
      // 数组中是否包含某个值  包含返回下标 不包含返回 -1
      var index = this.Mainitem.indexOf(e);
      if (index != -1) {
        // 包含 根据返回的下标 删除
        this.Mainitem.splice(index, 1);
      } else {
        this.Mainitem.push(e);
      }
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 否则获取不到元素
      this.$nextTick(function () {
        //可视区域元素 高度
        this.scrollMainH = this.$refs.scrollMain.offsetHeight;
        //滚动区域元素 高度
        this.scrollContentH = this.$refs.scrollContent.offsetHeight;

        var kndex = this.MainList.indexOf('ContactPerson');
        // MainList中存在关键字ContactPerson 控制联系人区域滚动条 显示的关键字 滚动区域元素 高度 <= 可视区域元素 高度 删除数组中的ContactPerson
        if (kndex != -1) {
          if (this.scrollContentH <= this.scrollMainH) {
            this.MainList.splice(kndex, 1);
          }
        } else {
          //滚动区域元素 高度 > 可视区域元素 高度  如果没有 数组中没有控制联系人区域滚动条 显示的关键字 添加上ContactPerson
          if (this.scrollContentH > this.scrollMainH) {
            this.MainList.push('ContactPerson');
          }
        }
      })
    },
    //联系人 滚动 main区域 hover 模拟
    OnMainMouseHover(e) {
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 否则获取不到元素
      this.$nextTick(function () {
        //可视区域元素 高度
        this.scrollMainH = this.$refs.scrollMain.offsetHeight;
        //滚动区域元素 高度
        this.scrollContentH = this.$refs.scrollContent.offsetHeight;
        this.OnScrollbar(e, this.$refs.scrollMain.offsetHeight, this.$refs.scrollContent.offsetHeight);
      })
    },
    // 组织架构 滚动 main区域 hover 模拟
    OnOrganizationMouseHover(e) {
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 否则获取不到元素
      this.$nextTick(function () {
        //可视区域元素 高度
        this.scrollMainH = this.$refs.scrollmainOrganization.offsetHeight;
        //滚动区域元素 高度
        this.scrollContentH = this.$refs.scrollmainOrganizationList.offsetHeight;
        this.OnScrollbar(e, this.$refs.scrollmainOrganization.offsetHeight, this.$refs.scrollmainOrganizationList.offsetHeight)
      })
    },
    //  组织架构 滚动 main区域 鼠标 移出
    OnMoveout(e) {
      var kndex = this.MainList.indexOf(e);
      if (kndex != -1) {
        this.MainList.splice(kndex, 1);
      }
    },
    // 滚动 底部区域 选中的人员 hover 模拟
    OnFooterMouseHover(e) {
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 否则获取不到元素
      this.$nextTick(function () {
        //可视区域元素 高度
        this.scrollMainH = this.$refs.scrollFooter.offsetHeight;
        //滚动区域元素 高度
        this.scrollContentH = this.$refs.scrollFooterUserList.offsetHeight;
        this.OnScrollbar(e, this.$refs.scrollFooter.offsetHeight, this.$refs.scrollFooterUserList.offsetHeight);
      })
    },
    //联系人区域 滚动条 控制 
    OnScrollbar(e, miH, coH) {
      var kndex = this.MainList.indexOf(e);
      // 数组中是否包含某个值  包含返回下标 不包含返回 -1
      if (kndex != -1) {
        if (coH < miH) {
          this.MainList.splice(kndex, 1);
        }
      } else {
        //滚动区域元素 高度 > //可视区域元素 高度 
        if (coH > miH) {
          this.MainList.push(e);
        }
      }
    },
    // 将数据中 默认选中的数据 存入checkList
    SelectedByDefault() {
      this.FriendsList.forEach(item => {
        //是否有默认选中的
        // if (item.checked) {
        //   this.checkList.push({ id: item.id, label: item.label, img: '', phone: '' })
        // }
      })
    },
    // checkList 删除选中的人员 对应下标 数据
    OnSplicelist(index) {
      console.log(this.checkList[index]);
      this.setChecked(this.checkList[index].id);
      // 选中的人 在联系人列表中存在 移除选中状态
      if (document.querySelector('#checkbox-' + this.checkList[index].id)) {
        document.querySelector('#checkbox-' + this.checkList[index].id).checked = false;
      }
      this.checkList.splice(index, 1);
    },
    // 设置 树取消选中
    setChecked(id) {
      this.TreeOldVal.map((item, index) => {
        if (item.IsEmp && item.id == id) {
          this.TreeOldVal.splice(index, 1)
        }
      })
      console.log(this.TreeOldVal);
      this.$nextTick(() => {
        this.$refs.tree.setChecked(id);//获取已经设置的资源后渲染
      });
    },
    //   关闭添加成员框
    showAddlist() {
      let constraints = this.checkList;
      // 清空选中的
      this.checkList = [];
      // 将数据中 默认选中的重新 存入checkList
      this.SelectedByDefault();
      // 子组件向父组件传值$emit ,setup 父组件监听子组件的名称 控制隐藏
      this.$emit("setup", false, constraints);
    },


    //  确定
    Onsubmit() {
      console.group(this.treeData)
    },
    // 树 当前选中的节点 
    getNodeClick() {
      //  CheckedNodes 获取当前选中 tree 的值
      var CheckedNodes = this.$refs.tree.getCheckedNodes();
      var arrIsDept = [];
      if (CheckedNodes.length > 0) {
        if (CheckedNodes.length > 20) {
          //  旧值 与 新值 对比  返回 超出 多余的值的id
          var arr = this.getBeyondLen(this.TreeOldVal, CheckedNodes);
          //  console.log(arr);
          arr.forEach(item => {
            //  组织架构 设置选中状态为false 多余的无法选中 
            this.$refs.tree.setChecked(item, false);
          });
          // 弹出提示
          this.$message({
            message: '最多20人',
            type: "warning"
          });
          return;
        }
      }
      //删除 -  旧值 与 新值 对比 新值 中没有 旧值 中的id就是需要删除的对象
      this.getspliceList(this.TreeOldVal, CheckedNodes);
      // console.log(spliList);
      // 添加 - 旧值 与 新值 对比 旧值 中没有 新值 中的id就是需要添加的对象
      this.getAddcheckList(this.TreeOldVal, CheckedNodes);
      console.log(this.checkList);
      // 新值 存入 旧值
      this.TreeOldVal = CheckedNodes;
      console.log(this.TreeOldVal);

    },
    // 添加
    getAddcheckList(OldVal, CheckedNodes) {
      var add = [];
      var is = false;
      console.log(OldVal);
      console.log(CheckedNodes);
      //  新值 长度 大于0 执行
      if (CheckedNodes.length > 0) {
        // 旧值 长度 大于0 执行 否则直接 取新值内容 并且验证 选中后的checkList数据容器 是否有值 有值 判断id不等于的添加  无值直接取新值内容
        if (OldVal.length > 0) {
          // checkList数据容器  有值 判断id不等于的添加  无值直接取新值内容
          if (this.checkList.length > 0) {
            // OldVal旧值 与 CheckedNodes新值 对比 旧值 中没有 新值 中的id就是需要添加的对象 差异存入arr
            for (let j in CheckedNodes) {
              if (CheckedNodes[j].IsEmp) {
                try {
                  OldVal.forEach((item, index) => {
                    if (CheckedNodes[j].id == item.id) {
                      is = false;
                      // 报错 跳出循环  执行下一条数据
                      var a = aaaa;
                      throw new Error("ending");
                    } else {
                      is = true;
                    }
                  })
                } catch (e) { }
                if (is) {
                  // OldVal旧值 与 CheckedNodes新值 差异存入arr
                  add.push(CheckedNodes[j])
                }
              }
            };
            console.log(add)
            is = false
            // 差异arr 与 checkList数据容器 判断id不等于的添加
            for (let y in add) {
              try {
                this.checkList.forEach((item, index) => {
                  if (add[y].id == item.id) {
                    is = false;
                    // 报错 跳出循环  执行下一条数据
                    var a = aaaa;
                    throw new Error("ending");
                  } else {
                    is = true;
                  }
                })
              } catch (e) { }
              if (is) {
                this.checkList.push(add[y])
              }
            }

          } else {
            CheckedNodes.map(item => {
              if (item.IsEmp) {
                this.checkList.push(item);
                //     this.checkList.push({id:item.id, label:item.label, img:item.img, phone:item.id,});
              }
            })

          }
        } else {
          // 旧值 长度 小于0  直接 取新值内容 并且验证 选中后的checkList数据容器 是否有值 有值 判断id不等于的添加  无值直接取新值内容
          is = false;
          CheckedNodes.forEach((item, index) => {
            // item.IsEmp true 为员工
            if (item.IsEmp) {
              // TreeOldVal 直接 取新值内容
              this.TreeOldVal.push(item);
              // checkList数据容器 是否有值 有值 判断id不等于的添加  无值直接取新值内容
              if (this.checkList.length > 0) {
                try {
                  this.checkList.forEach((ktem, kndex) => {
                    if (ktem.id == item.id) {
                      is = false;
                      // 报错 跳出循环  执行下一条数据
                      var a = aaaa;
                      throw new Error("ending");
                    } else {
                      is = true;
                    }
                  })
                } catch (e) { }
                if (is) {
                  this.checkList.push(item);
                }
              } else {
                this.checkList.push(item);
              }
            }
          })
        }
      } else {
        console.log(this.checkList)
        return;
      }
    },
    // 需要删除的值
    getspliceList(OldVal, CheckedNodes) {
      var spl = [];
      var is = false;
      // 无 OldVal 旧值 说明是添加 直接 return 函数不往下执行
      if (OldVal.length > 0) {
        // CheckedNodes 新值为空 说明之前选中的值 全部不选中了 spl取 OldVal 旧值 差异为全部旧值都需要删除处理
        if (CheckedNodes.length > 0) {
          for (let i in OldVal) {
            try {
              CheckedNodes.forEach((item, index) => {
                if (item.IsEmp && OldVal[i].id == item.id) {
                  is = false;
                  // 报错 跳出循环  执行下一条数据
                  var a = aaaa;
                  throw new Error("ending");
                } else {
                  is = true;
                }
              })
            } catch (e) {

            };
            if (is) {
              spl.push(OldVal[i])
            }
          };

        } else {
          spl = OldVal;
        }
      } else { return; }
      console.log(spl);
      // 需要删除的值 与  checkList数据容器对比 需要删除的值id在checkList中存在 删除 容器中的对应数据 利用try报错机制跳出循环 执行下一个需要删除的id
      for (let k in spl) {
        try {
          this.checkList.forEach((item, index) => {
            if (spl[k].IsEmp && spl[k].id == item.id) {
              this.checkList.splice(index, 1)
              // 报错 跳出循环  执行下一条数据
              var a = aaaa;
              throw new Error("ending");
            }
          })
        } catch (e) {

        };

      }
      console.log(this.checkList)
    },
    // 返回 超出 20 长度 多余的值
    getBeyondLen(OldVal, CheckedNodes) {
      var add = [];
      var is = [];
      // OldVal旧值 与 CheckedNodes新值 对比 旧值 中没有 新值 中的id就是需要添加的对象 差异存入arr
      for (let j in CheckedNodes) {
        try {
          OldVal.forEach((item, index) => {
            if (CheckedNodes[j].id == item.id) {
              is = false;
              // 报错 跳出循环  执行下一条数据
              var a = aaaa;
              throw new Error("ending");
            } else {
              is = true;
            }
          })
        } catch (e) { }
        if (is) {
          add.push(CheckedNodes[j].id)
        }
      };
      return add;
    },
    // 树 点击展开 关闭
    handleNodeClick(data) {
      // console.log(data);
      let that = this;
      // 内容区域 高度 是否超出 滚动条 是否可见 设置滚动比例  滚动条高度
      setTimeout(function () {
        that.OnTreesroll();
      }, 1000);
    },
    // 内容区域 高度 是否超出 滚动条 是否可见 设置滚动比例  滚动条高度 并且根据scrollContentH 滚动区域元素 高度 发生变化 传入 子组件（滚动条组件）子组件设置滚动条高度及滚动比例
    OnTreesroll() {
      // $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调 否则获取不到元素
      this.$nextTick(function () {
        //可视区域元素 高度
        this.scrollMainH = this.$refs.scrollmainOrganization.offsetHeight;
        //滚动区域元素 高度
        this.scrollContentH = this.$refs.scrollmainOrganizationList.offsetHeight;
        var kndex = this.MainList.indexOf('Organization');
        // MainList中存在关键字ContactPerson 控制联系人区域滚动条 显示的关键字 滚动区域元素 高度 <= 可视区域元素 高度 删除数组中的ContactPerson
        if (kndex != -1) {
          if (this.scrollContentH <= this.scrollMainH) {
            this.MainList.splice(kndex, 1);
          }
        } else {
          //滚动区域元素 高度 > 可视区域元素 高度  如果没有 数组中没有控制联系人区域滚动条 显示的关键字 添加上ContactPerson
          if (this.scrollContentH > this.scrollMainH) {
            this.MainList.push('Organization');
          }
        }
      })
    }
    /* 点击checkbox时触发方法，多选组时调用父组件的增加和删除方法，单独复选框时设置值和清除值 */
    // checkChange(e){
    //     console.log(e);
    //     // 是否选中
    //     console.log(e.target.checked);
    //     // 选中的value
    //     console.log(e.target.value);
    // }
  },
  // 销毁前状态
  beforeDestroy() {
    this.showAddlist();
    console.group("beforeDestroy 销毁前状态===============》");
  },
}
</script>
<style scoped>
@import "../../assets/css/AddMember.css";
</style> 
<style lang='scss' scoped>
</style>
 

