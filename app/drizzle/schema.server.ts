import { relations } from 'drizzle-orm';
import { int, text, mysqlTable, boolean } from "drizzle-orm/mysql-core";

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
  roleId: int('role_id'),
  settingsId: int('settings_id'), 
});

export const settings = mysqlTable("settings", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id"),
  isDarkMode: boolean("is_dark_mode"),
  language: text("language"),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").primaryKey().autoincrement(),
  notificationId: int("notification_id"),
  isDarkMode: boolean("is_dark_mode"),
  language: text("language"),
  userId: int('user_id'),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  settings: one(settings, {
    fields: [users.settingsId],
    references: [settings.userId],
  }),
  notifications: many(notifications)
}));

