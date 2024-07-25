import { Item } from 'payload-types'
import { GearSlots, GearState, WeaponSlot } from './types'
import { gearScoreTable, shortStateKeyMap } from './data'

// Helper function to find the first available slot
export const findFirstAvailableSlot = (state: GearState, item: Item): keyof GearState | null => {
  const slotTypeMapping: { [key: string]: GearSlots[] } = {
    ring: ['ring1', 'ring2'],
    utility: ['utility1', 'utility2', 'utility3', 'utility4', 'utility5', 'utility6'],
  }

  const slots = slotTypeMapping[item.slot]
  if (slots) {
    for (const slot of slots) {
      // @ts-ignore
      if (state[slot].item === null) {
        return slot
      }
    }
    return null
  }

  if (item.slot === 'primaryWeapon' || item.slot === 'secondaryWeapon') {
    const checkTwoHandedConflict = (weaponSlot: WeaponSlot): boolean => {
      if (weaponSlot.primaryWeapon.item && weaponSlot.primaryWeapon.item.handType === 'twoHanded')
        return true
      if (
        weaponSlot.secondaryWeapon.item &&
        weaponSlot.secondaryWeapon.item.handType === 'twoHanded'
      )
        return true
      return false
    }

    if (state.weapon1 && !checkTwoHandedConflict(state.weapon1)) {
      if (state.weapon1.primaryWeapon.item === null && item.slot === 'primaryWeapon') {
        return 'weapon1'
      }
      if (
        state.weapon1.secondaryWeapon.item === null &&
        item.slot === 'secondaryWeapon' &&
        state.weapon1.primaryWeapon.item?.handType !== 'twoHanded'
      ) {
        return 'weapon1'
      }
    }

    if (state.weapon2 && !checkTwoHandedConflict(state.weapon2)) {
      if (state.weapon2.primaryWeapon.item === null && item.slot === 'primaryWeapon') {
        return 'weapon2'
      }
      if (
        state.weapon2.secondaryWeapon.item === null &&
        item.slot === 'secondaryWeapon' &&
        state.weapon2.primaryWeapon.item?.handType !== 'twoHanded'
      ) {
        return 'weapon2'
      }
    }

    return null
  }

  return item.slot as keyof GearState
}

export const getGearScore = (item: Item | null | undefined, rarity: string | null): number => {
  if (!item || !rarity) return 0
  const slot = item.slot

  if (slot === 'primaryWeapon' || slot === 'secondaryWeapon') {
    const weaponType = item.handType === 'twoHanded' ? 'twoHanded' : slot
    return gearScoreTable[weaponType][rarity] || 0
  }
  return gearScoreTable[slot]?.[rarity] || 0
}

export const translateShortStateKey = (longKey: string): string => {
  return shortStateKeyMap[longKey] || longKey
}

// Create a reverse mapping from short values to long keys
const longStateKeyMap: { [key: string]: string } = {}
Object.keys(shortStateKeyMap).forEach((key) => {
  const value = shortStateKeyMap[key]
  longStateKeyMap[value] = key
})

export const translateShortToLongStateKey = (shortKey: string): string => {
  return longStateKeyMap[shortKey] || shortKey
}
