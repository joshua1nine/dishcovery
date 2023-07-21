import { mysqlTable, int, varchar, index, text } from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  public_id: varchar("public_id", { length: 255 }).notNull(),
});

export const recipeDirections = mysqlTable("recipedirections", {
  id: int("id").autoincrement().primaryKey().notNull(),
  step: int("step").notNull(),
  description: text("description").notNull(),
  public_id: varchar("public_id", { length: 255 }).notNull(),
  recipeId: varchar("recipe_id", { length: 255 }),
});

export const ingredients = mysqlTable(
  "ingredients",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    public_id: varchar("public_id", { length: 255 }).unique().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    categoryId: varchar("category_id", { length: 255 }),
    unitId: varchar("unit_id", { length: 255 }),
  },
  (table) => {
    return {
      categoryIdIdx: index("category_id_idx").on(table.categoryId),
      unitIdIdx: index("unit_id_idx").on(table.unitId),
    };
  }
);

export const recipeIngredients = mysqlTable(
  "recipeingredients",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    public_id: varchar("public_id", { length: 255 }).notNull(),
    amount: int("amount"),
    description: varchar("description", { length: 255 }),
    recipeId: varchar("recipe_id", { length: 255 }),
    ingredientId: varchar("ingredient_id", { length: 255 }),
  },
  (table) => {
    return {
      recipeIdIdx: index("recipe_id_idx").on(table.recipeId),
      ingredientIdIdx: index("ingredient_id_idx").on(table.ingredientId),
    };
  }
);

export const recipes = mysqlTable("recipes", {
  id: int("id").autoincrement().primaryKey().notNull(),
  public_id: varchar("public_id", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  prepTime: varchar("prep_time", { length: 255 }),
  cookTime: varchar("cook_time", { length: 255 }),
  servings: int("servings"),
  notes: text("notes"),
});

export const units = mysqlTable("units", {
  id: int("id").autoincrement().primaryKey().notNull(),
  public_id: varchar("public_id", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
  recipeingredients: many(recipeIngredients),
  recipeDirections: many(recipeDirections),
}));

export const recipeDirectionsRelations = relations(
  recipeDirections,
  ({ one }) => ({
    recipes: one(recipes, {
      fields: [recipeDirections.recipeId],
      references: [recipes.public_id],
    }),
  })
);

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.public_id],
    }),
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.public_id],
    }),
  })
);

export const ingredientsRelations = relations(ingredients, ({ many, one }) => ({
  recipeingredients: many(recipeIngredients),
  units: one(units, {
    fields: [ingredients.unitId],
    references: [units.public_id],
  }),
  categories: one(categories, {
    fields: [ingredients.categoryId],
    references: [categories.public_id],
  }),
}));
