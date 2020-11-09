import { Ref, computed, ComputedRef } from 'vue'
import { ItemSummary } from '/@/lib/apis'
import useMe from '/@/use/me'
import useNonOwnerTypes from './nonOwnerTypes'

const useOtherControl = (props: {
  item: ItemSummary
}): {
  isMeOwner: Ref<boolean>
  isAdmin: Ref<boolean>
  isDisabledAddOwnerButton: ComputedRef<boolean>
} => {
  const { id, admin: isAdmin } = useMe()
  const { firstNonOwnType } = useNonOwnerTypes(props)

  const isMeOwner = computed(() =>
    props.item.owners.some(v => v.ownerId === id.value)
  )
  const isDisabledAddOwnerButton = computed(
    () => (!isAdmin.value && !!isMeOwner.value) || firstNonOwnType.value === -1
  )

  return {
    isMeOwner,
    isAdmin,
    isDisabledAddOwnerButton
  }
}

export default useOtherControl
