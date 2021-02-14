<template>
  <Layout>
    <section class="stext-collection-main md:h-screen min-h-screen w-full md:w-1/2 bg-primary-white" id="savetext-collection">

    </section>
    <section class="sfile-collection-main md:h-screen min-h-screen w-full md:w-1/2 bg-primary-black" id="savefile-collection">

    </section>
  </Layout>
</template>

<script>

import {Layout} from '@/components'

export default {
  components: {
    Layout
  },
  methods: {
    setTextCollectionModal(){
      this.$store.commit('SET_TEXT_COLLECTION_MODAL', false)
    },
    saveCollection(textCollection){
      let {title,content} = textCollection
      let validateInput = title && content.filter(text => text).length > 0 ? true : false
      if(validateInput){
        textCollection.date = new Date().getTime()
        console.log(textCollection)
        this.$store.dispatch('text/Save', textCollection, {root: true})
      } else {
        alert('input required')
      }
    },
  }
};
</script>

<style lang="postcss" scoped>
  .goto{
    @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50
  }
</style>