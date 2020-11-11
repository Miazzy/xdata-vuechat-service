<template>
    <div class="dialogue">
        <header id="wx-header">
            <div class="other" style="right:0px;">
                <router-link :to="{path:'/wechat/dialogue/dialogue-info',query: { msgInfo: messages , wxid : wxid  }}" tag="span" class="iconfont" v-show="$route.query.group_num&&$route.query.group_num!=1">
                  <van-icon name="weapp-nav" size="1.3rem" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
                </router-link>
                <router-link :to="{path:'/wechat/dialogue/dialogue-detail',query: { msgInfo: messages , wxid : wxid }}" tag="span" class="iconfont" v-show="$route.query.group_num==1">
                  <van-icon name="weapp-nav" size="1.3rem" style="position: absolute; width: 40px; height: auto; right: 0px; top: 16px; opacity: 1; background:#1b1b1b;z-index:10000; " />
                </router-link>
            </div>
            <div class="center">
                <router-link to="/wechat" tag="div" class="iconfont icon-left">
                    <span>消息</span>
                </router-link>
                <span>{{pageName}}</span>
                <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
            </div>
        </header>
        <section class="dialogue-section clearfix" v-on:click="MenuOutsideClick">
            <div class="row clearfix" :key="item.id" v-for="item in messages">
                <img :src="item.wxid == myuserinfo.userid ? myuserinfo.avatar : userinfo.avatar " class="header">
                <p class="text" v-more>{{item.content}}</p>
            </div>
            <span class="msg-more" id="msg-more">
              <ul>
                <li>复制</li>
                <li>转发</li>
                <li>收藏</li>
                <li>删除</li>
              </ul>
            </span>
        </section>
        <footer class="dialogue-footer">
            <div class="component-dialogue-bar-person">
                <span class="iconfont " v-show="!currentChatWay" v-on:click="currentChatWay=true">
                  <van-icon name="volume" style="margin-top: 5px;    transform: scale(.85);"/>
                </span>
                <span class="iconfont " v-show="currentChatWay" v-on:click="currentChatWay=false">
                  <van-icon name="volume-o" style="margin-top: 5px;    transform: scale(.85);"/>
                </span>
                <div class="chat-way" v-show="!currentChatWay">
                    <div class="chat-say" v-press>
                        <span class="one">按住 说话</span>
                        <span class="two">松开 结束</span>
                    </div>
                </div>
                <div class="chat-way" v-show="currentChatWay">
                    <input class="chat-txt" type="text" v-model="message" v-on:focus="focusIpt" v-on:blur="blurIpt"/>
                </div>
                <span class="expression iconfont">
                  <van-icon name="smile-o" style="margin-top: 5px;margin-left:2px;"/>
                </span>
                <span class="more iconfont ">
                  <van-icon v-show=" message == '' " name="add-o" style="margin-top: 5px;"/>
                  <van-button v-show=" message !== '' " type="primary" size="mini" style="padding: 0 2px; top:-7px;" @click="sendMessage();">发送</van-button>
                </span>
                <div class="recording" style="display: none;" id="recording">
                    <div class="recording-voice" style="display: none;" id="recording-voice">
                        <div class="voice-inner">
                            <div class="voice-icon"></div>
                            <div class="voice-volume">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <p>手指上划,取消发送</p>
                    </div>
                    <div class="recording-cancel" style="display: none;">
                        <div class="cancel-inner"></div>
                        <p>松开手指,取消发送</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>

import * as manageAPI from '@/request/manage';
import * as storage from '@/request/storage';
import * as contact from '@/vuex/contacts';
import * as tools from '@/request/tools';
import * as query from '@/request/query';

