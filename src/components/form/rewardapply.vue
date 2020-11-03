<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px; overflow-x: hidden;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link :to="back" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>奖罚申请</span>
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">奖罚申请表</van-col>
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
                <!-- 申请时间 -->
                <van-field :readonly="true"     :required="false" clearable label="奖罚类别" v-model="item.reward_type"  placeholder="请填写奖罚类别！" @blur="validField('reward_type')" :error-message="message.reward_type"  />
                <!-- 申请时间 -->
                <van-field :readonly="true"     :required="false" clearable label="申请时间" v-model="item.apply_date"  placeholder="请填写申请时间！" @blur="validField('apply_date')" :error-message="message.apply_date"  />
                <!-- 流程标题 -->
                <van-field :readonly="readonly" :required="true"  clearable label="流程标题" v-model="item.title"  placeholder="请填写流程标题！" @blur="validField('title')" :error-message="message.title"  />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;position:relative;">

                <van-cell value="人员信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 申请人员 -->
                <van-field :readonly="readonly" :required="true"  clearable label="申请人员" v-model="item.apply_realname"  placeholder="请填写申请人员姓名！" @blur="validField('apply_realname')" :error-message="message.apply_realname"  />
                <!-- 所属公司 -->
                <van-field :readonly="readonly" :required="true"  clearable label="所属公司" v-model="item.company"  placeholder="请填写所属公司！" @blur="validField('company')" :error-message="message.company"  />
                <!-- 所属部门 -->
                <van-field :readonly="readonly" :required="true"  clearable label="所属部门" v-model="item.department"  placeholder="请填写所属部门！" @blur="validField('department')" :error-message="message.department"  />

              </van-cell-group>

              <van-cell-group id="van-user-list" class="van-user-list" style="margin-top:10px;">
                <van-cell value="人力信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required clearable label="人力经理" v-model="item.hr_name" placeholder="请输入需要知会的人力经理，如李茜!" @blur="queryHRMan();validField('hr_name');" @click="queryHRMan();" :error-message="message.hr_name" />
                <van-address-list v-show="userList.length > 0" v-model="item.hr_id" :list="userList" default-tag-text="默认" edit-disabled @select="selectHRUser()" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;position:relative;">

                <van-cell value="奖罚信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 奖罚名称 -->
                <van-field :readonly="readonly" :required="true"  clearable label="所属周期" v-model="item.reward_period"  placeholder="请填写奖罚所属周期！" @blur="validField('reward_period')" :error-message="message.reward_period"  />
                <!-- 奖罚名称 -->
                <van-field :readonly="readonly" :required="true"  clearable label="奖罚名称" v-model="item.reward_name"  placeholder="请填写奖罚名称！" @blur="validField('reward_name')" :error-message="message.reward_name"  />
                <!-- 奖罚金额 -->
                <van-field :readonly="readonly" :required="true"  clearable label="奖罚金额" v-model="item.amount"  placeholder="请填写奖罚金额！" @blur="validField('amount')" :error-message="message.amount"  />
                <!-- 申请事由 -->
                <van-field :readonly="readonly" :required="true"  clearable label="申请事由" v-model="item.content" rows="2" autosize type="textarea"  maxlength="10240"  placeholder="请填写申请事由！" @blur="validField('content')" :error-message="message.content"  />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" @blur="validField('remark')" :error-message="message.remark"  />

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

            <van-cell-group style="margin-top:10px; position:relative;">

                <van-cell value="附件上传" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-icon name="add-o" style="position:absolute;top:40px;right:0px;z-index:100;" @click="size <= 6 ? size++ : size;"/>
                <van-icon name="circle" style="position:absolute;top:85px;right:0px;z-index:100;" @click="size > 0 ? size-- : size;"  />

                <van-cell title="奖罚明细" class="van-cell-upload" :label="item.files.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" :beforeUpload="beforeUpload" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="size >= 1" title="相关附件 #1" class="van-cell-upload" :label="item.files_00.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_00"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="size >= 2" title="相关附件 #2" class="van-cell-upload" :label="item.files_01.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_01"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="size >= 3" title="相关附件 #3" class="van-cell-upload" :label="item.files_02.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_02"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="size >= 4" title="相关附件 #4" class="van-cell-upload" :label="item.files_03.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_03"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="size >= 5" title="相关附件 #5" class="van-cell-upload" :label="item.files_04.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_04"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="size >= 6" title="相关附件 #6" class="van-cell-upload" :label="item.files_05.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @start="toastUpload('start');" @fail="toastUpload('fail');" @success="uploadSuccess_05"  typeError="对不起，不支持上传该类型文件！" limitError="对不起，文件大小超过限制！" >上传</nut-uploader>
                  </template>
                </van-cell>

            </van-cell-group>

            </van-form>

          </van-cell-group>

          <div v-show="!item.serialid" style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
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
            title:'奖罚申请表',
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
            hr_id:'',
            userList:[],
            size: 0,
            processLogList:[],
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: workconfig.compValidation.rewardapply.message,
            valid: workconfig.compValidation.rewardapply.valid,
            item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              create_by: '',
              apply_date: dayjs().format('YYYY-MM-DD'),
              title: '',
              company: '',
              department: '',
              content: '',
              remark: '',//备注
              amount: '',
              wflowid: '',
              bpm_status: '',
              reward_type: '',
              reward_name: '',
              reward_period: dayjs().format('YYYY年MM月'),
              hr_admin_ids: '',
              hr_admin_names: '',
              hr_id: '',
              hr_name: '',
              apply_username: '',
              apply_realname: '',
              files: '',
              files_00:'',
              files_01:'',
              files_02:'',
              files_03:'',
              files_04:'',
              files_05:'',
              status: '',
            },
            back:'/app',
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
            tablename:'bs_reward_apply',
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
      // 上传前检查上传附件信息
      beforeUpload($e){
        try {
          const file = $e.target.files[0];
          if(!file.name.includes('xls')){
            this.$toast.fail('请上传Excel文档！');
            $e.target.files = [];
            return {event:$e};
          } else {
            return {event:$e};
          }
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
      // 上传提示
      async toastUpload(flag){
        if(flag == 'start'){
          vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
        } else if(flag == 'fail'){
          this.$toast.success('文件上传失败，请稍后重试！');
        }
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
      // 上传文件成功后回调函数
      async uploadSuccess(file , res){
        vant.Toast.clear();
        this.item.files = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_00(file , res){
        vant.Toast.clear();
        this.item.files_00 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_01(file , res){
        vant.Toast.clear();
        this.item.files_01 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_02(file , res){
        vant.Toast.clear();
        this.item.files_02 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_03(file , res){
        vant.Toast.clear();
        this.item.files_03 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_04(file , res){
        vant.Toast.clear();
        this.item.files_04 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_05(file , res){
        vant.Toast.clear();
        this.item.files_05 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 用户选择盖印人
      async queryHRMan(){

        //获取盖章人信息
        const hr_name = this.item.hr_name;

        try {
          if(!!hr_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(hr_name.trim());

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
                  this.item.hr_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.hr_id = this.hr_id = user[0].loginid;

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
                  this.item.hr_name = user.lastname;
                  //当前盖印人编号
                  this.item.hr_id = this.hr_id = user.loginid;

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
      //选中当前盖印人
      async selectHRUser(value){
        await tools.sleep(0);
        const id = this.item.hr_id;
        const user = this.userList.find((item,index) => {return id == item.id});
        this.item.hr_name = user.name;
      },
      // 设置重置
      async reduction(){
        this.item = {
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              create_by: '',
              apply_date: dayjs().format('YYYY-MM-DD'),
              title: '',
              company: '',
              department: '',
              content: '',
              remark: '',//备注
              files: '',
              amount: '',
              wflowid: '',
              bpm_status: '',
              reward_type: '',
              reward_name: '',
              reward_period: '',
              hr_admin_ids: '',
              hr_admin_names: '',
              hr_id: '',
              hr_name: '',
              apply_username: '',
              apply_realname: '',
              status: '',
            };
      },
      // 获取处理日志
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
      async deleteProcessLog(){

        const id = tools.getUrlParam('id');
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
      validField(fieldName){
        //获取用户基础信息
        const userinfo = storage.getStore('system_userinfo');

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

          this.iswechat = tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          //查询上一页
          this.back = tools.getUrlParam('back') || '/app';
          //查询type
          const type = tools.getUrlParam('type') || '0';

          //获取用户基础信息
          const userinfo = await storage.getStore('system_userinfo');

          this.item.apply_realname = userinfo.realname;
          this.item.apply_username = userinfo.username;

          //获取缓存信息
          const item = storage.getStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo.realname}`);

          try {
            //自动回显刚才填写的用户基础信息
            if(item){
              this.item.create_by = item.create_by || this.item.create_by;
              this.item.remark = item.remark || this.item.remark;
              this.item.status = item.status || this.item.status;
            }

            if(userinfo.department && userinfo.department.name){
              this.item.department = userinfo.department.name;
              this.item.company = userinfo.parent_company.name;
            } else if(userinfo.systemuserinfo && userinfo.systemuserinfo.textfield1){
              let temp = userinfo.systemuserinfo.textfield1.split('||')[0];
              this.item.company = temp.split('>')[temp.split('>').length - 1];
              temp = userinfo.systemuserinfo.textfield1.split('||')[1];
              this.item.department = temp.split('>')[temp.split('>').length - 1];
            }
          } catch (error) {
            console.log(error);
          }

          try {
            //查询奖罚类型
            this.item.reward_type = workconfig.rewardtype[type];
          } catch (error) {
            console.log(error);
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

        //验证数据是否已经填写
        const keys = Object.keys({ title: '', company: '', department: '', content: '', amount: '', reward_type: '', reward_name: '', reward_period: '', hr_name: '', apply_realname: '', files:''})

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
        const response = await query.queryRoleGroupList('COMMON_REWARD_HR_ADMIN' , this.item.hr_id);

        //获取到印章管理员组信息
        let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
        let user_group_names = response && response.length > 0 ? response[0].enuserlist : '';

        //如果未获取用户名称，则直接设置用印人为分组成员
        if(tools.isNull(user_group_ids)){
          user_group_ids = this.item.hr_id;
          user_group_names = this.item.hr_name;
        }

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/reward?id=${id}&statustype=office&type=${type}&role=hr`);

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          serialid:'',
          create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          create_by: userinfo.username,
          apply_date: dayjs().format('YYYY-MM-DD'),
          title: this.item.title,
          company: this.item.company,
          department: this.item.department,
          content: this.item.content,
          remark: this.item.remark, //备注
          amount: this.item.amount,
          wflowid: '',
          bpm_status: '',
          reward_type: this.item.reward_type,
          reward_name: this.item.reward_name,
          reward_period: this.item.reward_period,
          hr_admin_ids: user_group_ids,
          hr_admin_names: user_group_names,
          hr_id: this.item.hr_id,
          hr_name: this.item.hr_name,
          apply_username: userinfo.username,
          apply_realname: userinfo.realname,
          files: this.item.files,
          files_00: this.item.files_00,
          files_01: this.item.files_01,
          files_02: this.item.files_02,
          files_03: this.item.files_03,
          files_04: this.item.files_04,
          files_05: this.item.files_05,
          status: '待审批',
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
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${user_group_ids}/奖罚申请登记通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 序号:‘${value.serialid}’ 奖罚申请登记完毕，请确认！?rurl=${receiveURL}`)
                .set('accept', 'json');


        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        const resp = await query.queryRoleGroupList('COMMON_REWARD_HR_ADMIN' , this.item.hr_id);

        //获取后端配置前端管理员组
        const front = resp[0].userlist;
        const front_name = resp[0].enuserlist;

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '奖罚流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '发起'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '发起奖罚申请[待处理]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '奖罚审批[奖罚申请]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `奖罚申请(${this.item.reward_type}) ` + this.item.reward_period + ' #经办人: ' + userinfo.username ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        //同时推送一条待办记录给印章管理员

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: front,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '奖罚流程审批',//varchar(100)  null comment '流程名称',
          employee       : front_name ,//varchar(1000) null comment '操作职员',
          approve_user   : front ,//varchar(100)  null comment '审批人员',
          action         : ''    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批奖罚申请',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : '前台',//varchar(100)  null comment '职能岗位',
          process_station   : '奖罚审批[奖罚申请]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `奖罚申请(${this.item.reward_type}) ` + this.item.reward_period + '#待审批 #经办人: ' + userinfo.username,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.taskViewProcessLog(prLogNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已经提交奖罚申请流程！',
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
