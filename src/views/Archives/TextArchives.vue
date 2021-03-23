<template>
	<TextList :lists="archiveTextLists" isArchive />
</template>

<script>
export default {
	components: {
		TextList: () => import(/* webpackChunkName: "text" */ '@/views/Main/SaveText/TextList'),
	},
	mounted(){
		if(this.textlist.length === 0) this.$store.dispatch('text/List')
	},
	computed: {
		textlist(){
			return this.$store.state.text.lists
		},
		archiveTextLists(){
      return this.textlist.filter(list => list.archived)
    },
	}
}
</script>