<template>
  <div id="reward-home">
      <div>
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">

            <template v-for="pane in paneflows"  >
              <a-card  :key="pane.id"  :title="pane.title"  class="pane-flow-card" >
                <template v-for="item in pane.taskflows"  >
                  <a-card-grid :key="item.href" style="width:25%;textAlign:'center'">
                    <a-card-meta>
                      <div slot="title" class="card-title pane-flow-card-meta" @click="item.click" >
                        <div class="pane-flow-card-meta-icon">
                          <a-avatar size="large"  :src="item.avatar" />
                        </div>
                        <div class="pane-flow-card-meta-title" >
                          <a class="pane-flow-card-meta-tname" >{{ item.name }}</a>
                          <div class="pane-flow-card-meta-description" > {{ item.description }} </div>
                        </div>
                      </div>
                    </a-card-meta>
                  </a-card-grid>
                </template>
              </a-card>
            </template>

          </a-col>
        </keep-alive>
        <keep-alive>
          <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card
              title="便捷导航"
              style="margin-bottom: 24px"
              :bordered="false"
              :body-style="{padding: 0}"
            >
              <div class="item-group">
                <div class="pane-right-item-group" >
                  <a-tag color="purple" @click="handleWait()" style="margin-bottom:10px;">我的待办</a-tag>
                  <a-tag color="cyan" @click="handleDone()" style="margin-bottom:10px;">我的已办</a-tag>
                  <a-tag color="pink" @click="handleMessage()" style="margin-bottom:10px;">我的奖惩</a-tag>
                  <a-tag color="blue" @click="handleCollect()" style="margin-bottom:10px;">统计分析</a-tag>
                  <a-tag color="red" @click="handleMyCenter()" style="margin-bottom:10px;">报表导出</a-tag>

                  <a-tag color="green" @click="handleLeave()" style="margin-bottom:10px;">月度报表</a-tag>
                  <a-tag color="blue" @click="handleGoOut()" style="margin-bottom:10px;">季度报表</a-tag>
                  <a-tag color="orange" @click="handleOvertime()" style="margin-bottom:10px;">部门分布</a-tag>
                  <a-tag color="pink" @click="handleAttendance()" style="margin-bottom:10px;">类别分布</a-tag>
                  <a-tag color="cyan" @click="handleFileBorrow()" style="margin-bottom:10px;">奖惩排行榜</a-tag>

                  <a-tag color="blue" @click="handleUseSealCon()" style="margin-bottom:10px;">奖惩个人榜</a-tag>
                  <a-tag color="red" @click="handleUseSealCom()" style="margin-bottom:10px;">奖惩团队榜</a-tag>
                </div>
              </div>
            </a-card>

            <a-card :loading="loading" title="奖惩流程" :bordered="false" style="margin-top:20px;">
              <a-tag
                color="blue"
                @click="handleWriteBlog()"
                style="margin-bottom:10px;position:absolute;top:18px;right:20px;display:none;"
              ></a-tag>
              <div class="members">
                <a-row>
                  <a-col :span="12" v-for="item in wflows" :key="item.href">
                    <a @click="item.click">
                      <a-avatar class="pane-right-avatar" size="small" :src="item.avatar" />
                      <span class="member">{{ item.name }}</span>
                    </a>
                  </a-col>
                </a-row>
              </div>
            </a-card>

          </a-col>
        </keep-alive>

      </a-row>
    </div>
  </div>
</template>
<script>
import * as storage from "@/request/storage";
import * as tools from "@/request/tools";

