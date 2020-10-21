<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>失物招领确认</span>
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

              <van-cell-group style="margin-top:10px;">

                <van-cell value="基础信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                <!-- 借用时间（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="遗失时间" v-model="item.lost_time"  placeholder="请填写遗失时间！" @blur="validField('lost_time')" :error-message="message.lost_time"  />
                <!-- 失物名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="失物名称" v-model="item.lost_name"  placeholder="请填写失物名称！" @blur="validField('lost_name')" :error-message="message.lost_name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="失物数量" v-model="item.lost_amount"  placeholder="请填写失物数量！" @blur="validField('lost_amount')" :error-message="message.lost_amount"  />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="人员信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 借用人员（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="认领人员" v-model="item.claim_name"  placeholder="请填写您的姓名！" @blur="validField('claim_name')" :error-message="message.claim_name"  />
                <!-- 单位名称（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="单位名称" v-model="item.company" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company"/>
                <!-- 部门名称（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="部门名称" v-model="item.department" placeholder="请填写您的部门名称！" @blur="validField('department')" :error-message="message.department" />
                <!-- 联系电话（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="联系电话" v-model="item.mobile" placeholder="请填写您的联系电话！" @blur="validField('mobile')" :error-message="message.mobile" />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.remark">

                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.description"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如失物品相，颜色，遗失地点以及其他情况！" @blur="validField('remark')" :error-message="message.remark"  />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.status">

                <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 流程状态（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="流程状态" v-model="item.status"   />

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

          <div v-show="item.status ==='待处理' && role == 'common' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;width:99.5%;text-align:center;"  >认领</van-button>
          </div>

          <div v-show="item.status ==='已认领' && role == 'front' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ffd01e, #ff8917)" type="warning" text="驳回"  @click="handleDisagree();" style="border-radius: 10px 10px 10px 10px;margin-right:10px;width:47.5%;float:left;" />
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px; text-align: center;width:47.5%;float:right;"  >确认</van-button>
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
            processLogList:[],
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            role:'front',
            size:15,
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
            tlist:[],
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
              { text: '认领', value: 1 , icon: 'goods-collect-o' },
              { text: '刷新', value: 2 , icon: 'replay' },
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
          case 1: //认领数据
            await this.handleConfirm();
            break;
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
          this.back = tools.getUrlParam('back') || '/app/lostpropertylist';

          //查询借用数据
          let tlist = await query.queryTableDataByPid(this.tablename , id);
          this.size = tlist.length;
          this.tlist = tlist;

          const item = tlist[0];

          //自动回显刚才填写的用户基础信息
          if(item){
            this.item = {
              id: item.id,
              serialid: item.serialid,
              create_time: dayjs(item.create_time).format('YYYY-MM-DD'),
              create_by: item.create_by,

              lost_time: dayjs(item.lost_time).format('YYYY-MM-DD'), //遗失时间
              lost_name: item.lost_name, //失物名称
              lost_amount: item.lost_amount,//失物数量

              claim_name: userinfo.realname, //认领人员
              claim_time: dayjs().format('YYYY-MM-DD'), //认领时间
              department: userinfo.department.name, //部门名称
              company: userinfo.parent_company.name, //单位名称
              mobile: userinfo.mobile, //联系电话
              description: item.description, //备注说明

              serialid: item.serialid, //序列编号
              status: item.status,
            }
          }

          await this.queryProcessLog();

        } catch (error) {
          console.log(error);
        }

      },

      async handleDisagree(){

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //验证是否为办公用品管理员，如果不是，则没有权限进入
        const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
          vant.Toast('您没有物品管理-失物招领角色的权限！');
          return false;
        }

        //显示加载状态
        this.loading = true;

        //表单ID
        const id = this.item.id;
        const type = tools.getUrlParam('statustype');
        const pid = tools.getUrlParam('pid');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '待处理',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);


        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '待处理',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manageAPI.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/失物招领被驳回通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 已驳回，请沟通后重新发起借用！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        const resp = await query.queryRoleGroupList('COMMON_FRONT_ADMIN' , '');

        //获取后端配置前端管理员组
        const front = resp[0].userlist;
        const front_name = resp[0].enuserlist;

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '驳回'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批认领确认[已驳回]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '认领确认[失物招领]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `失物招领 ${this.item.lost_name} ` + '#已驳回 #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
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
        this.item.status = elem.status;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已驳回失物招领申请！',
          });
      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //显示加载状态
        this.loading = true;

        //表单ID
        const id = this.item.id;

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/lostpropertyview?id=${id}&statustype=office&role=front&step=front`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已认领',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        //查询直接所在工作组
        const resp = await query.queryRoleGroupList('COMMON_FRONT_ADMIN' , '');

        //获取后端配置前端管理员组
        const front = resp[0].userlist;
        const front_name = resp[0].enuserlist;

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/失物招领认领通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 物品已认领，请确认认领无误！?rurl=${receiveURL}`)
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
          process_name   : '流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '确认'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批借用申请[已认领]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '借用审批[失物招领]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `失物招领 ${this.item.lost_name}  ` +  '#已认领 #经办人: ' + this.item.create_by,//text          null comment '业务内容',
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
        this.item.status = elem.status;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已申请认领失物！',
          });

      },
      // 用户提交入职登记表函数
      async handleFinaly() {

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //验证是否为办公用品管理员，如果不是，则没有权限进入
        const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
          vant.Toast('您没有物品管理-失物招领角色的权限！');
          return false;
        }

        //显示加载状态
        this.loading = true;

        const pid = tools.getUrlParam('pid');

        //表单ID
        const id = this.item.id;

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          status: '已完成',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已完成',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manageAPI.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        /************************  工作流程日志(开始)  ************************/

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '完成'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批认领确认[已完成]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '认领确认[失物招领]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `失物招领 ${this.item.lost_name} ` + '#已完成 #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
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
        this.item.status = elem.status;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已完成失物招领流程！',
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
