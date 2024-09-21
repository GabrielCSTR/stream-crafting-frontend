import { useSessionStore } from '@/stores/session'
import { api, storage } from '@/plugins/axios'
import { parseJWT } from '@/utils'
import type { IToken } from '@/types'
import type { NavigationGuardWithThis } from 'vue-router'

export const beforeEnterHome: NavigationGuardWithThis<void> = async (_to, __from, next) => {
  /* const token = storage.get()

  if (token?.accessToken) {
    return next('/app')
  } */

  return next()
}

export const beforeEnterAuth: NavigationGuardWithThis<void> = (_to, __from, next) => {
  const token = storage.get()

  if (token?.accessToken) {
    return next('/app')
  }

  return next()
}

export const beforeEnterApp: NavigationGuardWithThis<void> = async (to, __from, next) => {
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

        return true
      })
      .catch(() => {
        return '/signin'
      })
  }

  return next(location as any)
}
