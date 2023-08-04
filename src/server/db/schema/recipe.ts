import {
  mysqlTable,
  int,
  varchar,
  text,
  float,
  index,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { ingredient } from "./ingredient";
import { unit } from "./unit";
import { recipeIngredient } from "./recipeIngredient";
// import { recipeIngredient } from "./recipeIngredient";

// Recipe Table
export const recipe = mysqlTable("recipe", {
  id: int("id").autoincrement().primaryKey().notNull(),
  public_id: varchar("public_id", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  prepTime: int("prep_time"),
  cookTime: int("cook_time"),
  servings: int("servings"),
  directions: text("directions"),
  notes: text("notes"),
});
export const recipeRelations = relations(recipe, ({ many }) => ({
  recipeingredient: many(recipeIngredient),
}));

// Zod Schema
export const insertRecipeSchema = createInsertSchema(recipe, {
  name: (schema) => schema.name.nonempty({ message: "Required" }),
});
export const selectRecipeSchema = createSelectSchema(recipe);

// Types
export type NewRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = z.infer<typeof selectRecipeSchema>;
