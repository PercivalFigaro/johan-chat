migrate((db) => {
  const collection = new Collection({
    "id": "lucv36kajuc3eju",
    "created": "2022-12-21 15:47:03.769Z",
    "updated": "2022-12-21 15:47:03.769Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bqlfphek",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 280,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w5fktwzi",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lucv36kajuc3eju");

  return dao.deleteCollection(collection);
})
