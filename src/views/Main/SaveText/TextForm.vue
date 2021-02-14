<template>
  <!-- Form Input -->
  <form @submit.prevent="saveText" class="flex flex-col lg:flex-row lg:items-center w-full">
    <div class="flex flex-col lg:flex-row w-full">
      <Input
        class="mb-2 lg:mb-0 mr-2"
        :class="{'bg-blue-50' : isUpdate}"
        name="Title"
        sizeClass="w-full lg:w-3/12"
        :valid="validation" 
        :value="input.title" 
        @getval="(val) => input.title = val"/>
      <Input
        class="mb-2 lg:mb-0 mr-2"
        :class="{'bg-blue-50' : isUpdate}"
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
import storeText from '@/mixins/store_text'

export default {
  mixins: [storeText],
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
      const { title, content } = this.input
      console.log(title,content)
      if (title && content) {
        const Text = {
          title,
          content,
          date: new Date().getTime(),
        }

        this.isUpdate
          ? this.dispatchText('Update', Text)
          : this.dispatchText('Save', Text)

        this.commitText('SET_IS_UPDATE', false)
        this.commitText('SET_INPUT', {title: '', content: ''})
        this.commitText('SET_SHOW_OPTION', null)
      } else {
        this.$store.commit('SET_VALIDATION', 'this is required..')
        setTimeout(() => {
          this.$store.commit('SET_VALIDATION', '')
        }, 3000)
      }
    },
  }
}
</script>

<style>

</style>