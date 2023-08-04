import { mysqlTable, int, varchar, index, float } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { ingredient } from "./ingredient";
import { unit } from "./unit";
import { recipe } from "./recipe";

// RecipeIngredient Table
export const recipeIngredient = mysqlTable(
  "recipeingredient",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    public_id: varchar("public_id", { length: 255 }).notNull(),
    qty: float("qty").notNull(),
    description: varchar("description", { length: 255 }),
    unitId: varchar("unit_id", { length: 255 }).notNull(),
    recipe_id: varchar("recipe_id", { length: 255 }).notNull(),
    ingredientId: varchar("ingredient_id", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      recipeIdIdx: index("recipe_id_idx").on(table.recipe_id),
      ingredientIdIdx: index("ingredient_id_idx").on(table.ingredientId),
    };
  }
);

export const recipeIngredientRelations = relations(
  recipeIngredient,
  ({ one }) => ({
    ingredient: one(ingredient, {
      fields: [recipeIngredient.ingredientId],
      references: [ingredient.public_id],
    }),
    unit: one(unit, {
      fields: [recipeIngredient.unitId],
      references: [unit.public_id],
    }),
    recipe: one(recipe, {
      fields: [recipeIngredient.recipe_id],
      references: [recipe.public_id],
    }),
  })
);

// Zod Schema
export const insertRecipeIngredientSchema = createInsertSchema(
  recipeIngredient,
  {
    unitId: (schema) => schema.unitId.nonempty({ message: "Required" }),
    ingredientId: (schema) =>
      schema.ingredientId.nonempty({ message: "Required" }),
  }
);

export const selectRecipeIngredientSchema = createSelectSchema(
  recipeIngredient
).omit({
  id: true,
});

// Types
export type NewRecipeIngredient = z.infer<typeof insertRecipeIngredientSchema>;
export type RecipeIngredient = z.infer<typeof selectRecipeIngredientSchema>;
