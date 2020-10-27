<template>

<keep-alive>

  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" v-show="!searchFlag">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>入职进度</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 12px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 54px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
            </van-dropdown-menu>
        </div>
    </header>

    <header id="wx-header" class="header-search" v-show="!!searchFlag" style="padding:0px 0px 1px 0px; border-bottom:1px solid #cecece;">
       <div>
          <van-search
            v-model="searchWord"
            show-action
            placeholder="请输入搜索关键词"
          >
            <template #action>
              <div @click="headMenuSearch();" >搜索</div>
            </template>
          </van-search>
        </div>
    </header>

    <section>

      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div v-show="role == 'hr'" class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待确认
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ;" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已确认
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ;" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已完成
          </div>
          <div v-show="role == 'hr'" class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ;" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已驳回
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
        <template v-show="tabname == 4 && !loading && !isLoading">
          <van-address-list v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="rejectList" default-tag-text="已驳回" edit-disabled @select="selectHContract()" />
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

//import JsonExcel from "vue-json-excel";
try {
  Vue.component("downloadExcel", JsonExcel);
} catch (error) {
  console.log(error);
}

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
              '4': 'rejectList',
            },
            searchWord:'',
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            role:'',
            isLoading:false,
            loading:false,
            back:'/app',
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
      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      //点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          //刷新相应表单
          this.queryTabList(this.tabname);
          //显示搜索状态
          vant.Toast('搜索...');
          //等待一下
          await tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      //点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 0: //只显示合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryTabList(this.tabname , 0);
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryTabList(this.tabname , 0);
            break;
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.queryTabList(this.tabname , 0);
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            this.searchFlag = true;
            break;
          case 4: //重置数据
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.searchFlag = false;
            this.searchWord = '';
            await this.queryTabList(this.tabname , 0);
            break;
          case 5: //返回应用
            this.$router.push(`/app`);
            break;
          case 6: //返回首页
            this.$router.push(`/explore`);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取返回页面
        this.back = tools.getUrlParam('back') || '/app';
        this.role = tools.getUrlParam('role') || 'front';

        //获取tabname
        this.tabname = storage.getStore('system_entryjob_list_tabname') || '1';

        //如果角色不是HR，且tabname为1，则修改为2
        if(this.role != 'hr' && (this.tabname == '1' || this.tabname == '4')){
          this.tabname = '2';
        }

        //查询员工信息列表
        await this.queryTabList(this.tabname ,0);

      },
      async queryTabList(tabname , page){

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');
        //设置查询语句
        var searchSql = '';

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((username,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(position,like,~${this.searchWord}~)~or(hr_name,like,~${this.searchWord}~)~or(bank_card,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(idcard,like,~${this.searchWord}~))`;
        }

        //获取最近6个月的待用印记录
        this.initList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,待确认)~and(create_time,gt,${month})${searchSql}`);

        this.initList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` +  ' HR:' + item.hr_name;
          item.isDefault = true;
        });

        //获取最近6个月的已确认记录
        this.confirmList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,已确认)~and(create_time,gt,${month})${searchSql}`);

        this.confirmList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` + ' HR:' + item.hr_name;
          item.isDefault = true;
        });

        //获取最近6个月的已完成记录
        this.doneList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,已完成)~and(create_time,gt,${month})${searchSql}`);

        this.doneList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` + ' HR:' + item.hr_name;
          item.isDefault = true;
        });

        //获取最近6个月的已驳回记录
        this.rejectList = await manageAPI.queryTableData(this.tname , `_where=(status,eq,已驳回)~and(create_time,gt,${month})${searchSql}`);

        this.rejectList.map((item , index) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` + ' HR:' + item.hr_name;
          item.isDefault = true;
        });
      },
      async selectHContract(){

        //等待N毫秒
        await tools.sleep(0);

        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});

        //获取角色ROLE
        const role = tools.getUrlParam('role') || 'admin';

        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=${role}&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        } else if(this.tabname == '2'){
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=${role}&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        } else if(this.tabname == '3' ){
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=done&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
         } else if(this.tabname == '4' ){
          storage.setStore('system_entryjob_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=done&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        }

      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/entrylist.css";
</style>
