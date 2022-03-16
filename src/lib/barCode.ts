export const checkDigit = (isbn: string) => {
  const digits = isbn.split('').map(n => +n)
  const lastDigit = digits.pop()
  if (lastDigit === undefined) return false

  const remainder =
    digits.reduce((acc, digit, i) => acc + digit * (i % 2 === 0 ? 1 : 3)) % 10
  const diff = remainder === 0 ? 0 : 10 - remainder
  return lastDigit === diff
}

export const checkISBN = (isbn: string) =>
  isbn.slice(0, 3) === '978' || isbn.slice(0, 3) === '979'
