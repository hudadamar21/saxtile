<template>
  <section id="app-setting" class="w-full min-h-screen bg-gray-100 dark:bg-gray-800 pt-14 pl-5 transition-colors duration-200">
    <h1 class="font-bold text-2xl text-blue-500 dark:text-white mb-3 transition-colors duration-200">App Setting</h1>
    <ul class="w-full md:w-1/2 bg-white dark:bg-gray-600 px-3 rounded shadow">
      <li class="list-setting">
        <label class="label-title-setting">Order by</label>
        <div class="py-1">
          <SelectBase 
            :value="orderBy.property" 
            :options="['title','content','date']"
            @getvalue="(value) => orderBy.property = value"
          />
          <SelectBase 
            :value="orderBy.type" 
            :options="['asc','desc']"
            @getvalue="(value) => orderBy.type = value"
          />
        </div>
      </li>
      <li class="list-setting">
        <label class="label-title-setting">Darkmode</label>
        <div class="px-3 py-2">
          <ButtonSwitch 
            activeColor="bg-gray-500" 
            nonActiveColor="bg-blue-500" 
            :state="darkmode" 
            @switch="(value) => darkmode = value"
          />
        </div>
      </li>
    </ul>
  </section>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  components: {
    ButtonSwitch: () => import('@/components/ButtonSwitch'),
    SelectBase: () => import('@/components/SelectBase'),
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
        window.localStorage.setItem('setting', JSON.stringify(val))
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
      return this.$store.state.app_setting
    },
  },
  mounted() {
    const localSetting = JSON.parse(window.localStorage.getItem('setting'))
    const localDarkmode = JSON.parse(localStorage.getItem('darkmode'))

    this.darkmode = localDarkmode ? true : false

    if (localSetting) {
      this.SET_ORDER_BY(localSetting)
    }

    this.orderBy = {
      property: this.setting.orderBy.property,
      type: this.setting.orderBy.type,
    }
  },
  
  methods: {
    ...mapMutations('app_setting',['SET_ORDER_BY', 'SET_SETTING']),
  },
}
</script>

<style lang="postcss">
  .label-title-setting {
    @apply text-gray-700 dark:text-white transition-colors duration-200
  }
  .list-setting {
    @apply border-b dark:border-gray-700 py-3
  }
</style>