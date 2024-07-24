export const camelCaseToTitleCase = (camelCaseStr: string): string => {
  return camelCaseStr
    .replace(/([A-Z])/g, ' $1') // Insert space before each capital letter
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
}

export const arrayCamelCaseToCommaSeparatedTitleCase = (array: string[]): string => {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array')
  }

  const titleCaseArray = array.map(camelCaseToTitleCase)
  return titleCaseArray.join(', ')
}
