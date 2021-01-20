<template>
<div id="query" style="">
    <header class="header navi-header box-shadow">
        <div class="container" style="position: absolute; width: 1350px">
            <div class="navi-brand">
                <a class="logo" onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'LOGO'});" href="https://www.qcc.com/">
                    <img src="https://www.qcc.com/material/theme/chacha/cms/v2/images/logo4.png" class="m-r-sm" alt="企查查" />
                </a>
                <span class="zx">
                    <span class="inner">
                        <img src="https://www.qcc.com/material/theme/chacha/cms/v2/images/logo_zx_inner.png" alt="企业征信机构备案" />
                    </span>
                </span>
            </div>
            <ul class="navi-nav pull-right lpan" style="position: relative">
                <li class="dropdown appli-drop hasData">
                    <a onmouseenter="getApplicationList();" onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'应用'});" href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <span class="icon-appli" style="display: none"> </span> 应用
                        <i class="caret"></i>
                    </a>
                    <section class="dropdown-menu app-box applicationList" style="display:none; s">
                        <div class="row m-l-none m-r-none m-t m-b text-center">
                            <div class="col-xs-12 nav-split" style="margin-top: 0px">
                                <label>热门服务</label>
                                <span></span>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'高级查询'});" href="https://www.qcc.com/search_adsearchmulti" target="_blank" class="header-icon-text">
                                        <div class="nav-icon-hot"></div>
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/f17b2b3a22e24ad7b3cd03558c8d7c9c.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>高级查询</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'批量查企业'});" href="https://www.qcc.com/more_batchsearch" target="_blank" class="header-icon-text">
                                        <div class="nav-icon-hot"></div>
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429190206_piliangchaqiye.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>批量查企业</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'批量受益人'});" href="https://www.qcc.com/more_batch?type=2" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429190322_shouyiren.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>批量受益人</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'千寻地图'});" href="https://www.qcc.com/map" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429185956_qianxunditu.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>千寻地图</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'投融资'});" href="https://www.qcc.com/elib" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429190357_tourongzi.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>投融资</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'批量信用报告'});" href="https://www.qcc.com/more_batch?type=1" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429190247_piliangxinyong.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>批量信用报告</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-12 nav-split" style="margin-top: 0px">
                                <label>产品中心</label>
                                <span></span>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'招标查查'});" href="https://t.qcc.com/home" target="_blank" class="header-icon-text">
                                        <div class="nav-icon-hot"></div>
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/953b11607f2849929dca853a1d16e937.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>招标查查</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'客找找'});" href="https://z.qcc.com/qcc/kzz/transit" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/343d1fed19ce49b6a5181218bc9da639.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>客找找</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'舆情管家'});" href="https://y.qcc.com" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/e90c1d2fdf954428aad8a4a6a0f3e056.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>舆情管家</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'风控管家'});" href="https://r.qcc.com/monitor/overview" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/642d4c56e40e4bf693f879d5ece6db26.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>风控管家</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-12 nav-split" style="margin-top: 0px">
                                <label>垂直查询</label>
                                <span></span>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'新增企业'});" href="https://www.qcc.com/web/elib/newcompany" target="_blank" class="header-icon-text">
                                        <div class="nav-icon-hot"></div>
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/b35368f87a454f72ada2eaf8a00944c6.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>新增企业</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'科技型企业'});" href="https://www.qcc.com/web/elib/tec" target="_blank" class="header-icon-text">
                                        <div class="nav-icon-hot"></div>
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/8eced87ed2944a4a978e89d14ae6fc26.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>科技型企业</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'查老赖'});" href="https://www.qcc.com/more_deadbeat" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429185801_chalaolai.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>查老赖</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'查商标'});" href="https://www.qcc.com/web/bigsearch/assets" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/67eca2c8de3741e688923d6055e2034a.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>查商标</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'园区大全'});" href="https://www.qcc.com/more_zonesearch" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429190506_yuanqudaquan.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>园区大全</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'裁判文书'});" href="https://www.qcc.com/web/bigsearch/judgement" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/bcf19b41a1f24a0fba519f5ff9d1778c.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>裁判文书</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'查招聘'});" href="https://www.qcc.com/more_recruit" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/20200429190023_zhaopinchaxun.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>查招聘</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'案件查询'});" href="https://www.qcc.com/web/bigsearch/cases" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/57154456ea9c41deafd88952e9625643.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>案件查询</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'行政处罚'});" href="https://www.qcc.com/web/bigsearch/penalty" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/a74265a841124bc3a7b8d727eb408675.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>行政处罚</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'产业链'});" href="https://www.qcc.com/web/chain/search" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/c64161ee88024b57a813e653bb5a0beb.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>产业链</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'大咖搜索'});" href="https://www.qcc.com/company_muhouperson?keyNo=p684b3f0c79b5dfe6d8a290ba66e798a" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/2b2b1db373cc46da830587168fe22988.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>大咖搜索</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'最新财报'});" href="https://www.qcc.com/elib_financereport" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/f9ebc30e731c4caca0364ffae6edb164.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>最新财报</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-12 nav-split" style="margin-top: 0px">
                                <label>其他服务</label>
                                <span></span>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'接口API'});" href="https://openapi.qcc.com/data?source=websiteHeader&amp;token=hHSn2oV5edqwdXKwf3uYnb96u2SxeaVmhaqYz7Kqd9qQqsDLhXmj3LCFnGuBi31nvmivqrxnqps&amp;timestamp=1610960394" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/c306c9781ff44475a67bc0b95f301ceb.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>接口API</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'LEI申请'});" href="https://www.leicn.org.cn/" target="_blank" class="header-icon-text">
                                        <div class="nav-icon-new"></div>
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/2a89d03584fc44d1abf9ba017d258928.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>LEI申请</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'股权服务'});" href="https://www.shareplus.cn/" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/1421f2b0f6ce4400874dd44509db5426.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>股权服务</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'定制数据'});" href="https://openapi.qcc.com/database?source=websiteHeader&amp;token=hHSn2oV5edqwdXKwf3uYnb96u2SxeaVmhaqYz7Kqd9qQqsDLhXmj3LCFnGuBi31nvmivqrxnqps&amp;timestamp=1610960394" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/8587de9a4a394711b46e29a7290c46bd.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>定制数据</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs">
                                <div class="padder-v">
                                    <a onclick="zhugeTrack('顶栏按钮点击',{'应用名称':'尽职调查'});" href="https://pro.qcc.com" target="_blank" class="header-icon-text">
                                        <span class="m-b-xs block">
                                            <i style="
                            background-image: url(https://co-image.qichacha.com/boss/upload/ee3785d77df241b2b6ae02774886b7fe.png);
                          " class="header-icon-set"></i>
                                        </span>
                                        <span>尽职调查</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </li>
                <li class="head-line">|</li>
                <li class=""></li>
                <li class="">
                    <a rel="nofollow" onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'VIP服务'});" href="/vip?vf=1">
                        <img class="hicon-vip" src="https://www.qcc.com/material/theme/chacha/cms/v2/images/vip_service.png" />
                    </a>
                </li>
                <li class="head-line">|</li>
                <li class="">
                    <a onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'企业套餐'});" href="/qiye" rel="nofollow">企业套餐</a>
                </li>
                <li class="head-line">|</li>
                <li class="">
                    <a rel="nofollow" onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'APP下载'});" class="dropdown-toggle header-qrcode">
                        <span class="hicon-app"></span>
                    </a>
                    <section class="dropdown-menu qrcode-box" style="display: none">
                        <img src="https://www.qcc.com/material/theme/chacha/cms/v2/images/download-app-new.png" />
                    </section>
                </li>
                <li class="dropdown msg-drop">
                    <a onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'消息'});" href="/msg">
                        <span class="hicon-notify"></span>
                    </a>
                    <section class="dropdown-menu msg-box" style="display: none">
                        <ul class="list-group m-b-none">
                            <li class="list-group-item">
                                <div class="he">
                                    消息中心（
                                    <span class="text-danger unreadmsgnum">0</span> 条未读）
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="pnodata">
                                    <img src="https://www.qcc.com/material/theme/chacha/cms/v2/images/nno_image.png" />
                                    <p>暂无消息</p>
                                </div>
                            </li>
                        </ul>
                    </section>
                </li>
                <li class="dropdown user-drop" style="margin-right: 30px">
                    <a rel="nofollow" style="padding-left: 5px; padding-right: 5px" onclick="zhugeTrack('顶栏按钮点击',{'按钮名称':'个人中心'});" href="/user_home">
                        <span class="headface">
                            <img src=" https://co-image.qichacha.com/upload/face/108.jpg " alt="个人中心" onerror="this.src='https://www.qcc.com/material/theme/chacha/cms/v2/images/icon_user2_default@2x.png'" />
                        </span>
                    </a>
                    <ul class="dropdown-menu nav-user" style="display: none">
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'个人中心'});" href="/user_home">
                                <b> 九百飞翔 </b>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a rel="nofollow" onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'导出记录'});" href="/user_download">
                                导出记录</a>
                        </li>
                        <li>
                            <a rel="nofollow" onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'浏览历史'});" href="/user_visit">浏览历史</a>
                        </li>
                        <li>
                            <a rel="nofollow" onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'会员信息'});" href="/user_vip">会员信息</a>
                        </li>
                        <li>
                            <a rel="nofollow" onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'我的企业'});" href="/user_company">
                                我的企业</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'我的订单'});" href="/order_manage?type=service">
                                我的订单</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'我的发票'});" href="/user_invoice">我的发票</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'我的笔记'});" href="/user_note">
                                我的笔记</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'我的关注'});" href="/user_follow">
                                我的关注</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'我的收藏'});" href="/user_fav">
                                我的收藏</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'账户余额'});" href="/balance_manage">
                                账户余额</a>
                        </li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'优惠券'});" href="/user_coupon">优惠券</a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a onclick="zhugeTrack('个人中心下拉菜单点击',{'按钮名称':'退出登录'});" href="/user_logout">
                                退出登录</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>
</div>
</template>

<script>
export default {
    data() {
        return {};
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
</style>
