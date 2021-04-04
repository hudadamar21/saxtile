<template>
  <li class="list-simple">
    <div>
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
    <div>
      <Button
        color="red" md shadow="shadow"
        @click.native="$emit('archive', {id: list.id, title: list.title})"
        class="mr-2">
          {{ onArchives ? 'UnArchive' : 'Archive'}}
      </Button>
      <Button 
        color="blue" md shadow="shadow" 
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
	components: {
    Button: () => import(/* webpackChunkName: "components" */ '@/components/Button'),
  },
	computed: {
    title(){
      const title = this.list.title.slice(1,20)
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
  @apply w-full bg-white dark:bg-gray-600 rounded border border-blue-500 dark:border-white shadow flex justify-between items-center py-2 px-3 mb-4;
}
</style>