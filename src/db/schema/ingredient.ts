import {
  mysqlTable,
  int,
  varchar,
  index,
  decimal,
  float,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { recipeIngredient } from "./recipeIngredient";
import { category } from "./category";

// Ingredient Table
export const ingredient = mysqlTable(
  "ingredient",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    public_id: varchar("public_id", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    density: float("density"),
    categoryId: varchar("category_id", { length: 255 }),
  },
  (table) => {
    return {
      categoryIdIdx: index("category_id_idx").on(table.categoryId),
    };
  }
);

export const ingredientRelations = relations(ingredient, ({ many, one }) => ({
  recipeingredient: many(recipeIngredient),
  categories: one(category, {
    fields: [ingredient.categoryId],
    references: [category.public_id],
  }),
}));

// Zod Schema & Type
export const insertIngredientSchema = createInsertSchema(ingredient, {
  name: z.string().min(1, { message: "Required" }),
  categoryId: z.string().min(1, { message: "Required" }),
  density: (schema) => schema.density.positive(),
});

export const selectIngredientSchema = createSelectSchema(ingredient).omit({
  id: true,
});

export type NewIngredient = z.infer<typeof insertIngredientSchema>;
export type Ingredient = z.infer<typeof selectIngredientSchema>;
