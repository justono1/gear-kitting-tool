'use client'

import { v4 as uuidv4 } from 'uuid'
import { Item } from 'payload-types'
import css from './MarketBrowser.module.scss'
import { useEffect, useMemo, useState } from 'react'
import Collapsible from '../Collapsible/Collapsible'
import ItemButton from '../ItemButton/ItemButton'
import Filters from './Filters/Filters'
import { useGear } from '@/providers/GearProvider/GearProvider'
import { getGearScore } from '@/providers/GearProvider/utils'
import { titleCaseToCamelCase } from '@/common/utils/humanToSlug'

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
const customSlotOrder = [
  'Primary Weapon',
  'Secondary Weapon',
  'Head',
  'Necklace',
  'Hands',
  'Chest',
  'Back',
  'Ring',
  'Legs',
  'Feet',
  'Utility',
]

// Custom sort function for slots
const customSortFunction = (a: string, b: string) => {
  const indexA = customSlotOrder.indexOf(a)
  const indexB = customSlotOrder.indexOf(b)

  if (indexA === -1 && indexB === -1) {
    return a.localeCompare(b)
  } else if (indexA === -1) {
    return 1
  } else if (indexB === -1) {
    return -1
  } else {
    return indexA - indexB
  }
}

export default function MarketBrowser({ data }: MarketBrowserProps) {
  const {
    updateSlot,
    marketBrowserTabsIsOpen,
    setMarketBrowserTabsIsOpen,
    registerRef,
    selectedCharacterPerks,
    selectedCharacterClass,
    setSelectedCharacterPerks,
    setSelectedCharacterClass,
  } = useGear()

  const handleOnCollapseClose = (slot: string) => {
    setMarketBrowserTabsIsOpen({
      ...marketBrowserTabsIsOpen,
      [slot]: false,
    })
  }

  const marketItemList = useMemo(() => {
    const filteredData =
      selectedCharacterPerks !== 'weaponSpecialist'
        ? data.filter((item) => item.class.includes(selectedCharacterClass))
        : data

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
      .sort(customSortFunction)
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
  }, [data, selectedCharacterClass, selectedCharacterPerks])

  return (
    <>
      <Filters
        selectedCharacterClass={selectedCharacterClass}
        setSelectedCharacterClass={setSelectedCharacterClass}
        selectedCharacterPerks={selectedCharacterPerks}
        setSelectedCharacterPerks={setSelectedCharacterPerks}
      />

      <div className={css.itemSectionContainer}>
        <h2>Items:</h2>
        {Object.entries(marketItemList).map(([slot, primaryTypes]) => {
          const slotSlug = titleCaseToCamelCase(slot)

          return (
            <Collapsible
              key={slot}
              title={slot}
              // @ts-ignore
              isOpen={marketBrowserTabsIsOpen[slotSlug]}
              onClose={() => handleOnCollapseClose(titleCaseToCamelCase(slot))}
              // @ts-ignore
              ref={(el) => registerRef(slotSlug, { current: el })}
            >
              {Object.entries(primaryTypes).map(([primaryType, itemNames]) => (
                <Collapsible key={primaryType} title={primaryType} innerHeader={true}>
                  {Object.entries(itemNames).map(([itemName, rarities]) => (
                    <Collapsible key={itemName} title={itemName} innerHeader={true}>
                      {rarityOrder.map((rarity) => {
                        return (
                          rarities[rarity] && (
                            <ItemButton
                              key={`${uuidv4()}-${rarity}`}
                              onClick={() => updateSlot(rarities[rarity][0], rarity.toLowerCase())}
                            >
                              <div className={css.itemRow}>
                                <div>{rarity}</div>
                                <div>-</div>
                                <div className={css.gearScore}>
                                  Gear Score:{' '}
                                  {getGearScore(rarities[rarity][0], rarity.toLowerCase())}
                                </div>
                              </div>
                            </ItemButton>
                          )
                        )
                      })}
                    </Collapsible>
                  ))}
                </Collapsible>
              ))}
            </Collapsible>
          )
        })}
      </div>
    </>
  )
}
