<template>
  <div class="article-list">
    <Table class="mt15" border stripe :columns="blogCol" :data="blogList"></Table>
    <div class="mt10">
      <Page :total="page.total" :current="page.currentPage" :page-size="page.pageSize" size="small" show-total @on-change="changePage"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Lazy from 'lazy.js';

var that = null;
var $http = null;
var hostName = null;
const blogUrl = '/blog';
export default {
  name: 'ArticleList',
  data: function(){
    return {
      blogList: [],
      blogCol: [
        {
          title: '标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '作者',
          key: 'author',
          align: 'center',
          render: (h, params) => {
            var sltRow = params.row;
            var rtTxt = sltRow.author.username;
            return h('span', rtTxt);
          }
        },
        {
          title: '分类',
          key: 'category',
          align: 'center',
          render: (h, params) => {
            var sltRow = params.row;
            return h('p', {},
              sltRow.category.map(function(item){
                var rtTxt = item.category_name;
                return h('span', {
                  // 'class': {
                  //   fontCut: true
                  // }
                }, rtTxt);  
              })  
            );
          }
        },
        {
          title: '标签',
          key: 'tags',
          align: 'center',
          render: (h, params) => {
            var sltRow = params.row;
            return h('p', {},
              sltRow.tags.map(function(item){
                var rtTxt = item.tag_name;
                return h('span', {
                  'class': {
                    mr10: true
                  }
                }, rtTxt);  
              })  
            );
          }
        },
        {
          title: '阅读数',
          key: 'hits',
          align: 'center',
          width: 80
        },
        {
          title: '发布时间',
          key: 'createtime', //that.$comn.dateToLc
          align: 'center',
          render: (h, params) => {
            var sltRow = params.row;
            var rtTxt = that.$comn.dateToLc(sltRow.createtime);
            return h('span', rtTxt);
          }
        },
        {
           title: '操作',
          key: '操作',
          width: 130,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.editorBlog(params.row)
                  }
                }
              }, '修改'),
              h('Poptip', 
                {
                  props: {
                    type: 'text',
                    title: '确定要删除此文章吗？',
                    confirm: true,
                    offset: -50
                  },
                  style: {
                    'text-align': 'left'
                  },
                  on: {
                    'on-ok': () => {
                      this.deleteBlog(params.row)
                    }
                  }
                }, 
                [ 
                  h('Button',{
                    props: {
                      type: 'error',
                      size: 'small'
                    }
                  }, '删除')
                ]
              )
            ]);
          }
        },
      ],
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    }
  },
  computed: {
    ...mapState(['domain'])
  },
  methods: {
    //查询blog数量
    queryBlogNum: function(){
      var obj = {
        method: 'GET',
        url: hostName + blogUrl,
        params: {
          '只查数量': true
        }
      };
      that.page.total = 0;
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          if(data.result){
            that.page.total = data.data;
            that.changePage();
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
      var msgLd = that.$Message.loading({content: '博客查询中…', duration: 0});
      that.blogList = [];
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            Lazy(data.data).each(function(blg){
              blg.createtime = that.$comn.dateFromObjectId(blg._id);
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
    //编辑博客
    editorBlog: function(param){

    },
    //删除博客
    deleteBlog: function(param){
      if(param && param._id){
        var colId = param._id;
        var obj = {
          method: 'DELETE',
          url: hostName + blogUrl,
          params: {
            id: colId
          }
        };
        var msgLd = that.$Message.loading({content: '删除中…', duration: 0});
        $http(obj).then(function(res){
          if(res.status === 200 && res.data){
            var data = that.$comn.toObj(res.data);
            msgLd();
            if(data.result){
              that.blogList = Lazy(that.blogList).reject(function(blg){
                return blg._id == colId;
              }).toArray();
              that.$Message.success('删除成功！');
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
      else{
        that.$Message.info('缺少博客ID！');
      }
    },
  },
  created: function(){
    $http = this.$http;
    that = this;
    hostName = this.domain;
    that.queryBlogNum();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
