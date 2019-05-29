<template>
  <div class="sort-editor">
    <Divider orientation="left">分类</Divider>
    <div class="sort-box">
      <div>
        <Input v-model="newSortName" style="width: 300px" />
        <Button type="primary" @click="addSort">保存</Button>
      </div>
      <Table class="mt15" stripe :columns="sortCol" :data="sortList"></Table>
      <div class="mt10">
        <Page :total="page.total" :current="page.currentPage" :page-size="page.pageSize" size="small" show-total @on-change="changePage"/>
      </div>
    </div>
    <Divider orientation="left">标签</Divider>
    <div class="tag-box">
      <div>
        <Input v-model="newTagName" style="width: 300px" />
        <Button type="primary" @click="addTag">保存</Button>
      </div>
      <div class="mt15">
        <Tag class="mr10" v-for="item in allTags" :name="item.id" :key="item.id" closable @on-close="deleteTag">
          {{item.name}}
        </Tag>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SortAndTag',
  data: function(){
    return {
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
      sortCol: [
        {
          title: '分类',
          key: 'name'
        },
        {
          title: '操作',
          key: 'action',
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
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.sortEditor(params.row)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.sortRemove(params.row)
                  }
                }
              }, '删除')
            ]);
          }
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
      newTagName: '',
      newSortName: '',
      page: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    }
  },
  methods: {
    //添加分类
    addSort: function(){

    },
    //修改分类
    sortEditor: function(params){
      console.log(params);
    },
    //删除分类
    sortRemove: function(params){
      console.log(params);
    },
    //分类翻页
    changePage: function(p){
      p = p || 1;
      var bgIdx = this.page.pageSize * (p - 1);
      var edIdx = this.page.pageSize * p;
      this.page.currentPage = p;
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
    //删除标签
    deleteTag: function(event, name){
      console.log(name);
    }
  },
  created: function(){
    this.page.total = this.sortList.length;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
