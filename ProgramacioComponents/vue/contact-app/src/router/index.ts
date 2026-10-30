import { createRouter, createWebHistory } from 'vue-router'
import ContactesView from '@/views/ContactesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ContactesView,
    },
    {
      path: '/grups',
      component: () => import('@/views/GrupsView.vue'),
    },
    {
      path: '/historial',
      component: () => import('@/views/HistorialView.vue'),
    },
    {
      path: '/favorits',
      component: () => import('@/views/FavoritsView.vue'),
    },
    {
      path: '/estadistiques',
      component: () => import('@/views/EstadistiquesView.vue'),
    },
  ],
})

export default router
