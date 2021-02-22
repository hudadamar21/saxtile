import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '*', component: () => import('@/views/NotFound.vue') },
  { path: '/user', redirect: '/' },
  {
    path: '/',
    name: 'auth',
    component: () => import('@/views/Auth/index.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/user/:userId',
    name: 'main',
    component: () => import('@/views/Main/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:userId/collections',
    name: 'collections',
    component: () => import('@/views/Collections/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:userId/setting',
    name: 'setting',
    component: () => import('@/views/Setting'),
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

// _ = from
router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {

    // if not, redirect to auth page.
    if (!store.state.user.uid) {
      next({ name: 'Auth' })
    } else {
      next()
    }
  } else {
    next()
  }

  if (to.matched.some(record => record.meta.hideForAuth)) {
    store.state.user.uid
      ? next({ path: `user/${store.state.user.uid}` })
      : next()
  } else next()

})


export default router
