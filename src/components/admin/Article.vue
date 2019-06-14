<template>
  <div class="blog-editor">
    <h4 class="textCenter">写文章</h4>
    <Form class="mt20" :model="article" label-position="left" :label-width="60">
      <FormItem label="标题">
        <Input v-model="article.title"></Input>
      </FormItem>
      <FormItem label="内容">
        <div id="editorBox"></div>
      </FormItem>
      <FormItem label="分类">
        <Select v-model="article.sort" style="width:300px">
          <Option v-for="item in categoryList" :value="item._id" :key="item._id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="标签">
        <Tag v-for="item in tagList" :name="item._id" :key="item._id" closable @on-close="closeTag">
          {{item.name}}
        </Tag>
        <Button type="dashed" size="small" @click="addTagPop">
          <span v-if="showTagBox">关闭标签列表</span>
          <span v-else>打开标签列表</span>
        </Button>
        <!-- 标签管理 -->
        <transition name="fade">
          <div class="bd1 p15 bdrds" v-if="showTagBox">
            <div>
              <Input v-model="newTagName" style="width: 300px" />
              <Button @click="addTag">新增</Button>
            </div>
            <Tag checkable v-for="item in allTags" :name="item._id" :key="item._id" :checked="item.ckd" @on-change="chooseTag">
              {{item.name}}
            </Tag>
          </div>
        </transition>
      </FormItem>
      <FormItem>
        <Button class="w200" size="large" type="primary" @click="publishBlog">发布</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import wangEditor from 'wangeditor';
import Lazy from 'lazy.js';

var that = null;
var $http = null;
var hostName = null;
var newEd = null;
const categoryUrl = '/category'; //分类
const tagUrl = '/tag';
const blogUrl = '/blog';
export default {
  name: 'Article',
  data: function(){
    return {
      article: {
        title: '',
        content: '',
        sort: '',
        tags: ''
      },
      categoryList: [],
      allTags: [],
      tagList: [],
      showTagBox: false,
      newTagName: ''
    }
  },
  computed: {
    ...mapState(['domain', 'user'])
  },
  methods: {
    //查询分类
    queryCategory: function(){
      var obj = {
        method: 'GET',
        url: hostName + categoryUrl,
        params: {}
      };
      var msgLd = that.$Message.loading({content: '分类查询中…', duration: 0});
      that.categoryList = [];
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
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
    //编辑器初始化
    editorInit: function(){
      newEd = new wangEditor('#editorBox');
      newEd.customConfig.onchange = function (html) {
        // html 即变化之后的内容
        // console.log(html);
        that.article.content = html;
      }
      // newEd.customConfig.onchangeTimeout = 1000 // 自定义 onchange 触发的延迟时间，默认为 200 ms
      newEd.create();
      // newEd.txt.clear(); //清除内容
      // newEd.txt.html('<p>用 JS 设置的内容</p>'); //设置编辑器内容
      // newEd.txt.append('<p>追加的内容</p>'); //继续追加内容
      // newEd.txt.html(); //读取html
      // newEd.txt.text(); //读取text
    },
    //添加标签弹出
    addTagPop: function(){
      that.showTagBox = !that.showTagBox;
    },
    //查询标签
    queryTag: function(){
      var obj = {
        method: 'GET',
        url: hostName + tagUrl,
        params: {}
      };
      var msgLd = that.$Message.loading({content: '标签查询中…', duration: 0});
      that.allTags = [];
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            Lazy(data.data).each(function(tg){
              tg.ckd = false;
            });
            that.allTags = data.data;
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
    //添加标签
    addTag: function(){
      var obj = {
        method: 'PUT',
        url: hostName + tagUrl,
        data: {
          name: that.newTagName
        }
      };
      var msgLd = that.$Message.loading({content: '标签创建中...', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = res.data;
          if(data.result){
            that.queryTag();
            that.newTagName = '';
          }
          else{
            that.$Message.error({content: data.error, duration: 300, closable: true});
          }
          msgLd();
        }
        else{
          msgLd();
          that.$Message.error({content: '错误状态码：' + res.status, duration: 30, closable: true});
        }
      });
    },
    //关闭一个标签
    closeTag: function(event, name) {
      that.tagList = Lazy(that.tagList).reject(function(tag){
        return tag._id == name;
      }).toArray();
      var findTag = Lazy(that.allTags).find(function(tag){
        return tag._id == name;
      });
      if(findTag){
        findTag.ckd = false;
      }
    },
    //选中一个标签
    chooseTag: function(checked, name){
      var findTag = Lazy(that.allTags).find(function(tag){
        return tag._id == name;
      });
      if(findTag){
        var findTagIn = Lazy(that.tagList).find(function(tag){
          return tag._id == name;
        });
        if(!findTagIn){
          findTag.ckd = true;
          that.tagList.push(findTag);
        }
      }
    },
    //发布博客
    publishBlog: function(){
      var obj = {
        method: 'PUT',
        url: hostName + blogUrl,
        data: {
          author: '',
          title: that.article.title,
          content: that.article.content,
          category: [],
          tags: [],
          comment: [],
          hits: 0
        }
      };
      var mis = [];
      if(!that.article.title){
        mis.push('标题');
      }
      if(!that.article.content){
        mis.push('内容');
      }
      if(!that.user._id){
        mis.push('作者');
      }
      obj.data.author = {
        uid: that.user._id,
        username: that.user.username
      }
      var categoryTmp = {
        category_id: that.article.sort,
        category_name: ''
      }
      var fndCategory = Lazy(that.categoryList).find(function(item){
        return item._id == that.article.sort;
      });
      if(fndCategory){
        categoryTmp.category_name = fndCategory.name;
      }
      obj.data.category.push(categoryTmp);
      obj.data.tags = [];
      Lazy(that.tagList).each(function(item){
        var tagTmp = {
          tag_id: item._id,
          tag_name: item.name
        };
        obj.data.tags.push(tagTmp);
      });
      if(mis && mis.length > 0){
        that.$Message.info('缺少：' + mis.join());
        return ;
      }
      var msgLd = that.$Message.loading({content: '创建中…', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            that.$Message.success('创建成功！');
            that.article.title = '';
            newEd.txt.clear();
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
    }
  },
  created: function(){
    $http = this.$http;
    that = this;
    hostName = this.domain;
  },
  mounted: function(){
    that.editorInit();
    that.queryCategory();
    that.queryTag();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
