export const getFirstParam = <T extends string | null>(
  p: T | Array<T> | undefined
): T | undefined => {
  if (Array.isArray(p)) {
    return p[0]
  }
  return p
}
