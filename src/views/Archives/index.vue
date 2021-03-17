<template>
  <Layout no-indicator  >
    <section ref="stext" class="stext-main min-h-screen w-full" id="savetext">
      <!-- Title -->
      <div class="text-center">
        <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl tracking-wider">ARCHIVES</h1>
        <select 
          v-model="selectedArchive"
          class="text-center bg-white text-gray-700 rounded px-2 py-1 focus:outline-none border focus:border-blue-500 mb-3"
        >
          <option value="text">Save Text</option>
          <option value="file">Save File</option>
          <option value="text_collection">Save Text Collection</option>
          <option value="file_collection">Save File Collection</option>
        </select>
      </div>

      <!-- List Text -->
      <Skeleton v-if="loadingList" class="w-full md:w-2/3"  mode="light" :count="3" />
      <div v-else class="w-full md:w-2/3">
        <TextList 
          v-if="selectedArchive === 'text'" 
          :lists="archiveTextLists" isArchive 
        />
        <FileList 
          v-else-if="selectedArchive === 'file'" 
          :lists="archiveFileLists" 
        />
        <div v-else-if="selectedArchive === 'text_collection'">Save Text Collection</div>
        <div v-else-if="selectedArchive === 'file_collection'">Save File Collection</div>
      </div>
    </section>
  </Layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: { 
    Layout: () => import(/* webpackChunkName: "components" */ '@/components/Layout'), 
    TextList: () => import(/* webpackChunkName: "text" */ '@/views/Main/SaveText/TextList'),
    FileList: () => import(/* webpackChunkName: "file" */ '@/views/Main/SaveFile/FileList')
  },
  data(){
    return {
      selectedArchive: 'text'
    }
  },
  watch: {
    selectedArchive(newval){
      console.log(newval)
      console.log(this.archiveFileLists)
    }
  },
  computed: {
    ...mapState({
      textlist: state => state.text.lists,
      filelist: state => state.file.lists
    }),
    loadingList() {
      return this.$store.state.text.loadingList
    },
    archiveTextLists(){
      return this.textlist.filter(list => list.archived)
    },
    archiveFileLists(){
      return this.filelist.filter(list => list.archived)
    },
  }
}
</script>

<style>

</style>