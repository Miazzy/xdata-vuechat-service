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
                <van-field clearable label="日期" v-model="item.createtime" placeholder="请输入入职登记日期" readonly />
                <!-- 员工姓名（HR需要确认/修改） -->
                <van-field required clearable label="员工姓名" v-model="item.username"  placeholder="请填写您的姓名！" @blur="validField('username')" :error-message="message.username"  />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field required clearable label="入职岗位" v-model="item.create_time" placeholder="请输入入职岗位！" @blur="validField('create_time')" :error-message="message.create_time"/>
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-uploader style="margin:0px 0.0rem 0px 1.0rem;" v-model="item.picture" multiple :after-read="afterRead" accept="*/*" preview-size="6.3rem" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="资产配置" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 办公电脑（系统自动生成） -->
                <van-field required clearable label="电脑配置" v-model="item.computer" placeholder="是否需要配置电脑?" />
                <!-- 办公座椅（HR需要确认/修改） -->
                <van-field required clearable label="办公桌椅" v-model="item.username"  placeholder="是否需要配置办公座椅?" />
                <!-- 办公抽屉（HR需要确认/修改） -->
                <van-field required clearable label="办公抽屉" v-model="item.create_time" placeholder="是否需要配置办公抽屉?" />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field required clearable label="其他配置" v-model="item.other_equip" rows="3" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公配置要求！" show-word-limit />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="办公用品" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 笔记簿/本（HR需要确认/修改） -->
                <van-field required clearable label="笔记簿/本" v-model="item.notebook" placeholder="是否需要配置笔记簿/本?" />
                <!-- 入职手册（HR需要确认/修改） -->
                <van-field required clearable label="入职手册" v-model="item.manual"  placeholder="是否需要配置入职手册?" />
                <!-- 签字笔/擦（HR需要确认/修改） -->
                <van-field required clearable label="签字笔/擦" v-model="item.writingtools" placeholder="是否需要配置签字笔/擦?" />
                <!-- 员工工牌（HR需要确认/修改） -->
                <van-field required clearable label="员工工牌" v-model="item.badge" placeholder="是否需要配置员工工牌?" />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field required clearable label="其他用品" v-model="item.othertools" rows="3" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公用品要求！" show-word-limit />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="办公用品" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 笔记簿/本（HR需要确认/修改） -->
                <van-field required clearable label="笔记簿/本" v-model="item.notebook" placeholder="是否需要配置笔记簿/本?" />
                <!-- 入职手册（HR需要确认/修改） -->
                <van-field required clearable label="入职手册" v-model="item.manual"  placeholder="是否需要配置入职手册?" />
                <!-- 签字笔/擦（HR需要确认/修改） -->
                <van-field required clearable label="签字笔/擦" v-model="item.writingtools" placeholder="是否需要配置签字笔/擦?" />
                <!-- 员工工牌（HR需要确认/修改） -->
                <van-field required clearable label="员工工牌" v-model="item.badge" placeholder="是否需要配置员工工牌?" />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field required clearable label="其他用品" v-model="item.othertools" rows="3" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公用品要求！" show-word-limit />
              </van-cell-group>

            </van-form>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-goods-action  v-show=" tag.showPicker == false && tag.showPickerSealType == false && tag.showPickerOrderType == false && status == '' ">
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
            message: workconfig.compValidation.seal.message,
            valid: workconfig.compValidation.seal.valid,
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
              filename:'',
              count:'',
              dealDepart:'',
              dealManager:'',
              dealMail:'',
              username:'',
              approveType:'',
              contractId:'',
              signman:'',
              workno:'',
              sealtime:'',
              sealman: '',
              sealtype: '',
              ordertype:'',
              mobile:'',
              send_mobile:'',
              send_location:'',
              seal:'',     //用印管理员成员组
              front:'',    //用印前台接受组
              archive: '', //用印归档组(财务/档案)
              prefix: '',  //编号前缀
              name: '',    //流程组名，即Group_XX
              confirmStatus: '',//财务确认/档案确认
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
              showPickerSealType:false,
              showPickerOrderType:false,
            },
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            fileList: [],
            readonly: false,
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
        //邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName == 'dealMail'){
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

      sealTypeConfirm(value) {
        this.item.sealtype = value;
        this.tag.showPickerSealType = false;
        this.validField('sealtype');
      },

      async queryInfo(){

        try {
          this.item.sealman = tools.getUrlParam('sealman');
        } catch (error) {
          console.log(error);
        }

      },

      async handleConfirm(){


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
