<template>

<keep-alive>
  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" class="header-menu" v-show="!searchFlag" style="overflow-x: hidden;" >
        <div class="center" style="position:relative;">
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>用印审批</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 42px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
                <van-cell id="van-cell-export" class="van-cell-export" title="导出合同" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data"
                        :fields="json_fields"
                        worksheet="用印台账"
                        name="用印台账(合同类).xls"
                      >
                        合同台账
                      </download-excel>
                    </span>
                  </template>
                </van-cell>
                <van-cell id="van-cell-export" class="van-cell-export" title="导出非合同" icon="todo-list-o" >
                   <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data_common"
                        :fields="json_fields_common"
                        worksheet="用印台账"
                        name="用印台账(非合同类).xls"
                      >
                        非合同台账
                      </download-excel>
                    </span>
                  </template>
                </van-cell>
              </van-dropdown-item>
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
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ; queryTabList(1);" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(2);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 6 ; queryTabList(6);" :style="tabname == 6 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已退回
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <van-pull-refresh v-model="isLoading" @refresh="queryFresh(7)">
        <template v-show="tabname == 1 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initContractList" default-tag-text="待用印" edit-disabled @select="selectHContract" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="sealContractList" default-tag-text="已用印" edit-disabled @select="selectHContract" />
        </template>
        <template v-show="(tabname == 6 || tabname == 0)&& !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 6 && !loading && !isLoading" v-model="hContractID" :list="failContractList" default-tag-text="已退回" edit-disabled @select="selectHContract" />
        </template>
        </van-pull-refresh>
      </div>

      <div class="pagination-div" v-show="!loading && !isLoading && totalpages > 0" style="margin-top:10px;margin-bottom:10px;">
        <van-pagination v-model="currentPage" prev-text="<" next-text=">" @change="changePage" :items-per-page="10" :total-items="totalpages" :show-page-size="5">
          <template #prev-text>
            <van-icon name="arrow-left" />
          </template>
          <template #next-text>
            <van-icon name="arrow" />
          </template>
          <template #page="{ text }">{{ text }}</template>
        </van-pagination>
      </div>

    </section>

  </div>
</keep-alive>
</template>
<script>
export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "用印审批",
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
            tabmap: Betools.sealapply.querySealExportFields().sealApplyATypeList,
            json_fields: Betools.sealapply.querySealExportFields().json_fields,
            json_fields_common: Betools.sealapply.querySealExportFields().json_fields_common,
            json_data: [],
            json_data_common: [],
            sealType:'',
            searchWord:'',
            totalpages:5,
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '合同类', value: 0 , icon: 'records' },
              { text: '非合同', value: 1 , icon: 'description' },
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
            ],
            menuCssValue:'',
            isLoading:false,
            loading:false,
            currentPage:1,
        }
    },
    activated() { },
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
      
      //刷新页面
      async queryFresh(){
        //刷新相应表单
        this.queryTabList(this.tabname , this.currentPage - 1);
        //显示刷新消息
        vant.Toast('刷新成功');
        //设置加载状态
        this.isLoading = false;
      },

      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },

      //点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          this.queryTabList(this.tabname); //刷新相应表单
          vant.Toast('搜索...'); //显示搜索状态
          await Betools.storage.setStore('system_search_word_v1', this.searchWord, 60 * 5 );
        }
        this.searchFlag = false; //显示刷新消息
      },

      //点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 0: //只显示合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryFresh();
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryFresh();
            break;
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.queryFresh();
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            this.searchFlag = true;
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },

      //点击Tab栏
      async queryTabList(tabname , page = 0 , whereSQL = '',  resp = ''){

        const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前用户信息
        Betools.storage.setStore('system_seal_list_tabname' , tabname);

        let month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); // 获取最近几个月对应的日期
        let searchSql = !this.searchWord ? '':`~and((filename,like,~${this.searchWord}~)~or(serialid,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(workno,like,~${this.searchWord}~)~or(contract_id,like,~${this.searchWord}~)~or(seal_man,like,~${this.searchWord}~)~or(sign_man,like,~${this.searchWord}~)~or(front_name,like,~${this.searchWord}~)~or(archive_name,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(deal_depart,like,~${this.searchWord}~)~or(approve_type,like,~${this.searchWord}~))`;
        let sealTypeSql = (this.sealType === 0 || tabname == '合同类')? `~and(seal_type,like,合同类)` : ((this.sealType === 1 || tabname == '非合同类')? `~and(seal_type,like,非合同类)` : '' );
        let status = tabname == 1 ? '待用印' : (tabname == 2 ? '已用印,已领取,移交前台,财务归档,档案归档,已完成' : ( tabname == 6 || tabname == 0 ? '已退回' : ''));
        this.currentPage = page + 1; //设置当前页为第一页

        let {initContractList , sealContractList , failContractList , json_data , json_data_common } = this;

        if(tabname == 1 || tabname == 2 || tabname == 6 || tabname == 0){
          resp = await Betools.manage.querySealListByConStatus(status, month, userinfo, sealTypeSql, searchSql, page);
          initContractList = tabname == 1 ? resp.result : initContractList ;
          sealContractList = tabname == 2 ? resp.result : sealContractList;
          failContractList = (tabname == 6 || tabname == 0) ? resp.result : failContractList ;
        } else if(tabname == '非合同类' || tabname == '合同类') {
          resp = await Betools.manage.querySealListByConType(userinfo,sealTypeSql,searchSql);
          json_data_common = tabname == '非合同类' ? resp.result : json_data_common ;
          json_data = tabname == '合同类' ? resp.result : json_data ;
        }

        this.totalpages = resp.size;
      },

      async queryInfo(){
        
        const queryTabListInfo = this.queryTabList;

        this.tabname = (Betools.storage.getStore('system_seal_list_tabname') || '1') % 10 ; //获取tabname
        this.tabname = this.tabname >= 3 ? 6 : this.tabname <= 1 ? 1 : 2;
        this.searchWord = await Betools.storage.getStore('system_search_word_v1');

        queryTabListInfo(this.tabname , 0); //查询列表数据

        Betools.tools.throttle(async () => {
            queryTabListInfo('合同类',0); //查询合同类数据
            queryTabListInfo('非合同类',0); //查询非合同类数据
        }, 1000000 , 10000)();

      },

      //跳转到用印合同详情
      async selectHContract(item , value , index ){
        Betools.sealapply.redirectSealContractInfo(item , this.tabname , this.$router);
      },

      //分页查询并跳转下一页
      async changePage(){
        const page = this.currentPage;
        await this.queryTabList( this.tabname , page - 1 );
      },
    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
