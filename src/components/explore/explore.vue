<template>
  <!--发现组件-->
  <div id="explore">
    <section>

      <div class="weui-cells" style="display:none;">
        <router-link to="/explore/moments" class="weui-cell weui-cell_access" tag="div" v-on:click.native="momentNewMsg=false">
          <div class="weui-cell__hd">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/zhushou.png" >
          </div>
          <div class="weui-cell__bd" style="line-height: 28px;">
            圈子
          </div>
          <div class="weui-cell__ft">
            <div class="home__notice" v-show="momentNewMsg">
              <img src="https://sinacloud.net/vue-wechat/images/headers/yehua.jpg" alt="" class="">
              <i class="new-msg-dot"></i>
            </div>
          </div>
        </router-link>
      </div>

      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell__hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
          </div>
          <div class="weui-cell__bd">
            待办
          </div>
        </div>
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell__hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png" >
          </div>
          <div class="weui-cell__bd">
            已办
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell__hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
          </div>
          <div class="weui-cell__bd">
            公告
          </div>
        </div>
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell__hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png" >
          </div>
          <div class="weui-cell__bd">
            网盘
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell">
          <div class="weui-cell__hd">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/jiejing.png" >
          </div>
          <div class="weui-cell__bd">
            应用
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <a class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/trip.png">
          </div>
          <div class="weui-cell__bd">
            搜索
          </div>
        </a>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/sweet_00.png">
          </div>
          <div class="weui-cell__bd">
            日历
          </div>
        </div>
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/xiuxian_00.png">
          </div>
          <div class="weui-cell__bd">
            天气
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
                pageName: "发现",
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
