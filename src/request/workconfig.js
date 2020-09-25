/**
 * @description 邮件配置
 */
export const mailconfig = {
    '杨高春': 'yanggc@leading-group.cn',
    '陈乐丽': 'chenll@leading-group.cn',
    '周贤磊': 'zhou_32@qq.com',
    '陈雅兰': 'chenyl0929@leading-group.cn',
    '周雪丽': 'zhouxueli@leading-group.cn',
};

/**
 * @description 账户配置
 */
export const config = {
    '杨高春': 'yanggc',
    '陈乐丽': 'chenll',
    '周贤磊': 'zhouxl0121',
    '陈雅兰': 'chenyl0929',
    '周雪丽': 'zhouxl0627',
}

/**
 * @description 系统配置信息
 */
export const system = {
    config: {
        regexp: {
            mail: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            mobile: '',
        }
    }
}

/**
 * @description 工作组配置
 */
export const group = {
    Group_LD: {
        seal: 'yanggc,chenll,zhouxl0121,zhaozy1028',
        front: 'zhouxl0627,zhaozy1028',
        archive: 'chenyl0929,zhaozy1028',
        prefix: 'LD',
        name: 'Group_LD',
    },
}

/**
 * @description 行政管理用印状态类型
 */
export const statusType = {
    'none': '待用印',
    'seal': '已用印',
    'receive': '已领取',
    'sending': '已寄送', //我方先用印，则已用印后，将合同寄给对方
    'getback': '已寄回', //收到对方盖章后的合同后，接收人，将合同设置为已返回
    'front': '移交前台',
    'archive': '归档完成',
    'done': '已归档',
}

/**
 * @description 下拉组件选择类型
 */
export const compcolumns = {
    commonTypeColumns: ['是', '否'],
    archiveTypeColumns: ['财务归档', '档案归档'],
    orderTypeColumns: ['我方先印', '常规用印'],
    sealTypeColumns: ['合同类', '非合同类'],
    diplomaTypeColumns: ['博士', '硕士', '本科', '专科', '高中', '初中', '小学'],
    acceptType: ['*/*'],
    approveColumns: ['OA系统', 'ERP系统', '费控系统', '创达OA系统', 'CRM系统', 'EHR系统', '资金系统', '领地HR', '宝瑞商管'],
}

/**
 * @description 表单验证说明
 */
export const compValidation = {
    seal: {
        message: {
            filename: '',
            count: '',
            dealDepart: '',
            dealManager: '',
            dealMail: '',
            signman: '',
            workno: '',
            sealtype: '',
            ordertype: '',
            approveType: '',
            mobile: '',
            username: '',
            contractId: '',
            sealman: '',
            front: '',
            archive: '',
            prefix: '',
            meal_account: '',
            message: '',
        },
        valid: {
            filename: '请输入文件名称！',
            count: '请输入文件份数！',
            dealDepart: '请输入经办部门！',
            dealManager: '请输入经办人!',
            dealMail: '请输入经办人邮箱!',
            signman: '请输入签收人！',
            workno: '请输入流程编号！',
            sealtype: '请选择用印类型！',
            ordertype: '请选择用印顺序！',
            approveType: '请输入审批类型！',
            mobile: '请输入经办人电话!',
            username: '请输入经办人的OA账号!',
            contractId: '请输入合同编号！',
            sealman: '请输入印章管理员(盖印人)！',
            front: '请输入前台人员名称！',
            archive: '请输入归档人员名称！',
            prefix: '请输入合同对应的编号前缀！',
            meal_account: '请输入新员工的食堂账户！',
            message: '请印章管理员输入用印意见或备注说明！',
        },
    },
    entryjob: {
        message: {
            username: '',
            position: '', //入职岗位
            picture: '', //员工照片
            computer: '', //是否需要电脑配置
            seat: '', //是否需要办公座椅
            drawer: '', //是否需要办公抽屉drawer
            other_equip: '', //是否需要其他办公配置
            notebook: '', //是否需要笔记本子
            manual: '', //是否需要入职手册
            writingtools: '', //是否需要签字笔/擦
            badge: '', //员工工牌
            othertools: '', //其他用品
            driving_license: '', //行驶证
            driver_license: '', //驾驶证
            idcard: '', //身份证号
            diploma: '', //学历编号
            bachelor: '', //学位编号
            join_time: '', //入职时间
            hr_name: '', //对接HR
            bank_card: '',
            mobile: '',
            meal_account: '',
        },
        valid: {
            username: '请输入您的员工姓名！',
            position: '请输入您的入职岗位！', //入职岗位
            picture: '请上传您的一寸照片！', //员工照片
            computer: '请选择是否需要电脑配置！', //是否需要电脑配置
            seat: '请选择是否需要办公座椅！', //是否需要办公座椅
            drawer: '请选择是否是否需要办公抽屉！', //是否需要办公抽屉drawer
            other_equip: '如果您有其他的办公配置要求，请填写在此处！', //是否需要其他办公配置
            notebook: '请选择是否需要笔记/记事本等！', //是否需要笔记本子
            manual: '请选择是否需要入职手册！', //是否需要入职手册
            writingtools: '请选择是否需要签字笔/擦！', //是否需要签字笔/擦
            badge: '请选择是否需要制作员工工牌！', //员工工牌
            othertools: '请输入您的其他办公用品需求！', //其他用品
            driving_license: '请输入您的行驶证编号！', //行驶证
            driver_license: '请输入您的驾驶证编号！', //驾驶证
            idcard: '请输入您的身份证编号！', //身份证号
            diploma: '请输入您的学历证件编号！', //学历编号
            bachelor: '请输入您的学位证件编号！', //学位编号
            join_time: '请选择您的入职时间！', //入职时间
            hr_name: '请选择您的对接HR姓名！', //对接HR
            bank_card: '请输入您的工资银行卡号！', //
            mobile: '请输入您的电话号码！', //
            meal_account: '请输入新员工的食堂账户！', //
        },
    }
}

