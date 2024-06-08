import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { beforeEnterApp, beforeEnterAuth, beforeEnterHome } from './middlewares'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/LayoutHome.vue'),
    beforeEnter: beforeEnterHome,
    children: [
      {
        path: '',
        name: '/',
        component: () => import('@/pages/Index.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/app',
    component: () => import('@/layouts/LayoutApp.vue'),
    beforeEnter: beforeEnterApp,
    children: [
      {
        path: '',
        name: 'app',
        component: () => import('@/pages/app/Index.vue')
      }
    ]
  },
  {
    path: '/forgot',
    component: () => import('@/layouts/LayoutAuth.vue'),
    beforeEnter: beforeEnterAuth,
    children: [
      {
        path: '',
        name: 'forgot',
        component: () => import('@/pages/Forgot.vue')
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/layouts/LayoutAuth.vue'),
    beforeEnter: beforeEnterAuth,
    children: [
      {
        path: '',
        name: 'signin',
        component: () => import('@/pages/SignIn.vue')
      }
    ]
  },
  {
    path: '/signup',
    component: () => import('@/layouts/LayoutAuth.vue'),
    beforeEnter: beforeEnterAuth,
    children: [
      {
        path: '',
        name: 'signup',
        component: () => import('@/pages/SignUp.vue')
      }
    ]
  }
  /* {
    path: '*',
    name: 'not_found',
    component: () => import('@/pages/Errors/404.vue'),
  }, */
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
