<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center" >
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>物品借用确认</span>
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">物品借用表</van-col>
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
                <!-- 借用时间（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="借用时间" v-model="item.receive_time"  placeholder="请填写借用时间！" @blur="validField('receive_time')" :error-message="message.receive_time"  />
                <!-- 借用类别（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="借用类别" v-model="item.type"  placeholder="请填写借用类别！" @blur="validField('type')" :error-message="message.type"  />
                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="物品名称" v-model="item.name"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly" :required="false" clearable label="借用数量" v-model="item.amount"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                 <span class="van-goods-span-number" style="top:180px;">#1</span>
              </van-cell-group>

              <van-cell-group v-show="size>=2" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name1"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount1"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#2</span>
              </van-cell-group>

              <van-cell-group v-show="size>=3" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name2"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount2"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#3</span>
              </van-cell-group>

              <van-cell-group v-show="size>=4" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name3"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount3"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#4</span>
              </van-cell-group>

              <van-cell-group v-show="size>=5" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name4"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount4"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#5</span>
              </van-cell-group>

              <van-cell-group v-show="size>=6" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name5"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount5"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#6</span>
              </van-cell-group>

              <van-cell-group v-show="size>=7" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name6"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount6"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#7</span>
              </van-cell-group>

              <van-cell-group v-show="size>=8" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name7"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount7"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#8</span>
              </van-cell-group>

              <van-cell-group v-show="size>=9" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name8"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount8"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#9</span>
              </van-cell-group>

              <van-cell-group v-show="size>=10" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name9"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount9"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#10</span>
              </van-cell-group>

              <van-cell-group v-show="size>=11" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name10"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount10"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#11</span>
              </van-cell-group>

              <van-cell-group v-show="size>=12" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name11"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount11"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#12</span>
              </van-cell-group>

              <van-cell-group v-show="size>=13" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name12"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount12"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#13</span>
              </van-cell-group>

              <van-cell-group v-show="size>=14" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name13"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount13"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#14</span>
              </van-cell-group>

              <van-cell-group v-show="size>=15" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name14"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount14"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#15</span>
              </van-cell-group>

               <van-cell-group v-show="size>=16" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <!-- 物品名称（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="物品名称" v-model="item.name15"  placeholder="请填写物品名称！" @blur="validField('name')" :error-message="message.name"  />
                <!-- 借用数量（HR需要确认/修改） -->
                <van-field :readonly="readonly"  clearable label="借用数量" v-model="item.amount15"  placeholder="请填写借用数量！" @blur="validField('amount')" :error-message="message.amount"  />

                <span class="van-goods-span-number">#16</span>
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="人员信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <!-- 借用人员（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="借用人员" v-model="item.receive_name"  placeholder="请填写您的姓名！" @blur="validField('receive_name')" :error-message="message.receive_name"  />
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
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >借用</van-button>
          </div>

          <div v-show="item.status ==='已借用' && role == 'receive' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >归还</van-button>
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
            title:'物品借用表',
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
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              serialid:'',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              receive_time: dayjs().format('YYYY-MM-DD'), //借用时间
              name:'', //借用物品名称
              amount:'',//借用数量
              receive_name:'',//借用人员名称
              department:'',//借用部门名称
              remark:'',//备注说明
              type:'',//借用类别
              company:'',//单位名称
              approve_name:'',//借用审批人员
              workflow:'',//关联流程
              approve:'',//借用审批人员
              status: '',
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
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            currentKey:'',
            tablename:'bs_goods_borrow',
            readonly: false,
            goodstype: workconfig.goodstype,
            diplomaType: workconfig.compcolumns.diplomaTypeColumns,
            acceptType: workconfig.compcolumns.acceptType,
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
      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      //点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          //刷新相应表单
          this.queryTabList(this.tabname);
          //显示搜索状态
          vant.Toast('搜索...');
          //等待一下
          await tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      //点击右侧菜单
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
              receive_time: dayjs().format('YYYY-MM-DD'), //借用时间
              name:'', //借用物品名称
              amount:'',//借用数量
              remark:'',//备注说明
              type:this.item.type,//借用类别
              approve_name:'',//借用审批人员
              workflow:'',//关联流程
              approve:'',//借用审批人员
              receive_name : this.item.receive_name , //借用人员名称
              department : this.item.department, //借用部门名称
              company : this.item.company, //单位名称
              status: '',
            };
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

      //选中当前盖印人
      async selectFrontUser(value){
        await tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      async validField(fieldName){
        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        storage.setStore(`system_${this.tablename}_item@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

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
      async joinTimeConfirm(value){
        this.item.join_time = dayjs(value).format('YYYY-MM-DD');
        this.validField('join_time');
        await tools.sleep(100);
        this.tag.showPickerJoinTime = false;
      },

      // 选择是否
      async commonTypeConfirm(value){
        this.item[this.currentKey] = value;
        this.validField(value);
        await tools.sleep(100);
        this.tag.showPickerCommon = false;
      },

      // 获取URL或者二维码信息
      async queryInfo() {

        try {
          //查询当前是否微信端
          this.iswechat = tools.isWechat();

          //获取用户基础信息
          const userinfo = await storage.getStore('system_userinfo');

          //查询编号
          const id = tools.getUrlParam('id');
          this.role = tools.getUrlParam('role');
          this.back = tools.getUrlParam('back') || '/app';

          //查询借用数据
          let tlist = await query.queryTableDataByPid(this.tablename , id);
          this.size = tlist.length;
          this.tlist = tlist;

          const item = tlist[0];

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

      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;
        const type = tools.getUrlParam('statustype');
        const pid = tools.getUrlParam('pid');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已借用',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);


        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已借用',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manageAPI.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/物品借用登记通知：员工‘${userinfo.realname}(${userinfo.username})’ 部门:‘${userinfo.department.name}’ 单位:‘${userinfo.parent_company.name}’ 物品已借用，请确认借用完成！?rurl=${receiveURL}`)
                .set('accept', 'json');

        /************************  工作流程日志(开始)  ************************/

        //获取后端配置前端管理员组
        const front = 'shur0411,zhouxl0627,wuzy0518,haoqw0515,chenal0625,zhaozy1028';
        const front_name = '舒芮,周雪丽,吴章英,郝倩文,陈安玲,赵梓宇';

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
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '确认'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批借用申请[已借用]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '借用审批[物品借用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品借用(${this.item.type}) ` + this.item.name + ' #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
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
          proponents: this.item.create_by,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : this.item.receive_name ,//varchar(1000) null comment '操作职员',
          approve_user   : this.item.create_by ,//varchar(100)  null comment '审批人员',
          action         : ''    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批借用申请',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : '经办人',//varchar(100)  null comment '职能岗位',
          process_station   : '借用审批[物品借用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品借用(${this.item.type}) ` + this.item.name + '#已借用 #经办人: ' + this.item.create_by,//text          null comment '业务内容',
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

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已确认物品借用申请！',
          });

      },
      // 用户提交入职登记表函数
      async handleFinaly() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');
        const pid = tools.getUrlParam('pid');

        //表单ID
        const id = this.item.id;

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          status: '已归还',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

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
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '完成'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批借用申请[已完成]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '借用审批[物品借用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品借用(${this.item.type}) ` + this.item.name + '#已完成 #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
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

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已完成物品借用申请！',
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
