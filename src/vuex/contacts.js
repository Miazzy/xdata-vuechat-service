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

export const getUserInfo = async(wxid) => {
    try {
        return await Betools.contact.getUserInfo(wxid); //如果没有从缓存数据库中查询处理，则查询服务器
    } catch (error) {
        console.log(error);
    }
}

contact.getUserInfo = getUserInfo;

export default contact;