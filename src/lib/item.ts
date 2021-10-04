import {
  ItemSummary,
  Owner,
  Log,
  RentalUser,
  ItemDetail,
  LogType
} from '/@/lib/apis'

export const getDue = (item: ItemSummary, borrower: string): number => {
  if (!item.latestLogs) return Infinity
  const due = Math.max(
    ...item.latestLogs.map(log => {
      if (log.type !== LogType.borrow) {
        return 0
      } else if (!borrower || log.user.name === borrower) {
        return Date.parse(log.dueDate)
      }
      return 0
    })
  )

  return due
}

export const isOwner = (id: number, owners: Owner[]): boolean =>
  owners.some(v => v.ownerId === id)

export const getOwnerBorrowedFrom = (
  userID: number,
  item: ItemDetail
): Owner[] =>
  item.owners.filter(owner =>
    item.rentalUsers.some(
      v => owner.user.id === v.ownerId && userID === v.userId && v.count !== 0
    )
  )

export const getRentalUserBorrowedFrom = (
  id: number,
  rentalUsers: RentalUser[]
): RentalUser[] => rentalUsers.filter(v => v.userId === id && v.count !== 0)

export const getOwnersCanLend = (item: ItemDetail): Owner[] =>
  item.owners.filter(
    owner =>
      owner.rentalable &&
      getRemainByOwnerID(owner.ownerId, owner.count, item.latestLogs ?? []) > 0
  )

export const getRemainByOwnerID = (
  id: number,
  initialRemain: number,
  latestLogs: Log[]
): number => {
  // そのownerの最後のログを取得
  const latestLog = latestLogs.find(v => v.ownerId === id)
  return latestLog?.count ?? initialRemain
}
