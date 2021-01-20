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
                          <input style="width:100%;" type="text" id="searchkey" maxlength="1000" autocomplete="off" placeholder="请输入企业名、人名、产品名、或地址电话/经营范围等，多关键词用空格隔开，如“苏州 领地”" name="key" class="form-control index-searchkey" required="required"> <input type="hidden" id="index" name="index" value="0"> 
                          <span class="input-group-btn" style="position:relative;top:0px;left:40px;"> 
                            <input type="submit" class="index-searchbtn" value="查一下" required="required"> 
                          </span> 
                        </div> 
                    </form>
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
