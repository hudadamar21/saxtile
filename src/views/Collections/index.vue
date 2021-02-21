<template>
  <Layout>
    <SaveTextCollection />
    <SaveFileCollection />
  </Layout>
</template>

<script>
import { Layout } from '@/components'
import SaveTextCollection from './SaveTextCollection'
import SaveFileCollection from './SaveFileCollection'

export default {
  title: 'Saxtile Collection',
  components: {
    Layout,
    SaveTextCollection,
    SaveFileCollection,
  },
}
</script>

<style lang="postcss" scoped>
.goto {
  @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50;
}
</style>