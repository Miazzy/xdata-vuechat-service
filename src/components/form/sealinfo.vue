<template>
  <keep-alive>
  <!--首页组件-->
  <div id="content" style="margin-top: 0px; overflow-x: hidden;" >

    <header id="wx-header" v-if="iswechat" style="overflow:hidden;">
        <div class="center" >
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>印章管理</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
            </van-dropdown-menu>
        </div>
    </header>

    <section v-if="iswechat" >

      <div class="weui-cells" style="margin-top:0px;">

        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
          <van-notice-bar
              v-show=" title!='' && title != null && typeof title != 'undefined' "
              left-icon="volume-o"
              color="#1989fa"
              background="#ecf9ff"
              :text="title"
            />
        </div>

        <div class="" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <van-row>
            <van-col span="8"></van-col>
            <van-col span="8" style="text-align: center;font-size:1.15rem;">用印登记表</van-col>
            <van-col span="8">
              <van-icon style="float:right;cursor:pointer;" name="delete" color="#1989fa" @click="deleteForm()" />
            </van-col>
          </van-row>
        </div>

      </div>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;overflow-x:hidden;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;overflow-x:hidden;"></div>
        <div class="weui-cells" style="margin-top:0px;margin-left:0px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;overflow-x:hidden;">

          <van-cell-group>
            <van-form >

              <van-cell-group style="margin-top:10px;">
                <van-cell value="基本信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field v-show="item.serialid" clearable label="用印序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                <van-field clearable label="填报日期" v-model="item.createtime" placeholder="请输入登记日期" readonly />
                <van-field required readonly clickable clearable  label="用印类型" v-model="item.sealtype" placeholder="选择用印类型" @blur="validField('sealtype')" :error-message="message.sealtype" @click="tag.showPickerSealType = true" />
                <van-field required readonly clickable clearable  label="用印顺序" v-model="item.ordertype" placeholder="选择用印顺序" @blur="validField('ordertype')" :error-message="message.ordertype" @click="tag.showPickerOrderType = true" />
                <van-field required :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" @blur="validField('filename')" :error-message="message.filename" />
                <van-field required :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" type="digit" @blur="validField('count')" :error-message="message.count" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="经办信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required :readonly="readonly" clickable clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" @blur="validField('dealManager');queryManager();" :error-message="message.dealManager" @click="queryManager();" />
                <van-address-list v-show="cuserList.length > 0" v-model="cuserid" :list="cuserList" default-tag-text="默认" edit-disabled @select="selectCreateUser()" />
                <van-field required :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" @blur="validField('dealDepart')" :error-message="message.dealDepart" />
                <van-field required :readonly="readonly" clearable label="经办账户" v-model="item.username" placeholder="请输入经办人的OA账号" @blur="validField('username')" :error-message="message.username" />
                <van-field required :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" @blur="validField('mobile')" :error-message="message.mobile" />
                <van-field required :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人的邮箱地址" @blur="validField('dealMail')" :error-message="message.dealMail" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="审批信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required readonly clickable clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @blur="validField('approveType')" :error-message="message.approveType" @click="tag.showPicker = true" />
                <van-field required clearable label="编号前缀" v-model="item.prefix" placeholder="请输入合同对应前缀，如LD、SD、CD等" v-show="item.sealtype == '合同类' " @blur="validField('prefix');queryHContract();" :error-message="message.prefix" @click="queryHContract();"  />
                <van-field required clearable :label="noname" v-model="item.contractId" placeholder="请根据最新已有合同编号填写编号" v-show="item.sealtype == '合同类' " />
                <van-address-list v-show="hContractList.length > 0 && item.sealtype == '合同类'" v-model="hContractID" :list="hContractList" default-tag-text="默认" edit-disabled @select="selectHContract()" />
                <van-field required :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" @blur="validField('signman')" :error-message="message.signman" />
                <van-field required :readonly="readonly" clearable label="用印公司" v-model="item.company" placeholder="请输入用印公司" @blur="validField('company')" :error-message="message.company" />
                <van-field required :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" @blur="validField('workno')" :error-message="message.workno" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="印章管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required clearable label="盖印人" v-model="item.sealman" placeholder="请输入印章管理员(盖印人)" @blur="validField('sealman');querySealMan();" :error-message="message.sealman" @click="querySealMan();" />
                <van-address-list v-show="suserList.length > 0" v-model="suserid" :list="suserList" default-tag-text="默认" edit-disabled @select="selectSealUser()" />
                <van-field v-show="item.sealtype == '合同类' && isGroupHeader" required clearable label="前台客服" v-model="item.front_name" placeholder="请输入前台客服人员名称" @blur="validField('front');queryFrontMan();" :error-message="message.front" @click="queryFrontMan();" />
                <van-address-list v-show="fuserList.length > 0 && item.sealtype == '合同类'" v-model="fuserid" :list="fuserList" default-tag-text="默认" edit-disabled @select="selectFrontUser()" />
                <van-field v-show="item.sealtype == '合同类' && false" required clearable label="档案归档" v-model="item.archive_name" placeholder="请输入档案归档人员名称" @blur="queryArchiveMan();" @click="queryArchiveMan();" />
                <nut-checkboxgroup v-show="item.sealtype == '合同类' && false " ref="checkboxGroup" :checkBoxData="auserList" v-model="agroup" @change="selectArchiveUser()"></nut-checkboxgroup>
                <van-field v-show="item.sealtype == '合同类'  && isGroupHeader" required clearable label="财务归档" v-model="item.finance_name" placeholder="请输入财务归档人员名称" @blur="validField('finance');queryFinanceArchiveMan();" :error-message="message.finance" @click="queryFinanceArchiveMan();" />
                <van-address-list v-show="financeuserList.length > 0 && item.sealtype == '合同类'" v-model="financeUserid" :list="financeuserList" default-tag-text="默认" edit-disabled @select="selectFinanceUser()" />
                <van-field v-show="item.sealtype == '合同类'  && isGroupHeader" required clearable label="档案归档" v-model="item.record_name" placeholder="请输入档案归档人员名称" @blur="validField('record');queryRecordArchiveMan();"  :error-message="message.record" @click="queryRecordArchiveMan();" />
                <van-address-list v-show="recorduserList.length > 0 && item.sealtype == '合同类'" v-model="recordUserid" :list="recorduserList" default-tag-text="默认" edit-disabled @select="selectRecordUser()" />
                <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly v-show="!!item.sealtime"/>
              </van-cell-group>

              <van-popup v-model="tag.showPicker" round position="bottom">
                <van-picker
                  show-toolbar
                  :columns="approveColumns"
                  @cancel="tag.showPicker = false"
                  @confirm="approveTypeConfirm"
                />
              </van-popup>
              <van-popup v-model="tag.showPickerOrderType" round position="bottom">
                <van-picker
                  show-toolbar
                  :columns="orderTypeColumns"
                  @cancel="tag.showPickerOrderType = false"
                  @confirm="orderTypeConfirm"
                />
              </van-popup>
              <van-popup v-model="tag.showPickerSealType" round position="bottom">
                <van-picker
                  show-toolbar
                  :columns="sealTypeColumns"
                  @cancel="tag.showPickerSealType = false"
                  @confirm="sealTypeConfirm"
                />
              </van-popup>
            </van-form>
          </van-cell-group>

          <van-cell-group v-show="item.ordertype == '我方先印' " style="margin-top:10px;">
            <van-cell value="寄件信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-field :readonly="readonly" clearable label="寄送地址" v-model="item.send_location" placeholder="请输入对方公司/单位/组织的寄送地址" />
            <van-field :readonly="readonly" clearable label="寄送电话" v-model="item.send_mobile" placeholder="请输入对方公司/单位/组织相关负责人联系电话" />
          </van-cell-group>

          <van-cell-group style="margin-top:10px;display:none;">
            <van-cell value="上传附件" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-uploader style="margin:0px 0.0rem 0px 1.0rem;" v-model="fileList" multiple :after-read="afterRead" accept="*/*" preview-size="6.3rem" />
          </van-cell-group>

          <van-cell-group style="margin-top:10px;" v-show=" active > 0 ">
            <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-steps :active="active">
              <van-step>待用印</van-step>
              <van-step>已用印</van-step>
              <van-step>移交前台</van-step>
              <van-step>已归档</van-step>
            </van-steps>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:0px solid #fcfcfc;" >
            <van-goods-action  v-show=" tag.showPicker == false && tag.showPickerSealType == false && tag.showPickerOrderType == false && status == '' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="提交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>
          </div>

          <div style="height:100px;">

          </div>

          <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;" >加载中...</van-loading>

          <div style="height:100px;" ></div>
        </div>
      </div>

    </section>

    <setion v-if="!iswechat" >
      <div class="section-nowechat">
        请使用微信客户端打开
      </div>
    </setion>

  </div>
  </keep-alive>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as query from '@/request/query';
