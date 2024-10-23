import css from './page.module.scss'
import ClassLayout from '@/components/ClassLayout/ClassLayout'
import React, { Suspense } from 'react'
import { getPayload } from '@/common/utils/payload'
import MarketBrowser from '@/components/MarketBrowser/MarketBrowser'
import Header from '@/components/Header/Header'
import { GearProvider } from '@/providers/GearProvider/GearProvider'
import KitDetail from '@/components/KitDetail/KitDetail'

export default async function Page() {
  const payload = await getPayload()

  const itemDataResponse = await payload.find({
    collection: 'items',
    limit: 0,
  })

  const itemData = itemDataResponse.docs

  return (
    <Suspense fallback={<div>Loading</div>}>
      <GearProvider itemData={itemData} mode={'share'}>
        <Header />
        <section className={css.gridContainer}>
          <div className={css.itemColumn}>
            <KitDetail />
          </div>
          <div className={css.slotColumn}>
            <ClassLayout isLocked={true} />
          </div>
        </section>
      </GearProvider>
    </Suspense>
  )
}
