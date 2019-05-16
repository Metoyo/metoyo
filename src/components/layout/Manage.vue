<template>
  <div class="manage">
    <router-view/>
  </div>
</template>

<script>
// import Editor from '@/components/admin/Editor';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Manage',
  // components: {
  //   Editor
  // },
  data: function(){
    return {

    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapMutations(['updateUserInfo']),
    // gotoModule: function(){
    //   if(this.user['管理员']){
    //     this.$router.push({ path: '/editor' });
    //   }
    //   else{
    //     this.$router.push({ path: '/login' });
    //   }
    // },
  },
  created: function(){
   console.log('hello');
  },
  mounted: function(){
    // this.gotoModule();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
