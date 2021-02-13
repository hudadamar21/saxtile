<template>
  <section ref="sfile" class="sfile-main md:h-screen min-h-screen w-full md:w-1/2" id="savefile">
  <!-- Header -->
    <h1 class="sfile-title text-2xl md:text-3xl">Save File</h1>

  <!-- File Form -->
    <FileForm :setReferenceImage="setReferenceImage"/>

  <!-- Notif Validation -->
    <span v-if="validationUpload" class="notif" >
      <p class="mr-2 text-sm">{{ validationUpload }}</p>
      <button class="absloute right-0 top-0 close-notif bg" @click="validationUpload = null" >x</button>
    </span>
  
  <!-- File List -->
    <Skeleton v-if="loadingList" mode="dark" :count="3" />
    <FileList v-else :setReferenceImage="setReferenceImage" />
    
  </section>
</template>

<script>

import { Skeleton } from "@/components"

import defaultFile from '@/assets/images/default-file.png';
import FileForm from './FileForm'
import FileList from './FileList'

export default {
  components: {
    Skeleton,
    FileForm,
    FileList
  },
  data(){
    return {
      validationUpload : null,
    }
  },
  computed: {
    loadingList(){
      return this.$store.state.file.loadingList
    }
  },
  mounted(){
    this.$store.dispatch('file/List', null, {root: true})
  },
  methods: {
    setReferenceImage(e){
      console.log(defaultFile)
      e.target.src = defaultFile
    }
  }
}
</script>

<style lang="postcss" scoped>
  .sfile-main{
    @apply bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center
  }
  .sfile-title{
    @apply my-2 font-bold text-white
  }
  .notif {
    @apply bg-white text-red-600 px-2 py-1 text-sm rounded leading-relaxed flex items-center
  }
  .close-notif{
    @apply w-5 h-5 bg-red-600 rounded-full p-2 text-white flex justify-center items-center text-sm outline-none
  }
</style>