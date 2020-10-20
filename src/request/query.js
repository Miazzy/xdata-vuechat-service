import * as storage from '@/request/storage';
import * as tools from '@/request/tools';

export async function queryUserInfoByView(username) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key http://api.shengtai.club/api/v_admin?_where=(username,eq,zhaoziyun)
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_user?_where=(username,eq,${username})`;

    //定义查询结果
    var result = null;

    try {
        //先检测缓存中，是否有数据，如果没有数据，则从数据库中查询
        result = storage.getStore(`system_v_user_info@username$${username}`);

        if (!(typeof result != 'undefined' && result != null && result != '')) {
            //发送HTTP请求，获取返回值后，设置数据
            var res = await superagent.get(queryURL).set('accept', 'json');
            //设置返回结果
            result = res.body;

            //设置缓存数据，缓存时间，暂定为5秒钟
            storage.setStore(
                `system_v_user_info@username$${username}`,
                result,
                3600 * 24
            );
        }
    } catch (err) {
        console.log(err);
    }

    //返回查询后的动态数据
    return result;
}

/**
 * @function 查询表字段信息
 * @param {*} tableName
 */
export async function queryTableFieldInfoJSON(tableName) {
    //初始化
    window.tools = window.tools == null ? tools : window.tools;

    try {
        //查询表单信息
        var tableInfo = await queryTableDataByField(
            'v_table_info',
            'id',
            tableName
        );
        //如果信息不为空，则解析表单信息
        if (window.tools.deNull(tableInfo) != '' && tableInfo.length > 0) {
            try {
                tableInfo = window.tools.deNull(tableInfo[0]['value']);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
        //如果信息不为空，则进行解析数据
        if (window.tools.deNull(tableInfo) != '') {
            try {
                tableInfo = JSON.parse(tableInfo);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
    } catch (error) {
        console.log('query table field info json error :' + error);
    }
    return tableInfo;
}

/**
 * @function 查询表字段信息
 * @param {*} tableName
 */
export async function queryTableFieldOrderJSON(tableName) {
    //初始化
    window.tools = window.tools == null ? tools : window.tools;

    try {
        //查询表单信息
        var tableInfo = await queryTableDataByField(
            'v_table_info',
            'id',
            tableName
        );
        //如果信息不为空，则解析表单信息
        if (window.tools.deNull(tableInfo) != '' && tableInfo.length > 0) {
            try {
                tableInfo = window.tools.deNull(tableInfo[0]['num']);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
        //如果信息不为空，则进行解析数据
        if (window.tools.deNull(tableInfo) != '') {
            try {
                tableInfo = JSON.parse(tableInfo);
            } catch (error) {
                console.log('tabale info :' + tableInfo);
            }
        }
    } catch (error) {
        console.log('query table field info json error :' + error);
    }
    return tableInfo;
}


/**
 * 查询数据
 * @param {*} tableName
 * @param {*} foreignKey
 * @param {*} id
 */
export async function queryTableDataByField(tableName, field, value) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(${field},eq,${value})`;

    try {
        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryTableData(tableName, id) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}/${id}`;

    try {
        //获取缓存中的数据
        var cache = storage.getStore(`sys_user_cache@${tableName}&id${id}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_user_cache@${tableName}&id${id}`, res.body[0], 2);
        }

        return res.body[0];
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryTableDataByPid(tableName, id) {

    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(pid,eq,${id})&_sort=create_time`;

    try {
        //获取缓存中的数据
        var cache = storage.getStore(`sys_user_cache@${tableName}&pid${id}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_user_cache@${tableName}&pid${id}`, res.body, 2);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryRoleGroupList(name, username = '') {

    //大写转小写
    const tableName = 'bs_admin_group';
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(groupname,eq,${name})~and(userlist,like,~${username}~)&_sort=create_time`;

    try {
        //获取缓存中的数据
        var cache = storage.getStore(`sys_user_cache@${tableName}&groupname${name}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_user_cache@${tableName}&groupname${name}`, res.body, 2);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryMessages(wxid, wxid_, maxId = 0) {

    //大写转小写
    const tableName = 'bs_message';
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=((team,like,~${wxid},${wxid_}~)~or(team,like,~${wxid_},${wxid}~))&_sort=-id`;

    try {
        //获取缓存中的数据
        var cache = storage.getStore(`sys_message_cache##v1@${tableName}&wxid${wxid}|wxid_${wxid_}|maxid${maxId}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_message_cache##v1@${tableName}&wxid${wxid}|wxid_${wxid_}|maxid${maxId}`, res.body, 5);
        }

        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} id
 */
export async function queryVMessages(wxid, username, maxId = 0) {

    //大写转小写
    const tableName = 'v_messages';
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?_where=(team,like,~${wxid}~)&_sort=-id&_p=0&_size=100`;

    try {
        //获取缓存中的数据
        var cache = storage.getStore(`sys_message_cache##v1@${tableName}&wxid${wxid}}|maxid${maxId}`);

        //返回缓存值
        if (typeof cache != 'undefined' && cache != null && cache != '') {
            return cache;
        }

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {

            for (item of res.body) {

                item.mid = item.id;
                item.newMsgCount = 1;
                item.quiet = true;
                item.type = 'friend';
                item.userid = item.team.replace(wxid, '').replace(username, '');
                const temp = await contact.getUserInfo(item.userid);

                //获取聊天对象信息
                item.user = [temp];
                item.msg = [item.content];

            };

            storage.setStore(`sys_message_cache##v1@${tableName}&wxid${wxid}}|maxid${maxId}`, res.body, 10);
        }


        return res.body;
    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryTableDataByWhereSQL(tableName, whereSQL) {
    //大写转小写
    tableName = tableName.toLowerCase();
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/${tableName}?${whereSQL}`;

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');
        return res.body;

    } catch (err) {
        console.log(err);
    }
}

/**
 * 查询数据
 * @param {*} tableName
 * @param {*} whereSQL
 */
export async function queryUserInfoByAccount(userid) {
    //更新URL PATCH	/api/tableName/:id	Updates row element by primary key
    var queryURL = `${window.requestAPIConfig.restapi}/api/v2/queryemployee/${userid}`;

    //获取缓存中的数据
    var cache = storage.getStore(`sys_user_cache_account#queryemployee#@${userid}`);

    //返回缓存值
    if (typeof cache != 'undefined' && cache != null && cache != '') {
        return cache;
    }

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');

        if (res.body != null && res.body.length > 0) {
            storage.setStore(`sys_user_cache_account#queryemployee#@${userid}`, res.body, 3600 * 24 * 31);
            return res.body;
        } else if (!tools.isNull(res.text)) {
            storage.setStore(`sys_user_cache_account#queryemployee#@${userid}`, res.text, 3600 * 24 * 31);
            return JSON.parse(res.text)
        }

    } catch (err) {
        console.log(err);
    }
}