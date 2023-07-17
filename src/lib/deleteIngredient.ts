import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { ingredients } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function deleteIngredient(id: number) {
  const connection = connect(config);
  const db = drizzle(connection);

  const result = await db.delete(ingredients).where(eq(ingredients.id, id));

  return result;
}