import { Crud } from '../rest'
import type { Hud } from '../models'
import type { Params } from '../rest'
import type { AxiosRequestConfig } from 'axios'

export class Huds extends Crud<Hud> {
  constructor(endpoint: string) {
    super(endpoint, 'huds')
  }

  // Método público para buscar HUD por ID (usado no overlay do OBS)
  findOnePublic(id = '', params: Params = {}, config: AxiosRequestConfig = {}) {
    return this.request<Hud>({
      method: 'GET',
      url: `public/${String(id)}`,
      params,
      public: true, // Marca como rota pública para não enviar token
      ...config
    })
  }
}
