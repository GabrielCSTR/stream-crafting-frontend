import type { User } from '@/services/models'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('profile', {
  state: () => ({
    user: null as null | User,
    language: window.navigator.language
  }),
  actions: {
    clear() {
      this.user = null
    }
  }
})
