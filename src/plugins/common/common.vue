<template>
  <transition :name="animateName">
    <div class="demo-spin-container" v-show="isShow">
      <Spin fix></Spin>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        isShow: false,
        hasAnimate: true
      };
    },
    computed: {
      /**
       * 动画效果样式，没有返回空
       * @return {String} 样式
       */
      animateName() {
        return this.hasAnimate ? "opacity" : "";
      }
    },
    methods: {
      /**
       * 开启动画效果
       */
      opemAnimate() {
        this.hasAnimate = true;
      },
      /**
       * 去除动画效果
       * @return {Promise} 返回promise
       */
      removeAnimate() {
        return new Promise(resolve => {
          this.hasAnimate = false;
          resolve();
        });
      },
      /**
       * 显示动画loading
       */
      show() {
        this.isShow = true;
      },
      /**
       * 隐藏动画loading
       */
      hide() {
        this.isShow = false;
      }
    }
  };
</script>

<style scope>
  .demo-spin-container{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 9999;
  }
  .ivu-spin-fix{
    background-color: rgba(0, 0, 0, 0.9);
  }
  .ivu-spin-dot{
    width: 100px;
    height: 100px;
  }
</style>