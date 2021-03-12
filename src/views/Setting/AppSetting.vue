<template>
  <section id="app-setting" class="w-full min-h-screen bg-gray-100 dark:bg-gray-800 pt-14 pl-5">
    <h1 class="font-bold text-2xl text-blue-500 dark:text-white mb-3">App Setting</h1>
    <ul class="w-full md:w-1/2 bg-white dark:bg-gray-600 px-3 rounded shadow">
      <li class="border-b dark:border-gray-700 py-3">
        <label class="text-gray-700 dark:text-white">Order by</label>
        <div class="py-1">
          <select 
            id="orderby" 
            v-model="orderBy.property" 
            class="dark:bg-gray-500 dark:text-white px-3 py-1 rounded border dark:border-gray-700 mr-2 focus:outline-none focus:border-blue-500">
            <option value="title">title</option>
            <option value="content">content</option>
            <option value="date">date</option>
          </select>
          <select 
            id="ordertype" 
            v-model="orderBy.type" 
            class="dark:bg-gray-500 dark:text-white px-3 py-1 rounded border dark:border-gray-700 mr-2 focus:outline-none focus:border-blue-500">
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </li>
      <li class="border-b dark:border-gray-700 py-3">
        <label class="text-gray-700 dark:text-white">Darkmode</label>
        <div class="px-3 py-2">
          <SwitchButton :state="darkmode" @switch="(value) => darkmode = value"/>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  components: {
    SwitchButton: () => import('@/components/SwitchButton')
  },
  data() {
    return {
      orderBy: {
        property: '',
        type: '',
      },
      darkmode: false
    }
  },
  watch: {
    orderBy: {
      handler(val) {
        this.SET_ORDER_BY(val)
        window.localStorage.setItem('setting', JSON.stringify(this.setting))
      },
      deep: true,
    },
    darkmode(newval){
      if(newval){
        document.querySelector('body').classList.add('dark')
        localStorage.setItem('darkmode', true)
      } else {
        document.querySelector('body').classList.remove('dark')
        localStorage.setItem('darkmode', false)
      }
    }
  },
  computed: {
    setting() {
      return this.$store.state.setting
    },
  },
  mounted() {
    const localSetting = JSON.parse(window.localStorage.getItem('setting'))
    const localDarkmode = JSON.parse(localStorage.getItem('darkmode'))

    this.darkmode = localDarkmode ? true : false

    if (localSetting) {
      this.$store.commit('SET_SETTING', localSetting)
    }

    this.orderBy = {
      property: this.setting.orderBy.property,
      type: this.setting.orderBy.type,
    }
  },
  
  methods: {
    ...mapMutations(['SET_ORDER_BY']),
  },
}
</script>

<style>

</style>