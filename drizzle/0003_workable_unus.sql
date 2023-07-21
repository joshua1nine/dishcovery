ALTER TABLE `ingredients` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'HeoQFIKqgSiS';--> statement-breakpoint
ALTER TABLE `recipes` ADD `public_id` varchar(255) DEFAULT '-RKLUCtodK73' NOT NULL;--> statement-breakpoint
ALTER TABLE `recipes` ADD CONSTRAINT `recipes_public_id_unique` UNIQUE(`public_id`);