import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema.server';

if (!process.env.DATABASE_HOST || !process.env.DATABASE_USER || !process.env.DATABASE_NAME) {
  throw new Error(
    "Missing environment variable: DATABASE_PATH",
  )
}

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME
});

export const db = drizzle(connection, {schema, mode: "default"});