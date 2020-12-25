<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;" >
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
                <van-field :readonly="true" :required="false" clearable label="遗失时间" v-model="item.lost_time"  placeholder="请填写遗失时间！" @blur="validField('lost_time')" :error-message="message.lost_time"  />
                <van-field :readonly="readonly" :required="false" clearable label="失物名称" v-model="item.lost_name"  placeholder="请填写失物名称！" @blur="validField('lost_name')" :error-message="message.lost_name"  />
                <van-field :readonly="readonly" :required="false" clearable label="失物数量" v-model="item.lost_amount"  placeholder="请填写失物数量及单位！" @blur="validField('lost_amount')" :error-message="message.lost_amount"  />
              </van-cell-group>

               <van-cell-group id="van-zone-list" class="van-zone-list" style="margin-top:10px;">
                <van-cell value="地址信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :required="false" clearable label="登记地址" v-model="item.address" placeholder="请输入失物招领处的地址信息!" @blur="validField('address');" :error-message="message.address"  />
                <van-field :required="false" clearable label="登记区域" v-model="item.zone_name" v-show="item.zone_name" placeholder="请输入失物招领处的登记区域!" @blur="validField('zone_name');" :error-message="message.zone_name" />
              </van-cell-group>

              <van-cell-group id="van-user-list" class="van-user-list" style="margin-top:10px;">
                <van-cell value="招领管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :required="false" clearable label="物品管理员" v-model="item.user_admin_name" placeholder="请输入失物招领处的物品管理员!" @blur="validField('user_admin_name');" :error-message="message.user_admin_name" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="认领人员" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :readonly="true" :required="false" clearable label="认领人员" v-model="item.claim_name"  placeholder="请填写您的姓名！" @blur="validField('claim_name')" :error-message="message.claim_name"  />
                <van-field :readonly="true" :required="false" clearable label="单位名称" v-model="item.company" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company"/>
                <van-field :readonly="true" :required="false" clearable label="部门名称" v-model="item.department" placeholder="请填写您的部门名称！" @blur="validField('department')" :error-message="message.department" />
                <van-field :readonly="true" :required="false" clearable label="联系电话" v-model="item.mobile" placeholder="请填写您的联系电话！" @blur="validField('mobile')" :error-message="message.mobile" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.remark">
                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.description"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如失物品相，颜色，遗失地点以及其他情况！" @blur="validField('remark')" :error-message="message.remark"  />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.status">
                <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
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

              <van-cell-group style="margin-top:10px;" v-show=" role != 'common' && item.status == '已认领' ">
                <van-cell value="审批意见" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :required="false" clearable label="审批意见" v-model="item.reason"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写同意/驳回原因！"  />
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
            message: Betools.workconfig.compValidation.entryjob.message,
            valid: Betools.workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',

              lost_time: dayjs().format('YYYY-MM-DD'), //遗失时间
              lost_name:'', //失物名称
              lost_amount:'',//失物数量

              claim_name: '', //认领人员
              claim_id: '',
              claim_time: '', //认领时间

              department:'', //部门名称
              company:'', //单位名称
              mobile: '', //联系电话
              description:'', //备注说明
              user_group_ids:'', //用户权限组

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
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            currentKey:'',
            tablename:'bs_lost_property',
            readonly: false,
            goodstype: Betools.workconfig.goodstype,
            diplomaType: Betools.workconfig.compcolumns.diplomaTypeColumns,
            acceptType: Betools.workconfig.compcolumns.acceptType,
            commonTypeColumns: Betools.workconfig.compcolumns.commonTypeColumns,
            sealTypeColumns: Betools.workconfig.compcolumns.sealTypeColumns,
        }
    },
    async activated() {
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    methods: {
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await Betools.query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
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
          await Betools.tools.sleep(300);
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
        const id = Betools.tools.getUrlParam('id');
        try {
          this.processLogList = await Betools.workflow.queryPRLogHistoryByDataID(id);
          this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
          this.processLogList.sort();
        } catch (error) {
          console.log(error);
        }
      },
      async deleteProcessLog(){

        const id = Betools.tools.getUrlParam('id');
        const pid = Betools.tools.getUrlParam('pid');

        //查询业务编号，如果不存在，则直接返回
        if(Betools.tools.isNull(id) || Betools.tools.isNull(pid)){
          return ;
        }

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
        let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        if(tlist.length > 0){
          //同时删除本条待办记录当前(印章管理员)
          await Betools.workflow.deleteViewProcessLog(tlist);
        }

      },

      //选中当前盖印人
      async selectFrontUser(value){
        await Betools.tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      async validField(fieldName){
        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = Betools.workconfig.system.config.regexp.mail;

        this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        Betools.storage.setStore(`system_${this.tablename}_item@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

        return Betools.tools.isNull(this.message[fieldName]);
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

          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          //获取用户基础信息
          const userinfo = await Betools.storage.getStore('system_userinfo');

          //查询编号
          const id = Betools.tools.getUrlParam('id');
          this.role = Betools.tools.getUrlParam('role');
          this.back = Betools.tools.getUrlParam('back') || '/app/lostpropertylist';

          //查询借用数据
          let tlist = await Betools.query.queryTableDataByPid(this.tablename , id);
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

              claim_name: item.claim_name || userinfo.realname, //认领人员
              claim_id: item.claim_id,
              claim_time: dayjs(item.claim_time).format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'), //认领时间
              department: item.department || userinfo.department.name, //部门名称
              company: item.company || userinfo.parent_company.name , //单位名称
              mobile: item.mobile || userinfo.mobile, //联系电话
              description: item.description, //备注说明

              user_group_ids: item.user_group_ids,
              user_admin_name: item.user_admin_name,
              user_zone_name: item.user_zone_name,

              address: item.address,
              zone_name: item.zone_name,

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
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //验证是否为办公用品管理员，如果不是，则没有权限进入
        const resp_ = await Betools.query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        if(resp_.length == 0 || !resp_[0].userlist.includes(userinfo.username)){
          this.$toast.fail('您没有物品管理-失物招领角色的权限！');
          return false;
        }

        if(!this.item.reason){
          this.$toast.fail('请输入驳回原因！');
          return false;
        }

        //显示加载状态
        this.loading = true;

        //表单ID
        const id = this.item.id;
        const type = Betools.tools.getUrlParam('statustype');
        const pid = Betools.tools.getUrlParam('pid');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.location.protocol}//${window.location.host}/#/app/lostpropertyview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '待处理',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await Betools.manage.patchTableData(this.tablename , id , elem);


        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '待处理',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await Betools.manage.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${this.item.claim_id}/亲爱的同事，您的失物招领认领申请已被驳回，请到失物招领处进行线下沟通，驳回原因：${this.item.reason}！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        const resp = await Betools.query.queryRoleGroupList('COMMON_FRONT_ADMIN' , '');

        //获取后端配置前端管理员组
        const front = resp[0].userlist;
        const front_name = resp[0].enuserlist;

        //查询当前所有待办记录
        let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await Betools.workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
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

        await Betools.workflow.approveViewProcessLog(prLogHisNode);

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

        //查询审批日志
        await this.queryProcessLog();
      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //显示加载状态
        this.loading = true;

        //表单ID
        const id = this.item.id;

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.location.protocol}//${window.location.host}/#/app/lostpropertyview?id=${id}&statustype=office&role=front&step=front`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已认领',
          claim_name: userinfo.realname, //认领人员
          claim_id: userinfo.username,
          claim_time: dayjs().format('YYYY-MM-DD'), //认领时间
          mobile: userinfo.mobile,
          department: userinfo.department.name, //部门名称
          company: userinfo.parent_company.name, //单位名称
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await Betools.manage.patchTableData(this.tablename , id , elem);

        //第三步 向物品管理员推送消息确认，物品管理员确认后，将遗失物品递交给认领人员
        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${this.item.user_group_ids},${this.item.create_by}/亲爱的同事，员工‘${userinfo.realname}(${userinfo.department.name})’在失物招领处认领了‘${this.item.lost_name}’，请及时审核确认！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '认领'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批认领申请[已认领]',//text          null comment '操作意见',
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

        await Betools.workflow.approveViewProcessLog(prLogHisNode);

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

        //查询审批日志
        await this.queryProcessLog();

      },
      // 用户提交入职登记表函数
      async handleFinaly() {

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //验证是否为办公用品管理员，如果不是，则没有权限进入
        const resp = await Betools.query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        if(resp.length == 0 || !resp[0].userlist.includes(userinfo.username)){
          vant.Toast('您没有物品管理-失物招领角色的权限！');
          return false;
        }

        //表单ID
        const id = this.item.id;
        const pid = Betools.tools.getUrlParam('pid');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.location.protocol}//${window.location.host}/#/app/lostpropertyview?id=${id}&statustype=office&role=common&step=common`);

        //显示加载状态
        this.loading = true;

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          status: '已完成',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await Betools.manage.patchTableData(this.tablename , id , elem);

        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已完成',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await Betools.manage.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${this.item.claim_id}/亲爱的同事，您的失物招领认领申请已被确认，请到失物招领处领取遗失物品！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //查询当前所有待办记录
        let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await Betools.workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
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

        await Betools.workflow.approveViewProcessLog(prLogHisNode);

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

        //查询审批日志
        await this.queryProcessLog();

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
