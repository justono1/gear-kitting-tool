'use client'

import { useGear } from '@/providers/GearProvider/GearProvider'
import DoubleSlot from '../DoubleSlot/DoubleSlot'
import SingleSlot from '../SingleSlot/SingleSlot'
import css from './ClassLayout.module.scss'
import classes from 'classnames'
import Progress from '../Progress/Progress'

const maxGearScore = 830

interface ClassLayoutProps {
  isLocked?: boolean
}

export default function ClassLayout({ isLocked = false }: ClassLayoutProps) {
  const {
    state,
    currentGearScore,
    setMarketBrowserTabsIsOpen,
    marketBrowserTabsIsOpen,
    scrollToRef,
  } = useGear()

  const handleSlotClick = (slot: string) => {
    if (slot && !isLocked) {
      setMarketBrowserTabsIsOpen({
        ...marketBrowserTabsIsOpen,
        [slot]: true,
      })
      scrollToRef(slot)
    }
  }

  return (
    <section>
      <div className={css.gearScoreLevel}>
        <h2>Gear Score: {currentGearScore}</h2>
        <Progress
          className={css.progress}
          progress={Math.round((currentGearScore / maxGearScore) * 100)}
          increments={[
            { label: '24', value: Math.round((24 / maxGearScore) * 100) },
            { label: '124', value: Math.round((124 / maxGearScore) * 100) },
            { label: '225', value: Math.round((225 / maxGearScore) * 100) },
          ]}
        />
      </div>
      <div className={css.classLayout}>
        <DoubleSlot
          className={classes([css.classSlot, css.weapon1])}
          slotSlug={'weapon1'}
          leftItem={state.slots.weapon1?.primaryWeapon?.item}
          leftItemRarity={state.slots.weapon1?.primaryWeapon?.rarity}
          rightItem={state.slots.weapon1?.secondaryWeapon?.item}
          rightItemRarity={state.slots.weapon1?.secondaryWeapon?.rarity}
          onLeftClick={() => handleSlotClick('primaryWeapon')}
          isLocked={isLocked}
        />
        <DoubleSlot
          className={classes([css.classSlot, css.weapon2])}
          slotSlug={'weapon2'}
          leftItem={state.slots.weapon2?.primaryWeapon?.item}
          leftItemRarity={state.slots.weapon2?.primaryWeapon?.rarity}
          rightItem={state.slots.weapon2?.secondaryWeapon?.item}
          rightItemRarity={state.slots.weapon2?.secondaryWeapon?.rarity}
          onLeftClick={() => handleSlotClick('primaryWeapon')}
          isLocked={isLocked}
        />

        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.head])}
          slotSlug={'head'}
          item={state.slots.head?.item}
          itemRarity={state.slots.head?.rarity}
          onLeftClick={() => handleSlotClick('head')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.necklace])}
          slotSlug={'necklace'}
          item={state.slots.necklace?.item}
          itemRarity={state.slots.necklace?.rarity}
          onLeftClick={() => handleSlotClick('necklace')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.hands])}
          slotSlug={'hands'}
          item={state.slots.hands?.item}
          itemRarity={state.slots.hands?.rarity}
          onLeftClick={() => handleSlotClick('hands')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.chest])}
          slotSlug={'chest'}
          item={state.slots.chest?.item}
          itemRarity={state.slots.chest?.rarity}
          onLeftClick={() => handleSlotClick('chest')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.back])}
          slotSlug={'back'}
          item={state.slots.back?.item}
          itemRarity={state.slots.back?.rarity}
          onLeftClick={() => handleSlotClick('back')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring1])}
          slotSlug={'ring1'}
          item={state.slots.ring1?.item}
          itemRarity={state.slots.ring1?.rarity}
          onLeftClick={() => handleSlotClick('ring')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.legs])}
          slotSlug={'legs'}
          item={state.slots.legs?.item}
          itemRarity={state.slots.legs?.rarity}
          onLeftClick={() => handleSlotClick('legs')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring2])}
          slotSlug={'ring2'}
          item={state.slots.ring2?.item}
          itemRarity={state.slots.ring2?.rarity}
          onLeftClick={() => handleSlotClick('ring')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.feet])}
          slotSlug={'feet'}
          item={state.slots.feet?.item}
          itemRarity={state.slots.feet?.rarity}
          onLeftClick={() => handleSlotClick('feet')}
          isLocked={isLocked}
        />

        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility1])}
          slotSlug={'utility1'}
          item={state.slots.utility1?.item}
          itemRarity={state.slots.utility1?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility2])}
          slotSlug={'utility2'}
          item={state.slots.utility2?.item}
          itemRarity={state.slots.utility2?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility3])}
          slotSlug={'utility3'}
          item={state.slots.utility3?.item}
          itemRarity={state.slots.utility3?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility4])}
          slotSlug={'utility4'}
          item={state.slots.utility4?.item}
          itemRarity={state.slots.utility4?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility5])}
          slotSlug={'utility5'}
          item={state.slots.utility5?.item}
          itemRarity={state.slots.utility5?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
          isLocked={isLocked}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility6])}
          slotSlug={'utility6'}
          item={state.slots.utility6?.item}
          itemRarity={state.slots.utility6?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
          isLocked={isLocked}
        />
      </div>
    </section>
  )
}
