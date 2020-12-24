<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;" >
        <div class="center" >
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>物品领用确认</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
            </van-dropdown-menu>
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">办公用品预约</van-col>
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

                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                <!-- 领用时间（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="领用时间" v-model="item.receive_time"  placeholder="请填写领用时间！" @blur="validField('receive_time')" :error-message="message.receive_time"  />
                <!-- 领用类别（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="领用类别" v-model="item.type"  placeholder="请填写领用类别！" @blur="validField('type')" :error-message="message.type"  />
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="物品名称" v-model="item.name"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="领用数量" v-model="item.amount"  placeholder="请填写领用数量及单位！" @blur="validField('amount')" :error-message="message.amount"  />

                 <span class="van-goods-span-number" style="top:180px;">#1</span>
              </van-cell-group>

              <van-cell-group v-show="size>=2" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name1"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount1"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#2</span>
              </van-cell-group>

              <van-cell-group v-show="size>=3" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name2"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount2"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#3</span>
              </van-cell-group>

              <van-cell-group v-show="size>=4" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name3"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount3"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#4</span>
              </van-cell-group>

              <van-cell-group v-show="size>=5" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name4"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount4"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#5</span>
              </van-cell-group>

              <van-cell-group v-show="size>=6" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name5"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount5"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#6</span>
              </van-cell-group>

              <van-cell-group v-show="size>=7" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name6"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount6"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#7</span>
              </van-cell-group>

              <van-cell-group v-show="size>=8" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name7"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount7"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#8</span>
              </van-cell-group>

              <van-cell-group v-show="size>=9" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name8"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount8"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#9</span>
              </van-cell-group>

              <van-cell-group v-show="size>=10" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name9"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount9"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#10</span>
              </van-cell-group>

              <van-cell-group v-show="size>=11" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name10"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount10"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#11</span>
              </van-cell-group>

              <van-cell-group v-show="size>=12" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name11"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount11"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#12</span>
              </van-cell-group>

              <van-cell-group v-show="size>=13" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name12"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount12"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#13</span>
              </van-cell-group>

              <van-cell-group v-show="size>=14" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name13"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount13"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />
                <span class="van-goods-span-number">#14</span>
              </van-cell-group>

              <van-cell-group v-show="size>=15" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name14"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount14"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />
                <span class="van-goods-span-number">#15</span>
              </van-cell-group>

               <van-cell-group v-show="size>=16" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name15"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 领用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="领用数量" v-model="item.amount15"  placeholder="请填写领用数量！" @blur="validField('amount')" :error-message="message.amount"  />
                <span class="van-goods-span-number">#16</span>
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="人员信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 领用人员（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="领用人员" v-model="item.receive_name"  placeholder="请填写您的姓名！" @blur="validField('receive_name')" :error-message="message.receive_name"  />
                <!-- 单位名称（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="单位名称" v-model="item.company" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company"/>
                <!-- 部门名称（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="部门名称" v-model="item.department" placeholder="请填写您的部门名称！" @blur="validField('department')" :error-message="message.department" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.remark">
                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 备注说明（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" @blur="validField('remark')" :error-message="message.remark"  />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.status">
                <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 流程状态（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="流程状态" v-model="item.status"   />
              </van-cell-group>

              <van-cell-group v-show="((item.status == '待处理' || item.status == '已驳回' ) && !item.disagree_remark) || item.disagree_remark" style="margin-top:10px;" >
                <van-cell value="驳回原因" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :readonly="readonly" :required="false" clearable label="驳回原因" v-model="item.disagree_remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="驳回申请时，请填写驳回理由！" />
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

            </van-form>

          </van-cell-group>

          <div v-show="item.status ==='待处理' && role == 'front' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ffd01e, #ff8917)" type="warning" text="作废"  @click="handleDisagree();" style="border-radius: 10px 10px 10px 10px;margin-right:10px;width:46.5%;float:left;" />
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;float:right;width:46.5%;"  >确认</van-button>
          </div>

          <div v-show="item.status ==='已领取' && (role == 'receive' || role == 'front') " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >完成</van-button>
          </div>

          <div style="height:500px;" ></div>
        </div>
      </div>

    </section>

  </div>
  </keep-alive>
