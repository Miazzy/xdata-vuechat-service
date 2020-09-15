<template>

  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header">
        <div class="center">
            <span>用印进度</span>
        </div>
    </header>

    <section>

      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ;" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ;" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已领取
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ;" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已移交
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 5 ;" :style="tabname == 5 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已归档
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initContractList" default-tag-text="待用印" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="sealContractList" default-tag-text="已用印" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading">
          <van-address-list v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="receiveContractList" default-tag-text="已领取" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 4 && !loading && !isLoading">
          <van-address-list v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="frontContractList" default-tag-text="已移交" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 5 && !loading && !isLoading">
          <van-address-list v-show="tabname == 5 && !loading && !isLoading" v-model="hContractID" :list="doneContractList" default-tag-text="已归档" edit-disabled @select="selectHContract()" />
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
            pageName: "公告",
            momentNewMsg: true,
            tabname: '1',
            initContractList:[],
            sealContractList:[],
            receiveContractList:[],
            frontContractList:[],
            doneContractList:[],
            announces:[],
            isLoading:false,
            loading:false,
        }
    },
    activated() {
        this.$store.commit("toggleTipsStatus", -1);
    },
    mounted() {

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
      async queryInfo(){

      },
      async selectHContract(){

      },
    }
}
</script>

<style>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
    .weui-cell__bd {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      font-size: 15px;
    }
    .van-address-list__bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 999;
      box-sizing: border-box;
      width: 100%;
      padding: 0 16px;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      background-color: #fff;
      display: none;
    }
</style>
