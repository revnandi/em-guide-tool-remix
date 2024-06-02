ALTER TABLE `articles` MODIFY COLUMN `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `articles` MODIFY COLUMN `slug` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `magazines` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `magazines` MODIFY COLUMN `slug` varchar(256) NOT NULL;