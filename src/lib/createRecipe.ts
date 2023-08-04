import { db } from "@/server/db";
import { NewRecipe, recipe } from "../../drizzle/schema";

export default async function createRecipe(newRecipe: NewRecipe) {
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
