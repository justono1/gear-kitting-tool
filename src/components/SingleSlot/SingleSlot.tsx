import { Item } from 'payload-types'
import classes from 'classnames'
import css from './SingleSlot.module.scss'
import { SlotSize } from '@/utils/determineSlotSize'
import { ExcludeFromUnion } from '@/utils/typeHelpers'
import { useMemo } from 'react'

interface SingleSlotProps {
  item?: Partial<Item>
  slotSize: ExcludeFromUnion<SlotSize, 'largeTwo'>
  className?: string
}

export default function SingleSlot({ item, slotSize, className }: SingleSlotProps) {
  const isSlotted = useMemo(() => {
    if (item?.itemName) {
      return true
    }

    return false
  }, [item])

  return (
    <div className={classes([css.slot, { [css.slotted]: isSlotted }, css[slotSize], className])}>
      {item?.itemName && <h3>{item.itemName}</h3>}
    </div>
  )
}
