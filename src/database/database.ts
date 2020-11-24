import { Client, Pool, QueryResult } from "pg";
import { databaseConfig } from "../config";

class Database {
	private client: Client;

	constructor() {
		this.client = new Client({
			connectionString: databaseConfig.url,
		});
	}

	async connect(): Promise<void> {
		await this.client.connect((e): void => {
			if (e) {
				console.log("Couldn't connect to database with error: ", e);
			}
			console.log("Connected to database");
		});
	}

	async query(
		queryString: string,
		params?: any
	): Promise<QueryResult<any> | undefined> {
		try {
			const start = Date.now();
			const res = await this.client.query(queryString, params);
			const duration = Date.now() - start;
			console.log("executed query", {
				queryString,
				duration,
				rows: res.rowCount,
			});
			return res;
		} catch (error) {
			console.log(error);
			return;
		}
	}
}

export const database = new Database();
