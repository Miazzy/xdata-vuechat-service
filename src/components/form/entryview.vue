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
                <van-field :readonly="readonly" clearable label="员工姓名" v-model="item.username"  placeholder="请填写您的姓名！" @blur="validField('username')" :error-message="message.username"  />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="入职岗位" v-model="item.position" placeholder="请输入入职岗位！" @blur="validField('position')" :error-message="message.position"/>
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="入职日期" v-model="item.join_time" placeholder="请输入入职日期！" @blur="validField('join_time')" :error-message="message.join_time" />
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
                <van-field :readonly="readonly" clearable label="电脑配置" v-model="item.computer" placeholder="是否需要配置电脑?" @click="tag.showPickerCommon = true ; currentKey = 'computer'; " />
                <!-- 办公座椅（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="办公桌椅" v-model="item.seat"  placeholder="是否需要配置办公座椅?" @click="tag.showPickerCommon = true ; currentKey = 'username'; " />
                <!-- 办公抽屉（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="办公抽屉" v-model="item.drawer" placeholder="是否需要配置办公抽屉?" @click="tag.showPickerCommon = true ; currentKey = 'drawer'; " />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="其他配置" v-model="item.other_equip" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公配置要求！" />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="办公用品" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 笔记簿/本（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="笔记簿/本" v-model="item.notebook" placeholder="是否需要配置笔记簿/本?"  @click="tag.showPickerCommon = true ; currentKey = 'notebook'; " />
                <!-- 入职手册（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="入职手册" v-model="item.manual"  placeholder="是否需要配置入职手册?" @click="tag.showPickerCommon = true ; currentKey = 'manual'; " />
                <!-- 签字笔/擦（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="签字笔/擦" v-model="item.writingtools" placeholder="是否需要配置签字笔/擦?" @click="tag.showPickerCommon = true ; currentKey = 'writingtools'; " />
                <!-- 员工工牌（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="员工工牌" v-model="item.badge" placeholder="是否需要配置员工工牌?" @click="tag.showPickerCommon = true ; currentKey = 'badge'; " />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="其他用品" v-model="item.othertools" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公用品要求！" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="证件信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 行驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="行驶证号" v-model="item.driving_license" placeholder="请输入您的行驶证编号！" v-show="!!item.driving_license" />
                <!-- 驾驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="驾驶证号" v-model="item.driver_license"  placeholder="请输入您的驾驶证编号！" v-show="!!item.driver_license" />
                <!-- 身份证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="身份证号" v-model="item.idcard" placeholder="请输入您的身份证编号！" @blur="validField('idcard');" :error-message="message.idcard" />
                <!-- 学历编号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="学历编号" v-model="item.diploma" placeholder="请输入您的学历证书编号！" @blur="validField('diploma');" :error-message="message.diploma" />
                <!-- 学位编号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="学位编号" v-model="item.bachelor" placeholder="请输入您的学位证书编号！" @blur="validField('bachelor');" :error-message="message.bachelor" />
                <!-- 银行卡号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="银行卡号" v-model="item.bank_card" placeholder="请输入您的工资卡对应银行卡号！" @blur="validField('bank_card');" :error-message="message.bank_card" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="对接信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field required clearable label="前台员工" v-model="item.front_name" placeholder="请输入前台人员，以进行办公用品准备！" @blur="validField('hr_name');" :error-message="message.hr_name"/>
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field required clearable label="行政员工" v-model="item.admin_name" placeholder="请输入资产管理的行政人员，以进行确认！" @blur="validField('hr_name');" :error-message="message.hr_name"/>
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field required clearable label="食堂员工" v-model="item.meal_name" placeholder="请输入食堂管理的工作人员，以进行饭卡及餐补预算准备！" @blur="validField('hr_name');" :error-message="message.hr_name"/>
              </van-cell-group>

            </van-form>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-goods-action  v-show=" status == '待确认' && role == 'hr' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="确认"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
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
            role:'',
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
            readonly: true,
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

          //获取用户编号
          this.item.id = tools.getUrlParam('id');
          this.role = tools.getUrlParam('role');

          //根据编号查询用户登记数据
          const value = await query.queryTableData(`bs_entry_job` , this.item.id);

          //设置表单状态
          this.status = value.status;

          this.item = {
            id: value.id,
            create_time: dayjs(value.create_time).format('YYYY-MM-DD'),
            create_by: value.create_by,
            username: value.username,
            position: value.position,    //入职岗位
            picture: value.picture,     //员工照片
            computer: value.computer,  //是否需要电脑配置
            seat: value.seat,      //是否需要办公座椅
            drawer: value.drawer,    //是否需要办公抽屉drawer
            other_equip: value.other_equip,//是否需要其他办公配置
            notebook: value.notebook,  //是否需要笔记本子
            manual: value.manual,    //是否需要入职手册
            writingtools: value.writingtools,//是否需要签字笔/擦
            badge: value.badge,     //员工工牌
            othertools: value.othertools,//其他用品
            driving_license: value.driving_license,//行驶证
            driver_license: value.driver_license,//驾驶证
            idcard: value.idcard,    //身份证号
            diploma: value.diploma,   //学历编号
            bachelor: value.bachelor,  //学位编号
            bank_card: value.bank_card, //工资银行卡号
            join_time: dayjs(value.join_time).format('YYYY-MM-DD'), //入职时间
            hr_name: value.hr_name,   //对接HR
            remark: value.remark,    //备注信息
            front_name: value.front_account,
            admin_name: value.admin_account,
            meal_name: value.meal_account,
            status: '待确认',
          }

        } catch (error) {
          console.log(error);
        }

      },
      // 查询用户信息
      async queryUserInfo(name , queryURL = '', resp = '', front = {id:''}){
        // 查询前台人员SQL
        queryURL = `${window.requestAPIConfig.restapi}/api/v1/hrmresource/id?_where=(lastname,eq,%27${name}%27)&_fields=id,lastname,loginid`;

        // 预处理 检查HR名字是否存在，如果不存在直接返回，检查填写内容是否正确，如果不正确，则直接返回，并提升错误信息
        resp = await superagent.get(queryURL).set('accept', 'json');

        // 如果没有获取到返回信息，说明填写的HR姓名有误，如果有获取到HR的返回信息，则执行转换
        if(resp && resp.body && resp.body.length > 0){
          front = resp.body.length > 1 ? {id:resp.body.map(obj => {return obj.id}).join(',')} : resp.body[0];
        }

        // 返回查询结果
        return front;
      },
      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //系统编号
        const id = tools.getUrlParam('id');

        //获取相应对接人员信息
        const front_name = this.item.front_name;
        const admin_name = this.item.admin_name;
        const meal_name = this.item.meal_name;

        //获取相应对接人员OA账号
        let front , admin , meal , queryURL , resp;

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/entryview?id=${id}&statustype=none&role=`);

        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //修改状态为已确认
        await manageAPI.patchTableData(`bs_entry_job` , id , { id , status:'已确认' , hr_time: time , front_account: front_name , admin_account: admin_name , meal_account: meal_name });

        //检查行政/前台/食堂人员是否存在，如果存在，则向对应用户发送通知
        front = await this.queryUserInfo(front_name);
        admin = await this.queryUserInfo(admin_name);
        meal = await this.queryUserInfo(meal_name);

        if(front && admin && meal){
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${front.id}/入职登记通知：员工‘${this.item.username}’入职登记完毕，请前台确认，并准备好相应的入职办公用品！?rurl=${receiveURL}front`)
                .set('accept', 'json');
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${admin.id}/入职登记通知：员工‘${this.item.username}’入职登记完毕，请行政确认，并准备好相应的入职资产配置！?rurl=${receiveURL}admin`)
                .set('accept', 'json');
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${meal.id}/入职登记通知：员工‘${this.item.username}’入职登记完毕，请食堂确认，并准备好相应的饭卡及餐补配额！?rurl=${receiveURL}meal`)
                .set('accept', 'json');
        } else if(!front){
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '异常提示',
            message: '前台的姓名填写有误，未获取到相应信息，请修改后重试！',
          });
          return ;
        } else if(!admin){
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '异常提示',
            message: '行政的姓名填写有误，未获取到相应信息，请修改后重试！',
          });
          return ;
        } else if(!meal){
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '异常提示',
            message: '食堂的姓名填写有误，未获取到相应信息，请修改后重试！',
          });
          return ;
        }

        //设置状态
        this.loading = false;
        this.status = '已确认';
        this.readonly = true;

        //未获取到HR信息
        await vant.Dialog.alert({
          title: '温馨提示',
          message: '已将入职登记通知推送至前台、行政、食堂等相关人员！',
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
