<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;" >
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
                <van-field :readonly="true" :required="false" clearable label="遗失时间" v-model="item.lost_time"  placeholder="请填写遗失时间！" @blur="validField('lost_time');" :error-message="message.lost_time"  />
                <van-field :readonly="readonly" :required="true" clearable label="失物名称" v-model="item.lost_name"  placeholder="请填写失物名称！" @blur="validField('lost_name');" :error-message="message.lost_name"  />
                <van-field :readonly="readonly" :required="true" clearable label="数量/单位" v-model="item.lost_amount"  placeholder="请填写失物数量及单位！" @blur="validField('lost_amount');" :error-message="message.lost_amount"  />

              </van-cell-group>

              <van-cell-group id="van-zone-list" class="van-zone-list" style="margin-top:10px;">
                <van-cell value="地址信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :required="true" clearable label="登记地址" v-model="item.address" placeholder="请输入失物招领处的地址信息!" @blur="validField('address');queryZoneName();" :error-message="message.address" @click="queryZoneName();" @change="queryZoneName();" />
                <van-address-list v-show="zoneList.length > 0 && !item.serialid" v-model="zoneid" :list="zoneList" default-tag-text="默认" edit-disabled @select="selectZoneName" @click-item="selectZoneName"/>
                <van-field :required="false" clearable label="登记区域" v-model="item.zone_name" v-show="item.zone_name" placeholder="请输入失物招领处的登记区域!" @blur="validField('zone_name');" :error-message="message.zone_name" />
              </van-cell-group>

              <van-cell-group id="van-user-list" class="van-user-list" style="margin-top:10px;">
                <van-cell value="招领管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required clearable label="物品管理员" v-model="item.user_admin_name" placeholder="请输入失物招领处的物品管理员!" @blur="validField('user_admin_name');queryAdminMan();" :error-message="message.user_admin_name"  @click="queryAdminMan();" @change="queryAdminMan();"/>
                <van-address-list v-show="userList.length > 0 && !item.serialid" v-model="userid" :list="userList" default-tag-text="默认" edit-disabled @select="selectAdminMan" @click-item="selectAdminMan"/>
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
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
            userid:'',
            userList:[],
            zoneid:'',
            zoneList:[],
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
            message: workconfig.compValidation.lostproperty.message,
            valid: workconfig.compValidation.lostproperty.valid,
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

              userid:'',
              user_group_ids:'',
              user_group_names:'',
              user_admin_name:'',

              address:'',
              zone_name:'',

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
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    methods: {
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
      // 点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      // 点击顶部搜索
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
      // 点击右侧菜单
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
      // 用户选择物品管理员
      async queryAdminMan(){

        //获取盖章人信息
        const user_admin_name = this.item.user_admin_name;

        if(user_admin_name.length<=1){
          return;
        }

        try {
          if(!!user_admin_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(user_admin_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.userList.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })

                  //获取盖印人姓名
                  this.item.user_admin_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.userid = this.userid = user[0].loginid;

                  if(!this.item.address || !this.item.zone_name){
                    //选择物品管理员后，查询此物品管理员对应的区域及地址信息
                    const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , this.item.userid);
                    //获取到印章管理员组信息
                    this.item.address = response && response.length > 0 ? response[0].address : '';
                    this.item.zone_name = response && response.length > 0 ? response[0].zonename : '';
                  }

                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  //将用户数据推送至对方数组
                  this.userList.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.suserList.length });
                  //获取盖印人姓名
                  this.item.user_admin_name = user.lastname;
                  //当前盖印人编号
                  this.item.userid = this.userid = user.loginid;

                  if(!this.item.address || !this.item.zone_name){
                    //选择物品管理员后，查询此物品管理员对应的区域及地址信息
                    const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , this.item.userid);
                    //获取到印章管理员组信息
                    this.item.address = response && response.length > 0 ? response[0].address : '';
                    this.item.zone_name = response && response.length > 0 ? response[0].zonename : '';
                  }

                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.userList = this.userList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.userList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }

      },
      // 选中当前物品管理员
      async selectAdminMan(item, index){
        //获取物品管理员姓名
        this.item.user_admin_name = item.name;
        this.item.userid = item.id;
        if(!this.item.address || !this.item.zone_name){
          //选择物品管理员后，查询此物品管理员对应的区域及地址信息
          const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , this.item.userid);
          //获取到物品管理员组信息
          this.item.user_zone_name = this.item.address = response && response.length > 0 ? response[0].address : '';
          this.item.zone_name = response && response.length > 0 ? response[0].zonename : '';
        }
      },
      // 根据输入地址信息获取失物招领处地址信息
      async queryZoneName(){

        const address = this.item.address;  // 获取地址信息

        if(address.length <= 1){
          return;
        }

        try {
          if(!!address){

            // 获取地址列表信息
            let addressName = await manageAPI.queryAddressByName(address.trim());

            if(!!addressName){

              if(Array.isArray(addressName)){
                try {
                  addressName.map((elem,index) => { this.zoneList.push({id:elem.serialid , name:elem.zonename , tel:'' , address: elem.address , company: '' , department:'' , mail: elem.email , isDefault: !index }); });
                  this.item.address = this.item.user_zone_name = addressName[0].address; // 设置地址信息
                  this.item.zone_name = addressName[0].zonename;
                } catch (error) {
                  console.log(error);
                }
              } else {
                try {
                  this.zoneList.push({id:elem.serialid , name:addressName.zonename , tel: '' , address: addressName.address , company: '' , department:'' , mail: addressName.mail , isDefault: !this.zoneList.length});
                  this.item.address = this.item.user_zone_name = addressName.address;
                  this.item.zone_name = addressName.zonename;
                } catch (error) {
                  console.log(error);
                }
              }
              try {
                this.zoneList = this.zoneList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.zoneList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }

      },
      // 选中当前地址信息
      async selectZoneName(item,index){
        this.item.user_zone_name = this.item.address = item ? item.address : '';
        this.item.zone_name = item ? item.name : '';
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
      // 获取处理日志
      async queryProcessLog(rid){
        const id = tools.getUrlParam('id') || rid;
        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);
          this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
          this.processLogList.sort();
        } catch (error) {
          console.log(error);
        }
      },
      // 删除处理日志
      async deleteProcessLog(rid){

        const id = tools.getUrlParam('id') || rid ;
        const pid = tools.getUrlParam('pid');

        //查询业务编号，如果不存在，则直接返回
        if(tools.isNull(id) || tools.isNull(pid)){
          return ;
        }

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        if(tlist.length > 0){
          //同时删除本条待办记录当前(印章管理员)
          await workflow.deleteViewProcessLog(tlist);
        }

      },
      // 选中当前盖印人
      async selectFrontUser(value){
        await tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      validField(fieldName){
        //获取用户基础信息
        const userinfo = storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        if(fieldName.toLocaleLowerCase().includes('lost_amount') && /^\+?[1-9][0-9]*$/.test(this.item[fieldName])) {
          this.message[fieldName] = /^\+?[1-9][0-9]*$/.test(this.item[fieldName]) ? '请填写物品数量及单位，注意单位！' : '';
          return tools.isNull(this.message[fieldName]);
        }

        if(fieldName.toLocaleLowerCase().includes('mail') && !regMail.test(this.item[fieldName])) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
          return tools.isNull(this.message[fieldName]);
        }

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';
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

          this.iswechat = tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

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

          this.item.user_admin_name = userinfo.realname;
          this.item.userid = userinfo.username;
          this.queryAdminMan();

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

        //验证数据是否已经填写
        const keys = Object.keys({
          lost_name: '', //领用物品名称
          lost_amount: '', //领用数量
          user_admin_name: '',
        })

        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：${this.message[invalidKey]}！`,
          });
          return false;
        }

        //查询直接所在工作组
        const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , this.item.userid);

        //获取到印章管理员组信息
        let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
        let user_group_names = response && response.length > 0 ? response[0].enuserlist : '';

        //如果未获取用户名称，则直接设置用印人为分组成员
        if(tools.isNull(user_group_ids)){
          user_group_ids = this.item.userid;
          user_group_names = this.item.user_admin_name;
        }

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/lostpropertyview?id=${id}&statustype=office&type=${type}&role=front`);

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          create_by : userinfo.username,
          lost_time: dayjs().format('YYYY-MM-DD'), //遗失时间
          lost_name: this.item.lost_name, //失物名称
          lost_amount: this.item.lost_amount,//失物数量
          description: this.item.description, //备注说明
          userid : this.item.userid,
          user_admin_name : this.item.user_admin_name,
          user_group_ids,
          user_group_names,
          pid: id,
          zone_name:this.item.zone_name,
          address: this.item.address,
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

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${user_group_ids}/失物招领登记通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 序号:‘${value.serialid}’ 失物招领登记完毕！?rurl=${receiveURL}`)
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
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已经登记失物招领！',
          });

        //查询审批日志
        await this.queryProcessLog(id);;

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
