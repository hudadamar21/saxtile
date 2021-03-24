<template>
  <div id="app">
    <div v-if="$store.state.alert.message" class="fixed top-0 right-0 z-50 m-5">
      <Alert
        :mode="$store.state.alert.mode"
        :message="$store.state.alert.message"
        animation="opacity"
      />
    </div>
    <transition name="opacity">
      <div
        v-if="$store.state.menu"
        @click="$store.commit('SET_MENU', false)"
        class="fixed inset-0 bg-black bg-opacity-30 z-40">
        
      </div>
    </transition>
    <transition name="sidebar">
      <MenuSidebar v-if="$store.state.menu" />
    </transition>

    <TextCollectionModals />
    
    <transition name="router" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  components: { 
    Alert: () => import(/* webpackChunkName: "components" */ '@/components/Alert'),
    MenuSidebar: () => import(/* webpackChunkName: "components" */ '@/components/MenuSidebar'),
    TextCollectionModals: () => import(/* webpackChunkName: "components" */ '@/views/Collections/SaveTextCollection/TextCollectionModals'),
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
