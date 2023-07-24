import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { NewRecipe, recipe } from "@/db/schema";

export default async function createRecipe(newRecipe: NewRecipe) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(recipe).values({
    public_id: newRecipe.public_id,
    name: newRecipe.name,
    cookTime: newRecipe.cookTime,
    prepTime: newRecipe.prepTime,
    servings: newRecipe.servings,
    notes: newRecipe.notes,
    directions: newRecipe.directions,
  });
}
