import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import user from './user';
import text from './text';
import text_collection from './text_collection';
import file from './file';
import firebase_actions from "./firebase_actions";
import app_setting from "./app_setting";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: false,
    loading: false,
    alert: {
      message: '',
      mode: ''
    }
  },
  getters: {
    messageOnArchives: () => (type) => {
      return router.currentRoute.name === 'archives' 
        ? type + ' Berhasil dikeluarkan dari Archive' 
        : type + ' Berhasil dimasukan kedalam Archive'
    }
  },
  mutations: {
    TOGGLE_MENU(state) {
      state.menu = !state.menu
    },
    SET_MENU(state, value) {
      state.menu = value
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_SHOW_ALERT(state, value) {
      state.alert = value
    }
  },
  actions: {
    showAlert({ commit }, { message, mode = 'info', duration = 3000 }) {
      commit('SET_SHOW_ALERT', { message, mode })
      setTimeout(() => {
        commit('SET_SHOW_ALERT', { message: '', mode: '' })
      }, duration);
    },
  },
  modules: {
    app_setting,
    firebase_actions,
    user,
    text,
    text_collection,
    file
  }
})
