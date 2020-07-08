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
       <router-link id="wx-nax-app" to="/app" tag="dl" @click="changeTab('app');" :style="active == 'app' ? activeStyle:'' ">
          <dt @click="changeTab('app');" class="iconfont icon-app" >
          </dt>
          <dd>应用</dd>
      </router-link>
		  <router-link id="wx-nax-contact" to="/contact" tag="dl" @click="changeTab('contact');" :style="active == 'contact' ? activeStyle:'' ">
          <dt @click="changeTab('contact');" class="iconfont icon-friends" >
          </dt>
          <dd>联系人</dd>
      </router-link>
		  <router-link id="wx-nax-self" to="/self" tag="dl" @click="changeTab('self');" :style="active == 'self' ? activeStyle:'' ">
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
            changeTab(name){
              var that = this;
              this.active = name;
              this.changeStyle(name);
              setTimeout(() => {
                that.changeStyle(name);
              },500);
            },
            changeStyle(name){
              (async () => {
                $('#wx-nav dl').removeClass('router-link-exact-active');
                $('#wx-nav dl').removeClass('router-link-active');
              })();
              (async () => {
                $(`#wx-nav-${name}`).addClass('router-link-exact-active');
                $(`#wx-nav-${name}`).addClass('router-link-active');
              })();
            }
        }
    }
</script>
<style>
    @import "../../assets/css/wx-nav.css";
    @import "../../assets/font_app/iconfont.css";
</style>
