<template>
  <keep-alive>
  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>印章管理</span>
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
            <van-col span="8"></van-col>
          </van-row>
        </div>

      </div>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
        </div>
        <div class="weui-cells" style="margin-top:0px;margin-left:0px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

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
                <van-field :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人的邮箱地址" @blur="validField('dealMail')" :error-message="message.dealMail" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="审批信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required readonly clickable clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @blur="validField('approveType')" :error-message="message.approveType" @click="tag.showPicker = true" />
                <van-field required clearable label="编号前缀" v-model="item.prefix" placeholder="请输入合同对应前缀，如LD、SD、CD等" v-show="item.sealtype == '合同类' " @blur="validField('prefix');queryHContract();" :error-message="message.prefix" @click="queryHContract();"  />
                <van-field clearable label="合同编号" v-model="item.contractId" placeholder="请根据最新已有合同编号填写编号" v-show="item.sealtype == '合同类' " />
                <van-address-list v-show="hContractList.length > 0 && item.sealtype == '合同类'" v-model="hContractID" :list="hContractList" default-tag-text="默认" edit-disabled @select="selectHContract()" />
                <van-field required :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" @blur="validField('signman')" :error-message="message.signman" />
                <van-field required :readonly="readonly" clearable label="用印公司" v-model="item.company" placeholder="请输入用印公司" @blur="validField('company')" :error-message="message.company" />
                <van-field required :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" @blur="validField('workno')" :error-message="message.workno" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="印章管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required clearable label="盖印人" v-model="item.sealman" placeholder="请输入印章管理员(盖印人)" @blur="validField('sealman');querySealMan();" :error-message="message.sealman" @click="querySealMan();" />
                <van-address-list v-show="suserList.length > 0" v-model="suserid" :list="suserList" default-tag-text="默认" edit-disabled @select="selectSealUser()" />
                <van-field v-show="item.sealtype == '合同类' " required clearable label="前台客服" v-model="item.front_name" placeholder="请输入前台客服人员名称" @blur="validField('front');queryFrontMan();" :error-message="message.front" @click="queryFrontMan();" />
                <van-address-list v-show="fuserList.length > 0 && item.sealtype == '合同类'" v-model="fuserid" :list="fuserList" default-tag-text="默认" edit-disabled @select="selectFrontUser()" />
                <van-field v-show="item.sealtype == '合同类' " required clearable label="归档人员" v-model="item.archive_name" placeholder="请输入归档人员名称" @blur="queryArchiveMan();" @click="queryArchiveMan();" />
                <nut-checkboxgroup v-show="item.sealtype == '合同类' " ref="checkboxGroup" :checkBoxData="auserList" v-model="agroup" @change="selectArchiveUser()"></nut-checkboxgroup>
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

          <van-cell-group style="margin-top:10px;">
            <van-field
              v-model="item.message"
              rows="2"
              autosize
              label="备注说明"
              type="textarea"
              maxlength="500"
              placeholder="请印章管理员输入用印意见或备注说明！"
              show-word-limit
            />
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

          <van-cell-group style="margin-top:10px;" v-show="processLogList.length > 0">
            <van-cell value="处理记录" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <div>
              <van-steps direction="vertical" :active="processLogList.length - 1">
                <template v-for="value in processLogList">
                  <van-step :key="value.id">
                    <h3>{{ value.action + ' ' + value.employee + ' ' + value.action_opinion }}</h3>
                    <p>{{ value.create_time }}</p>
                  </van-step>
                </template>
              </van-steps>
            </div>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-goods-action  v-show=" tag.showPicker == false && tag.showPickerSealType == false && tag.showPickerOrderType == false && status == '' ">
              <van-goods-action-button type="warning" text="作废" @click="handleEnd();" />
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="提交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>
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
            agroup:[],
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
              sealtype: '合同类',
              ordertype:'常规用印',
              mobile:'',
              send_mobile:'',
              send_location:'',
              seal:'',     //用印管理员成员组
              front:'',    //用印前台接受组
              front_name:'',
              archive: '', //用印归档组(财务/档案)
              archive_name:[],
              prefix: 'LD',  //编号前缀
              company:'',
              name: '',    //流程组名，即Group_XX
              confirmStatus: '',//财务确认/档案确认
              status: '',
            },
            backPath:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            loading:false,
            officeList:[],
            processLogList:[],
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
            archiveTypeColumns: workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
            approveColumns: workconfig.compcolumns.approveColumns,
        }
    },
    async activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
        //this.userStatus();
    },
    async mounted() {
      this.queryInfo();
      //this.userStatus();
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
          // if( tools.isNull(info) ){
          //   vant.Toast('尚未登录！');
          //   await this.clearLoginInfo();
          //   this.$router.push(`/login`);
          // }
        } catch (error) {
          console.log(error);
        }
      },
      //获取合同编号
      async queryHContract(){
        //获取盖章人信息
        const prefix = this.item.prefix = this.item.prefix.toUpperCase();

        try {
          if(!!prefix){

            //从用户表数据中获取填报人资料
            let list = await manageAPI.queryContractInfoByPrefix(prefix.trim());

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

              //遍历去重
              try {
                this.hContractList = this.hContractList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.hContractList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })

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
                    this.auserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
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
                    this.fuserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
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
                  //当前盖印人编号
                  this.item.front = user.loginid;
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
                    this.suserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
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
                  //当前盖印人编号
                  this.sealuserid = user.loginid;
                  //将用户数据推送至对方数组
                  this.suserList.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.suserList.length });
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
      validField(fieldName){
        //邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName == 'dealMail'){
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        storage.setStore('system_seal_item' , JSON.stringify(this.item) , 3600 * 2 );

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
        const no = parseInt(id.split(`[${dayjs().format('YYYY')}]`)[1]) + 1;
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
                    this.cuserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , isDefault: !index });
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
          const that = this;
          this.iswechat = tools.isWechat();
          this.groupid = tools.getUrlParam('groupid') || 'Group_LD';

          //获取ID，然后获取到相应的原用印登记信息
          const value = await query.queryTableData(`bs_seal_regist` , tools.getUrlParam('id'));

          this.item = {
              id: value.id,
              serialid: value.serialid,
              createtime: value.create_time ? dayjs(value.create_time).format('YYYY-MM-DD HH:mm:ss') : '',
              filename: value.filename,
              count: value.count,
              dealDepart: value.deal_depart,
              dealManager: value.deal_manager,
              dealMail: value.deal_mail,
              approveType: value.approve_type,
              contractId: value.contract_id,
              signman: value.sign_man,
              workno: value.workno,
              sealtime: value.seal_time ? dayjs(value.seal_time).format('YYYY-MM-DD HH:mm:ss') : '',
              finance_time: value.finance_time ? dayjs(value.finance_time).format('YYYY-MM-DD HH:mm:ss') : '',
              doc_time: value.doc_time ? dayjs(value.doc_time).format('YYYY-MM-DD HH:mm:ss') : '',
              receive_time: value.receive_time ? dayjs(value.receive_time).format('YYYY-MM-DD HH:mm:ss') : '',
              done_time: value.done_time ? dayjs(value.done_time).format('YYYY-MM-DD HH:mm:ss') : '',
              front_time: value.front_time ? dayjs(value.front_time).format('YYYY-MM-DD HH:mm:ss') : '',
              send_time: value.send_time ? dayjs(value.send_time).format('YYYY-MM-DD HH:mm:ss') : '',
              sealman: value.seal_man,
              username: value.username,
              sealtype: value.seal_type ? value.seal_type : (value.contract_id ? '合同类':'非合同类'),
              ordertype: value.order_type,
              mobile: value.mobile,
              send_mobile: value.send_mobile,
              send_location: value.send_location,
              front: value.front,
              seal: value.seal,
              front_name: value.front_name,
              archive: value.archive,
              archive_name: value.archive_name,
              message: value.message,
              prefix: value.prefix,
              company: value.company,
              confirmStatus: '',//财务确认/档案确认
              status: value.status,
              type: that.item.type
            }

          //如果盖印人候选列表存在
          if(that.item.sealman){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(that.item.seal.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.sealuserid = elem.loginid;
              this.suserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.suserList.length });
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
              this.fuserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.suserList.length });
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
              this.auserList.push({id:elem.loginid , value:`${elem.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') ,  name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.auserList.length });
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
          await this.queryProcessLog();

          //如果合同编号存在
          this.item.contractId = value.contract_id || this.item.contractId;

        } catch (error) {
          console.log(error);
        }
      },
      /**
       * @function 获取处理日志
       */
      async queryProcessLog(){
        const id = tools.getUrlParam('id');
        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);
          this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
          this.processLogList.sort();
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
      /**
       * @function 处理作废操作
       */
      async handleEnd(){

          // 缓存填报人信息
          this.cacheUserInfo();

          //第一步，构造form对象
          const item = this.item;
          const id = item.id;
          const status = '已作废';

          const elem = {id , status }; // 待提交元素

          //第二步，向表单提交form对象数据
          const result = await manageAPI.patchTableData('bs_seal_regist' , id , elem);

          //第三步，回显当前用印登记信息，并向印章管理员推送消息
          this.loading = false;
          let message = null;

          if(result.protocol41 == true && result.affectedRows > 0 && result.changedRows > 0 ){
            message = '已作废用印登记信息！';
            this.status = 'none';
            this.readonly = true;
          } else {
            message = '作废用印登记信息失败，请稍后再试！';
          }

          await vant.Dialog.alert({
            title: '温馨提示',
            message: message,
          });

        }

      },
      /**
       * @function 处理提交操作
       */
      async handleConfirm(){

        // 缓存填报人信息
        this.cacheUserInfo();

        //先验证是否合法
        const keys = Object.keys({sealtype:'', ordertype:'', filename:'', count:'', dealDepart:'', dealManager:'', username , dealMail:'', approveType:'',  signman:'', workno:'',})
        const invalidKey = keys.find(key => {
          return !this.validField(key);
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请检查表单填写内容，确认内容是否填写完整无误及修改正确！',
          });
          return false;
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印申请',
          message: '请确认修改用印申请无误，将提交用印登记申请？',
        })

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(`${window.requestAPIConfig.restapi}/api/v_seal_max`).set('accept', 'json');
        maxinfo = maxinfo.body[0];
        var maxno = '';
        var noname = '合同编号';

        //根据用户选择的印章实体公司来设置印章编码

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          // maxno = (maxinfo.maxno + 100001).toString().slice(-3);
          // this.item.contractId = `${workconfig.group[this.groupid].prefix}[${dayjs().format('YYYY')}]${maxno}`;
          noname = '合同编号';
        } else {
          // maxno = (maxinfo.caxno + 100001).toString().slice(-3);
          // this.item.contractId = `NM[${dayjs().format('YYYY')}]${maxno}`;
          noname = '流水编号';
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
        const id = item.id;
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
        const seal_man = item.sealman;
        //const contract_id = item.contractId;
        const sign_man = item.signman;
        const workno = item.workno;
        const mobile = item.mobile;
        const seal = item.seal;
        const front = item.front;
        const front_name = item.front_name;
        const archive = item.archive;
        const archive_name = item.archive_name;
        const send_location = item.send_location;
        const send_mobile = item.send_mobile;
        const prefix = item.prefix;
        const company = item.company;
        const seal_wflow = tools.getUrlParam('statustype') || 'none';
        const status = this.statusType[tools.getUrlParam('statustype')] || '待用印';

        const elem = {id , no , create_by , create_time , filename , count , deal_depart , deal_manager , username , deal_mail , mobile , approve_type , seal_type, order_type, seal_man , sign_man , workno , seal_wflow , status , send_location , send_mobile , seal, front, archive , front_name , archive_name , prefix , company , message : item.message }; // 待提交元素

        //第二步，向表单提交form对象数据
        this.loading = true;
        const result = await manageAPI.patchTableData('bs_seal_regist' , id , elem);

        //第三步，回显当前用印登记信息，并向印章管理员推送消息
        this.loading = false;
        let message = null;

        if(result.protocol41 == true && result.affectedRows > 0 && result.changedRows > 0 ){
          message = '已成功提交修改后的用印登记信息！';

          this.status = 'none';
          this.readonly = true;

          const title = '用印登记申请(已修改)';
          const description = `@印章管理员 @${seal_man} ，${create_by}已修改用印登记信息，请及时处理修改后的用印申请！流程编号：${workno}`;

          const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=none`);
          const signmail = this.mailconfig[seal_man];

          //领取地址
          const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=receive`);

          //推送群消息，告知印章管理员进行用印处理(企业微信群)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/${title}/${description}?type=manage&rurl=${url}&id=${id}&userid=${create_by}`)
                      .set('accept', 'json');

          //通知签收人领取资料(企业微信发送)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已修改用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}，流程编号：${workno}?rurl=${receiveURL}`)
                       .set('accept', 'json');

          //通知印章人领取资料(企业微信发送)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.sealuserid},${workconfig.group[groupid].seal}/文件:‘${this.item.filename}’已修改用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}，流程编号：${workno}?rurl=${url}`)
                       .set('accept', 'json');

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
