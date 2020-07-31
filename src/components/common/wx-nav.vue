<template>
  <div id="wx-nav">
	<nav>
      <router-link id="wx-nav-explore" to="/explore" tag="dl"  @click="changeTab('explore');" :style="active == 'explore' ? activeStyle:'' ">
          <dt @click="changeTab('explore');" class="iconfont icon-home" >
          </dt>
          <dd>首页</dd>
      </router-link>
      <router-link id="wx-nav-wechat" to="/wechat" tag="dl"  @click="changeTab('wechat');" :style="active == 'wechat' ? activeStyle:'' ">
          <dt @click="changeTab('wechat');" class="iconfont icon-message" >
          </dt>
          <dd>消息</dd>
      </router-link>
       <router-link id="wx-nav-app" to="/app" tag="dl" @click="changeTab('app');" :style="active == 'app' ? activeStyle:'' ">
          <dt @click="changeTab('app');" class="iconfont icon-app" >
          </dt>
          <dd>应用</dd>
      </router-link>
		  <router-link id="wx-nav-contact" to="/contact" tag="dl" @click="changeTab('contact');" :style="active == 'contact' ? activeStyle:'' ">
          <dt @click="changeTab('contact');" class="iconfont icon-friends" >
          </dt>
          <dd>联系人</dd>
      </router-link>
		  <router-link id="wx-nav-self" to="/self" tag="dl" @click="changeTab('self');" :style="active == 'self' ? activeStyle:'' ">
          <dt @click="changeTab('self');" class="iconfont icon-me" >
          </dt>
          <dd>我的</dd>
      </router-link>
    </nav>
  </div>
</template>
<script>
    const active = 'router-link-exact-active router-link-active';
    export default {
        data() {
            return {
              active:'app',
              activeStyle:'router-link-exact-active router-link-active',
            }
        },
        mounted() {
            for (var i in this.$store.state.msgList.baseMsg) {
                if (this.$store.state.msgList.baseMsg[i].read === false && this.$store.state.msgList.baseMsg[i].quiet === false) {
                    this.$store.commit('addNewMsg')
                }
            }
        },
        methods: {
            getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
                if (r != null) return decodeURI(r[2]); return null; //返回参数值
            },
            changeTab(name){
              var that = this;
              var name = window.location.hash.slice(2);
              name = name.includes('?') ? name.split('?')[0] : name;
              name = name.includes('/') ? name.split('/')[0] : name;
              that.active = name;
              setTimeout(() => {
                that.changeStyle(name);
              },0);
              setTimeout(() => {
                that.changeStyle(name);
              },300);
              setTimeout(() => {
                that.changeStyle(name);
              },600);
              setTimeout(() => {
                that.changeStyle(name);
              },900);
              setTimeout(() => {
                that.changeStyle(name);
              },1200);
            },
            changeStyle(name){
              try {
                var name = window.location.hash.slice(2);
                name = name.includes('?') ? name.split('?')[0] : name;
                name = name.includes('/') ? name.split('/')[0] : name;
                $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
                $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
                $(`#wx-nav-${name}`).addClass('router-link-exact-active');
                $(`#wx-nav-${name}`).addClass('router-link-active');
              } catch (error) {
                console.log(error);
              }
              console.log(name);
            }
        }
    }
</script>
<style>
    @import "../../assets/css/wx-nav.css";
    @import "../../assets/font_app/iconfont.css";
</style>
