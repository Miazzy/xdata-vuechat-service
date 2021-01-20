<template>
  <mindmap
    :nodes="nodes"
    :connections="connections"
    :editable="true"
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