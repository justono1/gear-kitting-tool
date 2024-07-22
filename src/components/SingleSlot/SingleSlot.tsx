'use client'

import { Item } from 'payload-types'
import classes from 'classnames'
import css from './SingleSlot.module.scss'
import { SlotSize } from '@/utils/determineSlotSize'
import { ExcludeFromUnion } from '@/utils/typeHelpers'
import { useMemo } from 'react'
import { GearSlots } from '@/providers/GearProvider/types'
import { useGear } from '@/providers/GearProvider/GearProvider'
import { createAbbreviation } from '@/utils/createAbbreviation'

interface SingleSlotProps {
  item: Partial<Item> | null
  slotSlug: GearSlots
  slotSize: ExcludeFromUnion<SlotSize, 'largeTwo'>
  className?: string
}

export default function SingleSlot({ item, slotSlug, slotSize, className }: SingleSlotProps) {
  const { deleteSlot } = useGear()
  const isSlotted = useMemo(() => {
    if (item?.itemName) {
      return true
    }

    return false
  }, [item])

  const handleSlotRightCLick = () => {
    deleteSlot(slotSlug)
  }

  return (
    <div
      className={classes([css.slot, { [css.slotted]: isSlotted }, css[slotSize], className])}
      onContextMenu={(event) => {
        event.preventDefault()
        handleSlotRightCLick()
      }}
    >
      {item?.itemName && <h3>{createAbbreviation(item.itemName)}</h3>}
    </div>
  )
}
