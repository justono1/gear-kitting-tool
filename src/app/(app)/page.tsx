import css from './page.module.scss'
import classes from 'classnames'
import ClassLayout from '@/components/ClassLayout/ClassLayout'
import InputRadio from '@/components/InputRadio/InputRadio'
import Link from 'next/link'
import React from 'react'
import Collapsible from '@/components/Collapsible/Collapsible'

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
                  <div>Poor</div>
                  <div>Common</div>
                  <div>Uncommon</div>
                </Collapsible>
                <Collapsible title="Item Name" innerHeader={true}>
                  <div>Poor</div>
                  <div>Common</div>
                  <div>Uncommon</div>
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

export default Page
