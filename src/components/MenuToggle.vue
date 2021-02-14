<template>
  <div class="fixed top-0 left-0 ml-4 mt-3 md:mt-2 p-1 shadow-lg border-2 border-blue-400 z-50 cursor-pointer bg-white text-blue-500 rounded-md" @click="$store.commit('TOGGLE_MENU')">
    <SVGIcon icon="x" size="w-6 h-6" :class="{'hidden' : !menu}"/>
    <SVGIcon icon="hamburger-menu" size="w-6 h-6" :class="{'hidden': menu}"/>
  </div>
</template>

<script>
import SVGIcon from '@/components/SVGIcon.vue';
export default {
  components: {
    SVGIcon
  },
  computed: {
    menu(){
      return this.$store.state.menu
    }
  }
}
</script>

<style>

</style>