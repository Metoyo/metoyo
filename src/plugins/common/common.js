import Common from './common.vue'

export default {
  /**
   * 每个插件都有的install方法，用于安装插件
   * @param {Object} Vue - Vue类
   * @param {Object} [pluginOptions] - 插件安装配置
   */
  install(Vue, pluginOptions = {}) {
    // 创建"子类"方便挂载
    // const PlgCommon = Vue.extend(Common);
    // let comn = null;
    let comnFun = {
      dateToTz: null,
      cloneObj: null,
      dateFromObjectId: null,
      checkBrowser: null,
      dateToLc: null,
      dateToLcStr: null,
      toObj: null
    };

    //日期格式化，格式化为UTC
    comnFun.dateToTz = (dtStr) => {
      var nd = new Date(dtStr);
      var y = nd.getUTCFullYear();
      var m = nd.getUTCMonth() + 1;
      var d = nd.getUTCDate();
      var h = nd.getUTCHours();
      var f = nd.getUTCMinutes();
      var s = nd.getUTCSeconds();
      if(m < 10){
        m = '0' + m;
      }
      if(d < 10){
        d = '0' + d;
      }
      if(h < 10){
        h = '0' + h;
      }
      if(f < 10){
        f = '0' + f;
      }
      if(s < 10){
        s = '0' + s;
      }
      var dateTime = y + '-' + m + '-' + d + 'T' + h + ':' + f + ':' + s + 'Z';
      return dateTime;
    };

    //日期格式化，格式化为本地
    comnFun.dateToLc = (dtStr) => {
      var nd = new Date(dtStr);
      var y = nd.getFullYear();
      var m = nd.getMonth() + 1;
      var d = nd.getDate();
      var h = nd.getHours();
      var f = nd.getMinutes();
      var s = nd.getSeconds();
      if(m < 10){
        m = '0' + m;
      }
      if(d < 10){
        d = '0' + d;
      }
      if(h < 10){
        h = '0' + h;
      }
      if(f < 10){
        f = '0' + f;
      }
      if(s < 10){
        s = '0' + s;
      }
      var dateTime = y + '-' + m + '-' + d + ' ' + h + ':' + f;
      return dateTime;
    };

    //日期格式化，格式化为本地时间串
    comnFun.dateToLcStr = (dtStr) => {
      var nd = new Date(dtStr);
      var y = nd.getFullYear();
      var m = nd.getMonth() + 1;
      var d = nd.getDate();
      var h = nd.getHours();
      var f = nd.getMinutes();
      var s = nd.getSeconds();
      if(m < 10){
        m = '0' + m;
      }
      if(d < 10){
        d = '0' + d;
      }
      if(h < 10){
        h = '0' + h;
      }
      if(f < 10){
        f = '0' + f;
      }
      if(s < 10){
        s = '0' + s;
      }
      var dateTime = y + '-' + m + '-' + d + 'T' + h + ':' + f + ':' + s + '.0Z';
      return dateTime;
    };

    //复制对象
    comnFun.cloneObj = (obj) => {
      if(obj){
        var newObj = [];  
        newObj = JSON.parse(JSON.stringify(obj)); 
        return newObj;
      }
      else{
        return '缺少需要复制的对象！';
      }
    };

    //权限判断
    comnFun.dateFromObjectId = (objectId) => {
      var result = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
      return result;
    };

    //浏览器检查
    comnFun.checkBrowser = () => {
      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();
      var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
      var m = ua.match(re);
      Sys.browser = m[1].replace(/version/, "'safari");
      Sys.ver = m[2];
      return '浏览器:' + Sys.browser + ',版本号:' + Sys.ver;
    };

    //将字符串转换为Obj
    comnFun.toObj = (str) => {
      var bcDt = str;
      if(str && Object.prototype.toString.call(str) == '[object String]'){
        bcDt = JSON.parse(str);
      }
      return bcDt;
    };

    /**
     * 初始化并显示loading
     * @returns {Promise} Promise实例
     */
    // function $comn() {
    //   return new Promise((resolve) => {
    //     // 第一次调用
    //     if (!comn) {
    //       comn = new PlgCommon();
    //       // 手动创建一个未挂载的实例
    //       comn.$mount();
    //       // 挂载
    //       document.querySelector(pluginOptions.container || 'body').appendChild(comn.$el);
    //     }
    //     resolve();
    //   })
    // }
    
    // 定义关闭loading方法
    // $comn.end = (noAnimate = false) => {
    //   return new Promise((resolve) => {
    //     if (!comn || !comn.isShow) {
    //       resolve();
    //       return;
    //     }
    //     // 首页判断是否在关闭时需要动画
    //     if (noAnimate) {
    //       // 默认只在此次行为下移除动画,之后的行为仍有动画
    //       comn.removeAnimate().then(() => {
    //         comn.opemAnimate()
    //       })
    //     }
    //     comn.hide();
    //   })
    // };

    // Vue.prototype.$comn = $comn;
    Vue.prototype.$comn = comnFun;
  }
}
// 在任意想要的地方执行this.$comn()就可以启动loading动画了，在需要关闭的地方执行this.$comn.end()就可以关闭