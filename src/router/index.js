import VueRouter from 'vue-router'
Vue.use(VueRouter);

// app整体由店面页和店内页组成 暂时并没有用到嵌套路由
const routes = [{
        path: '/',
        name: "智慧行政",
        component: resolve => require(["../components/app/app.vue"], resolve)
    }, {
        path: '/wechat',
        name: "消息",
        component: resolve => require(["../components/wechat/wechat.vue"], resolve)
    }, {
        path: '/wechat/dialogue',
        name: "",
        components: {
            "default": resolve => require(["../components/wechat/wechat.vue"], resolve),
            "subPage": resolve => require(["../components/wechat/dialogue.vue"], resolve)
        }
    }, {
        path: '/wehchat/add-friend',
        name: "",
        components: {
            "default": resolve => require(["../components/wechat/wechat.vue"], resolve),
            "subPage": resolve => require(["../components/contact/add-friend.vue"], resolve)
        }
    }, {
        path: '/wechat/dialogue/dialogue-info',
        name: "",
        components: {
            "subPage": resolve => require(["../components/wechat/dialogue-info.vue"], resolve)
        }
    }, {
        path: '/wechat/dialogue/dialogue-detail',
        name: "",
        components: {
            "subPage": resolve => require(["../components/wechat/dialogue-detail.vue"], resolve)
        }
    }, {
        path: '/search',
        name: "联系人",
        component: resolve => require(["../components/common/searchs.vue"], resolve)
    }, {
        path: '/contact',
        name: "联系人",
        component: resolve => require(["../components/contact/contact.vue"], resolve)
    }, {
        path: '/contact/add-friend',
        name: "",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/contact/add-friend.vue"], resolve)
        }
    }, {
        path: '/app/app_subvisitor',
        name: "",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/app_subvisitor.vue"], resolve)
        }
    }, {
        path: '/contact/search',
        name: "",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/common/search.vue"], resolve)
        }
    }, {
        path: '/contact/details',
        name: "",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/contact/details.vue"], resolve)
        }
    }, {
        path: '/contact/new-friends/mobile-contacts',
        name: "联系人朋友",
        components: {
            "subPage": resolve => require(["../components/contact/mobile-contacts.vue"], resolve)
        }
    }, {
        path: '/contact/official-accounts',
        name: "",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/contact/official-accounts.vue"], resolve)
        }
    }, {
        path: '/contact/group-list',
        name: "",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/contact/group-list.vue"], resolve)
        }
    }, {
        path: '/contact/new-friends',
        name: "",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/contact/new-friends.vue"], resolve)
        }
    }, {
        path: '/contact/tags',
        name: "新的朋友",
        components: {
            "default": resolve => require(["../components/contact/contact.vue"], resolve),
            "subPage": resolve => require(["../components/contact/tags.vue"], resolve)
        }
    }, {
        path: '/app',
        name: "智慧行政",
        component: resolve => require(["../components/app/app.vue"], resolve)
    }, {
        path: '/app/stockbtree',
        name: "股权架构",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockbtree.vue"], resolve)
        }
    }, {
        path: '/app/stockgraph',
        name: "股权架构",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockgraph.vue"], resolve)
        }
    }, {
        path: '/app/stockwcloud',
        name: "股权词云",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockwcloud.vue"], resolve)
        }
    }, {
        path: '/app/stockd3cloud',
        name: "D3词云",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockd3cloud.vue"], resolve)
        }
    }, {
        path: '/app/stockcapsule',
        name: "胶囊柱图",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockcapsule.vue"], resolve)
        }
    }, {
        path: '/app/stockvcloud',
        name: "V词云",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockvcloud.vue"], resolve)
        }
    }, {
        path: '/app/stockgroup',
        name: "股权架构",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockgroup.vue"], resolve)
        }
    }, {
        path: '/app/stocktips',
        name: "股权架构",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stocktips.vue"], resolve)
        }
    }, {
        path: '/app/stockscene',
        name: "企业关系",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockscene.vue"], resolve)
        }
    }, {
        path: '/app/stockxltree',
        name: "企业关系",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockxltree.vue"], resolve)
        }
    }, {
        path: '/app/stockYltree',
        name: "企业关系",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockyltree.vue"], resolve)
        }
    }, {
        path: '/app/stockmind',
        name: "思维导图",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockmind.vue"], resolve)
        }
    }, {
        path: '/app/stockotree',
        name: "分叉树图",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockotree.vue"], resolve)
        }
    }, {
        path: '/industry/query',
        name: "查询主页",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/industry/query.vue"], resolve)
        }
    }, {
        path: '/industry/search',
        name: "查询结果",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/industry/search.vue"], resolve)
        }
    }, {
        path: '/industry/company',
        name: "公司详情",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/industry/company.vue"], resolve)
        }
    }, {
        path: '/industry/searchboss',
        name: "查询人员",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/industry/searchboss.vue"], resolve)
        }
    }, {
        path: '/industry/searchboss',
        name: "查询人员",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/industry/searchboss.vue"], resolve)
        }
    }, {
        path: '/vchart/vline',
        name: "vline",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/vchart/vline.vue"], resolve)
        }
    }, {
        path: '/app/stockreship',
        name: "股权关系",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/graph/stockreship.vue"], resolve)
        }
    }, {
        path: '/app/moments',
        name: "圈子",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/moments.vue"], resolve)
        }
    }, {
        path: '/app/sealedit',
        name: "用印修改",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealedit.vue"], resolve)
        }
    }, {
        path: '/app/sealinfo',
        name: "用印登记",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealinfo.vue"], resolve)
        }
    }, {
        path: '/app/seallist',
        name: "用印审批",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/seallist.vue"], resolve)
        }
    }, {
        path: '/app/sealfrontlist',
        name: "用印移交",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealfrontlist.vue"], resolve)
        }
    }, {
        path: '/app/sealarchivelist',
        name: "用印归档",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealarchivelist.vue"], resolve)
        }
    }, {
        path: '/app/sealview',
        name: "用印处理",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealview.vue"], resolve)
        }
    }, {
        path: '/app/sealreceive',
        name: "用印领取",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealreceive.vue"], resolve)
        }
    }, {
        path: '/app/sealmanage',
        name: "用印管理",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealmanage.vue"], resolve)
        }
    }, {
        path: '/app/sealfinance',
        name: "财务移交",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealfinance.vue"], resolve)
        }
    }, {
        path: '/app/sealarchive',
        name: "档案移交",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealarchive.vue"], resolve)
        }
    }, {
        path: '/app/sealfinancevlist',
        name: "财务审批",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealfinancevlist.vue"], resolve)
        }
    }, {
        path: '/app/sealfinanceview',
        name: "财审详情",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealfinanceview.vue"], resolve)
        }
    }, {
        path: '/app/sealarchivevlist',
        name: "档案审批",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealarchivevlist.vue"], resolve)
        }
    }, {
        path: '/app/sealmylist',
        name: "用印历史",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealmylist.vue"], resolve)
        }
    }, {
        path: '/app/goodsreceive',
        name: "物品领用",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/goodsreceive.vue"], resolve)
        }
    }, {
        path: '/app/goodsview',
        name: "领用确认",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/goodsview.vue"], resolve)
        }
    }, {
        path: '/app/goodslist',
        name: "领用进度",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/goodslist.vue"], resolve)
        }
    }, {
        path: '/app/goodsmylist',
        name: "领用历史",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/goodsmylist.vue"], resolve)
        }
    }, {
        path: '/app/authmanage',
        name: "权限管理",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/authmanage.vue"], resolve)
        }
    }, {
        path: '/app/employeemanage',
        name: "员工管理",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/employeemanage.vue"], resolve)
        }
    }, {
        path: '/app/commonmanage',
        name: "数据管理",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/commonmanage.vue"], resolve)
        }
    }, {
        path: '/app/visitorlist',
        name: "访客记录",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/visitorlist.vue"], resolve)
        }
    }, {
        path: '/app/visitormylist',
        name: "访客历史",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/visitormylist.vue"], resolve)
        }
    }, {
        path: '/app/visitorreceive',
        name: "访客登记",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/visitorreceive.vue"], resolve)
        }
    }, {
        path: '/app/visitorview',
        name: "访客审批",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/visitorview.vue"], resolve)
        }
    }, {
        path: '/app/visitormanage',
        name: "访客数据",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/visitormanage.vue"], resolve)
        }
    }, {
        path: '/app/workexaminelist',
        name: "巡检记录",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/visitorlist.vue"], resolve)
        }
    }, {
        path: '/app/workexaminereceive',
        name: "巡检登记",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/workexaminereceive.vue"], resolve)
        }
    }, {
        path: '/app/workexamineview',
        name: "巡检整改",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/workexamineview.vue"], resolve)
        }
    }, {
        path: '/app/lostpropertyreceive',
        name: "失物招领",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/lostpropertyreceive.vue"], resolve)
        }
    }, {
        path: '/app/lostpropertyview',
        name: "失物招领",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/lostproperty.vue"], resolve)
        }
    }, {
        path: '/app/lostpropertyclist',
        name: "失物招领",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/lostpropertyclist.vue"], resolve)
        }
    }, {
        path: '/app/lostpropertylist',
        name: "认领进度",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/lostpropertylist.vue"], resolve)
        }
    }, {
        path: '/app/borrowreceive',
        name: "物品借用",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/borrowreceive.vue"], resolve)
        }
    }, {
        path: '/app/borrow',
        name: "物品借用",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/borrow.vue"], resolve)
        }
    }, {
        path: '/app/borrowview',
        name: "物品借用",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/borrow.vue"], resolve)
        }
    }, {
        path: '/app/borrowlist',
        name: "借用审批",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/borrowlist.vue"], resolve)
        }
    }, {
        path: '/app/borrowmylist',
        name: "借用历史",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/borrowmylist.vue"], resolve)
        }
    }, {
        path: '/app/entryjob',
        name: "入职引导",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/entryjob.vue"], resolve)
        }
    }, {
        path: '/app/entryview',
        name: "入职确认",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/entryview.vue"], resolve)
        }
    }, {
        path: '/app/entrylist',
        name: "入职进度",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/entrylist.vue"], resolve)
        }
    }, {
        path: '/app/news',
        name: "公告",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/explore/news.vue"], resolve)
        }
    }, {
        path: '/app/donetask',
        name: "已办",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/donetask.vue"], resolve)
        }
    }, {
        path: '/app/doingtask',
        name: "待办",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/doingtask.vue"], resolve)
        }
    }, {
        path: '/app/sign',
        name: "签到",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/explore/sign.vue"], resolve)
        }
    }, {
        path: '/app/punch',
        name: "打卡",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/explore/punch.vue"], resolve)
        }
    }, {
        path: '/explore',
        name: "首页",
        components: { "default": resolve => require(["../components/explore/explore.vue"], resolve) }
    }, {
        path: '/explore/task',
        name: "任务",
        components: {
            "default": resolve => require(["../components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["../components/explore/task.vue"], resolve)
        }
    }, {
        path: '/explore/news',
        name: "公告",
        components: {
            "default": resolve => require(["../components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["../components/explore/news.vue"], resolve)
        }
    }, {
        path: '/explore/punch',
        name: "打卡",
        components: {
            "default": resolve => require(["../components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["../components/explore/punch.vue"], resolve)
        }
    }, {
        path: '/explore/sign',
        name: "签到",
        components: {
            "default": resolve => require(["../components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["../components/explore/sign.vue"], resolve)
        }
    }, {
        path: '/explore/content',
        name: "详情",
        components: {
            "default": resolve => require(["../components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["../components/explore/content.vue"], resolve)
        }
    }, {
        path: '/explore/announce',
        name: "公告",
        components: {
            "default": resolve => require(["../components/explore/explore.vue"], resolve),
            "subPage": resolve => require(["../components/explore/announce.vue"], resolve)
        }
    }, {
        path: '/self',
        name: "我的",
        component: resolve => require(["../components/self/self.vue"], resolve)
    }, {
        path: '/login',
        name: "登录",
        component: resolve => require(["../components/login/login.vue"], resolve)
    }, {
        path: '/self/album',
        components: {
            "default": resolve => require(["../components/self/self.vue"], resolve),
            "subPage": resolve => require(["../components/common/album.vue"], resolve)
        }
    }, {
        path: '/self/settings',
        components: {
            "default": resolve => require(["../components/self/self.vue"], resolve),
            "subPage": resolve => require(["../components/self/settings.vue"], resolve)
        }
    }, {
        path: '/self/settings/security',
        components: {
            "subPage": resolve => require(["../components/self/settings/security.vue"], resolve)
        }
    }, {
        path: '/self/settings/notice',
        components: {
            "subPage": resolve => require(["../components/self/settings/notice.vue"], resolve)
        }
    }, {
        path: '/self/settings/privacy',
        components: {
            "subPage": resolve => require(["../components/self/settings/privacy.vue"], resolve)
        }
    }, {
        path: '/self/settings/common',
        components: {
            "subPage": resolve => require(["../components/self/settings/common.vue"], resolve)
        }
    }, {
        path: '/self/profile',
        components: {
            "default": resolve => require(["../components/self/self.vue"], resolve),
            "subPage": resolve => require(["../components/common/profile.vue"], resolve)
        }
    }, {
        path: '/self/profile/my-qrcode',
        components: {
            "subPage": resolve => require(["../components/self/my-qrcode.vue"], resolve)
        }
    }, {
        path: '/self/settings',
        components: {
            "subPage": resolve => require(["../components/settings/settings.vue"], resolve)
        }
    },
    {
        path: '/self/settings/common',
        components: {
            "subPage": resolve => require(["../components/settings/common/common.vue"], resolve)
        }
    },
    {
        path: '/self/settings/common/language',
        components: {
            "subPage": resolve => require(["../components/settings/common/language.vue"], resolve)
        }
    }

];

const router = new VueRouter({
    base: "/vue-wechat/",
    routes,
})

// history模式跳转到新页面，返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;