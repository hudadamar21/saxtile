<template>
  <section
    class="md:h-screen min-h-screen w-full md:w-1/2 bg-gray-100 dark:bg-gray-700 flex flex-col"
    id="savetext-collection">

    <h3 class="my-3 w-full text-center font-bold text-2xl text-blue-500 dark:text-white">
      Save Text Collection
    </h3>

    <div class="w-full text-center mb-5">
      <Button 
        color="blue" lg 
        shadow="shadow-md" 
        @click.native="$store.commit('text_collection/SET_SHOW_FORM_MODAL',true)"
        > Create New Collection
      </Button>
    </div>

    <div 
      class="flex-grow overflow-auto"
      :class="openCollection ? 'scrollbar-hidden' : ''"
    >
      <Skeleton v-if="loading" :count="3" />
      <ListView v-else :lists="unArchivedLists" isArchive />
    </div>

  </section>
</template>

<script>
export default {
  components: {
    ListView: () => import(/* webpackChunkName: "collections" */ './ListView'),
  },
  mounted() {
    this.$store.dispatch('text_collection/List')
  },
  computed: {
    lists(){
      return this.$store.state.text_collection.lists
    },
    openCollection(){
      return this.$store.state.text_collection.open_collection
    },
    loading(){
      return this.$store.state.text_collection.loading
    },
    unArchivedLists(){
      return this.lists.filter(list => !list.archived)
    }

  },
}
</script>

<style>
  .scrollbar-hidden::-webkit-scrollbar {
    display: none;
  }
</style>