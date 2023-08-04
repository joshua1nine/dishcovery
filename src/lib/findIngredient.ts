import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { Ingredient, ingredient, recipeIngredient } from "@/server/db/schema";

export default async function findIngredient(id: Ingredient["public_id"]) {
  // const dbIngredient = await db.query.ingredient.findFirst({
  //   where: eq(schema.ingredient.public_id, id),
  // });
  //
  const dbIngredient = await db
    .select()
    .from(ingredient)
    .limit(1)
    .where(eq(ingredient.public_id, id));

  // const usedInRecipes = await db.query.recipeIngredient.findFirst({
  //   where: eq(schema.recipeIngredient.ingredientId, id),
  // });

  const usedInRecipes = await db
    .select()
    .from(recipeIngredient)
    .limit(1)
    .where(eq(recipeIngredient.ingredientId, id));

  console.log("used", usedInRecipes);

  const results = {
    ingredient: dbIngredient,
    usedInRecipes: usedInRecipes.length > 0 ? true : false,
  };

  return results;
}
