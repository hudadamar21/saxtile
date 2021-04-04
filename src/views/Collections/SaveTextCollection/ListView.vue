<template>
  <ul class="w-full flex flex-col items-center px-5">
    <li v-if="!lists.length" class="text-center font-semibold text-gray-500 dark:text-gray-200 mt-5">
      Tidak ada {{ onArchives ? 'archive ' : '' }}text collection yang tersimpan.
    </li>
    <ListSimple
      v-else
      isCollection
      v-for="(list, index) of lists" :key="index"
      name="text collection"
      :list="list" 
      @archive="setArchived" 
      @open="openCollection"
    />
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  components: {
    ListSimple: () => import(/* webpackChunkName: "components" */ '@/components/ListSimple'),
  },
  computed: {
    onArchives(){
      return this.$route.name === 'archives'
    }
  },
  methods: {
    ...mapMutations('text_collection', {
      setOpenCollection: 'SET_OPEN_COLLECTION',
      setCollectionData: 'SET_COLLECTION_DATA',
    }),
    openCollection(list) {
      this.setOpenCollection(true)
      this.setCollectionData(list)
    },
    setArchived({id, title}){
      const status = this.onArchives ? false : true
      if(confirm(`apakah anda ingin ${this.onArchives ? 'un-archive' : 'archive'} collection '${title}' ?`)){
        this.$store.dispatch('text_collection/Archive', {id, status})
      }
    }
  },
}
</script>

<style >

</style>