<template>
<div>
	<transition name="modal">
    <OpenCollectionModal v-if="open_collection" />
  </transition>
  <transition name="modal">
    <FormModal v-if="show_form_modal" @closemodal="closeFormModal" />
  </transition>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
	components: {
		FormModal: () => import(/* webpackChunkName: "collections" */ './FormModal'),
    OpenCollectionModal: () => import(/* webpackChunkName: "collections" */ './OpenCollectionModal'),
	},
	computed: {
    ...mapState('text_collection', {
      show_form_modal: 'show_form_modal',
      open_collection: 'open_collection',
    }),
  },
  methods: {
    ...mapMutations('text_collection', {
      setShowFormModal: 'SET_SHOW_FORM_MODAL',
      setIsUpdate: 'SET_IS_UPDATE',
    }),
    closeFormModal(val) {
      this.setShowFormModal(val)
      this.setIsUpdate(val)
    },
  },
}
</script>