<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" style="overflow-x: hidden;" >
        <div class="center" >
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>物品领用确认</span>
            <van-dropdown-menu id="header-drop-menu" class="header-drop-menu" @change="headDropMenu();" z-index="100" style="position: absolute; width: 45px; height: auto; right: -15px; top: -3px; opacity: 1; background:#1b1b1b; ">
              <van-icon name="weapp-nav" size="1.3rem" @click="headMenuToggle" style="position: absolute; width: 40px; height: auto; right: 15px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
              <van-dropdown-item v-model="dropMenuValue" ref="headMenuItem" :options="dropMenuOption" @change="headDropMenu();" />
            </van-dropdown-menu>
        </div>
    </header>

    <section>

      <div class="weui-cells" style="margin-top:0px;">

        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
          <van-notice-bar
              v-show=" title!='' && title != null && typeof title != 'undefined' "
              left-icon="volume-o"
              color="#1989fa"
              background="#ecf9ff"
              :text="title"
            />
        </div>

        <div class="" id="scanCell" style="padding: 8px 10px 4px 10px;">
          <van-row>
            <van-col span="8"></van-col>
            <van-col span="8" style="text-align: center;font-size:1.15rem;">办公用品预约</van-col>
            <van-col span="8"></van-col>
          </van-row>
        </div>

      </div>

      <div class="wechat-list" style="background-color:#fefefe;margin-top:0px;border-bottom:0px solid #fefefe;">
        <div class="weui-cells" style="margin-top:0px;border-bottom:0px solid #fefefe;">
        </div>
        <div class="weui-cells" style="margin-top:0px;margin-left:10px;padding-top:5px;padding-bottom:15px;border-bottom:0px solid #fefefe;">

          <van-cell-group>

            <van-form >

              <van-cell-group style="margin-top:10px;">

                <van-cell value="基础信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-field v-show="item.serialid" clearable label="流水序号" v-model="item.serialid" placeholder="系统自动生成序号！" readonly />

                <van-field :readonly="readonly" :required="false" clearable label="预约时间" v-model="item.time"  placeholder="请填写预约时间！" @blur="validField('time')" :error-message="message.time"  />
                <van-field :readonly="readonly" :required="false" clearable label="访客单位" v-model="item.visitor_company"  placeholder="请填写来访单位！" @blur="validField('visitor_company')" :error-message="message.visitor_company"  />


                <van-field :readonly="readonly" required clearable label="访客姓名" v-model="item.visitor_name"     placeholder="请填写访客姓名！" @blur="validField('visitor_name')" :error-message="message.visitor_name"  />
                <van-field :readonly="readonly" required clearable label="访客职务" v-model="item.visitor_position" placeholder="请填写访客职务！" @blur="validField('visitor_position')" :error-message="message.visitor_position"  />
                <van-field :readonly="readonly" required clearable label="访客电话" v-model="item.visitor_mobile"   placeholder="请填写访客电话！" @blur="validField('visitor_mobile')" :error-message="message.visitor_mobile"  />

                <van-icon name="add-o" style="position:absolute;top:115px;right:0px;" @click="size <= 20 ? size++ : size;"/>
                <van-icon name="circle" style="position:absolute;top:155px;right:0px;" @click="size > 1 ? size-- : size;"  />
                <span class="van-goods-span-number" style="top:130px;">#1</span>

              </van-cell-group>

              <van-cell-group v-show="size>=2" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name1"  placeholder="请填写访客姓名！" @blur="validField('visitor_name1')" :error-message="message.visitor_name1"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position1" placeholder="请填写访客职务！" @blur="validField('visitor_position1')" :error-message="message.visitor_position1"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile1"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile1')" :error-message="message.visitor_mobile1"  />
                <span class="van-goods-span-number">#2</span>

              </van-cell-group>

              <van-cell-group v-show="size>=3" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name2"  placeholder="请填写访客姓名！" @blur="validField('visitor_name2')" :error-message="message.visitor_name2"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position2" placeholder="请填写访客职务！" @blur="validField('visitor_position2')" :error-message="message.visitor_position2"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile2"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile2')" :error-message="message.visitor_mobile2"  />
                <span class="van-goods-span-number">#3</span>
              </van-cell-group>

              <van-cell-group v-show="size>=4" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">

                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name3"  placeholder="请填写访客姓名！" @blur="validField('visitor_name3')" :error-message="message.visitor_name3"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position3" placeholder="请填写访客职务！" @blur="validField('visitor_position3')" :error-message="message.visitor_position3"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile3"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile3')" :error-message="message.visitor_mobile3"  />
                <span class="van-goods-span-number">#4</span>

              </van-cell-group>

              <van-cell-group v-show="size>=5" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name4"  placeholder="请填写访客姓名！" @blur="validField('visitor_name4')" :error-message="message.visitor_name4"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position4" placeholder="请填写访客职务！" @blur="validField('visitor_position4')" :error-message="message.visitor_position4"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile4"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile4')" :error-message="message.visitor_mobile4"  />

                <span class="van-goods-span-number">#5</span>
              </van-cell-group>

              <van-cell-group v-show="size>=6" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name5"  placeholder="请填写访客姓名！" @blur="validField('visitor_name5')" :error-message="message.visitor_name5"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position5" placeholder="请填写访客职务！" @blur="validField('visitor_position5')" :error-message="message.visitor_position5"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile5"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile5')" :error-message="message.visitor_mobile5"  />

                <span class="van-goods-span-number">#6</span>
              </van-cell-group>

              <van-cell-group v-show="size>=7" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name6"  placeholder="请填写访客姓名！" @blur="validField('visitor_name6')" :error-message="message.visitor_name6"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position6" placeholder="请填写访客职务！" @blur="validField('visitor_position6')" :error-message="message.visitor_position6"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile6"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile6')" :error-message="message.visitor_mobile6"  />

                <span class="van-goods-span-number">#7</span>
              </van-cell-group>

              <van-cell-group v-show="size>=8" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name7"  placeholder="请填写访客姓名！" @blur="validField('visitor_name7')" :error-message="message.visitor_name7"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position7" placeholder="请填写访客职务！" @blur="validField('visitor_position7')" :error-message="message.visitor_position7"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile7"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile7')" :error-message="message.visitor_mobile7"  />

                <span class="van-goods-span-number">#8</span>
              </van-cell-group>

              <van-cell-group v-show="size>=9" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name8"  placeholder="请填写访客姓名！" @blur="validField('visitor_name8')" :error-message="message.visitor_name8"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position8" placeholder="请填写访客职务！" @blur="validField('visitor_position8')" :error-message="message.visitor_position8"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile8"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile8')" :error-message="message.visitor_mobile8"  />

                <span class="van-goods-span-number">#9</span>
              </van-cell-group>

              <van-cell-group v-show="size>=10" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name9"  placeholder="请填写访客姓名！" @blur="validField('visitor_name9')" :error-message="message.visitor_name9"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position9" placeholder="请填写访客职务！" @blur="validField('visitor_position9')" :error-message="message.visitor_position9"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile9"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile9')" :error-message="message.visitor_mobile9"  />

                <span class="van-goods-span-number">#10</span>
              </van-cell-group>

              <van-cell-group v-show="size>=11" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name10"  placeholder="请填写访客姓名！" @blur="validField('visitor_name10')" :error-message="message.visitor_name10"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position10" placeholder="请填写访客职务！" @blur="validField('visitor_position10')" :error-message="message.visitor_position10"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile10"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile10')" :error-message="message.visitor_mobile10"  />

                <span class="van-goods-span-number">#11</span>
              </van-cell-group>

              <van-cell-group v-show="size>=12" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name11"  placeholder="请填写访客姓名！" @blur="validField('visitor_name11')" :error-message="message.visitor_name11"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position11" placeholder="请填写访客职务！" @blur="validField('visitor_position11')" :error-message="message.visitor_position11"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile11"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile11')" :error-message="message.visitor_mobile11"  />

                <span class="van-goods-span-number">#12</span>
              </van-cell-group>

              <van-cell-group v-show="size>=13" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name12"  placeholder="请填写访客姓名！" @blur="validField('visitor_name12')" :error-message="message.visitor_name12"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position12" placeholder="请填写访客职务！" @blur="validField('visitor_position12')" :error-message="message.visitor_position12"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile12"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile12')" :error-message="message.visitor_mobile12"  />

                <span class="van-goods-span-number">#13</span>
              </van-cell-group>

              <van-cell-group v-show="size>=14" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name13"  placeholder="请填写访客姓名！" @blur="validField('visitor_name13')" :error-message="message.visitor_name13"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position13" placeholder="请填写访客职务！" @blur="validField('visitor_position13')" :error-message="message.visitor_position13"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile13"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile13')" :error-message="message.visitor_mobile13"  />

                <span class="van-goods-span-number">#14</span>
              </van-cell-group>

              <van-cell-group v-show="size>=15" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name14"  placeholder="请填写访客姓名！" @blur="validField('visitor_name14')" :error-message="message.visitor_name14"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position14" placeholder="请填写访客职务！" @blur="validField('visitor_position14')" :error-message="message.visitor_position14"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile14"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile14')" :error-message="message.visitor_mobile14"  />

                <span class="van-goods-span-number">#15</span>
              </van-cell-group>

              <van-cell-group v-show="size>=16" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name15"  placeholder="请填写访客姓名！" @blur="validField('visitor_name15')" :error-message="message.visitor_name15"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position15" placeholder="请填写访客职务！" @blur="validField('visitor_position15')" :error-message="message.visitor_position15"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile15"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile15')" :error-message="message.visitor_mobile15"  />

                <span class="van-goods-span-number">#16</span>
              </van-cell-group>

              <van-cell-group v-show="size>=17" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name16"  placeholder="请填写访客姓名！" @blur="validField('visitor_name16')" :error-message="message.visitor_name16"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position16" placeholder="请填写访客职务！" @blur="validField('visitor_position16')" :error-message="message.visitor_position16"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile16"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile16')" :error-message="message.visitor_mobile16"  />

                <span class="van-goods-span-number">#17</span>
              </van-cell-group>

              <van-cell-group v-show="size>=18" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name17"  placeholder="请填写访客姓名！" @blur="validField('visitor_name17')" :error-message="message.visitor_name17"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position17" placeholder="请填写访客职务！" @blur="validField('visitor_position17')" :error-message="message.visitor_position17"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile17"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile17')" :error-message="message.visitor_mobile17"  />

                <span class="van-goods-span-number">#18</span>
              </van-cell-group>

              <van-cell-group v-show="size>=19" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name18"  placeholder="请填写访客姓名！" @blur="validField('visitor_name18')" :error-message="message.visitor_name18"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position18" placeholder="请填写访客职务！" @blur="validField('visitor_position18')" :error-message="message.visitor_position18"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile18"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile18')" :error-message="message.visitor_mobile18"  />

                <span class="van-goods-span-number">#19</span>
              </van-cell-group>

              <van-cell-group v-show="size>=20" style="margin-top:10px;position:relative;border-top:0px solid #fefefe;">


                <van-field :readonly="readonly"  clearable label="访客姓名" v-model="item.visitor_name19"  placeholder="请填写访客姓名！" @blur="validField('visitor_name19')" :error-message="message.visitor_name19"  />
                <van-field :readonly="readonly"  clearable label="访客职务" v-model="item.visitor_position19" placeholder="请填写访客职务！" @blur="validField('visitor_position19')" :error-message="message.visitor_position19"  />
                <van-field :readonly="readonly"  clearable label="访客电话" v-model="item.visitor_mobile19"  placeholder="请填写访客电话！" @blur="validField('visitor_mobile19')" :error-message="message.visitor_mobile19"  />

                <span class="van-goods-span-number">#20</span>
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="登记人员" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :readonly="readonly" required clearable label="填报人员" v-model="item.create_by"  placeholder="请填写您的姓名！" @blur="validField('receive_name')" :error-message="message.receive_name"  />
                <van-field :readonly="readonly" required clearable label="职务名称" v-model="item.position" placeholder="请填写您的单位名称！" @blur="validField('company')" :error-message="message.company"/>
                <van-field :readonly="readonly" required clearable label="联系电话" v-model="item.mobile" placeholder="请填写您的部门名称！" @blur="validField('department');" :error-message="message.department" />

              </van-cell-group>

              <van-cell-group id="van-user-list" class="van-user-list" style="margin-top:10px;">
                <van-cell value="接待管理" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field required clearable label="客户接待" v-model="item.user_admin_name" placeholder="请输入客服接待员!"  />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="备注说明" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :readonly="readonly" :required="false" clearable label="备注说明" v-model="item.remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="请填写备注说明信息，如相关流程，特殊事项及情况！" />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-show="!!item.status">
                <van-cell value="流程状态" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 流程状态（HR需要确认/修改） -->
                <van-field :readonly="true" :required="false" clearable label="流程状态" v-model="item.status"   />
              </van-cell-group>

              <van-cell-group v-show="((item.status == '待处理' || item.status == '已驳回' ) && !item.disagree_remark) || item.disagree_remark" style="margin-top:10px;" >
                <van-cell value="驳回原因" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <van-field :readonly="readonly" :required="false" clearable label="驳回原因" v-model="item.disagree_remark"  rows="2" autosize type="textarea"  maxlength="256"  placeholder="驳回申请时，请填写驳回理由！" />
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

          <div v-show="item.status ==='待处理' && role == 'front' " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ffd01e, #ff8917)" type="warning" text="作废"  @click="handleDisagree();" style="border-radius: 10px 10px 10px 10px;margin-right:10px;width:46.5%;float:left;" />
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;float:right;width:46.5%;"  >确认</van-button>
          </div>

          <div v-show="item.status ==='已领取' && (role == 'receive' || role == 'front') " style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFinaly();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >完成</van-button>
          </div>

          <div style="height:500px;" ></div>
        </div>
      </div>

    </section>

  </div>
  </keep-alive>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as announce from '@/request/announce';
