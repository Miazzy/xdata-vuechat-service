<template>

<keep-alive>
  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" class="header-menu" v-show="!searchFlag" style="overflow-x: hidden;" >
        <div class="center" style="position:relative;">
            <router-link :to="back" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>访客登记</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 42px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
              </van-dropdown-item>
            </van-dropdown-menu>
        </div>
    </header>

    <header id="wx-header" class="header-search" v-show="!!searchFlag" style="padding:0px 0px 1px 0px; border-bottom:1px solid #cecece;">
       <div>
          <van-search  v-model="searchWord"  show-action placeholder="请输入搜索关键词" >
            <template #action>
              <div @click="headMenuSearch();" >搜索</div>
            </template>
          </van-search>
        </div>
    </header>

    <section>
      <div class="weui-cells" style="margin-top: 0px;">
        <template>
            <vue-excel-editor v-model="json_data" ref="grid" width="100%" filter-row autocomplete @delete="onDelete" @update="onUpdate" >
                <vue-excel-column field="serialid"     label="序号"     width="50px" />
                <vue-excel-column field="create_time"  label="填报时间"  width="100px" />
                <vue-excel-column field="time"         label="预约日期"  width="100px" />
                <vue-excel-column field="dtime"        label="预约时间"  width="100px" />
                <vue-excel-column field="create_by"    label="被访人员"    width="100px" />
                <vue-excel-column field="employee"     label="被访人员账号"    width="100px" />
                <vue-excel-column field="mobile"       label="被访人员电话" width="100px" />
                <vue-excel-column field="position"     label="被访人员职务" width="100px" />
                <vue-excel-column field="visitor_name" label="访客名称"    width="100px" />
                <vue-excel-column field="visitor_company" label="访客单位" width="120px" />
                <vue-excel-column field="visitor_mobile"  label="访客电话"  width="100px" />
                <vue-excel-column field="visitor_position" label="访客职务" width="100px"/>
                <vue-excel-column field="zone_name"    label="区域名称"  width="100px" />
                <vue-excel-column field="address"      label="访问地址"  width="180px" />
                <vue-excel-column field="user_admin_name" label="接待客服" width="100px" />
                <vue-excel-column field="status"       label="来访状态"  width="100px"  />
                <vue-excel-column field="remark"        label="备注信息" width="100px" />
            </vue-excel-editor>
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
            pageName: "访客登记",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initContractList:[],
            sealContractList:[],
            receiveContractList:[],
            frontContractList:[],
            doneContractList:[],
            failContractList:[],
            hContractID:'',
            json_data: [],
            sealType:'',
            searchWord:'',
            totalpages:5,
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
              { text: '导出', value: 7 , icon: 'description' },
            ],
            menuCssValue:'',
            isLoading:false,
            loading:false,
            currentPage: 1,
            back:'/app/app_subvisitor',
            statusType:{'init':'待处理','confirm':'已确认','visit':'已到访','devisit':'未到访','invalid':'已作废'},
        }
    },
    activated() {
      this.queryInfo();
    },
    mounted() {
      this.queryInfo();
    },
    watch: {
    },
    methods: {
      exportAsExcel () {
          this.$refs.grid.exportTable('xlsx', true, '访客登记表单');
      },
      async onDelete(records){
        console.log('delete');
      },
      async onUpdate(records){
        const temp = this.$refs.grid.$options.propsData.value;
        if(records.length > 1){
          return this.$toast.fail('管理员您好，一次只能更新一条数据！');
        }
        for(const record of records){
          const item = temp.find( item => { return item.$id == record.$id });
          const elem = new Object() ;
          elem[record.name] = record.newVal ;
          if(record.newVal == ''){
            return this.$toast.fail('管理员您好，不能将值修改为空字符串！');
          }
          await Betools.manage.patchTableData('bs_visit_apply' , item.id , elem);
        }
      },
      async userStatus(){
        try {
          const userinfo = await Betools.storage.getStore('system_userinfo');
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
        this.queryTabList(this.tabname , this.currentPage - 1);
        //等待一下
        await Betools.tools.sleep(300);
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
          this.queryTabList();
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
          case 7: //导出表单
            this.dropMenuValue = '';
            this.dropMenuOldValue = '';
            this.exportAsExcel();
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },
      async queryTabList(tabname = '1' , page = 0){
        const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前用户信息
        let month = dayjs().subtract(12, 'months').format('YYYY-MM-DD'); // 获取最近12个月对应的日期
        let searchSql = '';
        this.currentPage = page + 1; // 设置当前页为第一页
        if(this.searchWord) { //如果存在搜索关键字,则执行搜索功能
          searchSql = `~and((filename,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(workno,like,~${this.searchWord}~)~or(contract_id,like,~${this.searchWord}~)~or(seal_man,like,~${this.searchWord}~)~or(sign_man,like,~${this.searchWord}~)~or(front_name,like,~${this.searchWord}~)~or(archive_name,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(deal_depart,like,~${this.searchWord}~)~or(approve_type,like,~${this.searchWord}~))`;
        }
        const whereSQL = `_where=(status,in,init,confirm,visit,devisit,invalid)~and(create_time,gt,${month})~and(user_group_ids,like,~${userinfo.username}~)${searchSql}&_sort=-serialid&_p=0&_size=10000`;
        this.json_data = await Betools.manage.queryTableData('bs_visit_apply' , whereSQL);
        this.json_data.map((item , index) => {
          item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss');
          item.seal_time = dayjs(item.seal_time).format('YYYY-MM-DD HH:mm:ss');
          item.receive_time = dayjs(item.receive_time).format('YYYY-MM-DD HH:mm:ss');
          item.status = this.statusType[item.status];
        });
        this.json_data.sort();
      },
      async queryInfo(){
        this.tabname = (Betools.storage.getStore('system_visit_list_tabname') || '1') % 10 ; //获取tabname
        this.tabname = this.tabname > 1 ? 1 : this.tabname;
        this.queryTabList(); //查询来访登记数据
      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/seallist.css";
</style>
