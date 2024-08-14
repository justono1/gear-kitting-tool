import { getPayload } from '@/common/utils/payload'
import { CollectionBeforeChangeHook, CollectionSlug, TypedCollection } from 'payload'

const collectionAutoIncrement: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
  collection,
}) => {
  if (operation === 'create') {
    // Get collection name
    const payload = await getPayload()
    const collectionSlug = collection.slug as CollectionSlug

    // Get all fields with custom: {increment: true}
    const incrementFields = collection.fields.filter(
      (doc) => doc.custom && doc.custom.increment === true && doc.type === 'number',
    )

    // Function handling the actual incrementation
    const incrementValue = async (fieldName: string, firstIncrementNumber: number) => {
      // Get the last document in the collection
      const lastDocument = await payload.find({
        collection: collectionSlug,
        sort: '-' + fieldName,
        limit: 1,
      })

      // Set the increment value for the new document
      // @ts-ignore
      return lastDocument?.docs[0]?.[`${fieldName}`]
        ? // @ts-ignore
          lastDocument?.docs[0]?.[`${fieldName}`] + 1
        : firstIncrementNumber
    }

    // Calling incrementValue function for each increment field
    for (var incrementField of incrementFields) {
      if (incrementField?.type === 'number') {
        const firstIncrementNumber = incrementField.custom?.firstIncrementNumber || 1
        const value = await incrementValue(incrementField.name, firstIncrementNumber)
        data[`${incrementField.name}`] = value
      }
    }
  }
  return data
}

export default collectionAutoIncrement
