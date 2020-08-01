import { ItemType } from '/@/lib/apis'

const itemTypeMap: ReadonlyArray<[ItemType, string]> = [
  [ItemType.individual, '自身'],
  [ItemType.equipment, 'traP'],
  [ItemType.sienka, '支援課']
]

interface ReadonlyRequiredMap<K, V> extends ReadonlyMap<K, V> {
  get(key: K): V
}

export const itemTypeToStringMap = new Map(itemTypeMap) as ReadonlyRequiredMap<
  ItemType,
  string
>

export const stringToItemTypeMap = new Map(
  itemTypeMap.map(([type, str]) => [str, type])
) as ReadonlyRequiredMap<string, ItemType>
