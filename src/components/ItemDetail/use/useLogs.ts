import { computed, ComputedRef } from 'vue'
import { Log, traP_ID } from '/@/lib/apis'
import { stringifyDateTime } from '/@/lib/date'

export interface LogSummary {
  id: number
  userName: string
  text: string
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
        v.ownerId === traP_ID || v.type > 1 ? '' : `${v.owner.name}さんの`
      const logType = getLogTypeString(v.type)
      // createdAtを`yyyy/mm/dd hh:mm`に
      const logTime = stringifyDateTime(new Date(v.createdAt))
      return {
        id: v.id,
        userName: userName,
        text: `${userName}さんが${ownerWord}物品を${logType} - ${logTime}`
      }
    })
  )
  const getLogTypeString = (logType: number) => {
    switch (logType) {
      case 0:
        return '借りました'
      case 1:
        return '返しました'
      case 2:
        return '追加しました'
      case 3:
        return '減らしました'
      default:
        return ''
    }
  }
  return { logSummaries }
}

export default useLogs
