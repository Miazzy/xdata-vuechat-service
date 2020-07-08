<template>
  <div id="app">
    <section>
      <div class="weui-cells" style="margin-top:-15px;">
        <img src="http://weather.shengtai.club/static/media/background.c327aeb9.jpg" style="height:155px;width:100%;">

        <router-link to="" class="weui-cell weui-cell_access" style="padding:3px 5px;padding-left:10px;border-top:0px solid #ffffff;">
          <div class="weui-cell__hd" style="width:22px; border-radius: 4px; margin-top: 0px;">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" style="width:22px; border-radius: 4px; margin-top: 0px;">
          </div>
          <div class="weui-cell__bd" style="font-size:13px;margin-top:-2px;margin-left:-1px;">
            公告
          </div>
        </router-link>
      </div>

      <div class="weui-cells">
        <div class="weui-cell-title">常用应用</div>
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
            <div class="weui-cell_app_bd" >
              待办
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png" >
            <div class="weui-cell_app_bd">
              已办
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
            <div class="weui-cell_app_bd">
              公告
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png" >
            <div class="weui-cell_app_bd">
              网盘
            </div>
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell-title">人事管理</div>
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell_app_hd">
           <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png" >
            <div class="weui-cell_app_bd" >
              签到
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
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png" >
            <div class="weui-cell_app_bd">
              加班
            </div>
          </div>
        </div>
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/person.png" >
            <div class="weui-cell_app_bd" >
              考勤
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png" >
            <div class="weui-cell_app_bd">
              物品
            </div>
          </div>
          <div class="weui-cell_app_hd">
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

      <div class="weui-cells">
        <div class="weui-cell-title">财务管理</div>
        <div class="weui-cell weui-cell_access" id="scanCell">
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

      <div class="weui-cells">
        <div class="weui-cell-title">差旅商旅</div>
        <div class="weui-cell weui-cell_access" id="scanCell">
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

      <div class="weui-cells" style="margin-top:80px;height:0px;">
      </div>


    </section>
  </div>
</template>
<script>
    export default {
        mixins: [window.mixin],
        data() {
            return {
                pageName: "应用",
                momentNewMsg: true
            }
        },
        activated() {
          $('#return[tag=div]').remove();
          this.$store.commit("toggleTipsStatus", -1);
          this.changeStyle();
        },
        mounted() {
          this.changeStyle();
        },
        methods: {
            changeStyle(name){
              var name = window.location.hash.slice(2);
              $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
              $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
              $(`#wx-nav-${name}`).addClass('router-link-exact-active');
              $(`#wx-nav-${name}`).addClass('router-link-active');
              console.log(name);
            }
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
    }
    #search {
      display:none;
    }
</style>
