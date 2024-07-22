'use client'

import { Item } from 'payload-types'
import React, { createContext, useReducer, useContext, ReactNode, useMemo } from 'react'
import { GearState, GearSlots, WeaponSlot } from './types'
import { gearScoreTable } from './data'
import { findFirstAvailableSlot } from './utils'

// Define the initial state
const initialState: GearState = {
  weapon1: {
    primaryWeapon: { item: null, rarity: null },
    secondaryWeapon: { item: null, rarity: null },
  },
  weapon2: {
    primaryWeapon: { item: null, rarity: null },
    secondaryWeapon: { item: null, rarity: null },
  },
  head: { item: null, rarity: null },
  necklace: { item: null, rarity: null },
  hands: { item: null, rarity: null },
  chest: { item: null, rarity: null },
  back: { item: null, rarity: null },
  ring1: { item: null, rarity: null },
  legs: { item: null, rarity: null },
  ring2: { item: null, rarity: null },
  feet: { item: null, rarity: null },
  utility1: { item: null, rarity: null },
  utility2: { item: null, rarity: null },
  utility3: { item: null, rarity: null },
  utility4: { item: null, rarity: null },
  utility5: { item: null, rarity: null },
  utility6: { item: null, rarity: null },
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
    data: {
      item: Item | null
      rarity: string
    }
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

// Create reducer
const gearReducer = (state: GearState, action: GearAction): GearState => {
  console.log('ran')
  switch (action.type) {
    case UPDATE_SLOT:
      const slot = findFirstAvailableSlot(state, action.payload.data.item!)
      console.log('slottt: ', slot)
      if (slot) {
        if (slot === 'weapon1' || slot === 'weapon2') {
          const weaponSlot = { ...state[slot] } as WeaponSlot
          console.log('Weaponslottt: ', weaponSlot)
          if (action.payload.data.item?.slot === 'primaryWeapon') {
            weaponSlot.primaryWeapon.item = action.payload.data.item
            // If primary weapon is two-handed, clear secondary weapon slot
            if (action.payload.data.item.handType === 'twoHanded') {
              weaponSlot.secondaryWeapon = {
                item: null,
                rarity: null,
              }
            }
          } else if (action.payload.data.item?.slot === 'secondaryWeapon') {
            // Check if primary weapon is two-handed before allowing secondary weapon
            if (weaponSlot.primaryWeapon.item?.handType !== 'twoHanded') {
              weaponSlot.secondaryWeapon.item = action.payload.data.item
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
        weaponSlot.primaryWeapon = {
          item: null,
          rarity: null,
        }
      } else if (action.payload.weaponType === 'secondaryWeapon') {
        weaponSlot.secondaryWeapon = {
          item: null,
          rarity: null,
        }
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
  updateSlot: (item: Item, rarity: string) => void
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
  const updateSlot = (item: Item, rarity: string) => {
    console.log('item: ', item)
    console.log('rarity: ', rarity)
    dispatch({
      type: UPDATE_SLOT,
      payload: { slot: item.slot as keyof GearState, data: { item, rarity } },
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
      rarity: string | null,
    ): number => {
      if (!item || !rarity) return 0
      if (item.slot === 'primaryWeapon' || item.slot === 'secondaryWeapon') {
        const weaponType = item.handType === 'twoHanded' ? 'twoHanded' : item.slot
        return gearScoreTable[weaponType][rarity] || 0
      }
      return gearScoreTable[slot]?.[rarity] || 0
    }

    let totalScore = 0
    for (const slot of Object.keys(state) as GearSlots[]) {
      if (slot === 'weapon1' || slot === 'weapon2') {
        totalScore += getGearScore(
          state[slot]?.primaryWeapon.item,
          'primaryWeapon',
          state[slot]?.primaryWeapon.rarity,
        )
        totalScore += getGearScore(
          state[slot]?.secondaryWeapon.item,
          'secondaryWeapon',
          state[slot]?.primaryWeapon.rarity,
        )
      } else {
        totalScore += getGearScore(state[slot].item, slot, state[slot].rarity)
      }
    }
    return totalScore
  }

  const contextValue = useMemo(
    () => ({
      state,
      updateSlot,
      deleteSlot,
      deleteWeapon,
      currentGearScore,
    }),
    [state],
  )

  return <GearContext.Provider value={contextValue}>{children}</GearContext.Provider>
}

// Custom hook to use the GearContext
export const useGear = (): GearContextValue => {
  const context = useContext(GearContext)
  if (context === undefined) {
    throw new Error('useGear must be used within a GearProvider')
  }
  return context
}
