import { Client } from "pg";
import { databaseConfig } from "../config";

export class Database {
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
}
