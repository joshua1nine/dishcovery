import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Category Table
export const category = mysqlTable("category", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  public_id: varchar("public_id", { length: 255 }).notNull(),
});

// Zod Schemas & Types
export const insertCategorySchema = createInsertSchema(category);
export const selectCategorySchema = createSelectSchema(category).omit({
  id: true,
});

export type NewCategory = z.infer<typeof insertCategorySchema>;
export type Category = z.infer<typeof selectCategorySchema>;