/**
 * @description 左侧菜单列表
 */
export function getPaneflows(this_) {
    return [{
            id: 0,
            name: "我的待办",
            ename: "mytodolist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png`,
            href: "/account/mytodolist",
            description: "查看待处理的奖惩申请流程",
            show: true,
            css: "",
            all: '全部',
            tabs: ['全部', '待处理', '抄送我'],
            dataSource: [{
                    title: '关于行政人力中心的奖罚申请【2020年8月】',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    owner: '付晓晓',
                    startAt: '2018-07-26 22:44',
                    all: '全部',
                    tabs: ['待处理', '抄送我'],
                    progress: {
                        value: 90
                    }
                },
                {
                    title: 'Alipay',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    owner: '付晓晓',
                    startAt: '2018-07-26 22:44',
                    all: '全部',
                    tabs: ['已处理', '抄送我'],
                    progress: {
                        value: 90
                    }
                }
            ],
            click: () => {
                this_.panename = 'mytodolist';
            },
        },
        {
            id: 1,
            name: "我的已办",
            ename: "mydonelist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png`,
            href: "/account/mydonelist",
            description: "查看已处理的奖惩申请流程",
            show: true,
            css: "",
            all: '全部',
            tabs: ['全部', '待处理', '抄送我'],
            dataSource: [{
                    title: '关于财务共享中心的奖罚申请【2020年7月】',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    owner: '付晓晓',
                    startAt: '2018-07-26 22:44',
                    all: '全部',
                    tabs: ['待处理', '抄送我'],
                    progress: {
                        value: 90
                    }
                },
                {
                    title: '关于财务共享中心的奖罚申请【2020年6月】',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    owner: '付晓晓',
                    startAt: '2018-07-26 22:44',
                    all: '全部',
                    tabs: ['已处理', '抄送我'],
                    progress: {
                        value: 90
                    }
                }
            ],
            click: () => {
                this_.panename = 'mydonelist';
            },
        },
        {
            id: 2,
            name: "我的奖惩",
            ename: "myrewardslist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/绩效管理.png`,
            href: "/account/myrewardslist",
            description: "查看涉及自己的奖惩明细",
            show: true,
            css: "",
            all: '全部',
            tabs: ['全部', '待处理', '已处理', '抄送我'],
            dataSource: [{
                    title: '关于财务共享中心的奖罚申请【2020年7月】',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    owner: '付晓晓',
                    startAt: '2018-07-26 22:44',
                    all: '全部',
                    tabs: ['待处理', '抄送我'],
                    progress: {
                        value: 90
                    }
                },
                {
                    title: '关于财务共享中心的奖罚申请【2020年6月】',
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
                    description: '那是一种内在的东西， 他们到达不了，也无法触及的',
                    owner: '付晓晓',
                    startAt: '2018-07-26 22:44',
                    all: '全部',
                    tabs: ['已处理', '抄送我'],
                    progress: {
                        value: 90
                    }
                }
            ],
            click: () => {
                this_.panename = 'myrewardslist';
            },
        },
        {
            id: 3,
            name: "统计分析",
            ename: "myanalyselist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/zhushou.png`,
            href: "/account/myanalyselist",
            description: "查看自己的奖惩月/季度报表",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myanalyselist';
            },
        },
        {
            id: 4,
            name: "月度奖惩报表",
            ename: "mymonthlist",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png`,
            href: "/account/mymonthlist",
            description: "查看/导出月度奖惩明细及汇总",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'mymonthlist';
            },
        },
        {
            id: 5,
            name: "季度奖惩报表",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png`,
            href: "/account/myquanterlist",
            description: "查看/导出月度奖惩明细及汇总",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myquanterlist';
            },
        },
        {
            id: 6,
            name: "奖惩部门分布",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/trip.png`,
            href: "/account/mydepartmentlist",
            description: "查看按部门/中心/区域分配的奖惩报表",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'mydepartmentlist';
            },
        },
        {
            id: 7,
            name: "奖惩类别分布",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png`,
            href: "/account/myrewardtypelist",
            description: "查看按奖惩类别/名称分布的奖惩报表",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myrewardtypelist';
            },
        },
        {
            id: 8,
            name: "月度奖惩排行榜",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/ribao.png`,
            href: "/account/mymonthrank",
            description: "查看月度奖惩汇总的排行榜",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'mymonthrank';
            },
        },
        {
            id: 9,
            name: "季度奖惩排行榜",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/zhoubao.png`,
            href: "/account/myquarterrank",
            description: "查看季度奖惩汇总的排行榜",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myquarterrank';
            },
        },
        {
            id: 10,
            name: "年度奖惩排行榜",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png`,
            href: "/account/myyearrank",
            description: "查看年度奖惩汇总的排行榜",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myyearrank';
            },
        },
        {
            id: 11,
            name: "区域奖惩排行榜",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/commun.png`,
            href: "/account/myzonerank",
            description: "查看按照区奖惩汇总的排行榜",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myzonerank';
            },
        },
        {
            id: 12,
            name: "奖惩年度个人榜",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png`,
            href: "/account/myyearperson",
            description: "查看年度获奖/罚前三甲的个人",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myyearperson';
            },
        },
        {
            id: 13,
            name: "奖惩年度团队榜",
            avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/richang.png`,
            href: "/account/myyearteam",
            description: "查看年度获奖/罚前三甲的团队",
            show: true,
            css: "",
            tabs: ['全部', '待处理', '抄送我'],
            click: () => {
                this_.panename = 'myyearteam';
            },
        },
    ];
}
