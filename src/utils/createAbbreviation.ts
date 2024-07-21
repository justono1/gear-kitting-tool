export const createAbbreviation = (input?: string): string | undefined => {
  if (input) {
    // Trim any leading or trailing whitespace
    input = input.trim()

    // Split the string into an array of words
    const words = input.split(/\s+/)

    // Check if there is at least one word
    if (words.length === 0) {
      return ''
    }

    // Get the first and last words
    const firstWord = words[0]
    const lastWord = words[words.length - 1]

    // Create the abbreviation by taking the first letter of the first and last words
    const abbreviation = firstWord.charAt(0).toUpperCase() + lastWord.charAt(0).toUpperCase()

    return abbreviation
  } else {
    return undefined
  }
}
