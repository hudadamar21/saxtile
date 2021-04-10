<template>
<section class="h-screen flex flex-col w-full md:w-4/12 bg-gray-100 dark:bg-gray-700">
	<h3 class="my-3 w-full text-center font-bold text-2xl text-blue-500 dark:text-white">
    Save Notes
  </h3>
  <div class="w-full text-center mb-5">
    <Button 
    	@click.native="createNote"
      :color="isDarkmode ? 'white' : 'blue'" lg 
      shadow="shadow-md"
      > Create New Note
    </Button>
  </div>

  <div class="flex-grow overflow-auto">
    <Skeleton v-if="loading" :count="3" />
    <ul class="w-full overflow-auto px-2">
      <li v-if="!lists.length" class="text-center font-semibold text-gray-500 dark:text-gray-200 mt-5">
      Tidak ada Note yang tersimpan.
      </li>
      <template v-else v-for="(list, index) of lists" >
        <ListView :list="list" :key="index"/>
      </template>
    </ul>
  </div>
  
</section>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
	components: {
		ListView: () => import(/* webpackChunkName: "components" */ './ListView'),
	},
	data(){
		return {
			loading: false
		}
	},
  computed: {
    isDarkmode(){
      return document.querySelector('body').classList.contains('dark')
    },
    lists(){
      return this.$store.state.note.lists
    },
    listBackground(){
      return this.noteOpened.color === 'red' ? 'bg-red-100'
        : this.noteOpened.color === 'blue' ? 'bg-blue-100'
        : this.noteOpened.color === 'green' ? 'bg-green-100'
        : this.noteOpened.color === 'yellow' ? 'bg-yellow-100'
        : this.noteOpened.color === 'gray' ? 'bg-gray-100'
        : 'bg-white'
    },
    hoverListBackground(){
      return this.noteOpened.color === 'red' ? 'bg-red-200'
        : this.noteOpened.color === 'blue' ? 'bg-blue-200'
        : this.noteOpened.color === 'green' ? 'bg-green-200'
        : this.noteOpened.color === 'yellow' ? 'bg-yellow-200'
        : this.noteOpened.color === 'gray' ? 'bg-gray-200'
        : 'bg-white'
    }
  },
  methods: {
    ...mapMutations('note', [
      'setNoteOpened',
      'setUpdatedNoteId',
      'setEditMode',
      'setNoteColor'
    ]),
  	createNote(){
  		const newNote = {
				title: '',
				note: '',
				date: new Date().getTime(),
        color: 'no-color'
			}
  		this.setNoteOpened(newNote)
      this.setUpdatedNoteId(null)
  		this.setEditMode(true)
      this.setNoteColor('no-color')
  	}
  }
}
</script>