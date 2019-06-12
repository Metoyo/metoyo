<template>
  <footer id="footer">
    <p>
      Designed and developed by Metoyo.
      Base on <a href="https://www.vuejs.org" target="_blank" rel="vue.js">Vue.js</a>,
      <a href="https://www.iviewui.com" target="_blank" rel="iview">iView</a> and 
      <a href="https://www.nodejs.org" target="_blank" rel="nodejs">Nodejs</a> 
    </p>
    <p>Copyright © 2018-2019 metoyo.com. All Rights Reserved.</p>
  </footer>
</template>
<script>
  export default {
    name: 'Footer',
    data: function () {
      return {
        
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #footer{
    font-size: 14px;
    color: #666;
    background: #eee;
    padding: 20px;
    border-top: 1px solid #cfcfcf;
  }
</style>
