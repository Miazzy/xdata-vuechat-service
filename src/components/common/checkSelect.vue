//封装VanFieldCheckbox组件
<template>
  <div>
    <van-field
      v-model="resultLabel"
      v-bind="$attrs"
      readonly
      is-link
      input-align="right"
      @click="show = !show"
    />
    <van-popup v-model="show" position="bottom" class="" >
       <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="cancel">取消</button>
        <div class="van-ellipsis van-picker__title">{{$attrs.label}}</div>
        <button type="button" class="van-picker__confirm" @click="onConfirm">确认</button>
      </div>
      <div class="checkbox-con"  style="max-height:264px;overflow-y:auto">
        <van-cell title="全选">
            <template #right-icon>
                <van-checkbox name="all" @click="toggleAll"  v-model="checkedAll"/>
              </template>
          </van-cell>
        <van-checkbox-group v-model="checkboxValue" @change="change" ref="checkboxGroup">
          <van-cell-group>
            <van-cell
              v-for="(item, index) in columns"
              clickable
              :key="item[option.value]"
              :title="item[option.label]"
              @click="toggle(index)"
            >
              <template #right-icon>
                <van-checkbox :name="item[option.value]" ref="checkboxes" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'CheckSelect',
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
      type: Array,
      default: function () {
        return []
      }
    },
    option: {
      type: Object,
      default: function () {
        return { label: 'label', value: 'value' }
      }
    }
  },
  computed: {
    resultLabel: {
      get () {
        const res = this.columns.filter(item => {
          return this.resultValue.indexOf(item[this.option.value]) > -1
        })
        const resLabel = res.map(item => {
          return item[this.option.label]
        })
        return resLabel.join(',')
      },
      set () {

      }
    }
  },
  data () {
    return {
      show: false,
      checkboxValue: JSON.parse(JSON.stringify(this.selectValue)),
      checkedAll: false,
      resultValue: JSON.parse(JSON.stringify(this.selectValue))
    }
  },
  methods: {
    getData (val) {//过滤出所选数据的obj集合
      const res = this.columns.filter(item => {
        return val.indexOf(item[this.option.value]) > -1
      })
      return res
    },
    onConfirm () {//确定
      this.resultValue = this.checkboxValue
      this.show = !this.show
      this.$emit('confirm', this.resultValue, this.getData(this.resultValue))
    },
    change (val) {//当数据选中变化时
      this.$emit('change', val, this.getData(this.resultValue))
    },
    cancel () {//取消
      this.show = !this.show
      this.$emit('cancel', this.resultValue)
    },
    toggle (index) {//cell点击事件，同步checkbox
      this.$refs.checkboxes[index].toggle()
    },
    toggleAll (all) {//全选
      this.$refs.checkboxGroup.toggleAll(this.checkedAll)
    }
  },
  watch: {
    selectValue: function (newVal) {
      this.resultValue = newVal
    },
    resultValue (val) {
      this.$emit('input', val)
    },
    checkboxValue (val) {//监听数据变化，判断全选的状态
      if (val.length !== this.columns.length) {
        this.checkedAll = false
      } else {
        this.checkedAll = true
      }
    }
  }
}
</script>

<style>
.van-cell__title{text-align: left;}
</style>
