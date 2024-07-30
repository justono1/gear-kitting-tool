'use client'

import { Item } from 'payload-types'
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { GearState, GearSlots, WeaponSlot, GearStore, MarketBrowserTabsIsOpen } from './types'
import {
  findFirstAvailableSlot,
  getGearScore,
  translateShortStateKey,
  translateShortToLongStateKey,
} from './utils'
import { splitAfterWord } from '@/common/utils/splitAfterWord'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { objectToBase64 } from '@/common/utils/objectToBase64'
import { base64ToObject } from '@/common/utils/base64ToObject'
import { usePrevious } from '@/common/hooks/usePrevious'

// Define the initial state
const initialState: GearStore = {
  fullStore: {
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
  },
  shortStore: {},
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
      item: Item
      rarity: string
    }
  }
}

interface DeleteSlotAction {
  type: typeof DELETE_SLOT
  payload: {
    slot: GearSlots
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
const gearReducer = (state: GearStore, action: GearAction): GearStore => {
  switch (action.type) {
    case UPDATE_SLOT:
      const slot = findFirstAvailableSlot(state.fullStore, action.payload.data.item!)
      if (slot) {
        if (slot === 'weapon1' || slot === 'weapon2') {
          const weaponSlot = { ...state.fullStore[slot] } as WeaponSlot
          if (action.payload.data.item?.slot === 'primaryWeapon') {
            weaponSlot.primaryWeapon.item = action.payload.data.item
            weaponSlot.primaryWeapon.rarity = action.payload.data.rarity
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
              weaponSlot.secondaryWeapon.rarity = action.payload.data.rarity
            } else {
              return state // Do not update state if primary weapon is two-handed
            }
          }

          return {
            ...state,
            fullStore: {
              ...state.fullStore,
              [slot]: weaponSlot,
            },
            shortStore: {
              ...state.shortStore,
              ...(weaponSlot.primaryWeapon.item
                ? {
                    [`w${
                      splitAfterWord(slot, 'weapon')[1]
                    }pr`]: `${weaponSlot.primaryWeapon.item.id}:${weaponSlot.primaryWeapon.rarity}`,
                  }
                : {}),
              ...(weaponSlot.secondaryWeapon.item
                ? {
                    [`w${
                      splitAfterWord(slot, 'weapon')[1]
                    }sc`]: `${weaponSlot.secondaryWeapon.item.id}:${weaponSlot.secondaryWeapon.rarity}`,
                  }
                : {}),
            },
          }
        } else {
          return {
            ...state,
            fullStore: {
              ...state.fullStore,
              [slot]: action.payload.data,
            },
            shortStore: {
              ...state.shortStore,
              [translateShortStateKey(
                slot,
              )]: `${action.payload.data.item.id}:${action.payload.data.rarity}`,
            },
          }
        }
      }
      return state
    case DELETE_SLOT:
      // @ts-ignore
      const { [translateShortStateKey(action.payload.slot)]: removedSlot, ...remainingSlots } =
        state.shortStore

      return {
        ...state,
        fullStore: {
          ...state.fullStore,
          [action.payload.slot]: { item: null, rarity: null },
        },
        shortStore: remainingSlots,
      }
    case DELETE_WEAPON:
      const weaponSlot = { ...state.fullStore[action.payload.slot] } as WeaponSlot
      const shortStoreKeyBase = `w${splitAfterWord(action.payload.slot, 'weapon')[1]}`
      let slotType: string
      if (action.payload.weaponType === 'primaryWeapon') {
        weaponSlot.primaryWeapon = {
          item: null,
          rarity: null,
        }
        slotType = 'pr'
      } else if (action.payload.weaponType === 'secondaryWeapon') {
        weaponSlot.secondaryWeapon = {
          item: null,
          rarity: null,
        }
        slotType = 'sc'
      }

      // @ts-ignore
      const { [`${shortStoreKeyBase + slotType}`]: removedWeapon, ...restSlots } = state.shortStore

      return {
        ...state,
        fullStore: {
          ...state.fullStore,
          [action.payload.slot]: weaponSlot,
        },
        shortStore: restSlots,
      }
    default:
      return state
  }
}

// Define the context value shape
interface GearContextValue {
  state: GearStore
  updateSlot: (item: Item, rarity: string) => void
  deleteSlot: (slot: keyof GearState) => void
  deleteWeapon: (
    slot: 'weapon1' | 'weapon2',
    weaponType: 'primaryWeapon' | 'secondaryWeapon',
  ) => void
  currentGearScore: number
  marketBrowserTabsIsOpen: MarketBrowserTabsIsOpen
  setMarketBrowserTabsIsOpen: React.Dispatch<React.SetStateAction<MarketBrowserTabsIsOpen>>
}

// Create context
const GearContext = createContext<GearContextValue | undefined>(undefined)

// Create provider
interface GearProviderProps {
  itemData: Item[]
  children: ReactNode
}

export const GearProvider = ({ children, itemData }: GearProviderProps) => {
  const [state, dispatch] = useReducer(gearReducer, initialState)
  const [marketBrowserTabsIsOpen, setMarketBrowserTabsIsOpen] = useState<MarketBrowserTabsIsOpen>({
    primaryWeapon: false,
    secondaryWeapon: false,
    head: false,
    necklace: false,
    hands: false,
    chest: false,
    back: false,
    ring: false,
    legs: false,
    feet: false,
    utility: false,
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const gearRouteData = searchParams.get('gear')
  const decodedGearData = gearRouteData ? base64ToObject(decodeURIComponent(gearRouteData)) : {}
  const previousDecodedGearData = usePrevious(decodedGearData)

  // Action creator for updating a slot
  const updateSlot = useCallback((item: Item, rarity: string) => {
    dispatch({
      type: UPDATE_SLOT,
      payload: { slot: item.slot as keyof GearState, data: { item, rarity } },
    })
  }, [])

  // Action creator for deleting a slot
  const deleteSlot = useCallback((slot: keyof GearState) => {
    dispatch({
      type: DELETE_SLOT,
      payload: { slot },
    })
  }, [])

  // Action creator for deleting a weapon
  const deleteWeapon = useCallback(
    (slot: 'weapon1' | 'weapon2', weaponType: 'primaryWeapon' | 'secondaryWeapon') => {
      dispatch({
        type: DELETE_WEAPON,
        payload: { slot, weaponType },
      })
    },
    [],
  )

  // Gear Route Setter
  useEffect(() => {
    const encodedState = objectToBase64(state.shortStore)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('gear', encodedState)

    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false })
  }, [state, searchParams, pathname, router])

  // Gear Route Loader
  useEffect(() => {
    const shortStore = state.shortStore

    const hasShortStore = Object.keys(shortStore).length > 0
    const hasGearData = Object.keys(decodedGearData).length > 0
    const isSameGearData =
      JSON.stringify(decodedGearData) === JSON.stringify(previousDecodedGearData)

    if (!hasShortStore && hasGearData && itemData && !isSameGearData) {
      Object.keys(decodedGearData).forEach((key) => {
        // each item in decodedGearData[key] is a string with itemID:rarity
        const decodedValues = decodedGearData[key].split(':')
        const foundItem = itemData.filter((item) => item.id === decodedValues[0])
        if (foundItem.length === 1) {
          //should only find one or none
          updateSlot(foundItem[0], decodedValues[1])
        }
      })
    }
  }, [state, itemData, decodedGearData, previousDecodedGearData, updateSlot])

  // Method to calculate the current gear score
  const currentGearScore = useMemo(() => {
    let totalScore = 0
    for (const slot of Object.keys(state.fullStore) as GearSlots[]) {
      if (slot === 'weapon1' || slot === 'weapon2') {
        totalScore += getGearScore(
          state.fullStore[slot].primaryWeapon?.item,
          state.fullStore[slot].primaryWeapon?.rarity,
        )
        totalScore += getGearScore(
          state.fullStore[slot].secondaryWeapon?.item,
          state.fullStore[slot].secondaryWeapon?.rarity,
        )
      } else {
        totalScore += getGearScore(state.fullStore[slot]?.item, state.fullStore[slot]?.rarity)
      }
    }
    return totalScore
  }, [state])

  const contextValue = useMemo(
    () => ({
      state,
      updateSlot,
      deleteSlot,
      deleteWeapon,
      currentGearScore,
      marketBrowserTabsIsOpen,
      setMarketBrowserTabsIsOpen,
    }),
    [
      state,
      updateSlot,
      deleteSlot,
      deleteWeapon,
      currentGearScore,
      marketBrowserTabsIsOpen,
      setMarketBrowserTabsIsOpen,
    ],
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
