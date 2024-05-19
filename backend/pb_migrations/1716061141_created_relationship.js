/// <reference path="../pb_data/types.d.ts" />
migrate(
	(db) => {
		const collection = new Collection({
			id: "ivhuftt0jir4rh5",
			created: "2024-05-18 19:39:01.064Z",
			updated: "2024-05-18 19:39:01.064Z",
			name: "relationship",
			type: "base",
			system: false,
			schema: [
				{
					system: false,
					id: "la8cmjcu",
					name: "person_1",
					type: "relation",
					required: false,
					presentable: false,
					unique: false,
					options: {
						collectionId: "_pb_users_auth_",
						cascadeDelete: false,
						minSelect: null,
						maxSelect: 1,
						displayFields: null,
					},
				},
				{
					system: false,
					id: "ju2lo2vp",
					name: "person_2",
					type: "relation",
					required: false,
					presentable: false,
					unique: false,
					options: {
						collectionId: "_pb_users_auth_",
						cascadeDelete: false,
						minSelect: null,
						maxSelect: 1,
						displayFields: null,
					},
				},
				{
					system: false,
					id: "9dtbrrob",
					name: "start",
					type: "date",
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: "",
						max: "",
					},
				},
				{
					system: false,
					id: "hx0ehtwq",
					name: "end",
					type: "date",
					required: false,
					presentable: false,
					unique: false,
					options: {
						min: "",
						max: "",
					},
				},
				{
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
		const collection = dao.findCollectionByNameOrId("ivhuftt0jir4rh5");

		return dao.deleteCollection(collection);
	},
);
