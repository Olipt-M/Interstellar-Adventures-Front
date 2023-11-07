import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/planets',
      name: 'planets',
      component: () => import('@/views/PlanetsListView.vue')
    },
    {
      path: '/planets/:id',
      name: 'planet',
      component: () => import('@/views/PlanetView.vue')
    },
    {
      path: '/recap',
      name: 'recap',
      component: () => import('@/views/RecapView.vue')
    },
    {
      path: '/my-account',
      name: 'account',
      component: () => import('@/views/AccountView.vue')
    }
  ]
})

export default router
