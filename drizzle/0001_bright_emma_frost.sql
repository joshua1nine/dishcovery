CREATE TABLE `recipedirections` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`step` int NOT NULL,
	`description` text NOT NULL,
	`recipe_id` int NOT NULL
);
--> statement-breakpoint
ALTER TABLE `recipes` DROP COLUMN `directions`;