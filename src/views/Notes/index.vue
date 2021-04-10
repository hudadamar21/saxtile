<template>
<Layout no-indicator>
	<NoteList/>
	<NoteOpen/>
</Layout>
</template>

<script>
export default {
	title: 'Saxtile Notes',
	components: {
		NoteList: () => import(/* webpackChunkName: "components" */ './NoteList'),
		NoteOpen: () => import(/* webpackChunkName: "components" */ './NoteOpen'),
	},
	mounted() {
    this.$store.dispatch('note/List')
  }
}
</script>