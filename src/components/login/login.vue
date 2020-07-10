<template>
  <div id="login" style="">

      <div class="main-content" style="" >

        <div class="main-title" style="">
          <span>账号/手机/邮箱登录</span>
        </div>

        <div class="main-account" style="">
          <input class="input-account" type="text" placeholder="请输入账号/手机/邮箱" style="" v-model="username" />
        </div>

        <div class="main-password" style="">
          <input class="input-password" type="password" placeholder="请输入密码" style="" v-model="password" />
        </div>

        <div class="main-login" style="" >
          <span class="span-login" style="" @click="userLogin" >登录</span>
        </div>

        <div class="main-forget" style="">
          <span class="span-forget" style="" >忘记密码？</span>
        </div>

      </div>

  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';

window.storage = storage;

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "登录",
            momentNewMsg: true,
            customActiveKey: "tab1",
            loginInfo:{},
            username:'',
            password:'',
        }
    },
    activated() {
      this.$store.commit("toggleTipsStatus", -1);
      this.changeStyle();
      this.displayFoot();
    },
    mounted() {
      this.changeStyle();
      this.displayFoot();
    },
    methods:{
      changeStyle(){

      },
      displayFoot() {
        $('.app-footer').css('display','none');
      },
      async userLogin(){
        //检查用户是否存在
        let vuser = '';
        if(tools.isNull(this.username)){
          vant.Toast('请输入账号/手机/邮箱登录！');
        } else if(tools.isNull(this.password)){
          vant.Toast('请输入密码！');
        } else if(tools.isNull(vuser)){
          vant.Toast('此账户不存在！');
        } else {
          storage.setStore('username' , 'zhaoziyu' , 1000);
          let username = storage.getStore('username');
          console.log(username);
          debugger;
        }
      },
      checkTel(){

      },
      toForgetPassword(){

      },
      toRegister(){

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

.weui-cell-title {
  margin-left: 20px;
  margin-top: 2px;
  padding-top: 4px;
  border: 0px solid #fefefe;
  width: 100px;
  font-size: 16px;
}

#login {
  background:#fefefe;height:100%;
}

#search {
  display:none;
}

.app-footer {
  display:none;
}

.main-content {
  background:#fefefe;
  height:1000px;
  margin-top:-30px;
}

.main-title {
  text-align:left;
  width:100%;
  height:50px;
  margin-top:100px;
  background:#fefefe;
  margin-left:35px;
  font-size:18px;
}

.main-account {
  text-align:center;
  width:100%;
  height:50px;
  margin-top:0px;
  background:#fefefe;
}

.input-account {
  text-align:left;
  width:80%;
  height:50px;
  border:0px solid #fefefe;
  border-bottom: 1px solid #cecece;
}

.main-password {
  text-align:center;
  width:100%;
  height:50px;
  margin-top:0px;
  background:#fefefe;
}

.input-password {
  text-align:left;
  width:80%;
  height:50px;
  border:0px solid #fefefe;
  border-bottom: 1px solid #cecece;
}

.main-login {
  text-align:center;
  width:100%;
  height:60px;
  margin-top:0px;
  background:#fefefe;
}

.span-login {
  text-align:center;
  border-radius:8px;
  border:1px solid #cecece;
  height:40px;
  margin:10px 10px;
  display:inline-block;
  width:80%;
  padding: 10px 35%;
  margin-top: 30px;
}

.main-forget {
  text-align:center;
  width:100%;
  height:60px;
  margin-top:0px;
  background:#fefefe;
}

.span-forget {
  text-align:center;
  border-radius:8px;
  border:0px solid #cecece;
  height:40px;
  margin:10px 10px;
  display:inline-block;
  width:80%;
  padding: 10px 10px;
  margin-top: 15px;
  color: #aeaeae;
}

.app-content {
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 1;
    padding-bottom: 49px;
    width: 100%;
    background-color:#fefefe;
}
</style>
