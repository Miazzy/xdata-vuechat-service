/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
    if (!(typeof obj == 'object')) {
        return;
    }

    for (var key in obj) {
        if (
            obj.hasOwnProperty(key) &&
            (obj[key] == null || obj[key] == undefined || obj[key] === '')
        ) {
            delete obj[key];
        }
    }
    return obj;
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
    //如果时间格式含有T，yyyy-MM-ddThh:mm:ss,yyyy-MM-ddThh:mm:ss.SSSZ，这样做可以自动把+0:00时区的时间转为+8:00的时间
    if (typeof value == 'string' && value.includes('T')) {
        value = new Date(value);
    }

    //正则表达式
    var regPos = /^\d+(\.\d+)?$/;

    if (regPos.test(value) || value instanceof Date) {
        //如果是数字
        let getDate = value instanceof Date ? value : new Date(value);
        let o = {
            'M+': getDate.getMonth() + 1,
            'd+': getDate.getDate(),
            'h+': getDate.getHours(),
            'm+': getDate.getMinutes(),
            's+': getDate.getSeconds(),
            'q+': Math.floor((getDate.getMonth() + 3) / 3),
            S: getDate.getMilliseconds(),
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ?
                    o[k] :
                    ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }

        try {
            fmt = fmt.replace('T', ' ');
        } catch (error) {
            console.log('formate date error : ' + error);
        }

        return fmt;
    } else {
        //TODO
        try {
            if (typeof value == 'undefined' || value == null) {
                value = '--';
            }
            value = value.trim();
            fmt = value.substr(0, fmt.length);
            fmt = fmt.replace('T', ' ');
        } catch (error) {
            console.log('formate date error : ' + error);
        }

        return fmt;
    }
}

/**
 * @function 过滤空对象
 * @param {*} data
 */
export function deNull(data, defaultValue = '') {
    try {
        if (typeof data == 'undefined' || data == null || data == '' || JSON.stringify(data) == "{}") {
            return defaultValue;
        } else {
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 过滤空对象
 * @param {*} data
 */
export function isNull(data) {
    try {
        if (typeof data == 'undefined' || data == null || data == '' || JSON.stringify(data) == "{}") {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 过滤空对象
 * @param {*} data
 */
export function isBlank(data) {
    try {
        return isNull(data);
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function 过滤空对象
 * @param {*} data
 */
export function isEmpty(data) {
    try {
        return isNull(data);
    } catch (error) {
        console.log(error);
    }
}

/**
 * @function JS Sleep休眠函数
 * @param {*} time
 */
export async function sleep(time = 1000) {
    return new Promise(function(resolve) { return setTimeout(resolve, time) });
}

/**
 * @function 获取百分率占比(除法)
 * @param {*} value
 * @param {*} total
 * @param {*} ratio
 */
export function divisionPercentage(value = 0.0, total = 100.00, ratio = (0.00).toFixed(2)) {
    value = typeof value == 'string' ? parseFloat(value) : value;
    total = typeof total == 'string' ? parseFloat(total) : total;
    try {
        ratio = isNull(total) ? (0.00).toFixed(2) : parseFloat(value / total * 100).toFixed(2);
    } catch (error) {
        console.log(error);
    }
    return ratio;
}


/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * @function clone对象
 * @param {*} obj 被克隆对象
 */
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    if (arguments.length === 1) {
        let [length] = arguments;
        // 生成指定长度的随机数字，首位一定不是 0
        let nums = [...Array(length).keys()].map(
            i => (i > 0 ? random(0, 9) : random(1, 9))
        );
        return parseInt(nums.join(''));
    } else if (arguments.length >= 2) {
        let [min, max] = arguments;
        return random(min, max);
    } else {
        return Number.NaN;
    }
}

/**
 * @function 检查是否为微信
 */
export function isWechat() {
    var ua = navigator.userAgent.toLowerCase();
    var sua = window.localStorage.getItem('system_navigator_useragent') || '';
    if (ua.match(/MicroMessenger/i) == "micromessenger" || sua.match(/MicroMessenger/i) == "micromessenger") { //这就是微信用的内置浏览器
        return true;
    } else {
        return true;
    }
}

/**
 * @function 检查是否为微信
 */
export function isWework() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") { //这就是微信用的内置浏览器
        return true;
    } else {
        return false;
    }
}

/**
 * @function 检查是否为微信
 */
export function isPCWeb() {
    var ua = navigator.userAgent.toLowerCase();
    var sua = window.localStorage.getItem('system_navigator_useragent') || '';
    if (ua.match(/MicroMessenger/i) == "micromessenger" || sua.match(/MicroMessenger/i) == "micromessenger") { //这就是微信用的内置浏览器
        return false;
    } else {
        return true;
    }
}

export function queryZoneProject(company = '', name, zone = '', project = '') {
    let temp = company.split(name);
    console.log(`${temp.toString()}`);
    if (temp[1].includes('>')) {
        temp[1] = temp[1].replace('项目组>', '');
        zone = temp[1].split('>')[0];
        project = temp[1].split('>')[1];
    } else {
        zone = temp[1];
    }
    return { company, zone, project };
}

export function queryZoneProjectAll(company, cnamelist = ['领地集团有限公司', '领悦服务', '宝瑞商管', '医疗健康板块', '金融板块', '邛崃创达公司'], department = '') {
    try {
        let zone = '';
        let project = '';
        department = department.slice(department.lastIndexOf('>') + 1);
        for (const name of cnamelist) {
            if (company.includes(`>${name}>`)) {
                let temp = queryZoneProject(company, `>${name}>`);
                company = name;
                zone = temp.zone;
                project = temp.project;
                break;
            }
        }
        return { company, zone, project, department }
    } catch (error) {
        return { company, zone: '', project: '', department }
    }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
    if (!length) length = 1;
    if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    let str = '';
    for (let i = 0; i < length; i++) {
        let num = randomNumber(0, chats.length - 1);
        str += chats[num];
    }
    return str;
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
    let chats = '0123456789abcdef';
    return randomString(32, chats);
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string) {
    return string.replace(/_([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * @function 去除字符串中html标签
 * @param {*} str
 */
export function delHtmlTag(str) {
    try {
        if (isNull(str)) {
            return ""; //去掉所有的html标记
        } else {
            return deNull(str).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, ""); //去掉所有的html标记
        }
    } catch (error) {
        console.log(error);
    }
}

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