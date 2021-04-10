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

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

firebase.auth().onAuthStateChanged((user) => {

  if (user) store.commit('user/SET_USER', user)
  else console.log('user belum login')

  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')

})

