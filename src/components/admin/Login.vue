<template>
  <div class="login">
    <div class="fz16 textCenter">登录</div>
    <Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
      <FormItem prop="userName" class="mt30">
        <Input type="text" v-model="formLogin.userName" size="large" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem prop="password" class="mt30">
        <Input type="password" v-model="formLogin.password" size="large" placeholder="请输入密码"></Input>
      </FormItem>
      <!-- <FormItem prop="authCode" class="mt30">
        <Input type="text" v-model="formLogin.authCode" number size="large" placeholder="请输入验证码"></Input>
      </FormItem> -->
      <FormItem class="mt30 textRight">
        <router-link to="/home" class="fz14 fll">首页</router-link>
        <router-link to="/register" class="fz14 fll ml15">注册</router-link>
        <Button type="primary" @click="login('formLogin')" size="large" class="w100 ml15">登录</Button>
        <Button @click="reset('formLogin')" style="margin-left: 8px" size="large" class="w100">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

var that = null;
var $http = null;
var hostName = null;
const loginUrl = '/user';
export default {
  name: 'Login',
  data: function(){
    return {
      formLogin: {
        userName: '',
        password: '',
        // authCode: ''
      },
      ruleLogin: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        // authCode: [
        //   { required: true, message: '验证码', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
    ...mapState(['user', 'domain'])
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    login: function(name){
      that.$refs[name].validate((valid) => {
        if (valid) {
          var obj = {
            method: 'GET',
            url: hostName + loginUrl,
            data: {
              username: that.formLogin.userName,
              password: that.formLogin.password,
              // '验证码': that.formLogin.authCode,
            }
          };
          var msgLd = that.$Message.loading({content: '登录中...', duration: 0});
          $http(obj).then(function(res){
            if(res.status === 200 && res.data){
              var data = res.data;
              if(data.result){
                if(data.data && data.data[0]){
                  var usrInfo = data.data[0];
                  usrInfo.admin = true;
                  var usrInfoStr = JSON.stringify(usrInfo);
                  that.setCookie('checkLogin', usrInfoStr);
                  that.updateUserInfo(usrInfo);
                  that.$router.push({ path: '/admin' });
                }
                else{
                  that.$Message.error({content: data.error, duration: 300, closable: true});
                }
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
        } 
      })
    },
    reset: function(name){
      that.$refs[name].resetFields();
    }
  },
  created: function(){
    that = this;
    $http = this.$http;
    hostName = this.domain;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  width: 400px;
  position: absolute;
  right: 50%;
  top: 50%;
  transform:translate(200px, -60%);
}
.auth-input{
  width: 260px;
  margin-top: 3px;
}
</style>
