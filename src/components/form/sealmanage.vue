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
                <van-cell id="van-cell-export" class="van-cell-export" title="导出合同" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data_contract"
                        :fields="json_fields_contract"
                        worksheet="用印台账_全部"
                        name="用印台账_合同类_全部.xls"
                      >
                        导出台账(合同)
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
                        worksheet="用印台账_全部"
                        name="用印台账_非合同类_全部.xls"
                      >
                        导出台账(非合同)
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
            json_fields: Betools.sealapply.querySealExportFields().json_fields,
            json_data: [],
            json_fields_contract: Betools.sealapply.querySealExportFields().json_fields,
            json_data_contract:[],
            json_fields_common: Betools.sealapply.querySealExportFields().json_fields_common,
            json_data_common:[],
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
    activated() { },
    mounted() {
      this.queryInfo('合同类', this.searchWord , this.statusType);
      this.queryTabList();
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

      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },

      //点击顶部搜索
      async headMenuSearch(){
        if(searchWord){
          //刷新相应表单
          this.queryInfo('合同类', this.searchWord , this.statusType); //查询合同类数据
          //显示搜索状态
          vant.Toast('搜索...');
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
            this.queryInfo('合同类', this.searchWord , this.statusType);
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            this.queryInfo('非合同类', this.searchWord , this.statusType);
            break;
          case 20: //只显示财务归档类信息
            this.dropMenuOldValue = this.sealType = val;
            this.queryInfo('财务归档', this.searchWord , this.statusType);
            break;
          case 21: //只显示档案归档类信息
            this.dropMenuOldValue = this.sealType = val;
            this.queryInfo('档案归档', this.searchWord , this.statusType);
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

      async queryInfo(typeName, searchWord, statusType){
        vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });
        this.json_data = await Betools.sealapply.queryTabSealApplyTypeList(typeName, searchWord , statusType); //查询合同类数据
        vant.Toast.clear();
      },

      async queryTabList(page = 0 , whereSQL = '',  resp = ''){
        const response = await Betools.sealapply.querySealApplyTabList('合同类' , page , whereSQL , resp , '' , 0 );
        const response_ = await Betools.sealapply.querySealApplyTabList('非合同类' , page , whereSQL , resp, '' , 1);
        this.json_data_contract = response.json_data;
        this.json_data_common = response_.json_data_common;
      },

    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
