'use client'

import { Item } from 'payload-types'
import React, { createContext, useReducer, useContext, ReactNode } from 'react'

// Define the shape of the state
interface GearState {
  primaryWeapon: { leftItem: Item; rightItem: Item } | null
  secondaryWeapon: { leftItem: Item; rightItem: Item } | null
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

export type GearSlots = keyof GearState

// Define the initial state
const initialState: GearState = {
  primaryWeapon: null,
  secondaryWeapon: null,
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

type GearAction = UpdateSlotAction | DeleteSlotAction

// Helper function to find the first available slot
const findFirstAvailableSlot = (state: GearState, item: Item): keyof GearState | null => {
  const slotTypeMapping: { [key: string]: GearSlots[] } = {
    ring: ['ring1', 'ring2'],
    utility: ['utility1', 'utility2', 'utility3', 'utility4', 'utility5', 'utility6'],
  }

  const slots = slotTypeMapping[item.slot]
  if (!slots) return item.slot as keyof GearState

  for (const slot of slots) {
    if (state[slot] === null) {
      return slot
    }
  }

  return null
}

// Create reducer
const gearReducer = (state: GearState, action: GearAction): GearState => {
  switch (action.type) {
    case UPDATE_SLOT:
      const slot = findFirstAvailableSlot(state, action.payload.data!)
      if (slot) {
        return {
          ...state,
          [slot]: action.payload.data,
        }
      }
      return state
    case DELETE_SLOT:
      return {
        ...state,
        [action.payload.slot]: null,
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

  return (
    <GearContext.Provider value={{ state, updateSlot, deleteSlot }}>
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
