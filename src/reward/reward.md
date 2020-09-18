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

### add request pages

#健康申报
http://oa.leading-group.com:90/workflow/request/AddRequest.jsp?workflowid=3465&isagent=0&beagenter=0&f_weaver_belongto_userid=
#设计修改费用立项
http://oa.leading-group.com:90/workflow/request/AddRequest.jsp?workflowid=3379&isagent=0&beagenter=0&f_weaver_belongto_userid=
