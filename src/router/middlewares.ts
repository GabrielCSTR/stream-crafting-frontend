import { useSessionStore } from '@/stores/session'
import { api, storage } from '@/plugins/services'
import { parseJWT } from '@/utils'
import type { IToken } from '@/types'
import type {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric
} from 'vue-router'

export interface NavigationGuardContext {
  to: RouteLocationNormalizedGeneric
  from: RouteLocationNormalizedLoadedGeneric
  next: NavigationGuardNext
}

export type NavigationGuard = (ctx: NavigationGuardContext) => Promise<any> | any

export async function createMiddlewarePipeline(
  context: NavigationGuardContext,
  middlewares: NavigationGuard[]
) {
  const routerNext = context.next

  const executeMiddleware = async (index: number) => {
    if (index >= middlewares.length) {
      return routerNext()
    }

    const currentMiddleware = middlewares[index]

    context.next = (args?: any) => {
      if (args) {
        return routerNext(args)
      }

      return executeMiddleware(index + 1)
    }

    await currentMiddleware(context)
  }

  await executeMiddleware(0)
}

export const beforeEnterHome: NavigationGuard = async ({ next }) => {
  /* const token = storage.get()

  if (token?.accessToken) {
    return next('/app')
  } */

  return next()
}

export const beforeEnterAuth: NavigationGuard = ({ next }) => {
  const token = storage.get()

  if (token?.accessToken) {
    return next('/app')
  }

  return next()
}

export const beforeEnterApp: NavigationGuard = async ({ to, next }) => {
  const sessionStore = useSessionStore()

  let location: string | boolean = '/signin'

  if (sessionStore.user?._id) {
    if (to.path === '/app') {
      return next('/app/welcome')
    }

    return next()
  }

  const { accessToken } = storage.get() || {}

  let token: IToken | null = null

  if (accessToken) token = parseJWT<IToken>(accessToken)

  if (token) {
    location = await api.users
      .findOne(token?.email)
      .then((user) => {
        sessionStore.user = user

        return false
      })
      .catch(() => {
        return '/signin'
      })
  }

  return next(location as any)
}
