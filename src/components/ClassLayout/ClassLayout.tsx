'use client'

import { useGear } from '@/providers/GearProvider'
import DoubleSlot from '../DoubleSlot/DoubleSlot'
import SingleSlot from '../SingleSlot/SingleSlot'
import css from './ClassLayout.module.scss'
import classes from 'classnames'

export default function ClassLayout() {
  const { state, currentGearScore } = useGear()

  const gearScore = currentGearScore()

  return (
    <section>
      <h2>Gear Score: {gearScore}</h2>
      <div className={css.classLayout}>
        <DoubleSlot
          className={classes([css.classSlot, css.weapon1])}
          slotSlug={'weapon1'}
          leftItem={state.weapon1?.primaryWeapon}
          rightItem={state.weapon1?.secondaryWeapon}
        />
        <DoubleSlot
          className={classes([css.classSlot, css.weapon2])}
          slotSlug={'weapon2'}
          leftItem={state.weapon2?.primaryWeapon}
          rightItem={state.weapon2?.secondaryWeapon}
        />

        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.head])}
          slotSlug={'head'}
          item={state.head}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.necklace])}
          slotSlug={'necklace'}
          item={state.necklace}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.hands])}
          slotSlug={'hands'}
          item={state.hands}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.chest])}
          slotSlug={'chest'}
          item={state.chest}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.back])}
          slotSlug={'back'}
          item={state.back}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring1])}
          slotSlug={'ring1'}
          item={state.ring1}
        />
        <SingleSlot
          slotSize={'large'}
          className={classes([css.classSlot, css.legs])}
          slotSlug={'legs'}
          item={state.legs}
        />
        <SingleSlot
          slotSize={'tiny'}
          className={classes([css.classSlot, css.ring2])}
          slotSlug={'ring2'}
          item={state.ring2}
        />
        <SingleSlot
          slotSize={'medium'}
          className={classes([css.classSlot, css.feet])}
          slotSlug={'feet'}
          item={state.feet}
        />

        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility1])}
          slotSlug={'utility1'}
          item={state.utility1}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility2])}
          slotSlug={'utility2'}
          item={state.utility2}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility3])}
          slotSlug={'utility3'}
          item={state.utility3}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility4])}
          slotSlug={'utility4'}
          item={state.utility4}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility5])}
          slotSlug={'utility5'}
          item={state.utility5}
        />
        <SingleSlot
          slotSize={'small'}
          className={classes([css.classSlot, css.utility6])}
          slotSlug={'utility6'}
          item={state.utility6}
        />
      </div>
    </section>
  )
}
