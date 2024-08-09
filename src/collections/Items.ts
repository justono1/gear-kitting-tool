import { CollectionConfig } from 'payload'
import collectionAutoIncrement from './hooks/collectionAutoIncrement'

const Items: CollectionConfig = {
  auth: false, // if using collectionAutoIncrement need to set default
  slug: 'items',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'itemName',
  },
  hooks: {
    // add to a collection to auto increment fields
    beforeChange: [collectionAutoIncrement],
  },
  fields: [
    {
      name: 'shortId',
      type: 'number',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
      // used with collectionAutoIncrement (can add to multiple fields)
      custom: {
        increment: true,
        firstIncrementNumber: 1,
      },
    },
    {
      name: 'itemName',
      type: 'text',
      required: true,
    },
    {
      name: 'rarity',
      type: 'select',
      required: true,
      hasMany: true,
      defaultValue: ['poor', 'common', 'uncommon', 'rare', 'epic', 'legendary', 'unique'],
      options: [
        {
          label: 'Poor',
          value: 'poor',
        },
        {
          label: 'Common',
          value: 'common',
        },
        {
          label: 'Uncommon',
          value: 'uncommon',
        },
        {
          label: 'Rare',
          value: 'rare',
        },
        {
          label: 'Epic',
          value: 'epic',
        },
        {
          label: 'Legendary',
          value: 'legendary',
        },
        {
          label: 'Unique',
          value: 'unique',
        },
      ],
    },
    {
      name: 'class',
      type: 'select',
      required: true,
      hasMany: true,
      defaultValue: [
        'barbarian',
        'bard',
        'cleric',
        'druid',
        'fighter',
        'ranger',
        'rouge',
        'warlock',
        'wizard',
      ],
      options: [
        {
          label: 'Barbarian',
          value: 'barbarian',
        },
        {
          label: 'Bard',
          value: 'bard',
        },
        {
          label: 'Cleric',
          value: 'cleric',
        },
        {
          label: 'Druid',
          value: 'druid',
        },
        {
          label: 'Fighter',
          value: 'fighter',
        },
        {
          label: 'Ranger',
          value: 'ranger',
        },
        {
          label: 'Rouge',
          value: 'rouge',
        },
        {
          label: 'Warlock',
          value: 'warlock',
        },
        {
          label: 'Wizard',
          value: 'wizard',
        },
      ],
    },
    {
      name: 'slot',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Back',
          value: 'back',
        },
        {
          label: 'Chest',
          value: 'chest',
        },
        {
          label: 'Feet',
          value: 'feet',
        },
        {
          label: 'Hands',
          value: 'hands',
        },
        {
          label: 'Head',
          value: 'head',
        },
        {
          label: 'Legs',
          value: 'legs',
        },
        {
          label: 'Necklace',
          value: 'necklace',
        },
        {
          label: 'Primary Weapon',
          value: 'primaryWeapon',
        },
        {
          label: 'Ring',
          value: 'ring',
        },
        {
          label: 'Secondary Weapon',
          value: 'secondaryWeapon',
        },
        {
          label: 'Utility',
          value: 'utility',
        },
      ],
    },
    {
      name: 'handType',
      type: 'select',
      options: [
        {
          label: 'One Handed',
          value: 'oneHanded',
        },
        {
          label: 'Two Handed',
          value: 'twoHanded',
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Arrow',
          value: 'arrow',
        },
        {
          label: 'Axe',
          value: 'axe',
        },
        {
          label: 'Bolt',
          value: 'bolt',
        },
        {
          label: 'Bow',
          value: 'bow',
        },
        {
          label: 'Cloth',
          value: 'cloth',
        },
        {
          label: 'Consumable',
          value: 'consumable',
        },
        {
          label: 'Crossbow',
          value: 'crossbow',
        },
        {
          label: 'Currency',
          value: 'currency',
        },
        {
          label: 'Dagger',
          value: 'dagger',
        },
        {
          label: 'Drink',
          value: 'drink',
        },
        {
          label: 'Gem',
          value: 'gem',
        },
        {
          label: 'Gold Container',
          value: 'goldContainer',
        },
        {
          label: 'Herb',
          value: 'herb',
        },
        {
          label: 'Hunting Loot',
          value: 'huntingLoot',
        },
        {
          label: 'Ingot',
          value: 'ingot',
        },
        {
          label: 'Leather',
          value: 'leather',
        },
        {
          label: 'Light Source',
          value: 'lightSource',
        },
        {
          label: 'Mace',
          value: 'mace',
        },
        {
          label: 'Magic Stuff',
          value: 'magicStuff',
        },
        {
          label: 'Mining',
          value: 'mining',
        },
        {
          label: 'Necklace',
          value: 'necklace',
        },
        {
          label: 'Ore',
          value: 'ore',
        },
        {
          label: 'Percussion',
          value: 'percussion',
        },
        {
          label: 'Plate',
          value: 'plate',
        },
        {
          label: 'Polearm',
          value: 'polearm',
        },
        {
          label: 'Powder',
          value: 'powder',
        },
        {
          label: 'Ring',
          value: 'ring',
        },
        {
          label: 'Shield',
          value: 'shield',
        },
        {
          label: 'Staff',
          value: 'staff',
        },
        {
          label: 'String',
          value: 'string',
        },
        {
          label: 'Sword',
          value: 'sword',
        },
        {
          label: 'Throwable',
          value: 'throwable',
        },
        {
          label: 'Trap',
          value: 'trap',
        },
        {
          label: 'Wind',
          value: 'wind',
        },
      ],
    },
    {
      name: 'staticAttribute',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Action Speed',
          value: 'actionSpeed',
        },
        {
          label: 'Additional Magical Damage',
          value: 'additionalMagicalDamage',
        },
        {
          label: 'Additional Weapon Damage',
          value: 'additionalWeaponDamage',
        },
        {
          label: 'Agility',
          value: 'agility',
        },
        {
          label: 'Armor Penetration',
          value: 'armorPenetration',
        },
        {
          label: 'Armor Rating',
          value: 'armorRating',
        },
        {
          label: 'Buff Duration Bonus',
          value: 'buffDurationBonus',
        },
        {
          label: 'Dexterity',
          value: 'dexterity',
        },
        {
          label: 'Headshot Damage Reduction',
          value: 'headshotDamageReduction',
        },
        {
          label: 'Knowledge',
          value: 'knowledge',
        },
        {
          label: 'Luck',
          value: 'luck',
        },
        {
          label: 'Magic Penetration',
          value: 'magicPenetration',
        },
        {
          label: 'Magic Resistance',
          value: 'magicResistance',
        },
        {
          label: 'Magic Weapon Damage',
          value: 'magicWeaponDamage',
        },
        {
          label: 'Magical Damage',
          value: 'magicalDamage',
        },
        {
          label: 'Magical Damage Bonus',
          value: 'magicalDamageBonus',
        },
        {
          label: 'Magical Damage Reduction',
          value: 'magicalDamageReduction',
        },
        {
          label: 'Magical Healing',
          value: 'magicalHealing',
        },
        {
          label: 'Magical Power',
          value: 'magicalPower',
        },
        {
          label: 'Max Health',
          value: 'maxHealth',
        },
        {
          label: 'Max Health Bonus',
          value: 'maxHealthBonus',
        },
        {
          label: 'Move Speed',
          value: 'moveSpeed',
        },
        {
          label: 'Move Speed Bonus',
          value: 'moveSpeedBonus',
        },
        {
          label: 'Physical Damage Reduction',
          value: 'physicalDamageReduction',
        },
        {
          label: 'Physical Power',
          value: 'physicalPower',
        },
        {
          label: 'Projectile Damage Reduction',
          value: 'projectileDamageReduction',
        },
        {
          label: 'Regular Interaction Speed',
          value: 'regularInteractionSpeed',
        },
        {
          label: 'Resourcefulness',
          value: 'resourcefulness',
        },
        {
          label: 'Strength',
          value: 'strength',
        },
        {
          label: 'True Magical Damage',
          value: 'trueMagicalDamage',
        },
        {
          label: 'True Physical Damage',
          value: 'truePhysicalDamage',
        },
        {
          label: 'Undead Damage Bonus',
          value: 'undeadDamageBonus',
        },
        {
          label: 'Vigor',
          value: 'vigor',
        },
        {
          label: 'Weapon Damage',
          value: 'weaponDamage',
        },
        {
          label: 'Will',
          value: 'will',
        },
      ],
    },
    {
      name: 'randomAttribute',
      type: 'select',
      hasMany: true,
      options: [
        {
          label: 'Action Speed',
          value: 'actionSpeed',
        },
        {
          label: 'Additional Magical Damage',
          value: 'additionalMagicalDamage',
        },
        {
          label: 'Additional Memory Capacity',
          value: 'additionalMemoryCapacity',
        },
        {
          label: 'Additional Move Speed',
          value: 'additionalMoveSpeed',
        },
        {
          label: 'Additional Physical Damage',
          value: 'additionalPhysicalDamage',
        },
        {
          label: 'Additional Weapon Damage',
          value: 'additionalWeaponDamage',
        },
        {
          label: 'Agility',
          value: 'agility',
        },
        {
          label: 'Armor Penetration',
          value: 'armorPenetration',
        },
        {
          label: 'Armor Rating',
          value: 'armorRating',
        },
        {
          label: 'Buff Duration Bonus',
          value: 'buffDurationBonus',
        },
        {
          label: 'Debuff Duration Bonus',
          value: 'debuffDurationBonus',
        },
        {
          label: 'Dexterity',
          value: 'dexterity',
        },
        {
          label: 'Knowledge',
          value: 'knowledge',
        },
        {
          label: 'Luck',
          value: 'luck',
        },
        {
          label: 'Magic Penetration',
          value: 'magicPenetration',
        },
        {
          label: 'Magic Resistance',
          value: 'magicResistance',
        },
        {
          label: 'Magical Damage Bonus',
          value: 'magicalDamageBonus',
        },
        {
          label: 'Magical Damage Reduction',
          value: 'magicalDamageReduction',
        },
        {
          label: 'Magical Healing',
          value: 'magicalHealing',
        },
        {
          label: 'Magical Interaction Speed',
          value: 'magicalInteractionSpeed',
        },
        {
          label: 'Magical Power',
          value: 'magicalPower',
        },
        {
          label: 'Max Health',
          value: 'maxHealth',
        },
        {
          label: 'Max Health Bonus',
          value: 'maxHealthBonus',
        },
        {
          label: 'Memory Capacity Bonus',
          value: 'memoryCapacityBonus',
        },
        {
          label: 'Move Speed Bonus',
          value: 'moveSpeedBonus',
        },
        {
          label: 'Physical Damage Bonus',
          value: 'physicalDamageBonus',
        },
        {
          label: 'Physical Damage Reduction',
          value: 'physicalDamageReduction',
        },
        {
          label: 'Physical Healing',
          value: 'physicalHealing',
        },
        {
          label: 'Physical Power',
          value: 'physicalPower',
        },
        {
          label: 'Projectile Damage Reduction',
          value: 'projectileDamageReduction',
        },
        {
          label: 'Regular Interaction Speed',
          value: 'regularInteractionSpeed',
        },
        {
          label: 'Resourcefulness',
          value: 'resourcefulness',
        },
        {
          label: 'Spell Casting Speed',
          value: 'spellCastingSpeed',
        },
        {
          label: 'Strength',
          value: 'strength',
        },
        {
          label: 'True Magical Damage',
          value: 'trueMagicalDamage',
        },
        {
          label: 'True Physical Damage',
          value: 'truePhysicalDamage',
        },
        {
          label: 'Vigor',
          value: 'vigor',
        },
        {
          label: 'Will',
          value: 'will',
        },
      ],
    },
  ],
}

export default Items
