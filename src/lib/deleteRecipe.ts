import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { eq } from "drizzle-orm";
import { Recipe, recipe, recipeIngredient } from "@/db/schema";

export default async function deleteIngredient(id: Recipe["public_id"]) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.delete(recipe).where(eq(recipe.public_id, id));
  await db.delete(recipeIngredient).where(eq(recipeIngredient.recipe_id, id));

  // return result;
}
