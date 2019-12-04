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
          <span class="mt10 fll">{{user.username}}</span>
        </Col>
        <Col span="5" class="clFff">
          <span class="aActive mt10 flr mr10" @click="logout">退出</span>
        </Col>
      </Row>
      <Menu active-name="文章管理" :open-names="['内容管理']" theme="dark" width="auto" accordion>
        <MenuItem name="个人设置" to="/profileditor">
          <Icon type="ios-person" /> 个人设置
        </MenuItem>
        <Submenu name="内容管理">
          <template slot="title">
            <Icon type="ios-paper" /> 内容管理
          </template>
          <MenuItem name="文章管理" to="/articlelist">
            文章管理
          </MenuItem>
          <MenuItem name="新建文章" to="/articleditor">
            新建文章
          </MenuItem>
          <MenuItem name="分类和标签" to="/sortandtag">
            分类和标签
          </MenuItem>
        </Submenu>
        <Submenu name="商品管理">
          <template slot="title">
            <Icon type="ios-cart" /> 商品管理
          </template>
          <MenuItem name="商品列表" to="/cargolist">
            商品列表
          </MenuItem>
          <MenuItem name="添加商品" to="/cargoeditor">
            添加商品
          </MenuItem>
        </Submenu>
        <!-- <MenuItem v-for="(mu, index) in menuList" :key="index" :name="mu.name" :to="mu.url">
          <Icon :type="mu.icon" />
          {{mu.name}}
        </MenuItem> -->
        <MenuItem name="系统设置" to="/systemeditor">
          <Icon type="ios-settings" /> 系统设置
        </MenuItem>
        <MenuItem name="去首页" to="/home">
          <Icon type="ios-home" /> 去首页
        </MenuItem>
      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Content :style="{padding: '16px'}">
        <Card>
          <div style="min-height: 600px">
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
      // menuList: [
      //   { name: '个人设置', url: '/profileditor', icon: 'ios-person'},
      //   { name: '博客文章', url: '/blogeditor', icon: 'ios-paper'},
      //   { name: '商品货物', url: '/cargoeditor', icon: 'ios-cart'},
      //   { name: '系统设置', url: '/systemeditor', icon: 'ios-settings'},
      // ],
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    gotoModule: function(){
      console.log(this.user);
      // this.$router.push({ path: '/systemeditor' });
      if(this.user.admin){
        console.log();
        this.$router.push({ path: '/systemeditor' });
      }
      else{
        this.$router.push({ path: '/login' });
      }
    },
    logout: function(){
      var usrInfo = {
        _id: null,
        // name: null,
        username: null,
        email: null,
        phone: null,
        role: null,
        admin: false
      };
      this.delCookie('checkLogin');
      this.updateUserInfo(usrInfo);
      this.$router.push({ path: '/home' });
    }
  },
  created: function(){
  },
  mounted: function(){
    this.gotoModule();
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
