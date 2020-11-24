import fs from "fs-extra";
import path from "path";

class SQLService {
  async executeSqlByPath(filePath: string, db: any): Promise<void> {
    const buffer = await fs.readFile(filePath);
    const query = buffer.toString();
    await db.runSql(query);
  }
}

export const sqlService = new SQLService();
