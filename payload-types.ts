/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    items: Item;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    password: string;
    email: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "items".
 */
export interface Item {
  id: string;
  itemName: string;
  rarity: ('poor' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'unique')[];
  class: ('barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'ranger' | 'rouge' | 'warlock' | 'wizard')[];
  slot:
    | 'back'
    | 'chest'
    | 'feet'
    | 'hands'
    | 'head'
    | 'legs'
    | 'necklace'
    | 'primaryWeapon'
    | 'ring'
    | 'secondaryWeapon'
    | 'utility';
  handType?: ('oneHanded' | 'twoHanded') | null;
  type:
    | 'arrow'
    | 'axe'
    | 'bolt'
    | 'bow'
    | 'cloth'
    | 'consumable'
    | 'crossbow'
    | 'currency'
    | 'dagger'
    | 'drink'
    | 'gem'
    | 'goldContainer'
    | 'herb'
    | 'huntingLoot'
    | 'ingot'
    | 'leather'
    | 'lightSource'
    | 'mace'
    | 'magicStuff'
    | 'mining'
    | 'necklace'
    | 'ore'
    | 'percussion'
    | 'plate'
    | 'polearm'
    | 'powder'
    | 'ring'
    | 'shield'
    | 'staff'
    | 'string'
    | 'sword'
    | 'throwable'
    | 'trap'
    | 'wind';
  staticAttribute: (
    | 'actionSpeed'
    | 'additionalMagicalDamage'
    | 'additionalWeaponDamage'
    | 'agility'
    | 'armorPenetration'
    | 'armorRating'
    | 'buffDurationBonus'
    | 'dexterity'
    | 'headshotDamageReduction'
    | 'knowledge'
    | 'luck'
    | 'magicPenetration'
    | 'magicResistance'
    | 'magicWeaponDamage'
    | 'magicalDamage'
    | 'magicalDamageBonus'
    | 'magicalDamageReduction'
    | 'magicalHealing'
    | 'magicalPower'
    | 'maxHealth'
    | 'maxHealthBonus'
    | 'moveSpeed'
    | 'moveSpeedBonus'
    | 'physicalDamageReduction'
    | 'physicalPower'
    | 'projectileDamageReduction'
    | 'regularInteractionSpeed'
    | 'resourcefulness'
    | 'strength'
    | 'trueMagicalDamage'
    | 'truePhysicalDamage'
    | 'undeadDamageBonus'
    | 'vigor'
    | 'weaponDamage'
    | 'will'
  )[];
  randomAttribute?:
    | (
        | 'actionSpeed'
        | 'additionalMagicalDamage'
        | 'additionalMemoryCapacity'
        | 'additionalMoveSpeed'
        | 'additionalPhysicalDamage'
        | 'additionalWeaponDamage'
        | 'agility'
        | 'armorPenetration'
        | 'armorRating'
        | 'buffDurationBonus'
        | 'debuffDurationBonus'
        | 'dexterity'
        | 'knowledge'
        | 'luck'
        | 'magicPenetration'
        | 'magicResistance'
        | 'magicalDamageBonus'
        | 'magicalDamageReduction'
        | 'magicalHealing'
        | 'magicalInteractionSpeed'
        | 'magicalPower'
        | 'maxHealth'
        | 'maxHealthBonus'
        | 'memoryCapacityBonus'
        | 'moveSpeedBonus'
        | 'physicalDamageBonus'
        | 'physicalDamageReduction'
        | 'physicalHealing'
        | 'physicalPower'
        | 'projectileDamageReduction'
        | 'regularInteractionSpeed'
        | 'resourcefulness'
        | 'spellCastingSpeed'
        | 'strength'
        | 'trueMagicalDamage'
        | 'truePhysicalDamage'
        | 'vigor'
        | 'will'
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}