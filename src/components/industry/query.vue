<template>
<div id="query" style="width:100%;">
    <header class="header navi-header box-shadow">
        <div class="container" style="position: absolute; width: 1350px">
            <div class="navi-brand">
                <a class="logo" @click="null" >
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
    <section class="nindex-search" style="height:calc(100vh-20px);">
        <div class="container">
            <div class="search-contain">
                <h1 class="title">
                    企业信息查询平台
                </h1>
                <div class="search-area">
                    <ul class="search-nav clearfix">
                        <li class="search-type" data-index="0">查企业</li>
                        <li class="search-type" data-index="1">查老板</li>
                        <li class="search-type" data-index="3">查风险</li>
                        <li class="search-type" data-index="5">查商标</li>
                        <li class="search-type" data-index="4">查全球</li>
                        <li class="search-type" data-index="2">找关系 </li>
                    </ul>
                    <form action="/web/search" class="search-form" id="indexSearchForm" style="positon:absolute;">
                        <div class="input-group"> 
                          <input type="text" id="searchkey" maxlength="1000" autocomplete="off" placeholder="请输入企业名、人名、产品名、或地址电话/经营范围等，多关键词用空格隔开，如“苏州 企查查”" name="key" class="form-control index-searchkey" required="required"> <input type="hidden" id="index" name="index" value="0"> 
                          <span class="input-group-btn" style="position:relative;top:-51px;left:86%;"> 
                            <input type="submit" class="index-searchbtn" value="查一下" required="required"> 
                          </span> 
                        </div> 
                    </form>
                    <section class="search-list" id="search-list" style="display: none;"> </section>
                    <section class="oversea-drop" id="index-oversea-drop"></section>
                    <div v-show="appflag" class="search-attach clearfix" >
                        <div class="index-app-box" data-length="12">
                            <div class="wrap-prev"></div>
                            <div class="box-wrap">
                                <div class="box-scroll clearfix" style="width: 1676px"> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'招标查查'});" target="_blank" href="https://t.qcc.com/home" class="index-icon-text">
                                        <div class="nav-icon-hot"></div> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/36d06cbfe49a44edaea338c08660e5fa.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>招标查查</span>
                                    </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'裁判文书'});" target="_blank" href="https://www.qcc.com/web/bigsearch/judgement" class="index-icon-text">
                                        <div class="nav-icon-hot"></div> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/4179ee6ea9f44090a1d2967e23d68728.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>裁判文书</span>
                                    </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'风控管家'});" target="_blank" href="https://r.qcc.com/monitor/overview" class="index-icon-text">
                                        <div class="nav-icon-new"></div> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/de31618b137c4b11b5b8217bc53918cf.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>风控管家</span>
                                    </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'客找找'});" target="_blank" href="https://z.qcc.com/qcc/kzz/transit" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/946a06148ef345ff9d98d54aab8b957e.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>客找找</span> </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'查商标'});" target="_blank" href="https://www.qcc.com/web/bigsearch/assets" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/0f9dbcb77e8347198861947d0ea181b9.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>查商标</span> </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'查老赖'});" target="_blank" href="https://www.qcc.com/more_deadbeat" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/19ad3c5cf6784badbc6b6a8fbf602faf.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>查老赖</span> </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'批量查企业'});" target="_blank" href="https://www.qcc.com/more_batchsearch" class="index-icon-text">
                                        <div class="nav-icon-hot"></div> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/4210828f8e9d4559883cfc75a05cd774.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>批量查企业</span>
                                    </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'舆情管家'});" target="_blank" href="https://y.qcc.com/monitor/monitor-list?from=nav" class="index-icon-text">
                                        <div class="nav-icon-new"></div> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/80b366becfff41d180dc1fa64fabb89a.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>舆情管家</span>
                                    </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'产业链'});" target="_blank" href="https://www.qcc.com/web/chain/search" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/a5509c6227a8447b9c3e096924de09d7.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>产业链</span> </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'千寻地图'});" target="_blank" href="https://www.qcc.com/map" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/a552b343e4c14f74886a5f0103d4ffcc.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>千寻地图</span> </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'全球企业'});" target="_blank" href="https://www.qcc.com/more_overseas" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/771ce45a9b004c689ee2b98b8a82dc9f.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>全球企业</span> </a> <a onclick="zhugeTrack('主页应用点击',{'应用名称':'接口API'});" target="_blank" href="https://openapi.qcc.com/data?source=websiteSwitch" class="index-icon-text"> <span class="m-b-xs block"> <i style="background-image: url(https://co-image.qichacha.com/boss/upload/8ba440a549bc4d5f909464d833bdd506.png?x-oss-process=image/resize,h_80);" class="nicon-yq"></i> </span> <span>接口API</span> </a> </div>
                            </div>
                            <div class="wrap-next" style="display: block;"></div>
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
          appflag:false,
        };
    },
    activated() {},
    mounted() {},
    created() {},
    methods: {},
};
</script>

<style scoped>
.dropdown {
    position: relative;
}
.pull-right {
    float: right !important;
}
ol,
ul {
    list-style: none;
}
#query .nindex-search {
    opacity: 0.8;
    background-size: cover;
    height: calc(100vh - 50px);
}
#query .nindex-search .index-searchkey {
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
    height: 51px;
    width: 83%;
    margin-left:5%;
}
#query .form-control {
    display: block;
    width: 110%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
</style>
