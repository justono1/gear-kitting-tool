import { ReactNode } from 'react'
import css from './ItemButton.module.scss'

interface ItemButtonProps {
  children: ReactNode
}

export default function ItemButton({ children }: ItemButtonProps) {
  return <button className={css.itemButton}>{children}</button>
}
