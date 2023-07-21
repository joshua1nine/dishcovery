ALTER TABLE `ingredients` MODIFY COLUMN `category_id` varchar(255);--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `unit_id` varchar(255);--> statement-breakpoint
ALTER TABLE `recipedirections` MODIFY COLUMN `recipe_id` varchar(255);--> statement-breakpoint
ALTER TABLE `recipeingredients` MODIFY COLUMN `recipe_id` varchar(255);--> statement-breakpoint
ALTER TABLE `recipeingredients` MODIFY COLUMN `ingredient_id` varchar(255);