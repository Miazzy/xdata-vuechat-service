<template>
  <div>
    <orgchart :datasource="ds" style="height:100vh;width:100%;border:0px solid #fefefe;"></orgchart>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ds: {
          'id': '1',
          'name': 'Lao Lao',
          'title': 'general manager',
          'children': [
            { 'id': '2', 'name': 'Bo Miao', 'title': 'department manager' },
            { 'id': '3', 'name': 'Su Miao', 'title': 'department manager',
              'children': [
                { 'id': '4', 'name': 'Tie Hua', 'title': 'senior engineer' },
                { 'id': '5', 'name': 'Hei Hei', 'title': 'senior engineer',
                  'children': [
                    { 'id': '6', 'name': 'Pang Pang', 'title': 'engineer' },
                    { 'id': '7', 'name': 'Xiang Xiang', 'title': 'UE engineer' },
                    { 'id': '10', 'name': 'Tie Hua Hua', 'title': 'senior engineer' },
                    { 'id': '11', 'name': 'Hei Hei Hi', 'title': 'senior engineer'},
                    { 'id': '12', 'name': 'Tie Hua Hua', 'title': 'senior engineer' },
                    { 'id': '13', 'name': 'Hei Hei Hi', 'title': 'senior engineer'},
                    { 'id': '14', 'name': 'Tie Hua Hua', 'title': 'senior engineer' },
                    { 'id': '15', 'name': 'Hei Hei Hi', 'title': 'senior engineer'},
                    { 'id': '16', 'name': 'Tie Hua Hua', 'title': 'senior engineer' },
                    { 'id': '17', 'name': 'Hei Hei Hi', 'title': 'senior engineer'},
                  ]
                 }
               ]
             },
            { 'id': '8', 'name': 'Hong Miao', 'title': 'department manager' },
            { 'id': '9', 'name': 'Chun Miao', 'title': 'department manager' }
          ]
        }
      }
    }
  }
</script>