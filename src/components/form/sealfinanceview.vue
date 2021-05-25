<template>
<keep-alive>
    <div id="content" style="margin-top: 0px;">
        <header id="wx-header" style="overflow-x: hidden;">
            <div class="center">
                <router-link :to="back" @click="$router.push(`/app/sealfinancevlist`)" tag="div" class="iconfont icon-left">
                    <span>返回</span>
                </router-link>
                <span>{{ item.type }}</span>
            </div>
        </header>

        <section>
            <div class="weui-cells" style="margin-top:0px;">
                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
                    <van-notice-bar v-show=" title!='' && title != null && typeof title != 'undefined' " left-icon="volume-o" color="#1989fa" background="#ecf9ff" :text="title" />
                </div>
                <div class="" id="scanCell" style="padding: 8px 10px 4px 10px;">
                    <van-row>
                        <van-col span="8"></van-col>
                        <van-col span="8" style="text-align: center;font-size:1.15rem;">{{ item.type }}申请</van-col>
                        <van-col span="8"></van-col>
                    </van-row>
                </div>
            </div>

            <van-tag style="position: absolute; top: 54px; right: 0px; z-index: 1000; border-radius: 30px 0px 0px 30px;" :type="status_type"> {{ ` ${status}` }}</van-tag>

            <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;"> </div>
                <div class="weui-cells" style="margin-top:0px;margin-left:0px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

                    <van-cell-group style="margin-top:10px;">
                        <van-cell value="基本信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                        <van-field v-show="item.serialid" clearable label="申请序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                        <van-field required readonly clearable label="填报日期" v-model="item.createtime" placeholder="请输入登记日期" />
                        <single-select required label="申请类型" placeholder="请选择申请类型" v-model="item.type" @confirm="typeConfirm" :columns="typeColumns" :option="{ label:'name',value:'name',title:'',all: false , search: false , margin:'0px 0px' , classID:'',}" />
                        <van-field required readonly clearable label="归档人员" v-model="item.receive_name" placeholder="请输入归档人员" />
                        <check-select required label="移交文件" placeholder="请选择移交文件" v-model="item.filenamelist" :columns="fileColumns" :option="{ label:'name',value:'name',title:'title',all:false, search:true , search_emit:false , margin:'35px 3px 0px 0px' , classID:'van-field-check-select'}" @confirm="fileConfirm" @search="fileSearch" />
                        <van-address-list v-show="flist.length > 0" :list="flist" :default-tag-text="statusName[item.status]" edit-disabled @select="selectHContract" />
                    </van-cell-group>

                    <van-cell-group style="margin-top:10px;">
                        <van-cell value="移交说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                        <van-field required label="备注信息" v-model="item.message" rows="2" autosize clickable clearable type="textarea" maxlength="1000" placeholder="请输入移交备注说明事项！" show-word-limit />
                        <van-field required label="审批意见" v-model="item.remark" rows="2" autosize clickable clearable type="textarea" maxlength="1000" placeholder="请输入审批意见或备注说明！" show-word-limit />
                    </van-cell-group>

                    <van-cell-group style="margin-top:10px;" v-show="processLogList.length > 0">
                        <van-cell value="处理记录" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                        <div>
                            <van-steps direction="vertical" :active="processLogList.length - 1">
                                <template v-for="value in processLogList">
                                    <van-step :key="value.id">
                                        <h3>{{ value.action + ' ' + value.employee + ' ' + value.action_opinion }}</h3>
                                        <p>{{ value.create_time }}</p>
                                    </van-step>
                                </template>
                            </van-steps>
                        </div>
                    </van-cell-group>

                    <div v-show=" view != 'view' && (item.status != 200 && item.status != 99) " id="van-finance-apply" style="margin:30px 0px 10px; border-top:0px solid #fcfcfc;">
                        <van-goods-action-button type="danger" text="驳回" @click="handleDisagree();" style="width:42%;background: linear-gradient(to right,#ffd01e,#ff8917);" />
                        <van-goods-action-button type="danger" text="同意" @click="handleAgree();" style="width:42%;float:right;" />
                    </div>

                    <div v-show=" view == 'view' " id="van-finance-apply" style="margin:30px 0px 10px; border-top:0px solid #fcfcfc;">
                        <download-excel :data="flist" :fields="json_fields" worksheet="归档台账" name="归档台账.xls" style="width:94.25%;font-size:14px;margin:0px 0px 0px 12px; height:42px; text-align: center; border-radius:10px;color:#fefefe;float:left;background: linear-gradient(to right,#ffd01e,#ff8917);">
                            <div style="margin-top:12px;">导出</div>
                        </download-excel>
                    </div>

                    <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;">加载中...</van-loading>
                    <div style="height:100px;"></div>
                </div>
            </div>
        </section>

    </div>
