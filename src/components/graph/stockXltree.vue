<template>
  <div>
    <div style="height:50px;padding-top:6px;padding-left: 30px;padding-right:30px;border-bottom: #efefef solid 1px;">
      <el-radio-group v-model="currentCase" size="small" @change="$router.push('/app/stockYltree')">
        <el-radio-button label="横向树状图谱"></el-radio-button>
        <el-radio-button label="纵向树状图谱" ></el-radio-button>
      </el-radio-group>
    </div>
    <div style="height:calc(100vh -100px);">
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      currentCase: '横向树状图谱',
      isShowCodePanel: false,
      graphOptions: {
        'backgrounImage': 'http://ai-mark.cn/images/ai-mark-desc.png',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'min_per_width': 40,
            'max_per_width': 70,
            'min_per_height': 200
          }
        ],
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        'defaultNodeShape': 1,
        'defaultNodeWidth': '30',
        'defaultLineShape': 2,
        'defaultJunctionPoint': 'tb',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)',
        'defaultNodeHeight': '100'
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    async showSeeksGraph(query) {
        const data = { 'rootId': '18', 'nodes': [], 'links': [] };
        //获取所有公司信息
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(level,lt,100)~and(level,gt,0)&_sort=-id`);
        //获取所有公司关联信息
        const links = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_link' , '_where=(status,in,0)&_sort=-id');
        data.nodes = nodes;
        data.links = links;
        data.nodes.forEach(thisNode => { });
        this.$refs.seeksRelationGraph.setJsonData(data, (seeksRGGraph) => { });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
</style>
