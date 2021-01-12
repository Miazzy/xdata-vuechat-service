<template>
  <div :id="option.classID" >
    <van-field
      v-model="resultLabel"
      v-bind="$attrs"
      readonly
      is-link
      input-align="left"
      @click="show = !show"
    />
    <van-popup v-model="show" position="bottom" class="" style="max-height:500px;" >
       <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" @click="cancel">取消</button>
        <div class="van-ellipsis van-picker__title">{{$attrs.label}}</div>
        <button type="button" class="van-picker__confirm" @click="onConfirm">确认</button>
      </div>
      <div class="checkbox-con"  style="max-height:464px; overflow-y:auto">
        <van-search v-if="option.search" v-model="searchWord" show-action placeholder="请输入搜索关键词" >
          <template #action>
            <div @click="search" >搜索</div>
          </template>
        </van-search>
        <van-cell v-if="option.all" title="全选" style="margin:5px 5px;">
          <template #right-icon>
            <van-checkbox name="all" @click="toggleAll"  v-model="checkedAll"/>
          </template>
        </van-cell>
        <van-checkbox-group v-model="checkboxValue" @change="change" ref="checkboxGroup">
          <van-cell-group>
            <van-cell
              :style="option.margin"
              v-for="(item, index) in columns"
              clickable
              :key="item[option.value]"
              :title="item[option.label]"
              @click="toggle(index)"
            >
              <div v-if="item[option.title]">{{item[option.title]}}</div>
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
        return [] ;
      }
    },
    columns_origin: {
      type: Array,
      default: function () {
        return this.columns ? JSON.parse(JSON.stringify(this.columns)) : [];
      }
    },
    selectValue: {
      type: Array,
      default: function () {
        return [];
      }
    },
    option: {
      type: Object,
      default: function () {
        return { label: 'label', value: 'value',title:'title' } ;
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
      searchWord:'',
      allColumns:[],
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
    },
    search(){
      const key = this.searchWord;
      this.columns_origin = this.columns_origin && this.columns_origin.length > 0 ? this.columns_origin : this.columns;
      this.columns = this.columns_origin.filter( item => {
        const content = JSON.stringify(item);
        return content ? content.includes(key) : false ;
      });
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
<style scoped>

#van-field-check-select .van-cell__title{
  text-align: left;
  margin: 30px 5px 0px 0px;
}
#van-field-check-select .van-cell__value {
    position: absolute;
    overflow: hidden;
    color: #969799;
    text-align: right;
    vertical-align: middle;
    word-wrap: break-word;
}
</style>
