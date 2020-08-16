import { Log } from '/@/lib/apis'

export interface LogSummary {
  userName: string
  text: string
}

const traP_ID = 1

const useLogs = (): {
  getLogSummary: (props: { logs: Log[] }) => LogSummary[]
} => {
  const getLogSummary = (props: { logs: Log[] }) => {
    return props.logs.map(v => {
      const userName = v.user.name
      const ownerWord =
        v.ownerId === traP_ID || v.type > 1 ? '' : `${v.owner.name}さんの`
      const logType = (() => {
        switch (v.type) {
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
      })()
      const cTime = new Date(v.createdAt)
      // cTimeを`yyyy/mm/dd hh:mm`に
      const logTime = `${cTime.getFullYear()}/${(
        '0' +
        (cTime.getMonth() + 1)
      ).slice(-2)}/${('0' + cTime.getDate()).slice(-2)} ${(
        '0' + cTime.getHours()
      ).slice(-2)}:${('0' + cTime.getMinutes()).slice(-2)}`
      return {
        userName: userName,
        text: `${userName}さんが${ownerWord}物品を${logType} - ${logTime}`
      }
    })
  }
  return { getLogSummary }
}

export default useLogs
