ALTER TABLE `categories` DROP CONSTRAINT `categories_public_id_unique`;--> statement-breakpoint
ALTER TABLE `categories` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'xiJJIFT-Jhjs';--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'fMMC2Ws6zwsA';--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'rKF3--0uVw98';