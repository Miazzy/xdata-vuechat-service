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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>流程标题</span>
                    </a-col>
                    <a-col :span="8">
                       <a-input v-model="item.title" placeholder="请输入奖罚申请流程标题！" @blur="validFieldToast('title')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col v-show="item.serialid" :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>流程序号</span>
                    </a-col>
                    <a-col v-show="item.serialid" :span="8">
                       <a-input v-model="item.serialid" placeholder="" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>奖罚类别</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_type" readonly placeholder="请填写奖罚类别！" @blur="validFieldToast('reward_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.create_time" readonly placeholder="请输入申请时间！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.apply_realname" :readonly="!!item.apply_realname" placeholder="请输入申请人员姓名！" @blur="validFieldToast('apply_realname');" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属公司</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.company" placeholder="请输入申请人员所属公司！" @blur="validFieldToast('company')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属部门</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.department" placeholder="请输入申请人员所属部门！" @blur="validFieldToast('department')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
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

                <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>人力经理</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.hr_name" placeholder="请输入奖罚申请流程需要知会的人力职能人员！" @blur="validFieldToast('hr_name');queryNotifyMan();" @click="queryNotifyMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                    </a-col>
                    <a-col :span="9">
                      <div style="margin-left: 10px;">
                        <van-address-list v-show="userList.length > 0" v-model="item.hr_id" :list="userList" default-tag-text="默认" edit-disabled @select="selectNotifyUser();" />
                      </div>
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请奖金</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.amount"  placeholder="请输入本次奖罚申请的单项奖金总额！" @blur="validFieldToast('amount')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>发放周期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_release_period"  placeholder="请输入本次奖罚/激励申请的发放周期，注意是发放周期！" @blur="validFieldToast('reward_release_period')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属周期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_period"  placeholder="请输入本次奖罚/激励申请的所属周期，注意不是发放周期！" @blur="validFieldToast('reward_period')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>奖罚名称</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="item.reward_name" placeholder="请输入本次奖罚申请的奖罚名称！" @blur="validFieldToast('reward_name')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="height:auto;margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="height:auto;">
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>申请事由</span>
                    </a-col>
                    <a-col :span="20" style="height:auto;">
                      <a-textarea
                        v-model="item.content"
                        @blur="validFieldToast('content')"
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
                        v-model="item.remark"
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

                <div class="reward-apply-content-item reward-apply-content-title" style="margin-top: 35px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      分配信息
                    </a-col>
                   </a-row>
                </div>

                <div id="van-user-list" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="position:relative;">
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>分配人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="release_username" placeholder="请输入奖罚明细中的分配人员！" @blur="queryReleaseMan();" @click="queryReleaseMan();" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>分配金额</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="release_amount" placeholder="请输入奖罚明细中的奖罚金额！" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width: 320px; " />
                    </a-col>
                    <div style="position:absolute; right: 5px; top: -2px;">
                      <van-button name="file" @click="rewardRelease();"  >分配</van-button>
                    </div>
                  </a-row>
                  <a-row>
                    <a-col :span="3" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                    </a-col>
                    <a-col :span="9">
                      <div style="margin-left: 10px;">
                        <van-address-list v-show="release_userlist.length > 0" v-model="release_userid" :list="release_userlist" default-tag-text="默认" edit-disabled @select="selectReleaseUser();" />
                      </div>
                    </a-col>
                  </a-row>
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
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleApply();"  >
                        保存
                      </a-button>
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleApply();"  >
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
      pageName: "奖惩管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_reward_apply',
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
              reward_release_period: dayjs().format('YYYY年MM月'),
              hr_admin_ids: '',
              hr_admin_names: '',
              hr_id: '',
              hr_name: '',
              user_admin_name:'',
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
      userList:[],
      release_userid:'',
      release_username:'',
      release_amount:'',
      release_userlist:[],
      uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
      message: workconfig.compValidation.rewardapply.message,
      valid: workconfig.compValidation.rewardapply.valid,
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
      // 上传提示
      async toastUpload(flag){
      if(flag == 'start'){
        vant.Toast.loading({duration: 0, forbidClick: true, message: '上传中...',});
      } else if(flag == 'fail'){
        this.$toast.success('文件上传失败，请稍后重试！');
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
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
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
      validFieldToast(fieldName){
        const flag = !this.validField(fieldName);
        if(flag){
          this.$toast.fail(`${this.message[fieldName]}！` );
          return false;
        }
      },
      //用户选择知会人员
      async queryNotifyMan(){

        //获取盖章人信息
        const user_admin_name = this.item.hr_name;

        //如果
        if(!user_admin_name || user_admin_name.length < 1){
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
                  this.item.hr_name = user[0].lastname;
                  //当前盖印人编号
                  this.item.hr_id = this.userid = user[0].loginid;

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
                  this.userList.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.userList.length });

                  //获取盖印人姓名
                  this.item.hr_name = user.lastname;
                  //当前盖印人编号
                  this.item.hr_id = this.userid = user.loginid;
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
      //选中当前知会人员
      async selectNotifyUser(value){
        const user = this.userList.find((item,index) => {return this.item.hr_id == item.id});
        this.item.hr_name = user.name;
      },

      async queryReleaseMan(){

        //获取盖章人信息
        const user_admin_name = this.release_username;

        //如果
        if(!user_admin_name || user_admin_name.length < 1){
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
                    this.release_userlist.push({id:elem.loginid , name:elem.lastname , tel:'' , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })

                  //获取盖印人姓名
                  this.release_username = user[0].lastname;
                  //当前盖印人编号
                  this.release_userid = this.userid = user[0].loginid;

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
                  this.release_userlist.push({id:user.loginid , name:user.lastname , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.release_userlist.length });

                  //获取盖印人姓名
                  this.release_username = user.lastname;
                  //当前盖印人编号
                  this.release_userid = this.userid = user.loginid;
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.release_userlist = this.release_userlist.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.release_userlist.findIndex((subitem,index) => { return subitem.id == item.id });
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
      //选中当前知会人员
      async selectReleaseUser(value){
        const user = this.release_userlist.find((item,index) => {return this.release_userid == item.id});
        this.release_username = user.name;
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

        //查询直接所在工作组，注意此处是奖罚人力经理管理员
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

        //第三步 向HR推送，HR确认后
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${user_group_ids}/奖罚申请登记通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 序号:‘${value.serialid}’ 奖罚申请登记完毕，请确认！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        await this.handleSubmitWF(userinfo , '' , '' , 'zhaozy1028' , this.tablename , id , elem  , dayjs().format('YYYY-MM-DD HH:mm:ss'));

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;

      },

      // 提交自由流程
      async handleSubmitWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime) {

          //校验提交信息是否准确
          var checkFlag = workflow.checkSubmitInfo( wfUsers,  nfUsers, approver, );
          let vflag = await manageAPI.queryApprovalExist(curTableName, curItemID); //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
          let vflag_ = storage.getStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`);

          debugger;

          //如果校验标识有误，则直接返回
          if ( tools.isNull(approver) || !checkFlag || vflag || vflag_ == "true") {
              debugger;
              return !checkFlag ? null : vant.Toast.fail("已提交过申请，无法再次提交审批！"); //数据库中已经存在此记录，提示用户无法提交审批
          }

          debugger;

          //是否确认提交此自由流程?
          this.$confirm({
              title: "确认操作",
              content: "是否确认提交此自由流程?",
              onOk: async() => {
                await this.handleStartWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime);
              }
          });
      },

      // 启动自由流程
      async handleStartWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime){

        try {
          //自由流程节点
           var node = {
               id: tools.queryUniqueID(),
               create_by: userinfo["username"],
               create_time: ctime,
               table_name: curTableName,
               main_key: curItemID,
               audit_node: tools.deNull(wfUsers),
               approve_node: tools.deNull(approver),
               notify_node: tools.deNull(nfUsers)
           };

           const freeWFNode = JSON.parse(JSON.stringify(node));

           //提交发起人审批相关处理信息
           node = {
               id: tools.queryUniqueID(), //获取随机数
               table_name: curTableName, //业务表名
               main_value: curItemID, //表主键值
               business_data_id: curItemID, //业务具体数据主键值
               business_code: "000000000", //业务编号
               process_name: "自由流程审批", //流程名称
               employee: userinfo["username"],
               process_station: "自由流程审批",
               process_audit: "000000000",
               proponents: userinfo["username"],
               approve_user: userinfo["username"],
               action: "发起",
               action_opinion: "发起自由流程",
               content: data["content"],
               operate_time: ctime,
               create_time: ctime,
               business_data: JSON.stringify(freeWFNode)
           };

           //发起节点，审批信息，写入审批历史表中
           const startFreeNode = JSON.parse(JSON.stringify(node));

           //获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
           var firstWflowUser = tools.deNull(wfUsers) == "" ?  tools.deNull(approver) : tools.deNull(wfUsers).split(",")[0];

           //提交审批相关处理信息
           node = {
               id: tools.queryUniqueID(), //获取随机数
               table_name: curTableName, //业务表名
               main_value: curItemID, //表主键值
               business_data_id: curItemID, //业务具体数据主键值
               business_code: "000000000", //业务编号
               process_name: "自由流程审批", //流程名称
               employee: firstWflowUser,
               process_station: "自由流程审批",
               process_audit: "000000000",
               proponents: userinfo["username"],
               content: data["content"],
               operate_time: ctime,
               create_time: ctime,
               business_data: JSON.stringify(node)
           };

           //保存审批相关处理信息
           const nextWflowNode = JSON.parse(JSON.stringify(node));

           //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
           if (await manageAPI.queryApprovalExist(curTableName,  curItemID)) {
             return vant.Toast.fail("已提交过申请，无法再次提交审批！");
           }

           //处理自由流程发起提交审批操作
           await workflow.postWorkflowFree(userinfo, curTableName, data, freeWFNode, startFreeNode, nextWflowNode, "2");
           //弹出审批完成提示框
           vant.Toast.success("提交自由流程审批成功！");
           //记录当前流程已经提交，短时间内无法再次提交
           storage.setStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`,  "true", 60 );
           //操作完毕，返回结果
           return true;
        } catch (error) {
            console.log(error);
        }
      },
      rewardRelease(){
        if(!this.release_username || !this.release_userid){
          this.$toast.fail('请输入奖惩明细的分配人员，并选择！');
        }
      },
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
    @import "../../assets/css/reward.apply.css";
</style>
