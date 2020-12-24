<template>
  <!--我 组件-->
  <div id="self">
    <div class="weui-tab__content" style="display: block;">
      <div class="weui-cells">
        <div @click="selfProfile();" class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img :src="avatar" alt="" class="self-header" style="border: 0.05rem solid #f5f5f5;">
          </div>
          <div class="weui-cell__bd">
            <h4 class="self-nickname" @click=" realname == '' ? $router.push(`/login`) : null ;">{{realname || '点击登录' }} </h4>

            <p class="self-wxid">账号: {{username}}</p>
          </div>
          <div class="weui-cell__ft">
            <img src="../../assets/images/chat-info-qr.png">
          </div>
        </div>
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
    async mounted() {
      this.changeStyle();
      this.displayFoot();
      this.userStatus();
    },
    async activated() {
      this.changeStyle();
      this.displayFoot();
      await this.userStatus();
    },
    async created(){
      await this.userStatus();
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
            let info = await Betools.storage.getStore('system_linfo');

            this.username = info.username;
            this.password = info.password;

            Betools.storage.clearStore('system_userinfo');
            Betools.storage.clearStore('system_token');
            Betools.storage.clearStore('system_department');
            Betools.storage.clearStore('system_login_time');
          } catch (error) {
            console.log(error);
          }

        },
        async userStatus(){
          try {
            let userinfo = await Betools.storage.getStore('system_userinfo');

            //如果用户未登录，则直接调整到登录界面
            if( Betools.tools.isNull(userinfo) ){

              vant.Toast('尚未登录！');
              await this.clearLoginInfo();
              this.$router.push(`/login`);

            } else {

              //获取用户的账户
              this.username = userinfo.username || userinfo.userid || userinfo.mobile;

              //获取用户的真实姓名
              this.realname = userinfo.realname || userinfo.name;

              //如果没有获取用户的真实姓名，则通过电话号码查询用户真实信息
              if(!this.realname){

                //通过电话号码查询用户信息

              }

              //显示用户头像
              this.avatar = userinfo && userinfo.avatar && (userinfo.avatar.startsWith('https://') || userinfo.avatar.startsWith('http://')) ? userinfo.thumb_avatar : '';

            }
          } catch (error) {
            console.log(error);
          }
        },
        async selfProfile(){
          this.realname !== '' ? this.$router.push(`/self/profile`) : this.$router.push(`/login`);
        },
  }
}
</script>
<style scoped>
    @import "../../assets/css/self.css";
</style>
