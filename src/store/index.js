import Vue from 'vue'
import Vuex from 'vuex'

import user from './user';
import text from './text';
import textCollection from './textCollection';
import file from './file';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: false,
    currentScroll: 0,
    loading: false,
  },
  mutations: {
    everyScroll(state, value){
      state.currentScroll = value
    },
    TOGGLE_MENU(state){
      state.menu = !state.menu
    },
    SET_LOADING(state, value){
      state.loading = value
    },
    
  },
  modules: {
    user,
    text,
    textCollection,
    file
  }
})
