<template>
<div id="app">
    <section>

        <div v-if="images" class="weui-cells" style="margin-top:0px;">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img width="100%" height="200px;" v-lazy="image.files || image" />
                </van-swipe-item>
            </van-swipe>
            <router-link to="" class="weui-cell weui-cell-app_access" style="padding:0px 0px;padding-left:0px;border-top:0px solid #ffffff;">
                <van-notice-bar v-show="showNotice" style="width:100%;display:none;" color="#1989fa" background="#ecf9ff" left-icon="volume-o" text="欢迎使用OA移动APP" />
            </router-link>
        </div>

        <div id="weui-cells-flex" v-if="role ? ( role.includes('JOB_HR_ADMIN') || role.includes('JOB_EXEC_ADMIN') || role.includes('JOB_FRONT_ADMIN') || role.includes('JOB_MEAL_ADMIN') ) : false " class="weui-cells" style="display:block; position:relative;">
            <div class="weui-cell-title">入职管理</div>
            <div style="display:none;">
                <div style="position:absolute; top: 0.6rem; right:25px;">
                    <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
                        更多
                    </span>
                </div>
                <div style="position:absolute; top: 0.57rem; right:10px;">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="flex-layout-content" id="scanCell">
                <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
                    <van-col span="6" v-if="role ? role.includes('JOB_HR_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="entryjob('hr');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.4/images/shenpi_03.png">
                            <div class="weui-cell_app_bd">
                                入职审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('JOB_EXEC_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="entryjob('admin');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png">
                            <div class="weui-cell_app_bd">
                                行政审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('JOB_FRONT_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="entryjob('front');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/phone_01.png">
                            <div class="weui-cell_app_bd">
                                前台审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('JOB_MEAL_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="entryjob('meal');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/xiuxian_00.png">
                            <div class="weui-cell_app_bd">
                                食堂审批
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div id="weui-cells-flex" class="weui-cells" style="display: block; position:relative;">
            <div class="weui-cell-title">用印管理</div>
            <div style="display:none;">
                <div style="position:absolute; top: 0.6rem; right:25px;display:none;">
                    <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
                        更多
                    </span>
                </div>
                <div style="position:absolute; top: 0.57rem; right:10px;display:none;">
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="flex-layout-content" id="scanCell">
                <van-row class="flex-layout-van" id="flex-layout-van" type="flex" gutter="0" justify="left">
                    <van-col span="6">
                        <div class="weui-cell_app_hd" @click="sealApply();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/seal.png">
                            <div class="weui-cell_app_bd">
                                用印登记
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('SEAL_ADMIN') : false ">
                        <div v-show="true " class="weui-cell_app_hd" @click="sealApprove();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png">
                            <div class="weui-cell_app_bd">
                                用印审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('SEAL_FRONT_SERVICE') : false ">
                        <div class="weui-cell_app_hd" @click="sealFront();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/dimission.png">
                            <div class="weui-cell_app_bd">
                                用印移交
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('SEAL_ARCHIVE_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="sealDocumentArchive();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.7/images/material_07.png">
                            <div class="weui-cell_app_bd">
                                档案归档
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('SEAL_ARCHIVE_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="sealFinanceArchive();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.7/images/material_02.png">
                            <div class="weui-cell_app_bd">
                                财务归档
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? true : false ">
                        <div class="weui-cell_app_hd" @click="sealMyList();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.6/images/leave_05.png">
                            <div class="weui-cell_app_bd">
                                用印历史
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('SEAL_ADMIN') || role.includes('SEAL_ARCHIVE_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="sealManage();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/worktile.png">
                            <div class="weui-cell_app_bd">
                                用印管理
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="weui-cell_app_hd" @click="sealElectron();">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.9/images/seal_7.png">
                            <div class="weui-cell_app_bd">
                                电子印章
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div id="weui-cells-flex" class="weui-cells" style="display: block;position:relative;">
            <div class="weui-cell-title">领用借用</div>
            <div v-show=" commonIconLength > 8 " @click=" commonIconToggle = !commonIconToggle;" style="position:absolute; top: 0.6rem; right:25px;display:block;">
                <span style="font-family: sans-serif; font-size: 0.7rem; top: 0px;  vertical-align: top; margin-top: 10px;  padding-top: 10px;">
                    更多
                </span>
            </div>
            <div v-show=" commonIconLength > 8 " style="position:absolute; top: 0.50rem; right:10px;display:block; transform: scale(.65);">
                <van-icon name="arrow" v-show="commonIconToggle" style="transform:rotate(90deg);" />
                <van-icon name="arrow" v-show="!commonIconToggle" style="transform:rotate(0deg);" />
            </div>
            <div class="flex-layout-content" id="scanCell">
                <van-row class="flex-layout-van flex-layout-van-common" id="flex-layout-van" type="flex" justify="left">
                    <van-col span="6">
                        <div class="weui-cell_app_hd" @click="goodsReceive('office');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/list_00.png">
                            <div class="weui-cell_app_bd">
                                办公预约
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('common');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/tag_00.png">
                            <div class="weui-cell_app_bd">
                                设备借用
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('lostproperty','clist');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/material.png">
                            <div class="weui-cell_app_bd">
                                失物认领
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-show="role ? role.includes('COMMON_RECEIVE_BORROW') : false ">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('lostproperty','apply');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.7/images/material_08.png">
                            <div class="weui-cell_app_bd">
                                失物登记
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-if="role ? role.includes('COMMON_RECEIVE_BORROW') : false ">
                        <div class="weui-cell_app_hd" @click="goodsReceive('approve');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.5/images/shenpi.png">
                            <div class="weui-cell_app_bd">
                                领用审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-show="role ? role.includes('COMMON_RECEIVE_BORROW') : false ">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('approve');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.5/images/shenpi_06.png">
                            <div class="weui-cell_app_bd">
                                借用审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-show="role ? role.includes('COMMON_RECEIVE_BORROW') : false ">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('lostproperty','approve');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.7/images/material_06.png">
                            <div class="weui-cell_app_bd">
                                失物审批
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" v-show="role ? role.includes('COMMON_RECEIVE_BORROW') : false ">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('data');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.8/images/worktile_9.png">
                            <div class="weui-cell_app_bd">
                                数据管理
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" v-show=" commonIconLength <= 8 || commonIconToggle ">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('history');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.6/images/leave_04.png">
                            <div class="weui-cell_app_bd">
                                预约历史
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" v-show=" commonIconLength <= 8 || commonIconToggle ">
                        <div class="weui-cell_app_hd" @click="goodsBorrow('equiphistory');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.6/images/leave_03.png">
                            <div class="weui-cell_app_bd">
                                借用历史
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div id="weui-cells-flex" class="weui-cells" style="display: block;position:relative;">
            <div class="weui-cell-title">协同办公</div>
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
                        <div class="weui-cell_app_hd" @click="cooperate('share');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/jiejing.png">
                            <div class="weui-cell_app_bd">
                                共享服务
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;">
                        <div class="weui-cell_app_hd" @click="cooperate('property');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/pay.png">
                            <div class="weui-cell_app_bd">
                                资产盘点
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;">
                        <div class="weui-cell_app_hd" @click="cooperate('visitor');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png">
                            <div class="weui-cell_app_bd">
                                访客管理
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" v-show="role ? role.includes('COMMON_AUTH_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="cooperate('auth');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/game_00.png">
                            <div class="weui-cell_app_bd">
                                权限配置
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;" v-show="role ? role.includes('COMMON_AUTH_ADMIN') : false ">
                        <div class="weui-cell_app_hd" @click="cooperate('employee');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.8/images/worktile_12.png">
                            <div class="weui-cell_app_bd">
                                员工管理
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" style="display:block;">
                        <div class="weui-cell_app_hd" @click="cooperate('visitors');" v-show="role ? role.includes('COMMON_AUTH_ADMIN') : false ">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png">
                            <div class="weui-cell_app_bd">
                                访客管理(测)
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
            pageName: "智慧行政",
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
        }
    },
    activated() {},
    mounted() {
        this.queryInfo();
    },
    methods: {

        async queryInfo() {
            const userinfo = await Betools.storage.getStore('system_userinfo');
            try {
                (async() => {//并发执行
                    if(Betools.tools.isNull(userinfo)){
                        this.userinfo = await Betools.query.queryWeworkUser();
                        this.role = await Betools.query.queryRoleInfo();
                    } else {
                        this.role = await Betools.query.queryRoleInfo();
                        this.userinfo = await Betools.query.queryWeworkUser();
                        Betools.console.info('view' , `role fast get ... & role:${this.role}` , 'info' , 'ADM' , userinfo.realname);
                    }
                })();
                (async() => {//并发执行
                    if(Betools.tools.isNull(userinfo)){
                        await Betools.tools.sleep(3500);
                    } 
                    this.images = await Betools.query.queryHomeTopImage('APP');
                    console.log(`async draw home image ... `);
                })();
                (async() => {
                    try {
                        await Betools.query.queryCrontab('18:0');
                        const result = await(await FingerprintJS.load()).get();
                        Betools.console.info('finger' , result.visitorId + '__' + window.btoa(window.encodeURIComponent(JSON.stringify(userinfo||null))) , 'info' , 'ADM' , userinfo.realname);
                        const version = $("[src^='/static/js/manifest@']").attr('src');
                        Betools.console.info('version' , version , 'info' , 'ADM' , userinfo.realname);
                    } catch (error) {
                        console.error(`finger print error:`,error);
                    }
                })();
            } catch (error) {
                console.log(error);
            }
        },

        async sealApply() {
            this.$router.push(`/app/sealinfo`);
        },

        async sealMyList() {
            this.$router.push(`/app/sealmylist`);
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
            } else if (name == 'visitors') { // 进行来访管理
                this.$router.push(`/app/app_subvisitor?back=/app&type=${name}`);
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
        async visitmanage(name) {
            if (name == 'apply') {
                this.$router.push(`/app/visitorreceive?back=/app&type=${name}`);
            } else if (name == 'approve') {
                this.$router.push(`/app/visitorlist?back=/app&type=${name}`);
            } else if (name == 'manage') {
                this.$router.push(`/app/visitormanage?back=/app&type=${name}`);
            } else if (name == 'history') {
                this.$router.push(`/app/visitormylist?back=/app&type=${name}`);
            }
        },

        // 电子印章
        async sealElectron() {
            window.open('http://seal.leading-group.com:18071/#/login', '_blank');
        },

    }
}
</script>

<style>
@import "../../assets/css/explore.css";
@import "../../assets/css/app.css";
</style>
