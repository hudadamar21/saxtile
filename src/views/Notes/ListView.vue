<template>
<li 
	@click="openNote()"
  :class="`
    ${list.color.border.default} 
    ${list.note.color === 'no-color' ? 'bg-white' : list.color.bg.default} 
    ${list.note.color === 'no-color' ? 'hover:bg-gray-100' : list.color.bg.hover}
  `"
  class="notelist"
  >
  <div>
    <h3 class="text-gray-600 dark:text-white text-xl font-semibold break-all">
      {{ list.note.title }}
    </h3>
    <p class="text-xs text-gray-400 dark:text-gray-200 mt-1">
      {{ new Date().formatDate(list.note.date) }}
    </p> 
  </div>
</li>
</template>



<script>

import { mapMutations } from 'vuex'
export default {
	props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    editmode(){
      return this.$store.state.note.editmode
    }
  },  
  methods: {
  	...mapMutations('note', [
      'setNoteOpened',
      'setUpdatedNoteId',
      'setEditMode',
      'setNoteColor'
    ]),
		openNote(){
      this.setNoteOpened({...this.list.note})
      this.setUpdatedNoteId(this.list.note.id)
      this.setNoteColor(this.list.note.color)
      this.setEditMode(false)
		},
  }
}
</script>

<style lang="postcss">
.notelist {
  @apply w-full flex justify-between items-center py-2 px-3 mb-1 cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors border dark:border-0 border-l-4 dark:border-l-4;
}
</style>