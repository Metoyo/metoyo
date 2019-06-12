<template>
  <div class="system-editor">
    <Divider orientation="left">添加集合</Divider>
    <div class="box">
      <Input v-model="collectionName" style="width: 300px;font-size:14px;" />
      <Button type="primary" @click="addCollection">保存</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

var that = null;
var $http = null;
var hostName = '';
const addCollectionUrl = '/add_collection'; //添加集合

export default {
  name: 'System',
  data: function(){
    return {
      collectionName: ''
    }
  },
  computed: {
    ...mapState(['domain'])
  },
  methods: {
    //添加集合
    addCollection: function(){
      var obj = {
        method: 'PUT',
        url: hostName + addCollectionUrl,
        data: {
          name: ''
        }
      };
      if(that.collectionName){
        obj.data.name = that.collectionName;
      }
      else{
        that.$Message.info('缺少集合名称!');
        return ;
      }
      var msgLd = that.$Message.loading({content: '集合创建中…', duration: 0});
      $http(obj).then(function(res){
        if(res.status === 200 && res.data){
          var data = that.$comn.toObj(res.data);
          if(data.result){
            msgLd();
            that.$Message.success('集合创建成功！');
            that.collectionName = '';
          }
          else{
            msgLd();
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
