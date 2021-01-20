<template>
<div id="query" style="width:100%;">
    <header class="header navi-header box-shadow">
        <div class="container" style="position: absolute; width: 1350px">
            <div class="navi-brand">
                <a class="logo" @click="null">
                    <img src="https://co-image.qichacha.com/CompanyImage/f50d972bf1d7aa5bb88da915da782762.jpg?x-oss-process=style/qcc_cmp" class="m-r-sm" alt="企业查询" />
                </a>
            </div>
            <ul class="navi-nav pull-right lpan" style="position: relative">
                <li class="dropdown user-drop" style="margin-right: 0px">
                    <a rel="nofollow" style="padding-left: 0px; padding-right: 15px" onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'个人中心'});" href="/user_home">
                        <span class="headface">
                            <img src=" https://co-image.qichacha.com/upload/face/108.jpg " alt="个人中心" onerror="this.src='https://www.qcc.com/material/theme/chacha/cms/v2/images/icon_user2_default@2x.png'" />
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </header>
    <section id="section">
        <div style="background:white;width:100%;">
            <a-tabs default-active-key="2" @change="callback" style="padding-left:110px;">
                <a-tab-pane key="1" tab="企业"></a-tab-pane>
                <a-tab-pane key="2" tab="人员"></a-tab-pane>
                <a-tab-pane key="3" tab="风险"></a-tab-pane>
                <a-tab-pane key="4" tab="知识产权"></a-tab-pane>
                <a-tab-pane key="5" tab="投融资"></a-tab-pane>
                <a-tab-pane key="6" tab="公告"></a-tab-pane>
                <a-tab-pane key="7" tab="政策"></a-tab-pane>
                <a-tab-pane key="8" tab="新闻"></a-tab-pane>
                <a-tab-pane key="9" tab="招投标"></a-tab-pane>
            </a-tabs>
        </div>
        <div class="industry-query-condition" style="margin-top:15px;padding-left:100px;padding-right:100px;">
            <div class="adsearch-filter">
                <div class="npanel">
                    <div class="npanel-heading clearfix">
                        <h4 class="pull-left">筛选条件</h4>
                        <div class="pull-right">
                            <a href="https://www.qcc.com/search_adsearchmulti" class="text-primary">
                                <span class="bicon bicon-sadvance"></span>高级查询
                            </a>
                        </div>
                    </div>
                    <div class="npanel-body">
                        <div>
                            <div class="expanded-wrap">
                                <div class="app-cascader-inline pills hfoot">
                                    <div class="pills-header">省份地区</div>
                                    <div class="pills-after">
                                        <a class="pills-item">北京</a>
                                        <a class="pills-item">西藏</a>
                                    </div>
                                    <div class="pills-foot"></div>
                                </div>
                                <div class="app-cascader-inline pills hfoot">
                                    <div class="pills-header">行业分类</div>
                                    <div class="pills-after"><a class="pills-item">
                                            农、林、牧、渔业</a><a class="pills-item">
                                            采矿业</a><a class="pills-item">
                                            制造业</a><a class="pills-item">
                                            建筑业</a><a class="pills-item">
                                            批发和零售业</a><a class="pills-item">
                                            住宿和餐饮业</a><a class="pills-item">
                                            信息传输、软件和信息技术服务业</a><a class="pills-item">
                                            金融业</a><a class="pills-item">
                                            房地产业</a><a class="pills-item">
                                            租赁和商务服务业</a><a class="pills-item">
                                            科学研究和技术服务业</a><a class="pills-item">
                                            水利、环境和公共设施管理业</a><a class="pills-item">
                                            居民服务、修理和其他服务业</a><a class="pills-item">
                                            教育</a><a class="pills-item">
                                            卫生和社会工作</a><a class="pills-item">
                                            文化、体育和娱乐业</a><a class="pills-item">
                                            其他行业</a></div>
                                    <div class="pills-foot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</div>
</template>

<script>
export default {
    data() {
        return {
            appflag: false,
            yearlist: [2021, 2020, 2019],
        };
    },
    activated() {},
    mounted() {},
    created() {},
    methods: {},
};
</script>

<style scoped>
@import "../../assets/css/industry_search.css";
</style>
