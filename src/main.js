import Vue from 'vue'
import './registerServiceWorker'
import '@/assets/css/index.css'

import store from './store'
import firebase from 'firebase/app';
import 'firebase/auth';

import './config';

import App from './App.vue'
import router from './router'

import setTitle from "@/mixins/set_title";

Vue.config.productionTip = false

Vue.mixin(setTitle)

// Global Components
const components = ['Button','ButtonCircle', 'Input', 'Layout','List','Skeleton','SVGIcon','Modal']
components.forEach(comp => 
	Vue.component(comp, 
		() => import(/* webpackChunkName: "components" */ `@/components/global/${comp}`)
	)
)

firebase.auth().onAuthStateChanged((user) => {

  if (user) store.commit('user/SET_USER', user)
  else console.log('user belum login')

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')

})

