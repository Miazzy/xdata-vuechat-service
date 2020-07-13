import * as storage from '@/request/storage';
import * as tools from '@/request/tools';

/**
 * wxid-微信id
 * initial-姓名首字母
 * headerUrl-头像地址
 * nickname-昵称
 * sex-性别 男1女0
 * remark-备注
 * signature-个性签名
 * telphone-电话号码
 * album-相册
 * area-地区
 * from-来源
 * desc-描述
 */
const contact = { contacts: null };

export default contact;

export const ALL_USER_CACHE_KEY = 'ALL_USER_CACHE_KEY';

/**
 * 查询审批处理页面的记录
 */
export const queryUserList = async(params) => {

    //pageNo从0开始计算
    params.pageNo = params.pageNo - 1;

    //用户名称
    var whereFlag =
        tools.deNull(params.username) == '' ?
        '' :
        `_where=(username,like,~${params.username}~)~or(realname,like,~${params.username}~)&`;

    //获取排序标识，升序 ‘’ ， 降序 ‘-’
    var ascFlag = params.order == 'asc' ? '' : '-';

    //查询URL
    var queryURL = `${window.requestAPIConfig.restapi}/api/v_user?${whereFlag}_p=${params.pageNo}&_size=${params.pageSize}&_sort=${ascFlag}${params.column}`;
    var queryCountURL = `${window.requestAPIConfig.restapi}/api/v_user/count?${whereFlag}`;
    var result = {};

    try {

        var res = await superagent.get(queryURL).set('accept', 'json');
        var count = await superagent.get(queryCountURL).set('accept', 'json');
        console.log(res);

        //遍历并设置属性
        window.__.each(res.body, item => {
            try {
                item['wxid'] = item['username'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["initial"] = item['username'].slice(0, 1).toLowerCase();
            } catch (error) {
                console.log(error);
            }
            try {
                if (tools.isNull(item.avatar)) {
                    item["headerUrl"] = "https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/images/icon-manage-16.png";
                } else {
                    item['headerUrl'] = window._CONFIG['uploaxURL'] + '/' + item.avatar;
                }
            } catch (error) {
                console.log(error);
            }
            try {
                item["nickname"] = item['realname'];
            } catch (error) {
                console.log(error);
            }
            try {
                item["remark"] = item['realname'];
            } catch (error) {
                console.log(error);
            }
            item["signature"] = "";
            item["album"] = [{
                imgSrc: ""
            }];
            item["area"] = ["中国", "四川", "成都"];
            item["from"] = "通过企业联系人添加";
            item["tag"] = "";
            item["desc"] = {
                "title": "",
                "picUrl": ""
            }
            item['status'] = '1';
            item['orgCode'] = '';
            item['updateBy'] = '';
            item['createTime'] = tools.formatDate(item['create_time'], 'yyyy-MM-dd');
            item['createBy'] = 'admin';
            item['workNo'] = '';
            item['delFlag'] = '0';
            item['status_dictText'] = '';
            item['birthday'] = tools.formatDate(item['birthday'], 'yyyy-MM-dd');
            item['updateTime'] = item['createTime'];
            item['telephone'] = item['phone'];
            item['activitiSync'] = '';
            item['sex'] = '1';
            item['sex_dictText'] = '';
        });

        result.records = res.body;
        result.total =
            count.body[0].no_of_rows <= params.pageSize ?
            res.body.length :
            count.body[0].no_of_rows;

        return result;

    } catch (err) {
        console.log(err);
    }

}

export const queryContacts = async() => {
    var all = [];
    var count = 0;
    var cache = storage.getStore(ALL_USER_CACHE_KEY);

    if (tools.isNull(cache) || cache.length <= 0) {
        for (var i = 1; i < 10; i++) {
            let userlist = await queryUserList({ pageNo: i, pageSize: 99, order: 'desc', column: 'create_time' });
            userlist = userlist.records;
            count = userlist.total;
            if (tools.isNull(userlist) || userlist.length <= 0) {
                break;
            } else {
                all = [...all, ...userlist];
            }
        }
        storage.setStore(ALL_USER_CACHE_KEY, all, 3600 * 24);
    } else {
        all = cache;
    }

    return all;
}

export const getUserInfo = (wxid) => {
    if (!wxid) {
        return;
    } else {
        var contacts = storage.getStore(ALL_USER_CACHE_KEY);
        for (var index in contacts) {
            if (contacts[index].wxid === wxid) {
                return contacts[index]
            }
        }
    }
}

contact.getUserInfo = getUserInfo;
