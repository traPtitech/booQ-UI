export const getFirstParam = <T extends string | null>(p: T | Array<T>): T => {
  if (Array.isArray(p)) {
    return p[0]
  }
  return p
}
