<template>
  <div class="sort-editor">
    <Divider orientation="left">分类</Divider>
    <div class="sort-box">
      <div>
        <Input v-model="newCategoryName" style="width: 300px" />
        <Button type="primary" @click="saveCategory">保存</Button>
        <Button type="error" class="ml10" @click="cancelFun('category')">取消</Button>
      </div>
      <Table class="mt15" border stripe :columns="categoryCol" :data="categoryList"></Table>
      <!-- <div class="mt10">
        <Page :total="page.total" :current="page.currentPage" :page-size="page.pageSize" size="small" show-total @on-change="changePage"/>
      </div> -->
    </div>
    <Divider orientation="left">标签</Divider>
    <div class="tag-box">
      <div>
        <Input v-model="newTagName" style="width: 300px" />
        <Button type="primary" @click="addTag">保存</Button>
      </div>
      <div class="mt15">
        <Tag class="mr10" v-for="item in allTags" :name="item._id" :key="item._id" closable @on-close="deleteTag">
          {{item.name}}
        </Tag>
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
const categoryUrl = '/category'; //分类
const tagUrl = '/tag'; //分类
export default {
  name: 'SortAndTag',
  data: function(){
    return {
      categoryList: [],
      categoryCol: [
        {
          title: '分类',
          key: 'name'
        },
        {
          title: '操作',
          key: '操作',
          width: 150,
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
                    this.categoryEditorPop(params.row)
                  }
                }
              }, '修改'),
              h('Poptip', 
                {
                  props: {
                    type: 'text',
                    title: '确定要删除此分类吗？',
                    confirm: true,
                    offset: -50
                  },
                  style: {
                    'text-align': 'left'
                  },
                  on: {
                    'on-ok': () => {
                      this.categoryRemove(params.row)
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
        }
      ],
      allTags: [],
      newTagName: '',
      newCategoryName: '',
      categoryAdd: true,
      selectCategory: '',
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
    //添加分类
    addCategory: function(){
      var obj = {
        method: 'PUT',
        url: hostName + categoryUrl,
        data: {
          name: '',
          uid: 1
        }
      };
      if(that.newCategoryName){
        obj.data.name = that.newCategoryName;
      }
      else{
        that.$Message.info('缺少分类名称!');
        return ;
      }
      var msgLd = that.$Message.loading({content: '分类创建中…', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            that.$Message.success('分类创建成功！');
            that.cancelFun('category');
            that.queryCategory();
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
    //修改分类选择分类
    categoryEditorPop: function(param){
      that.selectCategory = param;
      that.newCategoryName = param.name;
      that.categoryAdd = false;
    },
    //修改分类
    categoryEditor: function(param){
      if(param && param._id){
        var colId = param._id;
        var obj = {
          method: 'POST',
          url: hostName + categoryUrl,
          data: {
            id: colId
          }
        };
        if(that.newCategoryName){
          obj.data.name = that.newCategoryName;
        }
        else{
          that.$Message.info('缺少分类名称!');
          return ;
        }
        var msgLd = that.$Message.loading({content: '分类修改中…', duration: 0});
        $http(obj).then(function(res){
          if(res.status === 200 && res.data){
            var data = that.$comn.toObj(res.data);
            msgLd();
            if(data.result){
              Lazy(that.categoryList).each(function(cate){
                if(cate._id == colId){
                  cate.name = that.$comn.cloneObj(that.newCategoryName);
                }
              });
              that.$Message.success('分类修改成功！');
              that.cancelFun('category');
              that.queryCategory();
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
        that.$Message.info('缺少分类ID！');
      }
    },
    //删除分类
    categoryRemove: function(param){
      if(param && param._id){
        var colId = param._id;
        var obj = {
          method: 'DELETE',
          url: hostName + categoryUrl,
          params: {
            id: colId
          }
        };
        var msgLd = that.$Message.loading({content: '分类删除中…', duration: 0});
        $http(obj).then(function(res){
          if(res.status === 200 && res.data){
            var data = that.$comn.toObj(res.data);
            msgLd();
            if(data.result){
              that.categoryList = Lazy(that.categoryList).reject(function(cate){
                return cate._id == colId;
              }).toArray();
              that.$Message.success('分类删除成功！');
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
        that.$Message.info('缺少分类ID！');
      }
    },
    //保存分类的修改
    saveCategory: function(){
      if(that.categoryAdd){ 
        that.addCategory();
      }
      else{
        var param = that.selectCategory;
        that.categoryEditor(param);
      }
    },
    //分类翻页
    changePage: function(p){
      p = p || 1;
      var bgIdx = this.page.pageSize * (p - 1);
      var edIdx = this.page.pageSize * p;
      this.page.currentPage = p;
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
    //删除标签
    deleteTag: function(event, name){
      var obj = {
        method: 'DELETE',
        url: hostName + tagUrl,
        params: {
          id: name
        }
      };
      if(!name){
        that.$Message.warning('缺少标签ID！');
        return ;
      }
      var msgLd = that.$Message.loading({content: '分类删除中…', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          msgLd();
          if(data.result){
            that.allTags = Lazy(that.allTags).reject(function(tg){
              return tg._id == name;
            }).toArray();
            that.$Message.success('标签删除成功！');
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
    //取消
    cancelFun: function(param){
      if(param && param == 'category'){
        that.newCategoryName = '';
        that.selectCategory = '';
        that.categoryAdd = true;
      }
    }
  },
  created: function(){
    $http = this.$http;
    that = this;
    hostName = this.domain;
    that.queryCategory();
    that.queryTag();
    // this.page.total = this.categoryList.length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
