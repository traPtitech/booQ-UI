import { Ref, computed, ComputedRef } from 'vue'
import { ItemSummary, Owner, ItemType } from '/@/lib/apis'
import { getRemainByOwnerID, OwnerWithCount } from './owners'
import useMe from '/@/use/me'

export const getFirstNotOwn = (nonOwnerTypes: Set<ItemType>): ItemType | -1 => {
  if (nonOwnerTypes.has(ItemType.individual)) {
    return ItemType.individual
  }
  if (nonOwnerTypes.has(ItemType.equipment)) {
    return ItemType.equipment
  }
  if (nonOwnerTypes.has(ItemType.sienka)) {
    return ItemType.sienka
  }
  return -1
}

const useOtherControl = (props: {
  item: ItemSummary
}): {
  ownInfo: Ref<Owner | undefined>
  nonOwnerTypes: ComputedRef<Set<ItemType>>
  isAdmin: Ref<boolean>
  isDisabledAddOwnerButton: ComputedRef<boolean>
  details: ComputedRef<OwnerWithCount[]>
} => {
  const { id, admin: isAdmin } = useMe()
  const ownInfo = computed(() =>
    props.item.owners.find(v => v.ownerId === id.value)
  )
  const nonOwnerTypes = computed(() => {
    const arr: ItemType[] = []
    if (props.item.owners.every(o => o.ownerId !== id.value)) {
      arr.push(ItemType.individual)
    } else if (props.item.owners.every(o => o.ownerId !== ItemType.equipment)) {
      arr.push(ItemType.equipment)
    } else if (props.item.owners.every(o => o.ownerId !== ItemType.sienka)) {
      arr.push(ItemType.sienka)
    }
    return new Set(arr)
  })
  const isDisabledAddOwnerButton = computed(
    () =>
      (!isAdmin.value && !!ownInfo.value) ||
      getFirstNotOwn(nonOwnerTypes.value) === -1
  )
  const details = computed(() =>
    props.item.owners.map(owner => ({
      userName: owner.user.name,
      count: getRemainByOwnerID(
        owner.id,
        owner.count,
        props.item.latestLogs ?? []
      )
    }))
  )

  return {
    ownInfo,
    nonOwnerTypes,
    isAdmin,
    isDisabledAddOwnerButton,
    details
  }
}

export default useOtherControl
