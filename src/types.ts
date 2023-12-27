import type { Timestamp } from 'firebase/firestore'
import type { App } from 'vue'
import type {
  RouteRecordRaw,
  Router,
  RouterOptions as VueRouterOptions,
} from 'vue-router'

type PartialKeys<T, Keys extends keyof T> = Omit<T, Keys> &
  Partial<Pick<T, Keys>>

export interface ViteVueContext {
  app: App<Element>
  router: Router
  routes: Readonly<RouteRecordRaw[]>
  initialState: Record<string, any>
  isClient: boolean
  onSSRAppRendered(cb: Function): void
  triggerOnSSRAppRendered(
    route: string,
    appHTML: string,
    appCtx: ViteVueContext
  ): Promise<unknown[]>
  routePath?: string
}

export type UserModule = (ctx: ViteVueContext) => void

export type RouterOptions = PartialKeys<VueRouterOptions, 'history'> & {
  base?: string
}

export interface ViteVuaAppClientOptions {
  useHead?: boolean
  /**
   * The app root container query selector.
   *
   * @default `#app`
   */
  rootContainer?: string | Element
}
export interface DBAddress {
  coordinate: number[]
  displayName: string
  description: string
  id: string
  ownerId: string
}

export interface DBProduct {
  id: string
  title: string
  picture: string
  price: number
  description: string
  subtitle: string
}

export interface MapAddress {
  amenity: string
  road: string
  neighbourhood: string
  suburb: string
  borough: string
  city: string
  district: string
  county: string
  province: string
  ISO3166_2_lvl4: string
  postcode: string
  country: string
  country_code: string
}

export interface Location {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  lat: string
  lon: string
  class: string
  type: string
  place_rank: number
  importance: number
  addresstype: string
  name: string
  display_name: string
  address: MapAddress
  boundingbox?: (string)[] | null
}
export interface ModelType {
  id: string
  name: string
}
export interface DBOrder {
  statusDone: boolean
  product: Product
  address: Address
  quantity: number
  createdAt: CreatedAt
  ownerId: string
  id: string
}
export interface Product {
  title: string
  subtitle: string
  price: number
  picture: string
  description: string
}
export interface Address {
  ownerId: string
  description: string
  displayName: string
  coordinate?: (number)[] | null
  createdAt: CreatedAt
  updatedAt: string
}
export interface CreatedAt {
  seconds: number
  nanoseconds: number
}
export interface Message {
  id: string
  sender: string
  msg: string
  contact: string
  createdAt: Timestamp
}
