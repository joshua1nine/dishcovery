import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { config } from "../db/config";
import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";

export default async function getRecipe(id: string) {
  const connection = connect(config);
  const db = drizzle(connection, {
    schema,
  });

  const results = await db.query.recipe.findFirst({
    where: eq(schema.recipe.public_id, id),
    with: {
      recipeingredient: {
        columns: {
          public_id: true,
          qty: true,
          description: true,
        },
        with: {
          unit: {
            columns: {
              abbr: true,
            },
          },
          ingredient: {
            columns: {
              public_id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return results;
}
