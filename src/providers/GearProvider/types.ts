import { Item } from 'payload-types'

// Define the shape of the state
export interface GearState {
  weapon1: {
    primaryWeapon: { item: Item | null; rarity: string | null }
    secondaryWeapon: { item: Item | null; rarity: string | null }
  }
  weapon2: {
    primaryWeapon: { item: Item | null; rarity: string | null }
    secondaryWeapon: { item: Item | null; rarity: string | null }
  }
  head: { item: Item | null; rarity: string | null }
  necklace: { item: Item | null; rarity: string | null }
  hands: { item: Item | null; rarity: string | null }
  chest: { item: Item | null; rarity: string | null }
  back: { item: Item | null; rarity: string | null }
  ring1: { item: Item | null; rarity: string | null }
  legs: { item: Item | null; rarity: string | null }
  ring2: { item: Item | null; rarity: string | null }
  feet: { item: Item | null; rarity: string | null }
  utility1: { item: Item | null; rarity: string | null }
  utility2: { item: Item | null; rarity: string | null }
  utility3: { item: Item | null; rarity: string | null }
  utility4: { item: Item | null; rarity: string | null }
  utility5: { item: Item | null; rarity: string | null }
  utility6: { item: Item | null; rarity: string | null }
}

export type WeaponSlot = {
  primaryWeapon: { item: Item | null; rarity: string | null }
  secondaryWeapon: { item: Item | null; rarity: string | null }
}

export type GearSlots = keyof GearState

export interface GearStateForShare {
  w1pr?: string // string values for all
  w1sc?: string // item.id:rarity
  w2pr?: string
  w2sc?: string
  h?: string
  b?: string
  r1?: string
  l?: string
  r2?: string
  f?: string
  u1?: string
  u2?: string
  u3?: string
  u4?: string
  u5?: string
  u6?: string
}

export interface MarketBrowserTabsIsOpen {
  primaryWeapon: boolean
  secondaryWeapon: boolean
  head: boolean
  necklace: boolean
  hands: boolean
  chest: boolean
  back: boolean
  ring: boolean
  legs: boolean
  feet: boolean
  utility: boolean
}

export interface GearStore {
  fullStore: GearState
  shortStore: GearStateForShare
}

export type CharacterClass =
  | 'barbarian'
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'ranger'
  | 'rouge'
  | 'warlock'
  | 'wizard'

export type CharacterPerks = 'weaponSpecialist' | null
