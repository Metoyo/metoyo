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
  text-align: center;
  color: #2c3e50;
}
#main{
  min-height: 560px;
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
.ml10{
  margin-left: 10px;
}
.ml15{
  margin-left: 15px;
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
.clFff{
  color: #ffffff;
}
.cl000{
  color: #000000;
}
.bdbCf{
  border-bottom: 1px solid #cfcfcf;
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
</style>
