import Vue from 'vue'
import Vuex from 'vuex'

import user from './user';
import text from './text';
import text_collection from './text_collection';
import file from './file';
import firebase_actions from "./firebase_actions";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: false,
    loading: false,
    setting: {
      orderBy: {
        property: 'date',
        type: 'desc'
      }
    },
    alert: {
      message: '',
      mode: ''
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
    SET_SETTING(state, value) {
      state.setting = value
    },
    SET_ORDER_BY(state, value) {
      state.setting.orderBy = value
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
    }
  },
  modules: {
    firebase_actions,
    user,
    text,
    text_collection,
    file
  }
})
