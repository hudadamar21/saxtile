<template>
  <section ref="sfile" class="sfile-main md:h-screen min-h-screen w-full md:w-1/2" id="savefile">
    <!-- Header -->
    <h1 class="sfile-title text-2xl md:text-3xl">Save File</h1>

    <!-- File Form -->
    <FileForm />

    <!-- File List -->
    <Skeleton v-if="loadingList" mode="dark" :count="3" />
    <FileList v-else />
  </section>
</template>

<script>
export default {
  components: {
    Skeleton: () => import(/* webpackChunkName: "components" */ '@/components/Skeleton'),
    FileForm: () => import(/* webpackChunkName: "main" */ './FileForm'),
    FileList: () => import(/* webpackChunkName: "main" */ './FileList'),
  },
  computed: {
    loadingList() {
      return this.$store.state.file.loading_list
    },
  },
  mounted() {
    this.$store.dispatch('file/List')
  },
}
</script>

<style lang="postcss" scoped>
.sfile-main {
  @apply bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center;
}
.sfile-title {
  @apply my-2 font-bold text-white;
}
.notif {
  @apply bg-white text-red-600 px-2 py-1 text-sm rounded leading-relaxed flex items-center;
}
.close-notif {
  @apply w-5 h-5 bg-red-600 rounded-full p-2 text-white flex justify-center items-center text-sm outline-none;
}
</style>