ALTER TABLE `articles` MODIFY COLUMN `slug` varchar(256);--> statement-breakpoint
ALTER TABLE `magazines` MODIFY COLUMN `slug` varchar(256);--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `slug` varchar(256);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `slug` varchar(256);