<template>
    <!--我的二维码组件 利用 qrcode.min.js-->
    <div class="qrcode">
        <header id="wx-header">
            <div class="center">
                <div class="iconfont icon-left" v-on:click="$router.back()">
                    <span>返回</span>
                </div>
                <span>我的二维码</span>
            </div>
        </header>
        <section>
            <div class="clearfix">
                <div class="header"><img :src="avatar" alt="" style="width:40px;border-radius:4px;"></div>
                <div class="info">
                    <p><span>{{realname}}</span><span class="gender gender-male"></span></p>
                    <span style="color:#a0a0a0;">{{username}}</span>
                </div>
            </div>
            <div id="qrcode-pic" class="clearfix">
              <img :src="qrcode" />
            </div>
            <p class="desc">扫一扫上面的二维码图案，加我企业微信</p>
        </section>
    </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';

export default {
    mixins: [window.mixin],
    data() {
      return {
          pageName: "我的",
          username:'',
          realname:'',
          avatar:'',
          qrcode:'',
      }
    },
    mounted() {

      this.changeStyle();
      this.displayFoot();
      this.userStatus();
    },
    activated() {
      $('#return[tag=div]').remove();

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
            } else {
              this.username = info.username;
              this.realname = info.realname;
              this.qrcode = info.qr_code;
              this.avatar = info.avatar.startsWith('https://') ? info.avatar : window._CONFIG['uploaxURL'] + '/' + info.avatar;
            }
          } catch (error) {
            console.log(error);
          }
        }
    }
}
</script>
<style>
    .qrcode {
        background: #666;
    }

    .qrcode section {
        width: 90%;
        padding: 5%;
        border-radius: 5px;
        margin: 0 auto;
        margin-top: 20%;
        background: #fff;
    }

    .qrcode .header {
        float: left;
    }

    .qrcode .info {
        float: left;
        margin-top: 2px;
        margin-left: 15px;
    }

    .qrcode #qrcode-pic {
        background: url("https://sinacloud.net/vue-wechat/images/qrcode.jpg");
        background-size: 100% 100%;
        width: 300px;
        height: 300px;
        margin: 0 auto;
        margin-top: 20px;
    }

    .qrcode #qrcode-pic img {
        display: block;
        width: 180px;
        margin: 0 auto;
        margin-top: 48px;
    }

    .qrcode .desc {
        font-size: 12px;
        text-align: center;
        color: #999;
        margin-top: 20px;
    }
</style>
