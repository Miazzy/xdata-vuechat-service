<template>
<div id="app">

    <header id="wx-header" style="overflow-x: hidden;" >
        <div class="center" >
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>来访管理</span>
        </div>
    </header>

    <section style="margin-top:0px;">

        <div id="weui-cells-flex" class="weui-cells"  style="display:block; position:relative;margin-top:0px;">
            <div class="weui-cell-title">来访管理</div>
            <div style="position:absolute; top: 0.6rem; right:25px;display:none;">
                <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
                    更多
                </span>
            </div>
            <div style="position:absolute; top: 0.57rem; right:10px;display:none;">
                <van-icon name="arrow" />
            </div>
            <div class="flex-layout-content" id="scanCell">
                <van-row class="flex-layout-van" id="flex-layout-van" type="flex" justify="left">
                    <van-col span="6" style="display:block;">
                        <div class="weui-cell_app_hd" @click="visitmanage('apply');">
                            <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png">
                            <div class="weui-cell_app_bd">
                                来访登记
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" >
                        <div class="weui-cell_app_hd" @click="visitmanage('approve');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png">
                            <div class="weui-cell_app_bd">
                                来访确认
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" >
                        <div class="weui-cell_app_hd" @click="visitmanage('manage');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.8/images/worktile_1.png">
                            <div class="weui-cell_app_bd">
                                来访记录
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="weui-cell_app_hd" @click="visitmanage('history');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png">
                            <div class="weui-cell_app_bd">
                                我的历史
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="weui-cells" style="margin-top:80px;height:0px;">
        </div>
    </section>
</div>
</template>

