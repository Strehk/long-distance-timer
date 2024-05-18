/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be8mgfyfve15ov1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "n8gefk4h",
    "name": "location",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("be8mgfyfve15ov1")

  // remove
  collection.schema.removeField("n8gefk4h")

  return dao.saveCollection(collection)
})
