self.addEventListener('install', function(event) {
    console.log(event);
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
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
                "https://cdn.jsdelivr.net/gh/Miazzy/xdata-utils-btools@v1.2.2/dist/betools.min.js",
            ]);
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
                if (/\.(png|jpg|gif|html|js|css|ico|svg|jpeg|doc|docx|ppt|pptx|xls|xlsx|pdf|eot|ttf|woff|woff2|json|txt)$/.test(event.request.url.toLocaleLowerCase())) {
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