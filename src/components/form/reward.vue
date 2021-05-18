<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px; overflow-x: hidden;" >

    <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;" >
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
                <van-field :readonly="true" :required="false" clearable label="奖罚类别" v-model="item.reward_type"  placeholder="请填写奖罚类别！" />
                <!-- 申请时间 -->
                <van-field :readonly="true" :required="false" clearable label="申请时间" v-model="item.apply_date"  placeholder="请填写申请时间！" />
                <!-- 流程标题 -->
                <van-field :readonly="true" :required="false"  clearable label="流程标题" v-model="item.title"  placeholder="请填写流程标题！" />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;position:relative;">

                <van-cell value="人员信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 申请人员 -->
                <van-field :readonly="true" :required="false"  clearable label="申请人员" v-model="item.apply_realname"  placeholder="请填写申请人员姓名！" />
                <!-- 所属公司 -->
                <van-field :readonly="true" :required="false"  clearable label="所属公司" v-model="item.company"  placeholder="请填写所属公司！" />
                <!-- 所属部门 -->
                <van-field :readonly="true" :required="false"  clearable label="所属部门" v-model="item.department"  placeholder="请填写所属部门！" />

              </van-cell-group>

              <van-cell-group id="van-user-list" class="van-user-list" style="margin-top:10px;">
                <van-cell value="人力信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required clearable label="人力经理" v-model="item.hr_name" placeholder="请输入需要知会的人力经理，如李茜!" />
                <van-address-list v-show="userList.length > 0" v-model="item.hr_id" :list="userList" default-tag-text="默认" edit-disabled @select="selectHRUser()" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;position:relative;">

                <van-cell value="奖罚信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 奖罚名称 -->
                <van-field :readonly="true" :required="true"  clearable label="所属周期" v-model="item.reward_period"  placeholder="请填写奖罚所属周期！" />
                <!-- 奖罚名称 -->
                <van-field :readonly="true" :required="true"  clearable label="奖罚名称" v-model="item.reward_name"  placeholder="请填写奖罚名称！" />
                <!-- 奖罚金额 -->
                <van-field :readonly="true" :required="true"  clearable label="奖罚金额" v-model="item.amount"  placeholder="请填写奖罚金额！" />
                <!-- 申请事由 -->
                <van-field :readonly="true" :required="true"  clearable label="申请事由" v-model="item.content" rows="2" autosize type="textarea"  maxlength="10240"  placeholder="请填写申请事由！" />

              </van-cell-group>

              <van-cell-group v-show="item.remark" style="margin-top:10px;">

                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="备注说明" v-model="item.remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" />

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

            <van-cell-group id="van-files-download" class="van-files-download" style="margin-top:10px; position:relative;">

                <van-cell value="相关附件" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-cell v-show="item.files" title="奖罚明细" class="van-cell-upload" :label="item.files.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('奖罚明细' , 'files');"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-show="item.files_00" title="相关附件 #1" class="van-cell-upload" :label="item.files_00.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('相关附件','files_00');"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-show="item.files_01" title="相关附件 #2" class="van-cell-upload" :label="item.files_01.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('相关附件','files_01');"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-show="item.files_02" title="相关附件 #3" class="van-cell-upload" :label="item.files_02.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('相关附件','files_02');"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-show="item.files_03" title="相关附件 #4" class="van-cell-upload" :label="item.files_03.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('相关附件','files_03');"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-show="item.files_04" title="相关附件 #5" class="van-cell-upload" :label="item.files_04.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('相关附件','files_04');"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-show="item.files_05" title="相关附件 #6" class="van-cell-upload" :label="item.files_05.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" @click="download('相关附件','files_05');"  >下载</van-button>
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
            downloadURL:'https://upload.yunwisdom.club:30443/',
            message: Betools.workconfig.compValidation.rewardapply.message,
            valid: Betools.workconfig.compValidation.rewardapply.valid,
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
            ],
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            currentKey:'',
            tablename:'bs_reward_apply',
            readonly: false,
            goodstype: Betools.workconfig.goodstype,
            goodsborrowtype: Betools.workconfig.goodsborrowtype,
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

      // 上传前检查上传文件信息
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

      // 下载或保存文件
      async saveAsFile(file , name){
        try {
          window.open(file , '_blank');
        } catch (error) {
          console.log(error);
        }
        try {
          window.saveAs(file , name);
        } catch (error) {
          console.log(error);
        }
      },

      // 下载文件
      async download(name , file){
        const toast = vant.Toast.loading({duration: 0, forbidClick: true, message: '下载中...',});
        await this.saveAsFile(this.downloadURL + this.item[file] , name + ' ' + this.item[file].split('/')[1]);
        vant.Toast.clear();
      },

      // 点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },

      // 点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          this.queryTabList(this.tabname); //刷新相应表单
          vant.Toast('搜索...'); //显示搜索状态
          await Betools.tools.sleep(300); //等待一下
        }
        this.searchFlag = false; //显示刷新消息
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
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      // 上传文件成功后回调函数
      async uploadSuccess(file , res){
        vant.Toast.clear();
        this.item.files = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_00(file , res){
        vant.Toast.clear();
        this.item.files_00 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_01(file , res){
        vant.Toast.clear();
        this.item.files_01 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_02(file , res){
        vant.Toast.clear();
        this.item.files_02 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_03(file , res){
        vant.Toast.clear();
        this.item.files_03 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_04(file , res){
        vant.Toast.clear();
        this.item.files_04 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 上传文件成功后回调函数
      async uploadSuccess_05(file , res){
        vant.Toast.clear();
        this.item.files_05 = JSON.parse(res).message;
        await Betools.tools.sleep(0);
        this.$toast.success('上传成功');
      },
      // 用户选择盖印人
      async queryHRMan(){

        //获取盖章人信息
        const hr_name = this.item.hr_name;

        try {
          if(!!hr_name){

            //从用户表数据中获取填报人资料
            let user = await Betools.manage.queryUserByNameHRM(hr_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {

                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.userList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
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
      // 选中当前盖印人
      async selectHRUser(value){
        await Betools.tools.sleep(0);
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
            };
      },
      // 获取处理日志
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

      // 获取URL或者二维码信息
      async queryInfo() {

        try {

          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          //查询上一页
          this.back = Betools.tools.getUrlParam('back') || '/app';
          //查询type
          const type = Betools.tools.getUrlParam('type') || '0';
          //查询ID
          const id = Betools.tools.getUrlParam('id');
          //获取用户基础信息
          const userinfo = await Betools.storage.getStore('system_userinfo');
          //查询数据
          const item = await Betools.query.queryTableData(this.tablename , id);

          try {
            //自动回显刚才填写的用户基础信息
            if(item){
              this.item = {
                id: item.id,
                serialid: item.serialid,
                create_time: item.create_time,
                create_by: item.create_by,
                apply_date: dayjs(item.apply_date).format('YYYY-MM-DD'),
                title: item.title,
                company: item.company,
                department: item.department,
                content: item.content,
                remark: item.remark, //备注
                amount: item.amount,
                wflowid: item.wflowid,
                bpm_status: item.bpm_status,
                reward_type: item.reward_type,
                reward_name: item.reward_name,
                reward_period: item.reward_period,
                hr_admin_ids: item.hr_admin_ids,
                hr_admin_names: item.hr_admin_names,
                hr_id: item.hr_id,
                hr_name: item.hr_name,
                apply_username: item.apply_username,
                apply_realname: item.apply_realname,
                files: item.files,
                files_00: item.files_00,
                files_01: item.files_01,
                files_02: item.files_02,
                files_03: item.files_03,
                files_04: item.files_04,
                files_05: item.files_05,
                status: item.status,
              }
            }

          } catch (error) {
            console.log(error);
          }

        } catch (error) {
          console.log(error);
        }

      },
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
