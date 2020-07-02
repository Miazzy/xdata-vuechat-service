<template>
  <!--发现组件-->
  <div id="explore">
    <section>

      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell_app_hd" style="margin-left:5px;">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
            <div class="weui-cell_app_bd" >
              任务
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
            <div class="weui-cell_app_bd">
              公告
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/daka.png" >
            <div class="weui-cell_app_bd">
              打卡
            </div>
          </div>
          <div class="weui-cell_app_hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png" >
            <div class="weui-cell_app_bd">
              签到
            </div>
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd" style="border-bottom: 1px solid #329ff0; height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;">
            计时
          </div>
          <div class="weui-cell__bd" style="border-bottom: 0px solid #329ff0; height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;">
            待办
          </div>
          <div class="weui-cell__bd" style="border-bottom: 0px solid #329ff0; height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;">
            已办
          </div>
          <div class="weui-cell__bd" style="border-bottom: 0px solid #329ff0; height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;">
            公告
          </div>
        </div>
      </div>

      <div class="weui-cells">

      </div>

    </section>
  </div>
</template>
<script>
    export default {
        mixins: [window.mixin],
        data() {
            return {
                pageName: "首页",
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
</style>