export default {
    data() {
        return {
            pageName: this.$route.query.name,
            currentChatWay: true, //ture为键盘打字 false为语音输入
            timer: null,
            avatar: '',
            wxid: this.$route.query.wxid,
            message: '',
            tablename: 'bs_message',
            messages: [],
            myuserinfo: null,
            userinfo: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.$store.commit("setPageName", vm.$route.query.name)
        })
    },
    computed: {
        msgInfo() {
            for (var i in this.$store.state.msgList.baseMsg) {
                if (this.$store.state.msgList.baseMsg[i].mid == this.$route.query.mid) {
                    return this.$store.state.msgList.baseMsg[i]
                }
            }
        }
    },
    async activated() {
        this.queryInfo();
    },
    async mounted() {
      this.queryInfo();
    },
    directives: {
        press: {
            inserted(element, binding) {
                var recording = document.querySelector('.recording'),
                    recordingVoice = document.querySelector('.recording-voice'),
                    recordingCancel = document.querySelector('.recording-cancel'),
                    startTx, startTy;
                element.addEventListener('touchstart', function(e) {
                    element.className = "chat-say say-active"
                    recording.style.display = recordingVoice.style.display = "block"
                    var touches = e.touches[0]
                    startTx = touches.clientX
                    startTy = touches.clientY
                    e.preventDefault()
                }, false)
                element.addEventListener('touchend', function(e) {
                    element.className = "chat-say"
                    recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
                    e.preventDefault()
                }, false)
                element.addEventListener('touchmove', function(e) {
                    var touches = e.changedTouches[0],
                        endTx = touches.clientX,
                        endTy = touches.clientY,
                        distanceX = startTx - endTx,
                        distanceY = startTy - endTy;

                    if (distanceY > 50) {
                        element.className = "chat-say"
                        recordingVoice.style.display = "none"
                        recordingCancel.style.display = "block"
                    }else{
                        element.className = "chat-say say-active"
                        recordingVoice.style.display = "block"
                        recordingCancel.style.display = "none"
                    }
                    // 阻断事件冒泡 防止页面被一同向上滑动
                    e.preventDefault()
                }, false);
            }
        },
        more: {
            bind(element, binding) {
                var startTx, startTy
                element.addEventListener('touchstart', function(e) {
                    var msgMore = document.getElementById('msg-more'),
                        touches = e.touches[0];
                    startTx = touches.clientX
                    startTy = touches.clientY

                    clearTimeout(this.timer)
                    this.timer = setTimeout(()=>{
                        // 控制菜单的位置
                        msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px'
                        msgMore.style.top = (element.offsetTop - 33) + 'px'
                        msgMore.style.display = "block"
                        element.style.backgroundColor = '#e5e5e5'
                    },500)

                }, false)
                element.addEventListener('touchmove', function(e) {
                    var touches = e.changedTouches[0],
                        disY = touches.clientY;
                    if (Math.abs(disY-startTy)>10) {
                        clearTimeout(this.timer)
                    }
                }, false)
                element.addEventListener('touchend', function(e) {
                    clearTimeout(this.timer)
                }, false)
            }
        }
    },
    methods: {
        // 解决输入法被激活时 底部输入框被遮住问题
        focusIpt() {
            this.timer = setInterval(function() {
                document.body.scrollTop = document.body.scrollHeight
            }, 100)
        },
        blurIpt() {
            clearInterval(this.timer)
        },
        async queryInfo(){
          //获取用户信息
          this.myuserinfo = await storage.getStore('system_userinfo');

          //获取聊天对象信息
          this.userinfo = await contact.getUserInfo(this.wxid);

          //查询用户聊天消息
          await this.queryMessages();

          //阅读最新消息
          await this.readMessages();

        },
        async queryMessages() {

          if(!this.$route.query.wxid){
            return ;
          }

          try {
            //暂存
            const temp1 = this.messages;
            //获取与聊天对象的所有聊天记录
            const temp2 = await query.queryMessages(this.myuserinfo.userid , this.$route.query.wxid , '');

            //合并
            this.messages = [...temp1 , ...temp2];

            //去重
            this.messages = this.messages.filter((item , index) => {
              const tindex = this.messages.findIndex( element => {
                return element.id == item.id;
              });
              return tindex == index;
            })

            //排序
            this.messages.sort((n1 , n2) => {
              return n1.id - n2.id;
            });

            //如果定时器存在，则清空定时器
            if(!!window.dialogueTimer){
              clearTimeout(window.dialogueTimer);
            }

            //定时查询是否有用户发送消息
            window.dialogueTimer = setTimeout(async ()=>{
              await this.queryMessages();
            }, 300);
          } catch (error) {
            console.log(error);
          }

        },
        async readMessages(){
          const mid = this.$route.query.mid;
          const result = await manageAPI.patchTableData(this.tablename , mid , {read_flag: 'true'});
        },
        async sendMessage(){

          //获取用户信息
          const myuserinfo = await storage.getStore('system_userinfo');

          const message = this.message;
          const wxid = this.$route.query.wxid;
          const id = tools.queryUniqueID();

          let userids = [ myuserinfo.userid , wxid ];
          userids = userids.sort();

          const elem = {
            id: id,
            create_by: myuserinfo.username,
            create_time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            wxid: myuserinfo.userid,
            rwxid: wxid,
            content: message,
            team: userids.toString(),
            type: 'friend',
            quiet_flag: 'true',
            read_flag: 'false',
            pid: id,
            status: '0',
          }

          const result = await manageAPI.postTableData(this.tablename , elem);

          this.message = '';

          this.messages.push(elem);

        },
        // 点击空白区域，菜单被隐藏
        MenuOutsideClick(e) {
            var container = document.querySelectorAll('.text'),
                msgMore = document.getElementById('msg-more')
            if (e.target.className === 'text') {

            } else {
                msgMore.style.display = 'none'
                container.forEach(item=>item.style.backgroundColor='#fff')
            }
        }
    }
}
</script>
<style scoped>
@import "../../assets/css/dialogue.css";
@import "../../assets/css/dialogue.global.css";
#wechat .wechat-list .list-row .list-info .desc-box .desc-msg .desc-mute {
    display: none;
    float: right;
    color: #b8b8b8;
}
</style>
