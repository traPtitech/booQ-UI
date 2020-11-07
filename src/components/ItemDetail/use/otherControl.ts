import { Ref, computed, ComputedRef } from 'vue'
import { ItemSummary, Owner, ItemType } from '/@/lib/apis'
import { getRemainByOwnerID, OwnerWithCount } from './owners'
import useMe from '/@/use/me'

export interface AlreadyOwns {
  [ItemType.individual]: boolean
  [ItemType.equipment]: boolean
  [ItemType.sienka]: boolean
}

export const getFirstNotOwn = (alreadyOwns: AlreadyOwns): number => {
  if (!alreadyOwns[ItemType.individual]) {
    return ItemType.individual
  }
  if (!alreadyOwns[ItemType.equipment]) {
    return ItemType.equipment
  }
  if (!alreadyOwns[ItemType.sienka]) {
    return ItemType.sienka
  }
  return -1
}

const useOtherControl = (props: {
  item: ItemSummary
}): {
  ownInfo: Ref<Owner | undefined>
  alreadyOwns: ComputedRef<AlreadyOwns>
  isAdmin: Ref<boolean>
  isDisabledAddOwnerButton: ComputedRef<boolean>
  details: ComputedRef<OwnerWithCount[]>
} => {
  const { id, admin: isAdmin } = useMe()
  const ownInfo = computed(() =>
    props.item.owners.find(v => v.ownerId === id.value)
  )
  const alreadyOwns = computed(() => ({
    [ItemType.individual]: !!props.item.owners.find(
      v => v.ownerId === id.value
    ),
    [ItemType.equipment]: !!props.item.owners.find(
      v => v.ownerId === ItemType.equipment
    ),
    [ItemType.sienka]: !!props.item.owners.find(
      v => v.ownerId === ItemType.sienka
    )
  }))
  const isDisabledAddOwnerButton = computed(
    () =>
      (!isAdmin.value && !!ownInfo.value) ||
      getFirstNotOwn(alreadyOwns.value) === -1
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
    alreadyOwns,
    isAdmin,
    isDisabledAddOwnerButton,
    details
  }
}

export default useOtherControl
