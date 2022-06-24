<template>
  <div class="personalinfo-wrapper">
    <div class="personalinfo-header gg-flex-3">
      <img draggable="false" src="../assets/images/login_quit.png" class="personalinfo-header-quit" @click="hidePersonalInfo" alt="">
    </div>

    <div class="personalinfo-main gg-flex-1 gg-flex-2" v-if="info&&user">
      <div class="personalinfo-main-icon-box ">
        <img draggable="false" :src="info.Avatar" class="personalinfo-main-icon " alt="">
      </div>
      <div class="personalinfo-main-name">{{info.Name}}</div>
      <div class="personalinfo-main-contactDetails gg-flex-3" v-if="info.Id==user.Id">
        <div class="personalinfo-main-contactDetails-phone-box  gg-flex-1">
          <img draggable="false" class="personalinfo-main-contactDetails-phone-icon" src="../assets/images/info-phone.png" alt="">
          <div class="personalinfo-main-contactDetails-name">{{info.Mobile}}</div>
        </div>
        <div class="personalinfo-main-contactDetails-separation"></div>
        <div class="personalinfo-main-contactDetails-email-box   gg-flex-1">
          <img draggable="false" class="personalinfo-main-contactDetails-email-icon" src="../assets/images/mail.png" alt="">
          <div class="personalinfo-main-contactDetails-name" v-if=" info.Email!=''">{{info.Emai}}</div>
           <div class="personalinfo-main-contactDetails-name" v-if="info.Email==''">
             <el-input @input="changeEmail" type="text" v-model="Email"   placeholder="点击编辑邮箱">
            </el-input>
           </div>
        </div>
      </div>

      <div class="personalinfo-main-info gg-flex-1 gg-flex-2" v-if="info.Staffs.length>0">
        <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Name</div>
          <div class="personalinfo-main-info-item-val">{{info.Staffs[0].Name}}</div>
        </div>
        <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Position</div>
          <div class="personalinfo-main-info-item-val">{{info.Staffs[0].JobTitle}}</div>
        </div>
        <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Company email</div>
          <div class="personalinfo-main-info-item-val">{{info.Staffs[0].Email}}</div>
        </div>
        <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Job No</div>
          <div class="personalinfo-main-info-item-val">{{info.Staffs[0].No}}</div>
        </div>
        <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">structure</div>
          <div class="personalinfo-main-info-item-val" :title="info.Staffs[0].Departments[0].LevelInfo">{{info.Staffs[0].Departments[0].LevelInfo}}</div>
        </div>
         <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Direct supervisor</div>
          <div class="personalinfo-main-info-item-val">{{info.Staffs[0].Leader.Name?info.Staffs[0].Leader.Name:''}}</div>
        </div>
         <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Star leve</div>
          <div class="personalinfo-main-info-item-val gg-flex-3" >
            <!-- v-if="info.Staffs[0].ExtendProps[0].Value!=''" -->
            <img draggable="false" class="personalinfo-main-info-item-val-icon"  :key="index" v-for="(item,index) in (info.Staffs[0].ExtendProps[0].Value.length)"  src="../assets/images/star_green.png" alt="">
            <img draggable="false" class="personalinfo-main-info-item-val-icon" :key="index" v-for="(item,index) in (5-info.Staffs[0].ExtendProps[0].Value.length)" src="../assets/images/star_gray.png" alt="">
           
            <!-- <img draggable="false" class="personalinfo-main-info-item-val-icon" src="../assets/images/star_green.png" alt=""> -->
            <!-- <img draggable="false" class="personalinfo-main-info-item-val-icon" src="../assets/images/star_gray.png" alt="">
            <img draggable="false" class="personalinfo-main-info-item-val-icon" src="../assets/images/star_gray.png" alt=""> -->
          </div>
        </div>
         <div class="personalinfo-main-info-item gg-flex-3">
          <div class="personalinfo-main-info-item-title">Place of work</div>
          <div class="personalinfo-main-info-item-val">{{info.Staffs[0].ExtendProps[1].Value!=''?info.Staffs[0].ExtendProps[1].Value:''}}</div>
        </div>

      </div>
       

    </div>

  </div>

</template>
<script>
import services from '../../static/utils/services'
// import utils from '../../static/utils/utils'

// import filter from '../../static/utils/filter'
// var htmlOverviewMsgTemp = filter.htmlOverviewMsgTemp();
export default {
  name: 'PersonalInfo',
  // props: {
  //   info: {
  //     default: ''
  //   },
  //   user:{
  //      default: ''
  //   }
  // },

  data() {
    return {
      info:null,
      user:null,
    };
  },
  watch: {

  },
  mounted() {
     
    
    // console.log(this.user,this.info)
    // this.$refs.editDiv.focus();
    this.init();
  },

  methods: {
    init(){
      // 对方的个人信息
       this.info=services.concatService.getUserDetail(JSON.parse(this.$route.query.params).infoId);
      //  自己的个人信息
       this.user=services.webConfig.getUser();
        console.log(JSON.parse(this.$route.query.params))
        console.log(this.user,this.info)
        // this.info=JSON.parse(this.$route.query.params).info;
        // this.user=JSON.parse(this.$route.query.params).user;
    },
    // 关闭窗口
    hidePersonalInfo(){
      // this.$emit('change-Hidetype',)
    },
    changeEmail(val){
      console.log(val)
    },
  }
};
</script>

<style scoped>
@import "../assets/css/PersonalInfo.css";
</style>
