<template>
  <Layout>
    <SaveText ref="stext" />
    <SaveFile ref="sfile" />
  </Layout>
</template>

<script>
export default {
  title: 'Saxtile',
  components: {
    Layout: () => import('@/components/Layout'),
    SaveText: () => import('./SaveText/index.vue'),
    SaveFile: () => import('./SaveFile/index.vue'),
  },
}
</script>

<style lang="postcss" scoped>
.goto {
  @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50;
}
</style>