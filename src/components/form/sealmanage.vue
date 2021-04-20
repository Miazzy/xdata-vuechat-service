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
                <vue-excel-column field="company"       label="用印公司"  width="120px" />
                <vue-excel-column field="contract_id"   label="合同编号"  width="180px"/>
                <vue-excel-column field="sign_man"      label="签收人"   width="60px" />
                <vue-excel-column field="approve_type"  label="审批类型"  width="80px" :options="approveColumns" />
                <vue-excel-column field="workno"        label="关联流程"  width="120px"/>
                <vue-excel-column field="seal_type"     label="用印类型"  width="80px" :options="sealTypeColumns" />
                <vue-excel-column field="seal_category" label="印章类型"  width="120px" :options="sealCategoryColumns" />
                <vue-excel-column field="order_type"    label="用印顺序"  width="80px" :options="orderTypeColumns" />
                <vue-excel-column field="seal_man"      label="盖印人"    width="60px" />
                <vue-excel-column field="status"        label="状态"      width="80px" type="select" :options="sealStatusColumns" />
                <vue-excel-column field="partner"       label="合作方"     width="120px" />
                <vue-excel-column field="message"       label="备注信息"    width="120px" />
            </vue-excel-editor>
        </template>
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
            pageName: "用印管理",
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
              { text: '财务台账', value: 20 , icon: 'records' },
              { text: '档案台账', value: 21 , icon: 'description' },
              { text: '导出', value: 7 , icon: 'description' },
            ],
            menuCssValue:'',
            isLoading:false,
            loading:false,
            currentPage: 1,
            archiveTypeColumns: Betools.workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: Betools.workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: Betools.workconfig.compcolumns.sealTypeColumns,
            sealCategoryColumns: Betools.workconfig.compcolumns.sealCategoryColumns,
            approveColumns: Betools.workconfig.compcolumns.approveColumns,
            sealStatusColumns: Betools.workconfig.compcolumns.sealStatusColumns,
            statusType:{'待用印':'待用印','已用印':'已用印','已领取':'已用印','移交前台':'已用印','财务归档':'已用印','档案归档':'已用印','已完成':'已用印','已退回':'已退回','已作废':'已作废','已测试':'已作废'},
            statusType_w:{'待用印':'待用印','已用印':'已用印','已领取':'已领取','移交前台':'移交前台','财务归档':'财务归档','档案归档':'档案归档','已完成':'已完成','已退回':'已退回','已作废':'已作废','已测试':'已作废'},
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
        const userinfo = await Betools.storage.getStore('system_userinfo');
        const temp = this.$refs.grid.$options.propsData.value;
        if(records.length > 1){
          return this.$toast.fail('管理员您好，一次只能更新一条数据！');
        }
        for(const record of records){
          const item = temp.find( item => { return item.$id == record.$id });
          const elem = new Object() ;
          const oldRecord = JSON.stringify(item);
          const content = `${userinfo.realname}将序号为${item['serialid']}的用印记录${record.name}字段(原值:${record.oldVal})修改为${record.newVal}` ;
          elem[record.name] = record.newVal ;
          if(record.newVal == ''){
            return this.$toast.fail('管理员您好，不能将值修改为空字符串！');
          }
          const prLogHisNode = {
            id: Betools.tools.queryUniqueID(),
            table_name: 'bs_seal_regist',
            main_value: item['id'],
            proponents: userinfo.username,
            business_data_id : item['id'] ,//varchar(100)  null comment '业务数据主键值',
            business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
            process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
            employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
            approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
            action         : '修订'    ,//varchar(100)  null comment '操作动作',
            action_opinion : `修改用印记录[用印修改](${content})` ,//text          null comment '操作意见',
            operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
            functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
            process_station   : '用印审批[用印管理]',//varchar(100)  null comment '流程岗位',
            business_data     : JSON.stringify(elem),//text          null comment '业务数据',
            content           : content ,//text          null comment '业务内容',
            process_audit     : '' ,//varchar(100)  null comment '流程编码',
            create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
            relate_data       : JSON.stringify(item),//text          null comment '关联数据',
            origin_data       : oldRecord,
          }
          await Betools.workflow.approveViewProcessLog(prLogHisNode);
          await Betools.manage.patchTableData('bs_seal_regist' , item.id , elem);
        }
      },
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
          this.queryTabList('合同类',0); //查询合同类数据
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
            this.queryTabList('合同类',0);
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryTabList('非合同类',0);
            break;
          case 20: //只显示财务归档类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryTabList('财务归档',0);
            break;
          case 21: //只显示档案归档类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryTabList('档案归档',0);
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
        if(tabname == '合同类') {
          this.json_data = await this.querySealApplyTypeList('bs_seal_regist' , '合同类' , this.searchWord  , this.statusType);
        } else if(tabname == '非合同类') {
          this.json_data = await this.querySealApplyTypeList('bs_seal_regist' , '非合同类' , this.searchWord , this.statusType);
        } else if(tabname == '财务归档') {
          this.json_data = await this.querySealApplyTypeList('bs_seal_regist_finance' , '合同类' , this.searchWord , this.statusType);
        } else if(tabname == '档案归档') {
          this.json_data = await this.querySealApplyTypeList('bs_seal_regist_archive' , '合同类' , this.searchWord , this.statusType);
        }
      },

      async querySealApplyTypeList(tableName = 'bs_seal_regist', typeName = '合同类'  , searchWord , statusType ){
        const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前用户信息
        const searchSql = Betools.tools.isNull(searchWord) ? '' : `~and((filename,like,~${searchWord}~)~or(create_by,like,~${searchWord}~)~or(workno,like,~${searchWord}~)~or(contract_id,like,~${searchWord}~)~or(seal_man,like,~${searchWord}~)~or(sign_man,like,~${searchWord}~)~or(front_name,like,~${searchWord}~)~or(archive_name,like,~${searchWord}~)~or(mobile,like,~${searchWord}~)~or(deal_depart,like,~${searchWord}~)~or(approve_type,like,~${searchWord}~))`; //如果存在搜索关键字
        const month = dayjs().subtract(36, 'months').format('YYYY-MM-DD'); // 获取最近数月对应的日期
        const sealTypeSql = `~and(seal_type,like,${typeName})`;
        const whereSQL = `_where=(status,ne,已作废)~and(create_time,gt,${month})~and(seal_group_ids,like,~${userinfo.username}~)${sealTypeSql}${searchSql}&_sort=-serialid&_p=0&_size=10000`;
        const tlist = await Betools.manage.queryTableData(tableName , whereSQL);
        tlist.map((item , index) => {
          item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
          item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
          item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
          item.status = item.status_w = statusType[item.status];
        });
        return tlist;
      },
      async queryInfo(){
        this.queryTabList('合同类',0); //查询合同类数据
      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
