'use client'

import { v4 as uuidv4 } from 'uuid'
import { Item } from 'payload-types'
import css from './MarketBrowser.module.scss'
import { useMemo, useState } from 'react'
import Collapsible from '../Collapsible/Collapsible'
import ItemButton from '../ItemButton/ItemButton'
import Filters from './Filters/Filters'
import { useGear } from '@/providers/GearProvider/GearProvider'

interface MarketItemList {
  [slot: string]: {
    [primaryType: string]: {
      [itemName: string]: {
        [rarity: string]: Item[]
      }
    }
  }
}

interface MarketBrowserProps {
  data: Item[]
}

const toTitleCase = (stringToFormat: string) => {
  return stringToFormat
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (firstChar) => firstChar.toUpperCase())
}

const rarityOrder = ['Poor', 'Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Unique']
export type CharacterClass =
  | 'barbarian'
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'ranger'
  | 'rouge'
  | 'warlock'
  | 'wizard'

export default function MarketBrowser({ data }: MarketBrowserProps) {
  const { updateSlot } = useGear()
  const [selectedCharacterClass, setSelectedCharacterClass] = useState<CharacterClass>('fighter')

  const marketItemList = useMemo(() => {
    const filteredData = data.filter((item) => item.class.includes(selectedCharacterClass))

    const foundationData = filteredData.reduce<MarketItemList>((acc, item) => {
      const { slot, type, itemName, rarity } = item
      const primaryType = type && type.length > 0 ? toTitleCase(type[0]) : 'Unknown'

      const formattedSlot = toTitleCase(slot)

      if (!acc[formattedSlot]) {
        acc[formattedSlot] = {}
      }

      if (!acc[formattedSlot][primaryType]) {
        acc[formattedSlot][primaryType] = {}
      }

      if (!acc[formattedSlot][primaryType][itemName]) {
        acc[formattedSlot][primaryType][itemName] = {}
      }

      rarity.forEach((r) => {
        const formattedRarity = toTitleCase(r)
        if (!acc[formattedSlot][primaryType][itemName][formattedRarity]) {
          acc[formattedSlot][primaryType][itemName][formattedRarity] = []
        }
        acc[formattedSlot][primaryType][itemName][formattedRarity].push(item)
      })

      return acc
    }, {})

    const sortedMarketItemList: MarketItemList = {}

    // Sort the slots
    Object.keys(foundationData)
      .sort()
      .forEach((slot) => {
        sortedMarketItemList[slot] = {}

        // Sort the primary types within each slot
        Object.keys(foundationData[slot])
          .sort()
          .forEach((primaryType) => {
            sortedMarketItemList[slot][primaryType] = {}

            // Sort the item names within each primary type
            Object.keys(foundationData[slot][primaryType])
              .sort()
              .forEach((itemName) => {
                sortedMarketItemList[slot][primaryType][itemName] = {}

                // Preserve the order of rarities
                rarityOrder.forEach((rarity) => {
                  if (foundationData[slot][primaryType][itemName][rarity]) {
                    sortedMarketItemList[slot][primaryType][itemName][rarity] =
                      foundationData[slot][primaryType][itemName][rarity]
                  }
                })
              })
          })
      })

    return sortedMarketItemList
  }, [data, selectedCharacterClass])

  return (
    <>
      <Filters
        selectedCharacterClass={selectedCharacterClass}
        setSelectedCharacterClass={setSelectedCharacterClass}
      />

      <div className={css.itemSectionContainer}>
        <h2>Items:</h2>
        {Object.entries(marketItemList).map(([slot, primaryTypes]) => (
          <Collapsible key={slot} title={slot}>
            {Object.entries(primaryTypes).map(([primaryType, itemNames]) => (
              <Collapsible key={primaryType} title={primaryType} innerHeader={true}>
                {Object.entries(itemNames).map(([itemName, rarities]) => (
                  <Collapsible key={itemName} title={itemName} innerHeader={true}>
                    {rarityOrder.map(
                      (rarity) =>
                        rarities[rarity] && (
                          <ItemButton
                            key={`${uuidv4()}-${rarity}`}
                            onClick={() => updateSlot(rarities[rarity][0], rarity.toLowerCase())}
                          >
                            {rarity}
                          </ItemButton>
                        ),
                    )}
                  </Collapsible>
                ))}
              </Collapsible>
            ))}
          </Collapsible>
        ))}
      </div>
    </>
  )
}
