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
            <a-tabs default-active-key="1" @change="callback" style="padding-left:110px;">
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
                                <div class="app-pselect hfoot pills" style="margin-top:2px; margin-bottom: 6px;">
                                    <div class="pills-header">查找范围</div>
                                    <div class="pills-after">
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">企业名</span></label></div>
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">法定代表人</span></label></div>
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">股东</span></label></div>
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">高管</span></label></div>
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">品牌/产品</span></label></div>
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">联系地址</span></label></div>
                                        <div class="fitem"><label class="fcheck"><input autocomplete="off" type="checkbox"> <span data-v-7a34d786="">经营范围</span></label></div>
                                    </div>
                                    <div class="pills-foot"></div>
                                </div>
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
                                <div class="app-pinline pills hfoot">
                                    <div class="pills-header">成立日期</div>
                                    <div class="pills-after">
                                        <template v-for="item in yearlist">
                                            <a :key="`year_id_${item}`" class="pills-item">{{ item }}</a>
                                        </template>
                                    </div>
                                    <div class="pills-foot">
                                    </div>
                                </div>
                                <div class="pills">
                                    <div class="pills-header">
                                        更多筛选
                                    </div>
                                    <div class="pills-after">
                                        <div class="fitem">
                                            <div class="app-dselect drop-hover"><span data-toggle="dropdown" aria-expanded="false" class="toggle"><a class="dselect-text">
                                                        注册资本
                                                        <span class="caret"></span></a></span>
                                                <div class="dropdown-menu">
                                                    <ul class="drop-col">
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>100万以内</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>100-500万</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>500-1000万</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>1000-3000万</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>3000-5000万</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>5000万以上</span></label></a></li>
                                                        <li></li>
                                                    </ul>
                                                    <div class="drop-x"><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>自定义</span></label> <i class="fa fa-caret-right"></i>
                                                            <div class="drop-right" style="display: none;"><span class="app-number-range">
                                                                    <div class="range-wrap">
                                                                        <div class="clearfix"><span>从</span> <input maxlength="10" type="text" class="form-control"> <span class="unit">万</span></div>
                                                                        <div class="clearfix"><span>至</span> <input maxlength="10" type="text" class="form-control"> <span class="unit">万</span></div> <span class="commit">确定</span>
                                                                    </div>
                                                                </span></div>
                                                        </a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fitem">
                                            <div class="app-dselect drop-hover"><span data-toggle="dropdown" aria-expanded="false" class="toggle"><a class="dselect-text">
                                                        登记状态
                                                        <span class="caret"></span></a></span>
                                                <div class="dropdown-menu">
                                                    <ul class="drop-col">
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>在业/存续</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>筹建</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>清算</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>迁入</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>迁出</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>停业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>撤销</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>吊销</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>注销</span></label></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fitem">
                                            <div class="app-dselect drop-hover"><span data-toggle="dropdown" aria-expanded="false" class="toggle"><a class="dselect-text">
                                                        企业类型
                                                        <span class="caret"></span></a></span>
                                                <div class="dropdown-menu">
                                                    <ul class="drop-col">
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>有限责任公司</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>股份有限公司</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>国企</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>外商投资企业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>独资企业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>个体工商户</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>联营企业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>集体所有制</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>有限合伙</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>普通合伙</span></label></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fitem">
                                            <div class="app-dselect drop-hover"><span data-toggle="dropdown" aria-expanded="false" class="toggle"><a class="dselect-text">
                                                        组织机构
                                                        <span class="caret"></span></a></span>
                                                <div class="dropdown-menu">
                                                    <ul class="drop-col">
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>大陆企业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>社会组织</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>香港企业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>台湾企业</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>基金会</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>事业单位</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>律师事务所</span></label></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="fitem">
                                            <div class="app-dselect drop-hover"><span data-toggle="dropdown" aria-expanded="false" class="toggle"><a class="dselect-text">
                                                        资本类型
                                                        <span class="caret"></span></a></span>
                                                <div class="dropdown-menu">
                                                    <ul class="drop-col">
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>人民币</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>美元</span></label></a></li>
                                                        <li><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span>其它</span></label></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="industry-result" style="margin-top:15px;padding-left:7%;padding-right:7%;">
            <div data-v-738ea2ea="" class="adsearch-list">
                <div data-v-738ea2ea="" class="npanel">
                    <div data-v-738ea2ea="" class="npanel-heading">
                        <h4 data-v-738ea2ea="">
                            小查为您找到
                            <span data-v-738ea2ea="" class="text-danger">64</span>
                            家符合条件的企业
                        </h4>
                    </div>
                    <div data-v-738ea2ea="" class="msearch">
                        <div data-v-1a4367d8="" data-v-738ea2ea="" class="search-cell">
                            <div data-v-1a4367d8="" class="batch-bar" style="display: none;"><a data-v-1a4367d8="" class="btn m-r-xs btn-outline-primary">
                                    全选当页
                                </a> <a data-v-1a4367d8="" class="btn btn-none">
                                    取消
                                </a>
                                <div data-v-1a4367d8="" class="pull-right"><a data-v-1a4367d8="" class="btn m-r-xs btn-primary">
                                        发送名片
                                    </a> <a data-v-1a4367d8="" class="btn btn-primary">
                                        关注企业
                                    </a></div>
                            </div>
                            <table data-v-1a4367d8="" class="ntable ntable-list">
                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/bc661b7f5a1dbccb8839ee04d605e3c9.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/bc661b7f5a1dbccb8839ee04d605e3c9.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>成都<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">52100万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2006-07-12</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 3</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><a data-v-1a4367d8="" href="http://www.evergrande.com" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="进入官网" data-delay="500" rel="nofollow"><span data-v-e1e92da6="" data-v-1a4367d8="" class="gw-status"><span data-v-e1e92da6="" class="gw-status-icon normal"></span></span>
                                                                http://www.evergrande.com
                                                            </a></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市青羊区提督街99号36层</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=bc661b7f5a1dbccb8839ee04d605e3c9&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">144</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/6b282d974b31f69946a10e6fdecc6a2d.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/6b282d974b31f69946a10e6fdecc6a2d.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>自贡<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">2000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2010-11-26</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 1</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">自贡市卫坪乡卫里街</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=6b282d974b31f69946a10e6fdecc6a2d&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">137</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/b492472eb5a01f265bb340f965cfb778.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/b492472eb5a01f265bb340f965cfb778.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒大</em><em>地产</em><em>集团</em>大邑<em>有限</em><em>公司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">50000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2010-03-16</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市大邑县晋原镇西岭大道193号1楼</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=b492472eb5a01f265bb340f965cfb778&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">44</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/04b25357993d627c5cee0c35c89e028d.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/04b25357993d627c5cee0c35c89e028d.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>南充<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">20000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2010-09-08</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 3</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><a data-v-1a4367d8="" href="http://www.nchengdalvzhou.com" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="进入官网" data-delay="500" rel="nofollow"><span data-v-e1e92da6="" data-v-1a4367d8="" class="gw-status"><span data-v-e1e92da6="" class="gw-status-icon unknown"></span></span>
                                                                www.nchengdalvzhou.com
                                                            </a></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">南充市顺庆区府荆南路三段24栋302号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=04b25357993d627c5cee0c35c89e028d&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">133</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/d1c721b5f81dd899d316aba189b517ad.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/d1c721b5f81dd899d316aba189b517ad.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>眉山市彭山<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">4100万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2006-07-20</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">四川省眉山市彭山区牧马镇莲花村<em>恒大</em>金碧天下会议中心</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=d1c721b5f81dd899d316aba189b517ad&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">1</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>曾用名：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>彭山<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/g30f4cf0abe78f6c8a9a516480773d58.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/g30f4cf0abe78f6c8a9a516480773d58.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>自贡<em>有</em><em>限</em><em>公</em><em>司</em>工会</span></a> <span data-v-1a4367d8="" class="nstatus text-gray">暂无</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/pr3cfc2db446e88b7520e993c7d39714.html" target="_blank">曾敬然</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">-</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2018-01-16</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val">
                                                            <span data-v-1a4367d8="">-</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">自贡市卫坪乡卫里街</span></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/gc20709f2d52f1bbb388c26f2eb49a27.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/gc20709f2d52f1bbb388c26f2eb49a27.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>成都<em>有</em><em>限</em><em>公</em><em>司</em>工会委员会</span></a> <span data-v-1a4367d8="" class="nstatus text-gray">暂无</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/pr5defcac42b30637e91d55fd5b0d6ef.html" target="_blank">孟宪邦</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">-</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2007-06-11</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val">
                                                            <span data-v-1a4367d8="">-</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市青羊区提督街99号<em>恒大</em>中心</span></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/g9c0ad318c75a8a727d7a01903c09b3a.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/g9c0ad318c75a8a727d7a01903c09b3a.html" target="_blank" class="title"><span data-v-1a4367d8=""><em>恒大</em><em>地产</em><em>集团</em>大邑<em>有限</em><em>公司</em>工会委员会</span></a> <span data-v-1a4367d8="" class="nstatus text-gray">暂无</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/pr1da8bc24e25b49155771b9a79207df.html" target="_blank">孟宪邦</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">-</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2011-01-19</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val">
                                                            <span data-v-1a4367d8="">-</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">晋原镇西岭大道193号1楼</span></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/g68a0db4f26b06d8299d304550ff9e52.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/g68a0db4f26b06d8299d304550ff9e52.html" target="_blank" class="title"><span data-v-1a4367d8="">南充市顺庆区<em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>南充<em>有</em><em>限</em><em>公</em><em>司</em>工会</span></a> <span data-v-1a4367d8="" class="nstatus text-gray">暂无</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/prf9759a5c84e24fd739b7d1c4129a4c.html" target="_blank">曾敬然</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">0.5万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2018-07-19</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val">
                                                            <span data-v-1a4367d8="">-</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">南充市顺庆区果城路7号</span></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/e2ef7ee8e165a5c6ff13bea5823d1421.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/e2ef7ee8e165a5c6ff13bea5823d1421.html" target="_blank" class="title"><span data-v-1a4367d8="">眉山市彭山区鑫鑫观光<em>产</em>业园<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">100万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2006-04-26</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">四川省眉山市彭山区牧马镇莲花村<em>恒大</em>金碧天下会议中心(栋)-1-2层</span></span></div>

                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/5eceb8004a7062e7779851d27268e57b.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/5eceb8004a7062e7779851d27268e57b.html" target="_blank" class="title"><span data-v-1a4367d8="">成都市温江区鑫金康置业<em>有</em><em>限</em>责任<em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">49550万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2006-08-01</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><a data-v-1a4367d8="" href="http://www.hengdacheng.com" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="进入官网" data-delay="500" rel="nofollow"><span data-v-e1e92da6="" data-v-1a4367d8="" class="gw-status"><span data-v-e1e92da6="" class="gw-status-icon unknown"></span></span>
                                                                www.hengdacheng.com
                                                            </a></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市温江区柳城镇万春东路26号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=5eceb8004a7062e7779851d27268e57b&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">379</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/0eed2d47e41873107b14fc2bc33ee97a.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/0eed2d47e41873107b14fc2bc33ee97a.html" target="_blank" class="title"><span data-v-1a4367d8="">成都熙华置业<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">79000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2016-07-13</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市成华区双林中横路12号</span></span></div>

                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/c4e37287fc904462b2723ccce6fcc61d.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/c4e37287fc904462b2723ccce6fcc61d.html" target="_blank" class="title"><span data-v-1a4367d8="">新津<em>恒</em><em>大</em>新城置业<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">48661.800486万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2016-06-22</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市新津县普兴镇新中路33号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=c4e37287fc904462b2723ccce6fcc61d&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">54</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/42fc6cfd73ba3a1a4fbd2c8ccaf44213.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/42fc6cfd73ba3a1a4fbd2c8ccaf44213.html" target="_blank" class="title"><span data-v-1a4367d8="">泸州<em>恒</em><em>大</em>南城置业<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">42000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2015-03-23</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 1</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">泸州市江阳区酒城大道一段16号7幢5层2单元0504号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=42fc6cfd73ba3a1a4fbd2c8ccaf44213&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">37</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/294b9756c65a6a9e4633f6dc39a6feaa.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/294b9756c65a6a9e4633f6dc39a6feaa.html" target="_blank" class="title"><span data-v-1a4367d8="">联邦制药（成都）<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">121212.12万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2003-06-11</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:xyj1234567890@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">xyj1234567890@qq.com</a> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><a data-v-1a4367d8="" href="http://www.tul.cn" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="进入官网" data-delay="500" rel="nofollow"><span data-v-e1e92da6="" data-v-1a4367d8="" class="gw-status"><span data-v-e1e92da6="" class="gw-status-icon normal"></span></span>
                                                                http://www.tul.cn
                                                            </a></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">四川省成都市彭州市工业开发区牡丹大道南段8号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=294b9756c65a6a9e4633f6dc39a6feaa&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">8</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/341f1ad628866600cb6fa2be782faf58.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/341f1ad628866600cb6fa2be782faf58.html" target="_blank" class="title"><span data-v-1a4367d8="">资阳万诚置业<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">41000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2010-02-05</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <span data-v-1a4367d8="" class="val">-</span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">资阳市雁江区松涛镇书台路99号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=341f1ad628866600cb6fa2be782faf58&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">44</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/bf8192d69257165f2676ba35560df14b.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/bf8192d69257165f2676ba35560df14b.html" target="_blank" class="title"><span data-v-1a4367d8="">成都市安<em>恒</em>置业<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">25800万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2010-01-22</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 2</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">中国(四川)自由贸易试验区成都市天府新区华阳街道麓山大道一段609号13栋1层1号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=bf8192d69257165f2676ba35560df14b&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">13</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://co-image.qichacha.com/CompanyImage/928c6cecc99af85e3cafbd323f2307b2.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/928c6cecc99af85e3cafbd323f2307b2.html" target="_blank" class="title"><span data-v-1a4367d8="">成都玖源化工<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">53300万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">1999-07-09</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 3</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a> <a data-v-1a4367d8="">更多 1</a></span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><a data-v-1a4367d8="" href="http://www.koyochem.com" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="进入官网" data-delay="500" rel="nofollow"><span data-v-e1e92da6="" data-v-1a4367d8="" class="gw-status"><span data-v-e1e92da6="" class="gw-status-icon normal"></span></span>
                                                                http://www.koyochem.com
                                                            </a></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">四川省成都市新都县新新路108号</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=928c6cecc99af85e3cafbd323f2307b2&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">10</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/2a8d45796bd2ac0fcaf991af49a6e0ae.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/2a8d45796bd2ac0fcaf991af49a6e0ae.html" target="_blank" class="title"><span data-v-1a4367d8="">攀枝花<em>恒</em><em>大</em>房<em>地</em><em>产</em>开发<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">29277.78万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2013-10-17</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span> <a data-v-1a4367d8="">更多 3</a></span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">攀枝花市东区炳草岗大街10#(泰隆商务大厦)</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><a data-v-1a4367d8="" href="https://www.qcc.com/risk?obj=1&amp;unique=2a8d45796bd2ac0fcaf991af49a6e0ae&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8="" class="ricon-fxsm"></span> <span data-v-1a4367d8="" class="spline">|</span> <span data-v-1a4367d8="" class="text-danger">76</span> 条自身风险 <i data-v-1a4367d8="" class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr data-v-1a4367d8="" class="">
                                    <td data-v-1a4367d8="" width="30" class="checktd" style="display: none;"><label data-v-1a4367d8=""><input data-v-1a4367d8="" type="checkbox"></label></td>
                                    <td data-v-1a4367d8="" class="imgtd">
                                        <div data-v-1a4367d8="" class="img"><img data-v-1a4367d8="" src="https://qccdata.qichacha.com/AutoImage/a1d1e3853b9f23fa2236191eccb199fe.jpg?x-oss-process=style/qcc_cmp">

                                        </div>
                                    </td>
                                    <td data-v-1a4367d8="">
                                        <div data-v-1a4367d8="" class="maininfo"><a data-v-1a4367d8="" href="https://www.qcc.com/firm/a1d1e3853b9f23fa2236191eccb199fe.html" target="_blank" class="title"><span data-v-1a4367d8="">成都鑫景置业<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8="" class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8="" class="search-icons actions"><a data-v-1a4367d8="" class="note-btn m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-edit2"></span>笔记
                                                </a> <a data-v-1a4367d8="" class="follow-btn  m-l-xs"><span data-v-1a4367d8="" class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8="" class="tags"><span data-v-cd8b8968="" data-v-1a4367d8="" class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8="" class="relate-info">
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8=""><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8="" class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8="" class="val">101000万元人民币</span></span> <span data-v-1a4367d8="" class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8="" class="val">2016-11-24</span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        电话：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-bf51459c="" data-v-1a4367d8="" class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8="">028-65703939</span></span>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8="" href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                    </span> <span data-v-1a4367d8="" class="f">
                                                        官网：
                                                        <span data-v-1a4367d8="" class="val"><span data-v-1a4367d8="">-</span></span></span></div>
                                                <div data-v-1a4367d8="" class="rline"><span data-v-1a4367d8="" class="f">
                                                        地址：
                                                        <span data-v-1a4367d8="" class="val">成都市青羊区提督街99号<em>恒大</em>中心第36层3601-3605号</span></span></div>

                                                <div data-v-1a4367d8="" class="rline"><i data-v-1a4367d8="" class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8=""><em>恒大地产集团</em>成都<em>有限公司</em></span></div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            </table>

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
