// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import axios from 'axios';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import PlgCommon from './plugins/common/common';

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(iView);
Vue.use(PlgCommon);

//Vuex配置
const store = new Vuex.Store({
  state: {
    // domain: 'http://127.0.0.1:8081', //保存后台请求的地址，修改时方便
    domain: '/api', //保存后台请求的地址，修改时方便
    // activeMenu: 'Me',
    user: { //保存用户信息
      _id: null,
      // name: null,
      username: null,
      email: null,
      phone: null,
      role: null,
      admin: false
    }
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUser) {
      state.user = newUser;
    },
    // //更新当前标签
    // updateActiveMenu(state, newMenu) {
    //   state.activeMenu = newMenu;
    // }
  }
});

//检查object是否为空
function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

//获取cookie
Vue.prototype.getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg);
    return (arr[2]);
  }
  else {
    return null;
  }
};

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setTime(exdate.getTime() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = that.getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
};

//为axios设置别名
Vue.prototype.$http = axios;

/* eslint-disable no-new */
var that = null;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created:function() {
    that = this;
    // this.$Message.config({
    //   // duration: 3,
    //   top: 150
    // });
  }
});

// 全局导航钩子
router.beforeEach(function(to, from, next){
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    var userSession = '';
    var ckLg = that.getCookie('checkLogin');
    if(that && ckLg && ckLg != 'undefined'){
      var usrSessionTmp = unescape(ckLg);
      userSession = JSON.parse(usrSessionTmp);
    }
    if(userSession){
      // 通过vuex state获取当前的token是否存在 store.state.user
      var userInfo = store.state.user;
      if (!isEmptyObject(userInfo)) {
        next();
      } 
      else {
        next({ // 需要登录信息，未登录时的跳转
          path: '/login'
        })
      }
    }
    else{
      next({ // 用户session是不存在
        path: '/login'
      })
    }
  } 
  else {
    next();
  }
});
