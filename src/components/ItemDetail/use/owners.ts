import { computed, ComputedRef } from 'vue'
import { ItemSummary } from '/@/lib/apis'

export interface OwnerWithCount {
  userName: string
  count: number
}

export interface OwnerDetail extends OwnerWithCount {
  all: number
}

const useOwners = (props: {
  item: ItemSummary
}): { details: ComputedRef<OwnerDetail[]> } => {
  const details = computed(() =>
    props.item.owners.map(owner => {
      // そのownerの最後のログを取得
      const latestLog = props.item.latestLogs?.find(
        v => v.ownerId === owner.ownerId
      )
      const count = latestLog?.count ?? owner.count
      const all = owner.count
      return {
        userName: owner.user.name,
        count: count,
        all: all
      }
    })
  )
  return { details }
}

export default useOwners
