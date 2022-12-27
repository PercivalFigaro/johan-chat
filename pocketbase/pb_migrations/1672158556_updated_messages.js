migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lucv36kajuc3eju")

  collection.viewRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lucv36kajuc3eju")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
