export const databaseConfig = {
  user: process.env.PGUSER || "postgre",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABSE || "lalatri",
  password: process.env.PASSWORD || "",
  port: parseInt(process.env.PGPORT || "5432"),
  url: process.env.PGURL || "",
};
