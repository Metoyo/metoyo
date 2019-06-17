<template>
  <div class="container blog">
    <div class="content">
      <div class="content-inner">
        <article class="article" v-for="atl in blogList" :key="atl._id">
          <h1 class="title">
            <router-link target="_blank" :to="'/blog/' + atl._id">
              {{atl.title}}
            </router-link>
          </h1>
          <!-- 文章内容 -->
          <div class="cont mt15" v-html="atl.abstract">
          </div>
          <h4 class="sub-title mt15">
            <span class="divider"> 
              <Icon type="ios-calendar-outline" /> 
              <span class="mr10">发表: {{atl.createtime}}</span>
            </span>
            <span class="divider"> 
              <Icon type="ios-folder-outline" />
              <span>分类: </span> 
              <span class="mr10" v-for="cate in atl.category" :key="cate._id">{{cate.category_name}}</span>
            </span>
            <span class="divider"> 
              <Icon type="ios-pricetags-outline" />
              <span>标签: </span>
              <span class="mr10" v-for="tag in atl.tags" :key="tag._id">{{tag.tag_name}}</span>
            </span>
            <span> 
              <Icon type="ios-eye-outline" /> 
              <span>阅读次数: {{atl.hits}} </span>
            </span>
            <Button target="_blank" :to="'/blog/' + atl._id" size="small" type="info" class="flr">阅读全文</Button>
          </h4>
        </article>
        <div>
          <Page :total="page.total" :current="page.currentPage" :page-size="page.pageSize" size="small" show-total @on-change="changePage"/>
        </div>
      </div>
    </div>
    <div class="side-bar">
      <div class="side-bar-inner">
        <div class="widget">
          <h2 class="widget-title">文章分类</h2>
          <ul class="ulList mt10">
            <li v-for="cate in categoryList" :key="cate._id">
              <a href="javascript:;" class="post-sort" :class="{ active: cate.ckd }" @click="queryBlogNum('ct', cate._id)">{{cate.name}}</a>
            </li>
          </ul>
        </div>
        <div class="widget mt20">
          <h2 class="widget-title">文章标签</h2>
          <div class="mt10">
            <a href="javascript:;" class="post-tag" rel="tag" v-for="tag in tagList" :key="tag._id" 
              :class="{ active: tag.ckd }" @click="queryBlogNum('tg', tag._id)">{{tag.name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Lazy from 'lazy.js';

var that = null;
var $http = null;
var hostName = null;
const lenNum = 140;
const blogUrl = '/blog';
const categoryUrl = '/category'; //分类
const tagUrl = '/tag'; //分类
export default {
  name: 'BlogHome',
  data: function(){
    return {
      blogList: [],
      categoryList: [],
      tagList: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectCategoryId: '',
      selectTagId: ''
    }
  },
  computed: {
    ...mapState(['domain'])
  },
  methods: {
    //查询blog数量
    queryBlogNum: function(tp, id){
      var obj = {
        method: 'GET',
        url: hostName + blogUrl,
        params: {
          '只查数量': true
        }
      };
      that.selectCategoryId = '';
      that.selectTagId = '';
      if(tp && tp == 'ct' && id){
        obj.params['category.category_id'] = id;
        that.selectCategoryId = id;
        Lazy(that.tagList).each(function(tg){
          tg.ckd = false;
        });
        Lazy(that.categoryList).each(function(ct){
          if(ct._id == id){
            ct.ckd = true;
          }
        });
      }
      if(tp && tp == 'tg' && id){
        obj.params['tags.tag_id'] = id;
        that.selectTagId = id;
        Lazy(that.categoryList).each(function(ct){
          ct.ckd = false;
        });
        Lazy(that.tagList).each(function(tg){
          if(tg._id == id){
            tg.ckd = true;
          }
        });
      }
      // that.page.total = 0;
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          if(data.result){
            if(data.data > 0){
              that.page.total = data.data;
              that.changePage();
            }
            else{
              that.$Message.error({content: '没有符合的数据！', duration: 300, closable: true});
            }
          }
          else{
            that.$Message.error({content: data.error, duration: 300, closable: true});
          }
        }
        else{
          that.$Message.error({content: '错误状态码：' + res.status, duration: 300, closable: true});
        }
      })
      .catch(function(error){
        that.$Message.error({content: error, duration: 300, closable: true});
      });
    },
    //查询blog
    queryBlog: function(){
      var obj = {
        method: 'GET',
        url: hostName + blogUrl,
        params: {
          '跳过条数': 0,
          '查询条数': 0,
          // "author.uid": "5d022ac66cc8836234c8ac92"
          // 'category.category_id': '5d00aef8a281e801980109df'
        }
      };
      obj.params['跳过条数'] = that.page.pageSize * (that.page.currentPage - 1);
      obj.params['查询条数'] = that.page.pageSize;
      if(that.selectCategoryId){
        obj.params['category.category_id'] = that.selectCategoryId;
      }
      if(that.selectTagId){
        obj.params['tags.tag_id'] = that.selectTagId;
      }
      var msgLd = that.$Message.loading({content: '博客查询中…', duration: 0});
      that.blogList = [];
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            Lazy(data.data).each(function(blg){
              var crttm = that.$comn.dateFromObjectId(blg._id);
              blg.createtime = that.$comn.dateToLc(crttm);
              blg.abstract = blg.content.substring(0, lenNum);
              if(blg.content.length > lenNum){
                blg.abstract += '<span class="ml10">[...]</span>';
              }
            });
            that.blogList = data.data;
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
    //分类翻页
    changePage: function(p){
      p = p || 1;
      var bgIdx = that.page.pageSize * (p - 1);
      var edIdx = that.page.pageSize * p;
      that.page.currentPage = p;
      that.queryBlog();
    },
    //查询分类
    queryCategory: function(){
      var obj = {
        method: 'GET',
        url: hostName + categoryUrl,
        params: {
          // '只查数量': true
        }
      };
      var msgLd = that.$Message.loading({content: '分类查询中…', duration: 0});
      that.categoryList = [];
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            Lazy(data.data).each(function(ct){
              ct.ckd = false;
            });
            that.categoryList = data.data;
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
    //查询标签
    queryTag: function(){
      var obj = {
        method: 'GET',
        url: hostName + tagUrl,
        params: {}
      };
      var msgLd = that.$Message.loading({content: '标签查询中…', duration: 0});
      that.tagList = [];
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            Lazy(data.data).each(function(ct){
              ct.ckd = false;
            });
            that.tagList = data.data;
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
  },
  created: function(){
    $http = this.$http;
    that = this;
    hostName = this.domain;
    that.queryBlogNum();
    that.queryCategory();
    that.queryTag();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .cont {
  position: relative;
  height: 100px;
  overflow: hidden;
}
.cont::after {
  content:"...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: 0;
  padding:0 20px 1px 45px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
} */
</style>
