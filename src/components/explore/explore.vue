<template>
  <!--首页组件-->
  <div id="explore" style="margin-top: -18px;" >
    <section>
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell" style="margin-top:10px;">
          <div class="weui-cell_app_hd" style="margin-left:5px;">
          <router-link to="/task" tag="dl">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
              <div class="weui-cell_app_bd" >
                任务
              </div>
          </router-link>
          </div>
          <div class="weui-cell_app_hd">
          <router-link to="/news" tag="dl">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
            <div class="weui-cell_app_bd">
              公告
            </div>
          </router-link>
          </div>
          <div class="weui-cell_app_hd">
          <router-link to="/punch" tag="dl">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/daka.png" >
            <div class="weui-cell_app_bd">
              打卡
            </div>
          </router-link>
          </div>
          <div class="weui-cell_app_hd">
          <router-link to="/sign" tag="dl">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png" >
            <div class="weui-cell_app_bd">
              签到
            </div>
          </router-link>
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            计时
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ;" :style="tabname == 2 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            待办
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ;" :style="tabname == 3 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            已办
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ;" :style="tabname == 4 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            公告
          </div>
        </div>
      </div>

      <div class="wechat-list">
         <div class="list-info">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;">3</i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">22:04</div>
              <div class="desc-author">请假申请审批单</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span style="display: none;"></span>
                <span>临时有事，申请请假，望领导批准！</span>
              </div>
            </div>
         </div>
         <div class="list-info">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;">3</i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">22:04</div>
              <div class="desc-author">请假申请审批单</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span style="display: none;"></span>
                <span>临时有事，申请请假，望领导批准！</span>
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
            pageName: "首页",
            momentNewMsg: true,
            tabname: '1',
        }
    },
    activated() {
      $('#return[tag=div]').remove();
      this.$store.commit("toggleTipsStatus", -1);
      this.changeStyle();
      this.displayFoot();
    },
    mounted() {
      $('#return[tag=div]').remove();
      this.changeStyle();
      this.displayFoot();
    },
    watch: {
      $route(to, from) {
        var that = this;
        (async () => {
          await that.goUrl(to , from);
        })();
      }
    },
    methods: {
      goUrl(to , from){
        //获取URL参数
        var path = this.$route.path;
        if(path == '/explore'){
          $('#return[tag=div]').remove();
          this.changeStyle();
          this.displayFoot();
        }
      },
      queryReturnDiv(){
        var that = this;
        $('.center').prepend(`<div id="return" tag="div" class="iconfont icon-left">
                                  <span>返回</span>
                              </div>`);
        $('#return[tag=div]').click(()=>{
          that.$router.push(`/explore`);
        });
      },
      changeStyle(name) {
        var name = window.location.hash.slice(2);
        $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
        $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
        $(`#wx-nav-${name}`).addClass('router-link-exact-active');
        $(`#wx-nav-${name}`).addClass('router-link-active');
        console.log(name);
      },
      displayFoot() {
        $('.app-footer').css('display','block');
      }
    }
}
</script>
<style>
    @import "../../assets/css/explore.css";

    #explore {
      margin-top: 28px;
    }

    .app-footer {
      display:block;
    }

    .weui-cell_tab {
      height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;
    }

    .wechat-list .list-info {
        position: relative;
        z-index: 2;
        left: 0;
        width: 100%;
        height: 64px;
        padding: 8px;
        background-color: #fff;
    }

    .wechat-list .list-info .header-box {
        position: relative;
        float: left;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        margin-left: 0px;
    }

    .wechat-list .new-msg-count {
        position: absolute;
        font-style: normal;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Helvetica;
        right: -9px;
        top: -5px;
        z-index: 2;
        padding: 0 4px;
        width: auto;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        background-color: #f43531;
    }

    .wechat-list .new-msg-dot {
        position: absolute;
        right: -4px;
        top: -3px;
        width: 10px;
        height: 10px;
        z-index: 2;
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        background-color: red;
        background-color: #f43531;
        font-size: 0;
    }

    .wechat-list .list-info .header-box .header {
        height: 100%;
        border-radius: 5px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
        overflow: hidden;
        background: #dddbdb;
    }

    .wechat-list .list-info .header-box .header img {
        width: 10%;
        height: auto;
        -webkit-box-flex: 2;
        -webkit-flex-grow: 2;
        -ms-flex-positive: 2;
        flex-grow: 2;
        border: 0;
    }

    .wechat-list .list-info .desc-box {
        overflow: hidden;
    }

    .wechat-list .list-info .desc-box .desc-time {
        float: right;
        color: #b8b8b8;
    }

    .wechat-list .list-info .desc-box .desc-author {
        height: 25px;
        line-height: 25px;
        font-size: 16px;
        color: #000;
    }

    .wechat-list .list-info .desc-box .desc-msg {
        height: 23px;
        line-height: 23px;
        font-size: 14px;
        color: #888;
    }

    .wechat-list .list-info .desc-box .desc-msg .desc-mute {
        float: right;
        color: #b8b8b8;
    }

</style>
