<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>物品领用</span>
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

                <!-- 领用类别（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="领用类别" v-model="item.type"  placeholder="请填写领用类别！" @blur="validField('type')" :error-message="message.type"  />
                <!-- 领用时间（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="领用时间" v-model="item.receive_time"  placeholder="请填写领用时间！" @blur="validField('receive_time')" :error-message="message.receive_time"  />
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="物品名称" v-model="item.name"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="领用数量" v-model="item.amount"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <!-- 领用人员（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="领用人员" v-model="item.receive_name"  placeholder="请填写您的姓名！" @blur="validField('receive_name')" :error-message="message.receive_name"  />
                <!-- 单位名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="单位名称" v-model="item.company" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company"/>
                <!-- 部门名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="部门名称" v-model="item.department" placeholder="请填写您的部门名称！" @blur="validField('department')" :error-message="message.department" />

                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="备注说明" v-model="item.remark"  placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" @blur="validField('remark')" :error-message="message.remark"  />

              </van-cell-group>

            </van-form>

          </van-cell-group>

          <div style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFirstConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >验证</van-button>
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
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
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
            readonly: false,
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
      //处理验证确认
      async handleFirstConfirm(){

        //检查姓名、电话号码，身份证号是否填写
        if(!this.item.username || !this.item.mobile || !this.item.idcard){
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '微信提示',
            message: '请将您的姓名、电话、身份证号填写完整后进行验证操作！',
          });
          return ;
        }

        //查询URL
        const queryURL = `${window.requestAPIConfig.restapi}/api/bs_entry_man?_where=(name,eq,${this.item.username})~and(mobile,eq,${this.item.mobile})~and(idcard,eq,${this.item.idcard})`;

        //获取返回结果
        const resp = await superagent.get(queryURL).set('accept', 'json');

        if(resp && resp.body && resp.body.length > 0){

          //获取当前入职人员相关信息
          const value = resp.body[0];

          const position = this.item.position = value.position;
          const department = this.item.department = value.department;

          //未获取到HR信息
          await vant.Dialog.alert({
            title: '微信提示',
            message: '验证成功，请填写下一步信息！',
          });

        } else {

          //未获取到HR信息
          await vant.Dialog.alert({
            title: '微信提示',
            message: '验证失败，请向HR确认，是否将您的基础信息录入入职登记中？',
          });

        }

      },

      //选中当前盖印人
      async selectHRUser(value){
        await tools.sleep(0);
        const id = this.item.hr_id;
        const user = this.huserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.hr_name = user.name;
        this.item.hr_id = id;
      },

      //选中当前盖印人
      async selectAdminUser(value){
        await tools.sleep(0);
        const id = this.item.admin_id;
        const user = this.auserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.admin_name = user.name;
        this.item.admin_id = id;
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

      //选中当前盖印人
      async selectMealUser(value){
        await tools.sleep(0);
        const id = this.item.meal_id;
        const user = this.muserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.meal_name = user.name;
        this.item.meal_id = id;
      },

      validField(fieldName){
        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        storage.setStore('system_entry_job_item' , JSON.stringify(this.item) , 3600 * 2 );

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
          this.iswechat = tools.isWechat();
          this.item.sealman = tools.getUrlParam('sealman');

          const item = storage.getStore('system_entry_job_item');

          this.item.hr = tools.getUrlParam('hr');        //用印管理员成员组
          this.item.admin = tools.getUrlParam('admin');  //用印前台接受组
          this.item.front = tools.getUrlParam('front');  //用印归档组(财务/档案)
          this.item.meal = tools.getUrlParam('meal');  //用印

          //自动回显刚才填写的用户基础信息
          if(item){
            this.item.username = item.username || this.item.username;
            this.item.mobile = item.mobile || this.item.mobile;
            this.item.idcard = item.idcard || this.item.idcard;
            this.item.position = item.position || this.item.position;
            this.item.other_equip = item.other_equip || this.item.other_equip;
            this.item.othertools = item.othertools || this.item.othertools;
            this.item.carno = item.carno || this.item.carno;
            this.item.driving_license = item.driving_license || this.item.driving_license;
            this.item.driver_license = item.driver_license || this.item.driver_license;
            this.item.idcard = item.idcard || this.item.idcard;
            this.item.diploma = item.diploma || this.item.diploma;
            this.item.bachelor = item.bachelor || this.item.bachelor;
            this.item.bank_card = item.bank_card || this.item.bank_card;
          }

          //如果前台人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.front)){
            //获取盖印人姓名
            this.item.front_name = await manageAPI.queryUsernameByID(this.item.front);
          }
          //如果行政人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.admin)){
            //获取盖印人姓名
            this.item.admin_name = await manageAPI.queryUsernameByID(this.item.admin);
          }
          //如果行政人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.meal)){
            //获取盖印人姓名
            this.item.meal_name = await manageAPI.queryUsernameByID(this.item.meal);
          }
          //如果行政人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.hr)){
            //获取盖印人姓名
            this.item.hr_name = await manageAPI.queryUsernameByID(this.item.hr);
          }

          //如果行政人候选列表存在
          if(this.item.admin){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.admin.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.auserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.auserList.length });
            })
          }

          //如果行政人候选列表存在
          if(this.item.front){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.front.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.fuserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.fuserList.length });
            })
          }

          //如果行政人候选列表存在
          if(this.item.meal){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.meal.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.muserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.muserList.length });
            })
          }

          //如果行政人候选列表存在
          if(this.item.hr){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.hr.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.huserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.huserList.length });
            })
          }

        } catch (error) {
          console.log(error);
        }

      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //表单ID
        const id = tools.queryUniqueID();

        // 用户对接HR姓名
        const hr_name = this.item.hr_name;

        // 对应HR的OA账户信息
        let hrinfo = {};

        // 查询SQL
        const queryURL = `${window.requestAPIConfig.restapi}/api/v1/hrmresource/id?_where=((lastname,like,%27~${hr_name}~%27)~or(loginid,like,%27~${hr_name}~%27))~and(status,ne,5)&_fields=id,lastname,loginid`;

        // 预处理 检查HR名字是否存在，如果不存在直接返回，检查填写内容是否正确，如果不正确，则直接返回，并提升错误信息
        const resp = await superagent.get(queryURL).set('accept', 'json');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/entryview?id=${id}&statustype=none&role=hr`);

        // 如果没有获取到返回信息，说明填写的HR姓名有误，如果有获取到HR的返回信息，则执行转换
        if(resp && resp.body && resp.body.length > 0){
          hrinfo = resp.body.length > 1 ? {id: resp.body.map(obj => {return obj.id}).join(',')} : resp.body[0];
        } else {
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '异常提示',
            message: 'HR的姓名填写有误，未获取到相应信息，请修改后重试！',
          });
          return ;
        }

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          create_time: dayjs().format('YYYY-MM-DD'),
          create_by: this.item.username,
          username: this.item.username,
          department: this.item.department, //入职部门
          position: this.item.position,    //入职岗位
          picture: this.item.picture,     //员工照片
          computer: this.item.computer,  //是否需要电脑配置
          seat: this.item.seat,      //是否需要办公座椅
          drawer: this.item.drawer,    //是否需要办公抽屉drawer
          other_equip: this.item.other_equip,//是否需要其他办公配置
          notebook: this.item.manual,  //是否需要笔记本子
          manual: this.item.manual,    //是否需要入职手册
          writingtools: this.item.writingtools,//是否需要签字笔/擦
          badge: this.item.badge,     //员工工牌
          othertools: this.item.othertools,//其他用品
          driving_license: this.item.driving_license,//行驶证
          driver_license: this.item.driver_license,//驾驶证
          idcard: this.item.idcard,    //身份证号
          diploma: this.item.diploma,   //毕业编号
          bachelor: this.item.bachelor,  //学位编号
          diplomass: this.item.diplomass,   //毕业编号(硕士)
          bachelorss: this.item.bachelorss,  //学位编号(硕士)
          diplomabs: this.item.diplomabs,   //毕业编号(博士)
          bachelorbs: this.item.bachelorbs,  //学位编号(博士)
          bank_name: this.item.bank_name,  //开户银行名称
          bank_card: this.item.bank_card, //工资银行卡号
          ban_card: this.item.ban_card || '否', //门禁卡
          join_time: this.item.join_time, //入职时间
          hr_name: this.item.hr_name,   //对接HR
          hr_id: this.item.hr_id ,  //HR编码信息
          front_name: this.item.front_name,
          front_id: this.item.front_id,
          admin_name: this.item.admin_name,
          admin_id: this.item.admin_id,
          meal_name: this.item.meal_name,
          meal_id: this.item.meal_id,
          mobile: this.item.mobile,
          files_gp: this.item.files_gp,
          files_xs: this.item.files_xs,
          files_js: this.item.files_js,
          files_id: this.item.files_id,
          files_bk: this.item.files_bk,
          files_by: this.item.files_by,
          files_xw: this.item.files_xw,
          files_gxzm: this.item.files_gxzm,
          files_ssby: this.item.files_ssby,
          files_ssxw: this.item.files_ssxw,
          files_bsby: this.item.files_bsby,
          files_bsxw: this.item.files_bsxw,
          greatdiploma: this.item.greatdiploma || '本科',
          carno: this.item.carno,
          status: '待确认',
        }; // 待提交元素


        //第二步，向表单提交form对象数据
        const result = await manageAPI.postTableData('bs_entry_job' , elem);

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${hrinfo.id}/入职登记通知：员工‘${elem.username}’入职登记完毕，请HR确认！?rurl=${receiveURL}`)
                .set('accept', 'json');

        //设置状态
        this.loading = false;
        this.status = '待确认';
        this.readonly = true;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已经向前台客户推送物品领用申请！',
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
</style>
