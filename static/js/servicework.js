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
                "https://cdn.jsdelivr.net/gh/Miazzy/xdata-utils-btools@v1.2.4/dist/betools.min.js",
                "/static/fonts/iconfont@v1.0.1.ttf", //    15.3 kB           
                "/static/fonts/iconfont@v1.0.1.eot", //    15.4 kB           
                "/static/img/iconfont@v1.0.1.svg", //    88.2 kB           
                "/static/js/0@v1.0.1.js", //    46.4 kB         
                "/static/js/1@v1.0.1.js", //    12.2 kB          
                "/static/js/2@v1.0.1.js", //    34.8 kB          
                "/static/js/3@v1.0.1.js", //    11.6 kB          
                "/static/js/4@v1.0.1.js", //    15.2 kB          
                "/static/js/5@v1.0.1.js", //    63.5 kB          
                "/static/js/6@v1.0.1.js", //    25.6 kB          
                "/static/js/7@v1.0.1.js", //    27.3 kB          
                "/static/js/8@v1.0.1.js", //    10.5 kB          
                "/static/js/9@v1.0.1.js", //    35.3 kB          
                "/static/js/10@v1.0.1.js", //    36.5 kB         
                "/static/js/11@v1.0.1.js", //    44.2 kB      11   
                "/static/js/12@v1.0.1.js", //      43 kB      12   
                "/static/js/13@v1.0.1.js", //    38.6 kB      13   
                "/static/js/14@v1.0.1.js", //    69.6 kB      14   
                "/static/js/15@v1.0.1.js", //    86.5 kB      15   
                "/static/js/16@v1.0.1.js", //    70.3 kB      16   
                "/static/js/17@v1.0.1.js", //    53.9 kB      17   
                "/static/js/18@v1.0.1.js", //    52.1 kB      18   
                "/static/js/19@v1.0.1.js", //    70.1 kB      19   
                "/static/js/20@v1.0.1.js", //    81.5 kB      20   
                "/static/js/21@v1.0.1.js", //     101 kB      21   
                "/static/js/22@v1.0.1.js", //    53.2 kB    
                "/static/js/23@v1.0.1.js", //      54 kB   
                "/static/js/24@v1.0.1.js", //    64.9 kB      24   
                "/static/js/25@v1.0.1.js", //    82.1 kB      25   
                "/static/js/26@v1.0.1.js", //    83.2 kB      26   
                "/static/js/27@v1.0.1.js", //    96.3 kB      27   
                "/static/js/28@v1.0.1.js", //    47.5 kB      28   
                "/static/js/29@v1.0.1.js", //    65.1 kB      29   
                "/static/js/30@v1.0.1.js", //    71.2 kB      30   
                "/static/js/31@v1.0.1.js", //    32.8 kB      31   
                "/static/js/32@v1.0.1.js", //    79.5 kB      32   
                "/static/js/33@v1.0.1.js", //    34.8 kB      33   
                "/static/js/34@v1.0.1.js", //    40.3 kB      34   
                "/static/js/35@v1.0.1.js", //    42.2 kB      35   
                "/static/js/36@v1.0.1.js", //    36.8 kB      36   
                "/static/js/37@v1.0.1.js", //    35.6 kB      37   
                "/static/js/38@v1.0.1.js", //    30.7 kB      38   
                "/static/js/39@v1.0.1.js", //    19.7 kB      39   
                "/static/js/40@v1.0.1.js", //    34.4 kB      40   
                "/static/js/41@v1.0.1.js", //    31.9 kB      41   
                "/static/js/42@v1.0.1.js", //    37.7 kB      42   
                "/static/js/43@v1.0.1.js", //    36.6 kB      43   
                "/static/js/44@v1.0.1.js", //    28.4 kB      44   
                "/static/js/45@v1.0.1.js", //      11 kB      45   
                "/static/js/46@v1.0.1.js", //    11.3 kB      46   
                "/static/js/47@v1.0.1.js", //    1.29 kB      47   
                "/static/js/48@v1.0.1.js", //    37.7 kB      48   
                "/static/js/49@v1.0.1.js", //    37.4 kB      49   
                "/static/js/50@v1.0.1.js", //    20.5 kB      50   
                "/static/js/51@v1.0.1.js", //    4.17 kB      51   
                "/static/js/52@v1.0.1.js", //    7.42 kB      52   
                "/static/js/53@v1.0.1.js", //  756 bytes      53   
                "/static/js/54@v1.0.1.js", //  843 bytes      54   
                "/static/js/55@v1.0.1.js", //    5.38 kB      55   
                "/static/js/56@v1.0.1.js", //    2.46 kB      56   
                "/static/js/57@v1.0.1.js", //    3.66 kB      57   
                "/static/js/58@v1.0.1.js", //    4.48 kB      58   
                "/static/js/59@v1.0.1.js", //    2.86 kB      59   
                "/static/js/60@v1.0.1.js", //    6.08 kB      60   
                "/static/js/61@v1.0.1.js", //    4.46 kB      61   
                "/static/js/62@v1.0.1.js", //     2.8 kB      62   
                "/static/js/63@v1.0.1.js", //    2.68 kB      63   
                "/static/js/64@v1.0.1.js", //    2.33 kB      64   
                "/static/js/65@v1.0.1.js", //    1.37 kB      65   
                "/static/js/66@v1.0.1.js", //    5.04 kB      66   
                "/static/js/67@v1.0.1.js", //    2.99 kB       
                "/static/js/vendor@v1.0.1.js",
                "/static/js/app@v1.0.1.js",
                "/static/js/manifest@v1.0.1.js",
                "/static/css/app@v1.0.1.css",
                "/static/css/app@v1.0.1.css.map",
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