<template>
  <div class="text-xl w-full flex flex-col md:flex-row justify-between items-center">
    <transition name="opacity">
      <div v-if="scrollOnText" class="goto flex md:hidden bg-blue-500 text-white">
        <a href="#savefile" class="m-auto">to file</a>
      </div>
      <div v-else class=" goto flex md:hidden bg-white text-gray-700">
        <a href="#savetext" class="m-auto">to text</a>
      </div>
    </transition>
    <transition name="slide-fade">
      <Menu v-if="menu"/>
    </transition>
    <transition name="slide-down-fade">
      <TextFormCollection 
        v-if="showTextCollection" 
        @action="saveCollection"
        @close="setTextCollectionModal" />
    </transition>
    <section id="main" class="flex flex-col md:flex-row w-full">
      <SaveText ref="stext"/>
      <SaveFile ref="sfile"/>
    </section>
  </div>
</template>

<script>
import SaveText from "./SaveText/index";
import SaveFile from "./SaveFile/index";
import TextFormCollection from './TextFormCollection';
import Menu from './Menu';

import { mapState } from 'vuex'

export default {
  components: {
    SaveText,
    SaveFile,
    Menu,
    TextFormCollection
  },
  data(){
    return {
      scrollOnText: true
    }
  },
  computed: {
    ...mapState([
      'currentScroll',
      'menu',
      'showTextCollection'
    ])
  },
  created(){
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed(){
     window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(){
      const sfileTop = this.$refs.sfile.$el.getBoundingClientRect().top
      this.scrollOnText = sfileTop > 0 ? true : false
    },
    setTextCollectionModal(){
      this.$store.commit('SET_TEXT_COLLECTION_MODAL', false)
    },
    saveCollection(textCollection){
      let {title,content} = textCollection
      let validateInput = title && content.filter(text => text).length > 0 ? true : false
      if(validateInput){
        textCollection.date = new Date().getTime()
        console.log(textCollection)
        this.$store.dispatch('text/Save', textCollection, {root: true})
      } else {
        alert('input required')
      }
    },
  }
};
</script>

<style lang="postcss" scoped>
  .goto{
    @apply mr-4 mb-5 fixed bottom-0 right-0 p-1 rounded-md shadow z-50
  }
</style>