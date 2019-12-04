exports.api = function () {
  return new API();
};
function API() {
  var MongoClient = require('mongodb').MongoClient;
  var ObjectId = require('mongodb').ObjectId;
  var dbUrl = "mongodb://localhost:27017/metoyo";
  var request = require('request');
  var fs = require('fs');
  var Lazy = require('lazy.js');
  var qs = require('query-string');
  var urlencode = require('urlencode');
  var cfg = require('./config');

  //集合 category, tag, user, blog

  /**
   * 请求的变量分析
   */
  var paramsFromRequest = function (req) {
    return ((req.method === 'GET' || req.method === 'DELETE') ? req.query : req.body);
  };

  /**
   * 从ObjectId中获得创建时间
   */
  var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  /**
   * PUT方法，新建
   */
  var putFun = function(req, res, col){
    var params = paramsFromRequest(req) || '';
    if(params){
      if(col && col == 'user'){
        var authcode = params.authcode;
        if(authcode != 'C92aI73'){
          res.send({result: false, error: '邀请码不正确！'});
          return ;
        }
        else{
          delete params.authcode;
        }
      }
      MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('metoyo');
        var whereStr = params;
        dbo.collection(col).insertOne(whereStr, function (err, response) {
          if(err){
            res.send({result: false, error: err});
          }
          else{
            var newId = {
              _id: response.insertedId
            };
            res.send({result: true, data: newId});
            db.close();
          }
        });
      });
    }
    else{
      res.send({result: false, error: '缺少所需参数！'});
    }
  };

  /**
   * DELETE方法，删除
   */
  var deleteFun = function(req, res, col){
    var params = paramsFromRequest(req) || '';
    if(params && params.id){
      MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('metoyo');
        var whereStr = {_id: ObjectId(params.id)};
        dbo.collection(col).deleteMany(whereStr, function (err, response) {
          if(err){
            res.send({result: false, error: err});
          }
          else{
            var delNums = response.result.n + '条文档被删除';
            res.send({result: true, data: delNums});
            db.close();
          }
        });
      });
    }
    else{
      res.send({result: false, error: '缺少所需参数！'});
    }
  };

  /**
   * GET方法，查询
   */
  var getFun = function(req, res, col){
    var params = paramsFromRequest(req) || '';
    if(params && params.id){
      params._id = ObjectId(params.id);
      delete params.id;
    }
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
      var dbo = db.db('metoyo');
      var whereStr = params || {};
      var skipNum = 0;
      var limitNum = 0;
      var onlyNum = false;
      if(params){
        if(params['跳过条数']){
          skipNum = +params['跳过条数'];
          delete params['跳过条数'];
        }
        if(params['查询条数']){
          limitNum = +params['查询条数'];
          delete params['查询条数'];
        }
        if(params.hasOwnProperty('只查数量')){
          onlyNum = params['只查数量'];
          delete params['只查数量'];
        }
      }
      //只查数量
      if(onlyNum){
        dbo.collection(col).find(whereStr).skip(skipNum).limit(limitNum).count(true, function (err, response) {
          if(err){
            res.send({result: false, error: err});
          }
          else{
            res.send({result: true, data: response});
            db.close();
          }
        });
      }
      else{
        dbo.collection(col).find(whereStr).skip(skipNum).limit(limitNum).toArray(function (err, response) {
          if(err){
            res.send({result: false, error: err});
          }
          else{
            if(col == 'user'){
              Lazy(response).each(function(dt){
                delete dt.password;
              });
            }
            // Lazy(response).each(function(dt){
            //   // var dtId = dt._id.toString();
            //   // dt.createtime = dateFromObjectId(dtId);
            //   dt.createtime = dt._id.getTimestamp();
            //   if(col == 'user'){
            //     delete dt.password;
            //   }
            // });
            res.send({result: true, data: response});
            db.close();
          }
        });
      }
    });
  };

  /**
   * POST方法，修改
   */
  var postFun = function(req, res, col){
    var params = paramsFromRequest(req) || '';
    var mis = [];
    if(!params){
      mis.push('参数');
    }
    if(!params.id){
      mis.push('主键ID');
    }
    if(mis && mis.length > 0){
      res.send({result: false, error: '缺少:' + mis.join()});
    }
    else{
      MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('metoyo');
        var whereStr = {_id: ObjectId(params.id)};
        delete params.id;
        var updateStr = {$set: params, $currentDate: { updatetime: true }};
        dbo.collection(col).updateMany(whereStr, updateStr, function (err, response) {
          if(err){
            res.send({result: false, error: err});
          }
          else{
            var modNum = response.result.nModified + '条文档被更新';
            res.send({result: true, data: modNum});
            db.close();
          }
        });
      });
    }
  };

  /**
   * 添加集合
   * **请求方式** put /add_collection
   * @param {String} *集合名词(字符串)
   * @return {JSON} 成功: {result: true}, 失败: {result: false, error: ''}
   * https://www.runoob.com/nodejs/nodejs-mongodb.html
   */
  this.addCollection = function(req, res){
    var params = paramsFromRequest(req) || {};
    var jiHeName = params.name || '';
    if(jiHeName){
      MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db('metoyo');
        dbo.createCollection(jiHeName, {autoIndexId : true}, function (err, response) {
          if(err){
            res.send({result: false, error: err});
          }
          else{
            res.send({result: true});
            db.close();
          }
        });
      });
    }
    else{
      res.send({result: false, error: '缺少集合名称！'});
    }
  };

  /**
   * 新建用户
   * **请求方式** put /user
   * @param {String} *用户名(字符串)
   * @return {JSON} 成功: {result: true, data: []}, 失败: {result: false, error: ''}
   */
  this.addUser = function (req, res) { 
    putFun(req, res, 'user');
    // var params = paramsFromRequest(req) || '';
    // if(params){
    //   var authcode = params.authcode;
    //   if(authcode != 'C92aI73'){
    //     res.send({result: false, error: '邀请码不正确！'});
    //     return ;
    //   }
    //   else{
    //     delete params.authcode;
    //   }
    //   MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db('metoyo');
    //     var whereStr = params;
    //     dbo.collection('user').insertOne(whereStr, function (err, response) {
    //       if(err){
    //         res.send({result: false, error: err});
    //       }
    //       else{
    //         var newId = {
    //           _id: response.insertedId
    //         };
    //         res.send({result: true, data: newId});
    //         db.close();
    //       }
    //     });
    //   });
    // }
    // else{
    //   res.send({result: false, error: '缺少所需参数！'});
    // }
  };

  /**
   * 删除用户
   * **请求方式** DELETE /user
   * @param {Number} *_id
   * @return {JSON} 成功: {result: true}, 失败: {result: false, error: ''}
   */
  this.deleteUser = function (req, res) {
    deleteFun(req, res, 'user');
    // var params = paramsFromRequest(req) || '';
    // if(params && params.id){
    //   MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db('metoyo');
    //     var whereStr = {_id: ObjectId(params.id)};
    //     dbo.collection('user').deleteMany(whereStr, function (err, response) {
    //       if(err){
    //         res.send({result: false, error: err});
    //       }
    //       else{
    //         var delNums = response.result.n + '条文档被删除';
    //         res.send({result: true, data: delNums});
    //         db.close();
    //       }
    //     });
    //   });
    // }
    // else{
    //   res.send({result: false, error: '缺少所需参数！'});
    // }
  };

  /**
   * 修改用户
   * **请求方式** post /user
   * @param {Number} _id
   * @return {JSON} 成功: {result: true,}, 失败: {result: false, error: ''}
   */
  this.modUser = function (req, res) {
    postFun(req, res, 'user');
    // var params = paramsFromRequest(req) || '';
    // var mis = [];
    // if(!params){
    //   mis.push('参数');
    // }
    // if(!params.id){
    //   mis.push('主键ID');
    // }
    // if(mis && mis.length > 0){
    //   res.send({result: false, error: '缺少:' + mis.join()});
    // }
    // else{
    //   MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db('metoyo');
    //     var whereStr = {_id: ObjectId(params.id)};
    //     delete params.id;
    //     var updateStr = {$set: params, $currentDate: { lastModified: true }};
    //     dbo.collection('user').updateMany(whereStr, updateStr, function (err, response) {
    //       if(err){
    //         res.send({result: false, error: err});
    //       }
    //       else{
    //         var modNum = response.result.nModified + '条文档被更新';
    //         res.send({result: true, data: modNum});
    //         db.close();
    //       }
    //     });
    //   });
    // }
  };

  /**
   * 查询用户
   * **请求方式** GET /user
   * @return {JSON} 成功: {result: true, "data": []}, 失败: {result: false, error: ''}
   */
  this.queryUser = function (req, res) {
    getFun(req, res, 'user');
    // var params = paramsFromRequest(req) || '';
    // MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //   if (err) throw err;
    //   var dbo = db.db('metoyo');
    //   var whereStr = params || {};
    //   var skipNum = 0;
    //   var limitNum = 0;
    //   if(params){
    //     if(params['跳过条数']){
    //       skipNum = +params['跳过条数'];
    //     }
    //     if(params['查询条数']){
    //       limitNum = +params['查询条数'];
    //     }
    //   }
    //   dbo.collection('user').find(whereStr).skip(skipNum).limit(limitNum).toArray(function (err, response) {
    //     if(err){
    //       res.send({result: false, error: err});
    //     }
    //     else{
    //       res.send({result: true, data: response});
    //       db.close();
    //     }
    //   });
    // });
  };

  /**
   * 新建分类
   * **请求方式** put /category
   * @param {String} *name
   * @return {JSON} 成功: {result: true, data: []}, 失败: {result: false, error: ''}
   */
  this.addCategory = function (req, res) { 
    putFun(req, res, 'category');
    // var params = paramsFromRequest(req) || '';
    // if(params){
    //   MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db('metoyo');
    //     var whereStr = params;
    //     dbo.collection('category').insertOne(whereStr, function (err, response) {
    //       if(err){
    //         res.send({result: false, error: err});
    //       }
    //       else{
    //         var newId = {
    //           _id: response.insertedId
    //         };
    //         res.send({result: true, data: newId});
    //         db.close();
    //       }
    //     });
    //   });
    // }
    // else{
    //   res.send({result: false, error: '缺少所需参数！'});
    // }
  };

  /**
   * 删除分类
   * **请求方式** DELETE /category
   * @param {Number} *_id
   * @return {JSON} 成功: {result: true}, 失败: {result: false, error: ''}
   */
  this.deleteCategory = function (req, res) {
    deleteFun(req, res, 'category');
    // var params = paramsFromRequest(req) || '';
    // if(params && params.id){
    //   MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db('metoyo');
    //     var whereStr = {_id: ObjectId(params.id)};
    //     dbo.collection('category').deleteMany(whereStr, function (err, response) {
    //       if(err){
    //         res.send({result: false, error: err});
    //       }
    //       else{
    //         var delNums = response.result.n + '条文档被删除';
    //         res.send({result: true, data: delNums});
    //         db.close();
    //       }
    //     });
    //   });
    // }
    // else{
    //   res.send({result: false, error: '缺少所需参数！'});
    // }
  };

  /**
   * 修改分类
   * **请求方式** post /category
   * @param {Number} _id
   * @return {JSON} 成功: {result: true,}, 失败: {result: false, error: ''}
   */
  this.modCategory = function (req, res) {
    postFun(req, res, 'category');
    // var params = paramsFromRequest(req) || '';
    // var mis = [];
    // if(!params){
    //   mis.push('参数');
    // }
    // if(!params.id){
    //   mis.push('分类ID');
    // }
    // if(mis && mis.length > 0){
    //   res.send({result: false, error: '缺少:' + mis.join()});
    // }
    // else{
    //   MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //     if (err) throw err;
    //     var dbo = db.db('metoyo');
    //     var whereStr = {_id: ObjectId(params.id)};
    //     delete params.id;
    //     var updateStr = {$set: params, $currentDate: { lastModified: true }};
    //     dbo.collection('category').updateMany(whereStr, updateStr, function (err, response) {
    //       if(err){
    //         res.send({result: false, error: err});
    //       }
    //       else{
    //         var modNum = response.result.nModified + '条文档被更新';
    //         res.send({result: true, data: modNum});
    //         db.close();
    //       }
    //     });
    //   });
    // }
  };

  /**
   * 查询分类
   * **请求方式** GET /category
   * @return {JSON} 成功: {result: true, "data": []}, 失败: {result: false, error: ''}
   */
  this.queryCategory = function (req, res) {
    getFun(req, res, 'category');
    // var params = paramsFromRequest(req) || '';
    // MongoClient.connect(dbUrl, { useNewUrlParser: true }, function (err, db) {
    //   if (err) throw err;
    //   var dbo = db.db('metoyo');
    //   var whereStr = params || {};
    //   var skipNum = 0;
    //   var limitNum = 0;
    //   if(params){
    //     if(params['跳过条数']){
    //       skipNum = +params['跳过条数'];
    //     }
    //     if(params['查询条数']){
    //       limitNum = +params['查询条数'];
    //     }
    //   }
    //   dbo.collection('category').find(whereStr).skip(skipNum).limit(limitNum).toArray(function (err, response) {
    //     if(err){
    //       res.send({result: false, error: err});
    //     }
    //     else{
    //       res.send({result: true, data: response});
    //       db.close();
    //     }
    //   });
    // });
  };

  /**
   * 新建标签
   * **请求方式** put /tag
   * @param {String} *name
   * @return {JSON} 成功: {result: true, data: []}, 失败: {result: false, error: ''}
   */
  this.addTag = function (req, res) { 
    putFun(req, res, 'tag');
  };

  /**
   * 删除标签
   * **请求方式** DELETE /tag
   * @param {Number} *_id
   * @return {JSON} 成功: {result: true}, 失败: {result: false, error: ''}
   */
  this.deleteTag = function (req, res) {
    deleteFun(req, res, 'tag');
  };

  /**
   * 修改标签
   * **请求方式** post /tag
   * @param {Number} *_id
   * @return {JSON} 成功: {result: true,}, 失败: {result: false, error: ''}
   */
  this.modTag = function (req, res) {
    postFun(req, res, 'tag');
  };

  /**
   * 查询标签
   * **请求方式** GET /tag
   * @return {JSON} 成功: {result: true, "data": []}, 失败: {result: false, error: ''}
   */
  this.queryTag = function (req, res) {
    getFun(req, res, 'tag');
  };

  /**
   * 新建博客
   * **请求方式** put /blog
   * @param {String} *name
   * @return {JSON} 成功: {result: true, data: []}, 失败: {result: false, error: ''}
   */
  this.addBlog = function (req, res) { 
    putFun(req, res, 'blog');
  };

  /**
   * 删除博客
   * **请求方式** DELETE /blog
   * @param {Number} *_id
   * @return {JSON} 成功: {result: true}, 失败: {result: false, error: ''}
   */
  this.deleteBlog = function (req, res) {
    deleteFun(req, res, 'blog');
  };

  /**
   * 修改博客
   * **请求方式** post /blog
   * @param {Number} *_id
   * @return {JSON} 成功: {result: true,}, 失败: {result: false, error: ''}
   */
  this.modBlog = function (req, res) {
    postFun(req, res, 'blog');
  };

  /**
   * 查询博客
   * **请求方式** GET /blog
   * @return {JSON} 成功: {result: true, "data": []}, 失败: {result: false, error: ''}
   */
  this.queryBlog = function (req, res) {
    getFun(req, res, 'blog');
  };


}