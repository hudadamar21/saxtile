<template>
  <div class="text-xl w-full flex flex-col md:flex-row justify-between items-center">
    <transition name="slide-fade">
      <Menu v-if="menu"/>
    </transition>
    <section class="flex flex-col md:flex-row w-full">
      <slot></slot>
    </section>
    <div class="indicator-container">
      <a href="#savetext" class="indicator bg-blue-500">
        <strong>Text</strong>
      </a>
      <a href="#savefile" class="indicator bg-gray-700">
        <strong>File</strong>
      </a>
    </div>
    <MenuToggle />
  </div>
</template>

<script>

import Menu from '@/views/Main/Menu';
import { MenuToggle } from '@/components';

export default {
  components: {
    Menu,
    MenuToggle
  },
  computed: {
    menu(){
      return this.$store.state.menu
    }
  },
};
</script>

<style lang="postcss" scoped>
  .goto{
    @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50
  }
  .indicator-container {
    @apply fixed bottom-0 left-0 border-none z-40 w-full h-12 bg-white flex md:hidden border
  }
  .indicator {
    @apply flex justify-center items-center w-1/2 h-12 text-white
  }
</style>