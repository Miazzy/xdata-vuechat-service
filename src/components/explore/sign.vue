<template>
  <!--首页组件-->
  <div id="punch" style="margin-top: 0px;" >
    <header id="wx-header">
        <div class="center">
            <router-link :to="back" tag="div" class="iconfont icon-left">
                <span>返回</span>
            </router-link>
            <span>签到</span>
        </div>
    </header>

    <section>
      <div class="weui-cells" style="margin-top: 0px;">
        <div class="weui-cell punch-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;margin-top:5px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 0px solid #329ff0;text-align:left;` : `border-bottom: 0px solid #329ff0;text-align:left;` ">
            {{cdate}} - {{company}}
          </div>
        </div>
      </div>

      <div class="wechat-list" style="background-color:#fefefe;">
        <div class="wechat-baidu-map" style="height:350px;width:100%;display:none;">
          <div id="allmap" style="height:350px;width:100%;display:none;" ></div>
        </div>
        <div>
          <div id='container' style="height:350px;width:100%;"></div>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;">
          <span>IP：{{ip}}</span>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;">
          <span>时间：{{ctime}}</span>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;display:none;">
          <span>经度：{{longitude}}</span>
          <span>维度：{{latitude}}</span>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;">
          <span>地址：{{location}}</span>
        </div>
        <div class="weui-cell punch-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;margin-top:10px;border-bottom: 1px solid #cecece;border-top: 1px solid #cecece;">
          <div class="weui-cell__bd weui-cell_tab" style="text-align:left;width:110%;" >
            拜访对象 <input id="visitName" type="text" placeholder="请输入拜访对象或出席活动" style="outline: 0; height: 30px; line-height: 30px; border: 0px solid #fefefe; border-bottom: 0px solid #cecece; width: 75%;margin-left:5px; " />
          </div>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:25px;height:240px;">
          <div @click="punchWork();" style="text-align:center;margin-left:35%;margin-right:35%;margin-top:20px;" >
            <img src="https://cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/position.png" style="margin:0px 0px;text-align:center;border-radius:150px;width:110px;height:110px;">
          </div>
          <div style="text-align:center;margin-left:0px;margin-top:10px;">
            <span style="color:#aeaeae;" >{{locationFlag}}</span>
            <span>{{locationTips}}</span>
          </div>
          <div style="text-align:center;margin-left:0px;margin-top:10px;">
            <span @click="relocation" style="border: 1px solid skyblue; padding: 5px 15px; border-radius: 4px; color: skyblue;">重新定位</span>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>
<script>
import * as storage from '@/request/storage';
import * as tools from '@/request/tools';
import * as announce from '@/request/announce';
import * as task from '@/request/task';

