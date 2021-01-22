import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import store from './vuex/store';
import filters from './filters'; //将全部过滤器放在 filters/index.js 中便于管理
import '@/reservice'; //注册service worker服务

import singleSelect from './components/common/singleSelect';
import checkSelect from './components/common/checkSelect';

try {
    Vue.use(VueAxios, axios, Vue); //技巧 同时 use 多个插件 被依赖的插件应放在偏后方
    Vue.use(xediter.default, vant.Empty, vant.Lazyload, vant.Icon, vant.Dialog, vant.AddressList); //设置VueExcel编辑组件
    Vue.use(VueMindmap);
    Vue.component("SeeksRelationGraph", relationGraph || null);
    Vue.component("downloadExcel", JsonExcel || null);
    Vue.component("singleSelect", singleSelect || null);
    Vue.component("checkSelect", checkSelect || null);
    Vue.component(VueWordCloud.name, VueWordCloud);
    Vue.component("vueD3Cloud", vueD3Cloud.default);
} catch (error) {
    console.log(error);
}

try {
    filters(Vue); // 注册全局过滤器
    Vue.config.productionTip = false; //将此值设置为 false ,会关闭 Vue 启动时的提示信息，推荐
    FastClick.attach(document.body); //注册移动端快速点击功能
} catch (error) {
    console.log(error);
}

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});