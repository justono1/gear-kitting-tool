export const base64ToObject = (base64String: string): Record<string, any> => {
  // Decode the base64 string to a JSON string
  const jsonString = Buffer.from(base64String, 'base64').toString('utf8')

  // Parse the JSON string to an object
  const obj = JSON.parse(jsonString)

  return obj
}
