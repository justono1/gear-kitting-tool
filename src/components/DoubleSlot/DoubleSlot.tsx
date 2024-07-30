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
import { MouseEventHandler, useMemo, useState } from 'react'
import classes from 'classnames'
import css from './DoubleSlot.module.scss'
import { useGear } from '@/providers/GearProvider/GearProvider'
import { createAbbreviation } from '@/common/utils/createAbbreviation'
import { getGearScore } from '@/providers/GearProvider/utils'
import { arrayCamelCaseToCommaSeparatedTitleCase } from '@/common/utils/slugToHuman'

interface DoubleSlotProps {
  leftItem: Item | null
  leftItemRarity: string | null
  rightItem: Item | null
  rightItemRarity: string | null
  slotSlug: 'weapon1' | 'weapon2'
  className?: string
  onLeftClick?: MouseEventHandler<HTMLDivElement>
}

export default function DoubleSlot({
  leftItem,
  leftItemRarity,
  rightItem,
  rightItemRarity,
  slotSlug,
  className,
  onLeftClick,
}: DoubleSlotProps) {
  const { deleteWeapon } = useGear()
  const [leftItemIsOpen, setLeftItemIsOpen] = useState(false)
  const [rightItemIsOpen, setRightItemIsOpen] = useState(false)

  const {
    refs: leftItemRefs,
    floatingStyles: leftItemFloatingStyles,
    context: leftItemContext,
  } = useFloating({
    placement: 'right',
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    open: leftItemIsOpen,
    onOpenChange: setLeftItemIsOpen,
  })

  const {
    refs: rightItemRefs,
    floatingStyles: rightItemFloatingStyles,
    context: rightItemContext,
  } = useFloating({
    placement: 'right',
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    open: rightItemIsOpen,
    onOpenChange: setRightItemIsOpen,
  })

  const leftHover = useHover(leftItemContext)
  const rightHover = useHover(rightItemContext)

  const {
    getReferenceProps: leftItemGetReferenceProps,
    getFloatingProps: leftItemGetFloatingProps,
  } = useInteractions([leftHover])

  const {
    getReferenceProps: rightItemGetReferenceProps,
    getFloatingProps: rightItemGetFloatingProps,
  } = useInteractions([rightHover])

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
    <div className={classes(css.slotOuter, className)} onClick={onLeftClick}>
      <div
        className={classes(
          [css.slot, { [css.slotted]: isLeftSlotted }, css.slotInner],
          css[leftItemRarity ? leftItemRarity : 'poor'],
        )}
        onContextMenu={(event) => {
          handleSlotRightCLick(event, 'primaryWeapon')
        }}
        ref={leftItemRefs.setReference}
        {...leftItemGetReferenceProps()}
      >
        <>
          {leftItem && leftItem.itemName && (
            <h3 className={css.slotItemName}>{createAbbreviation(leftItem.itemName)}</h3>
          )}
          {leftItemIsOpen && leftItem && leftItemRarity && (
            <div
              className={classes(css.slotPopup, css[leftItemRarity])}
              ref={leftItemRefs.setFloating}
              style={leftItemFloatingStyles}
              {...leftItemGetFloatingProps()}
            >
              <h3>{leftItem.itemName}</h3>
              <hr className={classes(css.divider, css[leftItemRarity])} />
              <p>
                Rarity: <strong>{leftItemRarity}</strong>
              </p>
              <p>
                GearScore: <strong>{getGearScore(leftItem, leftItemRarity)}</strong>
              </p>
              <p>
                Static Attributes:{' '}
                <strong>
                  {arrayCamelCaseToCommaSeparatedTitleCase(leftItem.staticAttribute as string[])}
                </strong>
              </p>
            </div>
          )}
        </>
      </div>

      <div
        className={classes([
          css.slot,
          { [css.slotted]: isRightItemSlotted },
          { [css.sameItemSlot]: isTwoHanded },
          css.slotInner,
          css[rightItemRarity ? rightItemRarity : 'poor'],
        ])}
        onContextMenu={(event) => {
          handleSlotRightCLick(event, isTwoHanded ? 'primaryWeapon' : 'secondaryWeapon')
        }}
        ref={rightItemRefs.setReference}
        {...rightItemGetReferenceProps()}
      >
        <>
          <h3 className={classes([css.slotItemName, { [css.sameItem]: isTwoHanded }])}>
            {isTwoHanded
              ? createAbbreviation(leftItem?.itemName)
              : createAbbreviation(rightItem?.itemName)}
          </h3>
          {rightItemIsOpen && rightItem && rightItemRarity && (
            <div
              className={classes(css.slotPopup, css[rightItemRarity])}
              ref={rightItemRefs.setFloating}
              style={rightItemFloatingStyles}
              {...rightItemGetFloatingProps()}
            >
              <h3>{rightItem.itemName}</h3>
              <hr className={classes(css.divider, css[rightItemRarity])} />
              <p>
                Rarity: <strong>{rightItemRarity}</strong>
              </p>
              <p>
                GearScore: <strong>{getGearScore(rightItem, rightItemRarity)}</strong>
              </p>
              <p>
                Static Attributes:{' '}
                <strong>
                  {arrayCamelCaseToCommaSeparatedTitleCase(rightItem.staticAttribute as string[])}
                </strong>
              </p>
            </div>
          )}
        </>
      </div>
    </div>
  )
}
