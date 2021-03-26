<template>
  <div
    class="btn-circle mb-1 cursor-pointer"
    :class="`${mode} ${isDarkmode ? 'default' : mode} ${
      size == 'lg' ? 'p-3 h-10 w-10' 
      : size == 'sm' ? 'p-1 h-6 w-6' 
      : 'p-2 h-8 w-8' } `"
    @click="$emit('klik')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: true,
      validator: (value) => {
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    },
    size: String,
  },
  computed: {
    isDarkmode(){
      return document.body.classList.contains('dark')
    }
  }
}
</script>

<style lang="postcss" scoped>
.btn-circle {
  @apply flex justify-center items-center text-white rounded-full mr-1 mx-1;
}

.success {
  @apply bg-green-400 hover:bg-green-500;
}

.warning {
  @apply bg-orange-400 hover:bg-orange-500;
}

.danger {
  @apply bg-red-500 hover:bg-red-600;
}

.default {
  @apply bg-white hover:bg-gray-200 text-gray-600;
}

</style>