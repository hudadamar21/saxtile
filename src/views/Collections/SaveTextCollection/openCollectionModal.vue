<template>
  <Modal
    name="modal"
    :title="`Title: ${collection.title}`" 
    @closemodal="closeModal">

    <template #body>
      <h3 class="text-sm text-gray-500">{{ new Date().formatDate(collection.date) }}</h3>
      <ul>
        <li class="w-full bg-white m-2 px-3 py-2 shadow rounded flex items-center justify-between" 
            v-for="(text, index) of collection.content" :key="index">
          <p class="text-base">{{ collection.prefix + text }}</p>
          <Button
            color="green" 
            @click.stop.native="copyText(collection.prefix + text, index)"
            sm>
            {{ textCopied === index ? 'copied' : 'copy' }}
          </Button>
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex items-center justify-end h-full">
        <Button 
          color="blue" 
          lg 
          class="justify-self mx-3"
          @click.native="editCollection">
          EDIT COLLECTION
        </Button>
      </div>
    </template>

  </Modal>
</template>

<script>
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    Button,
    Modal
  },
  data(){
    return {
      textCopied: false
    }
  },
  computed: {
    ...mapState('text_collection',{
      collection: 'collection_data'
    })
  },
  methods: {
    ...mapMutations('text_collection', {
      setIsUpdate: 'SET_IS_UPDATE',
      setOpenCollection: 'SET_OPEN_COLLECTION',
      setShowOpenForm: 'SET_SHOW_FORM_MODAL'
    }),
    editCollection(){
      this.setShowOpenForm(true)
    },
    copyText(text, index) {
      this.$copyText(text).then(() => {
        this.textCopied = index
        setTimeout(() => {
        this.textCopied = null
        }, 1000);
      }).catch(() => alert('not copied'))
    },
    closeModal(){
      this.setOpenCollection(false)
    }
  }
}
</script>

<style>

</style>