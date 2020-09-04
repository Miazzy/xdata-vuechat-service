<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header">
        <div class="center">
            <span>入职管理</span>
        </div>
    </header>

    <section>

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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">入职登记表</van-col>
            <van-col span="8"></van-col>
          </van-row>
        </div>

      </div>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
        </div>
        <div class="weui-cells" style="margin-top:0px;margin-left:10px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

          <van-cell-group>
            <van-form >
              <van-field clearable label="日期" v-model="item.createtime" placeholder="请输入登记日期" readonly />
              <van-field required readonly clickable clearable  label="用印类型" v-model="item.sealtype" placeholder="选择用印类型" @blur="validField('sealtype')" :error-message="message.sealtype" @click="tag.showPickerSealType = true" />
              <van-field required readonly clickable clearable  label="用印顺序" v-model="item.ordertype" placeholder="选择用印顺序" @blur="validField('ordertype')" :error-message="message.ordertype" @click="tag.showPickerOrderType = true" />
              <van-field required :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" @blur="validField('filename')" :error-message="message.filename" />
              <van-field required :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" type="digit" @blur="validField('count')" :error-message="message.count" />
              <van-field required :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" @blur="validField('dealDepart')" :error-message="message.dealDepart" />
              <van-field required :readonly="readonly" clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" @blur="validField('dealManager')" :error-message="message.dealManager" />
              <van-field required :readonly="readonly" clearable label="经办账户" v-model="item.username" placeholder="请输入经办人的OA账号" @blur="validField('username')" :error-message="message.username" />
              <van-field required :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" @blur="validField('mobile')" :error-message="message.mobile" />
              <van-field required :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人的邮箱地址" @blur="validField('dealMail')" :error-message="message.dealMail" />
              <van-field required readonly clickable clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @blur="validField('approveType')" :error-message="message.approveType" @click="tag.showPicker = true" />
              <van-field clearable label="合同编号" v-model="item.contractId" placeholder="提交时自动生成合同编号" v-show="item.sealtype == '合同类' " readonly />
              <van-field required :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" @blur="validField('signman')" :error-message="message.signman" />
              <van-field required :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" @blur="validField('workno')" :error-message="message.workno" />
              <van-field clearable label="盖印人" v-model="item.sealman" placeholder="--" readonly/>
              <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly v-show="!!item.sealtime"/>
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
            <van-cell value="上传附件" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-uploader style="margin:0px 0.0rem 0px 1.0rem;" v-model="fileList" multiple :after-read="afterRead" accept="*/*" preview-size="6.3rem" />
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-goods-action  v-show=" tag.showPicker == false && tag.showPickerSealType == false && tag.showPickerOrderType == false && status == '' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="提交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

          </div>

          <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;" >加载中...</van-loading>

          <div style="height:100px;" ></div>
        </div>
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
            title:'入职登记表',
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
            message: workconfig.compValidation.seal.message,
            valid: workconfig.compValidation.seal.valid,
            item:{
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
              archive: '', //用印归档组(财务/档案)
              prefix: '',  //编号前缀
              name: '',    //流程组名，即Group_XX
              confirmStatus: '',//财务确认/档案确认
              status: '',
            },
            backPath:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            fileList:[],
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
            archiveTypeColumns: workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
            approveColumns: workconfig.compcolumns.approveColumns,
        }
    },
    async activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    methods: {
      validField(fieldName){
        //邮箱验证正则表达式
        const regMail = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName == 'dealMail'){
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
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

      async queryInfo(){

        try {
          this.item.sealman = tools.getUrlParam('sealman');
        } catch (error) {
          console.log(error);
        }

      },

      async handleConfirm(){


      }

    }
}
</script>
<style>
  .van-field__label {
      -webkit-box-flex: 0;
      -webkit-flex: none;
      flex: none;
      box-sizing: border-box;
      width: 30%;
      margin-right: 12px;
      color: #646566;
      text-align: left;
      word-wrap: break-word;
      font-size: 0.92rem;
  }
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealinfo.css";
</style>
