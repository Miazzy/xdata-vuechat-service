<template>
  <mindmap
    :nodes="nodes"
    :connections="connections"
    :editable="false"
  />
</template>

<script>
  export default {
    name: 'MyMindmap',
    data() {
      return {
        nodes: [],
        connections: [],
      }
    },
    methods: {
        async setGraphData() {
            this.nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(level,lt,100)~and(level,gt,0)~and(id,gt,17)&_sort=-id`); //获取所有公司信息
            this.links = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_link' , '_where=(status,in,0)&_sort=-id'); //获取所有公司关联信息
            this.nodes.forEach(item => { item.text = item.name });
            this.links.forEach(item => { item.source = item.from_company; item.target = item.to_company; });
        },
        onNodeExpand(node, e) {
        
        }
    }
  }
</script>