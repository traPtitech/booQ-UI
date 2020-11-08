import { computed, ComputedRef } from 'vue'
import { ItemSummary, Log } from '/@/lib/apis'

export interface OwnerMayWithCount {
  userName: string
  count?: number
}

export interface OwnerWithCount extends OwnerMayWithCount {
  count: number
}

export interface OwnerDetail extends OwnerWithCount {
  all: number
}

export const getRemainByOwnerID = (
  id: number,
  initialRemain: number,
  latestLogs: Log[]
): number => {
  // そのownerの最後のログを取得
  const latestLog = latestLogs.find(v => v.ownerId === id)
  return latestLog?.count ?? initialRemain
}

const useOwners = (props: {
  item: ItemSummary
}): { details: ComputedRef<OwnerDetail[]> } => {
  const details = computed(() =>
    props.item.owners.map(owner => {
      const count = getRemainByOwnerID(
        owner.id,
        owner.count,
        props.item.latestLogs ?? []
      )
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
