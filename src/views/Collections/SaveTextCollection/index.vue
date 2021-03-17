<template>
  <section
    class="stext-collection-main md:h-screen min-h-screen w-full md:w-1/2 bg-gray-100"
    id="savetext-collection"
  >
    <h3 class="my-3 w-full text-center font-bold text-2xl text-blue-500">Save Text Collection</h3>
    <div class="w-full text-center mb-5">
      <Button color="blue" lg shadow="shadow-md" @click.native="setShowFormModal(true)"
        >Create New Collection</Button
      >
    </div>

    <Skeleton v-if="loading" :count="3" />
    <ListView v-else />

    <transition name="modal">
      <OpenCollectionModal v-if="open_collection"></OpenCollectionModal>
    </transition>

    <transition name="modal">
      <FormModal v-if="show_form_modal" @closemodal="closeFormModal" />
    </transition>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
    Skeleton: () => import(/* webpackChunkName: "components" */ '@/components/Skeleton'),
    FormModal: () => import(/* webpackChunkName: "collections" */ './FormModal'),
    ListView: () => import(/* webpackChunkName: "collections" */ './ListView'),
    OpenCollectionModal: () => import(/* webpackChunkName: "collections" */ './OpenCollectionModal'),
  },
  mounted() {
    this.$store.dispatch('text_collection/List', null, { root: true })
  },
  computed: {
    ...mapState('text_collection', {
      loading: 'loading',
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