const base62Chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function base62ToNumber(base62: string): number {
  const base = 62
  let num = 0

  // Pad with leading zero if the input is less than 2 characters long
  if (base62.length < 2) {
    base62 = '0' + base62
  }

  for (let i = 0; i < base62.length; i++) {
    const char = base62[i]
    const charIndex = base62Chars.indexOf(char)

    if (charIndex === -1) {
      throw new Error(`Invalid character "${char}" in Base62 string`)
    }

    num = num * base + charIndex
  }

  return num
}

export function numberToBase62(num: number): string {
  let result = ''

  if (num === 0) {
    return '00' // Change to '00' for consistency in two-character output
  }

  while (num > 0) {
    result = base62Chars[num % 62] + result
    num = Math.floor(num / 62)
  }

  // Pad with leading zero if the result is less than 2 characters long
  if (result.length < 2) {
    result = '0' + result
  }

  return result
}
