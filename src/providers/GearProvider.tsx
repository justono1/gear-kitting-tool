'use client'

import { Item } from 'payload-types'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

// Define the shape of the state
interface GearState {
  weapon1: { primaryWeapon: Item | null; secondaryWeapon: Item | null } | null
  weapon2: { primaryWeapon: Item | null; secondaryWeapon: Item | null } | null
  head: Item | null
  necklace: Item | null
  hands: Item | null
  chest: Item | null
  back: Item | null
  ring1: Item | null
  legs: Item | null
  ring2: Item | null
  feet: Item | null
  utility1: Item | null
  utility2: Item | null
  utility3: Item | null
  utility4: Item | null
  utility5: Item | null
  utility6: Item | null
}

type WeaponSlot = { primaryWeapon: Item | null; secondaryWeapon: Item | null }

export type GearSlots = keyof GearState

// Define the initial state
const initialState: GearState = {
  weapon1: { primaryWeapon: null, secondaryWeapon: null },
  weapon2: { primaryWeapon: null, secondaryWeapon: null },
  head: null,
  necklace: null,
  hands: null,
  chest: null,
  back: null,
  ring1: null,
  legs: null,
  ring2: null,
  feet: null,
  utility1: null,
  utility2: null,
  utility3: null,
  utility4: null,
  utility5: null,
  utility6: null,
}

const gearScoreTable: { [key: string]: { [rarity: string]: number } } = {
  primaryWeapon: {
    poor: 1,
    common: 2,
    uncommon: 27,
    rare: 36,
    epic: 54,
    legendary: 72,
    unique: 125,
  },
  twoHanded: {
    poor: 2,
    common: 4,
    uncommon: 45,
    rare: 60,
    epic: 90,
    legendary: 120,
    unique: 175,
  },
  secondaryWeapon: {
    poor: 1,
    common: 2,
    uncommon: 21,
    rare: 28,
    epic: 42,
    legendary: 56,
    unique: 100,
  },
  head: {
    poor: 1,
    common: 1,
    uncommon: 12,
    rare: 16,
    epic: 24,
    legendary: 32,
    unique: 40,
  },
  hands: {
    poor: 1,
    common: 1,
    uncommon: 12,
    rare: 16,
    epic: 24,
    legendary: 32,
    unique: 40,
  },
  feet: {
    poor: 1,
    common: 1,
    uncommon: 12,
    rare: 16,
    epic: 24,
    legendary: 32,
    unique: 40,
  },
  chest: {
    poor: 1,
    common: 1,
    uncommon: 15,
    rare: 20,
    epic: 30,
    legendary: 40,
    unique: 50,
  },
  legs: {
    poor: 1,
    common: 1,
    uncommon: 15,
    rare: 20,
    epic: 30,
    legendary: 40,
    unique: 50,
  },
  back: {
    poor: 1,
    common: 1,
    uncommon: 15,
    rare: 20,
    epic: 30,
    legendary: 40,
    unique: 50,
  },
  necklace: {
    poor: 0,
    common: 0,
    uncommon: 9,
    rare: 12,
    epic: 18,
    legendary: 24,
    unique: 30,
  },
  ring: {
    poor: 0,
    common: 0,
    uncommon: 9,
    rare: 12,
    epic: 18,
    legendary: 24,
    unique: 30,
  },
  utility: {
    poor: 0,
    common: 0,
    uncommon: 6,
    rare: 8,
    epic: 12,
    legendary: 16,
    unique: 20,
  },
}

// Define action types
const UPDATE_SLOT = 'UPDATE_SLOT'
const DELETE_SLOT = 'DELETE_SLOT'
const DELETE_WEAPON = 'DELETE_WEAPON'

// Define the shape of the actions
interface UpdateSlotAction {
  type: typeof UPDATE_SLOT
  payload: {
    slot: keyof GearState
    data: Item | null
  }
}

interface DeleteSlotAction {
  type: typeof DELETE_SLOT
  payload: {
    slot: keyof GearState
  }
}

interface DeleteWeaponAction {
  type: typeof DELETE_WEAPON
  payload: {
    slot: 'weapon1' | 'weapon2'
    weaponType: 'primaryWeapon' | 'secondaryWeapon'
  }
}

type GearAction = UpdateSlotAction | DeleteSlotAction | DeleteWeaponAction

// Helper function to find the first available slot
const findFirstAvailableSlot = (state: GearState, item: Item): keyof GearState | null => {
  const slotTypeMapping: { [key: string]: GearSlots[] } = {
    ring: ['ring1', 'ring2'],
    utility: ['utility1', 'utility2', 'utility3', 'utility4', 'utility5', 'utility6'],
  }

  const slots = slotTypeMapping[item.slot]
  if (slots) {
    for (const slot of slots) {
      if (state[slot] === null) {
        return slot
      }
    }
    return null
  }

  if (item.slot === 'primaryWeapon' || item.slot === 'secondaryWeapon') {
    const checkTwoHandedConflict = (weaponSlot: WeaponSlot): boolean => {
      if (weaponSlot.primaryWeapon && weaponSlot.primaryWeapon.handType === 'twoHanded') return true
      if (weaponSlot.secondaryWeapon && weaponSlot.secondaryWeapon.handType === 'twoHanded')
        return true
      return false
    }

    if (state.weapon1 && !checkTwoHandedConflict(state.weapon1)) {
      if (state.weapon1.primaryWeapon === null && item.slot === 'primaryWeapon') {
        return 'weapon1'
      }
      if (
        state.weapon1.secondaryWeapon === null &&
        item.slot === 'secondaryWeapon' &&
        state.weapon1.primaryWeapon?.handType !== 'twoHanded'
      ) {
        return 'weapon1'
      }
    }

    if (state.weapon2 && !checkTwoHandedConflict(state.weapon2)) {
      if (state.weapon2.primaryWeapon === null && item.slot === 'primaryWeapon') {
        return 'weapon2'
      }
      if (
        state.weapon2.secondaryWeapon === null &&
        item.slot === 'secondaryWeapon' &&
        state.weapon2.primaryWeapon?.handType !== 'twoHanded'
      ) {
        return 'weapon2'
      }
    }
  }

  return item.slot as keyof GearState
}

