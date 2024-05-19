export interface Collection {
	id: string;
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
}

export interface Message extends Collection {
	message: string;
	user: string;
}

export interface Visit extends Collection {
	date: string;
	location: string;
}

export interface Relationship extends Collection {
	person_1: string;
	person_2: string;
	start: string;
	end: string;
	visits: string[];
	messages: string[];
	expand: {
		visits: Visit[];
		messages: Message[];
	};
}
