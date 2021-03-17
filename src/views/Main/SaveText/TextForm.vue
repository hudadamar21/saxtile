<template>
  <!-- Form Input -->
  <form @submit.prevent="saveText" class="flex flex-col lg:flex-row lg:items-center w-full">
    <div class="flex flex-col lg:flex-row w-full">
      <Input
        class="mb-2 lg:mb-0 mr-2"
        :class="{ 'bg-blue-50': isUpdate }"
        name="Title"
        sizeClass="w-full lg:w-3/12"
        :valid="validation"
        :value="input.title"
        @getval="(val) => (input.title = val)"
      />
      <Input
        class="mb-2 lg:mb-0 mr-2"
        :class="{ 'bg-blue-50': isUpdate }"
        name="paste your link or something text"
        sizeClass="w-full lg:w-9/12"
        :valid="validation"
        :value="input.content"
        @getval="(val) => (input.content = val)"
      />
    </div>
    <Button type="submit" :color="checkDarkmode ? 'white' : 'blue'" md className="text-base">{{
      isUpdate ? 'Update' : 'Save'
    }}</Button>
  </form>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import check_darkmode from '@/mixins/check_darkmode'

export default {
  mixins: [check_darkmode],
  components: {
    Input: () => import(/* webpackChunkName: "components" */ '@/components/Input'),
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
  },
  computed: {
    ...mapState({
      input: (state) => state.text.input,
      isUpdate: (state) => state.text.isUpdate,
      validation: (state) => state.text.validation,
      showOption: (state) => state.text.showOption,
      updateTextId: (state) => state.text.updateTextId,
    }),
  },
  methods: {
    ...mapMutations('text', {
      setIsUpdate: 'SET_IS_UPDATE',
      setInput: 'SET_INPUT',
      setShowOption: 'SET_SHOW_OPTION',
      setValidation: 'SET_VALIDATION',
    }),
    ...mapActions('text', ['Save', 'Update']),
    saveText() {
      const { title, content } = this.input
      if (title && content) {
        const Text = {
          title,
          content,
          archived: false,
          date: new Date().getTime()
        }

        this.isUpdate ? this.Update(Text) : this.Save(Text)

        this.setIsUpdate(false)
        this.setInput({ title: '', content: '' })
        this.setShowOption(null)
      } else {
        this.setValidation('this is required..')
        setTimeout(() => {
          this.setValidation('')
        }, 3000)
      }
    },
  },
}
</script>

<style>
</style>