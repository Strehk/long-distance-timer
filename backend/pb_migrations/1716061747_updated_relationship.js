/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ivhuftt0jir4rh5")

  collection.viewRule = "@request.auth.id = @collection.relationship.person_1 || @request.auth.id = @collection.relationship.person_2"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ivhuftt0jir4rh5")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
