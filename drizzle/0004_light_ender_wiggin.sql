ALTER TABLE `ingredients` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'CwOP1ldJYTxn';--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT '-g0o4whnYbFu';--> statement-breakpoint
ALTER TABLE `categories` ADD `public_id` varchar(255) DEFAULT 'E8I9EEy5qhBK' NOT NULL;--> statement-breakpoint
ALTER TABLE `categories` ADD CONSTRAINT `categories_public_id_unique` UNIQUE(`public_id`);