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
            <van-field readonly clearable  label="用印顺序" v-model="item.ordertype" placeholder="选择用印顺序"  />
            <van-field :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" />
            <van-field :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" />
            <van-field :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" />
            <van-field :readonly="readonly" clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" />
            <van-field :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" />
            <van-field :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人邮箱" />
            <van-field readonly clearable  label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @click="tag.showPicker = true" />
            <van-field :readonly="readonly" clearable label="合同编号" v-model="item.contractId" placeholder="请输入合同编号" v-show="item.sealtype == '合同类' " />
            <van-field :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" />
            <van-field :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" />
            <van-field clearable label="盖印人" v-model="item.sealman" placeholder="--" readonly/>
            <van-field clearable label="资料盖印时间" v-model="item.sealtime" placeholder="--" readonly v-show="!!item.sealtime" />
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

        var noname = '合同编号';

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印确认',
          message: '请确认进行‘已用印’处理，确认后推送通知！',
        })

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //公司工作组
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //领取人OA账户
        const username = this.item.username;
        //提示信息
        const message = `已向用印申请人@${this.item.dealManager}推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        //回调地址
        const url = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealview?id=${id}&statustype=seal&type=front`);
        //领取地址
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=receive`);

        //修改状态为已用印
        await manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已用印' , seal_time: time});

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
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${workconfig.group[groupid].front}/文件:‘${this.item.filename}’已用印，请等待资料送至前台。日期：${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}?rurl=${url}`)
                       .set('accept', 'json');
        }

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

        var noname = '合同编号';

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印作废',
          message: '请确认进行‘已作废’处理，提交后推送通知！',
        })

        //如果是合同类，则设置合同编号，如果是非合同类，则设置流水编号
        if(this.item.sealtype === '合同类') {
          noname = '合同编号';
        } else {
          noname = '流水编号';
        }

        //公司工作组
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //领取人OA账户
        const username = this.item.username;
        //提示信息
        const message = `已向用印申请人@${this.item.dealManager}推送邮件通知！`;
        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //领取地址
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/sealreceive?id=${id}&type=done`);

        //修改状态为已作废
        await manageAPI.patchTableData(`bs_seal_regist` , id , {id , status: '已作废' , seal_time: time});

        //通知签收人领取资料(email邮件通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/mail/用印资料作废通知/文件:‘${this.item.filename}’已作废，请及时到印章管理处（@${this.item.sealman}）修改用印登录信息，${noname}:${this.item.contractId}/${email}`)
                      .set('accept', 'json');

        //通知签收人领取资料(企业微信通知)
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${username}/文件:‘${this.item.filename}’已作废，请及时到印章管理处（@${this.item.sealman}）修改用印登录信息，${noname}:${this.item.contractId}?rurl=${receiveURL}`)
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

      async handleSending(){

        var noname = '合同编号';

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
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `用印资料寄送成功！`;
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

      },

      async handleConfirm(){

        var noname = '合同编号';

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
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = this.getUrlParam('id');
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
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${workconfig.group[groupid].archive}/文件:‘${this.item.filename}’已移交前台，${this.item.createtime},用印类型：${this.item.sealtype},文件：${this.item.filename},${noname}：${this.item.contractId}，系统编号：${id}，经办人：${this.item.dealManager}?rurl=${url}`)
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

        //公司工作组
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = this.getUrlParam('id');
        //领取人邮箱
        const email = this.item.dealMail;
        //提示信息
        const message = `已向财务/档案相关人员推送邮件通知！`;
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

      },

      async handleFinaly(){

        //提示确认用印操作
        await vant.Dialog.confirm({
          title: '用印资料归档',
          message: '请确认进行‘完成归档’并生成用印台账！',
        });

        //系统编号
        const id = this.getUrlParam('id');

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

      },

      async handleMessage(email , url){

        var noname = '合同编号';

        //公司工作组
        const groupid = this.getUrlParam('groupid') || 'Group_LD';

        //系统编号
        const id = this.getUrlParam('id');

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
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${workconfig.group[groupid].front}/文件:‘${this.item.filename}’已归档，${noname}:${this.item.contractId}，编号：${id}，经办人：${this.item.dealManager}，请完成归档台账生成?rurl=${url}`)
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
    @import "../../assets/css/sealview.css";
</style>



