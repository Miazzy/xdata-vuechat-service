<template>

  <keep-alive>

  <!--首页组件-->
  <div id="content" style="margin-top: 0px;" >

    <header id="wx-header" v-if="iswechat" >
        <div class="center">
            <span>入职管理</span>
        </div>
    </header>

    <section v-if="iswechat && isfirst">

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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">入职登记表</van-col>
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

                <!-- 员工姓名（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="员工姓名" v-model="item.username"  placeholder="请填写您的员工姓名！" @blur="validField('username')" :error-message="message.username"  />
                <!-- 入职岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="电话号码" v-model="item.mobile" placeholder="请填写您的电话号码！" @blur="validField('mobile')" :error-message="message.mobile"/>
                <!-- 入职日期（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="身份证号" v-model="item.idcard" placeholder="请填写您的身份证号！" @blur="validField('idcard')" :error-message="message.idcard" />

              </van-cell-group>

            </van-form>

          </van-cell-group>

          <div style="margin-top:30px;margin-left:0px;margin-right:10px;margin-bottom:10px;border-top:1px solid #efefef;" >
            <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" block @click="handleFirstConfirm();" style="border-radius: 10px 10px 10px 10px; text-align: center;"  >验证</van-button>
          </div>

          <div style="height:500px;" ></div>
        </div>
      </div>

    </section>

    <section v-if="iswechat && !isfirst" >

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
            <van-col span="8" style="text-align: center;font-size:1.15rem;">入职登记表</van-col>
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

                <!-- 登记日期（系统自动生成） -->
                <van-field clearable label="填报日期" v-model="item.create_time" placeholder="请输入入职登记日期" readonly />
                <!-- 员工姓名（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="员工姓名" v-model="item.username"  placeholder="请填写您的姓名！" @blur="validField('username')" :error-message="message.username"  />
                <!-- 最高学历（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="最高学历" v-model="item.greatdiploma"  placeholder="请选择您的最高学历!" @click="tag.showPickerDiploma = true;" />
                <!-- 入职岗位（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="入职岗位" v-model="item.position" placeholder="请输入入职岗位！" @blur="validField('position')" :error-message="message.position"/>
                <!-- 入职日期（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="入职日期" v-model="item.join_time" placeholder="请输入入职日期！" @blur="validField('join_time')" :error-message="message.join_time" @click="tag.showPickerJoinTime = true ; "/>
              </van-cell-group>

              <van-cell-group style="margin-top:10px;" v-if="dockFlag" >

                <van-cell value="对接信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="对接HR" v-model="item.hr_name" placeholder="请输入与您对接的HR姓名！" @blur="validField('hr_name');queryHRMan();" :error-message="message.hr_name" @click="queryHRMan();"/>
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="huserList.length > 0" v-model="item.hr_id" :list="huserList" default-tag-text="默认" edit-disabled @select="selectHRUser()" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field v-if="dockFlag"  required clearable label="对接行政" v-model="item.admin_name" placeholder="请输入与您对接的行政人员姓名！" @blur="queryAdminMan();"  @click="queryAdminMan();" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="auserList.length > 0" v-model="item.admin_id" :list="auserList" default-tag-text="默认" edit-disabled @select="selectAdminUser()" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field v-if="dockFlag"  required clearable label="对接前台" v-model="item.front_name" placeholder="请输入与您对接的前台人员姓名！" @blur="queryFrontMan();"  @click="queryFrontMan();" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="fuserList.length > 0" v-model="item.front_id" :list="fuserList" default-tag-text="默认" edit-disabled @select="selectFrontUser()" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-field v-if="dockFlag"  required clearable label="对接食堂" v-model="item.meal_name" placeholder="请输入与您对接的食堂人员姓名！" @blur="queryMealMan();"  @click="queryMealMan();" />
                <!-- 对接HR（HR需要确认/修改） -->
                <van-address-list v-show="muserList.length > 0" v-model="item.meal_id" :list="muserList" default-tag-text="默认" edit-disabled @select="selectMealUser()" />

              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="资产配置" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 办公电脑（系统自动生成） -->
                <van-field v-if="item.computer == '是' " :readonly="readonly" required clickable clearable label="电脑配置" v-model="item.computer" placeholder="是否需要配置电脑?" @click="tag.showPickerCommon = true ; currentKey = 'computer'; " />
                <!-- 办公座椅（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="办公桌椅" v-model="item.seat"  placeholder="是否需要配置办公座椅?" @click="tag.showPickerCommon = true ; currentKey = 'username'; " />
                <!-- 办公抽屉（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clickable clearable label="办公抽屉" v-model="item.drawer" placeholder="是否需要配置办公抽屉?" @click="tag.showPickerCommon = true ; currentKey = 'drawer'; " />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="资产配置要求" v-model="item.other_equip" rows="2" autosize type="textarea"  maxlength="256"  placeholder="请输入您额外的办公资产配置要求！" show-word-limit />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="办公用品" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 笔记簿/本（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="笔记簿/本" v-model="item.notebook" placeholder="是否需要配置笔记簿/本?"  @click="tag.showPickerCommon = true ; currentKey = 'notebook'; " />
                <!-- 入职手册（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="入职手册" v-model="item.manual"  placeholder="是否需要配置入职手册?" @click="tag.showPickerCommon = true ; currentKey = 'manual'; " />
                <!-- 签字笔/擦（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="签字笔/擦" v-model="item.writingtools" placeholder="是否需要配置签字笔/擦?" @click="tag.showPickerCommon = true ; currentKey = 'writingtools'; " />
                <!-- 员工工牌（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="员工工牌" v-model="item.badge" placeholder="是否需要配置员工工牌?" @click="tag.showPickerCommon = true ; currentKey = 'badge'; " />
                <!-- 员工门禁卡（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="门禁卡牌" v-model="item.ban_card" placeholder="是否需要配置员工门禁卡?" @click="tag.showPickerCommon = true ; currentKey = 'ban_card'; " />
                <!-- 员工照片（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" clearable label="其他用品" v-model="item.othertools" rows="2" autosize type="textarea"  maxlength="256"  placeholder="请输入您的其他办公用品要求！" show-word-limit />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="车辆信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 行驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="车牌编号" v-model="item.carno" placeholder="请输入您的车牌编号！" />
                <!-- 行驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="行驶证号" v-model="item.driving_license" placeholder="请输入您的行驶证编号！" />
                <!-- 驾驶证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" clearable label="驾驶证号" v-model="item.driver_license"  placeholder="请输入您的驾驶证编号！" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">
                <van-cell value="证件信息" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />
                <!-- 身份证号（HR需要确认/修改） -->
                <van-field :readonly="readonly" required clearable label="身份证号" v-model="item.idcard" placeholder="请输入您的身份证编号！" @blur="validField('idcard');" :error-message="message.idcard" />
                <!-- 银行卡号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" required clearable label="银行卡号" v-model="item.bank_card" placeholder="请输入您的工资卡对应银行卡号！" @blur="validField('bank_card');" :error-message="message.bank_card" />
                <!-- 学历编号（HR需要确认/修改） -->
                <van-field :readonly="readonly" v-show="item.greatdiploma == '专科' || item.greatdiploma == '本科' || item.greatdiploma == '硕士' ||  item.greatdiploma == '博士'" clearable label="毕业证号" v-model="item.diploma" placeholder="请输入您的毕业证书编号！" @blur="validField('diploma');" :error-message="message.diploma" />
                <!-- 学位编号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" v-show="item.greatdiploma == '本科' || item.greatdiploma == '硕士' || item.greatdiploma == '博士'" clearable label="学位编号" v-model="item.bachelor" placeholder="请输入您的学位证书编号！"  />
                <!-- 学历编号（HR需要确认/修改） -->
                <van-field :readonly="readonly" v-show="item.greatdiploma == '硕士' ||  item.greatdiploma == '博士'" clearable label="毕业证号(硕士)" v-model="item.diplomass" placeholder="请输入您的毕业证书(硕士)编号！"  />
                <!-- 学位编号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" v-show="item.greatdiploma == '硕士' ||  item.greatdiploma == '博士'" clearable label="学位编号(硕士)" v-model="item.bachelorss" placeholder="请输入您的学位证书(硕士)编号！" />
                <!-- 学历编号（HR需要确认/修改） -->
                <van-field :readonly="readonly" v-show="item.greatdiploma == '博士'" clearable label="毕业证号(博士)" v-model="item.diplomabs" placeholder="请输入您的毕业证书(博士)编号！"  />
                <!-- 学位编号（1寸照片，用于制作工牌） -->
                <van-field :readonly="readonly" v-show="item.greatdiploma == '博士'" clearable label="学位编号(博士)" v-model="item.bachelorbs" placeholder="请输入您的学位证书(博士)编号！" />
              </van-cell-group>

              <van-cell-group style="margin-top:10px;">

                <van-cell value="附件上传" style="margin-left:0px;margin-left:-3px;font-size: 0.95rem;" />

                <van-cell title="工牌寸照" class="van-cell-upload" :label="item.files_gp.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessGP"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell title="行驶证附件" class="van-cell-upload" :label="item.files_xs.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessXS"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell title="驾驶证附件" class="van-cell-upload" :label="item.files_js.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessJS"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell title="身份证附件" class="van-cell-upload" :label="item.files_id.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessID"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell title="银行卡照片" class="van-cell-upload" :label="item.files_bk.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessBK"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="item.greatdiploma == '专科' || item.greatdiploma == '本科' || item.greatdiploma == '硕士' ||  item.greatdiploma == '博士'" title="毕业证附件" class="van-cell-upload" :label="item.files_by.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessBY"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="item.greatdiploma == '本科' || item.greatdiploma == '硕士' || item.greatdiploma == '博士'" title="学位证附件" class="van-cell-upload" :label="item.files_xw.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessXW"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="item.greatdiploma == '硕士' ||  item.greatdiploma == '博士'" title="毕业证附件(硕士)" class="van-cell-upload" :label="item.files_ssby.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessSSBY"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="item.greatdiploma == '硕士' || item.greatdiploma == '博士' " title="学位证附件(硕士)" class="van-cell-upload" :label="item.files_ssxw.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessSSXW"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="item.greatdiploma == '博士' " title="毕业证附件(博士)" class="van-cell-upload" :label="item.files_bsby.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessBSBY"  >上传</nut-uploader>
                  </template>
                </van-cell>

                <van-cell v-show="item.greatdiploma == '博士' " title="学位证附件(博士)" class="van-cell-upload" :label="item.files_bsxw.slice(0,30)">
                  <template #right-icon>
                    <nut-uploader :acceptType="acceptType" name="file" :url="uploadURL" @success="uploadSuccessBSXW"  >上传</nut-uploader>
                  </template>
                </van-cell>

              </van-cell-group>

            </van-form>
          </van-cell-group>

          <div style="margin-top:30px;margin-bottom:10px;border-top:1px solid #efefef;" >

            <van-popup v-model="tag.showPickerJoinTime" round position="bottom">
              <van-datetime-picker
                type="date"
                :min-date="new Date()"
                @cancel="tag.showPickerJoinTime = false"
                @confirm="joinTimeConfirm"
                title="选择日期"
              />
            </van-popup>

            <van-popup v-model="tag.showPickerCommon" round position="bottom">
              <van-picker
                show-toolbar
                :columns="commonTypeColumns"
                @cancel="tag.showPickerCommon = false"
                @confirm="commonTypeConfirm"
              />
            </van-popup>

            <van-popup v-model="tag.showPickerDiploma" round position="bottom">
              <van-picker
                show-toolbar
                :columns="diplomaType"
                @cancel="tag.showPickerDiploma = false"
                @confirm="diplomaTypeConfirm"
              />
            </van-popup>

            <van-goods-action  v-show=" tag.showPickerCommon == false && tag.showPickerJoinTime == false  && tag.showPickerDiploma == false && status == '' ">
              <van-goods-action-button id="informed_confirm" type="danger" native-type="submit" text="提交"  @click="handleConfirm();" style="border-radius: 10px 10px 10px 10px;" />
            </van-goods-action>

          </div>

          <van-loading v-show="loading" size="24px" vertical style="position: absolute; margin: 0px 40%; width: 20%; top: 42%;" >加载中...</van-loading>

          <div style="height:100px;" ></div>
        </div>
      </div>

    </section>

    <setion v-if="!iswechat" >
      <div class="section-nowechat">
        请使用微信客户端打开
      </div>
    </setion>

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
            title:'入职登记表',
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
            iswechat:false,
            isfirst:true,
            dockFlag: false,
            uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
            message: workconfig.compValidation.entryjob.message,
            valid: workconfig.compValidation.entryjob.valid,
            item:{
              id: '',
              create_time: dayjs().format('YYYY-MM-DD'),
              create_by: '',
              username:'',
              position:'',    //入职岗位
              picture:'',     //员工照片
              computer:'否',  //是否需要电脑配置
              seat:'是',      //是否需要办公座椅
              drawer:'是',    //是否需要办公抽屉drawer
              other_equip:'暂无',//是否需要其他办公配置
              notebook:'是',  //是否需要笔记本子
              manual:'是',    //是否需要入职手册
              writingtools:'是',//是否需要签字笔/擦
              badge:'是',     //员工工牌
              ban_card:'否',    //否
              othertools:'暂无',//其他用品
              driving_license: '',//行驶证
              driver_license: '',//驾驶证
              idcard: '',      //身份证号
              diploma: '',     //毕业编号
              bachelor: '',    //学位编号
              diplomass: '',   //毕业编号(硕士)
              bachelorss: '',  //学位编号(硕士)
              diplomabs: '',   //毕业编号(博士)
              bachelorbs: '',  //学位编号(博士)
              bank_card: '',   //工资银行卡号
              join_time: dayjs().format('YYYY-MM-DD'), //入职时间
              hr_name: '',   //对接HR
              hr_id: '',
              front_name: '',
              front_id: '',
              admin_name: '',
              admin_id: '',
              meal_name: '',
              meal_id: '',
              front: '',
              admin: '',
              meal: '',
              carno: '',
              files_gp: '',
              files_xs: '',
              files_js: '',
              files_id: '',
              files_bk: '',
              files_by: '',
              files_xw: '',
              files_ssby: '',
              files_ssxw: '',
              files_bsby: '',
              files_bsxw: '',
              greatdiploma:'本科',
              remark: '',    //备注信息
              prefix: '',   //编号前缀
              name: '',     //流程组名，即Group_XX
              status: '',
            },
            backPath:'/app',
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
            statusType: workconfig.statusType,
            mailconfig: workconfig.mailconfig,
            config: workconfig.config,
            group: workconfig.group,

            currentKey:'',
            readonly: false,
            diplomaType: workconfig.compcolumns.diplomaTypeColumns,
            acceptType: workconfig.compcolumns.acceptType,
            commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
            sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
        }
    },
    async activated() {
        this.$store.commit("toggleTipsStatus", -1);
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    methods: {
      async uploadSuccessGP(file , res){
        this.item.files_gp = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessXS(file , res){
        this.item.files_xs = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessJS(file , res){
        this.item.files_js = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessID(file , res){
        this.item.files_id = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessBY(file , res){
        this.item.files_by = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessBK(file , res){
        this.item.files_bk = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessXW(file , res){
        this.item.files_xw = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessSSBY(file , res){
        this.item.files_ssby = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessSSXW(file , res){
        this.item.files_ssxw = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessBSBY(file , res){
        this.item.files_bsby = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      async uploadSuccessBSXW(file , res){
        this.item.files_bsxw = JSON.parse(res).message;
        this.$toast.success('上传成功');
      },
      //处理验证确认
      async handleFirstConfirm(){

        //检查姓名、电话号码，身份证号是否填写
        if(!this.item.username || !this.item.mobile || !this.item.idcard){
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '微信提示',
            message: '请将您的姓名、电话、身份证号填写完整后进行验证操作！',
          });
          return ;
        }

        //查询URL
        const queryURL = `${window.requestAPIConfig.restapi}/api/bs_entry_man?_where=(name,eq,${this.item.username})~and(mobile,eq,${this.item.mobile})~and(idcard,eq,${this.item.idcard})`;

        //获取返回结果
        const resp = await superagent.get(queryURL).set('accept', 'json');

        if(resp && resp.body && resp.body.length > 0){

          //获取当前入职人员相关信息
          const value = resp.body[0];

          const hr_id = this.item.hr_id = this.item.hr_name = value.hr_id;
          const admin_id = this.item.admin_id = this.item.admin_name = value.admin_id;
          const front_id = this.item.front_id = this.item.front_name = value.front_id;
          const meal_id = this.item.meal_id = this.item.meal_name = value.meal_id;

          const position = this.item.position = value.position;

          if(!hr_id){
            //未获取到HR信息
            await vant.Dialog.alert({
              title: '微信提示',
              message: '未获取到管理后台配置的HR信息，请联系HR处理！',
            });
            return false;
          }

          if(!admin_id){
            //未获取到HR信息
            await vant.Dialog.alert({
              title: '微信提示',
              message: '未获取到管理后台配置的行政人员信息，请联系HR处理！',
            });
            return false;
          }

          if(!front_id){
            //未获取到HR信息
            await vant.Dialog.alert({
              title: '微信提示',
              message: '未获取到管理后台配置的前台人员信息，请联系HR处理！',
            });
            return false;
          }

          if(!meal_id){
            //未获取到HR信息
            await vant.Dialog.alert({
              title: '微信提示',
              message: '未获取到管理后台配置的食堂人员信息，请联系HR处理！',
            });
            return false;
          }

          //未获取到HR信息
          await vant.Dialog.alert({
            title: '微信提示',
            message: '验证成功，请填写下一步信息！',
          });

          this.isfirst = false;

        } else {

          //未获取到HR信息
          await vant.Dialog.alert({
            title: '微信提示',
            message: '验证失败，请向HR确认，是否将您的基础信息录入入职登记中？',
          });

        }

      },

      //查询归档人员
      async queryHRMan(){
        //获取盖章人信息
        const hr_name = this.item.hr_name;

        try {
          if(!!hr_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(hr_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.huserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.huserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.huserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.huserList = this.huserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.huserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },

      //查询归档人员
      async queryAdminMan(){
        //获取盖章人信息
        const admin_name = this.item.admin_name;

        try {
          if(!!admin_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(admin_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.auserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.auserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.auserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.auserList = this.auserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.auserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },

      //查询归档人员
      async queryFrontMan(){
        //获取盖章人信息
        const front_name = this.item.front_name;

        try {
          if(!!front_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(front_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.fuserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.fuserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.fuserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.fuserList = this.fuserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.fuserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },

      //查询归档人员
      async queryMealMan(){
        //获取盖章人信息
        const meal_name = this.item.meal_name;

        try {
          if(!!meal_name){

            //从用户表数据中获取填报人资料
            let user = await manageAPI.queryUserByNameHRM(meal_name.trim());

            if(!!user){

              //如果是用户数组列表，则展示列表，让用户自己选择
              if(Array.isArray(user)){

                try {
                  user.map((elem,index) => {
                    let company = elem.textfield1.split('||')[0];
                    company = company.slice(company.lastIndexOf('>')+1);
                    let department = elem.textfield1.split('||')[1];
                    department = department.slice(department.lastIndexOf('>')+1);
                    this.muserList.push({id:elem.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','') , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email , isDefault: !index });
                  })
                } catch (error) {
                  console.log(error);
                }

              } else { //如果只有一个用户数据，则直接设置

                try {
                  let company = user.textfield1.split('||')[0];
                  company = company.slice(company.lastIndexOf('>')+1);
                  let department = user.textfield1.split('||')[1];
                  department = department.slice(department.lastIndexOf('>')+1);
                  let elem = user;
                  //将用户数据推送至对方数组
                  this.muserList.push({id:user.loginid , value:`${user.lastname},` , label: elem.lastname + ' ' +  elem.mobile + " " + elem.textfield1.split('||')[1].replace('中心','')  , name:`${user.lastname}` , tel:user.mobile , address: company + "||" + user.textfield1.split('||')[1] , company: company , department:department , mail: this.item.dealMail, isDefault: !this.muserList.length });
                } catch (error) {
                  console.log(error);
                }

              }

              //遍历去重
              try {
                this.muserList = this.muserList.filter((item,index) => {
                  item.isDefault = index == 0 ? true : false;
                  let findex = this.muserList.findIndex((subitem,index) => { return subitem.id == item.id });
                  return index == findex;
                })
              } catch (error) {
                console.log(error);
              }

            }
          }
        } catch (error) {
          console.log(error);
        }
      },

      //选中当前盖印人
      async selectHRUser(value){
        await tools.sleep(0);
        const id = this.item.hr_id;
        const user = this.huserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.hr_name = user.name;
        this.item.hr_id = id;
      },

      //选中当前盖印人
      async selectAdminUser(value){
        await tools.sleep(0);
        const id = this.item.admin_id;
        const user = this.auserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.admin_name = user.name;
        this.item.admin_id = id;
      },

      //选中当前盖印人
      async selectFrontUser(value){
        await tools.sleep(0);
        const id = this.item.front_id;
        const user = this.fuserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.front_name = user.name;
        this.item.front_id = id;
      },

      //选中当前盖印人
      async selectMealUser(value){
        await tools.sleep(0);
        const id = this.item.meal_id;
        const user = this.muserList.find((item,index) => {return id == item.id});
        //获取盖印人姓名
        this.item.meal_name = user.name;
        this.item.meal_id = id;
      },

      validField(fieldName){
        // 邮箱验证正则表达式
        const regMail = workconfig.system.config.regexp.mail;

        this.message[fieldName] = tools.isNull(this.item[fieldName]) ? this.valid[fieldName] : '';

        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.item[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }

        storage.setStore('system_entry_job_item' , JSON.stringify(this.item) , 3600 * 2 );

        return tools.isNull(this.message[fieldName]);
      },

      afterRead(file) {

        file.status = 'uploading';
        file.message = '上传中...';

        setTimeout(() => {
          file.status = 'failed';
          file.message = '上传成功';
        }, 1000);
      },

      // 显示用户信息，如显示HR信息，显示行政人员信息
      displayUserInfo(fieldName){

      },

      // 选择入职时间
      async joinTimeConfirm(value){
        this.item.join_time = dayjs(value).format('YYYY-MM-DD');
        this.validField('join_time');
        await tools.sleep(100);
        this.tag.showPickerJoinTime = false;
      },

      // 选择是否
      async commonTypeConfirm(value){
        this.item[this.currentKey] = value;
        this.validField(value);
        await tools.sleep(100);
        this.tag.showPickerCommon = false;
      },

      // 选择学历
      async diplomaTypeConfirm(value){
        this.item.greatdiploma = value;
        await tools.sleep(100);
        this.tag.showPickerDiploma = false;
      },

      // 获取URL或者二维码信息
      async queryInfo() {

        try {
          this.iswechat = tools.isWechat();
          this.item.sealman = tools.getUrlParam('sealman');

          const item = storage.getStore('system_entry_job_item');

          this.item.hr = tools.getUrlParam('hr');        //用印管理员成员组
          this.item.admin = tools.getUrlParam('admin');  //用印前台接受组
          this.item.front = tools.getUrlParam('front');  //用印归档组(财务/档案)
          this.item.meal = tools.getUrlParam('meal');  //用印

          //自动回显刚才填写的用户基础信息
          if(item){
            this.item.username = item.username || this.item.username;
            this.item.mobile = item.mobile || this.item.mobile;
            this.item.idcard = item.idcard || this.item.idcard;
            this.item.position = item.position || this.item.position;
            this.item.other_equip = item.other_equip || this.item.other_equip;
            this.item.othertools = item.othertools || this.item.othertools;
            this.item.carno = item.carno || this.item.carno;
            this.item.driving_license = item.driving_license || this.item.driving_license;
            this.item.driver_license = item.driver_license || this.item.driver_license;
            this.item.idcard = item.idcard || this.item.idcard;
            this.item.diploma = item.diploma || this.item.diploma;
            this.item.bachelor = item.bachelor || this.item.bachelor;
            this.item.bank_card = item.bank_card || this.item.bank_card;
          }

          //如果前台人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.front)){
            //获取盖印人姓名
            this.item.front_name = await manageAPI.queryUsernameByID(this.item.front);
          }
          //如果行政人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.admin)){
            //获取盖印人姓名
            this.item.admin_name = await manageAPI.queryUsernameByID(this.item.admin);
          }
          //如果行政人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.meal)){
            //获取盖印人姓名
            this.item.meal_name = await manageAPI.queryUsernameByID(this.item.meal);
          }
          //如果行政人员填写为英文，则查询中文名称
          if(/^[a-zA-Z_0-9]+$/.test(this.item.hr)){
            //获取盖印人姓名
            this.item.hr_name = await manageAPI.queryUsernameByID(this.item.hr);
          }

          //如果行政人候选列表存在
          if(this.item.admin){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.admin.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.auserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.auserList.length });
            })
          }

          //如果行政人候选列表存在
          if(this.item.front){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.front.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.fuserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.fuserList.length });
            })
          }

          //如果行政人候选列表存在
          if(this.item.meal){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.meal.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.muserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.muserList.length });
            })
          }

          //如果行政人候选列表存在
          if(this.item.hr){
            //获取可选填报人列表
            let slist = await manageAPI.queryUsernameByIDs(this.item.hr.split(',').map(item => { return `'${item}'`; }).join(','));
            //遍历填报人列表
            slist.map((elem , index) => {
              let company = elem.textfield1.split('||')[0];
              company = company.slice(company.lastIndexOf('>')+1);
              let department = elem.textfield1.split('||')[1];
              department = department.slice(department.lastIndexOf('>')+1);
              this.huserList.push({id:elem.loginid , name:elem.lastname , tel:elem.mobile , address: company + "||" + elem.textfield1.split('||')[1] , company: company , department:department , mail: elem.email, isDefault: !this.huserList.length });
            })
          }

        } catch (error) {
          console.log(error);
        }

      },

      // 用户提交入职登记表函数
      async handleConfirm() {

        //显示加载状态
        this.loading = true;

        //表单ID
        const id = tools.queryUniqueID();

        // 用户对接HR姓名
        const hr_name = this.item.hr_name;

        // 对应HR的OA账户信息
        let hrinfo = {};

        // 查询SQL
        const queryURL = `${window.requestAPIConfig.restapi}/api/v1/hrmresource/id?_where=((lastname,like,%27~${hr_name}~%27)~or(loginid,like,%27~${hr_name}~%27))~and(status,ne,5)&_fields=id,lastname,loginid`;

        // 预处理 检查HR名字是否存在，如果不存在直接返回，检查填写内容是否正确，如果不正确，则直接返回，并提升错误信息
        const resp = await superagent.get(queryURL).set('accept', 'json');

        // 返回预览URL
        const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/app/entryview?id=${id}&statustype=none&role=hr`);

        // 如果没有获取到返回信息，说明填写的HR姓名有误，如果有获取到HR的返回信息，则执行转换
        if(resp && resp.body && resp.body.length > 0){
          hrinfo = resp.body.length > 1 ? {id: resp.body.map(obj => {return obj.id}).join(',')} : resp.body[0];
        } else {
          //未获取到HR信息
          await vant.Dialog.alert({
            title: '异常提示',
            message: 'HR的姓名填写有误，未获取到相应信息，请修改后重试！',
          });
          return ;
        }

        //验证专科证书编号
        if(this.item.greatdiploma == '专科' && !this.item.diploma){

          //弹出确认提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请输入毕业证书编号(专科)！',
          });

          return;
        }

        //验证本科证书编号
        if((this.item.greatdiploma == '本科' || this.item.greatdiploma == '硕士' || this.item.greatdiploma == '博士') && (!this.item.bachelor || !this.item.diploma)){

          //弹出确认提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请输入毕业证书编号或学位证书编号(本科)！',
          });

          return;
        }

        //验证硕士证书编号
        if((this.item.greatdiploma == '硕士' || this.item.greatdiploma == '博士') && ( !this.item.bachelorss || !this.item.diplomass) ){

          //弹出确认提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请输入毕业证书编号或学位证书编号(硕士)！',
          });

          return;
        }

        //验证博士证书编号
        if((this.item.greatdiploma == '博士') && ( !this.item.bachelorbs || !this.item.diplomabs) ){

          //弹出确认提示
          await vant.Dialog.alert({
            title: '温馨提示',
            message: '请输入毕业证书编号或学位证书编号(博士)！',
          });

          return;
        }

        //第一步 保存用户数据到数据库中
        const elem = {
          id,
          create_time: dayjs().format('YYYY-MM-DD'),
          create_by: this.item.username,
          username: this.item.username,
          position: this.item.position,    //入职岗位
          picture: this.item.picture,     //员工照片
          computer: this.item.computer,  //是否需要电脑配置
          seat: this.item.seat,      //是否需要办公座椅
          drawer: this.item.drawer,    //是否需要办公抽屉drawer
          other_equip: this.item.other_equip,//是否需要其他办公配置
          notebook: this.item.manual,  //是否需要笔记本子
          manual: this.item.manual,    //是否需要入职手册
          writingtools: this.item.writingtools,//是否需要签字笔/擦
          badge: this.item.badge,     //员工工牌
          othertools: this.item.othertools,//其他用品
          driving_license: this.item.driving_license,//行驶证
          driver_license: this.item.driver_license,//驾驶证
          idcard: this.item.idcard,    //身份证号
          diploma: this.item.diploma,   //毕业编号
          bachelor: this.item.bachelor,  //学位编号
          diplomass: this.item.diplomass,   //毕业编号(硕士)
          bachelorss: this.item.bachelorss,  //学位编号(硕士)
          diplomabs: this.item.diplomabs,   //毕业编号(博士)
          bachelorbs: this.item.bachelorbs,  //学位编号(博士)
          bank_card: this.item.bank_card, //工资银行卡号
          ban_card: this.item.ban_card || '否', //门禁卡
          join_time: this.item.join_time, //入职时间
          hr_name: this.item.hr_name,   //对接HR
          hr_id: this.item.hr_id ,  //HR编码信息
          front_name: this.item.front_name,
          front_id: this.item.front_id,
          admin_name: this.item.admin_name,
          admin_id: this.item.admin_id,
          meal_name: this.item.meal_name,
          meal_id: this.item.meal_id,
          mobile: this.item.mobile,
          files_gp: this.item.files_gp,
          files_xs: this.item.files_xs,
          files_js: this.item.files_js,
          files_id: this.item.files_id,
          files_bk: this.item.files_bk,
          files_by: this.item.files_by,
          files_xw: this.item.files_xw,
          files_ssby: this.item.files_ssby,
          files_ssxw: this.item.files_ssxw,
          files_bsby: this.item.files_bsby,
          files_bsxw: this.item.files_bsxw,
          greatdiploma: this.item.greatdiploma || '本科',
          carno: this.item.carno,
          status: '待确认',
        }; // 待提交元素


        //第二步，向表单提交form对象数据
        const result = await manageAPI.postTableData('bs_entry_job' , elem);

        //第三步 向HR推送入职引导通知，HR确认后，继续推送通知给行政、前台、食堂
        await superagent.get(`${window.requestAPIConfig.restapi}/api/v1/weappms/${hrinfo.id}/入职登记通知：员工‘${elem.username}’入职登记完毕，请HR确认！?rurl=${receiveURL}`)
                .set('accept', 'json');

        //设置状态
        this.loading = false;
        this.status = '待确认';
        this.readonly = true;

        //弹出确认提示
        await vant.Dialog.alert({
            title: '温馨提示',
            message: '已经向HR推送入职登记信息！',
          });

      }
    }
}
</script>
<style>
    @import "../../assets/css/entryjob.global.css";
</style>
<style scoped>
    @import "../../assets/css/explore.css";
    @import "../../assets/css/sealinfo.css";
</style>
