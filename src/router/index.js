import Vue from 'vue';
import Router from 'vue-router';
const Home = () => import(/* webpackChunkName: 'home' */ '@/components/me/Home');
const Blog = () => import(/* webpackChunkName: 'blog' */ '@/components/blog/Blog');
const Love = () => import(/* webpackChunkName: 'love' */ '@/components/love/Love');
const Goods = () => import(/* webpackChunkName: 'goods' */ '@/components/goods/Goods');
const Admin = () => import(/* webpackChunkName: 'admin' */ '@/components/admin/Admin');
const Login = () => import(/* webpackChunkName: 'login' */ '@/components/admin/Login');
const Editor = () => import(/* webpackChunkName: 'editor' */ '@/components/admin/Editor');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', //默认
      redirect: '/home'
    },
    {
      path: '/home', //首页
      name: 'Home',
      meta: {
        requireAuth: false
      },
      component: Home
    },
    {
      path: '/blog', //博客
      name: 'Blog',
      meta: {
        requireAuth: false
      },
      component: Blog
    },
    {
      path: '/love', //我的所爱
      name: 'Love',
      meta: {
        requireAuth: false
      },
      component: Love
    },
    {
      path: '/goods', //商品货物
      name: 'Goods',
      meta: {
        requireAuth: false
      },
      component: Goods
    },
    {
      path: '/login', //登录
      name: 'Login',
      meta: {
        requireAuth: false
      },
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      meta: {
        requireAuth: true
      },
      component: Admin,
      children: [
        {
          path: '/editor', //文章编辑器
          name: 'Editor',
          meta: {
            requireAuth: true
          },
          component: Editor
        }
      ]
    }
  ]
});
