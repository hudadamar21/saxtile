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
        <ListView :list="{
          note: list,
          color: {
            bg: {
              default: `bg-${list.color}-100`,
              hover: `hover:bg-${list.color}-200`
            },
            border: {
              default : `border-${list.color}-400`
            }
          }
        }" :key="index"/>
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
    }
  },
  methods: {
    ...mapMutations('note', [
      'setNoteOpened',
      'setUpdatedNoteId',
      'setEditMode'
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
  	}
  }
}
</script>