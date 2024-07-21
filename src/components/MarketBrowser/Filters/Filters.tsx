'use client'

import InputRadio from '@/components/InputRadio/InputRadio'
import css from './Filters.module.scss'
import { ChangeEvent, useState } from 'react'

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

export default function Filters() {
  const [selectedCharacterClass, setSelectedCharacterClass] = useState<string>('barbarian')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCharacterClass(event.target.value)
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
