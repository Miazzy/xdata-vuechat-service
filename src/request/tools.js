/**
 * @function 字符串缩略函数
 * @param {*} str
 */
export function abbreviation(str, length = 75) {
    try {

        if (deNull(str).length < length) {
            return deNull(str).trim();
        } else {
            return deNull(str).trim().substring(0, length) + '...';
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 查询文档对应预览地址
 * @param {*} text
 */
export async function queryFileViewURL(text) {

    //文档URL
    var url = '';

    //查询文档对应预览地址
    try {
        //获取小写文档下载地址
        var textURL = deNull(text).toLowerCase();
        //如果不含有office文档
        if (!(
                textURL.includes('doc') ||
                textURL.includes('ppt') ||
                textURL.includes('xls') ||
                textURL.includes('pdf')
            )) {
            return false;
        }

        //文档数组
        var fileList = [];

        if (text.indexOf(',') > 0) {
            fileList = text.split(',');
        } else {
            fileList.push(text);
        }

        //获取第一个office文档
        url = window.__.find(fileList, function(text) {
            //获取小写字符串
            text = deNull(text).toLowerCase();
            return (
                text.includes('doc') ||
                text.includes('ppt') ||
                text.includes('xls') ||
                text.includes('pdf')
            );
        });

        //文档下载地址
        url = window._CONFIG['docDownURL'] + '/' + url;
        //暂存文档地址
        var tempUrl = `${url}`;

        //URL加密，保证中文路径可以被正常解析
        var xurl = url.replace('files/', 'files/convert/');
        //去掉后缀
        xurl = xurl.substring(0, xurl.lastIndexOf('.'));

        //获取文件后缀
        var suffix = deNull(url).substring(url.lastIndexOf('.'), url.length).toLowerCase();

        //如果word文档，则使用微软API打开
        url = deNull(suffix).includes('xls') ? xurl + '.html' : url;
        //如果word文档，则使用微软API打开
        url = deNull(suffix).includes('doc') || deNull(suffix).includes('ppt') || deNull(suffix).includes('pdf') ?
            xurl + '.pdf' :
            url;

        //待检测URL
        var checkURL = decodeURIComponent(url);

        //打印checkURL
        console.log('checkURL :' + checkURL);

        //设置加密路径
        xurl = encodeURIComponent(xurl);

        //如果word文档，则使用微软API打开
        url =
            deNull(suffix).includes('doc') ||
            deNull(suffix).includes('ppt') ||
            deNull(suffix).includes('pdf') ?
            decodeURIComponent(xurl) + '.pdf' : url;

        //检测文件URL标识
        var existFlag = await queryUrlValid(checkURL);

        //如果文件地址不存在，则使用kkfileview预览模式
        if (!existFlag) {
            url = tempUrl;
        } else {
            url = checkURL;
        }

        //打印预览地址日志
        console.log('preview url :' + url);
    } catch (error) {
        //打印错误日志
        console.log('query file view url error :' + error);
    }

    //返回URL
    return url;
}

/**
 * @function 检测URL是否有效
 * @param {*} url
 */
export async function queryUrlValid(url) {
    //提交URL
    var queryURL = `${window._CONFIG['validURL']}${url}`;

    try {
        var res = await window.superagent.get(queryURL);
        console.log(' url :' + url + ' result :' + JSON.stringify(res));
        return res.body.success;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取URL参数值
 * @param {*} val
 */
export function getUrlParam(name) {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg); //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取URL参数值
 * @param {*} val
 */
export function queryUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}

/**
 * @function URI加密
 * @param {*} value
 */
export function encodeURI(value) {
    return window.encodeURIComponent(value);
}

/**
 * @function URI解密
 * @param {*} value
 */
export function decodeURI(value) {
    return window.decodeURIComponent(value);
}

/**
 * 获取URL参数值
 * @param {*} val
 */
export function queryUrlString(name, flag = 'history') {
    try {
        if (flag == 'history') {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg); //匹配目标参数
            if (r != null) {
                if (name == 'system_type') {
                    localStorage.setItem('system_type', decodeURI(r[2]));
                }
                return decodeURI(r[2]);
            } else if (name == 'system_type') {
                return localStorage.getItem('system_type') || 'v2'
            }
            return null; //返回参数值
        } else {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
            var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
            if (r != null) return unescape(r[2]);
        }
    } catch (error) {
        console.error(error);
    }
    return '';
}

/**
 * @function 合成唯一编码
 */
export function queryUniqueID(length = 32) {
    //日期格式化
    var timestamp = new Date().getTime();
    //定义动态编码
    var id = formatDate(timestamp, "yyyyMMddhhmmssS");
    //打印日志
    console.log('动态编号 :' + id);
    //定义随机编码
    var random = (Math.floor(Math.random() * 100000000000000000000) + "") + (Math.floor(Math.random() * 100000000000000000000) + "");
    //打印随机编码
    console.log('随机编号 :' + random);
    //合成动态编码
    id = (id + random).replace(/\./g, '').substring(0, length);
    //返回唯一编码
    return id;
}

/**
 * @function 电话号码隐藏中间4位
 * @param {*} mobile 
 */
export function mobileHide(mobile) {
    mobile = mobile.slice(0, 11);
    var re = /(\d{3})(\d{4})(\d{4})/;
    return mobile.replace(re, "$1****$3");
}

/**
 * @function 电话号码隐藏中间4位
 * @param {*} mobile 
 */
export function mobileEnsconce(mobile) {
    mobile = mobile.slice(0, 11);
    var re = /(\d{3})(\d{4})(\d{4})/;
    return mobile.replace(re, "$1****$3");
}

/**
 * @function 检测字符串是否包含字符函数
 * @param {*} origin
 * @param {*} arg
 */
export function contain(origin, arg) {

    //设置前后缀信息
    origin = `,${origin},`;

    //设置包含的用户
    var ready = '';

    //设置数组信息
    var array = null;

    try {
        array = arg.split(',');

        //遍历数据，并查询出含有的用户数据
        for (var item of array) {
            ready = origin.includes(`,${item},`) ? `${ready},${item}` : ready;
        }

    } catch (error) {
        console.log(error);
    }

    //去掉字符串开头的逗号
    if (ready.startsWith(',')) {
        ready = ready.substring(1);
    }

    //去掉字符串结尾的逗号
    if (ready.endsWith(',')) {
        ready = ready.substring(0, ready.length - 1);
    }

    //返回包含的用户数据
    return ready;
}