<template>
  <!-- Form Input -->
  <form @submit.prevent="saveText" class="flex flex-col lg:flex-row lg:items-center w-full">
    <div class="flex flex-col lg:flex-row w-full">
      <Input
        class="mb-2 lg:mb-0 mr-2"
        name="Title"
        sizeClass="w-full lg:w-3/12"
        :valid="validation" 
        :value="input.title" 
        @getval="(val) => input.title = val"/>
      <Input
        class="mb-2 lg:mb-0 mr-2"
        name="paste your link or something text"
        sizeClass="w-full lg:w-9/12"
        :valid="validation" 
        :value="input.content" 
        @getval="(val) => input.content = val"/>
    </div>
    <Button type="submit" color="blue" md className="text-base" >{{ isUpdate ? 'Update' : 'Save' }}</Button>
  </form>
</template>

<script>

import {
  Input,
  Button
} from "@/components"
import { mapState } from 'vuex'

export default {
  components: {
    Input,
    Button
  },
  computed: {
    ...mapState({
      input: state => state.text.input,
      isUpdate: state => state.text.isUpdate,
      validation: state => state.text.validation,
      showOption: state => state.text.showOption,
      updateTextId: state => state.text.updateTextId
    })
  },
  methods: {
    saveText() {
      const { commit, dispatch } = this.$store
      const { title, content } = this.input
      console.log(title,content)
      if (title && content) {
        if (this.isUpdate) {
          const updateText = {
            updateTextId: this.updateTextId,
            title,
            content
          }
          dispatch('text/Update', updateText, {root: true})
          commit('text/SET_IS_UPDATE', false, {root: true})
        } else {
          const newText = {
            title,
            content,
            date: new Date().getTime(),
          }
          dispatch('text/Save', newText, {root: true})
        }
        commit('text/SET_IS_UPDATE', false, {root: true})
      } else {
        commit('text/SET_VALIDATION', 'text required..', {root: true})
        setTimeout(() => {
          commit('text/SET_VALIDATION', '', {root: true})
        }, 3000)
      }
    },
  }
}
</script>

<style>

</style>