<template>
  <section
    class="stext-collection-main md:h-screen min-h-screen w-full md:w-1/2 bg-gray-100 dark:bg-gray-700"
    id="savetext-collection">

    <h3 class="my-3 w-full text-center font-bold text-2xl text-blue-500 dark:text-white">
      Save Text Collection
    </h3>

    <div class="w-full text-center mb-5">
      <Button 
        :color="isDarkmode ? 'white' : 'blue'" lg 
        shadow="shadow-md" 
        @click.native="$store.commit('text_collection/SET_SHOW_FORM_MODAL',true)"
        > Create New Collection
      </Button>
    </div>

    <Skeleton v-if="loading" :count="3" />
    <ListView v-else :lists="unArchivedLists" isArchive />

  </section>
</template>

<script>
export default {
  components: {
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
    Skeleton: () => import(/* webpackChunkName: "components" */ '@/components/Skeleton'),
    ListView: () => import(/* webpackChunkName: "collections" */ './ListView'),
  },
  mounted() {
    this.$store.dispatch('text_collection/List', null, { root: true })
  },
  computed: {
    isDarkmode(){
      return document.querySelector('body').classList.contains('dark')
    },
    loading(){
      return this.$store.state.text_collection.loading
    },
    lists(){
      return this.$store.state.text_collection.lists
    },
    unArchivedLists(){
      return this.lists.filter(list => !list.archived)
    }

  },
}
</script>