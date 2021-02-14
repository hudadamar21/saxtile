<template>
  <Layout>
    <SaveText ref="stext"/>
    <SaveFile ref="sfile"/>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout'
import SaveText from '@/views/Main/SaveText/index.vue'
import SaveFile from '@/views/Main/SaveFile/index.vue'

export default {
  components: {
    Layout,
    SaveText,
    SaveFile
  }
};
</script>

<style lang="postcss" scoped>
  .goto{
    @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50
  }
</style>