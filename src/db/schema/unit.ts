import { mysqlTable, int, varchar, mysqlEnum } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Unit Table
export const unit = mysqlTable("unit", {
  id: int("id").autoincrement().primaryKey().notNull(),
  public_id: varchar("public_id", { length: 255 }).unique().notNull(),
  abbr: varchar("abbr", { length: 255 }).notNull(),
  measure: mysqlEnum("measure", ["volume", "mass", "each"]),
  system: varchar("system", { length: 255 }).notNull(),
  singular: varchar("singular", { length: 255 }).notNull(),
  plural: varchar("plural", { length: 255 }).notNull(),
});

// Zod Schema
export const insertUnitSchema = createInsertSchema(unit);
export const selectUnitSchema = createSelectSchema(unit);

// Types
export type NewUnit = z.infer<typeof insertUnitSchema>;
export type Unit = z.infer<typeof selectUnitSchema>;
