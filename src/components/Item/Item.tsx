import { ReactNode } from 'react'
import css from './Item.module.scss'

interface ItemProps {
  children: ReactNode
}

export default function Item({ children }: ItemProps) {
  return <button className={css.itemButton}>{children}</button>
}
