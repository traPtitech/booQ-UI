import { ItemType } from '/@/lib/apis'

export const itemTypeMap: ReadonlyArray<[ItemType, string]> = [
  [ItemType.individual, '自身'],
  [ItemType.equipment, 'traP'],
  [ItemType.sienka, '支援課']
]

interface ReadonlyRequiredMap<K, V> extends ReadonlyMap<K, V> {
  get(key: K): V
}

const itemTypeToStringMap = new Map(itemTypeMap) as ReadonlyRequiredMap<
  ItemType,
  string
>

const stringToItemTypeMap = new Map(
  itemTypeMap.map(([type, str]) => [str, type])
) as ReadonlyRequiredMap<string, ItemType>

export const itemTypeToName = (itemType: ItemType): string =>
  itemTypeToStringMap.get(itemType)

/**
 * 一致しないものが来ない前提
 */
export const itemTypeNameToType = (itemTypeName: string): ItemType =>
  stringToItemTypeMap.get(itemTypeName)

export const itemTypeToOwnerId = (itemType: ItemType, myId: number): number =>
  itemType === ItemType.individual ? myId : itemType

export const itemTypeToOwnerName = (
  itemType: ItemType,
  myName: string
): string =>
  itemType === ItemType.individual ? myName : itemTypeToName(itemType)
