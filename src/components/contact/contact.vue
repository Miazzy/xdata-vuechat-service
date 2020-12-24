<template>
    <div id="contact">
        <section>
            <div class="weui-cells_contact-head weui-cells weui-cells_access" style="margin-top:-1px">
                <router-link to="/contact/new-friends" class="weui-cell">
                    <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-friend-notify.png"> </div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>新的朋友</p>
                    </div>
                </router-link>
                <router-link to="/contact/group-list" class="weui-cell">
                    <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-addgroup.png"> </div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>我的群组</p>
                    </div>
                </router-link>
                <router-link to="/contact/tags" class="weui-cell" style="display:none;">
                    <div class="weui-cell_hd"> <img class="img-obj-cover" src="../../assets/images/contact_top-tag.png"> </div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>标签</p>
                    </div>
                </router-link>
                <router-link to="/contact/official-accounts" class="weui-cell">
                    <div class="weui-cell_hd"><img class="img-obj-cover" src="../../assets/images/contact_top-offical.png"></div>
                    <div class="weui-cell_bd weui-cell_primary">
                        <p>应用号</p>
                    </div>
                </router-link>
            </div>
            <!--联系人集合-->
            <template v-for="(value,key) in contactsList">
                <!--首字母-->
                <div :key="value.avatar" :ref="`key_${key}`" class="weui-cells__title">{{key}}</div>
                <div :key="value.name" class="weui-cells">
                    <router-link :key="item.wxid" :to="{path:'/contact/details',query:{wxid:item.wxid}}" class="weui-cell weui-cell_access" v-for="item in value"
                        tag="div">
                        <div class="weui-cell__hd">
                            <img :src="item.avatar" onerror="javascript:this.src='https://cdn.jsdelivr.net/gh/Miazzy/yunwisdoms@v8.0.0/images/icon-manage-16.png';" class="home__mini-avatar___1nSrW">
                        </div>
                        <div class="weui-cell__bd">
                            {{item.remark?item.remark:item.nickname}}
                        </div>
                    </router-link>
                </div>
            </template>
            <div style="height:100px;">
            </div>
      </section>

      <!--检索-->
      <div class="initial-bar">
        <span @click="toPs(i)" v-for="i in contactsInitialList" :key="i" >
          {{i}}
        </span>
      </div>

  </div>
</template>
<script>

import * as tools from '@/request/tools';
import * as contact from '@/vuex/contacts';

const ALL_CONTACT_INIT_CACHE_LIST = 'ALL_CONTACT_INIT_CACHE_LIST_V9';
const ALL_CONTACT_CACHE_LIST = 'ALL_CONTACT_CACHE_LIST_V9';

export default {
    mixins: [window.mixin],
    data() {
        return {
            "pageName": "联系人",
            contactsInitialList:[],
            contactsList:{},
            departid:null,
        }
    },
    async mounted() {
      this.userStatus();
      this.contactsInitialList = await this.queryContactsInitialList();
      this.contactsList = await this.queryContactsList();
    },
    async activated() {
      this.userStatus();
      this.contactsInitialList = await this.queryContactsInitialList();
      this.contactsList = await this.queryContactsList();
    },
    async created(){
      this.contactsInitialList = await this.queryContactsInitialList();
      this.contactsList = await this.queryContactsList();
    },
    computed: {

    },
    methods: {
        // 将联系人根据首字母进行分类
        async queryContactsInitialList(){

            const userinfo = await Betools.storage.getStore('system_userinfo');

            var initialList = await Betools.storage.getStoreDB(ALL_CONTACT_INIT_CACHE_LIST + '#depart#' + userinfo.main_department) || [];

            if(Betools.tools.isNull(initialList) || initialList.length <= 0){
              var allContacts = await contact.queryContacts();
              var max = allContacts.length;
              for (var i = 0; i < max; i++) {
                  if (initialList.indexOf(allContacts[i].initial.toUpperCase()) == -1) {
                      initialList.push(allContacts[i].initial.toUpperCase());
                  }
              }
              initialList = initialList.sort();
              Betools.storage.setStoreDB(ALL_CONTACT_INIT_CACHE_LIST + '#depart#' + userinfo.main_department , initialList , 3600 * 24);
            }

            return initialList;
        },

        // 将联系人根据首字母进行分类
        async queryContactsList() {

            const userinfo = await Betools.storage.getStore('system_userinfo');

            var initialList = [];
            var contactsList = await Betools.storage.getStoreDB(ALL_CONTACT_CACHE_LIST + '#depart#' + userinfo.main_department) || {};

            if(Betools.tools.isNull(contactsList) || contactsList.length <= 0){
              contactsList = {};
              var allContacts = await contact.queryContacts();
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
              let cache = JSON.stringify(contactsList);
              Betools.storage.setStoreDB(ALL_CONTACT_CACHE_LIST + '#depart#' + userinfo.main_department , cache , 3600 * 24);
            }

            return contactsList;
        },
        toPs(i) {
            window.scrollTo(0,this.$refs['key_'+i][0].offsetTop)
        },
        async clearLoginInfo(){
          try {
            const userinfo = await Betools.storage.getStore('system_linfo');

            this.username = userinfo.username;
            this.password = userinfo.password;

            Betools.storage.clearStore('system_userinfo');
            Betools.storage.clearStore('system_token');
            Betools.storage.clearStore('system_department');
            Betools.storage.clearStore('system_login_time');
          } catch (error) {
            console.log(error);
          }
        },
        async userStatus(){
          try {
            const userinfo = await Betools.storage.getStore('system_userinfo');
            this.departid = userinfo.main_department;
          } catch (error) {
            console.log(error);
          }
        }
    }
}
</script>
<style>
    @import "../../assets/css/contact.css";

    .app-footer {
      display:block;
    }
</style>
