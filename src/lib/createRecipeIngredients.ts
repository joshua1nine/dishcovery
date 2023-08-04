import { nanoid } from "nanoid";
import { NewRecipeIngredient, recipeIngredient } from "../../drizzle/schema";
import { db } from "@/server/db";

export default async function createRecipe(recipe: NewRecipeIngredient) {
  await db.insert(recipeIngredient).values({
    public_id: nanoid(),
    qty: recipe.qty,
    description: recipe.description,
    recipe_id: recipe.recipe_id,
    ingredientId: recipe.ingredientId,
    unitId: recipe.unitId,
  });
}
