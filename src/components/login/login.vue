<template>
  <div id="app">

  </div>
</template>
<script>
    export default {
        mixins: [window.mixin],
        data() {
            return {
                pageName: "登录",
                momentNewMsg: true,
                customActiveKey: "tab1",
                loginInfo:{},
            }
        },
        activated() {
          this.$store.commit("toggleTipsStatus", -1);
          this.changeStyle();
        },
        mounted() {
          this.changeStyle();
        },
        methods:{
          changeStyle(){

          },
          userLogin(){
            console.log(this.loginInfo)
            api.login({...this.loginInfo}).then(res=>{
              if(res.code===1){
            this.background("success",res.message);
            localStorage.setItem('token',res.data)
              }else{
            this.background("error",res.message);
              }
            })
          },
          checkTel(){
            api.checkTel(this.loginInfo.phone).then(res=>{
              if(res.code===2){
                this.background("error",res.message);
              }
            })
          },
          toForgetPassword(){
            this.$router.push('/forgetPassword')
          },
          toRegister(){
            this.$router.push('/register')
          },
          background(type,msg) {
            //提示信息
            this.$Message[type]({
              background: true,
              content: msg
            });
          },
        }
    }
</script>
<style>
    @import "../../assets/css/explore.css";

    .weui-cell-title{
      margin-left: 20px;
      margin-top: 2px;
      padding-top: 4px;
      border: 0px solid #fefefe;
      width: 100px;
      font-size: 16px;
    }

    #search {
      display:none;
    }

    .app-footer {
      display:none;
    }

    .ant-form {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgba(0,0,0,.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      font-feature-settings: "tnum";
    }

    .ant-tabs {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        overflow: hidden;
        zoom: 1;
    }

    .personal .personal-c {
      width: 660px;
      margin: 0 auto;
    }

    .personal .personal-c .head {
      height: 186px;
    }

    .personal .personal-c .avatar {
      width: 200px;
      height: 72px;
      margin: 0 auto;
      padding-top: 128px;
      background:  no-repeat center;
      background-size: contain;
    }

    .personal .personal-c  .main {
      width: 100%;
      overflow: hidden;
    }

    .personal .personal-c .tips {
      overflow: hidden;
    }

    .personal .personal-c  span {
      float: left;
      width: 132px;
      height: 62px;
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 62px;
      color: rgba(21, 21, 21, 1);
      opacity: 1;
      margin-bottom: 36px;
    }

    .personal .personal-c .main-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .personal .personal-c span {
      width: 196px;
      height: 40px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 30px;
      color: rgba(21, 21, 21, 1);
      opacity: 1;
    }

    .personal .personal-c span:last-child {
      width: 168px;
      height: 40px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 30px;
      color: rgba(126, 126, 126, 1);
      opacity: 1;
    }

    .form  .ivu-input {
      height: 102px;
      margin: 14px 0px;
      font-size: 28px;
      padding-left: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(126, 126, 126, 1);
    }

    .personal .personal-c .ivu-input-suffix {
      width: 170px;
      display: block;
      line-height: 120px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(21, 21, 21, 1);
    }

    .personal .personal-c .ivu-input-suffix i{
      display: inline-block;
      font-size:66px;
      margin-top: 50px;
    }

    .personal .personal-c .btn {
      margin-top: 29px;
      overflow: hidden;
    }

    .personal .personal-c .ivu-btn-success {
      background-image: linear-gradient(to right, #648324, #7ba22b);
      border: none;
      height: 102px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      opacity: 1;
    }

    .personal .personal-c .clickRegister {
      height: 40px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 44px;
      color: rgba(56, 170, 253, 1);
      opacity: 1;
      float: right;
      margin-top: 36px;
    }

    .personal .personal-c .tel {
      overflow: hidden;
      margin: 0 auto;
      margin-top: 492px;
    }

    .personal .personal-c span:first-child {
      font-size: 28px;
      color: #151515;
    }

    .personal .personal-c span {
      width: 308px;
      height: 85px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 44px;
      color: rgba(56, 170, 253, 1);
      opacity: 1;
    }

</style>
