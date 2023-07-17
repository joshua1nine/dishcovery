import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import * as schema from "../db/schema";
import { ingredients, recipeingredients } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function findIngredient(id: number) {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const ingredient = await db.query.ingredients.findFirst({
    where: eq(ingredients.id, id),
    // columns: {
    //   id: true,
    //   name: true,
    // },
  });

  const usedInRecipes = await db.query.recipeingredients.findFirst({
    where: eq(recipeingredients.ingredientId, id),
  });

  const results = {
    ingredient: ingredient,
    usedInRecipes: usedInRecipes && !undefined ? true : false,
    // usedInRecipes: usedInRecipes,
  };

  return results;
}
