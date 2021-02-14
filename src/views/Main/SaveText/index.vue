<template>
  <section ref="stext" class="stext-main md:h-screen min-h-screen w-full md:w-1/2" id="savetext">

  <!-- Title -->
    <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl">Save Text</h1>

  <!-- Menu Toggle -->
    <MenuToggle class="absolute top-0 left-0 m-4 p-1 z-50"/>

  <!--  Input New Text -->
    <div class="w-full px-5 mb-3">
      <TextForm />
    </div>

  <!-- List Text -->
    <Skeleton v-if="loadingList" mode="light" :count="3"/>
    <TextList v-else />

  <transition name="slide-down-fade">
    <TextFormCollection v-if="collectionData" :data="collectionData"/>
  </transition>

  <!-- Modal Open Collection -->
  <transition name="slide-down-fade">
    <TextShowCollection v-if="showCollection" />
  </transition>

  </section>
</template>

<script>

import {
  MenuToggle,
  Skeleton,
} from "@/components"

import TextForm from './TextForm';
import TextList from './Textlist';
import TextShowCollection from './TextShowCollection';
import TextFormCollection from '../TextFormCollection';
import { mapState } from 'vuex';

export default {
  components: {
    MenuToggle,
    Skeleton,
    TextForm,
    TextList,
    TextShowCollection,
    TextFormCollection
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