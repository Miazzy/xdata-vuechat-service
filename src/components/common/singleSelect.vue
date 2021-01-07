<template>
  <div>
    <van-field
      v-model="resultLabel"
      v-bind="$attrs"
      readonly
      is-link
      input-align="left"
      @click="show = !show"
    />
    <van-popup v-model="show" position="bottom">
      <van-picker
        v-bind="$attrs"
        :columns="columns"
        show-toolbar
        @cancel="cancel"
        @confirm="onConfirm"
        @change="change"
        :value-key="this.option.label"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'SingleSelect',
  model: {
    prop: 'selectValue'
  },
  props: {
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectValue: {
      type: [String, Number],
      default: ''
    },
    option: {
      type: Object,
      default: function () {
        return { label: 'label', value: 'value' }
      }
    }
  },
  computed: {
    resultLabel: {//双向绑定的数据做修改需要用get/set
      get () {
        const res = this.columns.filter(item => {
          return item[this.option.value] === this.resultValue
        })
        return res.length ? res[0][this.option.label] : ''
      },
      set () {

      }
    }
  },
  data () {
    return {
      show: false,//Popup是否弹出
      resultValue: this.selectValue //初始选中数据
    }
  },
  methods: {
    onConfirm (value, index) {//确定
      this.resultValue = value[this.option.value]
      this.show = !this.show
      this.$emit('confirm', value, index, this.resultValue)
    },
    change (val, index) {//当数据改变
      this.$emit('change', val, index, this.resultValue)
    },
    cancel (val, index) {//取消
      this.show = !this.show
      this.$emit('cancel', val, index, this.resultValue)
    }
  },
  watch: {
    selectValue: function (newVal) {//监听变化初始赋值
      this.resultValue = newVal
    },
    resultValue (val) {//当所选数据变化，组件model的双向绑定
      this.$emit('input', val)
    }
  }
}
</script>
<style>
</style>