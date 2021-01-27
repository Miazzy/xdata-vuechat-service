# oa-front-service的移动端

### 概述

基于Vue的OA系统移动端，具备自主研发的工作流程引引擎，含基本的OA业务（请假，外出，打卡，签到，考勤等）

### 界面截图

<img src="https://images.gitee.com/uploads/images/2020/0703/183806_c6606be6_499098.jpeg" width="32%" style="margin-right:10px">

<img src="https://images.gitee.com/uploads/images/2020/0703/184010_d4b3c5c8_499098.jpeg" width="32%" style="margin-right:10px">

<img src="https://images.gitee.com/uploads/images/2020/0703/184020_b233a769_499098.jpeg" width="32%" style="margin-right:10px">

<img src="https://images.gitee.com/uploads/images/2020/0703/184029_cda0b920_499098.jpeg" width="32%" style="margin-right:10px">

<img src="https://images.gitee.com/uploads/images/2020/0703/184039_c908a267_499098.jpeg" width="32%" style="margin-right:10px">

### 演示地址

http://app.shengtai.club/#/app

**开源地址：https://gitee.com/yunwisdoms/oa-vuchat-service**

> 若觉得不错想给作者**点个赞**，可以给项目增加一个 Star ★，项目会被收录在 Your stars 中，方便日后查看。
> 若想时时**关注**项目动态，可 Watch ⊙ 此项目，github平台会及时通知你项目的动态，你的邮箱也会收到通知。

### 技术相关

* [vue-WeChat Wiki](https://gitee.com/yunwisdoms/oa-vuchat-service/wiki) 中记录了开发此项目需要的知识储备、开发思路、开发利器等。内容会不断更新，实际上想把它建成个人快速开发的代码库。
* 每个主要的.vue和.js文件都有详细的**注释**提示，建议将仓库`clone`到本地，查看源码。


### 问题反馈

建议移步[Issues](https://gitee.com/yunwisdoms/oa-vuchat-service/issues)，欢迎反馈项目中的不良/错误表现，以及你在开发过程遇到的问题，作者会积极回复。



### 其他

* [vue-see](https://github.com/zhaohaodang/vue-see) 适用于 Vue.2x 的图片预览插件
* 项目使用的webpack已更新到3.0版本，请安装webpack3.0，否则build失败

#### Account 

* 13689075109

### L*********7
### 泛微在线文档
https://e-cloudstore.com/doc.html#ecode%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E

### 泛微e8流程首页
http://oa.leading-group.com:90/workflow/request/RequestTypeShow.jsp?offical=&colnum4show=mulitcol&fromadvancedmenu=0&selectedContent=&infoId=0&needPopupNewPage=true&needall=0&prjid=&docid=&crmid=&hrmid=&topage=&isec=&usedtodo=-1

## spug 账号
admin/Miazzy@163.com$***
```js
https://api.yunwisdom.club:30443/api/v2/mysql/updata_zonename
https://api.yunwisdom.club:30443/api/v1/datasync_schedule_sign
https://api.yunwisdom.club:30443/api/v3/mysql/backup
https://api.yunwisdom.club:30443/api/v1/datasync
https://api.yunwisdom.club:30443/api/v1_cd/wework_depart_user/2/1
https://api.yunwisdom.club:30443/api/v1_cd/wework_sdepart_user/1/1
https://api.yunwisdom.club:30443/api/v1_cd/wework_depart/1
https://api.yunwisdom.club:30443/api/v1_cd/wework_depart_list/1
https://api.yunwisdom.club:30443/api/v2/mysql/serial/update_seal_info
https://api.yunwisdom.club:30443/api/v3/employee
https://api.yunwisdom.club:30443/api/v2/wework_depart_list/2
https://api.yunwisdom.club:30443/api/v2/wework_depart/2
https://api.yunwisdom.club:30443/api/v2/wework_sdepart_user/2/1
https://api.yunwisdom.club:30443/api/v2/wework_depart_user/2/1
https://api.yunwisdom.club:30443/api/v2/mysql/serial/bs_seal_regist/serialid/id
```
## eyeblue 账号
zhaoziyu/Miazzy@163.com$***

### 定时执行，防止前台、财务、档案人员等不存在
```sql
update bs_seal_regist set front = seal where (front = '' or front is null) and seal is not null ;
update bs_seal_regist set finance = seal where (finance = '' or finance is null) and seal is not null ;
update bs_seal_regist set record = seal where (record = '' or record is null) and seal is not null ;
update bs_seal_regist set archive = seal where (archive = '' or archive is null) and seal is not null ;
update bs_seal_regist set front_name = seal_man where (front_name = '' or front_name is null) and seal is not null ;
update bs_seal_regist set record_name = seal_man where (record_name = '' or record_name is null) and seal is not null ;
update bs_seal_regist set finance_name = seal_man where (finance_name = '' or finance_name is null) and seal is not null ;
update bs_seal_regist set archive_name = seal_man where (archive_name = '' or archive_name is null) and seal is not null ;
update bs_seal_regist set seal_group_ids = 'yanggc,chenll,zhaozy1028' where seal_group_ids like '%yanggc%';
update bs_seal_regist set zone_name = '领地集团总部' where zone_name is null and seal_group_ids like '%yanggc%';
update bs_seal_regist set zone_name = '物业总部' where zone_name is null and seal_group_ids like '%longcl%';
```
