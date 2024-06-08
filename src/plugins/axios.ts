import { type ApiType, createApi } from '@/services/plugin'

import { type AuthenticationResponse, OAuth, OAuthLocalStorage } from '@/services/oauth'
import type { PluginContext } from '@/types'

const baseURL = `http://localhost:3000/api/v1`

let api: ApiType

let oauth: OAuth<AuthenticationResponse>

const storage = new OAuthLocalStorage()

export default function ({ router }: PluginContext) {
  oauth = new OAuth<AuthenticationResponse>({
    tokenUrl: `${baseURL}/auth/login`,
    storage
  })

  api = Object.freeze(
    createApi<AuthenticationResponse>({
      defaultEndpoint: baseURL,
      router,
      oauth
    })
  )
}

export { api, oauth, storage }
