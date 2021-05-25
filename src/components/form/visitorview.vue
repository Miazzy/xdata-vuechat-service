<template>
<keep-alive>

    <!--首页组件-->
    <div id="content" style="margin-top: 0px;">

        <header id="wx-header" style="overflow-x: hidden;">
            <div class="center">
                <router-link :to="back" tag="div" class="iconfont icon-left">
                    <span>返回</span>
                </router-link>
                <span>访客登记</span>
                <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
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

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="到访信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field :readonly="readonly" required clearable label="被访人员" v-model="item.create_by" placeholder="请填写您的姓名！" @blur="validField('receive_name')" :error-message="message.receive_name" />
                                <van-field v-show="false" :readonly="readonly" required clearable label="职务名称" v-model="item.position" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company" />
                                <van-field :readonly="readonly" required clearable label="联系电话" v-model="item.mobile" placeholder="请填写您的部门名称！" @blur="validField('department');" :error-message="message.department" />
                                <check-select required label="到访地址" placeholder="请选择到访地址" v-model="item.address" :columns="fileColumns" :option="{ label:'name',value:'name',title:'title',all:false, search:true, margin:'35px 3px 0px 0px' , classID:'van-field-check-select'}" @confirm="fileConfirm" />
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">

                                <van-cell value="来访信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                                <van-field v-show="item.serialid && false" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />

                                <van-field :readonly="false" :required="false" clearable label="预约日期" v-model="item.time" placeholder="请填写预约日期！" @blur="validField('time')" :error-message="message.time" />
                                <van-field :readonly="false" :required="false" clearable label="预约时间" v-model="item.dtime" placeholder="请填写预约时间！" @blur="validField('time')" :error-message="message.time" />

                                <van-field :readonly="false" required clearable label="访客姓名" v-model="item.visitor_name" placeholder="请填写访客姓名！" @blur="validField('visitor_name')" :error-message="message.visitor_name" />
                                <van-field :readonly="false" required clearable label="访客电话" v-model="item.visitor_mobile" placeholder="请填写访客电话！" @blur="validField('visitor_mobile')" :error-message="message.visitor_mobile" />
                                <van-field :readonly="false" required clearable label="访客单位" v-model="item.visitor_company" placeholder="请填写来访单位！" @blur="validField('visitor_company')" :error-message="message.visitor_company" />
                                <van-field :readonly="false" required clearable label="来访人数" type="number" v-model="item.visitor_count" placeholder="请填写来访人数！" @blur="validField('visitor_count')" :error-message="message.visitor_count" />

                                <van-icon name="add-o" style="position:absolute;top:115px;right:0px;display:none;" @click="size <= 20 ? size++ : size;" />
                                <van-icon name="circle" style="position:absolute;top:155px;right:0px;display:none;" @click="size > 1 ? size-- : size;" />
                                <span class="van-goods-span-number" style="top:215px;">#1</span>

                            </van-cell-group>

                            <van-cell-group v-show="false" id="van-user-list" class="van-user-list" style="margin-top:10px;">
                                <van-cell value="接待管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field required clearable label="客户接待" v-model="item.user_admin_name" placeholder="请输入客服接待员!" />
                            </van-cell-group>

                            <van-cell-group v-show="!((item.status == '待处理' || item.status == '未到访' ) && !item.remark)" style="margin-top:10px;">

                                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field :readonly="false" :required="false" clearable label="备注说明" v-model="item.remark" rows="2" autosize type="textarea" maxlength="256" placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" />

                            </van-cell-group>

                            <van-cell-group v-show="((item.status == '待处理' || item.status == '未到访' ) && !item.remark)" style="margin-top:10px;">
                                <van-cell value="作废原因" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field :readonly="false" :required="false" clearable label="作废原因" v-model="item.remark" rows="2" autosize type="textarea" maxlength="256" placeholder="作废申请时，请填写未到访原因！" />
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;" v-show="!!item.status">
                                <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <!-- 流程状态（HR需要确认/修改） -->
                                <van-field :readonly="true" :required="false" clearable label="流程状态" v-model="item.status" />
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

                        </van-form>

                    </van-cell-group>

                    <div v-show="((item.status ==='待处理' || item.status ==='已确认' ) && role == 'front' &&  !(userinfo.realname == item.create_by || userinfo.realname.includes(item.create_by) ) ) || (item.status ==='已确认' && role == 'front' && ( !(userinfo.realname == item.create_by || userinfo.realname.includes(item.create_by) ) || confirm=='confirm'))" style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:0px solid #efefef;">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm('已到访');" style="border-radius: 10px 10px 10px 10px; text-align: center;float:right;width:97.5%;">确认到访</van-button>
                    </div>

                    <div v-show=" item.status ==='待处理' && (userinfo.realname == item.create_by || userinfo.realname.includes(item.create_by) )" style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:0px solid #efefef;">
                        <van-button color="linear-gradient(to right, #ffd01e, #ff8917)" type="warning" text="作废预约" @click="handleDisagree('已作废');" style="border-radius: 10px 10px 10px 10px;margin-right:10px;width:46.5%;float:left;" />
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm('确认');" style="border-radius: 10px 10px 10px 10px; text-align: center;float:right;width:46.5%;">确认预约</van-button>
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
            huserid: '',
            huserList: [],
            auserid: '',
            auserList: [],
            fuserid: '',
            fuserList: [],
            vstatus: {
                init: '待处理',
                confirm:'已确认',
                visit: '已到访',
                devisit: '未到访',
                invalid:'已作废',
            },
            muserid: '',
            muserList: [],
            processLogList: [],
            iswechat: false,
            isfirst: true,
            dockFlag: false,
            role: 'front',
            confirm:'',
            size: 15,
            message: Betools.workconfig.compValidation.entryjob.message,
            valid: Betools.workconfig.compValidation.entryjob.valid,
            item: {
                id: '',
                serialid: '',
                time: dayjs().format('YYYY-MM-DD'),
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
            },
            tlist: [],
            back: '/app/app_subvisitor',
            workflowlist: [],
            announces: [],
            informList: [],
            fileList: [],
            loading: false,
            officeList: [],
            tag: {
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
            ],
            fileColumns: [],
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
        async fileConfirm(value, index, resp) {
            try {
                const item = this.fileColumns.find(item => {
                    return item.name == value;
                })
                this.item.userid = item.userid;
                this.item.user_admin_name = item.username;
                this.item.user_group_ids = item.userlist;
                this.item.user_group_names = item.realname;
            } catch (error) {
                console.log(error);
            }
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
        // 设置重置
        async reduction() {
            this.item = {
                id: '',
                serialid: '',
                time: dayjs().format('YYYY-MM-DD'),
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

                    //获取最后一条处理记录，如果是已到访，或者未到访，则删除待办记录
                    const temp = this.processLogList[this.processLogList.length - 1];

                    //检查状态并删除多余记录
                    if ((temp.action == '完成' && temp.action_opinion.includes('已到访')) || (temp.action == '确认' && temp.action_opinion.includes('未到访'))) {
                        await this.deleteProcessLog();
                    }

                }

            } catch (error) {
                console.log(error);
            }
        },
        // 删除流程日志
        async deleteProcessLog() {

            const id = Betools.tools.getUrlParam('id');
            const pid = Betools.tools.getUrlParam('pid');

            //查询业务编号，如果不存在，则直接返回
            if (Betools.tools.isNull(id) || Betools.tools.isNull(pid)) {
                return;
            }

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo');

            //如果最后一条是已到访，或者未到访，则删除待办记录 //查询当前所有待办记录
            let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo.username, userinfo.realname, 0, 1000);

            //过滤出只关联当前流程的待办数据
            tlist = tlist.filter(item => {
                return item.id == id && item.pid == pid;
            });

            if (tlist.length > 0) {
                //同时删除本条待办记录当前(印章管理员)
                await Betools.workflow.deleteViewProcessLog(tlist);
            }

        },
        // 选中当前盖印人
        async selectFrontUser(value) {
            await Betools.tools.sleep(0);
            const id = this.item.front_id;
            const user = this.fuserList.find((item, index) => {
                return id == item.id
            });
            //获取盖印人姓名
            this.item.front_name = user.name;
            this.item.front_id = id;
        },

        async validField(fieldName) {
            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo');

            // 邮箱验证正则表达式
            const regMail = Betools.workconfig.system.config.regexp.mail;

            this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

            if (fieldName.toLocaleLowerCase().includes('mail')) {
                this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
            }

            Betools.storage.setStore(`system_${this.tablename}_item@${userinfo.realname}`, JSON.stringify(this.item), 3600 * 2);

            return Betools.tools.isNull(this.message[fieldName]);
        },

        //显示遮罩
        async showOverlayConfirm(action = 'cancel', done) {
            await Betools.manage.showOverlayConfirm(action, done, this.tag, this.block);
        },

        // 获取URL或者二维码信息
        async queryInfo() {

            try {
                this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
                await this.weworkLogin(); //查询当前登录用户

                //获取用户基础信息
                const userinfo = this.userinfo = await Betools.storage.getStore('system_userinfo');
                this.userinfo = userinfo;

                //查询编号
                const id = Betools.tools.getUrlParam('id');
                this.role = Betools.tools.getUrlParam('role');
                this.confirm = Betools.tools.getUrlParam('confirm');
                this.back = Betools.tools.getUrlParam('back') || '/app';
                this.readonly = true;

                //查询领用数据
                let tlist = await Betools.query.queryTableDataByPid(this.tablename, id);

                if (tlist.length == 0) {
                    await this.deleteProcessLog();
                }

                this.size = tlist.length;
                this.tlist = tlist;

                const item = tlist[0];

                //根据URL参数查询物资类型
                this.item.type = this.goodstype[Betools.tools.getUrlParam('type')];

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

                if (this.item && this.item.status === '未到访') {
                    this.readonly = true
                }

                for (let i = 1; i < tlist.length; i++) {
                    this.item['visitor_name' + i] = tlist[i].visitor_name;
                    this.item['visitor_company' + i] = tlist[i].visitor_company;
                    this.item['visitor_position' + i] = tlist[i].visitor_position;
                    this.item['visitor_mobile' + i] = tlist[i].visitor_mobile;
                }

                console.log(`realname: ${this.userinfo.realname} , create_by: ${this.item.create_by} , eq:${this.userinfo.realname == this.item.create_by}`);

                await this.queryProcessLog();

            } catch (error) {
                console.log(error);
            }

        },

        // 访客登记申请驳回函数
        async handleDisagree(visitType) {

            //设置驳回理由
            this.item.remark = this.item.remark? this.item.remark: '不同意此申请，' + (visitType == '未到访' ? visitType : '作废') + '处理。';
            
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
            const vflag = this.item.create_by == userinfo.realname || userinfo.realname.includes(this.item.create_by);

            //获取到用户列表数据
            if (!(vflag || !(Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username)))) {
                this.showOverlayConfirm('cancel',()=>{});
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

            //显示遮罩
            this.showOverlayConfirm('confirm',()=>{});

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&role=receive`);

            //第一步 保存用户数据到数据库中
            const elem = {
                status: visitType == '未到访' ? 'devisit' : 'invalid',
                remark: this.item.remark,
            }; // 待处理元素

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.patchTableData(this.tablename, id, elem);

            //批量领取物品修改状态
            for (let i = 0; i < this.tlist.length; i++) {

                //第一步 保存用户数据到数据库中
                let element = {
                    status: visitType == '未到访' ? 'devisit' : 'invalid',
                    remark: this.item.remark,
                }; // 待处理元素

                //第二步，向表单提交form对象数据
                const result = await Betools.manage.patchTableData(this.tablename, this.tlist[i].id, element);

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
                action: (visitType == '未到访' ? visitType : '作废'), //varchar(100)  null comment '操作动作',
                action_opinion: `来访申请审批[${visitType}]原因:${this.item.remark}`, //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                process_station: '来访审批[' + (visitType == '未到访' ? visitType : '作废') + ']', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                content: `来访确认(${this.item.type}) ` + this.item.name + ' #被访人员: ' + this.item.create_by, //text          null comment '业务内容',
                process_audit: this.item.id + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
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
            this.showOverlayConfirm('cancel',()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '来访预约已设置为' + (visitType == '未到访' ? visitType : '已作废') + '！',
            });

        },

        // 访客登记申请确认函数
        async handleConfirm(visitType) {

            //显示遮罩
            this.showOverlayConfirm('confirm',()=>{});

            //显示加载状态
            this.loading = true;
            const status = visitType == '已到访' ? 'visit':'confirm'; 

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
            const vflag = this.item.create_by == userinfo.realname || userinfo.realname.includes(this.item.create_by);

            //获取到用户列表数据
            if (!(vflag || !(Betools.tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username)))) {
                this.showOverlayConfirm('cancel',()=>{});
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '您没有访客管理的审批权限，请联系管理员进行处理！',
                });
            }

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&role=receive`);

            //第一步 保存用户数据到数据库中
            const elem = {
                status: status,
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }; // 待处理元素

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.patchTableData(this.tablename, id, elem);

            (async (tlist , status, tablename )=>{
                //批量领取物品修改状态
                for (let i = 0; i < tlist.length; i++) {
                    //第一步 保存用户数据到数据库中
                    let element = {
                        status: status,
                        create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    }; // 待处理元素
                    //第二步，向表单提交form对象数据
                    const result = await Betools.manage.patchTableData(tablename, tlist[i].id, element);
                }
            })(this.tlist, status, this.tablename);

            //第三步 向被拜访人员推送已到访到访通知
            if(status == 'visit'){
                (async(item , receiveURL)=>{
                    try {
                        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${item.mobile}/亲爱的同事，${item.visitor_company}的${item.visitor_name}等已到访，联系电话：${item.visitor_mobile}, 请您提前做好接待准备！?rurl=${receiveURL}`)
                            .set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                    } catch (error) {
                        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${item.mobile}/亲爱的同事，${item.visitor_company}的${item.visitor_name}等已到访，联系电话：${item.visitor_mobile}, 请您提前做好接待准备！?rurl=${receiveURL}`)
                            .set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                    }
                })(this.item , receiveURL);
            }

            //获取后端配置前端管理员组
            const front = user_group_ids;
            const front_name = user_group_ids;

            (async(userinfo, tablename, visitType , item)=>{
                /************************  工作流程日志(开始)  ************************/
    
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
                    business_data: JSON.stringify(item), //text          null comment '业务数据',
                    content: `来访申请(${item.type}) ` + item.name + ' #被访人员: ' + item.create_by, //text          null comment '业务内容',
                    process_audit: item.id + '##' + item.serialid, //varchar(100)  null comment '流程编码',
                    create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                    relate_data: '', //text          null comment '关联数据',
                    origin_data: '',
                }
    
                await Betools.workflow.approveViewProcessLog(prLogHisNode);
    
                //同时推送一条待办记录给印章管理员
    
                /************************  工作流程日志(结束)  ************************/
            })(userinfo, this.tablename, visitType , this.item);


            //设置状态
            this.loading = false;
            this.status = elem.status;
            this.readonly = true;
            this.item.status = elem.status;
            this.role = 'view';

            //隐藏遮罩
            this.showOverlayConfirm('cancel',()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '预约人员已经'+ (visitType == '已到访' ? '到访' : '确认' )+'！',
            });

        },

        // 访客登记最终处理函数
        async handleFinaly() {

            //显示加载状态
            this.loading = true;
            this.showOverlayConfirm('confirm',()=>{});

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo');
            const pid = Betools.tools.getUrlParam('pid');

            //表单ID
            const id = this.item.id;

            //第一步 保存用户数据到数据库中
            const elem = {
                id,
                status: 'visit',
            }; // 待处理元素

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.patchTableData(this.tablename, id, elem);

            /************************  工作流程日志(开始)  ************************/

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
                action: '完成', //varchar(100)  null comment '操作动作',
                action_opinion: '审批领用申请[已到访]', //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                process_station: '领用审批[物品领用]', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                content: `物品领用(${this.item.type}) ` + this.item.name + '#已到访 #经办人: ' + this.item.create_by, //text          null comment '业务内容',
                process_audit: this.item.id + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
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
            this.showOverlayConfirm('cancel',()=>{});

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '来访预约人员已到访！',
            });

        }
    }
}
</script>

<style>
</style>
<style scoped>
@import "../../assets/css/explore.css";
@import "../../assets/css/sealinfo.css";
@import "../../assets/css/goodsview.css";
</style>
