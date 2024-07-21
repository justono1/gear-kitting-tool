import { Item } from 'payload-types'
import { useMemo } from 'react'
import classes from 'classnames'
import css from './DoubleSlot.module.scss'
import { GearSlots, useGear } from '@/providers/GearProvider'
import { createAbbreviation } from '@/utils/createAbbreviation'

interface DoubleSlotProps {
  leftItem?: Partial<Item> | null
  rightItem?: Partial<Item> | null
  slotSlug: 'weapon1' | 'weapon2'
  className?: string
}

export default function DoubleSlot({ leftItem, rightItem, slotSlug, className }: DoubleSlotProps) {
  const { deleteWeapon } = useGear()
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

  const handleSlotRightCLick = (event: any, weaponType: 'primaryWeapon' | 'secondaryWeapon') => {
    event.preventDefault()
    deleteWeapon(slotSlug, weaponType)
  }

  return (
    <div className={classes(css.slotOuter, className)}>
      <div
        className={classes([css.slot, { [css.slotted]: isLeftSlotted }, css.slotInner])}
        onContextMenu={(event) => {
          handleSlotRightCLick(event, 'primaryWeapon')
        }}
      >
        {leftItem && leftItem.itemName && <h3>{createAbbreviation(leftItem.itemName)}</h3>}
      </div>

      <div
        className={classes([css.slot, { [css.slotted]: isRightItemSlotted }, css.slotInner])}
        onContextMenu={(event) => {
          handleSlotRightCLick(event, isTwoHanded ? 'primaryWeapon' : 'secondaryWeapon')
        }}
      >
        <h3 className={classes([{ [css.sameItem]: isTwoHanded }])}>
          {isTwoHanded
            ? createAbbreviation(leftItem?.itemName)
            : createAbbreviation(rightItem?.itemName)}
        </h3>
      </div>
    </div>
  )
}
