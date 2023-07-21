ALTER TABLE `categories` MODIFY COLUMN `public_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `public_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `public_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipedirections` ADD `public_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `recipeingredients` ADD `public_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `units` ADD `public_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD CONSTRAINT `categories_name_unique` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `units` ADD CONSTRAINT `units_public_id_unique` UNIQUE(`public_id`);