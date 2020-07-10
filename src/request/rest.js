import * as storage from '@/request/storage';

var queryUserInfoByView = async(username) => {
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
                3600 * 2
            );
        }
    } catch (err) {
        console.log(err);
    }

    //返回查询后的动态数据
    return result;
}