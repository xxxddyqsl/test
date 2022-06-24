<template>
  <div class="addressBook-wrapper gg-flex-3">
    <div class="addressBook-left">
      <el-scrollbar style="height:100%">
        <!-- 内部div -->
        <!-- 我的好友 -->
        <div class="addressBook-left-item">
          <el-tree :props="props" :load="loadChildrenNode" lazy icon-class="none" @node-click="handleNodeClick">
            <span class="custom-tree-node gg-flex-3" slot-scope="{ node, data }">
              <!-- {{node.expanded}} 展开 true  收起false -->
              <!-- data.Children 三角形icon 有子节点显示  :class="data.Avatar!=undefined?:'cccc':''"-->
              <img draggable="false" class='triangle-icon' v-if="typeof data.Children !='undefined'" :style="node.expanded?' transform: rotate(90deg)':'' " src="../assets/images/triangle-icon.png" alt="">
              <!-- 个人头像 -->
              <img draggable="false" class='addressBook-left-item-icon' v-if="data.Avatar!=undefined" :src="data.Avatar" alt="">
              <span class="addressBook-left-item-title fontSize14" :title='node.label || "-"'>{{node.label}}</span>
            </span>
          </el-tree>
        </div>

        <div class="addressBook-left-item">
          <el-tree :props="props" :load="loadChildrenNodeCompany" lazy icon-class="none" @node-click="handleNodeClick">
            <span class="custom-tree-node gg-flex-3" slot-scope="{ node, data }">
              <!-- {{node.expanded}} 展开 true  收起false -->
              <!-- data.Children 三角形icon 有子节点显示  :class="data.Avatar!=undefined?:'cccc':''"-->
              <img draggable="false" class='triangle-icon' v-if="typeof data.Children!='undefined'" :style="node.expanded?' transform: rotate(90deg)':'' " src="../assets/images/triangle-icon.png" alt="">
              <!-- 个人头像 -->
              <img draggable="false" class='addressBook-left-item-icon' v-if="data.Avatar!=undefined" :src="data.Avatar" alt="">
              <span class="addressBook-left-item-title fontSize14" :title='node.label || "-"'>{{node.label}}</span>
            </span>
          </el-tree>
        </div>
      </el-scrollbar>

    </div>

    <div class="addressBook-right">
      <!-- 默认 -->
      <div class="addressBook-right-default gg-flex-1 gg-flex-2" v-if="!isDepartment&&!isChooser">
        <img draggable="false" class='addressBook-default-icon' src="../assets/images/image-nothing.png" alt="">
      </div>
      <!-- 选中 部门 -->
      <div class="addressBook-right-department gg-flex-3 gg-flex-2" v-if="isDepartment">
        <div class="addressBook-right-department-header gg-flex-1">
          <span>Snail Inc</span>
        </div>
        <div class="addressBook-right-department-main gg-flex-3 gg-flex-2">
          <div class="addressBook-right-department-main-title">SnailMobile </div>
          <div class="addressBook-right-department-main-section gg-flex-1">
            <div class="addressBook-right-department-main-Manage gg-flex-1 gg-flex-2">
              <img draggable="false" class='addressBook-right-department-main-Manage-icon' src="../assets/images/manage.png" alt="">
              <div class='addressBook-right-department-main-Manage-title'>Manage</div>
              <div class='addressBook-right-department-main-Manage-name'>name</div>
            </div>
            <div class="addressBook-right-department-main-Manage gg-flex-1 gg-flex-2">
              <img draggable="false" class='addressBook-right-department-main-Manage-icon' src="../assets/images/lead.png" alt="">
              <div class='addressBook-right-department-main-Manage-title'>Lead</div>
              <div class='addressBook-right-department-main-Manage-name'>CEO Chen</div>
            </div>
            <div class="addressBook-right-department-main-Manage gg-flex-1 gg-flex-2">
              <img draggable="false" class='addressBook-right-department-main-Manage-icon' src="../assets/images/personnel.png" alt="">
              <div class='addressBook-right-department-main-Manage-title'>Personnel</div>
              <div class='addressBook-right-department-main-Manage-name'>156</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 选中 人 -->
      <div class="addressBook-right-Chooser gg-flex-3 gg-flex-2" v-if="isChooser">
        <div class="addressBook-right-Chooser-header gg-flex-1 gg-flex-2">
          <img draggable="false" class='addressBook-right-Chooser-icon' src="../assets/images/women.png" alt="">
          <div class='addressBook-right-Chooser-name'>Lumir Sacharov</div>
          <div class='addressBook-right-Chooser-company'>Snail Inc</div>
        </div>
        <div class="addressBook-right-Chooser-main  gg-flex-3 gg-flex-2">
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Name</div>
            <div class="addressBook-right-Chooser-main-item-val">Name</div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Position</div>
            <div class="addressBook-right-Chooser-main-item-val">Product Manager - free store</div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Company email</div>
            <div class="addressBook-right-Chooser-main-item-val">hejl@mysnail.com</div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Job No</div>
            <div class="addressBook-right-Chooser-main-item-val">Wn4885</div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">structure</div>
            <div class="addressBook-right-Chooser-main-item-val">Snail company / snail game / app R</div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Direct supervisor</div>
            <div class="addressBook-right-Chooser-main-item-val">Zhaoyaming</div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Star leve</div>
            <div class="addressBook-right-Chooser-main-item-val  gg-flex-3">
              <img draggable="false" class="addressBook-right-main-item-val-icon" src="../assets/images/star_green.png" alt="">
              <img draggable="false" class="addressBook-right-main-item-val-icon" src="../assets/images/star_green.png" alt="">
              <img draggable="false" class="addressBook-right-main-item-val-icon" src="../assets/images/star_green.png" alt="">
              <img draggable="false" class="addressBook-right-main-item-val-icon" src="../assets/images/star_gray.png" alt="">
              <img draggable="false" class="addressBook-right-main-item-val-icon" src="../assets/images/star_gray.png" alt="">
            </div>
          </div>
          <div class="addressBook-right-Chooser-main-item gg-flex-3">
            <div class="addressBook-right-Chooser-main-item-title">Place of work</div>
            <div class="addressBook-right-Chooser-main-item-val">171</div>
          </div>
        </div>
        <div class="addressBook-right-Chooser-footer  gg-flex-1">
          <div class="addressBook-right-Chooser-footer-ChatNow  gg-flex-1" @click="goChat"><span>Chat Now</span></div>
        </div>

      </div>

    </div>

  </div>

