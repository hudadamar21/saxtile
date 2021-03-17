<template>
  <section ref="stext" class="stext-main md:h-screen min-h-screen w-full md:w-1/2" id="savetext">
    <!-- Title -->
    <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl">Save Text</h1>

    <!--  Input New Text -->
    <div class="w-full px-5 mb-3">
      <TextForm />
    </div>

    <!-- List Text -->
    <Skeleton v-if="loadingList" mode="light" :count="3" />
    <TextList v-else :lists="unArchiveLists" />
  </section>
</template>

<script>
export default {
  components: {
    Skeleton: () => import(/* webpackChunkName: "components" */ '@/components/Skeleton'),
    TextForm: () => import(/* webpackChunkName: "main" */ './TextForm'),
    TextList: () => import(/* webpackChunkName: "main" */ './TextList'),
  },
  computed: {
    loadingList() {
      return this.$store.state.text.loadingList
    },
    lists(){
      return this.$store.state.text.lists
    },
    unArchiveLists(){
      return this.lists.filter(list => !list.archived)
    }
  },
  data() {
    return {
      actionCompleteId: null,
    }
  },
  mounted() {
    this.$store.dispatch('text/List', null, { root: true })
  },
}
</script>