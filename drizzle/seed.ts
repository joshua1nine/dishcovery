import "dotenv/config";

import { db } from "../src/server/db";

import { sql } from "drizzle-orm";

import { category, ingredient, recipe, recipeIngredient, unit } from "./schema";
import { mockCategories } from "./mocks/categories";
import { mockUnits } from "./mocks/units";
import { mockIngredients } from "./mocks/ingredients";
import { mockRecipes } from "./mocks/recipes";
import { mockRecipeIngredients } from "./mocks/recipeIngredients";

async function seed() {
  await db.delete(category);
  await db.delete(unit);
  await db.delete(recipeIngredient);
  await db.delete(recipe);
  await db.delete(ingredient);

  await db.execute(sql`ALTER TABLE category AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE unit AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE recipeingredient AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE recipe AUTO_INCREMENT = 1`);
  await db.execute(sql`ALTER TABLE ingredient AUTO_INCREMENT = 1`);

  for (const mockCategory of mockCategories) {
    await db.insert(category).values(mockCategory);
  }

  for (const mockUnit of mockUnits) {
    await db.insert(unit).values(mockUnit);
  }

  for (const mockIngredient of mockIngredients) {
    await db.insert(ingredient).values(mockIngredient);
  }

  for (const mockRecipe of mockRecipes) {
    await db.insert(recipe).values(mockRecipe);
  }

  for (const mockRecipeIngredient of mockRecipeIngredients) {
    await db.insert(recipeIngredient).values(mockRecipeIngredient);
  }
}

const seedData = () => Promise.all([seed()]);

seedData().catch((e) => {
  console.log(e);
  process.exit(1);
});
