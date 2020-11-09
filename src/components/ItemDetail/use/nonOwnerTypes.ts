import { computed, ComputedRef } from 'vue'
import { ItemSummary, ItemType } from '/@/lib/apis'
import useMe from '/@/use/me'

const useNonOwnerTypes = (props: {
  item: ItemSummary
}): {
  nonOwnerTypes: ComputedRef<Set<ItemType>>
} => {
  const { id: myId } = useMe()

  const nonOwnerTypes = computed(() => {
    const arr: ItemType[] = []
    if (props.item.owners.every(o => o.ownerId !== myId.value)) {
      arr.push(ItemType.individual)
    } else if (props.item.owners.every(o => o.ownerId !== ItemType.equipment)) {
      arr.push(ItemType.equipment)
    } else if (props.item.owners.every(o => o.ownerId !== ItemType.sienka)) {
      arr.push(ItemType.sienka)
    }
    return new Set(arr)
  })

  return {
    nonOwnerTypes
  }
}

export default useNonOwnerTypes
