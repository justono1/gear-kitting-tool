'use client'

import { useGear } from '@/providers/GearProvider/GearProvider'
import DoubleSlot from '../DoubleSlot/DoubleSlot'
import SingleSlot from '../SingleSlot/SingleSlot'
import css from './ClassLayout.module.scss'
import classes from 'classnames'
export default function ClassLayout() {
  const { state, currentGearScore, setMarketBrowserTabsIsOpen, marketBrowserTabsIsOpen } = useGear()

  const handleSlotClick = (slot: string) => {
    if (slot) {
      setMarketBrowserTabsIsOpen({
        ...marketBrowserTabsIsOpen,
        [slot]: true,
      })
    }
  }

  return (
    <section>
      <h2>Gear Score: {currentGearScore}</h2>
      <div className={css.classLayout}>
        <DoubleSlot
          className={classes([css.classSlot, css.weapon1])}
          slotSlug={'weapon1'}
          leftItem={state.fullStore.weapon1?.primaryWeapon?.item}
          leftItemRarity={state.fullStore.weapon1?.primaryWeapon?.rarity}
          rightItem={state.fullStore.weapon1?.secondaryWeapon?.item}
          rightItemRarity={state.fullStore.weapon1?.secondaryWeapon?.rarity}
          onLeftClick={() => handleSlotClick('primaryWeapon')}
        />
        <DoubleSlot
          className={classes([css.classSlot, css.weapon2])}
          slotSlug={'weapon2'}
          leftItem={state.fullStore.weapon2?.primaryWeapon?.item}
          leftItemRarity={state.fullStore.weapon2?.primaryWeapon?.rarity}
          rightItem={state.fullStore.weapon2?.secondaryWeapon?.item}
          rightItemRarity={state.fullStore.weapon2?.secondaryWeapon?.rarity}
          onLeftClick={() => handleSlotClick('primaryWeapon')}
        />

        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.head])}
          slotSlug={'head'}
          item={state.fullStore.head?.item}
          itemRarity={state.fullStore.head?.rarity}
          onLeftClick={() => handleSlotClick('head')}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.necklace])}
          slotSlug={'necklace'}
          item={state.fullStore.necklace?.item}
          itemRarity={state.fullStore.necklace?.rarity}
          onLeftClick={() => handleSlotClick('necklace')}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.hands])}
          slotSlug={'hands'}
          item={state.fullStore.hands?.item}
          itemRarity={state.fullStore.hands?.rarity}
          onLeftClick={() => handleSlotClick('hands')}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.chest])}
          slotSlug={'chest'}
          item={state.fullStore.chest?.item}
          itemRarity={state.fullStore.chest?.rarity}
          onLeftClick={() => handleSlotClick('chest')}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.back])}
          slotSlug={'back'}
          item={state.fullStore.back?.item}
          itemRarity={state.fullStore.back?.rarity}
          onLeftClick={() => handleSlotClick('back')}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring1])}
          slotSlug={'ring1'}
          item={state.fullStore.ring1?.item}
          itemRarity={state.fullStore.ring1?.rarity}
          onLeftClick={() => handleSlotClick('ring')}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.legs])}
          slotSlug={'legs'}
          item={state.fullStore.legs?.item}
          itemRarity={state.fullStore.legs?.rarity}
          onLeftClick={() => handleSlotClick('legs')}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring2])}
          slotSlug={'ring2'}
          item={state.fullStore.ring2?.item}
          itemRarity={state.fullStore.ring2?.rarity}
          onLeftClick={() => handleSlotClick('ring')}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.feet])}
          slotSlug={'feet'}
          item={state.fullStore.feet?.item}
          itemRarity={state.fullStore.feet?.rarity}
          onLeftClick={() => handleSlotClick('feet')}
        />

        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility1])}
          slotSlug={'utility1'}
          item={state.fullStore.utility1?.item}
          itemRarity={state.fullStore.utility1?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility2])}
          slotSlug={'utility2'}
          item={state.fullStore.utility2?.item}
          itemRarity={state.fullStore.utility2?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility3])}
          slotSlug={'utility3'}
          item={state.fullStore.utility3?.item}
          itemRarity={state.fullStore.utility3?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility4])}
          slotSlug={'utility4'}
          item={state.fullStore.utility4?.item}
          itemRarity={state.fullStore.utility4?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility5])}
          slotSlug={'utility5'}
          item={state.fullStore.utility5?.item}
          itemRarity={state.fullStore.utility5?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility6])}
          slotSlug={'utility6'}
          item={state.fullStore.utility6?.item}
          itemRarity={state.fullStore.utility6?.rarity}
          onLeftClick={() => handleSlotClick('utility')}
        />
      </div>
    </section>
  )
}
