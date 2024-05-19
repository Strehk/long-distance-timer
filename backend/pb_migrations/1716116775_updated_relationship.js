/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId("ivhuftt0jir4rh5");

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: "vaqehbb4",
				name: "visits",
				type: "relation",
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: "be8mgfyfve15ov1",
					cascadeDelete: true,
					minSelect: null,
					maxSelect: null,
					displayFields: null,
				},
			}),
		);

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: "wd9sxopk",
				name: "messages",
				type: "relation",
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: "0lwirk84n625bid",
					cascadeDelete: true,
					minSelect: null,
					maxSelect: null,
					displayFields: null,
				},
			}),
		);

		return dao.saveCollection(collection);
	},
	(db) => {
		const dao = new Dao(db);
		const collection = dao.findCollectionByNameOrId("ivhuftt0jir4rh5");

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: "vaqehbb4",
				name: "visits",
				type: "relation",
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: "be8mgfyfve15ov1",
					cascadeDelete: false,
					minSelect: null,
					maxSelect: null,
					displayFields: null,
				},
			}),
		);

		// update
		collection.schema.addField(
			new SchemaField({
				system: false,
				id: "wd9sxopk",
				name: "messages",
				type: "relation",
				required: false,
				presentable: false,
				unique: false,
				options: {
					collectionId: "0lwirk84n625bid",
					cascadeDelete: false,
					minSelect: null,
					maxSelect: null,
					displayFields: null,
				},
			}),
		);

		return dao.saveCollection(collection);
	},
);
