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
                    <van-col span="6" >
                        <div class="weui-cell_app_hd" @click="visitmanage('apply');">
                            <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/qiandao.png">
                            <div class="weui-cell_app_bd">
                                来访登记
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-show="role ? role.includes('COMMON_VISIT_AUTH') : false " >
                        <div class="weui-cell_app_hd" @click="visitmanage('approve');">
                            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png">
                            <div class="weui-cell_app_bd">
                                来访确认
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6" v-show="role ? role.includes('COMMON_VISIT_AUTH') : false " >
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
            role: 'view',
            back:'/app',
        }
    },
    activated() {},
    mounted() {
        this.queryInfo();
    },
    methods: {

        //查询用户信息
        async queryInfo() {
            try {
                (async() => {//并发执行
                    this.role = await Betools.query.queryRoleInfo();
                })();
                (async() => {
                    await Betools.query.queryCrontab('18:0');
                })();
            } catch (error) {
                console.log(error);
            }
        },
        
        // 来访管理
        async visitmanage(name , $router = this.$router) {
            if (name == 'apply') {
                $router.push(`/app/visitorreceive?back=/app/app_subvisitor&type=${name}`);
            } else if (name == 'approve') {
                $router.push(`/app/visitorlist?back=/app/app_subvisitor&type=${name}`);
            } else if (name == 'manage') {
                $router.push(`/app/visitormanage?back=/app/app_subvisitor&type=${name}`);
            } else if (name == 'history') {
                $router.push(`/app/visitormylist?back=/app/app_subvisitor&type=${name}`);
            }
        },
    }
}
</script>

<style>
@import "../../assets/css/explore.css";
@import "../../assets/css/app.css";
</style>
