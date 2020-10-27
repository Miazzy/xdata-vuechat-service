<template>
  <div id="reward-home">
      <div>
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="1" :lg="24" :md="24" :sm="24" :xs="24">
            <van-sidebar v-model="activeTabKey">
              <van-sidebar-item style="display:none;" title="消息" :to="`/reward/message`" />
              <van-sidebar-item style="display:none;" title="云文档" :to="`/reward/netdisk`" />
              <van-sidebar-item style="display:none;" title="联系人" :to="`/reward/contact`" />
              <van-sidebar-item title="工作台" :to="`/reward/workspace`" />
              <van-sidebar-item style="display:none;" title="收藏" :to="`/reward/collect`" />
              <van-sidebar-item style="display:none;" title="设置" :to="`/reward/setup`" />
            </van-sidebar>
          </a-col>
        </keep-alive>

        <keep-alive>
          <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">

            <template v-for="(pane,index) in paneflows"  >
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
              <a-card v-if="index <= 1" :key="pane.id + pane.title" :title="' '" class="pane-flow-card-middle" >
              </a-card>
            </template>
          </a-col>
        </keep-alive>

        <keep-alive>
          <a-col style="padding: 0 12px 0 0;" :xl="7" :lg="24" :md="24" :sm="24" :xs="24">
            <a-card
              title="便捷导航"
              style="margin-bottom: 24px"
              :bordered="false"
              :body-style="{padding: 0}"
            >
              <div class="item-group">
                <div class="pane-right-item-group" >
                  <template v-for=" item in quicktags">
                    <a-tag class="pane-right-item-group-tag" :key="item.name" :color="item.color" @click="item.click" >{{item.name}}</a-tag>
                  </template>
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
      activeTabKey: 3,
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
          id: 'task-pane',
          title: '奖罚申请',
          taskflows:[
            {
              name: "业绩考核奖罚",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.1/images/pay03.png`,
              href: "/account/todolist",
              description: '业绩考核奖罚申请流程',
              click: () => {
                this.$router.push(`/app/rewardapply?type=0&back=/reward/workspace`);
              }
            },{
              name: "总裁专项奖",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/pay.png`,
              href: "/account/donelist",
              description: '总裁专项奖申请流程',
              click: () => {
                this.$router.push(`/app/rewardapply?type=1&back=/reward/workspace`);
              }
            },{
              name: "总经理专项奖",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.0/images/pay02.png`,
              href: "/account/donelist",
              description: '总经理专项奖申请流程',
              click: () => {
                this.$router.push(`/app/rewardapply?type=2&back=/reward/workspace`);
              }
            },{
              name: "特殊贡献奖",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.0/images/pay00.png`,
              href: "/account/myrewards",
              description: '特殊贡献奖申请流程',
              click: () => {
                this.$router.push(`/app/rewardapply?type=3&back=/reward/workspace`);
              },
            },{
              name: "其他奖罚",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r3.0.2/images/pay07.png`,
              href: "/account/myanalyse",
              description: '其他奖罚申请流程',
              click: () => {
                this.$router.push(`/app/rewardapply?type=4&back=/reward/workspace`);
              },
            },{
              name: "月度报表",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png`,
              href: "/account/myanalyse",
              description: '其他奖罚申请流程',
              click: () => {
                this.$toast.fail('暂时没有权限！');
              },
            },{
              name: "季度报表",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/ribao.png`,
              href: "/account/myanalyse",
              description: '其他奖罚申请流程',
              click: () => {
                this.$toast.fail('暂时没有权限！');
              },
            },{
              name: "奖罚审批",
              avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/shenpi.png`,
              href: "/account/myanalyse",
              description: '其他奖罚申请流程',
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
            }
            // ,{
            //   name: "奖惩部门分布",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/trip.png`,
            //   href: "/account/myrewards",
            //   description: '查看按部门/中心/区域分配的奖惩报表',
            //   click: () => {

            //   },
            // },{
            //   name: "奖惩类别分布",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/overtime.png`,
            //   href: "/account/myanalyse",
            //   description: '查看按奖惩类别/名称分布的奖惩报表',
            //   click: () => {

            //   },
            // },{
            //   name: "月度奖惩排行榜",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/ribao.png`,
            //   href: "/account/todolist",
            //   description: '查看月度奖惩汇总的排行榜',
            //   click: () => {

            //   }
            // },{
            //   name: "季度奖惩排行榜",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/zhoubao.png`,
            //   href: "/account/donelist",
            //   description: '查看季度奖惩汇总的排行榜',
            //   click: () => {

            //   }
            // },{
            //   name: "年度奖惩排行榜",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/yuebao.png`,
            //   href: "/account/myrewards",
            //   description: '查看年度奖惩汇总的排行榜',
            //   click: () => {

            //   },
            // },{
            //   name: "区域奖惩排行榜",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/commun.png`,
            //   href: "/account/myanalyse",
            //   description: '查看按照区奖惩汇总的排行榜',
            //   click: () => {

            //   },
            // },{
            //   name: "奖惩年度个人榜",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/hire.png`,
            //   href: "/account/myrewards",
            //   description: '查看年度获奖/罚前三甲的个人',
            //   click: () => {

            //   },
            // },{
            //   name: "奖惩年度团队榜",
            //   avatar: `//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/richang.png`,
            //   href: "/account/myanalyse",
            //   description: '查看年度获奖/罚前三甲的团队',
            //   click: () => {

            //   },
            // }
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
      quicktags:[
        {
          name:'我的待办',
          color:'purple',
          click: () => {

          },
        }, {
          name:'我的已办',
          color:'cyan',
          click: () => {

          },
        }, {
          name:'我的已办',
          color:'cyan',
          click: () => {

          },
        }, {
          name:'我的奖惩',
          color:'pink',
          click: () => {

          },
        },{
          name:'统计分析',
          color:'blue',
          click: () => {

          },
        },{
          name:'报表导出',
          color:'red',
          click: () => {

          },
        },{
          name:'月度报表',
          color:'green',
          click: () => {

          },
        },{
          name:'季度报表',
          color:'blue',
          click: () => {

          },
        },{
          name:'部门分布',
          color:'orange',
          click: () => {

          },
        },{
          name:'类别分布',
          color:'pink',
          click: () => {

          },
        },{
          name:'奖惩排行榜',
          color:'cyan',
          click: () => {

          },
        },{
          name:'奖惩个人榜',
          color:'blue',
          click: () => {

          },
        },{
          name:'奖惩团队榜',
          color:'red',
          click: () => {

          },
        },
      ],
    };
  },
  activated() {
    this.$store.commit("toggleTipsStatus", -1);
    this.activeTabKey = 3;
    this.changeStyle();
    this.displayFoot();
  },
  mounted() {
    this.activeTabKey = 3;
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
