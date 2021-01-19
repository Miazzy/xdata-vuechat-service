<template>
  <div>
    <div style="width: calc(100% - 2px);height:calc(100vh - 50px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="userGraphOptions" />
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
      userGraphOptions: {
        'backgrounImage': '',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '手工',
            'layoutName': 'fixed',
            'layoutClassName': 'seeks-layout-fixed',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'allowSwitchLineShape': true,
            'allowSwitchJunctionPoint': true,
            'useLayoutStyleOptions': false,
            'max_per_width': '150',
            'min_per_height': '250',
          }
        ],
        'defaultNodeBorderWidth': 0,
        'defaultNodeShape': 1,
        'allowShowMiniNameFilter': false,
        'allowShowMiniToolBar': false,
        'defaultJunctionPoint': 'lr',
        'defaultLineShape': 2,
        "defaultExpandHolderPosition": "bottom",
      },
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
        const companyID = 25; //获取所有公司信息
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(id,eq,25)~and(status,eq,0)&_sort=-id`);
        const invs = await Betools.query.queryTableDataByWhereSQL('bs_company_stockholder' , `_where=(company_id,eq,25)~and(status,eq,valid)&_sort=-id`);
        const persons = await Betools.query.queryTableDataByWhereSQL('bs_company_senior_executive' , `_where=(company_id,eq,25)~and(status,eq,valid)&_sort=-id`);
        const branchs = await Betools.query.queryTableDataByWhereSQL('bs_company_branch' , `_where=(company_id,eq,25)&_sort=-id`);
        const asInvs = await Betools.query.queryTableDataByWhereSQL('bs_company_investments' , `_where=(relation_company_id,eq,25)&_sort=-id`);
        invs.map(item => {item.id = 'invs_' + item.id ; item.text = item.holder_name; item.desc = '控股: ' + item.ratio + '%'; });
        persons.map(item => {item.id = 'persons_' + item.id ;item.text = item.holder_name; item.desc = item.position; });
        branchs.map(item => {item.id = 'branchs_' + item.id ;item.text = item.name; item.desc = '法人: ' + item.principal; });
        asInvs.map(item => {item.id = 'asInvs_' + item.id ;item.text = item.company_name; item.desc= '法人: ' + item.legal_person; });
        debugger;
        const _orign_data = {
            entname: nodes && nodes.length > 0 ? nodes[0].name : '' ,
            invs: invs , 
            persons: persons ,
            asInvs: asInvs,
            branchs: branchs ,
        }
        var _graphSetting = this.$refs.seeksRelationGraph.graphSetting
        this.$refs.seeksRelationGraph.graphSetting.defaultLineShape = 1
        const _center = {
            x: (_graphSetting.viewSize.width) / 2 - _graphSetting.canvasOffset.x,
            y: (_graphSetting.viewSize.height) / 2 - _graphSetting.canvasOffset.y
        };
        var graphData = {
            rootId: 'root',
            nodes: [],
            links: []
        };
        // 添加根节点和虚拟节点
        var rootNode = { id: graphData.rootId, name: _orign_data.entname, styleClass: 'c-g-center', color: '#A4C1FF', width: 250, height: 50, x: _center.x - 125, y: _center.y - 25 }
        var invRootNode = { id: 'invRoot', name: '股东', styleClass: 'c-g-group-node', color: '#FFC5A6', width: 100, height: 50 }
        var personRootNode = { id: 'personRoot', name: '高管', styleClass: 'c-g-group-node', color: '#B9FFA7', width: 100, height: 50 }
        var asinvRootNode = { id: 'asinvRoot', name: '对外投资', styleClass: 'c-g-group-node', color: '#FFBEC1', width: 100, height: 50 }
        var branchRootNode = { id: 'branchRoot', name: '分支机构', styleClass: 'c-g-group-node', color: '#FFA1F8', width: 100, height: 50 }
        invRootNode.x = _center.x - 200 - invRootNode.width
        invRootNode.y = _center.y - 130
        personRootNode.x = _center.x - 200 - personRootNode.width
        personRootNode.y = _center.y + 90
        asinvRootNode.x = _center.x + 200
        asinvRootNode.y = _center.y - 130
        branchRootNode.x = _center.x + 200
        branchRootNode.y = _center.y + 90
        // 添加节点数据到graphData
        graphData.nodes.push(rootNode)
        graphData.nodes.push(invRootNode)
        graphData.nodes.push(personRootNode)
        graphData.nodes.push(asinvRootNode)
        graphData.nodes.push(branchRootNode)
        // 添加根节点和虚拟节点之间的关系，并将关系数据放入graphData
        graphData.links.push({ from: rootNode.id, to: invRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
        graphData.links.push({ from: rootNode.id, to: personRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
        graphData.links.push({ from: rootNode.id, to: asinvRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
        graphData.links.push({ from: rootNode.id, to: branchRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 })
        // 将股东加入虚拟节点"股东"
        _orign_data.invs.forEach((thisNode, _index) => {
            thisNode.width = 200
            thisNode.x = invRootNode.x - 300 - thisNode.width
            thisNode.y = invRootNode.y + _index * 35 * -1 + 50
            graphData.nodes.push(thisNode)
            graphData.links.push({ from: invRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFC5A6', arrow: 'none', lineShape: 4 })
        })
        // 将高管加入虚拟节点"高管"
        _orign_data.persons.forEach((thisNode, _index) => {
            thisNode.width = 200
            thisNode.x = personRootNode.x - 200 - thisNode.width
            thisNode.y = personRootNode.y + _index * 35
            graphData.nodes.push(thisNode)
            graphData.links.push({ from: personRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#B9FFA7', arrow: 'none', lineShape: 4 })
        })
        // 将对外投资企业加入虚拟节点"对外投资"
        _orign_data.asInvs.forEach((thisNode, _index) => {
            thisNode.x = asinvRootNode.x + 300
            thisNode.y = asinvRootNode.y + _index * 35 * -1 + 50
            graphData.nodes.push(thisNode)
            graphData.links.push({ from: asinvRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFBEC1', lineShape: 4 })
        })
        // 将分支机构加入虚拟节点"分支机构东"
        _orign_data.branchs.forEach((thisNode, _index) => {
            thisNode.x = branchRootNode.x + 300
            thisNode.y = branchRootNode.y + _index * 35
            graphData.nodes.push(thisNode)
            graphData.links.push({ from: branchRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFA1F8', lineShape: 4 })
        })
        this.$refs.seeksRelationGraph.setJsonData(graphData, (seeksRGGraph) => {
        })
    }
  }
}
</script>
<style scoped>
</style>