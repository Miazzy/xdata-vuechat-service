<template>
  <keep-alive>
  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center">
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">用印登记确认</van-col>
            <van-col span="8"></van-col>
          </van-row>
        </div>
      </div>

      <van-tag style="position: absolute; top: 54px; right: 0px; z-index: 1000; border-radius: 30px 0px 0px 30px;" :type="status_type"> {{ ` ${status}` }}</van-tag>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
        </div>
        <div class="weui-cells" style="margin-top:0px;margin-left:0px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

          <van-cell-group>

            <van-cell-group style="margin-top:10px;">
              <van-cell value="基本信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
              <van-field v-show="item.serialid" clearable label="用印序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
              <van-field readonly clearable label="填报日期" v-model="item.createtime" placeholder="请输入登记日期" />
              <van-field readonly clearable  label="用印类型" v-model="item.sealtype" placeholder="选择用印类型" @click="tag.showPickerSealType = true" />
              <van-field readonly clearable  label="用印顺序" v-model="item.ordertype" placeholder="选择用印顺序"  />
              <van-field :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" />
              <van-field :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" />
            </van-cell-group>

            <van-cell-group style="margin-top:10px;">
              <van-cell value="经办信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
              <van-field :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" />
              <van-field :readonly="readonly" clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" />
              <van-field :readonly="readonly" clearable label="经办账户" v-model="item.username" placeholder="请输入经办人的OA账号" />
              <van-field :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" />
              <van-field :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人邮箱" />
            </van-cell-group>

            <van-cell-group style="margin-top:10px;">
              <van-cell value="审批信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
              <van-field readonly clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @click="tag.showPicker = true" />
              <van-field required clearable label="编号前缀" v-model="item.prefix" placeholder="请输入合同对应前缀，如LD、SD、CD等" v-show="item.sealtype == '合同类' || item.sealtype == '合同类' " @blur="validField('prefix');queryHContract();" :error-message="message.prefix" @click="queryHContract();"  />
              <van-field clearable label="合同编号" v-model="item.contractId" placeholder="请输入合同编号" v-show="item.sealtype == '合同类' " />
              <van-address-list v-show="hContractList.length > 0 && item.sealtype == '合同类'" v-model="hContractID" :list="hContractList" default-tag-text="默认" edit-disabled @select="selectHContract()" />
              <van-field :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" />
              <van-field required clearable label="用印公司" v-model="item.company" placeholder="请输入用印公司" />
              <van-field clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" />
            </van-cell-group>

            <van-cell-group style="margin-top:10px;">
                <van-cell value="印章管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field readonly required clearable label="盖印人" v-model="item.sealman" placeholder="请输入印章管理员(盖印人)" />
                <van-field v-show="item.sealtype == '合同类' " required clearable label="前台客服" v-model="item.front_name" placeholder="请输入前台客服人员名称" @blur="queryFrontMan();" @click="queryFrontMan();" />
                <van-address-list v-show="fuserList.length > 0 && item.sealtype == '合同类'" v-model="fuserid" :list="fuserList" default-tag-text="默认" edit-disabled @select="selectFrontUser()" />
                <van-field v-show="item.sealtype == '合同类' && false " required clearable label="归档人员" v-model="item.archive_name" placeholder="请输入归档人员名称" @blur="queryArchiveMan();" @click="queryArchiveMan();" />
                <nut-checkboxgroup v-show="item.sealtype == '合同类' && false " ref="checkboxGroup" :checkBoxData="auserList" v-model="agroup" @change="selectArchiveUser()"></nut-checkboxgroup>
                <van-field v-show="item.sealtype == '合同类' " required clearable label="财务归档" v-model="item.finance_name" placeholder="请输入财务归档人员名称" @blur="queryFinanceArchiveMan();"  @click="queryFinanceArchiveMan();" />
                <van-address-list v-show="financeuserList.length > 0 && item.sealtype == '合同类'" v-model="financeUserid" :list="financeuserList" default-tag-text="默认" edit-disabled @select="selectFinanceUser()" />
                <van-field v-show="item.sealtype == '合同类' " required clearable label="档案归档" v-model="item.record_name" placeholder="请输入档案归档人员名称" @blur="queryRecordArchiveMan();"  @click="queryRecordArchiveMan();" />
                <van-address-list v-show="recorduserList.length > 0 && item.sealtype == '合同类'" v-model="recordUserid" :list="recorduserList" default-tag-text="默认" edit-disabled @select="selectRecordUser()" />
                <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly v-show="!!item.sealtime"/>
              </van-cell-group>

            <van-cell-group style="margin-top:10px;">
              <van-cell value="处理信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
              <van-field clearable label="资料盖印时间" v-model="item.sealtime" placeholder="--" readonly v-show="!!item.sealtime" />
              <van-field clearable label="资料领取时间" v-model="item.receive_time" placeholder="--" readonly v-show="!!item.receive_time"/>
              <van-field clearable label="资料寄送时间" v-model="item.send_time" placeholder="--" readonly v-show="!!item.send_time"/>
              <van-field clearable label="移交前台时间" v-model="item.front_time" placeholder="--" readonly v-show="!!item.front_time"/>
              <van-field clearable label="财务归档时间" v-model="item.finance_time" placeholder="--" readonly v-show="!!item.finance_time"/>
              <van-field clearable label="档案归档时间" v-model="item.doc_time" placeholder="--" readonly v-show="!!item.doc_time"/>
              <van-field clearable label="台账生成时间" v-model="item.done_time" placeholder="--" readonly v-show="!!item.done_time"/>
              <van-field clearable label="流程状态" v-model="item.status" placeholder="" readonly/>
              <van-field clickable clearable v-if=" item.type == 'done' && (!item.finance_time || !item.doc_time)" label="归档类型" v-model="item.archiveType" placeholder="选择归档类型" @click="tag.showPicker = true" />
            </van-cell-group>

            <van-popup v-model="tag.showPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="archiveTypeColumns"
                @cancel="tag.showPicker = false"
                @confirm="archiveTypeConfirm"
              />
            </van-popup>
          </van-cell-group>

          <van-cell-group v-show="item.ordertype == '我方先印' " style="margin-top:10px;">
            <van-cell value="寄件信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-field :readonly="readonly" clearable label="寄送地址" v-model="item.send_location" placeholder="请输入对方公司/单位/组织的寄送地址" />
            <van-field :readonly="readonly" clearable label="寄送电话" v-model="item.send_mobile" placeholder="请输入对方公司/单位/组织相关负责人联系电话" />
          </van-cell-group>

          <van-cell-group style="margin-top:10px;">
            <van-cell value="用印说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-field required
              v-model="item.message"
              rows="2"
              autosize
              clickable
              clearable
              label="备注说明"
              type="textarea"
              maxlength="500"
              placeholder="请印章管理员输入用印意见或备注说明！"
              @blur="validField('message')"
              :error-message="message.message"
              show-word-limit
            />
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

          <div style="margin-top:30px;margin-bottom:10px;border-top:0px solid #fcfcfc;" >

            <div v-show=" fileList.length > 0 " style="margin-top:15px;margin-left:7px;">
              图片附件
            </div>

            <div style="margin-left:10px;margin-top:10px;">
              <van-uploader v-model="fileList" multiple  preview-size="100" :lazy-load="true" :show-upload="false" :deletable="false" :preview-options="{closeable:true,loop:true,showIndicators:true,swipeDuration:500}"  />
            </div>

            <div v-show=" officeList.length > 0 " style="margin-top:15px;margin-left:7px;">
              其他附件
            </div>

            <div style="margin-left:10px;margin-top:10px;">
              <van-cell-group>
                <template v-for="(value,key) in officeList">
                  <van-cell class="van-ellipsis" :key="key" :value="value.name" is-link :clickable="true" @click="saveAsFile(value.url , value.name)" style="padding: 10px 2px 10px 2px;" />
                </template>
              </van-cell-group>
            </div>

            <van-goods-action v-if="item.status =='待用印' " >
              <van-goods-action-button type="warning" text="作废" @click="handleDisagree();" />
              <van-goods-action-button type="danger" text="确认" @click="handleAgree();" />
            </van-goods-action>

            <van-goods-action  v-if=" (item.status == '已用印' || item.status == '已领取' || item.status == '已寄送' ) && item.type == 'front' ">
              <van-goods-action-button v-show=" (item.ordertype == '我方先印' && (item.status == '已用印' || item.status == '已领取')) " id="informed_confirm" type="danger" native-type="submit" text="确认寄送"  @click="handleSending();" style="border-radius: 10px 10px 10px 10px;" />
              <van-goods-action-button v-show=" (item.ordertype != '我方先印' && (item.status == '已用印' || item.status == '已领取')) || (item.ordertype == '我方先印' && item.status == '已寄送')" id="informed_confirm" type="danger" native-type="submit" text="确认移交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-if=" item.type == 'done' && (!item.finance_time || !item.doc_time) && !tag.showPicker">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="确认归档"  @click="handleArchive();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-if=" item.status == '已归档' && item.type == 'archive' && !item.done_time ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="完成归档"  @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px;" />
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
            title:'用印登记确认表',
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
            financeUserid:'',
            financeuserList:[],
            recordUserid:'',
            recorduserList:[],
            agroup:[],
            hContractID:'',
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
              serialid:'',
              filename:'',
              count:'',
              dealDepart:'',
              dealManager:'',
              username:'',
              approveType:'',
              contractId:'',
              signman:'',
              workno:'',
              sealtime:'',
              sealman: '',
              sealtype: '',
              ordertype: '',
              finance_time:'',
              doc_time:'',
              receive_time:'',
              done_time:'',
              front_time:'',
              send_time:'',
              mobile:'',
              send_location:'',
              send_mobile:'',
              seal:'',
              front:'',    //用印前台接受组
              front_name:'',
              archive: '', //用印归档组(财务/档案)
              archive_name:[],
              finance:'',    //用印财务接受组
              finance_name:'',
              record:'',    //用印档案接受组
              record_name:'',
              confirmStatus: '',//财务确认/档案确认
              prefix: '',
              status: '',
              company:'',
              message: '同意' , //用印说明
            },
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            backPath:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            fileList:[],
            loading:false,
            officeList:[],
            hContractList:[],
            processLogList:[],
            tag:{
              showPicker: false,
              showPickerSealType:false,
            },
            readonly: true,
            archiveTypeColumns: workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
            approveColumns: workconfig.compcolumns.approveColumns,
        }
    },
    activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
        this.userStatus();
    },
    mounted() {
      this.queryInfo();
      this.userStatus();
    },
    methods: {
      validField(fieldName){
        //邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

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
       //选中当前合同编号
      async selectHContract(value){
        await tools.sleep(0);
        const id = this.hContractID;
        const item = this.hContractList.find((item,index) => {return id == item.id});
        let no = parseInt(id.split(`[${dayjs().format('YYYY')}]`)[1]) + 1;
        no = `00000${no}`.slice(-3);
        this.item.contractId = `${this.item.prefix}[${dayjs().format('YYYY')}]${no}`;
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
        const archive_name = this.item.archive_name || this.item.archive;

        try {
          if(!!archive_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(archive_name.trim());

            //从用户表数据中获取填报人资料
            let user_ = await manageAPI.queryUserByNameHRM(this.item.archive.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                if(!!user_){
                  user = [...user , ...user_];
                }

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
      async queryFinanceArchiveMan(){
        //获取盖章人信息financeuserList
        const finance_name =  this.item.finance_name || this.item.finance;

        try {
          if(!!finance_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(finance_name.trim());

            //从用户表数据中获取填报人资料
            let user_ = await manageAPI.queryUserByNameHRM((this.item.finance || '').trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                if(!!user_){
                  user = [...user , ...user_];
                }

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.financeuserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
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
        const record_name =  this.item.record_name || this.item.record ;

        try {
          if(!!record_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(record_name.trim());

            //从用户表数据中获取填报人资料
            let user_ = await manageAPI.queryUserByNameHRM((this.item.record||'').trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                if(!!user_){
                  user = [...user , ...user_];
                }

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.recorduserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
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
        const front_name = this.item.front_name || this.item.front;

        try {
          if(!!front_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(front_name.trim());

            //从用户表数据中获取填报人资料
            let user_ = await manageAPI.queryUserByNameHRM(this.item.front.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                if(!!user_){
                  user = [...user , ...user_];
                }

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
        const sealman = this.item.sealman || this.item.seal;

        try {
          if(!!sealman){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(sealman.trim());

            //从用户表数据中获取填报人资料
            let user_ = await manageAPI.queryUserByNameHRM(this.item.seal.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                if(!!user_){
                  user = [...user , ...user_];
                }

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

      archiveTypeConfirm(value) {
        this.item.archiveType = value;
        this.tag.showPicker = false;
      },

      encodeURI(value){
        return window.encodeURIComponent(value);
      },

      getUrlParam(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
      },

      async queryInfo(){

        try {
          this.iswechat = tools.isWechat();

          var that = this;
          that.item.id = tools.getUrlParam('id');
          that.item.status = this.statusType[tools.getUrlParam('statustype')];
          that.item.type = tools.getUrlParam('type');

          //查询用印数据
          const value = await query.queryTableData(`bs_seal_regist` , that.item.id);

          //设置填报数据
          this.item = {
              id: that.item.id,
              serialid: value.serialid,
              createtime: value.create_time ? dayjs(value.create_time).format('YYYY-MM-DD HH:mm:ss') : '',
              filename: value.filename,
              count: value.count,
              dealDepart: value.deal_depart,
              dealManager: value.deal_manager,
              dealMail: value.deal_mail,
              username: value.username,
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
              ordertype: value.order_type,
              mobile: value.mobile,
              send_mobile: value.send_mobile,
              send_location: value.send_location,
              sealtype: value.seal_type ? value.seal_type : (value.contract_id ? '合同类':'非合同类'),
              front: value.front,
              seal: value.seal,
              front_name: value.front_name,
              archive: value.archive,
              archive_name: value.archive_name,
              finance: value.finance,
              finance_name: value.finance_name,
              record: value.record,
              record_name: value.record_name,
              confirmStatus: '',//财务确认/档案确认
              prefix: value.prefix,
              status: value.status,
              type: that.item.type,
              company: value.company,
              message: '同意',
            }

          //设置别名
          const that = this;

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

          //如果前缀编号存在，则查询一下最近合同单号
          if(that.item.prefix){
            await this.queryHContract();
          }

          //如果合同编号存在
          this.item.contractId = value.contract_id || this.item.contractId;

          await this.queryFinanceArchiveMan();
          await this.queryRecordArchiveMan();
          await this.queryProcessLog();

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
       * @function 检查用户状态
       */
      async userStatus(){
        try {
          let info = await storage.getStore('system_userinfo');
          if( tools.isNull(info) ){
            vant.Toast('尚未登录！');
            await this.clearLoginInfo();
            this.$router.push(`/login`);
          }
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
      /**
       * @function 处理同意操作
       */
      async handleAgree(){

        this.validField('message');

        var noname = '合同编号';

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        if( tools.isNull(userinfo) ){
          vant.Toast('尚未登录！');
          await this.clearLoginInfo();
          this.$router.push(`/login`);
        }

        //获取用印公司
        const company = this.item.company;

        //先验证是否合法
        const keys = this.item.sealtype == '合同类' ?
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

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //如果没有输入用印公司名称，则提示用户先输入用印公司名称
        if(!company){
          //提示确认用印操作
          await vant.Dialog.confirm({
              title: '用印确认',
              message: '请输入用印公司名称后，在进行确认操作！',
          })
          return;
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印确认',
          message: '请检查合同编号是否需要修改，并确认进行‘已用印’处理，确认后推送通知！',
        })

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = tools.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //领取人OA账户
        const username = this.item.username;
        //合同编号
        const contract_id = this.item.contractId;
        //前缀编号
        const prefix = this.item.prefix;
        //提示信息
        const message = `已向用印申请人@${this.item.dealManager}推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=seal&type=front`);
        //领取地址
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=receive`);

        //修改状态为已用印，保存当前合同编号
        await manageAPI.patchTableData(`bs_seal_regist` , id , {id , contract_id,  status: '已用印' , seal_time: time , front: this.item.front , front_name: this.item.front_name , archive: this.item.archive , archive_name: this.item.archive_name , finance: this.item.finance , finance_name: this.item.finance_name , record: this.item.record , record_name: this.item.record_name , prefix , company});

        //通知签收人领取资料(email通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/mail/用印资料领取通知/文件:‘${this.item.filename}’已用印，${noname}:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请及时领取/${email}?rurl=${receiveURL}`)
                      .set('accept', 'json');

        //通知签收人领取资料(企业微信通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已用印，请及时领取。日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}?rurl=${receiveURL}`)
                       .set('accept', 'json');

        //如果是合同类才走后续流程，如果是非合同类则通知经办人领取即可
        if(this.item.sealtype === '合同类'){
          //通知前台准备接受资料(企业微信群聊通知)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/用印资料等待移交通知/文件:‘${this.item.filename}’已用印，${noname}:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请等待资料送至前台!?type=front&rurl=${url}&id=${id}&userid=${this.item.dealManager}`)
                        .set('accept', 'json');
          //通知前台准备接受资料(企业微信发送)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${workconfig.group[groupid].front},${this.item.front}/文件:‘${this.item.filename}’已用印，请等待资料送至前台。日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}?rurl=${url}`)
                       .set('accept', 'json');
        }

        //修改用印状态
        this.item.status = '已用印';
        this.item.sealtime = time;

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
          action         : '同意'    ,//varchar(100)  null comment '操作动作',
          action_opinion : this.item.message + '[已用印]',//text          null comment '操作意见',
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

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

      },
      /**
       * @function 处理作废操作
       */
      async handleDisagree(){

        this.validField('message');

        var noname = '合同编号';

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        if( tools.isNull(userinfo) ){
          vant.Toast('尚未登录！');
          await this.clearLoginInfo();
          this.$router.push(`/login`);
        }

        //获取用印公司名称
        const company = this.item.company;

        //如果没有输入用印公司名称，则提示用户先输入用印公司名称
        if(!company){
          //提示确认用印操作
          await vant.Dialog.confirm({
              title: '用印确认',
              message: '请输入用印公司名称后，在进行确认操作！',
          })
          return;
        }

        //作废用印申请时，必须填写备注信息，以便用印经办人知晓错误原因！
        if(!this.item.message || this.item.message == '同意'){
            //提示确认用印操作
            await vant.Dialog.confirm({
              title: '用印作废',
              message: '进行‘作废’处理时，必须填写备注信息，说明用印错误原因！',
            })
            return;
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印退回',
          message: '请确认进行‘已退回’处理，提交后推送通知！',
        })

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = tools.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //领取人OA账户
        const username = this.item.username;
        //提示信息
        const message = this.item.message;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //领取地址
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealedit?id=${id}&type=done&res=edit`);

        //修改状态为已退回
        await manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已退回' , message , company , seal_time: time});

        //通知签收人领取资料(email邮件通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/mail/用印资料作废通知/文件:‘${this.item.filename}’已退回，请及时到印章管理处（@${this.item.sealman}）修改用印登录信息，${noname}:${this.item.contractId};作废原因:${message}/${email}`)
                      .set('accept', 'json');

        //通知签收人领取资料(企业微信通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已退回，请及时到印章管理处（@${this.item.sealman}）修改用印登录信息，${noname}:${this.item.contractId};作废原因:${message}?rurl=${receiveURL}`)
                       .set('accept', 'json');

        //修改用印状态
        this.item.status = '已退回';
        this.item.sealtime = time;

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: `已向用印申请人@${this.item.dealManager}推送通知！`,
        });

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
          action         : '驳回'    ,//varchar(100)  null comment '操作动作',
          action_opinion : this.item.message + '[已退回]',//text          null comment '操作意见',
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

      },

      async handleSending(){

        var noname = '合同编号';

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        if( tools.isNull(userinfo) ){
          vant.Toast('尚未登录！');
          await this.clearLoginInfo();
          this.$router.push(`/login`);
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料寄送',
          message: '请确认进行‘寄送’操作，确认前请先进行线下寄件操作！',
        })

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = tools.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `用印资料寄送成功！`;
        //领取人OA账户
        const username = this.item.username;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=done&type=done`);

        //修改状态为已用印
        manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已寄送' , send_time: time});

        //修改用印状态
        this.item.status = '已寄送';

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
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
          action         : '同意'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '寄送合同资料[已寄送]' ,//text          null comment '操作意见',
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

      },
      /**
       * @function 处理移交前台操作
       */
      async handleConfirm(){

        var noname = '合同编号';

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        if( tools.isNull(userinfo) ){
          vant.Toast('尚未登录！');
          await this.clearLoginInfo();
          this.$router.push(`/login`);
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料移交',
          message: '请确认进行‘移交前台’操作，确认后财务/档案推送通知！',
        })

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = tools.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向财务/档案相关人员推送邮件通知！`;
        //领取人OA账户
        const username = this.item.username;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=done&type=done`);
        //回调地址
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=done`);

        //修改状态为已用印
        manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '移交前台' , front_time: time});

        //通知经办人前台已收取资料，等待进行归档处理(email通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/mail/用印资料移交前台通知(${this.item.contractId})/文件:‘${this.item.filename}’已移交前台，${noname}:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请等待进行归档处理/${email}`)
                       .set('accept', 'json');

        //通知经办人前台已收取资料，等待进行归档处理(企业微信通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已移交前台，${noname}:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请等待进行归档处理?rurl=${receiveURL}`)
                       .set('accept', 'json');

        //通知归档负责人到前台收取资料进行归档(企业微信群聊推送)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/用印资料归档请求通知/文件:‘${this.item.filename}’已移交前台，${noname}:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请至前台进行合同归档处理!?type=done&rurl=${url}&id=${id}&userid=${this.item.dealManager}`)
                       .set('accept', 'json');

        //通知归档负责人到前台收取资料进行归档(企业微信发送)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${workconfig.group[groupid].archive},${this.item.archive}/文件:‘${this.item.filename}’已移交前台，${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}?rurl=${url}`)
                       .set('accept', 'json');

        //修改用印状态
        this.item.status = '移交前台';

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

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
          action         : '同意'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '移交合同资料至前台[移交前台]' ,//text          null comment '操作意见',
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

      },
      /**
       * @function 处理归档操作
       */
      async handleArchive(){

        if(this.item.archiveType == '' || this.item.archiveType == null) {
          //弹出用印推送成功提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请选择归档类型！',
          });
          return false;
        }

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        if( tools.isNull(userinfo) ){
          vant.Toast('尚未登录！');
          await this.clearLoginInfo();
          this.$router.push(`/login`);
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料归档',
          message: '请确认进行‘资料归档’操作！',
        })

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = tools.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向财务/档案相关人员推送邮件通知！`;
        //领取人OA账户
        const username = this.item.username;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=archive&type=archive`);

        let node = null;

        if(this.item.archiveType == '财务归档'){
          node = {id , status: '财务归档' , finance_time: time};
        } else if(this.item.archiveType == '档案归档'){
          node = {id , status: '档案归档' , doc_time: time};
        }

        //修改状态为已用印
        await manageAPI.patchTableData(`bs_seal_regist` , id , node);

        //延时处理
        await tools.sleep(300);

        //查询归档状态
        const value = await query.queryTableData(`bs_seal_regist` , id);

        //设置归档时间
        value.finance_time = value.finance_time || node.finance_time;
        value.doc_time = value.doc_time || node.doc_time;

        //处理完成标识
        const archiveFlag = !tools.isNull(value.finance_time) && !tools.isNull(value.doc_time);

        if(archiveFlag){
          //延时处理
          await tools.sleep(300);
          //推送消息
          await this.handleMessage(email , url);
        } else {
          //修改用印状态
          this.item.status = node.status;
          //弹出用印推送成功提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `${this.item.archiveType}完成！`,
          });
          //延时处理
          await tools.sleep(1500);
          //延时推送
          await this.handleMessage(email , url);

        }

        this.item.type = '';

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
          action         : '同意'    ,//varchar(100)  null comment '操作动作',
          action_opinion : `归档合同资料[${this.item.archiveType}]` ,//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')  ,//datetime      null comment '操作时间',
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

      },
      /**
       * @function 处理归档完成操作
       */
      async handleFinaly(){

        //获取用户信息
        let userinfo = await storage.getStore('system_userinfo');

        if( tools.isNull(userinfo) ){
          vant.Toast('尚未登录！');
          await this.clearLoginInfo();
          this.$router.push(`/login`);
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料归档',
          message: '请确认进行‘完成归档’并生成用印台账！',
        });

        //系统编号
        const id = tools.getUrlParam('id');

        //领取人OA账户
        const username = this.item.username;

        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //修改状态为已用印
        await manageAPI.patchTableData(`bs_seal_regist` , id , {id , done_time: time });

        //查询归档状态
        const value = await query.queryTableData(`bs_seal_regist` , id);

        //设置时间格式
        Object.keys(value).map( key => {
          value[key] = key.includes('_time') && value[key] ? dayjs(value[key]).format('YYYY-MM-DD HH:mm:ss') : value[key];
        })

        //将数据转存到用印台账记录中
        await manageAPI.postTableData(`bs_seal_registed` , value);

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: `用印归档完成，已生成台账！`,
        });

        this.item.type = '';

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
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
          action         : '同意'    ,//varchar(100)  null comment '操作动作',
          action_opinion : `归档合同资料完成[已归档]` ,//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')  ,//datetime      null comment '操作时间',
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

      },

      /**
       * @function 处理推送消息操作
       */
      async handleMessage(email , url){

        var noname = '合同编号';

        //公司工作组
        const groupid = tools.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = tools.getUrlParam('id');

        //领取人OA账户
        const username = this.item.username;

        //查询归档状态
        const value = await query.queryTableData(`bs_seal_regist` , id);

        //回调地址
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=done`);

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //设置归档时间
        value.finance_time = value.finance_time || node.finance_time;
        value.doc_time = value.doc_time || value.doc_time;

        if(!tools.isNull(value.finance_time) && !tools.isNull(value.doc_time)){

          //通知经办人已归档资料(email通知)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/mail/用印资料归档完成通知(${this.item.contractId})/文件:‘${this.item.filename}’已归档，${noname}:${this.item.contractId}，编号：${id}，经办人：${this.item.dealManager}/${email}`)
                         .set('accept', 'json');

          //通知经办人已归档资料(企业微信通知)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已归档，${noname}:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}?rurl=${receiveURL}`)
                       .set('accept', 'json');

          //通知前端归档完成，准备生成台账(企业微信群聊通知)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/用印资料归档完成通知/文件:‘${this.item.filename}’已归档，${noname}:${this.item.contractId}，编号：${id}，经办人：${this.item.dealManager}，请完成归档台账生成!?type=front&rurl=${url}&id=${id}&userid=${this.item.dealManager}`)
                         .set('accept', 'json');

          //通知前端归档完成，准备生成台账(企业微信消息)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${workconfig.group[groupid].front},${this.item.front}/文件:‘${this.item.filename}’已归档，${noname}:${this.item.contractId}，编号：${id}，经办人：${this.item.dealManager}，请完成归档台账生成?rurl=${url}`)
                         .set('accept', 'json');

          //修改状态为已用印
          manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已归档'});

          //修改用印状态
          this.item.status = '已归档';

          //弹出用印推送成功提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `财务/档案归档完成，推送前台通知！`,
          });

        }
      }

    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealview.css";
    @import "../../assets/css/sealview.global.css";
</style>



