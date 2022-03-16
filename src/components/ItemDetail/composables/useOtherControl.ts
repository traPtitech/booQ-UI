import { Ref, computed, ComputedRef } from 'vue'
import { ItemDetail, ItemType } from '/@/lib/apis'
import useMe from '/@/composables/useMe'
import useNonOwnerTypes from './useNonOwnerTypes'
import { isOwner } from '/@/lib/item'

const useOtherControl = (props: {
  item: ItemDetail
}): {
  isMeOwner: Ref<boolean>
  isAdmin: Ref<boolean>
  isDisabledAddOwnerButton: ComputedRef<boolean>
} => {
  const { id, admin: isAdmin } = useMe()
  const { firstNonOwnType } = useNonOwnerTypes(props)

  const isMeOwner = computed(() => isOwner(id.value, props.item.owners))
  const isDisabledAddOwnerButton = computed(
    () =>
      props.item.type === ItemType.equipment ||
      (!isAdmin.value && !!isMeOwner.value) ||
      firstNonOwnType.value === -1
  )

  return {
    isMeOwner,
    isAdmin,
    isDisabledAddOwnerButton
  }
}

export default useOtherControl
