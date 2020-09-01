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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">用印登记确认</van-col>
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
            <van-field :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" />
            <van-field :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" />
            <van-field :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" />
            <van-field :readonly="readonly" clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" />
            <van-field :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人邮箱" />
            <van-field readonly clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @click="tag.showPicker = true" />
            <van-field :readonly="readonly" clearable label="合同编号" v-model="item.contractId" placeholder="请输入合同编号" v-show="item.sealtype == '合同类' " />
            <van-field :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" />
            <van-field :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" />
            <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly/>
            <van-field clearable label="盖印人" v-model="item.sealman" placeholder="--" readonly/>
            <van-field clearable label="流程状态" v-model="item.status" placeholder="" readonly/>
            <van-field clickable clearable v-if=" item.type == 'done' " label="归档类型" v-model="item.archiveType" placeholder="选择归档类型" @click="tag.showPicker = true" />
            <van-popup v-model="tag.showPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="archiveTypeColumns"
                @cancel="tag.showPicker = false"
                @confirm="archiveTypeConfirm"
              />
            </van-popup>
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
                <template v-for="(value,key) in officeList">
                  <van-cell class="van-ellipsis" :value="value.name" is-link :clickable="true" @click="saveAsFile(value.url , value.name)" style="padding: 10px 2px 10px 2px;" />
                </template>
              </van-cell-group>
            </div>

            <van-goods-action v-if="item.status =='待用印' " >
              <van-goods-action-button type="warning" text="作废" @click="handleDisagree();" />
              <van-goods-action-button type="danger" text="确认" @click="handleAgree();" />
            </van-goods-action>

            <van-goods-action  v-if=" item.status == '已用印' && item.type == 'front' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="确认移交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-if=" item.type == 'done' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="确认归档"  @click="handleArchive();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-if=" item.status == '已归档' && item.type == 'archive' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="完成归档"  @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px;" />
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
              'front':'移交前台',
              'archive':'归档完成',
              'done':'已归档',
            },
            readonly: true,
            archiveTypeColumns: ['财务归档' , '档案归档'],
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
              sealtime: dayjs(value.seal_time).format('YYYY-MM-DD HH:mm:ss'),
              sealman: value.seal_man,
              sealtype: value.seal_type ? value.seal_type : (value.contract_id ? '合同类':'非合同类'),
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

      async handleAgree(){

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印确认',
          message: '请确认进行‘已用印’处理，确认后推送通知！',
        })

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向用印申请人@${this.item.dealManager}推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`http://10.100.123.119:8080/#/app/sealview?id=${id}&statustype=seal&type=front`);

        //修改状态为已用印
        manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已用印' , seal_time: time});

        //通知签收人领取资料
        await superagent.get(`http://172.18.254.95:7001/api/v1/mail/用印资料领取通知[${id}]/文件:‘${this.item.filename}’已用印，请及时到印章管理处（@${this.item.sealman}）领取/${email}`)
                      .set('accept', 'json');

        //通知前台准备接受资料
        await superagent.get(`http://172.18.254.95:7001/api/v1/wework/用印资料等待移交通知[${id}]/文件:‘${this.item.filename}’已用印，合同编号:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请等待资料送至前台!?type=front&rurl=${url}&id=${id}&userid=${this.item.dealManager}`)
                      .set('accept', 'json');

        //修改用印状态
        this.item.status = '已用印';
        this.item.sealtime = time;

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

      },

      async handleDisagree(){

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印作废',
          message: '请确认进行‘已作废’处理，提交后推送通知！',
        })

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向用印申请人@${this.item.dealManager}推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //修改状态为已作废
        manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已作废' , seal_time: time});

        //通知签收人领取资料
        await superagent.get(`http://172.18.254.95:7001/api/v1/mail/用印资料作废通知[${id}]/文件:‘${this.item.filename}’已作废，请及时到印章管理处（@${this.item.sealman}）修改用印登录信息/${email}`)
                      .set('accept', 'json');

        //修改用印状态
        this.item.status = '已作废';
        this.item.sealtime = time;

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

      },

      async handleConfirm(){

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料移交',
          message: '请确认进行‘移交前台’操作，确认后财务/档案推送通知！',
        })

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向财务/档案相关人员推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`http://10.100.123.119:8080/#/app/sealview?id=${id}&statustype=done&type=done`);

        //修改状态为已用印
        manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '移交前台' , seal_time: time});

        //通知经办人前台已收取资料，等待进行归档处理
        await superagent.get(`http://172.18.254.95:7001/api/v1/mail/用印资料移交前台通知[${id}]/文件:‘${this.item.filename}’已移交前台，合同编号:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请等待进行归档处理/${email}`)
                       .set('accept', 'json');

        //通知前台准备接受资料
        await superagent.get(`http://172.18.254.95:7001/api/v1/wework/用印资料归档请求通知/文件:‘${this.item.filename}’已移交前台，合同编号:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请至前台进行合同归档处理!?type=done&rurl=${url}&id=${id}&userid=${this.item.dealManager}`)
                       .set('accept', 'json');

        //修改用印状态
        this.item.status = '移交前台';

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: message,
        });

      },

      async handleArchive(){

        if(this.item.archiveType == '' || this.item.archiveType == null) {
          //弹出用印推送成功提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请选择归档类型！',
          });
          return false;
        }

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料归档',
          message: '请确认进行‘资料归档’操作！',
        })

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向财务/档案相关人员推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`http://10.100.123.119:8080/#/app/sealview?id=${id}&statustype=archive&type=archive`);

        let node = null;

        if(this.item.archiveType == '财务归档'){
          node = {id , status: '财务归档' , finance_time: time};
        } else if(this.item.archiveType == '档案归档'){
          node = {id , status: '档案归档' , doc_time: time};
        }

        //修改状态为已用印
        manageAPI.patchTableData(`bs_seal_regist` , id , node);

        //查询归档状态
        const value = await query.queryTableData(`bs_seal_regist` , this.item.id);

        if(!tools.isNull(value.finance_time) && !tools.isNull(value.doc_time)){

          //通知经办人前台已收取资料，等待进行归档处理
          await superagent.get(`http://172.18.254.95:7001/api/v1/mail/用印资料归档完成通知[${id}]/文件:‘${this.item.filename}’已归档，合同编号:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请等待进行归档处理/${email}`)
                         .set('accept', 'json');

          //通知前台准备接受资料
          await superagent.get(`http://172.18.254.95:7001/api/v1/wework/用印资料归档完成通知/文件:‘${this.item.filename}’已归档，合同编号:${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}，请至前台进行合同归档处理!?type=front&rurl=${url}&id=${id}&userid=${this.item.dealManager}`)
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

        } else {

          //修改用印状态
          this.item.status = node.status;

          //弹出用印推送成功提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `${this.item.archiveType}完成！`,
          });
        }

        this.item.type = '';


      },

      async handleFinaly(){

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料归档',
          message: '请确认进行‘完成归档’并生成用印台账！',
        });

        //TODO生成台账

        //弹出用印推送成功提示
        await vant.Dialog.alert({
          title: '温馨提示',
          message: `用印归档完成，已生成台账！`,
        });

        this.item.type = '';

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



