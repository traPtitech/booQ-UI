import { Ref, computed, ComputedRef } from 'vue'
import { ItemSummary, ItemType } from '/@/lib/apis'
import useMe from '/@/use/me'
import useNonOwnerTypes from './nonOwnerTypes'

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
  isMeOwner: Ref<boolean>
  isAdmin: Ref<boolean>
  isDisabledAddOwnerButton: ComputedRef<boolean>
} => {
  const { id, admin: isAdmin } = useMe()
  const { nonOwnerTypes } = useNonOwnerTypes(props)

  const isMeOwner = computed(() =>
    props.item.owners.some(v => v.ownerId === id.value)
  )
  const isDisabledAddOwnerButton = computed(
    () =>
      (!isAdmin.value && !!isMeOwner.value) ||
      getFirstNotOwn(nonOwnerTypes.value) === -1
  )

  return {
    isMeOwner,
    isAdmin,
    isDisabledAddOwnerButton
  }
}

export default useOtherControl
