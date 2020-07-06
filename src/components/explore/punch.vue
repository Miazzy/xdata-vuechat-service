<template>
  <!--发现组件-->
  <div id="punch" style="margin-top: 28px;" >
    <section>

      <div class="weui-cells">
        <div class="weui-cell punch-cell weui-cell_access" id="scanCell" style="padding: 8px 10px 4px 10px;margin-top:5px;">
          <div class="weui-cell__bd weui-cell_tab" @click="tabname = 1 ;" :style="tabname == 1 ? `border-bottom: 0px solid #329ff0;text-align:left;` : `border-bottom: 0px solid #329ff0;text-align:left;` ">
            考勤组：鹏程晟泰建筑有限公司
          </div>
        </div>
      </div>

      <div class="wechat-list">
         <div class="list-info">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;">3</i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">22:04</div>
              <div class="desc-author">上班打卡</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span style="display: none;"></span>
                <span>临时有事，申请请假，望领导批准！</span>
              </div>
            </div>
         </div>
         <div class="list-info">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;">3</i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">22:04</div>
              <div class="desc-author">午间打卡</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span style="display: none;"></span>
                <span>临时有事，申请请假，望领导批准！</span>
              </div>
            </div>
         </div>
         <div class="list-info">
            <div class="header-box">
             <i class="new-msg-count" style="display: none;">3</i>
             <i class="new-msg-dot" style="display: none;"></i>
             <div class="header">
               <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/announce.png">
             </div>
            </div>
            <div class="desc-box">
              <div class="desc-time">22:04</div>
              <div class="desc-author">下班打卡</div>
              <div class="desc-msg">
                <div class="desc-mute iconfont icon-mute" style="display: none;"></div>
                <span style="display: none;"></span>
                <span>临时有事，申请请假，望领导批准！</span>
              </div>
            </div>
         </div>
      </div>

      <div class="wechat-list" style="background-color:#fefefe;">
        <div class="wechat-baidu-map" style="height:350px;width:100%;">
          <div id="allmap" style="height:350px;width:100%;" ></div>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;">
          <span>时间：{{ctime}}</span>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;">
          <span>经度：{{longitude}}</span>
          <span>维度：{{latitude}}</span>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;">
          <span>地址：{{location}}</span>
        </div>
        <div style="text-align: left;margin-left:10px;margin-top:10px;height:250px;">
          <div style="margin-left:35%;margin-top:20px;">
            <img src="//cdn.jsdelivr.net/gh/Miazzy/yunwisdom_cdn@v1.0.0/images/daka.png" style="margin:0px 0px;text-align:center;border-radius:40px;width:80px;height:80px;">
          </div>
        </div>
      </div>

    </section>
  </div>
</template>
<script>
    import dayjs from 'dayjs';

    export default {
        components: {
        },
        mixins: [window.mixin],
        data() {
            return {
                pageName: "打卡",
                momentNewMsg: true,
                tabname: '1',
                longitude:'',
                latitude:'',
                location:'',
                ctime:'',
            }
        },
        activated() {
          this.ctime =  dayjs().format('YYYY-MM-DD HH:mm:ss');
          this.$store.commit("toggleTipsStatus", -1);
          this.queryReturnDiv();
          this.baiduGeo();
          this.getLocation();
        },
        mounted() {
          this.ctime =  dayjs().format('YYYY-MM-DD HH:mm:ss');
          this.queryReturnDiv();
          this.baiduGeo();
          this.getLocation();
        },
        methods: {
          queryReturnDiv(){
            var that = this;
            $('.center').prepend(`<div id="return" tag="div" class="iconfont icon-left">
                                      <span style="margin-left:10px;" >返回</span>
                                  </div>`);
            $('#return[tag=div]').click(()=>{
              that.$router.push(`/explore`);
            });
          },
          getLocation(){
            var options={
                enableHighAccuracy:true,
                maximumAge:1000
            }
            if(navigator.geolocation){
                console.log('支持定位服务')
                //浏览器支持geolocation
                navigator.geolocation.getCurrentPosition(this.getLocationSuc,this.getLocationErr,options);
            } else{
                //浏览器不支持geolocation
                console.log('不支持定位服务')
            }
          },
          baiduGeo(){
            var that = this;
            var vpage = this;
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,14);
            var geolocation = new BMap.Geolocation();
            var geoc = new BMap.Geocoder();
            map.addEventListener("click", function(e){
              var pt = e.point;
              geoc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
              });
            });
            geolocation.getCurrentPosition(function(r){
              if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                that.longitude = r.point.lng;
                that.latitude = r.point.lat;
                geoc.getLocation(r.point, function(rs){
                  var addComp = rs.addressComponents;
                  vpage.location = (addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                });
              } else {
                console.log(' get baidu geo error !');
              }
            },{enableHighAccuracy: true});
          },
          //成功时
          getLocationSuc(position) {
              //经度
              this.longitude = position.coords.longitude;
              //纬度
              this.latitude = position.coords.latitude;
          },
          //失败时
          getLocationErr(error) {
            console.log('query location error!')
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
