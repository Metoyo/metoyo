<template>
  <div class="home">
    <div class="container" style="width:960px;">
      <h1 class="textCenter">
        <img src="@/assets/me.png" alt="关于">
      </h1>
      <h2 class="textCenter">
        码农一枚，专注于前端技术：HTML、CSS、JAVASCRIPT，主要使用Vuejs和Angularjs框架，目前学习Python中…
      </h2>
      <h2 class="fz16 mt15">
        网站目的
      </h2>
      <div class="fz14">
        此网站是为了学习前端技术而制作，边学习边制作，不断丰富功能和内容，此网站源码可以在
        <a class="clGreen" href="https://github.com/Metoyo/metoyo"> 这里 </a>下载。
      </div>
      <h2 class="fz16 mt15">
        联系方式
      </h2>
      <div class="fz14">
        <span>EMAIL: <a href="mailto:metoyo@outlook.com">METOYO@OUTLOOK.COM</a></span>
        <span style="padding: 0 10px"> / </span>
        <span>微博: <a href="https://weibo.com/ganludeyun">云在双的世界-赶路的云</a></span>
      </div>
    </div>
    <!-- <div class="container textCenter" style="width:960px;font-size:42px;">
      <p class="mt30" style="color:#bd654f">Hello World!</p>
      <p class="mt10" style="font-size:72px">I'm Songtao</p>
      <p class="mt10">Front-end Engineer</p>
      <p class="mt10">HTML | CSS | Javascript | Vue.js | AngularJs</p>
      <p class="mt10">Email:<a href="mailto:metoyo@126.com">metoyo@126.com</a></p>
      <p class="mt10 mb30">
        This site was created to learn vue.js and the code has been committed to 
        <a href="https://github.com/Metoyo/metoyo" target="_blank" rel="github">
          <Icon type="logo-github" />
        </a>
      </p>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: 'Home',
    // props: {
    //   msg: '首页对对对'
    // },
    data: function() {
      return {
      }
    },
    methods: {

    },
    created: function(){

    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    min-height: 666px;
  }
  .about-me,
  .about-site{
    background-color: #f6f6f6;
  }
</style>
