<template>
  <keep-alive>
  <!--首页组件-->
  <div id="explore" style="margin-top: -18px;" >
    <section>
      <div class="weui-cells">
        <div class="weui-cell weui-cell_access" id="scanCell" style="margin-top:10px;">
          <div class="weui-cell_app_hd" style="margin-left:5px;">
          <router-link to="/explore/task" tag="dl">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png" >
              <div class="weui-cell_app_bd" >
                任务
              </div>
          </router-link>
          </div>
          <div class="weui-cell_app_hd">
          <router-link to="/explore/news?back=/explore" tag="dl">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png" >
            <div class="weui-cell_app_bd">
              公告
            </div>
          </router-link>
          </div>
          <div class="weui-cell_app_hd">
          <router-link to="/explore/punch?back=/explore" tag="dl">
           <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/daka.png" >
            <div class="weui-cell_app_bd">
              打卡
            </div>
          </router-link>
          </div>
          <div class="weui-cell_app_hd">
          <router-link to="/explore/sign?back=/explore" tag="dl">
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

        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 1 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有计时待办任务哦！" v-show="tabname == 1 && timetasks.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 1 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
          <div class="list-info" style="margin-top:0px;" v-show="tabname == 1 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in timetasks.slice(0,8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png">
              </div>
              </div>
              <div class="desc-box" @click="clickTaskDoing(item , 1);">
                <div class="desc-time">{{item.create_time}}</div>
                <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
                <div class="desc-msg">
                  <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                  <span>{{item.sponsor}}: </span>
                  <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
                </div>
              </div>
          </div>
          </van-pull-refresh>
          <div class="list-info" style="margin-top:0px;" v-show="tabname == 1 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in timetasks.slice(8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png">
              </div>
              </div>
              <div class="desc-box" @click="clickTaskDoing(item , 1);">
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

         <template v-show="tabname == 2 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 2 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有非计时待办任务哦！" v-show="tabname == 2 && doingtasks.length == 0 && !loading" />
          <van-pull-refresh
             v-show="tabname == 2 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
          <div class="list-info" v-show="tabname == 2 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in doingtasks.slice(0,8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png">
              </div>
              </div>
              <div class="desc-box" @click="clickTaskDoing(item , 2);">
                <div class="desc-time">{{item.create_time}}</div>
                <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
                <div class="desc-msg">
                  <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                  <span>{{item.sponsor}}: </span>
                  <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
                </div>
              </div>
          </div>
          </van-pull-refresh>
          <div class="list-info" v-show="tabname == 2 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in doingtasks.slice(8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png">
              </div>
              </div>
              <div class="desc-box" @click="clickTaskDoing(item , 2)">
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

         <template v-show="tabname == 3 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 3 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="您还没有已办任务哦！" v-show="tabname == 3 && donetasks.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 3 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
          <div class="list-info" v-show="tabname == 3 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in donetasks.slice(0,8)">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;"></i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png">
             </div>
            </div>
            <div class="desc-box" @click="clickTaskDone(item , 3);">
              <div class="desc-time">{{item.create_time}}</div>
              <div class="desc-author">{{`${item.type} - ${item.name}`}}</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span >{{item.sponsor}}: </span>
                <span>{{item.topic || `${item.name.replace('表','')}申请`}}</span>
              </div>
            </div>
          </div>
          </van-pull-refresh>
          <div class="list-info" v-show="tabname == 3 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in donetasks.slice(8)">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;"></i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png">
             </div>
            </div>
            <div class="desc-box" @click="clickTaskDone(item , 3);">
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

         <template v-show="tabname == 4 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 4 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="暂无公告！" v-show="tabname == 4 && announces.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 4 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
          <div class="list-info" v-show="tabname == 4 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in announces.slice(0,8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
              </div>
              </div>
              <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&pid=${item.pid}&backpath=${encodeURI(`/explore?tabname=4`)}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=4&from=/explore`)">
                <div class="desc-time">{{item.create_time}}</div>
                <div class="desc-author">{{item.announce_type}}</div>
                <div class="desc-msg">
                  <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                  <span style="display: none;"></span>
                  <span>{{item.title}}</span>
                </div>
              </div>
          </div>
          </van-pull-refresh>
          <div class="list-info" v-show="tabname == 4 && !loading && !isLoading" :key="item.id + '' + index" v-for=" (item , index) in announces.slice(8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
              </div>
              </div>
              <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&pid=${item.pid}&backpath=${encodeURI(`/explore?tabname=4`)}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=4&from=/explore`)">
                <div class="desc-time">{{item.create_time}}</div>
                <div class="desc-author">{{item.announce_type}}</div>
                <div class="desc-msg">
                  <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                  <span style="display: none;"></span>
                  <span>{{item.title}}</span>
                </div>
              </div>
          </div>

         </template>

         <div style="height:100px;">

         </div>

      </div>

    </section>
  </div>
  </keep-alive>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as workconfig from '@/request/workconfig';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "首页",
            momentNewMsg: true,
            tabname: '1',
            announces:[],
            donetasks:[],
            doingtasks:[],
            timetasks:[],
            isLoading:false,
            loading:false,
        }
    },
    async activated() {
      $('#return[tag=div]').remove();

      this.changeStyle();
      this.displayFoot();
      this.userStatus();
      this.queryAnnounce();
      this.queryTaskDone();
      this.queryTaskDoing();
      this.queryTaskTiming();
    },
    async mounted() {
      $('#return[tag=div]').remove();
      this.changeStyle();
      this.displayFoot();
      this.userStatus();
      this.queryAnnounce();
      this.queryTaskDone();
      this.queryTaskDoing();
      this.queryTaskTiming();
    },
    watch: {
      $route(to, from) {
        var that = this;
        (async () => {
          await that.goUrl(to , from);
        })();
      },
      tabname(){
        this.loading = true;
        setTimeout(async () => {
          if(this.tabname == 1){
            await this.queryTaskTiming();
          } else if(this.tabname == 2){
            await this.queryTaskDoing();
          } else if(this.tabname == 3){
            await this.queryTaskDone();
          } else if(this.tabname == 4){
            await this.queryAnnounce();
          }
          this.loading = false;
        },500);
      }
    },
    methods: {
      async goUrl(to , from){
        //获取URL参数
        var path = this.$route.path;
        if(path == '/explore'){
          $('#return[tag=div]').remove();
          this.changeStyle();
          this.displayFoot();
          this.userStatus();
          this.queryAnnounce();
          this.queryTaskDone();
          this.queryTaskDoing();
          this.queryTaskTiming();
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
      encodeURI(value){
        return window.encodeURIComponent(value);
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
      async queryAnnounce(){

        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let temp = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_announce_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {

          let alist = await announce.queryAnnounceList(0,10);
          let hlist = await announce.queryHeadList(0,10);
          let nlist = await announce.queryNewsList(0,10);
          let tlist = await announce.queryNoticeList(0,10);

          temp = [...alist , ...hlist , ...nlist , ...tlist];
          temp = temp.flat();
          temp.sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
          storage.setStore(`system_announce_by_user@${username}` , temp , 60);
        } else {
          temp = result;
        }

        this.announces = temp.slice(0,30);
      },
      async refreshData(){
        setTimeout(() => {
          vant.Toast('刷新成功');
          this.isLoading = false;
          this.count++;
        }, 1000);
      },
      async queryTaskDone(){
        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_done_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogDone(username , realname , 0 , 1000);
          storage.setStore(`system_task_done_by_user@${username}` , tlist , 60);
        } else {
          tlist = result;
        }

        try {
          //遍历数据，并放入缓存中
          tlist.map((item)=>{
            item['sponsor'] = tools.isNull(item['sponsor']) ? realname : item['sponsor'];
            storage.setStore(`system_task_done_item_by_id@${item.id}` , item , 60);
          });

          this.donetasks = tlist;
        } catch (error) {
          console.log(error);
        }
      },
      async queryTaskDoing(){
        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_doing_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogWait(username , realname , 0 , 1000);
          storage.setStore(`system_task_doing_by_user@${username}` , tlist , 10);
        } else {
          tlist = result;
        }

        try {
          //遍历数据，并放入缓存中
          tlist.map((item)=>{
            item['sponsor'] = tools.isNull(item['sponsor']) ? realname : item['sponsor'];
            storage.setStore(`system_task_doing_item_by_id@${item.id}` , item , 10);
          });

          //过滤，去掉计时待办业务
          tlist = tlist.filter((item)=>{
            return !task.TIME_TASK_NAME.includes(item.name);
          })

          tlist = tlist.slice(0,30);

          this.doingtasks = tlist;
        } catch (error) {
          console.log(error);
        }

      },
      async queryTaskTiming(){

        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let realname = info.realname;
        let tlist = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_task_time_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {
          tlist = await task.queryProcessLogWait(username , realname , 0 , 1000);
          storage.setStore(`system_task_time_by_user@${username}` , tlist , 10);
        } else {
          tlist = result;
        }

        try {
          //遍历数据，并放入缓存中
          tlist.map((item)=>{
            item['sponsor'] = tools.isNull(item['sponsor']) ? realname : item['sponsor'];
            storage.setStore(`system_task_doing_item_by_id@${item.id}` , item , 10);
          });

          //过滤，去掉非计时待办业务
          tlist = tlist.filter((item)=>{
            return task.TIME_TASK_NAME.includes(item.name);
          })

          tlist = tlist.slice(0,30);

          this.timetasks = tlist;
        } catch (error) {
          console.log(error);
        }

      },
      async clickTaskDone(item, tabname = 1){
        if(item.tname == 'bs_seal_regist'){ //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${item.id}&pid=${item.pid}&statustype=none&type=finish&view=view&back=/explore`);
        } else if(item.tname == 'bs_goods_receive'){ //跳转到相应的物品领用界面
          this.$router.push(`/app/goodsview?id=${item.id}&pid=${item.pid}&statustype=none&type=finish&view=view&back=/explore`);
        } else if(item.tname == 'bs_goods_borrow'){ //跳转到相应的物品领用界面
          this.$router.push(`/app/borrow?id=${item.id}&pid=${item.pid}&statustype=none&type=finish&view=view&back=/explore`);
        } else {
          this.$router.push(`/explore/content?id=${item.id}&pid=${item.pid}&backpath=${encodeURI(`/explore?tabname=${tabname}`)}&tasktype=done&tname=${item.tname}&bname=${encodeURI(item.name)}&username=${item.proponents}&sponsor=${encodeURI(item.sponsor)}&topic=${encodeURI(item.topic)}&title=${encodeURI(item.topic)}&files=${encodeURI(item.files)}`);
        }
      },
      async clickTaskDoing(item , tabname = 1){
        if(item.tname == 'bs_seal_regist' && item.topic.includes('#待用印')){
          this.$router.push(`/app/sealview?id=${item.id}&pid=${item.pid}&statustype=none&type=seal&view=edit&back=/explore`); //跳转到相应的用印界面
        } else if(item.tname == 'bs_seal_regist' && item.topic.includes('#待移交')){
          this.$router.push(`/app/sealview?id=${item.id}&pid=${item.pid}&statustype=none&type=front&view=edit&back=/explore`); //跳转到相应的用印界面
        } else if(item.tname == 'bs_goods_receive' && item.topic.includes('#待处理')){
          this.$router.push(`/app/goodsview?id=${item.id}&pid=${item.pid}&statustype=none&type=none&role=front&view=edit&back=/explore`); //跳转到相应的用印界面
        } else if(item.tname == 'bs_goods_receive' && item.topic.includes('#已领取')){
          this.$router.push(`/app/goodsview?id=${item.id}&pid=${item.pid}&statustype=none&type=none&role=receive&view=edit&back=/explore`); //跳转到相应的用印界面
        } else if(item.tname == 'bs_goods_borrow' && item.topic.includes('#待处理')){
          this.$router.push(`/app/borrow?id=${item.id}&pid=${item.pid}&statustype=none&type=none&role=front&view=edit&back=/explore`); //跳转到相应的用印界面
        } else if(item.tname == 'bs_goods_borrow' && item.topic.includes('#已借用')){
          this.$router.push(`/app/borrow?id=${item.id}&pid=${item.pid}&statustype=none&type=none&role=front&view=edit&back=/explore`); //跳转到相应的用印界面
        } else {
          this.$router.push(`/explore/content?id=${item.id}&pid=${item.pid}&backpath=${encodeURI(`/explore?tabname=${tabname}`)}&tasktype=wait&tname=${item.tname}&bname=${encodeURI(item.name)}&username=${item.proponents}&sponsor=${encodeURI(item.sponsor)}&topic=${encodeURI(item.topic)}&title=${encodeURI(item.topic)}&files=${encodeURI(item.files)}`);
        }
      }
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
</style>
