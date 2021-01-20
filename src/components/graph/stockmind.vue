<template>
  <mindmap v-model="data" style="height:100vh;"></mindmap>
</template>

<script>
import mindmap from '@hellowuxin/mindmap'
export default {
  components: { mindmap },
  data: () => ({
    data: [{
      "name":"",
      "children": [
        {
          "name":"股东",
          "children": [],
        },
        {
          "name":"高管",
          "children": [],
        },
        {
          "name":"对外投资",
          "children": [],
        },
        {
          "name":"分支机构",
          "children": [],
        },
      ],
    }]
  }),
  async created() {

  },
  async mounted() {
    await this.setGraphData()
  },
  methods: {
    async setGraphData() {
        const companyID = 25; //获取所有公司信息
        const nodes = await Betools.query.queryTableDataByWhereSQL('bs_company_flow_base' , `_where=(id,eq,25)~and(status,eq,0)&_sort=-id`);
        const invs = await Betools.query.queryTableDataByWhereSQL('bs_company_stockholder' , `_where=(company_id,eq,25)~and(status,eq,valid)&_sort=-id`);
        const persons = await Betools.query.queryTableDataByWhereSQL('bs_company_senior_executive' , `_where=(company_id,eq,25)~and(status,eq,valid)&_sort=-id`);
        const branchs = await Betools.query.queryTableDataByWhereSQL('bs_company_branch' , `_where=(company_id,eq,25)&_sort=-id`);
        const asInvs = await Betools.query.queryTableDataByWhereSQL('bs_company_investments' , `_where=(relation_company_id,eq,25)&_sort=-id`);
        invs.map(item => {item.id = 'invs_' + item.id ; item.name = item.holder_name; item.desc = '控股: ' + item.ratio + '%'; });
        persons.map(item => {item.id = 'persons_' + item.id ;item.name = item.holder_name; item.desc = item.position; });
        branchs.map(item => {item.id = 'branchs_' + item.id ; item.desc = '法人: ' + item.principal; });
        asInvs.map(item => {item.id = 'asInvs_' + item.id ;item.name = item.company_name; item.desc= '法人: ' + item.legal_person; });
        this.data[0].name = nodes && nodes.length > 0 ? nodes[0].name : '' ,
        this.data[0].children[0].children = invs;
        this.data[0].children[1].children = persons;
        this.data[0].children[2].children = asInvs;
        this.data[0].children[3].children = branchs;
    }
  }
}
</script>