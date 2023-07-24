import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { eq } from "drizzle-orm";
import { Ingredient, ingredient } from "@/db/schema";

export default async function deleteIngredient(id: Ingredient["public_id"]) {
  const connection = connect(config);
  const db = drizzle(connection);

  const result = await db
    .delete(ingredient)
    .where(eq(ingredient.public_id, id));

  return result;
}
