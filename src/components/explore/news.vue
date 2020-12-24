<template>
  <!--首页组件-->
  <div id="news" style="margin-top: 0px; background: #fdfdfd;" >
    <header id="wx-header">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>公告</span>
        </div>
    </header>
    <section>
      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            最新
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ;" :style="tabname == 2 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            行政
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ;" :style="tabname == 3 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            红头
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ;" :style="tabname == 4 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            新闻
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 5 ;" :style="tabname == 5 ? `border-bottom: 1px solid #329ff0;` : `border-bottom: 0px solid #329ff0;` ">
            奖罚
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 1 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="暂无公告！" v-show="tabname == 1 && announces.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 1 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
          <div class="list-info" v-show="tabname == 1 && !loading" :key="item.id" v-for=" (item , index) in announces.slice(0,8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
              </div>
              </div>
              <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
          <div class="list-info" v-show="tabname == 1 && !loading" :key="item.id" v-for=" (item , index) in announces.slice(8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
              </div>
              </div>
              <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
         <template v-show="tabname == 2 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 2 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="暂无公告！" v-show="tabname == 2 && alist.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 2 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
            <div class="list-info" v-show="tabname == 2 && !loading" :key="item.id" v-for=" (item , index) in alist.slice(0,8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
              </div>
              </div>
              <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
          <div class="list-info" v-show="tabname == 2 && !loading" :key="item.id" v-for=" (item , index) in alist.slice(8)">
              <div class="header-box">
              <i class="new-msg-count" style="display: none;"></i>
              <i class="new-msg-dot" style="display: none;"></i>
              <div class="header">
                <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
              </div>
              </div>
              <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
         <template v-show="tabname == 3 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 3 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="暂无公告！" v-show="tabname == 3 && hlist.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 3 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
            <div class="list-info" v-show="tabname == 3 && !loading" :key="item.id" v-for=" (item , index) in hlist.slice(0,8)">
                <div class="header-box">
                <i class="new-msg-count" style="display: none;"></i>
                <i class="new-msg-dot" style="display: none;"></i>
                <div class="header">
                  <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
                </div>
                </div>
                <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
          <div class="list-info" v-show="tabname == 3 && !loading" :key="item.id" v-for=" (item , index) in hlist.slice(8)">
                <div class="header-box">
                <i class="new-msg-count" style="display: none;"></i>
                <i class="new-msg-dot" style="display: none;"></i>
                <div class="header">
                  <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
                </div>
                </div>
                <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
         <template v-show="tabname == 4 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 4 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="暂无公告！" v-show="tabname == 4 && nlist.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 4 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
            <div class="list-info" v-show="tabname == 4 && !loading" :key="item.id" v-for=" (item , index) in nlist.slice(0,8)">
                <div class="header-box">
                <i class="new-msg-count" style="display: none;"></i>
                <i class="new-msg-dot" style="display: none;"></i>
                <div class="header">
                  <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
                </div>
                </div>
                <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
          <div class="list-info" v-show="tabname == 4 && !loading" :key="item.id" v-for=" (item , index) in nlist.slice(8)">
                <div class="header-box">
                <i class="new-msg-count" style="display: none;"></i>
                <i class="new-msg-dot" style="display: none;"></i>
                <div class="header">
                  <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
                </div>
                </div>
                <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
         <template v-show="tabname == 5 && !loading && !isLoading">
          <van-loading size="12%" v-show="tabname == 5 && loading" vertical style="display:flex;margin: 0px auto;margin-top:10px;margin-left:0%;text-align: center;">加载中...</van-loading>
          <van-empty description="暂无公告！" v-show="tabname == 5 && tlist.length == 0 && !loading" />
          <van-pull-refresh
            v-show="tabname == 5 && !loading"
            v-model="isLoading"
            success-text="刷新成功"
            @refresh="refreshData"
            style="min-height:400px;"
          >
            <div class="list-info" v-show="tabname == 5 && !loading" :key="item.id" v-for=" (item , index) in tlist.slice(0,8)">
                <div class="header-box">
                <i class="new-msg-count" style="display: none;"></i>
                <i class="new-msg-dot" style="display: none;"></i>
                <div class="header">
                  <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
                </div>
                </div>
                <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
          <div class="list-info" v-show="tabname == 5 && !loading" :key="item.id" v-for=" (item , index) in tlist.slice(8)">
                <div class="header-box">
                <i class="new-msg-count" style="display: none;"></i>
                <i class="new-msg-dot" style="display: none;"></i>
                <div class="header">
                  <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
                </div>
                </div>
                <div class="desc-box" @click="$router.push(`/explore/announce?id=${item.id}&type=${item.announce_type}&title=${encodeURI(item.title)}&content=${encodeURI(item.content)}&files=${encodeURI(item.files)}&tabname=${tabname}&from=/explore/news`)">
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
      </div>

    </section>
  </div>
</template>

<script>


import * as announce from '@/request/announce';
import * as task from '@/request/task';

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
            announces:[],
            isLoading:false,
            loading:false,
            back:'/app',
        }
    },
    activated() {

        this.queryAnnounce();
        this.queryEach();
    },
    mounted() {
      this.queryAnnounce();
      this.queryEach();
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
                                  <span style="margin-left:10px;" >返回</span>
                              </div>`);
        $('#return[tag=div]').click(()=>{
          that.$router.push(`/explore`);
        });
      },
      async queryAnnounce(){

        let info = await Betools.storage.getStore('system_userinfo');
        let username = info.username;
        let temp = null;

        this.tabname = (await Betools.tools.getUrlParam('tabname')) || '1';

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

        //获取返回页面
        this.back = Betools.tools.getUrlParam('back') || '/app';
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
    @import "../../assets/css/news.css";
</style>
