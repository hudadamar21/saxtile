<template>
	<section class="stext-collection-main md:h-screen min-h-screen w-full md:w-1/2 bg-gray-100" id="savetext-collection">
    <h3 class="my-3 w-full text-center font-bold text-2xl text-blue-500">Save Text Collection</h3>
    <div class="w-full text-center mb-5">
      <Button color="blue" lg shadow="shadow-md" @click.native="setModal(true)">Create New Collection</Button>
    </div>

    <Skeleton v-if="loading" :count="3" />
    <ListView v-else />

    <transition name='slide-down-fade'>
      <FormModal v-if="show_form_modal" @close="setModal" />
    </transition>

    <transition name='slide-down-fade'>
      <openCollectionModal v-if="open_collection" @close="setOpenCollection(false)"></openCollectionModal>
    </transition>

  </section>
</template>

<script>

import { Button, Skeleton } from '@/components'
import FormModal from './FormModal.vue'
import ListView from './ListView.vue'
import openCollectionModal from './openCollectionModal.vue'

import { mapState , mapMutations} from 'vuex'

export default {
	components: {
    Button,
    Skeleton,
    FormModal,
    ListView,
    openCollectionModal
  },
  mounted(){
    this.$store.dispatch('text_collection/List', null, {root: true})
  },
  computed: {
    ...mapState('text_collection',{
      loading: 'loading',
      show_form_modal: 'show_form_modal',
      open_collection: 'open_collection'
    })
  },
  methods: {
    ...mapMutations('text_collection',{
      setModal: 'SET_SHOW_FORM_MODAL',
      setOpenCollection:'SET_OPEN_COLLECTION'
    })
  }
}
</script>