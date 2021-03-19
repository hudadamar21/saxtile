<template>
  <div class="support-me">
    <div class="mr-3 opacity-80">
      <SVGIcon icon="money" size="w-8 h-8" />
      <SVGIcon icon="dollar" size="w-8 h-8" />
    </div>
    <div class="block">
      <h1 class="font-semibold mb-1 flex items-center">
        Support Me.
        <SVGIcon icon="smile" size="w-8 h-8" />  
      </h1>
      <a class="link-to-support" href="https://saweria.co/hudadamar21" target="_blank">
        saweria
      </a>
      <a class="link-to-support" href="https://trakteer.id/hudadamar21" target="_blank">
        trakteer
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon')
  }
}
</script>

<style lang="postcss">
  .support-me {
    @apply absolute bottom-5 flex justify-start items-center w-full text-blue-500 dark:text-white
  }
  .link-to-support {
    @apply text-base bg-blue-500 hover:bg-blue-600 dark:bg-white hover:bg-gray-100 transition duration-100 text-white dark:text-gray-700 rounded px-2 py-0.5 mr-1
  }
</style>