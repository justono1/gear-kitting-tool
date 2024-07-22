import css from './page.module.scss'
import ClassLayout from '@/components/ClassLayout/ClassLayout'
import React from 'react'
import { getPayload } from '@/utils/payload'
import MarketBrowser from '@/components/MarketBrowser/MarketBrowser'

export default async function Page() {
  const payload = await getPayload()

  const itemDataResponse = await payload.find({
    collection: 'items',
    limit: 0,
  })

  const itemData = itemDataResponse.docs

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
      <section className={css.gridContainer}>
        <div className={css.itemColumn}>
          <MarketBrowser data={itemData} />
        </div>
        <div className={css.slotColumn}>
          <ClassLayout />
        </div>
      </section>
    </>
  )
}
