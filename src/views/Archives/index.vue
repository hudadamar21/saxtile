<template>
  <Layout no-indicator  >
    <section ref="stext" class="stext-main md:h-screen min-h-screen w-full" id="savetext">
    <!-- Title -->
    <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl tracking-wider">ARCHIVES</h1>
    <select 
      v-model="selectedArchive"
      class="text-center bg-white text-gray-700 rounded px-2 py-1 focus:outline-none border focus:border-blue-500 mb-3"
    >
      <option value="Save Text">Save Text</option>
      <option value="Save File">Save File</option>
      <option value="Save Text Collection">Save Text Collection</option>
      <option value="Save File Collection">Save File Collection</option>
    </select>

    <!-- List Text -->
    <Skeleton v-if="loadingList" class="w-full md:w-2/3"  mode="light" :count="3" />
    <div v-else class="w-full md:w-2/3">
      <Textlist v-if="selectedArchive === 'Save Text'" :lists="archiveTextLists" isArchive />
      <div v-else-if="selectedArchive === 'Save File'">Save File</div>
      <div v-else-if="selectedArchive === 'Save Text Collection'">Save Text Collection</div>
      <div v-else-if="selectedArchive === 'Save File Collection'">Save File Collection</div>
    </div>
  </section>
  </Layout>
</template>

<script>
export default {
  components: { 
    Layout: () => import(/* webpackChunkName: "components" */ '@/components/Layout'), 
    Textlist: () => import(/* webpackChunkName: "text" */ '@/views/Main/SaveText/Textlist')
  },
  data(){
    return {
      selectedArchive: 'Save Text'
    }
  },
  computed: {
    textLists(){
      return this.$store.state.text.all
    },
    archiveTextLists(){
      return this.textLists.filter(list => list.isArchive)
    }
  },
  mounted(){
    console.log(this.archiveLists)
  }
}
</script>

<style>

</style>