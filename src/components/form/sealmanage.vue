<template>

<keep-alive>
  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" class="header-menu" v-show="!searchFlag" style="overflow-x: hidden;" >
        <div class="center" style="position:relative;">
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>用印管理</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 42px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
              </van-dropdown-item>
            </van-dropdown-menu>
        </div>
    </header>

    <header id="wx-header" class="header-search" v-show="!!searchFlag" style="padding:0px 0px 1px 0px; border-bottom:1px solid #cecece;">
       <div>
          <van-search  v-model="searchWord"  show-action placeholder="请输入搜索关键词" >
            <template #action>
              <div @click="headMenuSearch();" >搜索</div>
            </template>
          </van-search>
        </div>
    </header>

    <section>
      <div class="weui-cells" style="margin-top: 0px;">
        <template>
            <vue-excel-editor v-model="json_data" ref="grid" width="100%" filter-row autocomplete @delete="onDelete" @update="onUpdate" >

                <vue-excel-column field="serialid"     label="序号"     width="50px" />
                <vue-excel-column field="create_time"  label="登记时间"  width="100px" />
                <vue-excel-column field="filename"     label="文件名称"  width="200px" />
                <vue-excel-column field="count"        label="数量"      width="50px" />
                <vue-excel-column field="deal_depart"  label="经办部门"  width="100px"/>
                <vue-excel-column field="deal_manager" label="经办人"    width="60px" />
                <vue-excel-column field="contract_id"  label="合同编号"  width="180px"/>
                <vue-excel-column field="sign_man"      label="签收人"   width="60px" />
                <vue-excel-column field="approve_type"  label="审批类型"  width="80px" :options="approveColumns" />
                <vue-excel-column field="workno"        label="关联流程"  width="180px"/>
                <vue-excel-column field="seal_type"     label="用印类型"  width="80px" :options="sealTypeColumns" />
                <vue-excel-column field="order_type"    label="用印顺序"  width="80px" :options="orderTypeColumns" />
                <vue-excel-column field="seal_man"      label="盖印人"    width="60px" />
                <vue-excel-column field="status"        label="状态"      width="80px" type="select" :options="sealStatusColumns" />

            </vue-excel-editor>
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
import * as workconfig from '@/request/workconfig';
import VueExcelEditor from 'vue-excel-editor';

