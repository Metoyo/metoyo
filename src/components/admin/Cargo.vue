<template>
  <div class="cargo-editor">
    <h4 class="textCenter">添加商品</h4>
    <Form class="mt20" ref="cargo" :model="cargo" :rules="ruleCargo"  :label-width="80">
      <FormItem label="商品地址" prop="url">
        <Input v-model="cargo.url"></Input>
      </FormItem>
      <FormItem label="商品图片" prop="imgurl">
        <Input v-model="cargo.imgurl"></Input>
      </FormItem>
      <FormItem label="商品名称" prop="name">
        <Input v-model="cargo.name"></Input>
      </FormItem>
      <FormItem label="商品价格" prop="price">
        <Input v-model="cargo.price"></Input>
      </FormItem>
      <FormItem label="折扣价格">
        <Input v-model="cargo.cutprice"></Input>
      </FormItem>
      <FormItem label="优惠劵">
        <Input v-model="cargo.ticket"></Input>
      </FormItem>
      <FormItem label="点击量">
        <Input v-model="cargo.like"></Input>
      </FormItem>
      <FormItem>
        <Button class="w200" size="large" type="primary" @click="publishCargo('cargo')">发布</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

var that = null;
var $http = null;
var hostName = null;
const cargoUrl = '/cargo'; //货物url
export default {
  name: 'Cargo',
  data: function(){
    return {
      cargo: {
        url: '',
        imgurl: '',
        name: '',
        price: '',
        cutprice: '',
        ticket: '',
        like: 0
      },
      ruleCargo: {
        url: [
          { required: true, message: '请输入商品地址', trigger: 'blur' }
        ],
        imgurl: [
          { required: true, message: '请输商品图片', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['domain', 'user'])
  },
  methods: {
    //发布货物
    publishCargo: function(name){
      that.$refs[name].validate((valid) => {
        if(valid){
          var obj = {
            method: 'PUT',
            url: hostName + blogUrl,
            data: {}
          };
        }
      });
    }
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
