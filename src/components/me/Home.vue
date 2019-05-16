<template>
  <div>
    <h1>{{ msg }}</h1>
    <p>说话也了</p>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    // props: {
    //   msg: '首页对对对'
    // },
    data: function() {
      return {
        msg: '松涛'
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
