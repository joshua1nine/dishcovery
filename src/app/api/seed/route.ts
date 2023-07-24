import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { NextResponse } from "next/server";
import { config } from "@/db/config";
import { sql } from "drizzle-orm";
import { mockCategories } from "@/db/mocks/categories";
import { mockUnits } from "@/db/mocks/units";
import { mockIngredients } from "@/db/mocks/ingredients";
import { mockRecipes } from "@/db/mocks/recipes";
import { mockRecipeIngredients } from "@/db/mocks/recipeIngredients";
import { category } from "@/db/schema/category";
import { unit } from "@/db/schema/unit";
import { recipeIngredient } from "@/db/schema/recipeIngredient";
import { recipe } from "@/db/schema/recipe";
import { ingredient } from "@/db/schema/ingredient";

export async function GET(request: Request) {
  const connection = connect(config);
  const db = drizzle(connection);

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

  return NextResponse.json({ message: "database seeded" });
}
