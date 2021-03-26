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
    
    <router-view></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
  },
  methods: {
    ...mapMutations('text',[
      'SET_INPUT',
      'SET_IS_UPDATE',
      'SET_SHOW_OPTION',
      'SET_UPDATE_TEXT_ID'
    ]),
    ...mapMutations('file', [
      'SET_FILENAME',
      'SET_FILE_UPLOAD',
    ])
  },
  watch: {
    // Clear state when route change
    $route(to, from){
      if(from.name === 'main' || from.name === 'archives'){
        this.SET_INPUT({ title: '',content: '' })
        this.SET_IS_UPDATE(false)
        this.SET_SHOW_OPTION(null)
        this.SET_UPDATE_TEXT_ID(null)

        this.SET_FILENAME('')
        this.SET_FILE_UPLOAD('')
        this.$store.commit('file/SET_SHOW_OPTION', null)
      }
    }
  }
}
</script>

<style>
</style>
