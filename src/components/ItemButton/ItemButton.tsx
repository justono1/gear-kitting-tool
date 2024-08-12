'use client'

import { ReactNode, useState } from 'react'
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react'
import classes from 'classnames'
import css from './ItemButton.module.scss'
import { Item } from 'payload-types'
import { getGearScore } from '@/providers/GearProvider/utils'
import { arrayCamelCaseToCommaSeparatedTitleCase } from '@/common/utils/slugToHuman'

interface ItemButtonProps {
  children: ReactNode
  item: Item
  rarity: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function ItemButton({ children, onClick, item, rarity }: ItemButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    placement: 'right',
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    open: isOpen,
    onOpenChange: setIsOpen,
  })

  const hover = useHover(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <button className={css.itemButton} onClick={onClick}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
        {isOpen && (
          <div
            className={classes(css.slotPopup, css[rarity])}
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            <h3>{item.itemName}</h3>
            <hr className={classes(css.divider, css[rarity])} />
            <p>
              Rarity: <strong>{rarity}</strong>
            </p>
            <p>
              GearScore: <strong>{getGearScore(item, rarity)}</strong>
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
    </button>
  )
}
