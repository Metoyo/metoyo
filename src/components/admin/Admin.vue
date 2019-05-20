<template>
  <!-- <div class="admin">
    <div class="flr ml15" v-if="user['UID']">
      <Dropdown class="fll mr15"> 
        <p>
          <Avatar class="aActive" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" style="margin-top: 8px"/>
        </p>
        <DropdownMenu slot="list">
          <DropdownItem>
            {{user['用户名']}}
          </DropdownItem>
          <DropdownItem divided>
            <a href="javascript:;">修改密码</a>
          </DropdownItem>
          <DropdownItem>
            <a href="javascript:;" @click="logout">退出登录</a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
     <router-view/>
  </div> -->
  <div class="layout admin">
    <Sider class="textLeft" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Row class="login-info">
        <Col span="7">
          <Avatar class="ml10" src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large"/>
        </Col>
        <Col span="12" class="clFff">
          <span class="mt10 fll">{{user['用户名']}}</span>
        </Col>
        <Col span="5" class="clFff">
          <span class="aActive mt10 flr mr10" @click="logout">退出</span>
        </Col>
      </Row>
      <Menu active-name="博客文章" theme="dark" width="auto">
        <MenuItem v-for="(mu, index) in menuList" :key="index" :name="mu.name" :to="mu.url">
          <Icon :type="mu.icon" />
          {{mu.name}}
        </MenuItem>
        <MenuItem name="5">
          <Icon type="ios-home" /> 
          <router-link to="/home" class="clFff">去首页</router-link>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Content :style="{padding: '16px'}">
        <Card>
          <div style="height: 600px">
            <transition name="fade" mode="out-in" appear> 
              <router-view/>
            </transition>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Admin',
  data: function(){
    return {
      menuList: [
        { name: '个人设置', url: '/profileditor', icon: 'ios-person'},
        { name: '博客文章', url: '/blogeditor', icon: 'ios-paper'},
        { name: '商品货物', url: '/cargoeditor', icon: 'ios-cart'},
        { name: '系统设置', url: '/systemeditor', icon: 'ios-settings'},
      ],
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    gotoModule: function(){
      if(this.user['管理员']){
        this.$router.push({ path: '/blogeditor' });
      }
      else{
        this.$router.push({ path: '/login' });
      }
    },
    logout: function(){
      var usrInfo = {
        'UID': null,
        '姓名': null,
        '用户名': null,
        '管理员': false
      };
      this.delCookie('checkLogin');
      this.updateUserInfo(usrInfo);
      this.$router.push({ path: '/home' });
    }
  },
  created: function(){
  },
  mounted: function(){
    // this.gotoModule();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .login-info{
    background: #76829c;
    text-align: left;
    padding: 10px 0;
  }
</style>
