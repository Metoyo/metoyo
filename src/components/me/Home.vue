<template>
  <div class="home">
    <div class="container textCenter" style="width:960px;font-size:42px;">
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
    </div>
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
