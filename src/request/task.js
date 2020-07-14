import * as tools from '@/request/tools';
import * as storage from '@/request/storage';

//计时待办任务常量数组
export const TIME_TASK_NAME = ['请假申请表', '外出申请表', '加班申请表', '出差申请表', '车补申请表'];

export async function queryProcessLogDone(
    username,
    realname,
    page = 0,
    size = 50,
) {
    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_handled_events_unq?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;
    var result = {};
    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        result = res.body;

        //遍历并格式化日期
        result = window.__.filter(result, function(item) {
            //格式化日期
            var optime = tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
            var ctime = tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            var dtime = tools.formatDate(item['create_time'], 'yyyy-MM-dd hh:mm:ss');
            item['createtime'] = dtime;
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['timestamp'] = time;
            item['username'] = tools.deNull(item['username']).split(',');
            item['content'] = tools.abbreviation(tools.delHtmlTag(item['content']));
            item['topic'] = tools.abbreviation(tools.delHtmlTag(item['topic']));

            //查询是否存在此用户名
            var flag =
                window.__.contains(item['username'], username) ||
                window.__.contains(item['username'], realname);

            //返回结果
            return flag;
        });

        //根据ID编号去掉重复的数据
        result = window.__.uniq(result, false, 'id');

        return result;
    } catch (err) {
        console.log(err);
    }
}

export async function queryProcessLogWait(
    username,
    realname,
    page = 0,
    size = 50,
) {
    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_handling_events?_where=(username,like,~${username}~)~or(username,like,~${realname}~)&_p=${page}&_size=${size}&_sort=-create_time`;
    var result = {};

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        console.log(res);
        result = res.body;
        result = window.__.filter(result, function(item) {
            //格式化日期
            var optime = tools.formatDate(item['operate_time'], 'yyyy-MM-dd');
            var ctime = tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            var time = tools.formatDate(item['create_time'], 'yyyyMMddhhmmss');
            var dtime = tools.formatDate(item['create_time'], 'yyyy-MM-dd hh:mm:ss');
            item['createtime'] = dtime;
            item['timestamp'] = time;
            item['operate_time'] = optime;
            item['create_time'] = ctime;
            item['username'] = tools.deNull(item['username']).split(',');
            item['content'] = tools.abbreviation(tools.delHtmlTag(item['content']));
            item['topic'] = tools.abbreviation(tools.delHtmlTag(item['topic']));

            //查询是否存在此用户名，且已处理用户中，不含登录用户
            var flag =
                (window.__.contains(item['username'], username) ||
                    window.__.contains(item['username'], realname)) &&
                !item.user.includes(username);

            //返回结果
            return flag;
        });

        return result;
    } catch (err) {
        console.log(err);
    }
}