<template>
  <mindmap v-model="data" style="height:100vh;"></mindmap>
</template>

<script>
import mindmap from '@hellowuxin/mindmap'

export default {
  components: { mindmap },
  data: () => ({
    data: [{
      "name":"如何学习D3",
      "children": [
        {
          "name":"预备知识",
          "children": [
            { "name":"HTML & CSS" },
            { "name":"JavaScript" },
          ]
        },
        {
          "name":"安装",
          "children": [
            { "name": "折叠节点" }
          ]
        },
        {
          "name":"进阶",
          "left": true
        },
      ]
    }]
  })
}
</script>