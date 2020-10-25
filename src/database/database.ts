import { Client } from "pg";

export class Database {
	private client: Client;

	constructor() {
		this.client = new Client();
	}

	async connect(): Promise<void> {
		await this.client.connect((): void => {
			console.log("Couldn't connect to database");
		});
		console.log("Connected to database");
	}
}
