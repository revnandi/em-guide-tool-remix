CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text,
	`slug` varchar(256),
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
	`slug` varchar(256),
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
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`notification_id` int,
	`is_dark_mode` boolean,
	`language` text,
	`user_id` int,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(256),
	`name` text,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`is_dark_mode` boolean,
	`language` text,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(256),
	`username` text,
	`firstname` text,
	`lastname` text,
	`email` text,
	`role_id` int,
	`settings_id` int,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_slug_unique` UNIQUE(`slug`)
);
