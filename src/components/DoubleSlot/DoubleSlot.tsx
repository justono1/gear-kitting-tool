import { Item } from 'payload-types'
import { useMemo } from 'react'
import classes from 'classnames'
import css from './DoubleSlot.module.scss'

interface DoubleSlotProps {
  leftItem?: Partial<Item>
  rightItem?: Partial<Item>
  className?: string
}

export default function DoubleSlot({ leftItem, rightItem, className }: DoubleSlotProps) {
  const isTwoHanded = useMemo(() => {
    if (leftItem?.handType === 'twoHanded') {
      return true
    }
    return false
  }, [leftItem])

  const isLeftSlotted = useMemo(() => {
    if (leftItem?.itemName) {
      return true
    }
    return false
  }, [leftItem])

  const isRightItemSlotted = useMemo(() => {
    if (rightItem?.itemName || isTwoHanded) {
      return true
    }
    return false
  }, [isTwoHanded, rightItem])

  return (
    <div className={classes(css.slotOuter, className)}>
      <div className={classes([css.slot, { [css.slotted]: isLeftSlotted }, css.slotInner])}>
        {leftItem && leftItem.itemName && <h3>{leftItem.itemName}</h3>}
      </div>

      <div className={classes([css.slot, { [css.slotted]: isRightItemSlotted }, css.slotInner])}>
        <h3 className={classes([{ [css.sameItem]: isTwoHanded }])}>
          {isTwoHanded ? leftItem?.itemName : rightItem?.itemName}
        </h3>
      </div>
    </div>
  )
}
