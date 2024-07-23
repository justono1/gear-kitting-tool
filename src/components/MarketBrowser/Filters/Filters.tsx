'use client'

import InputRadio from '@/components/InputRadio/InputRadio'
import css from './Filters.module.scss'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { CharacterClass, CharacterPerks } from '../MarketBrowser'
import InputCheckbox from '@/components/InputCheckbox/InputCheckbox'

const classList = [
  { value: 'barbarian', label: 'Barbarian' },
  { value: 'bard', label: 'Bard' },
  { value: 'cleric', label: 'Cleric' },
  { value: 'druid', label: 'Druid' },
  { value: 'fighter', label: 'Fighter' },
  { value: 'ranger', label: 'Ranger' },
  { value: 'rouge', label: 'Rouge' },
  { value: 'warlock', label: 'Warlock' },
  { value: 'wizard', label: 'Wizard' },
]

interface FiltersProps {
  selectedCharacterClass: CharacterClass
  setSelectedCharacterClass: Dispatch<SetStateAction<CharacterClass>>
  selectedCharacterPerks: CharacterPerks
  setSelectedCharacterPerks: Dispatch<SetStateAction<CharacterPerks>>
}

export default function Filters({
  selectedCharacterClass,
  setSelectedCharacterClass,
  selectedCharacterPerks,
  setSelectedCharacterPerks,
}: FiltersProps) {
  const handleClassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCharacterClass(event.target.value as CharacterClass) // cast type here as the classList value is controlled above
  }

  // This filter is just scoped to fighter market item limiter atm not extensive perk menu
  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCharacterPerks('weaponSpecialist') // cast type here as the classList value is controlled above
    } else {
      setSelectedCharacterPerks(null) // cast type here as the classList value is controlled above
    }
  }

  return (
    <div className={css.filters}>
      <div className={css.filterItem}>
        <h2>Class:</h2>
        <div className={css.classSelector}>
          {classList.map((characterClass) => (
            <InputRadio
              key={characterClass.value}
              name="class"
              value={characterClass.value}
              label={characterClass.label}
              checked={selectedCharacterClass === characterClass.value}
              onChange={handleClassChange}
            />
          ))}
        </div>
      </div>
      {selectedCharacterClass === 'fighter' && (
        <div className={css.filterItem}>
          <h2>Perks:</h2>
          <InputCheckbox
            label={'Fighter Has Weapon Specialist'}
            value={'weaponSpecialist'}
            name={'perks'}
            onChange={handleFilterChange}
          />
        </div>
      )}
    </div>
  )
}
