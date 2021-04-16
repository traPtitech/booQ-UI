import { ItemSummary, Owner, Log, RentalUser, ItemDetail } from '/@/lib/apis'

export const getDue = (item: ItemSummary): number => {
  if (!item.latestLogs) return Infinity
  return Math.min(...item.latestLogs.map(log => Date.parse(log.dueDate)))
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
