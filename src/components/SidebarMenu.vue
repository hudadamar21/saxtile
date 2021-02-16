<template>
    <div class="fixed top-0 left-0 flex flex-col w-full md:w-1/4 self-start items-start p-5 bg-gray-100 h-screen z-50 shadow-lg border border-gray-200 transition duration-300 cursor-default">
      <div class="flex flex-col w-full items-start">
        <div class="flex justify-end w-full items-center">
          <small class="text-sm lg:text-base">Hallo, {{ user.displayName }}</small>
        </div>
        <h3 class="font-bold mt-3 mb-2 text-blue-500">Menu</h3>
        <ul class="w-full text-left mb-3 bg-white rounded shadow transition-max-height ">
          <li 
            v-for="menu of menuList" 
            :key="menu.name"
            class="overflow-hidden pt-1"
            :class="{'bg-blue-50' : menu.url_name == $route.name}"
            @click="$store.commit('TOGGLE_MENU')"
          >
            <router-link
              class="text-base py-1 ml-3 text-gray-800 hover:text-blue-400 cursor-pointer" 
              :to="menu.url" >
               {{ menu.name}}
            </router-link>
            <hr class="mx-2 mt-2">
          </li>
          <li class="overflow-hidden pb-1">
            <p class="text-base py-1 ml-3 text-gray-800 hover:text-blue-400 cursor-pointer" 
               @click="logout">
               Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      params: {
        userId: this.$route.params.userId
      },
      menuList: [
        {
          name: 'Home',
          url_name: 'main',
          url: {name: 'main', params: this.params }
        },
        {
          name: 'Save Collection',
          url_name: 'collections',
          url: {name: 'collections', params: this.params}
        },
        {
          name: 'Setting',
          url_name: 'setting',
          url: {name: 'setting', params: this.params}
        }
      ]
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    }
  },
  methods: {
    logout(){
      if(confirm('mau logout ?')) {
        this.$store.dispatch('user/Logout', null, {root: true})
        this.$store.commit('TOGGLE_MENU')
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