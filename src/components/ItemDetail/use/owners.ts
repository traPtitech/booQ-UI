import { computed, ComputedRef } from 'vue'
import { ItemSummary } from '/@/lib/apis'

export interface OwnerDetail {
  userName: string
  remain: number
  all: number
}

const useOwners = (props: {
  item: ItemSummary
}): { details: ComputedRef<OwnerDetail[]> } => {
  const details = computed(() =>
    props.item.owners.map(owner => {
      // そのownerの最後のログを取得
      const latestLog = props.item.latestLogs?.find(
        v => v.ownerId === owner.userId
      )
      const remain = latestLog?.count ?? owner.count
      const all = owner.count
      return {
        userName: owner.user.name,
        remain: remain,
        all: all
      }
    })
  )
  return { details }
}

export default useOwners
