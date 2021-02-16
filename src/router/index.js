import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'

import Main from '@/views/Main/index.vue'
import Auth from '@/views/Auth/index.vue'

import Collections from '@/views/Collections/index.vue'
import Setting from '@/views/Setting'

import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound},
  { path: '/user', redirect: '/' },
  {
    path: '/',
    name: 'auth',
    component: Auth,
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/user/:userId',
    name: 'main',
    component: Main,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:userId/collections',
    name: 'collections',
    component: Collections,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:userId/setting',
    name: 'setting',
    component: Setting,
    meta: {
      requiresAuth: true
    }
  }
  
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to auth page.
    if (!store.state.user.uid) {
      next({ name: 'Auth' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }

  if (to.matched.some(record => record.meta.hideForAuth)) {
    store.state.user.uid 
        ? next({ path: `user/${store.state.user.uid}` })
        : next()
  } else next()

})


export default router
