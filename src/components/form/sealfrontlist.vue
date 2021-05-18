<template>
<keep-alive>
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >
    <header id="wx-header" class="header-menu" v-show="!searchFlag" style="overflow-x: hidden;">
        <div class="center" style="position:relative;">
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
              <span>返回</span>
            </router-link>
            <span>用印移交</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 42px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
                <van-cell id="van-cell-export" class="van-cell-export" title="移交台账" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel :data="json_data" :fields="json_fields" worksheet="移交台账" name="移交台账(合同类).xls" >
                        移交台账
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
          <van-search v-model="searchWord" show-action placeholder="请输入搜索关键词" >
            <template #action>
              <div @click="headMenuSearch();" >搜索</div>
            </template>
          </van-search>
        </div>
    </header>

    <section>
      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(2);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待移交
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ; queryTabList(4);" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已移交
          </div>
        </div>
      </div>
      <div class="wechat-list">
        <van-pull-refresh v-model="isLoading" @refresh="queryFresh(7)">
        <template v-show="tabname == 2 && !loading && !isLoading">
            <van-empty v-if=" tabname == 2 && sealContractList.length == 0 " description="暂无数据" />
            <van-address-list style="min-height:500px;" v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="sealContractList" default-tag-text="已用印" edit-disabled @select="selectHContract" />
        </template>
        <template v-show="tabname == 4 && !loading && !isLoading">
            <van-empty v-if=" tabname == 4 && frontContractList.length == 0 " description="暂无数据" />
            <van-address-list style="min-height:500px;" v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="frontContractList" default-tag-text="已移交" edit-disabled @select="selectHContract" />
        </template>
        </van-pull-refresh>
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
            pageName: "用印移交",
            momentNewMsg: true,
            tabname: 2,
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
            sealType: 0,
            searchWord:'',
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '财务移交', value: 10 , icon: 'logistics' },
              { text: '档案移交', value: 11 , icon: 'sign' },
            ],
            tableName:'bs_seal_regist',
            menuCssValue:'',
            isLoading:false,
            loading:false,
            json_fields: {
              '排序编号':'serialid',
              '登记时间': 'create_time',
              '文件名称':'filename',
              '用印数量':'count',
              '用印部门':'deal_depart',
              '经办人员':'deal_manager',
              '合同编号':'contract_id',
              '签收人员':'signman',
              '审批类型':'approve_type',
              '关联流程':'workno',
              '用印类型': 'seal_type',
              '排序类型':'order_type',
              '盖章人员': 'seal_man',
              '用印状态': 'status',
            },
            json_data: [],
        }
    },
    activated() {
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

      // 刷新页面
      async queryFresh(){
        this.queryTabList(this.tabname); //刷新相应表单
        await Betools.tools.sleep(300); //等待一下
        vant.Toast('刷新成功'); //显示刷新消息
        this.isLoading = false;  //设置加载状态
      },

      // 点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },

      // 点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          this.queryTabList(this.tabname); //刷新相应表单
          vant.Toast('搜索...'); //显示搜索状态
          await Betools.tools.sleep(300); //等待一下
        }
        this.searchFlag = false;
      },

      // 点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.queryFresh();
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue, this.searchFlag = true;
            break;
          case 4: //重置数据
            this.dropMenuValue = this.dropMenuOldValue = this.sealType = this.searchWord = '', this.searchFlag = false;
            await this.queryFresh();
            break;
          case 10: //财务归档
            this.$router.push(`/app/sealfinance?transfer_type=finance`);
            break;
          case 11: //档案归档
            this.$router.push(`/app/sealfinance?transfer_type=archive`);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },

      // 点击Tab栏，获取Tab栏列表数据
      async queryTabList(tabname , page){
        const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前用户信息
        const month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); // 获取最近N个月对应的日期
        const tableName = this.tableName || 'bs_seal_regist';
        this.currentPage = page + 1;  // 设置当前页为第一页
        let searchSql = '';
        (this.searchWord) ? searchSql = `~and((filename,like,~${this.searchWord}~)~or(serialid,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(workno,like,~${this.searchWord}~)~or(contract_id,like,~${this.searchWord}~)~or(seal_man,like,~${this.searchWord}~)~or(sign_man,like,~${this.searchWord}~)~or(front_name,like,~${this.searchWord}~)~or(archive_name,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(deal_depart,like,~${this.searchWord}~)~or(approve_type,like,~${this.searchWord}~))` : null ;
        if(tabname == 1){
          this.initContractList = await this.handleList(tableName, '待用印', userinfo, searchSql, 0 , 1000);
        } else if(tabname == 2){
          this.sealContractList = await this.handleList(tableName, '已用印,已领取', userinfo, searchSql, 0 , 1000);
        } else if(tabname == 3){
          this.receiveContractList = await this.handleList(tableName, '已用印,已领取', userinfo, searchSql, 0 , 1000);
        } else if(tabname == 4){
          this.frontContractList = await this.handleList(tableName, '移交前台,财务归档,档案归档,已完成', userinfo, searchSql, 0 , 1000);
        } else if(tabname == 5){
          this.doneContractList = await this.handleList(tableName, '已完成', userinfo, searchSql, 0 , 1000);
        } else if(tabname == 6){
          this.failContractList =  await this.handleList(tableName, '已退回,已作废', userinfo, searchSql, 0 , 1000);
        } else if(tabname == '合同类') {
          sealTypeSql = `~and(seal_type,like,合同类)`;
          const whereSQL = `_where=(status,in,移交前台,财务归档,档案归档,已归档,已完成)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-serialid&_p=0&_size=10000`;
          this.json_data = await Betools.manage.queryTableData('bs_seal_regist', whereSQL);
          this.json_data.sort((n1,n2)=>{return n2.serialid - n2.serialid});
        }
      },

      // 查询用印登记列表数据
      async handleList(tableName = 'bs_seal_regist', status = '待用印', userinfo , searchSql = '' , page = 0 , size = 1000){
        const sealTypeSql = '~and(seal_type,like,合同类)~and(zone_name,eq,领地集团总部)';
        const month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); // 获取最近N个月对应的日期
        let list = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,in,${status})~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=${size}`);
        list.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        });
        return list;
      },

      // 查询基础信息
      async queryInfo(){
        this.tabname = Betools.storage.getStore('system_seal_front_list_tabname') || 2;  //获取tabname
        this.tabname = this.tabname > 6 ? 2 : this.tabname;
        this.queryTabList(this.tabname , 0);  //查询列表数据
        this.queryTabList('合同类' , 0);  //查询合同类数据
      },

      // 跳转到相应详情页面
      async selectHContract(elem){
        const id = elem.id || this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});
        Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
        if(this.tabname == '1'){
          this.$router.push(`/app/sealview?id=${id}&statustype=none&back=sealfrontlist`);
        } else if(this.tabname == '2' && item.seal_type == '非合同类'){
          this.$router.push(`/app/sealreceive?id=${id}&statustype=none&type=receive&back=sealfrontlist`);
        } else if(this.tabname == '2' || this.tabname == '3'){
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=front&back=sealfrontlist`);
        } else if(this.tabname == '4' ){
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        } else if(this.tabname == '5' ){
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        } else if(this.tabname == '6' ){
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        }
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
