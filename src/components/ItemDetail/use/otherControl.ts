import { Ref, computed, ComputedRef } from 'vue'
import { ItemSummary, Owner, ItemType } from '/@/lib/apis'
import { getRemainByOwnerID, OwnerWithCount } from './owners'
import useMe from '/@/use/me'

const useOtherControl = (props: {
  item: ItemSummary
}): {
  ownInfo: Ref<Owner | undefined>
  alreadyOwns: ComputedRef<boolean[]>
  isAdmin: Ref<boolean>
  isDisabledAddOwnerButton: ComputedRef<boolean>
  details: ComputedRef<OwnerWithCount[]>
} => {
  const { id, admin: isAdmin } = useMe()
  const ownInfo = computed(() =>
    props.item.owners.find(v => v.ownerId === id.value)
  )
  const alreadyOwns = computed(() =>
    Object.keys(ItemType)
      .filter(v => !isNaN(Number(v)))
      .map(i => {
        const ownerID = +i === 0 ? id.value : +i
        return !!props.item.owners.find(v => v.ownerId === ownerID)
      })
  )
  const isDisabledAddOwnerButton = computed<boolean>(
    () => (!isAdmin.value && !!ownInfo.value) || alreadyOwns.value.every(v => v)
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
