export type IHUDElementComponents = 'text'

interface IHUDElementData {
  backgroundColor: string
  color: string
  position: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
}

export interface IHUDElementBase extends IHUDElementData {
  id: string
  component: IHUDElementComponents
}

export interface IHUDElement<D> extends IHUDElementBase {
  data: D
}

export type INormalizedHUDElementBind<D = any> = IHUDElementData & { data: D }

export type IHUDText = INormalizedHUDElementBind<{ text: string }>

export interface INormalizedHUDElement<D = any> {
  id: string
  index: number
  component: IHUDElementComponents
  bind: INormalizedHUDElementBind<D>
  on: {
    'update:position'(newValue: IHUDElementData['position']): void
    'update:size'(newValue: IHUDElementData['size']): void
  }
}
