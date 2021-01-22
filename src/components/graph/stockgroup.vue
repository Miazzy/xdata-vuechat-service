
<template>
  <div>
    <div v-loading="g_loading" style="width: calc(100% - 2px);height:calc(100vh - 50px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4SceneGroup.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
export default {
  name: 'SeeksRelationGraphDemo',
  data() {
    return {
      g_loading: true,
      graphOptions: {
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'center',
            'layoutClassName': 'seeks-layout-center',
            'allowSwitchLineShape': true,
            'allowSwitchJunctionPoint': true,
            'useLayoutStyleOptions': true,
          },
        ],
        "defaultExpandHolderPosition": "bottom",
        'defaultLineShape': 2,
        'defaultNodeShape': 0,
        'defaultNodeWidth': '120',
        'defaultNodeHeight': '120',
        'defaultNodeBorderWidth': 1
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
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(level,lt,100)~and(level,gt,0)&_fields=id,name&_sort=-id`);
        //获取所有公司关联信息
        const links = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_link' , '_where=(status,in,0)&_fields=id,from,to&_sort=-id');
        data.nodes = nodes;
        data.links = links;
        data.nodes.forEach(thisNode => { });
        this.$refs.seeksRelationGraph.setJsonData(data, (seeksRGGraph) => {
        })
    }
  }
}
</script>
<style scoped>
</style>