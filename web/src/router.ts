import { createRouter, createWebHashHistory } from 'vue-router'
import { noAuthGuard } from './guards/auth'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: noAuthGuard
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: noAuthGuard
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
