<template>
<keep-alive>

    <div id="visitorlist" style="margin-top: 0px; background: #fdfdfd; overflow-x: hidden;">

        <header id="wx-header" v-show="!searchFlag" style="overflow-x: hidden;">
            <div class="center">
                <router-link :to="back" tag="div" class="iconfont icon-left">
                    <span>返回</span>
                </router-link>
                <span>访客审核</span>
                <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 55px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
                    <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 12px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
                    <van-icon name="search" size="1.3rem" @click="searchFlag = true;" style="position: absolute; width: 40px; height: auto; right: 54px; top: 17px; opacity: 1; background:#1b1b1b;z-index:10000;" />
                    <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();">
                        <van-cell id="van-cell-export" class="van-cell-export" title="导出合同" icon="balance-list-o">
                            <template #title>
                                <span class="custom-title">
                                    <download-excel :data="json_data" :fields="json_fields" worksheet="访客台账" name="访客台账.xls">访客台账</download-excel>
                                </span>
                            </template>
                        </van-cell>
                    </van-dropdown-item>
                </van-dropdown-menu>
            </div>
        </header>

        <header id="wx-header" class="header-search" v-show="!!searchFlag" style="padding:0px 0px 1px 0px; border-bottom:1px solid #cecece;">
            <div>
                <van-search v-model="searchWord" show-action placeholder="请输入搜索关键词">
                    <template #action>
                        <div @click="headMenuSearch();">搜索</div>
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
                    <div id="van-visitor-list">
                        <template v-show="tabname == 1 && !loading && !isLoading"  v-for="(item, index) in initList" >
                            <div v-show="tabname == 1 && !loading && !isLoading" :key="item.id" :index="index" class="van-address-item">
                                <div class="van-cell van-cell--borderless">
                                    <div class="van-cell__value van-cell__value--alone van-address-item__value" @click="selectHContract(item , index);" >
                                        <div role="radio" tabindex="-1" aria-checked="false" class="van-radio">
                                            <span class="van-radio__label">
                                                <div class="van-address-item__name">{{ item.create_by }} {{ item.department }} <span class="van-tag van-tag--round van-tag--danger van-address-item__tag">{{ vstatus[item.status] }}</span></div>
                                                <div class="van-address-item__address">{{ item.address }}</div>
                                            </span>
                                        </div>
                                    </div>
                                    <i class="van-icon van-icon-edit van-address-item__edit" @click="handleConfirm(item);">
                                    </i>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
                <template v-show="tabname == 2 && !loading && !isLoading">
                    <template v-show="tabname == 2 && !loading && !isLoading"  v-for="(item, index) in confirmList" >
                        <div v-show="tabname == 2 && !loading && !isLoading" :key="item.id" :index="index" class="van-address-item">
                            <div class="van-cell van-cell--borderless">
                                <div class="van-cell__value van-cell__value--alone van-address-item__value" @click="selectHContract(item , index);" >
                                    <div role="radio" tabindex="-1" aria-checked="false" class="van-radio">
                                        <span class="van-radio__label">
                                            <div class="van-address-item__name">{{ item.create_by }} {{ item.department }} <span class="van-tag van-tag--round van-tag--danger van-address-item__tag">{{ vstatus[item.status] }}</span></div>
                                            <div class="van-address-item__address">{{ item.address }}</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
                <template v-show="tabname == 3 && !loading && !isLoading">
                    <template v-show="tabname == 3 && !loading && !isLoading"  v-for="(item, index) in doneList" >
                        <div v-show="tabname == 3 && !loading && !isLoading" :key="item.id" :index="index" class="van-address-item">
                            <div class="van-cell van-cell--borderless">
                                <div class="van-cell__value van-cell__value--alone van-address-item__value" @click="selectHContract(item , index);" >
                                    <div role="radio" tabindex="-1" aria-checked="false" class="van-radio">
                                        <span class="van-radio__label">
                                            <div class="van-address-item__name">{{ item.create_by }} {{ item.department }} <span class="van-tag van-tag--round van-tag--danger van-address-item__tag">{{ vstatus[item.status] }}</span></div>
                                            <div class="van-address-item__address">{{ item.address }}</div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </section>

        <van-overlay id='van-overlay-content' :show="tag.showOverlay" @click="showOverlayConfirm('cancel',()=>{});">
            <div class="wrapper" @click="showOverlayConfirm('cancel',()=>{});">
                <div :class="block.showOverlay">
                    <van-loading size="2.5rem" style="margin:2.35rem 2.35rem;" type="spinner" color="#1989fa" />
                </div>
            </div>
        </van-overlay>

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
            id: '',
            initList: [],
            confirmList: [],
            doneList: [],
            rejectList: [],
            hContractID: '',
            tname: 'bs_visit_apply',
            tabmap: {
                '1': 'initList',
                '2': 'confirmList',
                '3': 'doneList',
                '4': 'rejectList',
            },
            back: '/app/app_subvisitor',
            searchWord: '',
            searchFlag: false,
            dropMenuOldValue: '',
            dropMenuValue: '',
            dropMenuOption: [{
                    text: '刷新',
                    value: 2,
                    icon: 'replay'
                },
                {
                    text: '搜索',
                    value: 3,
                    icon: 'search'
                },
                {
                    text: '重置',
                    value: 4,
                    icon: 'aim'
                },
                {
                    text: '应用',
                    value: 5,
                    icon: 'apps-o'
                },
                {
                    text: '首页',
                    value: 6,
                    icon: 'wap-home-o'
                },
            ],
            vstatus: {
                init: '待处理',
                confirm: '未到访',
                visit: '已到访',
                devisit: '已作废',
                invalid: '已作废',
            },
            cstatus: {
                init: 5,
                confirm: 6,
                visit: 7,
                devisit: 8,
                invalid: 9,
            },
            isLoading: false,
            loading: false,
            json_fields: {
                '排序编号': 'serialid',
                '登记时间': 'create_time',
                '物品名称': 'name',
                '物品数量': 'amount',
                '领用类型': 'type',
                '领用人员': 'receive_name',
                '领用公司': 'company',
                '领用部门': 'department',
                '接待人员': 'user_admin_name',
                '备注说明': 'remark',
                '审批状态': 'status',
            },
            json_data: [],
            tablename: 'bs_visit_apply',
            tag: {
                showOverlay:false,
            },
            block: {
                showOverlay: '',
            },
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
        tabname() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 500);
        }
    },
    methods: {
        encodeURI(value) {
            return window.encodeURIComponent(value);
        },
        //点击显示或者隐藏菜单
        async headMenuToggle() {
            this.$refs.headMenuItem.toggle();
        },
        //点击顶部搜索
        async headMenuSearch() {
            if (this.searchWord) {
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
        async headDropMenu(value) {
            const val = this.dropMenuValue;
            switch (val) {
                case 0: //只显示合同类信息
                    this.dropMenuOldValue = this.sealType = val;
                    await this.queryTabList(this.tabname, 0);
                    break;
                case 1: //只显示非合同类信息
                    this.dropMenuOldValue = this.sealType = val;
                    await this.queryTabList(this.tabname, 0);
                    break;
                case 2: //刷新数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.queryTabList(this.tabname, 0);
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
                    await this.queryTabList(this.tabname, 0);
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
        async queryInfo() {
            //强制渲染
            this.$forceUpdate();
            //获取tabname
            this.tabname = Betools.storage.getStore('system_visitorview_list_tabname') || '1';
            //查询页面数据
            await this.queryTabList(this.tabname, 0);
            //获取返回页面
            this.back = Betools.tools.getUrlParam('back') || '/app';
        },
        async queryTabList(tabname, page) {

            //获取当前用户信息
            const userinfo = await Betools.storage.getStore('system_userinfo');
            //获取最近12个月对应的日期
            var month = dayjs().subtract(12, 'months').format('YYYY-MM-DD');
            const cstatus = this.cstatus;
            //设置查询语句
            var searchSql = '';
            //如果存在搜索关键字
            if (this.searchWord) {
                searchSql = `~and((name,like,~${this.searchWord}~)~or(create_by,like,~${this.searchWord}~)~or(create_time,like,~${this.searchWord}~)~or(employee,like,~${this.searchWord}~)~or(mobile,like,~${this.searchWord}~)~or(position,like,~${this.searchWord}~)~or(address,like,~${this.searchWord}~)~or(visitor_name,like,~${this.searchWord}~)~or(visitor_company,like,~${this.searchWord}~)~or(visitor_mobile,like,~${this.searchWord}~)~or(visitor_position,like,~${this.searchWord}~)~or(time,like,~${this.searchWord}~)~or(dtime,like,~${this.searchWord}~)~or(zone,like,~${this.searchWord}~)~or(company,like,~${this.searchWord}~)~or(department,like,~${this.searchWord}~)~or(user_admin_name,like,~${this.searchWord}~))`;
            }
            if (tabname == 1) {
                this.initList = await Betools.manage.queryTableData(this.tname, `_where=(status,in,init,confirm)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-create_time`);
                this.initList.map((item, index) => {
                    item.name = item.address;
                    item.address = item.visitor_company + '的' + item.visitor_name + `预计${dayjs(item.time).format('YYYY-MM-DD')} ${item.dtime}到访。`,
                        item.tel = '';
                    item.isDefault = true;
                })
                this.initList = this.initList.sort(function(a, b) { //callback
                    const value = cstatus[a.status] * 100000000000000 + (100000000000000 - parseInt(dayjs(a.create_time).format('YYYYMMDDHHmmss')));
                    const value_ = cstatus[b.status] * 100000000000000 + (100000000000000 - parseInt(dayjs(b.create_time).format('YYYYMMDDHHmmss')));
                    console.log(`value:${value},value_:${value_}`);
                    return value - value_;  //返回正数 ，b排列在a之前
                });
                this.initList = this.initList.filter(item => {
                    return item.id == item.pid;
                });
            } else if (tabname == 2) {
                this.confirmList = await Betools.manage.queryTableData(this.tname, `_where=(status,eq,visit)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-create_time`);
                this.confirmList.map((item, index) => {
                    item.name = item.address;
                    item.address = item.visitor_company + '的' + item.visitor_name + `预计${dayjs(item.time).format('YYYY-MM-DD')} ${item.dtime}到访。`,
                        item.tel = '';
                    item.isDefault = true;
                })
                this.confirmList = this.confirmList.filter(item => {
                    return item.id == item.pid;
                });
            } else if (tabname == 3) {
                this.doneList = await Betools.manage.queryTableData(this.tname, `_where=(status,in,devisit,invalid)~and(user_group_ids,like,~${userinfo.username}~)~and(create_time,gt,${month})${searchSql}&_sort=-create_time`);
                this.doneList.map((item, index) => {
                    item.name = item.address;
                    item.address = item.visitor_company + '的' + item.visitor_name + `预计${dayjs(item.time).format('YYYY-MM-DD')} ${item.dtime}到访。`,
                        item.tel = '';
                    item.isDefault = true;
                })
                this.doneList = this.doneList.filter(item => {
                    return item.id == item.pid;
                });
            }
        },
        async selectHContract(item) {

            //查询当前用印信息
            const id = item.id;

            //根据当前状态，跳转到不同页面
            if (this.tabname == '1') {
                Betools.storage.setStore('system_visitorview_list_tabname', this.tabname);
                //跳转到相应的用印界面
                this.$router.push(`/app/visitorview?id=${id}&statustype=${item.status}&role=front&confirm=confirm&back=visitorlist`);
            } else if (this.tabname == '2') {
                Betools.storage.setStore('system_visitorview_list_tabname', this.tabname);
                //跳转到相应的用印界面
                this.$router.push(`/app/visitorview?id=${id}&statustype=${item.status}&role=front&confirm=confirm&back=visitorlist`);
            } else if (this.tabname == '3') {
                Betools.storage.setStore('system_visitorview_list_tabname', this.tabname);
                //跳转到相应的用印界面
                this.$router.push(`/app/visitorview?id=${id}&statustype=${item.status}&role=front&confirm=confirm&back=visitorlist`);
            }

        },

        //显示遮罩
        async showOverlayConfirm(action = 'cancel', done) {
            await Betools.manage.showOverlayConfirm(action, done, this.tag, this.block);
        },

        async handleConfirm(element, key, value, visitType = '已到访') {

            if (element.status == 'init') {
                await vant.Dialog.confirm({
                    title: '到访确认',
                    message: `您好，被访人${element.create_by}尚未进行预约确认，您确定进行${element.visitor_name}的到访确认操作？`,
                });
            } else {
                await vant.Dialog.confirm({
                    title: '到访确认',
                    message: `您好，请确认进行${element.visitor_name}的到访确认操作？`,
                });
            }

            //显示遮罩
            this.showOverlayConfirm('confirm', ()=>{});

            console.log(`key:`, key, ` value:`, value, ` element:`, element);
            const status = visitType == '已到访' ? 'visit' : 'confirm';

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo');

            //表单ID
            const id = element.id;

            //检查用户是否具有权限进行审批
            const response = await Betools.query.queryRoleGroupList('COMMON_VISIT_AUTH', userinfo.username);

            //获取到印章管理员组信息
            let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
            user_group_ids = user_group_ids + ',' + element.create_by;

            //获取到用户列表数据
            if (Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username)) {
                this.showOverlayConfirm('cancel', ()=>{});
                await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '您没有访客管理的审批权限，请联系管理员进行处理！',
                });
                return;
            }

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&role=receive`);

            //第一步 保存用户数据到数据库中
            const elem = {
                status: status,
                remark: element.address,
            }; // 待处理元素

            //第二步，向表单提交form对象数据
            (async(tablename, id, elem)=>{
                try {
                    const result = await Betools.manage.patchTableData(tablename, id, elem);
                    console.log(`visit confirm result: `,result);
                } catch (error) {
                    await Betools.manage.patchTableData(tablename, id, elem);
                }
            })(this.tablename, id, elem);

            //第三步 向被拜访人员推送已到访到访通知
            if (status == 'visit') {
                (async(element,receiveURL)=>{
                    try {
                        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${element.mobile}/亲爱的同事，${element.visitor_company}的${element.visitor_name}等已到访，联系电话：${element.visitor_mobile}, 请您提前做好接待准备！?rurl=${receiveURL}`)
                            .set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                    } catch (error) {
                        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${element.mobile}/亲爱的同事，${element.visitor_company}的${element.visitor_name}等已到访，联系电话：${element.visitor_mobile}, 请您提前做好接待准备！?rurl=${receiveURL}`)
                            .set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                    }
                })(element,receiveURL);
            }
            
            //获取后端配置前端管理员组
            const front = user_group_ids;
            const front_name = user_group_ids;

            /************************  工作流程日志(开始)  ************************/
            (async (userinfo,tablename,visitType,element)=>{
                //查询当前所有待办记录
                let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo.username, userinfo.realname, 0, 1000);
                //过滤出只关联当前流程的待办数据
                tlist = tlist.filter(item => {
                    return item.id == id && item.pid == pid;
                });
                //同时删除本条待办记录当前(印章管理员)
                await Betools.workflow.deleteViewProcessLog(tlist);
                //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                const prLogHisNode = {
                    id: Betools.tools.queryUniqueID(),
                    table_name: tablename,
                    main_value: id,
                    proponents: userinfo.username,
                    business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                    business_code: '000000000', //varchar(100)  null comment '业务编号',
                    process_name: '用印流程审批', //varchar(100)  null comment '流程名称',
                    employee: userinfo.realname, //varchar(1000) null comment '操作职员',
                    approve_user: userinfo.username, //varchar(100)  null comment '审批人员',
                    action: visitType == '已到访' ? '已到访' : '预约确认', //varchar(100)  null comment '操作动作',
                    action_opinion: '来访申请审批[' + (visitType == '已到访' ? '已到访' : '预约确认') + ']', //text          null comment '操作意见',
                    operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                    functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                    process_station: '来访审批[' + (visitType == '已到访' ? '已到访' : '预约确认') + ']', //varchar(100)  null comment '流程岗位',
                    business_data: JSON.stringify(element), //text          null comment '业务数据',
                    content: `来访申请(${element.type}) ` + element.name + ' #被访人员: ' + element.create_by, //text          null comment '业务内容',
                    process_audit: element.id + '##' + element.serialid, //varchar(100)  null comment '流程编码',
                    create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                    relate_data: '', //text          null comment '关联数据',
                    origin_data: '',
                }
                await Betools.workflow.approveViewProcessLog(prLogHisNode);
                /************************  工作流程日志(结束)  ************************/
            })(userinfo,this.tablename,visitType,element);

            //设置状态
            this.loading = false;
            this.status = elem.status;
            this.readonly = true;
            element.status = elem.status;
            this.role = 'view';

            //查询页面数据
            setTimeout(async()=>{
                await Betools.manage.patchTableData(this.tablename, id, elem);
                console.log(`refresh query table list one ... `);
                await this.queryTabList(this.tabname, 0);
                await Betools.tools.sleep(1500);
                console.log(`refresh query table list two ... `);
                await this.queryTabList(this.tabname, 0);
                await Betools.tools.sleep(3000);
                console.log(`refresh query table list three ... `);
                await this.queryTabList(this.tabname, 0);
            },500);

            //隐藏遮罩
            this.showOverlayConfirm('cancel', ()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: `预约人员:${element.visitor_name}，已经` + (visitType == '已到访' ? '到访' : '确认') + '！',
            });

        }
    }
}
</script>

<style scoped>
@import "../../assets/css/explore.css";
@import "../../assets/css/seallist.css";
@import "../../assets/css/goodslist.css";
@import "../../assets/css/visitor.css";
</style>
