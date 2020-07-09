<template>
    <!--标签组件 体验挺糟糕-->
    <div>
        <header id="wx-header">
            <!--<div class="other"><span>添加朋友</span></div>-->
            <div class="center">
                <router-link to="/contact" tag="div" class="iconfont icon-left">
                    <span>通讯录</span>
                </router-link>
                <span>标签</span>
            </div>
        </header>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_access" href="javascript:;">
                <div class="weui-cell__bd">
                    <i class="weui-icon-success" style="float:left"></i>
                    <p>新建标签</p>
                </div>
                <div class="weui-cell__ft">
                </div>
            </a>
        </div>
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>女朋友(0)</p>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <p>基友(999+)</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
