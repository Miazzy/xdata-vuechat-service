<template>
  <!--我 组件-->
  <div id="self">
    <div class="weui-tab__content" style="display: block;">
      <div class="weui-cells">
        <router-link to="/self/profile" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img :src="avatar" alt="" class="self-header">
          </div>
          <div class="weui-cell__bd">
            <h4 class="self-nickname">{{realname}}</h4>

            <p class="self-wxid">账号: {{username}}</p>
          </div>
          <div class="weui-cell__ft">
            <img src="../../assets/images/chat-info-qr.png">
          </div>
        </router-link>
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../../assets/images/me_my-card-package-icon.png">
          </div>
          <div class="weui-cell__bd">
            <p>名片</p>
          </div>
        </router-link>
      </div>

      <div class="weui-cells">

        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../../assets/images/me_more-my-bank-card.png">
          </div>
          <div class="weui-cell__bd">
            <p>文件</p>
          </div>
        </router-link>
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../../assets/images/me_more-my-favorites.png">
          </div>
          <div class="weui-cell__bd">
            <p>收藏</p>
          </div>
        </router-link>
      </div>

      <div class="weui-cells" style="margin-bottom:30px;">
        <router-link to="/self/settings" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="../../assets/images/me_more-setting.png">
          </div>
          <div class="weui-cell__bd">
            <p>设置</p>
          </div>
        </router-link>
      </div>

      <div class="weui-cells" style="">
        <router-link to="/login" @click="clearLoginInfo" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd" style="text-align:center;">
            <p style="color:red;margin-top:5px;margin-bottom:5px;">注销并退出</p>
          </div>
        </router-link>
      </div>

    </div>
  </div>
  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';

export default {
    mixins: [window.mixin],
    data() {
      return {
          "pageName": "我的",
          username:'',
          realname:'',
          avatar:'',
      }
    },
    mounted() {
      this.$store.commit("toggleTipsStatus", -1);
      this.changeStyle();
      this.displayFoot();
      this.userStatus();
    },
    activated() {
      $('#return[tag=div]').remove();
      this.$store.commit("toggleTipsStatus", -1);
      this.changeStyle();
      this.displayFoot();
      this.userStatus();
    },
    methods: {
        changeStyle(name){
          try {
            var name = window.location.hash.slice(2);
            name = name.includes('?') ? name.split('?')[0] : name;
            name = name.includes('/') ? name.split('/')[0] : name;
            $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
            $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
            $(`#wx-nav-${name}`).addClass('router-link-exact-active');
            $(`#wx-nav-${name}`).addClass('router-link-active');
            console.log(name);
          } catch (error) {
            console.log(error);
          }
        },
        displayFoot(){
          $('.app-footer').css('display','block');
        },
        async clearLoginInfo(){

          try {
            let info = await storage.getStore('system_linfo');

            this.username = info.username;
            this.password = info.password;

            storage.clearStore('system_userinfo');
            storage.clearStore('system_token');
            storage.clearStore('system_department');
            storage.clearStore('system_login_time');
          } catch (error) {
            console.log(error);
          }
        },
        async userStatus(){
          try {
            let info = await storage.getStore('system_userinfo');
            if( tools.isNull(info) ){
              vant.Toast('尚未登录！');
              await this.clearLoginInfo();
              this.$router.push(`/login`);
            }
          } catch (error) {
            console.log(error);
          }
        }
    }
}
</script>
<style>
    @import "../../assets/css/self.css";

    .app-footer {
      display:block;
    }
</style>