<script>
export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "来访管理",
            momentNewMsg: true,
            userinfo: {
                grouplimits: {
                    archive: [],
                    seal: [],
                    front: [],
                },
            },
            commonIconLength: 0,
            visitIconLength: 0,
            officeIconLength: 0,
            sealIconLength: 0,
            commonIconToggle: false,
            visitIconToggle: false,
            officeIconToggle: false,
            sealIconToggle: false,
            imageTableName: 'bs_home_pictures',
            images: Betools.storage.getStore('system_app_image'),
            showNotice: false,
            role: 'view',
            back:'/app',
        }
    },
    activated() {
        //this.queryInfo();
    },
    mounted() {
        this.queryInfo();
    },
    methods: {
        /**
         * @function 企业微信登录处理函数
         */
        async weworkLogin() {
            this.role = await Betools.storage.getStore('system_role_rights_v1');
            const userinfo_work = await Betools.query.queryWeworkUser();
            const userinfo = await Betools.storage.getStore('system_userinfo');
            const etimestamp = await Betools.storage.getStore('system_role_rights_v1_expire'); // 检查权限是否快要到期，如果已经缓存了一段时间，则再次查询一次
            const ctimestamp = new Date().getTime() / 1000 + 3600 * 24 * 30.99;
            const username = userinfo && userinfo.username ? userinfo.username : '';
            (!this.role || this.role == 'view' || this.role == 'null' || ctimestamp >= etimestamp) ? (this.queryRoleInfo(userinfo, null, 'view')) : (null);
            (this.role.includes('COMMON_DEBUG_ADMIN')) ? (setTimeout(() => {
                window.vConsole = window.vConsole ? window.vConsole : new VConsole();
            }, 300)) : (null);
            return userinfo_work;
        },
        async queryInfo() {
            try {
                this.userinfo = await this.weworkLogin();
                this.images = await this.queryImagesUrl();
                this.commonIconLength = await this.changeStyle();
                this.queryCrontab();
            } catch (error) {
                console.log(error);
            }
        },

        async queryRoleInfo(userinfo, resp = null, role = '') {
            try {
                const username = userinfo && userinfo.username ? userinfo.username : '';
                resp = await Betools.query.queryRoleGroupList('COMMON_RECEIVE_BORROW', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',COMMON_RECEIVE_BORROW';
                };
                resp = await Betools.query.queryRoleGroupList('SEAL_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',SEAL_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('SEAL_FRONT_SERVICE', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',SEAL_FRONT_SERVICE';
                };
                resp = await Betools.query.queryRoleGroupList('SEAL_ARCHIVE_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',SEAL_ARCHIVE_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('COMMON_AUTH_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',COMMON_AUTH_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('JOB_HR_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',JOB_HR_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('JOB_EXEC_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',JOB_EXEC_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('JOB_FRONT_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',JOB_FRONT_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('JOB_MEAL_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',JOB_MEAL_ADMIN';
                };
                resp = await Betools.query.queryRoleGroupList('COMMON_VISIT_AUTH', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',COMMON_VISIT_AUTH';
                };
                resp = await Betools.query.queryRoleGroupList('COMMON_DEBUG_ADMIN', username);
                if (resp && resp.length > 0 && resp[0].userlist.includes(username)) {
                    role += ',COMMON_DEBUG_ADMIN';
                    window.vConsole = window.vConsole ? window.vConsole : new VConsole(); // 初始化vconsole
                };
                Betools.storage.setStore('system_role_rights_v1', role, 3600 * 24 * 31);
                this.role = role;
                return role;
            } catch (error) {
                console.log(error);
            }
        },
        async userLogin() {

            //检查用户是否存在
            let vuser = await queryUserInfoByView(this.username);

            //显示加载状态
            this.loading = true;

            try {
                if (Betools.tools.isNull(this.username)) {
                    vant.Toast('请输入账号/手机/邮箱登录！');
                } else if (Betools.tools.isNull(this.password)) {
                    vant.Toast('请输入密码！');
                } else if (Betools.tools.isNull(vuser)) {
                    vant.Toast('此账户不存在！');
                } else {
                    let username = this.username;
                    let password = this.password;
                    let response = await superagent
                        .post(loginURL)
                        .send({
                            "remember_me": true,
                            "auto_login": false,
                            "username": username,
                            "password": password
                        })
                        .set('accept', 'application/json');

                    if (!Betools.tools.isNull(response) && !Betools.tools.isNull(response.body) &&
                        response.body.code == 200 && response.body.message == "登录成功") {
                        let userinfo = response.body.result.userInfo;
                        let token = response.body.result.token;
                        let department = response.body.result.departs;
                        userinfo.password = password;
                        Betools.storage.setStore('system_linfo', JSON.stringify({
                            username: username,
                            password: password
                        }), 3600 * 24 * 30);
                        Betools.storage.setStore('system_userinfo', JSON.stringify(userinfo), 3600 * 24 * 30);
                        Betools.storage.setStore('system_token', JSON.stringify(token), 3600 * 24 * 30);
                        Betools.storage.setStore('system_department', JSON.stringify(department), 3600 * 24 * 30);
                        Betools.storage.setStore('system_login_time', dayjs().format('YYYY-MM-DD HH:mm:ss'), 3600 * 24 * 30);
                        vant.Toast('登录成功！');
                        this.$router.push(`/explore`);
                        this.loading = false;
                    } else {
                        vant.Toast('登录失败: ' + response.body.message);
                        this.loading = false;
                    }
                }
            } catch (error) {
                this.loading = false;
            }
        },
        async clearLoginInfo() {
            try {
                let info = await Betools.storage.getStore('system_linfo');
                this.username = info.username;
                this.password = info.password;
                Betools.storage.clearStore('system_userinfo');
                Betools.storage.clearStore('system_token');
                Betools.storage.clearStore('system_department');
                Betools.storage.clearStore('system_login_time');
            } catch (error) {
                console.log(error);
            }
        },
        async userStatus() {
            try {
                let info = await Betools.storage.getStore('system_userinfo');
                if (Betools.tools.isNull(info)) {
                    vant.Toast('尚未登录！');
                    await this.clearLoginInfo();
                    this.$router.push(`/login`);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async sealApply() {
            this.$router.push(`/app/sealinfo`);
        },
        async sealApprove() {
            this.role.includes('SEAL_ADMIN') ? (this.$router.push(`/app/seallist`)) : (vant.Toast('您没有用印合同资料审批的权限！'));
        },
        async sealManage() {
            this.role.includes('SEAL_ADMIN') ? (this.$router.push(`/app/sealmanage`)) : (vant.Toast('您没有用印合同资料审批的权限！'));
        },
        async sealFront() {
            this.role.includes('SEAL_FRONT_SERVICE') ? (this.$router.push(`/app/sealfinance?transfer_type=finance`)) : (vant.Toast('您没有用印合同资料前台移交的权限！'));
        },
        async sealArchive() {
            this.role.includes('SEAL_ARCHIVE_ADMIN') ? (this.$router.push(`/app/sealarchivelist`)) : (vant.Toast('您没有用印合同资料归档的权限！'));
        },
        async sealFinanceArchive() {
            this.role.includes('SEAL_ARCHIVE_ADMIN') ? (this.$router.push(`/app/sealfinancevlist`)) : (vant.Toast('您没有用印合同资料归档的权限！'));
        },
        async sealDocumentArchive() {
            this.role.includes('SEAL_ARCHIVE_ADMIN') ? (this.$router.push(`/app/sealarchivevlist`)) : (vant.Toast('您没有用印合同资料归档的权限！'));
        },
        async sealMyList() {
            this.$router.push(`/app/sealmylist`);
        },
        async sealExport() {
            this.role.includes('SEAL_ADMIN') ? (this.$router.push(`/app/sealexport`)) : (vant.Toast('您没有用印合同资料导出的权限！'));
        },
        async goodsReceive(type) {
            if (type == 'approve') {
                this.role.includes('COMMON_RECEIVE_BORROW') ? (this.$router.push(`/app/goodslist?type=${type}`)) : (vant.Toast('您没有物品管理-物品领用角色的权限！'))
            } else {
                this.$router.push(`/app/goodsreceive?type=${type}`);
            }
        },
        async goodsBorrow(type, name) {
            //获取当前登录用户信息
            const userinfo = await Betools.storage.getStore('system_userinfo');
            if (type == 'approve') {
                this.role.includes('COMMON_RECEIVE_BORROW') ? (this.$router.push(`/app/borrowlist?type=${type}`)) : (vant.Toast('您没有物品管理-物品借用角色的权限！'));
            } else if (type == 'lostproperty') { //失物招领都有权限
                if (name == 'apply') {
                    this.$router.push(`/app/lostpropertyreceive?back=/app`);
                } else if (name == 'clist') {
                    this.$router.push(`/app/lostpropertyclist`);
                } else if (name == 'approve') {
                    this.$router.push(`/app/lostpropertylist`);
                }
            } else if (type == 'data') {
                this.$router.push(`/app/commonmanage?type=${type}`);
            } else if (type == 'history') {
                this.$router.push(`/app/goodsmylist?type=${type}`);
            } else if (type == 'equiphistory') {
                this.$router.push(`/app/borrowmylist?type=${type}`);
            } else {
                this.$router.push(`/app/borrowreceive?type=${type}`);
            }
        },
        /**
         * @function 奖罚申请
         */
        async rewardApply(name, type) {
            if (['业绩考核', '总裁专项', '总经理专项', '特殊贡献', '其他奖罚'].includes(name)) {
                this.$router.push(`/app/rewardapply?type=${type}&reward_name=${name}`);
            } else if (name == '月度报表') {
                this.$toast.fail('您暂时没有权限! ');
            } else if (name == '季度报表') {
                this.$toast.fail('您暂时没有权限！');
            } else if (name == '奖罚审批') {
                this.$router.push(`/app/rewardlist?type=${type}&reward_name=${name}`);
            }
        },
        /**
         * @function 入职管理
         */
        async entryjob(role) {
            //获取当前登录用户信息
            const userinfo = await Betools.storage.getStore('system_userinfo');
            //先验证用户是否具备相应权限
            if (role == 'hr') {
                if (!this.role.includes('JOB_HR_ADMIN')) {
                    vant.Toast('您没有入职管理-人力角色的权限！');
                    return false;
                }
            } else if (role == 'admin') {
                if (!this.role.includes('JOB_EXEC_ADMIN')) {
                    vant.Toast('您没有入职管理-行政角色的权限！');
                    return false;
                }
            } else if (role == 'front') {
                if (!this.role.includes('JOB_FRONT_ADMIN')) {
                    vant.Toast('您没有入职管理-前台角色的权限！');
                    return false;
                }
            } else if (role == 'meal') {
                if (this.role.includes('JOB_MEAL_ADMIN')) {
                    vant.Toast('您没有入职管理-食堂角色的权限！');
                    return false;
                }
            } else { //没有权限，无法查看
                vant.Toast('您没有入职管理的权限！');
                return false;
            }
            //跳转到相应界面
            this.$router.push(`/app/entrylist?back=/app&role=${role}`);
        },
        // 执行协同办公类跳转
        async cooperate(name) {
            //获取当前登录用户信息
            const userinfo = await Betools.storage.getStore('system_userinfo');
            if (name == 'share') {
                window.open('http://qy.leading-group.com:8082/wxapi/wxclientmenu/bbb28e8ac84e4d66a49e9fd4f87553a8', '_blank')
            } else if (name == 'property') {
                window.open('http://qy.leading-group.com:8082/wxapi/wxclientmenu/dc3b66b892bd42e1ab816b6c6ed5145e', '_blank')
            } else if (name == 'auth') { // 进行权限配置
                this.role.includes('COMMON_AUTH_ADMIN') ? (this.$router.push(`/app/authmanage?back=/app&type=${name}`)) : (vant.Toast('您没有权限配置的权限！'));
            } else if (name == 'employee') { // 进行员工管理
                this.role.includes('COMMON_AUTH_ADMIN') ? (this.$router.push(`/app/employeemanage?back=/app&type=${name}`)) : (vant.Toast('您没有员工管理的权限！'));
            } else if (name == 'visitor') { // 来访登记
                const userinfo = await Betools.storage.getStore('system_userinfo');
                if (userinfo) {
                    const oaUserId = userinfo.systemuserinfo.id;
                    const oaUserName = userinfo.systemuserinfo.username;
                    const wxUserId = userinfo.userid;
                    const url = 'http://offiice.leading-group.com:30002/visitor/#/?userId=' + oaUserId + '&wxUserId=' + wxUserId + '&oaUserName=' + oaUserName;
                    window.open(url, '_blank')
                }
            }
        },
        // 来访管理
        visitmanage(name) {
            if (name == 'apply') {
                this.$router.push(`/app/visitorreceive?back=/app/app_subvisitor&type=${name}`);
            } else if (name == 'approve') {
                this.$router.push(`/app/visitorlist?back=/app/app_subvisitor&type=${name}`);
            } else if (name == 'manage') {
                this.$router.push(`/app/visitormanage?back=/app/app_subvisitor&type=${name}`);
            } else if (name == 'history') {
                this.$router.push(`/app/visitormylist?back=/app/app_subvisitor&type=${name}`);
            }
        },
        // 电子印章
        sealElectron() {
            window.open('http://seal.leading-group.com:18071/#/login', '_blank');
        },
        // 修改界面样式
        async changeStyle(name) {
            try {
                var name = window.location.hash.slice(2);
                name = name.includes('?') ? name.split('?')[0] : name;
                name = name.includes('/') ? name.split('/')[0] : name;
                $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-exact-active');
                $(`#wx-nav dl`).not(`#wx-nav-${name}`).removeClass('router-link-active');
                $(`#wx-nav-${name}`).addClass('router-link-exact-active');
                $(`#wx-nav-${name}`).addClass('router-link-active');
                $('.app-footer').css('display', 'block'); // displayFoot
                return $('.flex-layout-van-common')[0].children.length;
            } catch (error) {
                console.log(error);
            }
        },
        // 查询首页图片
        async queryImagesUrl() {
            try {
                const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前登录用户信息
                let whereSQL = null; //查询SQL
                let images = await Betools.storage.getStore('system_app_image'); // 获取缓存中的图片
                if (!images) { // 如果存在图片数据，则直接使用图片数据
                    whereSQL = userinfo && userinfo.userid == 9058 ? '~and(create_by,eq,zhaoziyu)~and(bpm_status,in,4,5)~and(type,eq,APP)' : `~and(bpm_status,in,4,5)~and(create_by,in,admin,manager)~and(type,eq,APP)`;
                    images = await Betools.query.queryTableDataByWhereSQL('bs_home_pictures', `_where=(status,in,3)${whereSQL}&_fields=files&_sort=-id`);
                    images.map(item => {
                        item.files = `https://upload.yunwisdom.club:30443/${item.files}`;
                    });
                    Betools.storage.setStore('system_app_image', JSON.stringify(images), 3600 * 24 * 3);
                }
                return images;
            } catch (error) {
                console.log(error);
            }
        },
        // 查询定时任务，推送定时消息
        async queryCrontab() {

            try {
                const nowtime = dayjs().format('HH:mm');
                //向数据库上锁，如果查询到数据库有锁，则不推送消息
                const lockFlag = await Betools.manage.lock('crontab_task', 3600 * 1000);
                if (!!lockFlag) {
                    /** 推送设备借用归还消息 */
                    /** 推送设备借用归还消息 */
                    try {
                        if (nowtime.includes('17:00') || nowtime.includes('17:1') || nowtime.includes('17:20')) { // 如果当前时间为17:00点左右，则执行推送消息操作
                            //查询当日尚未归还信息设备的申请信息 ***** //检查已推送消息表，如果消息尚未被推送，则将归还信息推送给用户，提醒用户归还设备
                            const blist = await Betools.query.queryTableDataByWhereSQL('bs_goods_borrow', `_where=(status,in,已借用)&_sort=-id`);
                            for (const item of blist) {
                                if (item.id == item.pid) {
                                    const ctimestamp = dayjs().subtract(12, 'hour').valueOf();
                                    const ntimestamp = Betools.tools.isNull(item.notify_time) ? 0 : dayjs(item.notify_time).valueOf();
                                    if (ntimestamp < ctimestamp) {
                                        const date = dayjs(item.create_time).format('YYYY-MM-DD');
                                        const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/borrowview?id=${item.id}&statustype=office&role=receive`);
                                        const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/${item.create_by}/亲爱的同事，您于${date}借用的物品请在18:00前及时归还?rurl=${receiveURL}`;
                                        const resp = await superagent.get(queryURL).set('accept', 'json');
                                        await Betools.manage.patchTableData('bs_goods_borrow', item.id, {
                                            notify_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        }); //已推送的消息，添加到消息推送记录表中
                                    }
                                } else {
                                    const mlist = await Betools.query.queryTableDataByWhereSQL('bs_goods_borrow', `_where=(id,eq,${item.pid})&_size=1&_sort=-id`); //查询Pid对应数据状态，如果是已完成，则修改为已完成，如果是已驳回，则修改为已驳回
                                    if (mlist && mlist.length > 0) {
                                        await Betools.manage.patchTableData('bs_goods_borrow', item.id, {
                                            status: mlist[0].status,
                                        });
                                    }
                                }
                            }
                            //查询当日尚未领取办公用品的申请信息 ***** call goods_complete('bs_goods_receive' , 'status' , '已准备' , '已完成' , 10 ); //超过10天未领取，默认已完成
                            const rmessage = await superagent.get(`${window.BECONFIG['restAPI']}/api/v2/mysql/goods_complete`).set('accept', 'json'); //检查已推送消息表，如果消息尚未被推送，则将领取信息推送给用户，提醒用户领取用品，超过5天未领取，则状态修改为已领取
                            const rlist = await Betools.query.queryTableDataByWhereSQL('bs_goods_receive', `_where=(status,in,已准备)&_sort=-id`);
                            for (const item of rlist) {
                                if (item.id == item.pid) {
                                    const ctimestamp = dayjs().subtract(12, 'hour').valueOf();
                                    const ntimestamp = Betools.tools.isNull(item.notify_time) ? 0 : dayjs(item.notify_time).valueOf();
                                    if (ntimestamp < ctimestamp) {
                                        const date = dayjs(item.create_time).format('YYYY-MM-DD');
                                        const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/goodsview?id=${item.id}&statustype=office&role=view`);
                                        const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/${item.create_by}/亲爱的同事，您于${date}预约的办公用品已准备，请在17:00-18:00至前台领取?rurl=${receiveURL}`;
                                        const resp = await superagent.get(queryURL).set('accept', 'json');
                                        await Betools.manage.patchTableData('bs_goods_receive', item.id, {
                                            notify_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                                        });
                                    }
                                } else {
                                    const mlist = await Betools.query.queryTableDataByWhereSQL('bs_goods_receive', `_where=(id,eq,${item.pid})&_size=1&_sort=-id`); //查询Pid对应数据状态，如果是已完成，则修改为已完成，如果是已驳回，则修改为已驳回
                                    if (mlist && mlist.length > 0) {
                                        await Betools.manage.patchTableData('bs_goods_receive', item.id, {
                                            status: mlist[0].status,
                                        });
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e)
                    };

                    /** 推送每周周报填写计划 */
                    try {
                        if (dayjs().get('day') == 5 && (nowtime.includes('15:00') || nowtime.includes('16:00') || nowtime.includes('17:00'))) { //检查是否为周五下午，如果是，推送提示，填写周报
                            const rurl = window.encodeURIComponent('http://yp.leading-group.com:9036/H5#/folder/ent');
                            const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/zhaozy1028/亲爱的同事，本周工作即将结束，请记得及时填写本周工作汇报哦！?rurl=${rurl}`;
                            const resp = await superagent.get(queryURL).set('accept', 'json');
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    /** 推送每季度绩效考核指标填写计划 */
                    try {
                        if ('/[03-20|06-20|09-20|12-20|03-25|06-25|09-25|12-25||03-30|06-30|09-30|12-30]/'.includes(dayjs().format('MM-DD')) && nowtime.includes('15:00')) { //检查是否为每季度末下午，如果是，推送提示
                            const rurl = window.encodeURIComponent('https://www.italent.cn//143616195/UpaasNewMobileHome#/');
                            const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/zhaozy1028/亲爱的同事，本季度工作即将结束，请记得及时在HR系统上填写本季度工作汇报和发起绩效考核流程哦！?rurl=${rurl}`;
                            const resp = await superagent.get(queryURL).set('accept', 'json');
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    //向数据库解锁
                    await Betools.manage.unlock('crontab_task');
                }

                if ('13:30|14:30|15:30'.includes(nowtime)) { //特定时间解下锁
                    await Betools.manage.unlock('crontab_task');
                }

            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style>
@import "../../assets/css/explore.css";
@import "../../assets/css/app.css";
</style>
