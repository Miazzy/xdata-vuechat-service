<template>
  <div id="app">
    <section>
      <div class="weui-cells" style="margin-top:0px;">

        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>欢迎来到移动办公中心</van-swipe-item>
        </van-swipe>

        <router-link to="" class="weui-cell weui-cell-app_access" style="padding:0px 0px;padding-left:0px;border-top:0px solid #ffffff;">
          <van-notice-bar style="width:100%;" color="#1989fa" background="#ecf9ff"
            left-icon="volume-o"
            text="欢迎使用OA移动APP"
          />
        </router-link>
      </div>

      <div class="weui-cells">
        <div class="weui-cell-title">常用应用</div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">
          <div class="weui-cell_app_hd" @click="$router.push(`/app/doingtask`)">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
            <div class="weui-cell_app_bd" >
              待办
            </div>
          </div>
          <div class="weui-cell_app_hd" @click="$router.push(`/app/donetask`)">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png" >
            <div class="weui-cell_app_bd">
              已办
            </div>
          </div>
          <div class="weui-cell_app_hd" @click="$router.push(`/app/news`)">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
            <div class="weui-cell_app_bd">
              公告
            </div>
          </div>
          <div class="weui-cell_app_hd" @click="$router.push(`/explore/punch?back=/app`)">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/daka.png" >
            <div class="weui-cell_app_bd">
              打卡
            </div>
          </div>
        </div>
      </div>

      <div class="weui-cells" style="display:block;">
        <div class="weui-cell-title">人事管理</div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">
          <div class="weui-cell_app_hd" @click="$router.push(`/explore/sign?back=/app`)">
           <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png" >
            <div class="weui-cell_app_bd" >
              签到
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/person.png" >
            <div class="weui-cell_app_bd" >
              考勤
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" >
            <div class="weui-cell_app_bd">
              请假
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png" >
            <div class="weui-cell_app_bd">
              外出
            </div>
          </div>
        </div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png" >
            <div class="weui-cell_app_bd">
              加班
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
            <div class="weui-cell_app_bd">
              物品
            </div>
          </div>
          <div class="weui-cell_app_hd" @click="$router.push('/app/sealinfo');">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/seal.png" >
            <div class="weui-cell_app_bd">
              用章
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
            <div class="weui-cell_app_bd">
              档案
            </div>
          </div>
        </div>
      </div>

      <div class="weui-cells" style="display:none;">
        <div class="weui-cell-title">财务管理</div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">
          <div class="weui-cell_app_hd">
           <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png" >
            <div class="weui-cell_app_bd" >
              付款
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" >
            <div class="weui-cell_app_bd">
              采购
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
            <div class="weui-cell_app_bd">
              车补
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png" >
            <div class="weui-cell_app_bd">
              报销
            </div>
          </div>
        </div>
      </div>

      <div class="weui-cells" style="display:none;">
        <div class="weui-cell-title">差旅商旅</div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/trip.png" >
            <div class="weui-cell_app_bd" >
              出差
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png" >
            <div class="weui-cell_app_bd">
              外出
            </div>
          </div>
          <div class="weui-cell_app_hd">

          </div>
          <div class="weui-cell_app_hd">

          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell-title">用印管理</div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">

          <div class="weui-cell_app_hd" @click="sealApply();">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/seal.png" >
            <div class="weui-cell_app_bd" >
              申请
            </div>
          </div>

          <div v-show="userinfo.grouplimits.seal.length > 0" class="weui-cell_app_hd" @click="sealApprove();">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png" >
            <div class="weui-cell_app_bd">
              审批
            </div>
          </div>

          <div v-show="userinfo.grouplimits.front.length > 0"  class="weui-cell_app_hd" @click="sealFront();" >
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/dimission.png" >
            <div class="weui-cell_app_bd" >
              移交
            </div>
          </div>

          <div v-show="userinfo.grouplimits.archive.length > 0"  class="weui-cell_app_hd" @click="sealArchive();">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png" >
            <div class="weui-cell_app_bd" >
              归档
            </div>
          </div>

          <div class="weui-cell_app_hd" @click="sealMyList();" >
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" >
            <div class="weui-cell_app_bd" >
              历史
            </div>
          </div>

        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell-title">领用借用</div>
        <div class="weui-cell weui-cell-app_access" id="scanCell">

          <div class="weui-cell_app_hd" @click="goodsReceive('office');">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png" >
            <div class="weui-cell_app_bd" >
              办公
            </div>
          </div>

          <div class="weui-cell_app_hd" @click="goodsReceive('drug');">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/sweet_00.png" >
            <div class="weui-cell_app_bd">
              药品
            </div>
          </div>

          <div class="weui-cell_app_hd" @click="goodsReceive('prevent');" >
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/jiushui_00.png" >
            <div class="weui-cell_app_bd" >
              防疫
            </div>
          </div>

           <div class="weui-cell_app_hd" @click="goodsBorrow('common');" >
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/tag_00.png" >
            <div class="weui-cell_app_bd" >
              借用
            </div>
          </div>

        </div>
      </div>

      <div class="weui-cells" style="margin-top:80px;height:0px;">
      </div>


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
            pageName: "应用",
            momentNewMsg: true,
            userinfo:{
              grouplimits: {
                archive:[],
                seal:[],
                front:[],
              },
            },
        }
    },
    activated() {
      this.$store.commit("toggleTipsStatus", -1);
      this.weworkLogin();
      this.changeStyle();
      this.displayFoot();
    },
    mounted() {
      this.weworkLogin();
      this.changeStyle();
      this.displayFoot();
    },
    methods: {
        changeStyle(name) {
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
        displayFoot() {
          $('.app-footer').css('display','block');
        },
        /**
         * @function 企业微信登录处理函数
         * @description https://api.yunwisdom.club:30443/api/v2/wework_user_code/6asBC1NWc1X_mXckfORq-MncHF7ALSLvBAV_A-jeGxw
         */
        async weworkLogin(){
          //获取用户CODE
          let code = tools.queryUrlString('code' , 'search');

          if(code){
            //获取用户信息
            var response = await superagent.get(`https://api.yunwisdom.club:30443/api/v2/wework_user_code/${code}`);

            this.userinfo = response.body.userinfo;

            //设置system_userinfo
            storage.setStore('system_linfo' , JSON.stringify({username:response.body.userinfo.userid,password:'************'}) , 3600 * 24 * 30);
            storage.setStore('system_userinfo' , JSON.stringify(response.body.userinfo) , 3600 * 24 * 30);
            storage.setStore('system_token' , JSON.stringify(code) , 3600 * 24 * 30);
            storage.setStore('system_department' , JSON.stringify(response.body.userinfo.department) , 3600 * 24 * 30);
            storage.setStore('system_login_time' , dayjs().format('YYYY-MM-DD HH:mm:ss') , 3600 * 24 * 30);
          } else {
            this.userinfo = storage.getStore('system_userinfo');
          }
        },
        async userLogin(){

          //检查用户是否存在
          let vuser = await queryUserInfoByView(this.username);

          //显示加载状态
          this.loading = true;

          try {
            if(tools.isNull(this.username)){
              vant.Toast('请输入账号/手机/邮箱登录！');
            } else if(tools.isNull(this.password)){
              vant.Toast('请输入密码！');
            } else if(tools.isNull(vuser)){
              vant.Toast('此账户不存在！');
            } else {
              let username = this.username;
              let password = this.password;
              let response = await superagent
                    .post(loginURL)
                    .send({"remember_me":true,"auto_login":false,"username":username,"password":password})
                    .set('accept', 'application/json');

              if(!tools.isNull(response) && !tools.isNull(response.body)
                && response.body.code == 200 && response.body.message == "登录成功"){
                  let userinfo = response.body.result.userInfo;
                  let token = response.body.result.token;
                  let department = response.body.result.departs;
                  userinfo.password = password;
                  storage.setStore('system_linfo' , JSON.stringify({username:username,password:password}) , 3600 * 24 * 30);
                  storage.setStore('system_userinfo' , JSON.stringify(userinfo) , 3600 * 24 * 30);
                  storage.setStore('system_token' , JSON.stringify(token) , 3600 * 24 * 30);
                  storage.setStore('system_department' , JSON.stringify(department) , 3600 * 24 * 30);
                  storage.setStore('system_login_time' , dayjs().format('YYYY-MM-DD HH:mm:ss') , 3600 * 24 * 30);
                  vant.Toast('登录成功！');
                  this.$router.push(`/explore`);
                  this.loading = false;
              } else {
                  vant.Toast('登录失败: ' + response.body.message);
                  this.loading = false;
              }
            }
          } catch (error) {
            this.loading = false;
          }
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
        },
        async sealApply(){
          this.$router.push(`/app/sealinfo`);
        },
        async sealApprove(){
          this.$router.push(`/app/seallist`);
        },
        async sealFront(){
          this.$router.push(`/app/sealfrontlist`);
        },
        async sealArchive(){
          this.$router.push(`/app/sealarchivelist`);
        },
        async sealMyList(){
          this.$router.push(`/app/sealmylist`);
        },
        async goodsReceive(type){
          this.$router.push(`/app/goodsreceive?type=${type}`);
        },
        async goodsBorrow(type){
          this.$router.push(`/app/goodsborrow?type=${type}`);
        },
    }
}
</script>
<style>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/app.css";
</style>
