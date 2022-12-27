migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lucv36kajuc3eju")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lucv36kajuc3eju")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
