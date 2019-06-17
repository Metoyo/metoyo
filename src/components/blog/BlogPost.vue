<template>
  <div class="container blog-post">
    <div class="content">
      <div class="content-inner">
        <article class="article">
          <h1 class="title">
            {{article.title}}
          </h1>
          <h4 class="sub-title mt15">
            <span class="divider"> 
              <Icon type="ios-calendar-outline" />
              <span class="mr10">发表: {{article.createtime}}</span>
            </span>
            <span class="divider"> 
              <Icon type="ios-folder-outline" /> 
              <span>分类: </span> 
              <span class="mr10" v-for="ctgy in article.category" :key="ctgy._id">{{ctgy.category_name}}</span>
            </span>
            <span class="divider"> 
              <Icon type="ios-pricetags-outline" />
              <span>标签: </span>
              <span class="mr10" v-for="tag in article.tags" :key="tag._id">{{tag.tag_name}}</span>
            </span>
            <span> 
              <Icon type="ios-eye-outline" /> 
              <span>阅读次数: {{article.hits}} </span>
            </span>
          </h4>
          <div class="cont mt15" v-html="article.content">
          </div>
        </article>
      </div>
    </div>
    <!-- <div class="side-bar">
      <div class="side-bar-inner">
        <div class="widget">
          <h2 class="widget-title">同类文章</h2>
          <ul class="ulList mt10">
            <li>
              <a href="/sort/alternative" class="post-sort">前端技术</a>
            </li>
            <li>
              <a href="/sort/alternative" class="post-sort">旅游美食</a>
            </li>
            <li>
              <a href="/sort/alternative" class="post-sort">军事天地</a>
            </li>
            <li>
              <a href="/sort/alternative" class="post-sort">游戏天地</a>
            </li>
          </ul>
        </div>
        <div class="widget mt20">
          <h2 class="widget-title">文章标签</h2>
          <div class="mt10">
            <a href="/tag/alternative" class="post-tag" rel="tag">新疆</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">葡萄</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">习惯</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">哈密瓜</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">乌鲁木齐</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">新疆</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">葡萄</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">习惯</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">哈密瓜</a>
            <a href="/tag/alternative" class="post-tag" rel="tag">乌鲁木齐</a>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { constants } from 'fs';

var that = null;
var $http = null;
var hostName = null;
const blogUrl = '/blog';
// const categoryUrl = '/category'; //分类
// const tagUrl = '/tag'; //分类
export default {
  name: 'BlogPost',
  data: function(){
    return {
      article: '',
      categoryList: [],
      tagList: []
    }
  },
  computed: {
    ...mapState(['domain'])
  },
  methods: {
    //查询博客
    queryBlog: function(id){
      var obj = {
        method: 'GET',
        url: hostName + blogUrl,
        params: {
          id: id
        }
      };
      var msgLd = that.$Message.loading({content: '查询中…', duration: 0});
      that.article = '';
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            if(data.data && data.data[0]){
              var sltBlog = data.data[0];
              var crttm = that.$comn.dateFromObjectId(sltBlog._id);
              sltBlog.createtime = that.$comn.dateToLc(crttm);
              that.article = sltBlog;
              var hits = sltBlog.hits;
              that.modBlog(id, hits);
            }
          }
          else{
            that.$Message.error({content: data.error, duration: 300, closable: true});
          }
        }
        else{
          msgLd();
          that.$Message.error({content: '错误状态码：' + res.status, duration: 300, closable: true});
        }
      })
      .catch(function(error){
        msgLd();
        that.$Message.error({content: error, duration: 300, closable: true});
      });
    },
    //统计点击量
    modBlog: function(id, num){
      var obj = {
        method: 'POST',
        url: hostName + blogUrl,
        data: {
          id: id,
          hits: num + 1
        }
      };
      // var msgLd = that.$Message.loading({content: '分类修改中…', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          if(data.result){
            console.log('修改成功！');
          }
          else{
            // that.$Message.error({content: data.error, duration: 300, closable: true});
          }
        }
        else{
          // that.$Message.error({content: '错误状态码：' + res.status, duration: 300, closable: true});
        }
      })
      .catch(function(error){
        // that.$Message.error({content: error, duration: 300, closable: true});
      });
    }
  },
  created: function(){
    $http = this.$http;
    that = this;
    hostName = this.domain;
    if(that.$route.params && that.$route.params.id){
      var blogId = that.$route.params.id;
      that.queryBlog(blogId);
      // that.modBlog(blogId);
    }
    else{
      that.$Message.error({content: '缺少文章ID', duration: 300, closable: true});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
