'use client'

import { useGear } from '@/providers/GearProvider/GearProvider'
import css from './KitDetail.module.scss'
import { GearSlot } from '@/providers/GearProvider/types'
import { camelCaseToTitleCase } from '@/common/utils/slugToHuman'
import classes from 'classnames'
import { getGearScore } from '@/providers/GearProvider/utils'

export default function KitDetail() {
  const { state } = useGear()

  return (
    <div>
      <h2>Kit Detail: </h2>
      {Object.keys(state.slots).map((key) => {
        // @ts-ignore
        const slotData = state.slots[key]

        return (
          <div key={`kitDetail-${key}`} className={css.slotDetail}>
            <h3 className={css.slotHeader}>{camelCaseToTitleCase(key)}</h3>
            {key === 'weapon1' || key == 'weapon2' ? (
              <>
                <p className={slotData.secondaryWeapon?.item ? css.primaryWeapon : ''}>
                  Primary Weapon:{' '}
                  <span className={classes(css.slotValue, css.ml)}>
                    {slotData?.primaryWeapon?.item?.itemName} - Gear Score:{' '}
                    {getGearScore(slotData?.primaryWeapon?.item, slotData.primaryWeapon.rarity)}
                  </span>
                </p>
                {slotData.secondaryWeapon?.item && (
                  <p>
                    Secondary Weapon:{' '}
                    <span className={classes(css.slotValue, css.ml)}>
                      {slotData?.secondaryWeapon?.item?.itemName} - Gear Score:{' '}
                      {getGearScore(
                        slotData?.secondaryWeapon?.item,
                        slotData.secondaryWeapon.rarity,
                      )}
                    </span>
                  </p>
                )}
              </>
            ) : (
              <p>
                <span className={css.slotValue}>
                  {slotData?.item?.itemName ? (
                    <>
                      {slotData?.item?.itemName} - Gear Score:{' '}
                      {getGearScore(slotData?.item, slotData?.rarity)}
                    </>
                  ) : (
                    'N/A'
                  )}
                </span>
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
