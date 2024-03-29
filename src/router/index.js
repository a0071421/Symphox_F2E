import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/home/checkOrder',
        name: 'CheckOrder',
        component: () => import('@/views/CheckOrder.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/home/createOrder',
        name: 'CreateOrder',
        component: () => import('@/views/CreateOrder.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