Vue.use(VueExcelEditor);

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
            json_fields: {
              '排序编号':'serialid',
              '登记时间': 'create_time',
              '文件名称':'filename',
              '用印数量':'count',
              '用印部门':'deal_depart',
              '经办人员':'deal_manager',
              '合同编号':'contract_id',
              '签收人员':'sign_man',
              '审批类型':'approve_type',
              '关联流程':'workno',
              '用印类型': 'seal_type',
              '排序类型':'order_type',
              '盖章人员': 'seal_man',
              '用印状态': 'status',
            },
            json_data: [],
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
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
              { text: '导出', value: 7 , icon: 'description' },
            ],
            menuCssValue:'',
            isLoading:false,
            loading:false,
            currentPage: 1,
            archiveTypeColumns: workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
            approveColumns: workconfig.compcolumns.approveColumns,
            sealStatusColumns: workconfig.compcolumns.sealStatusColumns,
            statusType:{'待用印':'待用印','已用印':'已用印','已领取':'已用印','移交前台':'已用印','财务归档':'已用印','档案归档':'已用印','已完成':'已用印','已退回':'已退回','已作废':'已作废','已测试':'已作废'},
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
      exportAsExcel () {
          this.$refs.grid.exportTable('xlsx', true, '用印登记表单');
      },
      async onDelete(records){
        console.log('delete');
      },
      async onUpdate(records){
        const temp = this.$refs.grid.$options.propsData.value;
        if(records.length > 1){
          return this.$toast.fail('管理员您好，一次只能更新一条数据！');
        }
        for(const record of records){
          const item = temp.find( item => { return item.$id == record.$id });
          const elem = new Object() ;
          elem[record.name] = record.newVal ;
          if(record.newVal == ''){
            return this.$toast.fail('管理员您好，不能将值修改为空字符串！');
          }
          await manageAPI.patchTableData('bs_seal_regist' , item.id , elem);
        }
      },
      async userStatus(){
        try {
          let info = await storage.getStore('system_userinfo');
        } catch (error) {
          console.log(error);
        }
      },
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      //刷新页面
      async queryFresh(){
        //刷新相应表单
        this.queryTabList(this.tabname , this.currentPage - 1);
        //等待一下
        await tools.sleep(300);
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
            //await this.queryFresh();
            this.queryTabList('合同类',0);
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            //await this.queryFresh();
            await this.queryTabList('非合同类',0);
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
          case 7: //导出表单
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.exportAsExcel();
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      //点击Tab栏
      async queryTabList(tabname , page = 0){

        //获取当前用户信息
        const userinfo = await storage.getStore('system_userinfo');

        // 获取最近6个月对应的日期
        let month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');
        let sealTypeSql = '';
        let searchSql = '';

        // 设置当前页为第一页
        this.currentPage = page + 1;

        if(this.sealType === 0) {
          sealTypeSql = `~and(seal_type,like,合同类)`;
        } else if(this.sealType === 1) {
          sealTypeSql = `~and(seal_type,like,非合同类)`;
        }

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((filename,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(workno,like,~${this.searchWord}~)~or(contract_id,like,~${this.searchWord}~)~or(seal_man,like,~${this.searchWord}~)~or(sign_man,like,~${this.searchWord}~)~or(front_name,like,~${this.searchWord}~)~or(archive_name,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(deal_depart,like,~${this.searchWord}~)~or(approve_type,like,~${this.searchWord}~))`;
        }

        if(tabname == 1){
          const whereSQL = `_where=(status,eq,待用印)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=10`;
          //获取最近6个月的待用印记录
          this.initContractList = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.totalpages = await manageAPI.queryTableDataCount('bs_seal_regist' , whereSQL);
          this.initContractList.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            item.status = this.statusType[item.status];
          });

          this.initContractList.sort();
        } else if(tabname == 2){
          const whereSQL = `_where=(status,eq,已用印)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=10`;
          //获取最近6个月的已用印记录
          this.sealContractList = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.totalpages = await manageAPI.queryTableDataCount('bs_seal_regist' , whereSQL);
          this.sealContractList.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            item.status = this.statusType[item.status];
          });

          this.sealContractList.sort();
        } else if(tabname == 3){
          const whereSQL = `_where=(status,eq,已领取)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=10`;
          //获取最近6个月的已领取记录
          this.receiveContractList = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.totalpages = await manageAPI.queryTableDataCount('bs_seal_regist' , whereSQL);
          this.receiveContractList.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            item.status = this.statusType[item.status];
          });

          this.receiveContractList.sort();
        } else if(tabname == 4){
          const whereSQL = `_where=(status,in,移交前台,财务归档,档案归档)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=10`;
          //获取最近6个月的已移交记录
          this.frontContractList = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.totalpages = await manageAPI.queryTableDataCount('bs_seal_regist' , whereSQL);
          this.frontContractList.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            item.status = this.statusType[item.status];
          });

          this.frontContractList.sort();
        } else if(tabname == 5){
          const whereSQL = `_where=(status,eq,已完成)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=10`;
          //获取最近6个月的已归档记录
          this.doneContractList = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.totalpages = await manageAPI.queryTableDataCount('bs_seal_regist' , whereSQL);
          this.doneContractList.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            item.status = this.statusType[item.status];
          });

          this.doneContractList.sort();
        } else if(tabname == 6 || tabname == 0){
          const whereSQL = `_where=(status,eq,已退回)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-create_time&_p=${page}&_size=10`;
          //获取最近6个月的已归档记录
          this.failContractList = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.totalpages = await manageAPI.queryTableDataCount('bs_seal_regist' , whereSQL);
          this.failContractList.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            item.status = this.statusType[item.status];
          });

          this.failContractList.sort();
        } else if(tabname == '合同类') {
          // 获取最近6个月对应的日期
          month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');
          sealTypeSql = `~and(seal_type,like,合同类)`;
          const whereSQL = `_where=(status,ne,已测试)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-serialid&_p=0&_size=10000`;
          //获取最近6个月的已归档记录
          this.json_data = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.json_data.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            console.log(JSON.stringify(this.statusType));
            item.status = this.statusType[item.status];
          });
          this.json_data.sort();
        } else if(tabname == '非合同类') {
          month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');
          sealTypeSql = `~and(seal_type,like,非合同类)`;
          const whereSQL = `_where=(status,ne,已测试)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-serialid&_p=0&_size=10000`;
          //获取最近6个月的已归档记录
          this.json_data = await manageAPI.queryTableData('bs_seal_regist' , whereSQL);
          this.json_data.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
            console.log(JSON.stringify(this.statusType));
            item.status = this.statusType[item.status];
          });
          this.json_data.sort();
        }
      },
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取tabname
        this.tabname = (storage.getStore('system_seal_list_tabname') || '1') % 10 ;
        this.tabname = this.tabname > 6 ? 1 : this.tabname;

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //查询列表数据
        this.queryTabList(this.tabname , 0);

        //查询合同类数据
        this.queryTabList('合同类',0);

        //查询非合同类数据
        //this.queryTabList('非合同类',0);

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
          this.$router.push(`/app/sealview?id=${id}&statustype=none&back=seallist`);
        } else if(this.tabname == '2' && item.seal_type == '非合同类'){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealreceive?id=${id}&statustype=none&type=receive&back=seallist`);
        } else if(this.tabname == '2' || this.tabname == '3'){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=front&back=seallist`);
        } else if(this.tabname == '4' ){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=seallist`);
        } else if(this.tabname == '5' ){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=seallist`);
        } else if(this.tabname == '6' ){
          storage.setStore('system_seal_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=seallist`);
        }

      },
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
