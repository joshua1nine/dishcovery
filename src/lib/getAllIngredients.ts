import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { eq } from "drizzle-orm";
import { ingredient } from "@/db/schema/ingredient";
import { category } from "@/db/schema/category";

export type GetAllIngredients = Awaited<ReturnType<typeof getAllIngredients>>;
export type SelectIngredient = GetAllIngredients[0];

export default async function getAllIngredients() {
  const connection = connect(config);
  const db = drizzle(connection);

  const results = await db
    .select({
      public_id: ingredient.public_id,
      name: ingredient.name,
      category: category.name,
      categoryId: ingredient.categoryId,
      density: ingredient.density,
    })
    .from(ingredient)
    .innerJoin(category, eq(ingredient.categoryId, category.public_id));

  return results;
}
