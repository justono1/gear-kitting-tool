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

  return (
    <GearContext.Provider value={{ state, updateSlot, deleteSlot, deleteWeapon }}>
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
