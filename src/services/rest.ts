/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios'
import type { AxiosRequestConfig, AxiosInstance, AxiosStatic } from 'axios'
import { ACCESS_DENIED, OAuth, UNAUTHORIZED } from './oauth'
import { type IPagination } from './pagination'
import type { Entity } from './extendables'
import type { Router } from 'unplugin-vue-router'

declare module 'axios' {
  interface AxiosRequestConfig {
    public?: boolean
  }
}

export type Params = Record<string, any>

export type {
  IPagination,
  IPaginationOrder,
  IPaginationParams,
  IPaginationSearch,
  IPaginationSort
} from './pagination'

export class Endpoint {
  static oauth: OAuth<any>
  static axios: AxiosStatic = axios
  static router: Router

  axios: AxiosInstance

  static join(...urls: string[]) {
    return urls.map((url) => url.replace(/^\/+|\/+$/gm, '')).join('/')
  }

  constructor(endpoint: string, route: string, options: AxiosRequestConfig = {}) {
    this.axios = Endpoint.axios.create({
      baseURL: Endpoint.join(endpoint, route),
      ...options
    })

    // Envia o token OAuth em rotas protegidas
    if (!options.public) {
      this.axios.interceptors.request.use(async (req) => {
        if (req.public || req.headers?.Authorization) {
          return req
        }

        try {
          const token = await Endpoint.oauth.getOrRefreshToken()

          req.headers!.Authorization = `Bearer ${token?.accessToken}`
        } catch (err) {
          await Endpoint.oauth.config.storage?.del()

          await Endpoint.router.replace(`/signin?redirect=${window.location.pathname}`)

          return err as Promise<any>
        }

        return req
      })
    }

    // Error handler
    this.axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        // Atualiza o token se estiver expirado
        const { message = '', type = '' } = err.response?.data || {}

        const loweredMessage = message.toLowerCase()
        const loweredType = type.toLowerCase()

        if (
          loweredMessage === ACCESS_DENIED.MESSAGE.toLowerCase() &&
          ACCESS_DENIED.TYPES.includes(loweredType)
        ) {
          void Endpoint.router.push(ACCESS_DENIED.FALLBACK_ROUTE)
        }

        if (
          loweredMessage === UNAUTHORIZED.MESSAGE.toLowerCase() &&
          UNAUTHORIZED.TYPES.includes(loweredType)
        ) {
          await Endpoint.oauth.getOrRefreshToken(true).catch((err: Error) => {
            void Endpoint.oauth.clear()

            window.location.href = UNAUTHORIZED.FALLBACK_ROUTE(window.location.pathname)

            return Promise.reject(err)
          })

          return this.axios(err.request)
        }

        return Promise.reject(err)
      }
    )
  }

  async request<T = unknown>(config: AxiosRequestConfig = {}): Promise<T> {
    const res = await this.axios.request(config)

    return res.data
  }
}

export class Crud<T extends Entity> extends Endpoint {
  constructor(endpoint: string, route: string, config: AxiosRequestConfig = {}) {
    super(endpoint, route, config)
  }

  find(params: Params = {}, config: AxiosRequestConfig = {}) {
    return this.request<IPagination<T>>({
      method: 'GET',
      url: '/',
      params,
      ...config
    })
  }

  findOne(id = '', params: Params = {}, config: AxiosRequestConfig = {}) {
    return this.request<T>({
      method: 'GET',
      url: String(id),
      params,
      ...config
    })
  }

  create(data: Partial<T>, params: Params = {}, config = {} as AxiosRequestConfig) {
    return this.request<T>({
      method: 'POST',
      url: '/',
      data,
      params,
      ...config
    })
  }

  update(data: Partial<T>, params: Params = {}, config = {} as AxiosRequestConfig) {
    return this.request<T>({
      method: 'PATCH',
      url: data._id,
      data,
      params,
      ...config
    })
  }

  delete(id: string, params: Params = {}, config = {} as AxiosRequestConfig) {
    return this.request<T>({
      method: 'DELETE',
      url: id,
      params,
      ...config
    })
  }

  save(data: Partial<T>, params: Params = {}, config = {} as AxiosRequestConfig) {
    if (data._id) {
      return this.update(data, params, config)
    } else {
      return this.create(data, params, config)
    }
  }
}