import * as task from '@/request/task';
import * as query from '@/request/query';
import * as constant from '@/request/constant';
import * as workflow from '@/request/workflow';
import * as manageAPI from '@/request/manage';
import * as wflowprocess from '@/request/wflow.process';
import * as workconfig from '@/request/workconfig';

export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "详情",
            momentNewMsg: true,
            tabname: '1',
            active: 1,
            id:'',
            type:'',
            title:'访客登记',
            content:'',
            files:'',
            from:'',
            tname:'',
            bname:'',
            tasktype:'done',
            previewurl:'',
            purl:'',
            tableInfo:'',
            orderInfo:'',
            status:'',
            status_type:'',
            fields:[],
            groupid:'group00',
            sealuserid:'',
            huserid:'',
            huserList:[],
            auserid:'',
            auserList:[],
            fuserid:'',
            fuserList:[],
            muserid:'',
            muserList:[],
            processLogList:[],
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            role:'front',
            size:15,
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              serialid:'',
              time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),

              visitor_name:'',     //访客姓名
              visitor_company:'',  //访客单位
              visitor_mobile:'',   //访客电话
              visitor_position:'', //访客职务

              visitor_name1:'',
              visitor_company1:'',
              visitor_mobile1:'',
              visitor_position1:'',

              visitor_name2:'',
              visitor_company2:'',
              visitor_mobile2:'',
              visitor_position2:'',

              visitor_name3:'',
              visitor_company3:'',
              visitor_mobile3:'',
              visitor_position3:'',

              visitor_name4:'',
              visitor_company4:'',
              visitor_mobile4:'',
              visitor_position4:'',

              visitor_name5:'',
              visitor_company5:'',
              visitor_mobile5:'',
              visitor_position5:'',

              visitor_name6:'',
              visitor_company6:'',
              visitor_mobile6:'',
              visitor_position6:'',

              visitor_name7:'',
              visitor_company7:'',
              visitor_mobile7:'',
              visitor_position7:'',

              visitor_name8:'',
              visitor_company8:'',
              visitor_mobile8:'',
              visitor_position8:'',

              visitor_name9:'',
              visitor_company9:'',
              visitor_mobile9:'',
              visitor_position9:'',

              visitor_name10:'',
              visitor_company10:'',
              visitor_mobile10:'',
              visitor_position10:'',

              visitor_name11:'',
              visitor_company11:'',
              visitor_mobile11:'',
              visitor_position11:'',

              visitor_name12:'',
              visitor_company12:'',
              visitor_mobile12:'',
              visitor_position12:'',

              visitor_name13:'',
              visitor_company13:'',
              visitor_mobile13:'',
              visitor_position13:'',

              visitor_name14:'',
              visitor_company14:'',
              visitor_mobile14:'',
              visitor_position14:'',

              visitor_name15:'',
              visitor_company15:'',
              visitor_mobile15:'',
              visitor_position15:'',

              visitor_name16:'',
              visitor_company16:'',
              visitor_mobile16:'',
              visitor_position16:'',

              visitor_name17:'',
              visitor_company17:'',
              visitor_mobile17:'',
              visitor_position17:'',

              visitor_name18:'',
              visitor_company18:'',
              visitor_mobile18:'',
              visitor_position18:'',

              visitor_name19:'',
              visitor_company19:'',
              visitor_mobile19:'',
              visitor_position19:'',

              visitor_name20:'',
              visitor_company20:'',
              visitor_mobile20:'',
              visitor_position20:'',

              employee:'',  //填报人名称
              mobile:'',    //填报人电话
              department:'',//填报人部门名称
              company:'',   //填报人单位名称
              position:'',  //填报人岗位

              remark:'',//备注说明

              userid:'',
              user_group_ids:'',
              user_group_names:'',
              user_admin_name:'',

              status: '',
            },
            tlist:[],
            back:'/app',
            workflowlist:[],
            announces:[],
            informList:[],
            fileList:[],
            loading:false,
            officeList:[],
            tag:{
              showPicker: false,
              showPickerCommon: false,
              showPickerSealType: false,
              showPickerOrderType: false,
              showPickerJoinTime: false,
              showPickerDiploma: false,
            },
            searchFlag: false,
            dropMenuOldValue:'',
            dropMenuValue:'',
            dropMenuOption: [
              { text: '刷新', value: 2 , icon: 'replay' },
              { text: '应用', value: 5 , icon: 'apps-o' },
              { text: '首页', value: 6 , icon: 'wap-home-o' },
            ],
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,
            currentKey:'',
            tablename:'bs_visit_apply',
            readonly: false,
            goodstype: workconfig.goodstype,
            diplomaType: workconfig.compcolumns.diplomaTypeColumns,
            acceptType: workconfig.compcolumns.acceptType,
            commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
        }
    },
    async activated() {
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    methods: {
      // 企业微信登录处理函数
      async weworkLogin(){
        try {
          return await query.queryWeworkUser();
        } catch (error) {
          console.log(error);
        }
      },
      // 点击显示或者隐藏菜单
      async headMenuToggle(){
        this.$refs.headMenuItem.toggle();
      },
      // 点击顶部搜索
      async headMenuSearch(){
        if(this.searchWord){
          //刷新相应表单
          this.queryTabList(this.tabname);
          //显示搜索状态
          vant.Toast('搜索...');
          //等待一下
          await tools.sleep(300);
        }
        //显示刷新消息
        this.searchFlag = false;
      },
      // 点击右侧菜单
      async headDropMenu(value){
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
      async reduction(){
        this.item = {
              id: '',
              serialid:'',
              time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),

              visitor_name:'',     //访客姓名
              visitor_company:'',  //访客单位
              visitor_mobile:'',   //访客电话
              visitor_position:'', //访客职务

              visitor_name1:'',
              visitor_company1:'',
              visitor_mobile1:'',
              visitor_position1:'',

              visitor_name2:'',
              visitor_company2:'',
              visitor_mobile2:'',
              visitor_position2:'',

              visitor_name3:'',
              visitor_company3:'',
              visitor_mobile3:'',
              visitor_position3:'',

              visitor_name4:'',
              visitor_company4:'',
              visitor_mobile4:'',
              visitor_position4:'',

              visitor_name5:'',
              visitor_company5:'',
              visitor_mobile5:'',
              visitor_position5:'',

              visitor_name6:'',
              visitor_company6:'',
              visitor_mobile6:'',
              visitor_position6:'',

              visitor_name7:'',
              visitor_company7:'',
              visitor_mobile7:'',
              visitor_position7:'',

              visitor_name8:'',
              visitor_company8:'',
              visitor_mobile8:'',
              visitor_position8:'',

              visitor_name9:'',
              visitor_company9:'',
              visitor_mobile9:'',
              visitor_position9:'',

              visitor_name10:'',
              visitor_company10:'',
              visitor_mobile10:'',
              visitor_position10:'',

              visitor_name11:'',
              visitor_company11:'',
              visitor_mobile11:'',
              visitor_position11:'',

              visitor_name12:'',
              visitor_company12:'',
              visitor_mobile12:'',
              visitor_position12:'',

              visitor_name13:'',
              visitor_company13:'',
              visitor_mobile13:'',
              visitor_position13:'',

              visitor_name14:'',
              visitor_company14:'',
              visitor_mobile14:'',
              visitor_position14:'',

              visitor_name15:'',
              visitor_company15:'',
              visitor_mobile15:'',
              visitor_position15:'',

              visitor_name16:'',
              visitor_company16:'',
              visitor_mobile16:'',
              visitor_position16:'',

              visitor_name17:'',
              visitor_company17:'',
              visitor_mobile17:'',
              visitor_position17:'',

              visitor_name18:'',
              visitor_company18:'',
              visitor_mobile18:'',
              visitor_position18:'',

              visitor_name19:'',
              visitor_company19:'',
              visitor_mobile19:'',
              visitor_position19:'',

              visitor_name20:'',
              visitor_company20:'',
              visitor_mobile20:'',
              visitor_position20:'',

              employee:'',  //填报人名称
              mobile:'',    //填报人电话
              department:'',//填报人部门名称
              company:'',   //填报人单位名称
              position:'',  //填报人岗位

              remark:'',//备注说明

              userid:'',
              user_group_ids:'',
              user_group_names:'',
              user_admin_name:'',

              status: '',
            };
      },
      // 获取处理日志
      async queryProcessLog(){

        const id = tools.getUrlParam('id');
        const pid = tools.getUrlParam('pid');

        try {
          this.processLogList = await workflow.queryPRLogHistoryByDataID(id);

          //如果查询出出来记录，则将处理记录排序
          if(this.processLogList && this.processLogList.length > 0){

            this.processLogList.map(item => { item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm') });
            this.processLogList.sort();

            //获取最后一条处理记录，如果是已完成，或者已驳回，则删除待办记录
            const temp = this.processLogList[this.processLogList.length - 1];

            //检查状态并删除多余记录
            if((temp.action == '完成' && temp.action_opinion.includes('已完成')) || (temp.action == '确认' && temp.action_opinion.includes('已驳回')) ){
              await this.deleteProcessLog();
            }

          }

        } catch (error) {
          console.log(error);
        }
      },
      // 删除流程日志
      async deleteProcessLog(){

        const id = tools.getUrlParam('id');
        const pid = tools.getUrlParam('pid');

        //查询业务编号，如果不存在，则直接返回
        if(tools.isNull(id) || tools.isNull(pid)){
          return ;
        }

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //如果最后一条是已完成，或者已驳回，则删除待办记录 //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        if(tlist.length > 0){
          //同时删除本条待办记录当前(印章管理员)
          await workflow.deleteViewProcessLog(tlist);
        }

      },
      // 选中当前盖印人
      async selectFrontUser(value){
        await tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      async validField(fieldName){
        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        storage.setStore(`system_${this.tablename}_item@${userinfo.realname}` , JSON.stringify(this.item) , 3600 * 2 );

        return tools.isNull(this.message[fieldName]);
      },
      // 获取URL或者二维码信息
      async queryInfo() {

        try {

          this.iswechat = tools.isWechat(); //查询当前是否微信端
          this.userinfo = await this.weworkLogin(); //查询当前登录用户

          //获取用户基础信息
          const userinfo = await storage.getStore('system_userinfo');

          //查询编号
          const id = tools.getUrlParam('id');
          this.role = tools.getUrlParam('role');
          this.back = tools.getUrlParam('back') || '/app';

          //查询领用数据
          let tlist = await query.queryTableDataByPid(this.tablename , id);

          if(tlist.length == 0){
            await this.deleteProcessLog();
          }

          this.size = tlist.length;
          this.tlist = tlist;

          const item = tlist[0];

          debugger;

          //根据URL参数查询物资类型
          this.item.type = this.goodstype[tools.getUrlParam('type')];

          //自动回显刚才填写的用户基础信息
          if(item){
              this.item.id = item.id;
              this.item.serialid = item.serialid || this.item.serialid
              this.item.time = dayjs(item.time).format('YYYY-MM-DD') || this.item.time
              this.item.create_by = item.create_by || this.item.create_by;
              this.item.create_time = item.create_time || this.item.create_time;
              this.item.visitor_name = item.visitor_name || this.item.visitor_name;
              this.item.visitor_company = item.visitor_company || this.item.visitor_company;
              this.item.visitor_mobile = item.visitor_mobile || this.item.visitor_mobile;
              this.item.visitor_position = item.visitor_position || this.item.visitor_position;
              this.item.employee = item.employee || this.item.employee;
              this.item.mobile = item.mobile || this.item.mobile;
              this.item.department = item.department || this.item.department;
              this.item.company = item.company || this.item.company;
              this.item.position = item.position || this.item.position;
              this.item.remark = item.remark || this.item.remark;
              this.item.userid = item.userid || this.item.userid;
              this.item.user_group_ids = item.user_group_ids || this.item.user_group_ids;
              this.item.user_group_names = item.user_group_names || this.item.user_group_names;
              this.item.user_admin_name = item.user_admin_name || this.item.user_admin_name;
              this.item.status = item.status || this.item.status;
          }

          if (this.item && this.item.status === '已驳回') {
            this.readonly = true
          }

          for(let i = 1 ; i < tlist.length ; i++){
            this.item['visitor_name'+i] = tlist[i].visitor_name ;
            this.item['visitor_company'+i] = tlist[i].visitor_company ;
            this.item['visitor_position'+i] = tlist[i].visitor_position ;
            this.item['visitor_mobile'+i] = tlist[i].visitor_mobile ;
          }

          await this.queryProcessLog();

        } catch (error) {
          console.log(error);
        }

      },
      // 物品领用驳回
      async handleDisagree(){
        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;
        const type = tools.getUrlParam('statustype');
        const pid = tools.getUrlParam('pid');

        //检查用户是否具有权限进行审批
        const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取到印章管理员组信息
        const user_group_ids = response && response.length > 0 ? response[0].userlist : '';

        //获取到用户列表数据
        if(tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username) ){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: '您没有物品领用的审批权限，请联系管理员进行处理！',
          });
        }

        //返回驳回理由
        if(!this.item.disagree_remark){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: '请输入驳回原因！',
          });
        }

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已驳回',
          disagree_remark : this.item.disagree_remark,
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已驳回',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manageAPI.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        try {
          //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/亲爱的${this.item.receive_name}同事，您的办公用品预约申请已被驳回，驳回原因是${this.item.disagree_remark}！?rurl=${receiveURL}`)
                  .set('accept', 'json');
        } catch (error) {
          console.log(error);
        }

        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        //const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取后端配置前端管理员组
        const front = user_group_ids;
        const front_name = user_group_ids;

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '确认'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请[已驳回]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + ' #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已驳回物品领用申请！',
          });

      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');

        //表单ID
        const id = this.item.id;
        const type = tools.getUrlParam('statustype');
        const pid = tools.getUrlParam('pid');

        //检查用户是否具有权限进行审批
        const response = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取到印章管理员组信息
        const user_group_ids = response && response.length > 0 ? response[0].userlist : '';

        //获取到用户列表数据
        if(tools.isNull(user_group_ids) || !user_group_ids.includes(userinfo.username) ){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '您没有物品领用的审批权限，请联系管理员进行处理！',
          });
          return;
        }

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/goodsview?id=${id}&statustype=office&role=receive`);

        //第一步 保存用户数据到数据库中
        const elem = {
          status: '已领取',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        //批量领取物品修改状态
        for(let i = 0 ; i < this.tlist.length ; i++){

          //第一步 保存用户数据到数据库中
          let element = {
            status: '已领取',
          }; // 待处理元素

          //第二步，向表单提交form对象数据
          const result = await manageAPI.patchTableData(this.tablename , this.tlist[i].id , element);

        }

        try {
          //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
          await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${this.item.create_by}/亲爱的${this.item.receive_name}同事，您预约的办公用品已准备就绪，预约号为${this.item.serialid}，请于上午11:00-12:00或下午17:00-18:00到办公用品管理员处，凭预约号领取！?rurl=${receiveURL}`)
                  .set('accept', 'json');
        } catch (error) {
          console.log(error);
        }


        /************************  工作流程日志(开始)  ************************/

        //查询直接所在工作组
        //const resp = await query.queryRoleGroupList('COMMON_RECEIVE_BORROW' , userinfo.username);

        //获取后端配置前端管理员组
        const front = user_group_ids;
        const front_name = user_group_ids;

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '确认'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请[已领用]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + ' #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        //同时推送一条待办记录给印章管理员

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: this.item.create_by,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : this.item.receive_name ,//varchar(1000) null comment '操作职员',
          approve_user   : this.item.create_by ,//varchar(100)  null comment '审批人员',
          action         : ''    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : '经办人',//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + '#已领取 #经办人: ' + this.item.create_by,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.taskViewProcessLog(prLogNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已确认物品领用申请！',
          });

      },
      // 用户提交入职登记表函数
      async handleFinaly() {

        //显示加载状态
        this.loading = true;

        //获取用户基础信息
        const userinfo = await storage.getStore('system_userinfo');
        const pid = tools.getUrlParam('pid');

        //表单ID
        const id = this.item.id;

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          status: '已完成',
        }; // 待处理元素

        //第二步，向表单提交form对象数据
        const result = await manageAPI.patchTableData(this.tablename , id , elem);

        /************************  工作流程日志(开始)  ************************/

        //查询当前所有待办记录
        let tlist = await task.queryProcessLogWaitSeal(userinfo.username , userinfo.realname , 0 , 1000);

        //过滤出只关联当前流程的待办数据
        tlist = tlist.filter(item => {
          return item.id == id && item.pid == pid;
        });

        //同时删除本条待办记录当前(印章管理员)
        await workflow.deleteViewProcessLog(tlist);

        //记录 审批人 经办人 审批表单 表单编号 记录编号 操作(同意/驳回) 意见 内容 表单数据
        const prLogHisNode = {
          id: tools.queryUniqueID(),
          table_name: this.tablename,
          main_value: id,
          proponents: userinfo.username,
          business_data_id : id ,//varchar(100)  null comment '业务数据主键值',
          business_code  : '000000000' ,//varchar(100)  null comment '业务编号',
          process_name   : '用印流程审批',//varchar(100)  null comment '流程名称',
          employee       : userinfo.realname ,//varchar(1000) null comment '操作职员',
          approve_user   : userinfo.username ,//varchar(100)  null comment '审批人员',
          action         : '完成'    ,//varchar(100)  null comment '操作动作',
          action_opinion : '审批领用申请[已完成]',//text          null comment '操作意见',
          operate_time   : dayjs().format('YYYY-MM-DD HH:mm:ss')   ,//datetime      null comment '操作时间',
          functions_station : userinfo.position,//varchar(100)  null comment '职能岗位',
          process_station   : '领用审批[物品领用]',//varchar(100)  null comment '流程岗位',
          business_data     : JSON.stringify(this.item),//text          null comment '业务数据',
          content           : `物品领用(${this.item.type}) ` + this.item.name + '#已完成 #经办人: ' + this.item.create_by ,//text          null comment '业务内容',
          process_audit     : this.item.id + '##' + this.item.serialid ,//varchar(100)  null comment '流程编码',
          create_time       : dayjs().format('YYYY-MM-DD HH:mm:ss'),//datetime      null comment '创建日期',
          relate_data       : '',//text          null comment '关联数据',
          origin_data       : '',
        }

        await workflow.approveViewProcessLog(prLogHisNode);

        /************************  工作流程日志(结束)  ************************/

        //设置状态
        this.loading = false;
        this.status = elem.status;
        this.readonly = true;
        this.item.status = elem.status;
        this.role = 'view';

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已完成物品领用申请！',
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
    @import "../../assets/css/goodsview.css";
</style>
