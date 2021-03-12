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
    <Textlist v-else :lists="lists" />
  </section>
</template>

<script>
export default {
  components: {
    Skeleton: () => import(/* webpackChunkName: "components" */ '@/components/Skeleton'),
    TextForm: () => import(/* webpackChunkName: "main" */ './TextForm'),
    Textlist: () => import(/* webpackChunkName: "main" */ './Textlist'),
  },
  computed: {
    loadingList() {
      return this.$store.state.text.loadingList
    },
    lists(){
      return this.$store.state.text.all
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