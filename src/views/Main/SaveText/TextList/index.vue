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
      <TextListContent 
        :list="list" 
        :isUrl="isUrl"
      />
    </template>

  <!-- action (copy and goto) -->
    <template #action>
      <TextListAction 
        :list="list"
        :isUrl="isUrl"
        @opencollection="openCollection"
      />
    </template>

  <!-- options (edit, delete) -->
    <template #option>
      <TextListOption :list="list" />
    </template>
  </List>
</ul>
<!-- End List Text -->
</template>

<script>

import { mapState } from 'vuex'

import { List } from "@/components"

import TextListContent from './Content';
import TextListAction from './Action';
import TextListOption from './Option';

export default {
  components: {
    List,
    TextListContent,
    TextListAction,
    TextListOption
  },
  computed: {
     ...mapState({
      isUpdate: state => state.text.isUpdate,
      showOption: state => state.text.showOption
    }),
    lists(){
      return this.$store.state.text.all
    }
  },
  methods: {
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
    },
    openCollection(list) {
      this.commitTextCollection('SET_COLLECTION_DATA', list)
      this.commitTextCollection('SET_SHOW_COLLECTION', true)
    },
  }
}
</script>

<style>

</style>