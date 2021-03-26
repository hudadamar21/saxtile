<template>
  <ul class="w-full flex flex-col items-center px-5">
    <li v-if="!lists.length" class="text-center font-semibold text-gray-500 dark:text-gray-200 mt-5">
      Tidak ada {{ onArchives ? 'archive ' : '' }}text collection yang tersimpan.
    </li>
    <li v-else v-for="(list, index) of lists" :key="index" class="list-view-text-collection">
      <div>
        <h3 class="text-blue-500 dark:text-white font-bold">
          {{ list.title }}
        </h3>
        <p class="text-xs text-gray-400 dark:text-gray-200 mt-1">
          {{ new Date().formatDate(list.date) }}
        </p>
        <p class="text-sm mt-2 text-gray-600 dark:text-white">
          {{ list.contents.length }} text on collection
        </p>  
      </div>
      <div>
        <Button
          :color="isDarkmode ? 'white' : 'red'" md shadow="shadow"
          @click.native="setArchived(list.id, list.title)"
          class="mr-2">
            {{ onArchives ? 'UnArchive' : 'Archive'}}
        </Button>
        <Button 
          :color="isDarkmode ? 'white' : 'blue'" md shadow="shadow" 
          @click.native="openCollection(list)">
            Open
        </Button>
      </div>
    </li>
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
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
  },
  mounted(){
    console.log(this.lists)
  },
  computed: {
    isDarkmode(){
      return document.querySelector('body').classList.contains('dark')
    },
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
    setArchived(id, title){
      const status = this.onArchives ? false : true
      if(confirm(`apakah anda ingin ${this.onArchives ? 'un-archive' : 'archive'} collection '${title}' ?`)){
        this.$store.dispatch('text_collection/Archive', {id, status})
      }
    }
  },
}
</script>

<style lang="postcss" scoped>
.list-view-text-collection {
  @apply w-full bg-white dark:bg-gray-600 rounded border border-blue-500 dark:border-white shadow flex justify-between items-center py-2 px-3 mb-4;
}
</style>