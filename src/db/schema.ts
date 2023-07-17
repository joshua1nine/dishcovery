import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  int,
  varchar,
  index,
  text,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const ingredients = mysqlTable(
  "ingredients",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    categoryId: int("category_id"),
    unitId: int("unit_id"),
  },
  (table) => {
    return {
      categoryIdIdx: index("category_id_idx").on(table.categoryId),
      unitIdIdx: index("unit_id_idx").on(table.unitId),
    };
  }
);

export const ingredientsRelations = relations(ingredients, ({ many, one }) => ({
  recipeingredients: many(recipeingredients),
  units: one(units, {
    fields: [ingredients.unitId],
    references: [units.id],
  }),
  categories: one(categories, {
    fields: [ingredients.categoryId],
    references: [categories.id],
  }),
}));

export const recipeingredients = mysqlTable(
  "recipeingredients",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    amount: int("amount"),
    description: varchar("description", { length: 255 }),
    recipeId: int("recipe_id"),
    ingredientId: int("ingredient_id"),
  },
  (table) => {
    return {
      recipeIdIdx: index("recipe_id_idx").on(table.recipeId),
      ingredientIdIdx: index("ingredient_id_idx").on(table.ingredientId),
    };
  }
);

export const recipeingredientsRelations = relations(
  recipeingredients,
  ({ one }) => ({
    ingredient: one(ingredients, {
      fields: [recipeingredients.ingredientId],
      references: [ingredients.id],
    }),
    recipe: one(recipes, {
      fields: [recipeingredients.recipeId],
      references: [recipes.id],
    }),
  })
);

export const recipes = mysqlTable("recipes", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  prepTime: varchar("prep_time", { length: 255 }),
  cookTime: varchar("cook_time", { length: 255 }),
  servings: int("servings"),
  directions: text("directions").notNull(),
  notes: text("notes"),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeingredients: many(recipeingredients),
}));

export const units = mysqlTable("units", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});
