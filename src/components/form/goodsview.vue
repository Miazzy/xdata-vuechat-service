<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>物品领用确认</span>
        </div>
    </header>

    <section v-if="iswechat">

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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">物品领用表</van-col>
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

              <van-cell-group style="margin-top:10px;">

                <van-cell value="基础信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                <!-- 领用时间（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="领用时间" v-model="item.receive_time"  placeholder="请填写领用时间！" @blur="validField('receive_time')" :error-message="message.receive_time"  />
                <!-- 领用类别（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="领用类别" v-model="item.type"  placeholder="请填写领用类别！" @blur="validField('type')" :error-message="message.type"  />
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="物品名称" v-model="item.name"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="领用数量" v-model="item.amount"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="人员信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 领用人员（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="领用人员" v-model="item.receive_name"  placeholder="请填写您的姓名！" @blur="validField('receive_name')" :error-message="message.receive_name"  />
                <!-- 单位名称（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="单位名称" v-model="item.company" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company"/>
                <!-- 部门名称（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="部门名称" v-model="item.department" placeholder="请填写您的部门名称！" @blur="validField('department')" :error-message="message.department" />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.remark">

                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" @blur="validField('remark')" :error-message="message.remark"  />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.remark">

                <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 流程状态（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="流程状态" v-model="item.status"   />

              </van-cell-group>

            </van-form>

          </van-cell-group>

          <div v-show="item.status ==='待处理' && role == 'front' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >确认</van-button>
          </div>

          <div v-show="item.status ==='已领取' && role == 'receive' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >完成</van-button>
          </div>

          <div style="height:500px;" ></div>
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
            title:'物品领用表',
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
            huserid:'',
            huserList:[],
            auserid:'',
            auserList:[],
            fuserid:'',
            fuserList:[],
            muserid:'',
            muserList:[],
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            role:'front',
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              receive_time: dayjs().format('YYYY-MM-DD'), //领用时间
              name:'', //领用物品名称
              amount:'',//领用数量
              receive_name:'',//领用人员名称
              department:'',//领用部门名称
              remark:'',//备注说明
              type:'',//领用类别
              company:'',//单位名称
              approve_name:'',//领用审批人员
              workflow:'',//关联流程
              approve:'',//领用审批人员
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
              showPickerCommon: false,
              showPickerSealType: false,
              showPickerOrderType: false,
              showPickerJoinTime: false,
              showPickerDiploma: false,
            },
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            currentKey:'',
            tablename:'bs_goods_receive',
            readonly: false,
            goodstype: workconfig.goodstype,
            diplomaType: workconfig.compcolumns.diplomaTypeColumns,
            acceptType: workconfig.compcolumns.acceptType,
            commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
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

      //选中当前盖印人
      async selectFrontUser(value){
        await tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      async validField(fieldName){
        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        storage.setStore(`system_${this.tablename}_item@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

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

      // 显示用户信息，如显示HR信息，显示行政人员信息
      displayUserInfo(fieldName){

      },

      // 选择入职时间
      async joinTimeConfirm(value){
        this.item.join_time = dayjs(value).format('YYYY-MM-DD');
        this.validField('join_time');
        await tools.sleep(100);
        this.tag.showPickerJoinTime = false;
      },

      // 选择是否
      async commonTypeConfirm(value){
        this.item[this.currentKey] = value;
        this.validField(value);
        await tools.sleep(100);
        this.tag.showPickerCommon = false;
      },

      // 获取URL或者二维码信息
      async queryInfo() {

        try {
          //查询当前是否微信端
          this.iswechat = tools.isWechat();

          //获取用户基础信息
          const userinfo = await storage.getStore('system_userinfo');

          //查询编号
          const id = tools.getUrlParam('id');
          this.role = tools.getUrlParam('role');

           //查询用印数据
          const item = await query.queryTableData(this.tablename , id);

          //根据URL参数查询物资类型
          this.item.type = this.goodstype[tools.getUrlParam('type')];

          //自动回显刚才填写的用户基础信息
          if(item){
            this.item.id = id;
            this.item.serialid = item.serialid || this.item.serialid;
            this.item.create_by = item.create_by || this.item.create_by;
            this.item.name = item.name || this.item.name;
            this.item.amount = item.amount || this.item.amount;
            this.item.receive_name = item.receive_name || userinfo.realname || this.item.receive_name ;
            this.item.department = item.department || this.item.department;
            this.item.remark = item.remark || this.item.remark;
            this.item.type = item.type || this.item.type || '办公用品';
            this.item.company = item.company || this.item.company;
            this.item.approve_name = item.approve_name || this.item.approve_name;
            this.item.workflow = item.workflow || this.item.workflow;
            this.item.approve = item.approve || this.item.approve;
            this.item.status = item.status || this.item.status;
          }

        } catch (error) {
          console.log(error);
        }

      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=${this.item.type}&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          name : this.item.name,
          amount : this.item.amount,
          remark : this.item.remark,
          type : this.item.type,
          approve_name : this.item.approve_name,
          workflow : this.item.workflow,
          approve : this.item.approve,
          status: '已领取',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/物品领用登记通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 物品领用登记完毕，请前台确认！?rurl=${receiveURL}`)
                .set('accept', 'json');

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已确认物品领用申请！',
          });

      },
      // 用户提交入职登记表函数
      async handleFinaly() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          status: '已完成',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已完成物品领用申请！',
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
    @import "../../assets/css/goodsview.css";
</style>
