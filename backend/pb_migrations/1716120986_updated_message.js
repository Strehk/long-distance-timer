/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0lwirk84n625bid");

    collection.listRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0lwirk84n625bid");

    collection.listRule = null;

    return dao.saveCollection(collection);
  },
);
