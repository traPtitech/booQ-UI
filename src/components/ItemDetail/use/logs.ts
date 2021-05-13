import { computed, ComputedRef } from 'vue'
import { Log, LogType, traP_ID } from '/@/lib/apis'
import { stringifyDateTime } from '/@/lib/date'

export interface LogSummary {
  id: number
  userName: string
  text: string
  date: string
}

const useLogs = (props: {
  logs: Log[]
}): {
  logSummaries: ComputedRef<LogSummary[]>
} => {
  const logSummaries = computed(() =>
    props.logs.map(v => {
      const userName = v.user.name
      const ownerWord =
        v.ownerId === traP_ID ||
        v.type === LogType.add ||
        v.type === LogType.remove
          ? ''
          : `${v.owner.name}さんの`
      const logType = getLogTypeString(v.type)
      // createdAtを`yyyy/mm/dd hh:mm`に
      const logTime = stringifyDateTime(new Date(v.createdAt))
      return {
        id: v.id,
        userName: userName,
        text: `${ownerWord}物品を${logType}`,
        date: logTime
      }
    })
  )
  const getLogTypeString = (logType: LogType) => {
    switch (logType) {
      case LogType.borrow:
        return '借りました'
      case LogType.return:
        return '返しました'
      case LogType.add:
        return '追加しました'
      case LogType.remove:
        return '減らしました'
      default:
        return ''
    }
  }
  return { logSummaries }
}

export default useLogs
