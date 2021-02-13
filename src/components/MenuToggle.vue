<template>
  <div class="cursor-pointer hover:bg-gray-200 text-gray-700 rounded-full" @click="$store.commit('TOGGLE_MENU')">
    <template v-if="!$store.state.menu">
      <SVGIcon icon="hamburger-menu" size="w-5 h-5"/>
    </template>
    <template v-else>
      <SVGIcon icon="x-menu" size="w-5 h-5"/>
    </template>
  </div>
</template>

<script>
import SVGIcon from '@/components/SVGIcon.vue';
export default {
  components: {
    SVGIcon
  }
}
</script>

<style>

</style>