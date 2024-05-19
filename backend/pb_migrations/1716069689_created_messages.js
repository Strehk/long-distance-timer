/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: "0lwirk84n625bid",
      created: "2024-05-18 22:01:29.456Z",
      updated: "2024-05-18 22:01:29.456Z",
      name: "messages",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "aabcakvz",
          name: "message",
          type: "text",
          required: false,
          presentable: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
      ],
      indexes: [],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("0lwirk84n625bid");

    return dao.deleteCollection(collection);
  },
);
