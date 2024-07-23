'use client'

import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react'
import { Item } from 'payload-types'
import classes from 'classnames'
import css from './SingleSlot.module.scss'
import { SlotSize } from '@/utils/determineSlotSize'
import { ExcludeFromUnion } from '@/utils/typeHelpers'
import { useMemo, useState } from 'react'
import { GearSlots } from '@/providers/GearProvider/types'
import { useGear } from '@/providers/GearProvider/GearProvider'
import { createAbbreviation } from '@/utils/createAbbreviation'
import { getGearScore } from '@/providers/GearProvider/utils'
import { arrayCamelCaseToCommaSeparatedTitleCase } from '@/utils/slugToHuman'

interface SingleSlotProps {
  item: Item | null
  slotSlug: GearSlots
  slotSize: ExcludeFromUnion<SlotSize, 'largeTwo'>
  itemRarity: string | null
  className?: string
}

export default function SingleSlot({
  item,
  slotSlug,
  slotSize,
  itemRarity,
  className,
}: SingleSlotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { deleteSlot } = useGear()

  const { refs, floatingStyles, context } = useFloating({
    placement: 'right',
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const hover = useHover(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

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
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {item?.itemName && <h3>{createAbbreviation(item.itemName)}</h3>}
      {isOpen && item && itemRarity && (
        <div
          className={classes(css.slotPopup, css[itemRarity])}
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <h3>{item.itemName}</h3>
          <hr className={classes(css.divider, css[itemRarity])} />
          <p>
            Rarity: <strong>{itemRarity}</strong>
          </p>
          <p>
            GearScore: <strong>{getGearScore(item, itemRarity)}</strong>
          </p>
          <p>
            Static Attributes:{' '}
            <strong>
              {arrayCamelCaseToCommaSeparatedTitleCase(item.staticAttribute as string[])}
            </strong>
          </p>
        </div>
      )}
    </div>
  )
}
