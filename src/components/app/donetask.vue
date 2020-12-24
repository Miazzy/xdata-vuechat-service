<template>
  <!--首页组件-->
  <div id="news" style="margin-top: 0px; background: #fdfdfd;" >
    <header id="wx-header">
        <div class="center">
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>已办</span>
        </div>
    </header>
    <section>
      <div class="weui-cells" style="margin-top:0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            计时
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ;" :style="tabname == 2 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            已办
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1">
          <van-loading size="12%" v-show="tabname == 1 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有计时已办任务哦！" v-show="tabname == 1 && tdonetasks.length == 0 && !loading" />
          <div class="list-info" v-show="tabname == 1 && !loading" :key="item.id" v-for=" (item , index) in tdonetasks">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;"></i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png">
             </div>
            </div>
            <div class="desc-box" @click="clickTaskDone(item, 1);">
              <div class="desc-time">{{item.create_time}}</div>
              <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span >{{item.sponsor}}: </span>
                <span>{{item.topic || `${item.name.replace('表','申请')}`}}</span>
              </div>
            </div>
         </div>
         </template>
         <template v-show="tabname == 2">
          <van-loading size="12%" v-show="tabname == 2 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有非计时已办任务哦！" v-show="tabname == 2 && ndonetasks.length == 0 && !loading" />
          <div class="list-info" v-show="tabname == 2 && !loading" :key="item.id" v-for=" (item , index) in ndonetasks">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;"></i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png">
             </div>
            </div>
            <div class="desc-box" @click="clickTaskDone(item, 2);">
              <div class="desc-time">{{item.create_time}}</div>
              <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span >{{item.sponsor}}: </span>
                <span>{{item.topic || `${item.name.replace('表','申请')}`}}</span>
              </div>
            </div>
          </div>
         </template>
      </div>

    </section>
  </div>
</template>
<script>

import news from "../explore/news";

export default {
    components: {
        news
    },
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
            tdonetasks:[],
            ndonetasks:[],
            donetasks:[],
            announces:[],
            loading:false,
        }
    },
    activated() {

        this.renderStatus();
        this.queryAnnounce();
        this.queryEach();
        this.queryTaskDone();
    },
    mounted() {
      this.renderStatus();
      this.queryAnnounce();
      this.queryEach();
      this.queryTaskDone();
    },
    watch: {
      $route(to, from) {
      },
      tabname(){
        this.loading = true;
        this.queryTaskDone();
        setTimeout(() => {
          this.loading = false;
        },500);
      }
    },
    methods: {
      renderStatus(){
        this.tabname = window.decodeURIComponent(this.getUrlParam('tabname') || 1 ) ;;
      },
      getUrlParam(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
      },
      async queryAnnounce(){

        let info = await Betools.storage.getStore('system_userinfo');
        let username = info.username;
        let temp = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = Betools.storage.getStore(`system_announce_by_user@${username}`);

        if( Betools.tools.isNull(result) || result.length <= 0 || result == 'undefined') {

          this.alist = await Betools.announce.queryAnnounceList(0,30);
          this.hlist = await Betools.announce.queryHeadList(0,30);
          this.nlist = await Betools.announce.queryNewsList(0,30);
          this.tlist = await Betools.announce.queryNoticeList(0,30);

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
        this.alist = await Betools.announce.queryAnnounceList(0,30);
        this.hlist = await Betools.announce.queryHeadList(0,30);
        this.nlist = await Betools.announce.queryNewsList(0,30);
        this.tlist = await Betools.announce.queryNoticeList(0,30);
      },
      async queryTaskDone(){
        let info = await Betools.storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = Betools.storage.getStore(`system_app_task_done_by_user@${username}`);

        if( Betools.tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          let one = (await Betools.task.queryProcessLogDone(username , realname , 0 , 99))||[];
          let two = (await Betools.task.queryProcessLogDone(username , realname , 1 , 99))||[];
          let three = (await Betools.task.queryProcessLogDone(username , realname , 2 , 99))||[];
          tlist= [...one , ...two , ...three];
          Betools.storage.setStore(`system_app_task_done_by_user@${username}` , tlist , 3600);
        } else {
          tlist = result;
        }

        //获取所有的已办任务
        this.donetasks = JSON.parse(JSON.stringify(tlist));

        //过滤，去掉计时已办业务
        this.ndonetasks = tlist.filter((item) => {
          return !Betools.task.TIME_TASK_NAME.includes(item.name);
        });

        //过滤，去掉非计时已办业务
        this.tdonetasks = tlist.filter((item) => {
          return Betools.task.TIME_TASK_NAME.includes(item.name);
        });

      },
      async clickTaskDone(item , tabname = 1){
        if(item.tname == 'bs_seal_regist'){
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${item.id}&statustype=none&type=finish&view=view&back=/app/donetask?tabname=${tabname}`);
        } else {
          this.$router.push(`/explore/content?id=${item.id}&pid=${item.pid}&backpath=${encodeURI(`/app/donetask?tabname=${tabname}`)}&tasktype=wait&tname=${item.tname}&bname=${encodeURI(item.name)}&username=${item.proponents}&sponsor=${encodeURI(item.sponsor)}&topic=${encodeURI(item.topic)}&title=${encodeURI(item.topic)}&files=${encodeURI(item.files)}`)
        }
      },
      async clickTaskDoing(item , tabname){
        if(item.tname == 'bs_seal_regist' && item.topic.includes('#待用印')){
          this.$router.push(`/app/sealview?id=${item.id}&statustype=none&type=seal&view=edit&back=/app/doingtask?tabname=${tabname}`); //跳转到相应的用印界面
        } else if(item.tname == 'bs_seal_regist' && item.topic.includes('#待移交')){
          this.$router.push(`/app/sealview?id=${item.id}&statustype=none&type=front&view=edit&back=/app/doingtask?tabname=${tabname}`); //跳转到相应的用印界面
        } else {
          this.$router.push(`/explore/content?id=${item.id}&pid=${item.pid}&backpath=${encodeURI(`/app/doingtask?tabname=${tabname}`)}&tasktype=wait&tname=${item.tname}&bname=${encodeURI(item.name)}&username=${item.proponents}&sponsor=${encodeURI(item.sponsor)}&topic=${encodeURI(item.topic)}&title=${encodeURI(item.topic)}&files=${encodeURI(item.files)}`);
        }
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
