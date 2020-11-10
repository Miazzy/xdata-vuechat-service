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
        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="$router.push(`/app/doingtask`)">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
                <div class="weui-cell_app_bd" >
                  待办
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="$router.push(`/app/donetask`)">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png" >
                <div class="weui-cell_app_bd">
                  已办
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="$router.push(`/app/news?back=/app`)">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
                <div class="weui-cell_app_bd">
                  公告
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="$router.push(`/explore/punch?back=/app`)">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/daka.png" >
                <div class="weui-cell_app_bd">
                  打卡
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="flex-layout-content" id="scanCell" style="display: none;">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="$router.push(`/explore/sign?back=/app`)">
              <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png" >
                <div class="weui-cell_app_bd" >
                  签到
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="weui-cells" style="display:block;position:relative;">
        <div class="weui-cell-title">奖罚管理</div>
        <div>
          <div style="position:absolute; top: 0.6rem; right:25px;">
            <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
              更多
            </span>
          </div>
          <div style="position:absolute; top: 0.57rem; right:10px;">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('业绩考核' , '0');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.1/images/pay03.png" >
                <div class="weui-cell_app_bd">
                  业绩考核
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('总裁专项' , '1');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/pay.png" >
                <div class="weui-cell_app_bd" >
                  总裁专项
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('总经理专项' , '2');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.0/images/pay02.png" >
                <div class="weui-cell_app_bd" >
                  总经理专项
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('特殊贡献' , '3');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.0/images/pay00.png" >
                <div class="weui-cell_app_bd" >
                  特殊贡献
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('其他奖罚' , '4');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.2/images/pay07.png" >
                <div class="weui-cell_app_bd">
                  其他奖罚
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('月度报表' , '5');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png" >
                <div class="weui-cell_app_bd">
                  月度报表
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('季度报表' , '6');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/ribao.png" >
                <div class="weui-cell_app_bd" >
                  季度报表
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="rewardApply('奖罚审批' , '7');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png" >
                <div class="weui-cell_app_bd">
                  奖罚审批
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="weui-cells" style="display:block; position:relative;">
        <div class="weui-cell-title">入职管理</div>
        <div style="display:none;">
          <div style="position:absolute; top: 0.6rem; right:25px; display:none;">
            <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
              更多
            </span>
          </div>
          <div style="position:absolute; top: 0.57rem; right:10px; display:none;">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="entryjob('hr');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png" >
                <div class="weui-cell_app_bd">
                  入职审批
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="entryjob('admin');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png" >
                <div class="weui-cell_app_bd" >
                  行政审批
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="entryjob('front');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/phone_01.png" >
                <div class="weui-cell_app_bd" >
                  前台审批
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="entryjob('meal');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/xiuxi_00.png" >
                <div class="weui-cell_app_bd">
                  食堂审批
                </div>
              </div>
            </van-col>
          </van-row>
        </div>

        <div class="flex-layout-content" id="scanCell" style="display: none;">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png" >
                <div class="weui-cell_app_bd">
                  外出
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd"  >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png" >
                <div class="weui-cell_app_bd">
                  加班
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd"  >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
                <div class="weui-cell_app_bd">
                  物品
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" style="display: none;">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
                <div class="weui-cell_app_bd">
                  档案
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="weui-cell weui-cell-app_access" id="scanCell" style="display:none;">
        </div>
      </div>

      <div class="weui-cells" style="display:none;">
        <div class="weui-cell-title">财务管理</div>
        <div class="flex-layout-content" id="scanCell">
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
        <div class="flex-layout-content" id="scanCell">
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

      <div class="weui-cells" style="display: block; position:relative;">
        <div class="weui-cell-title">用印管理</div>
        <div style="position:absolute; top: 0.6rem; right:25px;">
          <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
            更多
          </span>
        </div>
        <div style="position:absolute; top: 0.57rem; right:10px;">
          <van-icon name="arrow" />
        </div>
        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="sealApply();">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/seal.png" >
                <div class="weui-cell_app_bd" >
                  用印申请
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div v-show="true " class="weui-cell_app_hd" @click="sealApprove();">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png" >
                <div class="weui-cell_app_bd">
                  用印审批
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div v-show="true"  class="weui-cell_app_hd" @click="sealFront();" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/dimission.png" >
                <div class="weui-cell_app_bd" >
                  用印移交
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div v-show="true"  class="weui-cell_app_hd" @click="sealArchive();">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png" >
                <div class="weui-cell_app_bd" >
                  用印归档
                </div>
              </div>
            </van-col>
          </van-row>
        </div>

        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="sealMyList();" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png" >
                <div class="weui-cell_app_bd" >
                  用印历史
                </div>
              </div>
            </van-col>
          </van-row>

        </div>
      </div>

      <div class="weui-cells" style="display: block;position:relative;">
        <div class="weui-cell-title">领用借用</div>
        <div style="position:absolute; top: 0.6rem; right:25px;">
          <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
            更多
          </span>
        </div>
        <div style="position:absolute; top: 0.57rem; right:10px;">
          <van-icon name="arrow" />
        </div>
        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsReceive('office');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png" >
                <div class="weui-cell_app_bd" >
                  办公预约
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsReceive('drug');">
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/sweet_00.png" >
                <div class="weui-cell_app_bd">
                  药品领用
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsReceive('prevent');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/jiushui_00.png" >
                <div class="weui-cell_app_bd" >
                  防疫领用
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsReceive('approve');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png" >
                <div class="weui-cell_app_bd" >
                  领用审批
                </div>
              </div>
            </van-col>
          </van-row>
        </div>

        <div class="flex-layout-content" id="scanCell">
          <van-row class="flex-layout-van" id="flex-layout-van" type="flex" justify="left">
            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsBorrow('common');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/tag_00.png" >
                <div class="weui-cell_app_bd" >
                  设备借用
                </div>
              </div>
            </van-col>

            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsBorrow('box');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/robot.png" >
                <div class="weui-cell_app_bd" >
                  传屏借用
                </div>
              </div>
            </van-col>

            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsBorrow('lostproperty');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
                <div class="weui-cell_app_bd" >
                  失物招领
                </div>
              </div>
            </van-col>

            <van-col span="6">
              <div class="weui-cell_app_hd" @click="goodsBorrow('approve');" >
              <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png" >
                <div class="weui-cell_app_bd" >
                  借用审批
                </div>
              </div>
            </van-col>


          </van-row>

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
import * as workconfig from '@/request/workconfig';
import * as query from '@/request/query';

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

          //获取当前登录用户信息
          const userinfo = await storage.getStore('system_userinfo');
          //获取角色列表
          const resp = await query.queryRoleGroupList('SEAL_ADMIN' , userinfo.username);

          if(resp[0].userlist.includes(userinfo.username)){
            this.$router.push(`/app/seallist`);
          } else {
            vant.Toast('您没有用印合同资料审批的权限！');
          }

        },
        async sealFront(){

          //获取当前登录用户信息
          const userinfo = await storage.getStore('system_userinfo');
          //获取角色列表
          const resp = await query.queryRoleGroupList('SEAL_FRONT_SERVICE' , userinfo.username);

          if(resp[0].userlist.includes(userinfo.username)){
            this.$router.push(`/app/sealfrontlist`);
          } else {
            vant.Toast('您没有用印合同资料前台移交的权限！');
          }
        },
        async sealArchive(){

          //获取当前登录用户信息
          const userinfo = await storage.getStore('system_userinfo');
          //获取角色列表
          const resp = await query.queryRoleGroupList('SEAL_ARCHIVE_ADMIN' , userinfo.username);

          if(resp[0].userlist.includes(userinfo.username)){
            this.$router.push(`/app/sealarchivelist`);
          } else {
            vant.Toast('您没有用印合同资料归档的权限！');
          }
        },
        async sealMyList(){
          this.$router.push(`/app/sealmylist`);
        },
        async goodsReceive(type){
          //获取当前登录用户信息
          const userinfo = await storage.getStore('system_userinfo');

          if(type == 'approve'){
            //验证是否为办公用品管理员，如果不是，则没有权限进入
            const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

            if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
              vant.Toast('您没有物品管理-物品领用角色的权限！');
              return false;
            }

            this.$router.push(`/app/goodslist?type=${type}`);
          } else {
            this.$router.push(`/app/goodsreceive?type=${type}`);
          }
        },
        async goodsBorrow(type){
          //获取当前登录用户信息
          const userinfo = await storage.getStore('system_userinfo');

          if(type == 'approve'){

            //验证是否为办公用品管理员，如果不是，则没有权限进入
            const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

            if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
              vant.Toast('您没有物品管理-物品借用角色的权限！');
              return false;
            }

            this.$router.push(`/app/borrowlist?type=${type}`);

          } else if(type == 'lostproperty'){//失物招领都有权限

            this.$router.push(`/app/lostpropertylist`);

          } else {
            this.$router.push(`/app/borrowreceive?type=${type}`);
          }
        },
        /**
         * @function 奖罚申请
         */
        async rewardApply(name , type){
          if(['业绩考核','总裁专项','总经理专项','特殊贡献','其他奖罚'].includes(name)){
            this.$router.push(`/app/rewardapply?type=${type}&reward_name=${name}`);
          } else if(name == '月度报表'){
            this.$toast.fail('您暂时没有权限! ');
          } else if(name == '季度报表'){
            this.$toast.fail('您暂时没有权限！');
          } else if(name == '奖罚审批'){
            this.$router.push(`/app/rewardlist?type=${type}&reward_name=${name}`);
          }
        },
        /**
         * @function 入职管理
         */
        async entryjob(role){

          //获取当前登录用户信息
          const userinfo = await storage.getStore('system_userinfo');

          //先验证用户是否具备相应权限
          if(role == 'hr'){
            //角色
            const resp = await query.queryRoleGroupList('JOB_HR_ADMIN' , userinfo.username);

            if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
              vant.Toast('您没有入职管理-人力角色的权限！');
              return false;
            }

          } else if(role == 'admin'){
            //角色
            const resp = await query.queryRoleGroupList('JOB_EXEC_ADMIN' , userinfo.username);

            if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
              vant.Toast('您没有入职管理-行政角色的权限！');
              return false;
            }

          } else if(role == 'front'){
            //角色
            const resp = await query.queryRoleGroupList('JOB_FRONT_ADMIN' , userinfo.username);

            if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
              vant.Toast('您没有入职管理-前台角色的权限！');
              return false;
            }

          } else if(role == 'meal'){
            //角色
            const resp = await query.queryRoleGroupList('JOB_MEAL_ADMIN' , userinfo.username);

            if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
              vant.Toast('您没有入职管理-食堂角色的权限！');
              return false;
            }

          } else { //没有权限，无法查看
            vant.Toast('您没有入职管理的权限！');
            return false;
          }

          //跳转到相应界面
          this.$router.push(`/app/entrylist?back=/app&role=${role}`);
        },
    }
}
</script>
<style>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/app.css";
</style>
