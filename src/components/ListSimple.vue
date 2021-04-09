<template>
  <li class="list-simple cursor-normal">
    <div class="w-full md:w-1/2">
      <h3 class="text-blue-500 dark:text-white font-bold">
        {{ title }}
      </h3>
      <p class="text-xs text-gray-400 dark:text-gray-200 mt-1">
        {{ new Date().formatDate(list.date) }}
      </p>
      <p v-if="isCollection" class="text-sm mt-2 text-gray-600 dark:text-white">
        {{ list.contents.length }} text on collection
      </p>  
    </div>
    <div class="flex-grow text-left md:text-right mt-2 md:mt-0">
      <Button
        color="orange" md shadow="shadow"
        @click.native="$emit('archive', {id: list.id, title: list.title})">
          {{ onArchives ? 'UnArchive' : 'Archive'}}
      </Button>
      <Button 
        color="blue" md shadow="shadow"
        class="ml-2" 
        @click.native="$emit('open', list)">
          Open
      </Button>
    </div>
  </li>
</template>

<script>
export default {
	props: {
		list: {
			type: Object,
			required: true
		},
    isCollection: Boolean
	},
	computed: {
    title(){
      const title = this.list.title.slice(0,20)
      return `${title}${this.list.title.length > 20 ? '...' : ''}` 
    },
    onArchives(){
      return this.$route.name === 'archives'
    }
	}
}
</script>

<style lang="postcss" scoped>
.list-simple {
  @apply w-full bg-white dark:bg-gray-600 rounded border border-blue-300 dark:border-gray-400 shadow flex flex-col md:flex-row justify-between items-start md:items-center py-2 px-3 mb-3;
}
</style>