<template>
<li class="relative flex justify-center items-center overflow-hidden">
  
  <!-- shadow on left when list update -->
  <transition name="fade">
    <div class="bg-gradient-to-r to-transparent opacity-50 absolute left-0 w-3 h-full z-50" 
         :class="mode == 'light' ? 'from-gray-400' : 'from-gray-700'"
         v-if="showOption == data.id">
    </div>
  </transition>

  <div 
    class="card lg:items-center flex-col lg:flex-row -translate-x-12 h-auto"
    :class="{
        'border-blue-400 border' : data.type === 'collection',
        'transition-transform transform scale-105 bg-teal-100': showOption == data.id && isUpdate,
        'transition-transform transform' : showOption == data.id,
        'bg-white': mode == 'light',
        'bg-gray-600 text-white' : mode == 'dark'
    }"
    @click="$emit('toggle', data.id)"
  >

    <!-- Content Slot -->
    <slot name="content"></slot>

    <!-- Action Slot -->
    <div 
      class="flex items-center lg:justify-end w-2/12 lg:mx-2"
      :class="{
        'lg:bg-white' : mode == 'light',
        'lg:bg-gray-600' : mode == 'dark'
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


