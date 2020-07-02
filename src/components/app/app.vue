<template>
  <!--发现组件-->
  <div id="app">
    <section>
      <div class="weui-cells">
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
            this.$store.commit("toggleTipsStatus", -1)
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
</style>
