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
          <Option v-for="item in sortList" :value="item.name" :key="item.id">{{ item.name }}</Option>
        </Select>
        <Button type="text" @click="sortBoxPop">创建分类</Button>
        <!-- 分类管理 -->
        <!-- <transition name="fade">
          <div class="bd1 p15 bdrds" v-if="showSortAdd">
            <Tag checkable v-for="item in sortList" :key="item.id">
              {{item.name}}
            </Tag>
          </div>
        </transition> -->
      </FormItem>
      <FormItem label="标签">
        <Tag v-for="item in tagList" :name="item.id" :key="item.id" closable @on-close="closeTag">
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
              <Button @click="addTag">保存</Button>
            </div>
            <Tag checkable v-for="item in allTags" :name="item.id" :key="item.id" :checked="item.ckd" @on-change="chooseTag">
              {{item.name}}
            </Tag>
          </div>
        </transition>
      </FormItem>
      <FormItem>
        <Button class="w200" size="large" type="primary">发布</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import wangEditor from 'wangeditor';
import Lazy from 'lazy.js';

var $http = null;
const tagUrl = '/tag';
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
      sortList: [
        {
          id: 1,
          name: '技术'
        },
        {
          id: 2,
          name: '旅游'
        },
        {
          id: 3,
          name: '美食'
        }
      ],
      allTags: [
        {
          id: 1,
          name: '新疆',
          ckd: false
        },
        {
          id: 2,
          name: '美食',
          ckd: false
        },
        {
          id: 3,
          name: '阿勒泰',
          ckd: false
        },
        {
          id: 4,
          name: '北屯',
          ckd: false
        }
      ],
      tagList: [],
      showTagBox: false,
      showSortAdd: false,
      newTagName: ''
    }
  },
  methods: {
    //编辑器初始化
    editorInit: function(){
      var newEd = new wangEditor('#editorBox');
      newEd.customConfig.onchange = function (html) {
        // html 即变化之后的内容
        console.log(html);
      }
      // 
      // newEd.customConfig.onchangeTimeout = 1000 // 自定义 onchange 触发的延迟时间，默认为 200 ms
      newEd.create();
      // newEd.txt.clear(); //清除内容
      // newEd.txt.html('<p>用 JS 设置的内容</p>'); //设置编辑器内容
      // newEd.txt.append('<p>追加的内容</p>'); //继续追加内容
      // newEd.txt.html(); //读取html
      // newEd.txt.text(); //读取text
    },
    //创建分类弹出
    sortBoxPop: function(){
      this.showSortAdd = !this.showSortAdd;
    },
    //添加标签弹出
    addTagPop: function(){
      this.showTagBox = !this.showTagBox;
    },
    //添加标签
    addTag: function(){
      var obj = {
        methods: 'put',
        url: tagUrl,
        data: {
          name: this.newTagName
        }
      };
      var msgLd = this.$Message.loading({content: '创建中...', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = res.data;
          if(data.result){
            var tagTemp = {
              id: data.data['id'],
              name: data.data['name'],
              ckd: false
            };
            this.newTagName = '';
            this.allTags.push(tagTemp);
          }
          else{
            this.$Message.error({content: data.error, duration: 300, closable: true});
          }
          msgLd();
        }
        else{
          msgLd();
          this.$Message.error({content: '错误状态码：' + res.status, duration: 30, closable: true});
        }
      });
    },
    //关闭一个标签
    closeTag: function(event, name) {
      this.tagList = Lazy(this.tagList).reject(function(tag){
        return tag.id == name;
      }).toArray();
      var findTag = Lazy(this.allTags).find(function(tag){
        return tag.id == name;
      });
      if(findTag){
        findTag.ckd = false;
      }
    },
    //选中一个标签
    chooseTag: function(checked, name){
      var findTag = Lazy(this.allTags).find(function(tag){
        return tag.id == name;
      });
      if(findTag){
        var findTagIn = Lazy(this.tagList).find(function(tag){
          return tag.id == name;
        });
        if(!findTagIn){
          findTag.ckd = true;
          this.tagList.push(findTag);
        }
      }
    }
  },
  created: function(){
    $http = this.$http;
  },
  mounted: function(){
    this.editorInit();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
