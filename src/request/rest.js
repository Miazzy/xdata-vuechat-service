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