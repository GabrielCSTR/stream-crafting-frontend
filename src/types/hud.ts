import { generateListeners } from '../utils'

export type IHUDElementComponents = 'text' | 'image' | 'playerCard' | 'scoreBoard' | 'draftPanel' | 'gameTimer' | 'teamBanner'

interface IHUDElementData {
  id: string
  isShowed: boolean
  backgroundColor?: string
  color: string
  maintainAspectRatio: boolean
  layer: number
  groupId?: string
  transparentBackground?: boolean
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
  component: IHUDElementComponents
}

export interface IHUDElement<D = any> extends IHUDElementBase {
  data: D
}

export interface INormalizedHUDElementBind<D = any> extends IHUDElementData {
  active: boolean
  disable: boolean
  isInsideBoundingBox: boolean
  data: D
}

export interface INormalizedHUDElement<D = any> {
  id: string
  index: number
  component: IHUDElementComponents
  bind: INormalizedHUDElementBind<D>
  on: ReturnType<typeof generateListeners<HUDElementBaseEmits>>
}

export type HUDElementBaseProps<D = any> = INormalizedHUDElementBind<D>

export type HUDElementBaseEmits = {
  'update:position': [payload: INormalizedHUDElementBind['position']]
  'update:size': [payload: INormalizedHUDElementBind['size']]
  'update:is-showed': [payload: INormalizedHUDElementBind['isShowed']]
  'update:layer': [payload: INormalizedHUDElementBind['layer']]
  'update:group': [payload: string | undefined]
  'delta:position': [payload: { dx: number; dy: number }]
  click: [payload: MouseEvent]
}

export type HUDElementTextProps = HUDElementBaseProps<{ text: string }>

export type HUDElementImageProps = HUDElementBaseProps<{ src: string }>