</template>
<script>
// import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'addressBook',
  components: {
  },
  props: {

  },

  data() {
    return {
      // 选择 部门
      isDepartment: false,
      // 选择 人
      isChooser: false,
      props: {
        label: 'Name',
        // children: 'Children',
        isLeaf: (data, node) => {
          console.log('data==>', data, node)
          // 是否有 子节点 并且是否可以展开 
          if (typeof data.Children != 'undefined') {
            //   console.log(1111) 展开
            return false;
          } else {
            //   console.log(22222) 禁止展开
            return true;
          }
        },
        // label: 'Name',
        // children: 'zones',
        // isLeaf: 'leaf',//'leaf'---是否叶子节点，true是叶子节点，不显示下拉框；false非叶子节点，显示下拉框
      },
    };
  },
  watch: {

  },
  mounted() {
    //  console.log(this.$route.query.params)
    // this.$refs.editDiv.focus();
    // 将事件侦听器函数附加到窗口的resize事件  通过实时监听页面宽度高度 变化 来实时监听 div高度 赋值给树-滚动条
    window.addEventListener("resize", this.displayWindowSize);
    //  调用该函数
    this.displayWindowSize();
    //实时监听div高度 赋值给树-滚动条
    this.displayMutation();
  },

  methods: {
    hideHistory() {
      this.$emit('',)
    },
    handleNodeClick(data, node, el) {
      // 当前点击的节点 没有子节点的 添加选中class
      if( data.CompanyId ){
          this.isDepartment = true;
        this.isChooser = false;
      }else{
         this.isDepartment = false;
      }
      if( typeof data.CompanyId == 'undefined' && data.Id){
        this.isDepartment = false;
        this.isChooser = true;
      }
      if( typeof data.CompanyId == 'undefined' && typeof data.Id == 'undefined'){
        this.isDepartment = false;
        this.isChooser = false;
      }
      this.$nextTick(() => {
        // 当前页面是否存在 checked_active 添加选中class名 去除选中class名 当前节点添加选中class名
        if (document.getElementsByClassName('checked_active').length > 0) {
          document.getElementsByClassName('checked_active')[0].classList.remove("checked_active");
        }
        el.$el.classList.add('checked_active');
      })
      //   console.log(data, node, el)
    },
    async loadChildrenNode(node, resolve) {
      if (node.level === 0) {
        //第一级
        return resolve([{ Name: 'Friends', Children: [] }]);
      }
      console.log(node)
      //获取节点树的子节点
      //   if (node.level > 1) {
      //       console.log(this.getChildrenNode(node, resolve))
      //         resolve(this.getChildrenNode(node, resolve)) 
      //     // this.getChildrenNode(node, resolve)
      //   }
      // if (node.level > 1) return resolve([]);
      // 等待异步返回数据
      let treeData = await this.getChildrenNode();
      console.log('data', treeData)
      // 渲染树
      resolve(treeData);
    },
    // 进入聊天
    goChat() {
      let key='chat'
      let id='5bfcdc99aa55498aa1c5da6be672c136';
      // 向父组件传递了两个值
    this.$emit('currentToggle', key,id);
    },
    getChildrenNode() {
      var data;
      return new Promise((resolve) => {
        setTimeout(() => {
          //    data = [{ 
          //   Name: 'leaf',
          //   leaf: false,
          // }, {
          //   Name: 'zone',
          //   leaf: true,
          // }];
          data = [{
            Avatar: require("D:/JJPC/img/HeadImg/man.png"),
            IMStatus: 1,
            Id: "5bfcdc99aa55498aa1c5da6be672c136",
            Name: "123",
            NickName: "22",
            Privacies: null,
            ShowCompany: 0,
            Status: 0,
          }, {
            Avatar: require("D:/JJPC/img/HeadImg/9cdc4ff8da8b4b9987f5b806ce9a1a62.png?_=1654841670597"),
            IMStatus: 1,
            Id: "9cdc4ff8da8b4b9987f5b806ce9a1a62",
            Name: "yhh",
            NickName: "33",
            Privacies: null,
            ShowCompany: 0,
            Status: 0,
          }];
          // return data;
          resolve(data);
          console.log('data', data)
        }, 500);
      })

    },
    async loadChildrenNodeCompany(node, resolve) {
      if (node.level === 0) {
        //第一级
        return resolve([{ Name: '蜗牛公司', Id: "BB60A0D78C66403CB1F161B70E54F682",CompanyId:'ff808081581b3e2801581b47dd4e0000', Children: [] }]);
      }
      console.log(node.data.Id)
      //获取节点树的子节点
      //   if (node.level > 1) {
      //       console.log(this.getChildrenNode(node, resolve))
      //         resolve(this.getChildrenNode(node, resolve)) 
      //     // this.getChildrenNode(node, resolve)
      //   }
      // if (node.level > 1) return resolve([]);
      // 等待异步返回数据
      let treeData = await this.getCompany(node.data.Id);
      console.log('data', treeData)
      // 渲染树
      treeData != null ? resolve(treeData) : resolve([]);
    },
    getCompany(Id) {
      var data = null;
      return new Promise((resolve) => {

        setTimeout(() => {
          if (Id == "BB60A0D78C66403CB1F161B70E54F682") {
            data = [{
              AllStaffCount: null,
              Children: null,
              CompanyId: "ff808081581b3e2801581b47dd4e0000",
              Director: null,
              Id: "5e2492291f034ba7b20f2caeaf23a7c0",
              IsMain: 0,
              Leader: null,
              LevelInfo: "蜗牛公司\蜗牛游戏",
              Name: "蜗牛游戏",
              Staffs: null,
            }, {
              AllStaffCount: null,
              Children: null,
              CompanyId: "ff808081581b3e2801581b47dd4e0000",
              Director: null,
              Id: "f9732f48918340c0ae2f96ec902316c3",
              IsMain: 0,
              Leader: null,
              LevelInfo: "蜗牛公司\蜗牛移动",
              Name: "蜗牛移动",
              Staffs: null,
            }];
          }
          if (Id == "5e2492291f034ba7b20f2caeaf23a7c0") {
            data = [{
              AllStaffCount: null,
              Children: null,
              CompanyId: "ff808081581b3e2801581b47dd4e0000",
              Director: null,
              Id: "60cc63b8cd5a4d6aa78ea10261a8c92b",
              IsMain: 0,
              Leader: null,
              LevelInfo: "蜗牛公司\蜗牛游戏\管理架构\管理\IT中心",
              Name: "IT中心",
              Staffs: null
            }];
          }
          if (Id == "60cc63b8cd5a4d6aa78ea10261a8c92b") {
            data = [{
              AllStaffCount: null,
              Children: null,
              CompanyId: "ff808081581b3e2801581b47dd4e0000",
              Director: null,
              Id: "1d5792a38bf64834b12b70c9f8e7d92a",
              IsMain: 0,
              Leader: null,
              LevelInfo: "蜗牛公司\蜗牛游戏\管理架构\管理\IT中心\静静办公",
              Name: "静静办公",
              Staffs: null,
            }];
          }
           if (Id == "1d5792a38bf64834b12b70c9f8e7d92a") {
            data = [{
             Avatar: require("D:/JJPC/img/HeadImg/1130b4ea7eb74fd5b5b1f23994925ef5.png?_=1655529713367"),
            Company: null,
            Departments: null,
            Email: "lvxl@mysnail.com",
            ExtNo: "",
            ExtendProps: [],
            ExtendPropsAfterName: ["★★"],
            IMStatus: 1,
            Id: "1130b4ea7eb74fd5b5b1f23994925e",
            JobTitle: "IT高级经理",
            Leader: null,
            Name: "吕小龙",
            No: "WN2557",
            Status: 0,
            Type: 0,
            UserId: "1130b4ea7eb74fd5b5b1f23994925ef5",
            }];
          }
          // return data;
          resolve(data);
          console.log('data', data)
        }, 500);
      })

    },
    displayMutation(){
      let that=this;
       //获取监听的dom元素
    // let box = document.querySelector('.addressBook-left');
    let box = document.querySelector('.addressBook-wrapper');
    //配置选项 观察器所能观察的DOM变动类型（即下面代码的options对象），有以下几种：
    // childList：子节点的变动。
    // attributes：属性的变动。
    // characterData：节点内容或节点文本的变动。
    // subtree：所有后代节点的变动。
    let options = { attributes: true, childList: true, subtree: true };
    //实时 监听 dom 变化 MutationObserver构造函数 当DOM发生变动，会触发Mutation Observer
    let observer = new MutationObserver(function (mutations, observer) {
        //  //返回元素的高度（包括元素高度、内边距和边框，不包括外边距）
        that.$nextTick(()=>{
          document.querySelector('.addressBook-left').style.height = box.offsetHeight+'px';
        })
        // console.log(mutations[0].target.offsetHeight)
        // console.log(mutations,observer)
    });
    // 元素存在时
    if (box) {
        //开始观测
        observer.observe(box, options);
    }
    },
    displayWindowSize(){
       let box = document.querySelector('.addressBook-wrapper');
        this.$nextTick(()=>{
          document.querySelector('.addressBook-left').style.height = box.offsetHeight+'px';
        })
    },
  },
   // 销毁前状态
  beforeDestroy() {
    window.removeEventListener("resize", this.displayWindowSize);
    // console.group("beforeDestroy 销毁前状态 LogDetails===============》");
  },
  destroyed() {
    // console.group("destroyed 销毁完成状态 LogDetails===============》");
  }
};
</script>

<style scoped>
@import "../assets/css/addressBook.css";
.addressBook-left-item-title {
  height: 21px;
  font-size: 16px;
  font-family: "Futura-Medium, Futura";
  font-weight: 500;
  color: #070e0b;
  line-height: 21px;
  margin: 0 24px 0 12px;
}
/* //css样式代码  */
.el-tree {
  min-width: 100%;
  display: inline-block;
  /* margin-right: 20px; */
  max-height: 200px;
  background: transparent;
}
/* .tree {
  overflow: auto;
  background: transparent;
} */
.el-tree /deep/ .el-tree-node__content {
  height: 70px;
  /* background: #F6F7F8; */
  /* padding-left: 24px !important; */
  border-bottom: 1px solid #eaedef;
}
.el-tree /deep/ .el-tree-node__content > .el-tree-node__expand-icon {
  padding: 6px;
  padding-left: 24px;
}
/* 隐藏原生的横向滚动条 */
.addressBook-left /deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-tree /deep/ .checked_active > .el-tree-node__content {
  background: #ffffff !important;
}
</style>

