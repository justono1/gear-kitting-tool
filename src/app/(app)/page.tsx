import css from './page.module.scss'
import ClassLayout from '@/components/ClassLayout/ClassLayout'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
      <header className={css.header}>
        <h1>
          Gear Kitting Tool <small>v0.1</small>
        </h1>
        <div className={css.shareBox}>
          <input
            className={css.inputText}
            type="text"
            value={'https://gearkittingtool.com/share/1231h-231h23jjjj'}
          />
          <button className={css.button}>Share Kit</button>
        </div>
      </header>
      <section>
        <div></div>
        <ClassLayout />
      </section>
    </>
  )
}

export default Page
