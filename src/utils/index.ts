import { storage } from '@/plugins/axios'
import { useSessionStore } from '@/stores/session'
import router from '@/router'

export function parseJWT<T>(token: string): T {
  const base64Url = token.split('.')[1]

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

  const buff = Buffer.from(base64, 'base64')

  const payloadinit = buff.toString('ascii')

  return JSON.parse(payloadinit)
}

export function logout() {
  const sessionStorage = useSessionStore()

  sessionStorage.clear()

  storage.del()

  void router.replace('/')
}
