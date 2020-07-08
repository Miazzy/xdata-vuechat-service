<template>
    <div id="contact">
        <section>
            <div class="weui-cells_contact-head weui-cells weui-cells_access" style="margin-top:-1px">
                <router-link to="/contact/new-friends" class="weui-cell">
                    <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-friend-notify.png"> </div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>新的朋友</p>
                    </div>
                </router-link>
                <router-link to="/contact/group-list" class="weui-cell">
                    <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-addgroup.png"> </div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>我的群组</p>
                    </div>
                </router-link>
                <router-link to="/contact/tags" class="weui-cell" style="display:none;">
                    <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-tag.png"> </div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>标签</p>
                    </div>
                </router-link>
                <router-link to="/contact/official-accounts" class="weui-cell">
                    <div class="weui-cell_hd"><img class="img-obj-cover" src="../../assets/images/contact_top-offical.png"></div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>应用号</p>
                    </div>
                </router-link>
            </div>
            <!--联系人集合-->
            <template v-for="(value,key) in contactsList">
                <!--首字母-->
                <div :ref="`key_${key}`" class="weui-cells__title">{{key}}</div>
                <div class="weui-cells">
                    <router-link :key="item.wxid" :to="{path:'/contact/details',query:{wxid:item.wxid}}" class="weui-cell weui-cell_access" v-for="item in value"
                        tag="div">
                        <div class="weui-cell__hd">
                            <img :src="item.headerUrl" class="home__mini-avatar___1nSrW">
                        </div>
                        <div class="weui-cell__bd">
                            {{item.remark?item.remark:item.nickname}}
                        </div>
                    </router-link>
                </div>
            </template>
</section>
<!--检索-->
<div class="initial-bar"><span @click="toPs(i)" v-for="i in contactsInitialList">{{i}}</span></div>
</div>
</template>
<script>
    export default {
        mixins: [window.mixin],
        data() {
            return {
                "pageName": "通讯录"
            }
        },
        mounted() {
          // mutations.js中有介绍
          this.$store.commit("toggleTipsStatus", -1)
        },
        activated() {
          $('#return[tag=div]').remove();
          this.$store.commit("toggleTipsStatus", -1)
          this.changeStyle();
        },
        computed: {
            contactsInitialList() {
                return this.$store.getters.contactsInitialList
            },
            contactsList() {
                return this.$store.getters.contactsList
            }
        },
        mounted() {
          this.changeStyle();
        },
        methods: {
            toPs(i){
                window.scrollTo(0,this.$refs['key_'+i][0].offsetTop)
            },
            changeStyle(name){
              var name = window.location.hash.slice(2);
              $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
              $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
              $(`#wx-nav-${name}`).addClass('router-link-exact-active');
              $(`#wx-nav-${name}`).addClass('router-link-active');
              console.log(name);
            }
        }
    }
</script>
<style>
    @import "../../assets/css/contact.css";
</style>
