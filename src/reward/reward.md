### ecology8 setup reward data record

$('#rightBox>#null_box').find('.e8_btn_top').after('<input type="button" class="e8_btn_top" _disabled="true" value="奖罚" title="奖罚" style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">')

<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<div id="app">
  <el-button @click="visible = true">Button</el-button>
  <el-dialog :visible.sync="visible" title="Hello world">
  </el-dialog>
</div>

<script>
  new Vue({
    el: '#app',
    data: function() {
      return { visible: false }
    }
  })
</script>
