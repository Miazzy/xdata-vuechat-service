<template>
  <div id="reward-home">
      <div style="background-color:#f0f0f0;">
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

            <!-- 奖罚申请 -->
            <div style="background-color:#f0f0f0;">

              <div class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 5rem; margin-right: 5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  奖罚申请流程
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      基础信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span  >流程标题</span>
                    </a-col>
                    <a-col :span="8">
                       <a-input v-model="item.title" placeholder="请输入奖罚申请流程标题！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col v-show="item.serialid" :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span  >流程序号</span>
                    </a-col>
                    <a-col v-show="item.serialid" :span="8">
                       <a-input v-model="item.serialid" placeholder="" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      奖罚类别
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" placeholder="请填写奖罚类别！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      申请时间
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" placeholder="请输入申请时间！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      人员信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      申请人员
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.apply_realname" placeholder="请输入申请人员姓名！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      所属公司
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.company" placeholder="请输入申请人员所属公司！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      所属部门
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.department" placeholder="请输入申请人员所属部门！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      知会信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      人力经理
                    </a-col>
                    <a-col :span="8">
                      <a-input placeholder="请输入奖罚申请流程需要知会的人力职能人员！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      奖罚信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      申请奖金
                    </a-col>
                    <a-col :span="8">
                      <a-input placeholder="请输入本次奖罚申请的单项奖金总额！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      所属周期
                    </a-col>
                    <a-col :span="8">
                      <a-input placeholder="请输入本次奖罚/激励申请的所属周期，注意不是发放周期！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      奖罚名称
                    </a-col>
                    <a-col :span="8">
                      <a-input placeholder="请输入本次奖罚申请的奖罚名称！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="height:auto;margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="height:auto;">
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      申请事由
                    </a-col>
                    <a-col :span="20" style="height:auto;">
                      <a-textarea
                        placeholder="请输入奖罚申请流程的申请事由！"
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:120px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      备注信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      备注说明
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        placeholder="请输入奖罚申请流程的申请事由！"
                        :auto-size="{ minRows: 10, maxRows: 50 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      附件信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="position:relative; margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <van-cell-group style="margin-left:5rem;width:45%;" >
                    <van-icon name="add-o" style="position:absolute;top:0px;right:0px;z-index:100;" @click="size <= 6 ? size++ : size;"/>
                    <van-icon name="circle" style="position:absolute;top:45px;right:0px;z-index:100;" @click="size > 0 ? size-- : size;"  />

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
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      奖惩明细
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="">
                  <a-row style="border-top: 1px dash #f0f0f0;margin:0px 5rem;" >
                    <a-table :columns="columns" :data-source="data">
                    </a-table>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">

                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" >
                        保存
                      </a-button>
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;" >
                        提交
                      </a-button>
                    </a-col>
                    <a-col :span="8">

                    </a-col>
                   </a-row>
                </div>

                <div style="height:100px;">

                </div>


              </div>

            </div>

          </a-col>
        </keep-alive>

      </a-row>
    </div>
  </div>
</template>
<script>
import * as storage from "@/request/storage";
import * as tools from "@/request/tools";
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  data() {
    return {
      pageName: "奖惩管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      size: 0,
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
      columns: workconfig.columns.reward.items,
      data: [
        {
          key: '1',
          type: '当前分配',
          period: '2020年10月',
          username: '张晓明',
          account: 'zhangxm0101',
          company: '领地集团',
          department: '人力行政中心',
          position:'软件工程师',
          amount:'400.00',
        },
      ],
      tablename:'bs_reward_apply',
      readonly: false,
      goodstype: workconfig.goodstype,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    //上传提示
    async toastUpload(flag){
      if(flag == 'start'){
        vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
      } else if(flag == 'fail'){
        this.$toast.success('文件上传失败，请稍后重试！');
      }
    },
    //上传文件成功后回调函数
      async uploadSuccess(file , res){
        vant.Toast.clear();
        this.item.files = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_00(file , res){
        vant.Toast.clear();
        this.item.files_00 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_01(file , res){
        vant.Toast.clear();
        this.item.files_01 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_02(file , res){
        vant.Toast.clear();
        this.item.files_02 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_03(file , res){
        vant.Toast.clear();
        this.item.files_03 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_04(file , res){
        vant.Toast.clear();
        this.item.files_04 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
      },
      //上传文件成功后回调函数
      async uploadSuccess_05(file , res){
        vant.Toast.clear();
        this.item.files_05 = JSON.parse(res).message;
        await tools.sleep(0);
        this.$toast.success('上传成功');
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
          //查询当前是否微信端
          this.iswechat = tools.isWechat();

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
            //查询奖惩类型
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
          process_name   : '奖惩流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '发起'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '发起奖惩申请[待处理]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '奖惩审批[奖罚申请]',//varchar(100)  null comment '流程岗位',
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
          process_name   : '奖惩流程审批',//varchar(100)  null comment '流程名称',
          employee       : front_name ,//varchar(1000) null comment '操作职员',
          approve_user   : front ,//varchar(100)  null comment '审批人员',
          action         : ''    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批奖惩申请',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : '前台',//varchar(100)  null comment '职能岗位',
          process_station   : '奖惩审批[奖罚申请]',//varchar(100)  null comment '流程岗位',
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
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
