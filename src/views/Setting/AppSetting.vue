<template>
  <section id="app-setting" class="w-full min-h-screen bg-gray-100 pt-14 pl-5">
    <h1 class="font-bold text-2xl text-gray-500 mb-3">App Setting</h1>
    <ul class="w-full md:w-1/2 bg-white p-3 rounded shadow">
      <li>
        <label for="orderby">Order by</label>
        <div>
          <select id="orderby" v-model="orderBy.property">
            <option value="title">title</option>
            <option value="content">content</option>
            <option value="date">date</option>
          </select>
          <select id="ordertype" v-model="orderBy.type">
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>
          </select>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      orderBy: {
        property: '',
        type: '',
      },
    }
  },
  computed: {
    setting() {
      return this.$store.state.setting
    },
  },
  mounted() {
    const localSetting = JSON.parse(window.localStorage.getItem('setting'))

    if (localSetting) {
      this.$store.commit('SET_SETTING', localSetting)
    }

    this.orderBy = {
      property: this.setting.orderBy.property,
      type: this.setting.orderBy.type,
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
  },
  methods: {
    ...mapMutations(['SET_ORDER_BY']),
  },
}
</script>

<style>

</style>