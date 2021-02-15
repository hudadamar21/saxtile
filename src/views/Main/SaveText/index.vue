<template>
  <section ref="stext" class="stext-main md:h-screen min-h-screen w-full md:w-1/2" id="savetext">

  <!-- Title -->
    <h1 class="stext-title text-2xl py-1 md:py-0 md:text-3xl">Save Text</h1>

  <!--  Input New Text -->
    <div class="w-full px-5 mb-3">
      <TextForm />
    </div>

  <!-- List Text -->
    <Skeleton v-if="loadingList" mode="light" :count="3"/>
    <TextList v-else />

  </section>
</template>

<script>

import { Skeleton } from "@/components"

import TextForm from './TextForm';
import TextList from './Textlist';

export default {
  components: {
    Skeleton,
    TextForm,
    TextList
  },
  computed: {
    loadingList(){
      return this.$store.state.text.loadingList
    }
  },
  data() {
    return {
      actionCompleteId: null
    }
  },
  created(){
    const user_uid = this.$store.state.user.uid
    if(this.$route.params.userId != user_uid){
      this.$router.push({path: `/user/${user_uid}`})
    }
  },
  mounted(){
    this.$store.dispatch('text/List', null, {root: true})

  }
}
</script>

<style scoped lang="postcss">
.stext-main {
  @apply bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center
}
.stext-title {
  @apply my-2 font-bold text-blue-500
}
.text-list {
  @apply py-2 px-5 text-base tracking-wide text-left w-full 
}
</style>