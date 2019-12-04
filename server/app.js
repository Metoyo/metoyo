/**
 * @title 报名系统的路由
 * @overview 建立访问路径与api的映射
 * @copyright (c) 2018 泰安厅教育科技有限公司
 * @author 张松涛
 */
var express = require('express');
// var fs = require('fs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

// var server = http.Server(app);
// var io = require('socket.io')(server);

var port = 8081;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
  store: new FileStore({}),
  secret: 'tat1234554321ata'
}));

// 访问静态资源
app.use(express.static(path.resolve(__dirname, '../dist')));

//引入api
var api = require('./api.js').api();

//公用
app.put('/add_collection', api.addCollection); //创建集合(表)

//用户列表
app.put('/user', api.addUser); //注册用户
app.delete('/user', api.deleteUser); //删除用户信息
app.get('/user', api.queryUser); //查询用户信息
app.post('/user', api.modUser); //修改用户信息
//分类
app.put('/category', api.addCategory); //添加分类
app.delete('/category', api.deleteCategory); //删除分类
app.get('/category', api.queryCategory); //查询分类
app.post('/category', api.modCategory); //修改分类
//标签
app.put('/tag', api.addTag); //添加标签
app.delete('/tag', api.deleteTag); //删除标签
app.get('/tag', api.queryTag); //查询标签
app.post('/tag', api.modTag); //修改标签
//博客
app.put('/blog', api.addBlog); //添加博客
app.delete('/blog', api.deleteBlog); //删除博客
app.get('/blog', api.queryBlog); //查询博客
app.post('/blog', api.modBlog); //修改博客


// 监听
app.listen(port, function () {
  console.log('success listen...' + port);
});