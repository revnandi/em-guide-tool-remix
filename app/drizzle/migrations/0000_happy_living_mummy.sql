CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` text,
	`firstname` text,
	`lastname` text,
	`email` text,
	`roleId` int,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