// Create reducer
const gearReducer = (state: GearState, action: GearAction): GearState => {
  switch (action.type) {
    case UPDATE_SLOT:
      const slot = findFirstAvailableSlot(state, action.payload.data!)
      if (slot) {
        if (slot === 'weapon1' || slot === 'weapon2') {
          const weaponSlot = { ...state[slot] } as WeaponSlot
          if (action.payload.data?.slot === 'primaryWeapon') {
            weaponSlot.primaryWeapon = action.payload.data
            // If primary weapon is two-handed, clear secondary weapon slot
            if (action.payload.data.handType === 'twoHanded') {
              weaponSlot.secondaryWeapon = null
            }
          } else if (action.payload.data?.slot === 'secondaryWeapon') {
            // Check if primary weapon is two-handed before allowing secondary weapon
            if (weaponSlot.primaryWeapon?.handType !== 'twoHanded') {
              weaponSlot.secondaryWeapon = action.payload.data
            } else {
              return state // Do not update state if primary weapon is two-handed
            }
          }
          return {
            ...state,
            [slot]: weaponSlot,
          }
        } else {
          return {
            ...state,
            [slot]: action.payload.data,
          }
        }
      }
      return state
    case DELETE_SLOT:
      return {
        ...state,
        [action.payload.slot]: null,
      }
    case DELETE_WEAPON:
      const weaponSlot = { ...state[action.payload.slot] } as WeaponSlot
      if (action.payload.weaponType === 'primaryWeapon') {
        weaponSlot.primaryWeapon = null
      } else if (action.payload.weaponType === 'secondaryWeapon') {
        weaponSlot.secondaryWeapon = null
      }
      return {
        ...state,
        [action.payload.slot]: weaponSlot,
      }
    default:
      return state
  }
}

// Define the context value shape
interface GearContextValue {
  state: GearState
  updateSlot: (item: Item) => void
  deleteSlot: (slot: keyof GearState) => void
  deleteWeapon: (
    slot: 'weapon1' | 'weapon2',
    weaponType: 'primaryWeapon' | 'secondaryWeapon',
  ) => void
  currentGearScore: () => number
}

// Create context
const GearContext = createContext<GearContextValue | undefined>(undefined)

// Create provider
interface GearProviderProps {
  children: ReactNode
}

export const GearProvider = ({ children }: GearProviderProps) => {
  const [state, dispatch] = useReducer(gearReducer, initialState)

  // Action creator for updating a slot
  const updateSlot = (item: Item) => {
    dispatch({
      type: UPDATE_SLOT,
      payload: { slot: item.slot as keyof GearState, data: item },
    })
  }

  // Action creator for deleting a slot
  const deleteSlot = (slot: keyof GearState) => {
    dispatch({
      type: DELETE_SLOT,
      payload: { slot },
    })
  }

  // Action creator for deleting a weapon
  const deleteWeapon = (
    slot: 'weapon1' | 'weapon2',
    weaponType: 'primaryWeapon' | 'secondaryWeapon',
  ) => {
    dispatch({
      type: DELETE_WEAPON,
      payload: { slot, weaponType },
    })
  }

  // Method to calculate the current gear score
  const currentGearScore = (): number => {
    const getGearScore = (
      item: Item | null | undefined,
      slot: GearSlots | 'primaryWeapon' | 'secondaryWeapon', // extend GearSlots to make it easier to collect gearscore math
    ): number => {
      if (!item) return 0
      const rarity = item.rarity[0]
      if (item.slot === 'primaryWeapon' || item.slot === 'secondaryWeapon') {
        const weaponType = item.handType === 'twoHanded' ? 'twoHanded' : item.slot
        return gearScoreTable[weaponType][rarity] || 0
      }
      return gearScoreTable[slot]?.[rarity] || 0
    }

    let totalScore = 0
    for (const slot of Object.keys(state) as GearSlots[]) {
      if (slot === 'weapon1' || slot === 'weapon2') {
        totalScore += getGearScore(state[slot]?.primaryWeapon, 'primaryWeapon')
        totalScore += getGearScore(state[slot]?.secondaryWeapon, 'secondaryWeapon')
      } else {
        totalScore += getGearScore(state[slot], slot)
      }
    }
    return totalScore
  }

  return (
    <GearContext.Provider value={{ state, updateSlot, deleteSlot, deleteWeapon, currentGearScore }}>
      {children}
    </GearContext.Provider>
  )
}

// Custom hook to use the GearContext
export const useGear = (): GearContextValue => {
  const context = useContext(GearContext)
  if (context === undefined) {
    throw new Error('useGear must be used within a GearProvider')
  }
  return context
}
