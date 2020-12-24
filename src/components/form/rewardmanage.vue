<template>

<keep-alive>

  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd; overflow-x: hidden;" >

    <header id="wx-header" v-show="!searchFlag" style="overflow-x: hidden;">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>奖罚申请</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 12px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 54px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >

              </van-dropdown-item>
            </van-dropdown-menu>
        </div>
    </header>
     <header id="wx-header" class="header-search" v-show="!!searchFlag" style="padding:0px 0px 1px 0px; border-bottom:1px solid #cecece;">
       <div>
          <van-search
            v-model="searchWord"
            show-action
            placeholder="请输入搜索关键词"
          >
            <template #action>
              <div @click="headMenuSearch();" >搜索</div>
            </template>
          </van-search>
        </div>
    </header>

    <section>

      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ; queryTabList(tabname , 0);" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待审批
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(tabname , 0);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            审批中
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ; queryTabList(tabname , 0);" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已完成
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ; queryTabList(tabname , 0);" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已驳回
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initList" default-tag-text="待审批" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="confirmList" default-tag-text="审批中" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading">
          <van-address-list v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="doneList" default-tag-text="已完成" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 4 && !loading && !isLoading">
          <van-address-list v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="rejectList" default-tag-text="已驳回" edit-disabled @select="selectHContract()" />
        </template>
      </div>

    </section>

  </div>
</keep-alive>

</template>

<script>
import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as manage from '@/request/manage';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "奖罚申请",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initList:[],
            confirmList:[],
            doneList:[],
            rejectList:[],
            hContractID:'',
            tname: 'bs_reward_apply',
            tablename: 'bs_reward_apply',
            tabmap:{
              '1': 'initList',
              '2': 'confirmList',
              '3': 'doneList',
              '4': 'rejectList',
            },
            back:'/app',
            searchWord:'',
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            isLoading:false,
            loading:false,
        }
    },
    activated() {

        this.queryInfo();
    },
    mounted() {
      this.queryInfo();
    },
    watch: {
      $route(to, from) {

      },
      tabname(){
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        },500);
      }
    },
    methods: {
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
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
          await Betools.tools.sleep(300);
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
            await this.queryTabList(this.tabname , 0);
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            this.searchFlag = true;
            break;
          case 4: //重置数据
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.searchFlag = false;
            this.searchWord = '';
            await this.queryTabList(this.tabname , 0);
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
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取tabname
        this.tabname = Betools.storage.getStore('system_goods_borrow_receive_list_tabname') || '1';

        //查询页面数据
        await this.queryTabList(this.tabname , 0);

        //获取返回页面
        this.back = Betools.tools.getUrlParam('back') || '/app';

      },
      async queryTabList(tabname , page){

        //获取当前用户信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //设置查询语句
        var searchSql = '';

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(receive_name,like,~${this.searchWord}~)~or(type,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(approve_name,like,~${this.searchWord}~))`;
        }

        if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initList = await manage.queryTableData(this.tablename , `_where=(status,eq,待审批)~and(hr_admin_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.initList.map((item , index) => {
            item.name = item.reward_type + '申请: ' + item.title + ` #${item.serialid}`,
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.confirmList = await manage.queryTableData(this.tablename , `_where=(status,eq,审批中)~and(hr_admin_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.confirmList.map((item , index) => {
            item.name = item.reward_type + '奖罚申请: ' + item.title + ` #${item.serialid}`,
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

        } else if(tabname == 3) {
          //获取最近6个月的已领取记录
          this.doneList = await manage.queryTableData(this.tablename , `_where=(status,eq,已完成)~and(hr_admin_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.doneList.map((item , index) => {
            item.name = item.reward_type + '奖罚申请: ' + item.title + ` #${item.serialid}`,
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

         } else if(tabname == 4) {
          //获取最近6个月的已领取记录
          this.rejectList = await manage.queryTableData(this.tablename , `_where=(status,eq,已驳回)~and(hr_admin_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.rejectList.map((item , index) => {
            item.name = item.reward_type + '奖罚申请: ' + item.title + ` #${item.serialid}`,
            item.tel = '';
            item.address = item.apply_realname + ' ' + item.content + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

        }

      },
      async selectHContract(){

        //等待N毫秒
        await Betools.tools.sleep(0);

        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});
        Betools.storage.setStore('system_goods_borrow_receive_list_tabname' , this.tabname);

        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          //跳转到相应的用印界面
          this.$router.push(`/app/reward?id=${id}&statustype=none&role=approve&back=rewardlist`);
        } else if(this.tabname == '2'){
          //跳转到相应的用印界面
          this.$router.push(`/app/reward?id=${id}&statustype=none&role=approve&back=rewardlist`);
        } else if(this.tabname == '3' ){
          //跳转到相应的用印界面
          this.$router.push(`/app/reward?id=${id}&statustype=none&role=approve&back=rewardlist`);
         } else if(this.tabname == '4' ){
          //跳转到相应的用印界面
          this.$router.push(`/app/reward?id=${id}&statustype=none&role=approve&back=rewardlist`);
        }

      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
    @import "../../assets/css/goodslist.css";
</style>
