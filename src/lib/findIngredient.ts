import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { Ingredient } from "@/db/schema";

export default async function findIngredient(id: Ingredient["public_id"]) {
  const connection = connect(config);
  const db = drizzle(connection, { schema });

  const dbIngredient = await db.query.ingredient.findFirst({
    where: eq(schema.ingredient.public_id, id),
  });

  const usedInRecipes = await db.query.recipeIngredient.findFirst({
    where: eq(schema.recipeIngredient.ingredientId, id),
  });

  const results = {
    ingredient: dbIngredient,
    usedInRecipes: usedInRecipes && !undefined ? true : false,
  };

  return results;
}
