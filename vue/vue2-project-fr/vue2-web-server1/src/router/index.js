import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const staticRouter = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    // hidden: true,
  },
  {
    path: '/',
    component: () => import('@/views/home')
  },
  {
    path: '/home',
    component: () => import('@/views/home')
  },
  {
    path: '/falls',
    component: () => import('@/views/falls-flow')
  },
  // {
  //   path: '/spark',
  //   component: () => import('@/views/spark')
  // },
  {
    path: '/clock',
    component: () => import('@/views/clock')
  }
]

const createRuter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  // base: process.env.VUE_APP_BASE_API,
  routes: [
    ...staticRouter,
  ]
})

const router = createRuter()


export default router