<template>
<li 
	@click="openNote()"
	class="list-simple cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 transition duration-50">
  <div>
    <h3 class="text-gray-500 dark:text-white text-xl font-semibold break-all">
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
  methods: {
  	...mapMutations('note', ['setNoteOpened','setUpdatedNoteId','setEditMode']),
		openNote(){
			this.setNoteOpened({...this.list})
			this.setUpdatedNoteId(this.list.id)
			this.setEditMode(false)
		}
  }
}
</script>

<style>
.list-simple {
  @apply w-full bg-white dark:bg-gray-600 border dark:border-gray-800 flex justify-between items-center py-2 px-3 mb-1;
}
</style>