export default {
  mixins: [window.mixin],
  data() {
    return {
      pageName: "奖惩管理",
      momentNewMsg: true,
      paneflows:[
        {
          id: 'task-pane',
          title: '任务面板',
          taskflows:[
            {
              name: "我的待办",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/time_00.png`,
              href: "/account/todolist",
              description: '查看待处理的奖惩申请流程',
              click: () => {

              }
            },{
              name: "我的已办",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/home_00.png`,
              href: "/account/donelist",
              description: '查看已处理的奖惩申请流程',
              click: () => {

              }
            },{
              name: "我的奖惩",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/绩效管理.png`,
              href: "/account/myrewards",
              description: '查看涉及自己的奖惩明细',
              click: () => {

              },
            },{
              name: "统计分析",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/zhushou.png`,
              href: "/account/myanalyse",
              description: '查看自己的奖惩月/季度报表',
              click: () => {

              },
            }
          ],
        },{
          id: 'common-pane',
          title: '常用应用',
          taskflows:[
            {
              name: "月度奖惩报表",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/leave.png`,
              href: "/account/todolist",
              description: '查看/导出月度奖惩明细及汇总',
              click: () => {

              }
            },{
              name: "季度奖惩报表",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png`,
              href: "/account/donelist",
              description: '查看/导出月度奖惩明细及汇总',
              click: () => {

              }
            },{
              name: "奖惩部门分布",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/trip.png`,
              href: "/account/myrewards",
              description: '查看按部门/中心/区域分配的奖惩报表',
              click: () => {

              },
            },{
              name: "奖惩类别分布",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png`,
              href: "/account/myanalyse",
              description: '查看按奖惩类别/名称分布的奖惩报表',
              click: () => {

              },
            },{
              name: "月度奖惩排行榜",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/ribao.png`,
              href: "/account/todolist",
              description: '查看月度奖惩汇总的排行榜',
              click: () => {

              }
            },{
              name: "季度奖惩排行榜",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/zhoubao.png`,
              href: "/account/donelist",
              description: '查看季度奖惩汇总的排行榜',
              click: () => {

              }
            },{
              name: "年度奖惩排行榜",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png`,
              href: "/account/myrewards",
              description: '查看年度奖惩汇总的排行榜',
              click: () => {

              },
            },{
              name: "区域奖惩排行榜",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/commun.png`,
              href: "/account/myanalyse",
              description: '查看按照区奖惩汇总的排行榜',
              click: () => {

              },
            },{
              name: "奖惩年度个人榜",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png`,
              href: "/account/myrewards",
              description: '查看年度获奖/罚前三甲的个人',
              click: () => {

              },
            },{
              name: "奖惩年度团队榜",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/richang.png`,
              href: "/account/myanalyse",
              description: '查看年度获奖/罚前三甲的团队',
              click: () => {

              },
            }
          ],
        }
      ],
      wflows: [
        {
          name: "月度流程",
          avatar:
            "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-file-04.svg",
          href: "/account/center",
          click: () => {
            //跳转到相应页面
            this.$router.push({
              path: "/account/center",
              fullPath: "/account/center",
              meta: { title: "月度流程" }
            });
          }
        },
        {
          name: "季度流程",
          avatar:
            "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-file-04.svg",
          href: "/account/authors/index",
          click: () => {
            //跳转到相应页面
            this.$router.push({
              path: "/account/authors/index",
              fullPath: "/account/authors/index",
              meta: { title: "季度流程" }
            });
          }
        },
        {
          name: "年度流程",
          avatar:
            "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-file-04.svg",
          href: "/blog/rank",
          click: () => {
            //跳转到相应页面
            this.$router.push({
              path: "/account/center",
              fullPath: "/account/center",
              meta: { title: "年度流程" }
            });
          }
        },
        {
          name: "流程报表",
          avatar:
            "//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/icon-rank-01.svg",
          href: "/blog/center",
          click: () => {
            //跳转到相应页面
            this.$router.push({
              path: "/blog/centerlist",
              fullPath: "/blog/centerlist",
              meta: { title: "流程报表" }
            });
          }
        }
      ],
    };
  },
  activated() {
    this.$store.commit("toggleTipsStatus", -1);
    this.changeStyle();
    this.displayFoot();
  },
  mounted() {
    this.changeStyle();
    this.displayFoot();
  },
  methods: {
    changeStyle(name) {},
    displayFoot() {},
    async userLogin() {},
    async clearLoginInfo() {},
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";

</style>
