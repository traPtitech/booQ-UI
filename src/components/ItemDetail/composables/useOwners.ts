import { computed, ComputedRef } from 'vue'
import { ItemDetail, ItemSummary } from '/@/lib/apis'
import { getRemainByOwnerID } from '/@/lib/item'

export interface OwnerMayWithCount {
  userName: string
  count?: number
}

export interface OwnerWithCount extends OwnerMayWithCount {
  count: number
}

export interface OwnerDetail extends OwnerWithCount {
  all: number
  rentalable: boolean
}

export const getInitialOwner = (
  ownerDetails: OwnerWithCount[],
  name: string
) => {
  const initialOwner =
    ownerDetails.find(v => v.userName === name) ?? ownerDetails[0]
  return initialOwner?.userName ?? ''
}

const useOwners = (props: {
  item: ItemSummary | ItemDetail
}): { ownerDetails: ComputedRef<OwnerDetail[]> } => {
  const ownerDetails = computed(() =>
    props.item.owners.map(owner => {
      const count = getRemainByOwnerID(
        owner.ownerId,
        owner.count,
        props.item.latestLogs ?? []
      )
      const all = owner.count
      return {
        userName: owner.user.name,
        count: count,
        all: all,
        rentalable: owner.rentalable
      }
    })
  )
  return { ownerDetails }
}

export default useOwners
