/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: "be8mgfyfve15ov1",
      created: "2024-05-18 19:38:49.004Z",
      updated: "2024-05-18 19:38:49.004Z",
      name: "visits",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "tbvqrfpg",
          name: "date",
          type: "date",
          required: true,
          presentable: false,
          unique: false,
          options: {
            min: "",
            max: "",
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
    const collection = dao.findCollectionByNameOrId("be8mgfyfve15ov1");

    return dao.deleteCollection(collection);
  },
);
