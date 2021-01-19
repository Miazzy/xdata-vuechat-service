<template>
  <div>
    <div style="height:calc(100vh - 0px);">
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
      currentCase: '双向树',
      isShowCodePanel: false,
      graphOptions: {
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'allowSwitchLineShape': true,
            'allowSwitchJunctionPoint': true,
            useLayoutStyleOptions: true,
            'from': 'left',
            'max_per_width': '500',
            'min_per_height': '100'
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
        'defaultNodeWidth': '100',
        'defaultLineShape': 2,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
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
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(level,lt,100)~and(level,gt,0)&_fields=id,name&_sort=-id`);
        //获取所有公司关联信息
        const links = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_link' , '_where=(status,in,0)&_fields=id,from,to&_sort=-id');
        data.nodes = nodes;
        data.links = links;
        data.nodes.forEach(thisNode => { });
        this.$refs.seeksRelationGraph.setJsonData(data, (seeksRGGraph) => {
      })
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
<style lang="scss" scoped>
</style>
