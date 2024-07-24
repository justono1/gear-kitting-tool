export const splitAfterWord = (str: string, word: string): string[] => {
  const regex = new RegExp(`(${word})([^${word}]*)`, 'gi')
  const matches = []
  let match

  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1])
    if (match[2]) {
      matches.push(match[2])
    }
  }

  return matches
}
