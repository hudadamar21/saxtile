<template>
  <div id="app">
    <template v-if="$store.state.user.uid">
      <Main></Main>
    </template>
    <template v-else>
      <Auth></Auth>
    </template>
  </div>
</template>

<script>
import Auth from './views/Auth';
import Main from './views/Main';

export default {
  components: {
    Auth,
    Main
  },
  computed: {
    localUser(){
      return this.$store.getters['user/localUser']
    }
  },
  created(){
    if(this.localUser){
      this.$store.commit('user/SET_USER', this.localUser, {root: true})
    }
  }
}
</script>
