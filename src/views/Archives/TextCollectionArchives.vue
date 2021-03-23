<template>
	<TextCollectionList :lists="archiveTextCollectionLists" />	
</template>

<script>
export default {
	components: {
		TextCollectionList: () => import(/* webpackChunkName: "collections" */ '@/views/Collections/SaveTextCollection/ListView'),
	},
	mounted(){
		if(this.lists.length === 0) this.$store.dispatch('text_collection/List')
	},
	computed: {
		lists(){
			return this.$store.state.text_collection.lists
		},
		archiveTextCollectionLists(){
      return this.lists.filter(list => list.archived)
    }
	},
	methods: {

	}
}
</script>