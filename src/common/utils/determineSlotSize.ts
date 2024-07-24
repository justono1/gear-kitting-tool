import { Item } from 'payload-types'

export type SlotSize = 'largeTwo' | 'large' | 'medium' | 'small' | 'tiny'

export const determineSlotSize = (itemSlot: Item['slot']): SlotSize => {
  switch (itemSlot) {
    case 'primaryWeapon':
    case 'secondaryWeapon':
      return 'largeTwo'
    case 'chest':
    case 'legs':
      return 'large'
    case 'head':
    case 'hands':
    case 'back':
    case 'feet':
      return 'medium'
    case 'utility':
      return 'small'
    case 'necklace':
    case 'ring':
      return 'tiny'
    default:
      return 'medium'
  }
}
