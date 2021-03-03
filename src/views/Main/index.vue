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
    Layout: () => import(/* webpackChunkName: "components" */ '@/components/Layout'),
    SaveText: () => import(/* webpackChunkName: "main" */ './SaveText/index.vue'),
    SaveFile: () => import(/* webpackChunkName: "main" */ './SaveFile/index.vue'),
  },
  created() {
    const user_uid = this.$store.state.user.uid
    if (this.$route.params.userId != user_uid) {
      this.$router.push({ name: 'main', params: { userId: user_uid } })
    }
  },
}
</script>

<style lang="postcss" scoped>
.goto {
  @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50;
}
</style>