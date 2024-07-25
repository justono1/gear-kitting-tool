'use client'

import css from './Header.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const url = useMemo(() => {
    return `${window.location.origin}${pathname}?${searchParams}`
  }, [pathname, searchParams])

  return (
    <header className={css.header}>
      <h1>
        Gear Kitting Tool <small>v0.1</small>
      </h1>
      <div className={css.shareBox}>
        <input className={css.inputText} type="text" value={url} />
        <button className={css.button}>Share Kit</button>
      </div>
    </header>
  )
}
