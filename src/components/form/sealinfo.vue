<template>
<keep-alive>
    <div id="content" style="margin-top: 0px; overflow-x: hidden;">

        <header id="wx-header" style="overflow-x:hidden;">
            <div class="center">
                <router-link to="/app" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                    <span>返回</span>
                </router-link>
                <span>印章管理</span>
                <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
                    <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
                    <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
                </van-dropdown-menu>
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
                        <van-col span="8" style="text-align: center;font-size:1.15rem;">用印登记表</van-col>
                        <van-col span="8" style="display:none;">
                            <van-icon style="float:right;cursor:pointer;" name="delete" color="#1989fa" @click="deleteForm()" />
                        </van-col>
                    </van-row>
                </div>
            </div>

            <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;overflow-x:hidden;">
                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;overflow-x:hidden;"></div>
                <div class="weui-cells" style="margin-top:0px;margin-left:0px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;overflow-x:hidden;">

                    <van-cell-group>
                        <van-form>
                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="基本信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field v-show="item.serialid" clearable label="用印序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />
                                <van-field clearable label="填报日期" v-model="item.createtime" placeholder="请输入登记日期" readonly />
                                <van-field required readonly clickable clearable label="用印类型" v-model="item.sealtype" placeholder="选择用印类型" @blur="validField('sealtype')" :error-message="message.sealtype" @click="tag.showPickerSealType = true" />
                                <van-field required readonly clickable clearable label="用印顺序" v-model="item.ordertype" placeholder="选择用印顺序" @blur="validField('ordertype')" :error-message="message.ordertype" @click="tag.showPickerOrderType = true" />
                                <check-select required label="印章类型" placeholder="请选择" v-model="item.seal_category" :columns="categoryColumns" :option="{label:'name',value:'name'}" @confirm="confirmCategory" />
                                <template v-show="Array.isArray(item.seal_category)" v-for="(seal_category_item,index) of item.seal_category ">
                                    <div :key="seal_category_item" :index="index" width="100%" style="width:100%;color: #a0a0a0;margin-left: 1.25rem;margin-top:0.35rem;margin-bottom: 0.35rem;">
                                        <van-icon name="close" @click="deleteCategoryList(index);" style="margin-top:0.15rem;margin-right:0.15rem;padding-top:0.15rem;top:0.125rem;" />
                                        <span> {{ index }}.</span>
                                        <span style="width:100%;"> {{ seal_category_item}} </span>
                                    </div>
                                </template>
                                <van-field required :readonly="readonly" clearable label="名称" v-model="item.filename" placeholder="请输入文件名称" @blur="validField('filename')" :error-message="message.filename" />
                                <van-field required :readonly="readonly" clearable label="份数" v-model="item.count" placeholder="请输入文件份数" type="digit" @blur="validField('count')" :error-message="message.count" />
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="经办信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field required :readonly="readonly" clickable clearable label="经办人" v-model="item.dealManager" placeholder="请输入经办人" @blur="validField('dealManager');queryManager();" :error-message="message.dealManager" @click="queryManager();" />
                                <van-address-list v-show="cuserList.length > 0" v-model="cuserid" :list="cuserList" default-tag-text="默认" edit-disabled @select="selectCreateUser" />
                                <van-field required :readonly="readonly" clearable label="经办部门" v-model="item.dealDepart" placeholder="请输入经办部门" @blur="validField('dealDepart')" :error-message="message.dealDepart" />
                                <van-field required :readonly="readonly" clearable label="经办账户" v-model="item.username" placeholder="请输入经办人的OA账号" @blur="validField('username')" :error-message="message.username" />
                                <van-field required :readonly="readonly" clearable label="经办电话" v-model="item.mobile" placeholder="请输入经办人联系电话" @blur="validField('mobile')" :error-message="message.mobile" />
                                <van-field required :readonly="readonly" clearable label="经办邮箱" v-model="item.dealMail" placeholder="请输入经办人的邮箱地址" @blur="validField('dealMail')" :error-message="message.dealMail" />
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="审批信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field required readonly clickable clearable label="审批类型" v-model="item.approveType" placeholder="选择审批类型" @blur="validField('approveType')" :error-message="message.approveType" @click="tag.showPicker = true" />
                                <van-field required clearable label="编号前缀" v-model="item.prefix" placeholder="请输入合同对应前缀，如LD、SD、CD等" v-show="item.sealtype == '合同类' " @blur="validField('prefix');queryHContract();" :error-message="message.prefix" @click="queryHContract();" />
                                <van-field required clearable :label="noname" v-model="item.contractId" placeholder="请根据最新已有合同编号填写编号" v-show="item.sealtype == '合同类' " />
                                <van-address-list v-show="hContractList.length > 0 && item.sealtype == '合同类'" v-model="hContractID" :list="hContractList" default-tag-text="默认" edit-disabled @select="selectHContract()" />
                                <van-field required :readonly="readonly" clearable label="签收人" v-model="item.signman" placeholder="请输入文件签收人" @blur="validField('signman')" :error-message="message.signman" />
                                <!-- <van-field required :readonly="readonly" clearable label="用印公司" v-model="item.company" placeholder="请输入用印公司" @blur="validField('company')" :error-message="message.company" /> -->
                                <check-select required :readonly="readonly" clearable label="用印公司" placeholder="请选择用印公司" v-model="item.company" :columns="companyColumns" :option="{ label:'name',value:'name',title:'title',all:false, search:true , search_emit:true , margin:'35px 3px 0px 0px' , classID:'van-field-check-select'}" @confirm="companyConfirm" @search="companySearch" />
                                <template v-show="Array.isArray(item.company)" v-for="(company_item,index) of item.company ">
                                    <div :key="company_item" :index="index" width="100%" style="width:100%;color: #a0a0a0;margin-left: 1.25rem;margin-top:0.35rem;margin-bottom: 0.35rem;">
                                        <van-icon name="close" @click="deleteCompanyList(index);" style="margin-top:0.15rem;margin-right:0.15rem;padding-top:0.15rem;top:0.125rem;" />
                                        <span> {{ index }}.</span>
                                        <span style="width:100%;"> {{ company_item}} </span>
                                    </div>
                                </template>
                                <van-field required :readonly="readonly" clearable label="合作方" v-model="item.partner" placeholder="请输入合作方名称" v-show="item.sealtype == '合同类' " @blur="validField('partner')" :error-message="message.partner" />
                                <van-field required :readonly="readonly" clearable label="流程编号" v-model="item.workno" placeholder="请输入流程编号" @blur="validField('workno')" :error-message="message.workno" />
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="印章管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field required clearable label="盖印人" v-model="item.sealman" placeholder="请输入印章管理员(盖印人)" @blur="validField('sealman');querySealMan();" @change="querySealMan();" :error-message="message.sealman" @click="querySealMan();" />
                                <van-address-list v-show="suserList.length > 0" v-model="suserid" :list="suserList" default-tag-text="默认" edit-disabled @select="selectSealUser()" />
                                <van-field v-show="item.sealtype == '合同类' && isGroupHeader && zonename == '集团总部' " required clearable label="前台客服" v-model="item.front_name" placeholder="请输入前台客服人员名称" @blur="validField('front');queryFrontMan();" :error-message="message.front" @click="queryFrontMan();" />
                                <van-address-list v-show="fuserList.length > 0 && item.sealtype == '合同类' && zonename == '集团总部' " v-model="fuserid" :list="fuserList" default-tag-text="默认" edit-disabled @select="selectFrontUser()" />
                                <van-field v-show="item.sealtype == '合同类' && false" required clearable label="档案归档" v-model="item.archive_name" placeholder="请输入档案归档人员名称" @blur="queryArchiveMan();" @click="queryArchiveMan();" />
                                <nut-checkboxgroup v-show="item.sealtype == '合同类' && false " ref="checkboxGroup" :checkBoxData="auserList" v-model="agroup" @change="selectArchiveUser()"></nut-checkboxgroup>
                                <van-field v-show="item.sealtype == '合同类'  && isGroupHeader && zonename == '集团总部'" required clearable label="财务归档" v-model="item.finance_name" placeholder="请输入财务归档人员名称" @blur="validField('finance');queryFinanceArchiveMan();" :error-message="message.finance" @click="queryFinanceArchiveMan();" />
                                <van-address-list v-show="financeuserList.length > 0 && item.sealtype == '合同类' && zonename == '集团总部'" v-model="financeUserid" :list="financeuserList" default-tag-text="默认" edit-disabled @select="selectFinanceUser()" />
                                <van-field v-show="item.sealtype == '合同类'  && isGroupHeader && zonename == '集团总部' " required clearable label="档案归档" v-model="item.record_name" placeholder="请输入档案归档人员名称" @blur="validField('record');queryRecordArchiveMan();" :error-message="message.record" @click="queryRecordArchiveMan();" />
                                <van-address-list v-show="recorduserList.length > 0 && item.sealtype == '合同类' && zonename == '集团总部'" v-model="recordUserid" :list="recorduserList" default-tag-text="默认" edit-disabled @select="selectRecordUser()" />
                                <van-field clearable label="盖印时间" v-model="item.sealtime" placeholder="--" readonly v-show="!!item.sealtime" />
                            </van-cell-group>

                            <van-popup v-model="tag.showPicker" round position="bottom">
                                <van-picker show-toolbar :columns="approveColumns" @cancel="tag.showPicker = false" @confirm="approveTypeConfirm" />
                            </van-popup>
                            <van-popup v-model="tag.showPickerOrderType" round position="bottom">
                                <van-picker show-toolbar :columns="orderTypeColumns" @cancel="tag.showPickerOrderType = false" @confirm="orderTypeConfirm" />
                            </van-popup>
                            <van-popup v-model="tag.showPickerSealType" round position="bottom">
                                <van-picker show-toolbar :columns="sealTypeColumns" @cancel="tag.showPickerSealType = false" @confirm="sealTypeConfirm" />
                            </van-popup>
                            <van-popup v-model="tag.showPickerSealCategory" round position="bottom">
                                <van-picker show-toolbar :columns="sealCategoryColumns" @cancel="tag.showPickerSealCategory = false" @confirm="sealCategoryConfirm" />
                            </van-popup>
                        </van-form>
                    </van-cell-group>

                    <van-cell-group v-show="item.ordertype == '我方先印' " style="margin-top:10px;">
                        <van-cell value="寄件信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                        <van-field :readonly="readonly" clearable label="寄送地址" v-model="item.send_location" placeholder="请输入对方公司/单位/组织的寄送地址" />
                        <van-field :readonly="readonly" clearable label="寄送电话" v-model="item.send_mobile" placeholder="请输入对方公司/单位/组织相关负责人联系电话" />
                    </van-cell-group>

                    <van-cell-group style="margin-top:10px;" v-show=" active > 0 ">
                        <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                        <van-steps :active="active">
                            <van-step>待用印</van-step>
                            <van-step>已用印</van-step>
                            <van-step>移交前台</van-step>
                            <van-step>已归档</van-step>
                        </van-steps>
                    </van-cell-group>

                    <div id="van-seal-buttons-content" style="margin-top:30px;margin-bottom:10px;border-top:0px solid #fcfcfc;">
                        <van-goods-action v-show=" tag.showPicker == false && tag.showPickerSealType == false && tag.showPickerOrderType == false && status == '' ">
                            <van-goods-action-button v-show="!tag.showOverlay" id="informed_confirm" type="danger" native-type="submit" text="提交" @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
                        </van-goods-action>
                    </div>

                    <div style="height:100px;">
                    </div>

                    <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;">加载中...</van-loading>
                    <div style="height:100px;"></div>
                </div>
            </div>
        </section>

        <van-overlay id='van-overlay-content' :show="tag.showOverlay" @click="showOverlayConfirm('cancel',()=>{});">
            <div class="wrapper" @click="showOverlayConfirm('cancel',()=>{});">
                <div :class="block.showOverlay">
                    <van-loading size="2.5rem" style="margin:2.35rem 2.35rem;" type="spinner" color="#1989fa" />
                </div>
            </div>
        </van-overlay>

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
            title: '用印登记表',
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
            status_type: '',
            fields: [],
            groupid: 'group00',
            sealuserid: '',
            iswechat: false,
            message: Betools.workconfig.compValidation.seal.message,
            valid: Betools.workconfig.compValidation.seal.valid,
            cuserid: '',
            cuserList: [],
            suserid: '',
            suserList: [],
            fuserid: '',
            fuserList: [],
            auserid: '',
            auserList: [],
            hContractID: '',
            hContractList: [],
            financeUserid: '',
            financeuserList: [],
            recordUserid: '',
            recorduserList: [],
            companyColumns: [],
            agroup: [],
            noname: '合同编号',
            item: {
                createtime: dayjs().format('YYYY-MM-DD'),
                serialid: '',
                filename: '',
                count: '2',
                dealDepart: '',
                dealManager: '',
                dealMail: '',
                username: '',
                approveType: 'OA系统',
                contractId: '',
                signman: '',
                workno: '',
                sealtime: '',
                sealman: '',
                sealtype: '',
                seal_category: [],
                ordertype: '常规用印',
                mobile: '',
                send_mobile: '',
                send_location: '',
                seal: 'yanggc', //用印管理员成员组
                seal_mobile: '',
                front: 'yanggc', //用印前台接受组
                front_name: 'yanggc',
                archive: 'yanggc', //用印归档组(财务/档案)
                archive_name: [],
                finance: 'yanggc', //用印财务接受组
                finance_name: 'yanggc',
                record: 'yanggc', //用印档案接受组
                record_name: 'yanggc',
                prefix: 'LD', //编号前缀
                name: '', //流程组名，即Group_XX
                confirmStatus: '', //财务确认/档案确认
                company: [],
                partner: '',
                status: '',
            },
            backPath: '/app',
            workflowlist: [],
            announces: [],
            informList: [],
            officeList: [],
            tag: {
                showPicker: false,
                showPickerSealType: false,
                showPickerOrderType: false,
                showPickerSealCategory: false,
                showOverlay: false,
            },
            block: {
                showOverlay: '',
            },
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            fileList: [],
            active: 0,
            loading: false,
            readonly: false,
            searchFlag: false,
            isGroupHeader: false,
            dropMenuOldValue: '',
            dropMenuValue: '',
            dropMenuOption: JSON.parse(`[{"text":"刷新","value":2,"icon":"replay"},{"text":"重置","value":4,"icon":"aim"}]`),
            archiveTypeColumns: Betools.workconfig.compcolumns.archiveTypeColumns,
            orderTypeColumns: Betools.workconfig.compcolumns.orderTypeColumns,
            sealTypeColumns: Betools.workconfig.compcolumns.sealTypeColumns,
            sealCategoryColumns: Betools.workconfig.compcolumns.sealCategoryColumns,
            approveColumns: Betools.workconfig.compcolumns.approveColumns,
            categoryColumns: JSON.parse(`[{"name":"公章","code":"1"},{"name":"法人章","code":"2"},{"name":"法人私章","code":"3"},{"name":"合同专用章","code":"4"},{"name":"财务专用章","code":"5"},{"name":"发票专用章","code":"6"},{"name":"物业服务章","code":"7"},{"name":"工会公章","code":"8"},{"name":"党支部章","code":"9"},{"name":"工会法人章","code":"10"},{"name":"工会财务章","code":"11"}]`),
            zonename: '',
        }
    },
    async activated() {
        this.queryInfo();
    },
    async mounted() {
        this.queryInfo();
    },
    watch: {
        $route(to, from) {

        },
        item(to, from) {}
    },
    methods: {
        deleteCategoryList(index) {
            try {
                this.item.seal_category.splice(index, 1);
                console.log(index);
            } catch (error) {
                console.log(error);
            }
        },
        deleteCompanyList(index) {
            try {
                this.item.company.splice(index, 1);
                console.log(index);
            } catch (error) {
                console.log(error);
            }
        },
        companyConfirm(data, key, value) {

        },
        async companySearch(data, key) {

            const companyAPI = `${window.BECONFIG['xmysqlAPI'].replace('gateway-xmysql','gateway-config')}/system.admin.config`;
            let companyArray = "YUAN DI CAPITAL LIMITED,FAN TAI LINVESTMENT HOLDING LIMITED,JIN SHA JIANG HOLIDING LIMITED,LING YUE CAPITAL LIMITED, LIANG RONG CAPITAL LIMITED,SAN JIANG YUAN INVESTMENT LIMITED,FU SHENG CAPITAL LIMITED,SHAN YUAN HOLDINGS LIMITED,DU NENG HOLDING LIMITED,领地控股集团有限公司,LEADING GROUP INVESTMENT LIMITED,DU NENG INVESTMENT LIMITED,领地香港有限公司,DU NENG CAPITAL LIMITED,成都玺达企业管理有限公司,成都恒禧企业管理咨询有限公司,领地集团有限公司,四川领地泛亚房地产开发有限公司,乐山领地房地产开发有限公司,四川陆地房地产开发有限公司,大连领地房地产开发有限公司,四川新领域房地产开发有限公司,贵州领地房地产开发有限公司,湖南省领创房地产开发有限公司,成都恒量企业管理咨询有限公司,北京清大怡豪投资有限公司,广西领地房地产开发有限公司,四川御成瑞海房地产开发有限公司,重庆源地川达企业管理咨询有限公司,吉林省领地房地产开发有限公司,雅安领地房地产开发有限公司,徐州方锦置业有限公司,成都领地泛太房地产开发有限公司,徐州辉创房地产开发有限公司,徐州唯创房地产开发有限公司,领地集团股份有限公司成都分公司,领地集团股份有限公司眉山分公司,领地集团股份有限公司乐山分公司,河北都能房地产开发有限公司,承德领地房地产开发有限公司,四川汉瑞达酒店管理有限公司,四川凯旋房地产开发有限公司,安徽省川达房地产开发有限公司,眉山领地房地产开发有限公司,武汉领地房地产开发有限公司,成都汉景实业有限公司,乐山恒邦置业发展有限公司,西安都能房地产开发有限公司,贵州省领悦房地产开发有限公司,四川源地房地产开发有限公司,四川宏晟悦华房地产开发有限公司,新疆领地房地产开发有限公司,乐山海纳房地产开发有限公司,郑州领域房地产开发有限公司,西昌领地房地产开发有限公司,江西省川达房地产开发有限公司,广东领悦房地产开发有限公司,山东省领地房地产开发有限公司,广东领地房地产开发有限公司,云南川达房地产开发有限公司,融量集团有限公司,四川量源投资有限公司,四川利保清大投资有限公司,四川都能矿业投资有限公司,成都唯美佳装饰工程有限公司,量源资产管理有限公司,乐山市创投融资理财信息咨询有限公司,成都宏图伟创企业管理合伙企业（有限合伙）,成都盛誉房地产营销策划有限公司,四川同源唯创企业管理咨询有限公司,四川领域企业管理咨询有限公司,海城市景地基业有限公司,成都市首华融资理财信息咨询有限公司,成都领民广源企业管理合伙企业（有限合伙）,成都领民悦华企业管理合伙企业（有限合伙）,成都睿威房地产开发有限公司,成都恒御企业管理有限公司,成都领汇达房地产开发有限公司,成都领盛源房地产开发有限公司,成都恒域房地产开发有限公司,北京当代领地置业有限公司,成都国创投资有限公司,霍尔果斯融汇通商务咨询服务有限公司,成都创达房地产营销策划有限公司,西藏瑞鼎商贸有限公司,四川创瑞达贸易有限公司,成都锐鼎鑫企业管理咨询有限公司,西藏泛誉达商贸有限公司,西藏明宇融汇商贸有限公司,西藏明宇时誉商贸有限公司,西藏瑞呈达商贸有限公司,深圳市中创华拓科技有限公司,西藏创普房地产营销有限公司,西藏恒睿房地产营销有限公司,成都御合呈玺企业管理咨询有限公司,成都鼎轩企业管理有限公司,成都睿轩科技有限公司,邛崃创达房地产营销策划有限公司,邛崃创达房地产营销策划有限公司天府新区分公司,成都瑞呈达企业管理有限公司,成都玺祥企业管理有限公司,成都航睿企业管理有限公司,成都乾汇泰富企业管理有限公司,成都航誉企业管理有限公司,成都鼎合瑞新企业管理有限公司,成都御和泰商贸有限公司,成都航玺企业管理有限公司,邛崃嘉升企业管理有限责任公司,成都星升企业管理咨询有限公司,成都星创企业管理咨询有限公司,成都旭合汇企业管理咨询有限公司,成都森思益企业管理咨询有限公司,成都浩合然实业有限公司,四川省鑫合远企业管理有限公司,成都联茂房地产营销策划有限公司,成都量誉房地产营销策划有限公司,四川优盛源企业管理有限公司,四川鑫诚丰企业管理有限公司,四川益满嘉企业管理有限公司,郫县升达置业有限责任公司,成都新隆置业有限公司,新津菁阳投资有限公司,成都金凯盛瑞房地产开发有限公司,成都领跑房地产开发有限公司,成都悦航房地产开发有限公司,成都领悦房地产开发有限公司,领地集团有限公司成都分公司,成都汉景实业有限公司青羊分公司,成都源地房地产开发有限公司,惠州领域房地产开发有限公司,成都佳雪置业有限公司,成都高新源地川达企业管理有限公司,成都航悦企业管理有限公司,成都新昱企业管理有限公司,成都港基房地产开发有限公司,北京信勉置业有限公司,成都信勉置业有限公司,彭州旭合置业有限公司,彭州都能房地产开发有限公司,四川长寿坊房地产开发有限责任公司,仁寿源地房地产开发有限公司,仁寿圣域房地产开发有限公司,,成都天府新区圣域房地产开发有限公司,仁寿领创房地产开发有限公司,四川省瑞与祥房地产开发有限公司,瀛凯众成文化投资有限公司,成都京领英赫置业有限公司,成都领源英赫置业有限公司,成都润德英赫置业有限公司,成都领尚房地产开发有限公司,眉山都能房地产开发有限公司,峨眉山市乐蜀酒店管理有限公司,成都领秀房地产开发有限公司,成都领纳房地产开发有限公司,重庆泛太房地产开发有限公司,重庆新唯创企业管理咨询有限责任公司,成都闻创博汇企业管理公司,成都创燊汇企业管理公司,广元唯创房地产开发有限公司,绵阳领创汇通房地产开发有限公司,广元川达房地产开发有限公司,德阳川达房地产开发有限公司,雅安领悦房地产开发有限公司,雅安源地房地产开发有限公司,雅安城投领地房地产开发有限公司,雅安泛亚房地产开发有限公司,雅安唯创房地产开发有限公司,雅安川达房地产开发有限公司,雅安海纳房地产开发有限公司,雅安圣域房地产开发有限公司,雅安金宏房地产开发有限公司,雅安恒量房地产开发有限公司,雅安鼎创房地产开发有限公司,雅安新领域房地产开发有限公司,雅安中恒基房地产开发有限公司,绵阳嘉瑞诚房地产开发有限公司,绵阳市三和实业有限公司,绵阳鸿远领悦房地产开发有限公司,绵阳泛太亚房地产开发有限公司,江油碧智房地产开发有限公司,绵阳领地房地产开发有限公司,绵阳市宇航数码科技有限公司,绵阳金泰实业有限公司,绵阳鑫亮平科技有限责任公司,绵阳盛兴泰来科技有限责任公司,绵阳恒量房地产开发有限公司,绵阳唯创房地产开发有限公司,绵阳瑞华文科技有限责任公司,绵阳都能房地产开发有限公司,绵阳远地房地产开发有限公司,南充领创房地产开发有限公司,绵阳华瑞达房地产开发有限公司,南充领悦房地产开发有限公司,南充唯创房地产开发有限公司,南充源地房地产开发有限公司,南充泛亚房地产开发有限公司,南充海纳房地产开发有限公司,南充川达房地产开发有限公司,南充华瑞房地产开发有限公司,南充恒量房地产开发有限公司,遂宁川达房地产开发有限公司,华蓥市创达房地产销售有限公司,领地集团有限公司乐山分公司,沐川海纳房地产开发有限公司,乐山领悦房地产开发有限公司,乐山华汇达房地产开发有限公司,乐山川达房地产开发有限公司,乐山华瑞房地产开发有限公司,乐山领创房地产开发有限公司,领地集团有限公司眉山分公司,眉山唯创房地产开发有限公司,眉山青竹沟旅游开发有限公司,眉山川达房地产开发有限公司,眉山海纳房地产开发有限公司,眉山泛亚房地产开发有限公司,张家口领域房地产开发有限公司,成都众志达企业管理合伙企业（有限合伙）,四川众誉嘉教育管理有限公司,四川华展旅游开发有限公司,四川鸿瑞通商贸有限公司,四川旭峰汇实业有限公司,成都联众创展企业管理咨询有限公司,绵阳鑫鼎泰企业策划有限公司,西藏亿美新实业有限公司,西藏恒量实业有限公司,成都领域文化旅游开发有限公司,张家口原绿房地产开发有限公司,乐山恒瑞达商业管理有限公司,眉山华瑞房地产开发有限公司,眉山华汇达房地产开发有限公司,眉山华瑞宏大置业有限公司,眉山川瑞达房地产开发有限公司,眉山领悦房地产开发有限公司,眉山协创企业管理服务有限公司,贵州川达房地产开发有限公司,泸州泛亚房地产开发有限公司,宜宾川瑞达房地产开发有限公司,凯里凯龙置业有限公司,凯里唯创房地产开发有限公司,贵阳唯创房地产开发有限公司,西昌嘉悦蜀韵酒店管理有限公司,西昌嘉悦蜀韵酒店管理有限公司桔子酒店,西昌宝瑞商业管理有限公司,西昌宝莱商业管理有限公司,西昌唯创房地产开发有限公司,西昌市海诚旅游开发有限公司,西昌领悦房地产开发有限公司,西昌领域房地产开发有限公司,西昌海域酒店管理有限公司桔子酒店,西昌海域酒店管理有限公司汉普顿酒店,西昌源地房地产开发有限公司,西昌泛太房地产开发有限公司,西昌唯创房地产开发有限公司隐居酒店,西昌海域酒店管理有限公司,西昌广源房地产开发有限公司,西昌领恒房地产开发有限公司,昆明恒量房地产开发有限公司,西昌领创房地产开发有限公司,西昌会理广量房地产开发有限公司,会理霞光置业有限公司,西昌恒量房地产开发有限公司,攀枝花领悦房地产开发有限公司,攀枝花唯创房地产开发有限公司,西昌市盛碧房地产开发有限公司,荆州领悦房地产开发有限公司,荆州领创房地产开发有限公司,新松机器人产业发展（张家界）有限公司,长沙领悦房地产开发有限公司,岳阳唯创房地产开发有限公司,济宁领域房地产开发有限公司,郑州川达房地产开发有限公司,郑州泛达房地产开发有限公司,郑州洛然房地产开发有限公司,徐州川达房地产开发有限公司,商丘川达房地产开发有限公司,驻马店皇家驿站文化旅游开发有限公司,驻马店盛世伟光房地产开发有限公司,驻马店盛世汇通房地产开发有限公司,驻马店伟昇房地产开发有限公司,驻马店伟顺房地产开发有限公司,驻马店伟汇房地产开发有限公司,徐州领源房地产开发有限公司,徐州源地房地产开发有限公司,漯河唯创房地产开发有限公司,漯河伟悦房地产开发有限公司,深圳丰盛实力钢管有限公司,佛山市南海领地房地产开发有限公司,佛山市禅城区领悦房地产开发有限公司,深圳市荣启投资发展有限公司,中山市御成房地产开发有限公司,惠州领悦房地产开发有限公司,惠州领地房地产开发有限公司,汕尾市领地房地产开发有限公司,深圳市唯创源科技有限公司,深圳新盛腾科技有限公司,广东领地泛太房地产开发有限公司,承德市君越房地产开发有限公司,承德市双滦区海建房地产开发有限公司,承德市雅昱装饰工程有限责任公司,承德川达房地产开发有限公司,承德双滦区创昱房地产营销有限公司,承德市腾庆装饰工程有限公司,北京都能企业管理有限公司,北京领地房地产开发有限公司,库尔勒领创房地产开发有限公司,巴州宝瑞企业管理有限公司,巴州宝瑞企业管理有限公司库尔勒一分公司,乌鲁木齐领地凯悦房地产开发有限公司,新疆兆龙诚祥房地产开发有限公司,乌鲁木齐领创汇通房地产开发有限公司,乌鲁木齐晟胜瑞华房地产开发有限公司,新疆民佰房地产开发有限公司,乌鲁木齐领地恒达房地产开发有限公司,乌鲁木齐领地瑞华房地产开发有限公司,乌鲁木齐领创汇生房地产开发有限公司,乌鲁木齐源地恒博房地产开发有限公司,领悦物业服务集团有限公司,四川领汇企业管理有限公司,领悦物业服务集团有限公司乐山分公司,领悦物业服务集团有限公司眉山分公司,领悦物业服务集团有限公司雅安分公司,领悦物业服务集团有限公司西昌分公司,领悦物业服务集团有限公司南海分公司,领悦物业服务集团有限公司禅城分公司,领悦物业服务集团有限公司巴州分公司,领悦物业服务集团有限公司吉林省分公司,吉林省君逸物业服务有限公司,领悦物业服务集团有限公司绵阳分公司,领悦物业服务集团有限公司惠州分公司,领悦物业服务集团有限公司承德分公司,领悦物业服务集团有限公司汕尾分公司,领悦物业服务集团有限公司攀枝花分公司,乌鲁木齐领汇都能物业服务有限公司,领悦物业服务集团有限公司华蓥分公司,领悦物业服务集团有限公司新乡分公司,领悦物业服务集团有限公司驻马店分公司,领悦物业服务集团有限公司昌吉分公司,巴州领汇物业服务有限公司,四川汇丰亿景物业服务有限公司,镇雄领汇物业管理有限公司,眉山市天富物业管理服务有限公司,领悦物业服务集团有限公司南充分公司,领悦物业服务集团有限公司荆州分公司,领悦物业服务集团有限公司凯里分公司,成都和诚领汇物业管理有限责任公司,新乡领汇物业服务有限公司,新乡市领汇美满物业服务有限公司,眉山领汇延天物业服务有限公司,领悦物业服务集团有限公司遵义分公司,领悦物业服务集团有限公司重庆分公司,领悦物业服务集团有限公司商丘分公司,四川融悦嘉汇房地产经纪有限公司,绵阳融汇领悦物业管理有限公司,领悦物业服务集团有限公司纳雍分公司,领悦物业服务集团有限公司郑州分公司,恩施州大博物业管理有限公司,铜仁市碧江区领汇物业服务有限公司,资阳市车城佳美物业有限公司,四川悦汇绿色环境发展有限公司,领悦物业服务集团有限公司泸州分公司,巴州汇悦美湖物业服务有限公司,领悦物业服务集团有限公司贵阳分公司,驻马店汇悦物业服务有限公司,领悦物业服务集团有限公司喀什分公司,库车星宇悦物业服务有限公司,领悦物业服务集团有限公司宜宾分公司,领悦物业服务集团有限公司广元分公司,新地物业服务有限公司（成都）,成都嘉锐宸汇企业管理有限公司,成都嘉锐宸汇企业管理有限公司雅安分公司,成都嘉锐宸汇企业管理有限公司乐山分公司,成都嘉锐宸汇企业管理有限公司眉山分公司,成都嘉锐宸汇企业管理有限公司西昌分公司,成都嘉锐宸汇企业管理有限公司吉林省分公司,成都嘉锐宸汇企业管理有限公司承德分公司,成都嘉锐宸汇企业管理有限公司佛山分公司,四川领居智慧生活服务有限公司,领悦物业服务集团有限公司张家界分公司,郑州汇悦物业服务有限公司,领悦物业服务集团有限公司漯河分公司,领悦物业服务集团有限公司深圳分公司,成都嘉锐宸汇企业管理有限公司巴州分公司,西昌融悦物业服务有限公司,成都量石成长股权投资中心（有限合伙）,成都量源创新股权投资合伙企业（有限合伙）,眉山市东坡区泛美企业管理有限责任公司,四川世纪融邦企业管理咨询有限公司,量石投资有限公司,广东趋势道资产管理有限公司,广东融量财富资产管理有限公司,四川泛美企业管理咨询有限公司,拉萨金沙江创业投资有限公司,北京世纪融邦投资管理有限公司,邛崃市中恒基商贸有限公司,四川华易通商贸有限公司,成都市中瑞达商贸有限公司,成都瑞通行商贸有限公司,成都宝瑞商业管理有限公司,成都宝瑞商业管理有限公司成华分公司,长春宝瑞企业管理有限公司,长春宝瑞企业管理有限公司净月分公司,四川华致信工程监理有限责任公司,眉山高康医院有限公司,成都青羊至诚和爱门诊部有限公司,四川领慈健康产业有限公司,成都双奇企业管理有限责任公司,成都杰瑞达企业管理中心（有限合伙）,成都美德康企业管理中心（有限合伙）,成都中恒达商贸有限公司,四川海纳园林绿化有限公司,中亚建业建设工程有限公司,中亚建业建设工程有限公司成都分公司,中亚建业建设工程有限公司眉山市彭山分公司,中亚建业建设工程有限公司攀枝花分公司,中亚建业建设工程有限公司乐山分公司,中亚建业建设工程有限公司荆州分公司,中亚建业建设工程有限公司巴州分公司,中亚建业建设工程有限公司绵阳分公司,中亚建业建设工程有限公司卫辉分公司,中亚建业建设工程有限公司惠州市分公司,四川博雅泰建筑工程有限公司,成都新领源房地产开发有限公司,米易川达房地产开发有限公司,米易海纳房地产开发有限公司,昆明网龙计算机信息技术有限公司,昆明网龙建设开发有限公司,驻马店盛世皇家驿站房地产开发有限公司,领悦物业服务集团有限公司达州分公司,南通新松新智置业集团有限公司,四川鸿泰云天企业管理有限公司,乐山澜山物业服务处,中共领悦物业服务集团有限公司支部委员会,眉山领域企业管理咨询有限公司,成都融悦景汇企业管理有限公司,西藏陆地实业有限公司,新地(成都)物业服务有限公司工会委员会,四川金恒源商贸有限公司,成都领樾房地产开发有限公司,成都领铭房地产开发有限公司,喀什合创汇悦物业服务有限公司,乐山东方广场物业服务处,乐山蘭台府物业服务处 ,乐山清江蘭台物业服务处,中融国际信托有限公司,上海兆苇企业管理合伙企业（有限合伙）,上海济清企业管理中心,成都领岚房地产开发有限公司,贵州美隆达实业发展有限公司,成都金科房地产有限公司,北京领地国科企业管理有限公司,广发银行股份有限公司成都分行"; 
            let array =[...new Set(companyArray.split(','))];
            let tempData = [];
            data = array.filter(item => item.includes(key));

            //查询默认配置的公司列表信息，如果存在则直接返回
            if(!(Betools.tools.isNull(data) || data.length == 0)){
                data.map((item) => tempData.push({ title: item, name:item, code:item, }));
                return this.companyColumns = tempData;
            } 
            
            //查询配置服务中心是否含有公司列表信息，返回配置中心的公司列表
            const companyArr = await superagent.get(companyAPI).set('Content-Type','application/json;charset=UTF-8').set('accept', 'json')
            if(!Betools.tools.isNull(companyArr)){
                let text = JSON.parse(companyArr.text);
                companyArray = text.simple_company_array;
                array =[...new Set(companyArray.split(','))];
                data = array.filter(item => item.includes(key));
                if(!(Betools.tools.isNull(data) || data.length == 0)){
                    data.map((item) => tempData.push({ title: item, name:item, code:item, }));
                    return this.companyColumns = tempData;
                }
            }

            //查询数据库的公司列表信息
            if((Betools.tools.isNull(data) || data.length == 0)){
                //查询数据库的公司列表信息
                data = await Betools.manage.queryTableData('bs_company_flow_base', `_where=(status,in,0)~and(level,gt,2)~and(name,like,~${key}~)&_fields=id,ename,name,xid&_sort=id&_p=0&_size=30`); // 获取最近12个月的已用印记录
                if(!(Betools.tools.isNull(data) || data.length == 0)){
                    data.map((item, index) => { item.title = item.code = item.name; });
                    return this.companyColumns = data;
                }
            }

            //查询数据库未搜索到，则向数据库提交此公司名称
            if((Betools.tools.isNull(data) || data.length == 0) && key && key.length >= 6){
                //新增此数据库名称
                Betools.manage.postTableData('bs_company_flow_base',{id:Betools.tools.queryUniqueID(),ename:key,name:key,level:200,xid:0});
                //返回数据
                return this.companyColumns = data = [{title:key,code:key,name:key}];
            }


        },
        confirmCategory(data1, index, data2) { // checkbox确定,
            console.log(data1, data2, index)
        },
        // 企业微信登录处理函数
        async weworkLogin() {
            try {
                return await Betools.query.queryWeworkUser();
            } catch (error) {
                console.log(error);
            }
        },
        //点击显示或者隐藏菜单
        async headMenuToggle() {
            this.$refs.headMenuItem.toggle();
        },
        //点击顶部搜索
        async headMenuSearch() {
            if (this.searchWord) {
                //刷新相应表单
                this.queryTabList(this.tabname);
                //显示搜索状态
                vant.Toast('搜索...');
                //等待一下
                await Betools.tools.sleep(300);
            }
            //显示刷新消息
            this.searchFlag = false;
        },
        //点击右侧菜单
        async headDropMenu(value) {
            const val = this.dropMenuValue;
            switch (val) {
                case 0: //只显示合同类信息
                    this.dropMenuOldValue = this.sealType = val;
                    await this.queryFresh();
                    break;
                case 1: //只显示非合同类信息
                    this.dropMenuOldValue = this.sealType = val;
                    await this.queryFresh();
                    break;
                case 2: //刷新数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.reduction();
                    break;
                case 3: //查询数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.reduction();
                    break;
                case 4: //重置数据
                    this.dropMenuValue = this.dropMenuOldValue;
                    await this.reduction();
                    break;
                case 5: //返回应用
                    this.$router.push(`/app`);
                    break;
                case 6: //返回首页
                    this.$router.push(`/explore`);
                    break;
                default:
                    console.log(`no operate. out of switch. `);
            }
        },
        // 设置重置
        async reduction() {
            this.item = {
                createtime: dayjs().format('YYYY-MM-DD'),
                filename: '',
                count: '',
                dealDepart: '',
                dealManager: '',
                dealMail: '',
                username: '',
                approveType: '',
                contractId: '',
                signman: '',
                workno: '',
                sealtime: '',
                sealman: '',
                sealtype: '',
                ordertype: '',
                mobile: '',
                send_mobile: '',
                send_location: '',
                seal: '', //用印管理员成员组
                front: '', //用印前台接受组
                front_name: '',
                archive: '', //用印归档组(财务/档案)
                archive_name: [],
                prefix: '', //编号前缀
                name: '', //流程组名，即Group_XX
                confirmStatus: '', //财务确认/档案确认
                status: '',
            };
        },
        //删除原表单数据
        async deleteForm() {
            await vant.Dialog.confirm({ //提示确认用印操作
                title: '清空表单',
                message: '将进行‘清空表单’处理，清空后请重新填写用印登记申请！',
            })
            this.item.filename = '';
            this.item.count = '';
            this.item.workno = '';
            this.item.sealtype = '';
            this.item.ordertype = '';
        },
        //获取合同编号
        async queryHContract() {
            await Betools.sealapply.querySealApplyHContract(this);
        },
        //查询归档人员
        async queryArchiveMan() {
            await Betools.sealapply.querySealApplyArchiveMan(this);
        },
        async queryFinanceArchiveMan() {
            await Betools.sealapply.querySealApplyFinanceArchiveMan(this);
        },
        //用户选择前台接待
        async queryRecordArchiveMan() {
            await Betools.sealapply.querySealApplyRecordArchiveMan(this);
        },
        //用户选择前台接待
        async queryFrontMan() {
            await Betools.sealapply.querySealApplyFrontMan(this);
        },
        //用户选择盖印人
        async querySealMan() {
            await Betools.sealapply.querySealApplySealMan(this);
        },
        async validField(fieldName) {

            await Betools.tools.sleep(0);

            //邮箱验证正则表达式
            const regMail = Betools.workconfig.system.config.regexp.mail;

            this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

            if (fieldName == 'dealMail') {
                this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
            }

            //修改合同列表时，切换编号名称
            if (fieldName == 'sealtype') {
                //设置编号名称
                this.noname = Betools.workconfig.sealTypeNoName[this.item[fieldName]];
                if (this.item[fieldName] == '非合同类') {
                    //设置流水编号前缀为PTID
                    this.item.prefix = 'PTID';
                    //加载最近的同类型合同编号
                    await this.queryHContract();
                } else {
                    //设置流水编号前缀为LD
                    this.item.prefix = 'LD';
                    //加载最近的同类型合同编号
                    await this.queryHContract();
                }
            }
            Betools.storage.setStore('system_seal_item', JSON.stringify(this.item), 3600 * 2);
            return Betools.tools.isNull(this.message[fieldName]);
        },
        validFieldConfirm(fieldName) {
            this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';
            if (fieldName == 'dealMail') {
                this.message[fieldName] = Betools.workconfig.system.config.regexp.mail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
            }
            return Betools.tools.isNull(this.message[fieldName]);
        },
        // 校验是否为集团总部
        async zoneNameValid() {
            try {
                const resp = await Betools.query.queryRoleGroupList('SEAL_ADMIN', this.item.seal); //查询直接所在工作组
                if (resp && resp.length > 0 && resp[0].zonename) { //如果查询到管理组数据，则设置区域名称
                    this.zonename = resp[0].zonename;
                } else {
                    this.zonename = '';
                }
            } catch (error) {
                console.log(error);
            }
        },
        sealTypeConfirm(value) {
            const userInfo = Betools.storage.getStore('system_userinfo');
            (userInfo && userInfo.systemuserinfo && userInfo.systemuserinfo.textfield1 && userInfo.systemuserinfo.textfield1.indexOf('领地集团总部') > 0) ? (this.isGroupHeader = true) : (null); //非总部的人不需要展示前台、档案、财务人员
            this.item.sealtype = value;
            this.tag.showPickerSealType = false;
            this.validField('sealtype');
        },
        sealCategoryConfirm(value) {
            this.item.seal_category = value;
            this.tag.showPickerSealCategory = false;
            this.validField('seal_category');
        },
        orderTypeConfirm(value) {
            this.item.ordertype = value;
            this.tag.showPickerOrderType = false;
            this.validField('ordertype');
        },
        approveTypeConfirm(value) {
            this.item.approveType = value;
            this.tag.showPicker = false;
            this.validField('approveType');
        },
        encodeURI(value) {
            return window.encodeURIComponent(value);
        },
        getUrlParam(name) {
            return Betools.tools.queryUrlString(name,'history');
        },
        //选中当前填报人
        async selectCreateUser(user, id) {
            await Betools.sealapply.selectSealApplyCreateUser(user,id,this);
        },
        //选中当前合同编号
        async selectHContract(value) {
            await Betools.sealapply.selectSealApplyHContract(value,this);
        },
        //选中当前前台人员
        async selectFrontUser(value) {
            await Betools.manage.selectSealApplyFrontUser(value,this);
        },
        //选中当前财务人员
        async selectFinanceUser(value) {
            await Betools.manage.selectSealApplyFinanceUser(value,this);
        },
        //选中当前档案人员
        async selectRecordUser(value) {
            await Betools.manage.selectSealApplyRecordUser(value,this);
        },
        //选中当前盖印人员
        async selectSealUser(value) {
            await Betools.manage.selectSealApplySealUser(value,this);
        },
        //选中当前归档人员
        async selectArchiveUser(values) {
            await Betools.manage.selectSealApplyArchiveUser(values,this);
        },
        //查询经办人基本信息
        async queryManager() {
            await Betools.manage.querySealApplyManager(this);
        },
        //缓存填报人信息
        async cacheUserInfo() {
            await Betools.manage.cacheSealApplyUserInfo(this.item);
        },
        //查询消息
        async queryInfo() {
            await Betools.manage.querySealApplyInfo(this);
        },
        //显示遮罩
        async showOverlayConfirm(action = 'cancel', done) {
            await Betools.manage.showOverlayConfirm(action, done, this.tag, this.block);
        },
        //提交用印登记申请
        async handleConfirm() {
            await Betools.manage.handleSealApplyConfirm(this);
        },
    }
}
</script>

<style>
</style>
<style scoped>
@import "../../assets/css/explore.css";
@import "../../assets/css/sealinfo.css";
@import "../../assets/css/sealinfo.global.css";
</style>
