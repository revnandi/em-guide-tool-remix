import { relations } from 'drizzle-orm';
import { int, text, varchar, mysqlTable, boolean, datetime } from "drizzle-orm/mysql-core";

export const roles = mysqlTable("roles", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar('slug', { length: 256 }).unique(),
  name: text("name"),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar('slug', { length: 256 }).unique(),
  username: text("username"),
  firstname: text("firstname"),
  lastname: text("lastname"),
  email: text("email"),
  roleId: int('role_id'),
  settingsId: int('settings_id'),
});

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

export const articles = mysqlTable("articles", {
  id: int("id").primaryKey().autoincrement(),
  title: text("title").notNull(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  except: text("except"),
  originalUrl: text("original_url"),
  magazineId: int("magazine_id"),
  createdBy: int("user_id"),
  createdAt: datetime("created_at"),
  updatedAt: datetime("updated_at"),
  isPublished: boolean("is_published"),
  publishedAt: datetime("published_at"),
});

export const articlesRelations = relations(articles, ({ one }) => ({
  user: one(users, {
    fields: [articles.createdBy],
    references: [users.id],
  }),
  magazine: one(magazines, {
    fields: [articles.magazineId],
    references: [magazines.id],
  }),
  // shares: many(articleShares),
}));

export const magazines = mysqlTable("magazines", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  logoId: int("logo_id"),
  createdBy: int("user_id"),
  createdAt: datetime("created_at"),
  updatedAt: datetime("updated_at"),
});

export const magazinesRelations = relations(magazines, ({ one, many }) => ({
  user: one(users, {
    fields: [magazines.createdBy],
    references: [users.id],
  }),
  articles: many(articles),
  logo: one(media, {
    fields: [magazines.logoId],
    references: [media.id],
  }),
}));

export const media = mysqlTable("media", {
  id: int("id").primaryKey().autoincrement(),
  path: text("path"),
  type: text("type"),
  size: int("size"),
  description: text("description"),
  createdAt: datetime("created_at"),
  updatedAt: datetime("updated_at"),
});

export const mediaRelations = relations(media, ({ many }) => ({
  magazines: many(magazines),
}));  

export const articleShares = mysqlTable("article_shares", {
  id: int("id").primaryKey().autoincrement(),
  articleId: int("article_id"),
  userId: int("user_id"),
  sharedAt: datetime("shared_at"),
});