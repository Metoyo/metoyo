import Vue from 'vue';
import Router from 'vue-router';
const Main = () => import(/* webpackChunkName: 'main' */ '@/components/layout/Main');
const Home = () => import(/* webpackChunkName: 'home' */ '@/components/me/Home');
const BlogHome = () => import(/* webpackChunkName: 'bloghome' */ '@/components/blog/BlogHome');
const BlogPost = () => import(/* webpackChunkName: 'blogpost' */ '@/components/blog/BlogPost');
const Love = () => import(/* webpackChunkName: 'love' */ '@/components/love/Love');
const Goods = () => import(/* webpackChunkName: 'goods' */ '@/components/goods/Goods');
const Admin = () => import(/* webpackChunkName: 'admin' */ '@/components/admin/Admin');
const Login = () => import(/* webpackChunkName: 'login' */ '@/components/admin/Login');
const Article = () => import(/* webpackChunkName: 'article' */ '@/components/admin/Article');
const ArticleList = () => import(/* webpackChunkName: 'articlelist' */ '@/components/admin/ArticleList');
const SortAndTag = () => import(/* webpackChunkName: 'sortandtag' */ '@/components/admin/SortAndTag');
const Cargo = () => import(/* webpackChunkName: 'cargo' */ '@/components/admin/Cargo');
const CargoList = () => import(/* webpackChunkName: 'cargolist' */ '@/components/admin/CargoList');
const Profile = () => import(/* webpackChunkName: 'profile' */ '@/components/admin/Profile');
const System = () => import(/* webpackChunkName: 'system' */ '@/components/admin/System');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', //默认
      redirect: '/main'
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
      path: '/main', //客户页面
      name: 'Main',
      meta: {
        requireAuth: false
      },
      component: Main,
      children: [
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
          name: 'BlogHome',
          meta: {
            requireAuth: false
          },
          component: BlogHome
        },
        {
          path: '/blog/:id', //博客详情
          name: 'BlogPost',
          meta: {
            requireAuth: false
          },
          component: BlogPost
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
      ]
    },
    {
      path: '/admin', //管理页面
      name: 'Admin',
      meta: {
        requireAuth: true
      },
      component: Admin,
      children: [
        {
          path: '/articlelist', //文章列表
          name: 'ArticleList',
          meta: {
            requireAuth: true
          },
          component: ArticleList
        },
        {
          path: '/articleditor', //文章编辑
          name: 'Article',
          meta: {
            requireAuth: true
          },
          component: Article
        },
        {
          path: '/sortandtag', //分类和标签
          name: 'SortAndTag',
          meta: {
            requireAuth: true
          },
          component: SortAndTag
        },
        {
          path: '/cargolist', //商品列表
          name: 'CargoList',
          meta: {
            requireAuth: true
          },
          component: CargoList
        },
        {
          path: '/cargoeditor', //商品编辑
          name: 'Cargo',
          meta: {
            requireAuth: true
          },
          component: Cargo
        },
        {
          path: '/profileditor', //个人资料设置
          name: 'Profile',
          meta: {
            requireAuth: true
          },
          component: Profile
        },
        {
          path: '/systemeditor', //系统设置
          name: 'System',
          meta: {
            requireAuth: true
          },
          component: System
        },
      ]
    }
  ]
});
