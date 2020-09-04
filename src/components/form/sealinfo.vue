<template>
  <keep-alive>
  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header">
        <div class="center">
            <span>印章管理</span>
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">用印登记表</van-col>
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
              <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly/>
              <van-field clearable label="盖印人" v-model="item.sealman" placeholder="--" readonly/>
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

      getUrlParam(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
      },

      queryPictureList(files){
        let list = files.split(',');
        list = list.filter((item)=>{
          return /\.(png|svg|gif|jpg|jpeg|bmp|tif|pcx|tga|exif|fpx|webp)$/.test(item);
        })
        list = list.map((item)=>{
          return { url:`https://upload.yunwisdom.club:30443/` + item, isImage: true };
        });
        return list;
      },

      queryOfficeList(files){
        let list = files.split(',');
        list = list.filter((item)=>{
          return /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|zip|rar)$/.test(item);
        })
        list = list.map((item)=>{
          return { url:`https://upload.yunwisdom.club:30443/` + item , name : item.split('/')[1].split('_')[1] , isImage: true };
        });
        return list;
      },

      async queryInfo(){

        try {
          var that = this;

          that.item.sealman = this.getUrlParam('sealman');
          that.item.status = this.statusType[this.getUrlParam('statustype')];
          that.sealuserid = this.getUrlParam('sealuserid');
          that.groupid = this.getUrlParam('groupid') || 'Group_LD';

          that.item.seal = this.getUrlParam('seal'); //用印管理员成员组
          that.item.front = this.getUrlParam('front');  //用印前台接受组
          that.item.archive = this.getUrlParam('archive'); //用印归档组(财务/档案)

          if(!that.sealuserid){
            that.sealuserid = this.config[that.item.sealman];
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

        //TODO:{*} 此处可以加分布式锁，防止高并发合同编号相同

        //先验证是否合法
        const keys = Object.keys({sealtype:'', ordertype:'', filename:'', count:'', dealDepart:'', dealManager:'', username , dealMail:'', approveType:'',  signman:'', workno:'',})
        const invalidKey = keys.find(key => {
          return !this.validField(key);
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请检查表单填写内容，确认内容是否填写完整无误！',
          });
          return false;
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印申请',
          message: '确认提交用印登记申请？',
        })

        //如果用印登记类型为合同类，则查询最大印章编号，然后按序使用更大的印章编号
        var maxinfo = await superagent.get(`${window.requestAPIConfig.restapi}/api/v_seal_max`).set('accept', 'json');
        maxinfo = maxinfo.body[0];
        var maxno = '';
        var noname = '合同编号';

        //根据用户选择的印章实体公司来设置印章编码

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          maxno = (maxinfo.maxno + 100001).toString().slice(-3);
          this.item.contractId = `${workconfig.group[this.groupid].prefix}[${dayjs().format('YYYY')}]${maxno}`;
          noname = '合同编号';
        } else {
          maxno = (maxinfo.caxno + 100001).toString().slice(-3);
          this.item.contractId = `NM[${dayjs().format('YYYY')}]${maxno}`;
          noname = '流水编号';
        }

        //公司工作组
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

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
        const seal_man = item.sealman;
        const contract_id = item.contractId;
        const sign_man = item.signman;
        const workno = item.workno;
        const mobile = item.mobile;
        const seal = item.seal;
        const front = item.front;
        const archive = item.archive;
        const send_location = item.send_location;
        const send_mobile = item.send_mobile;
        const seal_wflow = this.getUrlParam('statustype');
        const status = this.statusType[this.getUrlParam('statustype')];

        const elem = {id , no , create_by , create_time , filename , count , deal_depart , deal_manager , username , deal_mail , mobile , approve_type , seal_type, order_type, seal_man , contract_id , sign_man , workno , seal_wflow , status , send_location , send_mobile , seal, front, archive}; // 待提交元素

        //第二步，向表单提交form对象数据
        this.loading = true;
        const result = await manageAPI.postTableData('bs_seal_regist' , elem);

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

          //推送群消息，告知印章管理员进行用印处理(企业微信群)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/${title}/${description}?type=manage&rurl=${url}&id=${id}&userid=${create_by}`)
                      .set('accept', 'json');

          //通知签收人领取资料(企业微信发送)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已提交用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}?rurl=${receiveURL}`)
                       .set('accept', 'json');

          //通知印章人领取资料(企业微信发送)
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.sealuserid},${workconfig.group[groupid].seal}/文件:‘${this.item.filename}’已提交用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}?rurl=${url}`)
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
