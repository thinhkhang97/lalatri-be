import fs from "fs-extra";
import path from "path";

class SQLService {
  async executeSqlByPath(filename: string, db: any): Promise<void> {
    var filePath = path.join(__dirname + `/repository/queries/${filename}.sql`);
    const buffer = await fs.readFile(filePath);
    const query = buffer.toString();
    console.log(query);
    await db.runSql(query);
  }
}

export const sqlService = new SQLService();
