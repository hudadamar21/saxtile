<template>
  <div class="text-xl w-full flex flex-col md:flex-row justify-between items-center">
    <MenuToggle />
    <section class="flex flex-col md:flex-row w-full">
      <slot></slot>
    </section>
    <div v-if="!noIndicator" class="indicator-container">
      <a :href="toSavetext" class="indicator bg-blue-500">
        <strong>Text</strong>
      </a>
      <a :href="toSavefile" class="indicator bg-gray-700">
        <strong>File</strong>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noIndicator: Boolean,
  },
  components: {
    MenuToggle: () => import(/* webpackChunkName: "components" */ '@/components/MenuToggle'),
  },
  computed: {
    toSavetext() {
      return this.$route.name == 'collections' ? '#savetext-collection' : '#savetext'
    },
    toSavefile() {
      return this.$route.name == 'collections' ? '#savefile-collection' : '#savefile'
    },
  }
}
</script>

<style lang="postcss" scoped>
.goto {
  @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50;
}
.indicator-container {
  @apply fixed bottom-0 left-0 border-none z-30 w-full h-12 bg-white flex md:hidden border;
}
.indicator {
  @apply flex justify-center items-center w-1/2 h-12 text-white;
}


</style>