import { db } from "@/server/db";
import { Recipe, recipe, recipeIngredient } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export default async function deleteIngredient(id: Recipe["public_id"]) {
  await db.delete(recipe).where(eq(recipe.public_id, id));
  await db.delete(recipeIngredient).where(eq(recipeIngredient.recipe_id, id));

  // return result;
}
