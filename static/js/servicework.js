self.addEventListener('install', function(event) {
    console.log(event);
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            let resp = null;
            const cacheList = [
                "/index.html",
                "https://cdn.jsdelivr.net/npm/vant@2.9/lib/index.css",
                "https://cdn.jsdelivr.net/npm/@nutui/nutui@2.2.10/dist/nutui.min.css",
                "https://unpkg.com/muse-ui/dist/muse-ui.css",
                "https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css",
                "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/antd.min.css",
                "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css",
                "https://cdn.jsdelivr.net/gh/Miazzy/vue-excel-editor@r1.0.2/dist/datepicker.min.css",
                "https://cdn.jsdelivr.net/gh/Miazzy/vue-excel-editor@r1.0.2/dist/vue-excel-editor.umd.min.css",
                "https://cdn.jsdelivr.net/gh/Miazzy/photoswipe@v5.0.0/dist/photoswipe.css",
                "https://cdn.jsdelivr.net/gh/Miazzy/photoswipe@v5.0.0/dist/default-skin/default-skin.css",
                "https://cdn.bootcdn.net/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r1.0.0/request/keeplocation.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/vue/vue.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/vuex.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/axios.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/dayjs/dayjs.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/moment.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/localforage.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/superagent.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/underscore-min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r2.3.0/request/keepconfig.js",
                "https://cdn.jsdelivr.net/npm/vant@2.9/lib/vant.min.js",
                "https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/xdata-vue-excel@v1.0.1/dist/vue-json-excel.umd.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/vue-xlsx@v1.0.0/docs/dist/vue-xlsx.umd.js",
                "https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js",
                "https://cdn.jsdelivr.net/npm/@handsontable/vue/dist/vue-handsontable.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/js-xlsx@r1.0.0/dist/xlsx.full.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/vue-excel-editor@r1.0.2/dist/datepicker.min.js",
                "https://cdn.jsdelivr.net/npm/sortablejs@1.8.4/Sortable.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/vue-excel-editor@r1.0.2/dist/vue-excel-editor.umd.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@x1.0.0/cdn/common//qrcode.min.js",
                "https://webapi.amap.com/maps?v=2.0&key=801a8f79cee7c592c263add18813489b",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/antd.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@r2.3.0/config/config.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/request/request.js",
                "https://cdn.jsdelivr.net/npm/@nutui/nutui@2.2.10/dist/nutui.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/cdn/common/FileSaver.min.js",
                "https://cdn.jsdelivr.net/gh/YunWisdom/vConsole@v3.3.6/dist/vconsole.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/vue-excel-editor@r1.0.3/dist/xeditor.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/xdata-utils-btools@v1.3.2/dist/betools.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/fastclick@v1.0.7/lib/fastclick.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/photoswipe@v5.0.0/dist/photoswipe.min.js",
                "https://cdn.jsdelivr.net/gh/Miazzy/photoswipe@v5.0.0/dist/photoswipe-ui-default.min.js",
                "/static/fonts/iconfont@v1.0.2.ttf",
                "/static/fonts/iconfont@v1.0.2.eot",
                "/static/img/iconfont@v1.0.2.svg",
                "/static/js/0@v1.0.2.js",
                "/static/js/1@v1.0.2.js",
                "/static/js/2@v1.0.2.js",
                "/static/js/3@v1.0.2.js",
                "/static/js/4@v1.0.2.js",
                "/static/js/5@v1.0.2.js",
                "/static/js/6@v1.0.2.js",
                "/static/js/7@v1.0.2.js",
                "/static/js/8@v1.0.2.js",
                "/static/js/9@v1.0.2.js",
                "/static/js/10@v1.0.2.js",
                "/static/js/11@v1.0.2.js",
                "/static/js/12@v1.0.2.js",
                "/static/js/13@v1.0.2.js",
                "/static/js/14@v1.0.2.js",
                "/static/js/15@v1.0.2.js",
                "/static/js/16@v1.0.2.js",
                "/static/js/17@v1.0.2.js",
                "/static/js/18@v1.0.2.js",
                "/static/js/19@v1.0.2.js",
                "/static/js/20@v1.0.2.js",
                "/static/js/21@v1.0.2.js",
                "/static/js/22@v1.0.2.js",
                "/static/js/23@v1.0.2.js",
                "/static/js/24@v1.0.2.js",
                "/static/js/25@v1.0.2.js",
                "/static/js/26@v1.0.2.js",
                "/static/js/27@v1.0.2.js",
                "/static/js/28@v1.0.2.js",
                "/static/js/29@v1.0.2.js",
                "/static/js/30@v1.0.2.js",
                "/static/js/31@v1.0.2.js",
                "/static/js/32@v1.0.2.js",
                "/static/js/33@v1.0.2.js",
                "/static/js/34@v1.0.2.js",
                "/static/js/35@v1.0.2.js",
                "/static/js/36@v1.0.2.js",
                "/static/js/37@v1.0.2.js",
                "/static/js/38@v1.0.2.js",
                "/static/js/39@v1.0.2.js",
                "/static/js/40@v1.0.2.js",
                "/static/js/41@v1.0.2.js",
                "/static/js/42@v1.0.2.js",
                "/static/js/43@v1.0.2.js",
                "/static/js/44@v1.0.2.js",
                "/static/js/45@v1.0.2.js",
                "/static/js/46@v1.0.2.js",
                "/static/js/47@v1.0.2.js",
                "/static/js/48@v1.0.2.js",
                "/static/js/49@v1.0.2.js",
                "/static/js/50@v1.0.2.js",
                "/static/js/51@v1.0.2.js",
                "/static/js/52@v1.0.2.js",
                "/static/js/53@v1.0.2.js",
                "/static/js/54@v1.0.2.js",
                "/static/js/55@v1.0.2.js",
                "/static/js/56@v1.0.2.js",
                "/static/js/57@v1.0.2.js",
                "/static/js/58@v1.0.2.js",
                "/static/js/59@v1.0.2.js",
                "/static/js/60@v1.0.2.js",
                "/static/js/61@v1.0.2.js",
                "/static/js/62@v1.0.2.js",
                "/static/js/63@v1.0.2.js",
                "/static/js/64@v1.0.2.js",
                "/static/js/65@v1.0.2.js",
                "/static/js/66@v1.0.2.js",
                "/static/js/67@v1.0.2.js",
                "/static/js/vendor@v1.0.2.js",
                "/static/js/app@v1.0.2.js",
                "/static/js/manifest@v1.0.2.js",
                "/static/css/app@v1.0.2.css",
                "/static/css/app@v1.0.2.css.map",
                "/static/js/servicework.js",
                "/static/request/keeparticle.js",
                "/static/request/analysis.js",
                "/static/request/keepconfig.js",
                "/static/request/keepfingerprint.js",
                "/static/request/keepkooteam.js",
                "/static/request/keeplocation.js",
                "/static/request/keepsleep.js",
                "/static/request/keeptokenvld.js",
                "/static/request/keepssl.js",
                "/static/request/keepalive.js",
                "/static/request/layout.js",
                "/static/request/topics.js",
                "/static/request/requestflow.js",
                "/static/request/request.js",
            ];
            try {
                resp = cache.addAll(cacheList);
            } catch (error) {
                console.log(error);
            }
            return resp;
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function(response) {
                let responseClone = response.clone();
                if (/\.(png|jpg|gif|html|js|css|ico|svg|jpeg|map|doc|docx|ppt|pptx|xls|xlsx|pdf|eot|ttf|woff|woff2|json|txt)$/.test(event.request.url.toLocaleLowerCase())) {
                    caches.open('v1').then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(function() {
                return false;
            });
        }
    }));
});