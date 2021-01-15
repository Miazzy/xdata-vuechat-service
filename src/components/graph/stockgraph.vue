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
            'min_per_width': '60',
            'min_per_height': '400'
          }
        ],
        "defaultExpandHolderPosition": "bottom",
        'defaultLineShape': 4,
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
    setGraphData() {
        const data = { 'rootId': '', 'nodes': [], 'links': [] };
        //获取所有公司信息
        
        //获取所有公司关联信息

        data.nodes.forEach(thisNode => {
            if (thisNode.text === '深圳市腾讯计算机系统有限公司') {
                thisNode.width = 300;
                thisNode.height = 100;
                thisNode.offset_x = -80;
            } else if (thisNode.text && thisNode.text.length <= 3) {
                thisNode.width = 100;
                thisNode.height = 80;
                thisNode.offset_y = 80;
            } 
        });
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