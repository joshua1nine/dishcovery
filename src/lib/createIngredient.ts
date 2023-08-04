import { NewIngredient, ingredient } from "../../drizzle/schema";
import { db } from "@/server/db";

export default async function createIngredient(newIngredient: NewIngredient) {
  await db.insert(ingredient).values({
    public_id: newIngredient.public_id,
    name: newIngredient.name,
    categoryId: newIngredient.categoryId,
  });
}
