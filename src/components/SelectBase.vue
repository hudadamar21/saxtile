<template>
  <select
    :value="value"
    @change="getValue"
    class="select-base">
    <option 
      v-for="(option, index) of options" 
      :key="index" 
      :value="option">
        {{ filteredText(option) }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    getValue(e){
      this.$emit('getvalue', e.target.value)
    },
    filteredText(option){
      const nilai = option.split('_')
      return nilai[0] + ' ' + (nilai[1] || '')
    }
  }
}
</script>

<style lang="postcss">
  .select-base {
    @apply dark:bg-gray-500 dark:text-white px-3 py-1 rounded border dark:border-gray-700 mr-2 focus:outline-none focus:border-blue-500
  }
</style>