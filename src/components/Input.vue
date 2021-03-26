<template>
  <input
    :class="valid ? `input-text placeholder-red-500 placeholder-opacity-50 ${sizeClass || ''}` 
                  : `input-text ${sizeClass || ''} dark:text-gray-600`"
    :placeholder="valid || name"
    :value="value"
    @input="$emit('getval', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    valid: String,
    sizeClass: String,
    name: String
  }
}
</script>

<style lang="postcss">
   .input-text{
    @apply px-3 py-1 rounded border border-gray-300 shadow-sm text-base;
  }
  .input-text:focus{
    @apply outline-none border-blue-400;
  }
</style>