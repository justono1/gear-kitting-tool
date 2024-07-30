export const titleCaseToCamelCase = (titleCaseStr: string): string => {
  return titleCaseStr
    .replace(/\s(.)/g, (match, group1) => group1.toUpperCase()) // Remove space and capitalize the following letter
    .replace(/\s/g, '') // Remove any remaining spaces
    .replace(/^(.)/, (match, group1) => group1.toLowerCase()) // Lowercase the first letter
}

export const arrayTitleCaseToCommaSeparatedCamelCase = (array: string[]): string => {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array')
  }

  const camelCaseArray = array.map(titleCaseToCamelCase)
  return camelCaseArray.join(', ')
}
