<template>
<li 
	@click="openNote()"
  :class="`
    ${listBorder} 
    ${listBackground} 
    ${hoverListBackground}
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
    editmode(){
      return this.$store.state.note.editmode
    },
    listBackground(){
      return this.list.color === 'red' ? 'bg-red-100'
        : this.list.color === 'blue' ? 'bg-blue-100'
        : this.list.color === 'green' ? 'bg-green-100'
        : this.list.color === 'yellow' ? 'bg-yellow-100'
        : this.list.color === 'gray' ? 'bg-gray-100'
        : 'bg-white'
    },
    hoverListBackground(){
      return this.list.color === 'red' ? 'bg-red-200'
        : this.list.color === 'blue' ? 'bg-blue-200'
        : this.list.color === 'green' ? 'bg-green-200'
        : this.list.color === 'yellow' ? 'bg-yellow-200'
        : this.list.color === 'gray' ? 'bg-gray-200'
        : 'bg-white'
    },
    listBorder(){
      return this.list.color === 'red' ? 'border-red-400'
        : this.list.color === 'blue' ? 'border-blue-400'
        : this.list.color === 'green' ? 'border-green-400'
        : this.list.color === 'yellow' ? 'border-yellow-400'
        : this.list.color === 'gray' ? 'border-gray-400'
        : 'border-gray-200'
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
      this.setNoteOpened({...this.list})
      this.setUpdatedNoteId(this.list.id)
      this.setNoteColor(this.list.color)
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