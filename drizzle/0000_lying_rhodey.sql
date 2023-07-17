-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ingredients` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`category_id` int,
	`unit_id` int
);
--> statement-breakpoint
CREATE TABLE `recipeingredients` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`amount` int,
	`description` varchar(255),
	`recipe_id` int,
	`ingredient_id` int
);
--> statement-breakpoint
CREATE TABLE `recipes` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL,
	`prep_time` varchar(255),
	`cook_time` varchar(255),
	`servings` int,
	`directions` text NOT NULL,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `category_id_idx` ON `ingredients` (`category_id`);--> statement-breakpoint
CREATE INDEX `unit_id_idx` ON `ingredients` (`unit_id`);--> statement-breakpoint
CREATE INDEX `recipe_id_idx` ON `recipeingredients` (`recipe_id`);--> statement-breakpoint
CREATE INDEX `ingredient_id_idx` ON `recipeingredients` (`ingredient_id`);
*/