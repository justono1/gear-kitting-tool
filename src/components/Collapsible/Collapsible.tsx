'use client'

import { ReactNode, useState, useEffect, useCallback, forwardRef } from 'react'
import classNames from 'classnames'
import css from './Collapsible.module.scss'
import Triangle from '../Triangle/Triangle'

interface CollapsibleProps {
  title: string
  children?: ReactNode
  innerHeader?: boolean
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
  onClose?: () => void
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ title, children, innerHeader, isOpen: isOpenProp, onToggle, onClose }, ref) => {
    const [isOpen, setIsOpen] = useState(isOpenProp || false)

    const toggleOpen = useCallback(() => {
      setIsOpen((prevIsOpen) => {
        const newIsOpen = !prevIsOpen
        if (onToggle) {
          onToggle(newIsOpen)
        }
        if (!newIsOpen && onClose) {
          onClose()
        }
        return newIsOpen
      })
    }, [onToggle, onClose])

    useEffect(() => {
      if (isOpenProp !== undefined) {
        setIsOpen(isOpenProp)
      }
    }, [isOpenProp])

    return (
      <div className={css.collapsible} ref={ref}>
        <div
          className={classNames(css.header, { [css.innerHeader]: innerHeader })}
          onClick={toggleOpen}
        >
          <Triangle direction={isOpen ? 'down' : 'right'} className={css.arrow} />
          {title}
        </div>
        {isOpen && <div className={css.content}>{children}</div>}
      </div>
    )
  },
)

Collapsible.displayName = 'Collapsible'

export default Collapsible
