<template>
  <div id="login" style="">
      <div class="main-content" style="" >
        <div class="main-title" style="">
          <span>账号/手机/邮箱登录</span>
        </div>
        <div class="main-account" style="">
          <input class="input-account" type="text" placeholder="请输入账号/手机/邮箱" style="" v-model="username" />
        </div>
        <div class="main-password" style="">
          <input class="input-password" type="password" placeholder="请输入密码" style="" v-model="password" />
        </div>
        <div class="main-login" style="" >
          <span class="span-login" style="" @click="userLogin" >登录</span>
        </div>
        <div class="main-forget" style="">
          <span class="span-forget" style="" >忘记密码？</span>
        </div>
        <div class="main-loading" :style=" loading ? 'display:block;':'display:none;' ">
          <van-loading type="spinner" size="48px" style="text-align:text;" />
        </div>
      </div>
  </div>
</template>
<script>
export default {
    mixins: [window.mixin],
    data() {
        return {
            pageName: "登录",
            momentNewMsg: true,
            customActiveKey: "tab1",
            loginInfo:{},
            username:'',
            password:'',
            loading:false,
            contactsInitialList:[],
            contactsList:[],
        }
    },
    activated() {
      this.clearLoginInfo();
    },
    mounted() {
      this.clearLoginInfo();
    },
    created(){
      this.clearLoginInfo();
    },
    methods:{
      // 将联系人根据首字母进行分类
      async queryContactsInitialList(){
          var initialList = [];
          var allContacts = await Betools.contact.queryContacts();
          var max = allContacts.length;
          for (var i = 0; i < max; i++) {
              if (initialList.indexOf(allContacts[i].initial.toUpperCase()) == -1) {
                  initialList.push(allContacts[i].initial.toUpperCase());
              }
          }
          return initialList.sort();
      },
      // 将联系人根据首字母进行分类
      async queryContactsList() {
          var initialList = [];
          var contactsList = [];
          var allContacts = await Betools.contact.queryContacts();
          var contactsInitialList = await this.queryContactsInitialList();
          var max = allContacts.length;
          for (var i = 0; i < contactsInitialList.length; i++) {
              var protoTypeName = contactsInitialList[i];
              contactsList[protoTypeName] = [];
              for (var j = 0; j < max; j++) {
                  if (allContacts[j].initial.toUpperCase() === protoTypeName) {
                      contactsList[protoTypeName].push(allContacts[j]);
                  }
              }
          }
          return contactsList;
      },
      async userLogin(){
        //检查用户是否存在
        let vuser = await queryUserInfoByView(this.username);
        //显示加载状态
        this.loading = true;
        try {
          if(Betools.tools.isNull(this.username)){
            vant.Toast('请输入账号/手机/邮箱登录！');
          } else if(Betools.tools.isNull(this.password)){
            vant.Toast('请输入密码！');
          } else if(Betools.tools.isNull(vuser)){
            vant.Toast('此账户不存在！');
          } else {
            let username = this.username;
            let password = this.password;
            let response = await superagent
                  .post(`${window.requestAPIConfig.domain}/jeecg-boot/sys/login`)
                  .send({"remember_me":true,"auto_login":false,"username":username,"password":password})
                  .set('accept', 'application/json');
            if(!Betools.tools.isNull(response) && !Betools.tools.isNull(response.body)
              && response.body.code == 200 && response.body.message == "登录成功"){
                let userinfo = response.body.result.userInfo;
                let token = response.body.result.token;
                let department = response.body.result.departs;
                userinfo.password = password;
                Betools.storage.setStore('system_linfo' , JSON.stringify({username:username,password:password}) , 3600 * 24 * 30);
                Betools.storage.setStore('system_userinfo' , JSON.stringify(userinfo) , 3600 * 24 * 30);
                Betools.storage.setStore('system_token' , JSON.stringify(token) , 3600 * 24 * 30);
                Betools.storage.setStore('system_department' , JSON.stringify(department) , 3600 * 24 * 30);
                Betools.storage.setStore('system_login_time' , dayjs().format('YYYY-MM-DD HH:mm:ss') , 3600 * 24 * 30);
                vant.Toast('登录成功！');
                this.$router.push(`/explore`);
                this.loading = false;
            } else {
                vant.Toast('登录失败: ' + response.body.message);
                this.loading = false;
            }
          }
        } catch (error) {
          this.loading = false;
        }
      },
      async clearLoginInfo(){
        try {
          let userinfo = await Betools.storage.getStore('system_linfo');
          if(userinfo && userinfo.username && userinfo.password){
            this.username = userinfo.username;
            this.password = userinfo.password;
          }
          Betools.storage.clearStore('system_userinfo');
          Betools.storage.clearStore('system_token');
          Betools.storage.clearStore('system_department');
          Betools.storage.clearStore('system_login_time');
        } catch (error) {
          console.log(error);
        }
      }
    }
}
</script>
<style>
@import "../../assets/css/explore.css";
@import "../../assets/css/login.css";
</style>
