<template>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header">
      <div class="center" style="position:relative;">
        <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
        <span>用印导出</span>
      </div>
    </header>

    <section>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;margin-left:10px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">
          <van-cell-group>
            <van-form >
              <van-cell-group style="margin-top:10px;">
                <van-field clearable label="选择开始日期" v-model="startDate" @click="popPickerTime(1)" placeholder="请选择开始日期" readonly />
                <van-field clearable label="选择结束日期" v-model="endDate" @click="popPickerTime(2)" placeholder="请选择结束日期" readonly />
              </van-cell-group>
            </van-form>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-popup v-model="showStartPickerTime" round position="bottom">
              <van-datetime-picker
                type="date"
                @cancel="showStartPickerTime = false"
                @confirm="startDateConfirm"
                title="选择开始日期"
                :min-date="minDate"
                :max-date="maxDate"
              />
            </van-popup>

            <van-popup v-model="showEndPickerTime" round position="bottom">
              <van-datetime-picker
                type="date"
                @cancel="showEndPickerTime = false"
                @confirm="endDateConfirm"
                title="选择结束日期"
                :min-date="minDate"
                :max-date="maxDate"
              />
            </van-popup>

            <van-radio-group v-model="status">
              <van-radio name="全部" icon-size="18px">全部</van-radio>
              <van-radio name="待用印" icon-size="18px">待用印</van-radio>
              <van-radio name="已用印" icon-size="18px">已用印</van-radio>
              <van-radio name="已领取" icon-size="18px">已领取</van-radio>
              <van-radio name="已移交" icon-size="18px">已移交</van-radio>
              <van-radio name="已归档" icon-size="18px">已归档</van-radio>
            </van-radio-group>

            <download-excel
                class = "export-excel-wrapper"
                :fetch = "handleConfirm"
                :fields = "exportFields"
                name = "用印导出.xls">
                <van-goods-action>
                  <van-goods-action-button id="informed_confirm" type="danger" :disabled="disabled" native-type="submit" text="导出"  style="border-radius: 10px 10px 10px 10px;" />
                </van-goods-action>
            </download-excel>
          </div>
          <div style="height:100px;" ></div>
        </div>
      </div>

    </section>
  </div>
</template>
<script>

import * as announce from '@/request/announce';
import * as query from '@/request/query';
import * as workflow from '@/request/workflow';
import * as manage from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';

Vue.component('downloadExcel', JsonExcel)

export default {
    mixins: [window.mixin],
    data() {
        return {
            today: dayjs().format('YYYY-MM-DD'),
            showStartPickerTime: false,
            showEndPickerTime: false,
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().format('YYYY-MM-DD'),
            minDate: new Date(2020, 2, 1),
            maxDate: new Date(2025, 2, 1),
            status:'全部',
            showStatusPicker:false,
            disabled:false,
            exportData:[],
            exportFields : {
              "序列号":"serialid",
              "所属系统":"approve_type",
              "申请人":"create_by",
              "创建日期":"create_time",
              "文件名称":"filename",
              "文件份数":"count",
              "经办部门":"deal_depart",
              "经办人员":"deal_manager",
              "盖印时间":"seal_time",
              "盖印人员":"seal_man",
              "合同编号":"contract_id",
              "文件签收":"sign_man",
              "流程编号":"workno",
              "用印类型":"seal_type",
              "用印状态":"status",
              "印章编号":"no",
              "审批说明":"message",
              "所属公司":"company",
              "领取时间":"receive_time"
            }
        }
    },

    methods: {
      async startDateConfirm(value){
        this.startDate = dayjs(value).format('YYYY-MM-DD');
        this.showStartPickerTime = false;
      },
      async endDateConfirm(value){
        this.endDate = dayjs(value).format('YYYY-MM-DD');
        this.showEndPickerTime = false;
      },
      async popPickerTime(value){
        if(value == 1){
          this.showStartPickerTime = true;
        }
        if(value == 2){
          this.showEndPickerTime = true;
        }
      },

      async handleConfirm() {
        if (this.disabled) {
          return;
        }
        //按钮置灰
        this.disabled = true;
        const userinfo = await Betools.storage.getStore('system_userinfo');
        let sqlWhere = '_where=(create_time,gt,'+ this.startDate + ')~and(create_time,lt,'+ dayjs(this.endDate).add(1, 'day').format('YYYY-MM-DD') + ')';
        switch (this.status) {
          case '全部':
            break;
          case '已归档':
            sqlWhere += '~and(status,like,~归档~)'
            break;
          default:
            sqlWhere += '~and(status,eq,'+ this.status + ')'
            break;
        }
        // if (!(this.status == '全部')) {
        //   sqlWhere += '~and(status,eq,'+ this.status + ')'
        // }
        //权限
        if (!(this.status == '已归档')) {
          sqlWhere += '~and(seal_group_ids,like,~'+ userinfo.username + '~)'
        }
        const value = await query.queryTableDataByWhereSQL(`bs_seal_regist`, sqlWhere);
        if(value.length > 0) {
          value.map((item , index) => {
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
            item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
          })
        }else {
          vant.Dialog.alert({
            message: "没有查询到需要导出的数据！"
        });
        }
        this.exportData = value;
        this.disabled = false;
        return value;
      },

    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealinfo.css";
    @import "../../assets/css/entryjob.global.css";
</style>
