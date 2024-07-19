import DoubleSlot from '../DoubleSlot/DoubleSlot'
import SingleSlot from '../SingleSlot/SingleSlot'
import css from './ClassLayout.module.scss'
import classes from 'classnames'

export default function ClassLayout() {
  return (
    <section>
      <h2>Gear Score: 124</h2>
      <div className={css.classLayout}>
        <DoubleSlot className={classes([css.classSlot, css.primaryWeapon])} />
        <DoubleSlot className={classes([css.classSlot, css.secondaryWeapon])} />

        <SingleSlot slotSize={'medium'} className={classes([css.classSlot, css.head])} />
        <SingleSlot slotSize={'tiny'} className={classes([css.classSlot, css.necklace])} />
        <SingleSlot slotSize={'medium'} className={classes([css.classSlot, css.hands])} />
        <SingleSlot slotSize={'large'} className={classes([css.classSlot, css.chest])} />
        <SingleSlot slotSize={'medium'} className={classes([css.classSlot, css.back])} />
        <SingleSlot slotSize={'tiny'} className={classes([css.classSlot, css.ring1])} />
        <SingleSlot slotSize={'large'} className={classes([css.classSlot, css.legs])} />
        <SingleSlot slotSize={'tiny'} className={classes([css.classSlot, css.ring2])} />
        <SingleSlot slotSize={'medium'} className={classes([css.classSlot, css.feet])} />

        <SingleSlot slotSize={'small'} className={classes([css.classSlot, css.utility1])} />
        <SingleSlot slotSize={'small'} className={classes([css.classSlot, css.utility2])} />
        <SingleSlot slotSize={'small'} className={classes([css.classSlot, css.utility3])} />
        <SingleSlot slotSize={'small'} className={classes([css.classSlot, css.utility4])} />
        <SingleSlot slotSize={'small'} className={classes([css.classSlot, css.utility5])} />
        <SingleSlot slotSize={'small'} className={classes([css.classSlot, css.utility6])} />
      </div>
    </section>
  )
}
