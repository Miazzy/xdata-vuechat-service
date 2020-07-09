<template>
    <!--微信组件-->
  <div id="wechat">
    <ul class="wechat-list">
        <!--props传递消息对象 baseMsgObj -->
        <msg-item v-for="baseMsgObj in $store.state.msgList.baseMsg" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.mid"></msg-item>
    </ul>
  </div>
</template>
<script>
    import search from "../common/search"
    import msgItem from "../wechat/msg-item"
    export default {
        components: {
            search,
            msgItem
        },
        mixins: [window.mixin],
        data() {
            return {
                "pageName": "消息"
            }
        },
        activated() {
          $('#return[tag=div]').remove();
          this.changeStyle();
          this.displayFoot();
        },
        mounted() {
          this.$store.commit("toggleTipsStatus", -1);
          this.changeStyle();
          this.displayFoot();
        },
        methods: {
            changeStyle(name){
              var name = window.location.hash.slice(2);
              $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
              $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
              $(`#wx-nav-${name}`).addClass('router-link-exact-active');
              $(`#wx-nav-${name}`).addClass('router-link-active');
              console.log(name);
            },
            displayFoot(){
              $('.app-footer').css('display','block');
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
