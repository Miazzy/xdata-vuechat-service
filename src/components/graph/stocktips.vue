<template>
  <div>
    <div ref="myPage" style="height:calc(100vh - 50px);">
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick">
        <div slot="node" slot-scope="{node}" @mouseover="showNodeTips(node, $event)" @mouseout="hideNodeTips(node, $event)">
          <div style="width:100px;height:100px;margin-top:20px;border-radius: 0px;cursor: pointer;">
            {{ node.text }}
          </div>
        </div>
      </SeeksRelationGraph>
    </div>
    <div v-if="isShowNodeTipsPanel" :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }" style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
      <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">{{currentNode.text}}</div>
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4AdvNodeTips.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      isShowCodePanel: false,
      isShowNodeTipsPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentNode: {},
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        'defaultLineShape': 2,
        'defaultNodeShape': 0,
        'defaultNodeWidth': '120',
        'defaultNodeHeight': '120',
        'defaultNodeBorderWidth': 1
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    }
  },
  mounted() {
    this.showSeeksGraph()
  },
  methods: {
    async showSeeksGraph(query) {
      const data = { rootId: '18', nodes: [], links: [] };
        //获取所有公司信息
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(level,lt,100)~and(level,gt,0)&_fields=id,name&_sort=-id`);
        //获取所有公司关联信息
        const links = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_link' , '_where=(status,in,0)&_fields=id,from,to&_sort=-id');
        data.nodes = nodes;
        data.links = links;
        data.nodes.forEach(thisNode => { });
      this.$refs.seeksRelationGraph.setJsonData(data, (seeksRGGraph) => {      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject)
    },
    showNodeTips(nodeObject, $event) {
      this.currentNode = nodeObject
      var _base_position = this.$refs.myPage.getBoundingClientRect()
      console.log('showNodeMenus:', $event, _base_position)
      this.isShowNodeTipsPanel = true
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10
    },
    hideNodeTips(nodeObject, $event) {
      this.isShowNodeTipsPanel = false
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>