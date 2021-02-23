<template>
  <Modal name="modal" :title="`Title: ${collection.title}`" @closemodal="closeModal">
    <template #body>
      <h3 class="text-sm text-gray-500">
        {{ new Date().formatDate(collection.date) }}
      </h3>
      <ul>
        <li
          class="w-full bg-white m-2 px-3 py-2 shadow rounded flex items-center justify-between"
          v-for="(text, index) of collection.content"
          :key="index"
        >
          <p
            class="text-base"
            :class="{
              'text-blue-500': isUrl(collection.prefix + text),
            }"
          >
            {{ collection.prefix }}<span class="font-semibold">{{ text }}</span>
          </p>
          <div class="flex items-center">
            <Button color="green" @click.stop.native="copyText(collection.prefix + text, index)" sm>
              {{ textCopied === index ? 'copied' : 'copy' }}
            </Button>
            <a
              v-if="isUrl(collection.prefix + text)"
              @click.stop
              class="bg-blue-500 hover:bg-blue-600 rounded p-1 text-white ml-2"
              :href="collection.prefix + text"
              target="_blank"
              title="go to link"
            >
              <SVGIcon icon="goto" size="w-5 h-5" />
            </a>
          </div>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex items-center justify-end h-full">
        <Button color="blue" lg class="justify-self" @click.native="editCollection">
          EDIT COLLECTION
        </Button>
        <Button color="red" lg class="justify-self mx-3" @click.native="deleteCollection">
          DELETE COLLECTION
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import action_text from '@/mixins/action_text'

export default {
  mixins: [action_text],
  components: {
    Button: () => import('@/components/Button'),
    Modal: () => import('@/components/Modal'),
    SVGIcon: () => import('@/components/SVGIcon'),
  },
  data() {
    return {
      textCopied: null,
    }
  },
  computed: {
    ...mapState('text_collection', {
      collection: 'collection_data',
    }),
  },
  methods: {
    ...mapMutations('text_collection', {
      setOpenCollection: 'SET_OPEN_COLLECTION',
      setShowOpenForm: 'SET_SHOW_FORM_MODAL',
      setCollectionData: 'SET_COLLECTION_DATA',
      setIsUpdate: 'SET_IS_UPDATE',
    }),
    editCollection() {
      this.setShowOpenForm(true)
      this.setIsUpdate(true)
      window.localStorage.setItem('collection_data', JSON.stringify(this.collection))
    },
    deleteCollection() {
      if (window.confirm(`yakin mau hapus Collection '${this.collection.title}' ? `)) {
        this.$store.dispatch('text_collection/Delete', this.collection.id, {
          root: true,
        })
      }
    },
    closeModal() {
      this.setOpenCollection(false)
    },
  },
}
</script>

<style>
</style>
