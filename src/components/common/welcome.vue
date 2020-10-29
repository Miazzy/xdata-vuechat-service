<template>
    <div class="welcome" :class="{hide:hide}">
        <img :src="src" alt="">
    </div>
</template>
<script>
import * as tools from '@/request/tools';

export default {
    data() {
        return {
            hide: false,
            src:``,
            msrc:`https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@8.0.0/images/background.jpeg`,
            psrc:`http://oa.leading-group.com:90/page/resource/userfile/image/ecology8/leading.jpg`,
        }
    },
    mounted() {
        const timestamp = tools.isPCWeb() ? 300 : 500;
        setTimeout(() => {
            this.hide = true
        }, timestamp);
    },
    created(){
      this.src = tools.isPCWeb() ? this.psrc : this.msrc;
    },
}
</script>
<style>

.welcome {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 6;
    background: #000b17;
    animation: welcome 0.5s;
    transition: 0.3s;
    -webkit-transition: 0.3s;
}

.welcome img {
    width: 100%;
    height: 100%;
}

.welcome.hide{
    opacity: 0;
    visibility: hidden;
}

</style>
