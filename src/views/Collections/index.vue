<template>
  <Layout>
    <SaveTextCollection />
    <SaveFileCollection />
  </Layout>
</template>

<script>

import {Layout} from '@/components'
import SaveTextCollection from './SaveTextCollection'
import SaveFileCollection from './SaveFileCollection'

export default {
  components: {
    Layout,
    SaveTextCollection,
    SaveFileCollection
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