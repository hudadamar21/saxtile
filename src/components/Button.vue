<template>
  <button
    :class="`focus:outline-none focus:border-blue-500 focus:border-3 rounded focus:ring
      ${padding || 'px-3 py-1'}
      ${shadow || ''}
      ${coloring}
      ${sizing} 
      ${className || ''} dark:bg-white dark:text-gray-700`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    color: String,
    padding: String,
    shadow: String,
    lg: Boolean,
    md: Boolean,
    sm: Boolean,
    className: String,
  },
  computed: {
    coloring(){
      return this.color == 'white' 
          ? 'bg-white hover:bg-gray-200 text-gray-700'
          : `bg-${this.color}-500 hover:bg-${this.color}-600 focus:ring-${this.color}-200 dark:focus:ring-gray-200 text-white`
    },
    sizing(){
      return this.lg ? 'text-lg' 
              : this.md ? 'text-base'
              : this.sm ? 'text-sm'
              : '' 
    }
  }
};
</script>