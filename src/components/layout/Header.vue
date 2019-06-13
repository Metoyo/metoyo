<template>
  <header id="header" class="header-little">
    <!-- 首页导航 -->
    <div class="logo-box fll">
      <img class="logo" src="@/assets/logo.png">
    </div>
    <div class="right-box flr">
      <Menu mode="horizontal" theme="light" :active-name="activeMenu" class="fll" @on-select='changeMenu'>
        <MenuItem v-for="(mu, index) in menuList" :key="index" :name="mu.name" :to="mu.url">
          <Icon :type="mu.icon" />
          {{mu.username}}
        </MenuItem>
        <!-- <MenuItem name="Management" to="/admin" v-if="user['管理员']">
          <Icon type="ios-settings" />Management
        </MenuItem> -->
      </Menu>
      <!-- <div class="flr ml15" v-if="user['UID']">
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
      </div> -->
    </div>
    <!-- <div :class="{ 'header-little': activeMenu != 'Me', 'header-large': activeMenu == 'Me'}">
      <div class="logo-box">
        <img class="logo" src="@/assets/logo.png">
      </div>
      <div class="right-box">
        <Menu mode="horizontal" theme="light" :active-name="activeMenu" class="fll" @on-select='changeMenu'>
          <MenuItem v-for="(mu, index) in menuList" :key="index" :name="mu.name" :to="mu.url">
            <Icon :type="mu.icon" />
            {{mu.name}}
          </MenuItem>
        </Menu>
        <div class="flr">
          <Avatar icon="ios-person" size="large"/>
        </div>
      </div>
    </div> -->
  </header>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';

  var that = null;
  export default {
    name: 'Header',
    data: function () {
      return {
        activeMenu: '',
        menuList: [
          { name: 'Me', url: '/home', icon: 'ios-home'},
          { name: 'Blog', url: '/blog', icon: 'ios-paper'},
          { name: 'Area 51', url: '/goods', icon: 'ios-nuclear'},
          { name: 'My Princess', url: '/love', icon: 'ios-paw'},
          // { name: 'Management', url: '/admin', icon: 'ios-settings'}
        ],
        loginUsr: ''
      }
    },
    computed: {
      ...mapState(['user']),
    },
    methods: {
      ...mapMutations(['updateUserInfo']),
      changeMenu: function(name){
        this.activeMenu = name;
      },
      getCurrentMenu: function(){
        setTimeout(function(){ 
          var localUrl = that.$router.history.current;
          if(localUrl){
            var menuLen = that.menuList.length;
            var currentPath = localUrl.path;
            for(var i = 0; i < menuLen; i++){
              var currentMenu = that.menuList[i].name;
              var currentUrl = that.menuList[i].url;
              var hasIn = currentPath.indexOf(currentUrl);
              if(hasIn >= 0){
                that.changeMenu(currentMenu);
                break;
              }
              // if(that.menuList[i].url == currentPath){
              //   var currentMenu = that.menuList[i].name;
              //   that.changeMenu(currentMenu);
              //   break;
              // }
            }
          }
        }, 500);
      }
    },
    created: function(){
      that = this;
    },
    mounted: function(){
      this.getCurrentMenu();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header{
    top: 0;
    position: fixed;
    width: 100%;
    overflow: hidden;
    z-index: 10;
  }
  .ivu-menu-horizontal{
    height: 57px;
    line-height: 57px;
    display: inline-block;
  }
  .header-little{
    height: 56px;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    padding: 0 30px;
    box-shadow: 0 2px 10px #bbb;
  }
  .logo{
    width: 42px;
    height: 42px;
    margin-top: 7px;
  }
</style>
