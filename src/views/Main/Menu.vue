<template>
    <div class="fixed top-0 left-0 flex flex-col w-full md:w-1/4 self-start items-start p-5 bg-gray-100 h-screen z-50 shadow-lg border border-gray-200 transition duration-300 cursor-default">
      <div class="flex flex-col w-full items-start">
        <div class="flex justify-between w-full items-center">
          <MenuToggle />
          <small class="text-sm lg:text-base ">Hallo, {{ user.displayName }}</small>
        </div>
        <h3 class="text-blue-400 font-bold mt-3 mb-2">Menu</h3>
        <ul class="w-full text-left mb-3 py-1 bg-white rounded shadow transition-max-height ">
          <li 
            v-for="(menu, index) of menuList" 
            :key="menu.name"
            class="overflow-hidden"
          >
            <p class="text-base py-1 ml-2 text-gray-800 hover:text-blue-400 cursor-pointer" 
               @click="menu.action">
               {{ menu.name}}
            </p>
            <template v-if="menu.childrens">
              <ul v-if="collectionOpen" class="text-sm ml-4 border-l mb-2 h-auto">
                <li 
                  v-for="(child, index) of menu.childrens" 
                  :key="child.name" 
                  @click="child.action"
                  class="my-1 mr-2 text-gray-700 hover:text-blue-400 cursor-pointer"
                  :class="{'border-b' : index !== menu.childrens.length - 1}"
                >
                  <p class="ml-2">{{ child.name }}</p>
                </li>
              </ul>
            </template>
            <hr class="mx-2 mt-2" v-if="index !== menuList.length - 1">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { MenuToggle } from '@/components';
export default {
  components: {
    MenuToggle
  },
  data(){
    return {
      menuList: [
        {
          name: 'Save Collection',
          action: this.openCollectionList,
          childrens: [
            {
              name: 'Text Collection',
              action: this.openTextCollection
            },
            {
              name: 'File Collection',
              action: this.openFileCollection
            }
          ]
        },
        {
          name: 'Logout',
          action: this.logout
        }
      ],
      collectionOpen: false
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
  },
  methods: {
    openCollectionList(){
      this.collectionOpen = !this.collectionOpen 
    },
    openTextCollection(){
      this.$store.commit('SET_TEXT_COLLECTION_MODAL', true)
    },
    openFileCollection(){
      window.alert('Fitur ini sedang dikembangkan')
    },
    logout(){
      if(confirm('mau logout ?')) {
        this.$store.dispatch('user/Logout', null, {root: true})
      }
    }
  }
}
</script>

<style>
  .transition-max-height {
    max-height: 500px;
    transition: max-height 2s ease;
  }
</style>