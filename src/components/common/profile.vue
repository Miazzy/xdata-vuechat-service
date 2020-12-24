<template>
<!--个人信息组件-->
    <div class="profile">
        <header id="wx-header">
            <div class="center">
                <router-link to="/self" tag="div" class="iconfont icon-left">
                    <span>我的</span>
                </router-link>
                <span>个人信息</span>
            </div>
        </header>
        <div class="weui-cells">
            <div class="weui-cell" id="avatarCell">
                <div class="weui-cell__bd">
                    <p>头像</p>
                </div>
                <div class="weui-cell__ft">
                    <img :src="avatar" style="width: 50px;height: 50px;border-radius: 4px;">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>名字</p>
                </div>
                <div class="weui-cell__ft">
                    {{realname}}
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>账号</p>
                </div>
                <div class="weui-cell__ft">
                    {{username}}
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>手机</p>
                </div>
                <div class="weui-cell__ft">
                    {{mobile}}
                </div>
            </div>
            <router-link to="/self/profile/my-qrcode" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>我的二维码</p>
                </div>
                <div class="weui-cell__ft">
                    <img src="../../assets/images/contact_add-friend-my-qr.png" style="vertical-align: middle;;width:24px" class="_align-middle">
                </div>
            </router-link>
        </div>

        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>性别</p>
                </div>
                <div class="weui-cell__ft">
                    男
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>岗位</p>
                </div>
                <div class="weui-cell__ft">
                    {{position}}
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>部门</p>
                </div>
                <div class="weui-cell__ft">
                    {{department}}
                </div>
            </div>
        </div>

        <div class="weui-cells" style="display:none;">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>LinkedIn帐号</p>
                </div>
                <div class="weui-cell__ft">
                    未设置
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
          mobile: '',
          position: '',
          department:'',
          avatar:'',
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
            let info = await Betools.storage.getStore('system_userinfo');
            if( Betools.tools.isNull(info) ){
              vant.Toast('尚未登录！');
              await this.clearLoginInfo();
              this.$router.push(`/login`);
            } else {
              this.username = info.username;
              this.realname = info.realname;
              this.position = info.position;
              this.mobile = info.mobile;
              this.department = info.systemuserinfo.textfield1.split('||')[1];
              this.avatar = info.avatar && (info.avatar.startsWith('https://') || info.avatar.startsWith('http://')) ? info.avatar : '';
            }
          } catch (error) {
            console.log(error);
          }
        }
    }
}
</script>
