import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema.server';
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_HOST) {
  throw new Error(
    "Missing environment variable: DATABASE_HOST",
  )
}

if (!process.env.DATABASE_USER) {
  throw new Error(
    "Missing environment variable: DATABASE_USER",
  )
}

if (!process.env.DATABASE_NAME) {
  throw new Error(
    "Missing environment variable: DATABASE_NAME",
  )
}

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER || "",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME
});

export const db = drizzle(connection, {schema, mode: "default"});

export type Magazine = typeof schema.magazines;
export type NewMagazine = typeof schema.magazines.$inferInsert;