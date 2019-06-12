<template>
  <div class="home">
    <div class="container" style="width:960px">
      <section class="about-me">
        <Row type="flex" :gutter="16" justify="center" align="middle">
          <Col span="12" style="filter: grayscale(50%);">
            <img src="../../assets/me1.jpeg" alt="">
          </Col>
          <Col span="12" class="fz36">
            <p>你好！</p>
            <p>我是松涛，</p>
            <p>一位现居于帝都的码农，</p>
            <p>专注于Web和JavaScript开发，</p>
            <p>
              现使用<a href="https://www.vuejs.org" target="_blank" rel="vue.js">Vue.js</a>
              和 <a href="https://angularjs.org/" target="_blank" rel="angularjs">Angularjs</a>框架。
            </p>
          </Col>
        </Row>
      </section>
      <section class="about-site mt20">
        <Row type="flex" :gutter="16" class="mt20" justify="center" align="middle">
          <Col span="12" class="fz36">
            <p>
              本站基于<a href="https://www.vuejs.org" target="_blank" rel="vue.js">Vue.js</a>，
              出于学习<a href="https://www.vuejs.org" target="_blank" rel="vue.js">Vue.js</a>和记录生活点滴而建，
            </p>
            <p>你可以在 <a href="https://github.com/Metoyo/metoyo" target="_blank" rel="GitHub">GitHub</a> 上找到源码。</p>
            <p>邮箱：</p>
            <p>
              <a href="mailto:ganludeyun@126.com">ganludeyun@126.com</a>
            </p>
          </Col>
          <Col span="12" style="filter: grayscale(50%);">
            <img src="../../assets/me2.jpeg" alt="">
          </Col>
        </Row>
      </section>
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
    background: url('../../assets/meBg.png') repeat 0 0;
    min-height: 666px;
  }
  .about-me,
  .about-site{
    background-color: #f6f6f6;
  }
</style>
