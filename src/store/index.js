import Vue from 'vue'
import Vuex from 'vuex'

import user from './user';
import text from './text';
import text_collection from './text_collection';
import file from './file';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: false,
    loading: false,
    setting: {
      orderBy: ['date','desc']
    }
  },
  mutations: {
    TOGGLE_MENU(state){
      state.menu = !state.menu
    },
    SET_LOADING(state, value){
      state.loading = value
    },
    SET_SETTING(state, value){
      state.setting = value
    },
    SET_ORDER_BY(state, value){
      state.setting.orderBy = value
      window.localStorage.setItem('setting',state.setting)
    }
  },
  modules: {
    user,
    text,
    text_collection,
    file
  }
})
