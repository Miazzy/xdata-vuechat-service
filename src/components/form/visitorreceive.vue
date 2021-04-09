<template>
<keep-alive>

    <!--首页组件-->
    <div id="content" style="margin-top: 0px;">

        <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;">
            <div class="center">
                <router-link v-show="back!='common' && role != 'visitor' " :to="back" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                    <span>返回</span>
                </router-link>
                <span>访客登记</span>
                <van-dropdown-menu v-show="back!='common'" id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
                    <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
                    <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
                </van-dropdown-menu>
            </div>
        </header>

        <section>

            <div class="weui-cells" style="margin-top:0px;">

                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
                    <van-notice-bar v-show=" title!='' && title != null && typeof title != 'undefined' " left-icon="volume-o" color="#1989fa" background="#ecf9ff" :text="title" />
                </div>

                <div class="" id="scanCell" style="padding: 8px 10px 4px 10px;">
                    <van-row>
                        <van-col span="8"></van-col>
                        <van-col span="8" style="text-align: center;font-size:1.15rem;">来访登记</van-col>
                        <van-col span="8"></van-col>
                    </van-row>
                </div>

            </div>

            <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
                </div>
                <div class="weui-cells" style="margin-top:0px;margin-left:10px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

                    <van-cell-group>

                        <van-form>

                            <van-cell-group id="van_visit_group" style="margin-top:10px;">
                                <van-cell value="到访信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field :readonly="readonly" required clearable label="被访人员" v-model="item.create_by" placeholder="请填写被访人员的姓名！" @blur="validField('create_by');queryCUserName();" :error-message="message.create_by" @click="queryCUserName();" />
                                <van-address-list v-show="cuserList.length > 0 && false" v-model="cuserid" :list="cuserList" default-tag-text="默认" edit-disabled @select="selectCUserName" />
                                <van-field v-show="false" :readonly="readonly" required clearable label="职务名称" v-model="item.position" placeholder="请填写被访人员的职务名称！" @blur="validField('position')" :error-message="message.position" />
                                <van-field :readonly="readonly" required clearable label="联系电话" v-model="item.mobile" placeholder="请填写被访人员的联系电话！" @blur="validField('mobile');" :error-message="message.mobile" />
                                <van-field v-show=" !(back != 'common' && role !='visitor') " :readonly="true" required clearable label="到访地址" v-model="item.address" placeholder="请选择到访地址" />
                                <check-select v-show="back != 'common' && role !='visitor' " required label="到访地址" placeholder="请选择到访地址" v-model="item.address" :columns="fileColumns" :option="{ label:'name',value:'name',title:'title',all:false, search:true, margin:'35px 3px 0px 0px' , classID:'van-field-check-select'}" @confirm="fileConfirm" />
                                <van-field v-show="false" required clearable label="客户接待" v-model="item.user_admin_name" placeholder="请输入客服接待员!" @blur="validField('user_admin_name');queryUserName();" :error-message="message.user_admin_name" @click="queryUserName();" />
                                <van-address-list v-show="userList.length > 0" v-model="userid" :list="userList" default-tag-text="默认" edit-disabled @select="selectUserName" />
                            </van-cell-group>

                            <van-cell-group id="van-visit-group" style="margin-top:10px;position:relative;">

                                <van-cell value="来访信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                                <van-field :readonly="readonly" required clickable clearable label="预约日期" v-model="item.time" placeholder="请选择预约时间！" @blur="validField('')" @click="tag.showPickerTime = true" />
                                <single-select v-show="false" required label="来访时间" placeholder="请选择来访时间" v-model="item.dtime" @confirm="typedTimeConfirm" :columns="typedTimeColumns" :option="{ label:'name',value:'name',title:'',all: false , search: false , margin:'0px 0px' , classID:'',}" />
                                <van-field :readonly="readonly" required clickable clearable label="来访时间" v-model="item.dtime" placeholder="请选择来访时间!" @blur="validField('')" @click="tag.showPickerDTime = true" />

                                <van-field :readonly="readonly" required clearable label="访客姓名" v-model="item.visitor_name" placeholder="请填写访客姓名！" @blur="validField('visitor_name')" :error-message="message.visitor_name" />
                                <van-field :readonly="readonly" :required="true" clearable label="访客单位" v-model="item.visitor_company" placeholder="请填写来访单位！" @blur="validField('visitor_company')" :error-message="message.visitor_company" />
                                <van-field v-show="false" :readonly="readonly" required clearable label="访客职务" v-model="item.visitor_position" placeholder="请填写访客职务！" @blur="validField('visitor_position')" :error-message="message.visitor_position" />
                                <van-field :readonly="readonly" required clearable label="访客电话" type="number" v-model="item.visitor_mobile" placeholder="请填写访客电话！" @blur="validField('visitor_mobile')" :error-message="message.visitor_mobile" />
                                <van-field :readonly="readonly" required clearable label="来访人数" type="number" v-model="item.visitor_count" placeholder="请填写来访人数！" @blur="validField('visitor_count')" :error-message="message.visitor_count" />

                            </van-cell-group>

                            <van-cell-group v-show="size>=2" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">
                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name1" placeholder="请填写访客姓名！" @blur="validField('visitor_name1')" :error-message="message.visitor_name1" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile1" placeholder="请填写访客电话！" @blur="validField('visitor_mobile1')" :error-message="message.visitor_mobile1" />
                                <span class="van-goods-span-number">#2</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=3" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">
                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name2" placeholder="请填写访客姓名！" @blur="validField('visitor_name2')" :error-message="message.visitor_name2" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile2" placeholder="请填写访客电话！" @blur="validField('visitor_mobile2')" :error-message="message.visitor_mobile2" />
                                <span class="van-goods-span-number">#3</span>
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <!-- 备注说明（HR需要确认/修改） -->
                                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.remark" rows="2" autosize type="textarea" maxlength="256" placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" />
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

                            <van-popup v-model="tag.showPickerTime" round position="bottom">
                                <van-datetime-picker v-model="datetime" type="date" title="选择日期" :min-date="minDate" @confirm="dateConfirm" @cancel="tag.showPickerTime = false;" />
                            </van-popup>

                            <van-popup v-model="tag.showPickerDTime" round position="bottom">
                                <van-datetime-picker v-model="item.dtime" type="time" title="选择时间" :min-hour="8" :max-hour="17" @confirm="tag.showPickerDTime = false;" @cancel="tag.showPickerDTime = false;" />
                            </van-popup>

                        </van-form>

                    </van-cell-group>

                    <div v-show=" !item.serialid && !tag.showOverlay " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleApply();" style="border-radius: 10px 10px 10px 10px; text-align: center;">提交</van-button>
                    </div>

                    <div v-show=" role == 'edit' && !tag.showOverlay  " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:0px solid #efefef;">
                        <van-button color="linear-gradient(to right, #ffd01e, #ff8917)" type="warning" text="作废预约" @click="handleDisagree('已作废');" style="border-radius: 10px 10px 10px 10px;margin-right:10px;width:46.5%;float:left;" />
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm('确认');" style="border-radius: 10px 10px 10px 10px; text-align: center;float:right;width:46.5%;">修改预约</van-button>
                    </div>

                    <div style="height:500px;"></div>
                </div>
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
            pageName: "详情",
            momentNewMsg: true,
            tabname: '1',
            active: 1,
            id: '',
            type: '',
            title: '访客登记',
            content: '',
            files: '',
            from: '',
            tname: '',
            bname: '',
            tasktype: 'done',
            previewurl: '',
            purl: '',
            tableInfo: '',
            orderInfo: '',
            status: '',
            status_type: '',
            fields: [],
            groupid: 'group00',
            sealuserid: '',
            userid: '',
            userList: [],
            cuserid: '',
            cuserList: [],
            huserid: '',
            huserList: [],
            auserid: '',
            auserList: [],
            fuserid: '',
            fuserList: [],
            muserid: '',
            muserList: [],
            vstatus: {
                init: '待处理',
                confirm: '已确认',
                visit: '已到访',
                devisit: '未到访',
                invalid: '已作废',
            },
            size: 1,
            processLogList: [],
            iswechat: false,
            isfirst: true,
            dockFlag: false,
            typeColumns: ['访客登记'],
            fileColumns: [],
            message: Betools.workconfig.compValidation.visitorapply.message,
            valid: Betools.workconfig.compValidation.visitorapply.valid,
            minDate: new Date(dayjs().format('YYYY'), 0, 1),
            datetime: '',
            item: {
                id: '',
                serialid: '',
                time: dayjs().format('YYYY-MM-DD'),
                dtime: dayjs().format('HH:mm'),
                create_by: '',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                visitor_name: '', //访客姓名
                visitor_company: '', //访客单位
                visitor_mobile: '', //访客电话
                visitor_position: '', //访客职务
                employee: '', //填报人名称
                mobile: '', //填报人电话
                department: '', //填报人部门名称
                company: '', //填报人单位名称
                position: '', //填报人岗位
                remark: '', //备注说明
                userid: '',
                user_group_ids: '',
                user_group_names: '',
                user_admin_name: '',
                zone_name: '',
                status: '',
            },
            back: '/app',
            role: '',
            workflowlist: [],
            announces: [],
            informList: [],
            fileList: [],
            loading: false,
            officeList: [],
            addressList: [],
            tag: {
                showPickerTime: false,
                showPickerDTime: false,
                showOverlay:false,
            },
            block: {
                showOverlay: '',
            },
            searchFlag: false,
            dropMenuOldValue: '',
            dropMenuValue: '',
            dropMenuOption: [{
                    text: '刷新',
                    value: 2,
                    icon: 'replay'
                },
                {
                    text: '重置',
                    value: 4,
                    icon: 'aim'
                },
            ],
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            currentKey: '',
            tablename: 'bs_visit_apply',
            readonly: false,
            goodstype: Betools.workconfig.goodstype,
        }
    },
    async activated() {
        this.queryInfo();
    },
    async mounted() {
        this.queryInfo();
    },
    methods: {
        async dateConfirm() {
            try {
                this.item.time = dayjs(this.datetime).format('YYYY-MM-DD');
                this.tag.showPickerTime = false;
            } catch (error) {
                console.log(error);
            }
        },
        async fileConfirm(value, index, resp) {
            try {
                if (this.back == 'common' || this.role == 'visitor') {
                    //弹出确认提示
                    await vant.Dialog.alert({
                        title: '温馨提示',
                        message: '您好，无法修改到访地址！',
                    });
                } else {
                    const item = this.fileColumns.find(item => {
                        return item.name == value;
                    })
                    this.item.userid = item.userid;
                    this.item.user_admin_name = item.username;
                    this.item.user_group_ids = item.userlist;
                    this.item.user_group_names = item.realname;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async typedTimeConfirm(value, index, resp) {
            console.log(value + ' ' + resp);
            const transfer_type = resp == '上午' ? '上午' : '下午';
            this.item.dtime = transfer_type;
        },
        // 企业微信登录处理函数
        async weworkLogin() {
            try {
                return await Betools.query.queryWeworkUser();
            } catch (error) {
                console.log(error);
            }
        },
        // 点击显示或者隐藏菜单
        async headMenuToggle() {
            this.$refs.headMenuItem.toggle();
        },
        // 点击顶部搜索
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
        // 点击右侧菜单
        async headDropMenu(value) {
            const val = this.dropMenuValue;
            switch (val) {
                case 2: //刷新数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.reduction();
                    break;
                case 3: //查询数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.reduction();
                    break;
                case 4: //重置数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.reduction();
                    break;
                default:
                    console.log(`no operate. out of switch. `);
            }
        },
        // 查询来访地址
        async queryAddress() {
            if (!!this.item.address) {
                //从用户表数据中获取填报人资料
                let list = await Betools.manage.queryAddressByName(this.item.address.trim());
                if (!!list && Array.isArray(list)) {
                    try {
                        list.map((elem, index) => {
                            this.addressList.push({
                                id: elem.serialid,
                                zonename: elem.zonename,
                                userlist: elem.userlist,
                                reception: elem.userlist_reception,
                                reception_name: elem.userlist_reception_name,
                                name: elem.zonename,
                                tel: '',
                                address: elem.address,
                                company: '',
                                department: '',
                                mail: elem.email,
                                isDefault: !index
                            });
                        });
                        this.item.address = addressList[0].address; // 设置地址信息
                        this.item.zone_name = addressList[0].zonename;
                        this.item.userid = addressList[0].reception;
                        this.item.user_admin_name = addressList[0].reception_name;
                        this.addressList = this.addressList.filter((item, index) => {
                            let findex = this.addressList.findIndex((subitem, index) => {
                                return subitem.name == item.name
                            });
                            return index == findex;
                        });
                        await this.queryUserName();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        // 选择来访地址
        async selectAddress(name, value) {
            //选择来访地址后，接待人员被相应带出，来访地址和接待人员是关联的
            this.item.address = name.address; // 设置地址信息
            this.item.zone_name = name.zonename;
            this.item.userid = name.reception;
            this.item.user_admin_name = name.reception_name;
            await this.queryUserName();
        },
        // 用户选择接待人员
        async queryCUserName() {
            const user_admin_name = this.item.create_by; //获取接待人员信息
            if (!user_admin_name || user_admin_name.length <= 1) {
                return;
            }
            if (!!user_admin_name) {
                let user = await Betools.manage.queryUserByNameVHRM(user_admin_name.trim()); //从用户表数据中获取填报人资料
                if (!!user && Array.isArray(user)) {
                    this.cuserList = [];
                    try {
                        user.map((elem, index) => {
                            let company = elem.company.split('||')[0];
                            company = company.slice(company.lastIndexOf('>') + 1);
                            this.cuserList.push({
                                id: elem.userid,
                                name: elem.name,
                                tel: '',
                                address: company + '||' + elem.departname,
                                company: elem.company,
                                department: elem.departname,
                                mail: elem.email,
                                position: elem.position,
                                isDefault: !index
                            });
                        });
                        this.item.create_by = user[0].name; //获取盖印人姓名
                        this.item.cuserid = this.cuserid = user[0].userid; //当前盖印人编号
                        this.item.position = user[0].position;
                        this.cuserList = this.cuserList.filter((item, index) => {
                            item.isDefault = index == 0 ? true : false;
                            let findex = this.cuserList.findIndex((subitem, index) => {
                                return subitem.id == item.id
                            });
                            return index == findex;
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        // 用户选择接待人员
        async queryUserName() {
            const user_admin_name = this.item.user_admin_name; //获取接待人员信息
            if (!!user_admin_name) {
                let user = await Betools.manage.queryUserByNameHRM(user_admin_name.trim()); //从用户表数据中获取填报人资料
                if (!!user && Array.isArray(user)) {
                    this.userList = [];
                    try {
                        user.map((elem, index) => {
                            let company = elem.textfield1.split('||')[0];
                            company = company.slice(company.lastIndexOf('>') + 1);
                            let department = elem.textfield1.split('||')[1];
                            department = department.slice(department.lastIndexOf('>') + 1);
                            this.userList.push({
                                id: elem.loginid,
                                name: elem.lastname,
                                tel: '',
                                address: company + "||" + elem.textfield1.split('||')[1],
                                company: company,
                                department: department,
                                mail: elem.email,
                                isDefault: !index
                            });
                        });
                        this.item.user_admin_name = user[0].lastname; //获取盖印人姓名
                        this.item.userid = this.userid = user[0].loginid; //当前盖印人编号
                        this.userList = this.userList.filter((item, index) => {
                            item.isDefault = index == 0 ? true : false;
                            let findex = this.userList.findIndex((subitem, index) => {
                                return subitem.id == item.id
                            });
                            return index == findex;
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        // 选中当前接待人员
        async selectCUserName(key, value, index) {
            this.item.create_by = key.name;
            this.item.position = key.position;
            console.log('key:' + JSON.stringify(key) + " value:" + value);
        },
        // 选中当前接待人员
        async selectUserName(value) {
            const id = this.userid;
            const user = this.userList.find((item, index) => {
                return id == item.id
            }); //获取接待人员姓名
            this.item.userid = id;
            this.item.user_admin_name = user.name;
        },
        // 设置重置
        async reduction() {
            this.item = {
                id: '',
                serialid: '',
                time: dayjs().format('YYYY-MM-DD'),
                dtime: dayjs().format('HH:mm'),
                create_by: '',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                visitor_name: '', //访客姓名
                visitor_company: '', //访客单位
                visitor_mobile: '', //访客电话
                visitor_position: '', //访客职务
                employee: '', //填报人名称
                mobile: '', //填报人电话
                department: '', //填报人部门名称
                company: '', //填报人单位名称
                position: '', //填报人岗位
                remark: '', //备注说明
                userid: '',
                user_group_ids: '',
                user_group_names: '',
                user_admin_name: '',
                status: '',
            };
        },
        // 获取处理日志
        async queryProcessLog() {

            const id = Betools.tools.getUrlParam('id');
            const pid = Betools.tools.getUrlParam('pid');

            try {
                this.processLogList = await Betools.workflow.queryPRLogHistoryByDataID(id);

                //如果查询出出来记录，则将处理记录排序
                if (this.processLogList && this.processLogList.length > 0) {

                    this.processLogList.map(item => {
                        item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm')
                    });
                    this.processLogList.sort();

                    //获取最后一条处理记录，如果是已完成，或者已驳回，则删除待办记录
                    const temp = this.processLogList[this.processLogList.length - 1];

                    //检查状态并删除多余记录
                    if ((temp.action == '完成' && temp.action_opinion.includes('已完成')) || (temp.action == '确认' && temp.action_opinion.includes('已驳回'))) {
                        await this.deleteProcessLog();
                    }

                }

            } catch (error) {
                console.log(error);
            }
        },
        // 删除处理日志
        async deleteProcessLog() {

            const id = Betools.tools.getUrlParam('id');
            const pid = Betools.tools.getUrlParam('pid');

            //查询业务编号，如果不存在，则直接返回
            if (Betools.tools.isNull(id) || Betools.tools.isNull(pid)) {
                return;
            }

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

            if (userinfo) {
                //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
                let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo && userinfo.username !== 'commmon' ? userinfo.username : '', userinfo && userinfo.username !== 'commmon' ? userinfo.realname : '', 0, 1000);

                //过滤出只关联当前流程的待办数据
                tlist = tlist.filter(item => {
                    return item.id == id && item.pid == pid;
                });

                if (tlist.length > 0) {
                    //同时删除本条待办记录当前(印章管理员)
                    await Betools.workflow.deleteViewProcessLog(tlist);
                }
            }

        },

        // 选中当前盖印人
        async selectFrontUser(value) {
            const id = this.item.front_id;
            const user = this.fuserList.find((item, index) => {
                return id == item.id
            });
            this.item.front_name = user.name; //获取盖印人姓名
            this.item.front_id = id;
        },
        // 字段必填有效验证
        validField(fieldName) {
            //获取用户基础信息
            let userinfo = Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

            // 邮箱验证正则表达式
            const regMail = Betools.workconfig.system.config.regexp.mail;

            if (fieldName.toLocaleLowerCase().includes('amount') && /^\+?[1-9][0-9]*$/.test(this.item[fieldName])) {
                this.message[fieldName] = /^\+?[1-9][0-9]*$/.test(this.item[fieldName]) ? '请填写借用数量及借用单位，注意单位！' : '';
                return Betools.tools.isNull(this.message[fieldName]);
            }

            if (fieldName.toLocaleLowerCase().includes('mail') && !regMail.test(this.item[fieldName])) {
                this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
                return Betools.tools.isNull(this.message[fieldName]);
            }

            this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';
            Betools.storage.setStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo && userinfo.username !== 'commmon' ? userinfo.realname : '' }`, JSON.stringify(this.item), 3600 * 2);

            return Betools.tools.isNull(this.message[fieldName]);
        },

        // 获取URL或者二维码信息
        async queryInfo() {

            try {
                this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
                this.userinfo = await this.weworkLogin(); //查询当前登录用户
                this.back = Betools.tools.getUrlParam('back') || '/app'; //查询上一页
                this.role = Betools.tools.getUrlParam('role');

                //获取用户基础信息
                const userinfo = await Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

                //自动回显刚才填写的用户基础信息
                this.item.create_by = userinfo && userinfo.username !== 'commmon' ? userinfo.realname : '';
                this.item.employee = userinfo.username || userinfo.userid;
                this.item.department = userinfo && userinfo.username !== 'commmon' ? userinfo.department.name : '';
                this.item.company = userinfo && userinfo.username !== 'commmon' ? userinfo.parent_company.name : '';
                this.item.mobile = userinfo && userinfo.username !== 'commmon' ? userinfo.mobile : '';
                this.item.position = userinfo && userinfo.username !== 'commmon' ? userinfo.position : '';
                this.item.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');

                const clist = await Betools.manage.queryTableData('bs_admin_address', `_where=(status,in,100)&_sort=-id&_p=0&_size=1000`); // 获取最近12个月的已用印记录
                clist.map((item, index) => {
                    item.title = item.name.slice(0, 16);
                    item.code = item.id;
                    item.tel = '';
                    item.addressinfo = item.name;
                    item.name = item.name;
                    item.isDefault = true;
                });
                this.fileColumns = clist;
                this.item.address = clist[0].name;
                this.item.userid = clist[0].userid;
                this.item.user_admin_name = clist[0].username;
                this.item.user_group_ids = clist[0].userlist;
                this.item.user_group_names = clist[0].realname;

                //查询编号
                const id = Betools.tools.getUrlParam('id');

                //查询领用数据
                let tlist = await Betools.query.queryTableDataByPid(this.tablename, id);
                const item = tlist[0];
                //自动回显刚才填写的用户基础信息
                if (item) {
                    this.item.id = item.id;
                    this.item.serialid = item.serialid || this.item.serialid
                    this.item.time = dayjs(item.time).format('YYYY-MM-DD') || this.item.time
                    this.item.dtime = item.dtime;
                    this.item.create_by = item.create_by || this.item.create_by;
                    this.item.create_time = item.create_time || this.item.create_time;
                    this.item.visitor_name = item.visitor_name || this.item.visitor_name;
                    this.item.visitor_company = item.visitor_company || this.item.visitor_company;
                    this.item.visitor_mobile = item.visitor_mobile || this.item.visitor_mobile;
                    this.item.visitor_position = item.visitor_position || this.item.visitor_position;
                    this.item.employee = item.employee || this.item.employee;
                    this.item.mobile = item.mobile || this.item.mobile;
                    this.item.department = item.department || this.item.department;
                    this.item.company = item.company || this.item.company;
                    this.item.position = item.position || this.item.position;
                    this.item.remark = item.remark || this.item.remark;
                    this.item.userid = item.userid || this.item.userid;
                    this.item.address = item.address;
                    this.item.visitor_count = item.visitor_count;
                    this.item.user_group_ids = item.user_group_ids || this.item.user_group_ids;
                    this.item.user_group_names = item.user_group_names || this.item.user_group_names;
                    this.item.user_admin_name = item.user_admin_name || this.item.user_admin_name;
                    this.item.status = this.vstatus[item.status] || this.item.status;
                }

            } catch (error) {
                console.log(error);
            }

        },

        //显示遮罩
        async showOverlayConfirm(action = 'cancel', done) {
            await Betools.manage.showOverlayConfirm(action, done, this.tag, this.block);
        },

        // 用户提交入职登记表函数
        async handleApply() {

            //显示加载状态
            this.loading = true;

            const curdate = dayjs().format('YYYYMMDDHHmm');
            const applydate = dayjs(`${this.item.time} ${this.item.dtime}:00`).format('YYYYMMDDHHmm');
            console.log(`curdate: ${curdate} , applydate: ${applydate}`);

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

            //表单ID
            const id = Betools.tools.queryUniqueID();
            const type = Betools.tools.getUrlParam('type');

            //验证数据是否已经填写
            const keys = Object.keys({})

            const invalidKey = keys.find(key => {
                const flag = this.validField(key);
                return !flag;
            });

            if (invalidKey != '' && invalidKey != null) {
                this.showOverlayConfirm('cancel',()=>{});
                await vant.Dialog.alert({
                    title: '温馨提示',
                    message: `请确认内容是否填写完整，错误：${this.message[invalidKey]}！`,
                });
                return false;
            }

            //未获取到来访单位数据
            if (Betools.tools.isNull(this.item.visitor_company)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入访客单位！',
                });
            }

            //未获取到来访单位数据
            if (Betools.tools.isNull(this.item.visitor_name)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入访客姓名！',
                });
            }

            //未获取到来访单位数据
            if (Betools.tools.isNull(this.item.visitor_mobile)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入访客电话！',
                });
            }

            //未获取到来访单位数据
            if (Betools.tools.isNull(this.item.create_by)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入被访人员！',
                });
            }

            //未获取到来访单位数据
            if (Betools.tools.isNull(this.item.mobile)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入被访人员联系电话！',
                });
            }

            //未获取到来访单位数据
            if (Betools.tools.isNull(this.item.address)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请选择来访地址！',
                });
            }

            //验证访客电话号码是否正确
            if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.item.visitor_mobile)) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '尊敬的用户您好，您输入的访客联系电话格式有误，请重新输入！',
                });
            }

            //预约时间必须大于当前时间
            if(curdate >= applydate){
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '尊敬的用户您好，您输入的预约时间不能小于当前时间！',
                });
            }

            const ulist = await Betools.manage.queryUserByNameAndMobile(this.item.create_by, this.item.mobile)
            if (!ulist || ulist.length == 0) {
                this.showOverlayConfirm('cancel',()=>{});
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '尊敬的用户您好，未在系统中查询到此员工信息，请核对被访人员姓名或联系电话是否填写正确！',
                });
            } else {
                this.item.department = `${ulist[0].topname}${!Betools.tools.isNull(ulist[0].departname) ? '>' : ''}${Betools.tools.deNull(ulist[0].departname)}`;
            }

            //显示加载状态
            await this.showOverlayConfirm('confirm',()=>{});

            //查询直接所在工作组
            const response = await Betools.query.queryRoleGroupList('COMMON_VISIT_AUTH', this.item.userid);

            //获取到印章管理员组信息
            let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
            let user_group_names = response && response.length > 0 ? response[0].enuserlist : '';
            let zone = response && response.length > 0 ? response[0].zonename : '';
            let visitors = '';

            //如果未获取用户名称，则直接设置用印人为分组成员
            if (Betools.tools.isNull(user_group_ids)) {
                user_group_ids = this.item.userid;
                user_group_names = this.item.user_admin_name;
            }

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&type=${type}&role=front`);

            //第一步 保存用户数据到数据库中
            const elem = {
                id,
                create_by: this.item.create_by,
                employee: this.item.employee,
                department: this.item.department,
                company: this.item.company,
                mobile: this.item.mobile,
                position: this.item.position,
                create_time: this.item.create_time,
                visitor_name: this.item.visitor_name,
                visitor_company: this.item.visitor_company,
                visitor_mobile: this.item.visitor_mobile,
                visitor_position: this.item.visitor_position,
                visitor_count: this.item.visitor_count,
                time: this.item.time,
                dtime: this.item.dtime,
                address: this.item.address,
                zone_name: this.item.zone_name,
                zone,
                userid: this.item.userid,
                user_admin_name: this.item.user_admin_name,
                user_group_ids,
                user_group_names,
                pid: id,
                status: (this.role == 'visitor' || userinfo.username == 'commmon' || !userinfo || Betools.tools.isNull(this.item.create_by) || this.item.create_by == 'common') ? 'init' : 'confirm',
            }; // 待处理元素

            if ((this.role == 'visitor' || userinfo.username == 'commmon' || !userinfo || Betools.tools.isNull(this.item.create_by) || this.item.create_by == 'common')) {
                elem.status = 'init';
            }

            visitors = `您有来自${elem.visitor_company}的${elem.visitor_name}的拜访预约，联系电话:${elem.visitor_mobile}`;

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.postTableData(this.tablename, elem);

            //计算批量物品
            const tsize = this.size - 1;

            if (tsize >= 1) {

                for (let i = 1; i <= tsize; i++) {

                    let element = {
                        id: Betools.tools.queryUniqueID(),
                        create_by: this.item.create_by,
                        employee: this.item.employee,
                        department: this.item.department,
                        company: this.item.company,
                        mobile: this.item.mobile,
                        position: this.item.position,
                        create_time: this.item.create_time,
                        visitor_name: this.item['visitor_name' + i],
                        visitor_company: this.item['visitor_company'],
                        visitor_mobile: this.item['visitor_mobile' + i],
                        visitor_position: this.item['visitor_position' + i],
                        time: this.item.time,
                        dtime: this.item.dtime,
                        address: this.item.address,
                        zone_name: this.item.zone_name,
                        zone,
                        userid: this.item.userid,
                        user_admin_name: this.item.user_admin_name,
                        user_group_ids,
                        user_group_names,
                        pid: id,
                        status: (this.role == 'visitor' || userinfo.username == 'commmon' || !userinfo || Betools.tools.isNull(this.item.create_by) || this.item.create_by == 'common') ? 'init' : 'confirm',
                    };

                    if ((this.role == 'visitor' || userinfo.username == 'commmon' || !userinfo || Betools.tools.isNull(this.item.create_by) || this.item.create_by == 'common')) {
                        element.status = 'init';
                    }

                    //向表单提交form对象数据
                    await Betools.manage.postTableData(this.tablename, element);

                    visitors += `,${element.visitor_name}(${element.visitor_company} 电话:${element.visitor_mobile.slice(0,3) + '****' + element.visitor_mobile.slice(-4)})`;
                }
            }

            //第三步 向物品管理员推送通知，已准备办公用品等
            try {
                await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${user_group_ids},${this.item.employee},${this.item.mobile}/您好，${visitors}，将于${elem.time} ${elem.dtime}到访，请您确认！?rurl=${receiveURL}`)
                    .set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
            } catch (error) {
                console.log(error);
            }

            //设置状态
            this.loading = false;
            this.status = elem.status;
            this.readonly = true;

            //隐藏遮罩
            await this.showOverlayConfirm('cancel',()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '已提交访客预约申请！',
            });

            //记录操作日志
            await this.handleVisitApplyLogInfo(this.tablename , this.item , userinfo);
        },

        async handleVisitApplyLogInfo(tableName , item , userinfo){

            //发送自动设置排序号请求
            try {
                const patchResp = await superagent.get(Betools.workconfig.queryAPI.tableSerialAPI.replace('{table_name}', tableName)).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                console.log(`patch resp: `, patchResp);
            } catch (error) {
                console.log(error);
            }

            //查询数据
            const value = await Betools.query.queryTableData(tableName, id);
            //显示序列号
            item.serialid = value.serialid;

            /************************  工作流程日志(开始)  ************************/

            //获取后端配置前端管理员组
            const front = item.userid;
            const front_name = item.username;

            //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
            const prLogHisNode = {
                id: Betools.tools.queryUniqueID(),
                table_name: tableName,
                main_value: id,
                proponents: userinfo && userinfo.username !== 'commmon' ? userinfo.username : '访客',
                business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                business_code: '000000000', //varchar(100)  null comment '业务编号',
                process_name: '预约流程审批', //varchar(100)  null comment '流程名称',
                employee: userinfo && userinfo.username !== 'commmon' ? userinfo.realname : '访客', //varchar(1000) null comment '操作职员',
                approve_user: userinfo && userinfo.username !== 'commmon' ? userinfo.username : '访客', //varchar(100)  null comment '审批人员',
                action: '发起', //varchar(100)  null comment '操作动作',
                action_opinion: '发起预约申请[待处理]', //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: userinfo && userinfo.username !== 'commmon' ? userinfo.position : '', //varchar(100)  null comment '职能岗位',
                process_station: '预约审批[访客预约]', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(item), //text          null comment '业务数据',
                content: `访客预约(${item.type}) ` + item.name + ' #经办人: ' + userinfo && userinfo.username !== 'commmon' ? userinfo.username : '', //text          null comment '业务内容',
                process_audit: item.id + '##' + item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
                origin_data: '',
            }

            await Betools.workflow.approveViewProcessLog(prLogHisNode);

            //同时推送一条待办记录给印章管理员

            //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
            const prLogNode = {
                id: Betools.tools.queryUniqueID(),
                table_name: tableName,
                main_value: id,
                proponents: front,
                business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                business_code: '000000000', //varchar(100)  null comment '业务编号',
                process_name: '预约流程审批', //varchar(100)  null comment '流程名称',
                employee: front_name, //varchar(1000) null comment '操作职员',
                approve_user: front, //varchar(100)  null comment '审批人员',
                action: '', //varchar(100)  null comment '操作动作',
                action_opinion: '审批预约申请', //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: '前台', //varchar(100)  null comment '职能岗位',
                process_station: '预约审批[预约预约]', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(item), //text          null comment '业务数据',
                content: `预约预约(${item.type}) ` + item.name + '#待处理 #经办人: ' + userinfo.username, //text          null comment '业务内容',
                process_audit: item.id + '##' + item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
                origin_data: '',
            }

            await Betools.workflow.taskViewProcessLog(prLogNode);

            /************************  工作流程日志(结束)  ************************/
        },

        // 来访确认作废操作函数
        async handleDisagree(visitType) {
            //显示加载状态
            this.loading = true;

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo');

            //表单ID
            const id = this.item.id;
            const type = Betools.tools.getUrlParam('statustype');
            const pid = Betools.tools.getUrlParam('pid');

            //检查用户是否具有权限进行审批
            const response = await Betools.query.queryRoleGroupList('COMMON_VISIT_AUTH', userinfo.username);

            //获取到印章管理员组信息
            let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
            user_group_ids = user_group_ids + ',' + this.item.create_by;

            //获取到用户列表数据
            if (Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username)) {
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '您没有访客管理的审批权限，请联系管理员进行处理！',
                });
            }

            //返回驳回理由
            if (!this.item.remark) {
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入' + (visitType == '未到访' ? visitType : '作废') + '原因！',
                });
            }

            //显示加载状态
            await this.showOverlayConfirm('confirm',()=>{});

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&role=receive`);

            //第一步 保存用户数据到数据库中
            const elem = {
                status: visitType == '未到访' ? 'devisit' : 'invalid',
                remark: this.item.remark,
            }; // 待处理元素

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.patchTableData(this.tablename, id, elem);

            /************************  工作流程日志(开始)  ************************/

            //获取后端配置前端管理员组
            const front = user_group_ids;
            const front_name = user_group_ids;

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
                table_name: this.tablename,
                main_value: id,
                proponents: userinfo.username,
                business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                business_code: '000000000', //varchar(100)  null comment '业务编号',
                process_name: '用印流程审批', //varchar(100)  null comment '流程名称',
                employee: userinfo.realname, //varchar(1000) null comment '操作职员',
                approve_user: userinfo.username, //varchar(100)  null comment '审批人员',
                action: (visitType == '未到访' ? visitType : '作废'), //varchar(100)  null comment '操作动作',
                action_opinion: `来访申请审批[${visitType}]原因:${this.item.remark}`, //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                process_station: '来访审批[' + (visitType == '未到访' ? visitType : '作废') + ']', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                content: `来访确认(${this.item.type}) ` + this.item.name + ' #被访人员: ' + this.item.create_by, //text          null comment '业务内容',
                process_audit: this.item.id + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text null comment '关联数据',
                origin_data: '',
            }

            await Betools.workflow.approveViewProcessLog(prLogHisNode);

            /************************  工作流程日志(结束)  ************************/

            //设置状态
            this.loading = false;
            this.status = elem.status;
            this.readonly = true;
            this.item.status = elem.status;
            this.role = 'view';

            //隐藏遮罩
            await this.showOverlayConfirm('cancel',()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '来访预约已设置为' + (visitType == '未到访' ? visitType : '已作废') + '！',
            });

        },

        // 来访确认确认操作函数
        async handleConfirm(visitType = '确认') {

            //显示加载状态
            this.loading = true;
            const status = visitType == '已到访' ? 'visit' : 'confirm';

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo');

            //表单ID
            const id = this.item.id;
            const type = Betools.tools.getUrlParam('statustype');
            const pid = Betools.tools.getUrlParam('pid');

            //检查用户是否具有权限进行审批
            const response = await Betools.query.queryRoleGroupList('COMMON_VISIT_AUTH', userinfo.username);

            //获取到印章管理员组信息
            let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
            user_group_ids = user_group_ids + ',' + this.item.create_by;

            //获取到用户列表数据
            if (Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username)) {
                await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '您没有访客管理的审批权限，请联系管理员进行处理！',
                });
                return;
            }

            //显示加载状态
            await this.showOverlayConfirm('confirm',()=>{});

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&role=receive`);

            //第一步 保存用户数据到数据库中
            const elem = {
                visitor_name: this.item.visitor_name,
                visitor_company: this.item.visitor_company,
                visitor_mobile: this.item.visitor_mobile,
                visitor_position: this.item.visitor_position,
                visitor_count: this.item.visitor_count,
                time: this.item.time,
                dtime: this.item.dtime,
                status: status,
            }; // 待处理元素

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.patchTableData(this.tablename, id, elem);

            try {
                //第三步 向被拜访人员推送已到访到访通知
                if (status == 'visit') {
                    await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${this.item.mobile}/亲爱的同事，${this.item.visitor_company}的${this.item.visitor_name}等已到访，联系电话：${this.item.visitor_mobile}, 请您提前做好接待准备！?rurl=${receiveURL}`)
                        .set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                }
            } catch (error) {
                console.log(error);
            }

            /************************  工作流程日志(开始)  ************************/

            //获取后端配置前端管理员组
            const front = user_group_ids;
            const front_name = user_group_ids;

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
                table_name: this.tablename,
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
                business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                content: `来访申请(${this.item.type}) ` + this.item.name + ' #被访人员: ' + this.item.create_by, //text          null comment '业务内容',
                process_audit: this.item.id + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
                origin_data: '',
            }

            await Betools.workflow.approveViewProcessLog(prLogHisNode);

            //同时推送一条待办记录给印章管理员

            /************************  工作流程日志(结束)  ************************/

            //设置状态
            this.loading = false;
            this.status = elem.status;
            this.readonly = true;
            this.item.status = elem.status;
            this.role = 'view';

            //隐藏遮罩
            await this.showOverlayConfirm('cancel',()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '预约人员已经' + (visitType == '已到访' ? '到访' : '确认') + '！',
            });

        },
    }
}
</script>

<style>
</style>
<style scoped>
@import "../../assets/css/explore.css";
@import "../../assets/css/sealinfo.css";
@import "../../assets/css/goodsreceive.css";
</style>
