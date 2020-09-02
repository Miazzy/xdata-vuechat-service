//import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

//app整体由店面页和店内页组成 暂时并没有用到嵌套路由
const routes = [{
        path: '/',
        name: "应用",
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
        name: "应用",
        component: resolve => require(["../components/app/app.vue"], resolve)
    }, {
        path: '/app/moments',
        name: "圈子",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/moments.vue"], resolve)
        }
    }, {
        path: '/app/sealinfo',
        name: "用印登记",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/form/sealinfo.vue"], resolve)
        }
    }, {
        path: '/app/sealview',
        name: "用印归档",
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
        path: '/app/news',
        name: "公告",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/news.vue"], resolve)
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
            "subPage": resolve => require(["../components/app/sign.vue"], resolve)
        }
    }, {
        path: '/app/punch',
        name: "打卡",
        components: {
            "default": resolve => require(["../components/app/app.vue"], resolve),
            "subPage": resolve => require(["../components/app/punch.vue"], resolve)
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
        name: "新闻",
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

]
export default new Router({
    base: "/vue-wechat/",
    routes,
})