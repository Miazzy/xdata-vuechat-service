<template>
<div id="query" style="width:100%;background:#f8f8f8;">
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
            <a-tabs default-active-key="1" style="padding-left:110px;">
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
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >100万以内</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >100-500万</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >500-1000万</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >1000-3000万</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >3000-5000万</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >5000万以上</span></label></a></li>
                                                        <li ></li>
                                                    </ul>
                                                    <div class="drop-x"><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >自定义</span></label> <i class="fa fa-caret-right"></i>
                                                            <div class="drop-right" style="display: none;"><span  class="app-number-range">
                                                                    <div class="range-wrap">
                                                                        <div class="clearfix"><span >从</span> <input  maxlength="10" type="text" class="form-control"> <span  class="unit">万</span></div>
                                                                        <div class="clearfix"><span >至</span> <input  maxlength="10" type="text" class="form-control"> <span  class="unit">万</span></div> <span  class="commit">确定</span>
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
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >在业/存续</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >筹建</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >清算</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >迁入</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >迁出</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >停业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >撤销</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >吊销</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >注销</span></label></a></li>
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
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >有限责任公司</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >股份有限公司</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >国企</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >外商投资企业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >独资企业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >个体工商户</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >联营企业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >集体所有制</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >有限合伙</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >普通合伙</span></label></a></li>
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
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >大陆企业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >社会组织</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >香港企业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >台湾企业</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >基金会</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >事业单位</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >律师事务所</span></label></a></li>
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
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >人民币</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >美元</span></label></a></li>
                                                        <li ><a class="item"><label class="text"><input autocomplete="off" type="checkbox"> <span >其它</span></label></a></li>
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
            <div class="adsearch-list">
                <div class="npanel">
                    <div class="npanel-heading">
                        <h4 >
                            小查为您找到
                            <span class="text-danger">64</span>
                            家符合条件的企业
                        </h4>
                    </div>
                    <div class="msearch">
                        <div data-v-1a4367d8 class="search-cell">
                            <div data-v-1a4367d8 class="batch-bar" style="display: none;"><a data-v-1a4367d8 class="btn m-r-xs btn-outline-primary">
                                    全选当页
                                </a> <a data-v-1a4367d8 class="btn btn-none">
                                    取消
                                </a>
                                <div data-v-1a4367d8 class="pull-right">
                                    <a data-v-1a4367d8 class="btn m-r-xs btn-primary"> 发送名片 </a> 
                                    <a data-v-1a4367d8 class="btn btn-primary"> 关注企业 </a>
                                </div>
                            </div>
                            <table data-v-1a4367d8 class="ntable ntable-list">
                                <tr data-v-1a4367d8 class="">
                                    <td data-v-1a4367d8 width="30" class="checktd" style="display: none;"><label data-v-1a4367d8><input data-v-1a4367d8 type="checkbox"></label></td>
                                    <td data-v-1a4367d8 class="imgtd">
                                        <div data-v-1a4367d8 class="img"><img data-v-1a4367d8 src="https://co-image.qichacha.com/CompanyImage/bc661b7f5a1dbccb8839ee04d605e3c9.jpg?x-oss-process=style/qcc_cmp">
                                            
                                        </div>
                                    </td>
                                    <td data-v-1a4367d8>
                                        <div data-v-1a4367d8 class="maininfo"><a data-v-1a4367d8 href="https://www.qcc.com/firm/bc661b7f5a1dbccb8839ee04d605e3c9.html" target="_blank" class="title"><span data-v-1a4367d8><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>成都<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8 class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8 class="search-icons actions"><a data-v-1a4367d8 class="note-btn m-l-xs"><span data-v-1a4367d8 class="bicon bicon-edit2"></span>笔记
                                                    </a> <a data-v-1a4367d8 class="follow-btn  m-l-xs"><span data-v-1a4367d8 class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8 class="tags"><span data-v-cd8b8968="" data-v-1a4367d8 class="search-tags"><span data-v-cd8b8968="" class="m-r-sm"><span data-v-cd8b8968="" class="ntag text-primary">小微企业</span></span></span></div>
                                            <div data-v-1a4367d8 class="relate-info">
                                                <div data-v-1a4367d8 class="rline"><span data-v-1a4367d8 class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8 class="val"><span data-v-1a4367d8><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8 class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8 class="val">52100万元人民币</span></span> <span data-v-1a4367d8 class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8 class="val">2006-07-12</span></span></div>
                                                <div data-v-1a4367d8 class="rline"><span data-v-1a4367d8 class="f">
                                                        电话：
                                                        <span data-v-1a4367d8 class="val"><span data-v-bf51459c="" data-v-1a4367d8 class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8>028-65703939</span></span> <a data-v-1a4367d8>更多 3</a></span> <span data-v-1a4367d8 class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8 href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                        </span> <span data-v-1a4367d8 class="f">
                                                        官网：
                                                        <span data-v-1a4367d8 class="val"><a data-v-1a4367d8 href="http://www.evergrande.com" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="进入官网" data-delay="500" rel="nofollow"><span data-v-e1e92da6="" data-v-1a4367d8 class="gw-status"><span data-v-e1e92da6="" class="gw-status-icon normal"></span></span>
                                                                http://www.evergrande.com
                                                            </a></span></span></div>
                                                <div data-v-1a4367d8 class="rline"><span data-v-1a4367d8 class="f">
                                                        地址：
                                                        <span data-v-1a4367d8 class="val">成都市青羊区提督街99号36层</span></span></div>
                                                <div data-v-1a4367d8 class="rline"><a data-v-1a4367d8 href="https://www.qcc.com/risk?obj=1&amp;unique=bc661b7f5a1dbccb8839ee04d605e3c9&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8 class="ricon-fxsm"></span> <span data-v-1a4367d8 class="spline">|</span> <span data-v-1a4367d8 class="text-danger">144</span> 条自身风险 <i data-v-1a4367d8 class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8 class="rline"><i data-v-1a4367d8 class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8><em>恒大地产集团有限公司</em></span></div>
                                                
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr data-v-1a4367d8 class="">
                                    <td data-v-1a4367d8 width="30" class="checktd" style="display: none;"><label data-v-1a4367d8><input data-v-1a4367d8 type="checkbox"></label></td>
                                    <td data-v-1a4367d8 class="imgtd">
                                        <div data-v-1a4367d8 class="img"><img data-v-1a4367d8 src="https://co-image.qichacha.com/CompanyImage/6b282d974b31f69946a10e6fdecc6a2d.jpg?x-oss-process=style/qcc_cmp">
                                            
                                        </div>
                                    </td>
                                    <td data-v-1a4367d8>
                                        <div data-v-1a4367d8 class="maininfo"><a data-v-1a4367d8 href="https://www.qcc.com/firm/6b282d974b31f69946a10e6fdecc6a2d.html" target="_blank" class="title"><span data-v-1a4367d8><em>恒</em><em>大</em><em>地</em><em>产</em><em>集</em><em>团</em>自贡<em>有</em><em>限</em><em>公</em><em>司</em></span></a> <span data-v-1a4367d8 class="nstatus text-success">存续</span>
                                            <div data-v-1a4367d8 class="search-icons actions"><a data-v-1a4367d8 class="note-btn m-l-xs"><span data-v-1a4367d8 class="bicon bicon-edit2"></span>笔记
                                                    </a> <a data-v-1a4367d8 class="follow-btn  m-l-xs"><span data-v-1a4367d8 class="bicon bicon-fav"></span>关注
                                                </a></div>
                                            <div data-v-1a4367d8 class="tags"><span data-v-cd8b8968="" data-v-1a4367d8 class="search-tags"></span></div>
                                            <div data-v-1a4367d8 class="relate-info">
                                                <div data-v-1a4367d8 class="rline"><span data-v-1a4367d8 class="f">
                                                        法定代表人：
                                                        <span data-v-1a4367d8 class="val"><span data-v-1a4367d8><a href="/pl/p3fb19e1d1b9c94c1b281494b367898c.html" target="_blank">杨珩</a></span></span></span> <span data-v-1a4367d8 class="f">
                                                        注册资本：
                                                        <span data-v-1a4367d8 class="val">2000万元人民币</span></span> <span data-v-1a4367d8 class="f">
                                                        成立日期：
                                                        <span data-v-1a4367d8 class="val">2010-11-26</span></span></div>
                                                <div data-v-1a4367d8 class="rline"><span data-v-1a4367d8 class="f">
                                                        电话：
                                                        <span data-v-1a4367d8 class="val"><span data-v-bf51459c="" data-v-1a4367d8 class="phone-status"><span data-v-bf51459c="" class="phone-status-icon"></span></span> <span data-v-1a4367d8>028-65703939</span></span> <a data-v-1a4367d8>更多 1</a></span> <span data-v-1a4367d8 class="f">
                                                        邮箱：
                                                        <a data-v-1a4367d8 href="mailto:306621959@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="发送邮件" data-delay="500" class="val">306621959@qq.com</a>
                                                        </span> <span data-v-1a4367d8 class="f">
                                                        官网：
                                                        <span data-v-1a4367d8 class="val"><span data-v-1a4367d8>-</span></span></span></div>
                                                <div data-v-1a4367d8 class="rline"><span data-v-1a4367d8 class="f">
                                                        地址：
                                                        <span data-v-1a4367d8 class="val">自贡市卫坪乡卫里街</span></span></div>
                                                <div data-v-1a4367d8 class="rline"><a data-v-1a4367d8 href="https://www.qcc.com/risk?obj=1&amp;unique=6b282d974b31f69946a10e6fdecc6a2d&amp;property=1" target="_blank" class="risk-item"><span data-v-1a4367d8 class="ricon-fxsm"></span> <span data-v-1a4367d8 class="spline">|</span> <span data-v-1a4367d8 class="text-danger">137</span> 条自身风险 <i data-v-1a4367d8 class="fa fa-caret-right"></i></a></div>
                                                <div data-v-1a4367d8 class="rline"><i data-v-1a4367d8 class="bicon bicon-link"></i>投资人：
                                                    <span data-v-1a4367d8><em>恒大地产集团有限公司</em></span></div>
                                                
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
