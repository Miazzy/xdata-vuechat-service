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

       

        <div class="container m-t">

            <div class="company-centbar ra-le" style="height:300px;">
                <div class="container p-t" style="position: relative;height: 300px;border: 0px solid #fefefe;margin: 20px 0px 10px 20px;padding: 0 0;">
                <div class="panel padder n-s nheader b-a" style="height:auto;margin-top:0px;">
                    <div class="own-switch " style="background-color:#fefefe;">
                        <div class="row">
                            <div class="logo">
                                <div class="imgkuang"> <img src="https://co-image.qichacha.com/CompanyImage/f50d972bf1d7aa5bb88da915da782762.jpg?x-oss-process=style/qcc_cmp" alt="领地集团有限公司" onerror="this.src='https://co-image.qichacha.com/CompanyImage/default.jpg'"> </div>
                                <div class="m-t-xs"> </div>
                                <div class="company-visit " id="companyVisit" style="display: block;">
                                    浏览量：7万+ <div class="visit-depanel">
                                        <div class="demodal">
                                            <div class="wrap">
                                                <div class="chart-title">近7天的访问量趋势</div>
                                                <div class="chart" id="visitChart"> <img class="load" src="/material/theme/chacha/cms/v2/images/preloader.gif"> </div>
                                            </div>
                                            <div class="foot"> <span class="text-warning">认证后即可查看30天访问记录，去认证自己的企业</span> <a rel="nofollow" class="btn btn-warning pull-right" onclick="zhugeTrack('企业主页-浏览量-认证企业',{'企业名称':'领地集团有限公司'});" href="/company_cert?companykey=f50d972bf1d7aa5bb88da915da782762&amp;companyname=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8" target="_blank">
                                                    认证企业
                                                </a> </div>
                                        </div>
                                    </div>
                                </div>
                                <a class="renzheng-qcccert  hvisit" target="_blank" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'获取认证证书'});" href="/company_cert?companykey=f50d972bf1d7aa5bb88da915da782762&amp;companyname=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"> <span class="renzheng-icon" style="margin-right: 5px;"></span>我要认证
                                </a>
                            </div>
                            <div class="content">
                                <div class="row title jk-tip">
                                    <h1>领地集团有限公司</h1> <span class="ntag text-success tooltip-br" data-trigger="hover" data-html="true" data-toggle="tooltip" data-tooltip="arrow" data-placement="bottom" data-delay="500" title="" data-original-title="企业在通过改制重组后，以集团公司或母公司的形式存在的未上市企业，被称为存续企业。">存续</span>
                                </div>
                                <div class="row tags"> <span><span class="ntag tooltip-l text-warning tooltip-br" data-trigger="hover" data-html="true" data-toggle="tooltip" data-tooltip="arrow" data-placement="bottom" data-delay="{&quot;show&quot;:500, &quot;hide&quot;:3000}" title="" data-original-title=" <span>领地集团股份有限公司（2016-11 至 2019-11）</span><br> <span>领地房地产集团股份有限公司（2008-06 至 2016-11）</span><br> <span>领地房地产集团有限公司（- 至 2008-06）</span><br> ">曾用名<i style="position:relative;left:2px;top:-2px;" class="fa fa-sort-desc" aria-hidden="true"></i></span></span> <a target="_blank" href="/product/3fc60f3c-3079-4ea3-b3c9-f5aede1d407c.html" onclick="zhugeTrack('企业主页头部按钮点击',{'标签名称':'06999.HK'});"><span class="ntag text-list click">06999.HK</span></a> <a rel="nofollow" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1" class="ntag text-danger rtag2" onclick="vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'标签名称':'自身风险'});" style="cursor: pointer;"><span class="txt"><span class="c_iconfx"></span> 自身风险</span> 126条 <i class="fa fa-caret-right"></i></a> </div>
                                <div class="row gtag"> <a href="/web/more/comtag?searchKey=%E6%88%BF%E4%BA%A7%E9%87%91%E8%9E%8D" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房产金融</a> <a href="/web/more/comtag?searchKey=%E6%88%BF%E5%9C%B0%E4%BA%A7%E6%8A%95%E8%B5%84%E5%8F%8A%E5%BC%80%E5%8F%91" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房地产投资及开发</a> <a href="/web/more/comtag?searchKey=%E6%88%BF%E4%BA%A7%E6%94%AF%E6%8C%81%E6%9C%8D%E5%8A%A1" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房产支持服务</a> <a href="/web/more/comtag?searchKey=%E6%88%BF%E4%BA%A7%E5%AE%B6%E5%B1%85" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房产家居</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E4%B8%9A&amp;listType=industry&amp;industry=K" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房地产业</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E4%B8%9A&amp;listType=industry&amp;industry=70" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房地产业</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E5%BC%80%E5%8F%91%E7%BB%8F%E8%90%A5&amp;listType=industry&amp;industry=701" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房地产开发经营</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E5%BC%80%E5%8F%91%E7%BB%8F%E8%90%A5&amp;listType=industry&amp;industry=7010" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签'});" target="_blank">#房地产开发经营</a> <a class="text-primary" data-toggle="modal" data-target="#gTagModal" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});">更多&gt;</a> </div>
                                <div class="modal fade" id="gTagModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-dialog nmodal" style="width: 600px;">
                                        <div class="modal-content">
                                            <div class="modal-header"> <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">x</span></button> <span class="modal-title">企业标签</span> </div>
                                            <div class="modal-body gtag-wrap" style="max-height: 600px;overflow: auto;">
                                                <div class="mbl">
                                                    <h4>产品标签</h4>
                                                    <div> <a href="/web/more/comtag?searchKey=%E6%88%BF%E4%BA%A7%E9%87%91%E8%9E%8D" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房产金融</a> <a href="/web/more/comtag?searchKey=%E6%88%BF%E5%9C%B0%E4%BA%A7%E6%8A%95%E8%B5%84%E5%8F%8A%E5%BC%80%E5%8F%91" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房地产投资及开发</a> <a href="/web/more/comtag?searchKey=%E6%88%BF%E4%BA%A7%E6%94%AF%E6%8C%81%E6%9C%8D%E5%8A%A1" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房产支持服务</a> <a href="/web/more/comtag?searchKey=%E6%88%BF%E4%BA%A7%E5%AE%B6%E5%B1%85" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房产家居</a> </div>
                                                </div>
                                                <div class="mbl">
                                                    <h4>行业标签</h4>
                                                    <div> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E4%B8%9A&amp;listType=industry&amp;industry=K" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房地产业</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E4%B8%9A&amp;listType=industry&amp;industry=70" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房地产业</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E5%BC%80%E5%8F%91%E7%BB%8F%E8%90%A5&amp;listType=industry&amp;industry=701" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房地产开发经营</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7%E5%BC%80%E5%8F%91%E7%BB%8F%E8%90%A5&amp;listType=industry&amp;industry=7010" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房地产开发经营</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E4%BA%A7%E7%A7%9F%E8%B5%81&amp;listType=enindustry&amp;tag=%E6%88%BF%E4%BA%A7%E7%A7%9F%E8%B5%81" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房产租赁</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E4%BA%A7%E4%BA%A4%E6%98%93&amp;listType=enindustry&amp;tag=%E6%88%BF%E4%BA%A7%E4%BA%A4%E6%98%93" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房产交易</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E5%9C%B0%E4%BA%A7&amp;listType=enindustry&amp;tag=%E6%88%BF%E5%9C%B0%E4%BA%A7" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房地产</a> <a href="/web/elib/tagcompany?title=%E4%BD%8F%E5%AE%85%E5%9C%B0%E4%BA%A7&amp;listType=enindustry&amp;tag=%E4%BD%8F%E5%AE%85%E5%9C%B0%E4%BA%A7" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#住宅地产</a> <a href="/web/elib/tagcompany?title=%E6%88%BF%E4%BA%A7%E5%BC%80%E5%8F%91&amp;listType=enindustry&amp;tag=%E6%88%BF%E4%BA%A7%E5%BC%80%E5%8F%91" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#房产开发</a> </div>
                                                </div>
                                                <div class="mbl">
                                                    <h4>地域标签</h4>
                                                    <div> <a href="/web/elib/tagcompany?title=%E5%9B%9B%E5%B7%9D%E7%9C%81&amp;listType=area&amp;province=SC" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#四川省</a> <a href="/web/elib/tagcompany?title=%E6%88%90%E9%83%BD%E5%B8%82&amp;listType=area&amp;province=SC&amp;countyCode=5101" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#成都市</a> <a href="/web/elib/tagcompany?title=%E6%AD%A6%E4%BE%AF%E5%8C%BA&amp;listType=area&amp;province=SC&amp;countyCode=510107" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#武侯区</a> </div>
                                                </div>
                                                <div class="mbl">
                                                    <h4>榜单标签</h4>
                                                    <div> <a href="/web/bd/05c0d1ba25717b427f9164b816dd1dc2" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国年度特色小镇运营商</a> <a href="/web/bd/a43985c4d816304adbef192a18c41249" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2019中国房地产互联网品牌500强</a> <a href="/web/bd/cc1955cbd175594c9b5779671361e701" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2018中国房地产百强企业排行榜</a> <a href="/web/bd/d5cecdb70c2712c7beae440033b73e61" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2018中国房地产销售金额TOP100</a> <a href="/web/bd/bbbee9e368e91b8171e3fbee6b26e774" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产企业权益销售额TOP100</a> <a href="/web/bd/4f40d4da2677ce215ddd20de856c2352" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产企业500强排行榜</a> <a href="/web/bd/e2be0a7bd6446ea0eb559d62166b7334" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020时代百强房地产其他奖项排行榜</a> <a href="/web/bd/016ab5a7dab823f9eb0383f1e10aa62a" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产卓越100榜</a> <a href="/web/bd/74a0b36eb0756f4b11ea21b1548b1363" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产销售额百亿以上企业</a> <a href="/web/bd/2e108fa0f059cf9b861c545304c86a90" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2019中国房企百强名单出炉</a> <a href="/web/bd/7b060c3805c16651ed4131c0e52c0fd7" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产企业权益销售面积TOP100</a> <a href="/web/bd/b1af836f7979f478096b8e156341d499" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产企业销售额TOP100</a> <a href="/web/bd/663f6118b44ba923f1c4b9294c856636" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击企业标签-更多'});" target="_blank">#2020中国房地产企业销售面积TOP100</a> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dcontent">
                                    <div class="row"> <span class="fc "> <span class="cdes">电话：</span> <span class="cvlu"> <span class="phone-status"> <span class="phone-status-icon "></span> </span> <span style="color: #000;">028-82120155</span> <a style="color: #128bed" onclick="showVipModal('更多号码','成为VIP会员 即可挖掘企业更多联系方式','gdhm');zhugeTrack('开通VIP',{'弹窗来源':'企业主页-更多号码'});" class="m-l-xs"> 更多 2</a> <a onclick="samefieldlist(1,'432b02486714811e','028-82120155','tel');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'同电话企业'});" class="text-primary m-l-xs">同电话企业 10</a> </span> </span> <span class="cdes">官网：</span> <span class="cvlu "> <span data-trigger="hover" data-toggle="tooltip" data-tooltip="arrow" data-placement="bottom" data-html="true" class="gw-status" title="" data-original-title="有ICP备案<br>2019年报公示"> <span class="gw-status-icon normal "></span> </span> <a class="text-primary" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'查看官网'});" href="http://www.leading-group.com" target="_blank" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="" data-delay="500" rel="nofollow" data-original-title="进入官网"> http://www.leading-group.com </a> </span> </div>
                                    <div class="row"> <span class="fc "> <span class="cdes">邮箱：</span> <span class="cvlu"> <a class="text-primary" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'点击邮箱'});" href="mailto:603236588@qq.com" data-trigger="hover" data-toggle="tooltip" data-html="true" data-placement="right" title="" data-delay="500" data-original-title="发送邮件">603236588@qq.com</a> <a onclick="showHisEmail();" class="m-l-xs text-primary"> 更多 2</a> </span> </span> <span class="cdes">地址：</span><span class="cvlu"> <a onclick="showMapModal('成都武侯区航空路1号1幢14楼3号','成都市','104.074160536162','30.6228305519394');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'查看地址'});" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="" data-delay="500" data-original-title="成都武侯区航空路1号1幢14楼3号"> 成都武侯区航空路1号1幢14楼3号</a> <a onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'附近企业'});" style="color: #128bed" href="/map?keyNo=f50d972bf1d7aa5bb88da915da782762" class="m-l-xs"> 附近企业</a> </span> </div>
                                    <div class="row"> <span class="cdes">简介：</span> <span class="cvlu introRetract">领地集团是一家专注于房地产开发核心主业，以环保、金融、健康、房产等重要业务构成，贯穿整个房地产产业链，坚持提供专业化的产品及服务，持... <a onclick="expandJianjie(1);zhugeTrack('企业主页头部按钮点击',{'按钮名称':'查看简介'});" style="color: #128bed;display: inline-block;">展开</a></span> <span style="display: none;" class="cvlu introExpand">领地集团是一家专注于房地产开发核心主业，以环保、金融、健康、房产等重要业务构成，贯穿整个房地产产业链，坚持提供专业化的产品及服务，持续创造领先价值。 <a style="color: #128bed;display: inline-block;" onclick="expandJianjie(0)">收起</a></span> </div>
                                </div>
                                <div class="row dongtai  dongtai4"> <a class="oxin2 " onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'财产线索'});showSVipModal('财产线索','开通SVIP，及时发现债务人财产线索','ccxs');" target="_blank">
                                        <div class="img"><img src="/material/theme/chacha/cms/v2/images/ppclue.png"></div>
                                        <div class="pull-left">
                                            <div> <span class="cdes">财产线索</span><span class="cvlu"></span> </div>
                                            <div> <span class="text-gray">线索数量 <span class="text-primary">507</span></span> </div>
                                        </div>
                                    </a> <a class="oxin2 " onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'所属集团'});" href="/groupdetail_m430f410cb4cbec8f4d41d3f632ec452.html" target="_blank">
                                        <div class="img"><img src="https://qccdata.qichacha.com/AutoImage/0430f410cb4cbec8f4d41d3f632ec452.jpg"></div>
                                        <div class="pull-left">
                                            <div> <span class="cdes">所属集团：</span><span class="cvlu">玺达企业</span> </div>
                                            <div> <span class="text-gray">成员 <span class="text-primary">216</span></span> <span class="text-gray m-l-xs">风险 <span class="text-danger">999+</span></span> </div>
                                        </div>
                                    </a> <a class="oxin2" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'产品信息'});" href="/product/3fc60f3c-3079-4ea3-b3c9-f5aede1d407c.html" target="_blank">
                                        <div class="img"><img src="https://img.qichacha.com/Product/3fc60f3c-3079-4ea3-b3c9-f5aede1d407c.jpg"></div>
                                        <div class="pull-left">
                                            <div> <span class="cdes">产品信息：</span><span class="cvlu">领地控股</span> </div>
                                            <div> <span class="text-gray">融资 <span class="text-primary">IPO上市</span></span> <span class="text-gray m-l-xs">竞品 <span class="text-primary">20</span></span> </div>
                                        </div>
                                    </a> <a class="oxin2" onclick="zhugeTrack('企业主页头部按钮点击',{'按钮名称':'股权穿透图'});" href="/web/charts/equity-chart?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8">
                                        <div class="img"><span class="c_iconTb gqctt"></span></div>
                                        <div class="pull-left">
                                            <div> <span class="cvlu">股权穿透图</span> </div>
                                            <div> <span class="text-gray">挖掘深层股权结构</span> </div>
                                        </div>
                                    </a> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <div class="company-centbar ra-le">
                <div class="bcell" style="cursor: pointer" onclick="allRiskClick(event,'f50d972bf1d7aa5bb88da915da782762','1','1');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});"> <span class="hcon fx"></span>
                    <div class="cont"> <span class="fx2-tx"> <a rel="nofollow" class="t" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                自身风险
                            </a> <span class="risk-new-count "> <a rel="nofollow" class="t text-danger" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                    126 </a> </span> </span> <span class="fx2-tx"> <a rel="nofollow" class="t" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">关联风险
                            </a> <span class="risk-new-count "> <a rel="nofollow" class="t text-danger" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                    532 </a> </span> </span> <span class="fx2-tx"> <a rel="nofollow" class="t" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=5" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                历史风险
                            </a> <span class="risk-new-count"> <a rel="nofollow" class="t  text-danger" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=5" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                    14 </a> </span> </span> <span class="fx2-tx"> <a rel="nofollow" class="t" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=3" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">提示信息
                            </a> <span class="risk-new-count"> <a rel="nofollow" class="t text-gray" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=3" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                    437 </a> </span> </span> <span class="fx2-tx"> <a rel="nofollow" class="t" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=4" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                敏感舆情
                            </a> <span class="risk-new-count text-danger"> <a rel="nofollow" class="t text-danger" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=4" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                    14 </a> </span> </span> <span class="rquestion-hover pull-right"><i class="m_question"></i>
                            <div class="rquestion-panel">
                                <div class="rquestion-panel-arrow top"></div> <img src="/material/theme/chacha/cms/v2/images/pic_jk2.png">
                                <div class="pull-right" style="width: 420px;line-height: 1.6;">
                                    <p><b>自身风险</b>：聚合该企业自身存在的司法、经营、监管等风险信息。</p>
                                    <p><b>关联风险</b>：挖掘企业的关联企业（如企业股东、投资公司、分公司）和关联人（如法定代表人、实际控制人、股东、主要人员）的司法、经营、监管等风险信息。</p>
                                    <p><b>历史风险</b>：聚合该企业自身曾经存在的司法、经营、监管等风险信息。这些风险可能已经处理完毕，但对于评估企业过去的状况有较大帮助。</p>
                                    <p><b>提示信息</b>：企业自身，及关联企业和关联人员的法定代表人、大股东和实际控制人、对外投资等工商变更信息。</p>
                                    <p><b>敏感舆情</b>：企业自身，及关联企业和关联人员的敏感舆情信息。</p> <button style="width: 98px;" onclick="showVipModal('风险扫描','成为VIP会员 即可查看企业自身风险和关联风险','fxsm','查看样例公司','https://www.qcc.com/firm/9cce0780ab7644008b73bc2120479d31.html');" class="btn btn-primary pull-right">开通vip</button>
                                </div>
                            </div>
                        </span> <a rel="nofollow" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1" class="btn btn-danger" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">查看风险</a> </div>
                </div>
                <div class="bcell"> <span class="hcon dt"></span>
                    <div class="cont sec-count" style="height: 100%">
                        <div class="qingbao-scrollinfo" id="qingbaoScrollinfo"> <a rel="nofollow" target="_blank" class="item" onclick="loginPermision(event);zhugeTrack('企业主页-企业动态',{'企业名称':'领地集团有限公司'});" href="/dl_f50d972bf1d7aa5bb88da915da782762.html?importanceFlag=1" style="transform: translateY(100%); display: block;"> <span>2020-12-10 获得公开发行，0699...</span> </a> <a rel="nofollow" target="_blank" class="item" onclick="loginPermision(event);zhugeTrack('企业主页-企业动态',{'企业名称':'领地集团有限公司'});" href="/dl_f50d972bf1d7aa5bb88da915da782762.html?importanceFlag=1" style="transform: translateY(100%); display: block;"> <span>2020-11-11 新增股权出质</span> </a> <a rel="nofollow" target="_blank" class="item" onclick="loginPermision(event);zhugeTrack('企业主页-企业动态',{'企业名称':'领地集团有限公司'});" href="/dl_f50d972bf1d7aa5bb88da915da782762.html?importanceFlag=1" style="transform: translateY(0px);"> <span>2020-11-13 在武汉领地房地产开发有...</span> </a> <a rel="nofollow" target="_blank" class="item" onclick="loginPermision(event);zhugeTrack('企业主页-企业动态',{'企业名称':'领地集团有限公司'});" href="/dl_f50d972bf1d7aa5bb88da915da782762.html?importanceFlag=1"> <span>2020-09-01 新增投资企业：成都领盛...</span> </a> <a rel="nofollow" target="_blank" class="item" onclick="loginPermision(event);zhugeTrack('企业主页-企业动态',{'企业名称':'领地集团有限公司'});" href="/dl_f50d972bf1d7aa5bb88da915da782762.html?importanceFlag=1"> <span>2020-08-28 新增投资企业：成都领汇...</span> </a> </div> <span class="dt-tx"> <a rel="nofollow" onclick="loginPermision(event);zhugeTrack('企业主页-企业动态',{'企业名称':'领地集团有限公司'});" href="/dl_f50d972bf1d7aa5bb88da915da782762.html" target="_blank" class="t2-count-active btn btn-primary m-r-xs">查看动态
                            </a> </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <div class="company-nav-contain" style="background-color: #fefefe;">
                        <div class="company-nav-tab current"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'基本信息'});" href="#base" id="base_title" tabid="base">
                                <h2>基本信息</h2> <span>537</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'法律风险'});" href="#susong" id="susong_title" tabid="susong">
                                <h2>法律风险</h2> <span>149</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'经营风险'});" href="#fengxian" id="fengxian_title" tabid="fengxian">
                                <h2>经营风险</h2> <span>26</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'经营信息'});" href="#run" id="run_title" tabid="run">
                                <h2>经营信息</h2> <span>851</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'企业发展'});" href="#report" id="report_title" tabid="report">
                                <h2>企业发展</h2> <span>52</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'知识产权'});" href="#assets" id="assets_title" tabid="assets">
                                <h2>知识产权</h2> <span>999+</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'新闻公告'});" href="#news" id="news_title" tabid="news">
                                <h2>新闻公告</h2> <span>136</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"> <a class="company-nav-head " onclick="zhugeTrack('企业主页内容点击',{'点击来源':'一级Tab','数据维度':'新闻公告'});" href="#news" id="news_title" tabid="news">
                                <h2>历史信息</h2> <span>136</span>
                            </a>
                        </div>
                        <div class="company-nav-tab"></div>
                    </div>

                    <div id="load_data" style="display: none;">
                        <section class="panel text-center" style="padding:100px 0;"> <img src="/material/theme/chacha/cms/v2/images/preloader.gif" style="width:70px;margin-top:50px;"> </section>
                    </div>
                    <div class="data_div" id="base_div" style="display: block;">
                        <div class="base_info"></div>
                        <section class="panel b-a clear m_dataTab">
                            <div class="panel-body" style="padding-top: 5px;"> <a href="javascript:;" onclick="boxScrollNew('#qccGraph');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-查查图谱'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    查查图谱
                                </a> <a href="javascript:;" onclick="boxScrollNew('#Cominfo');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-工商信息'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    营业执照 </a> <a href="javascript:;" onclick="boxScrollNew('#partnern');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-股东信息'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    股东信息&nbsp;1 </a> <a href="javascript:;" onclick="boxScrollNew('#guquan');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-股权穿透图'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    股权穿透图
                                </a> <a href="javascript:;" onclick="boxScrollNew('#Mainmember');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-主要人员'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    主要人员&nbsp;6 </a> <a href="javascript:;" onclick="boxScrollNew('#touzilist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-对外投资'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    对外投资&nbsp;50
                                </a> <a href="javascript:;" class="btn btn-sm btn-default m-t-sm  m-r-sm c_disable" style="white-space:nowrap;cursor: default">
                                    总公司&nbsp;0
                                </a> <a href="javascript:;" onclick="boxScrollNew('#branchelist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-分支机构'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    分支机构&nbsp;3
                                </a> <a href="javascript:;" class="btn btn-sm btn-default m-t-sm  m-r-sm c_disable" style="white-space:nowrap;cursor: default">
                                    工商自主公示&nbsp;0
                                </a> <a href="javascript:;" onclick="boxScrollNew('#muhou');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-关系图谱'});" class="btn btn-sm btn-default m-t-sm m-r-sm" style="white-space:nowrap;">
                                    关系图谱&nbsp;
                                </a> <a href="javascript:;" class="btn btn-sm btn-default  m-r-sm m-t-sm c_disable" style="white-space:nowrap;cursor: default">
                                    财务数据
                                </a> <a href="javascript:;" class="btn btn-sm btn-default m-t-sm  m-r-sm c_disable" style="white-space:nowrap;cursor: default">
                                    建筑信息&nbsp;0 <span class="icon-new"></span> </a> <a href="javascript:;" onclick="boxScrollNew('#Changelist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-变更记录'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    变更记录&nbsp;41
                                </a> <a href="javascript:;" onclick="boxScrollNew('#syrlist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-最终受益人'});zhugeTrack('开通VIP',{'弹窗来源':'企业主页-基本信息-最终受益人'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    最终受益人&nbsp;1
                                </a> <a href="javascript:;" onclick="boxScrollNew('#kzrtupu');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-实际控制人'});" class="btn btn-sm btn-default m-t-sm   m-r-sm" style="white-space:nowrap;">
                                    实际控制人 <span class="icon-new"></span> </a> <a href="javascript:;" onclick="boxScrollNew('#holdcolist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-控制企业'});" class="btn btn-sm btn-default m-t-sm m-r-sm " style="white-space:nowrap;">
                                    控制企业&nbsp;199 </a> <a href="javascript:;" onclick="boxScrollNew('#indirectinvestmentlist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-间接持股企业'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    间接持股企业&nbsp;183 </a> <a href="javascript:;" onclick="boxScrollNew('#suspectedrellist');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-疑似关系'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    疑似关系&nbsp;26 </a> <a href="javascript:;" onclick="boxScrollNew('#cwjx');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-财务简析'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    财务简析
                                </a> <a href="javascript:;" onclick="boxScrollNew('#thyfx');zhugeTrack('企业主页内容点击',{'点击来源':'快捷入口','数据维度':'基本信息-同业分析'});" class="btn btn-sm btn-default m-t-sm  m-r-sm" style="white-space:nowrap;">
                                    同业分析</a> <a href="javascript:;" class="btn btn-sm btn-default m-t-sm  m-r-sm c_disable" style="white-space:nowrap;cursor: default">
                                    全球关联企业
                                </a> </div>
                        </section>
                        <section class="panel b-a" id="qccGraph">
                            <div class="tcaption">
                                <h3 class="title">查查图谱</h3> <span class="watermark"></span>
                            </div>
                            <div class="clearfix"> <a class="base-graphsl" onclick="zhugeTrack('企业主页查查图谱点击',{'图谱名称':'企业图谱'});" href="/company_newgraph?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=领地集团有限公司">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl101.png" alt="企业图谱"> </div>
                                    <div class="text">企业图谱</div>
                                </a> <a class="base-graphsl" onclick="showVipModal('企业受益股东','成为VIP会员 即可查看企业受益股东 自然人分布 机构分布等信息','sygd');zhugeTrack('开通VIP',{'弹窗来源':'企业受益股东'});">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl102.png" alt="企业受益股东"> </div>
                                    <div class="text">企业受益股东</div>
                                </a> <a class="base-graphsl" onclick="showVipModal('关联方认定图','成为VIP会员 即可查看根据上交所，深交所及企业会计准则认定的关联方认定图','glft');zhugeTrack('开通VIP',{'弹窗来源':'关联方认定图'});">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl103.png" alt="关联方认定图"> </div>
                                    <div class="text">关联方认定图</div>
                                </a> <a class="base-graphsl" onclick="showVipModal('股权结构','成为VIP会员 即可查看企业的股东持股和对外投资情况','gqjg');zhugeTrack('开通VIP',{'弹窗来源':'股权结构图'});">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl104.png" alt="股权结构图"> </div>
                                    <div class="text">股权结构图</div>
                                </a> <a class="base-graphsl" onclick="zhugeTrack('企业主页查查图谱点击',{'图谱名称':'关系图谱'});" href="/company_muhou3?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=领地集团有限公司">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl106.png" alt="关系图谱"> </div>
                                    <div class="text">关系图谱</div>
                                </a> <a class="base-graphsl" onclick="zhugeTrack('企业主页查查图谱点击',{'图谱名称':'股权穿透图'});" href="/web/charts/equity-chart?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl105.png" alt="股权穿透图"> </div>
                                    <div class="text">股权穿透图</div>
                                </a> <a class="base-graphsl" onclick="showVipModal('实际控制人', '成为VIP会员即可查看疑似实际控制人  总股权比例等信息', 'kzrt');zhugeTrack('开通VIP',{'弹窗来源':'实际控制人'});">
                                    <div class="img"> <img src="/material/theme/chacha/cms/v2/images/graphsl107.png" alt="实际控制人"> </div>
                                    <div class="text">实际控制人</div>
                                </a> </div>
                        </section>
                        <section class="panel b-a" id="Cominfo">
                            <div class="tcaption">
                                <h3 class="title">营业执照信息</h3> <a onclick="zhugeTrack('企业主页-工商信息-查看工商官网快照',{'企业名称':'领地集团有限公司'});" class="text-primary kz_anim" href="/snapshoot/f50d972bf1d7aa5bb88da915da782762.html" target="_blank">
                                    查看工商官网快照
                                </a> <span class="thist"><span class="text-gray m-l-sm"><a class="text-gray" onclick="showVipModal('历史信息','成为VIP会员即可 查看历史工商变更、投资、股东、诉讼、受到的行政处罚等信息','lsxx',null,null,true)">历史营业执照信息 <span style="font-size: 12px;">1</span></a></span></span>
                                <div class="tdrop"> <span class="btn" onclick="exportTable(this,'营业执照',201);zhugeTrack('导出数据来源',{'企业主页':'营业执照'});"> <span class="export"></span> <span>导出数据</span> </span> </div> <span class="watermark"></span> <span class="explain-tip2" onclick="addNotice(this,true,'f50d972bf1d7aa5bb88da915da782762|领地集团有限公司');zhugeTrack('企业主页按钮点击',{'变更通知':'营业执照'});"> <span class="explain2"></span> <span>发生变更时通知我</span> </span>
                            </div>
                            <div class="prot-gltu" id="protGltu"></div>
                            <table class="ntable">
                                <tbody>
                                    <tr>
                                        <td width="13%" class="tb">
                                            法定代表人
                                        </td>
                                        <td>
                                            <div class="boss-td">
                                                <div class="clearfix" style="min-height: 70px;padding-top: 8px;overflow: hidden;">
                                                    <div class="pull-left bheadimgkuang"> <span class="usericon boss color-9" first-letter="刘"></span> </div>
                                                    <div class="bpen"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html" class="bname">
                                                            <h2 class="seo font-20">刘玉辉</h2>
                                                        </a> <a class="btn-touzi pull-left" onclick="relatedList(1,'pa623216b83c08894d124afed076d1ef','刘玉辉');zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});">关联13家企业 &gt; </a> </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="13%" class="tb">登记状态</td>
                                        <td width="20%" class="">
                                            存续（在营、开业、在册） </td>
                                        <td width="13%" class="tb">成立日期</td>
                                        <td width="20%" class="">
                                            1999-04-19
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tb"> 注册资本 </td>
                                        <td> 339000万元人民币 </td>
                                        <td class="tb"> 实缴资本 </td>
                                        <td> 339000万元人民币
                                            <i class="m_exclamatory" style="top: 3px;left: 3px;" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="" data-delay="500" data-original-title="实缴资本信息来源于：2019年报，结果仅供参考"></i> </td>
                                        <td class="tb">核准日期</td>
                                        <td class="">
                                            2019-11-07
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tb">统一社会信用代码</td>
                                        <td class="">
                                            915101007175252181
                                        </td>
                                        <td class="tb">组织机构代码</td>
                                        <td class="">
                                            71752521-8
                                        </td>
                                        <td class="tb">工商注册号</td>
                                        <td class="">
                                            510100000054840
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tb">纳税人识别号</td>
                                        <td class="">
                                            915101007175252181
                                        </td>
                                        <td class="tb">进出口企业代码</td>
                                        <td class="">
                                            -
                                        </td>
                                        <td class="tb">所属行业</td>
                                        <td class="">
                                            房地产业
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="13%" class="tb">企业类型</td>
                                        <td width="20%" class="">
                                            有限责任公司（非自然人投资或控股的法人独资）
                                        </td>
                                        <td class="tb">
                                            营业期限
                                        </td>
                                        <td class="">
                                            1999-04-19 至 无固定期限 </td>
                                        <td width="13%" class="tb">登记机关</td>
                                        <td width="20%" class="">
                                            成都市市场监督管理局
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tb">
                                            人员规模
                                        </td>
                                        <td class="">
                                            600-699人
                                        </td>
                                        <td class="tb">
                                            参保人数
                                        </td>
                                        <td class="">
                                            630 <i class="m_exclamatory" style="top: 3px;left: 3px;" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="" data-delay="500" data-original-title="参保人数信息来源于：2019年报，结果仅供参考"></i> </td>
                                        <td class="tb">所属地区</td>
                                        <td class="">
                                            四川省
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tb">
                                            曾用名
                                        </td>
                                        <td class=""> <span>领地集团股份有限公司</span> <br> <span>领地房地产集团股份有限公司</span> <br> <span>领地房地产集团有限公司</span> <br> </td>
                                        <td class="tb">英文名</td>
                                        <td class="" colspan="3">
                                            Lingdi Real Estate Group Co., Ltd.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="tb">企业地址</td>
                                        <td class="" colspan="5"> <span class="tdpath"> <a onclick="showMapModal('成都武侯区航空路1号1幢14楼3号','成都市','104.074160536162','30.6228305519394');zhugeTrack('企业主页按钮点击',{'按钮名称':'查看地图'});"> 成都武侯区航空路1号1幢14楼3号 </a> </span> <a onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'附近企业'});" href="/map?keyNo=f50d972bf1d7aa5bb88da915da782762" class="m-l c_a"> 附近企业</a> </td>
                                    </tr>
                                    <tr>
                                        <td class="tb">经营范围</td>
                                        <td class="" colspan="5">
                                            房地产投资、实业投资（不得从事非法集资、吸收公众资金等金融活动）；房地产开发经营；商品房销售及出租；技术进出口，财税咨询、房地产中介服务、社会经济咨询、市场调查（不含涉外项目）、房地产交易与权属登记管理服务、软件开发。（依法须经批准的项目，经相关部门批准后方可开展经营活动）。 </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section class="panel b-a risk-section" id="riskTop1">
                            <div class="tcaption"> <span class="title"><img src="/material/theme/chacha/cms/v2/images/risk_title2.png"></span> <span class="tbadger">1123</span> <span class="watermark"></span> <span class="ntag vip m-l-sm">功能</span> </div>
                            <table class="panel " style="cursor: pointer" onclick="allRiskClick(event,'f50d972bf1d7aa5bb88da915da782762','1','1');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});">
                                <tbody>
                                    <tr>
                                        <td width="120"> <span class="scfengxin zsfx"></span>自身风险
                                        </td>
                                        <td width="90"> <span class="tag">126条</span> </td>
                                        <td>
                                            该企业因<em>借款合同纠纷案件执行</em>案由起诉他人或公司（<span class="text-gray">5</span>）
                                            <a rel="nofollow" target="_blank" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" class="text-danger" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1">详情</a>
                                            <div>其他（<span class="text-gray">121</span>）
                                                <a rel="nofollow" target="_blank" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" class="text-danger" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1">详情</a></div>
                                        </td>
                                        <td width="130" rowspan="5"> <a rel="nofollow" target="_blank" data-type="2" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=1" class="btn btn-danger" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');zhugeTrack('企业主页头部按钮点击',{'按钮名称':'风险扫描'});andZhugeInfo();">查看风险</a> <span class="rquestion-hover pull-right"><i class="m_question"></i>
                                                <div class="rquestion-panel"> <img src="/material/theme/chacha/cms/v2/images/pic_jk2.png">
                                                    <div class="pull-right" style="width: 362px;line-height: 1.6;">
                                                        <p><b>自身风险</b>：聚合该企业自身存在的司法、经营、监管等风险信息。</p>
                                                        <p><b>关联风险</b>：挖掘企业的关联企业（如企业股东、投资公司、分公司）和关联人（如法定代表人、实际控制人、股东、主要人员）的司法、经营、监管等风险信息。</p>
                                                        <p><b>历史风险</b>：聚合该企业自身曾经存在的司法、经营、监管等风险信息。这些风险可能已经处理完毕，但对于评估企业过去的状况有较大帮助。</p>
                                                        <p><b>提示信息</b>：企业自身，及关联企业和关联人员的法定代表人、大股东和实际控制人、对外投资等工商变更信息。</p>
                                                        <p><b>敏感舆情</b>：企业自身，及关联企业和关联人员的敏感舆情信息。</p> <button style="width: 98px;" onclick="showVipModal('风险扫描','成为VIP会员 即可查看企业自身风险和关联风险','fxsm','查看样例公司','https://www.qcc.com/firm/9cce0780ab7644008b73bc2120479d31.html');" class="btn btn-primary pull-right">开通vip</button>
                                                    </div>
                                                </div>
                                            </span> </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="scfengxin glfx"></span>关联风险
                                        </td>
                                        <td> <span class="tag">532条</span> </td>
                                        <td>
                                            该企业投资的 <a class="text-primary"><em>广东领悦房地产开发有限公司</em></a> 因<em>未按时履行法律义务</em>被法院强制执行（<span class="text-gray">1</span>）
                                            <a class="text-danger" rel="nofollow" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=2">详情</a>
                                            <div>其他（<span class="text-gray">531</span>）
                                                <a class="text-danger" rel="nofollow" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=2">详情</a></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="120"> <span class="scfengxin zsfx"></span>历史风险
                                        </td>
                                        <td width="90"> <span class="tag">14条</span> </td>
                                        <td>
                                            该企业曾经因<em>未按时履行法律义务被法院强制执行</em>（<span class="text-gray">5</span>）
                                            <a rel="nofollow" target="_blank" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" class="text-danger" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=5">详情</a>
                                            <div>其他（<span class="text-gray">9</span>）
                                                <a rel="nofollow" target="_blank" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" class="text-danger" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=5">详情</a></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="scfengxin tsfx"></span>提示信息
                                        </td>
                                        <td> <span class="tag">437条</span> </td>
                                        <td>
                                            该企业<em>法定代表人</em>变更了（<span class="text-gray">1</span>）次
                                            <a class="text-danger" rel="nofollow" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=3">详情</a>
                                            <div>其他（<span class="text-gray">436</span>）
                                                <a class="text-danger" rel="nofollow" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=3">详情</a></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <span class="scfengxin yqfx"></span>敏感舆情
                                        </td>
                                        <td> <span class="tag">14条</span> </td>
                                        <td>

                                            该企业有 <em>客户投诉</em> 敏感舆情（<span class="text-gray">1</span>）

                                            <a class="text-danger" rel="nofollow" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=4">详情</a>
                                            <div>其他（<span class="text-gray">13</span>）
                                                <a class="text-danger" rel="nofollow" data-type="2" onclick="event.stopPropagation();vipPermision(event,'f50d972bf1d7aa5bb88da915da782762');andZhugeInfo();" target="_blank" href="/risk?obj=1&amp;unique=f50d972bf1d7aa5bb88da915da782762&amp;property=4">详情</a></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section id="partnern" class="panel b-a clearfix">
                            <div class="tcaption  m-t">
                                <h3 class="title">股东信息</h3> <span class="watermark"></span> <span class="explain-tip2" onclick="addNotice(this,true,'f50d972bf1d7aa5bb88da915da782762|领地集团有限公司');zhugeTrack('企业主页按钮点击',{'变更通知':'股东信息'});"> <span class="explain2"></span> <span>发生变更时通知我</span> </span>
                            </div>
                            <div class="clearfix m-t"></div>
                            <div id="partnerslist">
                                <div class="tcaption"> <span class="subtitle">股东信息</span> <span class="tbadge">1</span> <span class="thist"><a class="text-gray" onclick="showVipModal('历史信息','成为VIP会员即可 查看历史工商变更、投资、股东、诉讼、受到的行政处罚等信息','lsxx',null,null,true)"><span class="text-gray">历史股东信息</span> 8</a></span>
                                    <div class="tdrop"> <span class="btn" onclick="exportTable(this,'股东信息',202);zhugeTrack('导出数据来源',{'企业主页':'股东信息'});"> <span class="export"></span> <span>导出数据</span> </span> </div>
                                    <div class="chooseBase" data-box="partners" style="float: right">
                                        <div class="tdrop"> <span class="btn" data-toggle="dropdown"> <span class="partnersratio">持股比例</span> <span class="caret m-l"></span> </span>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a href="javascript:;" data-option="ratio" data-value="">不限</a></li>
                                                <li><a href="javascript:;" data-option="ratio" data-value="90%以上">90%以上(1)</a></li>
                                            </ul>
                                        </div>
                                        <div class="tdrop"> <span class="btn" data-toggle="dropdown"> <span class="partnerscapi">认缴金额</span> <span class="caret m-l"></span> </span>
                                            <ul class="dropdown-menu dropdown-menu-right">
                                                <li><a href="javascript:;" data-option="capi" data-value="">不限</a></li>
                                                <li><a href="javascript:;" data-option="capi" data-value="5000万以上">5000万以上(1)</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <table class="ntable ntable-odd npth nptd">
                                    <tbody>
                                        <tr>
                                            <th class="tx">序号</th>
                                            <th width=""> <span class="m-r-sm">股东及出资信息</span> <a onclick="showVipModal('最终受益人','成为VIP会员即可 查看历史工商变更、投资、股东、诉讼、受到的行政处罚等信息','zzsy','查看样例', '/firm/9cce0780ab7644008b73bc2120479d31.html#syrlistpos',true)">查看最终受益人&gt;</a> </th>
                                            <th width="130">持股比例</th>
                                            <th style="min-width: 130px;"> <span onclick="sortTabList(this,'base','partners','shouldcapi')" class="tsort-th">认缴出资额(万元) <span data-field="shouldcapi" class="tsort-icon "></span> </span> </th>
                                            <th style="min-width: 130px;"> <span onclick="sortTabList(this,'base','partners','shoulddate')" class="tsort-th">认缴出资日期
                                                    <span data-field="shoulddate" class="tsort-icon "></span> </span> </th>
                                        </tr>
                                        <tr>
                                            <td class="tx">1</td>
                                            <td>
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/82bdb0a54e8cf37c37dc6ff2202e332f.jpg"> </span> </td>
                                                            <td> <a href="/firm/82bdb0a54e8cf37c37dc6ff2202e332f.html" target="_blank"><span class="seo font-14">成都恒禧企业管理咨询有限公司</span></a>
                                                                <div class="m-t-xs ptag"> <span class="ntag sm text-danger m-r-xs tooltip-br" data-trigger="hover" data-toggle="tooltip" data-placement="right" title="" data-original-title="大股东是指股票占比较大的股东，它表示该股东与其余的股东相比较，它的占比最大。控股股东一定是大股东，但大股东却并不一定是控股股东。">大股东</span> </div>
                                                            </td>
                                                            <td width="90">
                                                                <div class="clearfix m-t-xs"> <a class="btn-touzi" onclick="guquanList2('82bdb0a54e8cf37c37dc6ff2202e332f','成都恒禧企业管理咨询有限公司');zhugeTrack('企业主页-基本信息-股东信息-查看股权结构',{'股东名称':'成都恒禧企业管理咨询有限公司'});">股权结构 &gt; </a> </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                100%

                                            </td>
                                            <td class="text-center">
                                                313000 , <br>
                                                26000 <br> </td>
                                            <td class="text-center">

                                                2019-09-18, <br>

                                                2019-09-18 <br> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div> </div>
                            </div> <input type="hidden" id="sanbanStockCode" value="">
                        </section>
                        <section class="panel b-a clear guquan-section" id="guquan">
                            <div class="tcaption">
                                <h3 class="title">股权穿透图</h3> <span class="watermark"></span>
                            </div>
                            <table class="ntable">
                                <tbody>
                                    <tr>
                                        <th style="text-align: left;position: relative;">
                                            领地集团有限公司
                                            <div id="guquanIframeTool" class="guquan-tool" style="display: block;"> <a href="/web/charts/equity-chart?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'全屏查看'});" target="_blank"><span class="screen">&nbsp;</span><span>全屏查看</span></a> <a class="m-l" onclick="$('#guquanIframe')[0].contentWindow.saveImg();zhugeTrack('企业主页按钮点击',{'按钮名称':'下载图谱'});"><span class="save">&nbsp;</span><span>下载图谱</span></a> </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0px;"> <iframe id="guquanIframe" scrolling="no" src="/web/charts/equity-chart?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&amp;iframe=1" frameborder="0"></iframe> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section class="panel b-a clear" id="Mainmember">
                            <div class="tcaption"> <span class="title">主要人员</span> <span class="tbadge">6</span> <span class="thist"><a onclick="showVipModal('历史信息 只对VIP开放哦')"><span class="text-gray">历史高管</span> 8</a></span>
                                <div class="tdrop"> <span class="btn" onclick="exportTable(this,'主要人员',203);zhugeTrack('导出数据来源',{'企业主页':'主要人员'});"> <span class="export"></span> <span>导出数据</span> </span> </div> <span class="watermark"></span> <span class="explain-tip2" onclick="addNotice(this,true,'f50d972bf1d7aa5bb88da915da782762|领地集团有限公司');zhugeTrack('企业主页按钮点击',{'变更通知':'主要人员'});"> <span class="explain2"></span> <span>发生变更时通知我</span> </span>
                            </div>
                            <div id="employeeslist">
                                <table class="ntable ntable-odd">
                                    <tbody>
                                        <tr>
                                            <th class=""> 序号</th>
                                            <th class=""> 姓名</th>
                                            <th class="">职务</th>
                                            <th class="">持股比例</th>
                                            <th class="">最终受益股份</th>
                                        </tr>
                                        <tr>
                                            <td class="tx">1</td>
                                            <td width="50%">
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50">
                                                                <div class="headimg"> <span class="usericon headn color-12" first-letter="刘"></span> </div>
                                                            </td>
                                                            <td> <a href="/pl/pa623216b83c08894d124afed076d1ef.html"><span class="seo font-14">刘玉辉</span></a>
                                                                <div class="m-t-xs ptag"> <span class="ntag sm text-primary click" onclick="showVipModal('最终受益人','成为VIP会员即可 查看历史工商变更、投资、股东、诉讼、受到的行政处罚等信息','zzsy','查看样例', '/firm/9cce0780ab7644008b73bc2120479d31.html#syrlistpos',true);zhugeTrack('企业主页按钮点击',{'标签名称':'最终受益人'});">最终受益人</span> </div>
                                                            </td>
                                                            <td class="longtd" width="140"> <a class="btn-touzi" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});relatedList(1,'pa623216b83c08894d124afed076d1ef','刘玉辉')">关联13家企业 &gt; </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                董事长兼总经理
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tx">2</td>
                                            <td width="50%">
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50">
                                                                <div class="headimg"> <span class="usericon headn color-14" first-letter="刘"></span> </div>
                                                            </td>
                                                            <td> <a href="/pl/pa97017b51c3e2cfc52c60499d4144e6.html"><span class="seo font-14">刘浩威</span></a> </td>
                                                            <td class="longtd" width="140"> <a class="btn-touzi" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});relatedList(1,'pa97017b51c3e2cfc52c60499d4144e6','刘浩威')">关联45家企业 &gt; </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                董事
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tx">3</td>
                                            <td width="50%">
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50">
                                                                <div class="headimg"> <span class="usericon headn color-9" first-letter="刘"></span> </div>
                                                            </td>
                                                            <td> <a href="/pl/pc3e5ea54891bad17f32f09ec0039d8c.html"><span class="seo font-14">刘策</span></a> </td>
                                                            <td class="longtd" width="140"> <a class="btn-touzi" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});relatedList(1,'pc3e5ea54891bad17f32f09ec0039d8c','刘策')">关联93家企业 &gt; </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                董事
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tx">4</td>
                                            <td width="50%">
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50">
                                                                <div class="headimg"> <span class="usericon headn color-12" first-letter="龙"></span> </div>
                                                            </td>
                                                            <td> <a href="/pl/p10d240fc9323273e6d00ead2df9b62a.html"><span class="seo font-14">龙一勤</span></a> </td>
                                                            <td class="longtd" width="140"> <a class="btn-touzi" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});relatedList(1,'p10d240fc9323273e6d00ead2df9b62a','龙一勤')">关联9家企业 &gt; </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                监事
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tx">5</td>
                                            <td width="50%">
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50">
                                                                <div class="headimg"> <span class="usericon headn color-6" first-letter="王"></span> </div>
                                                            </td>
                                                            <td> <a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html"><span class="seo font-14">王涛</span></a> </td>
                                                            <td class="longtd" width="140"> <a class="btn-touzi" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});relatedList(1,'p4e1d3966b51d51f5494ed3f0261c535','王涛')">关联21家企业 &gt; </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                监事
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="tx">6</td>
                                            <td width="50%">
                                                <table class="insert-table">
                                                    <tbody>
                                                        <tr>
                                                            <td width="50">
                                                                <div class="headimg"> <span class="usericon headn color-1" first-letter="侯"></span> </div>
                                                            </td>
                                                            <td> <a href="/pl/p0e7bf031703bc01246807db0da940e2.html"><span class="seo font-14">侯三利</span></a> </td>
                                                            <td class="longtd" width="140"> <a class="btn-touzi" onclick="zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});relatedList(1,'p0e7bf031703bc01246807db0da940e2','侯三利')">关联15家企业 &gt; </a> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                            <td class="text-center">
                                                监事
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                            <td class="text-center">
                                                -
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div> </div>
                            </div>
                        </section>
                        <section class="panel b-a clear">
                            <div class="tcaption  m-t">
                                <h3 class="title">对外投资统计分析</h3> <a class="hchart" onclick="hideChart(this)" href="javascript:;"> <span>收起</span> <i class="i i-arrow-up4"></i> </a>
                            </div>
                            <div class="float-wrap">
                                <div class="col-sm-6 col-xs-12 no-padding">
                                    <div id="touzi-province" class="nchart-item hmd" _echarts_instance_="ec_1611908670858" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: rgb(255, 255, 255);">
                                        <div style="position: relative; overflow: hidden; width: 584px; height: 298px;"><canvas width="1168" height="596" data-zr-dom-id="zr_0" style="position: absolute; left: 0px; top: 0px; width: 584px; height: 298px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas></div>
                                        <div></div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-xs-12 no-padding" style="padding-left: 7px">
                                    <div id="touzi-industry" class="nchart-item hmd" _echarts_instance_="ec_1611908670857" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;">
                                        <div style="position: relative; overflow: hidden; width: 584px; height: 298px;"><canvas width="1168" height="596" data-zr-dom-id="zr_0" style="position: absolute; left: 0px; top: 0px; width: 584px; height: 298px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);"></canvas></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section class="panel b-a" id="touzilist">
                            <div class="tcaption"> <span class="title"> 对外投资</span> <span class="tbadge">50</span> <span class="thist"><a onclick="showVipModal('历史信息 只对VIP开放哦')"><span class="text-gray">历史对外投资</span> 7</a></span>
                                <div class="chooseBase" data-box="touzi" style="float: right">
                                    <div class="tdrop"> <span class="btn" onclick="exportTable(this,'对外投资',204);zhugeTrack('导出数据来源',{'企业主页':'对外投资'});"> <span class="export"></span> <span>导出数据</span> </span> </div>
                                    <div class="tdrop"> <span class="btn" data-toggle="dropdown"> <span class="touziratio">持股比例</span> <span class="caret m-l"></span> </span>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="javascript:;" data-option="ratio" data-value="">不限</a></li>
                                            <li><a href="javascript:;" data-dption="fundedratiolevel" data-option="ratio" data-value="6">100%(27)</a></li>
                                            <li><a href="javascript:;" data-dption="fundedratiolevel" data-option="ratio" data-value="5">66.66%以上(32)</a></li>
                                            <li><a href="javascript:;" data-dption="fundedratiolevel" data-option="ratio" data-value="4">50%以上(44)</a></li>
                                            <li><a href="javascript:;" data-dption="fundedratiolevel" data-option="ratio" data-value="3">20%以上(48)</a></li>
                                            <li><a href="javascript:;" data-dption="fundedratiolevel" data-option="ratio" data-value="2">5%以上(50)</a></li>
                                        </ul>
                                    </div>
                                    <div class="tdrop"> <span class="btn" data-toggle="dropdown"> <span class="touziindustrycode">所属行业</span> <span class="caret m-l"></span> </span>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="javascript:;" data-option="industrycode" data-value="">不限</a></li>
                                            <li><a href="javascript:;" data-dption="industrycode" data-option="industrycode" data-value="E">建筑业(1)</a></li>
                                            <li><a href="javascript:;" data-dption="industrycode" data-option="industrycode" data-value="F">批发和零售业(2)</a></li>
                                            <li><a href="javascript:;" data-dption="industrycode" data-option="industrycode" data-value="K">房地产业(40)</a></li>
                                            <li><a href="javascript:;" data-dption="industrycode" data-option="industrycode" data-value="L">租赁和商务服务业(7)</a></li>
                                        </ul>
                                    </div>
                                    <div class="tdrop"> <span class="btn" data-toggle="dropdown"> <span class="touziprovince">所属省份</span> <span class="caret m-l"></span> </span>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="javascript:;" data-option="province" data-value="">不限</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="AH">安徽(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="BJ">北京(3)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="CQ">重庆(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="GD">广东(3)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="GX">广西(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="GZ">贵州(2)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="HB">河北(2)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="HEN">河南(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="HUB">湖北(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="HUN">湖南(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="JL">吉林(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="JS">江苏(3)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="JX">江西(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="LN">辽宁(2)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="SAX">陕西(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="SC">四川(23)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="SD">山东(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="XJ">新疆(1)</a></li>
                                            <li><a href="javascript:;" data-dption="province" data-option="province" data-value="YN">云南(1)</a></li>
                                        </ul>
                                    </div>
                                </div> <span class="watermark"></span> <span class="explain-tip2" onclick="addNotice(this,true,'f50d972bf1d7aa5bb88da915da782762|领地集团有限公司');zhugeTrack('企业主页按钮点击',{'变更通知':'对外投资'});"> <span class="explain2"></span> <span>发生变更时通知我</span> </span>
                            </div>
                            <table class="ntable ntable-odd npth">
                                <tbody>
                                    <tr>
                                        <th class="tx">序号</th>
                                        <th class="">被投资企业名称</th>
                                        <th class="">法定代表人</th>
                                        <th class=""> <span onclick="sortTabList(this,'base','touzi','registcapi')" class="tsort-th">注册资本
                                                <span data-field="registcapi" onclick="zhugeTrack('企业主页按钮点击',{'排序名称':'注册资本'});" class="tsort-icon "></span> </span> </th>
                                        <th class=""> <span onclick="sortTabList(this,'base','touzi','fundedratio')" class="tsort-th">投资比例
                                                <span data-field="fundedratio" onclick="zhugeTrack('企业主页按钮点击',{'排序名称':'投资比例'});" class="tsort-icon "></span> </span> </th>
                                        <th class="">投资数额
                                        </th>
                                        <th class=""> <span onclick="sortTabList(this,'base','touzi','startdate')" class="tsort-th">成立日期
                                                <span data-field="startdate" onclick="zhugeTrack('企业主页按钮点击',{'排序名称':'成立日期'});" class="tsort-icon "></span> </span> </th>
                                        <th>状态</th>
                                    </tr>
                                    <tr>
                                        <td class="text-center">1</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/bd99a93bd043efb73404b7da8a7e2dbc.jpg"> </span> </td>
                                                        <td> <a href="/firm/bd99a93bd043efb73404b7da8a7e2dbc.html" target="_blank"><span class="seo font-14">成都汉景实业有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('bd99a93bd043efb73404b7da8a7e2dbc','成都汉景实业有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/pd8af97bd6f638fdf1c9c3acc0ae197d.html"><span class="seo font-14">刘玉勤</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'pd8af97bd6f638fdf1c9c3acc0ae197d','刘玉勤');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'刘玉勤'});">关联19家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            53500万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                53500万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2005-03-31 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">2</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/3f7fa5636bea687f4b9adc5f772366a5.jpg"> </span> </td>
                                                        <td> <a href="/firm/3f7fa5636bea687f4b9adc5f772366a5.html" target="_blank"><span class="seo font-14">成都领地泛太房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('3f7fa5636bea687f4b9adc5f772366a5','成都领地泛太房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/pd8af97bd6f638fdf1c9c3acc0ae197d.html"><span class="seo font-14">刘玉勤</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'pd8af97bd6f638fdf1c9c3acc0ae197d','刘玉勤');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'刘玉勤'});">关联19家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            6667万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                6667万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2013-12-27 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">3</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/a7298f71f4f6716ff8c7ae2d35eb75a1.jpg"> </span> </td>
                                                        <td> <a href="/firm/a7298f71f4f6716ff8c7ae2d35eb75a1.html" target="_blank"><span class="seo font-14">河北都能房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('a7298f71f4f6716ff8c7ae2d35eb75a1','河北都能房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/p71de85c11303f7922646f8f091349d7.html"><span class="seo font-14">刘玉国</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'p71de85c11303f7922646f8f091349d7','刘玉国');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'刘玉国'});">关联42家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            5000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                5000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2017-03-20 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">4</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/4aa46b6d1f769743e2dcf3feaffd049e.jpg"> </span> </td>
                                                        <td> <a href="/firm/4aa46b6d1f769743e2dcf3feaffd049e.html" target="_blank"><span class="seo font-14">大连领地房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('4aa46b6d1f769743e2dcf3feaffd049e','大连领地房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/pa97017b51c3e2cfc52c60499d4144e6.html"><span class="seo font-14">刘浩威</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'pa97017b51c3e2cfc52c60499d4144e6','刘浩威');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'刘浩威'});">关联45家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            5000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                5000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2014-06-05 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">5</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/c263d7f19e1d7e9b04822292c926a4b5.jpg"> </span> </td>
                                                        <td> <a href="/firm/c263d7f19e1d7e9b04822292c926a4b5.html" target="_blank"><span class="seo font-14">广东领悦房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('c263d7f19e1d7e9b04822292c926a4b5','广东领悦房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/pc3e5ea54891bad17f32f09ec0039d8c.html"><span class="seo font-14">刘策</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'pc3e5ea54891bad17f32f09ec0039d8c','刘策');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'刘策'});">关联93家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            5000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                5000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2014-01-28 </td>
                                        <td width="90" class="text-center"> <span class="text-success">在业</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">6</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/f507a5fc5a9c8908df0013a4e097bc78.jpg"> </span> </td>
                                                        <td> <a href="/firm/f507a5fc5a9c8908df0013a4e097bc78.html" target="_blank"><span class="seo font-14">郑州领域房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('f507a5fc5a9c8908df0013a4e097bc78','郑州领域房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/pae3c342321916a0f2c1f1a84825ecc2.html"><span class="seo font-14">徐川海</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'pae3c342321916a0f2c1f1a84825ecc2','徐川海');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'徐川海'});">关联8家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            2000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                2000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2019-02-20 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">7</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/a3801c9534785a07f8cad38fcf4a254f.jpg"> </span> </td>
                                                        <td> <a href="/firm/a3801c9534785a07f8cad38fcf4a254f.html" target="_blank"><span class="seo font-14">安徽省川达房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('a3801c9534785a07f8cad38fcf4a254f','安徽省川达房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/p95ad51bbe857c18830d1c93ebc0a1f4.html"><span class="seo font-14">罗高丽</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'p95ad51bbe857c18830d1c93ebc0a1f4','罗高丽');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'罗高丽'});">关联42家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            2000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                2000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2018-09-25 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">8</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/73e2d726e11013129e39f103cad3451f.jpg"> </span> </td>
                                                        <td> <a href="/firm/73e2d726e11013129e39f103cad3451f.html" target="_blank"><span class="seo font-14">重庆源地川达企业管理咨询有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('73e2d726e11013129e39f103cad3451f','重庆源地川达企业管理咨询有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/p2cf1621a9a35ef3eb68263b437e8360.html"><span class="seo font-14">李蕊志</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'p2cf1621a9a35ef3eb68263b437e8360','李蕊志');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'李蕊志'});">关联20家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            2000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                2000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2018-09-05 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">9</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/2befabf01bb29c22327d20d9afabe6bc.jpg"> </span> </td>
                                                        <td> <a href="/firm/2befabf01bb29c22327d20d9afabe6bc.html" target="_blank"><span class="seo font-14">江西省川达房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('2befabf01bb29c22327d20d9afabe6bc','江西省川达房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/p95ad51bbe857c18830d1c93ebc0a1f4.html"><span class="seo font-14">罗高丽</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'p95ad51bbe857c18830d1c93ebc0a1f4','罗高丽');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'罗高丽'});">关联42家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            2000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                2000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2018-08-21 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="text-center">10</td>
                                        <td width="">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td width="50"> <span class="headimg"> <img src="https://qccdata.qichacha.com/AutoImage/ca1fe1f8a917e4fdf68f41a96f6b2578.jpg"> </span> </td>
                                                        <td> <a href="/firm/ca1fe1f8a917e4fdf68f41a96f6b2578.html" target="_blank"><span class="seo font-14">湖南省领创房地产开发有限公司</span></a>
                                                            <div class="clearfix m-t-xs"> <a class="btn-touzi pull-left" onclick="guquanList2('ca1fe1f8a917e4fdf68f41a96f6b2578','湖南省领创房地产开发有限公司');zhugeTrack('企业主页按钮点击',{'按钮名称':'股权结构'});">股权结构 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="220">
                                            <table class="insert-table">
                                                <tbody>
                                                    <tr>
                                                        <td> <a href="/pl/p95ad51bbe857c18830d1c93ebc0a1f4.html"><span class="seo font-14">罗高丽</span></a>
                                                            <div class="m-t-xs"> <a class="btn-touzi pull-left" onclick="relatedList(1,'p95ad51bbe857c18830d1c93ebc0a1f4','罗高丽');zhugeTrack('关联企业按钮点击',{'按钮位置':'对外投资','关联目标':'罗高丽'});">关联42家企业 &gt; </a> </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="145" class="text-center">

                                            2000万元人民币
                                        </td>
                                        <td width="110" class="text-center">
                                            100%
                                        </td>
                                        <td width="130" class="text-center"> <span>
                                                2000万元人民币
                                            </span> </td>
                                        <td width="103" class="text-center">
                                            2018-08-16 </td>
                                        <td width="90" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <nav class="text-right">
                                    <ul class="pagination">
                                        <li class="active"><a htef="#">1</a></li>
                                        <li><a id="ajaxpage" href="javascript:getTabList(2,&quot;base&quot;,&quot;touzi&quot;)">2</a></li>
                                        <li><a id="ajaxpage" href="javascript:getTabList(3,&quot;base&quot;,&quot;touzi&quot;)">3</a></li>
                                        <li><a id="ajaxpage" href="javascript:getTabList(4,&quot;base&quot;,&quot;touzi&quot;)">4</a></li>
                                        <li><a id="ajaxpage" href="javascript:getTabList(5,&quot;base&quot;,&quot;touzi&quot;)">5</a></li>
                                        <li><a id="ajaxpage" href="javascript:getTabList(2,&quot;base&quot;,&quot;touzi&quot;)">&gt;</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </section>
                        <section class="panel b-a" id="branchelist">
                            <div class="tcaption">
                                <h3 class="title">分支机构</h3> <span class="tbadge">3</span>
                                <div class="tdrop"> <span class="btn" onclick="exportTable(this,'分支机构',209);zhugeTrack('导出数据来源',{'企业主页':'分支机构'});"> <span class="export"></span> <span>导出数据</span> </span> </div>
                                <div class="chooseBase" data-box="branche" style="float: right">
                                    <div class="tdrop"> <span class="btn" data-toggle="dropdown"> <span class="branchestatus">全部状态</span> <span class="caret m-l"></span> </span>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li><a href="javascript:;" data-option="status" data-value="">不限</a></li>
                                            <li><a href="javascript:;" data-option="status" data-value="存续">存续(3)</a></li>
                                        </ul>
                                    </div>
                                </div> <span class="watermark"></span>
                            </div>
                            <table class="ntable">
                                <tbody>
                                    <tr>
                                        <th>序号</th>
                                        <th>企业名称</th>
                                        <th>负责人</th>
                                        <th>状态</th>
                                    </tr>
                                    <tr>
                                        <td class="tx">
                                            1
                                        </td>
                                        <td> <span class="headimg"> <img src="https://co-image.qichacha.com/CompanyImage/5d4cd382119378328e5fd4275d5cb947.jpg?x-oss-process=style/qcc_cmp"> </span> <span style="display: block" class="whead-text lg"> <a class="c_a" target="_blank" href="/firm/5d4cd382119378328e5fd4275d5cb947.html"> <span>
                                                        领地集团股份有限公司乐山分公司
                                                    </span> </a> </span> </td>
                                        <td width="300">
                                            <div class="whead-text lg"> <a href="/pl/p110149c91ddd94257ee187189aeeef7.html">
                                                    <h3 class="seo font-14">詹巍</h3>
                                                </a> <a class="btn-touzi" onclick="relatedList(1,'p110149c91ddd94257ee187189aeeef7','詹巍');zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});">关联23家企业 &gt; </a> </div>
                                        </td>
                                        <td width="200" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="tx">
                                            2
                                        </td>
                                        <td> <span class="headimg"> <img src="https://co-image.qichacha.com/CompanyImage/aa7f1d2aebbdd1b9ba743c2e1cf75db7.jpg?x-oss-process=style/qcc_cmp"> </span> <span style="display: block" class="whead-text lg"> <a class="c_a" target="_blank" href="/firm/aa7f1d2aebbdd1b9ba743c2e1cf75db7.html"> <span>
                                                        领地集团股份有限公司成都分公司
                                                    </span> </a> </span> </td>
                                        <td width="300">
                                            <div class="whead-text lg"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">
                                                    <h3 class="seo font-14">刘玉辉</h3>
                                                </a> <a class="btn-touzi" onclick="relatedList(1,'pa623216b83c08894d124afed076d1ef','刘玉辉');zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});">关联13家企业 &gt; </a> </div>
                                        </td>
                                        <td width="200" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                    <tr>
                                        <td class="tx">
                                            3
                                        </td>
                                        <td> <span class="headimg"> <img src="https://co-image.qichacha.com/CompanyImage/b785ab359f53b47158768e247ab16774.jpg?x-oss-process=style/qcc_cmp"> </span> <span style="display: block" class="whead-text lg"> <a class="c_a" target="_blank" href="/firm/b785ab359f53b47158768e247ab16774.html"> <span>
                                                        领地集团股份有限公司眉山分公司
                                                    </span> </a> </span> </td>
                                        <td width="300">
                                            <div class="whead-text lg"> <a href="/pl/p71de85c11303f7922646f8f091349d7.html">
                                                    <h3 class="seo font-14">刘玉国</h3>
                                                </a> <a class="btn-touzi" onclick="relatedList(1,'p71de85c11303f7922646f8f091349d7','刘玉国');zhugeTrack('企业主页按钮点击',{'按钮名称':'关联企业'});">关联42家企业 &gt; </a> </div>
                                        </td>
                                        <td width="200" class="text-center"> <span class="text-success">存续</span> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <nav class="text-right">
                                    <ul class="pagination"> </ul>
                                </nav>
                            </div>
                        </section>
                        <section class="panel b-a clear" id="stockholdersTab"> </section>
                        <section class="panel b-a clear guquan-section" id="muhou">
                            <div class="tcaption">
                                <h3 class="title">关系图谱</h3> <span class="watermark"></span>
                            </div>
                            <table class="ntable">
                                <tbody>
                                    <tr>
                                        <th style="text-align: left;position: relative;">
                                            领地集团有限公司
                                            <div id="muhouIframeTool" class="guquan-tool"> <a href="/company_muhou3?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;name=%E9%A2%86%E5%9C%B0%E9%9B%86%E5%9B%A2%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8" onclick="zhugeTrack('企业主页-基本信息-关系图谱-全屏查看',{'企业名称':'领地集团有限公司'})" target="_blank"><span class="screen">&nbsp;</span><span>全屏查看</span></a> <a id="muhouDownload" class="m-l" onclick="$('#muhouIframe')[0].contentWindow.saveImg(this);zhugeTrack('企业主页-基本信息-关系图谱-下载图片',{'企业名称':'领地集团有限公司'})"><span class="save">&nbsp;</span><span id="DownImgTip">下载图谱</span></a> </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0px;"> <iframe id="muhouIframe" scrolling="no" data-src="/company_muhouinsertqiye?keyNo=f50d972bf1d7aa5bb88da915da782762&amp;iframe=1" src="" frameborder="0"></iframe> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section class="panel b-a" id="Changelist">
                            <div class="tcaption"> <span class="title">变更记录</span> <span class="tbadge changelistcount">41</span>
                                <div class="tdrop"> <span class="btn" onclick="exportTable(this,'变更记录',211);zhugeTrack('导出数据来源',{'企业主页':'变更记录'});"> <span class="export"></span> <span>导出数据</span> </span> </div>
                                <div class="tdrop pull-right"> <span class="btn" data-toggle="dropdown"> <span class="changelisttype">全部类型</span> <span class="caret m-l"></span> </span>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a onclick="changeRecordsFilter('',this)">全部类型</a></li>
                                        <li><a onclick="changeRecordsFilter('主要成员',this)">主要成员(4)</a></li>
                                        <li><a onclick="changeRecordsFilter('章程备案',this)">章程备案(5)</a></li>
                                        <li><a onclick="changeRecordsFilter('企业类型',this)">企业类型(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('出资情况',this)">出资情况(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('名称',this)">名称(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('章程修正案备案',this)">章程修正案备案(5)</a></li>
                                        <li><a onclick="changeRecordsFilter('法定代表人变更',this)">法定代表人变更(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('注册资本(金)变更',this)">注册资本(金)变更(5)</a></li>
                                        <li><a onclick="changeRecordsFilter('高级管理人员备案（董事、监事、经理等）',this)">高级管理人员备案（董事、监事、经理等）(3)</a></li>
                                        <li><a onclick="changeRecordsFilter('其他事项备案',this)">其他事项备案(2)</a></li>
                                        <li><a onclick="changeRecordsFilter('投资者名称(姓名)变更',this)">投资者名称(姓名)变更(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('名称变更',this)">名称变更(2)</a></li>
                                        <li><a onclick="changeRecordsFilter('投资人(股权)变更',this)">投资人(股权)变更(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('经营范围变更',this)">经营范围变更(3)</a></li>
                                        <li><a onclick="changeRecordsFilter('换发证照',this)">换发证照(2)</a></li>
                                        <li><a onclick="changeRecordsFilter('企业类型变更',this)">企业类型变更(2)</a></li>
                                        <li><a onclick="changeRecordsFilter('经理备案',this)">经理备案(1)</a></li>
                                        <li><a onclick="changeRecordsFilter('经营期限(营业期限)变更',this)">经营期限(营业期限)变更(1)</a></li>
                                    </ul>
                                </div> <span class="watermark"></span> <span class="explain-tip2" onclick="addNotice(this,true,'f50d972bf1d7aa5bb88da915da782762|领地集团有限公司');zhugeTrack('企业主页按钮点击',{'变更通知':'变更记录'});"> <span class="explain2"></span> <span>发生变更时通知我</span> </span>
                            </div>
                            <table class="ntable" style="margin-bottom: -1px">
                                <tbody>
                                    <tr>
                                        <th class="tx">序号</th>
                                        <th width="103">变更日期</th>
                                        <th>变更项目</th>
                                        <th width="30%">变更前</th>
                                        <th width="30%">变更后</th>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="border-bottom: #E4EEF6 1px solid;">
                                <div id="ChangelistTable">
                                    <table class="ntable" style="margin-bottom: -1px;">
                                        <tbody>
                                            <tr data-pname="主要成员">
                                                <td class="tx">1</td>
                                                <td width="103" class="text-center">2019-11-18</td>
                                                <td width="" class="text-center">
                                                    主要成员
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a> <br> <em><a href="/pl/p10d240fc9323273e6d00ead2df9b62a.html">龙一勤</a>【新增】</em> <br> <em><a href="/pl/p0e7bf031703bc01246807db0da940e2.html">侯三利</a>【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="主要成员">
                                                <td class="tx">2</td>
                                                <td width="103" class="text-center">2019-11-18</td>
                                                <td width="" class="text-center">
                                                    主要成员
                                                    <br><span class="text-gray" style="font-size: 12px">带有*标记的为法定代表人</span> </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*
                                                        <br> <em><a href="/pl/pc3e5ea54891bad17f32f09ec0039d8c.html">刘策</a>【新增】</em> <br> <em><a href="/pl/pa97017b51c3e2cfc52c60499d4144e6.html">刘浩威</a>【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程备案">
                                                <td class="tx">3</td>
                                                <td width="103" class="text-center">2019-11-18</td>
                                                <td width="" class="text-center">
                                                    章程备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>无</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="主要成员">
                                                <td class="tx">4</td>
                                                <td width="103" class="text-center">2019-11-07</td>
                                                <td width="" class="text-center">
                                                    主要成员
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/pl/p8f3ccc448e484c4f06f653472498b08.html">曾旭蓉</a>【退出】</em> <br> <em><a href="/pl/p8746e175dffe0cc63dade57bca10aa2.html">王霞</a>【退出】</em> <br> <em><a href="/pl/p10d240fc9323273e6d00ead2df9b62a.html">龙一勤</a>【退出】</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a>【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="主要成员">
                                                <td class="tx">5</td>
                                                <td width="103" class="text-center">2019-11-07</td>
                                                <td width="" class="text-center">
                                                    主要成员
                                                    <br><span class="text-gray" style="font-size: 12px">带有*标记的为法定代表人</span> </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*
                                                        <br> <em><a href="/pl/pdffb400bb600e2e330f78d04a6bdf8d.html">侯小萍</a>【退出】</em> <br> <em><a href="/pl/pcc9622f726e604326d24cc92a8178a1.html">刘玉惠</a>【退出】</em> <br> <em><a href="/pl/pc3e5ea54891bad17f32f09ec0039d8c.html">刘策</a>【退出】</em> <br> <em><a href="/pl/pa97017b51c3e2cfc52c60499d4144e6.html">刘浩威</a>【退出】</em> <br> <em><a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a>【退出】</em> <br> <em><a href="/pl/p0e7bf031703bc01246807db0da940e2.html">侯三利</a>【退出】</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="企业类型">
                                                <td class="tx">6</td>
                                                <td width="103" class="text-center">2019-11-07</td>
                                                <td width="" class="text-center">
                                                    企业类型
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>其他股份有限公司(非上市</em>)
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>有限责任公司(非自然人投资或控股的法人独资</em>)
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="出资情况">
                                                <td class="tx">7</td>
                                                <td width="103" class="text-center">2019-11-07</td>
                                                <td width="" class="text-center">
                                                    出资情况
                                                    <br><span class="text-gray" style="font-size: 12px">带有*标记的为法定代表人</span> </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>* 出资 7690万人民币
                                                        <br> <a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a> 出资 7950万人民币
                                                        <br> <a href="/pl/p10d240fc9323273e6d00ead2df9b62a.html">龙一勤</a> 出资 260万人民币
                                                        <br> <a href="/pl/p0e7bf031703bc01246807db0da940e2.html">侯三利</a> 出资 260万人民币
                                                        <br> <a href="/pl/pdd92809ea9e903531a39b12356edb1f.html">张启伟</a> 出资 105万人民币<em>【退出】</em> <br> <a href="/pl/p47d164306807d70ba5d219a5616d904.html">刘玉奇</a> 出资 7690万人民币<em>【退出】</em> <br> <a href="/pl/p1a84f054f52aa54f623090075216590.html">王志东</a> 出资 45万人民币<em>【退出】</em> <br> <a href="/firm/84d59ed45e7120c3283d79b37bba3258.html">融量集团有限公司</a> 出资 2000万人民币<em>【退出】</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/firm/82bdb0a54e8cf37c37dc6ff2202e332f.html">成都恒禧企业管理咨询有限公司</a> 出资 339000万人民币<em>【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="名称">
                                                <td class="tx">8</td>
                                                <td width="103" class="text-center">2019-11-07</td>
                                                <td width="" class="text-center">
                                                    名称
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        领地集团<em>股份</em>有限公司
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        领地集团有限公司
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程备案">
                                                <td class="tx">9</td>
                                                <td width="103" class="text-center">2019-11-07</td>
                                                <td width="" class="text-center">
                                                    章程备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>无</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程备案">
                                                <td class="tx">10</td>
                                                <td width="103" class="text-center">2019-10-31</td>
                                                <td width="" class="text-center">
                                                    章程备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>无</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程修正案备案">
                                                <td class="tx">11</td>
                                                <td width="103" class="text-center">2019-09-27</td>
                                                <td width="" class="text-center">
                                                    章程修正案备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="法定代表人变更">
                                                <td class="tx">12</td>
                                                <td width="103" class="text-center">2019-09-18</td>
                                                <td width="" class="text-center">
                                                    法定代表人变更
                                                    <br><span class="text-gray" style="font-size: 12px">带有*标记的为法定代表人</span> </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/pl/p47d164306807d70ba5d219a5616d904.html">刘玉奇</a></em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="注册资本(金)变更">
                                                <td class="tx">13</td>
                                                <td width="103" class="text-center">2019-09-18</td>
                                                <td width="" class="text-center">
                                                    注册资本(金)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>330000.000000万元人民币</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>339000.000000万元人民币(+2.73%)</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程修正案备案">
                                                <td class="tx">14</td>
                                                <td width="103" class="text-center">2019-09-18</td>
                                                <td width="" class="text-center">
                                                    章程修正案备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="高级管理人员备案（董事、监事、经理等）">
                                                <td class="tx">15</td>
                                                <td width="103" class="text-center">2019-09-18</td>
                                                <td width="" class="text-center">
                                                    高级管理人员备案（董事、监事、经理等）
                                                    <br><span class="text-gray" style="font-size: 12px">带有*标记的为法定代表人</span> </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pdffb400bb600e2e330f78d04a6bdf8d.html">侯小萍</a>,董事
                                                        <br> <a href="/pl/pcc9622f726e604326d24cc92a8178a1.html">刘玉惠</a>,董事
                                                        <br> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*,董事长
                                                        <br> <a href="/pl/p8f3ccc448e484c4f06f653472498b08.html">曾旭蓉</a>,监事
                                                        <br> <a href="/pl/p8746e175dffe0cc63dade57bca10aa2.html">王霞</a>,监事
                                                        <br> <a href="/pl/p10d240fc9323273e6d00ead2df9b62a.html">龙一勤</a>,监事
                                                        <br> <em><a href="/pl/p96b44492e6d73062f13560ef9362c8d.html">刘跃林</a>,董事【退出】</em> <br> <em><a href="/pl/p82d188575e6c0e482a90441415d5ae7.html">刘山</a>,董事【退出】</em> <br> <em><a href="/pl/p47d164306807d70ba5d219a5616d904.html">刘玉奇</a>,董事兼总经理【退出】</em> <br> <em><a href="/pl/p1a84f054f52aa54f623090075216590.html">王志东</a>,董事【退出】</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/pdffb400bb600e2e330f78d04a6bdf8d.html">侯小萍</a>,董事
                                                        <br> <a href="/pl/pcc9622f726e604326d24cc92a8178a1.html">刘玉惠</a>,董事
                                                        <br> <a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*,董事长兼总经理
                                                        <br> <a href="/pl/p8f3ccc448e484c4f06f653472498b08.html">曾旭蓉</a>,监事
                                                        <br> <a href="/pl/p8746e175dffe0cc63dade57bca10aa2.html">王霞</a>,监事
                                                        <br> <a href="/pl/p10d240fc9323273e6d00ead2df9b62a.html">龙一勤</a>,监事
                                                        <br> <em><a href="/pl/pc3e5ea54891bad17f32f09ec0039d8c.html">刘策</a>,董事【新增】</em> <br> <em><a href="/pl/pa97017b51c3e2cfc52c60499d4144e6.html">刘浩威</a>,董事【新增】</em> <br> <em><a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a>,董事【新增】</em> <br> <em><a href="/pl/p0e7bf031703bc01246807db0da940e2.html">侯三利</a>,董事【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="其他事项备案">
                                                <td class="tx">16</td>
                                                <td width="103" class="text-center">2018-09-10</td>
                                                <td width="" class="text-center">
                                                    其他事项备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>2</em>30000
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>3</em>30000
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="注册资本(金)变更">
                                                <td class="tx">17</td>
                                                <td width="103" class="text-center">2018-09-10</td>
                                                <td width="" class="text-center">
                                                    注册资本(金)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>230000万元人民币</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>330000万元人民币(+43.48%)</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程修正案备案">
                                                <td class="tx">18</td>
                                                <td width="103" class="text-center">2018-09-10</td>
                                                <td width="" class="text-center">
                                                    章程修正案备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="投资者名称(姓名)变更">
                                                <td class="tx">19</td>
                                                <td width="103" class="text-center">2018-05-24</td>
                                                <td width="" class="text-center">
                                                    投资者名称(姓名)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/firm/84d59ed45e7120c3283d79b37bba3258.html">成都首信投资有限公司</a></em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/firm/84d59ed45e7120c3283d79b37bba3258.html">融量集团投资有限公司</a>【名称变更】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程修正案备案">
                                                <td class="tx">20</td>
                                                <td width="103" class="text-center">2018-05-24</td>
                                                <td width="" class="text-center">
                                                    章程修正案备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="其他事项备案">
                                                <td class="tx">21</td>
                                                <td width="103" class="text-center">2018-03-23</td>
                                                <td width="" class="text-center">
                                                    其他事项备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>89</em>000
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>230</em>000
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="注册资本(金)变更">
                                                <td class="tx">22</td>
                                                <td width="103" class="text-center">2018-03-23</td>
                                                <td width="" class="text-center">
                                                    注册资本(金)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>89000万元人民币</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>230000万元人民币(+158.43%)</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程修正案备案">
                                                <td class="tx">23</td>
                                                <td width="103" class="text-center">2018-03-23</td>
                                                <td width="" class="text-center">
                                                    章程修正案备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程备案">
                                                <td class="tx">24</td>
                                                <td width="103" class="text-center">2017-02-15</td>
                                                <td width="" class="text-center">
                                                    章程备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="名称变更">
                                                <td class="tx">25</td>
                                                <td width="103" class="text-center">2016-11-23</td>
                                                <td width="" class="text-center">
                                                    名称变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        领地<em>房地产</em>集团股份有限公司
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        领地集团股份有限公司
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="投资人(股权)变更">
                                                <td class="tx">26</td>
                                                <td width="103" class="text-center">2016-11-23</td>
                                                <td width="" class="text-center">
                                                    投资人(股权)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产投资;房地产开发经营;商品房销售及出租;<em> 实业投资</em>;技术进出口<em>。(不得从事非法集资、吸收公众资金等金融活动)</em>(依法须经批准的项目,经相关部门批准后方可开展经营活动)。
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产投资<em>、实业投资(不得从事非法集资、吸收公众资金等金融活动)</em>;房地产开发经营;商品房销售及出租;技术进出口<em>,财税咨询、房地产中介服务、社会经济咨询、市场调查(不含涉外项目)、房地产交易与权属登记管理服务、软件开发</em>。(依法须经批准的项目,经相关部门批准后方可开展经营活动)。
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="经营范围变更">
                                                <td class="tx">27</td>
                                                <td width="103" class="text-center">2016-11-23</td>
                                                <td width="" class="text-center">
                                                    经营范围变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产投资
                                                        <br> <em>房地产开发经营</em> <br> <em>商品房销售及出租</em> <br> <em> 实业投资</em> <br> <em>技术进出口。(不得从事非法集资、吸收公众资金等金融活动)</em>(依法须经批准的项目,经相关部门批准后方可开展经营活动)。
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产投资<em>、实业投资(不得从事非法集资、吸收公众资金等金融活动)</em> <br> <em>房地产开发经营</em> <br> <em>商品房销售及出租</em> <br> <em>技术进出口,财税咨询、房地产中介服务、社会经济咨询、市场调查(不含涉外项目)、房地产交易与权属登记管理服务、软件开发。</em>(依法须经批准的项目,经相关部门批准后方可开展经营活动)。
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="换发证照">
                                                <td class="tx">28</td>
                                                <td width="103" class="text-center">2016-04-19</td>
                                                <td width="" class="text-center">
                                                    换发证照
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        - </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="换发证照">
                                                <td class="tx">29</td>
                                                <td width="103" class="text-center">2014-06-09</td>
                                                <td width="" class="text-center">
                                                    换发证照
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="注册资本(金)变更">
                                                <td class="tx">30</td>
                                                <td width="103" class="text-center">2012-10-24</td>
                                                <td width="" class="text-center">
                                                    注册资本(金)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>63200万元人民币</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>89000万元人民币(+40.82%)</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="经营范围变更">
                                                <td class="tx">31</td>
                                                <td width="103" class="text-center">2012-08-21</td>
                                                <td width="" class="text-center">
                                                    经营范围变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产投资
                                                        <br> 房地产开发经营(凭资质证经营)
                                                        <br> 商品房销售及出租
                                                        <br> 实业投资。(以上<em>项目</em>国家法律、行政法规、国务院决定禁止或限制的除外)。
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产投资
                                                        <br> 房地产开发经营(凭资质证经营)
                                                        <br> 商品房销售及出租
                                                        <br> 实业投资
                                                        <br> <em>技术进出口</em>。(以上<em>范围</em>国家法律、行政法规、国务院决定禁止或限制的除外<em>,涉及资质证的凭资质证经营</em>)。
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="企业类型变更">
                                                <td class="tx">32</td>
                                                <td width="103" class="text-center">2012-04-26</td>
                                                <td width="" class="text-center">
                                                    企业类型变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        122<em>2</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        122<em>9</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="注册资本(金)变更">
                                                <td class="tx">33</td>
                                                <td width="103" class="text-center">2012-04-26</td>
                                                <td width="" class="text-center">
                                                    注册资本(金)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>26000万元人民币</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>63200万元人民币(+143.08%)</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="章程备案">
                                                <td class="tx">34</td>
                                                <td width="103" class="text-center">2011-11-09</td>
                                                <td width="" class="text-center">
                                                    章程备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>/</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>王涛,监事
                                                            侯三利,监事
                                                            龙一勤,监事
                                                            杨长军,监事</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="高级管理人员备案（董事、监事、经理等）">
                                                <td class="tx">35</td>
                                                <td width="103" class="text-center">2011-11-09</td>
                                                <td width="" class="text-center">
                                                    高级管理人员备案（董事、监事、经理等）
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        /
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em><a href="/pl/pdffb400bb600e2e330f78d04a6bdf8d.html">侯小萍</a>,董事【新增】</em> <br> <em><a href="/pl/pcc9622f726e604326d24cc92a8178a1.html">刘玉惠</a>,董事【新增】</em> <br> <em><a href="/pl/p82d188575e6c0e482a90441415d5ae7.html">刘山</a>,董事【新增】</em> <br> <em><a href="/pl/p47d164306807d70ba5d219a5616d904.html">刘玉奇</a>,董事兼总经理【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="企业类型变更">
                                                <td class="tx">36</td>
                                                <td width="103" class="text-center">2008-06-16</td>
                                                <td width="" class="text-center">
                                                    企业类型变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        1<em>130</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        1<em>229</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="名称变更">
                                                <td class="tx">37</td>
                                                <td width="103" class="text-center">2008-06-16</td>
                                                <td width="" class="text-center">
                                                    名称变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        领地房地产集团有限公司
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        领地房地产集团<em>股份</em>有限公司
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="经理备案">
                                                <td class="tx">38</td>
                                                <td width="103" class="text-center">2008-06-16</td>
                                                <td width="" class="text-center">
                                                    经理备案
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/p47d164306807d70ba5d219a5616d904.html">刘玉奇</a>,经理
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/p47d164306807d70ba5d219a5616d904.html">刘玉奇</a>,总经理
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="经营期限(营业期限)变更">
                                                <td class="tx">39</td>
                                                <td width="103" class="text-center">2008-06-16</td>
                                                <td width="" class="text-center">
                                                    经营期限(营业期限)变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>2029-04-18</em> <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <em>3999-01-01</em> <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="经营范围变更">
                                                <td class="tx">40</td>
                                                <td width="103" class="text-center">2008-06-16</td>
                                                <td width="" class="text-center">
                                                    经营范围变更
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产<em>开发(按资质许可范围经营)</em> <br> <em>建筑材料销售</em>。
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;">
                                                        房地产<em>投资</em> <br> <em>房地产开发经营(凭资质证经营)</em> <br> <em>商品房销售及出租</em> <br> <em> 实业投资。(以上项目国家法律、行政法规、国务院决定禁止或限制的除外)</em>。
                                                        <br> </div>
                                                </td>
                                            </tr>
                                            <tr data-pname="高级管理人员备案（董事、监事、经理等）">
                                                <td class="tx">41</td>
                                                <td width="103" class="text-center">2008-06-16</td>
                                                <td width="" class="text-center">
                                                    高级管理人员备案（董事、监事、经理等）
                                                    <br><span class="text-gray" style="font-size: 12px">带有*标记的为法定代表人</span> </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a>,董事
                                                        <br> </div>
                                                </td>
                                                <td width="30%">
                                                    <div style="max-width: 300px;"> <a href="/pl/p4e1d3966b51d51f5494ed3f0261c535.html">王涛</a>,董事
                                                        <br> <em><a href="/pl/pdd92809ea9e903531a39b12356edb1f.html">张启伟</a>,董事【新增】</em> <br> <em><a href="/pl/pa623216b83c08894d124afed076d1ef.html">刘玉辉</a>*,董事长【新增】</em> <br> <em><a href="/pl/p96b44492e6d73062f13560ef9362c8d.html">刘跃林</a>,董事【新增】</em> <br> <em><a href="/pl/p1a84f054f52aa54f623090075216590.html">王志东</a>,董事【新增】</em> <br> <em>杨丽,董事【新增】</em> <br> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        <section class="panel b-a clear">
                            <div class="m_ptsc" style="padding:20px 0;color:  #999">数据来源：国家企业信用信息公示系统、全国建筑市场监管公共服务平台等。</div>
                        </section>
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
