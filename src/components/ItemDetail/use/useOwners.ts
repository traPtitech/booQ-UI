import { ItemSummary } from '/@/lib/apis'

export interface OwnerDetail {
  userName: string
  remain: number
  all: number
}

const useOwners = (): {
  getOwnerDetail: (props: { item: ItemSummary }) => OwnerDetail[]
} => {
  const getOwnerDetail = (props: { item: ItemSummary }) => {
    return props.item.owners.map(owner => {
      // そのownerの最後のログを取得
      const latestLog = props.item.latestLogs?.find(
        v => v.ownerId === owner.userId
      )
      const remain = latestLog ? latestLog.count : owner.count
      const all = owner.count
      return {
        userName: owner.user.name,
        remain: remain,
        all: all
      }
    })
  }
  return { getOwnerDetail }
}

export default useOwners
