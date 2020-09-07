<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header">
        <div class="center">
            <span>入职管理</span>
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">入职登记表</van-col>
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

                <!-- 登记日期（系统自动生成） -->
                <van-field clearable label="填报日期" v-model="item.create_time" placeholder="请输入入职登记日期" readonly />
                <!-- 员工姓名（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="员工姓名" v-model="item.username"  placeholder="请填写您的姓名！" @blur="validField('username')" :error-message="message.username"  />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="入职岗位" v-model="item.position" placeholder="请输入入职岗位！" @blur="validField('position')" :error-message="message.position"/>
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="入职日期" v-model="item.join_time" placeholder="请输入入职日期！" @blur="validField('join_time')" :error-message="message.join_time" @click="tag.showPickerJoinTime = true ; "/>
                 <!-- 员工岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="对接HR" v-model="item.hr_name" placeholder="请输入与您对接的HR姓名！" @blur="validField('hr_name');" :error-message="message.hr_name"/>
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-uploader style="margin:0px 0.0rem 0px 1.0rem;" v-model="item.picture" multiple :after-read="afterRead" accept="*/*" preview-size="6.3rem" />

                <van-popup v-model="tag.showPickerJoinTime" round position="bottom">
                  <van-datetime-picker
                    type="date"
                    @cancel="tag.showPickerJoinTime = false"
                    @confirm="joinTimeConfirm"
                    :min-date="new Date()"
                    title="选择日期"
                  />
                </van-popup>

                <van-popup v-model="tag.showPickerCommon" round position="bottom">
                  <van-picker
                    show-toolbar
                    :columns="commonTypeColumns"
                    @cancel="tag.showPickerCommon = false"
                    @confirm="commonTypeConfirm"
                  />
                </van-popup>

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="资产配置" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 办公电脑（系统自动生成） -->
                <van-field :readonly="readonly" required clickable clearable label="电脑配置" v-model="item.computer" placeholder="是否需要配置电脑?" @click="tag.showPickerCommon = true ; currentKey = 'computer'; " />
                <!-- 办公座椅（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="办公桌椅" v-model="item.seat"  placeholder="是否需要配置办公座椅?" @click="tag.showPickerCommon = true ; currentKey = 'username'; " />
                <!-- 办公抽屉（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="办公抽屉" v-model="item.drawer" placeholder="是否需要配置办公抽屉?" @click="tag.showPickerCommon = true ; currentKey = 'drawer'; " />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="其他配置" v-model="item.other_equip" rows="2" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公配置要求！" show-word-limit />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="办公用品" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 笔记簿/本（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="笔记簿/本" v-model="item.notebook" placeholder="是否需要配置笔记簿/本?"  @click="tag.showPickerCommon = true ; currentKey = 'notebook'; " />
                <!-- 入职手册（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="入职手册" v-model="item.manual"  placeholder="是否需要配置入职手册?" @click="tag.showPickerCommon = true ; currentKey = 'manual'; " />
                <!-- 签字笔/擦（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="签字笔/擦" v-model="item.writingtools" placeholder="是否需要配置签字笔/擦?" @click="tag.showPickerCommon = true ; currentKey = 'writingtools'; " />
                <!-- 员工工牌（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="员工工牌" v-model="item.badge" placeholder="是否需要配置员工工牌?" @click="tag.showPickerCommon = true ; currentKey = 'badge'; " />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="其他用品" v-model="item.othertools" rows="2" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公用品要求！" show-word-limit />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="证件信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 行驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="行驶证号" v-model="item.driving_license" placeholder="请输入您的行驶证编号！" />
                <!-- 驾驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="驾驶证号" v-model="item.driver_license"  placeholder="请输入您的驾驶证编号！" />
                <!-- 身份证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="身份证号" v-model="item.idcard" placeholder="请输入您的身份证编号！" @blur="validField('idcard');" :error-message="message.idcard" />
                <!-- 学历编号（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="学历编号" v-model="item.diploma" placeholder="请输入您的学历证书编号！" @blur="validField('diploma');" :error-message="message.diploma" />
                <!-- 学位编号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" required clearable label="学位编号" v-model="item.bachelor" placeholder="请输入您的学位证书编号！" @blur="validField('bachelor');" :error-message="message.bachelor" />
                <!-- 银行卡号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" required clearable label="银行卡号" v-model="item.bank_card" placeholder="请输入您的工资卡对应银行卡号！" @blur="validField('bank_card');" :error-message="message.bank_card" />
              </van-cell-group>

            </van-form>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-goods-action  v-show=" tag.showPickerCommon == false && tag.showPickerJoinTime == false && status == '' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="提交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
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
            title:'入职登记表',
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
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              username:'',
              position:'',    //入职岗位
              picture:'',     //员工照片
              computer:'是',  //是否需要电脑配置
              seat:'是',      //是否需要办公座椅
              drawer:'是',    //是否需要办公抽屉drawer
              other_equip:'暂无',//是否需要其他办公配置
              notebook:'是',  //是否需要笔记本子
              manual:'是',    //是否需要入职手册
              writingtools:'是',//是否需要签字笔/擦
              badge:'是',     //员工工牌
              othertools:'暂无',//其他用品
              driving_license:'',//行驶证
              driver_license:'',//驾驶证
              idcard:'',    //身份证号
              diploma:'',   //学历编号
              bachelor:'',  //学位编号
              bank_card:'', //工资银行卡号
              join_time: dayjs().format('YYYY-MM-DD'), //入职时间
              hr_name:'',   //对接HR
              remark:'',    //备注信息
              prefix: '',   //编号前缀
              name: '',     //流程组名，即Group_XX
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
            },
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            fileList: [],
            currentKey:'',
            readonly: false,
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
      validField(fieldName){
        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

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
      joinTimeConfirm(value){
        this.item.join_time = dayjs(value).format('YYYY-MM-DD');
        this.tag.showPickerJoinTime = false;
        this.validField('join_time');
      },
      // 选择是否
      commonTypeConfirm(value){
        this.item[this.currentKey] = value;
        this.tag.showPickerCommon = false;
        this.validField(value);
      },
      // 获取URL或者二维码信息
      async queryInfo() {

        try {
          this.item.sealman = tools.getUrlParam('sealman');
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
        const queryURL = `${window.requestAPIConfig.restapi}/api/v1/hrmresource/id?_where=(lastname,eq,%27${hr_name}%27)&_fields=id,lastname,loginid`;

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
            message: '未获取到HR对应姓名的相关信息，请检查修改后重试！',
          });
          return ;
        }

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          create_time: dayjs().format('YYYY-MM-DD'),
          create_by: this.item.username,
          username: this.item.username,
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
          diploma: this.item.diploma,   //学历编号
          bachelor: this.item.bachelor,  //学位编号
          bank_card: this.item.bank_card, //工资银行卡号
          join_time: this.item.join_time, //入职时间
          hr_name: hr_name,   //对接HR
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
            message: '已经向HR推送入职登记信息！',
          });

      }
    }
}
</script>
<style>
  .van-field__label {
      -webkit-box-flex: 0;
      -webkit-flex: none;
      flex: none;
      box-sizing: border-box;
      width: 30%;
      margin-right: 12px;
      color: #646566;
      text-align: left;
      word-wrap: break-word;
      font-size: 0.92rem;
  }
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealinfo.css";
</style>
