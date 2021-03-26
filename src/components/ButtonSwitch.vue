<template>
  <button
    class="w-8 h-4 md:w-10 md:h-5 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow"
    :class="state ? 'bg-white' : 'bg-gray-200'"
    @click="changeState"
  >
    <div
      class="w-5 h-5 md:w-6 md:h-6 relative rounded-full transform transition duration-300"
      :class="state ? 
        `${activeColor || 'bg-blue-500'} translate-x-full` : 
        `${nonActiveColor || 'bg-gray-500'} -translate-x-2`">
    </div>
  </button>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      required: true,
    },
    activeColor: String,
    nonActiveColor: String
  },
  methods: {
    changeState() {
      this.$emit('switch', !this.state)
    },
  },
}
</script>

<style>
</style>