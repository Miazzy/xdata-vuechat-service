<template>
  <keep-alive>
  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;" >
        <div class="center">
            <router-link :to="back" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">用印资料领取</van-col>
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
              <van-field :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人邮箱" />
              <van-field :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" />
            </van-cell-group>

            <van-cell-group style="margin-top:10px;">
                <van-cell value="审批信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field readonly clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @click="tag.showPicker = true" />
                <van-field :readonly="readonly" clearable label="合同编号" v-model="item.contractId" placeholder="请输入合同编号" v-show="item.sealtype == '合同类' " />
                <van-field :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" />
                <van-field :readonly="readonly" clearable label="用印公司" v-model="item.company" placeholder="请输入用印公司"  />
                <van-field :readonly="readonly" clearable label="合作方" v-model="item.partner" placeholder="请输入合作方名称" v-show="item.sealtype == '合同类' " />
                <van-field :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" />
                <van-field clearable label="盖印人" v-model="item.sealman" placeholder="--" readonly/>
            </van-cell-group>

            <van-cell-group style="margin-top:10px;">
                <van-cell value="处理信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field clearable label="资料盖印时间" v-model="item.sealtime" placeholder="--" readonly/>
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
                <template  v-for="(value,key) in officeList">
                  <van-cell class="van-ellipsis" :key="key" :value="value.name" is-link :clickable="true" @click="saveAsFile(value.url , value.name)" style="padding: 10px 2px 10px 2px;" />
                </template>
              </van-cell-group>
            </div>

            <van-goods-action  v-if=" item.status == '已用印' && item.type == 'receive' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="确认领取"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
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


import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as query from '@/request/query';

import * as workflow from '@/request/workflow';
import * as manageAPI from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';


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
            message: Betools.workconfig.compValidation.seal.message,
            valid: Betools.workconfig.compValidation.seal.valid,
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
              serialid:'',
              filename:'',
              count:'',
              dealDepart:'',
              dealManager:'',
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
              frotn_time:'',
              done_time:'',
              send_time:'',
              mobile:'',
              username:'',
              send_location:'',
              send_mobile:'',
              partner:'',
              confirmStatus: '',//财务确认/档案确认
              status: '',
            },
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            backPath:'/app',
            back:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            fileList:[],
            loading:false,
            officeList:[],
            processLogList:[],
            tag:{
              showPicker: false,
              showPickerSealType:false,
            },
            readonly: true,
            archiveTypeColumns: Betools.workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: Betools.workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: Betools.workconfig.compcolumns.sealTypeColumns,
            approveColumns: Betools.workconfig.compcolumns.approveColumns,
        }
    },
    activated() {
        this.queryInfo();
    },
    mounted() {
      this.queryInfo();
    },
    methods: {
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
      async userStatus(){
        try {
          let info = await Betools.storage.getStore('system_userinfo');
        } catch (error) {
          console.log(error);
        }
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
          this.iswechat = Betools.tools.isWechat();
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          var that = this;
          that.item.id = Betools.tools.getUrlParam('id');
          that.item.status = this.statusType[Betools.tools.getUrlParam('statustype')];
          that.item.type = Betools.tools.getUrlParam('type');

          //获取view状态
          this.view = Betools.tools.getUrlParam('view');
          this.back = Betools.tools.getUrlParam('back') || '/app';

          const value = await query.queryTableData(`bs_seal_regist` , that.item.id);

          this.item = {
              id: that.item.id,
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
              company: value.company,
              partner: value.partner,
              confirmStatus: '',//财务确认/档案确认
              status: value.status,
              type: that.item.type
            }

          await this.queryProcessLog();

          //如果不是总部员工，则前台移交人员、财务人员、档案人员都设置为印章管理员
          if(!!this.item.seal && (!this.item.front || !this.item.finance || !this.item.record || !this.item.archive)){
            this.item.front == this.item.seal;
            this.item.finance == this.item.seal;
            this.item.record == this.item.seal;
            this.item.archive == this.item.seal;
            this.item.front_name == this.item.sealman;
            this.item.finance_name == this.item.sealman;
            this.item.record_name == this.item.sealman;
            this.item.archive_name == this.item.sealman;
          }

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

        //获取用户信息
        let userinfo = await Betools.storage.getStore('system_userinfo');

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料领取',
          message: '请确认进行‘已领取’操作，确认后请及时将资料移交前台！',
        })

        //系统编号
        const id = Betools.tools.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //领取人OA账户
        const username = this.item.username;
        //提示信息
        const message = `已完成资料领取！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //修改状态为已用印
        manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已领取' , receive_time: time});

        //修改用印状态
        this.item.status = '已领取';

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
          table_name: 'bs_seal_regist',
          main_value: id,
          proponents: username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '同意'    ,//varchar(100)  null comment '操作动作',
          action_opinion : `资料领取[已领取]` ,//text          null comment '操作意见',
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
       * @function 获取处理日志
       */
      async queryProcessLog(){
        const id = Betools.tools.getUrlParam('id');
        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);
          this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
          this.processLogList.sort();
        } catch (error) {
          console.log(error);
        }
      },

    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealreceive.css";
    @import "../../assets/css/sealreceive.global.css";
</style>