</keep-alive>
</template>

<script>
export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "详情",
            momentNewMsg: true,
            tabname: '1',
            active: 1,
            id: '',
            type: '',
            title: '合同资料移交申请',
            content: '',
            files: '',
            from: '',
            tname: '',
            bname: '',
            tasktype: 'done',
            previewurl: '',
            purl: '',
            tableInfo: '',
            orderInfo: '',
            status: '',
            status_name: '已移交',
            status_type: '',
            fields: [],
            sealuserid: '',
            iswechat: false,
            agroup: [],
            back: '/app/sealfinancevlist',
            hContractID: '',
            item: {
                id: '',
                createtime: dayjs().format('YYYY-MM-DD'),
                serialid: '',
                type: [],
                filename: '',
                flist: [],
                remark: '',
                message: '',
                status: 100,
                remark: '',
                receive_name: '',
                receive_ids:'',
            },
            backPath: '/app/sealfinancevlist',
            loading: false,
            hContractList: [],
            processLogList: [],
            typeColumns: [{
                    name: '档案移交',
                    code: '1',
                },
                {
                    name: '财务移交',
                    code: '2',
                },
            ],
            statusName: {
                '100': '待归档',
                '200': '已归档',
                '99': '已驳回',
            },
            json_fields: {
                'Index':'index',
                '序号': 'serialid',
                '登记时间': 'create_time',
                '文件名称': 'filename',
                '数量': 'count',
                '经办部门': 'deal_depart',
                '经办人员': 'deal_manager',
                '用印公司': 'company',
                '合同编号': 'contract_id',
                '签收人员': 'sign_man',
                '审批类型': 'approve_type',
                '关联流程': 'workno',
                '用印类型': 'seal_type',
                '印章类型': 'seal_category',
                '排序类型': 'order_type',
                '盖章人员': 'seal_man',
                '用印状态': 'status',
                '合作方': 'partner',
                '备注信息': 'message',
            },
            fileColumns: [],
            flist: [],
            view: '',
            table_type: '',
            readonly: true,
            zonename: '',
        }
    },
    activated() {
        this.queryInfo();
    },
    mounted() {
        this.queryInfo();
    },
    methods: {
        async selectHContract(value, index, key){
            console.log('value:' + JSON.stringify(value));
            console.log('index:' + (index));
            await vant.Dialog.confirm({ //提示确认用印操作
                title: '温馨提示',
                message: `确认移除合同编号为${value.contract_id}的合同文件吗？`,
            });
            if (this.flist && this.flist.length > 0) {
                this.flist.splice(index, 1);
                this.item.flist = this.flist;
            }
        },
        async typeConfirm(value, index, resp) {
            console.log(value + ' ' + resp);
            const transfer_type = resp == '档案移交' ? 'archive' : 'finance';
            const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取当前用户信息
            const month = dayjs().subtract(36, 'months').format('YYYY-MM-DD'); // 获取最近12个月对应的日期
            const clist = await Betools.manage.queryTableData('bs_seal_regist', `_where=(status,in,已用印,已领取,移交前台,档案归档,财务归档,已完成)~and(create_time,gt,${month})~and(seal_type,like,合同类)~and(${transfer_type}_status,in,0,99,100,200,300,1000)&_sort=-create_time&_p=0&_size=1000`); // 获取最近12个月的已用印记录
            clist.map((item, index) => {
                item.title = item.serialid + " " + item.filename.slice(0, 16);
                item.code = item.id;
                item.tel = '';
                item.name = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:' + item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno;
                item.isDefault = true;
            });
            this.fileColumns = clist;
        },
        async fileSearch(data, key) {
            const transfer_type = Betools.tools.queryUrlString('transfer_type');
            const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取当前用户信息
            const month = dayjs().subtract(36, 'months').format('YYYY-MM-DD'); // 获取最近12个月对应的日期
            data = await Betools.manage.queryTableData('bs_seal_regist', `_where=(status,in,已用印,已领取,移交前台,档案归档,财务归档,已完成)~and(create_time,gt,${month})~and(seal_type,like,合同类)~and(${transfer_type}_status,in,0,99,100,200,300,1000)~and((contract_id,like,~${key}~)~or(filename,like,~${key}~)~or(create_by,like,~${key}~)~or(serialid,like,~${key}~)~or(workno,like,~${key}~))&_sort=-create_time&_p=0&_size=20`); // 获取最近12个月的已用印记录
            data.map((item, index) => {
                item.title = item.serialid + " " + item.filename.slice(0, 16);
                item.code = item.id;
                item.tel = '';
                item.name = item.seal_type == '合同类' ? item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno + ' 合同编号:' + item.contract_id : item.create_by + ' ' + item.filename + ' 序号:' + item.serialid + ' 流程编号:' + item.workno;
                item.isDefault = true;
            });
            this.fileColumns = data;
        },
        /** 确认选择合同文件 */
        async fileConfirm(data, value, index) {
            if (Betools.tools.isNull(this.flist) || !this.flist || this.flist.length == 0) {
                this.flist = this.item.flist = value;
            } else if (this.flist && this.flist.length > 0) {
                this.flist = this.item.flist = this.flist.concat(value);
            }

            this.flist = this.flist.filter((item, index) => {
                let findex = this.flist.findIndex(elem => {
                    return elem.serialid == item.serialid;
                });
                return findex == index;
            });
            this.flist.sort((a, b) => {
                return a.timestamp - b.timestamp;
            })
        },
        /** 查询初始化信息 */
        async queryInfo() {
            try {
                const id = Betools.tools.queryUrlString('id');
                const clist = await Betools.manage.queryTableData('bs_contract_transfer_apply', `_where=(id,eq,${id})&_sort=-create_time&_p=0&_size=1000`); // 获取最近12个月的已用印记录
                const item = clist && clist.length > 0 ? clist[0] : null;
                this.item.id = item.id;
                this.item.createtime = dayjs(item.create_time).format('YYYY-MM-DD');
                this.item.serialid = item.serialid;
                this.item.type = item.type;
                this.item.filename = item.filename;
                this.item.flist = item.flist;
                debugger;
                this.item.remark = item.remark;
                this.item.message = item.message;
                this.item.status = item.status;
                this.item.pid = item.pid;
                this.item.receive_name = item.receive_name;
                this.item.receive_ids = item.receive_ids;
                const flist = clist && clist.length > 0 ? JSON.parse(clist[0].flist) : null;
                this.fileColumns = JSON.parse(JSON.stringify(flist));
                this.flist = item.status == 200 || item.status == 99 ? this.flist = flist : [];
                const back = Betools.tools.queryUrlString('back');
                this.back = back;
                await this.queryProcessLog();
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * @function 获取处理日志
         */
        async queryProcessLog() {
            const id = Betools.tools.getUrlParam('id');
            try {
                this.processLogList = await Betools.workflow.queryPRLogHistoryByDataID(id);
                //如果查询出出来记录，则将处理记录排序
                if (this.processLogList && this.processLogList.length > 0) {
                    this.processLogList.map(item => {
                        item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm');
                        item.unique = `${item.employee} ${item.action} ${item.action_opinion} ${item.create_time} `;
                    });
                    this.processLogList = this.processLogList.filter((item, index) => {
                        const findex = this.processLogList.findIndex(elem => {
                            return item.unique == elem.unique
                        });
                        return findex == index;
                    });
                    this.processLogList.sort();
                }
            } catch (error) {
                console.log(error);
            }
        },
        /** 处理驳回/提交操作 */
        async handleDisagree() {

            try {
                const id = Betools.tools.queryUrlString('id');
                const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取当前用户信息
                let table_type = null;

                if (this.item.type == '财务移交') {
                    table_type = 'finance';
                } else if (this.item.type == '档案移交') {
                    table_type = 'archive';
                }

                if (Betools.tools.isNull(this.item.remark)) {
                    return await vant.Dialog.alert({
                        title: '温馨提示',
                        message: '请输入审批意见！',
                    });
                }

                const resp = await Betools.manage.patchTableData(`bs_contract_transfer_apply`, this.item.id, {
                    status: 99,
                    remark: this.item.remark,
                });

                if (resp.protocol41 == true && resp.affectedRows > 0) {

                    this.view = 'view';

                    for (const elem of this.flist) {
                        let node = {
                            id: elem.id,
                            status: '已用印',
                            archive_status: 0,
                            finance_status: 0,
                        };
                        await Betools.manage.patchTableData(`bs_seal_regist`, elem.id, node);
                    }

                    await vant.Dialog.alert({
                        title: '温馨提示',
                        message: '已驳回，请联系移交申请人重新发起申请！',
                    });

                    //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                    const prLogHisNode = {
                        id: Betools.tools.queryUniqueID(),
                        table_name: 'bs_contract_transfer_apply',
                        main_value: id,
                        proponents: userinfo.username,
                        business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                        business_code: '000000000', //varchar(100)  null comment '业务编号',
                        process_name: '归档移交流程审批', //varchar(100)  null comment '流程名称',
                        employee: userinfo.realname, //varchar(1000) null comment '操作职员',
                        approve_user: userinfo.username, //varchar(100)  null comment '审批人员',
                        action: '驳回', //varchar(100)  null comment '操作动作',
                        action_opinion: '审批移交申请[已驳回]', //text          null comment '操作意见',
                        operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                        functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                        process_station: '移交审批审批[印章管理]', //varchar(100)  null comment '流程岗位',
                        business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                        content: this.item.filename + ' #经办人: ' + this.item.create_name, //text          null comment '业务内容',
                        process_audit: this.item.pid + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                        create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                        relate_data: '', //text          null comment '关联数据',
                        origin_data: '',
                    }

                    await Betools.workflow.approveViewProcessLog(prLogHisNode);
                }

            } catch (error) {
                console.log(error);
            }

        },
        /** 处理同意/提交操作 */
        async handleAgree() {
            try {
                const id = Betools.tools.queryUrlString('id');
                const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取当前用户信息
                let table_type = null;

                if (this.item.type == '财务移交') {
                    table_type = 'finance';
                } else if (this.item.type == '档案移交') {
                    table_type = 'archive';
                }

                if (Betools.tools.isNull(this.item.remark)) {
                    return await vant.Dialog.alert({
                        title: '温馨提示',
                        message: '请输入审批意见！',
                    });
                }

                for (const node of this.flist) {
                    delete node.tel;
                    delete node.title;
                    delete node.code;
                    delete node.isDefault;
                    delete node.timestamp;
                    node.seal_group_ids = this.item.receive_ids;
                    await Betools.manage.postTableData(`bs_seal_regist_${table_type}`, node);
                    node.isDefault = false;
                    node.code = '';
                    node.title = '';
                    node.tel = '';
                }

                const resp = await Betools.manage.patchTableData(`bs_contract_transfer_apply`, this.item.id, {
                    status: 200,
                    remark: this.item.remark,
                    flist: JSON.stringify(this.item.flist),
                });

                if (resp.protocol41 == true && resp.affectedRows > 0) {
                    this.view = 'view';
                    for (const elem of this.flist) {
                        let node = null;
                        if ((elem.type == '移交前台' || elem.type == '已领取' || elem.type == '已用印') && this.item.type == '财务移交') {
                            node = {
                                id: elem.id,
                                status: '财务归档',
                                finance_status: 200,
                            };
                        } else if ((elem.type == '移交前台' || elem.type == '已领取' || elem.type == '已用印') && this.item.type == '档案移交') {
                            node = {
                                id: elem.id,
                                status: '档案归档',
                                archive_status: 200,
                            };
                        } else if (elem.type == '财务归档' && this.item.type == '档案移交') {
                            node = {
                                id: elem.id,
                                status: '已完成',
                                archive_status: 200,
                                finance_status: 200,
                            };
                        } else if (elem.type == '档案归档' && this.item.type == '财务移交') {
                            node = {
                                id: elem.id,
                                status: '已完成',
                                archive_status: 200,
                                finance_status: 200,
                            };
                        }
                        await Betools.manage.patchTableData(`bs_seal_regist`, elem.id, node);
                    }

                    await vant.Dialog.alert({
                        title: '温馨提示',
                        message: '文件已完成归档操作！',
                    });

                    //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
                    const prLogHisNode = {
                        id: Betools.tools.queryUniqueID(),
                        table_name: 'bs_contract_transfer_apply',
                        main_value: id,
                        proponents: userinfo.username,
                        business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                        business_code: '000000000', //varchar(100)  null comment '业务编号',
                        process_name: '归档移交流程审批', //varchar(100)  null comment '流程名称',
                        employee: userinfo.realname, //varchar(1000) null comment '操作职员',
                        approve_user: userinfo.username, //varchar(100)  null comment '审批人员',
                        action: '同意', //varchar(100)  null comment '操作动作',
                        action_opinion: '审批移交申请[已同意]', //text          null comment '操作意见',
                        operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                        functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                        process_station: '移交审批审批[印章管理]', //varchar(100)  null comment '流程岗位',
                        business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                        content: this.item.filename + ' #经办人: ' + this.item.create_name, //text          null comment '业务内容',
                        process_audit: this.item.pid + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                        create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                        relate_data: '', //text          null comment '关联数据',
                        origin_data: '',
                    }

                    await Betools.workflow.approveViewProcessLog(prLogHisNode);
                }

            } catch (error) {
                console.log(error);
            }
        },
    }
}
</script>

<style>
</style>
<style scoped>
@import "../../assets/css/explore.css";
@import "../../assets/css/sealview.css";
@import "../../assets/css/sealview.global.css";
</style>
