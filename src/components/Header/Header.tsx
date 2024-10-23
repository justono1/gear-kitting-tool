'use client'

import { useGear } from '@/providers/GearProvider/GearProvider'
import css from './Header.module.scss'
import { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const { shareUrl, selectedCharacterClass } = useGear()

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
  }, [shareUrl, selectedCharacterClass])

  // Reset copied state when shareUrl changes
  useEffect(() => {
    setCopied(false)
  }, [shareUrl, selectedCharacterClass])

  return (
    <header className={css.header}>
      <h1>
        <Link className={'h1'} href="/">
          Gear Kitting Tool
        </Link>{' '}
        <small>v0.2</small>
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
