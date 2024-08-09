// Run on mongosh shell inside the mongo database

const collection = db.getCollection('items')

// Find all documents and sort them by createdAt in ascending order
const cursor = collection.find({}).sort({ createdAt: 1 })

// Initialize the shortId counter
let shortId = 1

// Iterate over each document and update it with the shortId
cursor.forEach((doc) => {
  collection.updateOne(
    { _id: doc._id }, // Select the document by its unique _id
    { $set: { shortId: shortId } }, // Add the shortId field with the current value
  )
  shortId++ // Increment the shortId for the next document
})

print('All documents have been updated with shortId starting from 1.')
