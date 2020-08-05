import { ItemSummary } from '/@/lib/apis'

export const getDue = (item: ItemSummary): number => {
  if (!item.latestLogs) return Infinity
  return Math.min(...item.latestLogs.map(log => Date.parse(log.dueDate)))
}
