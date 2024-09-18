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
  RefObject,
  useRef,
} from 'react'
import {
  GearState,
  GearSlots,
  WeaponSlot,
  MarketBrowserTabsIsOpen,
  CharacterClass,
  CharacterPerks,
} from './types'
import { decodeItem, encodeGearState, findFirstAvailableSlot, getGearScore } from './utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { usePrevious } from '@/common/hooks/usePrevious'

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
const HYDRATE_FROM_LOCAL_STORAGE = 'HYDRATE_FROM_LOCAL_STORAGE'

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

interface HydrateFromLocalStorageAction {
  type: typeof HYDRATE_FROM_LOCAL_STORAGE
  payload: GearState
}

type GearAction =
  | UpdateSlotAction
  | DeleteSlotAction
  | DeleteWeaponAction
  | HydrateFromLocalStorageAction

// Create reducer
const gearReducer = (state: GearState, action: GearAction): GearState => {
  switch (action.type) {
    case UPDATE_SLOT:
      const slot = findFirstAvailableSlot(state, action.payload.data.item!)
      if (slot) {
        if (slot === 'weapon1' || slot === 'weapon2') {
          const weaponSlot = { ...state[slot] } as WeaponSlot
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
        [action.payload.slot]: { item: null, rarity: null },
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
    case 'HYDRATE_FROM_LOCAL_STORAGE':
      return { ...state, ...action.payload }
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
  currentGearScore: number
  marketBrowserTabsIsOpen: MarketBrowserTabsIsOpen
  setMarketBrowserTabsIsOpen: React.Dispatch<React.SetStateAction<MarketBrowserTabsIsOpen>>
  scrollToRef: (key: string) => void
  registerRef: (key: string, ref: RefObject<HTMLDivElement>) => void
  selectedCharacterClass: CharacterClass
  setSelectedCharacterClass: React.Dispatch<React.SetStateAction<CharacterClass>>
  selectedCharacterPerks: CharacterPerks
  setSelectedCharacterPerks: React.Dispatch<React.SetStateAction<CharacterPerks>>
  shareUrl: string
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('gearState')
      const hydratedInitialState = savedState ? JSON.parse(savedState) : initialState

      dispatch({
        type: HYDRATE_FROM_LOCAL_STORAGE,
        payload: hydratedInitialState,
      })
    }
  }, [])

  const refs = useRef<{ [key: string]: RefObject<HTMLDivElement> }>({})

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const origin = typeof window !== 'undefined' && window.location.origin

  const characterClassRouteData = searchParams.get('class')

  const [selectedCharacterClass, setSelectedCharacterClass] = useState<CharacterClass>(
    characterClassRouteData ? (characterClassRouteData as CharacterClass) : 'fighter',
  )
  const [selectedCharacterPerks, setSelectedCharacterPerks] = useState<CharacterPerks>(null)
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

  const [isGearRouteInitialized, setIsGearRouteInitialized] = useState(false)

  const previousCharacterClassRouteData = usePrevious(characterClassRouteData)
  const gearRouteData = searchParams.get('gear')
  const previousGearRouteData = usePrevious(gearRouteData)

  const shareUrl = useMemo(() => {
    const encodedState = encodeGearState(state)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('class', selectedCharacterClass)
    newSearchParams.set('gear', encodedState)

    return `${origin}/share?${newSearchParams.toString()}`
  }, [pathname, searchParams, origin, state])

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gearState', JSON.stringify(state))
      localStorage.setItem(
        'gearStateVersion',
        `${process.env.NEXT_PUBLIC_GEAR_STATE_LOCAL_STORAGE_VERSION}`,
      )
    }
  }, [state])

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

  const scrollToRef = (key: string) => {
    if (refs.current[key]?.current) {
      refs.current[key].current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const registerRef = (key: string, ref: RefObject<HTMLDivElement>) => {
    refs.current[key] = ref
  }

  // Method to calculate the current gear score
  const currentGearScore = useMemo(() => {
    let totalScore = 0
    for (const slot of Object.keys(state) as GearSlots[]) {
      if (slot === 'weapon1' || slot === 'weapon2') {
        totalScore += getGearScore(
          state[slot].primaryWeapon?.item,
          state[slot].primaryWeapon?.rarity,
        )
        totalScore += getGearScore(
          state[slot].secondaryWeapon?.item,
          state[slot].secondaryWeapon?.rarity,
        )
      } else {
        totalScore += getGearScore(state[slot]?.item, state[slot]?.rarity)
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
      scrollToRef,
      registerRef,
      selectedCharacterClass,
      setSelectedCharacterClass,
      selectedCharacterPerks,
      setSelectedCharacterPerks,
      shareUrl,
    }),
    [
      state,
      updateSlot,
      deleteSlot,
      deleteWeapon,
      currentGearScore,
      marketBrowserTabsIsOpen,
      setMarketBrowserTabsIsOpen,
      scrollToRef,
      registerRef,
      selectedCharacterClass,
      setSelectedCharacterClass,
      selectedCharacterPerks,
      setSelectedCharacterPerks,
      shareUrl,
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
