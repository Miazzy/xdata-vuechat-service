<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link :to="back"  tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>失物招领</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
            </van-dropdown-menu>
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">失物招领表</van-col>
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

              <van-cell-group style="margin-top:10px;position:relative;">

                <van-cell value="基础信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                <!-- 借用时间（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="遗失时间" v-model="item.lost_time"  placeholder="请填写遗失时间！" @blur="validField('lost_time')" :error-message="message.lost_time"  />
                <!-- 失物名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="true" clearable label="失物名称" v-model="item.lost_name"  placeholder="请填写失物名称！" @blur="validField('lost_name')" :error-message="message.lost_name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="true" clearable label="失物数量" v-model="item.lost_amount"  placeholder="请填写失物数量！" @blur="validField('lost_amount')" :error-message="message.lost_amount"  />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.description"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如失物品相，颜色，遗失地点以及其他情况！" @blur="validField('description')" :error-message="message.description"  />

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

            </van-form>

          </van-cell-group>

          <div style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" v-show="!item.serialid" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleApply();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >提交</van-button>
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
            title:'失物招领表',
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
            size:1,
            processLogList:[],
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',

              lost_time: dayjs().format('YYYY-MM-DD'), //遗失时间
              lost_name:'', //失物名称
              lost_amount:'',//失物数量

              claim_name: '', //认领人员
              claim_time: '', //认领时间
              department:'', //部门名称
              company:'', //单位名称
              mobile: '', //联系电话
              description:'', //备注说明

              serialid: '', //序列编号
              status: '',
            },
            back:'/app/lostpropertylist',
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
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            currentKey:'',
            tablename:'bs_lost_property',
            readonly: false,
            goodstype: workconfig.goodstype,
            goodsborrowtype: workconfig.goodsborrowtype,
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
      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      //点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          //刷新相应表单
          this.queryTabList(this.tabname);
          //显示搜索状态
          vant.Toast('搜索...');
          //等待一下
          await tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      //点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;

          case 4: //重置数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;
          case 5: //返回应用
            this.$router.push(`/app`);
            break;
          case 6: //返回首页
            this.$router.push(`/explore`);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      // 设置重置
      async reduction(){
        this.item = {
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',

              lost_time: dayjs().format('YYYY-MM-DD'), //遗失时间
              lost_name:'', //失物名称
              lost_amount:'',//失物数量

              claim_name: '', //认领人员
              claim_time: '', //认领时间
              department:'', //部门名称
              company:'', //单位名称
              mobile: '', //联系电话
              description:'', //备注说明

              serialid: '', //序列编号
              status: '',
            };
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

        storage.setStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

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
      // 获取URL或者二维码信息
      async queryInfo() {

        try {
          //查询当前是否微信端
          this.iswechat = tools.isWechat();

          //查询上一页
          this.back = tools.getUrlParam('back') || '/app/lostpropertylist';

          //获取用户基础信息
          const userinfo = await storage.getStore('system_userinfo');

          //获取缓存信息
          const item = storage.getStore(`system_${this.tablename}_item@${userinfo.realname}`);

          //自动回显刚才填写的用户基础信息
          if(item){
            this.item = {
              id: item.id || '',
              serialid: item.serialid,
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: item.create_by,

              lost_time: dayjs().format('YYYY-MM-DD'), //遗失时间
              lost_name: item.lost_name, //失物名称
              lost_amount: item.lost_amount,//失物数量

              claim_name: item.claim_name, //认领人员
              claim_time: item.claim_time, //认领时间
              department: item.department, //部门名称
              company: item.company, //单位名称
              mobile: item.mobile, //联系电话
              description: item.description, //备注说明

              serialid: item.serialid, //序列编号
              status: item.status,
            }
          }

        } catch (error) {
          console.log(error);
        }

      },

      // 用户提交入职登记表函数
      async handleApply() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //表单ID
        const id = tools.queryUniqueID();
        const type = tools.getUrlParam('type');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&type=${type}&role=front`);

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          create_by : userinfo.username,
          lost_time: dayjs().format('YYYY-MM-DD'), //遗失时间
          lost_name: this.item.lost_name, //失物名称
          lost_amount: this.item.lost_amount,//失物数量
          description: this.item.description, //备注说明
          pid: id,
          status: '待处理',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.postTableData(this.tablename , elem);

        //发送自动设置排序号请求
        const patchResp = await superagent.get(workconfig.queryAPI.tableSerialAPI.replace('{table_name}', this.tablename)).set('accept', 'json');

         //查询数据
        const value = await query.queryTableData(this.tablename , id);

        //显示序列号
        this.item.serialid = value.serialid;

        //查询直接所在工作组
        const resp = await query.queryRoleGroupList('COMMON_FRONT_ADMIN' , '');

        //获取后端配置前端管理员组
        const front = resp[0].userlist;
        const front_name = resp[0].enuserlist;

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${front},${userinfo.username}/失物招领登记通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 序号:‘${value.serialid}’ 失物招领登记完毕！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '失物招领流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '发起'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '发起失物登记[待处理]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '登记[失物招领]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `失物登记: ${this.item.lost_name}  ` + this.item.description + ' #经办人: ' + userinfo.username ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已经登记失物招领！',
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
    @import "../../assets/css/goodsreceive.css";
</style>
