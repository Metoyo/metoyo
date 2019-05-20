<template>
  <div id="main" class="main">
    <Header></Header>
    <transition name="fade" mode="out-in" appear> 
      <router-view/>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
// import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Main',
  components: {
    Header,
    Footer
  },
  data: function(){
    return {

    }
  },
  computed: {
    // ...mapState(['user']),
  },
  methods: {
    // ...mapMutations(['updateUserInfo']),
  },
  created: function(){
    this.$router.push({path: '/home'});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
