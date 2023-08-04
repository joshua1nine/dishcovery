import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { Ingredient, ingredient } from "../../drizzle/schema";

export default async function deleteIngredient(id: Ingredient["public_id"]) {
  const result = await db
    .delete(ingredient)
    .where(eq(ingredient.public_id, id));

  return result;
}
