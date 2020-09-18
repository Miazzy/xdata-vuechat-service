<template>

<keep-alive>
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
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ; queryTabList(1);" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(2);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ; queryTabList(3);" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已领取
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ; queryTabList(4);" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已移交
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 5 ; queryTabList(5);" :style="tabname == 5 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已归档
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 6 ; queryTabList(6);" :style="tabname == 6 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已作废
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
        <template v-show="tabname == 6 && !loading && !isLoading">
          <van-address-list v-show="tabname == 6 && !loading && !isLoading" v-model="hContractID" :list="failContractList" default-tag-text="已作废" edit-disabled @select="selectHContract()" />
        </template>
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
import * as manageAPI from '@/request/manage';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "用印进度",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initContractList:[],
            sealContractList:[],
            receiveContractList:[],
            frontContractList:[],
            doneContractList:[],
            failContractList:[],
            hContractID:'',
            tabmap:{
              '1': 'initContractList',
              '2': 'sealContractList',
              '3': 'receiveContractList',
              '4': 'frontContractList',
              '5': 'doneContractList',
              '6': 'failContractList',
            },
            isLoading:false,
            loading:false,
        }
    },
    activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
    },
    mounted() {
      this.queryInfo();
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
      async queryTabList(tabname){

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,待用印)~and(create_time,gt,${month})`);

          this.initContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
            item.isDefault = true;
          })
        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.sealContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已用印)~and(create_time,gt,${month})`);

          this.sealContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
            item.isDefault = true;
          })
        } else if(tabname == 3){
          //获取最近6个月的已领取记录
          this.receiveContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已领取)~and(create_time,gt,${month})`);

          this.receiveContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
            item.isDefault = true;
          })
        } else if(tabname == 4){
          //获取最近6个月的已移交记录
          this.frontContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,移交前台)~and(create_time,gt,${month})`);

          this.frontContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
            item.isDefault = true;
          })
        } else if(tabname == 5){
          //获取最近6个月的已归档记录
          this.doneContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已完成)~and(create_time,gt,${month})`);

          this.doneContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
            item.isDefault = true;
          })
        } else if(tabname == 6){
          //获取最近6个月的已归档记录
          this.failContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已作废)~and(create_time,gt,${month})`);

          this.failContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
            item.isDefault = true;
          })
        }
      },
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取tabname
        this.tabname = storage.getStore('system_seal_list_tabname') || '1';

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //获取最近6个月的待用印记录
        this.initContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,待用印)~and(create_time,gt,${month})`);

        this.initContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
          item.isDefault = true;
        })

        //获取最近6个月的已用印记录
        this.sealContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已用印)~and(create_time,gt,${month})`);

        this.sealContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
          item.isDefault = true;
        })

        //获取最近6个月的已领取记录
        this.receiveContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已领取)~and(create_time,gt,${month})`);

        this.receiveContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
          item.isDefault = true;
        })

        //获取最近6个月的已移交记录
        this.frontContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,移交前台)~and(create_time,gt,${month})`);

        this.frontContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
          item.isDefault = true;
        })

        //获取最近6个月的已归档记录
        this.doneContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已完成)~and(create_time,gt,${month})`);

        this.doneContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
          item.isDefault = true;
        })

        //获取最近6个月的已归档记录
        this.failContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已作废)~and(create_time,gt,${month})`);

        this.failContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.create_by + ' ' + item.filename + ' ' + item.contract_id;
          item.isDefault = true;
        })

      },
      async selectHContract(){

        //等待N毫秒
        await tools.sleep(0);

        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});

        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none`);
        } else if(this.tabname == '2' && item.seal_type == '非合同类'){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealreceive?id=${id}&statustype=none&type=receive`);
        } else if(this.tabname == '2' || this.tabname == '3'){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=front`);
        } else if(this.tabname == '4' ){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done`);
        } else if(this.tabname == '5' ){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done`);
        } else if(this.tabname == '6' ){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done`);
        }

      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
