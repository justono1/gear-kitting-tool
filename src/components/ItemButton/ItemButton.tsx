import { ReactNode } from 'react'
import css from './ItemButton.module.scss'

interface ItemButtonProps {
  children: ReactNode
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function ItemButton({ children, onClick }: ItemButtonProps) {
  return (
    <button className={css.itemButton} onClick={onClick}>
      {children}
    </button>
  )
}
