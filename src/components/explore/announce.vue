<template>
  <!--首页组件-->
  <div id="news" style="margin-top: 0px;" >
    <header id="wx-header">
        <div class="center">
            <router-link :to="`${from}?tabname=${tabname}`" @click="$router.push(`${from}?tabname=${tabname}`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>公告</span>
        </div>
    </header>
    <section>
      <div class="weui-cells" style="margin-top:0px;display:none;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 0px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            {{type}}
          </div>
        </div>
      </div>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
          <van-notice-bar
              left-icon="volume-o"
              color="#1989fa"
              background="#ecf9ff"
              :text="title"
            />
        </div>
        <div class="weui-cells" style="margin-top:10px;border-bottom:0px solid #fefefe;">
          <div style="margin-left:10px;margin-bottom:10px;">{{type}}：</div>
          <div style="margin-left:10px;margin-bottom:10px;" v-html="content"></div>
          <div style="margin-top:10px;margin-bottom:10px;" v-show=" (purl != '' && purl != null && typeof purl != 'undefined')">
            <iframe style="width:100%;height:600px;" :src="purl">
            </iframe>
          </div>
          <div style="height:100px;" ></div>
        </div>
      </div>

    </section>
  </div>
</template>
<script>

import * as announce from '@/request/announce';


export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "公告",
            momentNewMsg: true,
            tabname: '1',
            alist:[],
            hlist:[],
            nlist:[],
            tlist:[],
            type:'',
            title:'',
            content:'',
            files:'',
            purl:'',
            from:'',
            previewurl:'',
            announces:[],
        }
    },
    activated() {
        this.queryAnnounce();
        this.queryEach();
        this.queryInfo();
    },
    mounted() {
      this.queryAnnounce();
      this.queryEach();
      this.queryInfo();
    },
    methods: {
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      getUrlParam(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
      },
      async queryInfo(){
        this.type = window.decodeURIComponent(this.getUrlParam('type'));
        this.title = window.decodeURIComponent(this.getUrlParam('title'));
        this.content = window.decodeURIComponent(this.getUrlParam('content'));
        this.files = window.decodeURIComponent(this.getUrlParam('files'));
        this.from = window.decodeURIComponent(this.getUrlParam('from'));
        this.tabname = window.decodeURIComponent(this.getUrlParam('tabname'));
        this.previewurl = await Betools.tools.queryFileViewURL(this.files);
        if(this.previewurl&&this.previewurl.endsWith('pdf')){
          this.purl = Betools.constant.PDF_PREVIEW_URL + this.previewurl;
        } else if(this.previewurl){
          this.purl = Betools.constant.OFFICE_PREVIEW_URL + this.previewurl;
        }
      },
      async queryAnnounce(){

        let info = await Betools.storage.getStore('system_userinfo');
        let username = info.username;
        let temp = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = Betools.storage.getStore(`system_announce_by_user@${username}`);

        if( Betools.tools.isNull(result) || result.length <= 0 || result == 'undefined') {

          this.alist = await announce.queryAnnounceList(0,30);
          this.hlist = await announce.queryHeadList(0,30);
          this.nlist = await announce.queryNewsList(0,30);
          this.tlist = await announce.queryNoticeList(0,30);

          temp = [...this.alist , ...this.hlist , ...this.nlist , ...this.tlist];
          temp = temp.flat();
          temp.sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
          Betools.storage.setStore(`system_announce_by_user@${username}` , temp , 60);
        } else {
          temp = result;
        }

        this.announces = temp.slice(0,30);
      },
      async queryEach(){
        this.alist = await announce.queryAnnounceList(0,30);
        this.hlist = await announce.queryHeadList(0,30);
        this.nlist = await announce.queryNewsList(0,30);
        this.tlist = await announce.queryNoticeList(0,30);
      }
    }
}
</script>
<style>
    @import "../../assets/css/explore.css";

    #news {
      margin-top: 28px;
    }

    #search {
      display:none;
    }

    .app-header {
        /* position: absolute; */
        position: relative;
        transition: 0.3s;
        width: 100%;
        z-index: 10000;
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        background: linear-gradient(180deg, #303036, #3c3b40);
        color: #fff;
        text-align: center;
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