</template>
<script>
import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as query from '@/request/query';
import * as workflow from '@/request/workflow';
import * as manage from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';


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
            title:'办公用品预约',
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
            processLogList:[],
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            role:'front',
            size:15,
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: Betools.workconfig.compValidation.entryjob.message,
            valid: Betools.workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              receive_time: dayjs().format('YYYY-MM-DD'), //领用时间
              name:'', //领用物品名称
              amount:'',//领用数量
              receive_name:'',//领用人员名称
              department:'',//领用部门名称
              remark:'',//备注说明
              type:'',//领用类别
              company:'',//单位名称
              approve_name:'',//领用审批人员
              workflow:'',//关联流程
              approve:'',//领用审批人员
              status: '',
              disagree_remark: '',//驳回理由
            },
            tlist:[],
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
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            currentKey:'',
            tablename:'bs_goods_receive',
            readonly: false,
            goodstype: Betools.workconfig.goodstype,
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
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
      // 点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      // 点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          //刷新相应表单
          this.queryTabList(this.tabname);
          //显示搜索状态
          vant.Toast('搜索...');
          //等待一下
          await Betools.tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      // 点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 0: //只显示合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryFresh();
            break;
          case 1: //只显示非合同类信息
            this.dropMenuOldValue = this.sealType = val;
            await this.queryFresh();
            break;
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;
          case 4: //重置数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.reduction();
            break;
          case 5: //返回应用
            this.$router.push(`/app`);
            break;
          case 6: //返回首页
            this.$router.push(`/explore`);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      // 设置重置
      async reduction(){
        this.item = {
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              receive_time: dayjs().format('YYYY-MM-DD'), //领用时间
              name:'', //领用物品名称
              amount:'',//领用数量
              remark:'',//备注说明
              type:this.item.type,//领用类别
              approve_name:'',//领用审批人员
              workflow:'',//关联流程
              approve:'',//领用审批人员
              receive_name : this.item.receive_name , //领用人员名称
              department : this.item.department, //领用部门名称
              company : this.item.company, //单位名称
              status: '',
            };
      },
      // 获取处理日志
      async queryProcessLog(){

        const id = Betools.tools.getUrlParam('id');
        const pid = Betools.tools.getUrlParam('pid');

        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);

          //如果查询出出来记录，则将处理记录排序
          if(this.processLogList && this.processLogList.length > 0){

            this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
            this.processLogList.sort();

            //获取最后一条处理记录，如果是已完成，或者已驳回，则删除待办记录
            const temp = this.processLogList[this.processLogList.length - 1];

            //检查状态并删除多余记录
            if((temp.action == '完成' && temp.action_opinion.includes('已完成')) || (temp.action == '确认' && temp.action_opinion.includes('已驳回')) ){
              await this.deleteProcessLog();
            }

          }

        } catch (error) {
          console.log(error);
        }
      },
      // 删除流程日志
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
      // 选中当前盖印人
      async selectFrontUser(value){
        await Betools.tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      async validField(fieldName){
        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = Betools.workconfig.system.config.regexp.mail;

        this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        Betools.storage.setStore(`system_${this.tablename}_item@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

        return Betools.tools.isNull(this.message[fieldName]);
      },
      // 获取URL或者二维码信息
      async queryInfo() {

        try {

          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          //获取用户基础信息
          const userinfo = await Betools.storage.getStore('system_userinfo');

          //查询编号
          const id = Betools.tools.getUrlParam('id');
          this.role = Betools.tools.getUrlParam('role');
          this.back = Betools.tools.getUrlParam('back') || '/app';

          //查询领用数据
          let tlist = await query.queryTableDataByPid(this.tablename , id);

          if(tlist.length == 0){
            await this.deleteProcessLog();
          }

          this.size = tlist.length;
          this.tlist = tlist;

          const item = tlist[0];

          //根据URL参数查询物资类型
          this.item.type = this.goodstype[Betools.tools.getUrlParam('type')];

          //自动回显刚才填写的用户基础信息
          if(item){
            this.item.id = id;
            this.item.serialid = item.serialid || this.item.serialid;
            this.item.create_by = item.create_by || this.item.create_by;
            this.item.name = item.name || this.item.name;
            this.item.amount = item.amount || this.item.amount;
            this.item.receive_name = item.receive_name || userinfo.realname || this.item.receive_name ;
            this.item.department = item.department || this.item.department;
            this.item.remark = item.remark || this.item.remark;
            this.item.type = item.type || this.item.type || '办公用品';
            this.item.company = item.company || this.item.company;
            this.item.approve_name = item.approve_name || this.item.approve_name;
            this.item.workflow = item.workflow || this.item.workflow;
            this.item.approve = item.approve || this.item.approve;
            this.item.status = item.status || this.item.status;
            this.item.disagree_remark = item.disagree_remark || this.item.disagree_remark;
          }
          if (this.item && this.item.status === '已驳回') {
            this.readonly = true
          }

          for(let i = 1 ; i < tlist.length ; i++){
            this.item['name'+i] = tlist[i].name ;
            this.item['amount'+i] = tlist[i].amount ;
          }

          await this.queryProcessLog();

        } catch (error) {
          console.log(error);
        }

      },
      // 物品领用驳回
      async handleDisagree(){
        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;
        const type = Betools.tools.getUrlParam('statustype');
        const pid = Betools.tools.getUrlParam('pid');

        //检查用户是否具有权限进行审批
        const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取到印章管理员组信息
        const user_group_ids = response && response.length > 0 ? response[0].userlist : '';

        //获取到用户列表数据
        if(Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username) ){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: '您没有物品领用的审批权限，请联系管理员进行处理！',
          });
        }

        //返回驳回理由
        if(!this.item.disagree_remark){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: '请输入驳回原因！',
          });
        }

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已驳回',
          disagree_remark : this.item.disagree_remark,
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manage.patchTableData(this.tablename , id , elem);


        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已驳回',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manage.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        try {
          //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/亲爱的${this.item.receive_name}同事，您的办公用品预约申请已被驳回，驳回原因是${this.item.disagree_remark}！?rurl=${receiveURL}`)
                  .set('accept', 'json');
        } catch (error) {
          console.log(error);
        }

        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        //const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取后端配置前端管理员组
        const front = user_group_ids;
        const front_name = user_group_ids;

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '确认'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请[已驳回]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + ' #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已驳回物品领用申请！',
          });

      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;
        const type = Betools.tools.getUrlParam('statustype');
        const pid = Betools.tools.getUrlParam('pid');

        //检查用户是否具有权限进行审批
        const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取到印章管理员组信息
        const user_group_ids = response && response.length > 0 ? response[0].userlist : '';

        //获取到用户列表数据
        if(Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username) ){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '您没有物品领用的审批权限，请联系管理员进行处理！',
          });
          return;
        }

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已领取',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manage.patchTableData(this.tablename , id , elem);

        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已领取',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manage.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        try {
          //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/亲爱的${this.item.receive_name}同事，您预约的办公用品已准备就绪，预约号为${this.item.serialid}，请于上午11:00-12:00或下午17:00-18:00到办公用品管理员处，凭预约号领取！?rurl=${receiveURL}`)
                  .set('accept', 'json');
        } catch (error) {
          console.log(error);
        }


        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        //const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取后端配置前端管理员组
        const front = user_group_ids;
        const front_name = user_group_ids;

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '确认'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请[已领用]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + ' #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        //同时推送一条待办记录给印章管理员

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogNode = {
          id: Betools.tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: this.item.create_by,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : this.item.receive_name ,//varchar(1000) null comment '操作职员',
          approve_user   : this.item.create_by ,//varchar(100)  null comment '审批人员',
          action         : ''    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : '经办人',//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + '#已领取 #经办人: ' + this.item.create_by,//text          null comment '业务内容',
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
        this.item.status = elem.status;
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已确认物品领用申请！',
          });

      },
      // 用户提交入职登记表函数
      async handleFinaly() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');
        const pid = Betools.tools.getUrlParam('pid');

        //表单ID
        const id = this.item.id;

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          status: '已完成',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manage.patchTableData(this.tablename , id , elem);

        /************************  工作流程日志(开始)  ************************/

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: Betools.tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '完成'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请[已完成]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + '#已完成 #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已完成物品领用申请！',
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
    @import "../../assets/css/goodsview.css";
</style>
