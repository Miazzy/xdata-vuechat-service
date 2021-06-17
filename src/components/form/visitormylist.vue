<template>
<keep-alive>
  <div id="visitorlist" style="margin-top: 0px; background: #fdfdfd; overflow-x: hidden;" >
    <header id="wx-header" v-show="!searchFlag" style="overflow-x: hidden;">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>来访历史</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
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
            待处理
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(tabname , 0);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已到访
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ; queryTabList(tabname , 0);" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已作废
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-empty v-if="tabname == 1 && initList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initList" default-tag-text="待处理" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
          <van-empty v-if="tabname == 2 && confirmList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="confirmList" default-tag-text="已到访" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading">
          <van-empty v-if="tabname == 3 && doneList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="doneList" default-tag-text="已作废" edit-disabled @select="selectHContract()" />
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
            pageName: "访客审核",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initList:[],
            confirmList:[],
            doneList:[],
            rejectList:[],
            hContractID:'',
            tname: 'bs_visit_apply',
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

      //点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },

      //点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          this.queryTabList(this.tabname); //刷新相应表单
          vant.Toast('搜索...'); //显示搜索状态
          await Betools.tools.sleep(300); //等待一下
        }
        this.searchFlag = false; //显示刷新消息
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
            this.dropMenuOldValue = this.searchWord = this.dropMenuValue = '', this.searchFlag = false;
            await this.queryTabList(this.tabname , 0);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },

      // 查询基础信息
      async queryInfo(){
        this.tabname = Betools.storage.getStore('system_visitorview_list_tabname') || '1'; //获取tabname
        await this.queryTabList(this.tabname , 0);  //查询页面数据
        this.back = Betools.tools.getUrlParam('back') || '/app';  //获取返回页面
      },

      // 查询特定Tab栏信息
      async queryTabList(tabname , page){

        vant.Toast.loading({ duration: 0,  forbidClick: true,  message: '刷新中...', });

        const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前用户信息
        const month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); //获取最近N个月对应的日期
        const tableName = this.tname ;
        let searchSql = ''; //设置查询语句
        (this.searchWord) ? searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(create_time,like,~${this.searchWord}~)~or(employee,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(position,like,~${this.searchWord}~)~or(address,like,~${this.searchWord}~)~or(visitor_name,like,~${this.searchWord}~)~or(visitor_company,like,~${this.searchWord}~)~or(visitor_mobile,like,~${this.searchWord}~)~or(visitor_position,like,~${this.searchWord}~)~or(time,like,~${this.searchWord}~)~or(dtime,like,~${this.searchWord}~)~or(zone,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(user_admin_name,like,~${this.searchWord}~))` : null ;
        if(tabname == 1){
          this.initList = await this.handleList(tableName , 'init,confirm', userinfo, searchSql, 0, 20);
        } else if(tabname == 2){
          this.confirmList = await this.handleList(tableName , 'visit', userinfo, searchSql, 0, 20);
        } else if(tabname == 3) {
          this.doneList = await this.handleList(tableName , 'devisit,invalid', userinfo, searchSql, 0, 20);
        } 

        vant.Toast.clear();
      },

      //查询Tab栏列表数据
      async handleList(tableName = '', status = 'init,confirm', userinfo, searchSql = '' , page = 0 , size = 20){
        let list = await Betools.manage.queryTableData(tableName , `_where=(status,in,${status})~and(employee,like,~${userinfo.username}~)${searchSql}&_sort=-id&_p=${page}&_size=${size}`);
        list.map((item , index) => {
            item.name = item.create_by + ' ' + item.department ;
            item.address = item.visitor_company + '的' + item.visitor_name + `预计${dayjs(item.time).format('YYYY-MM-DD')} ${item.dtime}到访${item.address}。`,
            item.tel = '';
            item.isDefault = true;
          });
        list = list.filter(item => { return item.id == item.pid; });
        return list;
      },

      //跳转到相应界面详情
      async selectHContract(){
        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});
        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          Betools.storage.setStore('system_visitorview_list_tabname' , this.tabname);
          this.$router.push(`/app/visitorview?id=${id}&statustype=${item.status}&role=view&back=visitormylist`);  //跳转到相应的用印界面
        } else if(this.tabname == '2'){
          Betools.storage.setStore('system_visitorview_list_tabname' , this.tabname);
          this.$router.push(`/app/visitorview?id=${id}&statustype=${item.status}&role=view&back=visitormylist`);  //跳转到相应的用印界面
        } else if(this.tabname == '3' ){
          Betools.storage.setStore('system_visitorview_list_tabname' , this.tabname);
          this.$router.push(`/app/visitorview?id=${id}&statustype=${item.status}&role=view&back=visitormylist`);  //跳转到相应的用印界面
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
