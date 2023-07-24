import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { NewIngredient, ingredient } from "@/db/schema/ingredient";

export default async function createIngredient(newIngredient: NewIngredient) {
  const connection = connect(config);
  const db = drizzle(connection);

  await db.insert(ingredient).values({
    public_id: newIngredient.public_id,
    name: newIngredient.name,
    categoryId: newIngredient.categoryId,
  });
}
