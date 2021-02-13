<template>
  <div>
    <ButtonCircle mode="warning" @klik="editText(list)">
      <SVGIcon icon="pancil" size="w-5 h-5" />
    </ButtonCircle>
    <ButtonCircle mode="danger" @klik="deleteText(list.id)">
      <SVGIcon icon="trash" size="w-5 h-5" />
    </ButtonCircle>
  </div>
</template>

<script>

import {
  ButtonCircle,
  SVGIcon
} from '@/components';

export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  components: {
    ButtonCircle,
    SVGIcon
  },
  methods: {
    commitText(action, data){
      this.$store.commit(`text/${action}`, data, {root: true})
    },
    editText({title,content, id}) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.commitText('SET_IS_UPDATE', true)
      this.commitText('SET_INPUT', {title, content})
      this.commitText('SET_UPDATE_TEXT_ID', id)
    },
    
    deleteText(id) {
      if (confirm("yakin ?")) {
        this.$store.dispatch('Delete', id)
        this.isUpdate = false
        this.commitText('SET_IS_UPDATE', false)
        this.commitText('SET_INPUT', {title : '', content: ''})
      }
    }
  }
}
</script>

<style>

</style>