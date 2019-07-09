<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Header></Header>
    <div id="main">
      <transition name="fade" mode="out-in" appear> 
        <router-view/>
      </transition>
    </div>
    <Footer></Footer> -->
  </div>
</template>

<script>
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';

export default {
  name: 'App',
  components: {
    // Header,
    // Footer
  }
}
</script>

<style>
html,body{
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a{
  color: #2c3e50;
}
a:hover{
  color: #2d8cf0;
}
img{
  max-width: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#main{
  min-height: 560px;
}
.container{
  max-width: 1220px;
  min-width: 1020px;
  margin: 0 auto;
  display: table;
  padding-bottom: 20px;
  padding-top: 80px;
}
.content{
  max-width: 960px;
  display: table-cell;
}
.content-inner{
  margin-right: 20px;
}
.side-bar{
  width: 240px;
  display: table-cell;
}
.side-bar-inner{
  position: fixed;
  top: 80px;
  width: 240px;
}
.fz14{
  font-size: 14px;
}
.fz16{
  font-size: 16px;
}
.fz24{
  font-size: 24px;
}
.fz36{
  font-size: 36px;
}
.mt10{
  margin-top: 10px;
}
.mt15{
  margin-top: 15px;
}
.mt20{
  margin-top: 20px;
}
.mt30{
  margin-top: 30px;
}
.mr10{
  margin-right: 10px;
}
.mr15{
  margin-right: 15px;
}
.mb30{
  margin-bottom: 30px;
}
.ml5{
  margin-left: 5px;
}
.ml10{
  margin-left: 10px;
}
.ml15{
  margin-left: 15px;
}
.ptb5{
  padding: 5px 0;
}
.p15{
  padding: 15px;
}
.plr10{
  padding: 0 10px;
}
.ptb10{
  padding-top: 10px;
  padding-bottom: 10px;
}
.flr{
  float: right;
}
.fll{
  float: left;
}
.w100{
  width: 100px;
}
.w200{
  width: 200px;
}
.clFff{
  color: #ffffff;
}
.cl000{
  color: #000000;
}
.clRed{
  color: #ff0000;
}
.clGreen{
  color: #008000;
}
.clGray{
  color: #bbbbbb;
}
.bd1 {
  border: 1px solid #cfcfcf;
}
.bdbCf{
  border-bottom: 1px solid #cfcfcf;
}
.bdrds{
  border-radius: 4px;
}
.textCenter{
  text-align: center;
}
.textRight{
  text-align: right;
}
.textLeft{
  text-align: left;
}
.aActive{
  cursor: pointer;
}
.active{
  color: #ed4014;
}
.ulList{
  list-style: none;
}
.ulList li{
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
}
.ivu-form-label-left .ivu-form-item-label{
  font-size: 14px;
}
.article{
  margin-bottom: 30px;
  padding: 25px;
  background-color: #fcfcfc;
  box-shadow: 0 0 4px rgb(160, 160, 160, 0.5);
}
.title{
  font-size: 24px;
  color: #000;
}
.sub-title{
  font-weight: normal;
  display: inline-block;
  width: 100%;
  line-height: 26px;
}
.cont{
  font-size: 14px;
  line-height: 28px;
}
.cont img{
  max-width: 100%;
}
.cont p{
  margin-top: 10px;
}
.divider::after{
  content: "/";
  padding: 0 5px;
}
.widget{
  width: 100%;
  padding: 15px;
  background-color: #fcfcfc;
  box-shadow: 0 0 4px rgb(160, 160, 160, 0.5);
}
.widget-title{
  font-size: 16px;
}
.post-tag{
  font-size: 14px;
  margin-right: 10px;
  line-height: 32px;
  display: inline-block;
}
.ivu-input,
.ivu-table{
  font-size: 14px;
}
</style>
