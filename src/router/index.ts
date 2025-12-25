import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import {
  beforeEnterApp,
  beforeEnterAuth,
  createMiddlewarePipeline,
  type NavigationGuard,
  type NavigationGuardContext
} from './middlewares'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/LayoutHome.vue'),
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
    meta: {
      middleware: beforeEnterApp
    },
    children: [
      {
        path: '',
        name: 'app',
        component: () => import('@/pages/app/Index.vue')
      },
      {
        path: 'welcome',
        name: 'app-welcome',
        component: () => import('@/pages/app/Welcome.vue')
      },
      {
        path: 'huds',
        name: 'huds-page',
        component: () => import('@/pages/app/Huds/Index.vue'),
        children: [
          {
            path: '',
            name: 'huds-list',
            component: () => import('@/pages/app/Huds/List.vue')
          },
          {
            path: 'templates',
            name: 'huds-templates',
            component: () => import('@/pages/app/Huds/Templates.vue')
          },
          {
            path: 'preview',
            name: 'huds-preview',
            component: () => import('@/pages/app/Huds/Preview.vue')
          },
          {
            path: 'new',
            name: 'huds-new',
            component: () => import('@/pages/app/Huds/New.vue')
          },
          {
            path: ':hudId',
            component: () => import('@/pages/app/Huds/Item.vue'),
            children: [
              {
                path: '',
                name: 'huds-item',
                component: () => import('@/pages/app/Huds/Item/Index.vue')
              },
              {
                path: 'editor',
                name: 'huds-item-edit',
                component: () => import('@/pages/app/Huds/Item/Editor.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'profile',
        name: 'app-profile',
        component: () => import('@/pages/app/Profile.vue')
      }
    ]
  },
  {
    path: '/forgot',
    component: () => import('@/layouts/LayoutAuth.vue'),
    meta: {
      middleware: beforeEnterAuth
    },
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
    meta: {
      middleware: beforeEnterAuth
    },
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
    meta: {
      middleware: beforeEnterAuth
    },
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) {
    const middlewaresQueue: NavigationGuard[] = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

    const context: NavigationGuardContext = { to, from, next }

    await createMiddlewarePipeline(context, middlewaresQueue)
  } else {
    next()
  }
})

export default router
