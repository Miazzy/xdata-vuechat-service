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
const contacts = [{ //昵称备注都有的朋友
    "wxid": "wxid_zhaohd",
    "initial": 'z',
    "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png",
    "nickname": "阿荡",
    "sex": 1, //1男 0女
    "remark": "阿荡",
    "signature": "填坑小能手",
    "telphone": 18896586152,
    "album": [{
        imgSrc: ""
    }],
    "area": ["中国", "北京", "海淀"],
    "from": "通过企业OA添加",
    "tag": "",
    "desc": {
        "title": "",
        "picUrl": ""
    }
}]

let contact = { contacts };

contact.getUserInfo = (wxid) => {
    if (!wxid) {
        return;
    } else {
        for (var index in contacts) {
            if (contacts[index].wxid === wxid) {
                return contacts[index]
            }
        }
    }
}

export default contact