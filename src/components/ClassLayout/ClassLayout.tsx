'use client'

import { useGear } from '@/providers/GearProvider/GearProvider'
import DoubleSlot from '../DoubleSlot/DoubleSlot'
import SingleSlot from '../SingleSlot/SingleSlot'
import css from './ClassLayout.module.scss'
import classes from 'classnames'
import { useEffect } from 'react'

export default function ClassLayout() {
  const { state, currentGearScore } = useGear()

  useEffect(() => {
    console.log('state: ', state)
    console.log('state JSON: ', JSON.stringify(state))
  }, [state])

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
        />
        <DoubleSlot
          className={classes([css.classSlot, css.weapon2])}
          slotSlug={'weapon2'}
          leftItem={state.fullStore.weapon2?.primaryWeapon?.item}
          leftItemRarity={state.fullStore.weapon2?.primaryWeapon?.rarity}
          rightItem={state.fullStore.weapon2?.secondaryWeapon?.item}
          rightItemRarity={state.fullStore.weapon2?.secondaryWeapon?.rarity}
        />

        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.head])}
          slotSlug={'head'}
          item={state.fullStore.head?.item}
          itemRarity={state.fullStore.head?.rarity}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.necklace])}
          slotSlug={'necklace'}
          item={state.fullStore.necklace?.item}
          itemRarity={state.fullStore.necklace?.rarity}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.hands])}
          slotSlug={'hands'}
          item={state.fullStore.hands?.item}
          itemRarity={state.fullStore.hands?.rarity}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.chest])}
          slotSlug={'chest'}
          item={state.fullStore.chest?.item}
          itemRarity={state.fullStore.chest?.rarity}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.back])}
          slotSlug={'back'}
          item={state.fullStore.back?.item}
          itemRarity={state.fullStore.back?.rarity}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring1])}
          slotSlug={'ring1'}
          item={state.fullStore.ring1?.item}
          itemRarity={state.fullStore.ring1?.rarity}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.legs])}
          slotSlug={'legs'}
          item={state.fullStore.legs?.item}
          itemRarity={state.fullStore.legs?.rarity}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring2])}
          slotSlug={'ring2'}
          item={state.fullStore.ring2?.item}
          itemRarity={state.fullStore.ring2?.rarity}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.feet])}
          slotSlug={'feet'}
          item={state.fullStore.feet?.item}
          itemRarity={state.fullStore.feet?.rarity}
        />

        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility1])}
          slotSlug={'utility1'}
          item={state.fullStore.utility1?.item}
          itemRarity={state.fullStore.utility1?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility2])}
          slotSlug={'utility2'}
          item={state.fullStore.utility2?.item}
          itemRarity={state.fullStore.utility2?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility3])}
          slotSlug={'utility3'}
          item={state.fullStore.utility3?.item}
          itemRarity={state.fullStore.utility3?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility4])}
          slotSlug={'utility4'}
          item={state.fullStore.utility4?.item}
          itemRarity={state.fullStore.utility4?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility5])}
          slotSlug={'utility5'}
          item={state.fullStore.utility5?.item}
          itemRarity={state.fullStore.utility5?.rarity}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility6])}
          slotSlug={'utility6'}
          item={state.fullStore.utility6?.item}
          itemRarity={state.fullStore.utility6?.rarity}
        />
      </div>
    </section>
  )
}
