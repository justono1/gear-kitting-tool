import css from './page.module.scss'
import classes from 'classnames'
import ClassLayout from '@/components/ClassLayout/ClassLayout'
import InputRadio from '@/components/InputRadio/InputRadio'
import Link from 'next/link'
import React from 'react'
import Collapsible from '@/components/Collapsible/Collapsible'
import ItemButton from '@/components/ItemButton/ItemButton'
import { getPayload } from '@/utils/payload'
import { Item } from 'payload-types'

// type marketItemList = [ {[key: string]: marketItemList | string }];

interface MarketItemList {
  [slot: string]: {
    [primaryType: string]: {
      [itemName: string]: {
        [rarity: string]: Item[]
      }
    }
  }
}

export default async function Page() {
  const payload = await getPayload()

  const itemDataResponse = await payload.find({
    collection: 'items',
    limit: -1,
  })

  const itemData = itemDataResponse.docs
  const marketItemList = itemData.reduce<MarketItemList>((acc, item) => {
    const { slot, type, itemName, rarity } = item
    const primaryType = type && type.length > 0 ? type[0] : 'unknown'

    if (!acc[slot]) {
      acc[slot] = {}
    }

    if (!acc[slot][primaryType]) {
      acc[slot][primaryType] = {}
    }

    if (!acc[slot][primaryType][itemName]) {
      acc[slot][primaryType][itemName] = {}
    }

    rarity.forEach((r) => {
      if (!acc[slot][primaryType][itemName][r]) {
        acc[slot][primaryType][itemName][r] = []
      }
      acc[slot][primaryType][itemName][r].push(item)
    })

    return acc
  }, {})

  console.log(JSON.stringify(marketItemList))

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
          <div className={css.classSectionContainer}>
            <h2>Class:</h2>
            <div className={css.classSelector}>
              <InputRadio name="class" value="barbarian" label={'Barbarian'} />
              <InputRadio name="class" value="bard" label={'Bard'} />
              <InputRadio name="class" value="cleric" label={'Cleric'} />
              <InputRadio name="class" value="druid" label={'Druid'} />
              <InputRadio name="class" value="fighter" label={'Fighter'} />
              <InputRadio name="class" value="ranger" label={'Ranger'} />
              <InputRadio name="class" value="rouge" label={'Rouge'} />
              <InputRadio name="class" value="warlock" label={'Warlock'} />
              <InputRadio name="class" value="wizard" label={'Wizard'} />
            </div>
          </div>

          <div className={css.itemSectionContainer}>
            <h2>Items:</h2>
            <Collapsible title="Head">
              <Collapsible title="Plate" innerHeader={true}>
                <Collapsible title="Item Name" innerHeader={true}>
                  <ItemButton>Poor</ItemButton>
                  <ItemButton>Common</ItemButton>
                  <ItemButton>Uncommon</ItemButton>
                </Collapsible>
                <Collapsible title="Item Name" innerHeader={true}>
                  <ItemButton>Poor</ItemButton>
                  <ItemButton>Common</ItemButton>
                  <ItemButton>Uncommon</ItemButton>
                </Collapsible>
              </Collapsible>
              <Collapsible title="Leather" innerHeader={true}>
                <div>Item 1</div>
                <div>Item 2</div>
              </Collapsible>
              <Collapsible title="Cloth" innerHeader={true}>
                <div>Item 1</div>
                <div>Item 2</div>
              </Collapsible>
            </Collapsible>
            <Collapsible title="Chest" />
            <Collapsible title="Legs" />
            <Collapsible title="Feet" />
            <Collapsible title="Hands" />
            <Collapsible title="Primary Weapon" />
            <Collapsible title="Secondary Weapon" />
            <Collapsible title="Back" />
            <Collapsible title="Necklace" />
            <Collapsible title="Rings" />
            <Collapsible title="Utility" />
          </div>
        </div>
        <div className={css.slotColumn}>
          <ClassLayout />
        </div>
      </section>
    </>
  )
}
