<template>
  <Layout no-indicator  >
    <section ref="stext" class="stext-main min-h-screen w-full" id="savetext">
      <div 
        class="text-center"
        :class="{'mb-4' : selectedIsCollections}"
      >
        <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl tracking-wider">ARCHIVES</h1>

        <SelectBase
          :value="selectedArchive"
          @getvalue="(value) => selectedArchive = value"
          :options="['text','file','text_collection','file_collection']"
        />
      </div>

      <!-- List Text -->
      <Skeleton v-if="loadingList" class="w-full md:w-2/3"  mode="light" :count="3" />
      <div v-else class="w-full md:w-2/3">
        <TextArchives v-if="selectedArchive === 'text'"  />
        <FileArchives v-else-if="selectedArchive === 'file'" />
        <TextCollectionArchives v-else-if="selectedArchive === 'text_collection'" />
        <div v-else-if="selectedArchive === 'file_collection'">
          <div class="w-full text-center text-gray-600 dark:text-gray-300">
            <h1 class="font-bold text-2xl">Save File Collection</h1>
            <h3 class="font-base">fitur ini sedang dikembangkan.</h3>
            <h3 class="font-base">Stay tune..</h3>
          </div>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script>
export default {
  title: 'Saxtile Archives',
  components: { 
    Layout: () => import(/* webpackChunkName: "components" */ '@/components/Layout'), 
    SelectBase: () => import(/* webpackChunkName: "components" */ '@/components/SelectBase'),
    Skeleton: () => import(/* webpackChunkName: "components" */ '@/components/Skeleton'),
    TextArchives: () => import(/* webpackChunkName: "archives" */ '@/views/Archives/TextArchives'),
    FileArchives: () => import(/* webpackChunkName: "archives" */ '@/views/Archives/FileArchives'),
    TextCollectionArchives: () => import(/* webpackChunkName: "archives" */ '@/views/Archives/TextCollectionArchives'),
  },
  data(){
    return {
      selectedArchive: 'text'
    }
  },
  computed: {
    loadingList() {
      return this.$store.state.text.loadingList
    },
    selectedIsCollections(){
      return this.selectedArchive === 'text_collection' || this.selectedArchive === 'file_collection'
    }
  },
}
</script>

<style>

</style>