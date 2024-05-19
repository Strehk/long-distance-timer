/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0lwirk84n625bid");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "gshrwdnx",
        name: "relationship",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "ivhuftt0jir4rh5",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0lwirk84n625bid");

    // remove
    collection.schema.removeField("gshrwdnx");

    return dao.saveCollection(collection);
  },
);
