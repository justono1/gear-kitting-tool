'use client'

import InputRadio from '@/components/InputRadio/InputRadio'
import css from './Filters.module.scss'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { CharacterClass } from '../MarketBrowser'

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
}

export default function Filters({
  selectedCharacterClass,
  setSelectedCharacterClass,
}: FiltersProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCharacterClass(event.target.value as CharacterClass) // cast type here as the classList value is controlled above
  }

  return (
    <div className={css.classSectionContainer}>
      <h2>Class:</h2>
      <div className={css.classSelector}>
        {classList.map((characterClass) => (
          <InputRadio
            key={characterClass.value}
            name="class"
            value={characterClass.value}
            label={characterClass.label}
            checked={selectedCharacterClass === characterClass.value}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  )
}
