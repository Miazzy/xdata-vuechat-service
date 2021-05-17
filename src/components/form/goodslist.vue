<template>
<keep-alive>
  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd; overflow-x: hidden;" >
    <header id="wx-header" v-show="!searchFlag" style="overflow-x: hidden;">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>领用审批</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 12px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 54px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
                <van-cell id="van-cell-export" class="van-cell-export" title="导出合同" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data_office"
                        :fields="json_fields_office"
                        worksheet="办公物品领用台账"
                        name="办公物品领用台账.xls" >
                        办公台账
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
            placeholder="请输入搜索关键词" >
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
            已准备
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
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initList" default-tag-text="待处理" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="confirmList" default-tag-text="已准备" edit-disabled @select="selectHContract()" />
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
const commonJsonFieldsConfig = JSON.parse("{\"排序编号\":\"serialid\",\"登记时间\":\"create_time\",\"物品名称\":\"name\",\"物品数量\":\"amount\",\"领用类型\":\"type\",\"领用人员\":\"receive_name\",\"领用公司\":\"company\",\"领用部门\":\"department\",\"接待人员\":\"user_admin_name\",\"备注说明\":\"remark\",\"审批状态\":\"status\"}");
export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "领用审批",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initList:[],
            confirmList:[],
            doneList:[],
            rejectList:[],
            hContractID:'',
            tname: 'bs_goods_receive',
            tabmap:{
              '1': 'initList',
              '2': 'confirmList',
              '3': 'doneList',
              '4':'rejectList',
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
            isLoading: false,
            loading: false,
            json_fields_office: commonJsonFieldsConfig,
            json_fields_drug: commonJsonFieldsConfig,
            json_fields_prevent: commonJsonFieldsConfig,
            json_data_office: [],
            json_data_drug: [],
            json_data_prevent: [],
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
            this.dropMenuValue = this.dropMenuOldValue, this.searchFlag = true;
            break;
          case 4: //重置数据
            this.searchWord = this.dropMenuValue = this.dropMenuOldValue = '', this.searchFlag = false;
            await this.queryTabList(this.tabname , 0);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },

      //查询基础信息
      async queryInfo(){
        this.tabname = Betools.storage.getStore('system_goodsreceive_list_tabname') || '1'; //获取tabname
        await this.queryTabList(this.tabname , 0); //查询页面数据
        this.queryTabList('办公' , 0); //查询页面数据
        this.back = Betools.tools.getUrlParam('back') || '/app';  //获取返回页面
      },

      //查询Tab栏下列表信息
      async queryTabList(tabname , page = 0 ){
        const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前用户信息
        const tableName = this.tname ;
        const month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); //获取最近N个月对应的日期
        let searchSql = ''; //设置查询语句
        //如果存在搜索关键字，则编写查询关键字的查询语句
        (this.searchWord) ? searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(receive_name,like,~${this.searchWord}~)~or(type,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(approve_name,like,~${this.searchWord}~))` : null;
        if(tabname == 1){
          this.initList = await this.handleList(tableName, '待处理', userinfo, searchSql);
        } else if(tabname == 2){
          this.confirmList = await this.handleList(tableName, '已领取,已准备', userinfo, searchSql);
        } else if(tabname == 3) {
          this.doneList = await this.handleList(tableName, '已完成', userinfo, searchSql);
        } else if(tabname == 4) {
          this.rejectList = await this.handleList(tableName, '已驳回', userinfo, searchSql);
        } else if(tabname == '办公') {
          this.json_fields_office = await this.handleExList(tableName, '办公用品', userinfo, searchSql);
        } else if(tabname == '药品') {
          this.json_data_drug = await this.handleExList(tableName, '药品', userinfo, searchSql);
        } else if(tabname == '防疫') {
          this.json_data_prevent = await this.handleExList(tableName, '防疫', userinfo, searchSql);
        }
      },

      //查询不同状态的领用数据
      async handleList(tableName , status = '待处理', userinfo, searchSql , page = 0 , size = 3000){
          if(Betools.tools.isNull(userinfo) || Betools.tools.isNull(userinfo.username)){
            return [];
          }
          let list = await Betools.manage.queryTableData(tableName , `_where=(status,in,${status})~and(user_group_ids,like,~${userinfo.username}~)${searchSql}&_sort=-id&_p=${page}&_size=${size}`);
          list.map((item)=>{
            item.name = item.type + '领用: ' + item.name + ` #${item.serialid}`,
            item.tel = '';
            item.address = item.receive_name + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          });
          list = list.filter(item => {
            return item.id == item.pid;
          });
          return list;
      },

      //查询导出数据
      async handleExList(tableName, type = '办公用品', userinfo, searchSql){
          const list = await Betools.manage.queryTableData(tableName , `_where=(type,in,${type})~and(user_group_ids,like,~${userinfo.username}~)${searchSql}&_sort=-id&_size=3000`);
          list.map((item) => {
            item.name = item.type + '领用: ' + item.name + ` #${item.serialid}`,
            item.tel = '';
            item.address = item.receive_name + ' ' + item.company + ' ' + item.department + ` 时间:${item.create_time.slice(0,10)}`;
            item.isDefault = true;
          });
          return list;
      },

      //跳转详情页面函数
      async selectHContract(){
        await Betools.tools.sleep(0); //等待N毫秒
        const id = this.hContractID;  //查询当前用印信息
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});
        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          Betools.storage.setStore('system_goodsreceive_list_tabname' , this.tabname);
          this.$router.push(`/app/goodsview?id=${id}&statustype=${item.type}&role=front&back=goodslist`); //跳转到相应的用印界面
        } else if(this.tabname == '2'){
          Betools.storage.setStore('system_goodsreceive_list_tabname' , this.tabname);
          this.$router.push(`/app/goodsview?id=${id}&statustype=${item.type}&role=front&back=goodslist`); //跳转到相应的用印界面
        } else if(this.tabname == '3' ){
          Betools.storage.setStore('system_goodsreceive_list_tabname' , this.tabname);
          this.$router.push(`/app/goodsview?id=${id}&statustype=${item.type}&role=front&back=goodslist`); //跳转到相应的用印界面
         } else if(this.tabname == '4' ){
          Betools.storage.setStore('system_goodsreceive_list_tabname' , this.tabname);
          this.$router.push(`/app/goodsview?id=${id}&statustype=${item.type}&role=front&back=goodslist`); //跳转到相应的用印界面
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
