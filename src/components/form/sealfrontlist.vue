<template>

<keep-alive>
  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" class="header-menu" v-show="!searchFlag" >
        <div class="center" style="position:relative;">
            <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
              <span>返回</span>
            </router-link>
            <span>用印移交</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 42px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
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
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(2);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已用印
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ; queryTabList(3);" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已领取
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ; queryTabList(4);" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已移交
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 5 ; queryTabList(5);" :style="tabname == 5 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已归档
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <van-pull-refresh v-model="isLoading" @refresh="queryFresh(7)">
        <template v-show="tabname == 2 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="sealContractList" default-tag-text="已用印" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="receiveContractList" default-tag-text="已领取" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 4 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="frontContractList" default-tag-text="已移交" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 5 && !loading && !isLoading">
            <van-address-list style="min-height:500px;" v-show="tabname == 5 && !loading && !isLoading" v-model="hContractID" :list="doneContractList" default-tag-text="已归档" edit-disabled @select="selectHContract()" />
        </template>
        </van-pull-refresh>
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
import * as manageAPI from '@/request/manage';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "用印移交",
            momentNewMsg: true,
            tabname: 2,
            id:'',
            initContractList:[],
            sealContractList:[],
            receiveContractList:[],
            frontContractList:[],
            doneContractList:[],
            failContractList:[],
            hContractID:'',
            tabmap:{
              '1': 'initContractList',
              '2': 'sealContractList',
              '3': 'receiveContractList',
              '4': 'frontContractList',
              '5': 'doneContractList',
              '6': 'failContractList',
            },
            sealType: 0,
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
            menuCssValue:'',
            isLoading:false,
            loading:false,
        }
    },
    activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
        //this.userStatus();
    },
    mounted() {
      this.queryInfo();
      //this.userStatus();
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
      async userStatus(){
        try {
          let info = await storage.getStore('system_userinfo');
          // if( tools.isNull(info) ){
          //   vant.Toast('尚未登录！');
          //   await this.clearLoginInfo();
          //   this.$router.push(`/login`);
          // }
        } catch (error) {
          console.log(error);
        }
      },
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      //刷新页面
      async queryFresh(){
        //刷新相应表单
        this.queryTabList(this.tabname);
        //等待一下
        await tools.sleep(300);
        //显示刷新消息
        vant.Toast('刷新成功');
        //设置加载状态
        this.isLoading = false;
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
          await tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      //点击右侧菜单
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
            await this.queryFresh();
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            this.searchFlag = true;
            break;
          case 4: //重置数据
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.sealType = '';
            this.searchFlag = false;
            this.searchWord = '';
            await this.queryFresh();
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
      //点击Tab栏
      async queryTabList(tabname){

        //获取最近6个月对应的日期
        let month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');
        let sealTypeSql = '';
        let searchSql = '';

        if(this.sealType === 0 || true) {
          sealTypeSql = `~and(seal_type,like,合同类)`;
        } else if(this.sealType === 1) {
          sealTypeSql = `~and(seal_type,like,非合同类)`;
        }

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((filename,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(workno,like,~${this.searchWord}~)~or(contract_id,like,~${this.searchWord}~)~or(seal_man,like,~${this.searchWord}~)~or(sign_man,like,~${this.searchWord}~)~or(front_name,like,~${this.searchWord}~)~or(archive_name,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(deal_depart,like,~${this.searchWord}~)~or(approve_type,like,~${this.searchWord}~))`;
        }

        if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,待用印)~and(create_time,gt,${month})${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.initContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.sealContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已用印)~and(create_time,gt,${month})${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.sealContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 3){
          //获取最近6个月的已领取记录
          this.receiveContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已领取)~and(create_time,gt,${month})${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.receiveContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 4){
          //获取最近6个月的已移交记录
          this.frontContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,in,移交前台,财务归档,档案归档)~and(create_time,gt,${month})${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.frontContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 5){
          //获取最近6个月的已归档记录
          this.doneContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已完成)~and(create_time,gt,${month})${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.doneContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        } else if(tabname == 6){
          //获取最近6个月的已归档记录
          this.failContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已退回)~and(create_time,gt,${month})${sealTypeSql}${searchSql}&_sort=-create_time&_p=0&_size=1000`);

          this.failContractList.map((item , index) => {
            item.name = item.filename.slice(0,16) ,
            item.tel = '';
            item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
            item.isDefault = true;
          })
        }
      },
      async queryInfo(){

        //强制渲染
        this.$forceUpdate();

        //获取tabname
        this.tabname = storage.getStore('system_seal_front_list_tabname') || 2;

        //获取最近6个月对应的日期
        var month = dayjs().subtract(6, 'months').format('YYYY-MM-DD');

        //设置查询合同类别SQL
        let sealTypeSql = '';

        if(this.sealType === 0 || true) {
          sealTypeSql = `~and(seal_type,like,合同类)`;
        } else if(this.sealType === 1) {
          sealTypeSql = `~and(seal_type,like,非合同类)`;
        }

        //获取最近6个月的待用印记录
        this.initContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,待用印)~and(create_time,gt,${month})${sealTypeSql}&_sort=-create_time&_p=0&_size=1000`);

        this.initContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        })

        //获取最近6个月的已用印记录
        this.sealContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已用印)~and(create_time,gt,${month})${sealTypeSql}&_sort=-create_time&_p=0&_size=1000`);

        this.sealContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        })

        //获取最近6个月的已领取记录
        this.receiveContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已领取)~and(create_time,gt,${month})${sealTypeSql}&_sort=-create_time&_p=0&_size=1000`);

        this.receiveContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        })

        //获取最近6个月的已移交记录
        this.frontContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,in,移交前台,财务归档,档案归档)~and(create_time,gt,${month})${sealTypeSql}&_sort=-create_time&_p=0&_size=1000`);

        this.frontContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        })

        //获取最近6个月的已归档记录
        this.doneContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已完成)~and(create_time,gt,${month})${sealTypeSql}&_sort=-create_time&_p=0&_size=1000`);

        this.doneContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        })

        //获取最近6个月的已归档记录
        this.failContractList = await manageAPI.queryTableData('bs_seal_regist' , `_where=(status,eq,已退回)~and(create_time,gt,${month})${sealTypeSql}&_sort=-create_time&_p=0&_size=1000`);

        this.failContractList.map((item , index) => {
          item.name = item.filename.slice(0,16) ,
          item.tel = '';
          item.address = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:'+ item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno ;
          item.isDefault = true;
        })

      },
      async selectHContract(){

        //等待N毫秒
        await tools.sleep(0);

        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});

        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&back=sealfrontlist`);
        } else if(this.tabname == '2' && item.seal_type == '非合同类'){
          storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealreceive?id=${id}&statustype=none&type=receive&back=sealfrontlist`);
        } else if(this.tabname == '2' || this.tabname == '3'){
          storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=front&back=sealfrontlist`);
        } else if(this.tabname == '4' ){
          storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        } else if(this.tabname == '5' ){
          storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        } else if(this.tabname == '6' ){
          storage.setStore('system_seal_front_list_tabname' , this.tabname);
          //跳转到相应的用印界面
          this.$router.push(`/app/sealview?id=${id}&statustype=none&type=done&back=sealfrontlist`);
        }

      },
    }
}
</script>
<style>
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
