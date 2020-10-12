<template>

<keep-alive>

  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header">
        <div class="center">
            <span>入职进度</span>
        </div>
    </header>

    <section>

      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待确认
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ;" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已确认
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ;" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已完成
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initList" default-tag-text="待确认" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="confirmList" default-tag-text="已确认" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading">
          <van-address-list v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="doneList" default-tag-text="已完成" edit-disabled @select="selectHContract()" />
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
            pageName: "入职进度",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initList:[],
            confirmList:[],
            doneList:[],
            hContractID:'',
            tname: 'bs_entry_job',
            tabmap:{
              '1': 'initList',
              '2': 'confirmList',
              '3': 'doneList',
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
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取tabname
        this.tabname = storage.getStore('system_entryjob_list_tabname') || '1';

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //获取最近6个月的待用印记录
        this.initList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,待确认)~and(create_time,gt,${month})`);

        this.initList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` +  ' HR:' + item.hr_name;
          item.isDefault = true;
        })

        //获取最近6个月的已用印记录
        this.confirmList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,已确认)~and(create_time,gt,${month})`);

        this.confirmList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` + ' HR:' + item.hr_name;
          item.isDefault = true;
        })

        //获取最近6个月的已领取记录
        this.doneList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,已完成)~and(create_time,gt,${month})`);

        this.doneList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` + ' HR:' + item.hr_name;
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
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=hr`);
        } else if(this.tabname == '2'){
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=hr`);
        } else if(this.tabname == '3' ){
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=done`);
        }

      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
