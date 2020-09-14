<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center">
            <span>入职管理</span>
        </div>
    </header>

    <section v-if="iswechat" >

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
                <van-field :readonly="readonly" clearable label="车牌编号" v-model="item.carno" placeholder="请输入您的车牌编号！" v-show="!!item.carno" />
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
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field readonly clearable label="对接HR" v-model="item.hr_name" placeholder="请输入与您对接的HR姓名！" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="huserList.length > 0 && role == 'hr' " v-model="item.hr_id" :list="huserList" default-tag-text="默认" edit-disabled @select="selectHRUser()" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field :readonly="role != 'hr'" :required="role == 'hr'" clearable label="对接行政" v-model="item.admin_name" placeholder="请输入与您对接的行政人员姓名！" @blur="queryAdminMan();"  @click="queryAdminMan();" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="auserList.length > 0 && role == 'hr' " v-model="item.admin_id" :list="auserList" default-tag-text="默认" edit-disabled @select="selectAdminUser()" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field :readonly="role != 'hr'" :required="role == 'hr'" clearable label="对接前台" v-model="item.front_name" placeholder="请输入与您对接的前台人员姓名！" @blur="queryFrontMan();"  @click="queryFrontMan();" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="fuserList.length > 0 && role == 'hr' " v-model="item.front_id" :list="fuserList" default-tag-text="默认" edit-disabled @select="selectFrontUser()" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field :readonly="role != 'hr'" :required="role == 'hr'" clearable label="对接食堂" v-model="item.meal_name" placeholder="请输入与您对接的食堂人员姓名！" @blur="queryMealMan();"  @click="queryMealMan();" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="muserList.length > 0 && role == 'hr' " v-model="item.meal_id" :list="muserList" default-tag-text="默认" edit-disabled @select="selectMealUser()" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="item.front_time || item.admin_time || item.meal_time ">
                <van-cell value="流程信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field readonly clearable label="前台确认时间" v-model="item.front_time" placeholder="前台确认时间" v-show="!!item.front_time" />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field readonly clearable label="行政确认时间" v-model="item.admin_time" placeholder="行政确认时间" v-show="!!item.admin_time" />
                <!-- 员工岗位（HR需要确认/修改） -->
                <van-field readonly clearable label="食堂确认时间" v-model="item.meal_time" placeholder="食堂确认时间" v-show="!!item.meal_time" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="附件上传" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-cell v-if="item.files_gp" title="工牌寸照" class="van-cell-upload" :label="item.files_gp.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadGP"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_xs" title="行驶证附件" class="van-cell-upload" :label="item.files_xs.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadXS"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_js" title="驾驶证附件" class="van-cell-upload" :label="item.files_js.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadJS"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_id" title="身份证附件" class="van-cell-upload" :label="item.files_id.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadID"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_bk" title="银行卡照片" class="van-cell-upload" :label="item.files_bk.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBK"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_by" title="毕业证附件" class="van-cell-upload" :label="item.files_by.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBY"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_xw" title="学位证附件" class="van-cell-upload" :label="item.files_xw.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBY"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_ssby" title="毕业证附件(硕士)" class="van-cell-upload" :label="item.files_ssby.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBY"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_ssxw" title="学位证附件(硕士)" class="van-cell-upload" :label="item.files_ssxw.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBY"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_bsby" title="毕业证附件(博士)" class="van-cell-upload" :label="item.files_bsby.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBY"  >下载</van-button>
                  </template>
                </van-cell>

                <van-cell v-if="item.files_bsxw" title="学位证附件(博士)" class="van-cell-upload" :label="item.files_bsxw.slice(0,30)">
                  <template #right-icon>
                    <van-button name="file" :url="uploadURL" @click="downloadBY"  >下载</van-button>
                  </template>
                </van-cell>

              </van-cell-group>

            </van-form>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-goods-action  v-show=" status == '待确认' && role == 'hr' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="确认"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-show=" status == '已确认' && role == 'front' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="前台确认"  @click="handleFrontConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-show=" status == '已确认' && role == 'admin' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="行政确认"  @click="handleAdminConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

            <van-goods-action  v-show=" status == '已确认' && role == 'meal' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="食堂确认"  @click="handleMealConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

          </div>

          <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;" >加载中...</van-loading>

          <div style="height:100px;" ></div>
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
            iswechat:false,
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            huserid:'',
            huserList:[],
            auserid:'',
            auserList:[],
            fuserid:'',
            fuserList:[],
            muserid:'',
            muserList:[],
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
              front_time:'',
              admin_time:'',
              meal_time:'',
              hr_name:'',   //对接HR
              hr_id: '',
              front_name:'',
              front_id:'',
              admin_name:'',
              admin_id:'',
              meal_name:'',
              meal_id:'',
              front:'',
              admin:'',
              meal:'',
              carno:'',
              files_gp:'',
              files_xs:'',
              files_js:'',
              files_id:'',
              files_bk:'',
              files_by:'',
              files_xw: '',
              files_ssby: '',
              files_ssxw: '',
              files_bsby: '',
              files_bsxw: '',
              remark:'',    //备注信息
              prefix: '',   //编号前缀
              name: '',     //流程组名，即Group_XX
              status: '',
            },
            downloadURL:'https://upload.yunwisdom.club:30443/',
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
      async downloadGP(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_gp , '工牌附件' + this.item.files_gp.split('/')[1]);
      },
      async downloadXS(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_xs , '行驶证附件' + this.item.files_xs.split('/')[1]);
      },
      async downloadJS(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_js , '驾驶证附件' + this.item.files_js.split('/')[1]);
      },
      async downloadID(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_id , '身份证附件' + this.item.files_id.split('/')[1]);
      },
      async downloadBK(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_bk , '银行卡附件' + this.item.files_bk.split('/')[1]);
      },
      async downloadBY(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_by , '毕业证附件' + this.item.files_by.split('/')[1]);
      },
      async downloadXW(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_xw , '学位证附件' + this.item.files_xw.split('/')[1]);
      },
      async downloadSSBY(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_ssby , '硕士毕业证附件' + this.item.files_ssby.split('/')[1]);
      },
      async downloadSSXW(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_ssxw , '硕士学位证附件' + this.item.files_ssxw.split('/')[1]);
      },
      async downloadBSBY(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_bsby , '博士毕业证附件' + this.item.files_bsby.split('/')[1]);
      },
      async downloadBSXW(file , res){
        this.saveAsFile(this.downloadURL + this.item.files_bsxw , '博士学位证附件' + this.item.files_bsxw.split('/')[1]);
      },
      //查询归档人员
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
                    this.huserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.huserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.huserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.huserList = this.huserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.huserList.findIndex((subitem,index) => { return subitem.id == item.id });
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
      //查询归档人员
      async queryAdminMan(){
        //获取盖章人信息
        const admin_name = this.item.admin_name;

        try {
          if(!!admin_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(admin_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.auserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.auserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.auserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.auserList = this.auserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.auserList.findIndex((subitem,index) => { return subitem.id == item.id });
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
      //查询归档人员
      async queryFrontMan(){
        //获取盖章人信息
        const front_name = this.item.front_name;

        try {
          if(!!front_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(front_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.fuserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.fuserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.fuserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.fuserList = this.fuserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.fuserList.findIndex((subitem,index) => { return subitem.id == item.id });
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
      //查询归档人员
      async queryMealMan(){
        //获取盖章人信息
        const meal_name = this.item.meal_name;

        try {
          if(!!meal_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(meal_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.muserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.muserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.muserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.muserList = this.muserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.muserList.findIndex((subitem,index) => { return subitem.id == item.id });
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
          this.iswechat = tools.isWechat();

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
            front_name: value.front_name,
            admin_name: value.admin_name,
            meal_name: value.meal_name,
            front_id: value.front_id,
            admin_id: value.admin_id,
            meal_id: value.meal_id,
            carno: value.carno,
            files_id: value.files_id,
            files_bk: value.files_bk,
            files_gp: value.files_gp,
            files_xs: value.files_xs,
            files_js: value.files_js,
            files_by: value.files_by,
            files_xw: value.files_xw,
            files_ssby: value.files_ssby,
            files_ssxw: value.files_ssxw,
            files_bsby: value.files_bsby,
            files_bsxw: value.files_bsxw,
            front_time: value.front_time ? dayjs(value.front_time).format('YYYY-MM-DD') : '', //前台时间
            admin_time: value.admin_time ? dayjs(value.admin_time).format('YYYY-MM-DD') : '', //行政时间
            meal_time: value.meal_time ? dayjs(value.meal_time).format('YYYY-MM-DD') : '',   //食堂时间
            status: '待确认',
          }

          await this.queryAdminMan();
          await this.queryFrontMan();
          await this.queryMealMan();

        } catch (error) {
          console.log(error);
        }

      },
      // 查询用户信息
      async queryUserInfo(name , queryURL = '', resp = '', front = {id:''}){
        // 查询前台人员SQL
        queryURL = `${window.requestAPIConfig.restapi}/api/v1/hrmresource/id?_where=((lastname,like,%27~${name}~%27)~or(loginid,like,%27~${name}~%27))~and(status,ne,5)&_fields=id,lastname,loginid,textfield1,sex`;

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
        const front_id = this.item.front_id;
        const admin_id = this.item.admin_id;
        const meal_id = this.item.meal_id;

        //获取相应对接人员OA账号
        let front , admin , meal , queryURL , resp;

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/entryview?id=${id}&statustype=none&role=`);

        //操作时间
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');

        //修改状态为已确认
        await manageAPI.patchTableData(`bs_entry_job` , id , { id , status:'已确认' , hr_time: time , front_id , admin_id , meal_id , front_name , admin_name , meal_name,   front_account: front_name , admin_account: admin_name , meal_account: meal_name });

        //检查行政/前台/食堂人员是否存在，如果存在，则向对应用户发送通知
        front = await this.queryUserInfo(front_name);
        admin = await this.queryUserInfo(admin_name);
        meal = await this.queryUserInfo(meal_name);

        if(front && admin && meal){
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${front.id},${this.item.front_id}/入职登记通知：员工‘${this.item.username}’入职登记完毕，请前台确认，并准备好相应的入职办公用品！?rurl=${receiveURL}front`)
                .set('accept', 'json');
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${admin.id},${this.item.admin_id}/入职登记通知：员工‘${this.item.username}’入职登记完毕，请行政确认，并准备好相应的入职资产配置！?rurl=${receiveURL}admin`)
                .set('accept', 'json');
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${meal.id},${this.item.meal_id}/入职登记通知：员工‘${this.item.username}’入职登记完毕，请食堂确认，并准备好相应的饭卡及餐补配额！?rurl=${receiveURL}meal`)
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

      },
      async handleFrontConfirm(){

        //系统编号
        const id = tools.getUrlParam('id');

        //设置前台确认时间
        await manageAPI.patchTableData(`bs_entry_job` , id , { id , front_time: dayjs().format('YYYY-MM-DD HH:mm:ss') });

        //设置确认时间
        this.item.front_time = dayjs().format('YYYY-MM-DD');

        //修改状态
        this.status = '已完成';

        //检查前台/行政/食堂是否确认完毕，如果确认完毕，则推送消息至HR，知会三方已经确认准备，并设置流程状态为归档
        await this.handleFinaly();

        //未获取到HR信息
        await vant.Dialog.alert({
          title: '温馨提示',
          message: '入职登记前台确认完毕！',
        });

      },
      async handleAdminConfirm(){

        //系统编号
        const id = tools.getUrlParam('id');

        //设置行政确认时间
        await manageAPI.patchTableData(`bs_entry_job` , id , { id , admin_time: dayjs().format('YYYY-MM-DD HH:mm:ss') });

        //设置确认时间
        this.item.admin_time = dayjs().format('YYYY-MM-DD');

        //修改状态
        this.status = '已完成';

        //检查前台/行政/食堂是否确认完毕，如果确认完毕，则推送消息至HR，知会三方已经确认准备，并设置流程状态为归档
        await this.handleFinaly();

        //未获取到HR信息
        await vant.Dialog.alert({
          title: '温馨提示',
          message: '入职登记行政确认完毕！',
        });
      },
      async handleMealConfirm(){

         //系统编号
        const id = tools.getUrlParam('id');

        //设置食堂确认时间
        await manageAPI.patchTableData(`bs_entry_job` , id , { id , meal_time: dayjs().format('YYYY-MM-DD HH:mm:ss') });

        //设置确认时间
        this.item.meal_time = dayjs().format('YYYY-MM-DD');

        //修改状态
        this.status = '已完成';

        //检查前台/行政/食堂是否确认完毕，如果确认完毕，则推送消息至HR，知会三方已经确认准备，并设置流程状态为归档
        await this.handleFinaly();

        //未获取到HR信息
        await vant.Dialog.alert({
          title: '温馨提示',
          message: '入职登记食堂确认完毕！',
        });

      },
      async handleFinaly(){

        await tools.sleep(100);

        //系统编号
        const id = tools.getUrlParam('id');

        //查询归档状态
        const value = await query.queryTableData(`bs_entry_job` , id);

        value.front_time = value.front_time || this.item.front_time;
        value.admin_time = value.admin_time || this.item.admin_time;
        value.meal_time = value.meal_time || this.item.meal_time;

        //如果三方确认时间无误，则向HR推送最后知会通知，告知流程完毕
        if(!tools.isNull(value.front_time) && !tools.isNull(value.admin_time) && !tools.isNull(value.meal_time)){

           // 返回预览URL
          const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/entryview?id=${id}&statustype=none&role=done`);

           //设置确认完成时间
          await manageAPI.patchTableData(`bs_entry_job` , id , { id , status : '已完成' , done_time: dayjs().format('YYYY-MM-DD HH:mm:ss') });

          //向HR推送入职引导完成通知
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${value.hr_id}/入职登记确认完成通知：员工‘${value.username}’入职登记通知已被前台、行政、食堂确认!?rurl=${receiveURL}`)
                .set('accept', 'json');
        }

      }
    }
}
</script>
<style>
    @import "../../assets/css/entryview.global.css";
    .van-button[name="file"] {
      background-image: linear-gradient(to right, #f96033, red);
      margin: 5px 10px;
      padding: 1px 20px;
      border-radius: 8px;
      color: #f0f0f0;
      font-size: 12px;
      height: 27px;
    }
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealinfo.css";
</style>
