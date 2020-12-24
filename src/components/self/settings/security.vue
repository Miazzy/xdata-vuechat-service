<template>
    <div class="security">
        <header id="wx-header">
            <div class="center">
                <router-link to="/self/settings" tag="div" class="iconfont icon-left">
                    <span>设置</span>
                </router-link>
                <span>账号与安全</span>
            </div>
        </header>
        <section>
            <div class="weui-cells">
                <div class="weui-cell">
                    <div class="weui-cell__bd">账号</div>
                    <div class="weui-cell__ft">{{realname}}</div>
                </div>
            </div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">手机号</div>
                    <div class="weui-cell__ft">{{mobile}}</div>
                </div>
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">邮箱地址</div>
                    <div class="weui-cell__ft">{{mail}}</div>
                </div>
            </div>
            <div class="weui-cells">
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">声音锁</div>
                    <div class="weui-cell__ft"></div>
                </div>
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">密码</div>
                    <div class="weui-cell__ft"></div>
                </div>
                <div class="weui-cell weui-cell_access">
                    <div class="weui-cell__bd">帐号保护</div>
                    <div class="weui-cell__ft"></div>
                </div>
                <a class="weui-cell weui-cell_access" href="https://weixin110.qq.com">
                    <div class="weui-cell__bd">安全中心</div>
                    <div class="weui-cell__ft"></div>
                </a>
            </div>
            <div class="weui-cells__tips">如果遇到帐号信息泄露, 忘记密码, 诈骗等帐号安全问题, 可联系系统管理员.</div>
        </section>
    </div>
</template>
<script>



export default {
    mixins: [window.mixin],
    data() {
      return {
          pageName: "我的",
          username:'',
          realname:'',
          mobile:'',
          avatar:'',
          qrcode:'',
          mail:'',
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
              this.mobile = info.mobile;
              this.qrcode = info.qr_code;
              this.mail = info.mail;
              this.avatar = info.avatar && (info.avatar.startsWith('https://') || info.avatar.startsWith('http://')) ? info.avatar : '';
            }
          } catch (error) {
            console.log(error);
          }
        }
    }
}
</script>
