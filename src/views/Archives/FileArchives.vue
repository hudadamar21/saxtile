<template>
	<FileList :lists="archiveFileLists" isArchive />
</template>

<script>
export default {
	components: {
		FileList: () => import(/* webpackChunkName: "file" */ '@/views/Main/SaveFile/FileList'),
	},
	mounted(){
		if(this.filelist.length === 0) this.$store.dispatch('file/List')
	},
	computed: {
		filelist(){
			return this.$store.state.file.lists
		},
		archiveFileLists(){
      return this.filelist.filter(list => list.archived)
    },
	}
}
</script>