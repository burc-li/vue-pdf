import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/html2canvas',
      meta:{
        hidden: true
      }
    },
    {
      path: '/html2canvas',
      name: 'html2canvas',
      component: () => import('../views/html2canvas.vue')
    },
    {
      path: '/jspdf',
      name: 'jspdf',
      component: () => import('../views/jspdf.vue')
    }
  ]
})

export default router
