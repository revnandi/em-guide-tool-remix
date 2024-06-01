CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text,
	`slug` text,
	`except` text,
	`original_url` text,
	`magazine_id` int,
	`user_id` int,
	`created_at` datetime,
	`updated_at` datetime,
	`is_published` boolean,
	`published_at` datetime,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `magazines` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	`slug` text,
	`logo_id` int,
	`user_id` int,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `magazines_id` PRIMARY KEY(`id`),
	CONSTRAINT `magazines_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` text,
	`type` text,
	`size` int,
	`description` text,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `roles` ADD CONSTRAINT `roles_slug_unique` UNIQUE(`slug`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_slug_unique` UNIQUE(`slug`);--> statement-breakpoint
ALTER TABLE `roles` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `users` ADD `slug` text;