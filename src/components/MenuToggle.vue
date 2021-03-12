<template>
  <div class="menu-toggle" @click="$store.commit('TOGGLE_MENU')">
    <SVGIcon icon="x" size="w-6 h-6" :class="{ hidden: !menu }" />
    <SVGIcon icon="hamburger-menu" size="w-6 h-6" :class="{ hidden: menu }" />
  </div>
</template>

<script>
export default {
  components: {
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
  },
  computed: {
    menu() {
      return this.$store.state.menu
    },
  },
  mounted() {
    console.log()
  },
}
</script>

<style scoped lang="postcss">
.menu-toggle {
  @apply fixed top-0 left-0 ml-4 mt-3 md:mt-2 p-1 shadow border-2 z-40 cursor-pointer bg-white rounded-md border-blue-500 dark:border-gray-600 text-blue-500 dark:text-gray-600;
}
</style>