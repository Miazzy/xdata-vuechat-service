<template>

<keep-alive>

  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" v-show="!searchFlag" style="overflow-x: hidden;">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>认领进度</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 12px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 54px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
                <van-cell id="van-cell-export" class="van-cell-export" title="导出台账" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data"
                        :fields="json_fields"
                        worksheet="导出台账"
                        name="失物招领台账.xls" >
                        导出台账
                      </download-excel>
                    </span>
                  </template>
                </van-cell>
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
        <div v-show="role == 'front' " class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div v-show="role == 'front' " class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ; queryTabList(tabname , 0);" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待处理
          </div>
          <div v-show="role == 'front' " class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(tabname , 0);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已认领
          </div>
          <div v-show="role == 'front' " class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ; queryTabList(tabname , 0);" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已完成
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initList" default-tag-text="待认领" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading && role == 'front'">
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="confirmList" default-tag-text="已认领" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading && role == 'front'">
          <van-address-list v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="doneList" default-tag-text="已完成" edit-disabled @select="selectHContract()" />
        </template>
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
            pageName: "认领进度",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initList:[],
            confirmList:[],
            doneList:[],
            rejectList:[],
            hContractID:'',
            tname: 'bs_lost_property',
            tabmap:{
              '1': 'initList',
              '2': 'confirmList',
              '3': 'doneList',
              '4': 'rejectList',
            },
            back:'/app/lostpropertylist',
            role:'common',
            searchWord:'',
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '登记', value: 1 , icon: 'edit' },
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            isLoading:false,
            loading:false,
            json_fields: {
              '排序号': 'serialid',
              '业务编号': 'id',
              '登记时间': 'create_time',
              '登记人员': 'create_by',
              '物品名称': 'lost_name',
              '物品数量': 'lost_amount',
              '丢失时间': 'lost_time',
              '领取人员': 'claim_name',
              '领取时间': 'claim_time',
              '领取公司': 'company',
              '领取部门':'department',
              '联系电话':'mobile',
              '处理人员': 'user_admin_name',
              '电话号码':'mobile',
              '审批状态': 'status',
            },
            json_data: [],
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

      // 点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },

      // 点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          this.queryTabList(this.tabname);  //刷新相应表单
          vant.Toast('搜索...');  //显示搜索状态
          await Betools.tools.sleep(300); //等待一下
        }
        this.searchFlag = false;  //显示刷新消息
      },

      // 点击右侧菜单
      async headDropMenu(value){
        const val = this.dropMenuValue;
        switch (val) {
          case 1: //刷新数据
            this.$router.push(`/app/lostpropertyreceive`);
            break;
          case 2: //刷新数据
            this.dropMenuValue = this.dropMenuOldValue;
            await this.queryTabList(this.tabname , 0);
            break;
          case 3: //查询数据
            this.dropMenuValue = this.dropMenuOldValue;
            this.searchFlag = true;
            break;
          case 4: //重置数据
            this.dropMenuValue = this.dropMenuOldValue = this.searchWord = '';
            this.searchFlag = false;
            await this.queryTabList(this.tabname , 0);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },

      // 查询基础信息
      async queryInfo(){
        //获取用户基础信息
        const userinfo = await Betools.storage.getStore('system_userinfo');
        //获取tabname
        this.tabname = Betools.storage.getStore('system_lost_property_list_tabname') || '1'
        //查询直接所在工作组
        const resp = await Betools.query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);
        //获取后端配置前端管理员组
        this.role = resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username) ? 'front' : 'common';
        //获取tabname
        this.tabname = resp && resp.length > 0 && resp[0].userlist.includes(userinfo.username) ? this.tabname: 1;
        //查询页面数据
        await this.queryTabList(this.tabname , 0);
        //查询台账数据
        this.queryTabList('认领' , 0);
        //获取返回页面
        this.back = Betools.tools.getUrlParam('back') || '/app';
      },

      // 查询Tab栏对应的失物招领信息
      async queryTabList(tabname = 1 , page){

        //获取当前用户信息
        const userinfo = await Betools.storage.getStore('system_userinfo');

        //获取最近6个月对应的日期
        var month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');

        //设置查询语句
        var searchSql = '';

        //如果存在搜索关键字
        if(this.searchWord) {
          searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(receive_name,like,~${this.searchWord}~)~or(type,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(approve_name,like,~${this.searchWord}~))`;
        }

        if(tabname == 1){
          //获取最近6个月的待用印记录
          this.initList = await Betools.manage.queryTableData(this.tname , `_where=(status,eq,待处理)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.initList.map((item , index) => {
            item.name = '物品: ' + item.lost_name + ` #${item.serialid}`,
            item.tel = '';
            item.address = '物品:' + item.lost_name + (item.description ? ' 备注:' + item.description : '') + (item.address ? ` 地址：${item.address}` : '') + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          this.initList = this.initList.filter(item => {
            return item.id == item.pid;
          });

        } else if(tabname == 2){
          //获取最近6个月的已用印记录
          this.confirmList = await Betools.manage.queryTableData(this.tname , `_where=(status,eq,已认领)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.confirmList.map((item , index) => {
            item.name = '物品: ' + item.lost_name + ` #${item.serialid}`,
            item.tel = '';
            item.address = '物品:' + item.lost_name + (item.description ? ' 备注:' + item.description : '') + (item.address ? ` 地址：${item.address}` : '') + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          this.confirmList = this.confirmList.filter(item => {
            return item.id == item.pid;
          });

        } else if(tabname == 3) {
          //获取最近6个月的已领取记录
          this.doneList = await Betools.manage.queryTableData(this.tname , `_where=(status,eq,已完成)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);

          this.doneList.map((item , index) => {
            item.name = '物品: ' + item.lost_name + ` #${item.serialid}`,
            item.tel = '';
            item.address = '物品:' + item.lost_name + (item.description ? ' 备注:' + item.description : '') + (item.address ? ` 地址：${item.address}` : '') + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          })

          this.doneList = this.doneList.filter(item => {
            return item.id == item.pid;
          });
         } else if(tabname == '认领') {
           //获取最近6个月的已领取记录
          this.json_data = await Betools.manage.queryTableData(this.tname , `_where=(status,ne,已测试)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-id`);
          this.json_data.sort((n1,n2)=>{ return n1.serialid - n2.serialid});
         }

      },
      async selectHContract(){

        //等待N毫秒
        await Betools.tools.sleep(0);

        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});
        Betools.storage.setStore('system_lost_property_list_tabname' , this.tabname);

        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          //跳转到相应的用印界面
          this.$router.push(`/app/lostpropertyview?id=${id}&statustype=none&role=common&back=/app/lostpropertylist`);
        } else if(this.tabname == '2'){
          //跳转到相应的用印界面
          this.$router.push(`/app/lostpropertyview?id=${id}&statustype=none&role=${this.role}&back=/app/lostpropertylist`);
        } else if(this.tabname == '3' ){
          //跳转到相应的用印界面
          this.$router.push(`/app/lostpropertyview?id=${id}&statustype=none&role=${this.role}&back=/app/lostpropertylist`);
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
