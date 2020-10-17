export const getFirstParam = (
  p: string | Array<string | null> | null
): string | null => {
  if (Array.isArray(p)) {
    return p[0]
  }
  return p
}
