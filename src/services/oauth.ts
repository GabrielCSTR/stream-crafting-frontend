/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/unbound-method */

import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'
import useCrypt, { ENCRYPTION_KEY } from '@/composables/useCrypt'
import { parseJWT } from '@/utils'

export const UNAUTHORIZED = {
  CODE: 401,
  FALLBACK_ROUTE: (redirect_url: string) => `/signin?redirect=${redirect_url}`,
  MESSAGE: 'Access denied',
  TYPES: ['user_or_password_wrong', 'invalid_user', 'invalid_token']
}

export const ACCESS_DENIED = {
  CODE: 403,
  FALLBACK_ROUTE: '/401',
  MESSAGE: 'Access denied',
  TYPES: ['forbidden']
}

const DEFAULT_STORAGE_KEY = 'stream-crafting-token'

export interface AuthenticationResponse {
  access_token: string
  refresh_token: string
}

export interface OAuthOptions {
  tokenUrl: string
  storage?: OAuthStorage
  hashIdentifier?: string
  useRefreshToken?: boolean
  isValid?(token: OAuthToken): Promise<boolean>
  extractor?(response: AxiosResponse<AuthenticationResponse>): Promise<OAuthToken>
}

export interface OAuthToken {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export interface OAuthStorage {
  get(): Promise<OAuthToken | undefined | null> | OAuthToken | undefined | null
  set(token: OAuthToken): Promise<OAuthToken> | OAuthToken
  del(): Promise<void> | void
}

export interface OAuthGrantType<OAuthTokenData> {
  handle(request: AxiosRequestConfig, oauth: OAuth<OAuthTokenData>): AxiosRequestConfig
}

export interface UserToken {
  email: string
  iat: number
  exp: number
}

export class PasswordGrant implements OAuthGrantType<AuthenticationResponse> {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly scope: string[] = []
  ) {}

  handle(req: AxiosRequestConfig) {
    req.data = {
      grant_type: 'password',
      email: this.email,
      password: this.password
    }

    return req
  }
}

export class RefreshTokenGrant implements OAuthGrantType<AuthenticationResponse> {
  constructor(public readonly refreshToken: string) {}

  handle(req: AxiosRequestConfig) {
    req.data = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken
    })

    return req
  }
}

export class OAuthLocalStorage implements OAuthStorage {
  constructor(
    public readonly key: string = DEFAULT_STORAGE_KEY,
    private readonly encryptionKey = ENCRYPTION_KEY
  ) {}

  get() {
    const encrypted = localStorage.getItem(this.key)

    const { decrypt } = useCrypt(this.encryptionKey)

    let data: OAuthToken | null = null

    if (encrypted) {
      data = JSON.parse(decrypt(encrypted))
    }

    return data
  }

  set(token: OAuthToken) {
    const tokenStringified = JSON.stringify(token)

    const { encrypt } = useCrypt(this.encryptionKey)

    const tokenEncrypted = encrypt(tokenStringified)

    console.log(tokenEncrypted)

    localStorage.setItem(this.key, tokenEncrypted)

    return token
  }

  del(): void {
    localStorage.removeItem(this.key)
  }
}

export class OAuth<OAuthTokenData> {
  lastRefreshTokenRequest: Promise<OAuthToken> | null = null

  constructor(
    public readonly config: OAuthOptions,
    public readonly axiosInstance: AxiosInstance = axios.create({
      baseURL: config.tokenUrl
    })
  ) {
    this.config.useRefreshToken ??= false

    this.config.storage ??= new OAuthLocalStorage(DEFAULT_STORAGE_KEY, config.hashIdentifier)

    this.config.isValid ??= async ({ expiresAt }) => expiresAt > Date.now()

    this.config.extractor ??= async ({ data }) => {
      const expiresAt = data.access_token && parseJWT<UserToken>(data.access_token).exp

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: (expiresAt || 0) * 1000
      } as OAuthToken
    }
  }

  async request(grant: OAuthGrantType<OAuthTokenData>): Promise<OAuthToken> {
    const response = await this.axiosInstance(grant.handle({ method: 'POST' }, this))

    return this.config.extractor!(response)
  }

  async requestAndSave(grant: OAuthGrantType<OAuthTokenData>): Promise<OAuthToken> {
    const token = await this.request(grant)

    return this.config.storage!.set(token)
  }

  async sso(authenticationResponse: AuthenticationResponse) {
    const token = await this.config.extractor!({
      data: authenticationResponse
    } as AxiosResponse)

    return this.config.storage!.set(token)
  }

  async refreshAccessToken() {
    if (!this.config.useRefreshToken) {
      return Promise.reject(new Error(UNAUTHORIZED.MESSAGE))
    }

    if (!this.lastRefreshTokenRequest) {
      this.lastRefreshTokenRequest = new Promise<OAuthToken>((resolve, reject) => {
        try {
          const token = this.config.storage!.get() as OAuthToken | null | undefined

          const refreshToken = token?.refreshToken

          resolve(this.requestAndSave(new RefreshTokenGrant(refreshToken!)))
        } catch (error) {
          reject(error)
        }
      }).finally(() => (this.lastRefreshTokenRequest = null))
    }

    return this.lastRefreshTokenRequest
  }

  async getOrRefreshToken(refreshToken = false) {
    const token = await this.config.storage!.get()

    if (!refreshToken && token?.accessToken && (await this.config.isValid!(token))) {
      return token
    }

    return this.refreshAccessToken()
  }

  clear() {
    return this.config.storage?.del()
  }
}
