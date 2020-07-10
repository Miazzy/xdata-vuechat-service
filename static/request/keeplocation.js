//设置别名
var wstorage = localStorage;
//查询位置信息
function queryLocationInfo(info) {
    if (info != '' && typeof info != 'undefined' && info != null) {
        window.ip_location = info;
        console.log('location info :' + JSON.stringify(info));
        wstorage.setItem(`system_location_info`, JSON.stringify(info));
    } else {
        wstorage.removeItem(`system_location_info`);
    }
}

window.queryLocationInfo = queryLocationInfo;