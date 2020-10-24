const pad0 = (n: number, len: number) => ('' + n).padStart(len, '0')

export const stringifyDate = (date: Date): string => {
  return `${date.getFullYear()}/${pad0(date.getMonth() + 1, 2)}/${pad0(
    date.getDate(),
    2
  )}`
}

export const stringifyDateHyphen = (date: Date): string => {
  return `${date.getFullYear()}-${pad0(date.getMonth() + 1, 2)}-${pad0(
    date.getDate(),
    2
  )}`
}

export const stringifyDateFromNumber = (num: number): string => {
  if (!Number.isFinite(num)) return '----/--/--'
  const date = new Date(num)
  return stringifyDate(date)
}

export const stringifyDateTime = (date: Date): string => {
  return `${stringifyDate(date)} ${pad0(date.getHours(), 2)}:${pad0(
    date.getMinutes(),
    2
  )}`
}

export const toNow = (num: number): string | undefined => {
  if (!Number.isFinite(num)) return undefined
  const diffDay = (num - Date.now()) / 1000 / 60 / 60 / 24
  if (diffDay < 0) {
    return `${Math.ceil(-diffDay)}日前`
  }

  if (diffDay < 30) {
    return `${Math.ceil(diffDay)}日後`
  }
  const diffMonth = diffDay / 30
  return `${Math.ceil(diffMonth)}ヶ月後`
}
