CREATE TABLE `languages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`slug` varchar(256) NOT NULL,
	`user_id` int,
	`created_at` datetime,
	`updated_at` datetime,
	CONSTRAINT `languages_id` PRIMARY KEY(`id`),
	CONSTRAINT `languages_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `articles` ADD `language_id` int;