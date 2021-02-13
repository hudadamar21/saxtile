<template>
  <div class="flex flex-col mb-2 lg:mb-0 w-full overflow-hidden">
    <div class="mb-1">
      <h3 class="font-bold">{{ list.title }}</h3>
      <p class="text-gray-500 text-xs">{{ new Date().formatDate(list.date) }}</p>
    </div>
    <p v-if="list.type === 'collection'" class="overflow-hidden text-gray-700 text-sm" >{{ list.content.length }} text of collection</p>
    <p v-else class="overflow-hidden" :class="{'text-blue-500': isUrl(list.content)}">{{ list.content }}</p>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true
    },
    isUrl: {
      type: Function,
      required: true
    }
  }
}
</script>

<style>

</style>