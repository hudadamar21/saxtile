import Vue from 'vue'
import './registerServiceWorker'
import '@/assets/css/index.css'

import store from './store'
import firebase from 'firebase/app';
import 'firebase/auth';

import './config';

import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// store.commit('SET_SETTING', JSON.parse())

firebase.auth().onAuthStateChanged((user) => {

  if(user) store.dispatch('user/UserCommit', user) 
  else console.log('user belum login')

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')

})

