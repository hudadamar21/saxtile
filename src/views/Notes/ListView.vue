<template>
<li 
	@click="openNote()"
  :class="`
    ${colorMode('border',list.color, 400)} 
    ${list.color === 'no-color' ? 'bg-white' : colorMode('bg',list.color, 100)} 
    ${list.color === 'no-color' ? 'hover:bg-gray-100' : colorMode('hover:bg',list.color, 200)}
  `"
  class="notelist"
  >
  <div>
    <h3 class="text-gray-600 dark:text-white text-xl font-semibold break-all">
      {{ list.title }}
    </h3>
    <p class="text-xs text-gray-400 dark:text-gray-200 mt-1">
      {{ new Date().formatDate(list.date) }}
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
    noteColor(){
      return this.$store.state.note.noteOpened?.color
    }
  },
  methods: {
  	...mapMutations('note', ['setNoteOpened','setUpdatedNoteId','setEditMode']),
		openNote(){
			this.setNoteOpened({...this.list})
			this.setUpdatedNoteId(this.list.id)
			this.setEditMode(false)
		},
    colorMode(property,color, size){
      return `${property}-${color}-${size}`
    },
  }
}
</script>

<style>
.notelist {
  @apply w-full flex justify-between items-center py-2 px-3 mb-1 cursor-pointer dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors border dark:border-0 border-l-4 dark:border-l-4;
}
</style>