import * as tools from '@/request/tools';

/**
 * 获取行政公告数据
 */
export async function queryAnnounceList(page = 0, size = 50) {

    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/bs_announce?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        var result = res.body;

        //遍历并格式化日期
        window.__.each(result, function(item) {
            var optime = tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
            var ctime = tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['timestamp'] = time;
            item['username'] = tools.deNull(item['username']).split(',');
            item['table_name'] = 'bs_announce';
            item['content'] = item['content'] || item['title'];
        });

        return result;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取红头文件数据
 */
export async function queryHeadList(page = 0, size = 50) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/bs_redhead?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        var result = res.body;

        //遍历并格式化日期
        window.__.each(result, function(item) {
            var optime = tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
            var ctime = tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['timestamp'] = time;
            item['username'] = tools.deNull(item['username']).split(',');
            item['table_name'] = 'bs_redhead';
            item['content'] = item['content'] || item['title'];
        });

        return result;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取新闻资讯数据
 */
export async function queryNewsList(page = 0, size = 50) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/bs_news?_where=(bpm_status,in,4,5)&_sort=-create_time&_p=${page}&_size=${size}`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        var result = res.body;

        //遍历并格式化日期
        window.__.each(result, function(item) {
            var optime = tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
            var ctime = tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['timestamp'] = time;
            item['username'] = tools.deNull(item['username']).split(',');
            item['table_name'] = 'bs_news';
            item['content'] = item['content'] || item['title'];
        });

        return result;
    } catch (err) {
        console.log(err);
    }
}
