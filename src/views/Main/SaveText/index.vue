<template>
  <section ref="stext" class="stext-main md:h-screen min-h-screen w-full md:w-1/2" id="savetext">

  <!-- Title -->
    <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl">Save Text</h1>

  <!--  Input New Text -->
    <div class="w-full px-5 mb-3">
      <TextForm />
    </div>

  <!-- List Text -->
    <Skeleton v-if="loadingList" mode="light" :count="3"/>
    <TextList v-else />

  </section>
</template>

<script>

import { Skeleton } from "@/components"

import TextForm from './TextForm';
import TextList from './Textlist';
import { mapState } from 'vuex';

export default {
  components: {
    Skeleton,
    TextForm,
    TextList
  },
  computed: {
    ...mapState({
      loadingList: state => state.text.loadingList,
      showCollection: state => state.textCollection.showCollection,
      collectionData: state => state.textCollection.collectionData,
      textCollectionIsUpdate: state => state.textCollection.isUpdate,
      openForm: state => state.textCollection.openForm
    })
  },
  data() {
    return {
      actionCompleteId: null
    }
  },
  created(){
    if(this.$route.params.userId != this.$store.state.user.uid){
      this.$router.push({path: `/user/${this.$store.state.user.uid}`})
    }
  },
  mounted(){
    this.$store.dispatch('text/List', null, {root: true})

  },
  methods: {
    closeModal(){
      this.$store.commit('textCollection/SET_OPEN_MODAL', false, {root: true})
    }
  }
}
</script>

<style scoped lang="postcss">
.stext-main {
  @apply bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center
}
.stext-title {
  @apply my-2 font-bold text-blue-500
}
.text-list {
  @apply py-2 px-5 text-base tracking-wide text-left w-full 
}
</style>