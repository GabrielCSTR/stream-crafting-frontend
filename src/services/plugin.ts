import type { Router } from 'unplugin-vue-router'
import * as Endpoints from './endpoints'
import { OAuth } from './oauth'
import { Endpoint } from './rest'

type ApiEndpoints = typeof Endpoints

export type ApiType = {
  [k in keyof ApiEndpoints as Uncapitalize<k>]: ApiEndpoints[k]['prototype']
}

export interface APIPluginOptions<OAuthTokenData> {
  defaultEndpoint: string
  oauth: OAuth<OAuthTokenData>
  router: Router
  endpoints?: Record<keyof ApiType, string>
}

export function createApi<OAuthTokenData>(options: APIPluginOptions<OAuthTokenData>) {
  if (!options) {
    throw new Error('É necessário configurar a API em createApi()')
  }

  Endpoint.oauth = options.oauth
  Endpoint.router = options.router

  return Object.entries(Endpoints).reduce((api, [name, Constructor]) => {
    const uncapitalizedName = (name.charAt(0).toLowerCase() + name.slice(1)) as keyof ApiType

    const endpoint = options.endpoints?.[uncapitalizedName] ?? options.defaultEndpoint

    api[uncapitalizedName] = new Constructor(endpoint)

    return api
  }, {} as ApiType)
}
