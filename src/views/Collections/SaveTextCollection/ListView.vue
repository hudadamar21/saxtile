<template>
	<ul class="w-full flex flex-col items-center px-5">
    <li v-if="!lists.length" class="text-center font-semibold text-gray-700 mt-5">Tidak ada text yang tersimpan.</li>
    <li 
      v-else v-for="(list, index) of lists" 
      :key="index" 
      class="w-full bg-white rounded border border-blue-500 shadow flex justify-between items-center py-2 px-3 mb-4">
      <div>
        <h3 class="text-blue-600 font-bold">{{ list.title }}</h3>
        <p class="text-xs text-gray-400">{{ new Date().formatDate(list.date) }}</p>
        <p class="text-sm mt-2 text-gray-600">{{ list.content.length }} text on collection</p>
      </div>
      <div>
        <Button 
					color="blue" md shadow="shadow"
					@click.native="openCollection(list)"
				>Open</Button>
      </div>
    </li>
  </ul>
</template>

<script>
import {Button} from '@/components'
export default {
	components: {
		Button
	},
	computed: {
		lists(){
      return this.$store.state.text_collection.lists
    }
	},
	methods: {
		openCollection(list){
			this.$store.commit('text_collection/SET_OPEN_COLLECTION', true, {root: true})
			this.$store.commit('text_collection/SET_COLLECTION_DATA', list, {root: true})
		}
	}
}
</script>