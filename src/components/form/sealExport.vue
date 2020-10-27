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
              />
            </van-popup>

            <van-popup v-model="showEndPickerTime" round position="bottom">
              <van-datetime-picker
                type="date"
                @cancel="showEndPickerTime = false"
                @confirm="endDatefirm"
                title="选择结束日期"
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

            <van-goods-action>
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="导出"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

          </div>

          <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;" >加载中...</van-loading>

          <div style="height:100px;" ></div>
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
import * as query from '@/request/query';
import * as constant from '@/request/constant';
import * as workflow from '@/request/workflow';
import * as manageAPI from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';
import * as workconfig from '@/request/workconfig';
import { RadioGroup, Radio } from 'vant';

Vue.use(Radio);
Vue.use(RadioGroup);

export default {
    mixins: [window.mixin],
    data() {
        return {
            today: dayjs().format('YYYY-MM-DD'),
            showStartPickerTime: false,
            showEndPickerTime: false,
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().format('YYYY-MM-DD'),
            status:'全部',
            showStatusPicker:false
        }
    },

    methods: {
      async startDateConfirm(value){
        this.startDate = dayjs(value).format('YYYY-MM-DD');
        this.showStartPickerTime = false;
      },
      async endDatefirm(value){
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
        console.log(this.status)
        //显示加载状态
        this.loading = true;

        // 查询SQL
        // const queryURL = `${window.requestAPIConfig.restapi}/api/v1/hrmresource/id?_where=((lastname,like,%27~${hr_name}~%27)~or(loginid,like,%27~${hr_name}~%27))~and(status,ne,5)&_fields=id,lastname,loginid`;

      }
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