import * as constant from '@/request/constant';
import * as workflow from '@/request/workflow';
import * as manageAPI from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';
import * as workconfig from '@/request/workconfig';

import { AddressList } from 'vant';

Vue.use(AddressList);

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "详情",
            momentNewMsg: true,
            tabname: '1',
            active: 1,
            id:'',
            type:'',
            title:'用印登记表',
            content:'',
            files:'',
            from:'',
            tname:'',
            bname:'',
            tasktype:'done',
            previewurl:'',
            purl:'',
            tableInfo:'',
            orderInfo:'',
            status:'',
            status_type:'',
            fields:[],
            groupid:'group00',
            sealuserid:'',
            iswechat:false,
            message: workconfig.compValidation.seal.message,
            valid: workconfig.compValidation.seal.valid,
            cuserid:'',
            cuserList:[],
            suserid:'',
            suserList:[],
            fuserid:'',
            fuserList:[],
            auserid:'',
            auserList:[],
            hContractID:'',
            hContractList:[],
            financeUserid:'',
            financeuserList:[],
            recordUserid:'',
            recorduserList:[],
            agroup:[],
            noname:'合同编号',
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
              serialid:'',
              filename:'',
              count:'2',
              dealDepart:'',
              dealManager:'',
              dealMail:'',
              username:'',
              approveType:'OA系统',
              contractId:'',
              signman:'',
              workno:'',
              sealtime:'',
              sealman: '',
              sealtype: '',
              ordertype:'常规用印',
              mobile:'',
              send_mobile:'',
              send_location:'',
              seal:'',     //用印管理员成员组
              front:'',    //用印前台接受组
              front_name:'',
              archive: '', //用印归档组(财务/档案)
              archive_name:[],
              finance:'',    //用印财务接受组
              finance_name:'',
              record:'',    //用印档案接受组
              record_name:'',
              prefix: 'LD',  //编号前缀
              name: '',    //流程组名，即Group_XX
              confirmStatus: '',//财务确认/档案确认
              company:'',
              status: '',
            },
            backPath:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            loading:false,
            officeList:[],
            tag:{
              showPicker: false,
              showPickerSealType:false,
              showPickerOrderType:false,
            },
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            fileList: [],
            readonly: false,
            active:0,
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            archiveTypeColumns: workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
            approveColumns: workconfig.compcolumns.approveColumns,
            //非集团总部成员，合同盖印也不显示前台和归档字段
            isGroupHeader:false
        }
    },
    async activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    watch: {
      $route(to, from) {

      },
      item(to , from) {
      }
    },
    methods: {
      async userStatus(){
        try {
          let info = await storage.getStore('system_userinfo');
        } catch (error) {
          console.log(error);
        }
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
            await this.queryFresh();
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryFresh();
            break;
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;
          case 4: //重置数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
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
      // 设置重置
      async reduction(){
        this.item = {
              createtime: dayjs().format('YYYY-MM-DD'),
              filename:'',
              count:'',
              dealDepart:'',
              dealManager:'',
              dealMail:'',
              username:'',
              approveType:'',
              contractId:'',
              signman:'',
              workno:'',
              sealtime:'',
              sealman: '',
              sealtype: '',
              ordertype:'',
              mobile:'',
              send_mobile:'',
              send_location:'',
              seal:'',     //用印管理员成员组
              front:'',    //用印前台接受组
              front_name:'',
              archive: '', //用印归档组(财务/档案)
              archive_name:[],
              prefix: '',  //编号前缀
              name: '',    //流程组名，即Group_XX
              confirmStatus: '',//财务确认/档案确认
              status: '',
            };
      },
      //删除原表单数据
      async deleteForm(){
        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '清空表单',
          message: '将进行‘清空表单’处理，清空后请重新填写用印申请！',
        })

        this.item.filename = '';
        this.item.count = '';
        this.item.workno = '';
        this.item.sealtype = '';
        this.item.ordertype = '';
      },
      //获取合同编号
      async queryHContract(){
        //获取盖章人信息
        const prefix = this.item.prefix = this.item.prefix.toUpperCase();

        try {
          if(!!prefix){

            //从用户表数据中获取填报人资料
            let list = await manageAPI.queryContractInfoByPrefixAll(prefix.trim());

            //清空原数据
            this.hContractList = [];

            if(!!list && Array.isArray(list) && list.length > 0){

              //如果是用户数组列表，则展示列表，让用户自己选择
              try {
                list.map((elem,index) => {
                  this.hContractList.push({id:elem.contract_id , value:`${elem.filename}[${elem.seal_type}] ${elem.contract_id},` , label: `${elem.filename}[${elem.seal_type}] ${elem.contract_id},` , address: elem.deal_manager + " " + elem.deal_depart + " 合同编号: " + elem.contract_id, name:elem.filename , tel:'' , mail: elem.mail , isDefault: !index });
                })
              } catch (error) {
                console.log(error);
              }

              try {

                this.hContractList = this.hContractList.sort((n1 , n2) => {
                  const year = `[${dayjs().format('YYYY')}]`;
                  const value1 =  n1.id.split(year)[1] ;
                  const value2 = n2.id.split(year)[1];
                  return value2 - value1;
                });

              } catch (error) {
                console.log(error);
              }

              //遍历去重
              try {

                this.hContractList = this.hContractList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.hContractList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                });

                const id = this.hContractList[0].id;
                let no = parseInt(id.split(`[${dayjs().format('YYYY')}]`)[1]) + 1;
                no = `00000${no}`.slice(-3);
                this.item.contractId = `${this.item.prefix}[${dayjs().format('YYYY')}]${no}`;

              } catch (error) {
                console.log(error);
              }

            } else if(!!list && Array.isArray(list) && list.length == 0){ // 如果没有发现合同编号，则可以自动生成一个合同编号，500开头
              const contract_id = `${prefix}[${dayjs().format('YYYY')}]000`;
              this.hContractList.push({id:contract_id , value: `${prefix}[${dayjs().format('YYYY')}]000` , label : `自动合同编号 ` , address : `编号 ${contract_id} (系统中无此编号前缀，自动生成)` , name : `合同编号：${contract_id}` , tel: ''});

              const id = this.hContractList[0].id;
              let no = parseInt(id.split(`[${dayjs().format('YYYY')}]`)[1]) + 1;
              no = `00000${no}`.slice(-3);
              this.item.contractId = `${this.item.prefix}[${dayjs().format('YYYY')}]${no}`;
            }
          }
        } catch (error) {
          console.log(error);
        }

      },

      //查询归档人员
      async queryArchiveMan(){
        //获取盖章人信息
        const archive_name = this.item.archive_name;

        try {
          if(!!archive_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(archive_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.auserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.auserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.auserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.auserList = this.auserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.auserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      async queryFinanceArchiveMan(){
        //获取盖章人信息financeuserList
        const finance_name = this.item.finance_name;

        try {
          if(!!finance_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(finance_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.financeuserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  });

                   //获取盖印人姓名
                  this.item.finance_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.finance = user[0].loginid;

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  //当前盖印人编号
                  this.item.finance = user.loginid;
                  //获取盖印人姓名
                  this.item.finance_name = user.lastname;
                  //将用户数据推送至对方数组
                  this.financeuserList.push({id:user.loginid , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.financeuserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.financeuserList = this.financeuserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.financeuserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      //用户选择前台接待
      async queryRecordArchiveMan(){
        //获取盖章人信息
        const record_name = this.item.record_name;

        try {
          if(!!record_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(record_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.recorduserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  });

                   //获取盖印人姓名
                  this.item.record_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.record = user[0].loginid;

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  //当前盖印人编号
                  this.item.record = user.loginid;
                  //获取盖印人姓名
                  this.item.record_name = user.lastname;
                  //将用户数据推送至对方数组
                  this.recorduserList.push({id:user.loginid , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.recorduserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.recorduserList = this.recorduserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.recorduserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      //用户选择前台接待
      async queryFrontMan(){
        //获取盖章人信息
        const front_name = this.item.front_name;

        try {
          if(!!front_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(front_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.fuserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  });

                   //获取盖印人姓名
                  this.item.front_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.front = user[0].loginid;

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  //当前盖印人编号
                  this.item.front = user.loginid;
                  //获取盖印人姓名
                  this.item.front_name = user.lastname;
                  //将用户数据推送至对方数组
                  this.fuserList.push({id:user.loginid , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.fuserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.fuserList = this.fuserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.fuserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      //用户选择盖印人
      async querySealMan(){

        //获取盖章人信息
        const sealman = this.item.sealman;

        try {
          if(!!sealman){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(sealman.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.suserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })

                  //获取盖印人姓名
                  this.item.sealman = user[0].lastname;
                  //当前盖印人编号
                  this.item.seal = this.sealuserid = user[0].loginid;

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  //将用户数据推送至对方数组
                  this.suserList.push({id:user.loginid , name:user.lastname , tel:'' , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.suserList.length });
                  //获取盖印人姓名
                  this.item.sealman = user.lastname;
                  //当前盖印人编号
                  this.item.seal = this.sealuserid = user.loginid;
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.suserList = this.suserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.suserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }

      },
      async validField(fieldName){

        await tools.sleep(0);

        //邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName == 'dealMail'){
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        //修改合同列表时，切换编号名称
        if(fieldName == 'sealtype'){
          //设置编号名称
          this.noname = workconfig.sealTypeNoName[this.item[fieldName]];
          if(this.item[fieldName] == '非合同类'){
            //设置流水编号前缀为PTID
            this.item.prefix = 'PTID';
            //加载最近的同类型合同编号
            await this.queryHContract();
          } else {
            //设置流水编号前缀为LD
            this.item.prefix = 'LD';
            //加载最近的同类型合同编号
            await this.queryHContract();
          }
        }

        storage.setStore('system_seal_item' , JSON.stringify(this.item) , 3600 * 2 );

        return tools.isNull(this.message[fieldName]);
      },
      validFieldConfirm(fieldName){
        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';
        if(fieldName == 'dealMail'){
          this.message[fieldName] = workconfig.system.config.regexp.mail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }
        return tools.isNull(this.message[fieldName]);
      },
      afterRead(file) {

        file.status = 'uploading';
        file.message = '上传中...';

        setTimeout(() => {
          file.status = 'failed';
          file.message = '上传成功';
        }, 1000);
      },

      sealTypeConfirm(value) {
        const userInfo = storage.getStore('system_userinfo');
        //非总部的人不需要展示前台、档案、财务人员
        if (userInfo && userInfo.systemuserinfo && userInfo.systemuserinfo.textfield1 && userInfo.systemuserinfo.textfield1.indexOf('领地集团总部') > 0) {
          this.isGroupHeader = true;
        }
        this.item.sealtype = value;
        this.tag.showPickerSealType = false;
        this.validField('sealtype');
      },

      orderTypeConfirm(value) {
        this.item.ordertype = value;
        this.tag.showPickerOrderType = false;
        this.validField('ordertype');
      },

      approveTypeConfirm(value) {
        this.item.approveType = value;
        this.tag.showPicker = false;
        this.validField('approveType');
      },

      encodeURI(value){
        return window.encodeURIComponent(value);
      },

      getUrlParam(name) {
        try {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
        } catch (error) {
          console.log(error);
        }
      },
      //选中当前填报人
      async selectCreateUser(value){
        await tools.sleep(0);

        const id = this.cuserid;
        const user = this.cuserList.find((item,index) => {return id == item.id});

        try {
          this.item.dealManager = user.name;
          this.item.mobile = user.tel;
          this.item.username = user.id;
          this.item.signman = user.name;
          this.item.dealDepart = user.department;
          this.item.dealMail = user.mail;
        } catch (error) {
          console.log(error);
        }

        //缓存特定属性
        this.cacheUserInfo();

      },
      //选中当前合同编号
      async selectHContract(value){
        await tools.sleep(0);
        const id = this.hContractID;
        const item = this.hContractList.find((item,index) => {return id == item.id});
        let no = parseInt(id.split(`[${dayjs().format('YYYY')}]`)[1]) + 1;
        no = `00000${no}`.slice(-3);
        this.item.contractId = `${this.item.prefix}[${dayjs().format('YYYY')}]${no}`;
      },
      //选中当前前台人
      async selectFrontUser(value){
        await tools.sleep(0);
        const id = this.fuserid;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        //当前盖印人编号
        this.item.front = id;
      },
      //选中当前前台人
      async selectFinanceUser(value){
        await tools.sleep(0);
        const id = this.financeUserid;
        const user = this.financeuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.finance_name = user.name;
        //当前盖印人编号
        this.item.finance = id;
        //设置归档组
        this.item.archive_name = `${this.item.finance_name},${this.item.record_name}`;
        this.item.archive = `${this.item.finance},${this.item.record}`;
      },
      //选中当前档案人
      async selectRecordUser(value){
        await tools.sleep(0);
        const id = this.recordUserid;
        const user = this.recorduserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.record_name = user.name;
        //当前盖印人编号
        this.item.record = id;
        //设置归档组
        this.item.archive_name = `${this.item.finance_name},${this.item.record_name}`;
        this.item.archive = `${this.item.finance},${this.item.record}`;
      },
      //选中当前盖印人
      async selectSealUser(value){
        await tools.sleep(0);
        const id = this.suserid;
        const user = this.suserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.sealman = user.name;
        this.item.seal = id;
        //当前盖印人编号
        this.sealuserid = id;
      },
      //选中当前归档人员
      async selectArchiveUser(values){
        await tools.sleep(0);
        let ids = [];
        let names = [];
        this.$refs.checkboxGroup.$data.checkboxValues.map((value,index) => {
          if(value == 1){
            ids.push(this.auserList[index].id);
            names.push(this.auserList[index].name);
          }
        })
        this.item.archive_name = names.join(',');
        this.item.archive = ids.join(',');
      },
      //查询经办人基本信息
      async queryManager(){
        //获取经办人信息
        const manager = this.item.dealManager;

        try {
          if(!!manager){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(manager.trim());
            //从提交的历史数据中获取填报人资料
            let info = await manageAPI.queryUserBySealData(manager.trim());

            if(!!user){
              if(Array.isArray(user)){ //如果是用户数组列表，则展示列表，让用户自己选择

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    this.cuserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else {

                try {
                  this.item.dealManager = user.deal_manager || this.item.dealManager;
                  this.item.mobile = user.mobile;
                  this.item.username = user.loginid;
                  this.item.dealMail = user.email;
                  this.item.signman = manager;
                } catch (error) {
                  console.log(error);
                }

                try {
                  if(!user.email&&!!info){
                    this.item.dealMail = info.deal_mail;
                    this.item.dealDepart = info.deal_depart;
                  }
                } catch (error) {
                  console.log(error);
                }

                try {
                  //缓存特定属性
                  this.cacheUserInfo();
                } catch (error) {
                  console.log(error);
                }

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  this.item.dealDepart = department;
                  this.cuserList.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.cuserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.cuserList = this.cuserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.cuserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            } else if(!user && !!info){

              try {
                //如果是用户数组列表，则展示列表，让用户自己选择
                if(!Array.isArray(info)) {
                  this.item.mobile = info.mobile;
                  this.item.username = info.username;
                  this.item.signman = manager;
                  this.item.dealMail = info.deal_mail;
                  this.item.dealDepart = info.deal_depart;
                  //缓存特定属性
                  this.cacheUserInfo();
                }
              } catch (error) {
                console.log(error);
              }

            }

          }
        } catch (error) {
          console.log(error);
        }

      },
      //缓存填报人信息
      async cacheUserInfo(){
        //获取特定属性
        const temp = (({dealManager, mobile, username , dealMail , signman , dealDepart}) => ({dealManager, mobile, username , dealMail , signman , dealDepart}))(this.item)
        //将用户名存放入缓存中，下次打开页面直接填入
        storage.setStore('system_user_sealinfo' , temp , 3600 * 24 * 30);
      },
      async queryInfo(){

        try {
          this.iswechat = tools.isWechat();

          var that = this;

          that.item.sealman = tools.getUrlParam('sealman');
          that.item.status = this.statusType[tools.getUrlParam('statustype')];
          that.sealuserid = tools.getUrlParam('sealuserid');
          that.groupid = tools.getUrlParam('groupid') || 'Group_LD';

          that.item.seal = tools.getUrlParam('seal'); //用印管理员成员组
          that.item.front = tools.getUrlParam('front');  //用印前台接受组
          that.item.archive = tools.getUrlParam('archive'); //用印归档组(财务/档案)

          //如果盖印人填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(that.item.sealman)){
            //获取盖印人姓名
            that.item.sealman = await manageAPI.queryUsernameByID(that.item.sealman);
          }

          //如果前台人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(that.item.front)){
            //获取盖印人姓名
            that.item.front_name = await manageAPI.queryUsernameByID(that.item.front);
          }

          //如果盖印人候选列表存在
          if(that.item.seal){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(that.item.seal.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.sealuserid = elem.loginid;
              this.suserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.suserList.length });
            })
          }

          //如果前台人候选列表存在
          if(that.item.front){
            //获取可选填报人列表
            let flist = await manageAPI.queryUsernameByIDs(that.item.front.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            flist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.fuserList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.suserList.length });
            })
          }

          //如果前台人候选列表存在
          if(that.item.archive){
            let names = [];
            let ids = [];
            //获取可选填报人列表
            let alist = await manageAPI.queryUsernameByIDs(that.item.archive.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            alist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              names.push(elem.lastname);
              ids.push(elem.loginid);
              this.auserList.push({id:elem.loginid , value:`${elem.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') ,  name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.auserList.length });
            })
            this.item.archive = ids.join(',');
            this.item.archive_name = names.join(',');
          }

          //获取缓存的用户数据
          const temp = storage.getStore('system_user_sealinfo');

          if(!!temp){
            this.item.dealManager = temp.dealManager;
            this.item.mobile = temp.mobile;
            this.item.username = temp.username;
            this.item.dealMail = temp.dealMail;
            this.item.signman = temp.signman;
            this.item.dealDepart = temp.dealDepart;
          }

          //获取用户信息
          let userinfo = await storage.getStore('system_userinfo');

          if( !tools.isNull(userinfo) ){
            this.item.dealManager = userinfo.systemuserinfo.realname;
            this.item.mobile = userinfo.systemuserinfo.mobile;
            this.item.username = userinfo.systemuserinfo.username;
            this.item.signman = userinfo.systemuserinfo.realname;
            this.item.dealDepart = userinfo.systemuserinfo.textfield1.split('||')[1];
            if(this.item.dealDepart.includes('>')){
              this.item.dealDepart = this.item.dealDepart.split('>')[1]
            }
          }

          //如果用户邮箱为空，则从以前填写的记录中获取邮箱账号
          if(tools.isNull(this.item.dealMail) || tools.isNull(this.item.company)){
            const tmp = await query.queryMailBySealData(this.item.signman);
            this.item.dealMail = tmp.deal_mail;
            this.item.company = tmp.company;
            this.item.dealDepart = tmp.deal_depart;
            this.item.sealman = tmp.seal_man;
            this.item.seal = tmp.seal;
          }

          //如果前台不存在，则添加
          if(tools.isNull(this.item.front)){
            const tmp = await query.queryFrontBySealData(this.item.signman);
            this.item.front = tmp.front;
            this.item.front_name = tmp.front_name;
            this.item.archive = tmp.archive;
            this.item.archive_name = tmp.archive_name;
            this.item.record = tmp.record;
            this.item.record_name = tmp.record_name;
            this.item.finance = tmp.finance;
            this.item.finance_name = tmp.finance_name;
          }

          //是否有最近缓存数据
          const tempitem = storage.getStore('system_seal_item');

          if(!!tempitem){
            this.item.filename = tempitem.filename;
            this.item.count = tempitem.count;
            this.item.prefix = tempitem.prefix;
          }

          if(!that.sealuserid){
            that.sealuserid = this.config[that.item.sealman];
          }

          //加载最近的同类型合同编号
          await this.queryHContract();

        } catch (error) {
          console.log(error);
        }
      },

      async saveAsFile(file , name){
        try {
          window.saveAs(file , name);
        } catch (error) {
          console.log(error);
        }
      },

      async handleConfirm(){

        //TODO:{*} 此处可以加分布式锁，防止高并发合同编号相同

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        // 缓存填报人信息
        this.cacheUserInfo();

        //先验证是否合法
        const keys = (this.item.sealtype == '合同类' && this.isGroupHeader) ?
          Object.keys({sealtype:'', ordertype:'', filename:'', count:'', dealDepart:'', dealManager:'', username , dealMail:'', approveType:'',  signman:'', workno:'', company:'', seal:'' , front:'' , finnace:'' , record:'', front_name:'' , finnace_name:'' , record_name:'',}) :
          Object.keys({sealtype:'', ordertype:'', filename:'', count:'', dealDepart:'', dealManager:'', username , dealMail:'', approveType:'',  signman:'', workno:'', company:'', seal:''})

        const invalidKey =  keys.find(key => {
          this.validField();
          return !this.validFieldConfirm(key);
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请检查表单填写内容，确认内容是否填写完整无误！',
          });
          return false;
        }

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(`${window.requestAPIConfig.restapi}/api/v_seal_max`).set('accept', 'json');

        maxinfo = maxinfo.body[0];
        var maxno = '';
        this.noname = '合同编号';

        //根据用户选择的印章实体公司来设置印章编码

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          this.noname = '合同编号';
        } else {
          this.noname = '流水编号';
          //设置非合同类前缀编号
          this.item.prefix = 'PTID';
          //加载最近的同类型合同编号
          await this.queryHContract();
        }

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';


        //第一步，构造form对象
        const item = this.item;
        const no = maxinfo.maxno + 1;
        const id = tools.queryUniqueID();
        const create_by = item.dealManager;
        const create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const filename = item.filename;
        const count = item.count;
        const seal_type = item.sealtype;
        const order_type = item.ordertype;
        const deal_depart = item.dealDepart;
        const deal_manager = item.dealManager;
        const deal_mail = item.dealMail;
        const username = item.username;
        const approve_type = item.approveType;
        const seal_time = item.sealtime;
        const contract_id = item.contractId;
        const prefix = item.prefix;
        const sign_man = item.signman;
        const workno = item.workno;
        const mobile = item.mobile;
        //用印注意，此处需要找到用印人的同组用户，写入数据库
        const seal = item.seal;
        const seal_man = item.sealman;
        const front = item.front;
        const front_name = item.front_name;
        const finance = item.finance;
        const finance_name = item.finance_name;
        const record = item.record;
        const record_name = item.record_name;
        const archive = item.archive;
        const archive_name = item.archive_name;
        const send_location = item.send_location;
        const send_mobile = item.send_mobile;
        const company = item.company;
        const seal_wflow = tools.getUrlParam('statustype') || 'none';
        const status = this.statusType[tools.getUrlParam('statustype')] || '待用印';

        //查询直接所在工作组
        const resp = await query.queryRoleGroupList('SEAL_ADMIN' , seal);

        //获取到印章管理员组信息
        let seal_group_ids = resp && resp.length > 0 ? resp[0].userlist : '';
        let seal_group_names = resp && resp.length > 0 ? resp[0].enuserlist : '';

        //如果未获取用户名称，则直接设置用印人为分组成员
        if(tools.isNull(seal_group_ids)){
          seal_group_ids = seal;
          seal_group_names = seal_man;
        }

        if((!finance || !finance_name || !record || !record_name) && (this.item.sealtype == '合同类' && this.isGroupHeader)){
           //提示确认用印操作
          await vant.Dialog.confirm({
            title: '用印申请',
            message: '请输入并选择财务/档案归档人员！',
          })
          return false;
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印申请',
          message: '确认提交用印登记申请？',
        })

        const elem = {id , no , create_by , create_time , filename , count , deal_depart , deal_manager , username , deal_mail , mobile , approve_type , seal_type, order_type, seal_man , contract_id , sign_man , company , workno , seal_wflow , prefix , status , send_location , send_mobile , seal, front, archive , front_name , archive_name , finance , finance_name , record , record_name , seal_group_ids , seal_group_names}; // 待提交元素

        //第二步，向表单提交form对象数据
        this.loading = true;
        const result = await manageAPI.postTableData('bs_seal_regist' , elem);

        //sleep一下
        await tools.sleep(0);

        //发送自动设置排序号请求
        const patchResp = await superagent.get(workconfig.queryAPI.autoSerialAPI).set('accept', 'json');

        //第三步，回显当前用印登记信息，并向印章管理员推送消息
        this.loading = false;
        let message = null;

        if(result.protocol41 == true && result.affectedRows > 0){

          message = '已成功提交用印登记信息！';

          this.status = 'none';
          this.readonly = true;

          const title = '用印登记申请';
          const description = `@印章管理员 @${seal_man} ，${create_by}已提交用印登记信息，请及时处理用印申请！`;

          const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=none`);
          const signmail = this.mailconfig[seal_man];

          //领取地址
          const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=receive`);

          try {
            //推送群消息，告知印章管理员进行用印处理(企业微信群)
            await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/${title}/${description}?type=manage&rurl=${url}&id=${id}&userid=${create_by}`)
                        .set('accept', 'json');
          } catch (error) {
            console.log(error);
          }

          try {
            //通知签收人领取资料(企业微信发送)
            await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已提交用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${this.noname}：${this.item.contractId}?rurl=${receiveURL}`)
                         .set('accept', 'json');
          } catch (error) {
            console.log(error);
          }

          try {
            //通知印章人领取资料(企业微信发送)
            await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.seal}}/文件:‘${this.item.filename}’已提交用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${this.noname}：${this.item.contractId}?rurl=${url}`)
                         .set('accept', 'json');
          } catch (error) {
            console.log(error);
          }

          //查询数据
          const value = await query.queryTableData(`bs_seal_regist` , id);

          //显示序列号
          this.item.serialid = value.serialid;

          message = `${message} 排序号为:${value.serialid},请将序号书写在用印文件上！`

          //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
          const prLogHisNode = {
            id: tools.queryUniqueID(),
            table_name: 'bs_seal_regist',
            main_value: id,
            proponents: username,
            business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
            business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
            process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
            employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
            approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
            action         : '发起'    ,//varchar(100)  null comment '操作动作',
            action_opinion : '发起用印申请[待用印]',//text          null comment '操作意见',
            operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
            functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
            process_station   : '用印审批[印章管理]',//varchar(100)  null comment '流程岗位',
            business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
            content           : this.item.filename + ' #经办人: ' + this.item.username ,//text          null comment '业务内容',
            process_audit     : this.item.workno + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
            create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
            relate_data       : '',//text          null comment '关联数据',
            origin_data       : '',
          }

          await workflow.approveViewProcessLog(prLogHisNode);

          //同时推送一条待办记录给印章管理员

          //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
          const prLogNode = {
            id: tools.queryUniqueID(),
            table_name: 'bs_seal_regist',
            main_value: id,
            proponents: seal,
            business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
            business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
            process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
            employee       : seal_man ,//varchar(1000) null comment '操作职员',
            approve_user   : seal ,//varchar(100)  null comment '审批人员',
            action         : ''    ,//varchar(100)  null comment '操作动作',
            action_opinion : '用印申请[待用印]',//text          null comment '操作意见',
            operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
            functions_station : '印章管理',//varchar(100)  null comment '职能岗位',
            process_station   : '用印审批[印章管理]',//varchar(100)  null comment '流程岗位',
            business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
            content           : this.item.filename + ' #待用印 #经办人: ' + this.item.username ,//text          null comment '业务内容',
            process_audit     : this.item.workno + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
            create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
            relate_data       : '',//text          null comment '关联数据',
            origin_data       : '',
          }

          await workflow.taskViewProcessLog(prLogNode);

        } else {
          message = '提交用印登记信息失败，请稍后再试！';
        }

        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

      }

    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealinfo.css";
    @import "../../assets/css/sealinfo.global.css";
</style>
