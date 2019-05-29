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
  margin-bottom: 20px;
}
.content{
  max-width: 960px;
  display: table-cell;
}
.content-inner{
  margin: 80px 20px 0 0;
}
.side-bar{
  width: 240px;
  display: table-cell;
}
.side-bar-inner{
  position: fixed;
  top: 80px;
  width: 240px;
  padding: 10px;
  box-shadow: 0 0 14px rgba(202,203,203,0.5);
}
.fz14{
  font-size: 14px;
}
.fz16{
  font-size: 16px;
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
.ml10{
  margin-left: 10px;
}
.ml15{
  margin-left: 15px;
}
.p15{
  padding: 15px;
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
.ulList{
  list-style: none;
}
.ivu-form-label-left .ivu-form-item-label{
  font-size: 14px;
}
.article{
  padding: 25px;
  box-shadow: 0 0 14px rgba(202,203,203,0.5);
}
</style>
