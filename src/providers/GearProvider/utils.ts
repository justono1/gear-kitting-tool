import { Item } from 'payload-types'
import { GearSlot, GearState, WeaponSlot } from './types'
import { gearScoreTable, rarityShortCode } from './data'
import { base62ToNumber, numberToBase62 } from '@/common/utils/base62Operators'

// Helper function to find the first available slot
export const findFirstAvailableSlot = (state: GearState, item: Item): GearSlot | null => {
  const slotTypeMapping: { [key: string]: GearSlot[] } = {
    ring: ['ring1', 'ring2'],
    utility: ['utility1', 'utility2', 'utility3', 'utility4', 'utility5', 'utility6'],
  }

  const slots = slotTypeMapping[item.slot]
  if (slots) {
    for (const slot of slots) {
      // @ts-ignore
      if (state.slots[slot].item === null) {
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

    if (state.slots.weapon1 && !checkTwoHandedConflict(state.slots.weapon1)) {
      if (state.slots.weapon1.primaryWeapon.item === null && item.slot === 'primaryWeapon') {
        return 'weapon1'
      }
      if (
        state.slots.weapon1.secondaryWeapon.item === null &&
        item.slot === 'secondaryWeapon' &&
        state.slots.weapon1.primaryWeapon.item?.handType !== 'twoHanded'
      ) {
        return 'weapon1'
      }
    }

    if (state.slots.weapon2 && !checkTwoHandedConflict(state.slots.weapon2)) {
      if (state.slots.weapon2.primaryWeapon.item === null && item.slot === 'primaryWeapon') {
        return 'weapon2'
      }
      if (
        state.slots.weapon2.secondaryWeapon.item === null &&
        item.slot === 'secondaryWeapon' &&
        state.slots.weapon2.primaryWeapon.item?.handType !== 'twoHanded'
      ) {
        return 'weapon2'
      }
    }

    return null
  }

  return item.slot as GearSlot
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

export const encodeGearState = (state: GearState): string => {
  const encodedArrayItems = Object.keys(state).reduce<string[]>((acc, key) => {
    if (key === 'weapon1' || key === 'weapon2') {
      acc.push(
        // @ts-ignore
        state[key].primaryWeapon.item && state[key].primaryWeapon.rarity
          ? // @ts-ignore
            `${rarityShortCode[state[key].primaryWeapon.rarity]}${numberToBase62(
              // @ts-ignore
              state[key].primaryWeapon.item.shortId,
            )}`
          : null,
      )
      acc.push(
        // @ts-ignore
        state[key].secondaryWeapon.item && state[key].secondaryWeapon.rarity
          ? // @ts-ignore
            `${rarityShortCode[state[key].secondaryWeapon.rarity]}${numberToBase62(
              // @ts-ignore
              state[key].secondaryWeapon.item.shortId,
            )}`
          : null,
      )
    } else {
      acc.push(
        // @ts-ignore
        state[key].item && state[key].rarity
          ? // @ts-ignore
            `${rarityShortCode[state[key].rarity]}${numberToBase62(
              // @ts-ignore
              state[key].item.shortId,
            )}`
          : null,
      )
    }
    return acc
  }, [])

  return encodedArrayItems.join('-')
}

export const decodeItem = (
  encodedItem: string | null,
): { shortId: number | null; rarity: string | null } => {
  if (!encodedItem) {
    return { shortId: null, rarity: null }
  }
  const rarity = Object.keys(rarityShortCode).find(
    // @ts-ignore
    (key) => rarityShortCode[key] === encodedItem[0],
  )
  const shortId = base62ToNumber(encodedItem.slice(1))
  return {
    shortId: shortId,
    rarity: rarity || null,
  }
}
