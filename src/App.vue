<template>
  <div id="app">
    <div v-if="$store.state.alert.message" class="absolute top-0 right-0 z-50 m-5">
      <Alert
        :mode="$store.state.alert.mode"
        :message="$store.state.alert.message"
        animation="opacity"
      />
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  components: { 
    Alert: () => import(/* webpackChunkName: "components" */ '@/components/Alert') 
  },
  mounted(){
    const localDarkmode = JSON.parse(localStorage.getItem('darkmode'))
    if(localDarkmode){
        document.querySelector('body').classList.add('dark')
      } else {
        document.querySelector('body').classList.remove('dark')

      }
  }
}
</script>

<style>
</style>
