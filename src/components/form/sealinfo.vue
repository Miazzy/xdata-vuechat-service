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
              <van-field required :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" @blur="validField('filename')" :error-message="message.filename" />
              <van-field required :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" type="digit" @blur="validField('count')" :error-message="message.count" />
              <van-field required :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" @blur="validField('dealDepart')" :error-message="message.dealDepart" />
              <van-field required :readonly="readonly" clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" @blur="validField('dealManager')" :error-message="message.dealManager" />
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

          <van-cell-group style="margin-top:10px;">
            <van-cell value="上传附件" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-uploader style="margin:0px 0.0rem 0px 1.0rem;" v-model="fileList" multiple :after-read="afterRead" accept="*/*" preview-size="6.3rem" />
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-goods-action  v-show=" tag.showPicker == false && tag.showPickerSealType == false && status == '' ">
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
            message:{
              filename:'',
              count:'',
              dealDepart:'',
              dealManager:'',
              dealMail:'',
              approveType:'',
              signman:'',
              workno:'',
            },
            valid:{
              sealtype: '请选择用印类型！',
              filename:'请输入文件名称！',
              count:'请输入文件份数！',
              dealDepart:'请输入经办部门！',
              dealManager:'请输入经办人!',
              dealMail:'请输入经办人邮箱!',
              approveType:'请选择审批类型！',
              signman:'请输入签收人！',
              workno:'请输入流程编号！',
              approveType:'请输入审批类型！',
              contractId:'请输入合同编号！',
            },
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
              filename:'',
              count:'',
              dealDepart:'',
              dealManager:'',
              dealMail:'',
              approveType:'',
              contractId:'',
              signman:'',
              workno:'',
              sealtime:'',
              sealman: '',
              sealtype: '',
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
            },
            statusType:{
              'none':'待用印',
              'seal':'已用印',
              'receive':'已领取',
              'sending':'已寄送', //我方先用印，则已用印后，将合同寄给对方
              'getback':'已寄回', //收到对方盖章后的合同后，接收人，将合同设置为已返回
              'fronting':'寄前台',
              'done':'已归档',
            },
            mailconfig: {
              '杨高春': 'yanggc@leading-group.cn',
              '陈乐丽': 'chenll@leading-group.cn',
              '周贤磊': 'zhou_32@qq.com',
              '陈雅兰': 'chenyl0929@leading-group.cn',
            },
            fileList: [],
            readonly: false,
            sealTypeColumns: ['财务确认' , '档案确认'],
            sealTypeColumns: ['合同类' , '非合同类'],
            approveColumns: ['OA系统', 'ERP系统', '费控系统', 'CRM系统', 'EHR系统', '资金系统', '领地HR', '宝瑞商管'],
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

        if(this.item[fieldName] == '' || typeof this.item[fieldName] == null){
          this.message[fieldName] = this.valid[fieldName];
        } else {
          this.message[fieldName] = '';
        }

        if(fieldName == 'dealMail'){
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        if(this.message[fieldName] == '' || this.message[fieldName] == null) {
          return true;
        } else {
          return false;
        }
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
        const keys = Object.keys({sealtype:'', filename:'', count:'', dealDepart:'', dealManager:'',dealMail:'', approveType:'',  signman:'', workno:'',})
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
        const maxno = (maxinfo.maxno + 100001).toString().slice(-4)
        this.item.contractId = `LD[${dayjs().format('YYYYMMDD')}]${maxno}`;

        //第一步，构造form对象
        const item = this.item;
        const no = maxinfo.maxno + 1;
        const id = tools.queryUniqueID();
        const create_by = item.dealManager;
        const create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const filename = item.filename;
        const count = item.count;
        const seal_type = item.sealtype;
        const deal_depart = item.dealDepart;
        const deal_manager = item.dealManager;
        const deal_mail = item.dealMail;
        const approve_type = item.approveType;
        const seal_time = item.sealtime;
        const seal_man = item.sealman;
        const contract_id = item.contractId;
        const sign_man = item.signman;
        const workno = item.workno;
        const seal_wflow = this.getUrlParam('statustype');
        const status = this.statusType[this.getUrlParam('statustype')];

        const elem = {id , no , create_by , create_time , filename , count , deal_depart , deal_manager , deal_mail , approve_type , seal_type, seal_man , contract_id , sign_man , workno , seal_wflow , status}; // 待提交元素

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
          const url = encodeURIComponent(`http://10.100.123.119:8080/#/app/sealview?id=${id}&statustype=none`);
          const signmail = this.mailconfig[seal_man];

          //推送群消息，告知印章管理员进行用印处理
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/wework/${title}/${description}?type=manage&rurl=${url}&id=${id}&userid=${create_by}`)
                      .set('accept', 'json');

          //通知签收人领取资料
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/mail/用印登记申请成功通知[${id}]/文件:‘${this.item.filename}’已提交用印申请! 日期：${this.item.createtime},用印类型：${this.item.sealtype},文件名称：${this.item.filename},合同编号：${this.item.contractId},系统编码：${id} /${this.item.dealMail},${signmail}`)
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

    #news {
      margin-top: 28px;
    }

    #search {
      display:none;
    }

    .app-header {
        position: relative;
        transition: 0.3s;
        width: 100%;
        z-index: 10000;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        background: linear-gradient(180deg, #303036, #3c3b40);
        color: #fff;
        text-align: center;
    }

    .weui-cell_tab {
      height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;
    }

    .wechat-list .list-info {
        position: relative;
        z-index: 2;
        left: 0;
        width: 100%;
        height: 64px;
        padding: 8px;
        background-color: #fff;
    }

    .wechat-list .list-info .header-box {
        position: relative;
        float: left;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        margin-left: 0px;
    }

    .wechat-list .new-msg-count {
        position: absolute;
        font-style: normal;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Helvetica;
        right: -9px;
        top: -5px;
        z-index: 2;
        padding: 0 4px;
        width: auto;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        background-color: #f43531;
    }

    .wechat-list .new-msg-dot {
        position: absolute;
        right: -4px;
        top: -3px;
        width: 10px;
        height: 10px;
        z-index: 2;
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        background-color: red;
        background-color: #f43531;
        font-size: 0;
    }

    .wechat-list .list-info .header-box .header {
        height: 100%;
        border-radius: 5px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
        overflow: hidden;
        background: #dddbdb;
    }

    .wechat-list .list-info .header-box .header img {
        width: 10%;
        height: auto;
        -webkit-box-flex: 2;
        -webkit-flex-grow: 2;
        -ms-flex-positive: 2;
        flex-grow: 2;
        border: 0;
    }

    .wechat-list .list-info .desc-box {
        overflow: hidden;
    }

    .wechat-list .list-info .desc-box .desc-time {
        float: right;
        color: #b8b8b8;
    }

    .wechat-list .list-info .desc-box .desc-author {
        height: 25px;
        line-height: 25px;
        font-size: 16px;
        color: #000;
    }

    .wechat-list .list-info .desc-box .desc-msg {
        height: 23px;
        line-height: 23px;
        font-size: 14px;
        color: #888;
    }

    .wechat-list .list-info .desc-box .desc-msg .desc-mute {
        float: right;
        color: #b8b8b8;
    }

    .van-cell--large .van-cell__label {
        font-size: 14px;
        width: 205%;
        display: block;
    }

    .van-cell--large .van-cell__title {
        font-size: 15.5px;
    }

    .wechat-list .weui-cells .van-cell::after {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        right: 16px;
        bottom: 0;
        left: 16px;
        border-bottom: 0px solid #ebedf0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
    }

    .van-uploader__preview .van-uploader__preview-image {
        display: block;
        width: 100px;
        height: 100px;
        overflow: hidden;
    }

    .van-uploader__upload {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: none;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        margin: 0 8px 8px 0;
        background-color: #f7f8fa;
    }

    .van-uploader__wrapper .van-uploader__upload {
      display:none;
    }

    .van-goods-action {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        box-sizing: content-box;
        height: 50px;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
        background-color: #fff;
        z-index: 10000;
    }

    .van-goods-action-button--danger {
        background: -webkit-linear-gradient(left,#ff6034,#ee0a24);
        background: linear-gradient(to right,#ff6034,#ee0a24);
        border-radius: 0px 10px 10px 0px;
    }

    .van-goods-action-button--warning {
        border-radius: 10px 0px 0px 10px;
    }

    #informed_confirm .van-goods-action-button--danger {
        border-radius: 10px 10px 10px 10px;
    }

    .main-loading {
      text-align:center;
      width:100%;
      height:60px;
      margin-top:0px;
      background:#fefefe;
      position: absolute;
      top: 300px;
      opacity: 0.4;
      filter: alpha(opacity=40);
    }

</style>
