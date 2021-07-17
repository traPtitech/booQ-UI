import { computed, ComputedRef } from 'vue';
import { ItemDetail, ItemType } from '/@/lib/apis'
import useMe from '/@/use/me'

const getFirstNotOwn = (nonOwnerTypes: Set<ItemType>): ItemType | -1 => {
  if (nonOwnerTypes.has(ItemType.individual)) {
    return ItemType.individual
  }
  if (nonOwnerTypes.has(ItemType.equipment)) {
    return ItemType.equipment
  }
  return -1
}

const useNonOwnerTypes = (props: {
  item: ItemDetail
}): {
  nonOwnerTypes: ComputedRef<Set<ItemType>>
  firstNonOwnType: ComputedRef<ItemType | -1>
} => {
  const { id: myId } = useMe()

  const nonOwnerTypes = computed(() => {
    const arr: ItemType[] = []
    if (props.item.owners.every(o => o.ownerId !== myId.value)) {
      arr.push(ItemType.individual)
    } else if (props.item.owners.every(o => o.ownerId !== ItemType.equipment)) {
      arr.push(ItemType.equipment)
    } 
    return new Set(arr)
  })
  const firstNonOwnType = computed(() => getFirstNotOwn(nonOwnerTypes.value))

  return {
    nonOwnerTypes,
    firstNonOwnType
  }
}

export default useNonOwnerTypes
