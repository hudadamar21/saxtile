<template>
  <Modal name="modal" :title="`Title: ${collection.title}`" @closemodal="closeModal">
    <template #body>
      <h3 class="text-sm text-gray-500 dark:text-gray-300">
        {{ new Date().formatDate(collection.date) }}
      </h3>
      <ul class="text-gray-700 dark:text-white">
        <li
          class="w-full bg-white dark:bg-gray-600 my-2 px-3 py-2 shadow rounded flex flex-col md:flex-row md:items-center justify-between overflow-hidden"
          v-for="({subtitle, text}, index) of collection.contents"
          :key="index"
        >
          <div>
            <h3 v-if="subtitle" class="text-base font-bold ">{{ subtitle }}</h3>
            <p
            class="text-sm md:text-base break-all"
            :class="{
              'text-blue-500 dark:text-blue-300': isUrl(collection.prefix + text),
            }"
          >
            <span class="mr-px">{{ collection.prefix }}</span>
            <span :class="{'font-semibold' : collection.prefix}">{{ text }}</span>
          </p>
          </div>
          <div class="flex items-center mt-2 md:mt-0">
            <Button
              padding="px-2 py-1"
              class="flex gap-1"
              color="green" 
              @click.stop.native="copyText(collection.prefix + text, index)" sm
              title="copy"
            >
              <SVGIcon v-if="textCopied == index" icon="copied" size="w-5 h-5" />
              <SVGIcon v-else icon="copy" size="w-5 h-5" />

              {{ textCopied == index ? 'copied' : 'copy' }}
            </Button>
            <a
              v-if="isUrl(collection.prefix + text)"
              @click.stop
              class="bg-blue-500 hover:bg-blue-600 text-white dark:bg-white dark:hover:bg-gray-200 text-gray-700 rounded p-1  ml-2"
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
      <div class="flex items-center justify-end h-full text-base">
        <Button color="blue" lg class="justify-self" @click.native="editCollection">
          EDIT <span class="hidden md:inline-block">COLLECTION</span>
        </Button>
        <Button color="red" lg class="justify-self mx-3" @click.native="deleteCollection">
          DELETE <span class="hidden md:inline-block">COLLECTION</span>
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
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
    Modal: () => import(/* webpackChunkName: "components" */ '@/components/Modal'),
    SVGIcon: () => import(/* webpackChunkName: "components" */ '@/components/SVGIcon'),
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
        this.$store.dispatch('text_collection/Delete', this.collection.id)
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
