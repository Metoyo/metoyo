<template>
  <div class="login">
    <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
      <FormItem prop="userName" class="mt30">
        <Input type="text" v-model="formLogin.userName" size="large" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem prop="password" class="mt30">
        <Input type="password" v-model="formLogin.password" size="large" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem prop="authCode" class="mt30">
        <Input type="text" v-model="formLogin.authCode" number size="large" placeholder="请输入验证码"></Input>
      </FormItem>
      <FormItem class="mt30 textRight">
        <Button type="primary" @click="login('formLogin')" size="large" class="w100">登录</Button>
        <Button @click="reset('formLogin')" style="margin-left: 8px" size="large" class="w100">重置</Button>
      </FormItem>
    </Form>
    <span>{{user['用户名']}}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import wangEditor from 'wangeditor';

var that = null;
var $http = null;
const loginUrl = '/login';
export default {
  name: 'Login',
  data: function(){
    return {
      formLogin: {
        userName: '',
        password: '',
        authCode: ''
      },
      ruleLogin: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // var obj = {
          //   methods: 'post',
          //   url: loginUrl,
          //   data: {
          //     '用户名': this.formLogin.userName,
          //     '密码': this.formLogin.password,
          //     '验证码': this.formLogin.authCode,
          //   }
          // };
          // var msgLd = this.$Message.loading({content: '查询中...', duration: 0});
          // $http(obj).then(function(res){
          //   if(res.status === 200 && res.data){
          //     var data = res.data;
          //     if(data.result){
          //       console.log(data.data);
          //     }
          //     else{
          //       this.$Message.error({content: data.error, duration: 300, closable: true});
          //     }
          //     msgLd();
          //   }
          //   else{
          //     msgLd();
          //     this.$Message.error({content: '错误状态码：' + res.status, duration: 30, closable: true});
          //   }
          // });
          var usrInfo = {
            'UID': 1,
            '姓名': '张松涛',
            '用户名': 'Metoyo',
            '管理员': true
          };
          var usrInfoStr = JSON.stringify(usrInfo);
          that.setCookie('checkLogin', usrInfoStr);
          that.updateUserInfo(usrInfo);
          that.$router.push({ path: '/admin' });
          that.$Message.success('Success!');
        } 
      })
    },
    reset (name) {
      this.$refs[name].resetFields();
    }
  },
  created: function(){
    that = this;
    $http = this.$http;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  width: 400px;
  margin: 20px auto;
}
.auth-input{
  width: 260px;
  margin-top: 3px;
}
</style>
