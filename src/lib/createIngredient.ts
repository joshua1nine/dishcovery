import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { ingredients } from "../db/schema";
import { eq } from "drizzle-orm";
import { InferModel } from "drizzle-orm";

type NewIngredient = InferModel<typeof ingredients, "insert">;

export default async function createIngredient(ingredient: NewIngredient) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(ingredients).values({
    name: ingredient.name,
    categoryId: ingredient.categoryId,
    unitId: ingredient.unitId,
  });
}
