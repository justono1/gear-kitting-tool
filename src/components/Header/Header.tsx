'use client'

import css from './Header.module.scss'
import { usePathname, useSearchParams } from 'next/navigation'
import { useMemo, useState, useCallback, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const origin = typeof window !== 'undefined' && window.location.origin

  const shareUrl = useMemo(() => {
    return `${origin}${pathname}?${searchParams}`
  }, [pathname, searchParams, origin])

  const [copied, setCopied] = useState(false)

  // Function to copy the URL to clipboard
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }, [shareUrl])

  // Reset copied state when shareUrl changes
  useEffect(() => {
    setCopied(false)
  }, [shareUrl])

  return (
    <header className={css.header}>
      <h1>
        Gear Kitting Tool <small>v0.1</small>
      </h1>
      <div className={css.shareBox}>
        {copied && <span className={css.copiedMessage}>Kit Saved To Clipboard!</span>}
        <button className={css.button} onClick={copyToClipboard}>
          Share Kit
        </button>
      </div>
    </header>
  )
}
