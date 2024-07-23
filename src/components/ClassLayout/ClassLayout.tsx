'use client'

import { useGear } from '@/providers/GearProvider/GearProvider'
import DoubleSlot from '../DoubleSlot/DoubleSlot'
import SingleSlot from '../SingleSlot/SingleSlot'
import css from './ClassLayout.module.scss'
import classes from 'classnames'
import { useEffect } from 'react'

export default function ClassLayout() {
  const { state, currentGearScore } = useGear()

  return (
    <section>
      <h2>Gear Score: {currentGearScore}</h2>
      <div className={css.classLayout}>
        <DoubleSlot
          className={classes([css.classSlot, css.weapon1])}
          slotSlug={'weapon1'}
          leftItem={state.weapon1?.primaryWeapon?.item}
          leftItemRarity={state.weapon1?.primaryWeapon?.rarity}
          rightItem={state.weapon1?.secondaryWeapon?.item}
          rightItemRarity={state.weapon1?.secondaryWeapon?.rarity}
        />
        <DoubleSlot
          className={classes([css.classSlot, css.weapon2])}
          slotSlug={'weapon2'}
          leftItem={state.weapon2?.primaryWeapon?.item}
          leftItemRarity={state.weapon2?.primaryWeapon?.rarity}
          rightItem={state.weapon2?.secondaryWeapon?.item}
          rightItemRarity={state.weapon2?.secondaryWeapon?.rarity}
        />

        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.head])}
          slotSlug={'head'}
          item={state.head?.item}
          itemRarity={state.head?.rarity}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.necklace])}
          slotSlug={'necklace'}
          item={state.necklace?.item}
          itemRarity={state.necklace?.rarity}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.hands])}
          slotSlug={'hands'}
          item={state.hands?.item}
          itemRarity={state.hands?.rarity}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.chest])}
          slotSlug={'chest'}
          item={state.chest?.item}
          itemRarity={state.chest?.rarity}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.back])}
          slotSlug={'back'}
          item={state.back?.item}
          itemRarity={state.back?.rarity}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring1])}
          slotSlug={'ring1'}
          item={state.ring1?.item}
          itemRarity={state.ring1?.rarity}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.legs])}
          slotSlug={'legs'}
          item={state.legs?.item}
          itemRarity={state.legs?.rarity}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring2])}
          slotSlug={'ring2'}
          item={state.ring2?.item}
          itemRarity={state.ring2?.rarity}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.feet])}
          slotSlug={'feet'}
          item={state.feet?.item}
          itemRarity={state.feet?.rarity}
        />

        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility1])}
          slotSlug={'utility1'}
          item={state.utility1?.item}
          itemRarity={state.utility1?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility2])}
          slotSlug={'utility2'}
          item={state.utility2?.item}
          itemRarity={state.utility2?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility3])}
          slotSlug={'utility3'}
          item={state.utility3?.item}
          itemRarity={state.utility3?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility4])}
          slotSlug={'utility4'}
          item={state.utility4?.item}
          itemRarity={state.utility4?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility5])}
          slotSlug={'utility5'}
          item={state.utility5?.item}
          itemRarity={state.utility5?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility6])}
          slotSlug={'utility6'}
          item={state.utility6?.item}
          itemRarity={state.utility6?.rarity}
        />
      </div>
    </section>
  )
}
