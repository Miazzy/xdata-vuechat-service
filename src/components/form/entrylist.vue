<template>

<keep-alive>

  <!--首页组件-->
  <div id="seallist" style="margin-top: 0px; background: #fdfdfd;" >

    <header id="wx-header" v-show="!searchFlag" style="overflow-x: hidden;">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>入职进度</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 12px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 54px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;"  />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" >
                <van-cell id="van-cell-export" class="van-cell-export" v-show="role == 'hr'" title="入职台账" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data"
                        :fields="json_fields"
                        worksheet="入职台账"
                        name="入职台账.xls" >
                        入职台账
                      </download-excel>
                    </span>
                  </template>
                </van-cell>
                <van-cell id="van-cell-export" class="van-cell-export" v-show="role !== 'hr'" title="入职台账" icon="balance-list-o"  >
                  <template #title>
                    <span class="custom-title">
                      <download-excel
                        :data="json_data"
                        :fields="json_fields_common"
                        worksheet="入职台账"
                        name="入职台账.xls" >
                        入职台账
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
        <div class="weui-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <div v-show="role == 'hr'" class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ; queryTabList(tabname , 0);" :style="tabname == 1 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            待确认
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 2 ; queryTabList(tabname , 0);" :style="tabname == 2 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已确认
          </div>
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 3 ; queryTabList(tabname , 0);" :style="tabname == 3 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已完成
          </div>
          <div v-show="role == 'hr'" class="weui-cell__bd weui-cell_tab" @click="tabname = 4 ; queryTabList(tabname , 0);" :style="tabname == 4 ? `border-bottom: 2px solid #fe5050;font-weight:600;` : `border-bottom: 0px solid #329ff0;` ">
            已驳回
          </div>
        </div>
      </div>

      <div class="wechat-list">
        <template v-show="tabname == 1 && !loading && !isLoading">
          <van-empty v-if="tabname == 1 && initList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 1 && !loading && !isLoading" v-model="hContractID" :list="initList" default-tag-text="待确认" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 2 && !loading && !isLoading">
          <van-empty v-if="tabname == 2 && confirmList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 2 && !loading && !isLoading" v-model="hContractID" :list="confirmList" default-tag-text="已确认" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 3 && !loading && !isLoading">
          <van-empty v-if="tabname == 3 && doneList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 3 && !loading && !isLoading" v-model="hContractID" :list="doneList" default-tag-text="已完成" edit-disabled @select="selectHContract()" />
        </template>
        <template v-show="tabname == 4 && !loading && !isLoading">
          <van-empty v-if="tabname == 4 && rejectList.length == 0 " description="暂无数据" />
          <van-address-list v-show="tabname == 4 && !loading && !isLoading" v-model="hContractID" :list="rejectList" default-tag-text="已驳回" edit-disabled @select="selectHContract()" />
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
            pageName: "入职进度",
            momentNewMsg: true,
            tabname: '1',
            id:'',
            initList:[],
            confirmList:[],
            doneList:[],
            rejectList:[],
            hContractID:'',
            tname: 'bs_entry_job',
            tabmap:{
              '1': 'initList',
              '2': 'confirmList',
              '3': 'doneList',
              '4': 'rejectList',
            },
            searchWord:'',
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '搜索', value: 3 , icon: 'search' },
              { text: '重置', value: 4 , icon: 'aim' },
            ],
            role:'',
            isLoading:false,
            loading:false,
            back:'/app',
            json_fields: {
              '入职编号':'id',
              '登记时间': 'create_time',
              '登记人员': 'create_by',
              '最高学历':'greatdiploma',
              '入职员工': 'username',
              '入职岗位': 'position',
              '入职部门':'department',
              '入职时间': 'join_time',
              '电话号码':'mobile',
              '配置电脑': 'computer',
              '配置座椅': 'seat',
              '配置抽屉': 'drawer',
              '其他配置要求': 'other_equip',
              '笔记簿': 'notebook',
              '签字笔/擦': 'writingtools',
              '员工工牌':'badge',
              '其他办公用品要求':'othertools',
              '车牌号':'carno',
              '身份证号':'idcard',
              '银行卡号':'bank_card',
              '是否停车':'stop_flag',
              '人力接待人员':'hr_name',
              '行政接待人员':'admin_account',
              '前台接待人员':'front_account',
              '食堂饭卡':'meal_account',
              '审批状态': 'status',
            },
            json_fields_common: {
              '入职编号':'id',
              '登记时间': 'create_time',
              '登记人员': 'create_by',
              '最高学历':'greatdiploma',
              '入职员工': 'username',
              '入职岗位': 'position',
              '入职部门':'department',
              '入职时间': 'join_time',
              '电话号码':'mobile',
              '配置电脑': 'computer',
              '配置座椅': 'seat',
              '配置抽屉': 'drawer',
              '其他配置要求': 'other_equip',
              '笔记簿': 'notebook',
              '签字笔/擦': 'writingtools',
              '员工工牌':'badge',
              '其他办公用品要求':'othertools',
              '车牌号':'carno',
              '是否停车':'stop_flag',
              '人力接待人员':'hr_name',
              '行政接待人员':'admin_account',
              '前台接待人员':'front_account',
              '食堂饭卡':'meal_account',
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
          this.queryTabList(this.tabname); //刷新相应表单
          vant.Toast('搜索...'); //显示搜索状态
          await Betools.tools.sleep(300); //等待一下
        }
        this.searchFlag = false; //显示刷新消息
      },

      // 点击右侧菜单
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
            this.dropMenuValue = this.dropMenuOldValue = this.searchWord = '', this.searchFlag = false;
            await this.queryTabList(this.tabname , 0);
            break;
          default:
            console.log(`no operate. out of switch. `);
        }
      },

      // 查询基础信息
      async queryInfo(){
        this.back = Betools.tools.getUrlParam('back') || '/app';  //获取返回页面
        this.role = Betools.tools.getUrlParam('role') || 'front';
        this.tabname = Betools.storage.getStore('system_entryjob_list_tabname') || '1'; //获取tabname
        if(this.role != 'hr' && (this.tabname == '1' || this.tabname == '4')){ //如果角色不是HR，且tabname为1，则修改为2
          this.tabname = '2';
        }
        if(this.role !== 'hr'){ //如果角色不是HR，则导出功能，不能导出身份证号，银行卡号
          delete this.json_fields.idcard;
          delete this.json_fields.bank_card;
        }
        await this.queryTabList(this.tabname ,0);  //查询员工信息列表
        await this.queryTabList('入职' ,0); //查询员工信息列表
      },

      // 查询Tab栏信息
      async queryTabList(tabname , page){
        const tableName = this.tname;
        let searchSql = ''; //设置查询语句
        (this.searchWord) ? searchSql = `~and((username,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(position,like,~${this.searchWord}~)~or(hr_name,like,~${this.searchWord}~)~or(bank_card,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(idcard,like,~${this.searchWord}~))` : null;
        if(tabname == 1){
          this.initList = await this. handleList(tableName, '待确认', searchSql);
        } else if(tabname == 2) {
          this.confirmList = await this. handleList(tableName, '已确认', searchSql);
        } else if(tabname == 3) {
          this.doneList = await this. handleList(tableName, '已完成', searchSql);
        } else if(tabname == 4) {
          this.rejectList = await this. handleList(tableName, '已驳回', searchSql);
        } 
      },

      // 查询入职信息
      async handleList(tableName , status = '待确认' , searchSql = ''){
        const month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');  //获取最近12个月对应的日期
        let list = await Betools.manage.queryTableData(tableName , `_where=(status,in,${status})~and(create_time,gt,${month})${searchSql}`);
        list.map((item) => {
          item.name = item.username + ' ' + item.mobile ,
          item.tel = '';
          item.address = item.position + ' ' + item.greatdiploma + ` 时间:${item.join_time.slice(0,10)}` +  ' HR:' + item.hr_name;
          item.isDefault = true;
        });
        return list;
      },

      // 跳转到相应员工入职详情页面
      async selectHContract(){
        //查询当前用印信息
        const id = this.hContractID;
        const list = this[this.tabmap[this.tabname]];
        const item = list.find((item,index) => {return id == item.id});
        //获取角色ROLE
        const role = Betools.tools.getUrlParam('role') || 'admin';
        Betools.storage.setStore('system_entryjob_list_tabname' , this.tabname);
        //根据当前状态，跳转到不同页面
        if(this.tabname == '1'){
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=${role}&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        } else if(this.tabname == '2'){
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=${role}&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        } else if(this.tabname == '3' ){
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=done&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        } else if(this.tabname == '4' ){
          this.$router.push(`/app/entryview?id=${id}&statustype=none&role=done&back=${window.encodeURIComponent(`/app/entrylist?role=${role}&back=/app`)}`);
        }
      },
    }
}
</script>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/entrylist.css";
</style>
