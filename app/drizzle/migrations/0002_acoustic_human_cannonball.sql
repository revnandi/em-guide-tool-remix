CREATE TABLE `article_shares` (
	`id` int AUTO_INCREMENT NOT NULL,
	`article_id` int,
	`user_id` int,
	`shared_at` datetime,
	CONSTRAINT `article_shares_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `articles` RENAME COLUMN `except` TO `excerpt`;