import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { nanoid } from "nanoid";
import { NewRecipeIngredient, recipeIngredient } from "@/db/schema";

export default async function createRecipe(recipe: NewRecipeIngredient) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(recipeIngredient).values({
    public_id: nanoid(),
    qty: recipe.qty,
    description: recipe.description,
    recipe_id: recipe.recipe_id,
    ingredientId: recipe.ingredientId,
    unitId: recipe.unitId,
  });
}
