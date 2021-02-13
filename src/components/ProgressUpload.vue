<template>
  <div 
    ref="progress" 
    class="absolute top-0 left-0 opacity-50 rounded h-full z-10"
    :class="progress < 100 ? 'bg-blue-500' : 'bg-green-500'"
  ></div>
</template>

<script>
export default {
  props: {
    progress: Number
  },
  watch: {
    progress(){
      this.$refs.progress.style.width = this.progress+'%'
    }
  }
}
</script>

<style>

</style>