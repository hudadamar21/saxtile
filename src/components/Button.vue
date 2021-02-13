<template>
  <button
    :class="`focus:outline-none focus:border-blue-500 focus:border-3 rounded ${padding || 'px-3 py-1'} ${shadow || ''}
      ${color == 'white' 
          ? 'bg-white hover:bg-gray-200 text-gray-700'
          : `bg-${color}-500 hover:bg-${color}-600 text-white`
        }
      ${lg ? 'text-lg' 
            : md ? 'text-base'
            : sm ? 'text-sm'
            : '' 
        } 
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
};
</script>

<style>
</style>