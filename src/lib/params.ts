export const getFirstParam = (p: string | string[]): string => {
  if (Array.isArray(p)) {
    return p[0]
  }
  return p
}
