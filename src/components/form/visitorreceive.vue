<template>
<keep-alive>

    <!--首页组件-->
    <div id="content" style="margin-top: 0px;">

        <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;">
            <div class="center">
                <router-link :to="back" @click="$router.push(`/app`)" tag="div" class="iconfont icon-left">
                    <span>返回</span>
                </router-link>
                <span>访客登记</span>
                <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
                    <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
                    <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
                </van-dropdown-menu>
            </div>
        </header>

        <section v-if="iswechat">

            <div class="weui-cells" style="margin-top:0px;">

                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
                    <van-notice-bar v-show=" title!='' && title != null && typeof title != 'undefined' " left-icon="volume-o" color="#1989fa" background="#ecf9ff" :text="title" />
                </div>

                <div class="" id="scanCell" style="padding: 8px 10px 4px 10px;">
                    <van-row>
                        <van-col span="8"></van-col>
                        <van-col span="8" style="text-align: center;font-size:1.15rem;">来访登记</van-col>
                        <van-col span="8"></van-col>
                    </van-row>
                </div>

            </div>

            <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
                <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
                </div>
                <div class="weui-cells" style="margin-top:0px;margin-left:10px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

                    <van-cell-group>

                        <van-form>

                            <van-cell-group id="van-visit-group" style="margin-top:10px;position:relative;">

                                <van-cell value="基础信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />

                                <van-field :readonly="readonly" :required="false" clearable label="预约日期" v-model="item.time" placeholder="请填写预约时间！" @blur="validField('time')" :error-message="message.time" />

                                <single-select required label="来访时间" placeholder="请选择来访时间" v-model="item.dtime" @confirm="typedTimeConfirm" :columns="typedTimeColumns" :option="{ label:'name',value:'name',title:'',all: false , search: false , margin:'0px 0px' , classID:'',}" />

                                <van-field :readonly="readonly" :required="false" clearable label="访客单位" v-model="item.visitor_company" placeholder="请填写来访单位！" @blur="validField('visitor_company')" :error-message="message.visitor_company" />

                                <van-field :readonly="readonly" required clearable label="访客姓名" v-model="item.visitor_name" placeholder="请填写访客姓名！" @blur="validField('visitor_name')" :error-message="message.visitor_name" />
                                <van-field :readonly="readonly" required clearable label="访客职务" v-model="item.visitor_position" placeholder="请填写访客职务！" @blur="validField('visitor_position')" :error-message="message.visitor_position" />
                                <van-field :readonly="readonly" required clearable label="访客电话" v-model="item.visitor_mobile" placeholder="请填写访客电话！" @blur="validField('visitor_mobile')" :error-message="message.visitor_mobile" />

                                <van-icon name="add-o" style="position:absolute;top:115px;right:0px;" @click="size <= 20 ? size++ : size;" />
                                <van-icon name="circle" style="position:absolute;top:155px;right:0px;" @click="size > 1 ? size-- : size;" />
                                <span class="van-goods-span-number" style="top:130px;">#1</span>

                            </van-cell-group>

                            <van-cell-group v-show="size>=2" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name1" placeholder="请填写访客姓名！" @blur="validField('visitor_name1')" :error-message="message.visitor_name1" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position1" placeholder="请填写访客职务！" @blur="validField('visitor_position1')" :error-message="message.visitor_position1" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile1" placeholder="请填写访客电话！" @blur="validField('visitor_mobile1')" :error-message="message.visitor_mobile1" />
                                <span class="van-goods-span-number">#2</span>

                            </van-cell-group>

                            <van-cell-group v-show="size>=3" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name2" placeholder="请填写访客姓名！" @blur="validField('visitor_name2')" :error-message="message.visitor_name2" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position2" placeholder="请填写访客职务！" @blur="validField('visitor_position2')" :error-message="message.visitor_position2" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile2" placeholder="请填写访客电话！" @blur="validField('visitor_mobile2')" :error-message="message.visitor_mobile2" />
                                <span class="van-goods-span-number">#3</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=4" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name3" placeholder="请填写访客姓名！" @blur="validField('visitor_name3')" :error-message="message.visitor_name3" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position3" placeholder="请填写访客职务！" @blur="validField('visitor_position3')" :error-message="message.visitor_position3" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile3" placeholder="请填写访客电话！" @blur="validField('visitor_mobile3')" :error-message="message.visitor_mobile3" />
                                <span class="van-goods-span-number">#4</span>

                            </van-cell-group>

                            <van-cell-group v-show="size>=5" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name4" placeholder="请填写访客姓名！" @blur="validField('visitor_name4')" :error-message="message.visitor_name4" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position4" placeholder="请填写访客职务！" @blur="validField('visitor_position4')" :error-message="message.visitor_position4" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile4" placeholder="请填写访客电话！" @blur="validField('visitor_mobile4')" :error-message="message.visitor_mobile4" />

                                <span class="van-goods-span-number">#5</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=6" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name5" placeholder="请填写访客姓名！" @blur="validField('visitor_name5')" :error-message="message.visitor_name5" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position5" placeholder="请填写访客职务！" @blur="validField('visitor_position5')" :error-message="message.visitor_position5" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile5" placeholder="请填写访客电话！" @blur="validField('visitor_mobile5')" :error-message="message.visitor_mobile5" />

                                <span class="van-goods-span-number">#6</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=7" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name6" placeholder="请填写访客姓名！" @blur="validField('visitor_name6')" :error-message="message.visitor_name6" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position6" placeholder="请填写访客职务！" @blur="validField('visitor_position6')" :error-message="message.visitor_position6" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile6" placeholder="请填写访客电话！" @blur="validField('visitor_mobile6')" :error-message="message.visitor_mobile6" />

                                <span class="van-goods-span-number">#7</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=8" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name7" placeholder="请填写访客姓名！" @blur="validField('visitor_name7')" :error-message="message.visitor_name7" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position7" placeholder="请填写访客职务！" @blur="validField('visitor_position7')" :error-message="message.visitor_position7" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile7" placeholder="请填写访客电话！" @blur="validField('visitor_mobile7')" :error-message="message.visitor_mobile7" />

                                <span class="van-goods-span-number">#8</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=9" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name8" placeholder="请填写访客姓名！" @blur="validField('visitor_name8')" :error-message="message.visitor_name8" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position8" placeholder="请填写访客职务！" @blur="validField('visitor_position8')" :error-message="message.visitor_position8" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile8" placeholder="请填写访客电话！" @blur="validField('visitor_mobile8')" :error-message="message.visitor_mobile8" />

                                <span class="van-goods-span-number">#9</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=10" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name9" placeholder="请填写访客姓名！" @blur="validField('visitor_name9')" :error-message="message.visitor_name9" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position9" placeholder="请填写访客职务！" @blur="validField('visitor_position9')" :error-message="message.visitor_position9" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile9" placeholder="请填写访客电话！" @blur="validField('visitor_mobile9')" :error-message="message.visitor_mobile9" />

                                <span class="van-goods-span-number">#10</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=11" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name10" placeholder="请填写访客姓名！" @blur="validField('visitor_name10')" :error-message="message.visitor_name10" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position10" placeholder="请填写访客职务！" @blur="validField('visitor_position10')" :error-message="message.visitor_position10" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile10" placeholder="请填写访客电话！" @blur="validField('visitor_mobile10')" :error-message="message.visitor_mobile10" />

                                <span class="van-goods-span-number">#11</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=12" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name11" placeholder="请填写访客姓名！" @blur="validField('visitor_name11')" :error-message="message.visitor_name11" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position11" placeholder="请填写访客职务！" @blur="validField('visitor_position11')" :error-message="message.visitor_position11" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile11" placeholder="请填写访客电话！" @blur="validField('visitor_mobile11')" :error-message="message.visitor_mobile11" />

                                <span class="van-goods-span-number">#12</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=13" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name12" placeholder="请填写访客姓名！" @blur="validField('visitor_name12')" :error-message="message.visitor_name12" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position12" placeholder="请填写访客职务！" @blur="validField('visitor_position12')" :error-message="message.visitor_position12" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile12" placeholder="请填写访客电话！" @blur="validField('visitor_mobile12')" :error-message="message.visitor_mobile12" />

                                <span class="van-goods-span-number">#13</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=14" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name13" placeholder="请填写访客姓名！" @blur="validField('visitor_name13')" :error-message="message.visitor_name13" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position13" placeholder="请填写访客职务！" @blur="validField('visitor_position13')" :error-message="message.visitor_position13" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile13" placeholder="请填写访客电话！" @blur="validField('visitor_mobile13')" :error-message="message.visitor_mobile13" />

                                <span class="van-goods-span-number">#14</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=15" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name14" placeholder="请填写访客姓名！" @blur="validField('visitor_name14')" :error-message="message.visitor_name14" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position14" placeholder="请填写访客职务！" @blur="validField('visitor_position14')" :error-message="message.visitor_position14" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile14" placeholder="请填写访客电话！" @blur="validField('visitor_mobile14')" :error-message="message.visitor_mobile14" />

                                <span class="van-goods-span-number">#15</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=16" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name15" placeholder="请填写访客姓名！" @blur="validField('visitor_name15')" :error-message="message.visitor_name15" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position15" placeholder="请填写访客职务！" @blur="validField('visitor_position15')" :error-message="message.visitor_position15" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile15" placeholder="请填写访客电话！" @blur="validField('visitor_mobile15')" :error-message="message.visitor_mobile15" />

                                <span class="van-goods-span-number">#16</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=17" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name16" placeholder="请填写访客姓名！" @blur="validField('visitor_name16')" :error-message="message.visitor_name16" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position16" placeholder="请填写访客职务！" @blur="validField('visitor_position16')" :error-message="message.visitor_position16" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile16" placeholder="请填写访客电话！" @blur="validField('visitor_mobile16')" :error-message="message.visitor_mobile16" />

                                <span class="van-goods-span-number">#17</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=18" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name17" placeholder="请填写访客姓名！" @blur="validField('visitor_name17')" :error-message="message.visitor_name17" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position17" placeholder="请填写访客职务！" @blur="validField('visitor_position17')" :error-message="message.visitor_position17" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile17" placeholder="请填写访客电话！" @blur="validField('visitor_mobile17')" :error-message="message.visitor_mobile17" />

                                <span class="van-goods-span-number">#18</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=19" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name18" placeholder="请填写访客姓名！" @blur="validField('visitor_name18')" :error-message="message.visitor_name18" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position18" placeholder="请填写访客职务！" @blur="validField('visitor_position18')" :error-message="message.visitor_position18" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile18" placeholder="请填写访客电话！" @blur="validField('visitor_mobile18')" :error-message="message.visitor_mobile18" />

                                <span class="van-goods-span-number">#19</span>
                            </van-cell-group>

                            <van-cell-group v-show="size>=20" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                                <van-field :readonly="readonly" clearable label="访客姓名" v-model="item.visitor_name19" placeholder="请填写访客姓名！" @blur="validField('visitor_name19')" :error-message="message.visitor_name19" />
                                <van-field :readonly="readonly" clearable label="访客职务" v-model="item.visitor_position19" placeholder="请填写访客职务！" @blur="validField('visitor_position19')" :error-message="message.visitor_position19" />
                                <van-field :readonly="readonly" clearable label="访客电话" v-model="item.visitor_mobile19" placeholder="请填写访客电话！" @blur="validField('visitor_mobile19')" :error-message="message.visitor_mobile19" />

                                <span class="van-goods-span-number">#20</span>
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="被访人员" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field :readonly="readonly" required clearable label="被访人员" v-model="item.create_by" placeholder="请填写被访人员的姓名！" @blur="validField('create_by')" :error-message="message.create_by" />
                                <van-field :readonly="readonly" required clearable label="职务名称" v-model="item.position" placeholder="请填写被访人员的职务名称！" @blur="validField('position')" :error-message="message.position" />
                                <van-field :readonly="readonly" required clearable label="联系电话" v-model="item.mobile" placeholder="请填写被访人员的联系电话！" @blur="validField('mobile');" :error-message="message.mobile" />
                            </van-cell-group>

                            <van-cell-group id="van-user-list" class="van-user-list" style="margin-top:10px;">
                                <van-cell value="接待管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <van-field required clearable label="来访地址" v-model="item.address" placeholder="请输入来访地址!" @blur="validField('address');queryAddress();" :error-message="message.address" @click="queryAddress();" />
                                <van-address-list id="van-visit-address" v-show="addressList.length > 0" v-model="addressId" :list="addressList" default-tag-text="默认" edit-disabled @select="selectAddress" />
                                <van-field required clearable label="客户接待" v-model="item.user_admin_name" placeholder="请输入客服接待员!" @blur="validField('user_admin_name');queryUserName();" :error-message="message.user_admin_name" @click="queryUserName();" />
                                <van-address-list v-show="userList.length > 0" v-model="userid" :list="userList" default-tag-text="默认" edit-disabled @select="selectUserName()" />
                            </van-cell-group>

                            <van-cell-group style="margin-top:10px;">
                                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                                <!-- 备注说明（HR需要确认/修改） -->
                                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.remark" rows="2" autosize type="textarea" maxlength="256" placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" />
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

                        </van-form>

                    </van-cell-group>

                    <div v-show="!item.serialid" style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;">
                        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleApply();" style="border-radius: 10px 10px 10px 10px; text-align: center;">提交</van-button>
                    </div>

                    <div style="height:500px;"></div>
                </div>
            </div>

        </section>

        <setion v-if="!iswechat">
            <div class="section-nowechat">
                请使用微信客户端打开
            </div>
        </setion>

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
            title: '访客登记',
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
            userid: '',
            userList: [],
            huserid: '',
            huserList: [],
            auserid: '',
            auserList: [],
            fuserid: '',
            fuserList: [],
            muserid: '',
            muserList: [],
            size: 1,
            processLogList: [],
            iswechat: false,
            isfirst: true,
            dockFlag: false,
            typeColumns: ['访客登记'],
            typedTimeColumns: [{
                    name: '上午',
                    code: '上午',
                },
                {
                    name: '下午',
                    code: '下午',
                },
            ],
            showTypePicker: false,
            uploadURL: 'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: Betools.workconfig.compValidation.visitorapply.message,
            valid: Betools.workconfig.compValidation.visitorapply.valid,
            item: {
                id: '',
                serialid: '',
                time: dayjs().format('YYYY-MM-DD'),
                dtime: '上午',
                create_by: '',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),

                visitor_name: '', //访客姓名
                visitor_company: '', //访客单位
                visitor_mobile: '', //访客电话
                visitor_position: '', //访客职务

                visitor_name1: '',
                visitor_company1: '',
                visitor_mobile1: '',
                visitor_position1: '',

                visitor_name2: '',
                visitor_company2: '',
                visitor_mobile2: '',
                visitor_position2: '',

                visitor_name3: '',
                visitor_company3: '',
                visitor_mobile3: '',
                visitor_position3: '',

                visitor_name4: '',
                visitor_company4: '',
                visitor_mobile4: '',
                visitor_position4: '',

                visitor_name5: '',
                visitor_company5: '',
                visitor_mobile5: '',
                visitor_position5: '',

                visitor_name6: '',
                visitor_company6: '',
                visitor_mobile6: '',
                visitor_position6: '',

                visitor_name7: '',
                visitor_company7: '',
                visitor_mobile7: '',
                visitor_position7: '',

                visitor_name8: '',
                visitor_company8: '',
                visitor_mobile8: '',
                visitor_position8: '',

                visitor_name9: '',
                visitor_company9: '',
                visitor_mobile9: '',
                visitor_position9: '',

                visitor_name10: '',
                visitor_company10: '',
                visitor_mobile10: '',
                visitor_position10: '',

                visitor_name11: '',
                visitor_company11: '',
                visitor_mobile11: '',
                visitor_position11: '',

                visitor_name12: '',
                visitor_company12: '',
                visitor_mobile12: '',
                visitor_position12: '',

                visitor_name13: '',
                visitor_company13: '',
                visitor_mobile13: '',
                visitor_position13: '',

                visitor_name14: '',
                visitor_company14: '',
                visitor_mobile14: '',
                visitor_position14: '',

                visitor_name15: '',
                visitor_company15: '',
                visitor_mobile15: '',
                visitor_position15: '',

                visitor_name16: '',
                visitor_company16: '',
                visitor_mobile16: '',
                visitor_position16: '',

                visitor_name17: '',
                visitor_company17: '',
                visitor_mobile17: '',
                visitor_position17: '',

                visitor_name18: '',
                visitor_company18: '',
                visitor_mobile18: '',
                visitor_position18: '',

                visitor_name19: '',
                visitor_company19: '',
                visitor_mobile19: '',
                visitor_position19: '',

                visitor_name20: '',
                visitor_company20: '',
                visitor_mobile20: '',
                visitor_position20: '',

                employee: '', //填报人名称
                mobile: '', //填报人电话
                department: '', //填报人部门名称
                company: '', //填报人单位名称
                position: '', //填报人岗位

                remark: '', //备注说明

                userid: '',
                user_group_ids: '',
                user_group_names: '',
                user_admin_name: '',
                zone_name: '',

                status: '',
            },
            back: '/app',
            workflowlist: [],
            announces: [],
            informList: [],
            fileList: [],
            loading: false,
            officeList: [],
            addressList: [],
            tag: {
                showPicker: false,
                showPickerCommon: false,
                showPickerSealType: false,
                showPickerOrderType: false,
                showPickerJoinTime: false,
                showPickerDiploma: false,
            },
            searchFlag: false,
            dropMenuOldValue: '',
            dropMenuValue: '',
            dropMenuOption: [{
                    text: '刷新',
                    value: 2,
                    icon: 'replay'
                },
                {
                    text: '重置',
                    value: 4,
                    icon: 'aim'
                },
                {
                    text: '应用',
                    value: 5,
                    icon: 'apps-o'
                },
                {
                    text: '首页',
                    value: 6,
                    icon: 'wap-home-o'
                },
            ],
            statusType: Betools.workconfig.statusType,
            mailconfig: Betools.workconfig.mailconfig,
            config: Betools.workconfig.config,
            group: Betools.workconfig.group,
            currentKey: '',
            tablename: 'bs_visit_apply',
            readonly: false,
            goodstype: Betools.workconfig.goodstype,
            diplomaType: Betools.workconfig.compcolumns.diplomaTypeColumns,
            acceptType: Betools.workconfig.compcolumns.acceptType,
            commonTypeColumns: Betools.workconfig.compcolumns.commonTypeColumns,
            sealTypeColumns: Betools.workconfig.compcolumns.sealTypeColumns,
        }
    },
    async activated() {
        this.queryInfo();
    },
    async mounted() {
        this.queryInfo();
    },
    methods: {
        async typedTimeConfirm(value, index, resp) {
            console.log(value + ' ' + resp);
            const transfer_type = resp == '上午' ? '上午' : '下午';
            this.item.dtime = transfer_type;
        },
        // 企业微信登录处理函数
        async weworkLogin() {
            try {
                return await Betools.query.queryWeworkUser();
            } catch (error) {
                console.log(error);
            }
        },
        // 点击显示或者隐藏菜单
        async headMenuToggle() {
            this.$refs.headMenuItem.toggle();
        },
        // 点击顶部搜索
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
        // 点击右侧菜单
        async headDropMenu(value) {
            const val = this.dropMenuValue;
            switch (val) {
                case 0: //只显示合同类信息
                    break;
                case 1: //只显示非合同类信息
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
        // 查询来访地址
        async queryAddress() {
            if (!!this.item.address) {
                //从用户表数据中获取填报人资料
                let list = await Betools.manage.queryAddressByName(this.item.address.trim());
                if (!!list && Array.isArray(list)) {
                    try {
                        list.map((elem, index) => {
                            this.addressList.push({
                                id: elem.serialid,
                                zonename: elem.zonename,
                                userlist: elem.userlist,
                                reception: elem.userlist_reception,
                                reception_name: elem.userlist_reception_name,
                                name: elem.zonename,
                                tel: '',
                                address: elem.address,
                                company: '',
                                department: '',
                                mail: elem.email,
                                isDefault: !index
                            });
                        });
                        this.item.address = addressList[0].address; // 设置地址信息
                        this.item.zone_name = addressList[0].zonename;
                        this.item.userid = addressList[0].reception;
                        this.item.user_admin_name = addressList[0].reception_name;
                        this.addressList = this.addressList.filter((item, index) => {
                            let findex = this.addressList.findIndex((subitem, index) => {
                                return subitem.name == item.name
                            });
                            return index == findex;
                        });
                        await this.queryUserName();
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        // 选择来访地址
        async selectAddress(name, value) {
            //选择来访地址后，接待人员被相应带出，来访地址和接待人员是关联的
            this.item.address = name.address; // 设置地址信息
            this.item.zone_name = name.zonename;
            this.item.userid = name.reception;
            this.item.user_admin_name = name.reception_name;
            await this.queryUserName();
        },
        // 用户选择接待人员
        async queryUserName() {
            const user_admin_name = this.item.user_admin_name; //获取接待人员信息
            if (!!user_admin_name) {
                let user = await Betools.manage.queryUserByNameHRM(user_admin_name.trim()); //从用户表数据中获取填报人资料
                if (!!user && Array.isArray(user)) {
                    this.userList = [];
                    try {
                        user.map((elem, index) => {
                            let company = elem.textfield1.split('||')[0];
                            company = company.slice(company.lastIndexOf('>') + 1);
                            let department = elem.textfield1.split('||')[1];
                            department = department.slice(department.lastIndexOf('>') + 1);
                            this.userList.push({
                                id: elem.loginid,
                                name: elem.lastname,
                                tel: '',
                                address: company + "||" + elem.textfield1.split('||')[1],
                                company: company,
                                department: department,
                                mail: elem.email,
                                isDefault: !index
                            });
                        });
                        this.item.user_admin_name = user[0].lastname; //获取盖印人姓名
                        this.item.userid = this.userid = user[0].loginid; //当前盖印人编号
                        this.userList = this.userList.filter((item, index) => {
                            item.isDefault = index == 0 ? true : false;
                            let findex = this.userList.findIndex((subitem, index) => {
                                return subitem.id == item.id
                            });
                            return index == findex;
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        },
        // 选中当前接待人员
        async selectUserName(value) {
            const id = this.userid;
            const user = this.userList.find((item, index) => {
                return id == item.id
            }); //获取接待人员姓名
            this.item.userid = id;
            this.item.user_admin_name = user.name;
        },
        // 设置重置
        async reduction() {
            this.item = {
                id: '',
                serialid: '',
                time: dayjs().format('YYYY-MM-DD'),
                dtime: '上午',
                create_by: '',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),

                visitor_name: '', //访客姓名
                visitor_company: '', //访客单位
                visitor_mobile: '', //访客电话
                visitor_position: '', //访客职务

                visitor_name1: '',
                visitor_company1: '',
                visitor_mobile1: '',
                visitor_position1: '',

                visitor_name2: '',
                visitor_company2: '',
                visitor_mobile2: '',
                visitor_position2: '',

                visitor_name3: '',
                visitor_company3: '',
                visitor_mobile3: '',
                visitor_position3: '',

                visitor_name4: '',
                visitor_company4: '',
                visitor_mobile4: '',
                visitor_position4: '',

                visitor_name5: '',
                visitor_company5: '',
                visitor_mobile5: '',
                visitor_position5: '',

                visitor_name6: '',
                visitor_company6: '',
                visitor_mobile6: '',
                visitor_position6: '',

                visitor_name7: '',
                visitor_company7: '',
                visitor_mobile7: '',
                visitor_position7: '',

                visitor_name8: '',
                visitor_company8: '',
                visitor_mobile8: '',
                visitor_position8: '',

                visitor_name9: '',
                visitor_company9: '',
                visitor_mobile9: '',
                visitor_position9: '',

                visitor_name10: '',
                visitor_company10: '',
                visitor_mobile10: '',
                visitor_position10: '',

                visitor_name11: '',
                visitor_company11: '',
                visitor_mobile11: '',
                visitor_position11: '',

                visitor_name12: '',
                visitor_company12: '',
                visitor_mobile12: '',
                visitor_position12: '',

                visitor_name13: '',
                visitor_company13: '',
                visitor_mobile13: '',
                visitor_position13: '',

                visitor_name14: '',
                visitor_company14: '',
                visitor_mobile14: '',
                visitor_position14: '',

                visitor_name15: '',
                visitor_company15: '',
                visitor_mobile15: '',
                visitor_position15: '',

                visitor_name16: '',
                visitor_company16: '',
                visitor_mobile16: '',
                visitor_position16: '',

                visitor_name17: '',
                visitor_company17: '',
                visitor_mobile17: '',
                visitor_position17: '',

                visitor_name18: '',
                visitor_company18: '',
                visitor_mobile18: '',
                visitor_position18: '',

                visitor_name19: '',
                visitor_company19: '',
                visitor_mobile19: '',
                visitor_position19: '',

                visitor_name20: '',
                visitor_company20: '',
                visitor_mobile20: '',
                visitor_position20: '',

                employee: '', //填报人名称
                mobile: '', //填报人电话
                department: '', //填报人部门名称
                company: '', //填报人单位名称
                position: '', //填报人岗位

                remark: '', //备注说明

                userid: '',
                user_group_ids: '',
                user_group_names: '',
                user_admin_name: '',

                status: '',
            };
        },
        // 获取处理日志
        async queryProcessLog() {

            const id = Betools.tools.getUrlParam('id');
            const pid = Betools.tools.getUrlParam('pid');

            try {
                this.processLogList = await Betools.workflow.queryPRLogHistoryByDataID(id);

                //如果查询出出来记录，则将处理记录排序
                if (this.processLogList && this.processLogList.length > 0) {

                    this.processLogList.map(item => {
                        item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm')
                    });
                    this.processLogList.sort();

                    //获取最后一条处理记录，如果是已完成，或者已驳回，则删除待办记录
                    const temp = this.processLogList[this.processLogList.length - 1];

                    //检查状态并删除多余记录
                    if ((temp.action == '完成' && temp.action_opinion.includes('已完成')) || (temp.action == '确认' && temp.action_opinion.includes('已驳回'))) {
                        await this.deleteProcessLog();
                    }

                }

            } catch (error) {
                console.log(error);
            }
        },
        // 删除处理日志
        async deleteProcessLog() {

            const id = Betools.tools.getUrlParam('id');
            const pid = Betools.tools.getUrlParam('pid');

            //查询业务编号，如果不存在，则直接返回
            if (Betools.tools.isNull(id) || Betools.tools.isNull(pid)) {
                return;
            }

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

            if (userinfo) {
                //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
                let tlist = await Betools.task.queryProcessLogWaitSeal(userinfo.username, userinfo.realname, 0, 1000);

                //过滤出只关联当前流程的待办数据
                tlist = tlist.filter(item => {
                    return item.id == id && item.pid == pid;
                });

                if (tlist.length > 0) {
                    //同时删除本条待办记录当前(印章管理员)
                    await Betools.workflow.deleteViewProcessLog(tlist);
                }
            }

        },

        // 选中当前盖印人
        async selectFrontUser(value) {
            const id = this.item.front_id;
            const user = this.fuserList.find((item, index) => {
                return id == item.id
            });
            this.item.front_name = user.name; //获取盖印人姓名
            this.item.front_id = id;
        },
        // 字段必填有效验证
        validField(fieldName) {
            //获取用户基础信息
            let userinfo = Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

            // 邮箱验证正则表达式
            const regMail = Betools.workconfig.system.config.regexp.mail;

            if (fieldName.toLocaleLowerCase().includes('amount') && /^\+?[1-9][0-9]*$/.test(this.item[fieldName])) {
                this.message[fieldName] = /^\+?[1-9][0-9]*$/.test(this.item[fieldName]) ? '请填写借用数量及借用单位，注意单位！' : '';
                return Betools.tools.isNull(this.message[fieldName]);
            }

            if (fieldName.toLocaleLowerCase().includes('mail') && !regMail.test(this.item[fieldName])) {
                this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
                return Betools.tools.isNull(this.message[fieldName]);
            }

            this.message[fieldName] = Betools.tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';
            Betools.storage.setStore(`system_${this.tablename}_item#${this.item.type}#@${userinfo.realname}`, JSON.stringify(this.item), 3600 * 2);

            return Betools.tools.isNull(this.message[fieldName]);
        },

        // 获取URL或者二维码信息
        async queryInfo() {

            try {
                this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
                this.userinfo = await this.weworkLogin(); //查询当前登录用户
                this.back = Betools.tools.getUrlParam('back') || '/app'; //查询上一页

                //获取用户基础信息
                const userinfo = await Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

                //自动回显刚才填写的用户基础信息
                this.item.create_by = userinfo.realname;
                this.item.employee = userinfo.username || userinfo.userid;
                this.item.department = userinfo.department.name;
                this.item.company = userinfo.parent_company.name;
                this.item.mobile = userinfo.mobile;
                this.item.position = userinfo.position;
                this.item.create_time = dayjs().format('YYYY-MM-DD HH:mm:ss');

            } catch (error) {
                console.log(error);
            }

        },

        // 用户提交入职登记表函数
        async handleApply() {

            //显示加载状态
            this.loading = true;

            //获取用户基础信息
            const userinfo = await Betools.storage.getStore('system_userinfo') || Betools.workconfig.commonUserInfo;

            //表单ID
            const id = Betools.tools.queryUniqueID();
            const type = Betools.tools.getUrlParam('type');

            //验证数据是否已经填写
            const keys = Object.keys({})

            const invalidKey = keys.find(key => {
                const flag = this.validField(key);
                return !flag;
            });

            if (invalidKey != '' && invalidKey != null) {
                await vant.Dialog.alert({
                    title: '温馨提示',
                    message: `请确认内容是否填写完整，错误：${this.message[invalidKey]}！`,
                });
                return false;
            }

            //未获取到选择的客户接待人员
            if (Betools.tools.isNull(this.item.userid)) {
                //弹出确认提示
                return await vant.Dialog.alert({
                    title: '温馨提示',
                    message: '请输入客户接待并点击人员列表，选择客户接待员！',
                });
            }

            //查询直接所在工作组
            const response = await Betools.query.queryRoleGroupList('COMMON_RECEIVE_BORROW', this.item.userid);

            //获取到印章管理员组信息
            let user_group_ids = response && response.length > 0 ? response[0].userlist : '';
            let user_group_names = response && response.length > 0 ? response[0].enuserlist : '';
            let zone = response && response.length > 0 ? response[0].zonename : '';
            let visitors = '';

            //如果未获取用户名称，则直接设置用印人为分组成员
            if (Betools.tools.isNull(user_group_ids)) {
                user_group_ids = this.item.userid;
                user_group_names = this.item.user_admin_name;
            }

            // 返回预览URL
            const receiveURL = encodeURIComponent(`${window.BECONFIG.domain.replace('www','wechat')}/#/app/visitorview?id=${id}&statustype=office&type=${type}&role=front`);

            //第一步 保存用户数据到数据库中
            const elem = {
                id,
                create_by: this.item.create_by,
                employee: this.item.employee,
                department: this.item.department,
                company: this.item.company,
                mobile: this.item.mobile,
                position: this.item.position,
                create_time: this.item.create_time,

                visitor_name: this.item.visitor_name,
                visitor_company: this.item.visitor_company,
                visitor_mobile: this.item.visitor_mobile,
                visitor_position: this.item.visitor_position,

                time: this.item.time,
                dtime: this.item.dtime,
                address: this.item.address,
                zone_name: this.item.zone_name,
                zone,
                userid: this.item.userid,
                user_admin_name: this.item.user_admin_name,
                user_group_ids,
                user_group_names,
                pid: id,
                status: 'init',
            }; // 待处理元素

            visitors = `${elem.visitor_name}(${elem.visitor_company} 电话:${elem.visitor_mobile.slice(0,3) + '****' + elem.visitor_mobile.slice(-4)})`;

            //第二步，向表单提交form对象数据
            const result = await Betools.manage.postTableData(this.tablename, elem);

            //计算批量物品
            const tsize = this.size - 1;

            if (tsize >= 1) {

                for (let i = 1; i <= tsize; i++) {

                    let element = {
                        id: Betools.tools.queryUniqueID(),
                        create_by: this.item.create_by,
                        employee: this.item.employee,
                        department: this.item.department,
                        company: this.item.company,
                        mobile: this.item.mobile,
                        position: this.item.position,
                        create_time: this.item.create_time,

                        visitor_name: this.item['visitor_name' + i],
                        visitor_company: this.item['visitor_company'],
                        visitor_mobile: this.item['visitor_mobile' + i],
                        visitor_position: this.item['visitor_position' + i],

                        time: this.item.time,
                        dtime: this.item.dtime,
                        address: this.item.address,
                        zone_name: this.item.zone_name,
                        zone,
                        userid: this.item.userid,
                        user_admin_name: this.item.user_admin_name,
                        user_group_ids,
                        user_group_names,

                        pid: id,
                        status: 'init',
                    };

                    //向表单提交form对象数据
                    await Betools.manage.postTableData(this.tablename, element);

                    visitors += `,${element.visitor_name}(${element.visitor_company} 电话:${element.visitor_mobile.slice(0,3) + '****' + element.visitor_mobile.slice(-4)})`;
                }
            }

            //发送自动设置排序号请求
            const patchResp = await superagent.get(Betools.workconfig.queryAPI.tableSerialAPI.replace('{table_name}', this.tablename)).set('accept', 'json');

            //查询数据
            const value = await Betools.query.queryTableData(this.tablename, id);

            //显示序列号
            this.item.serialid = value.serialid;

            //第三步 向物品管理员推送通知，已准备办公用品等
            await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${user_group_ids}/访客预约通知：${visitors}等人，将于${elem.time}到访，请知悉！?rurl=${receiveURL}`)
                .set('accept', 'json');

            /************************  工作流程日志(开始)  ************************/

            //获取后端配置前端管理员组
            const front = user_group_ids;
            const front_name = user_group_names;

            //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
            const prLogHisNode = {
                id: Betools.tools.queryUniqueID(),
                table_name: this.tablename,
                main_value: id,
                proponents: userinfo.username,
                business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                business_code: '000000000', //varchar(100)  null comment '业务编号',
                process_name: '预约流程审批', //varchar(100)  null comment '流程名称',
                employee: userinfo.realname, //varchar(1000) null comment '操作职员',
                approve_user: userinfo.username, //varchar(100)  null comment '审批人员',
                action: '发起', //varchar(100)  null comment '操作动作',
                action_opinion: '发起预约申请[待处理]', //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: userinfo.position, //varchar(100)  null comment '职能岗位',
                process_station: '预约审批[访客预约]', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                content: `访客预约(${this.item.type}) ` + this.item.name + ' #经办人: ' + userinfo.username, //text          null comment '业务内容',
                process_audit: this.item.id + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
                origin_data: '',
            }

            await Betools.workflow.approveViewProcessLog(prLogHisNode);

            //同时推送一条待办记录给印章管理员

            //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
            const prLogNode = {
                id: Betools.tools.queryUniqueID(),
                table_name: this.tablename,
                main_value: id,
                proponents: front,
                business_data_id: id, //varchar(100)  null comment '业务数据主键值',
                business_code: '000000000', //varchar(100)  null comment '业务编号',
                process_name: '预约流程审批', //varchar(100)  null comment '流程名称',
                employee: front_name, //varchar(1000) null comment '操作职员',
                approve_user: front, //varchar(100)  null comment '审批人员',
                action: '', //varchar(100)  null comment '操作动作',
                action_opinion: '审批预约申请', //text          null comment '操作意见',
                operate_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '操作时间',
                functions_station: '前台', //varchar(100)  null comment '职能岗位',
                process_station: '预约审批[预约预约]', //varchar(100)  null comment '流程岗位',
                business_data: JSON.stringify(this.item), //text          null comment '业务数据',
                content: `预约预约(${this.item.type}) ` + this.item.name + '#待处理 #经办人: ' + userinfo.username, //text          null comment '业务内容',
                process_audit: this.item.id + '##' + this.item.serialid, //varchar(100)  null comment '流程编码',
                create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'), //datetime      null comment '创建日期',
                relate_data: '', //text          null comment '关联数据',
                origin_data: '',
            }

            await Betools.workflow.taskViewProcessLog(prLogNode);

            /************************  工作流程日志(结束)  ************************/

            //设置状态
            this.loading = false;
            this.status = elem.status;
            this.readonly = true;

            //弹出确认提示
            await vant.Dialog.alert({
                title: '温馨提示',
                message: '已提交访客预约申请！',
            });

        }
    }
}
</script>

<style>
</style>
<style scoped>
@import "../../assets/css/explore.css";
@import "../../assets/css/sealinfo.css";
@import "../../assets/css/goodsreceive.css";
</style>
