<template>
  <div id="app">
    <!-- <Header></Header> -->
    <div id="main">
      <transition name="fade" mode="out-in" appear> 
        <router-view/>
      </transition>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default {
  name: 'App',
  components: {
    // Header,
    Footer
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
  padding: 20px 0;
  min-height: 560px;
}
.mt10{
  margin-top: 10px;
}
.mt30{
  margin-top: 30px;
}
.ml15{
  margin-left: 15px;
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
.textRight{
  text-align: right
}
.aActive{
  cursor: pointer;
}
.ulList{
  list-style: none;
}
</style>
