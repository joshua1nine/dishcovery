ALTER TABLE `categories` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT UUID();--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'o-diVak3_RJB';--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'w90xnyCXgLf-';