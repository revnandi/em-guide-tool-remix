import { relations } from 'drizzle-orm';
import { int, text, mysqlTable } from "drizzle-orm/mysql-core";

export const roles = mysqlTable("roles", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: text("username"),
  firstname: text("firstname"),
  lastname: text("lastname"),
  email: text("email"),
  roleId: int('roleId')
});

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));