export default {
    components: {
    },
    mixins: [window.mixin],
    data() {
        return {
            pageName: "签到",
            momentNewMsg: true,
            tabname: '1',
            longitude:'',
            latitude:'',
            location:'',
            ctime:'',
            cdate:'',
            addrs:[],
            locationTips:'',
            locationFlag:'',
            ip:'',
            peer:null,
            back:'/app',
            company:'领地集团',
            ipaddrs:['118.114.247.236' , '118.114.237.201' ,'118.114.247.208', '222.212.88.71', '125.70.13.126' , '101.206.168.248'],
        }
    },
    async activated() {
      this.$store.commit("toggleTipsStatus", -1);
      try {
        this.relocation();
      } catch (error) {
        console.log(error);
      }
    },
    async mounted() {
      try {
        this.relocation();
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      encodeURI(value){
        return window.encodeURIComponent(value);
      },
      getUrlParam(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg);  //匹配目标参数
          if (r != null) return decodeURI(r[2]); return null; //返回参数值
      },
      relocation() {
        this.amapGeo();
        this.getMapIP();
      },
      queryReturnDiv(){
        var that = this;
        $('.center').prepend(`<div id="return" tag="div" class="iconfont icon-left">
                                  <span style="margin-left:10px;" >返回</span>
                              </div>`);
        $('#return[tag=div]').click(()=>{
          that.$router.push(`/explore`);
        });
      },
      amapGeo(){
        var vpage = this;
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                position:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,data){
                if(status=='complete'){
                  var str = [];
                  str.push('定位结果：' + data.position);
                  str.push('定位类别：' + data.location_type);
                  if(data.accuracy){
                      str.push('精度：' + data.accuracy + ' 米');
                  }//如为IP精确定位结果则没有精度信息
                  str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                  //经度
                  vpage.longitude = data.position.KL;
                  //纬度
                  vpage.latitude = data.position.kT;
                  //查询地理位置信息
                  if(vpage.ipaddrs.includes(vpage.ip)){
                    vpage.location = '四川省成都市高新西区西芯大道蓝光集团';
                    vpage.locationTips = '中国四川省成都市郫县西芯大道11号';
                    vpage.locationFlag = '√ 当前位置 ';
                  }
                }
            });
        });
      },
      baiduGeo(){
        var that = this;
        var vpage = this;
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(vpage.longitude,vpage.latitude);
        map.centerAndZoom(point,14);
        var geolocation = new BMap.Geolocation();
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function(rs){
          var addComp = rs.addressComponents;
          //vpage.location = (addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          if(vpage.ipaddrs.includes(vpage.ip)){
            vpage.location = '中国四川省成都市高新西区西芯大道11号蓝光集团';
            vpage.locationTips = '中国四川省成都市郫县西芯大道11号';
            vpage.locationFlag = '√ 当前位置 ';
          }
        });
      },
      async punchWork(){
        this.ctime =  dayjs().format('YYYY-MM-DD HH:mm:ss');
        if(this.location!=''&&this.location!=null){
          await vant.Dialog.alert({
            title: '签到成功',
            message: `签到成功，位置：${this.location}！`,
          });
        }
      },
      async getMapIP(){

        //设置当前日期
        this.ctime =  dayjs().format('YYYY-MM-DD HH:mm:ss');
        this.cdate = dayjs().format('YYYY-MM-DD');

        var ipInfo = localStorage.getItem(`system_location_info`);
        //此处后端代码为node-spider-api

        if(ipInfo != null && ipInfo != ''){
          ipInfo = JSON.parse(ipInfo);
          this.ip = ipInfo.result.ip;
        }

        if(this.ipaddrs.includes(this.ip)){
            this.ip = `${this.ip} (集团内网)`
          this.location = '四川省成都市高新区天府二街环球金融中心领地集团';
          this.locationTips = '四川省成都市高新区天府二街环球金融中心领地集团';
          this.locationFlag = '√ 当前位置 ';
        } else {
          this.location = ipInfo.result.ad_info.nation + ipInfo.result.ad_info.province +  ipInfo.result.ad_info.city +  ipInfo.result.ad_info.district;
          this.locationTips = this.location;
          this.locationFlag = '× 当前位置 ';
        }

        //获取返回页面
        this.back = tools.getUrlParam('back') || '/app';

      },
      getIPs(callback){
          var ip_dups = {};

          //compatibility for firefox and chrome
          var RTCPeerConnection = window.RTCPeerConnection
              || window.mozRTCPeerConnection
              || window.webkitRTCPeerConnection;
          var useWebKit = !!window.webkitRTCPeerConnection;

          //bypass naive webrtc blocking using an iframe
          if(!RTCPeerConnection){
              //
              var win = iframe.contentWindow;
              RTCPeerConnection = win.RTCPeerConnection
                  || win.mozRTCPeerConnection
                  || win.webkitRTCPeerConnection;
              useWebKit = !!win.webkitRTCPeerConnection;
          }

          //minimal requirements for data connection
          var mediaConstraints = {
              optional: [{RtpDataChannels: true}]
          };

          var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};

          //construct a new RTCPeerConnection
          var pc = new RTCPeerConnection(servers, mediaConstraints);

          function handleCandidate(candidate){
              //match just the IP address
              var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
              var ip_addr = ip_regex.exec(candidate)[1];

              //remove duplicates
              if(ip_dups[ip_addr] === undefined)
                  callback(ip_addr);
              ip_dups[ip_addr] = true;
          }

          //listen for candidate events
          pc.onicecandidate = function(ice){
              if(ice.candidate){
                handleCandidate(ice.candidate.candidate);
              }
          };

          //create a bogus data channel
          pc.createDataChannel("");

          //create an offer sdp
          pc.createOffer(function(result){
              //trigger the stun server request
              var lines = result.sdp.split('\n');
              console.log('ip info: '+JSON.stringify(lines));
              pc.setLocalDescription(result, function(){}, function(){});
              lines.forEach(function(line){
                if(line.indexOf('a=candidate:') === 0){
                  handleCandidate(line);
                }
              });
          }, function(){});
      },
      updateDisplay(newAddr) {
        var that = this;
        if (newAddr in that.addrs) return;
        else this.addrs[newAddr] = true;
        var displayAddrs = Object.keys(that.addrs).filter(function (k) { return that.addrs[k]; });
        for(var i = 0; i < displayAddrs.length; i++){
            if(displayAddrs[i].length > 16){
                displayAddrs.splice(i, 1);
                i--;
            }
        }
      },
      grepSDP(sdp) {
        var that = this;
        var hosts = [];
        sdp.split('\r\n').forEach((line, index, arr) => {
          if (~line.indexOf("a=candidate")) {
                var parts = line.split(' '),
                    addr = parts[4],
                    type = parts[7];
                if (type === 'host') that.updateDisplay(addr);
            } else if (~line.indexOf("c=")) {
                var parts = line.split(' '),
                    addr = parts[2];
                that.updateDisplay(addr);
            }
        });
      },
      getBrowserIP(){
        var that = this;
        var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
        if (RTCPeerConnection) {
          (() => {
              var rtc = new RTCPeerConnection({iceServers:[]});
              if (1 || window.mozRTCPeerConnection) {
                  rtc.createDataChannel('', {reliable:false});
              };

              rtc.onicecandidate = function (evt) {
                  if (evt.candidate) that.grepSDP("a="+evt.candidate.candidate);
              };
              rtc.createOffer(function (offerDesc) {
                  that.grepSDP(offerDesc.sdp);
                  rtc.setLocalDescription(offerDesc);
              }, function (e) { console.warn("offer failed", e); });

              that.addrs = Object.create(null);
              that.addrs["0.0.0.0"] = false;

          })();
        }
      }

    }
}
</script>
<style>
    @import "../../assets/css/explore.css";

    #news, #puncth {
      margin-top: 28px;
    }

    #search {
      display:none;
    }

    .app-header {
        /* position: absolute; */
        position: relative;
        transition: 0.3s;
        width: 100%;
        z-index: 10000;
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        background: linear-gradient(180deg, #303036, #3c3b40);
        color: #fff;
        text-align: center;
    }

    .weui-cell_tab {
      height: 30px;text-align:center;float:left;width:24.5%;margin:0px 0px;
    }

    .punch-cell {
      border-bottom: 1px solid #d9d9d9;
    }

    .punch-cell::after{
      border-bottom: 1px solid #d9d9d9;
    }

    .wechat-list .list-info {
        position: relative;
        z-index: 2;
        left: 0;
        width: 100%;
        height: 64px;
        padding: 8px;
        background-color: #fff;
    }

    .wechat-list .list-info .header-box {
        position: relative;
        float: left;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        margin-left: 0px;
    }

    .wechat-list .new-msg-count {
        position: absolute;
        font-style: normal;
        font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei, Helvetica;
        right: -9px;
        top: -5px;
        z-index: 2;
        padding: 0 4px;
        width: auto;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        color: #fff;
        text-align: center;
        font-size: 14px;
        background-color: #f43531;
    }

    .wechat-list .new-msg-dot {
        position: absolute;
        right: -4px;
        top: -3px;
        width: 10px;
        height: 10px;
        z-index: 2;
        border-radius: 50%;
        color: #ffffff;
        text-align: center;
        background-color: red;
        background-color: #f43531;
        font-size: 0;
    }

    .wechat-list .list-info .header-box .header {
        height: 100%;
        border-radius: 5px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        display: -webkit-flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-align: start;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;
        overflow: hidden;
        background: #dddbdb;
    }

    .wechat-list .list-info .header-box .header img {
        width: 10%;
        height: auto;
        -webkit-box-flex: 2;
        -webkit-flex-grow: 2;
        -ms-flex-positive: 2;
        flex-grow: 2;
        border: 0;
    }

    .wechat-list .list-info .desc-box {
        overflow: hidden;
    }

    .wechat-list .list-info .desc-box .desc-time {
        float: right;
        color: #b8b8b8;
    }

    .wechat-list .list-info .desc-box .desc-author {
        height: 25px;
        line-height: 25px;
        font-size: 16px;
        color: #000;
    }

    .wechat-list .list-info .desc-box .desc-msg {
        height: 23px;
        line-height: 23px;
        font-size: 14px;
        color: #888;
    }

    .wechat-list .list-info .desc-box .desc-msg .desc-mute {
        float: right;
        color: #b8b8b8;
    }


</style>
