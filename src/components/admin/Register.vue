<template>
  <div class="login">
    <div class="fz16 textCenter">注册</div>
    <Form class="mt30" ref="formRegister" :model="formRegister" :rules="ruleLogin">
      <FormItem prop="userName">
        <Input type="text" v-model="formRegister.userName" size="large" placeholder="请输入用户名"></Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formRegister.password" size="large" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem prop="pswConfirm">
        <Input type="password" v-model="formRegister.pswConfirm" size="large" placeholder="请再次输入密码"></Input>
      </FormItem>
      <FormItem prop="authCode">
        <Input type="text" v-model="formRegister.authCode" number size="large" placeholder="请输入邀请码"></Input>
      </FormItem>
      <FormItem prop="email">
        <Input type="text" v-model="formRegister.email" size="large" placeholder="请输入邮箱"></Input>
      </FormItem>
      <FormItem prop="phone">
        <Input type="text" v-model="formRegister.phone" size="large" placeholder="请输入手机"></Input>
      </FormItem>
      <FormItem class="textRight">
        <router-link to="/home" class="fz14 fll">首页</router-link>
        <router-link to="/login" class="fz14 fll ml15">登录</router-link>
        <Button type="primary" @click="singin('formRegister')" size="large" class="w100 ml15">注册</Button>
        <Button @click="reset('formRegister')" style="margin-left: 8px" size="large" class="w100">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

var that = null;
var $http = null;
var hostName = null;
const userUrl = '/user';
export default {
  name: 'Register',
  data: function(){
     //手机号码验证
    const validatePhone = function(rule, value, callback) {
      if (!value) {
        // return callback(new Error("手机号不能为空"));
        return callback();
      } 
      else if (!/^1[345789]\d{9}$/.test(value)) {
        callback("手机号格式不正确");
      } 
      else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } 
      else {
        if (this.formRegister.pswConfirm !== '') {
          // 对第二个密码框单独验证
          this.$refs.formRegister.validateField('pswConfirm');
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } 
      else if (value !== this.formRegister.password) {
        callback(new Error('两次输入的密码不一致!'));
      } 
      else {
        callback();
      }
    };
    return {
      formRegister: {
        userName: '',
        password: '',
        pswConfirm: '',
        phone: '',
        email: '',
        authCode: ''
      },
      ruleLogin: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: "string", min: 6, max: 16, message: "6~16个字符，区分大小写", trigger: "blur"},
          { validator: validatePass, trigger: 'blur' }
        ],
        pswConfirm: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['user', 'domain'])
  },
  methods: {
    singin: function(name){
      that.$refs[name].validate((valid) => {
        if (valid) {
          var msgLd = that.$Message.loading({content: '用户注册中…', duration: 0});
          new Promise(function(resolve, reject){
            var obj = {
              method: 'GET',
              url: hostName + userUrl,
              params: {
                username: that.formRegister.userName
              }
            };
            $http(obj).then(function(res){
              if(res.status === 200 && res.data){
                var data = that.$comn.toObj(res.data);
                msgLd();
                if(data.result){
                  if(data.data && data.data.length == 0){
                    resolve();
                  }
                  else{
                    that.$Message.error({content: '用户名已存在，请重新修改！', duration: 300, closable: true});
                    reject();
                  }
                }
                else{
                  that.$Message.error({content: data.error, duration: 300, closable: true});
                  reject();
                }
              }
              else{
                msgLd();
                that.$Message.error({content: '错误状态码：' + res.status, duration: 300, closable: true});
                reject();
              }
            })
            .catch(function(error){
              msgLd();
              that.$Message.error({content: error, duration: 300, closable: true});
              reject();
            });
          })
          .then(function(){
            return new Promise(function(resolve, reject){
              var obj = {
                method: 'GET',
                url: hostName + userUrl,
                params: {
                  email: that.formRegister.email
                }
              };
              $http(obj).then(function(res){
                if(res.status === 200 && res.data){
                  var data = that.$comn.toObj(res.data);
                  msgLd();
                  if(data.result){
                    if(data.data && data.data.length == 0){
                      resolve();
                    }
                    else{
                      that.$Message.error({content: '邮箱已存在，请重新修改！', duration: 300, closable: true});
                      reject();
                    }
                  }
                  else{
                    that.$Message.error({content: data.error, duration: 300, closable: true});
                    reject();
                  }
                }
                else{
                  msgLd();
                  that.$Message.error({content: '错误状态码：' + res.status, duration: 300, closable: true});
                  reject();
                }
              })
              .catch(function(error){
                msgLd();
                that.$Message.error({content: error, duration: 300, closable: true});
                reject();
              });
            })
          })
          .then(function(){
            var obj = {
              method: 'PUT',
              url: hostName + userUrl,
              data: {
                username: that.formRegister.userName,
                password: that.formRegister.password,
                email: that.formRegister.email,
                authcode: that.formRegister.authCode,
              }
            };
            if(that.formRegister.phone){
              obj.data.phone = that.formRegister.phone;
            }
            $http(obj).then(function(res){
              if(res.status === 200 && res.data){
                var data = res.data;
                msgLd();
                if(data.result){
                  if(data.data && data.data._id){
                    that.reset(name);
                    that.$Message.success('注册成功，请登录！');
                    that.$router.push({ path: '/login' });
                  }
                  else{
                    that.$Message.error({content: '注册失败！', duration: 300, closable: true});
                  }
                }
                else{
                  that.$Message.error({content: data.error, duration: 300, closable: true});
                }
              }
              else{
                msgLd();
                that.$Message.error({content: '错误状态码：' + res.status, duration: 30, closable: true});
              }
            });
          });
        } 
      });
    },
    reset: function(name){
      this.$refs[name].resetFields();
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
