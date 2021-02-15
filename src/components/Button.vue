<template>
  <button
    :class="`focus:outline-none focus:border-blue-500 focus:border-3 rounded
      ${padding || 'px-3 py-1'}
      ${shadow || ''}
      ${coloring}
      ${sizing} 
      ${className || ''} `"
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
          ? 'bg-primary-white hover:bg-gray-200 text-gray-700'
          : `bg-${this.color}-500 hover:bg-${this.color}-600 text-white`
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