<template>
  <!--首页组件-->
  <div id="task" style="margin-top: 0px; background: #fdfdfd;" >
    <header id="wx-header">
        <div class="center">
            <router-link to="/explore" @click="$router.push(`/explore`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>任务</span>
        </div>
    </header>

    <section>
      <div class="weui-cells" style="margin-top: 0px;">
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
            本人
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 5 ;" :style="tabname == 5 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            收藏
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1">
          <van-loading size="12%" v-show="tabname == 1 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有计时待办任务哦！" v-show="tabname == 1 && timetasks.length == 0 && !loading" />
          <div class="list-info" v-show="tabname == 1 && !loading" :key="item.id" v-for=" (item , index) in timetasks">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png">
              </div>
              </div>
              <div class="desc-box">
                <div class="desc-time">{{item.create_time}}</div>
                <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
                <div class="desc-msg">
                  <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                  <span>{{item.sponsor}}: </span>
                  <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
                </div>
              </div>
          </div>
         </template>
         <template v-show="tabname == 2">
          <van-loading size="12%" v-show="tabname == 2 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有非计时待办任务哦！" v-show="tabname == 2 && doingtasks.length == 0 && !loading" />
          <div class="list-info" v-show="tabname == 2 && !loading" :key="item.id" v-for=" (item , index) in doingtasks">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png">
              </div>
              </div>
              <div class="desc-box">
                <div class="desc-time">{{item.create_time}}</div>
                <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
                <div class="desc-msg">
                  <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                  <span>{{item.sponsor}}: </span>
                  <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
                </div>
              </div>
          </div>
         </template>
         <template v-show="tabname == 3">
          <van-loading size="12%" v-show="tabname == 3 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有已办任务哦！" v-show="tabname == 3 && donetasks.length == 0 && !loading" />
          <div class="list-info" v-show="tabname == 3 && !loading" :key="item.id" v-for=" (item , index) in donetasks">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;"></i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">{{item.create_time}}</div>
              <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span >{{item.sponsor}}: </span>
                <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
              </div>
            </div>
         </div>
        </template>
        <template v-show="tabname == 4">
         <van-loading size="12%" v-show="tabname == 4 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
         <van-empty description="您还没有已办任务(本人)哦！" v-show="tabname == 4 && selftasks.length == 0 && !loading" />
         <div class="list-info" v-show="tabname == 4 && !loading" :key="item.id" v-for=" (item , index) in selftasks">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;"></i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">{{item.create_time}}</div>
              <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span ></span>
                <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
              </div>
            </div>
         </div>
        </template>
        <template v-show="tabname == 5">
         <van-loading size="12%" v-show="tabname == 5 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
         <van-empty description="您还没有已收藏任务哦！" v-show="tabname == 5 && collecttasks.length == 0 && !loading" />
        </template>
      </div>

    </section>
  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as announce from '@/request/announce';
import * as task from '@/request/task';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "任务",
            momentNewMsg: true,
            tabname: '1',
            donetasks:[],
            doingtasks:[],
            timetasks:[],
            selftasks:[],
            collecttasks:[],
            loading:false,
        }
    },
    activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryTaskDone();
        this.queryTaskDoing();
        this.queryTaskTiming();
        this.queryTaskSelf();
    },
    mounted() {
      this.queryTaskDone();
      this.queryTaskDoing();
      this.queryTaskTiming();
      this.queryTaskSelf();
    },
    watch: {
      $route(to, from) {

      },
      tabname(){
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        },500);
      }
    },
    methods: {
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      queryReturnDiv(){
        var that = this;
        $('.center').prepend(`<div id="return" tag="div" class="iconfont icon-left">
                                  <span style="margin-left:10px;">返回</span>
                              </div>`);
        $('#return[tag=div]').click(()=>{
          that.$router.push(`/explore`);
        });
      },
      async queryTaskDone(){
        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_done_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogDone(username , realname , 0 , 30);
          storage.setStore(`system_task_done_by_user@${username}` , tlist , 3600 * 2);
        } else {
          tlist = result;
        }

        this.donetasks = tlist;
      },
      async queryTaskDoing(){
        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_doing_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogWait(username , realname , 0 , 99);
          storage.setStore(`system_task_doing_by_user@${username}` , tlist , 3600 * 2);
        } else {
          tlist = result;
        }

        //过滤，去掉计时待办业务
        tlist = tlist.filter((item)=>{
          return !task.TIME_TASK_NAME.includes(item.name);
        })

        tlist = tlist.slice(0,30);

        this.doingtasks = tlist;
      },
      async queryTaskTiming(){

        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_time_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogWait(username , realname , 0 , 99);
          storage.setStore(`system_task_time_by_user@${username}` , tlist , 3600 * 2);
        } else {
          tlist = result;
        }

        //过滤，去掉非计时待办业务
        tlist = tlist.filter((item)=>{
          return task.TIME_TASK_NAME.includes(item.name);
        })

        tlist = tlist.slice(0,30);

        this.timetasks = tlist;
      },
      async queryTaskSelf(){
        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_done_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogDone(username , realname , 0 , 90);
          storage.setStore(`system_task_done_by_user@${username}` , tlist , 3600 * 2);
        } else {
          tlist = result;
        }

        //过滤，去掉计时待办业务
        tlist = tlist.filter((item)=>{
          return item.sponsor ==  info.realname;
        })

        tlist = tlist.slice(0,30);

        this.selftasks = tlist;
      },
    }
}
</script>
<style>
    @import "../../assets/css/explore.css";

    #task {
      margin-top: 28px;
    }

    #search {
      display:none;
    }

    .weui-cell_tab {
      height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;
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
