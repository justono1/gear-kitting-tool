export const objectToBase64 = (obj: Record<string, any>): string => {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(obj)

  // Convert the JSON string to a base64 encoded string
  const base64String = Buffer.from(jsonString).toString('base64')

  return base64String
}
