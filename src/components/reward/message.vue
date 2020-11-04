<template>
  <div id="reward-message" style="background-color:#f0f0f0; height:auto;" >
    <div style="background-color:#f0f0f0; height:auto;">
      <a-row :gutter="24">
        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" style="position:relative;">

            <div style="position:absolute;left:0px width:80px;" >
              <van-sidebar v-model="activeTabKey">
                <van-sidebar-item style="display:block;" title="审批" :to="`/reward/message`" />
                <van-sidebar-item style="display:none;" title="云文档" :to="`/reward/netdisk`" />
                <van-sidebar-item style="display:none;" title="联系人" :to="`/reward/contact`" />
                <van-sidebar-item style="display:block;" title="工作台" :to="`/reward/workspace`" />
                <van-sidebar-item style="display:none;" title="收藏" :to="`/reward/collect`" />
                <van-sidebar-item style="display:none;" title="设置" :to="`/reward/setup`" />
              </van-sidebar>
            </div>

            <div style="position:absolute; left:80px; width:300px;">
              <a-card class="pane-flow-card" :style="paneflowcard">
                <div style="margin:10px 15px 10px 25px;">
                  <a-input-search
                    :value="searchwords"
                    placeholder="搜索"
                    loading
                    @change="searchWordChange"
                  />
                </div>

                <template v-for="item in paneflows" :style="paneflowcard">
                  <a-card-grid
                    class="pane-flow-card-grid"
                    :key="item.href"
                    v-show="item.show"
                    @click="menuCardClick(item.id , item.ename);"
                    :style="item.css"
                    style="border-bottom: 1px solid #f9f9f9; border-radius: 4px;"
                  >
                    <a-card-meta>
                      <div slot="title" class="card-title pane-flow-card-meta"  @click="item.click">
                        <div class="pane-flow-card-meta-icon">
                          <a-avatar size="middle" :src="item.avatar" style="margin-top: 5px;" />
                        </div>
                        <div class="pane-flow-card-meta-title">
                          <a class="pane-flow-card-meta-tname">{{ item.name }}</a>
                          <div class="pane-flow-card-meta-description">{{ item.description }}</div>
                        </div>
                      </div>
                    </a-card-meta>
                    <div ></div>
                  </a-card-grid>
                </template>
              </a-card>
            </div>

            <div style="position:absolute; left:400px; width:1050px;">
              <a-col style="padding: 0 12px 0 0" >
                <template v-for=" paneflow in paneflows ">

                  <a-card
                    :key="paneflow.ename"
                    v-show=" panename == paneflow.ename "
                    style="margin-top: 0px; height: 800px; overflow-y:scroll;"
                    :bordered="false"
                    :title="paneflow.name">

                    <div slot="extra">

                      <a-radio-group v-show="paneflow.periodTabsFlag" v-model="year" style="margin-right:20px;display:none;">
                        <a-radio-button value="all">所有</a-radio-button>
                        <a-radio-button value="half">半年</a-radio-button>
                        <a-radio-button value="year">全年</a-radio-button>
                      </a-radio-group>

                      <a-radio-group v-model="status">
                        <a-radio-button v-show="paneflow.tabs[0]" @click="queryRewardListByType(1);" value="all">{{ paneflow.tabs[0]}}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[1]" @click="queryRewardListByType(2);" value="processing">{{ paneflow.tabs[1] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[2]" @click="queryRewardListByType(3);" value="waiting">{{ paneflow.tabs[2] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[3]" @click="queryRewardListByType(4);" value="reject">{{ paneflow.tabs[3] }}</a-radio-button>
                      </a-radio-group>
                      <a-input-search style="margin-left: 16px; width: 272px;" />
                    </div>

                    <div id="reward-list-item" style="background:#fefefe;margin:10px 10px;pading:10px 10px;  height: 650px; overflow-y:scroll;">
                      <a-list-item :key="index" v-for="(item, index) in paneflow.dataSource" style="background:#fefefe;margin:10px 10px;pading:10px 10px;border-bottom:1px solid #f0f0f0;">
                        <a-list-item-meta :description="item.description" style="display:block;">
                          <a-avatar style="display:none;" slot="avatar" size="large" shape="square" :src="item.avatar"/>
                          <a slot="title">
                            <span style="display:block;"> {{ item.title }} </span>
                            <span style="display:block;margin-top:5px;">{{ item.content ? (item.content.slice(0,30) + '...') : '' }} </span>
                          </a>
                        </a-list-item-meta>
                        <div slot="actions">
                          <a @click="queryRewardView(item.id , panename , item.typename)">查看</a>
                        </div>
                        <div class="list-content">
                          <div v-show="item.reward_period" class="list-content-item">
                            <span>申请奖金</span>
                            <p>{{ item.amount }}</p>
                          </div>
                          <div v-show="item.reward_period" class="list-content-item">
                            <span>所属周期</span>
                            <p>{{ item.reward_period }}</p>
                          </div>
                          <div class="list-content-item">
                            <span>开始时间</span>
                            <p>{{ item.startAt }}</p>
                          </div>
                          <div class="list-content-item">
                            <span>流程发起</span>
                            <p>{{ item.apply_realname || item.proponents }}</p>
                          </div>
                          <div class="list-content-item" style="display:none;">
                            <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
                          </div>
                        </div>
                      </a-list-item>
                    </div>
                  </a-card>
                </template>
              </a-col>
            </div>

          </a-col>
        </keep-alive>
        <keep-alive>


        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as storage from "@/request/storage";
import * as tools from "@/request/tools";
import * as workconfig from "@/request/workconfig";
import * as menulist from "./component/menulist.vue";
import * as task from '@/request/task';
import * as manageAPI from '@/request/manage';
import * as query from '@/request/query';

export default {
  mixins: [window.mixin],
  data() {
    return {
      activeTabKey: 0,
      pageName: "奖罚消息",
      momentNewMsg: true,
      paneflowcard: "",
      paneflowcardGrid: "",
      searchwords: "",
      tabname: 1,
      tablename:'bs_reward_apply',
      panename:'myrewardlist',
      constpaneflows: workconfig.getPaneflows(this),
      paneflows: workconfig.getPaneflows(this),
      initList:[],
      confirmList:[],
      doneList:[],
      rejectList:[],
      status: 'all',
      year:'all',
      business_code: '000000000',
    };
  },
  activated() {
    this.init();
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.panename = tools.getUrlParam('panename') || 'myrewardlist';
      this.userinfo = await this.weworkLogin(); //查询当前登录用户
      this.constpaneflows = JSON.parse(JSON.stringify(this.paneflows));
      this.menuCardClick('',this.panename);
      if(this.panename == 'myrewardlist' ){
        this.queryRewardListByType(1 , 'hr_admin_ids' , this.panename);
      } else if(this.panename == 'mytodolist'){ //我的待办
        this.queryRewardListByType(1 , 'wflow_todo' , this.panename);
      } else if(this.panename == 'mydonelist'){ //我的已办
        this.queryRewardListByType(1 , 'wflow_done' , this.panename);
      } else if(this.panename == 'myapplylist'){ //我的奖罚申请
        this.queryRewardListByType(1 , 'create_by' , this.panename);
      }
    },
    async searchWordChange() {
      this.paneflows.map((item, index) => {
        if (
          item.name.includes(this.searchwords) ||
          item.description.includes(this.searchwords)
        ) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
      this.paneflows.sort();
    },
    async menuCardClick(id , panename) {
      // 设置panename属性
      this.panename = panename;
      // 遍历paneflows
      this.paneflows.map((item) => {
        item.css =  item.id === id || item.ename == panename ? "background:#f9f9f9;" : '';
        item.dataSource = item.id === id || item.ename == panename ? item.dataSource : [];
        if(panename == 'myrewardlist'){
          this.queryRewardListByType(1 , 'hr_admin_ids' , panename);
        } else if(panename == 'mytodolist'){ //我的待办
          this.queryRewardTodoList(1 , 'wflow_todo' , panename);
        } else if(panename == 'mydonelist'){ //我的已办
          this.queryRewardDoneListByType(1 , 'wflow_done' , panename);
        } else if(panename == 'myapplylist'){ //我的奖罚申请
          this.queryRewardListByType(1 , 'create_by' , panename);
        }
      });
    },
    async queryRewardList(tabname = '', typename = ''){

        const userinfo = await storage.getStore('system_userinfo');  //获取当前用户信息

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //设置查询语句
        var searchSql = '';

        const titlePrefix = typename == 'hr_admin_ids' ? '知会人力' : '申请历史';

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(receive_name,like,~${this.searchWord}~)~or(type,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(approve_name,like,~${this.searchWord}~))`;
        }

        if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initList = await manageAPI.queryTableData(this.tablename , `_where=(status,eq,待审批)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.initList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '申请: ' + item.title ;
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '待审批';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.initList;

        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.confirmList = await manageAPI.queryTableData(this.tablename , `_where=(status,eq,审批中)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.confirmList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '奖罚申请: ' + item.title ,
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '审批中';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.confirmList;

        } else if(tabname == 3) {
          //获取最近6个月的已领取记录
          this.doneList = await manageAPI.queryTableData(this.tablename , `_where=(status,eq,已完成)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.doneList.map((item , index) => {
            item.name = `#${item.serialid} `  + ` ${titlePrefix} ` +  item.reward_type + '奖罚申请: ' + item.title ,
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '已完成';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.doneList;

         } else if(tabname == 4) {
          //获取最近6个月的已领取记录
          this.rejectList = await manageAPI.queryTableData(this.tablename , `_where=(status,eq,已驳回)~and(${typename},like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.rejectList.map((item , index) => {
            item.name = `#${item.serialid} ` + ` ${titlePrefix} ` + item.reward_type + '奖罚申请: ' + item.title ,
            item.title = item.name;
            item.avatar = '',
            item.description = '';
            item.owner = item.create_by;
            item.tel = '';
            item.all = '已驳回';
            item.typename = typename;
            item.progress = { value: 90 };
            item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          return this.rejectList;

        }
    },
    async queryRewardTodoList(tabname = '', typeame = ''){

      try {
        const logList = query.queryProcessLogHistoryByUserName(this.tablename , this.userinfo.username);

        logList.map((item , index) => {
          item.id = item.business_data_id;
          item.name = `#${item.serialid} ` + item.reward_type + '申请: ' + item.title ;
          item.title = item.name;
          item.avatar = '',
          item.description = '';
          item.owner = item.create_by;
          item.tel = '';
          item.all = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        })

        return [];
      } catch (error) {
        console.log(error);
      }

    },
    async queryRewardDoneList(tabname = '', typename = ''){

      try {
        const logList = await query.queryProcessLogHistoryByUserName(this.tablename , this.userinfo.username);

        logList.map((item , index) => {
          item.id = item.business_data_id;
          item.name = `发起：${item.content} `;
          item.title = item.name;
          item.avatar = '',
          item.description = '';
          item.owner = item.create_by;
          item.tel = '';
          item.all = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        })

        return logList;
      } catch (error) {
        console.log(error);
      }

    },
    async queryRewardDoneListByType(tabname = '', typename = '' , panename){
      const tlist =  await this.queryRewardDoneList(tabname , typename , panename);
      this.paneflows.map( item => { //遍历paneflows
        if( panename == item.ename){
          item.dataSource = tlist;
          item.ename = panename;
        }
      })
    },
    async queryRewardListByType(tabname = 1 , typename = '' , panename){
      const tlist =  await this.queryRewardList(tabname , typename , panename);
      this.paneflows.map( item => { //遍历paneflows
        if( panename == item.ename){
          item.dataSource = tlist;
          item.ename = panename;
        }
      })
    },
    // 跳转到详情页面
    async queryRewardView(id , panename , typename){
      try {
        this.$router.push(`/reward/rewardview?id=${id}&panename=${panename}&typename=${typename}`);
      } catch (error) {
        console.log(error);
      }
    },
    // 企业微信登录处理函数
    async weworkLogin(){
      try {
        return await query.queryWeworkUser();
      } catch (error) {
        console.log(error);
      }
    },
},
};
</script>
<style scoped >
@import "../../assets/css/reward.home.css";
@import "../../assets/css/reward.message.css";
</style>
