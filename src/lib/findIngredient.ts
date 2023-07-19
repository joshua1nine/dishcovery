import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { ingredients, recipeIngredients } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function findIngredient(id: number) {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const ingredient = await db.query.ingredients.findFirst({
    where: eq(ingredients.id, id),
  });

  const usedInRecipes = await db.query.recipeIngredients.findFirst({
    where: eq(recipeIngredients.ingredientId, id),
  });

  const results = {
    ingredient: ingredient,
    usedInRecipes: usedInRecipes && !undefined ? true : false,
  };

  return results;
}
