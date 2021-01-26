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
                      <download-excel
                        :data="json_data"
                        :fields="json_fields"
                        worksheet="移交台账"
                        name="移交台账(合同类).xls"
                      >
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
            <van-address-list style="min-height:500px;" v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="sealContractList" default-tag-text="已用印" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 4 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="frontContractList" default-tag-text="已移交" edit-disabled @select="selectHContract()" />
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
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
              { text: '财务移交', value: 10 , icon: 'logistics' },
              { text: '档案移交', value: 11 , icon: 'sign' },
            ],
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
      async userStatus(){
        try {
          const userinfo = await Betools.storage.getStore('system_userinfo');
        } catch (error) {
          console.log(error);
        }
      },
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      //刷新页面
      async queryFresh(){
        this.queryTabList(this.tabname); //刷新相应表单
        await Betools.tools.sleep(300); //等待一下
        vant.Toast('刷新成功'); //显示刷新消息
        this.isLoading = false;  //设置加载状态
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
          await Betools.tools.sleep(300);
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
          case 4: //重置数据
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.sealType = '';
            this.searchFlag = false;
            this.searchWord = '';
            await this.queryFresh();
            break;
          case 5: //返回应用
            this.$router.push(`/app`);
            break;
          case 6: //返回首页
            this.$router.push(`/explore`);
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
      //点击Tab栏
      async queryTabList(tabname , page){

         //获取当前用户信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        // 获取最近6个月对应的日期
        let month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');
        let sealTypeSql = '~and(seal_type,like,合同类)~and(zone_name,eq,领地集团总部)';
        let searchSql = '';

        // 设置当前页为第一页
        this.currentPage = page + 1;

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((filename,like,~${this.searchWord}~)~or(serialid,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(workno,like,~${this.searchWord}~)~or(contract_id,like,~${this.searchWord}~)~or(seal_man,like,~${this.searchWord}~)~or(sign_man,like,~${this.searchWord}~)~or(front_name,like,~${this.searchWord}~)~or(archive_name,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(deal_depart,like,~${this.searchWord}~)~or(approve_type,like,~${this.searchWord}~))`;
        }

        if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initContractList = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,eq,待用印)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.initContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.sealContractList = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,in,已用印,已领取)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.sealContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 3){
          //获取最近6个月的已领取记录
          this.receiveContractList = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,in,已用印,已领取)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.receiveContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 4){
          //获取最近6个月的已移交记录
          this.frontContractList = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,in,移交前台,财务归档,档案归档,已完成)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.frontContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 5){
          //获取最近6个月的已归档记录
          this.doneContractList = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,eq,已完成)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.doneContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 6){
          //获取最近6个月的已归档记录
          this.failContractList = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,eq,已退回)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.failContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == '合同类') {
          // 获取最近6个月对应的日期
          month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');
          sealTypeSql = `~and(seal_type,like,合同类)`;
          const whereSQL = `_where=(status,in,移交前台,财务归档,档案归档,已归档,已完成)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-serialid&_p=0&_size=10000`;
          this.json_data = await Betools.manage.queryTableData('bs_seal_regist', whereSQL);
          this.json_data.sort((n1,n2)=>{return n2.serialid - n2.serialid});
        }
      },
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取tabname
        this.tabname = Betools.storage.getStore('system_seal_front_list_tabname') || 2;
        this.tabname = this.tabname > 6 ? 2 : this.tabname;

        //查询列表数据
        this.queryTabList(this.tabname , 0);

        //查询合同类数据
        this.queryTabList('合同类' , 0);

      },
      async selectHContract(){

        //等待N毫秒
        await Betools.tools.sleep(0);

        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});

        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&back=sealfrontlist`);
        } else if(this.tabname == '2' && item.seal_type == '非合同类'){
          Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealreceive?id=${id}&statustype=none&type=receive&back=sealfrontlist`);
        } else if(this.tabname == '2' || this.tabname == '3'){
          Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=front&back=sealfrontlist`);
        } else if(this.tabname == '4' ){
          Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        } else if(this.tabname == '5' ){
          Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        } else if(this.tabname == '6' ){
          Betools.storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
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
