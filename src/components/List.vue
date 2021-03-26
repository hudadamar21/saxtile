<template>
<li class="relative flex justify-center items-center overflow-hidden">
  
  <!-- shadow on left when list update -->
  <transition name="fade">
    <div class="bg-gradient-to-r to-transparent opacity-30 absolute left-0 w-3 h-full z-20" 
         :class="mode == 'light' ? 'from-gray-400' : 'from-gray-700'"
         v-if="showOption == data.id">
    </div>
  </transition>

  <div 
    class="card lg:items-center flex-col lg:flex-row -translate-x-12 h-auto"
    :class="{
        'border-blue-400 border' : data.type === 'collection',
        'transition-transform transform scale-105 bg-blue-100': showOption == data.id && isUpdate,
        'transition-transform transform' : showOption == data.id,
        'bg-white': mode == 'light',
        'bg-gray-600 text-white' : mode == 'dark'
    }"
    @click="$emit('toggle', data.id)"
  >
  <div
    @click="archiveAction" 
    class="absolute top-1/2 transform -translate-y-1/2 bg-red-500 dark:bg-white dark:text-gray-700 w-32 flex items-center justify-end rounded p-3 text-white transition duration-200 shadow-md"
    :class="{
      '-translate-x-full opacity-0' : showOption !== data.id,
      'w-36' : data.archived
    }"
  >
  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
    <p class="text-sm">
      {{ data.archived ? 'UnArchive' : 'Archive' }}
    </p>
  </div>

    <!-- Content Slot -->
    <slot name="content"></slot>

    <!-- Action Slot -->
    <div 
      class="flex items-center lg:justify-end w-3/12 lg:mx-2"
      :class="{
        'bg-white' : mode == 'light',
        'bg-gray-600' : mode == 'dark',
        'bg-blue-100' : showOption === data.id && isUpdate
      }">
        <slot name="action"></slot>
    </div>

  </div>

  <!-- Options Slot -->
  <div class="options">
    <slot name="option"></slot>
  </div>

</li>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    showOption: String,
    isUpdate: Boolean,
  },
  methods: {
    archiveAction(){
      this.$emit('archive', this.data.id)
    }
  }
}
</script>

<style lang="postcss" scoped>
.card {
  @apply my-2 flex justify-between rounded shadow p-3 cursor-pointer w-full transition duration-150 z-10
}
.card:hover {
  @apply shadow-md
}
.info {
  @apply absolute top-0 -mt-8 right-0 hidden bg-white shadow p-1 rounded  w-40 text-center font-semibold
}
.options {
  @apply absolute right-0 flex flex-col justify-center items-center z-0
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


