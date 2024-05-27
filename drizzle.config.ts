import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql", // "mysql" | "sqlite" | "postgresql"
  schema: "./app/drizzle/schema.server.ts",
  out: "./app/drizzle/migrations",
  dbCredentials: {
    host: process.env.DATABASE_HOST || '127.0.0.1', // Provide a default value or throw an error
    user: process.env.DATABASE_USER || 'root', // Provide a default value or throw an error
    password: process.env.DATABASE_PASSWORD || '', // Provide a default value or throw an error
    database: process.env.DATABASE_NAME || 'emguide-remix', // Provide a default value or throw an error
  },
});