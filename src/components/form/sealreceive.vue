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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">用印资料领取</van-col>
            <van-col span="8"></van-col>
          </van-row>
        </div>
      </div>

      <van-tag style="position: absolute; top: 54px; right: 0px; z-index: 1000; border-radius: 30px 0px 0px 30px;" :type="status_type"> {{ ` ${status}` }}</van-tag>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
        </div>
        <div class="weui-cells" style="margin-top:0px;margin-left:10px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

          <van-cell-group>
            <van-field clearable label="日期" v-model="item.createtime" placeholder="请输入登记日期" readonly />
            <van-field readonly clearable  label="用印类型" v-model="item.sealtype" placeholder="选择用印类型" @click="tag.showPickerSealType = true" />
            <van-field readonly clearable  label="用印顺序" v-model="item.ordertype" placeholder="选择用印顺序"  />
            <van-field :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" />
            <van-field :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" />
            <van-field :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" />
            <van-field :readonly="readonly" clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" />
            <van-field :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人邮箱" />
            <van-field :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" />
            <van-field readonly clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @click="tag.showPicker = true" />
            <van-field :readonly="readonly" clearable label="合同编号" v-model="item.contractId" placeholder="请输入合同编号" v-show="item.sealtype == '合同类' " />
            <van-field :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" />
            <van-field :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" />
            <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly/>
            <van-field clearable label="盖印人" v-model="item.sealman" placeholder="--" readonly/>
            <van-field clearable label="资料领取时间" v-model="item.receive_time" placeholder="--" readonly v-show="!!item.receive_time"/>
            <van-field clearable label="资料寄送时间" v-model="item.send_time" placeholder="--" readonly v-show="!!item.send_time"/>
            <van-field clearable label="移交前台时间" v-model="item.front_time" placeholder="--" readonly v-show="!!item.front_time"/>
            <van-field clearable label="财务归档时间" v-model="item.finance_time" placeholder="--" readonly v-show="!!item.finance_time"/>
            <van-field clearable label="档案归档时间" v-model="item.doc_time" placeholder="--" readonly v-show="!!item.doc_time"/>
            <van-field clearable label="台账生成时间" v-model="item.done_time" placeholder="--" readonly v-show="!!item.done_time"/>
            <van-field clearable label="流程状态" v-model="item.status" placeholder="" readonly/>
            <van-field clickable clearable v-if=" item.type == 'done' && (!item.finance_time || !item.doc_time)" label="归档类型" v-model="item.archiveType" placeholder="选择归档类型" @click="tag.showPicker = true" />
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
            message: workconfig.compValidation.seal.message,
            valid: workconfig.compValidation.seal.valid,
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
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
              send_location:'',
              send_mobile:'',
              confirmStatus: '',//财务确认/档案确认
              status: '',
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
    },
    mounted() {
      this.queryInfo();
    },
    methods: {

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
          that.item.id = this.getUrlParam('id');
          that.item.status = this.statusType[this.getUrlParam('statustype')];
          that.item.type = this.getUrlParam('type');

          const value = await query.queryTableData(`bs_seal_regist` , that.item.id);

          this.item = {
              id: that.item.id,
              createtime: dayjs().format('YYYY-MM-DD'),
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
              sealtype: value.seal_type ? value.seal_type : (value.contract_id ? '合同类':'非合同类'),
              ordertype: value.order_type,
              mobile: value.mobile,
              send_mobile: value.send_mobile,
              send_location: value.send_location,
              confirmStatus: '',//财务确认/档案确认
              status: value.status,
              type: that.item.type
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

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料领取',
          message: '请确认进行‘已领取’操作，确认后请及时将资料移交前台！',
        })

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
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

      },

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
        /* position: absolute; */
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



