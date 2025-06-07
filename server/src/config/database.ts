import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "room",
  database: process.env.DB_DATABASE || "launches_db",
  synchronize: process.env.NODE_ENV === "development", // Só sincroniza no dev
  logging: process.env.NODE_ENV === "development",
  entities: ["src/server/models/*.ts"],
};

export default dbConfig;
