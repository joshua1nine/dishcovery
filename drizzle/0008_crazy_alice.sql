ALTER TABLE `categories` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT uuid_generate_v4();--> statement-breakpoint
ALTER TABLE `ingredients` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT 'OGJdh2F9dPVE';--> statement-breakpoint
ALTER TABLE `recipes` MODIFY COLUMN `public_id` varchar(255) NOT NULL DEFAULT '8LueVBUJQoo9';