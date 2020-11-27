import { Client, Pool, QueryResult } from "pg";
import { DatabaseConfig } from "../config";

class Database {
  private client: Client;

  constructor() {
    this.client = new Client({
      connectionString: DatabaseConfig.url,
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
  ): Promise<QueryResult<any> | { rows: any[] }> {
    try {
      const start = Date.now();
      const res = await this.client.query(queryString, params);
      const duration = Date.now() - start;
      if (res.rowCount === 0) {
        res.rows = [{}];
      }
      return res;
    } catch (error) {
      console.log(error);
      return { rows: [{}] };
    }
  }
}

export const database = new Database();
