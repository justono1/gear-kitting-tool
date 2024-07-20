'use client'

import { ReactNode, useState } from 'react'
import classes from 'classnames'
import css from './Collapsible.module.scss'
import Triangle from '../Triangle/Triangle'

interface CollapsibleProps {
  title: string
  children?: ReactNode
  innerHeader?: boolean
}

export default function Collapsible({ title, children, innerHeader }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={css.collapsible}>
      <div className={classes(css.header, { [css.innerHeader]: innerHeader })} onClick={toggleOpen}>
        <Triangle direction={isOpen ? 'down' : 'right'} className={css.arrow} />
        {title}
      </div>
      {isOpen && <div className={css.content}>{children}</div>}
    </div>
  )
}
