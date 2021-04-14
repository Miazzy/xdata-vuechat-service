<template>
<div id="app">
    <section>

        <div class="weui-cells" style="margin-top:0px;">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img width="100%" height="200px;" v-lazy="image.files" />
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
        
        async weworkLogin() {
            const userinfo_work = await Betools.query.queryWeworkUser();
            return userinfo_work;
        },

        async queryInfo() {
            const userinfo = await Betools.storage.getStore('system_userinfo');
            try {
                (async()=>{//并发执行
                    if(Betools.tools.isNull(userinfo)){
                        this.userinfo = await this.weworkLogin();
                        this.role = await this.queryRoleInfo();
                    } else {
                        this.role = await this.queryRoleInfo();
                        this.userinfo = await this.weworkLogin();
                        console.log(`get role info fast than get userinfo ... `);
                    }
                })();
                (async()=>{//并发执行
                    if(Betools.tools.isNull(userinfo)){
                        await Betools.tools.sleep(3500);
                    } 
                    this.images = await this.queryImagesUrl();
                    this.commonIconLength = await this.changeStyle();
                    console.log(`async draw home image ... `);
                })();
                setTimeout(()=>{
                    this.queryCrontab();
                }, Math.random() * 1000);
            } catch (error) {
                console.log(error);
            }
        },

        //搜索角色信息
        async queryRoleInfo (userinfo = {}, resp = '', role = 'view', cacheKey = 'system_role_rights_v1' , time = 0, curtime = new Date().getTime()/1000) {
            
            userinfo = await Betools.storage.getStore('system_userinfo');
            time = await Betools.storage.getStore(`${cacheKey}_expire`) || 0;
            role = await Betools.storage.getStore(`${cacheKey}`);

            //开启debugger模式
            if(role && (role.includes('COMMON_DEBUG_ADMIN') || role.includes('SEAL_ADMIN'))) {
                try {
                    window.vConsole = window.vConsole ? window.vConsole : new VConsole();
                } catch (error) {
                    console.info(`vconsole error ... `);
                }
            }

            //如果缓存中没有获取到数据，则直接查询服务器
            if(Betools.tools.isNull(role)){
                time = curtime +  3600 * 24 * 365 * 3;
                role = await this.queryRoleInfoDB(userinfo, resp, role, cacheKey);
                console.info(`storage cache : ${curtime} role:`, role);
            } else {
                console.info(`hit cache : ${curtime} role: ` , role);
            }

            //如果缓存时间快到期，则重新查询数据
            if((time - 3600 * 24 * 365 * 3 + 100 ) < curtime){
                (async(queryRoleInfoDB, userinfo, resp, role, cacheKey) => {
                    role = await queryRoleInfoDB(userinfo, resp, role, cacheKey);
                })(this.queryRoleInfoDB , userinfo, resp, role, cacheKey);
                console.info(`refresh cache : ${curtime} role:`, role);
            }

            return role;
        },

        async queryRoleInfoDB(userinfo, resp = '', role = 'view', cacheKey = 'system_role_rights_v1') {
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
                role = role.replace('null','view');
                Betools.storage.setStore(cacheKey, role, 3600 * 24 * 365 * 3);
                return role;
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
        visitmanage(name) {
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
        async queryImagesUrl(type = 'APP') {
            try {
                const userinfo = await Betools.storage.getStore('system_userinfo'); //获取当前登录用户信息
                let whereSQL = null; //查询SQL
                let images = await Betools.storage.getStore('system_app_image'); // 获取缓存中的图片
                if (!images) { // 如果存在图片数据，则直接使用图片数据
                    whereSQL = userinfo && userinfo.userid == 9058 ? `~and(create_by,eq,zhaoziyu)~and(bpm_status,in,4,5)~and(type,eq,${type})` : `~and(bpm_status,in,4,5)~and(create_by,in,admin,manager)~and(type,eq,${type})`;
                    images = await Betools.query.queryTableDataByWhereSQL('bs_home_pictures', `_where=(status,in,3)${whereSQL}&_fields=files&_sort=-id`);
                    images.map(item => { item.files = `https://upload.yunwisdom.club:30443/${item.files}`;  });
                    Betools.storage.setStore('system_app_image', JSON.stringify(images), 3600 * 24 * 365 * 3);
                }
                return images;
            } catch (error) {
                console.log(error);
            }
        },

        // 查询定时任务，推送定时消息
        async queryCrontab(express = '18:0') {
            const userinfo = await Betools.storage.getStore('system_userinfo');
            const username = userinfo && userinfo.username ? userinfo.username : '';
            try {
                const nowtime = dayjs().format('HH:mm');
                const nowdate = dayjs().format('YYYYMMDD');

                //向数据库上锁，如果查询到数据库有锁，则不推送消息
                const lockFlag = await Betools.manage.lock('crontab_mission', 5000, username);
                console.log(`lock flag : `, lockFlag , ` nowtime: `, nowtime);

                if (!!lockFlag) {
                    //查询当日尚未到访的预约申请信息，并发送知会通知
                    try {
                        const task = await Betools.query.queryTableDataByWhereSQL('bs_crontab_task', `_where=(task_name,eq,crontab_mission_visitor)~and(status,eq,100)&_sort=-id`);
                        express = task && task.length > 0 ? task[0]['time'] : '18:0' ;
                        if (nowtime.includes('18:0') || nowtime.includes('18:1') || nowtime.includes('18:2') || nowtime.includes(express) ) {
                            const vlist = await Betools.query.queryTableDataByWhereSQL('bs_visit_apply', `_where=(status,in,init,confirm)&_sort=-id`);
                            for (const item of vlist) {
                                const curdate = dayjs(item.time).add(8, 'hour').format('YYYYMMDD');
                                if(nowdate >= curdate){
                                    const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorreceive?id=${item.id}&statustype=office&role=edit`);
                                    const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/${item.mobile}/亲爱的同事，访客：${item.visitor_name} 预约于${dayjs(item.create_time).format('YYYY-MM-DD')}的拜访申请尚未到访，您可以作废或调整拜访预约时间?rurl=${receiveURL}`;
                                    const resp = await superagent.get(queryURL).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                                    const element = {
                                        status: 'devisit',
                                    }; // 待处理元素 未到访
                                    const result = await Betools.manage.patchTableData('bs_visit_apply', item.id, element); //第二步，向表单提交form对象数据
                                    console.log(`response :`, JSON.stringify(resp), `\n\r query url:`, queryURL, `\n\r result:`, result);
                                }
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }

                    /** 推送设备借用归还消息 */
                    try {
                        if (nowtime.includes('17:0') || nowtime.includes('17:1') || nowtime.includes('17:2') || nowtime.includes('17:3') || nowtime.includes('17:4') || nowtime.includes('17:5')) { // 如果当前时间为17:00点左右，则执行推送消息操作
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
                                        const resp = await superagent.get(queryURL).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
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
                            const rmessage = await superagent.get(`${window.BECONFIG['restAPI']}/api/v2/mysql/goods_complete`).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json'); //检查已推送消息表，如果消息尚未被推送，则将领取信息推送给用户，提醒用户领取用品，超过5天未领取，则状态修改为已领取
                            const rlist = await Betools.query.queryTableDataByWhereSQL('bs_goods_receive', `_where=(status,in,已准备)&_sort=-id`);
                            for (const item of rlist) {
                                if (item.id == item.pid) {
                                    const ctimestamp = dayjs().subtract(12, 'hour').valueOf();
                                    const ntimestamp = Betools.tools.isNull(item.notify_time) ? 0 : dayjs(item.notify_time).valueOf();
                                    if (ntimestamp < ctimestamp) {
                                        const date = dayjs(item.create_time).format('YYYY-MM-DD');
                                        const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/goodsview?id=${item.id}&statustype=office&role=view`);
                                        const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/${item.create_by}/亲爱的同事，您于${date}预约的办公用品已准备，请在17:00-18:00至前台领取?rurl=${receiveURL}`;
                                        const resp = await superagent.get(queryURL).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
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
                            const resp = await superagent.get(queryURL).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    /** 推送每季度绩效考核指标填写计划 */
                    try {
                        if ('/[03-20|06-20|09-20|12-20|03-25|06-25|09-25|12-25||03-30|06-30|09-30|12-30]/'.includes(dayjs().format('MM-DD')) && nowtime.includes('15:00')) { //检查是否为每季度末下午，如果是，推送提示
                            const rurl = window.encodeURIComponent('https://www.italent.cn//143616195/UpaasNewMobileHome#/');
                            const queryURL = `${window.BECONFIG['restAPI']}/api/v1/weappms/zhaozy1028/亲爱的同事，本季度工作即将结束，请记得及时在HR系统上填写本季度工作汇报和发起绩效考核流程哦！?rurl=${rurl}`;
                            const resp = await superagent.get(queryURL).set('xid', Betools.tools.queryUniqueID()).set('accept', 'json');
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
