<template>
  <keep-alive>
  <div id="content" style="margin-top: 0px;" >
    <header id="wx-header" style="overflow-x: hidden;">
        <div class="center">
            <router-link :to="back" @click="$router.push(`/app/sealfrontlist`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>财务移交</span>
        </div>
    </header>

    <section >
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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">财务移交申请</van-col>
            <van-col span="8"></van-col>
          </van-row>
        </div>
      </div>

      <van-tag style="position: absolute; top: 54px; right: 0px; z-index: 1000; border-radius: 30px 0px 0px 30px;" :type="status_type"> {{ ` ${status}` }}</van-tag>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;"> </div>
        <div class="weui-cells" style="margin-top:0px;margin-left:0px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

          <van-cell-group style="margin-top:10px;">
            <van-cell value="基本信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-field v-show="item.serialid" clearable label="申请序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
            <van-field required readonly clearable label="填报日期" v-model="item.createtime" placeholder="请输入登记日期" />
            <check-select required label="申请类型" placeholder="请选择申请类型" v-model="item.type" :columns="typeColumns" :option="{label:'name',value:'name',title:'',all:true , margin:'0px 0px' , classID:'',}" />
            <check-select required label="移交文件" placeholder="请选择移交文件" v-model="item.filenamelist" :columns="fileColumns" :option="{label:'name',value:'name',title:'title',all:false, margin:'35px 3px 0px 0px' , classID:'van-field-check-select'}" />
          </van-cell-group>

          <van-cell-group style="margin-top:10px;">
            <van-cell value="移交说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
            <van-field required label="备注信息" v-model="item.message" rows="2" autosize clickable clearable type="textarea" maxlength="500" placeholder="请输入移交备注说明事项！" @blur="validField('message')" :error-message="message.message" show-word-limit />
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

          <div id="van-finance-apply" style="margin:30px 0px 10px; border-top:0px solid #fcfcfc;" >
            <van-goods-action-button type="danger" text="提交" @click="handleAgree();" style="" />
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
            title:'合同资料移交申请',
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
            sealuserid:'',
            iswechat:false,
            message: Betools.workconfig.compValidation.seal.message,
            valid: Betools.workconfig.compValidation.seal.valid,
            cuserid:'',
            cuserList:[],
            suserid:'',
            suserList:[],
            fuserid:'',
            fuserList:[],
            auserid:'',
            auserList:[],
            financeUserid:'',
            financeuserList:[],
            recordUserid:'',
            recorduserList:[],
            agroup:[],
            back:'/app',
            hContractID:'',
            item:{
              createtime: dayjs().format('YYYY-MM-DD'),
              serialid:'',
              filename:'',
            },
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            backPath:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            fileList:[],
            loading:false,
            officeList:[],
            hContractList:[],
            processLogList:[],
            typeColumns:[
              { name: '档案移交', code: '1', },
              { name: '财务移交', code: '2', },
            ],
            fileColumns:[],
            view:'',
            readonly: true,
            zonename:'',
        }
    },
    activated() {
      this.queryInfo();
    },
    mounted() {
      this.queryInfo();
    },
    methods: {
      /**
       * 查询初始化信息
       */
      async queryInfo(){
        try {
          const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取当前用户信息
          const month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); // 获取最近12个月对应的日期
          const clist = await Betools.manage.queryTableData('bs_seal_regist' , `_where=(status,in,已用印,已领取)~and(create_time,gt,${month})~and(front,like,~${userinfo.username}~)~and(seal_type,like,合同类)~and(zone_name,eq,领地集团总部)&_sort=-create_time&_p=0&_size=1000`); // 获取最近12个月的已用印记录
          clist.map((item , index) => {
            item.title = item.filename.slice(0,16) ,
            item.code = item.id;
            item.tel = '';
            item.name = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
          this.fileColumns = clist;
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * 处理同意/提交操作
       */
      async handleAgree(){
        try {
          
        } catch (error) {
          console.log(error);
        }
      },
    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealview.css";
    @import "../../assets/css/sealview.global.css";
</style>



