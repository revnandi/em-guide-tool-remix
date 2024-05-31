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
	`name` text,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
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
	`username` text,
	`firstname` text,
	`lastname` text,
	`email` text,
	`role_id` int,
	`settings_id` int,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
