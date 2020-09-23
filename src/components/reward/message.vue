<template>
  <div id="reward-message">

  </div>
</template>
<script>
import * as storage from "@/request/storage";
import * as tools from "@/request/tools";

export default {
  mixins: [window.mixin],
  data() {
    return {
      pageName: "奖惩消息",
      momentNewMsg: true,
    }
  },
  activated() {
    this.$store.commit("toggleTipsStatus", -1);
    this.changeStyle();
    this.displayFoot();
  },
  mounted() {
    this.changeStyle();
    this.displayFoot();
  },
  methods: {
    changeStyle(name) {},
    displayFoot() {},
    async userLogin() {},
    async clearLoginInfo() {},
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.message.css";
</style>
