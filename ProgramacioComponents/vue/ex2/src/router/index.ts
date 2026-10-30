import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/register-1',
      name: 'register1',
      component: () => import('../views/Register1View.vue'),
    },
    {
      path: '/register-2',
      name: 'register2',
      component: () => import('../views/Register2View.vue'),
    },
  ],
})

export default router
