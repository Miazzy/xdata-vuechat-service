<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <msg-item v-for="baseMsgObj in messages " :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.mid"></msg-item>
    </ul>
  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as query from '@/request/query';

import search from "../common/search";
import msgItem from "../wechat/msg-item";

export default {
    components: {
        search,
        msgItem,
    },
    mixins: [window.mixin],
    data() {
        return {
            "pageName": "消息",
            messages:[],
            timer:null,
            myuserinfo:null,
        }
    },
    activated() {
      $('#return[tag=div]').remove();
      this.changeStyle();
      this.displayFoot();
      this.userStatus();
      this.queryInfo();
    },
    mounted() {
      this.$store.commit("toggleTipsStatus", -1);
      this.changeStyle();
      this.displayFoot();
      this.userStatus();
      this.queryInfo();
    },
    methods: {
        changeStyle(name){
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
        displayFoot(){
          $('.app-footer').css('display','block');
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
        async queryInfo(){

          const item = this.$store.state.msgList.baseMsg;

          //获取用户信息
          this.myuserinfo = await storage.getStore('system_userinfo');

          await this.queryMessages();

        },
        async queryMessages(){

          //获取此用户的消息消息
          this.messages = await query.queryVMessages(this.myuserinfo.userid , this.myuserinfo.username);

          //将此用户的消息数据转为特定格式的数据
          this.messages.sort((n1,n2) => {
            return n2.id - n1.id;
          });

          //如果定时器存在，则清空原定时器
          if(!!window.wechatTimer){
            clearTimeout(window.wechatTimer);
          }

          //验收加载数据
          window.wechatTimer = this.timeer = setTimeout(async ()=>{
            await this.queryMessages();
          },1000);
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
        }
    }
}
</script>
<style>
    @import "../../assets/css/wechat.css";

    .app-footer {
      display:block;
    }
</style>
