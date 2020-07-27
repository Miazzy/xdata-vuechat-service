import * as tools from '@/request/tools';
import * as storage from '@/request/storage';

/**
 * 获取某业务记录对应的审批日志信息(历史)
 */
export async function queryPRLogHistoryByDataID(business_data_id) {

    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_history?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=99`;

    //获取缓存中的数据
    var cache = storage.getStore(`sys_workflow_cache@$history&id${business_data_id}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_workflow_cache@$history&id${business_data_id}`, res.body, 600);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息(当前)
 */
export async function queryPRLogByDataID(business_data_id) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=99`;

    //获取缓存中的数据
    var cache = storage.getStore(`sys_workflow_cache@$now&id${business_data_id}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_workflow_cache@$now&id${business_data_id}`, res.body, 600);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息(知会)
 */
export async function queryPRLogInformedByDataID(business_data_id) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/pr_log_informed?_where=(business_data_id,eq,${business_data_id})&_sort=operate_time&_p=0&_size=99`;

    //获取缓存中的数据
    var cache = storage.getStore(`sys_workflow_cache@$informed&id${business_data_id}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_workflow_cache@$informed&id${business_data_id}`, res.body, 600);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 获取某业务记录对应的审批日志信息(知会)
 */
export async function queryPRLogUserByPage(page, size) {
    //提交URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_uname?_p=${page}&_size=${size}&_sort=username`;

    //获取缓存中的数据
    var cache = storage.getStore(`sys_workflow_username@$all&p=${page}&size=${size}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');

        console.log(res);

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_workflow_username@$all&p=${page}&size=${size}`, res.body, 3600 * 24);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

export async function queryUserAll() {

    let all = [];

    //获取缓存中的数据
    var cache = storage.getStore(`sys_workflow_user_all@$all`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    for (let i = 0; i <= 100; i++) {
        let segment = await queryPRLogUserByPage(i, 99);

        if (segment != null && segment.length > 0) {
            all.push(...segment);
        } else {
            break;
        }
    }

    if (all != null && all.length > 0) {
        storage.setStore(`sys_workflow_user_all@$all`, all, 3600 * 24);
    }

    return all;

}


export async function queryUserByName(username) {

    let all = await queryUserAll();

    let user = all.find((info) => {
        let flag = info.username == username;
        return flag;
    })

    return user.realname;

}
