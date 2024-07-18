import { Item } from 'payload-types'
import { useMemo } from 'react'
import classes from 'classnames'
import css from './Slot.module.scss'

export type SlotSize = 'largeTwo' | 'large' | 'medium' | 'small' | 'tiny'

interface SlotProps {
  item: Partial<Item>
  slotted?: boolean
}

export default function Slot({ item, slotted }: SlotProps) {
  const { slot, itemName } = item

  const slotSize: SlotSize = useMemo(() => {
    switch (slot) {
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
  }, [slot])

  return (
    <div className={classes([css.slot, { [css.slotted]: slotted }, css[slotSize]])}>
      {slotSize === 'largeTwo' ? <DoubleSlotData item={item} /> : <SingleSlotData item={item} />}
    </div>
  )
}

const SingleSlotData = ({ item }: SlotProps) => <h3>{item.itemName}</h3>

const DoubleSlotData = ({ item }: SlotProps) => {
  return (
    <>
      <h3>{item.itemName}</h3>
      <h3>{item.itemName}</h3>
    </>
  )
}
