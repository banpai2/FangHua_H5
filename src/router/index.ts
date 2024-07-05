import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/profile'
    },
    {
      path: '/profile',
      component: () => import('../views/ProfileEdit.vue'),
      meta: { title: '个人资料' }
    },
    {
      path: '/address',
      component: () => import('../views/AddressManager.vue'),
      meta: { title: '地址列表' }
    },
    {
      path: '/address/edit/:id?',
      component: () => import('../views/AddressEdit.vue'),
      meta: { title: '地址管理' }
    }
  ]
})

export default router
