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
