import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { categories, ingredients, units } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function getAllIngredients() {
  const connection = connect(config);
  const db = drizzle(connection);

  const results = await db
    .select({
      id: ingredients.id,
      name: ingredients.name,
      category: categories.name,
      unit: units.name,
    })
    .from(ingredients)
    .innerJoin(categories, eq(ingredients.categoryId, categories.id))
    .innerJoin(units, eq(ingredients.unitId, units.id));

  return results;
}
