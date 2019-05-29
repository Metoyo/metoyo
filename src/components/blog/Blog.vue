<template>
  <div class="container blog">
    <div class="content">
      <div class="content-inner">
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <article class="article mb30">
          <h1>Internet Explorer 9</h1>
          <p>Windows Internet Explorer 9（简称 IE9）于 2011 年 3 月 14 日发布.....</p>
        </article>
        <div>
          <Page :total="page.total" :current="page.currentPage" :page-size="page.pageSize" size="small" show-total @on-change="changePage"/>
        </div>
      </div>
    </div>
    <div class="side-bar">
      <div class="side-bar-inner">
        sdflksjd
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data: function(){
    return {
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    }
  },
  methods: {
    //分类翻页
    changePage: function(p){
      p = p || 1;
      var bgIdx = this.page.pageSize * (p - 1);
      var edIdx = this.page.pageSize * p;
      this.page.currentPage = p;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
