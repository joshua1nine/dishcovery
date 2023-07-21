import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { recipes } from "../db/schema";
import { InferModel } from "drizzle-orm";

type NewRecipe = InferModel<typeof recipes, "insert">;

export default async function createRecipe(recipe: NewRecipe) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(recipes).values({
    public_id: recipe.public_id,
    name: recipe.name,
    cookTime: recipe.cookTime,
    prepTime: recipe.prepTime,
    servings: recipe.servings,
    notes: recipe.notes,
  });
}
