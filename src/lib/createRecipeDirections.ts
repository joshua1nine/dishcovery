import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { recipeDirections } from "../db/schema";
import { InferModel } from "drizzle-orm";
import { nanoid } from "nanoid";

type NewRecipeDirections = InferModel<typeof recipeDirections, "insert">;

export default async function createRecipe(recipe: NewRecipeDirections) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(recipeDirections).values({
    public_id: nanoid(),
    step: recipe.step,
    description: recipe.description,
    recipeId: recipe.recipeId,
  });
}
