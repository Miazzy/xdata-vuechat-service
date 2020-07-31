<template>
  <keep-alive>
  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header">
        <div class="center">
            <router-link :to="backPath" @click="$router.push(backPath)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>任务</span>
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
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 0px solid #329ff0;font-size:18px;` : `border-bottom: 0px solid #329ff0;font-size:18px;` ">
             {{bname}}
          </div>
        </div>
      </div>

      <van-tag style="position: absolute; top: 54px; right: 0px; z-index: 1000; border-radius: 30px 0px 0px 30px;" :type="status_type"> {{ ` ${status}` }}</van-tag>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">

        </div>
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">

          <van-cell-group>
            <template v-for="(value,key) in fields">
              <van-cell v-show=" value!='id' && item[value] != '' && typeof item[value] != 'undefined' && item[value] != null "
                :title="tableInfo[value]"
                :value="((item[value] != '' && typeof item[value] != 'undefined' && item[value] != null && item[value].toString().length > 16 ) || value.includes('content') || value.includes('require') ? '' : item[value])"
                :label="((item[value] != '' && typeof item[value] != 'undefined' && item[value] != null && item[value].toString().length <= 16) || value.includes('content') || value.includes('require') ? '' : item[value])"
                size="large"
              />
              <div v-show="value.includes('content') || value.includes('require') "  v-html="item[value]" style="margin-left:21px;margin-bottom:10px;font-size:14.5px;"></div>
              <div v-show="value.includes('content') || value.includes('require') " style="border-bottom:1px solid #fafafa;"></div>
            </template>
          </van-cell-group>


          <div style="margin-top:10px;margin-bottom:10px;" v-show=" (purl != '' && purl != null && typeof purl != 'undefined')">
            <iframe  id="iframepage" name="iframepage" frameBorder=0 scrolling=yes width="100%" style="width:100%;height:600px;" :src="purl">
            </iframe>
          </div>

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

            <div style="margin-top:15px;margin-left:7px;">
              流程进度
            </div>

            <van-steps :active="active" active-icon="success" active-color="#38f" style="padding-bottom:15px;border-bottom:1px solid #efefef;">
              <van-step>发起</van-step>
              <van-step>审核</van-step>
              <van-step>审批</van-step>
              <van-step>知会</van-step>
            </van-steps>

            <div style="margin-top:15px;margin-left:7px;">
              审批流程
            </div>

            <van-steps direction="vertical" :active="workflowlist.length-1" active-icon="success" active-color="#38f">
              <template v-for="(value,key) in workflowlist" >
                <van-step v-if="value.approve_user != null" >
                  <h3 style="font-size:14px;"> 审批：{{ `${value.approve_user}，意见：${value.action_opinion}` }} </h3>
                  <p style="font-size:12px;margin-top:2px;"> {{ value.operate_time }}</p>
                </van-step>
              </template>
            </van-steps>

            <div class="main-loading" :style=" loading ? 'display:block;':'display:none;' ">
              <van-loading type="spinner" size="48px" style="text-align:text;" />
            </div>


            <van-goods-action v-if="(item.bpm_value == 2 || item.bpm_value == 3) && tasktype == 'wait' ">
              <van-goods-action-button type="warning" text="驳回" @click="handleDisagree();" />
              <van-goods-action-button type="danger" text="同意" @click="handleAgree();" />
            </van-goods-action>

            <van-goods-action v-if="(item.bpm_value == 4 && informList.length > 0) && tasktype == 'wait' " >
              <van-goods-action-button id="informed_confirm" type="danger" text="确认"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

          </div>

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
import * as wflowprocess from '@/request/wflow.process';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "详情",
            momentNewMsg: true,
            tabname: '1',
            active: 1,
            alist:[],
            hlist:[],
            nlist:[],
            tlist:[],
            id:'',
            type:'',
            title:'',
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
            item:{},
            backPath:'/explore',
            workflowlist:[],
            announces:[],
            informList:[],
            fileList:[],
            loading:false,
            officeList:[],
        }
    },
    activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
        this.renderStatus();
    },
    mounted() {
      this.queryInfo();
      this.renderStatus();
    },
    methods: {
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
          return { url:`https://upload.shengtai.club/` + item, isImage: true };
        });
        return list;
      },
      queryOfficeList(files){
        let list = files.split(',');
        list = list.filter((item)=>{
          return /\.(doc|docx|ppt|pptx|xls|xlsx|pdf|zip|rar)$/.test(item);
        })
        list = list.map((item)=>{
          return { url:`https://upload.shengtai.club/` + item , name : item.split('/')[1].split('_')[1] , isImage: true };
        });
        return list;
      },
      async queryInfo(){
        try {
          var that = this;
          this.id = window.decodeURIComponent(this.getUrlParam('id'));
          this.type = window.decodeURIComponent(this.getUrlParam('type'));
          this.backPath = window.decodeURIComponent(this.getUrlParam('backpath'));
          this.title = window.decodeURIComponent(this.getUrlParam('title'));
          this.content = window.decodeURIComponent(this.getUrlParam('content'));
          this.files = window.decodeURIComponent(this.getUrlParam('files'));
          this.from = window.decodeURIComponent(this.getUrlParam('from'));
          this.tabname = window.decodeURIComponent(this.getUrlParam('tabname'));
          this.tname = window.decodeURIComponent(this.getUrlParam('tname'));
          this.bname = window.decodeURIComponent(this.getUrlParam('bname'));
          this.tableInfo = await query.queryTableFieldInfoJSON(this.tname);
          this.orderInfo = await query.queryTableFieldOrderJSON(this.tname);
          this.fields = Object.keys(that.tableInfo).sort((a,b)=>{ return that.orderInfo[a] - that.orderInfo[b]});
          this.item = await query.queryTableData(this.tname , this.id);
          try {
            delete this.item.depart_name;
            delete this.item.sys_org_code;
            delete this.item.update_by;
            delete this.item.update_time;
          } catch (error) {
            console.log(error);
          }
          let ntime = tools.formatDate(new Date(),'yyyyMMddhhmmss');
          let ctime = tools.formatDate(this.item.create_time,'yyyyMMddhhmmss');
          this.item.create_time = tools.formatDate(this.item.create_time,'yyyy-MM-dd');
          this.item.exp_join_date = tools.formatDate(this.item.exp_join_date,'yyyy-MM-dd');
          this.item.start_time = tools.formatDate(this.item.start_time,'yyyy-MM-dd hh:mm');
          this.item.end_time = tools.formatDate(this.item.start_time,'yyyy-MM-dd hh:mm');
          this.item.starttime = tools.formatDate(this.item.starttime,'yyyy-MM-dd hh:mm');
          this.item.endtime = tools.formatDate(this.item.starttime,'yyyy-MM-dd hh:mm');
          this.item.interview_date = tools.formatDate(this.item.interview_date,'yyyy-MM-dd hh:mm');
          this.item.join_date = tools.formatDate(this.item.join_date,'yyyy-MM-dd hh:mm');
          this.item.resign_date = tools.formatDate(this.item.resign_date,'yyyy-MM-dd');
          this.active = constant.WORKSTEP_STATUS[this.item.bpm_status];
          this.item.bpm_value = this.item.bpm_status;
          this.item.bpm_status = constant.WORKFLOW_STATUS[this.item.bpm_value];
          this.status = constant.WORKFLOW_STATUS[this.item.bpm_value];
          this.status_type = constant.WORKSTEP_TYPE[this.item.bpm_value];
          this.item.leave_off_type = constant.LEAVE_TYPE[this.item.leave_off_type];
          this.fileList = this.queryPictureList(this.item.files);
          this.officeList = this.queryOfficeList(this.item.files);
          delete this.item.bpm_status;
          this.files = this.item.files;
          try {
            delete this.item.files;
          } catch (error) {
            console.log(error);
          }
          this.previewurl = await tools.queryFileViewURL(this.files);
          let previewFlag = (ntime - ctime) > 20000;
          if(this.previewurl&&previewFlag&&this.previewurl.endsWith('pdf')){
            this.purl = constant.PDF_PREVIEW_URL + this.previewurl;
          } else if(this.previewurl&&previewFlag) {
            this.purl = constant.OFFICE_PREVIEW_URL + this.previewurl;
          }

          //查询审批流程数据
          this.queryWorkflow();

          //渲染图片
          this.renderCSS();

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
      async queryWorkflow(){
        let id = window.decodeURIComponent(this.getUrlParam('id'));
        let hlist = await workflow.queryPRLogHistoryByDataID(id);
        let clist = await workflow.queryPRLogByDataID(id);
        let ilist = await workflow.queryPRLogInformedByDataID(id);
        let list = [...hlist , ...clist , ...ilist];
        this.workflowlist = list;
        this.informList = ilist;

        this.workflowlist.map(async (item)=>{
          item.operate_time = tools.formatDate(item.operate_time,'yyyy-MM-dd hh:mm');
          item.approve_user = await workflow.queryUserByName(item.approve_user);
        });
      },
      async renderCSS(){
        setTimeout(() => {
          this.status_type = 'none';
        } , 3000)
      },
      async renderStatus(){
        setTimeout(()=>{
          this.tasktype = window.decodeURIComponent(this.getUrlParam('tasktype'));
        } , 100);
      },
      async queryAnnounce(){

        let info = await storage.getStore('system_userinfo');
        let username = info.username;
        let temp = null;

        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        let result = storage.getStore(`system_announce_by_user@${username}`);

        if( tools.isNull(result) || result.length <= 0 || result == 'undefined') {

          this.alist = await announce.queryAnnounceList(0,30);
          this.hlist = await announce.queryHeadList(0,30);
          this.nlist = await announce.queryNewsList(0,30);
          this.tlist = await announce.queryNoticeList(0,30);

          temp = [...this.alist , ...this.hlist , ...this.nlist , ...this.tlist];
          temp = temp.flat();
          temp.sort((a, b) => {
            return b.timestamp - a.timestamp;
          });
          storage.setStore(`system_announce_by_user@${username}` , temp , 3600 * 24);
        } else {
          temp = result;
        }

        this.announces = temp.slice(0,30);
      },
      async queryEach(){
        this.alist = await announce.queryAnnounceList(0,30);
        this.hlist = await announce.queryHeadList(0,30);
        this.nlist = await announce.queryNewsList(0,30);
        this.tlist = await announce.queryNoticeList(0,30);
      },
      async handleAgree(){
        this.loading = true;
        let result = await wflowprocess.handleApproveWF();
        result == 'success' ? (this.tasktype = 'done') : '';
        setTimeout(async () => {
          await this.queryInfo();
          this.loading = false;
        } , 3500);
      },
      async handleDisagree(){
        this.loading = true;
        let result = await wflowprocess.handleRejectWF();
        result == 'success' ? (this.tasktype = 'done') : '';
        setTimeout(async () => {
          await this.queryInfo();
          this.loading = false;
        } , 3500);
      },
      async handleConfirm(){
        this.loading = true;
        let result = await wflowprocess.handleConfirmWF();
        result == 'success' ? (this.tasktype = 'done') : '';
        setTimeout(async () => {
          await this.queryInfo();
          this.loading = false;
        } , 3500);
      }


    }
}
</script>
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
