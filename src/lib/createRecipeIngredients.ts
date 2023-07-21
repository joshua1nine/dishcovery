import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { recipeIngredients } from "../db/schema";
import { InferModel } from "drizzle-orm";
import { nanoid } from "nanoid";

type NewRecipeIngredients = InferModel<typeof recipeIngredients, "insert">;

export default async function createRecipe(recipe: NewRecipeIngredients) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(recipeIngredients).values({
    public_id: nanoid(),
    amount: recipe.amount,
    description: recipe.description,
    recipeId: recipe.recipeId,
    ingredientId: recipe.ingredientId,
  });
}
