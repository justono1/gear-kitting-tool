import css from './page.module.scss'
import classes from 'classnames'
import ClassLayout from '@/components/ClassLayout/ClassLayout'
import InputRadio from '@/components/InputRadio/InputRadio'
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
        </div>
        <div className={css.slotColumn}>
          <ClassLayout />
        </div>
      </section>
    </>
  )
}

export default Page
