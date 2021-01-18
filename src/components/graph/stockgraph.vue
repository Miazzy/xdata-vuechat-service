<template>
  <div>
    <div style="margin-top:0px;width: calc(100% - 0px); height:calc(100vh + 0px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-expand="onNodeExpand" />
    </div>
  </div>
</template>
<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'SeeksRelationGraphDemo',
  components: { SeeksRelationGraph },
  data() {
    return {
      g_loading: true,
      graphOptions: {
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-tree',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'centerOffset_x': -300,
            'centerOffset_y': 0,
            'allowSwitchLineShape': true,
            'allowSwitchJunctionPoint': true,
            'min_per_width': '60',
            'min_per_height': '400'
          }
        ],
        "defaultExpandHolderPosition": "bottom",
        'defaultLineShape': 2,
        'defaultJunctionPoint': 'tb',
        'defaultNodeShape': 1,
        'defaultNodeWidth': '50',
        'defaultNodeHeight': '250',
        'defaultNodeBorderWidth': 0
      }
    }
  },
  created() {
  },
  mounted() {
    this.setGraphData()
  },
  methods: {
    async setGraphData() {
        const data = { 'rootId': '18', 'nodes': [], 'links': [] };
        //获取所有公司信息
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(level,lt,100)~and(level,gt,0)&_sort=-id`);
        //获取所有公司关联信息
        const links = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_link' , '_where=(status,in,0)&_sort=-id');
        data.nodes = nodes;
        data.links = links;
        data.nodes.forEach(thisNode => { });
        this.$refs.seeksRelationGraph.setJsonData(data, (seeksRGGraph) => {});
    },
    onNodeExpand(node, e) {
     
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>