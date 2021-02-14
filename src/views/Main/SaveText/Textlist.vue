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
          @click.stop.native="copyText(list.content)"
          sm>
          <p>{{ textCopied ? 'copied' : 'copy'}}</p>
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

import { mapState } from 'vuex'

import { List, SVGIcon, Button, ButtonCircle } from "@/components"

export default {
  components: {
    List,
    SVGIcon,
    Button,
    ButtonCircle
  },
  data(){
    return {
      textCopied: false
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
    
    copyText(content) {
      this.$copyText(content).then(() => {
        this.textCopied = true
        setTimeout(() => {
        this.textCopied = false
        }, 1000);
      }).catch(() => alert('not copied'))
    },

    isUrl(string){
      var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(string);
    },

    commitText(action, data){
      this.$store.commit(`text/${action}`, data, {root: true})
    },
    commitTextCollection(action, data){
      this.$store.commit(`textCollection/${action}`, data, {root: true})
    },

    editText({title,content, id}) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.commitText('SET_IS_UPDATE', true)
      this.commitText('SET_INPUT', {title, content})
      this.commitText('SET_UPDATE_TEXT_ID', id)
    },
    
    deleteText(id) {
      if (confirm("yakin ?")) {
        this.$store.dispatch('text/Delete', id, {root: true})
        this.isUpdate = false
        this.commitText('SET_IS_UPDATE', false)
        this.commitText('SET_INPUT', {title : '', content: ''})
      }
    },
    
    toggle(id){
      console.log(this.showOption, id)
      if (!this.isUpdate && this.showOption == id) {
        this.commitText('SET_SHOW_OPTION', null)
      } else {
        if(this.isUpdate) {
          this.commitText('SET_IS_UPDATE', false)
          this.commitText('SET_SHOW_OPTION', null)
          this.commitText('SET_INPUT', {title: '',content: ''})
        } else this.commitText('SET_SHOW_OPTION', id)
      }
    }
  }
}
</script>

<style>

</style>