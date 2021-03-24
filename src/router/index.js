import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  { path: '*', component: () => import('@/views/NotFound.vue') },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth/index.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/:userId',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/Main/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:userId/collections',
    name: 'collections',
    component: () => import(/* webpackChunkName: "collections" */ '@/views/Collections/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:userId/archives',
    name: 'archives',
    component: () => import(/* webpackChunkName: "archives" */ '@/views/Archives/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:userId/setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "setting" */ '@/views/Setting/index.vue'),
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
    !store.state.user.uid 
      ? next({ name: 'auth' }) 
      : next()
  } else next()

  if (to.matched.some(record => record.meta.hideForAuth)) {
    store.state.user.uid
      ? next({ name: 'main', params: { userId: store.state.user.uid } })
      : next()
  } else next()
})

export default router
