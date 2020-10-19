<template>
    <div class="profile">
        <header id="wx-header">
            <div class="center">
                <router-link to="/contact" tag="div" class="iconfont icon-left">
                    <span>联系人</span>
                </router-link>
                <span>详细资料</span>
            </div>
        </header>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd"><img :src="userinfo.headerUrl" alt="" class="self-header" style="width:60px"></div>
                <div class="weui-cell__bd">
                    <h4 class="self-nickname">{{userinfo.nickname}}<span class="gender" :class="[userinfo.sex===1?'gender-male':'gender-female']"></span></h4>
                    <p class="self-wxid" style="font-size: 13px;color: #999;">账号: {{userinfo.wxid}}</p>
                    <p class="nickname" style="font-size: 13px;color: #999;">昵称:{{userinfo.nickname||'无'}}</p>
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>设置备注和标签</p>
                </div>
                <div class="weui-cell__ft">

                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>地区</p>
                </div>
                <div class="weui-cell__ft" style="-webkit-flex: 4;text-align: left;">
                    <span :key="item" v-for="item in userinfo.area">{{item}}&nbsp;&nbsp;&nbsp;</span>
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>动态</p>
                </div>
                <div class="weui-cell__ft" style="-webkit-flex: 4;text-align: left;">
                    <div class="album-list">
                        <img :key="item.imgSrc" :src="item.imgSrc" style="width:50px;margin:0 5px" v-for="item in userinfo.album">
                    </div>
                </div>
            </div>
            <div class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>更多</p>
                </div>
                <div class="weui-cell__ft">

                </div>
            </div>
        </div>

        <a href="javascript:;" class="weui-btn weui-btn_primary" style="width:90%;margin-top:20px;">发消息</a>
        <a href="javascript:;" class="weui-btn weui-btn_default" style="width:90%">视频</a>

    </div>
</template>
<script>
import * as contact from '@/vuex/contacts';
import * as tools from '@/request/tools';

export default {
    data() {
        return {
            pageName: "",
            userinfo:{},
        }
    },
    computed: {
        async userInfo() {

          const wxid = this.$route.query.wxid;

          const allContacts = await contact.queryContacts();

          debugger;

          const userinfo = allContacts.find(item => {
            return item.userid == wxid;
          })

          debugger;

          this.userinfo = userinfo;
          return userinfo;
        }
    }
}
</script>
<style>

</style>
