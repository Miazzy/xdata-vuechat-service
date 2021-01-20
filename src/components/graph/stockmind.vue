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
    }
  }
</script>