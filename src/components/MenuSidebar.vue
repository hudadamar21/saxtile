<template>
  <div class="sidebar-menu z-40">
    <div class="flex flex-col w-full items-start">
      <div class="flex justify-end w-full items-center">
        <small class="text-sm lg:text-base dark:text-gray-100">Hallo, {{ user.displayName }}</small>
      </div>
      <h3 class="font-bold mt-3 mb-2 text-blue-500 dark:text-white">Menu</h3>
      <ul class="w-full text-left bg-white dark:bg-gray-500 rounded shadow transition-max-height overflow-hidden">
        <li
          v-for="menu of menuList"
          :key="menu.name"
          class="overflow-hidden text-gray-800 dark:text-gray-100"
          :class="{'selected-menu': menu.url_name == $route.name }"
          @click="$store.commit('TOGGLE_MENU')"
        >
          <router-link
            class="text-base py-2 pl-3 w-full h-full inline-block hover:text-blue-400 dark:hover:text-white cursor-pointer"
            :to="menu.url"
          >
            {{ menu.name }}
          </router-link>
          <div class="h-px mx-2 bg-gray-200 dark:bg-gray-600" />
        </li>
        <li class="overflow-hidden pb-1 text-gray-800 dark:text-gray-100 hover:text-blue-400 dark:hover:text-white cursor-pointer">
          <p class="text-base py-1 ml-3" @click="logout">Logout</p>
        </li>
      </ul>
    </div>
    <!-- Support me -->
    <SupportMe/>
  </div>
</template>

<script>

export default {
  components: {
    SupportMe: () => import(/* webpackChunkName: "components" */ '@/components/SupportMe'),
  },
  data() {
    return {
      params: {
        userId: this.$route.params.userId,
      },
      menuList: [
        {
          name: 'Main',
          url_name: 'main',
          url: { name: 'main', params: this.params },
        },
        {
          name: 'Save Collection',
          url_name: 'collections',
          url: { name: 'collections', params: this.params },
        },
        {
          name: 'Archives',
          url_name: 'archives',
          url: {name: 'archives', params: this.params}
        },
        {
          name: 'Setting',
          url_name: 'setting',
          url: { name: 'setting', params: this.params },
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    logout() {
      if (confirm('mau logout ?')) {
        this.$store.dispatch('user/Logout')
        this.$store.commit('TOGGLE_MENU')
      }
    },
  },
}
</script>

<style lang="postcss">
.transition-max-height {
  max-height: 500px;
  transition: max-height 2s ease;
}
.sidebar-menu {
  @apply fixed top-0 left-0 flex flex-col w-full md:w-1/3 lg:w-1/4 self-start items-start p-5 bg-gray-100 dark:bg-gray-600 h-screen shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 cursor-default
}
.selected-menu {
  @apply bg-blue-50 text-blue-500 dark:text-white dark:bg-gray-700 
}
</style>