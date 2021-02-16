<template>
<ul class="text-list md:overflow-auto">

  <!-- jika list kosong -->
    <li v-if="!lists.length" class="text-center font-semibold text-gray-700 mt-5">Tidak ada text yang tersimpan.</li>

  <!-- list views -->
    <List v-else
      mode="light"
      v-for="list of lists" :key="list.id"
      :data="list"
      :showOption="showOption"
      :isUpdate="isUpdate"
      @toggle="(id) => toggle(id)"
    >

  <!-- Content (title and date) -->
    <template #content>
      <div class="flex flex-col mb-2 lg:mb-0 w-full overflow-hidden">
        <div class="mb-1">
          <h3 class="font-bold">{{ list.title }}</h3>
          <p class="text-gray-500 text-xs">{{ new Date().formatDate(list.date) }}</p>
        </div>
        <p class="overflow-hidden" :class="{'text-blue-500': isUrl(list.content)}">{{ list.content }}</p>
      </div>
    </template>

  <!-- action (copy and goto) -->
    <template #action>
      <div class="flex items-center">
        <Button
          color="green" 
          @click.stop.native="copyText(list.content, list.id)"
          sm>
          <p>{{ textCopied == list.id ? 'copied' : 'copy'}}</p>
        </Button>
        <a v-if="isUrl(list.content)"
          @click.stop
          class="bg-blue-500 hover:bg-blue-600 rounded p-1 text-white ml-2"
          :href="list.content"
          target="_blank" title="go to link"
        >
          <SVGIcon icon="goto" size="w-5 h-5" />
        </a>
      </div>
    </template>

  <!-- options (edit, delete) -->
    <template #option>
      <div>
        <ButtonCircle mode="warning" @klik="editText(list)">
          <SVGIcon icon="pancil" size="w-5 h-5" />
        </ButtonCircle>
        <ButtonCircle mode="danger" @klik="deleteText(list.id)">
          <SVGIcon icon="trash" size="w-5 h-5" />
        </ButtonCircle>
      </div>
    </template>
  </List>
</ul>
<!-- End List Text -->
</template>

<script>

import { mapState, mapMutations } from 'vuex'
import action_text from '@/mixins/action_text'

import { List, SVGIcon, Button, ButtonCircle } from "@/components"

export default {
  mixins: [action_text],
  components: {
    List,
    SVGIcon,
    Button,
    ButtonCircle
  },
  data(){
    return {
      textCopied: null
    }
  },
  computed: {
     ...mapState({
        isUpdate: state => state.text.isUpdate,
        showOption: state => state.text.showOption,
        lists: state => state.text.all
    })
  },
  methods: {
    ...mapMutations('text', {
      setIsUpdate: 'SET_IS_UPDATE',
      setInput: 'SET_INPUT',
      setUpdateTextId: 'SET_UPDATE_TEXT_ID',
      setShowOption: 'SET_SHOW_OPTION'
    }),
    editText({title,content, id}) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // this.commitText('SET_IS_UPDATE', true)
      // this.commitText('SET_INPUT', {title, content})
      // this.commitText('SET_UPDATE_TEXT_ID', id)
      this.setIsUpdate(true)
      this.setInput({title, content})
      this.setUpdateTextId(id)
    },
    
    deleteText(id) {
      if (confirm("yakin ?")) {
        this.$store.dispatch('text/Delete', id, {root: true})
        // this.commitText('SET_IS_UPDATE', false)
        // this.commitText('SET_INPUT', {title : '', content: ''})
        this.setIsUpdate(false)
        this.setInput({title : '', content: ''})
      }
    },
    
    toggle(id){
      console.log(this.showOption, id)
      if (!this.isUpdate && this.showOption == id) {
        // this.commitText('SET_SHOW_OPTION', null)
        this.setShowOption(null)
      } else {
        if(this.isUpdate) {
          // this.commitText('SET_IS_UPDATE', false)
          // this.commitText('SET_SHOW_OPTION', null)
          // this.commitText('SET_INPUT', {title: '',content: ''})
          this.setIsUpdate(false)
          this.setShowOption(null)
          this.setInput({title: '',content: ''})
        } else this.setShowOption(id) //this.commitText('SET_SHOW_OPTION', id)
      }
    }
  }
}
</script>

<style>

</style>