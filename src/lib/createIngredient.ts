import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { ingredients } from "../db/schema";
import { eq } from "drizzle-orm";
import { InferModel } from "drizzle-orm";
import { nanoid } from "nanoid";

type NewIngredient = InferModel<typeof ingredients, "insert">;

export default async function createIngredient(ingredient: NewIngredient) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(ingredients).values({
    public_id: ingredient.public_id || nanoid(),
    name: ingredient.name,
    categoryId: ingredient.categoryId,
    unitId: ingredient.unitId,
  });
}
